import * as React from 'react';
import type {
  RowState,
  DataGridBodyProps as DataGridBodyPropsBase,
  DataGridBodySlots as DataGridBodySlotsBase,
  DataGridBodyState as DataGridBodyStateBase,
} from '@fluentui/react-components/unstable';

export type DataGridBodySlots = DataGridBodySlotsBase;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowRenderFunction<TItem = any> = (row: RowState<TItem>, styles: React.CSSProperties) => React.ReactNode;

/**
 * DataGridBody Props
 */
export type DataGridBodyProps = Omit<DataGridBodyPropsBase, 'children'> & {
  itemSize: number;
  height: number;
  children: RowRenderFunction;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = DataGridBodyStateBase &
  Pick<DataGridBodyProps, 'itemSize' | 'height'> & {
    childrenFn: RowRenderFunction;
  };