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
class AddDepartmentModal extends React.Component {
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
  onDepartmentNOChange = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    console.log(e.target.value);
    dispatch(
      UpDataState.SetAddDepartmentParams({
        DepartmentNO: e.target.value,
      })
    );
  };
  // 编号Blur
  onDepartmentNOBlur = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    dispatch(
      UpDataState.SetAddDepartmentParams({
        DepartmentNO: e.target.value,
      })
    );
    dispatch(UpDataState.checkAddDepartmentNO());
  };
  // 编号change
  onDepartmentNameChange = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    console.log(e.target.value);
    dispatch(
      UpDataState.SetAddDepartmentParams({
        DepartmentName: e.target.value,
      })
    );
  };
  // 编号Blur
  onDepartmentNameBlur = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e.target.value);
    dispatch(UpDataState.checkAddDepartmentName());

    dispatch(
      UpDataState.SetAddDepartmentParams({
        DepartmentName: e.target.value,
      })
    );
  };
  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, MainData, LoginUser } = DataState;
    const { AppTipsVisible, AppTips } = UIState;
    let {
      DepartmentNameTipsVisible,
      DepartmentNOTipsVisible,
    } = AppTipsVisible.AddDepartment;
    let { DepartmentNameTips, DepartmentNOTips } = AppTips;
    let { DepartMentTreeForKey } = MainData.DepartmentData;
    let {
      ParentID,
      DepartmentName,
      DepartmentNO,
    } = CommonData.AddDepartmentMsg;
    let ParentName = DepartMentTreeForKey[ParentID]
      ? DepartMentTreeForKey[ParentID].DepartmentName
      : "";
    let ParentNO = DepartMentTreeForKey[ParentID]
      ? DepartMentTreeForKey[ParentID].DepartmentNO
      : "";
    return (
      <div className="AddDepartmentModal" id="AddDepartmentModal">
        <div className="row clearfix">
          <span className="culonm-1 left">上级部门:</span>
          <span className="culonm-2 right ParentMsg">
            <span className="ParentMsg-ParentName">{ParentName}</span>
            <span className="ParentMsg-ParentNO">({ParentNO})</span>
          </span>
        </div>
        <div className="row clearfix">
          <span className="culonm-1 left">部门编号:</span>
          <span className="culonm-2 right DepartmentNO">
            <Tips
              overlayClassName="tips"
              visible={DepartmentNOTipsVisible}
              getPopupContainer={(e) => e.parentNode}
              title={DepartmentNOTips}
            >
              <Input
                className="culonm-input"
                placeholder="请输入部门编号..."
                maxLength={20}
                onChange={this.onDepartmentNOChange.bind(this)}
                onBlur={this.onDepartmentNOBlur.bind(this)}
                value={DepartmentNO}
              ></Input>
            </Tips>
          </span>
        </div>
        <div className="row clearfix">
          <span className="culonm-1 left">部门名称:</span>
          <span className="culonm-2 right DepartmentName">
            <Tips
              overlayClassName="tips"
              visible={DepartmentNameTipsVisible}
              getPopupContainer={(e) => e.parentNode}
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
export default connect(mapStateToProps)(AddDepartmentModal);
