import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';
import leftMenu from './leftMenu';
import breadCrumb from './breadCrumb';
import previewData from "./previewData";
import commonSetting from './commonSetting';
import bannerState from './bannerState';
import teacherManagePower from './teacherManagePower';

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
    AppLoading,
    bannerState,
    teacherManagePower
});
export default rootReducers;
