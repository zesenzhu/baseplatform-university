import React, { Component } from "react";
import TitleBar from "../component/TitleBar";
import { Loading, Search, PagiNation, Modal, DropDown } from "../../../common";
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

class MajorContent extends Component {
  constructor(props) {
    super(props);

    const { dispatch, info } = props;
    this.state = {
      GradeList: [{ value: "", title: "全部班级" }],
      gradeSelect: { value: "", title: "全部班级" },
    };
    //初始化内容区域的数据
    console.log("MajorContent");

    dispatch(UpDataState.getTheMajorPreview(info.id));
  }
  //点击搜索
  SchoolClassSearch(e) {
    const key = e.value;

    const { dispatch, info } = this.props;
    // console.log(info);
    if (key) {
      dispatch(
        SearchActions.MajorClassSearch(
          key,
          info.collegeID,
          info.id,
          this.state.gradeSelect.value
        )
      );
    } else {
      dispatch(AppAlertActions.alertWarn({ title: "搜索内容不能为空!" }));
    }
  }

  //取消搜索

  SchoolCancelClassSearch() {
    const { dispatch, info } = this.props;

    dispatch(SearchActions.MajorClassCloseSearch(info.id));
  }

  //翻页发生改变

  pageChange(MajorClassPageChange, e) {
    const { dispatch } = this.props;

    dispatch(
      PaginationActions.MajorClassPageChange(e - 1, MajorClassPageChange)
    );
  }

  //点击某一个学院跳转到相对应的学院界面

  CollegeClick({ id, name }) {
    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.CHANGE_COLLEGE_ACTIVE,
      info: { id: id, name: name },
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

  MajorClick({ id, name }) {
    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.CHANGE_MAJOR_ACTIVE,
      info: { id: id, name: name },
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
      info: { id: id, name: name },
    });

    $(".frame_leftmenu_mainitem").removeClass("active");

    $(".frame_leftmenu_mainitem").removeClass("selected");

    $(`.frame_leftmenu_mainitem`).each((index, that) => {
      if ($(that).attr("data-id") === id) {
        $(that).addClass("active", "selectd");
      }
    });
  }

  ClassClick({ id, name, collegeID, collegeName, majorID, majorName }) {
    const { dispatch } = this.props;

    dispatch(UpDataState.setSchoolGradeClasses(id));
    dispatch({
      type: UpUIState.CHANGE_CLASS_ACTIVE,
      info: { id, name, collegeID, collegeName, majorID, majorName },
    });
  }

  //重命名班级名称

  ResetClassName({ ClassID, Event, ClassName }) {
    Event.stopPropagation();

    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.RESET_CLASS_NAME_SHOW,
      data: { ClassID, ClassName },
    });
  }

  //重命名输入框变化

  ReNameInputChange(e) {
    const { dispatch } = this.props;

    dispatch({
      type: UpUIState.RESET_CLASS_NAME_INPUT_CHANG,
      data: e.target.value,
    });
  }

  //重命名点击确定
  ResetNameOk() {
    const { dispatch, DataState, UIState } = this.props;

    //判断是否输入合法和是否重命名
    const { AddClassModal } = this.props.UIState;
    let { gradeInfo } = UIState.ComponentChange;
    let { dropDownData, selectValue } = AddClassModal;
    // let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;
    let { collegeSelectd, majorSelectd, gradeSelectd } = selectValue;
    let { Classes } = dropDownData;
    let { InputText, ClassID, ClassName } = UIState.ResetNameModal;

    //如果名称未做变化
    if (InputText === "") {
      dispatch({
        type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
        data: { title: "班级名称不能为空" },
      });
    } else if (ClassName === InputText) {
      dispatch({
        type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
        data: { title: "班级名称没有发生变化" },
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
            data: { title: "班级名称和其他班级名称重复" },
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
              GradeID: gradeInfo.id,
              ClassID: ClassID,
              ClassName: InputText,
              MajorID: majorSelectd.value,
            })
          );
        }
      } else {
        //检测不通过

        dispatch({
          type: UpUIState.RESET_CLASS_NAME_TIPS_SHOW,
          data: { title: "班级名称格式错误" },
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

  delClass({ ClassID, GradeID, Event, isSearch = false }) {
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
        ok: () => {
          return this.delClassActions({
            GradeID: GradeID,
            ClassID,
            isSearch,
          });
        },
      })
    );
  }

  delClassActions({ ClassID, GradeID, isSearch }) {
    const { dispatch, DataState, info } = this.props;

    let { SchoolID } = DataState.LoginUser;

    const { MajorClassPreview } = DataState;

    dispatch({ type: UpUIState.CLOSE_ERROR_ALERT });

    UpDataState.delClassPost({
      ClassIDs: ClassID,
      GradeID: GradeID,
      dispatch,
    }).then((data) => {
      if (data === "success") {
        dispatch(AASActions.AlertSuccess({ title: "删除班级成功！" }));

        // dispatch(SearchActions.SchoolClassSearch(MajorClassPreview.SearchKey));
        if (isSearch) {
          dispatch(
            SearchActions.MajorClassSearch(
              DataState.MajorClassPreview.SearchKey,
              info.collegeID,
              info.id,
              this.state.gradeSelect.value,
              MajorClassPreview.ClassInfo.PageIndex
            )
          );
        } else {
          dispatch(
            PaginationActions.MajorClassPageChange(
              MajorClassPreview.PageIndex,
              false
            )
          );
        }

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
  // componentDidMount() {
  //   let { DataState } = this.props;
  //   const { MajorClassPreview, GradePagination } = DataState;
  //   if (MajorClassPreview.GradeList instanceof Array) {
  //     let GradeList = [];
  //     MajorClassPreview.GradeList.map((child, index) => {
  //       GradeList.push({
  //         value: child.GradeID,
  //         title: child.GradName
  //       });
  //     });
  //     this.setState({
  //       GradeList: GradeList
  //     });
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    let { DataState } = nextProps;
    const { MajorClassPreview, GradePagination } = DataState;
    let GradeList = [{ value: "", title: "全部班级" }];

    if (MajorClassPreview.GradeList instanceof Array) {
      MajorClassPreview.GradeList.map((child, index) => {
        GradeList.push({
          value: child.GradeID,
          title: child.GradeName,
        });
      });
    }

    this.setState({
      GradeList: GradeList,
    });
  }

  // 年级下拉改变
  gradeDropChange = (e) => {
    let { DataState, dispatch, info } = this.props;
    dispatch({ type: UpDataState.ALL_GRADE_CLASS_GRADE_CHANGE, data: e });
    this.setState({
      gradeSelect: e,
    });
    dispatch({ type: UpDataState.THE_GRADE_CLASS_SEARCHKEY_CHANGE, data: "" });
    dispatch({ type: UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE, data: "" });
    dispatch({
      type: UpUIState.CHANGE_GRADE_ACTIVE,
      info: {
        id: e.value,
        name: e.title,
      },
    });
    dispatch(UpDataState.getTheMajorPreview(info.id, e.value));
  };
  // 搜索change
  onSearchChange = (e) => {
    let { DataState, dispatch, info } = this.props;
    console.log("sdsd");
    dispatch({
      type: UpDataState.THE_GRADE_CLASS_SEARCHKEY_CHANGE,
      data: e.target.value,
    });
    dispatch({
      type: UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,
      data: e.target.value,
    });
  };
  render() {
    const { UIState, DataState, info } = this.props;

    const { GradeLoading, ResetNameModal } = UIState;

    const {
      MajorClassPreview,
      GradePagination,
      SchoolGradeClasses,
    } = DataState;

    const { show, InputText, ErrorTips, ErrorTipsShow } = ResetNameModal;
    // console.log(MajorClassPreview.SearchKey);
    let name = "";
    if (info.id && SchoolGradeClasses.AllMajors[info.id]) {
      name = SchoolGradeClasses.AllMajors[info.id].title;
    } else {
      name = info.name;
    }
    return (
      <Loading tip="加载中..." spinning={GradeLoading.show} size="large">
        <TitleBar type="icon1" title={name}></TitleBar>

        <ContentWrapper>
          <div className="search-wrapper clearfix">
            <DropDown
              title="年级"
              dropSelectd={this.state.gradeSelect}
              dropList={this.state.GradeList}
              height={200}
              style={{ zIndex: 8 }}
              onChange={(e) => {
                this.gradeDropChange(e);
              }}
            ></DropDown>
            <Search
              width={360}
              CancelBtnShow={MajorClassPreview.CancelBtnShow}
              className="admclass-search"
              onChange={this.onSearchChange.bind(this)}
              Value={MajorClassPreview.SearchKey}
              onCancelSearch={this.SchoolCancelClassSearch.bind(this)}
              onClickSearch={this.SchoolClassSearch.bind(this)}
              placeHolder="请输入班级名称或教师工号或教师姓名进行搜索..."
            ></Search>
          </div>

          {MajorClassPreview.ClassContentShow ? (
            ""
          ) : (
            <React.Fragment>
              <Statistics
                classNum={MajorClassPreview.Class}
                teacherNum={MajorClassPreview.CourseTecher}
                studentNum={MajorClassPreview.Student}
              ></Statistics>

              <PartData
                // MajorClick={this.MajorClick.bind(this)}
                type="class"
                PartDataList={MajorClassPreview.List}
                ClassClick={this.ClassClick.bind(this)}
                ResetClassName={this.ResetClassName.bind(this)}
                delClass={(info) => this.delClass(info)}
                PartMsg={MajorClassPreview}
                SearchResultShow={MajorClassPreview.ClassContentShow}
              ></PartData>
              <PagiNation
                pageSize={12}
                onChange={this.pageChange.bind(this, false)}
                current={MajorClassPreview.PageIndex + 1}
                total={MajorClassPreview.Total}
              ></PagiNation>
            </React.Fragment>
          )}

          {MajorClassPreview.ClassContentShow ? (
            <React.Fragment>
              <Loading spinning={MajorClassPreview.ClassLoading}>
                <PartData
                  type="class"
                  className="school-grade-class"
                  PartDataList={MajorClassPreview.ClassInfo.List}
                  PartMsg={MajorClassPreview}
                  ClassClick={this.ClassClick.bind(this)}
                  ResetClassName={this.ResetClassName.bind(this)}
                  delClass={(info) =>
                    this.delClass({ ...info, isSearch: true })
                  }
                  SearchResultShow={MajorClassPreview.ClassContentShow}
                ></PartData>

                <PagiNation
                  pageSize={12}
                  onChange={this.pageChange.bind(this, true)}
                  current={MajorClassPreview.ClassInfo.PageIndex + 1}
                  total={MajorClassPreview.ClassInfo.Total}
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
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(MajorContent);
