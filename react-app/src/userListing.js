import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import SimpleTable from './table';
export default () => (
    <Card>
        {/* <Title title="Welcome to the user listing" /> */}
        <SimpleTable/> 
    </Card>
);