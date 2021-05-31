import React from 'react'
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import { useForm, Form } from './components/useForm';
import Controls from './components/controls/Controls'
import { useDispatch, connect } from 'react-redux'
import normalState from './actions/weddingState/normal';
import { NORMAL } from './reducers/weddingState';
import clickRow from './actions';
import { actAddWeddingRequest, actUpdateWeddingRequest } from './../../action/index';
import { addMiddleware } from 'redux-dynamic-middlewares'
import { Link } from 'react-router-dom';
import {actFetchTablesRequest} from './../../action/table';
import {actFetchServicesRequest} from './../../action/service';
import {actFetchWeddingServicesRequest} from './../../action/weddingService';
import {actFetchTableCategoriesRequest} from './../../action/tableCategory';

const initialValues = {
        groomName: "",
        brideName: "",
        phone: "",
        lobbyName: "", 
        weddingDate: new Date(), 
        nameShift: "", 
        note: "", 
        deposit: 0.0,
        numberOfTables: 20,
        idShift: 1,
        lobbyId: 1,
}

function WeddingForm(props) {
    const dispatch = useDispatch();

    var selectedRowValues = {
        groomName: props.selectedWedding.groomName || "",
        brideName: props.selectedWedding.brideName || "",
        phone: props.selectedWedding.phone || "",
        lobbyName: props.selectedWedding.lobbyName || "", 
        weddingDate: props.selectedWedding.weddingDate || new Date(), 
        nameShift: props.selectedWedding.nameShift || "", 
        note: props.selectedWedding.note || "", 
        deposit: props.selectedWedding.deposit || "",
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('groomName' in fieldValues)
            temp.groomName = fieldValues.groomName ? "" :"Không được bỏ trống";
        if ('brideName' in fieldValues)
            temp.brideName = fieldValues.brideName ? "" : "Không được bỏ trống";
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" :"Tối thiểu 10 chữ số";
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
                nameShift, 
                note, 
                deposit, 
                numberOfTables, 
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
                nameShift: nameShift, 
                note: note, 
                deposit: parseFloat(deposit), 
                numberOfTables: numberOfTables, 
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
                nameShift: nameShift, 
                note: note, 
                deposit: parseFloat(deposit), 
                numberOfTables: numberOfTables, 
                idShift: idShift, 
                lobbyId: lobbyId 
            };
                dispatch(actAddWeddingRequest(wedding));
            }
            resetForm()
            changeToNormalState()
        }
    }
    const clickRowEditWeddingMiddleware = store => next => action => {
        if (action.type === 'EDIT_WEDDING_STATE') {
            setValues({...props.selectedWedding, weddingDate: new Date(props.selectedWedding.weddingDate)});
        }
        return next(action)
    }
    addMiddleware(clickRowEditWeddingMiddleware);
    return (
    <>
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
                            label="Ngày đãi tiệc" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.weddingDate : values.weddingDate} 
                            onChange={handleInputChange}
                            error={errors.weddingDate}/>
                    </Grid>
                    <Grid item md={6} xs={12} align='center'>
                        {props.currentWeddingState.state !== NORMAL ?
                            <Controls.Select
                                label="Ca"
                                name="idShift" 
                                value={values.idShift}
                                onChange={handleInputChange}
                                options={props.shifts}
                                error={errors.nameShift}/> :
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
                                error={errors.lobbyName}/> :
                            <Controls.Input
                            name="lobbyName" 
                            label="Sảnh"
                            value={selectedRowValues.lobbyName} 
                            onChange={handleInputChange}
                            error={errors.lobbyName}/>}
                        <Controls.Input
                            name="deposit" 
                            label="Tiền đặt cọc (VND)" 
                            onChange={handleInputChange}
                            error={errors.deposit}
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.deposit : values.deposit}/>
                        <Controls.Input
                            name="note" 
                            label="Ghi chú" 
                            value={props.currentWeddingState.state === NORMAL ? selectedRowValues.note : values.note}
                            error={errors.note}
                            onChange={handleInputChange}/>
                        <Link to="/wedding/table-service">
                        {props.selectedWedding.id ? <Button 
                            onClick={()=>{
                                props.fetchAllTableCategoriesInfo(); 
                                props.fetchAllTablesInfo(props.selectedWedding.id);
                                props.fetchAllServicesInfo();
                                props.fetchAllWeddingServicesInfo(props.selectedWedding.id);
                            }}
                            variant="outlined" 
                            color="primary" 
                            label="Chi tiết" 
                            size='large'>
                                Mở đặt bàn và dịch vụ
                        </Button> : <></>}
                        </Link>
                        {props.currentWeddingState.state !== NORMAL ? <ButtonGroup variant="text" color="primary" aria-label="text primary button group" size='large'>
                            <Controls.Button type="submit" text="Hoàn tất"></Controls.Button>
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
        fetchAllTablesInfo : (idWedding) => {
            dispatch(actFetchTablesRequest(idWedding));
        },
        fetchAllTableCategoriesInfo : () => {
            dispatch(actFetchTableCategoriesRequest());
        },
        fetchAllServicesInfo : () => {
            dispatch(actFetchServicesRequest());
        },
        fetchAllWeddingServicesInfo : (idWedding) => {
            dispatch(actFetchWeddingServicesRequest(idWedding));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeddingForm);