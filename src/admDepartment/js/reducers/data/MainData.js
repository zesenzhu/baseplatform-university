import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
import { func } from "prop-types";
const MainData = (
  state = {
    DepartmentData: {
      DepartMentTree: [],
      InitData: [],
      TreeNode: {},
      PathKeys: {},
      DepartMentTreeForKey: {},
      DepartMentList: [],
    },
    ModuleData: {
      cnname: "学校组织结构管理",
      enname: "School Department management",
    },
    SearchDepartmentData: {
      SearchDepartmentData: [],
      InitData: [],
    },
    DepartmentDetailData: {
      DepartmentMemberList: [],
      KeyList: [],
      DepartmentData: {
        Total: 0,
        PageIndex: 0,
        DepartmentID: "",
        DepartmentName: "",
        DepartmentNO: "",
        FullPathID: "", //全路径部门ID
        FullPathNO: "", //全路径部门编号
        FullPathName: "", //全路径部门名称
        Readonly: true, //是否是系统内置部门，true则不允许修改、删除，只允许添加下级部门
        LeaderID: "", //部门主管ID
        LeaderName: "",
        PhotoPath: "", //部门主管头像
      },
    },
    UserData: {
      UserList: [],
      UserKeyForSelect: [],
    },
    SearchUserData: {
      UserData: [],
      InitData: [],
      UserDataForKeys:{}
    },
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.MAIN_GET_DEPARTMENT_DATA:
      Data = handleDepartmentData(actions.data);
      return Object.assign({}, state, {
        DepartmentData: { ...state.DepartmentData, ...Data },
      });
    case UpDataState.MAIN_GET_SEARCH_DEPARTMENT:
      Data = handleSearchDepartmentData(actions.data, actions.pageSize);
      return Object.assign({}, state, {
        SearchDepartmentData: { ...state.SearchDepartmentData, ...Data },
      });
    case UpDataState.MAIN_SET_HANDLE_BOX_VISIBLE:
      state.DepartmentData.TreeNode[actions.key] = actions.bool;
      return Object.assign({}, state, {
        DepartmentData: { ...state.DepartmentData },
      });

    case UpDataState.MAIN_GET_DEPARTMENT_DETAIL:
      Data = handleDepartmentDetail(actions.data);
      return Object.assign({}, state, { DepartmentDetailData: Data });
    case UpDataState.MAIN_GET_USER_DATA:
      Data = handleUserData(actions.data);
      return Object.assign({}, state, { UserData: Data });
    case UpDataState.MAIN_GET_SEARCH_USER_DATA:
      Data = handleSearchUserData(actions.data);
      return Object.assign({}, state, { SearchUserData: Data });
    default:
      return state;
  }
};
//
// handleTreeNodeData =(key,bool)=>{

// }
// 处理搜索用户信息
function handleSearchUserData(Data) {
  let UserTypeKey = {
    7: "领导",
    2: "学生",
    3: "家长",
    1: "教师",
    10: "领导",
  };
  let UserData = [];
  let InitData = [];
  let UserDataForKeys = {};
  if (Data instanceof Array) {
    Data.map((child) => {
      let { NodeID, NodeName, DepartmentNO, ...other } = child;
      child["UserTypeName"] = UserTypeKey[child.UserType];
      UserData.push({
        value: NodeID,
        title: NodeName,
        NodeIDAndUserType:child.NodeID + "--" + child.UserType,
        ...child,
      });
      UserDataForKeys[child.NodeID + "--" + child.UserType]={
        value: NodeID,
        title: NodeName,
        NodeIDAndUserType:child.NodeID + "--" + child.UserType,
        ...child,
      }
    });
    return {
      UserData,
      InitData: Data,
      UserDataForKeys
    };
  } else {
    return {
      UserData,
      InitData: Data,
    };
  }
}
// 处理用户信息
function handleUserData(Data) {
  let UserTypeKey = {
    7: "领导",
    2: "学生",
    3: "家长",
    1: "教师",
    10: "领导",
  };
  if (!Data) {
    return {
      UserList: [],
      UserKeyForSelect: [],
    };
  } else {
    let UserList = [];
    let UserKeyForSelect = [];
    Data.map((child) => {
      child["NodeIDAndUserType"] = child.NodeID + "--" + child.UserType;
      child["UserTypeName"] = UserTypeKey[child.UserType];
      UserList.push(child);
      UserKeyForSelect[child.NodeIDAndUserType] = child;
    });
    return {
      UserList,
      UserKeyForSelect,
    };
  }
}
// 处理部门详情
function handleDepartmentDetail(Data) {
  if (!Data) {
    return {
      DepartmentMemberList: [],
      DepartmentData: {
        Total: 0,
        PageIndex: 0,
        DepartmentID: "",
        DepartmentName: "",
        DepartmentNO: "",
        FullPathID: "", //全路径部门ID
        FullPathNO: "", //全路径部门编号
        FullPathName: "", //全路径部门名称
        Readonly: true, //是否是系统内置部门，true则不允许修改、删除，只允许添加下级部门
        LeaderID: "", //部门主管ID
        LeaderName: "",
        PhotoPath: "", //部门主管头像
      },
      KeyList: [],
    };
  }
  let { List, ...other } = Data;
  let KeyList = [];
  let UserTypeKey = {
    7: "领导",
    2: "学生",
    3: "家长",
    1: "教师",
    10: "领导",
  };
  let DepartmentMemberList = [];
  if (!List || !(List instanceof Array)) {
    DepartmentMemberList = [];
  } else {
    List.map((child, index) => {
      KeyList.push(child.UserID);
      DepartmentMemberList.push({
        ...child,
        UserTypeName: UserTypeKey[child.UserType],
      });
    });
  }
  return {
    DepartmentMemberList,
    DepartmentData: other,
    KeyList,
  };
}
// 解构搜索数据
function handleSearchDepartmentData(Data) {
  let SearchDepartmentData = [];
  if (Data instanceof Array) {
    SearchDepartmentData = Data.map((child) => {
      let { DepartmentID, DepartmentName, DepartmentNO, ...other } = child;
      return {
        value: DepartmentID,
        title: DepartmentName,
        id: DepartmentNO,
        ...other,
      };
    });
  }
  return {
    SearchDepartmentData,
    InitData: Data,
  };
}
// 解构组织数据
let TreeNode = {};
let PathKeys = {};
let DepartMentTreeForKey = {};
let DepartMentList = [];
function handleDepartmentData(Data) {
  let DepartMentTree = [];
  let level = -1;
  if (Data instanceof Array) {
    DepartMentTree = AnalyzeData(Data, level);
  }
  return {
    DepartMentTree,
    InitData: Data,
    TreeNode,
    PathKeys,
    DepartMentList,
    DepartMentTreeForKey,
  };
}
function AnalyzeData(Data, level) {
  ++level;
  // if(!(Data instanceof Array)){

  // }
  return Data.map((child) => {
    let {
      DepartmentID,
      FullPathID,
      DepartmentName,
      DepartmentNO,
      Children,
      ...others
    } = child;
    TreeNode[DepartmentID] = false;
    DepartMentList.push({ value: DepartmentID, title: DepartmentName });
    PathKeys[DepartmentID] =
      FullPathID instanceof String ? FullPathID.split(">") : [];
    DepartMentTreeForKey[DepartmentID] = child;
    if (Children instanceof Array && (Children !== null || Children !== [])) {
      return {
        title: DepartmentName,
        key: DepartmentID,
        id: DepartmentNO,
        pathKeys: FullPathID instanceof String ? FullPathID.split(">") : [],
        level,
        children: AnalyzeData(Children, level),
        ...others,
      };
    }
    return {
      title: DepartmentName,
      level,
      pathKeys: FullPathID instanceof String ? FullPathID.split(">") : [],
      id: DepartmentNO,

      key: DepartmentID,
      ...others,
    };
  });
}
export default MainData;
