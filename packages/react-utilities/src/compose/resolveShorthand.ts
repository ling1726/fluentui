import { isValidElement } from 'react';
import { ObjectShorthandProps, ShorthandPropsCompat } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveShorthand<T extends Record<string, any>>(
  value: ShorthandPropsCompat<T>,
  defaultProps?: T,
): ObjectShorthandProps<T> {
  let resolvedShorthand = {} as ObjectShorthandProps<T>;

  if (typeof value === 'string' || typeof value === 'number' || isValidElement(value)) {
    resolvedShorthand = { children: value } as ObjectShorthandProps<T>;
  } else if (isObjectShorthandProps(value)) {
    resolvedShorthand = value;
  }

  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
}

export function isObjectShorthandProps<P>(value: ShorthandPropsCompat<P>): value is ObjectShorthandProps<P> {
  return typeof value === 'object';
}
