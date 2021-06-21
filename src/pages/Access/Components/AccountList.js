import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Button, IconButton } from '@material-ui/core/';
import {Toolbar, Typography, Paper } from '@material-ui/core/';
import { Edit, Delete, Add } from '@material-ui/icons/';
import { connect, useDispatch } from 'react-redux';
import UserUpdateDialog from './UserDialog/UserUpdateDialog';
import UserAddDialog from './UserDialog/UserAddDialog';
import {green, indigo, red} from '@material-ui/core/colors';
import { actDeleteUserRequest } from './../../../action/user';
import { actUpdateUserRequest } from './../../../action/user';
import { actAddUserRequest } from './../../../action/user';
import AlertDialog from '../../../components/AlertDialog';
import { useSnackbar } from 'notistack';
import { getCookie } from '../../../action/Login'


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
  { id: 'fullName', numeric: false, disablePadding: true, label: 'Tên người dùng' },
  { id: 'username', numeric: false, disablePadding: true, label: 'Tên đăng nhập' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Tên nhóm người dùng' },
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
  const [openUserDialog, setOpenUserDialog] = React.useState(false);
  const dispatch = useDispatch();
  const addUser = (user) => {
      dispatch(actAddUserRequest(user, addSuccess, addFailure));
  };
  const handleOpenUserDialog = () => {
      setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
      setOpenUserDialog(false);
  };

  const initialValues = {
    username: "",
    fullname: "",
    role: "",
    password: "",
    image: "https://res.cloudinary.com/huong/image/upload/v1624194227/user_image/Pngtree_vector_add_user_icon_4101348_m4r7ro.png",
    imageURL: "",
    id: 0
  }
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
      enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };

  const addSuccess = () => {
    handleClickVariant("success", "Thêm người dùng thành công!")
  }

  const addFailure = () => {
    handleClickVariant("error", "Lỗi hệ thống. Thêm người dùng thất bại!")
  }
  return (
    <>
      <UserAddDialog open={openUserDialog} handleClose={handleCloseUserDialog} initialValues={initialValues} onSubmit={addUser}/>
      <Toolbar
        className={clsx(classes.root)}
      >
        {(
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Danh sách người dùng
          </Typography>
        )}
        {(
          <Tooltip title="Thêm người dùng mới">
              <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<Add style={{color: "#fff", fontSize: "20px" }} />}
                  style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 250 }}
                  onClick={handleOpenUserDialog}
              >
                  Thêm người dùng
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


function AccountList(props) {
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
  const [orderBy, setOrderBy] = React.useState( 'fullName');
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [rowNow, setRowNow] = React.useState(null);

  const onSubmit = (user) => {
    return props.updateUser(user, updateSuccess, updateFailure);
  }

  const roleName = (role) => {
    switch (role.toString()) {
      case "ROLE_ADMIN":
        return "Admin"
      case "ROLE_MANAGER":
        return "Quản lý"
      case "ROLE_USER":
        return "Nhân viên"
      default:
        return "Admin"
    }
  }
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
      enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };

  const deleteSuccess = () => {
    handleClickVariant("success", "Xóa người dùng thành công!")
  }

  const deleteFailure = () => {
    handleClickVariant("error", "Lỗi hệ thống. Xóa người dùng thất bại!")
  }

  const updateSuccess = () => {
    handleClickVariant("success", "Sửa thông tin người dùng thành công!")
  }

  const updateFailure = () => {
    handleClickVariant("error", "Lỗi hệ thống. Sửa thông tin người dùng thất bại!")
  }

  const privileges = JSON.parse(getCookie("privileges"))
  
  const canUpdateUser = (permission) => permission.authority === "UPDATE_USER"

  return (
      <div className={classes.root}>
        <AlertDialog open={open} handleClose={handleClose} title="Xóa tài khoản" description="Bạn có muốn xóa tài khoản này không?" onSubmit={ () => props.deleteUser(rowNow.username, deleteSuccess, deleteFailure)}/>
        {rowNow ? <UserUpdateDialog open={openUserDialog} handleClose={handleCloseUserDialog} initialValues={{...rowNow, password: ""}} onSubmit={onSubmit}/> : <></>}
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
                          {row.fullName}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.roles ? roleName(row.roles[0].name) : ""}</TableCell>
                        <TableCell align="left">
                            <IconButton style={{marginLeft: "-12px" }}>
                                {privileges.some(canUpdateUser) ? <Edit style={{color: indigo[800], fontSize: "20px", marginLeft: "-10px" }} onClick={ () => { setRowNow(row); handleOpenUserDialog();}}/> : <></>} 
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            {(roleName(row.roles[0].name) === "Admin" || !privileges.some(canUpdateUser)) ? <></> : <IconButton style={{marginLeft: "-12px" }} onClick={() => {setRowNow(row); handleClickOpen();}}>
                                <Delete style={{color: red[800], fontSize: "20px", marginLeft: "-10px" }} /> 
                            </IconButton>}
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


const mapStateToProps = state => {
    return {
        //notPaidBillItem: state.notPaidBillItem,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteUser : (id, deleteSuccess, deleteFailure) => {
            dispatch(actDeleteUserRequest(id, deleteSuccess, deleteFailure));
        },
        updateUser: (user, updateSuccess, updateFailure) => {
            dispatch(actUpdateUserRequest(user, updateSuccess, updateFailure));
        },
    }
}

export default connect(null, mapDispatchToProps)(AccountList, EnhancedTableToolbar);