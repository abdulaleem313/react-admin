
import React from 'react';

import { fetchUtils, Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import Dashboard from './dashboard';
import { PostList } from './posts';
import Menu from './menu';
import Login from './Login';
import Logout from './logout';

import { CategoryList, CategoryEdit, CategoryIcon, CategoriesCreate } from './categories';

import customRoutes from './customRoute';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    // options.headers.set('Access-Control-Expose-Headers', 'Content-Range');
    // options.headers.set('Content-Range', 'posts 0-24/319');
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('http://localhost:3333', httpClient);
 

    // logoutButton={Logout}

const App = () => (
    <Admin 
    customRoutes={customRoutes}
    dashboard={Dashboard} 
    menu={Menu}
    loginPage={Login}
    dataProvider={dataProvider}>
        <Resource name="posts" options={{ label: 'data' }} list={PostList} />
        <Resource name="user1s" list={PostList} /> 
        <Resource
            name="categories"
            list={CategoryList}
            edit={CategoryEdit}
            icon={CategoryIcon}
            create={CategoriesCreate}
        />
    </Admin>
);

export default App;