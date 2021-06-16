import {Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Toolbar, TextField, IconButton, Grid, Backdrop, CircularProgress} from "@material-ui/core"
import { useEffect, useState } from "react"
import useStyles from './shiftTableStyles'
import {GetShift} from '../connect'
import { Alert } from "@material-ui/lab";
import { Search } from "@material-ui/icons";

const EnhancedTableToolbar = (props) => {
    const classes = useStyles();
    const {FilterHandler, title } = props;
    const [keyword, setKeyword] = useState('')
  
    function onEnter(event){
        console.log(typeof(event.key))
        if(event.key==='Enter')
            FilterHandler(keyword)
    }
    function onChange(event)
    {
        setKeyword(event.target.value)
    }
    return (
      <Toolbar
        className={classes.Toolbar}
      >
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
            <IconButton aria-label="filter list" classes={{root:classes.Button,label:classes.ButtonLabel}} onClick={()=>FilterHandler(keyword)}>
                    <Search style={{fontSize:'25px'}}/>
            </IconButton>
        </Grid>
      </Toolbar>
    );
  };


function EnhancedTableHead(props)
{
    const {orderBy, order, onRequestSort} = props;
    const classes = useStyles()
    const headRows = [{name:'name',title:'Ca', align:'center', width:'40%'},
    {name:'timeBegin',title:'Thời gian bắt đầu', align:'center', width:'30%'},
    {name:'timeFinish',title:'Thời gian kết thúc', align:'center', width:'30%'},]

    const createSortHandler =(property)=>(event)=>{
        onRequestSort(event, property)
    }
    return(
        <TableHead className={classes.TableHeader}>
            <TableRow>
                {
                    headRows.map((cell, index)=>{
                        return(
                            <TableCell
                                key={index}
                                sortDirection={orderBy === cell.name ? order : false}
                                padding="default"
                                align={cell.align}
                                variant='head'
                                style={{width: cell.width, paddingRight:'0px'}}
                            >
                            <TableSortLabel
                            active={orderBy === cell.name}
                            direction={orderBy === cell.name ? order : 'asc'}
                            onClick={createSortHandler(cell.name)}
                            >
                            {cell.title}
                            </TableSortLabel>
                            </TableCell>
                        )})
                }   
            </TableRow>
        </TableHead>
    )
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
    return order === 'desc'
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

function tableFilter(array, keyword){
    if(keyword==="")
      return array;
    return array.filter(item=>{
      return item.name.toLowerCase().search(keyword)!==-1
    })
  }

function ShiftTable(){
    const classes = useStyles()
    const [shiftData,setShiftData] = useState([]);
    const [tableState, setTableState] = useState({keyword:'',order:"asc", orderBy:'id',rowsPerPage:5,page:0})
    const [pendding, setPending] = useState(true)
    const [alert, setAlert] = useState({open:false,severity:'', message:''})
    function handleRequestSort(event, property) {
        const isAsc = tableState.orderBy === property && tableState.order === 'asc';
        setTableState({...tableState,orderBy:property, order:isAsc?'desc':'asc'})
    };
    function FilterHandler(keyword)
    {
        setTableState({...tableState,keyword:keyword.toLowerCase()});
    }

    function CloseAlert(){
        setAlert({...alert,open:false})
    }
    
    function SuccesHandler(status, data)
    {
        switch(status)
        {
            case "INIT":{
                setShiftData(data)
                break;
            }
            case "ERROR":
            {
                setAlert({open:true, severity:'error', message:data})
                break
            }
            default:{
                break
            }   
        }
        setPending(false)
    }

    useEffect(()=>{
        GetShift(SuccesHandler)
    },[])

    if(pendding)
        return(
            <Backdrop open={true} className={classes.backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    return(
        <Paper className={classes.shiftTable}>
            <TableContainer>
                <EnhancedTableToolbar FilterHandler={FilterHandler} title="CA"/>
                <Table>
                    <EnhancedTableHead
                        order={tableState.order}
                        orderBy = {tableState.orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody className={classes.TableBody}>
                    {
                          tableSort(tableFilter(shiftData,tableState.keyword),getComparator(tableState.order, tableState.orderBy))
                          .slice(tableState.page*tableState.rowsPerPage, (tableState.page + 1)*tableState.rowsPerPage)
                            .map(row=>{
                                    return(
                                        <Row key={row.id} shift={row} />
                                    )
                            })
                          
                    }
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                <Alert onClose={CloseAlert} severity={alert.severity}>
                {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    )
}

export default ShiftTable

function Row(props){
    const {shift} = props
    const classes = useStyles()
    return (
        <TableRow className={classes.BodyRow}>
            <TableCell
                align='center'
                className={classes.InfoCell}
            >{shift.name}
            </TableCell>
            <TableCell
                align='center'
                className={classes.InfoCell}
            >
            {shift.timeBegin}  
            </TableCell>
            <TableCell
                align='center'
                className={classes.InfoCell}
            >
            {shift.timeEnd}
            </TableCell>
        </TableRow>
    )
}