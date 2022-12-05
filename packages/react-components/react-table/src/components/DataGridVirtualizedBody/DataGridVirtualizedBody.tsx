import * as React from 'react';
import { useDataGridVirtualizedBody_unstable } from './useDataGridVirtualizedBody';
import { renderDataGridVirtualizedBody_unstable } from './renderDataGridVirtualizedBody';
import { useDataGridVirtualizedBodyStyles_unstable } from './useDataGridVirtualizedBodyStyles';
import type { DataGridVirtualizedBodyProps } from './DataGridVirtualizedBody.types';

/**
 * DataGridVirtualizedBody component - TODO: add more docs
 */
export const DataGridVirtualizedBody: React.FC<DataGridVirtualizedBodyProps> = props => {
  const state = useDataGridVirtualizedBody_unstable(props, null);

  useDataGridVirtualizedBodyStyles_unstable(state);
  console.log('RENDERING: ', state);
  return renderDataGridVirtualizedBody_unstable(state);
};

DataGridVirtualizedBody.displayName = 'DataGridVirtualizedBody';
