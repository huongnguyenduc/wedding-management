import { combineReducers } from "redux";
import selectedRowReducer from "../pages/Wedding/reducers/selectedRow";
import selectedRowTableReducer from "../pages/Wedding/reducers/selectedRowTable";
import selectedRowFoodReducer from "../pages/Wedding/reducers/selectedRowFood";
import selectedRowServiceReducer from "../pages/Wedding/reducers/selectedRowService";
import weddingStateReducer from "../pages/Wedding/reducers/weddingState";
import tableStateReducer from "../pages/Wedding/reducers/tableState";
import foodStateReducer from "../pages/Wedding/reducers/foodState";
import serviceStateReducer from "../pages/Wedding/reducers/serviceState";
import weddings from "./weddings";
import foods from "./foods";
import services from "./services";
import weddingServices from "./weddingServices";
import shifts from "./shifts";
import lobbies from "./lobbies";
import tables from "./tables";
import tableFoods from "./tableFoods";
import tableCategories from "./tableCategories";
import notPaidBillItem from "./editNotPaidBill";
import notPaidBills from "./notPaidBills";
import paidBillItem from "./editPaidBill";
import paidBills from "./paidBills";
import userItem from "./editUser";
import users from "./users";
import lobbyItem from "./editLobby";
import FoodReducer from "../pages/Food/reducer/FoodReducer";
import changeServices from "../pages/Service/reducer/ChangeServices";
import ChangeLobbyData from "../pages/Lobby/reducer/ChangeLobbyData";
import PolicyReducer from "../pages/Policy/reducer/PolicyReducer";
import permissionItem from "./editPermission";
import permissions from "./permissions";
import promotions from "./promotions";
import depositPolicy from "./depositPolicy";
import promotionWeddings from "./promotionWeddings";
import lobbyCategoryItem from "./editLobbyCategory";

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
  weddingServices,
  notPaidBills,
  notPaidBillItem,
  paidBills,
  paidBillItem,
  users,
  userItem,
  lobbyItem,
  ChangeFoodData: FoodReducer,
  changeServices: changeServices,
  changeLobbyData: ChangeLobbyData,
  PolicyReducer: PolicyReducer,
  permissionItem,
  permissions,
  lobbyCategoryItem,
  promotions,
  promotionWeddings,
  depositPolicy,
});

export default allReducers;
