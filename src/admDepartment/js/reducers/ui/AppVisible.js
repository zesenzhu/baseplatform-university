import UpUIState from "../../actions/UpUIState";
const AppVisible = (
  state = {
    HandleBoxVisible: false,
     
     
  },
  actions
) => {
  switch (actions.type) {
     
    //   case UpUIState.SET_HANDLE_BOX_OPEN:
    //   return Object.assign({}, state, { HandleBoxVisible: true });
    // case UpUIState.SET_HANDLE_BOX_CLOSE:
    //   return Object.assign({}, state, { HandleBoxVisible: false });
    default:
      return state;
  }
};
export default AppVisible;
