import React from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  Loading,
  Empty,
  DropDown,
} from "../../../common";
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
class EditDepartmentModal extends React.Component {
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

  // 编号change
  onDepartmentNameChange = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    console.log(e.target.value);
    dispatch(
      UpDataState.SetEditDepartmentParams({
        DepartmentName: e.target.value,
      })
    );
    dispatch(UpDataState.checkEditDepartmentName());
  };
  // 编号Blur
  onDepartmentNameBlur = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    dispatch(
      UpDataState.SetEditDepartmentParams({
        DepartmentName: e.target.value,
      })
    );
  };
  // 上级部门change
  onParentChange = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    dispatch(
      UpDataState.SetEditDepartmentParams({
        ParentID: e.value,
      })
    );
  };
  // 部门主管
  onLeaderChange = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    dispatch(
      UpDataState.SetEditDepartmentParams({
        LeaderID: e[0],
      })
    );
  };
  // select 值Change
  handleChange = (value, option) => {
    console.log(value, option);
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    let LeaderID = "";
    if (value.length > 0) {
      LeaderID = value[value.length - 1];
    }
    dispatch(
      UpDataState.SetEditDepartmentParams({
        LeaderID,
      })
    );
  };
  handleSearch =(value,option)=>{
    console.log(value, option);

  }
  filterOption = (value,option)=>{
    console.log(value, option);

  }
  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, MainData, LoginUser } = DataState;
    const { AppTipsVisible, AppTips } = UIState;
    let {
      DepartmentNameTipsVisible,
      DepartmentNOTipsVisible,
    } = AppTipsVisible.EditDepartment;
    let { DepartmentNameTips, DepartmentNOTips } = AppTips;
    let { DepartMentList, DepartMentTreeForKey } = MainData.DepartmentData;
    let {
      ParentID,
      DepartmentName,
      DepartmentNO,
      DepartmentID,
      LeaderID,
      UserData,
      UserDataForKeys,
    } = CommonData.EditDepartmentMsg;
    if (
      !DepartmentID ||
      !ParentID ||
      (Object.keys(UserDataForKeys) === 0 && !UserDataForKeys[ParentID])
    ) {
      return <div></div>;
    }
    console.log(DepartMentTreeForKey, ParentID, DepartMentTreeForKey[ParentID]);
    let Parent = {
      title: DepartMentTreeForKey[ParentID].DepartmentName,
      value: DepartMentTreeForKey[ParentID].DepartmentID,
    };
    DepartmentNO = DepartMentTreeForKey[DepartmentID].DepartmentNO;
    return (
      <div className="EditDepartmentModal" id="EditDepartmentModal">
        <div className="row clearfix">
          <span className="culonm-1 left">部门编号:</span>
          <span className="culonm-2 right DepartmentNO">{DepartmentNO}</span>
        </div>

        <div className="row clearfix">
          <span className="culonm-1 left">部门名称:</span>
          <span className="culonm-2 right DepartmentName">
            <Tips
              overlayClassName="tips"
              getPopupContainer={(e) => e.parentNode}
              visible={DepartmentNameTipsVisible}
              title={DepartmentNameTips}
            >
              <Input
                className="culonm-input"
                placeholder="请输入部门名称..."
                maxLength={20}
                onChange={this.onDepartmentNameChange.bind(this)}
                onBlur={this.onDepartmentNameBlur.bind(this)}
                value={DepartmentName}
              ></Input>
            </Tips>
          </span>
        </div>
        <div className="row clearfix">
          <span className="culonm-1 left">上级部门:</span>
          <span className="culonm-2 right Parent">
            <DropDown
              style={{ zIndex: 2 }}
              dropSelectd={Parent}
              dropList={DepartMentList}
              width={200}
              height={96}
              onChange={this.onParentChange}
            ></DropDown>
          </span>
        </div>
        <div className="row clearfix">
          <span className="culonm-1 left">部门主管:</span>
          <span className="culonm-2 right Leader">
            {/* <DropDown
              style={{ zIndex: 1 }}
              dropSelectd={
                UserDataForKeys[Leader]
              }
              dropList={
                UserData
              }
              width={200}
              height={96}
              onChange={this.onLeaderChange}
            ></DropDown> */}
            <Select
              mode={"multiple"}
              // showSearch
              style={{ zIndex: 1, width: "200px" }}
              value={LeaderID ? [LeaderID] : []}
              placeholder={"请输入关键字"}
              className="search-select-input"
              defaultActiveFirstOption={false}
              getPopupContainer={(e) => e.parentNode}
              showArrow={false}
              onChange={this.handleChange}
              onSearch={this.handleSearch}
              notFoundContent={null}
            >
              {UserData.map((child) => {
                return (
                  <Option key={child.value}>
                    {child.title}({child.value})
                  </Option>
                );
              })}
            </Select>
          </span>
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
export default connect(mapStateToProps)(EditDepartmentModal);
