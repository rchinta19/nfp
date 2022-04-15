//getting store and combine reducers from redux and redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux"; 
/////////////////////////////////////////////////////////////////

//getting persist Reducer from redux-persist for persisting data
import {persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
////////////////////////////////////////////////////////////////

//getting Reducers from  
import filterReducer from "../reducers/filter/filterSlice";
import DatesettingSlice from "../reducers/DatesettingSlice";
import loggingSlice from '../reducers/loggingHandler'
import statusSlice from '../reducers/Status'
import SystemSlice from '../reducers/systemredux';
////////////////////////////////////////////////////////////
const reducers = combineReducers({
    filter: filterReducer,
    dataset: DatesettingSlice,
    userLog:loggingSlice,  
    status: statusSlice ,
    systemdata:SystemSlice,   
 });
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
});
 
