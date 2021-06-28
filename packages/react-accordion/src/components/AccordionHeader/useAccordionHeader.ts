import * as React from 'react';
import { useMergedRefs, useId, useDescendants, resolveShorthand } from '@fluentui/react-utilities';
import {
  AccordionHeaderProps,
  AccordionHeaderState,
  AccordionHeaderContextValue,
  AccordionHeaderShorthands,
  UninitializedAccordionHeaderState,
} from './AccordionHeader.types';
import {
  useAccordionItemContext,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
  AccordionItemDescendant,
} from '../AccordionItem/index';
import { DefaultExpandIcon } from './DefaultExpandIcon';
import { AccordionContext } from '../Accordion/useAccordionContext';
import { useContextSelector } from '@fluentui/react-context-selector';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * Const listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps: Array<keyof AccordionHeaderShorthands> = [
  'icon',
  'button',
  'children',
  'expandIcon',
];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 * @param defaultProps - default values for the properties of AccordionHeader
 */
export const useAccordionHeader = (props: AccordionHeaderProps, ref: React.Ref<HTMLElement>): AccordionHeaderState => {
  const { onHeaderClick: onAccordionHeaderClick, disabled, open } = useAccordionItemContext();
  const button = useContextSelector(AccordionContext, ctx => ctx.button);
  const expandIcon = useContextSelector(AccordionContext, ctx => ctx.expandIcon);
  const inline = useContextSelector(AccordionContext, ctx => ctx.inline);
  const icon = useContextSelector(AccordionContext, ctx => ctx.icon);
  const expandIconPosition = useContextSelector(AccordionContext, ctx => ctx.expandIconPosition);
  const size = useContextSelector(AccordionContext, ctx => ctx.size);
  const id = useId('accordion-header-', props.id);
  const panel = useDescendants(accordionItemDescendantContext)[1] as AccordionItemDescendant | undefined;
  const innerRef = React.useRef<HTMLElement>(null);
  const uninitializedState: UninitializedAccordionHeaderState = {
    ref: useMergedRefs(ref, innerRef),
    size: size ?? 'medium',
    inline: inline ?? false,
    role: 'heading',
    expandIconPosition: expandIconPosition ?? 'start',
    ...props,
    components: {
      root: 'div',
      button: 'button',
      expandIcon: DefaultExpandIcon,
    },
    icon: resolveShorthand(props.icon ?? icon),
    expandIcon: resolveShorthand(props.expandIcon ?? expandIcon, {
      'aria-hidden': true,
    }),
    button: useARIAButton(
      resolveShorthand(props.button ?? button, {
        id,
        onClick: onAccordionHeaderClick,
        'aria-disabled': disabled,
        'aria-controls': panel?.id,
      }),
    ),
    children: resolveShorthand(props.children),
  };

  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    0,
  );

  return {
    ...uninitializedState,
    context: React.useMemo<AccordionHeaderContextValue>(
      () => ({
        disabled,
        open,
        size: uninitializedState.size,
        expandIconPosition: uninitializedState.expandIconPosition,
      }),
      [open, uninitializedState.size, uninitializedState.expandIconPosition, disabled],
    ),
  };
};
