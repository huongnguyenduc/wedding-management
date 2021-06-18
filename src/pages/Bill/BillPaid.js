import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, Grid,FormControl, MenuItem, InputLabel, Select,TextField, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel} from '@material-ui/core/';
import {Toolbar, Typography, Paper, FormControlLabel, Switch} from '@material-ui/core/';
import { Search, DescriptionOutlined } from '@material-ui/icons/';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

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
  { id: 'groomname', numeric: false, disablePadding: true, label: 'Tên chú rể' },
  { id: 'bridename', numeric: false, disablePadding: false, label: 'Tên cô dâu' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Điện thoại' },
  { id: 'lobbyName', numeric: false, disablePadding: false, label: 'Sảnh' },
  { id: 'wedding_date', numeric: false, disablePadding: false, label: 'Ngày tổ chức' },
  { id: 'nameShift', numeric: false, disablePadding: false, label: 'Ca' },
  { id: 'note', numeric: false, disablePadding: false, label: 'Ghi chú' },
  { id: 'detail', numeric: true, disablePadding: false, label: 'Chi tiết' },
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

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      {(
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Danh sách tiệc đã thanh toán
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


function BillPaid(props) {
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
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchKind, setSearchKind] = React.useState({name: 'Tên chú rể', kind: 'groomname'});
  const searchKindPropertyName = name => {
    switch(name) {
      case 'Tên chú rể':
        return 'groomname';
      case 'Tên cô dâu':
        return 'bridename';
      case 'Số điện thoại':
        return 'phone';
      default:
        return 'groomname'
    }
  }

  const handleSearch = (event) => {
      let filteredDatas = [];
      filteredDatas = state.data.filter((e) => {
          let retVal = true;
          let element = e["feast"][searchKind.kind];
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
    row = {...row, feast: {...row.feast, wedding_date: convertDateToStringMDY(row.feast.wedding_date)}}
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
        <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1} align='right'>
                    <Search />
                </Grid>
                <Grid item xs={11}>
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
                      >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.feast.groomname}
                        </TableCell>
                        <TableCell align="left">{row.feast.bridename}</TableCell>
                        <TableCell align="left">{row.feast.phone}</TableCell>
                        <TableCell align="left">{row.feast.id_lobby.name}</TableCell>
                        <TableCell align="left">{convertDateToStringDMYNew(row.feast.wedding_date)}</TableCell>
                        <TableCell align="left">{row.feast.shift.name}</TableCell>
                        <TableCell align="left">{row.feast.note}</TableCell>
                        <TableCell align="right">
                            <Link to={`/bill/${row.feast.id}`} className={classes.detailButton}>
                              <DescriptionOutlined /> 
                            </Link>
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
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Khoảng cách dòng"
        />
      </div>
    </Grid>
    </Grid>
  );
}

function convertDateToStringMDY(date) {
    if (date == null) return;
        let day = date.substring(0, 2);
        let month = date.substring(3, 5);
        let year = date.substring(6, 10);
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

export default connect(null, null)(BillPaid);