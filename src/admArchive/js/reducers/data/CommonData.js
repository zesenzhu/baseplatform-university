import CommonAction from "../../actions/CommonAction";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
import logo from "../../../images/Frame/icon-logo.png";
const CommonData = (
  state = {
    FrameData: {
      cnname: "用户档案管理",
      enname: "User Profile Management",
      image: logo,
      showLeftMenu: false,
      showBarner: true,
      type: "circle",
    },
    RolePower: {
      //版本或角色权限，用于控制界面或数据的显示等
      LockerVersion_1:false,
      IsCollege:false,
      IsLeader:false
    },
    BannerInitList: [
      { value: "All", title: "用户档案总览", icon: "All" },
      { value: "Student", title: "学生档案", icon: "Student" },
      { value: "Teacher", title: "教师档案", icon: "Teacher" },
      { value: "Leader", title: "领导档案", icon: "Leader" },
      { value: "Graduate", title: "毕业生档案 ", icon: "Graduate" },
      { value: "Face", title: "人脸库 ", icon: "Face" },
    ], //头部所有选择
    BannerList: [], //进行筛选后的新选择列表
    RouteData: [],
    StudentData:{
      CollegeList:[],
      MajorList:[],
      GradeList:[],
      ClassList:[],
    },
    InitStudentParams:{
      collegeID:'',
      collegeName:'',
      schoolID:'',
      majorID:'',
      majorName:'',
      gradeID:'',
      gradeName:'',
      classID:'',
      className:'',
      keyword:'',
      pageIndex:0,
      pageSize:10,
      sortFiled:'UserID',
      sortType:'',
      cancelBtnShow:'n',
      searchValue:'',
      checkedList:[],
      checkAll:false
    },
    StudentParams:{
      // collegeID:'',
      // collegeName:'',
      // schoolID:'',
      // majorID:'',
      // majorName:'',
      // gradeID:'',
      // gradeName:'',
      // classID:'',
      // className:'',
      // keyword:'',
      // pageIndex:0,
      // pageSize:10,
      // sortFiled:'UserID',
      // sortType:'',
      // cancelBtnShow:'n',
      // searchValue:'',
      // checkedList:[]

    }
  },
  actions
) => {
  switch (actions.type) {
    case CommonAction.COMMON_SET_STUDENT_PARAMS:
      return Object.assign({}, state, {
        StudentParams: { ...state.StudentParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_ROLE_POWER_PARAMS:
      return Object.assign({}, state, {
        RolePower: { ...state.RolePower, ...actions.data },
      });
    case CommonAction.COMMON_SET_ROUTE_PARAMS:
      return Object.assign({}, state, {
        RouteData: actions.data,
      });
    case CommonAction.COMMON_SET_BANNER_PARAMS:
      return Object.assign({}, state, {
        BannerList:
          // ...state.BannerList,
          actions.data,
      });
    case CommonAction.COMMON_SET_FRAME_PARAMS:
      return Object.assign({}, state, {
        FrameData: {
          ...state.FrameData,
          ...actions.data,
        },
      });

    default:
      return state;
  }
};

export default CommonData;
