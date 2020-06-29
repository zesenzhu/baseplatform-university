import UpUIState from "../../actions/UpUIState";
const AppModal = (
  state = {
    AddModal: false,
    EditModal: false,
    AddDepartmentModal: false,
    EditDepartmentModal: false,
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.ADD_MODAL_OPEN:
      return Object.assign({}, state, { AddModal: true });
    case UpUIState.ADD_MODAL_CLOSE:
      return Object.assign({}, state, { AddModal: false });
    case UpUIState.EDIT_MODAL_OPEN:
      return Object.assign({}, state, { EditModal: true });
    case UpUIState.EDIT_MODAL_CLOSE:
      return Object.assign({}, state, { EditModal: false });
    case UpUIState.ADD_DEPARTMENT_MODAL_OPEN:
      return Object.assign({}, state, { AddDepartmentModal: true });
    case UpUIState.ADD_DEPARTMENT_MODAL_CLOSE:
      return Object.assign({}, state, { AddDepartmentModal: false });
    case UpUIState.EDIT_DEPARTMENT_MODAL_OPEN:
      return Object.assign({}, state, { EditDepartmentModal: true });
    case UpUIState.EDIT_DEPARTMENT_MODAL_CLOSE:
      return Object.assign({}, state, { EditDepartmentModal: false });

    default:
      return state;
  }
};
export default AppModal;
