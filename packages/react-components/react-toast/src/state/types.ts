import { EVENTS } from './constants';

export type ToastId = string;

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export interface ToastOptions {
  toastId: ToastId;
  position: ToastPosition;
  content: unknown;
  timeout: number;
  pauseOnWindowBlur: boolean;
  pauseOnHover: boolean;
}

export interface ToasterOptions
  extends Pick<ToastOptions, 'position' | 'timeout' | 'pauseOnWindowBlur' | 'pauseOnHover'> {
  offset?: number[];
  toasterId?: string;
}

export interface Toast extends ToastOptions {
  close: () => void;
  remove: () => void;
}

export interface ShowToastEventDetail extends Partial<ToastOptions> {
  toastId: ToastId;
}

export interface DismissToastEventDetail {
  toastId: ToastId | undefined;
}

export type ShowToastListener = (e: CustomEvent<ShowToastEventDetail>) => void;
export type DismissToastListener = (e: CustomEvent<ShowToastEventDetail>) => void;

export type ToastListenerMap = {
  [EVENTS.show]: ShowToastListener;
  [EVENTS.dismiss]: DismissToastListener;
};
