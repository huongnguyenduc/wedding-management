import { CircularProgress, Dialog, Fade, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField} from "@material-ui/core"
import React,{useEffect, useState} from "react"
import useStyles from './CategoryStyle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import FoodService from '../FoodService'
import { Alert } from "@material-ui/lab";


function EnhancedTableHead(props) {
    const headCells =[
        {id:0,Name:"id",width:'5%',align:"center",label:"ID"},
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
        if (order != 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function CategoryDialog(props) {
    const {Open, handleClose} = props;
    const classes = useStyles();
    const [order,setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [categoryData, setCategoryData]= useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [rowEdit,SetRowEdit] = useState({id:'', name:'', moreInfo:''});
    const [rowInsert, setRowInsert] = useState({name:'', moreInfo:''})
    const [status, setStatus] = useState({open:false, mesage:"", severity:"error"})
    const [inProgress, setInProgress] = useState(false);

    const InitData = (data)=> {
        setCategoryData(data);
        setInProgress(false);
    }

    useEffect( () =>{
        setInProgress(true)
        FoodService.GetCategoryData(InitData);
        
    },[])

    const handleCloseAlert = ()=>
    {
        setStatus({...status,open:false})
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy == property && order == 'asc';
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
    const handleEdit = (id, name, moreInfo) =>
    {
        SetRowEdit({...rowEdit,id:id, name:name,moreInfo:moreInfo})
    }

    const DeleteData =(id)=>
    {
        let term = categoryData.filter(item=>{return item.id!=id})
        setCategoryData(term)
    }

    const AlertHandler = (status, mesage) =>
    {
        setInProgress(false);
        setStatus({open:true, mesage:mesage, severity:status})
    }

    const handleDelete = (id) =>
    {
        setInProgress(true);
        FoodService.DeleteCategory(id,DeleteData,AlertHandler);
    }
    const handleCloseEdit = () =>
    {    
        SetRowEdit({...rowEdit,id:"", name:"",moreInfo:""})
    }

    const FinishEdit = (info)=>
    {
        let term= categoryData.filter((item)=>{return (item.id!=info.id)});
        term.push(info)
        setCategoryData(term);
        SetRowEdit({...rowEdit,id:"", name:"",moreInfo:""})
    }

    const finish = (status, mesage)=>
    {
        setInProgress(false)
        AlertHandler(status, mesage)
    }

    const handleFinishEdit = ()=>
    {
        if(rowEdit.id&&rowEdit.name&&rowEdit.moreInfo)
        {
            setInProgress(true)
            FoodService.EditCategory(rowEdit, FinishEdit,finish);
        }
        else
        {
            setStatus({open:true, mesage:"Vui lòng nhập đầy đủ thông tin", severity:"error"})
        }
        
        
    }
    const handleReset =(index)=>
    {
        if(index!=rowEdit.id&&rowEdit.id!="")
        {
            SetRowEdit({...rowEdit,id:"", name:"",moreInfo:""})
        }
       
    }

    const InsertData = (info)=>
    {
       
        let term= categoryData.slice();
        term.push(info)
        setCategoryData(term);
        
    }

    const handleInsert = () =>
    {
        if(rowInsert.name&&rowInsert.moreInfo)
        {
            FoodService.InsertCategory(rowInsert, InsertData,AlertHandler)
            setRowInsert({name:'', moreInfo:''})
        }
        else
        {
            setStatus({open:true, mesage:"Vui lòng nhập đầy đủ thông tin", severity:"error"})
        }
    }
    
    const handleChange = (e)=>
    {
        SetRowEdit({...rowEdit,[e.target.name]:e.target.value});
       
    }
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
                                        <TableRow 
                                                key={row.id}
                                                hover
                                        >
                                            <TableCell  className={classes.inputText} name="id"> {row.id} </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name='name'
                                                    placeholder="Tên loại món"
                                                    fullWidth
                                                    InputProps={{
                                                        disableUnderline:true,
                                                        className:classes.inputText
                                                    }}
                                                    value={row.id==rowEdit.id?rowEdit.name:row.name}
                                                    disabled={row.id==rowEdit.id?false:true}
                                                    onChange={handleChange} 
                                                    multiline
                                                />
                                            </TableCell>
                                            <TableCell >
                                                <TextField 
                                                    name="moreInfo"
                                                    placeholder="Mô tả"
                                                    fullWidth
                                                    InputProps={{
                                                        disableUnderline:true,
                                                        className:classes.inputText
                                                    }}
                                                    value={row.id==rowEdit.id?rowEdit.moreInfo:row.moreInfo}
                                                    onChange={handleChange} 
                                                    disabled={row.id==rowEdit.id?false:true}
                                                    multiline
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className={classes.CellControl}>
                                                    {
                                                        rowEdit.id==row.id?(<>
                                                            <IconButton classes={{ label: classes.ButtonLabel }} onClick={handleFinishEdit} disabled={inProgress} >
                                                                <DoneIcon/>
                                                            </IconButton>
                                                            <IconButton classes={{ label: classes.ButtonLabel }}  onClick={handleCloseEdit} disabled={inProgress}>
                                                                <CloseIcon/>
                                                            </IconButton>
                                                            </>):(<>
                                                            <IconButton  classes={{ label: classes.ButtonLabel }}  onClick={()=>handleEdit(row.id,row.name, row.moreInfo)} disabled={inProgress}>
                                                                <EditIcon/>
                                                            </IconButton>
                                                            <IconButton classes={{ label: classes.ButtonLabel }}  onClick={()=>handleDelete(row.id)} disabled={inProgress}>
                                                                <DeleteIcon />
                                                            </IconButton></>)
                                                    }
                                                    
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            {
                                categoryData.length<=page*rowsPerPage+rowsPerPage?(<TableRow hover  onClick={handleReset} >
                                    <TableCell>
    
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name = "name"
                                            placeholder="Tên loại món"
                                            fullWidth
                                            InputProps={{
                                                disableUnderline:true,
                                            }}
                                            classes={{
                                                root:classes.inputDisabled
                                            }}
                                            value={rowInsert.name}
                                            onChange={(e)=>setRowInsert({...rowInsert,name:e.target.value})}
                                            multiline
                                        />
                                    </TableCell>
                                    <TableCell className={classes.CellInfo}>
                                        <TextField 
                                            name="moreInfo"
                                            placeholder="Mô tả"
                                            fullWidth
                                            value={rowInsert.moreInfo}
                                            InputProps={{
                                                disableUnderline:true,
                                            }}
                                            classes={{
                                                root:classes.inputDisabled
                                            }}
                                            onChange={(e)=>setRowInsert({...rowInsert,moreInfo:e.target.value})}
                                            multiline
                                        />
    
                                    </TableCell>
                                    <TableCell>
                                        <IconButton classes={{ label: classes.ButtonLabel }} onClick={handleInsert} disabled={inProgress}>
                                            <DoneIcon style={{fontSize:'20px'}} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>):null
                            }
                        </TableBody>
                        <TableFooter >
                            <TableRow>
                            <TableCell style={{paddingTop:'5px', marginLeft:'20px'}}>
                                <Fade 
                                    in={inProgress}
                                    unmountOnExit
                                >
                                    <CircularProgress/>
                                </Fade>
                            </TableCell>
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

                

            <Snackbar open={status.open} autoHideDuration={3000} onClose={handleCloseAlert} >
                <Alert onClose={handleCloseAlert} severity={status.severity} >
                {status.mesage}
                </Alert>
            </Snackbar>
                  
            </Paper>
        </Dialog> 
        
    );
}

export default CategoryDialog;

