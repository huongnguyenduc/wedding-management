import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, TextField, ButtonGroup, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, FormHelperText} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import FoodList from './FoodList'
import FoodOrderList from './FoodOrderList';
import { useDispatch, connect } from 'react-redux';
import clickRowFood from '../../actions/clickRowFood';
import normalState from '../../actions/foodState/normal';
import { useForm, Form } from './useForm';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NORMAL, EDIT_ORDER_FOOD } from '../../reducers/foodState';
import { addMiddleware } from 'redux-dynamic-middlewares'
import {actAddTableFoodRequest} from '../../../../action/tableFood';
import {actUpdateTableFoodRequest} from '../../../../action/tableFood';
import {actFetchTablesRequest} from './../../../../action/table';
import clickRowTable from '../../actions/clickRowTable'

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
          foodKind: "", 
          note: "",
      };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TableDetailDialog(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleIncrement = (prop) => (event) => {
    var newcount = parseInt(values[prop] || 0) + 1 ;
    if (props.currentFoodState.state !== NORMAL) {
      setValues({ ...values, [prop]: newcount});
      validate({ [prop]: newcount });
    }
  };

  const handleDecrement = (prop) => (event) => {
    if (props.currentFoodState.state !== NORMAL)
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
      dispatch(clickRowFood(initialValues));
      dispatch(normalState());            
  }
  const handleSubmit = e => {
      e.preventDefault()
      if (validate()) {
          if (props.currentFoodState.state === EDIT_ORDER_FOOD) {
            console.log('update ne')
            console.log(updateTableFood())
            props.updateTableFood(updateTableFood())
          }
          else
            props.addTableFood(createTableFood())
          resetForm()
          changeToNormalState()
      }
  }

  const displayCounter = (prop) => values[prop] > 0;

  const clickRowFoodMiddleware = store => next => action => {
    if (action.type === 'CLICK_ROW_FOOD') {
      if (props.currentFoodState.state === EDIT_ORDER_FOOD) {
        if ('totalPrice' in action.payload) { //Table-Food
          setValues({...action.payload, foodId: action.payload.food.id});
        } 
      }
      else {
        if ('totalPrice' in action.payload) { //Table-Food
          setValues({...action.payload, foodId: action.payload.food.id, feastTableId: props.selectedTable.id});
        } else
          setValues({...action.payload, count: action.payload.count || 0});
      }
    }
    return next(action)
  }
  addMiddleware(clickRowFoodMiddleware);
  const mapFoodKindProperty = (foods) => {
        var newFoods = foods.map((food) => {
            return {
                ...food,
                foodKind: food.category.name
            }
        });
        console.log(newFoods)
        return newFoods;
    }

  const mapTableFoodProperty = (tableFoods) => {
    if (tableFoods) {
      var newTableFoods = tableFoods.map((tableFood) => {
          return {
              ...tableFood,
              name: tableFood.food.name,
              price: tableFood.food.price,
          }
      });
      console.log(newTableFoods)
      return newTableFoods;
    }
    return [];
  }

  const createTableFood = () => {
    return {
      feastTableId: props.selectedTable.id,
      foodId: props.selectedFood.id,
      count: values.count,
      note: values.note,
      totalPrice: values.count * values.price,
    }
  }
  const updateTableFood = () => {
    return {
      feastTableId: values.feastTableId,
      foodId: values.foodId,
      count: values.count,
      note: values.note,
      totalPrice: values.count * values.price,
    }
  }

  const recentLobby = () => {
        var index = -1;
        index = props.lobbies.findIndex((lobby) => lobby.id === props.selectedWedding.lobbyId);
        if (index !== -1) {
            return props.lobbies[index];
        }
    }

  const calculateUnitPriceTable = () => {
    let totalPriceFoods = 0;
        if (props.tableFoods)
            props.tableFoods.forEach((food) => {totalPriceFoods+=parseInt(food.totalPrice)});
        if (totalPriceFoods < recentLobby().min_unitpricetable)
          totalPriceFoods = recentLobby().min_unitpricetable;
        return totalPriceFoods;
  }

  return (
    <div>
      <Dialog 
      maxWidth='lg' 
      fullWidth='true' 
      open={props.openTableFoodDialog} 
      onClose={props.handleCloseTableFoodDialog} 
      TransitionComponent={Transition}
      onExiting={() => {
        props.fetchAllTablesInfo(props.selectedWedding.id);
        props.updateSelectedTable({...props.selectedTable, unitPriceTable: calculateUnitPriceTable()})
      }}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleCloseTableFoodDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chi tiết phiếu đặt bàn
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.foodForm}>
            <Grid item xs={7} >
                <FoodList foods={mapFoodKindProperty(props.foods)}/>
            </Grid>
            <Grid item xs={2} className={classes.label}>
                <Typography className={classes.labelTextFieldForm}  variant="h6">
                Đơn giá bàn
            </Typography>
                <Typography className={classes.labelTextFieldForm} variant="h6">
                Tên món ăn
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
                <TextField className={classes.textFieldForm} fullWidth value={calculateUnitPriceTable()}></TextField>
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
                            {!!errors.count && (
                                <FormHelperText error id="'count-error">
                                {errors.count}
                                </FormHelperText>
                            )}
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
                {props.currentFoodState.state !== NORMAL ? <Button type='submit' variant="outlined" color="primary" fullfill size='large' className={classes.textFieldForm}>
                {props.currentFoodState.state === EDIT_ORDER_FOOD ? 'Sửa đặt món ăn' : 'Đặt món ăn'}
                </Button> : <></>}
                {props.currentFoodState.state === EDIT_ORDER_FOOD ? 
                <Button variant="outlined" color="primary" fullfill size='large' className={classes.textFieldForm} onClick={changeToNormalState}>
                Hủy
                </Button> : <></>}
              </Form>
            </Grid>
        </Grid>
        <FoodOrderList rows = {mapTableFoodProperty(props.tableFoods)}/>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        foods: state.foods,
        tableFoods: state.tableFoods.foods,
        selectedFood: state.selectedRowFood,
        currentFoodState: state.foodState,
        selectedTable : state.selectedRowTable,
        selectedWedding: state.selectedRow,
        lobbies: state.lobbies
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addTableFood : (tableFood) => {
            dispatch(actAddTableFoodRequest(tableFood));
        },
        updateTableFood : (tableFood) => {
            dispatch(actUpdateTableFoodRequest(tableFood));
        },
        fetchAllTablesInfo : (idWedding) => {
            dispatch(actFetchTablesRequest(idWedding));
        },
        updateSelectedTable: (updateTable) => {
            dispatch(clickRowTable(updateTable));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDetailDialog);