import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, TextField, ButtonGroup, Button, FormHelperText } from '@material-ui/core';
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
import { green } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons/';

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
        margin: "0px 8px",
        borderRadius: "13px",
        padding: "5px 0px",
        boxShadow: '0 5px 10px -2px rgba(76, 110, 244, 0.9)',
        border: 0,
        
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
    }
}));

function Table(props) {
    const recentLobby = () => {
        var index = -1;
        index = props.lobbies.findIndex((lobby) => lobby.id === props.selectedWedding.lobbyId);
        if (index !== -1) {
            return props.lobbies[index];
        }
    }
    var initialValues = {
            id: 0,
            tableKind: "",
            numberTables: 0,
            reverseTables: 0,
            unitPriceTable: recentLobby().minUnitPriceTable, 
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
        if ('numberTables' in fieldValues)
            temp.numberTables = 
                (+fieldValues.numberTables === 0 ? "Số lượng bàn phải lớn hơn 0" : +fieldValues.numberTables + totalTables(props.tables.feastTables) <= recentLobby().maxTable) 
                    ? "" :"Tổng số lượng bàn đã đặt vượt quá số lượng bàn tối đa!";
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
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            if (props.currentTableState.state === ADD_TABLE) {
                console.log('chuan bi add table')
                console.log(createTable())
                props.addTable(createTable());
            }
            if (props.currentTableState.state === EDIT_TABLE) {
                console.log('chuan bi edit table')
                console.log(createTable())
                props.editTable(updateTable());
            }
            resetForm()
            changeToNormalState()
        }
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
            feastId: props.selectedWedding.id,
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
            feastId: props.selectedWedding.id,
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

    return (
        <div>
            <TableDetailDialog openTableFoodDialog = {openTableFoodDialog} handleCloseTableFoodDialog={handleCloseTableFoodDialog}/>
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
                    <Grid item sm={4} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center">
                            Đơn giá bàn tối thiểu
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            { props.selectedWedding.lobbyId ? recentLobby().minUnitPriceTable : 0 }
                        </WhiteTextTypography>
                    </Grid>
                    <Grid item sm={4} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center">
                            Số lượng bàn tối đa
                        </WhiteTextTypography>
                        <WhiteTextTypography variant="h6" align="center">
                            { props.selectedWedding.lobbyId ? recentLobby().maxTable : '' }
                        </WhiteTextTypography>
                    </Grid>
                    <Grid item sm={3} xs={12} className={classes.tableInfoItem}>
                        <WhiteTextTypography variant="subtitle1" align="center" color="#fff">
                            Tổng số bàn
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
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    startIcon={<Add style={{color: "#fff", fontSize: "20px" }} />}
                                    style={{ borderRadius: 10, backgroundColor: green[400], fontSize: "10px", color: "#fff", width: 250 }}
                                    onClick={ handleClickOpen }
                                >
                                    Thêm loại bàn
                                </Button>
                            </div>
                                }
                            <FormControl className={classes.tableInfoFormItem} variant="outlined" fullWidth >
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
                            {!!errors.numberTables && (
                                <FormHelperText error id="'numberTables-error">
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
                            <Typography className={classes.unitPriceText}>Đơn giá bàn:    {props.currentTableState.state === NORMAL ? selectedTableValues.unitPriceTable : values.unitPriceTable}</Typography>
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
                            { props.selectedTable.id ? <Button 
                            variant="outlined" 
                            color="primary" 
                            label="Chi tiết" 
                            fullfill 
                            size='large' 
                            onClick={() => 
                                {props.fetchAllFoods(); 
                                props.fetchAllTableFoods(props.selectedTable.id);
                                handleClickOpenTableFoodDialog();
                                }}>
                                Mở chi tiết phiếu đặt bàn
                            </Button> : <></>}
                            {props.currentTableState.state !== NORMAL ? 
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group" size='large'>
                                <Button type="submit">Hoàn tất</Button>
                                <Button
                                    onClick={() => {changeToNormalState(); resetForm(); }}>Hủy</Button>
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
        </div>
    );
}

const mapStateToProps = state => {
    return {
        tables : state.tables,
        currentTableState : state.tableState,
        tableCategories: state.tableCategories,
        selectedWedding: state.selectedRow,
        selectedTable : state.selectedRowTable,
        lobbies: state.lobbies
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
        addTable : (table) => {
            dispatch(actAddTableRequest(table));
        },
        editTable : (table) => {
            dispatch(actUpdateTableRequest(table));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);