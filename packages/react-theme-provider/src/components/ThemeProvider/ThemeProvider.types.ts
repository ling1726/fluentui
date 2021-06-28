import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';
import { PartialTheme, Theme } from '@fluentui/react-theme';

export interface ThemeProviderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
  /**
   * Document used to insert CSS variables to head
   */
  targetDocument?: Document | undefined;
}

export interface ThemeProviderState extends ThemeProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  theme: Theme;
}
