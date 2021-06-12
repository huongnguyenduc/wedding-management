import { IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@material-ui/core"
import { Close, Delete, Done, Edit } from "@material-ui/icons";
import react, { useEffect, useState } from "react"
import useStyles from './shiftTableStyles'
import {GetShift, InsertShift, UpdateShift, DeleteShift} from '../connect'
import { Alert } from "@material-ui/lab";
import {EnhancedTableToolbar} from "../policy/policyTable"

function EnhancedTableHead(props)
{
    const {orderBy, order, onRequestSort} = props;
    const classes = useStyles()
    const headRows = [{name:'name',title:'Ca', align:'center', width:'30%'},
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
                <TableCell>

                </TableCell>
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
    if(keyword=="")
      return array;
    return array.filter(item=>{
      return item.name.toLowerCase().search(keyword)!=-1
    })
  }

function ShiftTable(){
    const classes = useStyles()
    const [shiftData,setShiftData] = useState([]);
    const [tableState, setTableState] = useState({keyword:'',order:"asc", orderBy:'id',rowsPerPage:5,page:0})
    const [alert, setAlert] = useState({open:false,severity:'', message:''})
    function handleRequestSort(event, property) {
        const isAsc = tableState.orderBy == property && tableState.order == 'asc';
        setTableState({...tableState,orderBy:property, order:isAsc?'desc':'asc'})
    };

    function handleChangeRowsPerPage(event){
        setTableState({...tableState,rowsPerPage:event.target.value})
    }

    function handleChangePage(event, newpage){
        setTableState({...tableState,page:newpage})
    }

    function FilterHandler(keyword)
    {
        setTableState({...tableState,keyword:keyword.toLowerCase()});
    }

    function CloseAlert(){
        setAlert({...alert,open:false})
    }

    useEffect(()=>{
        GetShift(setShiftData)
    },[])

    const emptyRows = tableState.rowsPerPage - Math.min(tableState.rowsPerPage, shiftData.length - tableState.page * tableState.rowsPerPage);
    const insertRow = shiftData.length - (tableState.page + 1) * tableState.rowsPerPage;

    return(
        <Paper>
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
                    {emptyRows>1? 
                        <TableRow style={{ height: 54* (emptyRows - 1) }}> 
                            <TableCell colSpan={3}/>
                        </TableRow>:null}
                        
                    </TableBody>
                    <TableFooter  className={classes.TableFooter}>
                        <TableRow>
                            <TablePagination
                                    rowsPerPageOptions={[5,10,15]}
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
    const {shift, onUpdate} = props
    const classes = useStyles()
    return (
        <TableRow className={classes.BodyRow}>
            <TableCell
                align='center'
                className={classes.InputCell}
            >{shift.name}
            </TableCell>
            <TableCell
                align='center'
                className={classes.InputCell}
            >
            {shift.timeBegin}  
            </TableCell>
            <TableCell
                align='center'
            >
            {shift.timeFinish}
            </TableCell>
        </TableRow>
    )
}