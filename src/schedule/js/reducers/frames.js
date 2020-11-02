const IFRAME_CHANGE = 'IFRAME_CHANGE';

const defaultState = {

    iFrame:false

};


export const iframeChange = (payload) =>{

    return {type:IFRAME_CHANGE,data:payload};

};

const frames = (state=defaultState,actions)=>{

    switch (actions.type) {

        case IFRAME_CHANGE:

            return {...state,iFrame:actions.data};

        default:

            return state;

    }

};

export default frames;