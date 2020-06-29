const BREADCRUMB_CHANGE = 'BREADCRUMB_CHANGE';

export const changeBreadCrumb = ({step,subject,college}) =>{

    return {type:BREADCRUMB_CHANGE,data:{step,subject,college}};

};


const defaultState = {

    step:1,

    subject:{

        activeSub:{

            id:"all",

            name:'教学班信息总览'

        },

        activeCourse:{

            id:'',

            name:''

        }

    },

    college:{

        activeCollege:{

            id:"all",

            name:'教学班信息总览'

        },

        activeCourse:{

            id:'',

            name:''

        }

    }

};

const breadCrumb = (state=defaultState,actions) =>{

    switch (actions.type) {

        case BREADCRUMB_CHANGE:

            return {

                ...state,

                step:actions.data.step?actions.data.step:state.step,

                subject:actions.data.subject?actions.data.subject:state.subject,

                college:actions.data.college?actions.data.college:state.college

            };

        default:

            return state;

    }

};

export default breadCrumb;