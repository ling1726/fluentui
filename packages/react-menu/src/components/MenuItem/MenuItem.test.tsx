import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MenuItem } from './MenuItem';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';

describe('MenuItem', () => {
  isConformant({
    Component: MenuItem,
    displayName: 'MenuItem',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuItem>Default MenuItem</MenuItem>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should focus the item on mouseenter', () => {
    // Arrange
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Act
    const menuitem = getByRole('menuitem');
    fireEvent.mouseEnter(menuitem);

    // Assert
    expect(document.activeElement).toBe(menuitem);
  });

  it('should apply aria-disabled attribute if disabled prop is set', () => {
    // Arrange
    const { getByRole } = render(<MenuItem disabled>Item</MenuItem>);

    // Assert
    expect(getByRole('menuitem').getAttribute('aria-disabled')).toEqual('true');
  });

  it('should render submenu indicator icon if `hasSubmenu` prop is true', () => {
    // Arrange
    const slot = 'submenu';
    const { getByText } = render(
      <MenuItem submenuIndicator={slot} hasSubmenu>
        Item
      </MenuItem>,
    );

    // Assert
    getByText(slot);
  });

  it('should render submenu indicator icon if wrapped by menu trigger context', () => {
    // Arrange
    const slot = 'submenu';
    const { getByText } = render(
      <MenuTriggerContextProvider value={true}>
        <MenuItem submenuIndicator={slot}>Item</MenuItem>
      </MenuTriggerContextProvider>,
    );

    // Assert
    getByText(slot);
  });

  it.each([
    ['onClick', fireEvent.click],
    ['onKeyDown', fireEvent.keyDown],
    ['onKeyUp', fireEvent.keyUp],
  ])('should swallow %s events is `disabled` prop is set', (event, triggerEvent) => {
    // Arrange
    const spy = jest.fn();
    const eventProps = {
      [event]: spy,
    };
    const { getByRole } = render(
      <MenuItem disabled {...eventProps}>
        Item
      </MenuItem>,
    );

    // Act
    triggerEvent(getByRole('menuitem'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
