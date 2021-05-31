import { combineReducers } from 'redux';
import selectedRowReducer from '../pages/Wedding/reducers/selectedRow'
import selectedRowTableReducer from '../pages/Wedding/reducers/selectedRowTable'
import selectedRowFoodReducer from '../pages/Wedding/reducers/selectedRowFood'
import selectedRowServiceReducer from '../pages/Wedding/reducers/selectedRowService'
import weddingStateReducer from '../pages/Wedding/reducers/weddingState';
import tableStateReducer from '../pages/Wedding/reducers/tableState';
import foodStateReducer from '../pages/Wedding/reducers/foodState';
import serviceStateReducer from '../pages/Wedding/reducers/serviceState';
import weddings from './weddings';
import foods from './foods';
import services from './services';
import weddingServices from './weddingServices';
import shifts from './shifts';
import lobbies from './lobbies';
import tables from './tables';
import tableFoods from './tableFoods';
import tableCategories from './tableCategories';

const allReducers = combineReducers({
    selectedRow: selectedRowReducer,
    weddingState: weddingStateReducer,
    tableState: tableStateReducer,
    foodState: foodStateReducer,
    serviceState: serviceStateReducer,
    selectedRowTable: selectedRowTableReducer,
    selectedRowFood: selectedRowFoodReducer,
    selectedRowService: selectedRowServiceReducer,
    weddings,
    foods,
    shifts,
    lobbies,
    tables,
    tableCategories,
    tableFoods,
    services,
    weddingServices
});

export default allReducers;