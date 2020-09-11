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
      LockerVersion_1: false,
      IsCollege: false,
      IsLeader: false,
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
    StudentData: {
      CollegeList: [],
      MajorList: [],
      GradeList: [],
      ClassList: [],
    },
    InitStudentParams: {
      collegeID: "",
      collegeName: "",
      schoolID: "",
      majorID: "",
      majorName: "",
      gradeID: "",
      gradeName: "",
      classID: "",
      className: "",
      keyword: "",
      pageIndex: 0,
      pageSize: 10,
      sortFiled: "UserID",
      sortType: "",
      cancelBtnShow: "n",
      searchValue: "",
      checkedList: [],
      checkAll: false,
    },
    StudentParams: {},
    TeacherData: {
      CollegeList: [],
      MajorList: [],
      GradeList: [],
      ClassList: [],
    },
    InitTeacherParams: {
      collegeID: "",
      collegeName: "",
      schoolID: "",
      groupID: "",
      groupName: "",

      keyword: "",
      pageIndex: 0,
      pageSize: 10,
      sortFiled: "UserID",
      sortType: "",
      cancelBtnShow: "n",
      searchValue: "",
      checkedList: [],
      checkAll: false,
    },
    TeacherParams: {},
    InitLeaderParams: {
      collegeID: "",
      collegeName: "",
      schoolID: "",

      keyword: "",
      userType: 7,
      pageIndex: 0,
      pageSize: 10,
      sortFiled: "UserID",
      sortType: "",
      cancelBtnShow: "n",
      searchValue: "",
      checkedList: [],
      checkAll: false,
    },
    LeaderParams: {},
    InitGraduateParams: {
      collegeID: "",
      collegeName: "",
      schoolID: "",
      majorID: "",
      majorName: "",
      gradeID: "",
      gradeName: "",
      classID: "",
      className: "",
      keyword: "",
      pageIndex: 0,
      pageSize: 10,
      sortFiled: "UserID",
      sortType: "",
      cancelBtnShow: "n",
      searchValue: "",
      checkedList: [],
      checkAll: false,
    },
    GraduateParams: {},
    ModalVisible: {
      UserLogModalVisible: false,
      UserArchivesModalVisible: false,
      DetailsModalVisible: false,
      GraduateContactModalVisible: false,
      GraduateJobTypeModalVisible: false,
    },
    TipsVisible: {
      TelephoneTipsVisible: false,
      EmailTipsVisible: false,
      HomeAddressTipsVisible: false,
      DiscriptionTipsVisible: false,

      IDCardNoTipsVisible: false,
      TitleTipsVisible: false,
      GradeTipsVisible: false,
      UserNameTipsVisible: false,
      UserIDTipsVisible: false,
      GenderTipsVisible: false,
      ClassTipsVisible: false,
      MajorTipsVisible: false,
      GroupTipsVisible: false,
    },
    TipsTitle: {
      TelephoneTipsTitle: "电话由数字及-/组成",

      EmailTipsTitle: "邮箱格式错误",

      DiscriptionTipsTitle: "输入内容含有非法字符",

      HomeAddressTipsTitle: "家庭住址格式错误",

      UserIDTipsTitle: "应由1-24位字母与数字组成",
      UserNameTipsTitle:
        "应由1-20位的汉字、字母、数字、下划线、空格组成（首尾不允许空格）", //（首尾不允许空格）
      GradeTipsTitle: "请选择年级",
      TitleTipsTitle: "请选择职称",

      ClassTipsTitle: "请选择班级",
      GroupTipsTitle: "请选择教研室",
      MajorTipsTitle: "请选择专业",

      IDCardNoTipsTitle: "身份证格式错误",
      HomeAdressTipsTitle: "家庭住址格式错误",
      GenderTipsTitle: "请选择性别",
    },
    UserArchivesParams: {
      TipsLogName: "",
      UserArchivesModalType: "add", //add,edit
      UserArchivesModalRole: "Student", //Student,Teacher,Leader,
      DetailsType: "student", //student,leader,graduate
      DetailsData: {},
    },
    GraduateEditParams: {
      Telephone: "",
      Email: "",
      HomeAddress: "",
      UserID: "",
      UserName: "",
      Discription: "",
      JobType: "升学",
    },
    InitEditStudent: {
      UserID: "",
      UserName: "",
      ImgPath: "",
      Gender: "",
      CollegeID: "",
      CollegeName: "",
      MajorID: "",
      MajorName: "",
      GradeID: "",
      GradeName: "",
      ClassID: "",
      ClassName: "",
      IDCardNo: "",
      Telephone: "",
      Email: "",
      HomeAddress: "",
    },
    InitEditTeacher: {
      UserID: "",
      UserName: "",
      ImgPath: "",
      Gender: "",
      CollegeID: "",
      CollegeName: "",
      GroupID: "",
      GroupName: "",

      IDCardNo: "",
      Telephone: "",
      Email: "",
      HomeAddress: "",
    },
    InitEditLeader: {
      UserID: "",
      UserName: "",
      ImgPath: "",
      Gender: "",
      CollegeID: "",
      CollegeName: "",
      Position: "",

      IDCardNo: "",
      Telephone: "",
      Email: "",
      HomeAddress: "",
    },
    EditUserArchivesData: {
      UserID: "",
      UserName: "",
      ImgPath: "",
      Gender: "",
    },
  },
  actions
) => {
  switch (actions.type) {
    case CommonAction.COMMON_SET_TIPS_TITLE_PARAMS:
      return Object.assign({}, state, {
        TipsTitle: { ...state.TipsTitle, ...actions.data },
      });
    case CommonAction.COMMON_SET_TIPS_VISIBLE_PARAMS:
      return Object.assign({}, state, {
        TipsVisible: { ...state.TipsVisible, ...actions.data },
      });
    case CommonAction.COMMON_SET_GRADUATE_EDIT_PARAMS:
      return Object.assign({}, state, {
        GraduateEditParams: { ...state.GraduateEditParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_EDIT_USER_ARCHIVES_PARAMS:
      return Object.assign({}, state, {
        EditUserArchivesData: actions.data,
      });
    case CommonAction.COMMON_SET_USER_ARCHIVES_PARAMS:
      return Object.assign({}, state, {
        UserArchivesParams: { ...state.UserArchivesParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_MODAL_VISIBLE:
      return Object.assign({}, state, {
        ModalVisible: { ...state.ModalVisible, ...actions.data },
      });
    case CommonAction.COMMON_SET_GRADUATE_PARAMS:
      return Object.assign({}, state, {
        GraduateParams: { ...state.GraduateParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_STUDENT_PARAMS:
      return Object.assign({}, state, {
        StudentParams: { ...state.StudentParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_TEACHER_PARAMS:
      return Object.assign({}, state, {
        TeacherParams: { ...state.TeacherParams, ...actions.data },
      });
    case CommonAction.COMMON_SET_LEADER_PARAMS:
      return Object.assign({}, state, {
        LeaderParams: { ...state.LeaderParams, ...actions.data },
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
