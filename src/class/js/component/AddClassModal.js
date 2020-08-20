import React, { Component } from "react";
import { DropDown, Tips } from "../../../common";
import { Input } from "antd";
import { connect } from "react-redux";
import UpUIState from "../actions/UpUIState";

import UpDataState from "../actions/UpDataState";
class AddClassModal extends Component {
  addCollgeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADD_CLASS_SELECT_CHANGE,
      selectValue: {
        collegeSelectd: e,
        majorSelectd: { value: "", title: "请选择专业" },
        gradeSelectd: { value: "", title: "请选择年级" }
      }
    });
    dispatch({
      type: UpUIState.ADD_CLASS_GRADE_TIPS_HIDE
    });
    dispatch({
      type: UpUIState.ADD_CLASS_COLLEGE_TIPS_HIDE
    });
    dispatch({
      type: UpUIState.ADD_CLASS_MAJOR_TIPS_HIDE
    });
  };
  addMajorDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADD_CLASS_SELECT_CHANGE,
      selectValue: {
        majorSelectd: e,
         
        gradeSelectd: { value: "", title: "请选择年级" }
      }
    });
    dispatch({
      type: UpUIState.ADD_CLASS_GRADE_TIPS_HIDE
    });
     dispatch(UpDataState.setAddClassGradePreview(e.value))
    dispatch({
      type: UpUIState.ADD_CLASS_MAJOR_TIPS_HIDE
    });
  };
  addGradeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADD_CLASS_SELECT_CHANGE,
      selectValue: {
        gradeSelectd: e,
         
      }
    });
    dispatch({
      type: UpUIState.ADD_CLASS_GRADE_TIPS_HIDE
    });
     
  };
  render() {
    const {
      grade,
      addClassDropChange,
      inputDisabled,
      inputValue,
      inputChange,
      selectedValue,
      // selectTips,
      selectTipsShow,
      inputTips,
      // inputTipsShow,
      DataState,
      UIState
    } = this.props;
    let {UserType} = DataState.LoginUser
    let { dropDownData, selectValue,inputTipsShow,selectTips,gradeList} = UIState.AddClassModal;
    // let gradeList = grade.map((item, key) => {
    //   return { value: item.GradeID, title: item.GradeName };
    // });

    let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;
    let { collegeSelectd, majorSelectd, gradeSelectd } = selectValue;
    let {
      collegeTipsShow,
      majorTipsShow,
      gradeTipsShow,
      classNameTipsShow
    } = inputTipsShow;
    // let {
    //   collegeTips,
    //   majorTips,
    //   gradeTips,
    // } = selectTips;
    let { firstDropDown, thirdDropDown, secondDropDown } = dropDownData;
    console.log(collegeSelectd)
    return (
      <React.Fragment>
        <div className="addclass-select-grade" style={{ zIndex: 10 }}>
          <span className="props">选择学院:</span>

          <Tips visible={collegeTipsShow} title={collegeTips}>
            <DropDown
              style={{ zIndex: 10 }}
              width={150}
              disabled={UserType===0||UserType===10}

              dropSelectd={collegeSelectd}
              onChange={this.addCollgeDropChange}
              dropList={firstDropDown}
              height={200}
            ></DropDown>
          </Tips>
        </div>

        <div className="addclass-select-grade" style={{ zIndex: 9 }}>
          <span className="props">选择专业:</span>
          <Tips visible={majorTipsShow} title={majorTips}>
            <DropDown
              style={{ zIndex: 9 }}
              width={150}
              disabled={collegeSelectd.value ? false : true}
              dropSelectd={majorSelectd}
              onChange={this.addMajorDropChange}
              dropList={secondDropDown[collegeSelectd.value]}
              height={200}
            ></DropDown>
          </Tips>
        </div>
        <div className="addclass-select-grade " style={{ zIndx: 8 }}>
          <span className="props">选择年级:</span>
          <Tips visible={gradeTipsShow} title={gradeTips}>
            <DropDown
              style={{ zIndex: 9 }}
              width={150}
              disabled={majorSelectd.value ? false : true}
              dropSelectd={gradeSelectd}
              onChange={this.addGradeDropChange}
              dropList={gradeList}
              height={200}
            ></DropDown>
          </Tips>
          {/*<span className="error-tips" style={{display:`${selectTipsShow?'inline-block':'none'}`}}>{selectTips}</span>*/}
        </div>

        <div className="addclass-classname-wrapper">
          <span className="props">班级名称:</span>

          <Tips
            // placement="bottom"
            visible={classNameTipsShow}
            title={inputTips}
          >
            <Input
              type="text"
              value={inputValue}
              placeholder="请输入班级名称，建议以年级为前缀"
              onChange={e => inputChange(e)}
            //   disabled={gradeSelectd.valu ? false : true}
            />
          </Tips>

          {/*<div className="error-tips" style={{display:`${inputTipsShow?'block':'none'}`}}>{inputTips}</div>*/}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  let {
    UIState,
    DataState,
    RouterSet,
    ModuleSetting,
    Teacher,
    AppAlertSuccess
  } = state;

  const { ClassCharge } = Teacher;

  return {
    UIState,

    DataState,

    RouterSet,

    ModuleSetting,

    ClassCharge,

    AppAlertSuccess
  };
};
export default connect(mapStateToProps)(AddClassModal);
