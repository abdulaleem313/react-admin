import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    EditButton,
    List,
    Create,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
    DateInput,
    DateField,
    DisabledInput,
    LongTextInput,
} from 'react-admin'; 
 
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { CardActions, CreateButton, ExportButton, RefreshButton, DeleteButton } from 'react-admin';

export const CategoryIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};


const PostActions = ({
    bulkActions,
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter
}) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <CreateButton basePath='/categories' />
        <ExportButton
            resource={resource}
            sort={currentSort}
            filter={filterValues}
            exporter={exporter}
        /> 
        <RefreshButton /> 
    </CardActions>
);

export const CategoryList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props}  actions={<PostActions/>} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" className={classes.name} /> 
            <EditButton />
        </Datagrid>
    </List>
));

const CategoryTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.categories.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));
const handleSubmit = function(d) { 
    console.log('handleSubmit', d);  
    console.log('handleSubmit', this); 
    return d;
}


// const Aside = () => (
//     <div style={{ width: 200, margin: '1em' }}>
//         <Typography variant="title">Post details</Typography>
//         <Typography variant="body1">
//             Posts will only be published one an editor approves them
//         </Typography>
//     </div>
// )
// aside={<Aside />}
export const CategoryEdit = props => {
    console.log(props)
    return (
    <Edit  title={<CategoryTitle />}  {...props}>
        <SimpleForm handleSubmit={handleSubmit}>
            <TextInput source="name" />  
        </SimpleForm>
    </Edit>
)};

export const CategoriesCreate = (props) => {
 
    return (
    <Create title={<CategoryTitle />} redirect="view" {...props}>
        <SimpleForm  >
            <TextInput source="name" /> 
        </SimpleForm>
    </Create>
)};
