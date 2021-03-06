import React, { Component } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import {
  Modal,
  Loading,
  Search,
  PagiNation,
  CheckBox,
  Empty,
  CheckBoxGroup,
  Table,
  Button,
  Tips,
} from "../../../../common";
import { Input, Tooltip } from "antd";
import DataChange from "../../action/data/DataChange";
import ApiActions from "../../action/data/Api";
import AppAlertAction from "../../action/UI/AppAlertAction";
import CropperModal from "../../../../common/js/CropperModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
// import UIState from '../../reducers/UIState'
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class HandleCollegeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onCollegeCodeChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      DataChange.setCollegeMsg({
        CollegeCode: e.target.value,
      })
    );
  };
  onCollegeCodeBlur = (e) => {
    const { dispatch } = this.props;
    dispatch(
      DataChange.checkCollegeCode(() => {
        // console.log('sussess')
      })
    );
  };
  onCollegeNameChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      DataChange.setCollegeMsg({
        CollegeName: e.target.value,
      })
    );
  };
  onCollegeNameBlur = (e) => {
    const { dispatch } = this.props;
    dispatch(
      DataChange.checkCollegeName(() => {
        // console.log('sussess')
      })
    );
  };
  render() {
    const {
      schoolInfo,
      semesterloading,
      periodInfo,
      serverAddress,
      UIState,
      type,
      DataUpdate,
    } = this.props;
    let {
      handleCollegeMsg,
      schoolInfo: { SchoolCode },
    } = DataUpdate;
    let { CollegeCode, CollegeName, CollegeID } = handleCollegeMsg;
    const { UserID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    const { CollegeCodeTips, CollegeNameTips } = UIState.AppTips;

    return (
      <div className="HandleCollegeModal">
        <div className="row clearfix">
          <span className="left">院系代码:</span>
          <span className="right">
            <Tips
              // placement="bottom"
              visible={UIState.EditModalTipsVisible.CollegeCodeTipsVisible}
              title={CollegeCodeTips}
            >
              {type === "add" ? (
                <Input
                  type="text"
                  value={CollegeCode}
                  maxLength={10}
                  placeholder="请输入院系代码"
                  onChange={(e) => this.onCollegeCodeChange(e)}
                  onBlur={(e) => this.onCollegeCodeBlur(e)}
                  //   disabled={gradeSelectd.valu ? false : true}
                />
              ) : (
                CollegeCode
              )}
            </Tips>
          </span>
        </div>
        <div className="row clearfix">
          <span className="left">管理员账号:</span>
          <span className="right">
            {CollegeCode
              ? CollegeCode && SchoolCode
                ? "cadmin" + "_" + SchoolCode + "_" + CollegeCode
                : ""
              : <span style={{color:'red'}}>请先填写院系代码</span>}
          </span>
        </div>
        <div className="row clearfix">
          <span className="left">院系名称:</span>
          <span className="right">
            <Tips
              // placement="bottom"
              visible={UIState.EditModalTipsVisible.CollegeNameTipsVisible}
              title={CollegeNameTips}
            >
              <Input
                type="text"
                value={CollegeName}
                maxLength={20}
                placeholder="请输入院系名称"
                onChange={(e) => this.onCollegeNameChange(e)}
                onBlur={(e) => this.onCollegeNameBlur(e)}
                //   disabled={gradeSelectd.valu ? false : true}
              />
            </Tips>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { DataUpdate, UIState } = state;

  const {
    schoolInfo,
    semesterloading,
    periodInfo,
    serverAddress,
    collegePreview,
  } = DataUpdate;
  // console.log(periodInfo);

  return {
    schoolInfo,
    semesterloading,
    periodInfo,
    serverAddress,
    UIState,
    DataUpdate,
    collegePreview,
  };
};
export default connect(mapStateToProps)(HandleCollegeModal);
