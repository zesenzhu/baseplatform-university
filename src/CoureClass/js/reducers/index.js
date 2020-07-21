import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';
import leftMenu from './leftMenu';
import breadCrumb from './breadCrumb';
import previewData from "./previewData";
import commonSetting from './commonSetting';

//新的redux
import LoginUser from './LoginUser';

import AppLoading from './AppLoading';


export let initialState = {};

let rootReducers = combineReducers({
    LoginUser,
    DataState,
    UIState,
    leftMenu,
    breadCrumb,
    previewData,
    commonSetting,
    AppLoading
});
export default rootReducers;
