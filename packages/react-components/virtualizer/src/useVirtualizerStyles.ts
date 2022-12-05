import { makeStyles, mergeClasses } from '@griffel/react';
import { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const virtualizerClassName = 'fui-Virtualizer';
export const virtualizerClassNames: SlotClassNames<VirtualizerSlots> = {
  before: 'fui-Bookend-Before',
  beforeContainer: 'fui-Bookend-BeforeContainer',
  after: 'fui-Bookend-After',
  afterContainer: 'fui-Bookend-AfterContainer',
};

const useStyles = makeStyles({
  beforeHorizontal: {
    position: 'relative',
    minHeight: '100%',
    pointerEvents: 'none',
  },
  afterHorizontal: {
    position: 'relative',
    minHeight: '100%',
    pointerEvents: 'none',
  },
  beforeVertical: {
    position: 'relative',
    minWidth: '100%',
    pointerEvents: 'none',
  },
  afterVertical: {
    position: 'relative',
    minWidth: '100%',
    pointerEvents: 'none',
  },
  beforeContainerHorizontal: {
    display: 'block',
    minHeight: '100%',
    pointerEvents: 'none',
  },
  afterContainerHorizontal: {
    display: 'block',
    minHeight: '100%',
    pointerEvents: 'none',
  },
  beforeContainerVertical: {
    display: 'block',
    minWidth: '100%',
    pointerEvents: 'none',
  },
  afterContainerVertical: {
    display: 'block',
    minWidth: '100%',
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Virtualizer states
 */
export const useVirtualizerStyles_unstable = (state: VirtualizerState): VirtualizerState => {
  const styles = useStyles();
  const { isHorizontal } = state;

  if (state.before) {
    state.before.className = mergeClasses(
      // virtualizerClassName,
      isHorizontal ? styles.beforeHorizontal : styles.beforeVertical,
      state.before.className,
    );
  }

  if (state.after) {
    state.after.className = mergeClasses(
      // virtualizerClassName,
      isHorizontal ? styles.afterHorizontal : styles.afterVertical,
      state.after.className,
    );
  }

  if (state.beforeContainer) {
    state.beforeContainer.className = mergeClasses(
      // virtualizerClassName,
      isHorizontal ? styles.beforeContainerHorizontal : styles.beforeContainerVertical,
      state.beforeContainer.className,
    );
  }

  if (state.afterContainer) {
    state.afterContainer.className = mergeClasses(
      // virtualizerClassName,
      isHorizontal ? styles.afterContainerHorizontal : styles.afterContainerVertical,
      state.afterContainer.className,
    );
  }

  return state;
};
