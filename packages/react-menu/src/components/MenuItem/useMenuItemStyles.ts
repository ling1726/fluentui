import { ax, makeStyles } from '@fluentui/react-make-styles';
import { MenuItemState } from './MenuItem.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    // TODO when introducing secondary text right padding might need to change
    paddingRight: '12px',
    paddingLeft: '12px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.global.type.fontSizes.base[300],
    cursor: 'pointer',

    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },
  }),
  disabled: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  }),
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  submenuIndicator: {
    width: '20px',
    height: '20px',
    marginLeft: 'auto',
  },

  iconRightPadding: {
    paddingRight: '8px',
  },
});

/** Applies style classnames to slots */
export const useMenuItemStyles = (state: MenuItemState) => {
  const styles = useStyles();
  state.className = ax(
    styles.root,
    state.disabled && styles.disabled,
    state.hasSubmenu && styles.iconRightPadding,
    state.className,
  );

  if (state.icon) {
    state.icon.className = ax(styles.icon, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = ax(styles.submenuIndicator, state.submenuIndicator.className);
  }
};
