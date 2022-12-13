import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import { PresenceBadgeStatus, Avatar } from '@fluentui/react-components';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  ColumnDefinition,
  ColumnId,
  TableCellLayout,
  createColumn,
  Virtualizer,
  useTableSort,
} from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 3 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const repeatCount = 2500;
const generateContent = (): Item[] => {
  const contentList: Item[] = [];
  for (let i = 0; i < repeatCount; i++) {
    items.forEach((item, index) => {
      const newItem: Item = {
        file: { ...item.file },
        author: { ...item.author },
        lastUpdated: { ...item.lastUpdated },
        lastUpdate: { ...item.lastUpdate },
      };
      // Update labels to make unique
      newItem.author.label = `${newItem.author.label}-${i}-${index}`;
      newItem.file.label = `${newItem.file.label}-${i}-${index}`;
      newItem.lastUpdate.label = `${newItem.lastUpdate.label}-${i}-${index}`;
      newItem.lastUpdated.label = `${newItem.lastUpdated.label}-${i}-${index}`;
      contentList.push(newItem);
    });
  }
  return contentList;
};

const fullItemList: Item[] = generateContent();

// Simple wrapper class to control scroll view height
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
  },
});

export const Virtualized = () => {
  const columns: ColumnDefinition<Item>[] = React.useMemo(
    () => [
      createColumn<Item>({
        columnId: 'file',
        compare: (a, b) => {
          return a.file.label.localeCompare(b.file.label);
        },
      }),
      createColumn<Item>({
        columnId: 'author',
        compare: (a, b) => {
          return a.author.label.localeCompare(b.author.label);
        },
      }),
      createColumn<Item>({
        columnId: 'lastUpdated',
        compare: (a, b) => {
          return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
        },
      }),
      createColumn<Item>({
        columnId: 'lastUpdate',
        compare: (a, b) => {
          return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
        },
      }),
    ],
    [],
  );
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items: fullItemList,
    },
    [useTableSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } })],
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());
  const styles = useStyles();

  const rowFunc = React.useCallback(
    (index: number) => {
      const item: Item = rows[index].item;
      return (
        <TableRow key={item.file.label}>
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCellLayout>
          </TableCell>
          <TableCell>{item.lastUpdated.label}</TableCell>
          <TableCell>
            <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
          </TableCell>
        </TableRow>
      );
    },
    [rows],
  );

  return (
    <div className={styles.container}>
      <Table sortable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Virtualizer
            numItems={rows.length}
            beforeContainer={{ as: 'tr' }}
            afterContainer={{ as: 'tr' }}
            before={{ as: 'td' }}
            after={{ as: 'td' }}
            virtualizerLength={120}
            bufferSize={1000}
            itemSize={44}
          >
            {rowFunc}
          </Virtualizer>
        </TableBody>
      </Table>
    </div>
  );
};
