import { combineReducers } from 'redux';


import DataUpdate from './DataUpdate'
import UIState from './UIState'
import AppAlert from './AppAlert'
import AccessData from './AccessData'
let rootReducers = combineReducers({

    AccessData,
    DataUpdate,
    AppAlert,
    UIState
})
export let initialState = {

};

export default rootReducers;