import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';
import leftMenu from './leftMenu';
import breadCrumb from './breadCrumb';
import previewData from "./previewData";
import commonSetting from './commonSetting';


export let initialState = {};

let rootReducers = combineReducers({
    DataState,
    UIState,
    leftMenu,
    breadCrumb,
    previewData,
    commonSetting
});
export default rootReducers;
