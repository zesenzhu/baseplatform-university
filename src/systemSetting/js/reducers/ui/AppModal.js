import UpUIState from "../../action/UpUIState";
const AppModal = (
  state = {
    EditCollegeVisible:false,AddCollegeVisible:false
  },
  action
) => {
  switch (action.type) {
    case UpUIState.EDIT_COLLEGE_OPEN:
      return Object.assign({}, state, { EditCollegeVisible: true });
    case UpUIState.EDIT_COLLEGE_CLOSE:
      return Object.assign({}, state, { EditCollegeVisible: false });
    case UpUIState.ADD_COLLEGE_OPEN:
      return Object.assign({}, state, { AddCollegeVisible: true });
    case UpUIState.ADD_COLLEGE_CLOSE:
      return Object.assign({}, state, { AddCollegeVisible: false });
     
    default:
      return state;
  }
};
export default AppModal;
