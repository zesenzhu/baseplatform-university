import UpUIState from "../../actions/UpUIState";
const AppModal = (
  state = {
    StudentChangeMadalVisible: false,
    userInfoModalVisible: false,
    handleGraduateContactModalVisible: false,
    handleGraduateModalVisible: false,
    handleLeaderModalVisible: false,
    addLeaderModalVisible: false,
    TeacherChangeMadalVisible: false,
    LeaderChangeMadalVisible: false,
    AddGroupMadalVisible: false,
    GroupMadalVisible: false,
    EditGroupMadalVisible: false
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.EDIT_GROUP_MODAL_OPEN:
      return Object.assign({}, state, { EditGroupMadalVisible: true });
    case UpUIState.EDIT_GROUP_MODAL_CLOSE:
      return Object.assign({}, state, { EditGroupMadalVisible: false });
    case UpUIState.GROUP_MODAL_OPEN:
      return Object.assign({}, state, { GroupMadalVisible: true });
    case UpUIState.GROUP_MODAL_CLOSE:
      return Object.assign({}, state, { GroupMadalVisible: false });
    case UpUIState.ADD_GROUP_MODAL_OPEN:
      return Object.assign({}, state, { AddGroupMadalVisible: true });
    case UpUIState.ADD_GROUP_MODAL_CLOSE:
      return Object.assign({}, state, { AddGroupMadalVisible: false });
    case UpUIState.ADD_LEADER_MODAL_OPEN:
      return Object.assign({}, state, { addLeaderModalVisible: true });
    case UpUIState.ADD_LEADER_MODAL_CLOSE:
      return Object.assign({}, state, { addLeaderModalVisible: false });
    case UpUIState.HANDLE_LEADER_MODAL_OPEN:
      return Object.assign({}, state, { handleLeaderModalVisible: true });
    case UpUIState.HANDLE_LEADER_MODAL_CLOSE:
      return Object.assign({}, state, { handleLeaderModalVisible: false });
    case UpUIState.HANDLE_GRADUATE_MODAL_OPEN:
      return Object.assign({}, state, { handleGraduateModalVisible: true });
    case UpUIState.HANDLE_GRADUATE_MODAL_CLOSE:
      return Object.assign({}, state, { handleGraduateModalVisible: false });
    case UpUIState.HANDLE_GRADUATE_CONTACT_MODAL_OPEN:
      return Object.assign({}, state, {
        handleGraduateContactModalVisible: true
      });
    case UpUIState.HANDLE_GRADUATE_CONTACT_MODAL_CLOSE:
      return Object.assign({}, state, {
        handleGraduateContactModalVisible: false
      });
    case UpUIState.USER_INFO_MODAL_OPEN:
      return Object.assign({}, state, { userInfoModalVisible: true });
    case UpUIState.USER_INFO_MODAL_CLOSE:
      return Object.assign({}, state, { userInfoModalVisible: false });
    case UpUIState.STUDENT_CHANGE_MODAL_OPEN:
      return Object.assign({}, state, { StudentChangeMadalVisible: true });
    case UpUIState.STUDENT_CHANGE_MODAL_CLOSE:
      return Object.assign({}, state, { StudentChangeMadalVisible: false });
    case UpUIState.TEACHER_CHANGE_MODAL_OPEN:
      return Object.assign({}, state, { TeacherChangeMadalVisible: true });
    case UpUIState.TEACHER_CHANGE_MODAL_CLOSE:
      return Object.assign({}, state, { TeacherChangeMadalVisible: false });
    case UpUIState.LEADER_CHANGE_MODAL_OPEN:
      return Object.assign({}, state, { LeaderChangeMadalVisible: true });
    case UpUIState.LEADER_CHANGE_MODAL_CLOSE:
      return Object.assign({}, state, { LeaderChangeMadalVisible: false });
    default:
      return state;
  }
};
export default AppModal;
