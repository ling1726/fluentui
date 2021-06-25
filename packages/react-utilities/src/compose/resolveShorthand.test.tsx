import * as React from 'react';
import { resolveShorthand } from './resolveShorthand';
import { ShorthandPropsCompat } from './types';

type TestProps = {
  slotA?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  slotB?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  slotC?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  notASlot?: string;
  alsoNotASlot?: number;
};

describe('resolveShorthandProps', () => {
  it('resolves a string', () => {
    const props: TestProps = { slotA: 'hello' };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: 'hello' });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: <div>hello</div> });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: 42 });
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({});
  });
});
