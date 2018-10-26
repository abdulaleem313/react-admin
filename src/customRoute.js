import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard'; 
import UserListing from './userListing'; 

export default [
    <Route exact path="/dashboard" component={Dashboard} />, 
    <Route exact path="/users" component={UserListing} />, 
];
