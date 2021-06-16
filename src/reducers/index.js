import { combineReducers } from 'redux';
import selectedRowReducer from '../pages/Wedding/reducers/selectedRow'
import FoodReducer from '../pages/Food/reducer/FoodReducer'
import changeServices  from '../pages/Service/reducer/ChangeServices'
import ChangeLobbyData from '../pages/Lobby/reducer/ChangeLobbyData'
const allReducers = combineReducers({
    selectedRow: selectedRowReducer,
    ChangeFoodData: FoodReducer,
    changeServices:changeServices,
    changeLobbyData:ChangeLobbyData,
});

export default allReducers;