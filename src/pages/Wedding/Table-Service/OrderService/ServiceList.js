import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, Grid, TextField, TableHead, TablePagination, TableRow, TableSortLabel} from '@material-ui/core/';
import {Toolbar, Typography, Paper} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'material-ui-image'
import Popover from '@material-ui/core/Popover';
import editState from '../../actions/serviceState/edit'
import Search from '@material-ui/icons/SearchOutlined';
import { connect } from 'react-redux';
import { EDIT_ORDER_SERVICE } from '../../reducers/serviceState';
import clickRowService from '../../actions/clickRowService';
import NumberFormat from 'react-number-format';

var rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên dịch vụ' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Đơn giá' },
  { id: 'serviceKind', numeric: false, disablePadding: false, label: 'Loại dịch vụ' },
  { id: 'moreInfo', numeric: false, disablePadding: false, label: 'Ghi chú' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          Đã chọn {numSelected}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="foodTitle" component="div">
          Danh sách dịch vụ
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  food: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  popover: {
    pointerEvents: 'none',
  },
  paperPopover: {
    padding: theme.spacing(1),
  },
  image: {
    width: '200px',
    height: '200px'
  }
}));



function ServiceList(props) {
  const dispatch = useDispatch();
  const currentServiceState = useSelector(state => state.serviceState);
  const [state, setState] = React.useState( {
    searchValue: '',
    data: props.services,
    filterData: props.services,
  });
  const handleSearch = (event) => {
      let filteredDatas = [];
      filteredDatas = state.data.filter((e) => {
          let retVal = true;
          let element = e["name"];
          const regex = new RegExp(event.target.value, 'gi');
          if (typeof element == 'string')
              retVal = element.match(regex)
          else return false;
          return retVal;
      })
      setState({...state, filterData: filteredDatas, searchValue: event.target.value})
  }
  useEffect(() => {
    if (props.services)
      setState({...state, data: (props.services), filterData: (props.services)});
  }, [props.services]) //eslint-disable-line
  rows = state.filterData;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState( 'price');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState('http://lorempixels.com/1600/900/nature/');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, row) => {
    if (currentServiceState.state !== EDIT_ORDER_SERVICE) {
      dispatch(editState());
      dispatch(clickRowService(row));
    }
    console.log('service click')
    console.log(row)
    setSelected(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event, foodImage) => {
    setSelectedImage(foodImage);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
    <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={1} align='right'>
              <Search />
          </Grid>
          <Grid item xs={4}>
              <TextField 
                  id="search" 
                  fullWidth 
                  label={"Tìm kiếm theo tên dịch vụ"}
                  onChange={handleSearch}
                  InputProps={{
                      classes: {
                          input: classes.resize,
                      },
                  }} />
          </Grid>
      </Grid>
    <div className={classes.root}>
      <Popover
        className={classes.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <div className={classes.image}>
          <Image src={selectedImage} />
        </div>
      </Popover>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            className={classes.food}
            aria-labelledby="foodTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced food"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-food-checkbox-${index}`;
                  return (
                    <TableRow
                      onMouseEnter={(event) => handlePopoverOpen(event, row.img)}
                      onMouseLeave={handlePopoverClose}
                      hover
                      onClick={(event) => handleClick(event, row.name, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none"> 
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        <NumberFormat value={row.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                      </TableCell>
                      <TableCell align="left">{row.serviceKind}</TableCell>
                      <TableCell align="left">{row.moreInfo}</TableCell>  
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </>
  );
}
// const mapStateToProps = state => {
//     return {
//         foods : state.foods
//     }
// }


export default connect(null, null)(ServiceList);