import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";
import Public from "../../../common/js/public";

//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";

//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
// 获取组织结构树
const MAIN_GET_DEPARTMENT_DATA = "MAIN_GET_DEPARTMENT_DATA";
const GetDepartment = ({ params, userDefault = true, func = () => {} }) => {
  //params为预留参数位置
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;
    let CollegeID = DataState.LoginUser.CollegeID;
    if (CollegeID === undefined) {
      CollegeID = "";
    }
    dispatch(UpUIState.LeftLoadingOpen());
    getDepartment({
      SchoolID,
      CollegeID,
      dispatch,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_DEPARTMENT_DATA,
          data: res.Data,
        });
        let State = getState();
        if (userDefault) {
          let key =
            State.DataState.MainData.DepartmentData.DepartMentTree[0].key;
          dispatch(SetSelectedDepartmentTreeKeys([key]));

          dispatch(SetExpandedDepartmentTreeKeys([key]));
          dispatch(GetDepartmentDetail({}));
        }

        func(State);
        dispatch(UpUIState.LeftLoadingClose());
        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};
// 查询用户相关数据
const MAIN_GET_USER_DATA = "MAIN_GET_USER_DATA";
const GetUserData = ({
  DepartmentID,
  UserType,
  Level,
  FullParentID,
  // ProductUseRange,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;
    let CollegeID = DataState.LoginUser.CollegeID;
    if (CollegeID === undefined) {
      CollegeID = "";
    }
    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.UserData.DepartmentID;
    }
    if (UserType === undefined) {
      UserType = DataState.CommonData.UserData.UserType;
    }
    if (Level === undefined) {
      Level = DataState.CommonData.UserData.Level;
    }
    if (FullParentID === undefined) {
      FullParentID = DataState.CommonData.UserData.FullParentID.join(">");
    }
    dispatch(UpUIState.UserLoadingOpen());
    getUserData({
      DepartmentID,
      UserType,
      Level,
      FullParentID,
      SchoolID,
      CollegeID,
      // ProductUseRange,
      dispatch,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_USER_DATA,
          data: res.Data,
        });
        dispatch(UpUIState.UserLoadingClose());
        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};
// 搜索用户
const MAIN_GET_SEARCH_USER_DATA = "MAIN_GET_SEARCH_USER_DATA";
const GetSearchUser = ({ keyword, DepartmentID }) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;
    let CollegeID = DataState.LoginUser.CollegeID;
    if (CollegeID === undefined) {
      CollegeID = "";
    }
    if (keyword === undefined) {
      keyword = DataState.CommonData.SearchUserData.KeyWord;
    }
    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.MenuTreeData.selectedKeys[0];
    }

    dispatch(UpUIState.SearchLoadingOpen());
    getSearchUser({
      keyword,
      SchoolID,
      CollegeID,
      DepartmentID,
      dispatch,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_SEARCH_USER_DATA,
          data: res.Data,
        });
        dispatch(UpUIState.SearchLoadingClose());
        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};
// 获取部门详情

const MAIN_GET_DEPARTMENT_DETAIL = "MAIN_GET_DEPARTMENT_DETAIL";
const GetDepartmentDetail = ({
  keyword,
  PageSize,
  PageIndex,
  DepartmentID,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;
    if (keyword === undefined) {
      keyword = DataState.CommonData.DepartmentDetailData.KeyWord;
    }
    if (PageSize === undefined) {
      PageSize = DataState.CommonData.DepartmentDetailData.PageSize;
    }
    if (PageIndex === undefined) {
      PageIndex = DataState.CommonData.DepartmentDetailData.PageIndex;
    }
    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.DepartmentDetailData.DepartmentID;
    }
    dispatch(UpUIState.TableLoadingOpen());
    getDepartmentDetail({
      keyword,
      PageIndex,
      PageSize,
      DepartmentID,
      dispatch,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_DEPARTMENT_DETAIL,
          data: res.Data,
        });
        dispatch(
           SetDepartmentMemberDeleteParams({
            CheckList: [],
            CheckAll: false,
          })
        );
        dispatch(UpUIState.TableLoadingClose());
        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};
// 获取部门详情

// const COMMON_GET_DEPARTMENT_DETAIL = "COMMON_GET_DEPARTMENT_DETAIL";
const GetEditDepartmentDetail = ({ DepartmentID, func = () => {} }) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;

    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.EditDepartmentMsg.DepartmentID;
    }
    dispatch(UpUIState.ModalLoadingOpen());
    getDepartmentDetail({
      keyword: "",
      PageIndex: 0,
      PageSize: 0,
      DepartmentID,
      dispatch,
    }).then((res) => {
      if (res) {
        let {
          List,
          DepartmentID,
          DepartmentName,
          DepartmentNO,
          LeaderID,
          ParentID,
          LeaderName,
        } = res.Data;
        let UserData = [];
        let UserDataForKeys = {};
        List instanceof Array &&
          List.map((child) => {
            UserData.push({
              value: child.UserID,
              title: child.UserName,
            });
            UserDataForKeys[child.UserID] = {
              value: child.UserID,
              title: child.UserName,
            };
          });
        UserDataForKeys[LeaderID] = {
          value: LeaderID,
          title: LeaderName,
        };
        dispatch(
          SetEditDepartmentParams({
            ParentID,
            InitParentID: ParentID,
            DepartmentName,
            DepartmentNO,
            LeaderID: LeaderID,
            InitLeaderID: LeaderID,
            InitDepartmentName: DepartmentName,
            DepartmentID,
            UserData,
            UserDataForKeys,
          })
        );
        dispatch(UpUIState.ModalLoadingClose());
        func();

        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};
// 搜索部门
const MAIN_GET_SEARCH_DEPARTMENT = "MAIN_GET_SEARCH_DEPARTMENT";
const GetSearchDepartment = ({ keyword }) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    let SchoolID = DataState.LoginUser.SchoolID;
    if (keyword === undefined) {
      keyword = DataState.CommonData.SearchDepartment.KeyWord;
    }

    dispatch(UpUIState.SearchLoadingOpen());
    getSearchDepartment({
      keyword,
      SchoolID,
      dispatch,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_SEARCH_DEPARTMENT,
          data: res.Data,
        });
        dispatch(UpUIState.SearchLoadingClose());
        // dispatch({ type: UpUIState.APP_LOADING_CLOSE });
      }
    });
  };
};

// 设置选中组织树节点
const SET_SELECTED_DEPARTMENT_TREE_KEYS = "SET_SELECTED_DEPARTMENT_TREE_KEYS";
const SetSelectedDepartmentTreeKeys = (data = "default") => {
  return (dispatch, getState) => {
    if (data === "default") {
      data = getState().DataState.MainData.DepartmentData.DepartMentTree[0]
        .DepartmentID;
    }
    dispatch({ type: SET_SELECTED_DEPARTMENT_TREE_KEYS, data });
  };
};
// 设置展开组织树节点
const SET_EXPANDED_DEPARTMENT_TREE_KEYS = "SET_EXPANDED_DEPARTMENT_TREE_KEYS";
const SetExpandedDepartmentTreeKeys = (data = "default") => {
  return (dispatch, getState) => {
    if (data === "default") {
      data = [
        getState().DataState.MainData.DepartmentData.DepartMentTree[0]
          .DepartmentID,
      ];
    }
    dispatch({ type: SET_EXPANDED_DEPARTMENT_TREE_KEYS, data });
  };
};
// 设置搜索组织词
const SET_SEARCH_DEPARTMENT_KEYWORD = "SET_SEARCH_DEPARTMENT_KEYWORD";
const SetSearchDepartmentKeyWord = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH_DEPARTMENT_KEYWORD, data });
  };
};
// 设置搜索选中组织词
const SET_SEARCH_DEPARTMENT_KEY = "SET_SEARCH_DEPARTMENT_KEY";
const SetSearchDepartmentKey = (data = "default") => {
  return (dispatch, getState) => {
    if (data === "default") {
      data = getState().DataState.MainData.DepartmentData.DepartMentTree[0]
        .DepartmentID;
    }
    dispatch({ type: SET_SEARCH_DEPARTMENT_KEY, data });
  };
};
// 设置组织树操作块显示/隐藏
const MAIN_SET_HANDLE_BOX_VISIBLE = "MAIN_SET_HANDLE_BOX_VISIBLE";
const MainSetHandleBoxVisible = (key, bool) => {
  return (dispatch) => {
    dispatch({ type: MAIN_SET_HANDLE_BOX_VISIBLE, key, bool });
  };
};
// 设置获取组织成员参数
const SET_DEPARTMENT_DETAIL_PARAMS = "SET_DEPARTMENT_DETAIL_PARAMS";
const SetDepartmentDetailParams = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_DEPARTMENT_DETAIL_PARAMS, data });
  };
};
// 设置初始化获取组织成员参数
const INIT_DEPARTMENT_DETAIL_PARAMS = "INIT_DEPARTMENT_DETAIL_PARAMS";
const InitDepartmentDetailParams = (data) => {
  return (dispatch) => {
    dispatch({ type: INIT_DEPARTMENT_DETAIL_PARAMS, data });
  };
};
// 设置移除选择参数
const SET_DEPARTMENT_MEMBER_DELETE_PARAMS =
  "SET_DEPARTMENT_MEMBER_DELETE_PARAMS";
const SetDepartmentMemberDeleteParams = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_DEPARTMENT_MEMBER_DELETE_PARAMS, data });
  };
};
// 设置移除选择参数
const INIT_DEPARTMENT_MEMBER_MODAL_DATA = "INIT_DEPARTMENT_MEMBER_MODAL_DATA";
const InitDepartmentMemberModalData = () => {
  return (dispatch) => {
    dispatch({ type: INIT_DEPARTMENT_MEMBER_MODAL_DATA });
  };
};
// 设置添加人员：搜索人员
const SET_SEARCH_USER_KEY = "SET_SEARCH_USER_KEY";
const SetSearchUserKey = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH_USER_KEY, data });
  };
};
// 设置添加人员：搜索人员输入值
const SET_SEARCH_USER_KEYWORD = "SET_SEARCH_USER_KEYWORD";
const SetSearchUserKeyWord = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH_USER_KEYWORD, data });
  };
};
// 设置添加人员：搜索人员选中值
const SET_SELECT_USER = "SET_SELECT_USER";
const SetSelectUser = (data,func=()=>{}) => {
  //data：所选的用户id,数组
  return (dispatch, getState) => {
    let {
      SelectUserForKey,
      SelectUser,
    } = getState().DataState.CommonData.UserData;
    let { UserDataForKeys } = getState().DataState.MainData.SearchUserData;
    let newSelectUser = [];
    let newSelectUserForKey = {};
    // 先把要增加的data查下看是否是已选择的子元素
    let DataIsChild = false;
    let DataFullPathIDArr = [];
    if (typeof UserDataForKeys[data].FullPathID === "string") {
      DataFullPathIDArr = UserDataForKeys[data].FullPathID.split(">");
    }
    let Parent = {};
    // console.log(DataFullPathIDArr,SelectUserForKey);
    for (let key in SelectUserForKey) {
      //遍历查询是否属于已选的子元素
      let ID= key.split('--')
      
      DataFullPathIDArr.map((child, index) => {
        if (index !== DataFullPathIDArr.length - 1) {
          if (ID[0] === child) {
            //相等说明所选值是该child的父辈
            DataIsChild = true;
            Parent = SelectUserForKey[key]
          }
        }
      });
    }
    if (!DataIsChild) {
      //非子
      SelectUser.push(data);
      SelectUserForKey[data] = UserDataForKeys[data];
      newSelectUser = SelectUser;
      newSelectUserForKey = SelectUserForKey;
      SelectUser = [];
      SelectUserForKey = {};
      console.log(newSelectUserForKey);
      for (let index in newSelectUserForKey) {
        let ID = data;
        let isChild = false;
        let FullPathIDArr = [];
        if (typeof newSelectUserForKey[index].FullPathID === "string") {
          FullPathIDArr = newSelectUserForKey[index].FullPathID.split(">");
        }
        FullPathIDArr.map((child, index) => {
          if (index !== FullPathIDArr.length - 1) {
            if (ID === child) {
              //相等说明所选值是该child的父辈
              isChild = true;
            }
          }
        });
        // console.log(data,oldData,checkData,ID,FullPathIDArr,isChild,SelectUserForKey[index].FullPathID,typeof SelectUserForKey[index].FullPathID === 'string')
        //重新修改SelectUser
        if (!isChild) {
          SelectUser.push(index);
          SelectUserForKey[index] = newSelectUserForKey[index];
        }
      }
      func()
    }else{
      if(!Parent.IsUser)
      dispatch(
        actions.UpUIState.showErrorAlert({
          type : "warn",
          title: Parent.NodeName+"全体"+Parent.UserTypeName+"已包含此人",
        })
      );
    }

    dispatch({ type: SET_SELECT_USER, data: { SelectUser, SelectUserForKey } });
  };
};
const SetSelectUser_2 = (data, isAdd) => {
  //data：所选的用户id,数组
  return (dispatch, getState) => {
    let {
      SelectUserForKey,
      SelectUser,
    } = getState().DataState.CommonData.UserData;
    let { UserKeyForSelect } = getState().DataState.MainData.UserData;
    let SearchUserKey = getState().DataState.CommonData.SearchUserData
    let isSearchUserKeySelected = false;
    
    console.log(SelectUser, SelectUserForKey, data, isAdd);
    let newSelectUser = [];
    let newSelectUserForKey = {};
    if (isAdd === true) {
      SelectUser.push(data);
      SelectUserForKey[data] = UserKeyForSelect[data];
      newSelectUser = SelectUser;
      newSelectUserForKey = SelectUserForKey;
    } else if (isAdd === false) {
      SelectUser.map((child) => {
        if (child !== data) {
          newSelectUser.push(child);
        }
      });

      for (let index in SelectUserForKey) {
        if (index !== data) {
          newSelectUserForKey[index] = SelectUserForKey[index];
        }
      }
    } else {
      newSelectUser = SelectUser;
      newSelectUserForKey = SelectUserForKey;
    }
    SelectUser = [];
    SelectUserForKey = {};
    for (let index in newSelectUserForKey) {
      //检查data是否是原选择数据里面的父辈
      let ID = data.split("--")[0];
      let isChild = false;
      let FullPathIDArr = [];
      if (typeof newSelectUserForKey[index].FullPathID === "string") {
        FullPathIDArr = newSelectUserForKey[index].FullPathID.split(">");
      }
      FullPathIDArr.map((child, Index) => {
        if (Index !== FullPathIDArr.length - 1) {
          if (ID === child) {
            //相等说明所选值是该child的父辈
            isChild = true;
          }
        }
      });
      // console.log(data,oldData,checkData,ID,FullPathIDArr,isChild,SelectUserForKey[index].FullPathID,typeof SelectUserForKey[index].FullPathID === 'string')
      //重新修改SelectUser
      if (!isChild) {
        SelectUser.push(index);
        SelectUserForKey[index] = newSelectUserForKey[index];
      }
      if(SearchUserKey[0]===index){
        isSearchUserKeySelected = true;

      }
    }
    if(!isSearchUserKeySelected){
      dispatch(SetSearchUserKey([]));

    }
    dispatch({ type: SET_SELECT_USER, data: { SelectUser, SelectUserForKey } });
  };
};
// 设置添加人员：搜索人员输入值
const SET_USER_CHECKLIST = "SET_USER_CHECKLIST";
const SetUserCheckList = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_USER_CHECKLIST, data });
  };
};
// 设置获取人员的请求参数
const SET_USER_PARAMS = "SET_USER_PARAMS";
const SetUserParams = (data) => {
  return (dispatch, getState) => {
    let { CommonData } = getState().DataState;
    if (data.FullParentID === undefined) {
      let ModalBreadcrumbData = CommonData.ModalBreadcrumbData;
      let { UserType } = CommonData.UserData;
      let FullParentID = [];
      ModalBreadcrumbData[UserType].map((child) => {
        if (child.id !== "all") {
          FullParentID.push(child.id);
        }
      });
      data.FullParentID = FullParentID;
      console.log(data, FullParentID);
    }
    dispatch({ type: SET_USER_PARAMS, data });
  };
};
// 设置面包屑的值和位置
const SET_BREADCRUMB_POSITION = "SET_BREADCRUMB_POSITION";
const SetBreadcrumbPosition = ({ level, title, id, userType }) => {
  return (dispatch, getState) => {
    if (level === undefined) {
      level = 1;
    }
    if (title === undefined) {
      let UserType = getState().DataState.CommonData.UserData.UserType;
      title = getState().DataState.CommonData.BreadcrumbData[UserType];
    }

    if (id === undefined) {
      id = "all";
    }
    if (userType === undefined) {
      userType = getState().DataState.CommonData.UserData.UserType;
    }
    dispatch({ type: SET_BREADCRUMB_POSITION, level, title, id, userType });
  };
};
// 设置面包屑的值和位置
const INIT_BREADCRUMB_POSITION = "INIT_BREADCRUMB_POSITION";
const InitBreadcrumbPosition = ({ level, title, id, userType }) => {
  return (dispatch) => {
    dispatch({ type: INIT_BREADCRUMB_POSITION, level, title, id, userType });
  };
};

// 设置删除部门参数
const SET_DELETE_DEPARTMENT_PARAMS = "SET_DELETE_DEPARTMENT_PARAMS";
const SetDeleteDepartmentParams = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_DELETE_DEPARTMENT_PARAMS, data });
  };
};
// 设置删除部门参数
const SET_EDIT_DEPARTMENT_PARAMS = "SET_EDIT_DEPARTMENT_PARAMS";
const SetEditDepartmentParams = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_EDIT_DEPARTMENT_PARAMS, data });
  };
};
// 设置删除部门参数
const SET_ADD_DEPARTMENT_PARAMS = "SET_ADD_DEPARTMENT_PARAMS";
const SetAddDepartmentParams = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_ADD_DEPARTMENT_PARAMS, data });
  };
};
// 设置家长，学院管理员显示参数
const SET_MODAL_USERTYPE_ARR = "SET_MODAL_USERTYPE_ARR";
const SetModalUserTypeArr = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_MODAL_USERTYPE_ARR, data });
  };
};
// 公用方法

// 去重
function RemoveRepeat(data) {
  //可操作数组
  // if(data instanceof Array){
  // }
}
// 添加部门-部门编号
const checkAddDepartmentNO = (func = (error, DepartmentNOError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^([a-zA-Z0-9]{1,24})$/;
    let DepartmentNOError = false;

    let DepartmentNO = DataState.CommonData.AddDepartmentMsg.DepartmentNO;
    // let InitDepartmentNO = DataState.CommonData.AddDepartmentMsg.DepartmentNO;
    let error = false;

    if (DepartmentNO === "") {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNOTips: "部门编号不能为空" },
      });
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNOTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(DepartmentNO)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNOTips: "部门编号格式不正确" },
      });
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNOTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNOTipsVisible: false,
        })
      );
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNOTips: "部门编号不能为空" },
      });
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{DepartmentNOTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      // if (Public.comparisonObject(InitDepartmentNO, DepartmentNO)) {
      //   DepartmentNOError = true;
      // }
    }
    func(error, DepartmentNOError);
  };
};
// 添加部门-部门名称
const checkAddDepartmentName = (func = (error, DepartmentNameError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/;
    let DepartmentNameError = false;

    let DepartmentName = DataState.CommonData.AddDepartmentMsg.DepartmentName;
    // let InitDepartmentName = DataState.CommonData.AddDepartmentMsg.DepartmentName;
    let error = false;

    if (DepartmentName === "") {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称不能为空" },
      });
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNameTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(DepartmentName)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称格式不正确" },
      });
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNameTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AddDepartmentTipsVisible({
          DepartmentNameTipsVisible: false,
        })
      );
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称不能为空" },
      });
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{DepartmentNameTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      // if (Public.comparisonObject(InitDepartmentName, DepartmentName)) {
      //   DepartmentNameError = true;
      // }
    }
    func(error, DepartmentNameError);
  };
};
// 查询全部
const AddDepartmentcheckAll = ({
  success = () => {},
  error = () => {},
  error2 = () => {},
}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();

    let DepartmentNOError = false;
    let DepartmentNameError = false;

    let { AddDepartment } = UIState.AppTipsVisible;
    let isError = false;
    for (let visible in AddDepartment) {
      if (AddDepartment[visible]) {
        isError = true;
      }
    }
    if (isError) {
      error();
      return;
    }
    let {
      ParentID,
      DepartmentName,
      DepartmentNO,
    } = DataState.CommonData.AddDepartmentMsg;

    dispatch(
      checkAddDepartmentNO((error, Error2) => {
        DepartmentNOError = error;
      })
    );
    dispatch(
      checkAddDepartmentName((error, Error2) => {
        DepartmentNameError = error;
      })
    );

    if (DepartmentNOError || DepartmentNameError) {
      error();
    } else {
      success();
    }
  };
};

// 编辑部门-部门名称
const checkEditDepartmentName = (func = (error, DepartmentNameError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/;

    let DepartmentNameError = false;

    let DepartmentName = DataState.CommonData.EditDepartmentMsg.DepartmentName;
    let InitDepartmentName =
      DataState.CommonData.EditDepartmentMsg.InitDepartmentName;
    let error = false;

    if (DepartmentName === "") {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称不能为空" },
      });
      dispatch(
        UpUIState.EditDepartmentTipsVisible({
          DepartmentNameTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(DepartmentName)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称格式不正确" },
      });
      dispatch(
        UpUIState.EditDepartmentTipsVisible({
          DepartmentNameTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.EditDepartmentTipsVisible({
          DepartmentNameTipsVisible: false,
        })
      );
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { DepartmentNameTips: "部门名称不能为空" },
      });
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{DepartmentNameTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      if (Public.comparisonObject(InitDepartmentName, DepartmentName)) {
        DepartmentNameError = true;
      }
    }
    func(error, DepartmentNameError);
  };
};
// 查询全部
const EditDepartmentcheckAll = ({
  success = () => {},
  error = () => {},
  error2 = () => {},
}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();

    let DepartmentNOError = false;
    let DepartmentNameError = false;
    let DepartmentNameError2 = false;

    let { EditDepartment } = UIState.AppTipsVisible;
    let isError = false;
    for (let visible in EditDepartment) {
      if (EditDepartment[visible]) {
        isError = true;
      }
    }
    if (isError) {
      error();
      return;
    }
    let {
      ParentID,
      DepartmentName,
      LeaderID,
      DepartmentNO,
      InitParentID,
      InitLeaderID,
      InitDepartmentName,
    } = DataState.CommonData.EditDepartmentMsg;

    dispatch(
      checkEditDepartmentName((error, Error2) => {
        DepartmentNameError = error;
        DepartmentNameError2 = Error2;
      })
    );

    if (
      InitDepartmentName === DepartmentName &&
      InitParentID === ParentID &&
      InitLeaderID === LeaderID
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          title: "部门信息未修改",
        })
      );
      error2();
    } else if (DepartmentNOError || DepartmentNameError) {
      error();
    } else {
      success();
    }
  };
};
// 接口
// 获取组织结构树
const getDepartment = async ({ SchoolID, CollegeID, dispatch }) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/GetDepartment?schoolID=" +
    SchoolID +
    "&CollegeID" +
    CollegeID;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};
// 查询用户相关数据
const getUserData = async ({
  DepartmentID,
  UserType,
  Level,
  FullParentID,
  SchoolID,
  CollegeID,
  // ProductUseRange,
  dispatch,
}) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/GetUserData?DepartmentID=" +
    DepartmentID +
    "&UserType=" +
    UserType +
    "&Level=" +
    Level +
    "&FullParentID=" +
    FullParentID +
    "&SchoolID=" +
    SchoolID +
    "&CollegeID=" +
    CollegeID;
  // +
  // "&ProductUseRange=" +
  // ProductUseRange;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};
// 搜索用户

const getSearchUser = async ({
  keyword,
  CollegeID,
  DepartmentID,
  SchoolID,
  dispatch,
}) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/searchUser?schoolID=" +
    SchoolID +
    "&keyword=" +
    keyword +
    "&CollegeID=" +
    CollegeID +
    "&DepartmentID=" +
    DepartmentID;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};
// 获取部门详情
const getDepartmentDetail = async ({
  keyword,
  PageIndex,
  PageSize,
  DepartmentID,
  dispatch,
}) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/GetDepartmentDetail?keyword=" +
    keyword +
    "&PageIndex=" +
    PageIndex +
    "&PageSize=" +
    PageSize +
    "&DepartmentID=" +
    DepartmentID;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};
const getEditDepartmentDetail = async ({ DepartmentID, dispatch }) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/GetDepartmentDetail?DepartmentID=" +
    DepartmentID;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};
// 搜索部门
const getSearchDepartment = async ({ keyword, SchoolID, dispatch }) => {
  let url =
    CONFIG.DePartmentProxy_univ +
    "/searchDepartment?schoolID=" +
    SchoolID +
    "&keyword=" +
    keyword;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};

// 新增部门
const AddDepartment = ({
  ParentID,
  DepartmentName,
  DepartmentNO,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddDepartment";
    let { DataState } = getState();
    if (ParentID === undefined) {
      ParentID = DataState.CommonData.AddDepartmentMsg.ParentID;
    }
    if (DepartmentName === undefined) {
      DepartmentName = DataState.CommonData.AddDepartmentMsg.DepartmentName;
    }
    if (DepartmentNO === undefined) {
      DepartmentNO = DataState.CommonData.AddDepartmentMsg.DepartmentNO;
    }
    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        ParentID,
        DepartmentName,
        DepartmentNO,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            //增加的节点与选中的节点无关，只获取新树结构和组织详情
            dispatch(GetDepartment({ userDefault: false }));
            dispatch(GetDepartmentDetail({}));
          }
          func();
        }
      });
  };
};

// 删除部门
const DeleteDepartment = ({
  DeleteChildren,
  DepartmentID,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteDepartment";
    let { DataState } = getState();
    if (DeleteChildren === undefined) {
      DeleteChildren = DataState.CommonData.DeleteDepartmentMsg.DeleteChildren;
    }
    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.DeleteDepartmentMsg.DepartmentID;
    }

    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        DeleteChildren,
        DepartmentID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            let isChild = false;
            let PathKey = getState().DataState.MainData.DepartmentData.PathKeys[
              DataState.CommonData.MenuTreeData.selectedKeys[0]
            ];
            PathKey instanceof Array &&
              PathKey.map((child) => {
                if (child === DepartmentID) {
                  isChild = true;
                }
              });
            if (
              DepartmentID ===
                DataState.CommonData.MenuTreeData.selectedKeys[0] ||
              (DeleteChildren === 1 && isChild)
            ) {
              //删除的节点与选中的节点有关
              // let initID =
              //   DataState.MainData.DepartmentDetailData.DepartmentMemberList[0]
              //     .DepartmentID;
              dispatch(SetSearchDepartmentKey(""));
              // dispatch(SetSelectedDepartmentTreeKeys([initID]));

              // dispatch(SetExpandedDepartmentTreeKeys([initID]));
              dispatch(GetDepartment({}));
            } else {
              //删除的节点与选中的节点无关，只获取新树结构和组织详情
              dispatch(
                GetDepartment({ userDefault: false, func: (state) => {} })
              );

              dispatch(GetDepartmentDetail({}));
            }
          }
          func();
        }
      });
  };
};
// 编辑部门

const EditDepartment = ({
  ParentID,
  DepartmentName,
  DepartmentID,
  LeaderID,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditDepartment";
    let { DataState } = getState();
    if (ParentID === undefined) {
      ParentID = DataState.CommonData.EditDepartmentMsg.ParentID;
    }
    if (DepartmentName === undefined) {
      DepartmentName = DataState.CommonData.EditDepartmentMsg.DepartmentName;
    }
    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.EditDepartmentMsg.DepartmentID;
    }
    if (LeaderID === undefined) {
      LeaderID = DataState.CommonData.EditDepartmentMsg.LeaderID;
    }

    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        DepartmentID,
        ParentID,
        DepartmentName,
        LeaderID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            // if (
            //   DepartmentID === DataState.CommonData.MenuTreeData.selectedKeys[0]
            // ) {
            //   let initID =
            //     DataState.MainData.DepartmentDetailData.DepartmentMemberList[0]
            //       .DepartmentID;
            //   dispatch(SetSearchDepartmentKey(""));
            //   dispatch(SetSelectedDepartmentTreeKeys([initID]));

            //   dispatch(SetExpandedDepartmentTreeKeys([initID]));
            // }
            // dispatch(GetDepartment({ userDefault: false }));
            // dispatch(GetDepartmentDetail({}));
            dispatch(GetDepartment({ userDefault: false }));

            dispatch(GetDepartmentDetail({}));
          }
          func();
        }
      });
  };
};
// 设置部门主管

const SetLeader = ({
  DepartmentID,
  LeaderID,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/SetLeader";
    let { DataState } = getState();

    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.DepartmentDetailData.DepartmentID;
    }
    if (LeaderID === undefined) {
      LeaderID = DataState.CommonData.DepartmentMemberParams.CheckList[0];
    }
    console.log(DepartmentID, LeaderID);
    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        DepartmentID,

        LeaderID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            // dispatch(SetSearchDepartmentKey(""));

            dispatch(GetDepartment({ userDefault: false }));
            dispatch(GetDepartmentDetail({}));
          }
          func();
        }
      });
  };
};
// 删除部门人员

const DeleteUser = ({
  DepartmentID,
  UserIDs,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteUser";
    let { DataState } = getState();

    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.DepartmentDetailData.DepartmentID;
    }
    if (UserIDs === undefined) {
      UserIDs = DataState.CommonData.DepartmentMemberParams.CheckList.join();
    }

    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        DepartmentID,

        UserIDs,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            // dispatch(SetSearchDepartmentKey(""));

            dispatch(GetDepartment({ userDefault: false }));
            dispatch(GetDepartmentDetail({}));
          }
          func();
        }
      });
  };
};
// 新增人员
const AddUser = ({
  DepartmentID,
  Nodes,
  func = () => {},
  UseDefaultFunc = true,
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddUser";
    let { DataState } = getState();

    if (DepartmentID === undefined) {
      DepartmentID = DataState.CommonData.DepartmentDetailData.DepartmentID;
    }
    if (Nodes === undefined) {
      let NodeArr = [];
      let { UserKeyForSelect } = DataState.MainData.UserData;
      let { SelectUser, SelectUserForKey } = DataState.CommonData.UserData;
      SelectUser.map((child) => {
        NodeArr.push(
          SelectUserForKey[child].NodeType +
            "|" +
            SelectUserForKey[child].FullPathID
        );
      });
      Nodes = NodeArr.join();
    }

    postData(
      CONFIG.DePartmentProxy_univ + url,
      {
        DepartmentID,

        Nodes,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (UseDefaultFunc) {
            // dispatch(SetSearchDepartmentKey(""));

            dispatch(GetDepartment({ userDefault: false }));
            dispatch(GetDepartmentDetail({}));
          }
          func();
        }
      });
  };
};
export default {
  SetModalUserTypeArr,
  SET_MODAL_USERTYPE_ARR,
  
  getLoginUser,
  GET_LOGIN_USER_INFO,

  getDepartment,
  GetDepartment,
  MAIN_GET_DEPARTMENT_DATA,

  getUserData,
  GetUserData,
  MAIN_GET_USER_DATA,

  GetSearchUser,
  getSearchUser,
  MAIN_GET_SEARCH_USER_DATA,

  GetDepartmentDetail,
  getDepartmentDetail,
  MAIN_GET_DEPARTMENT_DETAIL,

  getSearchDepartment,
  GetSearchDepartment,
  MAIN_GET_SEARCH_DEPARTMENT,

  SET_SELECTED_DEPARTMENT_TREE_KEYS,
  SetSelectedDepartmentTreeKeys,

  SET_EXPANDED_DEPARTMENT_TREE_KEYS,
  SetExpandedDepartmentTreeKeys,

  SetSearchDepartmentKeyWord,
  SET_SEARCH_DEPARTMENT_KEYWORD,

  SetSearchDepartmentKey,
  SET_SEARCH_DEPARTMENT_KEY,

  MainSetHandleBoxVisible,
  MAIN_SET_HANDLE_BOX_VISIBLE,

  SetDepartmentDetailParams,
  SET_DEPARTMENT_DETAIL_PARAMS,

  InitDepartmentDetailParams,
  INIT_DEPARTMENT_DETAIL_PARAMS,

  SetDepartmentMemberDeleteParams,
  SET_DEPARTMENT_MEMBER_DELETE_PARAMS,

  InitDepartmentMemberModalData,
  INIT_DEPARTMENT_MEMBER_MODAL_DATA,

  SetSearchUserKey,
  SET_SEARCH_USER_KEY,

  SetSearchUserKeyWord,
  SET_SEARCH_USER_KEYWORD,

  SetSelectUser,
  SET_SELECT_USER,
  SetSelectUser_2,

  SetUserParams,
  SET_USER_PARAMS,

  SET_BREADCRUMB_POSITION,
  SetBreadcrumbPosition,

  InitBreadcrumbPosition,
  INIT_BREADCRUMB_POSITION,
  SetUserCheckList,
  SET_USER_CHECKLIST,

  SetDeleteDepartmentParams,
  SET_DELETE_DEPARTMENT_PARAMS,

  SetEditDepartmentParams,
  SET_EDIT_DEPARTMENT_PARAMS,

  getEditDepartmentDetail,
  GetEditDepartmentDetail,

  SET_ADD_DEPARTMENT_PARAMS,
  SetAddDepartmentParams,
  checkAddDepartmentName,
  checkAddDepartmentNO,
  AddDepartmentcheckAll,

  checkEditDepartmentName,

  EditDepartmentcheckAll,
  AddDepartment,
  DeleteDepartment,
  EditDepartment,
  AddUser,
  DeleteUser,
  SetLeader,
};
