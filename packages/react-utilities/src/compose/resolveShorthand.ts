import { isValidElement } from 'react';
import { ObjectShorthandProps, ShorthandProps } from './types';

/**
 * Resolves ShorthandProps into ObjectShorthandProps, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base ShorthandProps
 * @param defaultProps - base properties to be merged with the end ObjectShorthandProps
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveShorthand<T extends Record<string, any>>(
  value: ShorthandProps<T>,
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

export function isObjectShorthandProps<P>(value: ShorthandProps<P>): value is ObjectShorthandProps<P> {
  return typeof value === 'object';
}
