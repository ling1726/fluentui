import * as React from 'react';
import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { renderHook } from '@testing-library/react-hooks';
import { MenuItemSelectableState } from './types';
import { useMenuItemSelectable } from './useMenuItemSelectable';
import { useMenuListContext, MenuListContextValue } from '../menuListContext';

jest.mock('../menuListContext');

describe('useMenuItemSelectable', () => {
  const createTestState = (options: Partial<MenuItemSelectableState> = {}): MenuItemSelectableState => ({
    name: 'name',
    value: 'value',
    onCheckedValueChange: jest.fn(),
    checkedItems: [],
    checked: false,
    ...options,
  });

  let context: MenuListContextValue;
  const mockContext = (options: Partial<MenuListContextValue> = {}) => {
    context = {
      checkedValues: {},
      onCheckedValueChange: jest.fn(),
      toggleCheckbox: jest.fn(),
      selectRadio: jest.fn(),
      ...options,
    };
  };

  const checkedItems = ['1', '2', '3'];

  beforeEach(() => {
    mockContext();
    (useMenuListContext as jest.Mock).mockImplementation(selector => {
      return selector(context);
    });
  });

  it.each([
    [['1'], true],
    [['2'], false],
    [undefined, false],
    [[], false],
    [['3', '1', '2'], true],
  ])('should set checked and aria-checked', (values, expected) => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ value: '1', name: 'test' });
    mockContext({ checkedValues: { test: values! } });

    // Act
    renderHook(() => useMenuItemSelectable(state, jest.fn()));

    // Assert
    expect(state.checked).toBe(expected);
    expect(state['aria-checked']).toBe(expected);
  });

  it.each(['onClick', 'onKeyDown'])('should set %s handler', (action: 'onClick' | 'onKeyDown') => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ onKeyDown: undefined, onClick: undefined });

    // Act
    renderHook(() => useMenuItemSelectable(state, jest.fn()));

    // Assert
    const callback = state[action];
    expect(callback).toBeDefined();
    expect(typeof callback).toBe('function');
  });

  it.each([EnterKey, SpacebarKey])('should convert keyboard %s click to native click', keyCode => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    const handleSelection = jest.fn();
    mockContext({
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: { click: jest.fn() },
      keyCode,
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, handleSelection));
    state.onKeyDown?.((event as unknown) as React.KeyboardEvent<HTMLElement>);
    state.onKeyUp?.((event as unknown) as React.KeyboardEvent<HTMLElement>);

    // Assert
    expect(event.target.click).toHaveBeenCalledTimes(1);
  });

  it('should toggle selection on click', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState();
    const handleSelection = jest.fn();
    mockContext({
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const event = {
      defaultPrevented: false,
      persist: jest.fn(),
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, handleSelection));
    state.onClick?.((event as unknown) as React.MouseEvent<HTMLElement>);

    // Assert
    expect(handleSelection).toHaveBeenCalledTimes(1);
    expect(handleSelection).toHaveBeenCalledWith(expect.anything(), state.name, state.value, false);
  });

  it('should not toggle selection on click if disabled flag is set', () => {
    // Arrange
    const state: MenuItemSelectableState = createTestState({ disabled: true });
    const handleSelection = jest.fn();
    mockContext({
      checkedValues: { [state.name]: [...checkedItems] },
    });

    const event = {
      persist: jest.fn(),
    };

    // Act
    renderHook(() => useMenuItemSelectable(state, handleSelection));
    state.onClick?.((event as unknown) as React.MouseEvent<HTMLElement>);

    // Assert
    expect(handleSelection).toHaveBeenCalledTimes(0);
  });
});
