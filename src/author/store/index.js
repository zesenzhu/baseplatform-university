import {useReducer} from 'react';

import appAlert from "./appAlert";


const defaultState = {

  appAlert:appAlert.defaultAlert

};

const reducer = (state,actions)=>{

    switch (actions.type) {

        case appAlert.APP_ALERT_SHOW:

            return {

                ...state,

                appAlert:{

                    ...state.appAlert,

                    ...actions.data

                }

            }

        default:

            return state;

    }

};

export  default  reducer;