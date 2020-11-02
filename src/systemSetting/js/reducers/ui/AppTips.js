import UpUIState from '../../action/UpUIState';
const AppTips = (state = { CollegeCodeTips: '学院编号格式不正确',CollegeNameTips: '学院名称格式不正确'  }, action) => {
    switch (action.type) {
        case UpUIState.SET_APP_TIPS:
            return { ...state,...action.data };
            break;
        
        default:
            return state;
    }
};
export default AppTips