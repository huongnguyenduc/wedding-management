import { Container,Icon,IconButton, InputAdornment, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography} from "@material-ui/core"
import React,{useEffect, useState} from "react"
import useStyles from './policyStyles';
import DoneIcon from '@material-ui/icons/Done';
import { Close, Edit, FilterList, Search } from "@material-ui/icons";
import ShiftTable from "../shift/shiftTable"
import {GetPolicy, InsertPolicy, UpdatePolicy, DeletePolicy} from "../connect"
import { Alert } from "@material-ui/lab";

function EnhancedTableHead(props) {
    const classes = useStyles();
    const headCells =[

        {id:1,Name:"name",width:'35%',align:"center",label:"Quy định"},
        {id:2,Name:"moreInfo",width:'40%', align: "center", label:"Nội dung quy định"},
        {id:3,Name:'value', width:'20%', align:'center', label:"Áp dụng"},
        
    ]
  
    const {order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


  return (
    <TableHead className={classes.TableHeader}>
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy == headCell.Name ? order : false}
            padding="default"
            align={headCell.align}
            variant='head'
            style={{width: headCell.width, paddingRight:'0px'}}
          >
            <TableSortLabel
              active={orderBy === headCell.Name}
              direction={orderBy == headCell.Name ? order : 'asc'}
              onClick={createSortHandler(headCell.Name)}
            >
            {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell  style={{width:"10%", paddingRight:'0px'}}>

        </TableCell>
      </TableRow >
    </TableHead>
  );
  }

export const EnhancedTableToolbar = (props) => {
    const classes = useStyles();
    const {FilterHandler, title } = props;
    const [keyword, setKeyword] = useState('')
    const [onpenFilter, setOpenFilter] = useState(false)
  
    function onEnter(event){
        if(event.key=='Enter')
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
          variant="h6"
          style={{fontWeight:700}}
          id="tableTitle"
          component="div"
        >
        {title}
        </Typography>

       <TextField 
          fullWidth
          className={classes.ToolbarFilter}
          variant="outlined"
          placeholder="Tìm kiếm quy định"
          onKeyDown={onEnter}
          value={keyword}
          onChange={onChange}
        />
        <Tooltip title="Filter list">
            <IconButton aria-label="filter list" classes={{label:classes.ButtonLabel}} onClick={()=>FilterHandler(keyword)}>
            <Search style={{fontSize:'25px'}}/>
            </IconButton>
        </Tooltip>
      
      </Toolbar>
    );
  };

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
        if (order != 0) return order;
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


function PolicyTable() {
    const [tableState, setTableState] = useState({keyword:'',order:"asc", orderBy:'id',rowsPerPage:5,page:0})
    const classes = useStyles();
    const [policyData, setPolicyData] = useState([]);
    const [alert, setAlert] = useState({open:false,severity:'', message:''});

    function UpdateData(type, payload)
    {
        switch(type){
            case "INIT":{
                setPolicyData(payload)
                break;
            }
            case "DELETE":
            {
                setAlert({open:true,severity:'success', message:"Xoá thông tin thành công"})
                const newData = policyData.filter(shift=>{return shift.id!=payload.id})
                setPolicyData(newData);
                break;
            }
            case "INSERT":{
                setAlert({open:true,severity:'success', message:"Thêm thông tin thành công"})
                setPolicyData([...policyData,payload])
                break;
            }
            case "UPDATE":{
                setAlert({open:true,severity:'success', message:"Cập nhật thông tin thành công"})
                const newData = policyData.filter(shift=>{return shift.id != payload.id})    
                setPolicyData([...newData,payload])
                break;
            }
            case "ERROR":{
                setAlert({open:true,severity:'error', message:payload})
            }
            default:{

            }
        }
    }


    function handleRequestSort(event, property) {
        const isAsc = tableState.orderBy == property && tableState.order == 'asc';
        setTableState({...tableState,orderBy:property, order:isAsc?'desc':'asc'})
    };

    function handleChangeRowsPerPage(event)
    {
      setTableState({...tableState, rowsPerPage:parseInt(event.target.value)})
    }

    function handleChangePage(event, newPage)
    {
      setTableState({...tableState,page:newPage})
    }

    function FilterHandler(keyword)
    {
        setTableState({...tableState,keyword:keyword.toLowerCase()});
    }

    function CloseAlert(){
        setAlert({...alert,open:false})
    }

    const emptyRows = tableState.rowsPerPage - Math.min(tableState.rowsPerPage, policyData.length - tableState.page * tableState.rowsPerPage);
    const insertRow = policyData.length - (tableState.page + 1) * tableState.rowsPerPage; 
    useEffect(()=>{
        GetPolicy(UpdateData)
    },[])

    return(
        <Paper>
            <TableContainer >
            <EnhancedTableToolbar FilterHandler={FilterHandler} title="QUY ĐỊNH"/>
            <Table className={classes.TableContainer}>
                <EnhancedTableHead
                    order={tableState.order}
                    orderBy={tableState.orderBy}
                    onRequestSort={handleRequestSort}
                ></EnhancedTableHead>
                <TableBody className={classes.TableBody}>
                    {
                    
                        tableSort(tableFilter(policyData,tableState.keyword), getComparator(tableState.order, tableState.orderBy))
                        .slice(tableState.page*tableState.rowsPerPage, (tableState.page + 1)*tableState.rowsPerPage)
                        .map(item=>{
                        return(
                            <Row key={item.id} policy={item} onUpdateData={UpdateData}/>
                        )
                    })
                    }
                    {(emptyRows > 0||insertRow==0) &&(<Row onUpdateData={UpdateData}/>)}
                    {emptyRows > 1 && (
                    <TableRow style={{ height: 54* (emptyRows - 1) }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                    )}
                </TableBody>
                <TableFooter  className={classes.TableFooter}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5,10,15]}
                            rowsPerPage={tableState.rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            page={tableState.page}
                            count={policyData.length}
                            onChangePage={handleChangePage}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
            </TableContainer>

            <Snackbar open={alert.open!=''} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                <Alert onClose={CloseAlert} severity={alert.severity}>
                {alert.message}
                </Alert>
            </Snackbar>
        </Paper>                          
    );
}

export default PolicyTable;

function Row(props)
{
    const {policy, onUpdateData} = props;
    const [editing, setEditing] = useState(policy?false:true)
    const [rowState, setRowState] = useState({name:'', moreInfo:'', value:false})
    const classes = useStyles();

    function handleChange(event){
        
        setRowState({...rowState,[event.target.name]: event.target.value});
    }

    function afterChangeValue(type, payload){
        if(type=="ERROR")
            setRowState({...rowState,value:rowState.value})
        onUpdateData(type,payload)
    }

    function changeValue(event){ 
        setRowState({...rowState, value:event.target.checked}) 
        if(policy)
        {
            const po = {name:rowState.name, moreInfo:rowState.moreInfo, value:!rowState.value}
            UpdatePolicy(po,afterChangeValue) 
        }
              
    }

    function afterUpddateHandler(type, payload){
        onUpdateData(type,payload)
        if(type=="ERROR")   
            return;        
        else if(policy)
            setEditing(false);    
        else
           setRowState({name:'', moreInfo:'', value:0})
            

    }

    function check()
    {
        if(rowState.name && rowState.moreInfo)
            return true
        else
        {
            onUpdateData("ERROR", "Vui lòng nhập đầy đủ thông tin")
            return false;
        } 
    }

    function UpdateHandler(){
        if(!check())
            return ;

        console.log("update")
        if(policy)
            UpdatePolicy(rowState,afterUpddateHandler)
        else
            InsertPolicy(rowState,afterUpddateHandler)
    }

    function CancelHandler(){
        setEditing(false)
        setRowState({name:policy.name, moreInfo: policy.moreInfo, value: policy.value})
    }

    useEffect(()=>{
        if(policy)
            setRowState({name:policy.name, moreInfo: policy.moreInfo, value: policy.value});
    },[])

    return (
        <TableRow className={`${classes.BodyRow} ${editing?classes.rowEditing:''}`}>
            <TableCell 
                className={classes.InputCell}  
                align='center'>
                <TextField
                    disabled={!editing}
                    placeholder="Tên qui định"
                    name="name" 
                    value={rowState.name} 
                    onChange={handleChange} 
                    className={classes.inputText} 
                    InputProps={{
                        disableUnderline:true,
                        className:classes.inputText}}
                />
            </TableCell>
            <TableCell 
                className={classes.InputCell}
                align='center'
            >
                <TextField 
                    disabled={!editing}
                    placeholder="Nội dung"
                    name="moreInfo" 
                    value={rowState.moreInfo} 
                    onChange={handleChange}  
                    
                    InputProps={{
                        disableUnderline:true,
                        className:classes.inputText}}
                /> 
            </TableCell>
            <TableCell
                className={classes.StatusCell}
                align='center'
            >
                <Switch
                    className={classes.switch}
                    checked={rowState.value}
                    onChange={changeValue}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>
            <TableCell className={classes.ControlCell}>
                {
                    editing?
                    <div className={classes.divControl}>
                        <IconButton classes={{label:classes.ButtonLabel}} onClick={UpdateHandler}>
                            <DoneIcon style={{fontSize:'22px'}}/>
                        </IconButton>
                       {policy?
                            <IconButton classes={{label:classes.ButtonLabel}}  onClick={CancelHandler}>
                                <Close style={{fontSize:'22px'}}/>
                            </IconButton>
                            :null
                        }
                    </div>
                    :<div className={classes.divControl}>
                        <IconButton classes={{label:classes.ButtonLabel}} onClick={()=>setEditing(true)}>
                            <Edit style={{fontSize:'22px'}}/>
                        </IconButton>
                    </div>
                }
            </TableCell>
        </TableRow>
    )
}