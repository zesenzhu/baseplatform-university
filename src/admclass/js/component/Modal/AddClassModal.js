import React from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  DropDown,
  Button,
} from "../../../../common";
import { Input } from "antd";
import actions from "../../actions";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import ClassCropperModal from "../../../../common/js/CropperModal";

import "../../../scss/Modal/AddClassModal.scss";
const { UpDataState, UpUIState } = actions;

// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class AddClassModal extends React.Component {
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

  render() {
    const {
      type,
      onSelectGrade,
      data: {
        GradeName,
        GradeID,
        ClassName,
        CollegeName,
        CollegeID,
        MajorName,
        MajorID,
      },
      onEditNameChange,
      onEditNameBlur,
      tipsVisible: {
        AddClassSelectGradeTipsVisible,
        AddClassSelectCollegeTipsVisible,
        AddClassSelectMajorTipsVisible,
        AddClassNameTipsVisible,
      },
      tipsTitle: {
        AddClassSelectGradeTips,
        AddClassSelectCollegeTips,
        AddClassSelectMajorTips,
        AddClassNameTips,
      },
      className,
      onSelectCollege,
      onSelectMajor,
      collegeList,
      majorData,
      gradeList,
      children,
      ...params
    } = this.props;
    let title = "";
    let SelectGrade = {
      value: GradeID,
      title: GradeID === "" ? "请选择年级" : GradeName,
    };
    let SelectCollege = {
      value: CollegeID,
      title: CollegeID === "" ? "请选择学院" : CollegeName,
    };
    let SelectMajor = {
      value: MajorID,
      title: MajorID === "" ? "请选择专业" : MajorName,
    };
    return (
      <div
        className={`AddClassModal ${className}`}
        id="AddClassModal"
        {...params}
      >
        <div className="modal-row">
          <span className="row-left">选择学院:</span>
          <span className="row-right">
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={AddClassSelectCollegeTipsVisible}
              title={AddClassSelectCollegeTips}
            >
              <DropDown
                style={{ zIndex: 7 }}
                ref="Grade"
                width={150}
                height={240}
                // title="班级："
                dropSelectd={SelectCollege}
                dropList={collegeList}
                onChange={(e) => onSelectCollege(e)}
              ></DropDown>
            </Tips>
          </span>
        </div>
        <div className="modal-row">
          <span className="row-left">选择专业:</span>
          <span className="row-right">
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={AddClassSelectMajorTipsVisible}
              title={AddClassSelectMajorTips}
            >
              <DropDown
                style={{ zIndex: 6 }}
                ref="Grade"
                width={150}
                height={240}
                disabled={!SelectCollege.value ? true : false}
                // title="班级："
                dropSelectd={SelectMajor}
                dropList={
                  SelectCollege.value ? majorData[SelectCollege.value] : []
                }
                onChange={(e) => onSelectMajor(e)}
              ></DropDown>
            </Tips>
          </span>
        </div>
        <div className="modal-row">
          <span className="row-left">选择年级:</span>
          <span className="row-right">
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={AddClassSelectGradeTipsVisible}
              title={AddClassSelectGradeTips}
            >
              <DropDown
                style={{ zIndex: 5 }}
                ref="Grade"
                width={150}
                height={240}
                // title="班级："
                // disabled={!SelectMajor.value ? true : false}
                dropSelectd={SelectGrade}
                dropList={gradeList}
                onChange={(e) => onSelectGrade(e)}
              ></DropDown>
            </Tips>
          </span>
        </div>
        <div className="modal-row">
          <span className="row-left">班级名称:</span>
          <span className="row-right">
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={AddClassNameTipsVisible}
              title={AddClassNameTips}
            >
              <Input
                className="rename-input"
                maxLength={20}
                width={"265px"}
                placeholder={"请输入班级名称，建议以年级为前缀"}
                type="text"
                name="ClassNameInput"
                value={ClassName}
                onChange={(e) => onEditNameChange(e)}
                onBlur={(e) => onEditNameBlur(e)}
              />
            </Tips>
          </span>
        </div>
        {children}
      </div>
    );
  }
}

AddClassModal.defaultProps = {
  className: "",
  onEditNameBlur: () => {},
  onEditNameChange: () => {},
  data: {},
  tipsTitle: "名称不能为空",
  tipsVisible: false,
  onSelectGrade: () => {},
  gradeList: [],
};
export default AddClassModal;
