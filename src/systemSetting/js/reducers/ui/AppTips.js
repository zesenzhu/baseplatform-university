import UpUIState from '../../action/UpUIState';
const AppTips = (state = { CollegeCodeTips: '院系代码格式不正确',CollegeNameTips: '院系名称格式不正确'  }, action) => {
    switch (action.type) {
        case UpUIState.SET_APP_TIPS:
            return { ...state,...action.data };
            break;
        
        default:
            return state;
    }
};
export default AppTips