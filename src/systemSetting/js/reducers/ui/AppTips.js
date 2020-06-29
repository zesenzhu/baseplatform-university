import UpUIState from '../../action/UpUIState';
const AppTips = (state = { CollegeCodeTips: '',CollegeNameTips: ''  }, action) => {
    switch (action.type) {
        case UpUIState.SET_APP_TIPS:
            return { ...state,...action.data };
            break;
        
        default:
            return state;
    }
};
export default AppTips