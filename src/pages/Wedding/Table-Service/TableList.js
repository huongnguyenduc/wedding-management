import React , { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';// eslint-disable-line
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Grid, TextField, Button} from '@material-ui/core/';
import {Toolbar, Typography, Paper,Tooltip, FormControlLabel, Switch} from '@material-ui/core/';
import { Edit, Delete, Add, Search } from '@material-ui/icons/';
import clickRowTable from '../actions/clickRowTable'
import { useDispatch, useSelector, connect } from 'react-redux'
import addState from '../actions/tableState/add';
import editState from '../actions/tableState/edit';
import { NORMAL } from '../reducers/tableState';
import {actDeleteTableRequest} from '../../../action/table'
import { useSnackbar } from 'notistack';
import NumberFormat from 'react-number-format';
import {green, indigo, red} from '@material-ui/core/colors';

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
  { id: 'tableKind', numeric: false, disablePadding: true, label: 'Loại bàn' },
  { id: 'numberTables', numeric: false, disablePadding: false, label: 'Số lượng' },
  { id: 'reverseTables', numeric: false, disablePadding: false, label: 'Số lượng dự trữ' },
  { id: 'unitPriceTable', numeric: false, disablePadding: false, label: 'Đơn giá bàn' },
  { id: 'note', numeric: false, disablePadding: false, label: 'Ghi chú' },
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
  const dispatch = useDispatch();
  const currentTableState = useSelector(state => state.tableState);
  const selectedTable = useSelector(state => state.selectedRowTable);
  const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
  const changeToAddState = () => {
      if (currentTableState.state === NORMAL) {
          dispatch(addState());
          dispatch(clickRowTable([]))            
      }
      else {
          alert("Bạn phải hoàn thành / hủy bỏ tác vụ thêm / sửa đặt bàn!");
      }
  }
  const changeToEditState = () => {
      if (currentTableState.state === NORMAL) {
          dispatch(editState());            
      }
      else {
          alert("Bạn phải hoàn thành / hủy bỏ tác vụ thêm / sửa đặt bàn!");
      }
  }
    const onDeleteTable = () => {
    if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
      dispatch(actDeleteTableRequest([selectedTable.id], deleteTableSuccess, deleteTableFailure));
    }
  }
  const deleteTableSuccess = () => {
        handleClickVariant("success", "Xoá thông tin đặt bàn thành công!")
    }

    const deleteTableFailure = () => {
        handleClickVariant("error", "Lỗi hệ thống. Xoá thông tin đặt bàn thất bại!")
    }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Danh sách đặt bàn
        </Typography>
        }

      { currentTableState.state === NORMAL && props.status === "order" ? (numSelected > 0 ? (
        <>
            <Tooltip title="Chỉnh sửa">
            <Button
              aria-label="edit"
              variant="contained"
              className={classes.button}
              startIcon={<Edit style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
              style={{ borderRadius: 10, backgroundColor: indigo[400], fontSize: "10px", color: "#fff", width: 180, marginRight: "10px" }}
              onClick={changeToEditState}>
                Sửa đặt bàn
              </Button>
            </Tooltip>
            <Tooltip title="Xóa">
            <Button
              aria-label="delete"
              variant="contained"
              className={classes.button}
              startIcon={<Delete style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
              style={{ borderRadius: 10, backgroundColor: red[400], fontSize: "10px", color: "#fff", width: 180, marginRight: "10px" }}
              onClick={onDeleteTable}>
                Xóa đặt bàn
              </Button>
            </Tooltip>
            <Tooltip title="Filter list">
          <Button
                aria-label="filter list"
                variant="contained"
                className={classes.button}
                startIcon={<Add style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 190 }}
                onClick={changeToAddState}>
                  Thêm đặt bàn
            </Button>
        </Tooltip>
        </>
      ) : (
          <Tooltip title="Filter list">
          <Button
                aria-label="filter list"
                variant="contained"
                className={classes.button}
                startIcon={<Add style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 150 }}
                onClick={changeToAddState}>
                  Thêm đặt bàn
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



function TableList(props) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState( {
    searchValue: '',
    data: props.rows,
    filterData: props.rows,
  });
  useEffect(() => {
    if (props.rows)
      setState({...state, data: (props.rows), filterData: (props.rows)});
  }, [props.rows])// eslint-disable-line
  rows = state.filterData;

const handleSearch = (event) => {
      let filteredDatas = [];
      filteredDatas = state.data.filter((e) => {
          let retVal = true;
          let element = e['tableKind'];
          const regex = new RegExp(event.target.value, 'gi');
          if (typeof element == 'string')
              retVal = element.match(regex)
          else return false;
          return retVal;
      })
      setState({...state, filterData: filteredDatas, searchValue: event.target.value})
  }

  const classes = useStyles();//
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState( 'numberTables');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.tableKind);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, row) => {
    dispatch(clickRowTable(row));
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
    <>
      <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={1} align='right'>
              <Search />
          </Grid>
          <Grid item xs={4}>
              <TextField 
                  id="searchTable" 
                  fullWidth 
                  label={"Tìm kiếm theo loại bàn"}
                  onChange={handleSearch}
                  InputProps={{
                      classes: {
                          input: classes.resize,
                      },
                  }} />
          </Grid>
      </Grid>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} status={props.status}/>
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
                        key={row.tableKind}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.tableKind}
                        </TableCell>
                        <TableCell align="left">{row.numberTables}</TableCell>
                        <TableCell align="left">{row.reverseTables}</TableCell>
                        <TableCell align="left">
                          <NumberFormat value={row.unitPriceTable} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                        </TableCell>
                        <TableCell align="left">{row.note}</TableCell>  
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
    </>
  );
}

// const mapStateToProps = state => {
//     return {
//         tables : state.tables.feastTables
//     }
// }

export default connect(null, null)(TableList);