import { combineReducers } from 'redux';
import selectedRowReducer from '../pages/Wedding/reducers/selectedRow'

const allReducers = combineReducers({
    selectedRow: selectedRowReducer,
});

export default allReducers;