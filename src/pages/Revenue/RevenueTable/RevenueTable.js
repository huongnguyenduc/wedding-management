import { Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography} from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from "./RevenueTableStyle"


function RevenueTable(props){

    const {revenues,year, month, ...other} = props
    const classes = useStyles();
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


    const emptyRows = tableState.rowsPerPage - Math.min(tableState.rowsPerPage, revenues.length - tableState.page * tableState.rowsPerPage);

    return(
        <Container maxWidth='lg' className={classes.CategoryTable} {...other}>
            <TableContainer>
                <EnhancedTableToolbar month={month} year={year}/>
                <Table>
                <EnhancedTableHead order={tableState.order} orderBy={tableState.orderBy} onRequestSort={handleRequestSort}/>
                <TableBody>
                    {
                    tableSort(tableFilter(revenues,tableState.keyword), getComparator(tableState.order, tableState.orderBy))
                    .slice(tableState.page*tableState.rowsPerPage, (tableState.page + 1)*tableState.rowsPerPage)
                    .map(row=>{
                        return(
                            <Row key={row.id} revenue={row} />
                        )   
                        })
                    }
                    {emptyRows > 1 && (
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
                            count={revenues.length}
                            onChangePage={handleChangePage}
                            />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
        </Container>
        
    )
}

export default RevenueTable


function EnhancedTableHead(props) {
    const headCells =[
        {id:1,Name:"date",width:'25%', align: "left", label:"Ngày"},
        {id:2,Name:"feastCount",width:'25%', align: "left", label:"Số lượng tiệc"},
        {id:3,Name:"revenue",width:'30%', align: "left", label:"Doanh số"},
        {id:4,Name:"ratio",width:'20%', align: "left", label:"Tỉ lệ"},
        
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
    const {month, year, ...other} = props
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
        {`Doanh thu tháng ${month}/${year}`}
        </Typography>
      
      </Toolbar>
    );
  };

function Row(props){
    const classes = useStyles();
    const {revenue,...other}= props;

    return(
        <TableRow className={classes.BodyRow} {...other}>
            <TableCell 
                className={classes.BodyCell}  
                align='left'
            >
            {
                revenue.date
            }   
            </TableCell>
            <TableCell 
                className={classes.BodyCell}  
                align='left'
            >
            {
                revenue.feastCount 
            }   
            </TableCell>
            <TableCell 
                className={classes.BodyCell}  
                align='left'
            >
            {
              revenue.revenue.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
              })
            }   
            </TableCell>
            <TableCell 
                className={classes.BodyCell}  
                align='left'
            >
            {
              `${revenue.ratio.toFixed(4)*100} %`
            }   
            </TableCell>
        </TableRow>
    )
}