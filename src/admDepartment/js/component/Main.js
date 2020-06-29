import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../containers/history";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Main.scss";
import AddUserModal from "./AddUserModal";
import EditDepartmentModal from "./EditDepartmentModal";
import AddDepartmentModal from "./AddDepartmentModal";
import UserCard from "./UserCard";

import ImgDefault from "../../images/icon-common.png";
import { Table } from "antd";
const { UpDataState, UpUIState } = actions;
class Main extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }

  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }

  // 添加弹窗成功-关闭
  AddModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch(
      UpDataState.AddUser({
        func: () => {
          dispatch({ type: UpUIState.ADD_MODAL_CLOSE });
          this.ModalDataInit();
          dispatch(actions.UpDataState.GetDepartmentDetail({}));
        },
      })
    );
  };
  // 窗口数据初始化
  ModalDataInit = () => {
    const { dispatch, DataState, UIState } = this.props;

    // dispatch({ type: UpUIState.APP_TIPS_ALL_CLOSE });
    dispatch(UpDataState.InitDepartmentMemberModalData({}));
  };
  // 添加弹窗关闭
  AddModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: UpUIState.ADD_MODAL_CLOSE });
    this.ModalDataInit();
  };

  // 编辑弹窗成功-关闭
  EditModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    dispatch(
      UpDataState.checkAllData(() => {
        dispatch(
          UpDataState.EditSchoolInfo(() => {
            dispatch({ type: UpUIState.EDIT_MODAL_CLOSE });
            this.ModalDataInit();
            dispatch(actions.UpDataState.GetDepartmentDetail({}));
          })
        );
      })
    );
  };

  // 编辑弹窗关闭
  EditModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: UpUIState.EDIT_MODAL_CLOSE });
    this.ModalDataInit();
  };

  // 复选
  onCheckBoxClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  // 学校状态选择
  onStatusDropMenuChange = (e) => {
    const { dispatch } = this.props;
    dispatch(UpDataState.SetSchoolStatusData(e));
  };
  // 当laoding时阻止二次点击
  preventDoubleClick = () => {
    let { dispatch, UIState } = this.props;
    if (UIState.AppLoading.TableLoading) {
      return true;
    } else {
      return false;
    }
  };
  // 多选
  onCheckBoxGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    let checkAll = false;
    if (e.length === DataState.MainData.DepartmentDetailData.KeyList.length) {
      checkAll = true;
    }
    dispatch(
      UpDataState.SetDepartmentMemberDeleteParams({
        CheckList: e,
        CheckAll: checkAll,
      })
    );
  };
  // 多选
  onCheckAllClick = (e) => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetDepartmentMemberDeleteParams({
        CheckList: e.target.checked
          ? DataState.MainData.DepartmentDetailData.KeyList
          : [],
        CheckAll: e.target.checked,
      })
    );
  };
  //  批量删除
  onDeleteAllClick = () => {
    const { dispatch, DataState } = this.props;

    dispatch(
      actions.UpUIState.showErrorAlert({
        title: "确定移除所选择的成员吗？",
        type: "btn-warn",
        onOk: () => {
          dispatch(
            UpDataState.DeleteUser({
              func: () => {
                dispatch(
                  UpDataState.SetDepartmentMemberDeleteParams({
                    CheckList: [],
                    checkAll: false,
                  })
                );
                this.onAppAlertClose();
              },
            })
          );
        },
      })
    );
  };

  //  搜索
  onUserSearch = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetDepartmentDetailParams({
        PageIndex: 0,
      })
    );
    // dispatch(
    //   UpDataState.SetDepartmentMemberDeleteParams({
    //     CheckList: [],
    //     CheckAll: false,
    //   })
    // );
    dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };
  onChangeSearch = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetDepartmentDetailParams({
        searchValue: e.target.value,
        KeyWord: e.target.value,
        CancelBtnShow: "y",
      })
    );
  };
  onCancelSearch = () => {
    const { dispatch, DataState } = this.props;
    // dispatch(
    //   UpDataState.SetDepartmentMemberDeleteParams({
    //     CheckList: [],
    //     CheckAll: false,
    //   })
    // );
    dispatch(UpDataState.InitDepartmentDetailParams());
    dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;
    // dispatch(
    //   UpDataState.SetDepartmentMemberDeleteParams({
    //     CheckList: [],
    //     CheckAll: false,
    //   })
    // );
    dispatch(
      UpDataState.SetDepartmentDetailParams({
        PageIndex: e - 1,
      })
    );
    dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };
  // 添加人员
  onAddUserClick = () => {
    const { dispatch, DataState } = this.props;

    dispatch(UpDataState.InitDepartmentMemberModalData({}));
    dispatch(UpDataState.GetUserData({}));
    dispatch({ type: UpUIState.ADD_MODAL_OPEN });
  };

  //  设置主管
  onSetLeaderClick = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: "确定设置所选成员为主管吗？",
        type: "btn-warn",
        onOk: () => {
          dispatch(
            UpDataState.SetLeader({
              func: () => {
                dispatch(
                  UpDataState.SetDepartmentMemberDeleteParams({
                    CheckList: [],
                    CheckAll: false,
                  })
                );
                this.onAppAlertClose();
              },
            })
          );
        },
      })
    );
  };
  //  获取用户详情
  onMsgClick = (userID) => {
    const { dispatch, DataState } = this.props;
  };
  // 添加组织成功
  AddDepartmentModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.AddDepartmentcheckAll({
        success: () => {
          dispatch(
            UpDataState.AddDepartment({
              func: () => {
                dispatch(UpUIState.AddDepartmentTipsAllClose());

                dispatch(
                  UpDataState.SetAddDepartmentParams({
                    // ParentID: "",
                    DepartmentName: "",
                    DepartmentNO: "",
                  })
                );
                dispatch(UpUIState.AddDepartmentModalClose());
              },
            })
          );
        },
      })
    );
  };
  // 添加组织-取消
  AddDepartmentModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(UpUIState.AddDepartmentTipsAllClose());

    dispatch(
      UpDataState.SetAddDepartmentParams({
        // ParentID: "",
        DepartmentName: "",
        DepartmentNO: "",
      })
    );

    dispatch(UpUIState.AddDepartmentModalClose());
  };
  // 编辑组织成功
  EditDepartmentModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.EditDepartmentcheckAll({
        success: () => {
          dispatch(
            UpDataState.EditDepartment({
              func: () => {
                dispatch(UpUIState.EditDepartmentTipsAllClose());

                dispatch(
                  UpDataState.SetEditDepartmentParams({
                    ParentID: "",
                    InitParentID: "",
                    DepartmentName: "",
                    DepartmentNO: "",
                    Leader: "",
                    InitLeader: "",
                    InitDepartmentName: "",
                    DepartmentID: "",
                    UserData: [],
                    UserDataForKeys: {},
                  })
                );
                dispatch(UpUIState.EditDepartmentModalClose());
              },
            })
          );
        },
      })
    );
  };
  // 编辑组织-取消
  EditDepartmentModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(UpUIState.EditDepartmentTipsAllClose());

    dispatch(
      UpDataState.SetEditDepartmentParams({
        ParentID: "",
        InitParentID: "",
        DepartmentName: "",
        DepartmentNO: "",
        Leader: "",
        InitLeader: "",
        InitDepartmentName: "",
        DepartmentID: "",
        UserData: [],
        UserDataForKeys: {},
      })
    );
    dispatch(UpUIState.EditDepartmentModalClose());
  };
  // 
  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, MainData, LoginUser } = DataState;
    let { DepartmentDetailData } = MainData;
    let {
      SearchUserData,
      DepartmentDetailData: Common_DepartmentDetailData,
      DepartmentMemberParams,
    } = CommonData;
    let {
      DepartmentData: {
        Total,
        PageIndex,
        DepartmentID,
        DepartmentName,
        DepartmentNO,
        LeaderID,
        LeaderName,
        PhotoPath,
        Readonly,
      },
      DepartmentMemberList,
      KeyList,
    } = DepartmentDetailData;
    let {
      KeyWord: UserSearchKeyWord,
      PageSize,
      CancelBtnShow,
      searchValue,
    } = Common_DepartmentDetailData;
    // console.log(DepartmentMemberParams.CheckList.length)
    return (
      <Loading
        opacity={false}
        tip="加载中..."
        // size="large"
        spinning={UIState.AppLoading.TableLoading}
      >
        <div id="Main" className="Main">
          <div className="Main-top">
            <div className="Main-top-left">
              <span
                title={DepartmentName ? DepartmentName : "--"}
                className="top-name"
              >
                {DepartmentName ? DepartmentName : "--"}
              </span>
              <div className="top-msg-box">
                <span
                  title={DepartmentNO ? DepartmentNO : "--"}
                  className="top-msg "
                >
                  <span className="top-msg-tips">部门编号：</span>
                  <span style={{ display: "inline-block",overflow:'hidden' }}>
                    {DepartmentNO ? DepartmentNO : "--"}
                  </span>
                </span>
                <span
                  title={
                    LeaderName && LeaderID
                      ? (LeaderName ? LeaderName : "--") +
                        (LeaderID ? LeaderID : "--")
                      : "--"
                  }
                  className="top-msg top-msg-2"
                >
                  <span className="top-msg-tips">部门主管：</span>
                  <span
                    style={{ display: "inline-block", maxWidth: "30%" }}
                    className="text-overflow"
                  >
                    {LeaderName ? LeaderName : "--"}
                  </span>
                  <span className='top-msg-overflow'>(</span>
                  <span
                    style={{
                      display: LeaderID ? "inline-block" : "none",
                      maxWidth: "30%",
                    }}
                    className="text-overflow top-msg-tips-blod"
                  >
                    {LeaderID ? LeaderID : "--"}
                  </span>
                  <span className='top-msg-overflow'>)</span>
                  
                </span>
              </div>
            </div>
            {/* <div
            // onClick={this.onAddSchoolClick.bind(this)}
            className=" top-right btn-box"
          > */}
            <Button
              color="blue"
              onClick={this.onAddSchoolClick}
              className="top-right btn-box check-btn"
            >
              <i className="btn-icon-add"></i>
              <span className="btn-title">导入组织结构信息</span>
            </Button>
            {/* </div> */}
          </div>
          <div className="Main-hr"></div>
          <div className="Main-content">
            <div className="content-top-box">
              <div className="top-btn-box">
                <Button
                  color="blue"
                  onClick={this.onAddUserClick}
                  className="check-btn"
                >
                  添加人员
                </Button>
                <Button
                  color="blue"
                  disabled={
                    DepartmentMemberParams.CheckList.length === 1 ? false : true
                  }
                  onClick={this.onSetLeaderClick}
                  className="check-btn"
                >
                  设置主管
                </Button>
                <Button
                  color="blue"
                  disabled={
                    DepartmentMemberParams.CheckList.length >= 1 ? false : true
                  }
                  onClick={this.onDeleteAllClick}
                  className="check-btn"
                >
                  人员移除
                </Button>
              </div>
              <div className="top-search-box">
                <Search
                  placeHolder="请输入学号或工号进行搜索..."
                  onClickSearch={this.onUserSearch.bind(this)}
                  height={30}
                  width={270}
                  className="search"
                  Value={searchValue}
                  onCancelSearch={this.onCancelSearch}
                  onChange={this.onChangeSearch.bind(this)}
                  CancelBtnShow={CancelBtnShow}
                ></Search>
              </div>
            </div>
            <div className="content-msg-box">
              <div className="msg-member-amount-box">
                <span className="member-amount">
                  部门成员(
                  <span className="member-amount-red">{Total ? Total : 0}</span>
                  人)
                </span>
                <span className='checkAll-box'>
                  全选<CheckBox onChange={this.onCheckAllClick} checked={DepartmentMemberParams.CheckAll}></CheckBox>
                </span>
              </div>
              <div className="content-card-box">
                {DepartmentMemberList instanceof Array &&
                DepartmentMemberList.length > 0 ? (
                  <CheckBoxGroup
                    value={DepartmentMemberParams.CheckList}
                    onChange={this.onCheckBoxGroupChange.bind(this)}
                  >
                    {DepartmentMemberList.map((child, index) => {
                      return (
                        <UserCard
                          key={index}
                          className="User-Card"
                          onMsgClick={this.onMsgClick}
                          params={child}
                        ></UserCard>
                      );
                    })}
                  </CheckBoxGroup>
                ) : (
                  <Empty
                    type="4"
                    className="Empty"
                    title={
                      UserSearchKeyWord !== ""
                        ? "暂无符合条件的部门成员"
                        : "暂无部门成员"
                    }
                  ></Empty>
                )}
              </div>
              <div className="Main-event-box">
                <PagiNation
                  className="pagination"
                  showQuickJumper
                  current={PageIndex + 1}
                  hideOnSinglepage={true}
                  pageSize={PageSize}
                  total={Total}
                  onChange={this.onPagiNationChange.bind(this)}
                ></PagiNation>
              </div>
            </div>
          </div>

          {/* 模态框 */}
          <Modal
            ref="AddUserMadal"
            bodyStyle={{ padding: 0, height: "400px" }}
            type="1"
            title={"添加人员"}
            width={960}
            visible={UIState.AppModal.AddModal}
            destroyOnClose={true}
            onOk={this.AddModalOk}
            onCancel={this.AddModalCancel}
          >
            {/* <Loading spinning={UIState.AppLoading.modalLoading}> */}
            {UIState.AppModal.AddModal ? (
              <AddUserModal type="add"></AddUserModal>
            ) : (
              ""
            )}
            {/* </Loading> */}
          </Modal>
          <Modal
            ref="AddDepartmentMadal"
            bodyStyle={{ padding: 0, height: "170px" }}
            type="1"
            title={"添加组织"}
            width={400}
            destroyOnClose={true}
            visible={UIState.AppModal.AddDepartmentModal}
            onOk={this.AddDepartmentModalOk}
            onCancel={this.AddDepartmentModalCancel}
          >
            {/* <Loading spinning={UIState.AppLoading.modalLoading}> */}
            {UIState.AppModal.AddDepartmentModal ? (
              <AddDepartmentModal type="edit"></AddDepartmentModal>
            ) : (
              ""
            )}
            {/* </Loading> */}
          </Modal>
          <Modal
            ref="EditDepartmentMadal"
            bodyStyle={{ padding: 0, height: "220px" }}
            type="1"
            title={"编辑组织"}
            width={400}
            destroyOnClose={true}
            visible={UIState.AppModal.EditDepartmentModal}
            onOk={this.EditDepartmentModalOk}
            onCancel={this.EditDepartmentModalCancel}
          >
            {/* <Loading spinning={UIState.AppLoading.modalLoading}> */}
            {UIState.AppModal.EditDepartmentModal ? (
              <EditDepartmentModal type="edit"></EditDepartmentModal>
            ) : (
              ""
            )}
            {/* </Loading> */}
          </Modal>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(Main);
