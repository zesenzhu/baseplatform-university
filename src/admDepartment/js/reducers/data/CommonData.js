import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const CommonData = (
  state = {
    SearchUserData: {
      SearchUserKey: [],

      KeyWord: "",
      DepartmentID: "", //与DepartmentDetailData共用
    },
    SearchDepartment: {
      KeyWord: "",
      SearchDepartmentKey: [],
    },
    ModalUserTypeArr: [
      { UserType: 2, UserTypeName: "学生" },
      { UserType: 3, UserTypeName: "家长" },
      { UserType: 1, UserTypeName: "教师" },
      { UserType: 7, UserTypeName: "学校领导" },
      { UserType: 10, UserTypeName: "学院领导" },
    ],
    ModalBreadcrumbData: {
      1: [{ value: 1, title: "全校教师", id: "all" }],
      2: [{ value: 1, title: "全校学生", id: "all" }],
      3: [{ value: 1, title: "全部家长", id: "all" }],
      7: [{ value: 1, title: "全校领导", id: "all" }],
      10: [{ value: 1, title: "全院领导", id: "all" }],
    },
    BreadcrumbData: {
      1: [{ value: 1, title: "全校教师", id: "all" }],
      2: [{ value: 1, title: "全校学生", id: "all" }],
      3: [{ value: 1, title: "全部家长", id: "all" }],
      7: [{ value: 1, title: "全校领导", id: "all" }],
      10: [{ value: 1, title: "全院领导", id: "all" }],
    },
    UserData: {
      DepartmentID: "",
      UserType: 2,
      Level: 1,
      FullParentID: [],
      ProductUseRange: "",
      SelectUser: [],
      SelectUserForKey: [],
      CheckList: [],
    },
    DepartmentDetailData: {
      KeyWord: "",
      PageIndex: 0,
      PageSize: 16,
      DepartmentID: "",
      CancelBtnShow: "n",
      searchValue: "",
    },
    MenuTreeData: {
      selectedKeys: [], //选中的树节点
      expandedKeys: [], //展开的树节点
    },
    DepartmentMemberParams: {
      CheckList: [],
      CheckAll: false,
    },
    EditDepartmentMsg: {
      ParentID: "",
      InitParentID: "",
      DepartmentName: "",
      DepartmentNO: "",
      LeaderID: "",
      InitLeaderID: "",
      InitDepartmentName:'',
      DepartmentID: "",
      UserData:[],
      UserDataForKeys:{},
    },
    DeleteDepartmentMsg: {
      DeleteChildren: 0,
      DepartmentID: "",
    },
    DepartmentUserData: {
      SelectUser: [],
    },
    AddUserData: {
      SelectUser: [],
      SelectUserType: "",
    }
     ,AddDepartmentMsg: {
      ParentID: "",
      DepartmentName: "",
      DepartmentNO: "",
    },
  },
  actions
) => {
  let Data = {};
  let MenuTreeData = {};
  let SearchDepartment = {};
  let SearchUserData = {};
  let UserData = {};
  let DepartmentDetailData = {};
  let DepartmentMemberParams = {};
  let ModalBreadcrumbData = {};
  let DeleteDepartmentMsg = {};
  let EditDepartmentMsg = {};
  let AddDepartmentMsg = {};
  switch (actions.type) {
    case UpDataState.SET_BREADCRUMB_POSITION:
      Data = handleBreadcrumb(
        actions.level,
        actions.title,
        actions.id,
        actions.userType,
        state.ModalBreadcrumbData
      );
      ModalBreadcrumbData = Object.assign({}, state.ModalBreadcrumbData, {
        ...state.BreadcrumbData,
        ...Data,
      });
      return Object.assign({}, state, {
        ModalBreadcrumbData,
      });
    case UpDataState.SET_USER_CHECKLIST:
      UserData = Object.assign({}, state.UserData, {
        CheckList: actions.data,
      });
      return Object.assign({}, state, {
        UserData,
      });
      case UpDataState.SET_MODAL_USERTYPE_ARR:
        
      return Object.assign({}, state, {
        ModalUserTypeArr:actions.data,
      });
    case UpDataState.INIT_BREADCRUMB_POSITION:
      ModalBreadcrumbData = state.BreadcrumbData;
      // Object.assign({}, state.ModalBreadcrumbData, {
      //   ...state.BreadcrumbData,...Data,
      // });
      return Object.assign({}, state, {
        ModalBreadcrumbData,
      });
    case UpDataState.SET_DELETE_DEPARTMENT_PARAMS:
      DeleteDepartmentMsg = Object.assign({}, state.DeleteDepartmentMsg, {
        ...actions.data,
      });
      return Object.assign({}, state, { DeleteDepartmentMsg });
      case UpDataState.SET_EDIT_DEPARTMENT_PARAMS:
      EditDepartmentMsg = Object.assign({}, state.EditDepartmentMsg, {
        ...actions.data,
      });
      return Object.assign({}, state, { EditDepartmentMsg });
      case UpDataState.SET_ADD_DEPARTMENT_PARAMS:
      AddDepartmentMsg = Object.assign({}, state.AddDepartmentMsg, {
        ...actions.data,
      });
      return Object.assign({}, state, { AddDepartmentMsg });
    case UpDataState.SET_SELECTED_DEPARTMENT_TREE_KEYS:
      MenuTreeData = Object.assign({}, state.MenuTreeData, {
        selectedKeys: actions.data,
      });
      SearchUserData = Object.assign({}, state.SearchUserData, {
        DepartmentID: actions.data[0],
      });
      DepartmentDetailData = Object.assign({}, state.DepartmentDetailData, {
        DepartmentID: actions.data[0],
      });
      UserData = Object.assign({}, state.UserData, {
        DepartmentID: actions.data[0],
      });
      return Object.assign({}, state, {
        UserData,
        SearchUserData,
        MenuTreeData,
        DepartmentDetailData,
      });
    case UpDataState.SET_EXPANDED_DEPARTMENT_TREE_KEYS:
      MenuTreeData = Object.assign({}, state.MenuTreeData, {
        expandedKeys: actions.data,
      });

      return Object.assign({}, state, { MenuTreeData });
    case UpDataState.SET_SEARCH_DEPARTMENT_KEYWORD:
      SearchDepartment = Object.assign({}, state.SearchDepartment, {
        KeyWord: actions.data,
      });
      return Object.assign({}, state, { SearchDepartment });
    case UpDataState.SET_SEARCH_USER_KEYWORD:
      SearchUserData = Object.assign({}, state.SearchUserData, {
        KeyWord: actions.data,
      });
      return Object.assign({}, state, { SearchUserData });
    case UpDataState.SET_SEARCH_DEPARTMENT_KEY:
      SearchDepartment = Object.assign({}, state.SearchDepartment, {
        SearchDepartmentKey: actions.data,
      });
      MenuTreeData = Object.assign({}, state.MenuTreeData, {
        selectedKeys: [actions.data],
      });
      DepartmentDetailData = Object.assign({}, state.DepartmentDetailData, {
        DepartmentID: actions.data,
      });
      SearchUserData = Object.assign({}, state.SearchUserData, {
        DepartmentID: actions.data[0],
      });

      UserData = Object.assign({}, state.UserData, {
        DepartmentID: actions.data[0],
      });
      return Object.assign({}, state, {
        SearchDepartment,
        MenuTreeData,
        DepartmentDetailData,
        SearchUserData,
        UserData,
      });
    case UpDataState.SET_SEARCH_USER_KEY:
      SearchUserData = Object.assign({}, state.SearchUserData, {
        SearchUserKey: actions.data,
      });

      return Object.assign({}, state, {
        SearchUserData,
      });
    case UpDataState.SET_DEPARTMENT_DETAIL_PARAMS:
      DepartmentDetailData = Object.assign({}, state.DepartmentDetailData, {
        ...actions.data,
      });
      return Object.assign({}, state, { DepartmentDetailData });
    case UpDataState.INIT_DEPARTMENT_DETAIL_PARAMS:
      DepartmentDetailData = Object.assign({}, state.DepartmentDetailData, {
        KeyWord: "",
        PageIndex: 0,
        PageSize: 16,
        CancelBtnShow: "n",
        searchValue: "",
      });
      return Object.assign({}, state, { DepartmentDetailData });
    case UpDataState.SET_DEPARTMENT_MEMBER_DELETE_PARAMS:
      DepartmentMemberParams = Object.assign({}, state.DepartmentMemberParams, {
        ...actions.data,
      });
      return Object.assign({}, state, { DepartmentMemberParams });
    case UpDataState.INIT_DEPARTMENT_MEMBER_MODAL_DATA:
      UserData = Object.assign({}, state.UserData, {
        // DepartmentID: "",
        UserType: 2,
        Level: 1,
        FullParentID: [],
        ProductUseRange: "",
        SelectUser: [],
        SelectUserForKey: [],
      });
      SearchUserData = Object.assign({}, state.SearchUserData, {
        SearchUserKey: [],

        KeyWord: "",
        DepartmentID: "",
      });
      return Object.assign({}, state, { UserData, SearchUserData });
    case UpDataState.SET_SELECT_USER:
      UserData = Object.assign({}, state.UserData, {
        ...actions.data,
      });
      return Object.assign({}, state, { UserData });
    case UpDataState.SET_USER_PARAMS:
      UserData = Object.assign({}, state.UserData, {
        ...actions.data,
      });
      return Object.assign({}, state, { UserData });
    default:
      return state;
  }
};

function handleBreadcrumb(level, title, id, userType, ModalBreadcrumbData) {
  // 获取对应面包屑
  let BreadcrumbData = ModalBreadcrumbData[userType];
  if (!(BreadcrumbData instanceof Array)) {
    return [];
  }
  let len = BreadcrumbData.length; //当前面包屑层次
  if (len === level) {
    //在面包屑后面加一层，直接点击面包屑或可控时
    BreadcrumbData.push({
      value: len + 1,
      title: title,
      id: id,
    });
  } else if (len > level) {
    //在当前面包屑前面，一般为直接点击面包屑才会这样
    // BreadcrumbData.map(child)
    BreadcrumbData = BreadcrumbData.slice(0, level);
  } else if (len < level) {
    //一般不会有
  }
  let data = {};
  data[userType] = BreadcrumbData;
  return data;
}

export default CommonData;
