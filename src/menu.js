import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import { CategoryIcon } from './categories';
 

const Menu = ({ resources, onMenuClick, logout }) => (
    <div> 
        <MenuItemLink
            to="/dashboard"
            primaryText="Home"
            leftIcon={<HomeIcon />}
            onClick={onMenuClick} />
            <MenuItemLink
                to="/users"
                primaryText="Users"
                leftIcon={<GroupIcon />}
                onClick={onMenuClick} />
                
            <MenuItemLink
                to="/categories"
                primaryText="Categories"
                leftIcon={<CategoryIcon />}
                onClick={onMenuClick} />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));