import UpUIState from "../../actions/UpUIState";
const AppTipsVisible = (
  state = {
    AddDepartment: {
      DepartmentNameTipsVisible: false,
      DepartmentNOTipsVisible: false,
    },
    EditDepartment: {
      DepartmentNameTipsVisible: false,
      ParentTipsVisible: false,
      LeaderTipsVisible: false,
    },
  },
  actions
) => {
  switch (actions.type) {
 
    case UpUIState.ADD_DEPARTMENT_TIPS_VISIBLE:
      return Object.assign({}, state, {
        AddDepartment: { ...actions.AddDepartment, ...actions.data },
      });
    case UpUIState.ADD_DEPARTMENT_TIPS_ALL_CLOSE:
      return Object.assign({}, state, {
        AddDepartment:  {
          DepartmentNameTipsVisible: false,
          DepartmentNOTipsVisible: false,
      }});
      case UpUIState.EDIT_DEPARTMENT_TIPS_VISIBLE:
      return Object.assign({}, state, {
        EditDepartment: { ...actions.EditDepartment, ...actions.data },
      });
    case UpUIState.EDIT_DEPARTMENT_TIPS_ALL_CLOSE:
      return Object.assign({}, state, {
        EditDepartment:  {
          DepartmentNameTipsVisible: false,
          DepartmentNOTipsVisible: false,
      }});
    default:
      return state;
  }
};
export default AppTipsVisible;
