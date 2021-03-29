import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  useOverrideNativeKeyboardClick,
} from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from './useCharacterSearch';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';
import { ChevronRightIcon } from '../../utils/DefaultIcons';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon', 'submenuIndicator'];

const mergeProps = makeMergeProps<MenuItemState>({ deepMerge: menuItemShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem = (
  props: MenuItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemProps,
): MenuItemState => {
  const hasSubmenu = useMenuTriggerContext();

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span' },
      submenuIndicator: { as: 'span', children: <ChevronRightIcon /> },
      role: 'menuitem',
      tabIndex: 0,
      hasSubmenu,
      'aria-disabled': props.disabled,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  const { onClick: onClickOriginal, onKeyDown: onKeyDownOriginal, onKeyUp: onKeyUpOriginal } = state;
  const { onOverrideClickKeyDown, onOverrideClickKeyUp } = useOverrideNativeKeyboardClick();
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onOverrideClickKeyDown(e);
    onKeyDownOriginal?.(e);
  };

  state.onKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onOverrideClickKeyUp(e);
    onKeyUpOriginal?.(e);
  };

  state.onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    onClickOriginal?.(e);
  };

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  useCharacterSearch(state);
  return state;
};
