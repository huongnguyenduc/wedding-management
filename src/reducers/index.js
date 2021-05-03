import { combineReducers } from 'redux';
import selectedRowReducer from '../pages/Wedding/reducers/selectedRow'
import getDataTableReducer from '../pages/Wedding/reducers/getDataTable'

const allReducers = combineReducers({
    selectedRow: selectedRowReducer,
    getDataTable: getDataTableReducer,
});

export default allReducers;