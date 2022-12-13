import * as React from 'react';
import type { DataGridVirtualizedBodyState } from './DataGridVirtualizedBody.types';
import { Virtualizer } from '@fluentui/react-virtualizer';
import { getSlots } from '@fluentui/react-utilities';
import { DataGridBodySlots } from '../DataGridBody/DataGridBody.types';

/**P
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridVirtualizedBody_unstable = (state: DataGridVirtualizedBodyState) => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);
  const childArray = React.Children.toArray(slotProps.root.children);
  const rowFunction = (index: number) => {
    if (slotProps?.root?.children) {
      return childArray[index];
    }
  };

  return (
    <slots.root {...slotProps.root}>
      <Virtualizer
        numItems={childArray.length}
        virtualizerLength={80}
        bufferSize={800}
        bufferItems={20}
        itemSize={state.itemSize}
      >
        {rowFunction}
      </Virtualizer>
    </slots.root>
  );
};
