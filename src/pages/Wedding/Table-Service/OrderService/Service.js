import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, TextField, ButtonGroup, AppBar, Toolbar, Typography, OutlinedInput, FormControl} from '@material-ui/core/';
import ServiceList from './ServiceList'
import ServiceOrderList from './ServiceOrderList';
import { useDispatch, connect } from 'react-redux';
import clickRowService from '../../actions/clickRowService';
import normalState from '../../actions/serviceState/normal';
import { useForm, Form } from './useForm';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NORMAL, EDIT_ORDER_SERVICE } from '../../reducers/serviceState';
import { addMiddleware } from 'redux-dynamic-middlewares'
import {actAddWeddingServiceRequest} from '../../../../action/weddingService';
import {actUpdateWeddingServiceRequest} from '../../../../action/weddingService';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  foodForm: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  textFieldForm: {
    marginTop: theme.spacing(2),
  },
  labelTextFieldForm: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  labelTextFieldFormPrice: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
  },
  searchField: {
    padding: '10px'
  },
  searchFieldIcon: {
    marginTop: '20px'
  },
  searchTextField: {
    marginLeft: '5px'
  },
  textField: {
    marginTop: '45px'
  },
  label: {
    marginTop: '45px',
    marginLeft: '30px'
  },
}));

var initialValues = {
          id: 0,
          name: "",
          price: 0,
          count: 0,
          serviceKind: "", 
          note: "",
      };

function Service(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleIncrement = (prop) => (event) => {
    var newcount = parseInt(values[prop] || 0) + 1 ;
    if (props.currentserviceState.state !== NORMAL) {
      setValues({ ...values, [prop]: newcount});
      validate({ [prop]: newcount });
    }
  };

  const handleDecrement = (prop) => (event) => {
    if (props.currentserviceState.state !== NORMAL)
      setValues({ ...values, [prop]: parseInt(values[prop]) - 1 });
  };

  const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('count' in fieldValues)
             temp.count = fieldValues.count ? "" :"Không được bỏ trống";
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
  }
  const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, true, validate);
  const changeToNormalState = () => {
      dispatch(clickRowService(initialValues));
      dispatch(normalState());            
  }
  const handleSubmit = e => {
      e.preventDefault()
      if (validate()) {
          if (props.currentserviceState.state === EDIT_ORDER_SERVICE) {
            console.log('update ne')
            console.log(updateWeddingService())
            props.updateWeddingService(updateWeddingService())
          }
          else
            props.addWeddingService(createWeddingService())
          resetForm()
          changeToNormalState()
      }
  }

  const displayCounter = (prop) => values[prop] > 0;

  const clickRowServiceMiddleware = store => next => action => {
    if (action.type === 'CLICK_ROW_SERVICE') {
      if (props.currentserviceState.state === EDIT_ORDER_SERVICE) {
        if ('totalPrice' in action.payload) { //Table-Food
          setValues({...action.payload, serviceId: action.payload.service.id});
        } 
        // else {//Food
        //   setValues({...values, name: action.payload.name, price: action.payload.price, foodId: action.payload.id, totalPrice: action.payload.price * values.count});
        // }
      }
      else {
        if ('totalPrice' in action.payload) { //Table-Food
          setValues({...action.payload, serviceId: action.payload.service.id, feastId: props.selectedWedding.id});
        } else
          setValues({...action.payload, count: action.payload.count || 0});
      }
    }
    return next(action)
  }
  addMiddleware(clickRowServiceMiddleware);
  const mapServiceKindProperty = (services) => {
      console.log('xem cac service')
      console.log(services)
      var newservices = services.map((service) => {
          return {
              ...service,
              serviceKind: service.name
          }
      });
      console.log(newservices)
      return newservices;
  }

  const mapWeddingServiceProperty = (weddingServices) => {
    if (weddingServices) {
      var newWeddingServices = weddingServices.map((weddingService) => {
          return {
              ...weddingService,
              name: weddingService.service.name,
              price: weddingService.service.price,
          }
      });
      console.log(newWeddingServices)
      return newWeddingServices;
    }
    return [];
  }

  const createWeddingService = () => {
    return {
      feastId: props.selectedWedding.id,
      serviceId: props.selectedService.id,
      count: values.count,
      note: values.note,
      totalPrice: values.count * values.price,
      unitPrice: values.price,
    }
  }
  const updateWeddingService = () => {
    return {
      feastId: values.feastId,
      serviceId: values.serviceId,
      count: values.count,
      note: values.note,
      totalPrice: values.count * values.price,
      unitPrice: values.price,
    }
  }

  return (
    <div>
        <Grid container className={classes.foodForm}>
            <Grid item xs={7} >
                <ServiceList services={mapServiceKindProperty(props.services)}/>
            </Grid>
            <Grid item xs={2} className={classes.label}>
                <Typography className={classes.labelTextFieldForm}  variant="h6">
                Đơn giá bàn
            </Typography>
                <Typography className={classes.labelTextFieldForm} variant="h6">
                Tên dịch vụ
            </Typography>
                <Typography className={classes.labelTextFieldForm} variant="h6">
                Đơn giá
            </Typography>
                <Typography className={classes.labelTextFieldForm} variant="h6">
                Số lượng
            </Typography>
                <Typography className={classes.labelTextFieldFormPrice} variant="h6">
                Thành tiền
            </Typography>
                <Typography className={classes.labelTextFieldForm} variant="h6">
                Ghi chú
            </Typography>
            </Grid>
            <Grid item xs={2} className={classes.textField}>
              <Form onSubmit={handleSubmit}>
                <TextField className={classes.textFieldForm} fullWidth value={50000}></TextField>
                <TextField 
                className={classes.textFieldForm} 
                fullWidth
                value={values.name} />
                <TextField 
                className={classes.textFieldForm} 
                fullWidth
                value={values.price} />
                <FormControl className={classes.tableInfoFormItem} variant="outlined" fullWidth>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                labelWidth={0}
                                name='count'
                                value={values.count}
                                onChange={handleInputChange}
                                {...(errors.count && {error:true,helperText:errors.count})}
                                endAdornment={
                                <InputAdornment position="end">
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        {displayCounter('count') && <Button onClick={handleDecrement('count')}>-</Button>}
                                        <Button onClick={handleIncrement('count')}>+</Button>
                                    </ButtonGroup>
                                </InputAdornment>
                                }
                            />
                            </FormControl>
                <TextField 
                name='totalPrice'
                className={classes.textFieldForm} 
                fullWidth
                value={values.count * values.price} />
                <TextField 
                className={classes.textFieldForm} 
                fullWidth
                name='note'
                value={values.note}
                onChange={handleInputChange} />
                {props.currentserviceState.state !== NORMAL ? <Button type='submit' variant="outlined" color="primary" fullfill size='large' className={classes.textFieldForm}>
                {props.currentserviceState.state === EDIT_ORDER_SERVICE ? 'Sửa đặt dịch vụ' : 'Đặt dịch vụ'}
                </Button> : <></>}
                {props.currentserviceState.state === EDIT_ORDER_SERVICE ? 
                <Button variant="outlined" color="primary" fullfill size='large' className={classes.textFieldForm} onClick={changeToNormalState}>
                Hủy
                </Button> : <></>}
              </Form>
            </Grid>
        </Grid>
        <ServiceOrderList rows = {mapWeddingServiceProperty(props.weddingServices)}/>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        services: state.services,
        weddingServices: state.weddingServices.services,
        selectedService: state.selectedRowService,
        selectedWedding: state.selectedRow,
        currentserviceState: state.serviceState,
        selectedTable : state.selectedRowTable,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addWeddingService : (weddingService) => {
            dispatch(actAddWeddingServiceRequest(weddingService));
        },
        updateWeddingService : (weddingService) => {
            dispatch(actUpdateWeddingServiceRequest(weddingService));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Service);