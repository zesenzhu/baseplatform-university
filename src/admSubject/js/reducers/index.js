import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';

import menu from "./menu";

import subjectProps from './subjectProps';

export let initialState = {};

let rootReducers = combineReducers({

    DataState,

    UIState,

    menu,

    subjectProps

});
export default rootReducers;
