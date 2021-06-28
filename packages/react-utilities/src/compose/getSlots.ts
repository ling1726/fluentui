import * as React from 'react';

import { ComponentState, ShorthandRenderFunction, SlotPropsRecord } from './types';
import { nullRender } from './nullRender';
import { getNativeElementProps, omit } from '../utils/index';

function getSlot(
  defaultComponent: React.ElementType | undefined,
  userComponent: keyof JSX.IntrinsicElements | undefined,
  alternativeComponent: React.ElementType,
) {
  if (defaultComponent === undefined || typeof defaultComponent === 'string') {
    return userComponent ?? defaultComponent ?? alternativeComponent;
  }
  return defaultComponent;
}

/**
 * Given the state and an array of slot names, will break out `slots` and `slotProps`
 * collections.
 *
 * The root is derived from a mix of `components` props and `as` prop.
 *
 * Slots will render as null if they are rendered as primitives with undefined children.
 *
 * The slotProps will always omit the `as` prop within them, and for slots that are string
 * primitives, the props will be filtered according the the slot type. For example, if the
 * slot is rendered `as: 'a'`, the props will be filtered for acceptable anchor props.
 *
 * @param state - State including slot definitions
 * @param slotNames - Name of which props are slots
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export function getSlots<SlotProps extends SlotPropsRecord = {}>(
  state: ComponentState<SlotProps>,
  slotNames?: Array<keyof SlotProps>,
) {
  /**
   * force typings on state, this should not be added directly in parameters to avoid type inference
   */
  const typedState = state as ComponentState<SlotProps>;
  type Slots = { [K in keyof SlotProps]: React.ElementType<SlotProps[K]> };
  const slots = {} as Slots;
  const slotProps = {} as SlotProps;

  if (slotNames) {
    for (const name of slotNames) {
      const { as, children, ...rest } = typedState[name];

      slots[name] = getSlot(typedState.components?.[name], as, 'span') as Slots[typeof name];

      // Empty Slot
      if (typeof slots[name] === 'string' && children === undefined) {
        slots[name] = nullRender;
        continue;
      }

      slotProps[name] =
        typeof slots[name] === 'string'
          ? ({ ...rest, children } as ComponentState<SlotProps>[keyof SlotProps])
          : typedState[name];

      if (typeof children === 'function') {
        const render = children as ShorthandRenderFunction<SlotProps[keyof SlotProps]>;
        // TODO: converting to unknown might be harmful
        slotProps[name] = ({
          children: render(slots[name], { ...rest, as } as ComponentState<SlotProps>[keyof SlotProps]),
        } as unknown) as SlotProps[keyof SlotProps];
        slots[name] = React.Fragment;
      }
    }
  }

  const slotsWithRoot = slots as Slots & { root: React.ElementType };
  slotsWithRoot.root = getSlot(typedState.components?.root, typedState.as, 'div');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slotPropsWithRoot = slotProps as SlotProps & { root: any };
  slotPropsWithRoot.root = typeof slots.root === 'string' ? getNativeElementProps(slots.root, typedState) : typedState;

  return { slots: slotsWithRoot, slotProps: slotPropsWithRoot } as const;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericDictionary = Record<string, any>;

/**
 * Given the state and an array of slot names, will break out `slots` and `slotProps`
 * collections.
 *
 * The root is always derived from the `as` prop.
 *
 * Slots will render as null if they are rendered as primitives with undefined children.
 *
 * The slotProps will always omit the `as` prop within them, and for slots that are string
 * primitives, the props will be filtered according the the slot type. For example, if the
 * slot is rendered `as: 'a'`, the props will be filtered for acceptable anchor props.
 *
 * @param state - State including slot definitions
 * @param slotNames - Name of which props are slots
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export const getSlotsCompat = (state: GenericDictionary, slotNames?: readonly string[]) => {
  const slots: GenericDictionary = {
    root: state.as || 'div',
  };

  const slotProps: GenericDictionary = {
    root: typeof slots.root === 'string' ? getNativeElementProps(slots.root, state) : omit(state, ['as']),
  };

  if (slotNames) {
    for (const name of slotNames) {
      const slotDefinition = state[name] || {};
      const { as: slotAs = 'span', children } = slotDefinition;
      const isSlotPrimitive = typeof slotAs === 'string';
      const isSlotEmpty = isSlotPrimitive && slotDefinition.children === undefined;

      slots[name] = isSlotEmpty ? nullRender : slotAs;

      if (typeof children === 'function') {
        slotProps[name] = {
          children: children(slots[name], omit(slotDefinition, ['as', 'children'])),
        };
        slots[name] = React.Fragment;
      } else if (slots[name] !== nullRender) {
        slotProps[name] = isSlotPrimitive
          ? getNativeElementProps(slotAs, slotDefinition)
          : omit(slotDefinition, ['as']);
      }
    }
  }

  return { slots, slotProps };
};
