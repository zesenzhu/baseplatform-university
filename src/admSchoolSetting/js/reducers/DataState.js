import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import SchoolData from './data/SchoolData';
import CommonData from './data/CommonData';



const DataState=combineReducers(
    {
        LoginUser,
        SchoolData,
        CommonData
        
    });
export default DataState;