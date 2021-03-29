import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utilities';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * If the menu item is a trigger for a submenu
   */
  hasSubmenu?: boolean;

  /**
   * Applies disabled styles to menu item but remains focusable
   */
  disabled?: boolean;
}

export interface MenuItemState extends MenuItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}
