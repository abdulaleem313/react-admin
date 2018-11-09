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
    ImageField,
    DateInput,
    ImageInput,
    DateField,
    DisabledInput,
    LongTextInput,
    Filter,
    FileInput,
    FileField,
    SelectInput,
    BooleanInput,
    FormDataConsumer,
    DateTimeInput,
} from 'react-admin'; 
import Dropzone from 'react-dropzone'
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

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
    </CardActions>
);
const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />  
    </Filter>
);
export const CategoryList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props}  filters={<PostFilter />}  actions={<PostActions/>}  bulkActionButtons ={null} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" className={classes.name} /> 
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
));

const CategoryTitle = translate(({ record, translate }) => (
    <span>Category
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
        <SimpleForm>
            <TextInput source="name" />  
        </SimpleForm>
    </Edit>
)};
const fileDroped = (props) => {
    console.log('props')
}
export const CategoriesCreate = (props) => {
    console.log('categ', props)
    let uploadurl = 'https://www.favoriterun.com/api/upload';
    let s3Url = 'https://favoriterun.s3.amazonaws.com/images/';
    let imgUrl = s3Url + '009ec5f0-e41d-11e8-ac70-7d9bca0ad2e5.png';

    return (
    <Create title={<CategoryTitle />} redirect="view" {...props}>
        <SimpleForm  >
            <TextInput source="name" /> 
            <TextInput source="description" />  
            
            <FormDataConsumer> 
                {({ formData, ...rest }) => {
                    return <ImageInput  
                        source="pictures" label="Related pictures" accept="image/*" 
                        options ={
                            {
                                onDrop: (files,b, c)=>{ 
                                    console.log(files)
                                    let data = new FormData();
                                    data.append('file', files[0], files[0].name); 
                                    const config = {
                                        headers: { 'content-type': 'multipart/form-data' }
                                    }
                                    axios.post(uploadurl, data, config).then(resp=>{
                                        formData.src = s3Url + resp.data.data;
                                        // console.log(formData) 
                                        // this.setState({src: formData.src }) ;
                                        

                                    })  
                                    return files
                                }
                            }
                        } > 
                        <ImageField source="src" src="url" title="title" />
                    </ImageInput>  
                }}
            </FormDataConsumer> 
            {/* <SelectInput source="category" choices={[
                { id: 'programming', name: 'Programming' },
                { id: 'lifestyle', name: 'Lifestyle' },
                { id: 'photography', name: 'Photography' },
            ]} /> */}
            {/* <BooleanInput source="hasEmail" /> */}
            <FormDataConsumer> 
                {({ formData, ...rest }) => { 
                    console.log(formData)
                    return formData.description ==='showEmail' &&
                <TextInput source="email" {...rest} /> }}
            </FormDataConsumer>
            {/* <DateTimeInput validate={(v)=>console.log(v)} source="published_at" /> */}
        </SimpleForm>
    </Create>
)};
