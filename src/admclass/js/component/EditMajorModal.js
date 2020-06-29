import React, { Component } from "react";
import { DropDown, Tips } from "../../../common";
import { Input } from "antd";
import { connect } from "react-redux";
import UpUIState from "../actions/UpUIState";
import { Scrollbars } from "react-custom-scrollbars";
import AppAlertActions from "../actions/AppAlertActions";

import UpDataState from "../actions/UpDataState";
class EditMajorModal extends Component {
  addCollgeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.EDIT_MAJOR_SELECT_CHANGE,
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

    dispatch({
      type: UpUIState.ADD_CLASS_MAJOR_TIPS_HIDE
    });
  };
  addGradeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpUIState.ADD_CLASS_SELECT_CHANGE,
      selectValue: {
        gradeSelectd: e
      }
    });
    dispatch({
      type: UpUIState.ADD_CLASS_GRADE_TIPS_HIDE
    });
  };

  // 编辑
  onEditClick = major => {
    let { dispatch,UIState,DataState } = this.props;
    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_SHOW });

    dispatch({
      type: UpUIState.EDIT_MAJOR_MODAL_MODAL_DATA,
      data: {
        college:DataState.LoginUser.UserType=== 0||DataState.LoginUser.UserType=== 10?{
          value:DataState.LoginUser.CollegeID,
          title:DataState.LoginUser.CollegeName
        }:UIState.EditMajorModal.selectValue.collegeSelectd
        ,major
      }
    });
  };
  // 编辑
  addMajorClick = major => {
    let { dispatch,UIState ,DataState} = this.props;
    dispatch({ type: UpUIState.ADD_MAJOR_MODAL_SHOW });
    dispatch({
      type: UpUIState.EDIT_MAJOR_MODAL_MODAL_DATA,
      data: {
        college:DataState.LoginUser.UserType=== 0||DataState.LoginUser.UserType=== 10?{
          value:DataState.LoginUser.CollegeID,
          title:DataState.LoginUser.CollegeName
        }:UIState.EditMajorModal.selectValue.collegeSelectd
        , major: { value: "", title: "" }
      }
    });
  };
  // 删除
  onDeleteClick = major => {
    let { dispatch } = this.props;

    dispatch(
      AppAlertActions.alertQuery({
        title: `确定删除该专业？`,
        ok:this.AlterDeleteOk.bind(this,major),
       
      })
    );
  };
  AlterDeleteCancel = ()=>{
    let { dispatch } = this.props;

    dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT})
  }

  AlterDeleteOk = (major)=>{
    let { dispatch,UIState,DataState } = this.props;
    let {college,collegeInfo,majorInfo} =UIState.ComponentChange;
    let IsMajor = UIState.ComponentChange.major
    console.log(IsMajor,major,majorInfo.id)
    // let {}= DataState.MajorPreview.SearchKey
    UpDataState.delMajor({ MajorID:major.value, dispatch }).then(data=>{
      if(data==='success'){
        dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT})
        if(college){
        dispatch(UpDataState.UpGradeClassTree());

          dispatch(UpDataState.getTheCollgePreview( collegeInfo.id,{ClassContentShow:DataState.MajorPreview.ClassContentShow,SearchKey: DataState.MajorPreview.SearchKey,

            CancelBtnShow: DataState.MajorPreview.CancelBtnShow}))

        }else if(IsMajor&&majorInfo.id===major.value){
          dispatch({
            type: UpUIState.CHANGE_STU_ACTIVE,
            info: { id: 'all', name: '班级信息总览' }
          });
          dispatch(UpDataState.setSchoolGradeClasses('all'))
        dispatch(UpDataState.UpGradeClassTree());


        }else{
          dispatch(UpDataState.UpGradeClassTree());

        }
        dispatch(UpDataState.GetDropdownData());
      }
    })
  }
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
    let { UserType } = DataState.LoginUser;
    let { dropDownData } = UIState.AddClassModal;
    let { selectValue } = UIState.EditMajorModal;

    let { firstDropDown, thirdDropDown, secondDropDown } = dropDownData;
    let { collegeSelectd } = selectValue;
    return (
      <React.Fragment>
        <div className="addclass-select-grade" style={{ zIndex: 10 }}>
          <span className="props">选择学院:</span>

          <DropDown
            style={{ zIndex: 10 }}
            width={150}
            disabled={UserType === 0 || UserType === 10}
            dropSelectd={collegeSelectd}
            onChange={this.addCollgeDropChange}
            dropList={firstDropDown}
            height={200}
          ></DropDown>
          <span className='addMajor'
          onClick={this.addMajorClick}>
          添加专业
          </span>
        </div>
        <div className="major-box">
        <Scrollbars style={{ height: "360px", width: "100%" }}>
          {collegeSelectd.value !== "" &&
            secondDropDown[collegeSelectd.value] instanceof Array &&
            secondDropDown[collegeSelectd.value].map((child, index) => {
              return (
                <div key={index} className="major-content">
                  <span className='major-name'>{child.title}</span>
                  <div className="edit-box">
                    <span
                      onClick={this.onEditClick.bind(this, child)}
                      className="edit"
                    >
                      编辑
                    </span>
                    <span
                      onClick={this.onDeleteClick.bind(this, child)}
                      className="delete"
                    >
                      删除
                    </span>
                  </div>
                </div>
              );
            })}
            </Scrollbars>
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
export default connect(mapStateToProps)(EditMajorModal);
