import { gridNestedBehavior, gridCellBehavior, gridRowBehavior } from '@fluentui/accessibility';
import { Table, Checkbox, Provider, teamsV2Theme } from '@fluentui/react-northstar';
import { useId } from '@fluentui/react-components';
import * as React from 'react';
import * as _ from 'lodash';

interface SelectableTableAction {
  type: 'TOGGLE_ITEM' | 'TOGGLE_ALL';
  checked: boolean;
  itemKey?: string;
}

interface SelectableTableState {
  rows: Record<string, boolean>;
}

const selectableTableStateReducer: React.Reducer<SelectableTableState, SelectableTableAction> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      return { rows: { ...state.rows, [action.itemKey]: action.checked } };
    }
    case 'TOGGLE_ALL': {
      return { rows: _.mapValues(state.rows, () => action.checked) };
    }
    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

export const SelectableTable = () => {
  const rows = [
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
  const headers = [
    { title: 'File', key: 'file', name: 'file' },
    { title: 'Author', key: 'author', name: 'author' },
    { title: 'Last updated', key: 'lastUpdated', name: 'lastUpdated' },
    { title: 'Last update', key: 'lastUpdate', name: 'lastUpdate' },
  ];

  const initialState: SelectableTableState = {
    rows: rows.reduce((rows, row) => {
      rows[row.key] = row.key === 1 || row.key === 2 ? true : false;
      return rows;
    }, {}),
  };
  const [state, dispatch] = React.useReducer(selectableTableStateReducer, initialState);
  const onKeyDownRow = (rowKey: string) => (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      dispatch({ type: 'TOGGLE_ITEM', checked: !state.rows[rowKey], itemKey: rowKey });
    }
  };

  const onClickRow = (rowKey: string) => () => {
    dispatch({ type: 'TOGGLE_ITEM', checked: !state.rows[rowKey], itemKey: rowKey });
  };

  const id = useId();

  return (
    <>
      <Provider theme={teamsV2Theme}>
        <div id={id}>
          Use up/down arrow to move focus between rows. When a row is focused you can use the right arrow to switch to
          cell navigation for that row. The row can be selected by clicking on any part of the row or pressing the space
          key on any part of the row.
        </div>
        <br />
        <Table
          aria-describedby={id}
          aria-label="Selectable table with row and cell focus"
          accessibility={gridNestedBehavior}
        >
          <Table.Row header accessibility={gridRowBehavior}>
            <Table.Cell
              accessibility={gridCellBehavior}
              aria-selected={_.every(state.rows)}
              content={
                <Checkbox
                  data-is-focusable="false"
                  tabIndex={-1}
                  title="Select all"
                  checked={_.every(state.rows)}
                  onClick={(event, props) => dispatch({ type: 'TOGGLE_ALL', checked: props.checked })}
                />
              }
            />
            {headers.map(item => (
              <Table.Cell role="columnheader" content={item.title} accessibility={gridCellBehavior} key={item.key} />
            ))}
          </Table.Row>
          {rows.map(row => {
            return (
              <Table.Row
                onKeyDown={onKeyDownRow(row.key)}
                onClick={onClickRow(row.key)}
                accessibility={gridRowBehavior}
                selected={state.rows[row.key]}
                key={row.key}
              >
                <Table.Cell
                  accessibility={gridCellBehavior}
                  aria-selected={state.rows[row.key]}
                  content={<Checkbox data-is-focusable="false" tabIndex={-1} checked={state.rows[row.key]} />}
                />
                {row.items.map(item => (
                  <Table.Cell content={item.content} accessibility={gridCellBehavior} key={item.key} />
                ))}
              </Table.Row>
            );
          })}
        </Table>
      </Provider>
    </>
  );
};
