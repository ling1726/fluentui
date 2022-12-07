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
  return (
    <slots.root {...slotProps.root}>
      <Virtualizer virtualizerLength={80} bufferSize={800} bufferItems={20} itemSize={state.itemSize}>
        {slotProps.root.children}
      </Virtualizer>
    </slots.root>
  );
};
