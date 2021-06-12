import { combineReducers } from 'redux';
import selectedRowReducer from '../pages/Wedding/reducers/selectedRow'
import addToCartReducer from '../pages/Food/reducer/addToCart'
import changeServices  from '../pages/Service/reducer/ChangeServices'
import ChangeLobbyData from '../pages/Lobby/reducer/ChangeLobbyData'
const allReducers = combineReducers({
    selectedRow: selectedRowReducer,
    addToCart: addToCartReducer,
    changeServices:changeServices,
    changeLobbyData:ChangeLobbyData,
});

export default allReducers;