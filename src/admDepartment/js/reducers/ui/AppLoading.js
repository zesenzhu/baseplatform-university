import UpUIState from "../../actions/UpUIState";
const AppLoading = (
  state = {
    TableLoading: true,
    appLoading: true,
    modalLoading: false,
    searchLoading: false,
    ModalUserDataLoading:false,
    LeftLoading:true,
    UserLoading:true
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.USER_LOADING_OPEN:
      return Object.assign({}, state, { UserLoading: true });
    case UpUIState.USER_LOADING_CLOSE:
      return Object.assign({}, state, { UserLoading: false });
    case UpUIState.APP_LOADING_OPEN:
      return Object.assign({}, state, { appLoading: true });
    case UpUIState.APP_LOADING_CLOSE:
      return Object.assign({}, state, { appLoading: false });
    case UpUIState.MODAL_LOADING_OPEN:
      return Object.assign({}, state, { modalLoading: true });
    case UpUIState.MODAL_LOADING_CLOSE:
      return Object.assign({}, state, { modalLoading: false });
    case UpUIState.SEARCH_LOADING_OPEN:
      return Object.assign({}, state, { searchLoading: true });
    case UpUIState.SEARCH_LOADING_CLOSE:
      return Object.assign({}, state, { searchLoading: false });
    case UpUIState.TABLE_LOADING_OPEN:
      return Object.assign({}, state, { TableLoading: true });
    case UpUIState.TABLE_LOADING_CLOSE:
      return Object.assign({}, state, { TableLoading: false });
      case UpUIState.MODAL_USER_DATA_LOADING_OPEN:
      return Object.assign({}, state, { ModalUserDataLoading: true });
    case UpUIState.MODAL_USER_DATA_LOADING_CLOSE:
      return Object.assign({}, state, { ModalUserDataLoading: false });
      case UpUIState.LEFT_LOADING_OPEN:
      return Object.assign({}, state, { LeftLoading: true });
    case UpUIState.LEFT_LOADING_CLOSE:
      return Object.assign({}, state, { LeftLoading: false });
    default:
      return state;
  }
};
export default AppLoading;
