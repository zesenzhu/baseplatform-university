import * as subActions from '../actions/subPassActions';

const defaultState = {

    SubjectID:''

};

const subjectProps = (state=defaultState, actions) =>{

    switch (actions.type) {

        case subActions.PASS_SUBJECT_CHANGE:

            return { ...state,SubjectID:actions.data };

        default:

            return state;

    }

};

export default subjectProps;