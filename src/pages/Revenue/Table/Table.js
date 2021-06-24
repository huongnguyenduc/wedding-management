import { Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography} from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from "./TableStyles"


function ReportTable(props){

    const {TableData,Title, attrName, ...other} = props
    const classes = useStyles();
    const  [tableState, setTableState] = useState({ order:'asc', orderBy:attrName, page:0, rowsPerPage:5})

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
    
    function handleChangeRowsPerPage(event){
        setTableState({...tableState, rowsPerPage:event.target.value})
    }

    function handleChangePage(event, newpage)
    {
        setTableState({...tableState,page:newpage})
    }


    const emptyRows = tableState.rowsPerPage - Math.min(tableState.rowsPerPage, TableData.length - tableState.page * tableState.rowsPerPage);

    return(
        <Container maxWidth='lg' className={classes.CategoryTable} {...other}>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap" rel="stylesheet"/>
            <TableContainer>
                <EnhancedTableToolbar Title={Title}/>
                <Table>
                <EnhancedTableHead attrName={attrName} order={tableState.order} orderBy={tableState.orderBy} onRequestSort={handleRequestSort}/>
                <TableBody>
                    {
                    tableSort(TableData, getComparator(tableState.order, tableState.orderBy))
                    .slice(tableState.page*tableState.rowsPerPage, (tableState.page + 1)*tableState.rowsPerPage)
                    .map(row=>{
                        return(
                            <Row key={row.id} attrName={attrName} rowData={row} />
                        )   
                        })
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 54* (emptyRows) }}>
                            <TableCell colSpan={4} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter  className={classes.TableFooter}>
                    <TableRow>
                        <TablePagination
                            className={classes.TablePagination}
                            rowsPerPageOptions={[5,10,15]}
                            rowsPerPage={tableState.rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            page={tableState.page}
                            count={TableData.length}
                            onChangePage={handleChangePage}
                            />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
        </Container>
        
    )
}

export default ReportTable


function EnhancedTableHead(props) {
    const {attrName}  = props
    const headCells =[
        {id:1,Name:attrName,width:'60%', align: "left", label:"Tên"},
        {id:2,Name:"count",width:'40%', align: "center", label:"Số lượng"},       
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
            style={{width: headCell.width, fontSize:'18px', fontWeight:'700', paddingRight:'0'}}
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
            style={{width:'10%', fontSize:'20px', fontWeight:'600', paddingRight:'0'}}>

        </TableCell>
      </TableRow>
    </TableHead>
  );
  }

function EnhancedTableToolbar(props){
    const {Title, ...other} = props
    const classes = useStyles();
    return (
      <Toolbar
        className={classes.Toolbar}
        {...other}
      >
        <Typography
          className={classes.ToolbarTitle}
          id="tableTitle"
          component="div"
        >
        {
            Title
        }
        </Typography>
      
      </Toolbar>
    );
  };

function Row(props){
    const classes = useStyles();
    const {rowData,attrName,...other}= props;
    return(
        <TableRow className={classes.BodyRow} {...other}>
            <TableCell 
                className={classes.BodyCell}  
                align='left'
                key={rowData.id}
            >
            {
                rowData[attrName]
            }   
            </TableCell>
            <TableCell 
                className={classes.BodyCell}  
                align='center'
            >
            {
                rowData.count 
            }   
            </TableCell>
        </TableRow>
    )
}