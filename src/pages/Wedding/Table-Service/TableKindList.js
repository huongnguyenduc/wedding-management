import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Button, IconButton } from '@material-ui/core/';
import {Toolbar, Typography, Paper } from '@material-ui/core/';
import { Edit, Delete, Add } from '@material-ui/icons/';
import { connect } from 'react-redux';
import {green, indigo, red} from '@material-ui/core/colors';
import { actDeleteTableCategoryRequest } from './../../../action/tableCategory';
import AlertDialog from '../../../components/AlertDialog';
import AddTableCategoryDialog from './AddTableCategoryDialog'
import UpdateTableCategoryDialog from './UpdateTableCategoryDialog'
import { useSnackbar } from 'notistack';

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
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên loại bàn' },
  { id: 'moreInfo', numeric: false, disablePadding: true, label: 'Mô tả loại bàn' },
  { id: 'edit', numeric: false, disablePadding: false, label: 'Sửa' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Xóa' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  

  return (
    <>
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
    </>
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
  const [openTableCategoryDialog, setOpenTableCategoryDialog] = React.useState(false);
  const handleOpenTableCategoryDialog = () => {
      setOpenTableCategoryDialog(true);
  };

  const handleCloseTableCategoryDialog = () => {
      setOpenTableCategoryDialog(false);
  };

  return (
    <>
      <AddTableCategoryDialog open={openTableCategoryDialog} handleClose={handleCloseTableCategoryDialog}/>
      <Toolbar
        className={clsx(classes.root)}
      >
        {(
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Danh sách loại bàn
          </Typography>
        )}
        {(
          <Tooltip title="Thêm loại bàn mới">
              <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<Add style={{color: "#fff", fontSize: "20px" }} />}
                  style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 230 }}
                  onClick={ handleOpenTableCategoryDialog}
              >
                  Thêm loại bàn
              </Button>
          </Tooltip>
      )}
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 950
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


function TableKindList(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const [openUserDialog, setOpenUserDialog] = React.useState(false);

  const handleOpenUserDialog = () => {
      setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
      setOpenUserDialog(false);
  };

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
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState( 'groomname');
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [rowNow, setRowNow] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
      enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };
  const deleteTableCategorySuccess = () => {
      handleClickVariant("success", "Xoá loại bàn thành công!")
  }

  const deleteTableCategoryFailure = () => {
      handleClickVariant("error", "Lỗi hệ thống. Xoá loại bàn thất bại!")
  }

  return (
      <div className={classes.root}>
        <AlertDialog open={open} handleClose={handleClose} title="Xóa loại bàn" description="Bạn có muốn xóa loại bàn này không?" onSubmit={() => {props.deleteTableCategory(rowNow.id, deleteTableCategorySuccess, deleteTableCategoryFailure);}}/>
        {rowNow ? <UpdateTableCategoryDialog open={openUserDialog} handleClose={handleCloseUserDialog} data={rowNow} /> : <></>}
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
                      >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.moreInfo}</TableCell>
                        <TableCell align="left">
                            <IconButton style={{marginLeft: "-12px" }}>
                                <Edit style={{color: indigo[800], fontSize: "20px", marginLeft: "-10px" }} onClick={ async () => { await setRowNow(row); handleOpenUserDialog();}}/> 
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton style={{marginLeft: "-12px" }} onClick={() => {setRowNow(row); handleClickOpen();}}>
                                <Delete style={{color: red[800], fontSize: "20px", marginLeft: "-10px" }} /> 
                            </IconButton>
                        </TableCell>      
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
  );
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteTableCategory : (id, deleteTableCategorySuccess, deleteTableCategoryFailure) => {
            dispatch(actDeleteTableCategoryRequest(id, deleteTableCategorySuccess, deleteTableCategoryFailure));
        },
    }
}

export default connect(null, mapDispatchToProps)(TableKindList, EnhancedTableToolbar);