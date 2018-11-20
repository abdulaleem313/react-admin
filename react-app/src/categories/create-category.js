import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import axios from '../http-interceptor';
import {
    Card, 
    TextField, 
    CardContent, 
    Button, Checkbox, Select, MenuItem, MenuList} from '@material-ui/core'; 
import { Title } from 'react-admin'; 

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexFlow: 'column',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    selectDropdown: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    submitButton:{
        width: 200,
    }
  });

  let handleChange = (v) => {
    console.log(v) 
}
class TextFields extends React.Component {
    state = { 
        // age: 10,
        has_admin_permission: true,
    };
    formValues = {
        name:'',
    };
    isEmailError = false;
    uploadUrl = 'http://52.52.236.205:4000/api/upload/s3/category';

    handleChange = name => event => {
        if(name=='has_admin_permission') {
            this.setState({
            [name]: event.target.checked,
            });
        }else
        this.setState({
          [name]: event.target.value,
        });
        setTimeout(()=> console.log(this.state), 0)
        if(name=='email') {
            this.isEmailError = this.email(event.target.value);
        }
        
        // this.formValues.name =  event.target.value
    }; 
    submitForm = () => {
        console.log('submit form:', this.state)
        const reqObj = Object.assign({}, this.state)
        reqObj.has_admin_permission = reqObj.has_admin_permission ? 1 : 0;
        reqObj.has_customer_permission = 1;
        reqObj.has_delivery_permission = 1;
        reqObj.has_menu_permission = 1;
        reqObj.has_marketing_permission = 1;
        reqObj.has_production_permission = 1;
        reqObj.has_accounting_permission = 1;
        console.log('reqObj  :', reqObj)

        return axios.post(`http://52.52.236.205:4000/api/categories`, reqObj)
        .then( (response) => { 
            console.log('response', response); 
        })
        .catch( (error) => { 
            console.log('error', error); 
        })
        .then(function () {
            console.log('response1212'); 
        });
    }
    email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : false
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <Title title="Create Category (simple form)" />  
                <CardContent className={classes.container}>
                 
                    <TextField
                        id="standard-name"
                        label="Name"  
                        error = {!this.state.name}
                        onChange={this.handleChange('name')}
                        className={classes.textField}
                        margin="normal"/>  
                    <TextField
                        id="standard-name1"
                        label="Email" 
                        type="email"
                        error = {this.isEmailError}
                        onChange={this.handleChange('email')}
                        className={classes.textField}
                        margin="normal"/> 
                    <TextField
                        id="standard-name2"
                        label="Password"  
                        type="password"
                        onChange={this.handleChange('password')}
                        className={classes.textField}
                        margin="normal"/> 
                    {/* <Select
                        className={classes.selectDropdown}
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        inputProps={{
                        name: 'age',
                        id: 'age-simple',
                        }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                    <input
  type="file"
  onChange={
    ( e ) => {      
      e.preventDefault();
      const { fields } = this.props;

      
      console.log(this.props)
      let data = new FormData();
    //   data.append('file', files[0], files[0].name); 
    //   const config = {
    //       headers: { 'content-type': 'multipart/form-data' }
    //   }
    //   axios.post(this.uploadurl, data, config).then(resp=>{
    //       formData.src = s3Url + resp.data.data;
    //       // console.log(formData) 
    //       // this.setState({src: formData.src }) ;
          

    //   })  
    //   axios.post(``, reqObj)
    //     .then( (response) => { 
    //         console.log('response', response); 
    //     })
    //     .catch( (error) => { 
    //         console.log('error', error); 
    //     })
    //     .then(function () {
    //         console.log('response1212'); 
    //     });
    }
  }
/>
                    <div className={classes.textField}>

                        Admin Permission
                        <Checkbox   
                            id="has_admin_permission"
                            label="has_admin_permission"  
                            checked={this.state.has_admin_permission}
                            onChange={this.handleChange('has_admin_permission')} 

                        />
                    </div>
                    <Button variant="outlined" 
                        className={classes.submitButton} onClick={this.submitForm}>
                        Submit
                    </Button>
                </CardContent>             
            </Card>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(TextFields);