import React from 'react';

import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import Avatar from 'react-toolbox/lib/avatar';

import hcLogo from './hc-logo.svg';
import styles from './hc-header.css';

const HcHeader = () => (
  <div className={styles.appBarContents}>
    <div className={styles.header}>
      <img src={hcLogo} />
      <div className={styles.userMenu}>
        <Avatar icon='perm_identity' /> User Name
        <IconMenu icon='arrow_drop_down' position='auto'>
          <MenuItem caption='something' />
          <MenuItem caption='something else' />
        </IconMenu>
      </div>
    </div>
  </div>
);

export default HcHeader;
