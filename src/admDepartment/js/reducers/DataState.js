import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import MainData from './data/MainData';
import CommonData from './data/CommonData';



const DataState=combineReducers(
    {
        LoginUser,
        MainData,
        CommonData
        
    });
export default DataState;