const USER_IDENTIFY_CHANGE = 'USER_IDENTIFY_CHANGE';

const defaultState = {

    isCollegeManager:false,

    identifyList:[]

};

export const userIndetifyChange = (payLoad) =>{

  return {type:USER_IDENTIFY_CHANGE,data:payLoad};

};


const identify = (state=defaultState,actions)=>{

    switch (actions.type) {

        case USER_IDENTIFY_CHANGE:

            return {...state,...actions.data};

        default:

            return state;

    }

};


export default identify;