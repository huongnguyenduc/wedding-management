import { IconButton, Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography, Backdrop, CircularProgress } from '@material-ui/core'
import { Close, Delete, Done, Edit, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import useStyles from "./CategoryTableStyles"
import {InsertLobbyCategory, UpdateLobbyCategory, DeleteLobbyCategory} from '../Connect'
import { useDispatch, useSelector } from 'react-redux'
import { actCloseError, actError } from '../actions/actions'
import { Dialog } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'



function CategoryTable(props){

    const {open, onClose, ...other} = props
    const classes = useStyles();
    const StoreData = useSelector(state => state.changeLobbyData);
    const dispatch = useDispatch();
    const Status = StoreData.Status;
    const Pending = StoreData.Pending;
    const LobbyCategory = StoreData.LobbyCategory;
    const  [tableState, setTableState] = useState({keyword:'', order:'asc', orderBy:'name', page:0, rowsPerPage:5})

    function FilterHandler(keyword){
        setTableState({...tableState, keyword:keyword.toLowerCase()})
    }

    function handleRequestSort(event, property){
        const isAsc = tableState.orderBy === property && tableState.order === 'asc';
        setTableState({...tableState,orderBy:property, order:isAsc?'desc':'asc'})
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
    function handleChangeRowsPerPage(event){
        setTableState({...tableState, rowsPerPage:event.target.value})
    }

    function handleChangePage(event, newpage)
    {
        setTableState({...tableState,page:newpage})
    }

    function CloseAlert()
    {
        dispatch(actCloseError())
    }


    const emptyRows = tableState.rowsPerPage - Math.min(tableState.rowsPerPage, LobbyCategory.length - tableState.page * tableState.rowsPerPage);
    const insertRow = LobbyCategory.length - (tableState.page + 1) * tableState.rowsPerPage; 
    return(
        <Dialog 
            open={open} 
            onClose={onClose}
            scroll="body" 
            keepMounted
            maxWidth="lg"
        >
        <Container maxWidth='lg' className={classes.CategoryTable} {...other}>
            <TableContainer>
                <EnhancedTableToolbar FilterHandler={FilterHandler} title="LOẠI SẢNH"/>
                <Table>
                <EnhancedTableHead order={tableState.order} orderBy={tableState.orderBy} onRequestSort={handleRequestSort}/>
                <TableBody>
                    {
                    tableSort(tableFilter(LobbyCategory,tableState.keyword), getComparator(tableState.order, tableState.orderBy))
                    .slice(tableState.page*tableState.rowsPerPage, (tableState.page + 1)*tableState.rowsPerPage)
                    .map(row=>{
                        return(
                            <Row key={row.id} lobbyCategory={row} />
                        )   
                        })
                    }
                    {(emptyRows > 0||insertRow===0) &&(<Row />)}
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
                            count={LobbyCategory.length}
                            onChangePage={handleChangePage}
                            />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
            <Snackbar open={ Status.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                <Alert severity={Status.severity} onClose={CloseAlert}>{Status.message}</Alert>
            </Snackbar>
        </Container>
        </Dialog>
        
    )
}

export default CategoryTable


function EnhancedTableHead(props) {
    const headCells =[
        {id:1,Name:"name",width:'45%', align: "center", label:"Tên loại sảnh"},
        {id:2,Name:"mintable",width:'45%', align:"center", label:"Số bàn tối thiểu"}
        
    ]
  
    const {order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    

  return (
    <TableHead>
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.Name ? order : false}
            padding="default"
            align={headCell.align}
            variant='head'
            style={{width: headCell.width, fontSize:'20px', fontWeight:'700', paddingRight:'0'}}
          >
            <TableSortLabel
              active={orderBy === headCell.Name}
              direction={orderBy === headCell.Name ? order : 'asc'}
              onClick={createSortHandler(headCell.Name)}
            >
            {headCell.label}
              {orderBy === headCell.label ? (
                <span >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell  
            variant='head'
            style={{width:'10%', fontSize:'20px', fontWeight:'700', paddingRight:'0'}}>

        </TableCell>
      </TableRow>
    </TableHead>
  );
  }

   const EnhancedTableToolbar = (props) => {
    const classes = useStyles();
    const {FilterHandler, title } = props;
    const [keyword, setKeyword] = useState('')
  
    function onEnter(event){
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

function Row(props){
    const classes = useStyles();
    const {lobbyCategory}= props;
    const dispatch = useDispatch();
    const [rowState, setRowState]= useState({id:'',name:'', mintable:'', editing:lobbyCategory?false:true})

    function EditHandler(){
        setRowState({...rowState, editing:true})
    }

    function Deletehandler(){
        const confirm = window.confirm("Thông tin về loại sảnh sẽ bị xoá hoàn toàn khỏi hệ thống! Bạn có muốn tiếp tục?")
        if(confirm)
            dispatch(DeleteLobbyCategory(rowState))
    }

    function check()
    {
        if(rowState.name&&rowState.mintable)
        {
            if(isNaN(parseInt(rowState.mintable)))
                return {value:false, message:'Số bàn tối thiểu phải là số!'} 

            if(rowState.mintable<0)
                return {value:false, message:'Số bàn tối thiểu không thể là số âm!'}

            else
                return {value:true, message:''}
        }
        else
            return {value:false, message:'vui lòng nhập đầy đủ thông tin!'}
    }

    function Success()
    {
        if(lobbyCategory)
            setRowState({...rowState, editing:false})
        else
            setRowState({...rowState,id:'',name:'', mintable:'',editing:true})
    }
    function FinishHandler()
    {
        const resultCheck = check()
        if(resultCheck.value)
        {
            if(lobbyCategory)
            {
                const category = {id:rowState.id, name:rowState.name, mintable:rowState.mintable}
                dispatch(UpdateLobbyCategory(category,Success))
            }
            else
            {
                
                const category = {name:rowState.name, mintable:rowState.mintable}
                dispatch(InsertLobbyCategory(category,Success))
            }
        }
        else
        {
            dispatch(actError(resultCheck.message))
        }
        
    }

    function Cancelhandler()
    {
        setRowState({...rowState, name:lobbyCategory.name, mintable:lobbyCategory.mintable, editing:false})
    }

    function handleChange(event)
    {
        setRowState({...rowState,[event.target.name]: event.target.value})
    }
    useEffect(()=>{
        if(lobbyCategory)
            setRowState({...rowState,id:lobbyCategory.id,name:lobbyCategory.name, mintable:lobbyCategory.mintable})
    },[])



    return(
        <TableRow className={`${classes.BodyRow} ${rowState.editing?classes.rowEditing:''}`}>
            <TableCell 
                className={classes.InputCell}  
                align='center'>
                <TextField
                    disabled={rowState.editing?false:true}
                    value={rowState.name}
                    name="name"
                    placeholder="Tên loại sảnh"
                    onChange={handleChange}
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
                    type="number"
                    disabled={rowState.editing?false:true}
                    value={rowState.mintable}
                    name="mintable"
                    placeholder="Số bàn tối thiểu"
                    onChange={handleChange}
                    inputProps={{min:0}}
                    InputProps={{
                        disableUnderline:true,
                        className:classes.inputText}}
                />
            </TableCell>
            <TableCell 
                className={classes.ControlCell}
                align='center'
            >
                {
                    rowState.editing?
                    <div className={classes.divControl}>
                        <IconButton classes={{label:classes.ButtonLabel}} onClick={FinishHandler}>
                            <Done className={classes.Icon}/>
                        </IconButton>
                        {lobbyCategory?
                            <IconButton classes={{label:classes.ButtonLabel}}  onClick={Cancelhandler}>
                                <Close className={classes.Icon}/>
                            </IconButton>
                            :null
                        }
                    </div>
                    :<div className={classes.divControl}>
                        <IconButton classes={{label:classes.ButtonLabel}} onClick={EditHandler}>
                            <Edit className={classes.Icon}/>
                        </IconButton>
                        <IconButton classes={{label:classes.ButtonLabel}} onClick={Deletehandler}>
                            <Delete className={classes.Icon} />
                        </IconButton>
                    </div>
                }
            </TableCell>
        </TableRow>
    )
}