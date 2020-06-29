import UpUIState from "../../actions/UpUIState";
const AppTips = (
  state = {
    
      DepartmentNameTips: '部门名称不能为空',
      DepartmentNOTips: '部门编号不能为空',
     
  },
  action
) => {
  switch (action.type) {
    case UpUIState.SET_APP_TIPS:
      return { ...state, ...action.data };
      break;

    default:
      return state;
  }
};
export default AppTips;
