import UpUIState from "../../actions/UpUIState";
const EditModalTipsVisible = (
  state = {
    UserIDTipsVisible: false,
    UserNameTipsVisible: false,
    GradeTipsVisible: false,
    TitleTipsVisible: false,
    ClassTipsVisible: false,
    MajorTipsVisible:false,
    TelephoneTipsVisible: false,
    EmailTipsVisible: false,
    IDCardNoTipsVisible: false,
    HomeAdressTipsVisible: false,
    GenderTipsVisible: false,
    changeSubjectTipsVisible: false,
    TitleIDVisible: false,
    PositionTipsVisible: false,
    GroupTipsVisible: false,
    CollegeTipsVisible: false,
    SchoolCollegeVisible: false,
    GraduateJobTypeVisible: false,
    GroupNameTipsVisible: false
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN:
        return Object.assign({}, state, { GroupNameTipsVisible: true });
        case UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE:
        return Object.assign({}, state, { GroupNameTipsVisible: false });
    case UpUIState.EDIT_MODAL_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });
    case UpUIState.EDIT_ALL_MODAL_TIPS_VISIBLE:
      return Object.assign({}, state, {
        UserIDTipsVisible: false,
        UserNameTipsVisible: false,
        GradeTipsVisible: false,
        TitleTipsVisible: false,
        ClassTipsVisible: false,
        TelephoneTipsVisible: false,
        EmailTipsVisible: false,
        IDCardNoTipsVisible: false,
        HomeAdressTipsVisible: false,
        GenderTipsVisible: false,
        GroupTipsVisible: false,
        SchoolCollegeVisible: false,
        CollegeTipsVisible: false,
        changeSubjectTipsVisible: false,
    MajorTipsVisible:false,
    TitleIDVisible: false,
        PositionTipsVisible: false,
        GraduateJobTypeVisible: false,
    GroupNameTipsVisible: false

      });
    default:
      return state;
  }
};
export default EditModalTipsVisible;
