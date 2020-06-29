import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import SubjectDetailsMsgModalShow from './ui/SubjectDetailsMsgModalShow';


const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    SubjectDetailsMsgModalShow

});

export default UIState;


