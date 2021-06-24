import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';// eslint-disable-line
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, Grid,FormControl, MenuItem, InputLabel, Select,TextField, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Button} from '@material-ui/core/';
import {Toolbar, Typography, Paper, Tooltip, FormControlLabel, Switch} from '@material-ui/core/';
import { Edit, Delete, Search, Add } from '@material-ui/icons/';
import clickRow from './actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux';
import { actDeleteWeddingRequest } from '../../action/index'
import addState from './actions/weddingState/add';
import editState from './actions/weddingState/edit';
import { NORMAL } from './reducers/weddingState';
import { useSnackbar } from 'notistack';
import {green, indigo, red} from '@material-ui/core/colors';
import { getCookie } from '../../action/Login'

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
  { id: 'groomName', numeric: false, disablePadding: true, label: 'Tên chú rể' },
  { id: 'brideName', numeric: false, disablePadding: false, label: 'Tên cô dâu' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Điện thoại' },
  { id: 'lobbyName', numeric: false, disablePadding: false, label: 'Sảnh' },
  { id: 'dateOfOrganization', numeric: true, disablePadding: false, label: 'Ngày đãi tiệc' },
  { id: 'nameShift', numeric: true, disablePadding: false, label: 'Ca' },
  { id: 'note', numeric: true, disablePadding: false, label: 'Ghi chú' },
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
  const { numSelected, selectedRow } = props;
  const currentWeddingState = useSelector(state => state.weddingState);
  const dispatch = useDispatch();
  const privileges = JSON.parse(getCookie("privileges"))

  const canUpdateWedding = (permission) => permission.authority === "UPDATE_FEAST"
  const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
  const onDeleteWedding = () => {
    if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
      dispatch(actDeleteWeddingRequest(selectedRow.id, deleteWeddingSuccess, deleteWeddingFailure));
    }
  }

  const deleteWeddingSuccess = () => {
        handleClickVariant("success", "Xoá tiệc cưới thành công!")
    }

    const deleteWeddingFailure = () => {
        handleClickVariant("error", "Lỗi hệ thống. Xoá tiệc cưới thất bại!")
    }

  const changeToAddState = () => {
      if (currentWeddingState.state === NORMAL) {
          dispatch(clickRow([]))
          dispatch(addState());
          document.getElementById("formWedding").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});            
      }
      else {
          alert("Bạn phải hoàn thành / hủy bỏ tác vụ thêm / sửa tiệc cưới!");
      }
  }

  const changeToEditState = () => {
      if (currentWeddingState.state === NORMAL) {
          dispatch(editState());
          document.getElementById("formWedding").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});            
      }
      else {
          alert("Bạn phải hoàn thành / hủy bỏ tác vụ thêm / sửa tiệc cưới!");
      }
  }

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      {(
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Danh sách tiệc cưới
        </Typography>
      )}

      { currentWeddingState.state === NORMAL && privileges.some(canUpdateWedding) ?  (numSelected > 0 ? (
        <>
            <Tooltip title="Chỉnh sửa">
              <Button
              aria-label="editWedding"
              variant="contained"
              className={classes.button}
              startIcon={<Edit style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
              style={{ borderRadius: 10, backgroundColor: indigo[400], fontSize: "10px", color: "#fff", width: 140, marginRight: "10px" }}
              onClick={changeToEditState}>
                Sửa tiệc
              </Button>
            </Tooltip>
            <Tooltip title="Xóa">
              <Button
                aria-label="deleteWedding"
                variant="contained"
                className={classes.button}
                startIcon={<Delete style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                style={{ borderRadius: 10, backgroundColor: red[400], fontSize: "10px", color: "#fff", width: 150, marginRight: "10px" }}
                onClick={onDeleteWedding}>
                  Xóa tiệc
            </Button>
            </Tooltip>
            <Tooltip title="Thêm">
            <Button
                aria-label="addWedding"
                variant="contained"
                className={classes.button}
                startIcon={<Add style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 150 }}
                onClick={changeToAddState}>
                  Thêm tiệc
            </Button>
        </Tooltip>
        </>
      ) : (
          <Tooltip title="Thêm">
          <Button
                aria-label="addWedding"
                variant="contained"
                className={classes.button}
                startIcon={<Add style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 140, marginRight: "10px" }}
                onClick={changeToAddState}>
                  Thêm tiệc
            </Button>
        </Tooltip>
      )) : <></>}
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
  table: {
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
}));


function EnhancedTable(props) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState( {
    searchValue: '',
    data: props.weddings,
    filterData: props.weddings,
  });
  useEffect(() => {
    if (props.weddings)
      setState({...state, data: (props.weddings), filterData: (props.weddings)});
  }, [props.weddings])// eslint-disable-line
  rows = state.filterData;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState( 'groomName');
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchKind, setSearchKind] = React.useState({name: 'Tên chú rể', kind: 'groomName'});
  const searchKindPropertyName = name => {
    switch(name) {
      case 'Tên chú rể':
        return 'groomName';
      case 'Tên cô dâu':
        return 'brideName';
      case 'Số điện thoại':
        return 'phone';
      default:
        return 'groomName'
    }
  }

  const handleSearch = (event) => {
      let filteredDatas = [];
      filteredDatas = state.data.filter((e) => {
          let retVal = true;
          let element = e[searchKind.kind];
          const regex = new RegExp(event.target.value, 'gi');
          if (typeof element == 'string')
              retVal = element.match(regex)
          else return false;
          return retVal;
      })
      setState({...state, filterData: filteredDatas, searchValue: event.target.value})
  }

  const handleChange = (event) => {
      setSearchKind({name: event.target.value, kind: searchKindPropertyName(event.target.value)});
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  console.log('sort')
    console.log(rows);
  const handleClick = (event, id, row) => {
    row = {...row, weddingDate: convertDateToStringMDY(row.weddingDate), dateOfOrganization: convertDateToStringMDYNew(row.dateOfOrganization)}
    dispatch(clickRow(row));
    setSelectedRow(row);
    setSelected([id]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Grid container spacing={2} direction='row'>
      <Grid item xs={12} md={7}>
          <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={3} align='right'>
                  <Search />
              </Grid>
              <Grid item xs={9}>
                  <TextField 
                      id="searchWedding" 
                      fullWidth 
                      label={"Tìm kiếm theo " + searchKind.name.toLowerCase()}
                      onChange={handleSearch}
                      InputProps={{
                          classes: {
                              input: classes.resize,
                          },
                      }} />
              </Grid>
          </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
          <FormControl className={classes.formControl} style={{minWidth: 300}} >
              <InputLabel id="select-search-kind-label" >Tìm kiếm theo</InputLabel>
              <Select
              fullWidth
              labelId="select-search-kind-label"
              id="select-search-kind"
              value={searchKind.name}
              onChange={handleChange}
              label="Tìm kiếm theo"
              >
              <MenuItem value={'Tên chú rể'}>Tên chú rể</MenuItem>
              <MenuItem value={'Tên cô dâu'}>Tên cô dâu</MenuItem>
              <MenuItem value={'Số điện thoại'}>Số điện thoại</MenuItem>
              </Select>
          </FormControl>
      </Grid>
    <Grid item xs={12}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} selectedRow={selectedRow} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
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
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        onDoubleClick={() => document.getElementById("formWedding").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})}
                      >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.groomName}
                        </TableCell>
                        <TableCell align="left">{row.brideName}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">{row.lobbyName}</TableCell>
                        <TableCell align="right">{convertDateToStringDMYNew(row.dateOfOrganization)}</TableCell>
                        <TableCell align="right">{row.nameShift}</TableCell>
                        <TableCell align="right">{row.note}</TableCell>    
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
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Khoảng cách dòng"
        />
      </div>
    </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
    return {
        weddings : state.weddings
    }
}
function convertDateToStringMDY(date) {
    if (date == null) return;
        let day = date.substring(0, 2);
        let month = date.substring(3, 5);
        let year = date.substring(6, 10);
        let result = month + "/" + day + "/" +  year;
        return result;
}

function convertDateToStringMDYNew(date) {
    if (date == null) return;
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);
        let result = month + "/" + day + "/" +  year;
        return result;
}

function convertDateToStringDMYNew(date) {
    if (date == null) return;
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);
        let result = day + "/" +month + "/" +  year;
        return result;
}

export default connect(mapStateToProps, null)(EnhancedTable);