import MainAction from "../../actions/MainAction";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";

const MainData = (
  state = {
    SysUrl: [],
    SummaryData: {
      Total: 0,
      Student: 0,
      Teacher: 0,
      Leader: 0,
      StudentList: [],
      TeacherList: [],
      StudentAcount: [],
      TeacherAcount: [],
    },
    StudentTree: {
      CollegeList: [],
      MajorList: [],
      GradeList: [],
      ClassList: [],
    },
    StudentData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
  },
  actions
) => {
  switch (actions.type) {
    case MainAction.MAIN_GET_STUDENT_TO_PAGE:
      return Object.assign({}, state, {
        StudentData: actions.data,
      });
    case MainAction.MAIN_GET_TREE_DATA:
      return Object.assign({}, state, {
        StudentTree: actions.data,
      });
    case MainAction.MAIN_GET_SUMMARY_DATA:
      return Object.assign({}, state, {
        SummaryData: actions.data,
      });
    case MainAction.MAIN_GET_SUB_SYSTEMS_MAIN_SERVER:
      return Object.assign({}, state, {
        SysUrl: actions.data,
      });

    default:
      return state;
  }
};

export default MainData;
