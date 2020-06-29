import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';
//学期周期学段reducer

const defaultState = {

  dropSelectd:{value:'',title:"全部学院"},

  dropList:[],

  dropShow:true,

  dropObj:''

};

const PeriodWeekTerm = (state=defaultState,actions) => {

    switch (actions.type) {

        case PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK:

            return {...state,...actions.data};

        case PeriodWeekTermActions.PERIOD_VALUE_CHANGE:

            return {...state,dropSelectd:actions.data};

        default:

            return state;

    }

};

export default PeriodWeekTerm;