export const BANNER_SHOW = 'BANNER_SHOW';

export const BANNER_HIDE = 'BANNER_HIDE';

export const BANNER_TAB_SHOW = 'BANNER_TAB_SHOW';

export const BANNER_TAB_HIDE = 'BANNER_TAB_HIDE';

export const BANNER_LOG_SHOW = 'BANNER_LOG_SHOW';

export const BANNER_LOG_HIDE = 'BANNER_LOG_HIDE';

const defaultState = {

  tab:true,

  log:true,

  show:true

};

export const bannerShow = ()=>{

    return {type:BANNER_SHOW};

};

export const bannerHide = ()=>{

    return {type:BANNER_HIDE};

};


export const bannerTabShow = ()=>{

    return {type:BANNER_TAB_SHOW};

};

export const bannerTabHide = ()=>{

    return {type:BANNER_TAB_HIDE};

};

export const bannerLogHide = ()=>{

    return {type:BANNER_LOG_HIDE};

};

export const bannerLogShow = ()=>{

    return {type:BANNER_LOG_SHOW};

};


const bannerState = (state=defaultState,actions)=>{

    switch (actions.type){

        case BANNER_SHOW:

            return {...state,show:true};

        case BANNER_HIDE:

            return {...state,show:false};

        case BANNER_TAB_SHOW:

            return {...state,tab:true};

        case BANNER_TAB_HIDE:

            return {...state,tab:false};

        case BANNER_LOG_SHOW:

            return {...state,log:true};

        case BANNER_LOG_HIDE:

            return {...state,log:false};

        default:

            return state;

    }

};

export default bannerState;