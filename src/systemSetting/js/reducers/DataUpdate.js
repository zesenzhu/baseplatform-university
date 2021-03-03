import DataChange from "../action/data/DataChange";

export default (
  state = {
    semesterInfo: {},

    semesterloading: true,
    schoolInfo: {},
    subsystemInfo: {},
    periodInfo: [
      { ID: "P1", Name: "小学", Period: "", checked: false },
      { ID: "P2", Name: "初中", Period: "", checked: false },
      { ID: "P3", Name: "高中", Period: "", checked: false },
    ],
    serverAddress: "",
    collegePreview: {
      currentIndex: 1,
      totalCount: 0,
      List: [],
      CollegeList: [],
      KeyList: [],
    },
    handleCollegeMsg: {
      CollegeCode: "",
      CollegeName: "",
      CollegeID: "",
    },
    handleCollegeInitMsg: {
      CollegeCode: "",
      CollegeName: "",
      CollegeID: "",
    },
  },
  action
) => {
  switch (action.type) {
    case DataChange.SET_COLLEGE_MSG:
      return {
        ...state,
        handleCollegeMsg: { ...state.handleCollegeMsg, ...action.data },
      };
    case DataChange.SET_COLLEGE_INIT_MSG:
      return {
        ...state,
        handleCollegeMsg: action.data,
        handleCollegeInitMsg: action.data,
      };
    case DataChange.GET_COLLEGE_PREVIEW:
      let data = editCollegePreview(action.data);
      return {
        ...state,
        collegePreview: data,
      };
    case DataChange.GET_CURRENT_SEMESTER_INFO:
      return {
        ...state,
        semesterInfo: action.data,
      };
    case DataChange.SEMESTER_LOADING_HIDE:
      return {
        ...state,
        semesterloading: action.data,
      };
    case DataChange.REFRESH_SEMESTER_INFO:
      return {
        ...state,
        semesterInfo: action.data,
      };
    case DataChange.GET_CURRENT_SCHOOL_INFO:
      //    console.log( action.periodData);
      return {
        ...state,
        schoolInfo: action.data,
      };
    case DataChange.REFRESH_SCHOOL_INFO:
      return {
        ...state,
        schoolInfo: action.data,
      };
    case DataChange.INIT_PERIOD_LIST:
      return {
        ...state,
        periodInfo: action.data,
      };
    case DataChange.CET_CURRENT_SUBSYSTEM_INFO:
      return {
        ...state,
        subsystemInfo: action.data,
      };
    case DataChange.REFRESH_SUBSYSTEM_INFO:
      return {
        ...state,
        subsystemInfo: action.data,
      };
    case DataChange.GET_SERVER_ADDRESS:
      return {
        ...state,
        serverAddress: action.data,
      };

    default:
      return state;
  }
};

function editCollegePreview(data) {
  let { List, currentIndex, totalCount } = data;
  let CollegeList = [];
  let KeyList = [];
  if (List instanceof Array) {
    List.map((college, index) => {
      KeyList.push(index);
      CollegeList.push({
        key: index,
        Key: index,
        orderNO: college.orderNO,
        // orderNO:{Key:index,orderNO:(currentIndex-1) * 4 + index + 1},
        College: {
          CollegeID: college.CollegeID,
          CollegeName: college.CollegeName,
        },
        CollegeCode: college.CollegeCode,
        TotalUserCount: college.TotalUserCount,
        StudentCount: college.StudentCount,
        TeacherCount: college.TeacherCount,
        LeaderCount: college.LeaderCount,
      });
    });
  }
  return { KeyList, List, CollegeList, currentIndex, totalCount };
}
