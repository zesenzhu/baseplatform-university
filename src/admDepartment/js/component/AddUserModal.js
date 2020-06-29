import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, Loading, Empty } from "../../../common";
import { Input, Select } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import { Scrollbars } from "react-custom-scrollbars";
import ClassCropperModal from "../../../common/js/CropperModal";
import Breadcrumb from "./Breadcrumb";
// import "../../scss/SchoolModal.scss";
import DefaultImg from "../../images/boom_school_logo.png";
const { UpDataState, UpUIState } = actions;
const { Option } = Select;

// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  // 搜索人员
  handleSearch = (value) => {
    const { dispatch } = this.props;
    console.log(value)
    dispatch(UpDataState.SetSearchUserKeyWord(value));
    dispatch(UpDataState.GetSearchUser({keyword:value}));

    // console.log(value);
  };
  // 选中人员
  handleChange = (value) => {
    const { dispatch, DataState } = this.props;
    console.log(value);
    let { UserData,UserDataForKeys } = DataState.MainData.SearchUserData;

    dispatch(UpDataState.SetSelectUser(value,()=>{
      dispatch(UpDataState.SetSearchUserKey([value]));

    }));

    // dispatch(UpDataState.SetExpandedDepartmentTreeKeys(ParentExpand));
    // dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };
  // 选中用户类型
  onUserTypeClick = (UserType) => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetUserParams({ UserType, Level: 1, FullParentID: [] })
    );
    dispatch(UpDataState.GetUserData({}));
  };
  // 面包屑点击选择
  onBreadcrumbClick = (value, id) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetBreadcrumbPosition({
        level: value,
        // userType:DataState,
      })
    );
    let DepartmentID = "";
    // let FullParentID = []
    if (value !== 1) {
      DepartmentID = id;
    }
    console.log(value, id);
    dispatch(UpDataState.SetUserParams({ Level: value }));
    dispatch(UpDataState.GetUserData({}));
  };
  // 多选
  onCheckBoxGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    let checkAll = false;
    console.log(e, DataState.CommonData.UserData.CheckList);
    dispatch(UpDataState.SetUserCheckList(e));
    // dispatch(
    //   UpDataState.SetSelectUser(e, DataState.CommonData.UserData.CheckList)
    // );
  };
  onCheckBoxChange =(e,key)=>{
    const { dispatch, DataState } = this.props;
    console.log(e,key)
dispatch(
  UpDataState.SetSelectUser_2(key,e.target.checked)
);
  }
  // 点击id/name
  onNodeNameClick = (level, title, id, userType) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetBreadcrumbPosition({
        level,
        title,
        id,
        userType,
      })
    );
    // 点击用户列表是直接加一层的，所以FullParentID可直接加上一层
    // let FullParentID = [];
    // FullParentID = DataState.CommonData.ModalBreadcrumbData[userType].slice(1);
    // console.log(FullParentID)
    dispatch(UpDataState.SetUserParams({ Level: level + 1 }));
    dispatch(UpDataState.GetUserData({}));
  };
  handleSelectUserForKey = (data) => {
    let SelectUserForKey = [];
    for (let index in data) {
      let child = data[index];
      SelectUserForKey.push(
        <div className="right-show-card" key={index}>
          <span className="show-card-box">
            <span
              style={{
                display: child.IsUser ? "inline-block" : "none",
              }}
              className="show-card-title show-card-user"
              title={child.UserTypeName +
                ":" +
                child.NodeName +
                "(" +
                child.NodeID +
                ")"}
            >
              {child.UserTypeName +
                ":" +
                child.NodeName +
                "(" +
                child.NodeID +
                ")"}
            </span>
            <span
              style={{
                display: !child.IsUser ? "inline-block" : "none",
              }}
              className="show-card-title show-card-department"
              title={child.NodeName+'全体学生'}
            >
              {child.NodeName}全体学生
            </span>
          </span>
          <span
            onClick={this.onDeleteUserClick.bind(this, child)}
            className="show-card-delete"
          >
            X
          </span>
        </div>
      );
    }
    return SelectUserForKey;
  };
  // 删除
  onDeleteUserClick = (data) => {
    let { CommonData } = this.props.DataState;
    let { SelectUser, SelectUserForKey } = CommonData.UserData;

    let CheckList = [];
    SelectUser.map((child) => {
      if (child !== data.NodeIDAndUserType) {
        CheckList.push(child);
      }
    });
    this.props.dispatch(UpDataState.SetSelectUser_2(data.NodeIDAndUserType, false));
  };
  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, MainData, LoginUser } = DataState;
    let {
      DepartmentID,
      UserType,
      Level,
      FullParentID,
      ProductUseRange,
      SelectUser,
      SelectUserForKey,
    } = CommonData.UserData;
    let { UserData } = MainData.SearchUserData;
    let { UserList, UserKeyForSelect } = MainData.UserData;
    let { SearchUserKey, KeyWord } = CommonData.SearchUserData;
    let ModalUserTypeArr = [];
    // if (LoginUser.UserType !== "0" && LoginUser.UserType !== "6") {
    //   ModalUserTypeArr = CommonData.ModalUserTypeArr.slice().pop();
    // } else {
      ModalUserTypeArr = CommonData.ModalUserTypeArr;
    // }
    // console.log(SelectUserForKey,UserData);
    return (
      <div className="AddUserModal" id="AddUserModal">
        <div className="AddUserModal-left">
          <div className="left-select-box">
            <Select
              showSearch
              value={SearchUserKey}
              placeholder={"输入关键字搜索..."}
              className="left-select-input"
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              maxTagTextLength={20}
              getPopupContainer={(e) => e.parentNode}

              onSearch={this.handleSearch}
              onChange={this.handleChange}
              // onBlur={this.handleBlur}
              notFoundContent={null}
            >
              {UserData.map((child) => {
                // console.log(child)

                return (
                  <Option key={child.NodeIDAndUserType}>
                    {child.title}({child.value})
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="left-select-userType-box">
            {ModalUserTypeArr instanceof Array &&
              ModalUserTypeArr.map((child) => {
                // if (!LoginUser.CollegeID) {
                //   if (child.UserType === 7) {
                //     return "";
                //   }
                // } else if (child.UserType === 10) {
                //   return "";
                // }
                return (
                  <div
                    key={child.UserType}
                    title={child.UserTypeName}
                    className={`left-select-userType ${
                      child.UserType === UserType
                        ? "left-select-userType-select"
                        : ""
                    }`}
                    onClick={this.onUserTypeClick.bind(this, child.UserType)}
                  >
                    {child.UserTypeName}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="AddUserModal-center">
          <Loading opacity={false} spinning={UIState.AppLoading.UserLoading}>
            <div className="center-user-data-box">
              <div className="center-Breadcrumb ">
                <Breadcrumb
                  onBreadcrumbClick={this.onBreadcrumbClick}
                  options={CommonData.ModalBreadcrumbData[UserType]}
                ></Breadcrumb>
              </div>
              <div className="center-user-data">
                <CheckBoxGroup
                  value={SelectUser}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
                >
                  <Scrollbars style={{ width: 100 + "%", height: 363 + "px" }}>
                    {UserList instanceof Array && UserList.length > 0 ? (
                      UserList.map((child) => {
                        let NoClick = false;

                        SelectUser.map(NodeIDAndUserType=>{
                          if(NodeIDAndUserType===child.NodeIDAndUserType){
                             NoClick = true;
                          }
                        })
                        return (
                          <div
                            key={child.NodeIDAndUserType}
                            className="user-data-card"
                          >
                            <CheckBox
                              className="user-data-card-check"
                              value={child.NodeIDAndUserType}
                              // type={"gray"}
                              onChange={(e)=>this.onCheckBoxChange(e,child.NodeIDAndUserType)}
                            ></CheckBox>
                            <i
                              className="user-data-card-PhotoPath"
                              style={{
                                backgroundImage: `url(${child.PhotoPath})`,
                                backgroundSize: "40px",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                display: child.IsUser ? "inline-block" : "none",
                              }}
                            ></i>
                            <span
                              className={`user-data-card-msg ${
                                child.IsUser||NoClick
                                  ? ""
                                  : "user-data-card-msg-department"
                              }`}
                              onClick={() => {
                                if (child.IsUser||NoClick) {
                                  return;
                                }
                                this.onNodeNameClick(
                                  child.Level,
                                  child.NodeName,
                                  child.NodeID,
                                  child.UserType
                                );
                              }}
                              style={{ left: child.IsUser ? "120px" : "40px" }}
                            >
                              <span
                                title={child.NodeName ? child.NodeName : "--"}
                                className="user-data-card-name"
                              >
                                {child.NodeName ? child.NodeName : "--"}
                              </span>
                              <span
                                style={{
                                  display: child.IsUser
                                    ? "inline-block"
                                    : "none",
                                }}
                                title={child.NodeID ? child.NodeID : "--"}
                                className="user-data-card-ID"
                              >
                                ({child.NodeID ? child.NodeID : "--"})
                              </span>
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <Empty
                        type="4"
                        className="Empty"
                        title={
                          // UserSearchKeyWord !== ""
                          //   ? "暂无符合条件的部门成员"
                          //   :
                          "暂无符合条件的成员"
                        }
                      ></Empty>
                    )}
                  </Scrollbars>
                </CheckBoxGroup>
              </div>
            </div>
          </Loading>
        </div>
        <div className="AddUserModal-right">
          <Scrollbars style={{ width: 100 + "%", height: 400 + "px" }}>
            {this.handleSelectUserForKey(SelectUserForKey).length > 0 ? (
              this.handleSelectUserForKey(SelectUserForKey)
            ) : (
              <Empty
                type="4"
                className="Empty"
                title={
                  // UserSearchKeyWord !== ""
                  //   ? "暂无符合条件的部门成员"
                  //   :
                  "暂无成员"
                }
              ></Empty>
            )}
          </Scrollbars>
        </div>
      </div>
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
export default connect(mapStateToProps)(AddUserModal);
