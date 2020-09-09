///操作名称
const COMMON_SET_FRAME_PARAMS = "COMMON_SET_FRAME_PARAMS";

// 设置Frame 的数据
const SetFrameParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_FRAME_PARAMS, data: data });
  };
};
///操作名称
const COMMON_SET_BANNER_PARAMS = "COMMON_SET_BANNER_PARAMS";

// 设置Frame 的数据
const SetBannerParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_BANNER_PARAMS, data: data });
  };
};
// 设置Frame 的数据
const COMMON_SET_ROUTE_PARAMS = "COMMON_SET_ROUTE_PARAMS";
const SetRouteParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_ROUTE_PARAMS, data: data });
  };
};
// 设置版本或角色权限 的数据
const COMMON_SET_ROLE_POWER_PARAMS = "COMMON_SET_ROLE_POWER_PARAMS";
const SetRolePowerParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_ROLE_POWER_PARAMS, data: data });
  };
};
// 设置学生参数
const COMMON_SET_STUDENT_PARAMS = "COMMON_SET_STUDENT_PARAMS";
const SetStudentParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_STUDENT_PARAMS, data: data });
  };
};
// 设置Modal参数
const COMMON_SET_MODAL_VISIBLE = "COMMON_SET_MODAL_VISIBLE";
const SetModalVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_MODAL_VISIBLE, data: data });
  };
};
// 设置用户档案的公共参数
const COMMON_SET_USER_ARCHIVES_PARAMS  = "COMMON_SET_USER_ARCHIVES_PARAMS";
const SetUserArchivesParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_USER_ARCHIVES_PARAMS, data: data });
  };
};
// 设置教师参数
const COMMON_SET_TEACHER_PARAMS = "COMMON_SET_TEACHER_PARAMS";
const SetTeacherParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TEACHER_PARAMS, data: data });
  };
};
// 设置领导参数
const COMMON_SET_LEADER_PARAMS = "COMMON_SET_LEADER_PARAMS";
const SetLeaderParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_LEADER_PARAMS, data: data });
  };
};
// 设置编辑添加用户的数据
const COMMON_SET_EDIT_USER_ARCHIVES_PARAMS  = "COMMON_SET_EDIT_USER_ARCHIVES_PARAMS";
const SetEditUserArchivesData = (data) => {
  return (dispatch,getState) => {
    let {DataState:{
      CommonData:{
        EditUserArchivesData
      }
    }} = getState()
    let Data = {...EditUserArchivesData,...data}
    if(!data){
      Data ={}
    } 
    dispatch({ type: COMMON_SET_EDIT_USER_ARCHIVES_PARAMS, data: Data });
  };
};
export default {
  COMMON_SET_EDIT_USER_ARCHIVES_PARAMS,
  SetEditUserArchivesData,

  COMMON_SET_LEADER_PARAMS,
  SetLeaderParams,

  COMMON_SET_TEACHER_PARAMS,
  SetTeacherParams,

  COMMON_SET_USER_ARCHIVES_PARAMS,
  SetUserArchivesParams,
  
  COMMON_SET_MODAL_VISIBLE,
  SetModalVisible,

  COMMON_SET_STUDENT_PARAMS,
  SetStudentParams,
  
  SetRolePowerParams,
  COMMON_SET_ROLE_POWER_PARAMS,

  COMMON_SET_ROUTE_PARAMS,
  SetRouteParams,

  COMMON_SET_BANNER_PARAMS,
  SetBannerParams,

  COMMON_SET_FRAME_PARAMS,
  SetFrameParams,
};
