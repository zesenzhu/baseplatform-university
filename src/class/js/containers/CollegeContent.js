import React, { Component } from "react";
import TitleBar from "../component/TitleBar";
import { Loading, Search, PagiNation, Modal } from "../../../common";
import ContentWrapper from "../component/ContentWrapper";
import Statistics from "../component/Statistics";
import PartData from "../component/PartData";
import connect from "react-redux/es/connect/connect";
import UpDataState from "../actions/UpDataState";
import UpUIState from "../actions/UpUIState";

import $ from "jquery";

import SearchActions from "../actions/SearchActions";

import AppAlertActions from "../actions/AppAlertActions";

import PaginationActions from "../actions/PaginationActions";

import AASActions from "../actions/AppAlertSuccess";

import { Input } from "antd";

class CollegeContent extends Component {
  constructor(props) {
    super(props);

    const { dispatch,info } = props;

    //初始化内容区域的数据
    // console.log(props)
    console.log('CollegeContent')

    dispatch(UpDataState.getTheCollgePreview(info.id));
  }
  //点击搜索
  SchoolClassSearch(e) {
    const key = e.value;

    const { dispatch ,info } = this.props;

    if (key) {
      dispatch(SearchActions.CollegeClassSearch(key,info.id));
    } else {
      dispatch(AppAlertActions.alertWarn({ title: "搜索内容不能为空!" }));
    }
  }

  //取消搜索

  SchoolCancelClassSearch() {
    const { dispatch,info  } = this.props;

    dispatch(SearchActions.CollegeClassCloseSearch(info.id));
  }

  //翻页发生改变

  pageChange(e) {
    const { dispatch } = this.props;
    // dispatch(SearchActions.CollegeClassSearch(key,info.id,e - 1));

    dispatch(PaginationActions.CollegeClassPageChange(e - 1));
  }

  //点击某一个学院跳转到相对应的学院界面

  CollegeClick({ id, name }) {
    const { dispatch } = this.props;
    console.log('CollegeClick')
    dispatch({
      type: UpUIState.CHANGE_MAJOR_ACTIVE,
      info: { id: id, name: name, }
    });

    // $('.frame_leftmenu_mainitem').removeClass('active');

    // $('.frame_leftmenu_mainitem').removeClass('selected');

    // $(`.frame_leftmenu_mainitem`).each((index,that)=>{

    //     if ($(that).attr('data-id')===id){

    //         $(that).addClass('active','selectd');

    //     }

    // })
  }

  //点击某一个专业跳转到相对应的专业界面

  MajorClick({ id, name,collegeName,collegeID }) {
    const { dispatch } = this.props;
    dispatch(UpDataState.setSchoolGradeClasses(id));
    // console.log(collegeID,collegeName)
    dispatch({
      type: UpUIState.CHANGE_MAJOR_ACTIVE,
      info: { id: id, name: name,collegeID,collegeName}
    });

    // $('.frame_leftmenu_mainitem').removeClass('active');

    // $('.frame_leftmenu_mainitem').removeClass('selected');

    // $(`.frame_leftmenu_mainitem`).each((index,that)=>{

    //     if ($(that).attr('data-id')===id){

    //         $(that).addClass('active','selectd');

    //     }

    // })
  }

  //点击某一个年级跳转到相对应的年级界面

  GradeClick({ id, name }) {
    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.CHANGE_GRADE_ACTIVE,
      info: { id: id, name: name }
    });

    $(".frame_leftmenu_mainitem").removeClass("active");

    $(".frame_leftmenu_mainitem").removeClass("selected");

    $(`.frame_leftmenu_mainitem`).each((index, that) => {
      if ($(that).attr("data-id") === id) {
        $(that).addClass("active", "selectd");
      }
    });
  }

 
  ClassClick({ id,name,collegeID,collegeName,majorID,majorName }) {
    const { dispatch } = this.props;

    dispatch(UpDataState.setSchoolGradeClasses(id));

        
        dispatch({
            type: UpUIState.CHANGE_CLASS_ACTIVE,
            info: { id, name,collegeID,collegeName,majorID,majorName}
          });
    
  }
  //重命名班级名称

  ResetClassName({ ClassID, Event, ClassName }) {
    Event.stopPropagation();

    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.RESET_CLASS_NAME_SHOW,
      data: { ClassID, ClassName }
    });
  }

  //重命名输入框变化

  ReNameInputChange(e) {
    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.RESET_CLASS_NAME_INPUT_CHANG,
      data: e.target.value
    });
  }

  //重命名点击确定
  ResetNameOk() {
    const { dispatch, DataState, UIState } = this.props;

    //判断是否输入合法和是否重命名
    const { AddClassModal } = this.props.UIState;

    let { dropDownData, selectValue } = AddClassModal;
    // let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;
    let { collegeSelectd, majorSelectd, gradeSelectd } = selectValue;
    let { Classes } = dropDownData;
    let { InputText, ClassID, ClassName } = UIState.ResetNameModal;

    //如果名称未做变化
    //如果名称未做变化
    if ( InputText ==='') {
      dispatch({
        type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
        data: { title: "班级名称不能为空" }
      });
    } else if (ClassName === InputText) {
      dispatch({
        type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
        data: { title: "班级名称没有发生变化" }
      });
    } else {
       //输入合法和不合法的情况
       if (this.UserComm_CheckGroupName(InputText)) {
        dispatch({ type: UpUIState.RESET_CLASS_NAME_TIPS_HIDE });

        let isChong = false;
        for (let key in Classes) {
          if (!(Classes[key] instanceof Array))
            for (let index in Classes[key]) {
              if (Classes[key][index].title === InputText) {
                isChong = true;
              }
            }
        }

        if (isChong) {
          //有同名
          // dispatch({ type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW });
          dispatch({
            type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
            data: { title: "班级名称和其他班级名称重复" }
          });
          // dispatch({
          //   type: UpUIState.ADD_CLASS_INPUT_TIPS,
          //   tips: "该年级下已存在同名班级"
          // });
      
        } else {
          //做异步操作

          dispatch(
            UpDataState.UpdateClassName({
              IsAllPreview: false,
              IsCollegePreview:true,
              // GradeID: gradeSelectd.value,
              ClassID: ClassID,
              ClassName: InputText,
              CollegeID:collegeSelectd.value
              // MajorID:majorSelectd.value
            })
          );
        }
      } else {
        //检测不通过

        dispatch({
          type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
          data: { title: "班级名称格式错误" }
        });
      }
    }
  }

  //重命名点击取消
  ResetNameCancel() {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.RESET_CLASS_NAME_HIDE });
  }

  //删除班级

  delClass({ GradeID,ClassID,CollegeID, Event }) {
    Event.stopPropagation();

    const { dispatch, DataState } = this.props;

    const { SchoolGradeClasses } = DataState;

    // let TheGrade = SchoolGradeClasses.Grades.find(item => {
    //   let HasClass = false;

    //   item.Classes.map(i => {
    //     if (i.ClassID === ClassID) {
    //       HasClass = true;
    //     }
    //   });

    //   return HasClass;
    // });

    dispatch(
      AppAlertActions.alertQuery({
        title: "您要删除该班级么？",
        ok:  
          this.delClassActions.bind(this, {
            GradeID,
            CollegeID,
            ClassID
          })
        
      })
    );
  }

  delClassActions({ ClassID, GradeID }) {
    const { dispatch, DataState } = this.props;

    let { SchoolID } = DataState.LoginUser;

    const { MajorPreview } = DataState;

    dispatch({ type: UpUIState.CLOSE_ERROR_ALERT });

    UpDataState.delClassPost({
      ClassIDs: ClassID,
      GradeID: GradeID,
      dispatch
    }).then(data => {
      if (data === "success") {
        dispatch(AASActions.AlertSuccess({ title: "删除班级成功！" }));

        dispatch(SearchActions.CollegeClassSearch(MajorPreview.SearchKey,MajorPreview.CollegeID,MajorPreview.ClassInfo.PageIndex));

        dispatch(UpDataState.UpGradeClassTree(SchoolID));
      }
    });
  }

  //班级名称检测函数

  UserComm_CheckGroupName(strInput) {
    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      strInput
    );
  }
// 搜索change
SchoolClassSearchChange(e) {
  const key = e.target.value;

  const { dispatch } = this.props;
  dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,data:key});

  
}
  render() {
    const { UIState, DataState,info } = this.props;

    const { GradeLoading, ResetNameModal } = UIState;

    const { MajorPreview, GradePagination } = DataState;

    const { show, InputText, ErrorTips, ErrorTipsShow } = ResetNameModal;

    return (
      <Loading tip="加载中..." spinning={GradeLoading.show} size="large">
        <TitleBar type="icon1" title={info.name}></TitleBar>

        <ContentWrapper>
          <div className="search-wrapper clearfix">
            <Search
              width={360}
              CancelBtnShow={MajorPreview.CancelBtnShow}
              className="admclass-search"
              Value={DataState.AllGradePreview.SearchKey}
              onChange={this.SchoolClassSearchChange.bind(this)}
              onCancelSearch={this.SchoolCancelClassSearch.bind(this)}
              onClickSearch={this.SchoolClassSearch.bind(this)}
              placeHolder="请输入班级名称或教师工号或教师姓名进行搜索"
            ></Search>
          </div>

          {MajorPreview.ClassContentShow ? (
            ""
          ) : 
            <React.Fragment>
              <Statistics
                classNum={MajorPreview.Class}
                teacherNum={MajorPreview.CourseTecher}
                studentNum={MajorPreview.Student}
              ></Statistics>

              <PartData
                MajorClick={this.MajorClick.bind(this)}
                type="major"
                PartMsg={MajorPreview}
                PartDataList={MajorPreview.List}
              ></PartData>
            </React.Fragment>
          }

          {MajorPreview.ClassContentShow ? (
            <React.Fragment>
              <Loading spinning={MajorPreview.ClassLoading}>
                <PartData
                  type="class"
                  className="school-grade-class"
                  PartDataList={MajorPreview.ClassInfo.List}
                  ClassClick={this.ClassClick.bind(this)}
                  PartMsg={MajorPreview}
                  ResetClassName={this.ResetClassName.bind(this)}
                  delClass={this.delClass.bind(this)}
                  SearchResultShow={MajorPreview.ClassContentShow}
                ></PartData>

                <PagiNation
                  pageSize={12}
                  onChange={this.pageChange.bind(this)}
                  current={MajorPreview.ClassInfo.PageIndex+1}
                  total={MajorPreview.ClassInfo.Total}
                ></PagiNation>
              </Loading>
            </React.Fragment>
          ) : (
            ""
          )}
        </ContentWrapper>

        <Modal
          type={1}
          title="班级重命名"
          mask={true}
          visible={show}
          width={540}
          bodyStyle={{ height: 92 }}
          className="addClassModal"
          onOk={this.ResetNameOk.bind(this)}
          onCancel={this.ResetNameCancel.bind(this)}
        >
          <div className="ModalContent">
            <div className="reset-classname-wrapper">
              <span className="props">班级名称:</span>

              <Input
                type="text"
                maxLength={20}
                onChange={this.ReNameInputChange.bind(this)}
                value={InputText}
                placeholder="请输入班级名称"
              />

              <div
                className="error-tips"
                style={{ display: `${ErrorTipsShow ? "block" : "none"}` }}
              >
                {ErrorTips}
              </div>
            </div>
          </div>
        </Modal>
      </Loading>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(CollegeContent);
