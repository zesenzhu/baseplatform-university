///操作名称
const APP_LOADING_CLOSE = "APP_LOADING_CLOSE";
const APP_LOADING_OPEN = "APP_LOADING_OPEN";
const MODAL_LOADING_CLOSE = "MODAL_LOADING_CLOSE";
const MODAL_LOADING_OPEN = "MODAL_LOADING_OPEN";
const TABLE_LOADING_CLOSE = "TABLE_LOADING_CLOSE";
const TABLE_LOADING_OPEN = "TABLE_LOADING_OPEN";
const LEFT_LOADING_CLOSE = "LEFT_LOADING_CLOSE";
const LEFT_LOADING_OPEN = "LEFT_LOADING_OPEN";
const SEARCH_LOADING_OPEN = "SEARCH_LOADING_OPEN";
const SEARCH_LOADING_CLOSE = "SEARCH_LOADING_CLOSE";
const MODAL_USER_DATA_LOADING_OPEN = "MODAL_USER_DATA_LOADING_OPEN";
const MODAL_USER_DATA_LOADING_CLOSE = "MODAL_USER_DATA_LOADING_CLOSE";
const USER_LOADING_OPEN = "USER_LOADING_OPEN";
const USER_LOADING_CLOSE = "USER_LOADING_CLOSE";
const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
const CLOSE_ERROR_ALERT = "CLOSE_ERROR_ALERT";
const SHOW_WARN_ALERT = "SHOW_WARN_ALERT";
const CLOSE_WARN_ALERT = "CLOSE_WARN_ALERT";
const SHOW_QUERY_ALERT = "SHOW_QUERY_ALERT";
const CLOSE_QUERY_ALERT = "CLOSE_QUERY_ALERT";
//查看教学班
const TEACHING_SOLUTION_DETAILS_MODAL_OPEN =
  "TEACHING_SOLUTION_DETAILS_MODAL_OPEN";
const TEACHING_SOLUTION_DETAILS_MODAL_CLOSE =
  "TEACHING_SOLUTION_DETAILS_MODAL_CLOSE";

//重命名
const RESET_NAME_MODAL_OPEN = "RESET_NAME_MODAL_OPEN";
const RESET_NAME_MODAL_CLOSE = "RESET_NAME_MODAL_CLOSE";
//添加
const ADD_MODAL_OPEN = "ADD_MODAL_OPEN";
const ADD_MODAL_CLOSE = "ADD_MODAL_CLOSE";
//编辑
const EDIT_MODAL_OPEN = "EDIT_MODAL_OPEN";
const EDIT_MODAL_CLOSE = "EDIT_MODAL_CLOSE";
//添加组织
const ADD_DEPARTMENT_MODAL_OPEN = "ADD_DEPARTMENT_MODAL_OPEN";
const ADD_DEPARTMENT_MODAL_CLOSE = "ADD_DEPARTMENT_MODAL_CLOSE";
//编辑组织
const EDIT_DEPARTMENT_MODAL_OPEN = "EDIT_DEPARTMENT_MODAL_OPEN";
const EDIT_DEPARTMENT_MODAL_CLOSE = "EDIT_DEPARTMENT_MODAL_CLOSE";
// 提示
const APP_TIPS_VISIBLE = "APP_TIPS_VISIBLE";
// 设置提示
const SET_APP_TIPS = "SET_APP_TIPS";
// 提示全部关闭
const APP_TIPS_ALL_CLOSE = "APP_TIPS_ALL_CLOSE";
//操作
const showErrorAlert = ({
  type = "btn-error",
  title = "",
  littleTitle = "",
  onOk,
  onCancel,
  onClose,
  onHide,
}) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_ALERT,
      msg: {
        type,
        title,
        littleTitle,
        onOk: onOk ? onOk : () => onAppAlertOK(dispatch),
        onCancel: onCancel ? onCancel : () => onAppAlertCancel(dispatch),
        onClose: onClose ? onClose : () => onAppAlertClose(dispatch),
        onHide: onHide ? onHide : () => onAlertWarnHide(dispatch),
      },
    });
  };
};

const hideErrorAlert = () => {
  return { type: CLOSE_ERROR_ALERT };
};
const showWarnAlert = (alertMsg) => {
  return { type: SHOW_WARN_ALERT, msg: alertMsg };
};

const hideWarnAlert = () => {
  return { type: CLOSE_WARN_ALERT };
};
const showQueryAlert = (alertMsg) => {
  return { type: SHOW_QUERY_ALERT, msg: alertMsg };
};

const hideQueryAlert = () => {
  return { type: CLOSE_QUERY_ALERT };
};
//查看
const TeachingSolutionDetailsModalOpen = () => {
  return { type: TEACHING_SOLUTION_DETAILS_MODAL_OPEN };
};
const TeachingSolutionDetailsModalClose = () => {
  return { type: TEACHING_SOLUTION_DETAILS_MODAL_CLOSE };
};

//loading
const ModalLoadingOpen = () => {
  return { type: MODAL_LOADING_OPEN };
};
const ModalLoadingClose = () => {
  return { type: MODAL_LOADING_CLOSE };
};
const ModalUserDataLoadingOpen = () => {
  return { type: MODAL_USER_DATA_LOADING_OPEN };
};
const ModalUserDataLoadingClose = () => {
  return { type: MODAL_USER_DATA_LOADING_CLOSE };
};

//loading
const TableLoadingOpen = () => {
  return { type: TABLE_LOADING_OPEN };
};
const TableLoadingClose = () => {
  return { type: TABLE_LOADING_CLOSE };
};
const LeftLoadingOpen = () => {
  return { type: LEFT_LOADING_OPEN };
};
const LeftLoadingClose = () => {
  return { type: LEFT_LOADING_CLOSE };
};
const SearchLoadingOpen = () => {
  return { type: SEARCH_LOADING_OPEN };
};
const SearchLoadingClose = () => {
  return { type: SEARCH_LOADING_CLOSE };
};
const UserLoadingOpen = () => {
  return { type: USER_LOADING_OPEN };
};
const UserLoadingClose = () => {
  return { type: USER_LOADING_CLOSE };
};
//重命名
const ResetNameModalOpen = () => {
  return { type: RESET_NAME_MODAL_OPEN };
};
const ResetNameModalClose = () => {
  return { type: RESET_NAME_MODAL_CLOSE };
};
//添加组织
const AddDepartmentModalOpen = () => {
  return { type: ADD_DEPARTMENT_MODAL_OPEN };
};
const AddDepartmentModalClose = () => {
  return { type: ADD_DEPARTMENT_MODAL_CLOSE };
};
//编辑组织
const EditDepartmentModalOpen = () => {
  return { type: EDIT_DEPARTMENT_MODAL_OPEN };
};
const EditDepartmentModalClose = () => {
  return { type: EDIT_DEPARTMENT_MODAL_CLOSE };
};
//提示
const AppTipsVisible = (data) => {
  return { type: APP_TIPS_VISIBLE, data: data };
};
//提示
const ADD_DEPARTMENT_TIPS_VISIBLE = 'ADD_DEPARTMENT_TIPS_VISIBLE'
const AddDepartmentTipsVisible = (data) => {
  return { type: ADD_DEPARTMENT_TIPS_VISIBLE, data: data };
};
const ADD_DEPARTMENT_TIPS_ALL_CLOSE = 'ADD_DEPARTMENT_TIPS_ALL_CLOSE'
const AddDepartmentTipsAllClose = () => {
  return { type: ADD_DEPARTMENT_TIPS_ALL_CLOSE,  };
};
const EDIT_DEPARTMENT_TIPS_VISIBLE = 'EDIT_DEPARTMENT_TIPS_VISIBLE'
const EditDepartmentTipsVisible = (data) => {
  return { type: EDIT_DEPARTMENT_TIPS_VISIBLE, data: data };
};
const EDIT_DEPARTMENT_TIPS_ALL_CLOSE = 'EDIT_DEPARTMENT_TIPS_ALL_CLOSE'
const EditDepartmentTipsAllClose = () => {
  return { type: EDIT_DEPARTMENT_TIPS_ALL_CLOSE,  };
};
//自动关闭
const onAlertWarnHide = (dispatch) => {
  dispatch(hideErrorAlert());
};
//提示弹窗
const onAppAlertOK = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertCancel = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertClose = (dispatch) => {
  dispatch(hideErrorAlert());
};
// 设置组织树操作块显示/隐藏
const SET_HANDLE_BOX_OPEN = "SET_HANDLE_BOX_OPEN";
const SetHandleBoxOpen = () => {
  return (dispatch) => {
    dispatch({ type: SET_HANDLE_BOX_OPEN });
  };
};
const SET_HANDLE_BOX_CLOSE = "SET_HANDLE_BOX_CLOSE";
const SetHandleBoxClose = () => {
  return (dispatch) => {
    dispatch({ type: SET_HANDLE_BOX_CLOSE });
  };
};
export default {
  SET_HANDLE_BOX_OPEN,
  SET_HANDLE_BOX_CLOSE,
  SetHandleBoxClose,
  SetHandleBoxOpen,
  onAlertWarnHide,
  onAppAlertOK,
  onAppAlertCancel,
  onAppAlertClose,
  APP_LOADING_CLOSE,
  APP_LOADING_OPEN,
  SHOW_ERROR_ALERT,
  CLOSE_ERROR_ALERT,
  SHOW_WARN_ALERT,
  CLOSE_WARN_ALERT,
  SHOW_QUERY_ALERT,
  CLOSE_QUERY_ALERT,

  showErrorAlert,
  hideErrorAlert,
  showWarnAlert,
  hideWarnAlert,
  showQueryAlert,
  hideQueryAlert,

  TEACHING_SOLUTION_DETAILS_MODAL_OPEN,
  TEACHING_SOLUTION_DETAILS_MODAL_CLOSE,
  TeachingSolutionDetailsModalOpen,
  TeachingSolutionDetailsModalClose,

  MODAL_LOADING_CLOSE,
  MODAL_LOADING_OPEN,
  ModalLoadingOpen,
  ModalLoadingClose,

  ResetNameModalOpen,
  ResetNameModalClose,
  RESET_NAME_MODAL_CLOSE,
  RESET_NAME_MODAL_OPEN,
  ADD_MODAL_OPEN,
  ADD_MODAL_CLOSE,
  EDIT_MODAL_OPEN,
  EDIT_MODAL_CLOSE,

  APP_TIPS_VISIBLE,
  AppTipsVisible,

  TABLE_LOADING_OPEN,
  TABLE_LOADING_CLOSE,
  TableLoadingOpen,
  TableLoadingClose,
  SET_APP_TIPS,
  APP_TIPS_ALL_CLOSE,

  LEFT_LOADING_CLOSE,
  LEFT_LOADING_OPEN,
  LeftLoadingOpen,
  LeftLoadingClose,

  ModalUserDataLoadingClose,
  ModalUserDataLoadingOpen,
  MODAL_USER_DATA_LOADING_OPEN,
  MODAL_USER_DATA_LOADING_CLOSE,

  SearchLoadingOpen,
  SearchLoadingClose,
  SEARCH_LOADING_OPEN,
  SEARCH_LOADING_CLOSE,

  USER_LOADING_CLOSE,
  USER_LOADING_OPEN,
  UserLoadingOpen,
  UserLoadingClose,
  EDIT_DEPARTMENT_MODAL_CLOSE,
  ADD_DEPARTMENT_MODAL_OPEN,
  ADD_DEPARTMENT_MODAL_CLOSE,
  EDIT_DEPARTMENT_MODAL_OPEN,
  AddDepartmentModalOpen,
  AddDepartmentModalClose,
  EditDepartmentModalOpen,
  EditDepartmentModalClose,


  AddDepartmentTipsVisible,
  AddDepartmentTipsAllClose,
  EditDepartmentTipsVisible,
  EditDepartmentTipsAllClose,


  ADD_DEPARTMENT_TIPS_VISIBLE,

  ADD_DEPARTMENT_TIPS_ALL_CLOSE,
  EDIT_DEPARTMENT_TIPS_VISIBLE,

  EDIT_DEPARTMENT_TIPS_ALL_CLOSE,



};
 