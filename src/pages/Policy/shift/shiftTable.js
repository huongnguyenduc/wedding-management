import {
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Toolbar,
  TextField,
  IconButton,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyles from "./shiftTableStyles";
import { Alert } from "@material-ui/lab";
import { Close, Delete, Done, Edit, Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { actError } from "../actions/actions";
import { DeleteShift, InsertShift, UpdateShift } from "../connect";
import { getCookie } from "../../../action/Login";

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const { FilterHandler, title } = props;
  const [keyword, setKeyword] = useState("");

  function onEnter(event) {
    console.log(typeof event.key);
    if (event.key === "Enter") FilterHandler(keyword);
  }
  function onChange(event) {
    setKeyword(event.target.value);
  }
  return (
    <Toolbar className={classes.Toolbar}>
      <Typography
        className={classes.ToolbarTitle}
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      <Grid className={classes.SearchBox}>
        <TextField
          fullWidth
          className={classes.ToolbarFilter}
          variant="outlined"
          placeholder="Tìm kiếm ca"
          onKeyDown={onEnter}
          value={keyword}
          onChange={onChange}
        />
        <IconButton
          aria-label="filter list"
          classes={{ root: classes.Button, label: classes.ButtonLabel }}
          onClick={() => FilterHandler(keyword)}
        >
          <Search style={{ fontSize: "25px" }} />
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

function EnhancedTableHead(props) {
  const { orderBy, order, onRequestSort } = props;
  const classes = useStyles();
  const headRows = [
    { name: "name", title: "Ca", align: "center", width: "40%" },
    {
      name: "timeBegin",
      title: "Thời gian bắt đầu",
      align: "center",
      width: "30%",
    },
    {
      name: "timeFinish",
      title: "Thời gian kết thúc",
      align: "center",
      width: "30%",
    },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead className={classes.TableHeader}>
      <TableRow>
        {headRows.map((cell, index) => {
          return (
            <TableCell
              key={index}
              sortDirection={orderBy === cell.name ? order : false}
              padding="default"
              align={cell.align}
              variant="head"
              style={{ width: cell.width, paddingRight: "0px" }}
            >
              <TableSortLabel
                active={orderBy === cell.name}
                direction={orderBy === cell.name ? order : "asc"}
                onClick={createSortHandler(cell.name)}
              >
                {cell.title}
              </TableSortLabel>
            </TableCell>
          );
        })}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function tableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function tableFilter(array, keyword) {
  if (keyword === "") return array;
  return array.filter((item) => {
    return item.name.toLowerCase().search(keyword) !== -1;
  });
}

function ShiftTable() {
  const classes = useStyles();
  const StoreData = useSelector((state) => state.PolicyReducer);
  const shiftData = StoreData.Shift;
  const [tableState, setTableState] = useState({
    keyword: "",
    order: "asc",
    orderBy: "id",
    rowsPerPage: 5,
    page: 0,
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  function handleRequestSort(event, property) {
    const isAsc = tableState.orderBy === property && tableState.order === "asc";
    setTableState({
      ...tableState,
      orderBy: property,
      order: isAsc ? "desc" : "asc",
    });
  }
  function FilterHandler(keyword) {
    setTableState({ ...tableState, keyword: keyword.toLowerCase() });
  }

  function CloseAlert() {
    setAlert({ ...alert, open: false });
  }

  function handleChangeRowsPerPage(event) {
    setTableState({ ...tableState, rowsPerPage: event.target.value });
  }

  function handleChangePage(event, newpage) {
    setTableState({ ...tableState, page: newpage });
  }

  const emptyRows =
    tableState.rowsPerPage -
    Math.min(
      tableState.rowsPerPage,
      shiftData.length - tableState.page * tableState.rowsPerPage
    );
  const insertRow =
    shiftData.length - (tableState.page + 1) * tableState.rowsPerPage;
  const privileges = JSON.parse(getCookie("privileges"));

  const canUpdateShift = (permission) =>
    permission.authority === "UPDATE_SHIFT";
  return (
    <Paper className={classes.shiftTable}>
      <TableContainer>
        <EnhancedTableToolbar FilterHandler={FilterHandler} title="CA" />
        <Table>
          <EnhancedTableHead
            order={tableState.order}
            orderBy={tableState.orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody className={classes.TableBody}>
            {tableSort(
              tableFilter(shiftData, tableState.keyword),
              getComparator(tableState.order, tableState.orderBy)
            )
              .slice(
                tableState.page * tableState.rowsPerPage,
                (tableState.page + 1) * tableState.rowsPerPage
              )
              .map((row) => {
                return <Row key={row.id} shift={row} />;
              })}
            {privileges.some(canUpdateShift) ? (
              (emptyRows > 0 || insertRow === 0) && <Row />
            ) : (
              <></>
            )}
            {emptyRows > 1 && (
              <TableRow style={{ height: 54 * (emptyRows - 1) }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter className={classes.TableFooter}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                rowsPerPage={tableState.rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={tableState.page}
                count={shiftData.length}
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={CloseAlert}
        className={classes.Snackbar}
      >
        <Alert onClose={CloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ShiftTable;

function Row(props) {
  const classes = useStyles();
  const { shift } = props;
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.PolicyReducer);
  const shiftData = StoreData.Shift;
  const [rowState, setRowState] = useState({
    id: "",
    name: "",
    timeBegin: "",
    timeEnd: "",
    editing: shift ? false : true,
  });

  function EditHandler() {
    setRowState({ ...rowState, editing: true });
  }

  function Deletehandler() {
    const confirm = window.confirm(
      "Thông tin về loại sảnh sẽ bị xoá hoàn toàn khỏi hệ thống! Bạn có muốn tiếp tục?"
    );
    if (confirm) dispatch(DeleteShift(rowState));
  }

  function checkExist() {
    const find = shiftData.find(
      (item) =>
        item.name.toLowerCase().replace(/\s/g, "") ===
        rowState.name.toLowerCase().replace(/\s/g, "")
    );
    if (find)
      if (find.id === rowState.id) return false;
      else return true;
    else return false;
  }

  function check() {
    if (rowState.name && rowState.timeBegin && rowState.timeEnd) {
      if (rowState.timeBegin > rowState.timeEnd) {
        return {
          value: false,
          message: "Thời gian bắt đầu phải trước thời gian kết thúc!",
        };
      }

      if (checkExist())
        return { value: false, message: "Tên ca đã được sử dụng!" };

      return { value: true, message: "vui lòng nhập đầy đủ thông tin!" };
    } else return { value: false, message: "vui lòng nhập đầy đủ thông tin!" };
  }

  function Success() {
    if (shift) setRowState({ ...rowState, editing: false });
    else
      setRowState({
        ...rowState,
        id: "",
        name: "",
        mintable: "",
        editing: true,
      });
  }
  function FinishHandler() {
    const resultCheck = check();
    if (resultCheck.value) {
      if (shift) {
        const shiftData = {
          id: rowState.id,
          name: rowState.name,
          timeBegin: rowState.timeBegin,
          timeEnd: rowState.timeEnd,
        };
        dispatch(UpdateShift(shiftData, Success));
      } else {
        const shiftData = {
          name: rowState.name,
          timeBegin: rowState.timeBegin,
          timeEnd: rowState.timeEnd,
        };
        dispatch(InsertShift(shiftData, Success));
      }
    } else {
      dispatch(actError(resultCheck.message));
    }
  }

  function Cancelhandler() {
    setRowState({
      ...rowState,
      id: shift.id,
      name: shift.name,
      timeBegin: shift.timeBegin,
      timeEnd: shift.timeEnd,
      editing: false,
    });
  }

  function handleChange(event) {
    setRowState({ ...rowState, [event.target.name]: event.target.value });
  }
  useEffect(() => {
    if (shift)
      setRowState({
        ...rowState,
        id: shift.id,
        name: shift.name,
        timeBegin: shift.timeBegin,
        timeEnd: shift.timeEnd,
        editing: shift ? false : true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const privileges = JSON.parse(getCookie("privileges"));

  const canUpdateShift = (permission) =>
    permission.authority === "UPDATE_SHIFT";

  return (
    <TableRow
      className={`${classes.BodyRow} ${
        rowState.editing ? classes.rowEditing : ""
      }`}
    >
      <TableCell className={classes.InputCell} align="center">
        <TextField
          disabled={!rowState.editing}
          value={rowState.name}
          name="name"
          placeholder="Tên ca"
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            className: classes.inputText,
          }}
        />
      </TableCell>
      <TableCell className={classes.InputCell} align="center">
        <TextField
          type="time"
          disabled={!rowState.editing}
          value={rowState.timeBegin}
          name="timeBegin"
          placeholder="Thời gian bắt đầu"
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            className: classes.inputText,
          }}
        />
      </TableCell>
      <TableCell className={classes.InputCell} align="center">
        <TextField
          type="time"
          disabled={!rowState.editing}
          value={rowState.timeEnd}
          name="timeEnd"
          placeholder="Thời gian kết thúc"
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            className: classes.inputText,
          }}
        />
      </TableCell>
      <TableCell className={classes.ControlCell} align="center">
        {privileges.some(canUpdateShift) ? (
          rowState.editing ? (
            <div className={classes.divControl}>
              <IconButton
                classes={{ label: classes.ButtonLabel }}
                onClick={FinishHandler}
              >
                <Done className={classes.Icon} />
              </IconButton>
              {shift ? (
                <IconButton
                  classes={{ label: classes.ButtonLabel }}
                  onClick={Cancelhandler}
                >
                  <Close className={classes.Icon} />
                </IconButton>
              ) : null}
            </div>
          ) : (
            <div className={classes.divControl}>
              <IconButton
                classes={{ label: classes.ButtonLabel }}
                onClick={EditHandler}
              >
                <Edit className={classes.Icon} />
              </IconButton>
              <IconButton
                classes={{ label: classes.ButtonLabel }}
                onClick={Deletehandler}
              >
                <Delete className={classes.Icon} />
              </IconButton>
            </div>
          )
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}
