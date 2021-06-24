import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, TextField, ButtonGroup, Button, FormHelperText, Dialog, CircularProgress } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TableList from './TableList'
import { connect } from 'react-redux';
import clickRowTable from '../actions/clickRowTable';
import normalState from '../actions/tableState/normal';
import { useForm, Form } from './useForm';
import { ADD_TABLE, EDIT_TABLE, NORMAL } from '../reducers/tableState';
import TableDetailDialog from './TableDetail/TableDetail';
import Popover from '@material-ui/core/Popover';
import Controls from '../components/controls/Controls'
import AddTableCategoryDialog from './AddTableCategoryDialog'
import {actFetchFoodsRequest} from '../../../action/food';
import {actFetchTableFoodsRequest} from '../../../action/tableFood';
import {actAddTableRequest, actUpdateTableRequest} from '../../../action/table';
import { addMiddleware } from 'redux-dynamic-middlewares'
import { green, lightBlue } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons/';
import TableKindList from './TableKindList';
import {actFetchTablesRequest} from './../../../action/table';
import {actGetLobbyRequest} from './../../../action/lobby';
import {actFetchTableCategoriesRequest} from './../../../action/tableCategory';
import { useSnackbar } from 'notistack';
import NumberFormat from 'react-number-format';
import {Done, Clear } from '@material-ui/icons';
import {orange, red} from '@material-ui/core/colors';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);

const useStyles = makeStyles((theme) => ({
    appBar: {
    position: 'relative',
    },
    title: {
    display: 'flex',
    justifyContent: 'center',
    },
    formWedding: {
        padding: "3rem",
        border: "1px solid black",
        borderRadius: "10px",
        marginTop: "30px"
    },
    formWeddingTitle: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '295px',
        width: '170px',
        justifyContent: 'center'
    },
    tableInfo: {
        marginTop: "20px"
    },
    tableInfoItem: {
        backgroundColor: '#4c6ef4',
        marginRight: "10px",
        borderRadius: "13px",
        padding: "5px 0px",
        boxShadow: '0 5px 10px -2px rgba(76, 110, 244, 0.9)',
        border: 0,
        alignSelf: "center"
    },
    tableInfoItemTotal: {
        marginRight: "10px",
        borderRadius: "13px",
        padding: "5px 0px",
        boxShadow: '0 5px 10px -2px rgba(76, 110, 244, 0.9)',
        border: 0,
        alignSelf: "center"
    },
    tableInfoFormItem: {
        marginTop: '10px',
    },
    searchIcon: {
        marginTop: '40px',
    },
    searchText: {
        marginTop: '20px',
        marginLeft: '5px',
    },
    popover: {
    pointerEvents: 'none',
    },
    paperPopover: {
        padding: theme.spacing(1),
    },
    unitPriceText: {
        marginTop: '25px',
        marginBottom: '25px', 
    },
    buttonTable: {
        margin: "5px 5px"
    }
}));

function Table(props) {
    useEffect(()=>{
        props.fetchAllTableCategoriesInfo(); 
        props.fetchAllTablesInfo(props.weddingId);
        props.getLobby(props.lobbyId);
    }, [])// eslint-disable-line
    var initialValues = {
            id: 0,
            tableKind: "",
            numberTables: 0,
            reverseTables: 0,
            unitPriceTable: props.recentLobby.minUnitPriceTable, 
            note: "", 
        };

    var selectedTableValues = {
        id: props.selectedTable.id || 0,
        tableKind: props.selectedTable.tableKind || "",
        numberTables: props.selectedTable.numberTables || 0,
        reverseTables: props.selectedTable.reverseTables || 0,
        unitPriceTable: props.selectedTable.unitPriceTable || 0, 
        note: props.selectedTable.note || "", 
    };
    const classes = useStyles();

    const handleIncrement = (prop) => (event) => {
        setValues({ ...values, [prop]: parseInt(values[prop]) + 1 });
    };

    const handleDecrement = (prop) => (event) => {
        setValues({ ...values, [prop]: parseInt(values[prop]) - 1 });
    };
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        console.log((+fieldValues.numberTables + totalTables(props.tables.feastTables)));
        console.log(props.recentLobby.maxtable);
        let checkTables = ((+fieldValues.numberTables + totalTables(props.tables.feastTables)) <= props.recentLobby.maxtable ? true : false)
        console.log(checkTables);
        console.log(fieldValues);
        console.log(temp);
        if ('numberTables' in fieldValues)
            temp.numberTables = ((checkTables === false) ? "Tổng số lượng bàn đã đặt vượt quá số lượng bàn tối đa!" : (+fieldValues.numberTables <= 0) ? "Số lượng bàn phải lớn hơn 0" :  "");
        if ('tableKind' in fieldValues)
            temp.tableKind = 
                fieldValues.tableKind ? "" :"Không được để trống";
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, true, validate);
    const changeToNormalState = () => {
        props.resetTableClickRow();
        props.changeNormalTableState();        
    }
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            if (props.currentTableState.state === ADD_TABLE) {
                console.log('chuan bi add table')
                console.log(createTable())
                props.addTable(createTable(), addTableSuccess, addTableFailure);
            }
            if (props.currentTableState.state === EDIT_TABLE) {
                console.log('chuan bi edit table')
                console.log(createTable())
                props.editTable(updateTable(), updateTableSuccess, updateTableFailure);
            }
            resetForm()
            changeToNormalState()
        }
    }
    const addTableSuccess = () => {
        handleClickVariant("success", "Thêm thông tin đặt bàn thành công!")
    }

    const addTableFailure = () => {
        handleClickVariant("error", "Lỗi hệ thống. Thêm thông tin đặt bàn thất bại!")
    }

    const updateTableSuccess = () => {
        handleClickVariant("success", "Chỉnh sửa thông tin đặt bàn thành công!")
    }

    const updateTableFailure = () => {
        handleClickVariant("error", "Lỗi hệ thống. Chỉnh sửa thông tin đặt bàn thất bại!")
    }
    const displayCounter = (prop) => values[prop] > 0;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [moreInfo, setMoreInfo] = React.useState('');
    const handlePopoverOpen = (event, moreInfoInput) => {
        setAnchorEl(event.currentTarget);
        setMoreInfo(moreInfoInput.moreInfo);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
        console.log("open ne")
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const [openTableFoodDialog, setOpenTableFoodDialog] = React.useState(false);
    const handleClickOpenTableFoodDialog = () => {
        setOpenTableFoodDialog(true);
    };

    const handleCloseTableFoodDialog = () => {
        setOpenTableFoodDialog(false);
    };
    
    const totalTables = (tables) => {
        let totalTables = 0;
        if (tables)
            tables.forEach((table) => {totalTables+=parseInt(table.numberTables)});
        return totalTables;
    }

    const mapTableKindProperty = (feastTables) => {
        var newTables = feastTables.map((table) => {
            return {
                ...table,
                tableKind: table.tableCategory.name
            }
        });
        console.log(newTables)
        return newTables;
    }

    const createTable = () => {
        return {
            feastId: props.weddingId,
            note: values.note,
            numberTables: values.numberTables,
            reverseTables: values.reverseTables,
            tableCategoryId: values.tableKind,
            unitPriceTable: values.unitPriceTable,
            totalPrice: values.unitPriceTable * values.numberTables
        }
    }

    const updateTable = () => {
        return {
            feastId: props.weddingId,
            note: values.note,
            numberTables: values.numberTables,
            reverseTables: values.reverseTables,
            tableCategoryId: values.tableKind,
            unitPriceTable: values.unitPriceTable,
            id: props.selectedTable.id,
            totalPrice: values.unitPriceTable * values.numberTables
        }
    }

    const clickRowTableMiddleware = store => next => action => {
        if (action.type === 'ADD_TABLE_STATE') {
            setValues(initialValues);
        }
        if (action.type === 'CLICK_ROW_TABLE') {
            console.log('middleware clickrow ne')
            if (action.payload.tableCategory){
                setValues({...action.payload, tableKind: action.payload.tableCategory.id});
            }
        }
        return next(action)
    }
    addMiddleware(clickRowTableMiddleware);
    const [openTableCategoryDialog, setOpenTableCategoryDialog] = React.useState(false);
    console.log(props.recentLobby)
    return (
        props.recentLobby ? <div>
            <Dialog open={openTableCategoryDialog} onClose={() => {setOpenTableCategoryDialog(false)}} aria-labelledby="form-dialog-title" maxWidth="md">
          {props.tableCategories ? <TableKindList rows={props.tableCategories} /> : <CircularProgress />}
        </Dialog>
            <TableDetailDialog weddingId={props.weddingId} openTableFoodDialog = {openTableFoodDialog} handleCloseTableFoodDialog={handleCloseTableFoodDialog}/>
            <AddTableCategoryDialog open={openDialog} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
            <Popover
                className={classes.popover}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                disableRestoreFocus
            >
                <Typography variant='h6' align='center'>{moreInfo}</Typography>
            </Popover>
            <Form onSubmit={handleSubmit}>
                <Typography variant="h4" className={classes.title}>
                    Phiếu đặt bàn
                </Typography>
                <Grid container className={classes.tableInfo} maxWidth='md'>
                    <Grid item sm={2} xs={12}>
                        
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center">
                            Đơn giá bàn tối thiểu
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            <NumberFormat value={ props.lobbyId ? props.recentLobby.minUnitPriceTable : 0 } displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                        </WhiteTextTypography>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center">
                            Số lượng bàn tối đa
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            { props.lobbyId ? props.recentLobby.maxtable : '0' }
                        </WhiteTextTypography>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center">
                            Số lượng bàn tối thiểu
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            { props.lobbyId ? props.recentLobby.minTableCategory : '0' }
                        </WhiteTextTypography>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.tableInfoItemTotal}
                    style={{
                        backgroundColor: props.tables.feast && props.lobbyId ? 
                                (totalTables(props.tables.feastTables) >=props.recentLobby.minTableCategory ?
                                "#66bb6a" : '#ffd600') : "#f44336"
                    }}
                    >
                        <WhiteTextTypography variant="subtitle1" align="center" color="#fff">
                            Tổng số bàn hiện tại
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            { props.tables.feast ? 
                                totalTables(props.tables.feastTables)
                                : '' }
                        </WhiteTextTypography>
                    </Grid>
                </Grid>
                <Container maxWidth='lg' className={classes.formWedding} >
                    <Container className={classes.formWeddingTitle}>    
                        <Typography variant="subtitle" align='center'>Thông tin đặt bàn</Typography>
                    </Container>
                    <Grid container spacing={6} direction='row'>
                        <Grid item xs={12} sm={6} align='center'>
                            {props.currentTableState.state === NORMAL ?
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={selectedTableValues.tableKind}
                                id="tableKind"
                                name="tableKind"
                                onChange={handleInputChange} 
                                {...(errors.tableKind && {error:true,helperText:errors.tableKind})}
                                label="Loại bàn"
                                className={classes.tableInfoFormItem} /> : 
                            <div>
                                <Controls.Select
                                    label="Loại bàn"
                                    name="tableKind" 
                                    value={values.tableKind}
                                    onChange={handleInputChange}
                                    options={props.tableCategories}
                                    error={errors.tableKind}
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                    hover={true}/>
                                    <div className={classes.buttonTable}>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            startIcon={<Add style={{color: "#fff", fontSize: "10px" }} />}
                                            style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 150, marginRight: "10px" }}
                                            onClick={ handleClickOpen }
                                        >
                                            Thêm loại bàn
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            style={{ borderRadius: 10, backgroundColor: lightBlue[500], fontSize: "10px", color: "#fff", width: 200 }}
                                            onClick={ () => {setOpenTableCategoryDialog(true)} }
                                        >
                                            Danh sách loại bàn
                                        </Button>
                                    </div>
                            </div>
                                }
                            <FormControl className={classes.tableInfoFormItem} variant="outlined" fullWidth name="numberTables" >
                            <InputLabel htmlFor="outlined-adornment-password">Số lượng</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                labelWidth={60}
                                name="numberTables"
                                value={props.currentTableState.state === NORMAL ? selectedTableValues.numberTables :  values.numberTables}
                                onChange={handleInputChange}
                                {...(errors.numberTables && {error:true,helperText:errors.numberTables})}
                                endAdornment={
                                    props.currentTableState.state !== NORMAL ? 
                                <InputAdornment position="end">
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        {displayCounter('numberTables') && <Button onClick={handleDecrement('numberTables')}>-</Button>}
                                        <Button onClick={handleIncrement('numberTables')}>+</Button>
                                    </ButtonGroup>
                                </InputAdornment> : <></>
                                }
                            />
                            {errors.numberTables && (
                                <FormHelperText error id="numberTables">
                                    {errors.numberTables}
                                </FormHelperText>
                            )}
                            </FormControl>
                            <FormControl className={classes.tableInfoFormItem} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Số lượng dự trữ</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="reverseTables"
                                labelWidth={100}
                                value={props.currentTableState.state === NORMAL ? selectedTableValues.reverseTables :  values.reverseTables}
                                onChange={handleInputChange}
                                {...(errors.reverseTables && {error:true,helperText:errors.reverseTables})}
                                endAdornment={
                                    props.currentTableState.state !== NORMAL ?
                                <InputAdornment position="end">
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        {displayCounter('reverseTables') && <Button onClick={handleDecrement('reverseTables')}>-</Button>}
                                        <Button onClick={handleIncrement('reverseTables')}>+</Button>
                                    </ButtonGroup>
                                </InputAdornment> : <></>
                                }
                            />
                            {!!errors.reverseTables && (
                                <FormHelperText error id="'reverseTables-error">
                                {errors.reverseTables}
                                </FormHelperText>
                            )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            {/* <TextField
                                variant="outlined"
                                fullWidth
                                value={props.currentTableState.state === NORMAL ? selectedTableValues.unitPriceTable : values.unitPriceTable }
                                id="unitPriceTable"
                                name="unitPriceTable"
                                disabled
                                onChange={handleInputChange} 
                                {...(errors.unitPriceTable && {error:true,helperText:errors.unitPriceTable})}
                                label="Đơn giá bàn"
                                className={classes.tableInfoFormItem} /> */}
                            <Typography className={classes.unitPriceText}>Đơn giá bàn:    <NumberFormat value={props.currentTableState.state === NORMAL ? selectedTableValues.unitPriceTable : values.unitPriceTable} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} /></Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.currentTableState.state === NORMAL ? selectedTableValues.note : values.note }
                                {...(errors.note && {error:true,helperText:errors.note})}
                                id="note"
                                name="note"
                                onChange={handleInputChange} 
                                label="Ghi chú"
                                className={classes.tableInfoFormItem} />
                            { props.selectedTable.id ? 
                            <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => 
                                {props.fetchAllFoods(); 
                                props.fetchAllTableFoods(props.selectedTable.id);
                                handleClickOpenTableFoodDialog();
                                }}
                            startIcon={<FastfoodIcon style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                            style={{ borderRadius: 10, backgroundColor: orange["A700"], fontSize: "12px", color: "#fff", width: 250, marginRight: "10px", marginTop: "20px" }}>
                                Mở chi tiết phiếu đặt bàn
                            </Button> : <></>}
                            {props.currentTableState.state !== NORMAL ? 
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group" size='large'>
                                <Button
                            variant="contained"
                            type="submit"
                            className={classes.button}
                            startIcon={<Done style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                            style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 150, marginRight: "10px" }}>
                                Hoàn tất
                            </Button>
                                <Button
                            variant="contained"
                            onClick={() => {changeToNormalState(); resetForm(); }}
                            className={classes.button}
                            startIcon={<Clear style={{color: "#fff", fontSize: "20px", marginLeft: "-15px" }} />}
                            style={{ borderRadius: 10, backgroundColor: red[400], fontSize: "10px", color: "#fff", width: 150, marginRight: "10px" }}>
                                Hủy
                            </Button>
                            </ButtonGroup> : <></>}  
                            
                        </Grid>
                    </Grid>                   
                </Container>
                <Container maxWidth='lg' className={classes.listFormWedding}>
                    <Grid container spacing={0} >
                        <Grid item xs={12}>
                            <TableList rows={props.tables.feastTables ? mapTableKindProperty(props.tables.feastTables) : []}/>
                        </Grid>
                    </Grid>
                </Container>
            </Form> 
        </div> : <CircularProgress /> 
    );
}

const mapStateToProps = state => {
    return {
        tables : state.tables,
        currentTableState : state.tableState,
        tableCategories: state.tableCategories,
        selectedWedding: state.selectedRow,
        selectedTable : state.selectedRowTable,
        lobbies: state.lobbies,
        recentLobby: state.lobbyItem
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        resetTableClickRow : () => {
            dispatch(clickRowTable([]));
        },
        changeNormalTableState : () => {
            dispatch(normalState());
        },
        fetchAllFoods : () => {
            dispatch(actFetchFoodsRequest());
        },
        fetchAllTableFoods : (tableFoodId) => {
            dispatch(actFetchTableFoodsRequest(tableFoodId));
        },
        addTable : (table, addTableSuccess, addTableFailure) => {
            dispatch(actAddTableRequest(table, addTableSuccess, addTableFailure));
        },
        editTable : (table, updateTableSuccess, updateTableFailure) => {
            dispatch(actUpdateTableRequest(table, updateTableSuccess, updateTableFailure));
        },
        fetchAllTablesInfo : (idWedding) => {
            dispatch(actFetchTablesRequest(idWedding));
        },
        fetchAllTableCategoriesInfo : () => {
            dispatch(actFetchTableCategoriesRequest());
        },
        getLobby: (idLobby) => {
            dispatch(actGetLobbyRequest(idLobby));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);