import React from 'react'
import { Grid, ButtonGroup, Button, Typography, Popover } from '@material-ui/core';
import { useForm, Form } from './components/useForm';
import Controls from './components/controls/Controls'
import { useDispatch, connect } from 'react-redux'
import normalState from './actions/weddingState/normal';
import { NORMAL, ADD_WEDDING_STATE } from './reducers/weddingState';
import clickRow from './actions';
import { actAddWeddingRequest, actUpdateWeddingRequest } from './../../action/index';
import { addMiddleware } from 'redux-dynamic-middlewares'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

const initialValues = {
        groomName: "",
        brideName: "",
        phone: "",
        lobbyName: "", 
        weddingDate: new Date(),
        dateOfOrganization: new Date(), 
        nameShift: "", 
        note: "", 
        deposit: 0.0,
        idShift: 1,
        lobbyId: 1,
}

const useStyles = makeStyles((theme) => ({
    popover: {
    pointerEvents: 'none',
    },
    openButton: {
        marginTop: "10px",
    },
    groupButton: {
        marginTop: "20px"
    }
}));

function WeddingForm(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    var selectedRowValues = {
        groomName: props.selectedWedding.groomName || "",
        brideName: props.selectedWedding.brideName || "",
        phone: props.selectedWedding.phone || "",
        lobbyName: props.selectedWedding.lobbyName || "", 
        weddingDate: props.selectedWedding.weddingDate || new Date(),
        dateOfOrganization: props.selectedWedding.dateOfOrganization || new Date(), 
        nameShift: props.selectedWedding.nameShift || "", 
        note: props.selectedWedding.note || "", 
        deposit: props.selectedWedding.deposit || 0,
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('groomName' in fieldValues)
            temp.groomName = fieldValues.groomName ? "" :"Không được bỏ trống";
        if ('brideName' in fieldValues)
            temp.brideName = fieldValues.brideName ? "" : "Không được bỏ trống";
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : fieldValues.phone.length === 0 ? "Không được bỏ trống" : "Tối thiểu 10 chữ số";
        if ('deposit' in fieldValues)
            temp.deposit = fieldValues.deposit ? "" :"Không được bỏ trống";
        if ('weddingDate' in fieldValues && props.currentWeddingState.state === ADD_WEDDING_STATE)
            temp.weddingDate = checkDateValidate(fieldValues.weddingDate) ? "" :"Ngày không hợp lệ";
        if ('dateOfOrganization' in fieldValues && props.currentWeddingState.state === ADD_WEDDING_STATE)
            temp.dateOfOrganization = checkDateValidate(fieldValues.dateOfOrganization) && checkDateOrganizationValidate(fieldValues.weddingDate, fieldValues.dateOfOrganization) ? "" :"Ngày không hợp lệ";
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, true, validate);
    const changeToNormalState = () => {
        dispatch(clickRow([]));
        dispatch(normalState());            
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            var {
                id,
                groomName, 
                brideName, 
                phone,
                lobbyName, 
                weddingDate,
                dateOfOrganization, 
                nameShift, 
                note, 
                deposit,  
                idShift, 
                lobbyId } = values;
            if (id) {
                let wedding = {
                id: id,
                groomName: groomName, 
                brideName: brideName, 
                phone: phone,
                lobbyName: lobbyName, 
                weddingDate: convertDateToStringDMY(weddingDate),
                dateOfOrganization: convertDateToStringYMD(dateOfOrganization), 
                nameShift: nameShift, 
                note: note, 
                deposit: parseFloat(deposit), 
                idShift: idShift, 
                lobbyId: lobbyId 
            };
                dispatch(actUpdateWeddingRequest(wedding));
            } else {
                let wedding = {
                groomName: groomName, 
                brideName: brideName, 
                phone: phone,
                lobbyName: lobbyName, 
                weddingDate: convertDateToStringDMY(weddingDate),
                dateOfOrganization: convertDateToStringYMD(dateOfOrganization), 
                nameShift: nameShift, 
                note: note, 
                deposit: parseFloat(deposit), 
                idShift: idShift, 
                lobbyId: lobbyId 
            };
                dispatch(actAddWeddingRequest(wedding));
            }
            resetForm()
            changeToNormalState()
            handleClickVariant("success", (props.currentWeddingState.state === ADD_WEDDING_STATE ? "Thêm" : "Sửa") + " tiệc cưới thành công!")
        }
    }
    const clickRowEditWeddingMiddleware = store => next => action => {
        if (action.type === 'EDIT_WEDDING_STATE') {
            setValues({...props.selectedWedding, 
                weddingDate: new Date(props.selectedWedding.weddingDate), 
                    dateOfOrganization: new Date(props.selectedWedding.dateOfOrganization)});
        }
        if (action.type === 'ADD_WEDDING_STATE') {
            setValues({...initialValues, 
                weddingDate: new Date(), 
                    dateOfOrganization: new Date()});
        }
        return next(action)
    }
    addMiddleware(clickRowEditWeddingMiddleware);
    const [moreInfo, setMoreInfo] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handlePopoverOpen = (event, moreInfoInput) => {
        setAnchorEl(event.currentTarget);
        setMoreInfo(moreInfoInput);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
    return (
    <>
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
            <Typography 
            variant='h6' 
            align='center'>
                {moreInfo.timeBegin !== undefined ? 
                    "Thời gian bắt đầu: " + moreInfo.timeBegin.toString() + ". Thời gian kết thúc: " + moreInfo.timeEnd.toString() 
                    : moreInfo.maxTable !== undefined ? "Loại sảnh: " + moreInfo.lobbyCategory.name + ". Tổng số bàn: " + moreInfo.maxTable + ". Đơn giá bàn tối thiểu: " + moreInfo.minUnitPriceTable : ""}
            </Typography>
        </Popover>
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={6} direction='row'>
                    <Grid item md={6} xs={12} align='center' >
                        <Controls.Input
                            defaultValue=''
                            id="groomName"
                            name="groomName" 
                            label="Tên chú rể" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.groomName : values.groomName}
                            onChange={handleInputChange}
                            error={errors.groomName}/>
                        <Controls.Input 
                            id="brideName"
                            name="brideName" 
                            label="Tên cô dâu" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.brideName : values.brideName} 
                            onChange={handleInputChange}
                            error={errors.brideName}/>
                        <Controls.Input 
                            id="phone"
                            name="phone" 
                            label="Điện thoại"
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.phone : values.phone}
                            onChange={handleInputChange}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            error={errors.phone}/>
                        <Controls.DatePicker 
                            id="weddingDate"
                            name="weddingDate" 
                            label="Ngày đặt tiệc" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.weddingDate : values.weddingDate} 
                            onChange={handleInputChange}
                            error={errors.weddingDate}/>
                        <Controls.DatePicker 
                            id="dateOfOrganization"
                            name="dateOfOrganization" 
                            label="Ngày đãi tiệc" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.dateOfOrganization : values.dateOfOrganization} 
                            onChange={handleInputChange}
                            error={errors.dateOfOrganization}/>
                    </Grid>
                    <Grid item md={6} xs={12} align='center'>
                        {props.currentWeddingState.state !== NORMAL ?
                            <Controls.Select
                                label="Ca"
                                name="idShift" 
                                value={values.idShift}
                                onChange={handleInputChange}
                                options={props.shifts}
                                error={errors.nameShift}
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                hover={true}/> :
                            <Controls.Input
                            name="nameShift" 
                            label="Ca"
                            value={selectedRowValues.nameShift} 
                            onChange={handleInputChange}
                            error={errors.lobbyName}/>
                            }
                        {props.currentWeddingState.state !== NORMAL ?
                            <Controls.Select
                                label="Sảnh"
                                name="lobbyId" 
                                value={values.lobbyId}
                                onChange={handleInputChange}
                                options={props.lobbies}
                                error={errors.lobbyName}
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                hover={true}/> :
                            <Controls.Input
                            name="lobbyName" 
                            label="Sảnh"
                            value={selectedRowValues.lobbyName} 
                            onChange={handleInputChange}
                            error={errors.lobbyName}/>}
                        <Controls.Input
                            name="deposit" 
                            label="Tiền đặt cọc" 
                            onChange={handleInputChange}
                            error={errors.deposit}
                            isMoney={true}
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.deposit : values.deposit}/>
                        <Controls.Input
                            name="note" 
                            label="Ghi chú" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.note : values.note}
                            error={errors.note}
                            onChange={handleInputChange}/>
                        <Link to={`/wedding/${props.selectedWedding.id}/${props.selectedWedding.lobbyId}`} >
                        {props.selectedWedding.id ? <Button 
                            onClick={()=>{ }}
                            className={classes.openButton}
                            variant="outlined" 
                            color="primary" 
                            label="Chi tiết" 
                            size='large'>
                                Mở đặt bàn và dịch vụ
                        </Button> : <></>}
                        </Link>
                        {props.currentWeddingState.state !== NORMAL ? <ButtonGroup variant="text" color="primary" aria-label="text primary button group" size='large' className={classes.groupButton}>
                            <Controls.Button type="submit" text="Hoàn tất" ></Controls.Button>
                            <Controls.Button
                                text="Hủy"
                                onClick={() => {changeToNormalState(); resetForm(); }} />
                        </ButtonGroup> : <></>}    
                    </Grid>
            </Grid>
        </Form>
    </>)
}

function convertDateToStringDMY(date) {
    if (date == null) return;
        let day = date.getDate();
        console.log(date);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let result =  (day.toString().length === 1 ? ("0" + day.toString()) : day.toString()) + "/" + (month.toString().length === 1 ? "0" + month.toString() : month.toString()) + "/" +  year; // That's your formatted date.
        console.log(result);
        return result;
}

function convertDateToStringYMD(date) {
    if (date == null) return;
        let day = date.getDate();
        console.log(date);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let result = year +  "/" + (month.toString().length === 1 ? "0" + month.toString() : month.toString()) + "/" + (day.toString().length === 1 ? ("0" + day.toString()) : day.toString()) ; // That's your formatted date.
        console.log(result);
        return result;
}

function checkDateValidate(date) {
    let dateCheck = Date.parse(convertDateToStringYMD(date));
    let dateNow = Date.parse(convertDateToStringYMD(new Date()));
    if (dateCheck < dateNow) return false;
    return true;
}

function checkDateOrganizationValidate(dateWed, dateOrg) {
    let dateCheck = Date.parse(convertDateToStringYMD(dateOrg));
    let dateNow = Date.parse(convertDateToStringYMD(dateWed));
    if (dateCheck < dateNow) return false;
    return true;
}

const mapStateToProps = state => {
    return {
        shifts : state.shifts,
        lobbies : state.lobbies,
        currentWeddingState : state.weddingState,
        selectedWedding : state.selectedRow
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeddingForm);