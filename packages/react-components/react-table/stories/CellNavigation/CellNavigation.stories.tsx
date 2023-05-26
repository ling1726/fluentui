import * as React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  useArrowNavigationGroup,
  useId,
} from '@fluentui/react-components';

const items = [
  {
    file: { label: 'Meeting notes' },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
    },
  },
  {
    file: { label: 'Thursday presentation' },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Training recording' },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
    },
  },
  {
    file: { label: 'Purchase order' },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
    },
  },
];

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const VisualFocusOnRow = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });
  const id = useId('visual-focus');

  return (
    <>
      <div id={id}>
        When the first cell is focused, the focus outline will be rendered for the entire row. To enter/exit the cell
        with two buttons, press Enter/Escape.
      </div>
      <br />
      <Table
        noNativeElements
        aria-describedby={id}
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with cell focus but visual focus on row"
      >
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell tabIndex={0} key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.file.label}>
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
