const APP_FIRST_LOAD_CLOSE = 'APP_FIRST_LOAD_CLOSE';

const defaultState = {

  firstLoad:true

};

export const firstLoadClose = () =>{

  return { type:APP_FIRST_LOAD_CLOSE };

};


const commonSetting = (state=defaultState,actions) => {

        switch (actions.type) {

            case APP_FIRST_LOAD_CLOSE:

                return { ...state,firstLoad:false };

            default:

                return state;

        }

};

export default commonSetting;