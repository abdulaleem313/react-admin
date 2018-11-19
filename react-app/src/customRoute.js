import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard'; 
import UserListing from './userListing'; 
import CreateUser from './users/create-user'; 
import UpdateUser from './users/update-user'; 

import CreateCategory from './categories/create-category'; 

export default [
    <Route exact path="/dashboard" component={Dashboard} />, 
    <Route exact path="/users" component={UserListing} />, 
    <Route exact path="/create-user" component={CreateUser} />, 
    <Route exact path="/update-user/:id" component={UpdateUser} />,
     
    <Route exact path="/category/create" component={CreateCategory} />, 
];
