import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';

import menu from "./menu";

import subjectProps from './subjectProps';

import productType from './productType';

export let initialState = {};

let rootReducers = combineReducers({

    DataState,

    UIState,

    menu,

    subjectProps,

    productType

});
export default rootReducers;
