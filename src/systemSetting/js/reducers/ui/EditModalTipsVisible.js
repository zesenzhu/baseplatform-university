import UpUIState from "../../action/UpUIState";
const EditModalTipsVisible = (
  state = {

    CollegeCodeTipsVisible:false,
    CollegeNameTipsVisible:false,
  },
  action
) => {
  switch (action.type) {
    case UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN:
        return Object.assign({}, state, { GroupNameTipsVisible: true });
        case UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE:
        return Object.assign({}, state, { GroupNameTipsVisible: false });
    case UpUIState.EDIT_MODAL_TIPS_VISIBLE:
      return Object.assign({}, state, { ...action.data });
    case UpUIState.EDIT_ALL_MODAL_TIPS_VISIBLE:
      return Object.assign({}, state, {
        CollegeCodeTipsVisible:false,
    CollegeNameTipsVisible:false,
      });
    default:
      return state;
  }
};
export default EditModalTipsVisible;
