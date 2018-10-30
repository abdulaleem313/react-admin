import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import { translate, userLogout as userLogoutAction } from 'ra-core';
 
const Logout = () => (
    <MenuItem >
        <span>
            <ExitIcon />
        </span> 
    </MenuItem>
);
  
export default Logout;