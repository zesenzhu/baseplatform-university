import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

import { DropDown, Tips } from "../../../common";
import UpUIState from "../actions/UpUIState";
import UpDataState from "../actions/UpDataState";

class AdjustClassModal extends Component {

  addCollgeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADJUST_CLASS_SELECT_CHANGE,
      selectValue: {
        collegeSelectd: e,
        majorSelectd: { value: "", title: "请选择专业" },
        gradeSelectd: { value: "", title: "请选择年级" },
        classSelectd: { value: "", title: "请选择班级" },
      }
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_GRADE_TIPS_HIDE
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_COLLEGE_TIPS_HIDE
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_MAJOR_TIPS_HIDE
    });
  };
  addMajorDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADJUST_CLASS_SELECT_CHANGE,
      selectValue: {
        majorSelectd: e,
         
        gradeSelectd: { value: "", title: "请选择年级" },
        classSelectd: { value: "", title: "请选择班级" },
      }
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_GRADE_TIPS_HIDE
    });
    dispatch(UpDataState.setAddClassGradePreview(e.value))
    dispatch({
      type: UpUIState.ADJUST_CLASS_MAJOR_TIPS_HIDE
    });
  };
  addGradeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADJUST_CLASS_SELECT_CHANGE,
      selectValue: {
        gradeSelectd: e,
        classSelectd: { value: "", title: "请选择班级" },
         
      }
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_GRADE_TIPS_HIDE
    });
     
  };
  addClassDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADJUST_CLASS_SELECT_CHANGE,
      selectValue: {
        classSelectd: e,
         
      }
    });
    dispatch({
      type: UpUIState.ADJUST_CLASS_GRADE_TIPS_HIDE
    });
     
  };
  render() {
    const {
      checkList,
      schoolClassList,
      gradeSelecd,
      // classSelectd,
      classDisabled,
      gradeSelectChange,
      classSelectChange,
      // classList,
      errTips,
      errTipsShow,
      UIState,
      DataState
    } = this.props;
    let {UserType} = DataState.LoginUser

    let stuList = checkList.map(item => {
      return JSON.parse(item);
    });

    // let gradeList = schoolClassList.map((item) => {

    //     return {value:item.GradeID,title:item.GradeName}

    // });
    let { dropDownData,gradeList,classList } = UIState.AddClassModal;
    let {selectValue,inputTipsShow,selectTips } = UIState.AdjustClassModal;
    // let gradeList = grade.map((item, key) => {
    //   return { value: item.GradeID, title: item.GradeName };
    // });

    let {
      firstDropDown,
      thirdDropDown,
      secondDropDown,
      Classes
    } = dropDownData;
    let {
      collegeTips,
      majorTips,
      gradeTips,
      classTips
    } = selectTips;
    let {
      collegeTipsShow,
      majorTipsShow,
      gradeTipsShow,
      classTipsShow
    } = inputTipsShow;
    let {
      collegeSelectd,
      majorSelectd,
      gradeSelectd,
      classSelectd
    } = selectValue;
    // let classDropList = classList.map(item => {
    //   return { value: item.ClassID, title: item.ClassName };
    // });

    return (
      <div className="adjust-class-wrapper">
        <div className="before-tips">
          提示：为保证系统的正常运行，请勿在教学活动进行时或学期期末时对学生调班。
        </div>

        <div className="adjust-class-obj" >
          <span className="props">调班对象:</span>

          <span className="objs">
            {stuList.map((item, key) => {
              if (key === stuList.length - 1) {
                return `${item.name}`;
              } else {
                return `${item.name}、`;
              }
            })}
            <span className="total">
              (共<span className="red">{stuList.length}</span>人)
            </span>
          </span>
        </div>

        <div className="adjust-class-select" style={{ zIndex: 9 }}>
          <span className="props">目标学院:</span>
          <Tips visible={collegeTipsShow} title={collegeTips}>
          <DropDown
            dropSelectd={collegeSelectd }
            dropList={firstDropDown}
            disabled={UserType===0||UserType===10}
            onChange={e => this.addCollgeDropChange(e)}
            style={{ zIndex: 5 }}
            height={240}
          ></DropDown>
          </Tips>
        </div>
        <div className="adjust-class-select" style={{ zIndex: 8 }}>
          <span className="props">目标专业:</span>
          <Tips visible={majorTipsShow} title={majorTips}>
            <DropDown
              dropSelectd={majorSelectd}
              onChange={e => this.addMajorDropChange(e)}
              disabled={collegeSelectd.value === "" ? true : false}
              dropList={secondDropDown[collegeSelectd.value]}
              height={240}
            ></DropDown>
          </Tips>
        </div>
        <div className="adjust-class-select" style={{ zIndex: 7 }}>
          <span className="props">目标年级:</span>
          <Tips visible={gradeTipsShow} title={gradeTips}>
            <DropDown
              dropSelectd={gradeSelectd}
              onChange={e => this.addGradeDropChange(e)}
              disabled={majorSelectd.value === "" ? true : false}
              dropList={gradeList}
              height={240}
            ></DropDown>
          </Tips>
        </div>
        <div className="adjust-class-select" style={{ zIndex: 6 }}>
          <span className="props">目标班级:</span>
          <Tips visible={classTipsShow} title={classTips}>
            <DropDown
              dropSelectd={classSelectd }
              onChange={e => this.addClassDropChange(e)}
              disabled={gradeSelectd.value === "" ? true : false}
              dropList={classList[gradeSelectd.value]}
              height={240}
            ></DropDown>
          </Tips>
        </div>

        {/*<div className="error-tips" style={{display:`${errTipsShow?'block':'none'}`}}>{errTips}</div>*/}
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState, DetailModal } = state;

  return {
    UIState,

    DataState,

    DetailModal
  };
};
export default connect(mapStateToProps)(AdjustClassModal);
