import type { ReactNode, MutableRefObject } from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type VirtualizerSlots = {
  before: NonNullable<Slot<'div', 'td'>>;
  beforeContainer: NonNullable<Slot<'div', 'tr'>>;
  after: NonNullable<Slot<'div', 'td'>>;
  afterContainer: NonNullable<Slot<'div', 'tr'>>;
};

// Virtualizer render function to procedurally generate children elements.
// Q: Should we be using generic typing and passing through object data or a simple index system?
export type VirtualizerChildRenderFunction = (index: number) => ReactNode;

export type VirtualizerState = ComponentState<VirtualizerSlots> & {
  /**
   * The current virtualized array of children to show in the DOM.
   */
  virtualizedChildren: ReactNode[];
  /**
   * The current start index for the virtualizer, all previous index's will be removed from DOM.
   */
  virtualizerStartIndex: number;
  /**
   * Current buffer height required at beginning of array.
   */
  afterBufferHeight: number;
  /**
   * Current buffer height required at end of array.
   */
  beforeBufferHeight: number;
  /**
   * The total current height of the scrollView/child content.
   */
  totalVirtualizerHeight: number;
  /**
   * The scroll direction (vertical vs horizontal) - defaults to Vertical if not provided
   */
  horizontal: boolean;
  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  reversed?: boolean;
  /**
   * Tells the virtualizer how much
   */
  bufferSize: number;
};

export type VirtualizerProps = ComponentProps<Partial<VirtualizerSlots>> & {
  /**
   * Required!
   * Render function for rows
   */
  children: VirtualizerChildRenderFunction;

  /**
   * Required!
   * Default row height to use if no custom callback provided.
   * You must provide a value, even if it is just an assumed average or minimum size.
   */
  itemSize: number;

  /**
   * Required!
   * The total number of items in the non-virtualized list.
   */
  numItems: number;

  /**
   * Number of elements to render in the list after virtualization.
   * This needs to be enough items to cover the list's viewport
   * as well as the buffer overhangs (bufferItems/bufferSize)
   */
  virtualizerLength: number;

  /**
   * Determines how many elements to render before the current index.
   * (Ensure it's enough items to move the buffer bookends outside viewport)
   * This will default to 1/4th of virtualizerLength if no size is provided.
   */
  bufferItems?: number;

  /**
   * The length (in pixels) before the end/start where the virtualizer will be triggered.
   * You can increase this if you wish for the virtualization to recalculate earlier.
   * You will need to ensure there is a large enough virtualizerLength to prevent
   * both start & end bufferSize from entering the viewport at the same time.
   */
  bufferSize?: number;

  /**
   * This is not intended to be used in the majority of scenarios.
   *
   * The Intersection observer bookends are capable of relative math to dictate start/end pos.
   * We have access to the bounding and client box of the 'before' and 'after' divs,
   * which know their local start position even if offset.
   *
   * We this for Intersection Observer root specific issues if needed.
   */
  intersectionObserverRoot?: MutableRefObject<HTMLElement | null>;

  /**
   * The scroll direction (vertical vs horizontal)
   */
  horizontal?: boolean;

  /**
   * Tells the virtualizer to measure in the reverse direction (for column-reverse order etc.)
   */
  reversed?: boolean;

  /**
   * Callback for acquiring size of individual items
   * @param index - the index of the requested size's child
   */
  getItemSize?: (index: number) => number;

  /**
   * Notify users of index changes
   */
  onUpdateIndex?: (index: number, prevIndex: number) => void;

  /**
   * Allow users to intervene in index calculation changes
   */
  onCalculateIndex?: (newIndex: number) => number;
};
