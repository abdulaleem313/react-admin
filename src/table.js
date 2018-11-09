import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Authenticated, LinearProgress  } from 'react-admin';
import { Route, Redirect } from 'react-router'
import axios from './http-interceptor';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'zf_name', numeric: false, disablePadding: false, label: 'Name' }, 
  { id: 'zf_email', numeric: false, disablePadding: true, label: 'Email' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    console.log('my props', this.props)
    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric} 
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    height: '100vh',
    position: 'relative'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative'
  },
  tableToolBar : {
    justifyContent: 'space-between',
    display: 'flex',
  },
  linearProgress: {
    width: '100%', 
    position: 'absolute',
    marginTop: 0
  },
  textField: {
    margin: '20px;'
  },
  createButton: {
    margin: '10px'
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'calories',
    sort: 'zf_id' , 
    selected: [],
    data: [ 
    ],
    page: 0,
    rowsPerPage: 5,
    totalCount: 0,
    search: '',
    showLoading: false, 
    redirectToEditUser: false,
    redirectToCreateUser: false,
  };
  componentDidMount = () => { 
    this.getData();
  }
  getData = () => {
    this.setState({showLoading: true})
        // Make a request for a user with a given ID
    // axios.get('http://localhost:3333/categories')
    // http://localhost:3000/api/users?page=1&limit=1
    // axios.get(`http://localhost:3003/api/users?_p=${this.state.page + 1}&_size=${this.state.rowsPerPage}`)
    let reqUrl = `http://52.52.236.205:4000/api/users?page=${this.state.page + 1}&limit=${this.state.rowsPerPage}&sort=${this.state.sort}&order=${this.state.order}`;
    if (this.state.search !== undefined && this.state.search !== '') {
      reqUrl += `&search=${this.state.search}`;
    }
    axios.get(reqUrl, {})

      .then( (response) => {
        // handle success 
        console.log(response); 
        this.setState({
          showLoading: false,
          data: response.data.data,
          totalCount: response.data.metadata.totalCount
        })
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  handleRequestSort = (event, property) => {
    console.log(event, property)
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
    this.setState({ sort: property });
    this.getData();

  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    } 
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    setTimeout(()=>{
      console.log(this.state.page)
      this.getData();
    }, 0);
  };

  handleChangeRowsPerPage = event => {
    console.log(event)
    this.setState({ rowsPerPage: event.target.value });
    setTimeout(()=>{
      console.log(this.state.page)
      this.getData();
    }, 0);
  };
  handleChange = name => event => { 
    this.setState({
      [name]: event.target.value,
    });
    setTimeout(()=>{ 
      this.getData();
    }, 0);
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  redirectToCreateUser = ()=> {
    console.log('redir')
    this.setState({redirectToCreateUser: true});
  }
  editUser = (n)=> (e) => {
    console.log('editUser:', n, e)
    this.setState({redirectToEditUser: true, userId: n.zf_id});
  }
  render() {
    const { classes } = this.props;
    console.log('my props', this.props)
    const { data, order, orderBy, selected, rowsPerPage, page, totalCount } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let IsLoading = <div className={classes.linearProgress}></div>  
    if (this.state.showLoading) {
      IsLoading = <LinearProgress  className={classes.linearProgress}/>
      console.log('show loading')
    }
    console.log('sdsdshow loading')
 
    let a = (
    <Authenticated authParams={{ role: 'admin' }}>
      <Paper className={classes.root}>
      {IsLoading}
        <div className={classes.tableWrapper}> 
        
          <div className={classes.tableToolBar}>

            <TextField source="search" 
            value={this.state.search}
            placeholder="search"
            onChange={this.handleChange('search')}
            className={classes.textField} />
 
            <Button variant="outlined" color="secondary" className={classes.createButton} onClick={this.redirectToCreateUser}>
              Create User
            </Button>

          </div>

          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy} 
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {
                // stableSort(data, getSorting(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                data.map(n => {
                  // console.log('is called with', n)
                  const isSelected = this.isSelected(n.zf_id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.zf_id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.zf_id}
                      selected={isSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell> */}
                      <TableCell component="th" scope="row" onClick={this.editUser(n)}>
                        {n.zf_name}
                      </TableCell>
                      <TableCell component="th" scope="row" >
                        {n.zf_email}
                      </TableCell>
                      {/* <TableCell>{n.role==='admin' ? 'i am admin' : 'not admni'}</TableCell>  */}
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />  

      </Paper>
      </Authenticated>
    );
    console.log('this.state.redirectToCreateUser', this.state.redirectToCreateUser)
    if(this.state.redirectToCreateUser) {
      a = <Redirect to="/create-user"/>
    }
    if(this.state.redirectToEditUser) {
      let link = '/update-user/' + this.state.userId;
      a = <Redirect to={link}/>
    }
    return a;
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
