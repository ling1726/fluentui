import * as React from 'react';

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  createTableColumn,
  useArrowNavigationGroup,
  useId,
} from '@fluentui/react-components';

type FileCell = {
  label: string;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
};

type AuthorCell = {
  label: string;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes' },
    author: { label: 'Max Mustermann' },
    lastUpdated: { label: '7h ago', timestamp: 3 },
    lastUpdate: {
      label: 'You edited this',
    },
  },
  {
    file: { label: 'Thursday presentation' },
    author: { label: 'Erika Mustermann' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Training recording' },
    author: { label: 'John Doe' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Purchase order' },
    author: { label: 'Jane Doe' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const CellNavigationSelection = () => {
  const id = useId();
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  const arrowNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <>
      <div id={id}>
        When the first cell is focused, the focus outline will be rendered for the entire row. Only cells can be
        focused. The row can be selected by clicking on any part of the row or pressing the space key on any part of the
        row.
      </div>
      <br />
      <Table
        aria-describedby={id}
        noNativeElements
        {...arrowNavAttr}
        aria-label="Table with multiselect and cell focus"
        role="grid"
      >
        <TableHeader>
          <TableRow>
            <TableSelectionCell
              checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
              onClick={toggleAllRows}
              onKeyDown={toggleAllKeydown}
              checkboxIndicator={{ 'aria-label': 'Select all rows ', tabIndex: -1 }}
              role="gridcell"
              aria-selected={allRowsSelected}
              tabIndex={0}
            />
            <TableHeaderCell tabIndex={0}>File</TableHeaderCell>
            <TableHeaderCell tabIndex={0}>Author</TableHeaderCell>
            <TableHeaderCell tabIndex={0}>Last updated</TableHeaderCell>
            <TableHeaderCell tabIndex={0}>Last update</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
            <TableRow key={item.file.label} onClick={onClick} onKeyDown={onKeyDown} appearance={appearance}>
              <TableSelectionCell
                role="gridcell"
                checked={selected}
                checkboxIndicator={{ 'aria-label': 'Select row', tabIndex: -1 }}
                tabIndex={0}
                aria-selected={selected}
              />
              <TableCell tabIndex={0} role="gridcell">
                <TableCellLayout>{item.file.label}</TableCellLayout>
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                <TableCellLayout>{item.author.label}</TableCellLayout>
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {item.lastUpdated.label}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
