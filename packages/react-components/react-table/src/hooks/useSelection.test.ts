import { renderHook, act } from '@testing-library/react-hooks';
import { useSelection } from './useSelection';

describe('useSelection', () => {
  const items = [{ value: 'a' }, { value: 'b' }, { value: 'c' }, { value: 'd' }];

  const getRowId = (item: {}, index: number) => index;

  describe('multiselect', () => {
    it('should use custom row id', () => {
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'multiselect', items, getRowId: (item: { value: string }) => item.value }),
      );
      act(() => {
        result.current.toggleAllRows();
      });

      expect(Array.from(result.current.selectedRows)).toEqual(items.map(item => item.value));
    });

    it('should set default selected rows', () => {
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'multiselect', items, getRowId, defaultSelectedRows: new Set([1, 2]) }),
      );

      expect(Array.from(result.current.selectedRows)).toEqual([1, 2]);
    });

    it('should call onRowSelectionChange with selected rows', () => {
      const onRowSelectionChange = jest.fn();
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'multiselect', items, getRowId, onRowSelectionChange }),
      );

      act(() => {
        result.current.toggleAllRows();
      });

      expect(onRowSelectionChange).toHaveBeenCalledTimes(1);
      expect(onRowSelectionChange).toHaveBeenCalledWith(new Set([0, 1, 2, 3]));
    });

    describe('toggleAllRows', () => {
      it('should select all rows', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });
        expect(result.current.selectedRows.size).toBe(items.length);
        expect(Array.from(result.current.selectedRows)).toEqual(items.map((_, i) => i));
      });

      it('should deselect all rows', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });

        act(() => {
          result.current.toggleAllRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });
        act(() => {
          result.current.clearRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.has(1)).toBe(true);
      });

      it('should select multiple rows', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.selectRow(2);
        });

        expect(result.current.selectedRows.size).toBe(2);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(result.current.selectedRows.has(2)).toBe(true);
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(true);
      });

      it('should deselect selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.selectedRows.has(1)).toBe(false);
      });

      it('should select another unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(2);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(result.current.selectedRows.has(2)).toBe(true);
      });
    });

    describe('allRowsSelected', () => {
      it('should return true if all rows are selected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });

        expect(result.current.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.allRowsSelected).toBe(false);
      });

      it('should return false if not all rows are selected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(3);
        expect(result.current.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.someRowsSelected).toBe(false);
      });
    });
  });

  describe('single select', () => {
    it('should set default selected row', () => {
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'single', items, getRowId, defaultSelectedRows: new Set([1]) }),
      );

      expect(Array.from(result.current.selectedRows)).toEqual([1]);
    });

    it('should call onRowSelectionChange with selected row', () => {
      const onRowSelectionChange = jest.fn();
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'single', items, getRowId, onRowSelectionChange }),
      );

      act(() => {
        result.current.selectRow(1);
      });

      expect(onRowSelectionChange).toHaveBeenCalledTimes(1);
      expect(onRowSelectionChange).toHaveBeenCalledWith(new Set([1]));
    });

    it('should throw error when defaultSelectedRows has a length greater than 1', () => {
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'single', items, getRowId, defaultSelectedRows: new Set([1, 2]) }),
      );

      expect(result.error).toMatchInlineSnapshot(
        `[Error: [react-table]: \`defaultSelectedItems\` should not have more than 1 element]`,
      );
    });

    it('should not throw error when defaultSelectedRows has a length greater than 1 during production', () => {
      const nodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const { result } = renderHook(() =>
        useSelection({ selectionMode: 'single', items, getRowId, defaultSelectedRows: new Set([1, 2]) }),
      );

      expect(result.error).toBeUndefined();

      process.env.NODE_ENV = nodeEnv;
    });

    describe('toggleAllRows', () => {
      it('should throw when not in production', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        expect(result.current.toggleAllRows).toThrowErrorMatchingInlineSnapshot(
          `"[react-table]: \`toggleAllItems\` should not be used in single selection mode"`,
        );
      });

      it('should be a noop in production', () => {
        const nodeEnv = (process.env.NODE_ENV = 'production');
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        result.current.toggleAllRows;
        expect(result.current.selectedRows.size).toBe(0);

        process.env.NODE_ENV = nodeEnv;
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });
        act(() => {
          result.current.clearRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.has(1)).toBe(true);
      });

      it('should select another row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.selectRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(2)).toBe(true);
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(true);
      });

      it('should deselect selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(false);
      });

      it('should select another unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(false);
        expect(result.current.selectedRows.has(2)).toBe(true);
      });
    });

    describe('allRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.someRowsSelected).toBe(false);
      });
    });
  });
});
