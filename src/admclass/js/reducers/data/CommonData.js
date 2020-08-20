import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import logo from "../../../images/logo.png";
import Public from "../../../../common/js/public";
const CommonData = (
  state = {
    ModalVisible: {
      GradeReSetModalVisible: false,
      ClassReSetModalVisible: false,
      AddClassModalVisible: false,
      EditGangerModalVisible: false,
      ReSetStudentClassModalVisible: false,
      DetailsMsgModalVisible: false,
    },
    LoadingVisible: {
      SubjectTeacherLoadingVisible: false,
    },
    TipsVisible: {
      GradeReSetTipsVisible: false,
      ClassReSetTipsVisible: false,
      AddClassSelectGradeTipsVisible: false,
      AddClassSelectCollegeTipsVisible: false,
      AddClassSelectMajorTipsVisible: false,
      AddClassNameTipsVisible: false,
      ResetClassTipsVisible: false,
    },
    Tips: {
      GradeReSetTips: "年级名称不能为空",
      ClassReSetTips: "班级名称不能为空",
      AddClassSelectGradeTips: "请选择年级",
      AddClassSelectCollegeTips: "请选择学院",
      AddClassSelectMajorTips: "请选择专业",
      AddClassNameTips: "班级名称不能为空",
      ResetClassNameTips: "请选择目标班级",
    },
    gradeData: {
      GradeName: "",
      GradeID: "",
      InitGradeName: "",
    },
    selectGrade: {
      value: "",
      title: "全部年级",
    },
    selectCollege: {
      value: "",
      title: "全部学院",
    },
    selectMajor: {
      value: "",
      title: "全部专业",
    },
    ClassParams: {
      GradeID: "",
      Keyword: "",
      PageIndex: 0,
      PageSize: 12,
      SearchValue: "",
      CancelBtnShow: "n",
      MajorID: "",
      CollegeID: "",
    },
    ClassData: {
      GradeName: "",
      GradeID: "",
      ClassName: "",
      ClassID: "",
      InitClassName: "",
    },
    selectClass: {
      GradeName: "",
      GradeID: "",
      ClassName: "",
      ClassID: "",
    },
    AddClassParams: {
      GradeName: "",
      GradeID: "",
      ClassName: "",
      CollegeName: "",
      CollegeID: "",
      MajorName: "",
      MajorID: "",
    },
    UserPower: "", //Other,Adimin,Leader,SuperAdmin,TeachingLeader,Teacher,Student,Parent
    ClassDetailsParams: {
      ClassID: "",
      Keyword: "",
      PageIndex: 0,
      PageSize: 20,
      SearchValue: "",
      CancelBtnShow: "n",
      CheckAll: false,
      CheckList: [],
      MajorID: "",
      CollegeID: "",
      GradeID: "",
    },
    SelectGanderData: {
      IsSet: false,
      UserID: "",
      UserName: "",
      PhotoPath: "",
    },
    SubjectTeacherParams: {
      SubjectIDs: "all",
      SUbjectNames: "全部教研室",
      Keyword: "",
      // PageIndex: 0,
      // PageSize: 20,
      SearchValue: "",
      CancelBtnShow: "n",
      CollegeID: "",
      CollegeName: "",
      // GroupID:''
    },
    SelectStudent: [],
    DetailsModalRole: "",
    ResetClassParams: {
      College: { value: "", title: "请选择学院" },
      Major: { value: "", title: "请选择专业" },
      Grade: { value: "", title: "请选择年级" },
      Class: { value: "", title: "请选择班级" },
    },
    TopLeftData: {
      cnname: "行政班管理",
      enname: "Grade & Class Management",
      image: logo,
    },
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.COMMON_SET_SELECT_COLLEGE_DATA:
      return Object.assign({}, state, {
        selectCollege: actions.data,
      });
    case UpDataState.COMMON_SET_SELECT_MAJOR_DATA:
      return Object.assign({}, state, {
        selectMajor: actions.data,
      });
    case UpDataState.COMMON_SET_TOP_LEFT_DATA:
      return Object.assign({}, state, {
        TopLeftData: {
          ...state.TopLeftData,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_RESET_CLASS_PARAMS:
      return Object.assign({}, state, {
        ResetClassParams: {
          ...state.ResetClassParams,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_DETAILS_MODAL_ROLE:
      return Object.assign({}, state, {
        DetailsModalRole: actions.data,
      });
    case UpDataState.COMMON_SET_SELECT_STUDENT:
      return Object.assign({}, state, {
        SelectStudent: actions.data,
      });
    case UpDataState.COMMON_SET_SELECT_GANDER_PARAMS:
      return Object.assign({}, state, {
        SelectGanderData: {
          ...state.SelectGanderData,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_SUBJECT_TEACHER_PARAMS:
      return Object.assign({}, state, {
        SubjectTeacherParams: {
          ...state.SubjectTeacherParams,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_CLASS_DETAILS_PARAMS:
      return Object.assign({}, state, {
        ClassDetailsParams: {
          ...state.ClassDetailsParams,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_USER_POWER:
      return Object.assign({}, state, {
        UserPower: actions.data,
      });
    case UpDataState.COMMON_SET_ADD_CLASS_PARAMS:
      return Object.assign({}, state, {
        AddClassParams: {
          ...state.AddClassParams,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_SELECT_CLASS_DATA:
      return Object.assign({}, state, {
        selectClass: actions.data,
      });
    case UpDataState.COMMON_SET_CLASS_DATA:
      return Object.assign({}, state, {
        ClassData: {
          ...state.ClassData,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_CLASS_PARAMS:
      return Object.assign({}, state, {
        ClassParams: {
          ...state.ClassParams,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_MODAL_VISIBLE:
      return Object.assign({}, state, {
        ModalVisible: {
          ...state.ModalVisible,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_LOADING_VISIBLE:
      return Object.assign({}, state, {
        LoadingVisible: {
          ...state.LoadingVisible,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_TIPS_VISIBLE:
      return Object.assign({}, state, {
        TipsVisible: {
          ...state.TipsVisible,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_TIPS:
      return Object.assign({}, state, {
        Tips: {
          ...state.Tips,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_GRADE_DATA:
      return Object.assign({}, state, {
        gradeData: {
          ...state.gradeData,
          ...actions.data,
        },
      });
    case UpDataState.COMMON_SET_SELECT_GRADE_DATA:
      return Object.assign({}, state, {
        selectGrade: actions.data,
      });
    default:
      return state;
  }
};

export default CommonData;
