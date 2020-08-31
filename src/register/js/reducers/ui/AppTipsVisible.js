import UpUIState from "../../actions/UpUIState";
const AppTipsVisible = (
  state = {
    UserIDTipsVisible: false,
    PwdTipsVisible: false,
    UserNameTipsVisible: false,
    GenderTipsVisible: false,
    GradeIDTipsVisible: false,
    MajorIDTipsVisible: false,
    CollegeIDTipsVisible: false,
    ClassIDTipsVisible: false,
    SubjectIDsTipsVisible: false,
    GroupIDTipsVisible: false,
    SchoolIDTipsVisible: false,
    ComfirmPwdTipsVisible: false,
    ShortNameTipsVisible: false,
    TestCodeTipsVisible: false,
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.APP_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });

    default:
      return state;
  }
};
export default AppTipsVisible;
