import { Dialog, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField} from "@material-ui/core"
import React,{useEffect, useState} from "react"
import useStyles from './CategoryStyle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { DeleteFoodCategory, InsertFoodCategory, UpdateFoodCategory } from '../FoodService'
import { useDispatch, useSelector } from "react-redux";
import { actError } from "../actions/actions";


function EnhancedTableHead(props) {
    const headCells =[
        {id:1,Name:"name",width:'25%', align: "center", label:"Tên loại món"},
        {id:2,Name:"moreInfo",width:'70%', align:"center", label:"Mô tả"}
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
        <TableCell label="cellControl">

        </TableCell>
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



function CategoryDialog(props) {
    const {Open, handleClose} = props;
    const [order,setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const StoreData = useSelector(state=>state.ChangeFoodData)
    const categoryData = StoreData.FoodCategory;
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event)=>
    {
        setRowsPerPage(parseInt(event.target.value));
    }

    const handleChangePage=(event, newPage)=>
    {
        setPage(newPage)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, categoryData.length - page * rowsPerPage);
    const insertRow = categoryData.length - (page + 1) * rowsPerPage; 
    return(
        <Dialog 
            open={Open} 
            onClose={handleClose}
            scroll="body" 
            keepMounted
            maxWidth="lg"
           
        >
            <Paper>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        ></EnhancedTableHead>
                        <TableBody>
                            {
                                stableSort(categoryData, getComparator(order, orderBy))
                                .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
                                .map((row) =>{
                                    return (
                                        <Row key={`cate_${row.id}`} category={row}/>
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
                        <TableFooter >
                            <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5,10,15]}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                page={page}
                                count={categoryData.length}
                                onChangePage={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                  
            </Paper>
        </Dialog> 
        
    );
}

export default CategoryDialog;

function Row(props)
{
    const {category, ...other} = props

    const classes = useStyles();
    const dispatch = useDispatch()
    const [rowState, setRowState] = useState({id:'',name:'', moreInfo:'', editing:category?false:true})

    function ChangeValue(event)
    {   
        setRowState({...rowState, [event.target.name]:event.target.value})
    }

    function CancelHandler()
    {
        if(category)
            setRowState({...rowState,id:category.id, name:category.name, moreInfo:category.moreInfo, editing:false})
        else
            setRowState({id:'',name:'', moreInfo:'', editing:false})
    }


    function success(){
        if(category)
            setRowState({...rowState, editing:false})
        else
           setRowState({id:'',name:'', moreInfo:'', editing:false})
    }


    function FinishHandler()
    {
        if(rowState.name&&rowState.moreInfo)
        {
            if(rowState.id !=='')
                dispatch(UpdateFoodCategory(rowState, success))
            else
                dispatch(InsertFoodCategory(rowState, success))
        }
        else
        {
            dispatch(actError("Vui lòng nhập đầy đủ thông tin"))
        }
    }

    function DeleteHandler()
    {
        dispatch(DeleteFoodCategory(rowState))
    }

    useEffect(()=>{
        if(category)
            setRowState({...rowState,id:category.id, name:category.name, moreInfo:category.moreInfo, editing:false})
    },[])

    return(
    <TableRow 
            hover
            {...other}
    >
        <TableCell
             className={classes.InputCell}  
             align='center'
        >
            <TextField
                name='name'
                placeholder="Tên loại món"
                fullWidth
                InputProps={{
                    disableUnderline:true,
                    className:classes.inputText
                }}
                value={rowState.name}
                disabled={!rowState.editing}
                onChange={ChangeValue} 
                multiline
            />
        </TableCell>
        <TableCell
            className={classes.InputCell}  
            align='center'
        >
            <TextField 
                name="moreInfo"
                placeholder="Mô tả"
                fullWidth
                InputProps={{
                    disableUnderline:true,
                    className:classes.inputText
                }}
                value={rowState.moreInfo}
                onChange={ChangeValue} 
                disabled={!rowState.editing}
                multiline
            />
        </TableCell>
        <TableCell
            className={classes.ControlCell}
            align='center'
        >
            <div className={classes.divControl}>
                {
                    rowState.editing?(<>
                        <IconButton classes={{ label: classes.ButtonLabel }} onClick={FinishHandler} >
                            <DoneIcon/>
                        </IconButton>
                        {category?<IconButton classes={{ label: classes.ButtonLabel }}  onClick={CancelHandler}>
                            <CloseIcon/>
                        </IconButton>:null}
                        </>)
                        :(<>
                        <IconButton  classes={{ label: classes.ButtonLabel }}  onClick={()=>{setRowState({...rowState,editing:true})}}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton classes={{ label: classes.ButtonLabel }}  onClick={DeleteHandler}>
                            <DeleteIcon />
                        </IconButton></>)
                }
                
            </div>
        </TableCell>
    </TableRow>
    )
}