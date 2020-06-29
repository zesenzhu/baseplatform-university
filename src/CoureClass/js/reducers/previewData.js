const SUBJECT_PREVIEW_DATA_CHANGE = 'SUBJECT_PREVIEW_DATA_CHANGE';

const COLLEGE_PREVIEW_DATA_CHANGE = 'COLLEGE_PREVIEW_DATA_CHANGE';

export const subjectDataChange = (data) =>{

    return {type:SUBJECT_PREVIEW_DATA_CHANGE,data};

};

export const collegeDataChange = (data) =>{

    return {type:COLLEGE_PREVIEW_DATA_CHANGE,data};

};


const defaultState = {

    subjects:{

        sub:{},

        course:{}

    },

    colleges:{

       college:{},

       course:{}

    }

};

const previewData = (state=defaultState,actions) =>{

    switch (actions.type) {

        case COLLEGE_PREVIEW_DATA_CHANGE:

            return {...state,colleges:{...state.colleges,...actions.data}};

        case SUBJECT_PREVIEW_DATA_CHANGE:

            return {...state,subjects:{...state.subjects,...actions.data}};

        default:

            return state;

    }

};

export default previewData;