import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuDivider } from '@fluentui/react-menu';
import { Button } from '@fluentui/react-button';
import { Text } from '@fluentui/react-text';
import { Avatar } from '@fluentui/react-avatar';
import { PresenceBadge } from '@fluentui/react-badge';
import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AddWorkIcon, MoreIcon, StatusCircleRingIcon, AddFriendIcon } from '@fluentui/react-icons-mdl2';
import { ExcelLogoIcon } from '@fluentui/react-icons-mdl2-branded';

const useHeaderStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '12px',
  },

  button: {
    border: 'none',
  },

  company: theme => ({
    fontWeight: theme.global.type.fontWeights.semibold,
  }),

  signOut: theme => ({
    fontWeight: theme.global.type.fontWeights.regular,
  }),
});

const usePersonaStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    paddingRight: '12px',
  },

  avatar: {
    marginRight: '8px',
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },

  more: {
    border: 'none',
  },

  name: theme => ({
    fontWeight: theme.global.type.fontWeights.semibold,
  }),

  rootWithSubmenu: {
    paddingRight: 0,
  },
});

export const MeMenuExample = () => {
  const headerStyles = useHeaderStyles();
  const personaStyles = usePersonaStyles();

  return (
    <Menu>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuList>
        <div className={headerStyles.root}>
          <Text className={headerStyles.company}>Microsoft</Text>
          <MenuItem className={headerStyles.button}>
            <Text variant="caption">Sign out</Text>
          </MenuItem>
        </div>

        <div className={personaStyles.root}>
          <Avatar className={personaStyles.avatar} badge={<PresenceBadge status="busy" />} name="Kelly Goss" />
          <div className={personaStyles.details}>
            <Text className={personaStyles.name} variant="body">
              Kelly Goss
            </Text>
            <Text variant="caption">kellyg@microsoft.com</Text>
          </div>
        </div>

        <Menu onHover={false}>
          <MenuTrigger>
            <MenuItem>Available</MenuItem>
          </MenuTrigger>

          <MenuList>
            <MenuItem icon={<StatusCircleRingIcon />}>Available</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Busy</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Do not disturb</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Be right back</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Appear away</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Appear offline</MenuItem>
            <MenuDivider />
            <MenuItem icon={<StatusCircleRingIcon />}>Duration</MenuItem>
            <MenuItem icon={<StatusCircleRingIcon />}>Reset status</MenuItem>
          </MenuList>
        </Menu>
        <MenuItem>Set status message</MenuItem>
        <MenuItem>View account</MenuItem>
        <MenuDivider />
        <MenuItem icon={<ExcelLogoIcon />}>Microsoft</MenuItem>
        <MenuItem icon={<AddWorkIcon />}>Starbucks</MenuItem>
        <MenuItem icon={<AddWorkIcon />}>McDonalds</MenuItem>

        <div className={ax(personaStyles.root, personaStyles.rootWithSubmenu)}>
          <Avatar className={personaStyles.avatar} name="Kelly Goss" />
          <div className={personaStyles.details}>
            <Text className={personaStyles.name} variant="body">
              Contoso
            </Text>
            <Text variant="caption">kellyg@contoso.com</Text>
          </div>
          <Menu onHover={false}>
            <MenuTrigger>
              <MenuItem submenuIndicator={<MoreIcon />} />
            </MenuTrigger>
            <MenuList>
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </MenuList>
          </Menu>
        </div>

        <MenuItem icon={<AddFriendIcon />}>Add another account</MenuItem>
      </MenuList>
    </Menu>
  );
};
