import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { keyboardKey } from '@fluentui/keyboard-key';
import { render, fireEvent } from '@testing-library/react';
import { useTriggerElement } from './useTriggerElement';
import { MenuContextValue, useMenuContext } from '../../contexts/menuContext';
import { MenuItem } from '../MenuItem/index';

jest.mock('../../contexts/menuContext');

describe('useTriggerElement', () => {
  const mockUseMenuContext = (options: Partial<MenuContextValue> = {}) => {
    const contextValue: Partial<MenuContextValue> = {
      triggerRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      menuPopupRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      setOpen: jest.fn(),
      ...options,
    };

    (useMenuContext as jest.Mock).mockImplementation(selector => selector(contextValue));
  };

  const testOriginalEventHandlerExists = (handlerName: string, triggerEvent: (el: HTMLElement) => void) => {
    // Arrange
    mockUseMenuContext();
    const spy = jest.fn();
    const props = { [handlerName]: spy };
    const triggerButton = <button {...props}>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

    // Act
    const { getByRole } = render(result.current.children);
    triggerEvent(getByRole('button'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  };

  beforeEach(() => {
    mockUseMenuContext();
  });

  describe('on click', () => {
    it('should use original click handler', () => testOriginalEventHandlerExists('onClick', fireEvent.click));

    it('should open menu', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.click(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should not open menu if child is disabled', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.click(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('on hover', () => {
    it('should use original on mouse enter handler', () =>
      testOriginalEventHandlerExists('onMouseEnter', fireEvent.mouseEnter));

    it('should use original on blur handler', () => testOriginalEventHandlerExists('onBlur', fireEvent.blur));

    it.each([
      ['click', true, fireEvent.click],
      ['mouseenter', true, fireEvent.mouseEnter],
      ['blur', false, fireEvent.blur],
    ])('should on %s event call setOpen with %s when onHover is set', (_, expectedValue, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedValue);
    });

    it.each([
      ['click', fireEvent.click],
      ['mouseenter', fireEvent.mouseEnter],
      ['blur', fireEvent.blur],
    ])('should not call setOpen on %s event when onHover is set', (_, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onHover: true });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('on context', () => {
    it('should use original on context menu handler', () =>
      testOriginalEventHandlerExists('onContextMenu', fireEvent.contextMenu));

    it.each([
      ['click', fireEvent.click],
      ['mouseenter', fireEvent.mouseEnter],
      ['mouseleave', fireEvent.mouseLeave],
    ])('should not call setOpen on %s', (_, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onContext: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).not.toHaveBeenCalled();
    });

    it('should open menu', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onContext: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.contextMenu(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should not open menu if child is disabled', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onContext: true });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.contextMenu(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  it('should pass user id prop', () => {
    // Arrange
    mockUseMenuContext();
    const id = 'test';
    const props = { id };
    const triggerButton = <button {...props}>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

    // Act
    const { getByRole } = render(result.current.children);

    // Assert
    expect(getByRole('button').getAttribute('id')).toEqual(id);
  });

  it('should open menu on right arrow for submenu trigger', () => {
    // Arrange
    const spy = jest.fn();
    mockUseMenuContext({ setOpen: spy, isSubmenu: true });
    const menuitem = <MenuItem>Trigger button</MenuItem>;
    const { result } = renderHook(() => useTriggerElement({ children: menuitem }));

    // Act
    const { getByRole } = render(result.current.children);
    fireEvent.keyDown(getByRole('menuitem'), { keyCode: keyboardKey.ArrowRight });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should open menu on down arrow for root trigger', () => {
    // Arrange
    const spy = jest.fn();
    mockUseMenuContext({ setOpen: spy, isSubmenu: false });
    const trigger = <button>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: trigger }));

    // Act
    const { getByRole } = render(result.current.children);
    fireEvent.keyDown(getByRole('button'), { keyCode: keyboardKey.ArrowDown });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
