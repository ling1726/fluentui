import { Table, Provider, teamsV2Theme } from '@fluentui/react-northstar';
import { useId } from '@fluentui/react-components';
import { gridNestedBehavior } from '@fluentui/accessibility';
import * as React from 'react';

function handleRowClick(index: number) {
  alert(`OnClick on the row ${index} executed.`);
}
const header = {
  key: 'header',
  items: [
    {
      content: 'file',
      key: 'File',
    },
    {
      content: 'Author',
      key: 'author',
    },
    {
      content: 'Last updated',
      key: 'updated',
    },
    {
      content: 'Last update',
      key: 'update',
    },
  ],
};

const rowsPlain = [
  {
    key: 1,
    items: [
      {
        content: 'Meeting notes',
        key: '1-2',
        id: 'name-1',
      },
      {
        content: 'Max Mustermann',
        key: '1-3',
      },
      {
        content: '7h ago',
        key: '1-4',
        id: 'age-1',
      },
      {
        content: 'You updated this',
        key: '1-4',
        id: 'age-1',
      },
    ],
    onClick: () => handleRowClick(1),
    'aria-labelledby': 'name-1 age-1',
  },
  {
    key: 2,
    items: [
      {
        content: 'Thursday presentation',
        key: '2-2',
      },
      {
        content: 'Erika Mustermann',
        key: '2-3',
      },
      {
        content: 'Yesterday at 1:45 PM',
        key: '2-4',
      },
      {
        key: '2-5',
        content: 'you recently opened this',
      },
    ],
    onClick: () => handleRowClick(2),
  },
  {
    key: 3,
    items: [
      {
        content: 'Training recording',
        key: '3-2',
      },
      {
        content: 'John Doe',
        key: '3-3',
      },
      {
        content: 'Yesterday at 1:45 PM',
        key: '3-4',
      },
      {
        key: '3-5',
        content: 'You recently opened this',
      },
    ],
    onClick: () => handleRowClick(3),
  },
  {
    key: 4,
    items: [
      {
        content: 'Purchase order',
        key: '4-2',
      },
      {
        content: 'Jane Doe',
        key: '4-3',
      },
      {
        content: 'Tue at 9:30 AM',
        key: '3-4',
      },
      {
        key: '3-5',
        content: 'You shared this in Teams chat',
      },
    ],
    onClick: () => handleRowClick(4),
  },
];
export const ActualFocusOnRow = () => {
  const id = useId('actual-focus');
  return (
    <>
      <div id={id}>
        Use up/down arrow to move focus between rows. When a row is focused you can use the right arrow to switch to
        cell navigation for that row.
      </div>
      <Provider theme={teamsV2Theme}>
        <Table
          aria-describedby={id}
          aria-label="Table with row focus and cell focus"
          variables={{
            cellContentOverflow: 'none',
          }}
          header={header}
          rows={rowsPlain}
          accessibility={gridNestedBehavior}
        />
      </Provider>
    </>
  );
};
