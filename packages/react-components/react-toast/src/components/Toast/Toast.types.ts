import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Announce } from '../AriaLive/AriaLive.types';
import { Toast as VanillaToast } from '../../state';
import { ToastContextValue } from '../../contexts/toastContext';

export type ToastContextValues = {
  toast: ToastContextValue;
};

export type ToastSlots = {
  root: Slot<'div'>;
};

/**
 * Toast Props
 */
export type ToastProps = ComponentProps<ToastSlots> &
  VanillaToast & {
    visible: boolean;
    announce: Announce;
  };

/**
 * State used in rendering Toast
 */
export type ToastState = ComponentState<ToastSlots> &
  Pick<ToastProps, 'remove' | 'close' | 'updateId' | 'visible'> & {
    transitionTimeout: number;
    timerTimeout: number;
    running: boolean;
    onTransitionEntering: () => void;
    nodeRef: React.Ref<HTMLDivElement>;
  };
