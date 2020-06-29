import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import "../../scss/HandleCourseClass.scss";
import { postData, getData } from "../../../common/js/fetch";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import { Input } from "antd";
import CONFIG from "../../../common/js/config";
import {
  Modal,
  Loading,
  DropDown,
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup,
  Tips
} from "../../../common";
import SelectTeacher from "./SelectTeacher";
import SelectStudent from "./SelectStudent";

class AddCourseClass extends React.Component {
  constructor(props) {
    super(props);
    const { DataState, dispatch } = props;
    this.state = {
      tableSource: [],
      courseClassName: "",
      TeacherName: "",
      Subject: { value: 0, title: "请选择学科" },
      Grade: { value: 0, title: "请选择年级" },
      SubjectSelect: { value: 0, title: "请选择学科" },
      GradeSelect: { value: 0, title: "请选择年级" },
      UserMsg: props.DataState.LoginUser,
      SubjectNameTipsTitle: "请输入教学班名称",
      SubjectTipsTitle: "请选择学科",
      GradeTipsTitle: "请选择年级"
    };
  }
  componentWillMount() {
    const { DataState, dispatch } = this.props;
    //获取路由
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    //*************** */
    let UserMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));

    if (handleRoute === "Teacher") {
      let UserMsg = DataState.LoginUser;
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher = {
        value: UserMsg.UserID,
        title: UserMsg.UserName
      };
      //dispatch(actions.UpDataState.setSubjectTeacherTransferMsg({value:UserMsg.UserID,title:UserMsg.UserName}))
    }

    if (this.props.type === "Teacher") {
      let Subjects = DataState.GetTeacherSubjectAndGradeMsg.Subjects;

      if (Subjects.length === 1) {
        this.setState({
          SubjectSelect: Subjects[0],
          Subject: Subjects[0]
        });
      }
      dispatch(
        actions.UpDataState.setCourseClassDataMsg({ Subject: Subjects[0] })
      );
    }

    if (UserMsg.UserType === "0" || UserMsg.UserType === "7")
      dispatch(
        actions.UpDataState.getCoureClassAllMsg(
          "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
          window.MenuClcik
        )
      );
    let SubjectSelect = { value: 0, title: "请选择学科" };
    let GradeSelect = { value: 0, title: "请选择年级" };
    let SubjectDropList = [];
    let GradeDropList = [{ value: 0, title: "请选择年级" }];
    if (this.props.type === "Admin") {
      let Subjects = DataState.GetCoureClassAllMsg.Subjects;

      SubjectSelect =
        DataState.GetCoureClassAllMsg.Subject &&
        Subjects[DataState.GetCoureClassAllMsg.Subject].subjectName
          ? {
              title:
                Subjects[DataState.GetCoureClassAllMsg.Subject].subjectName,
              value: DataState.GetCoureClassAllMsg.Subject
            }
          : { value: 0, title: "请选择学科" };

      for (let index in Subjects) {
        SubjectDropList.push({
          value: index,
          title: Subjects[index].subjectName
        });
        let Grade = [];
        for (let child in Subjects[index]) {
          if (child !== "subjectName") {
            Grade.push({
              value: child,
              title: Subjects[index][child]
            });
          }
          if (
            SubjectSelect.value !== 0 &&
            DataState.GetCoureClassAllMsg.Grade &&
            SubjectSelect.value === index &&
            DataState.GetCoureClassAllMsg.Grade === child
          ) {
            GradeSelect = {
              value: child,
              title: Subjects[index][child]
            };
          }
        }

        GradeDropList[index] = Grade;
      }
      dispatch(
        actions.UpDataState.setCourseClassDataMsg({ Subject: SubjectSelect })
      );
      dispatch(
        actions.UpDataState.setCourseClassDataMsg({ Grade: GradeSelect })
      );

      this.setState({
        SubjectSelect: SubjectSelect,
        GradeSelect: GradeSelect
      });
    } else if (this.props.type === "Teacher") {
      let Subjects = DataState.GetTeacherSubjectAndGradeMsg.Subjects;
      SubjectSelect =
        DataState.GetCoureClassAllMsg.Subject &&
        Subjects[DataState.GetCoureClassAllMsg.Subject].subjectName
          ? {
              title:
                Subjects[DataState.GetCoureClassAllMsg.Subject].subjectName,
              value: DataState.GetCoureClassAllMsg.Subject
            }
          : { value: 0, title: "请选择学科" };
      Subjects.map((child, index) => {
        SubjectDropList.push({
          value: child.value,
          title: child.title
        });
        GradeDropList[child.value] = child.grade;
      });

      if (
        SubjectSelect.value !== 0 &&
        DataState.GetCoureClassAllMsg.Grade &&
        SubjectSelect.value === index &&
        DataState.GetCoureClassAllMsg.Grade === child
      ) {
        GradeSelect = {
          value: child,
          title: Subjects[index][child]
        };
      }
    }
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    let data = nextProps.DataState.GetCourseClassDetailsHandleClassMsg;

    this.setState({
      courseClassName: data.selectData
        ? data.selectData.CourseClass.CourseClassName
        : "",
      TeacherName: data.selectData ? data.selectData.Teacher.TeacherName : "",
      tableSource: data.selectData ? data.selectData.Student : []
    });
  }
  //数据绑定
  onCourseClassNameChange = e => {
    // const { DataState, UIState, dispatch } = this.props;
    // let { CourseClassName, ...data } = DataState.GetCourseClassDetailsHandleClassMsg.selectData.CourseClass
    // //console.log(this.state.courseClassName, e.target.value)
    // dispatch(actions.UpDataState.setCourseClassName({ CourseClassName: e.target.value, ...data }))
    this.setState({
      courseClassName: e.target.value.trim()
    });
  };
  //数据绑定
  onCourseClassNameBlur = e => {
    const { DataState, UIState, dispatch } = this.props;
    let {
      CourseClassName,
      ...data
    } = DataState.GetCourseClassDetailsHandleClassMsg.selectData.CourseClass;
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(
      e.target.value
    );

    if (e.target.value === "") {
      this.setState({
        SubjectNameTipsTitle: "请输入教学班名称"
      });
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
    } else if (!Test) {
      this.setState({
        SubjectNameTipsTitle: "教学班名称格式不正确"
      });
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
    } else {
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });
      this.setState({
        SubjectNameTipsTitle: "请输入教学班名称"
      });
    }
    dispatch(
      actions.UpDataState.setCourseClassName({
        CourseClassName: e.target.value.trim(),
        ...data
      })
    );
    // this.setState({
    //     courseClassName: e.target.value,
    // })
  };

  // //学科选择
  // onSelectSubjectChange = (value) => {
  //   // console.log(value)
  // }
  // //年级选择
  // onSelectGradeChange = (value) => {
  //   // console.log(value)
  // }
  //选择教师
  onTeacherSelectClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    if (this.state.SubjectSelect.value === 0) {
      //   dispatch(
      //     actions.UpUIState.showErrorAlert({
      //       type: "warn",
      //       title: "请选择学科",
      //       ok: this.onAppAlertOK.bind(this),
      //       cancel: this.onAppAlertCancel.bind(this),
      //       close: this.onAppAlertClose.bind(this),
      //       onHide: this.onAlertWarnHide.bind(this)
      //     })
      //   );
      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    }

    dispatch(actions.UpUIState.AddTeacherModalOpen());
    dispatch(
      actions.UpDataState.getSubjectTeacherMsg(
        "/GetTeacherInfoBySubjectAndKey?key=&schoolID=" +
          this.state.UserMsg.SchoolID +
          "&subjectID=" +
          this.state.SubjectSelect.value
      )
    );
  };
  //选择教师模态框
  AddTeacherModalOk = () => {
    const { DataState, UIState, dispatch } = this.props;
    let teacher =
      Object.keys(
        DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher
      ).length !== 0
        ? DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher
        : DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher;

    dispatch(actions.UpDataState.setSubjectTeacherMsg(teacher));
    dispatch(actions.UpUIState.AddTeacherModalClose());
  };
  AddTeacherModalCancel = () => {
    const { DataState, UIState, dispatch } = this.props;
    let teacher =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher;

    //dispatch(actions.UpDataState.setSubjectTeacherMsg({}))

    dispatch(actions.UpUIState.AddTeacherModalClose());
  };
  //选择学生
  //选择教师模态框
  AddStudentModalOk = () => {
    const { DataState, UIState, dispatch } = this.props;
    let Student =
      DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;

    dispatch(actions.UpDataState.setCourseClassStudentMsg(Student));

    dispatch(actions.UpUIState.AddStudentModalClose());
  };
  AddStudentModalCancel = () => {
    const { DataState, UIState, dispatch } = this.props;

    let oldStudent =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent));
    //dispatch(actions.UpDataState.setSubjectTeacherMsg({}))

    dispatch(actions.UpUIState.AddStudentModalClose());
  };
  //删除学生
  onDeleteStudentClick = id => {
    const { DataState, UIState, dispatch } = this.props;

    let data = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    let newData = data.splice(id, 1);
    this.setState({
      tableSource: data
    });
    // console.log(id, newData);
    dispatch(actions.UpDataState.setCourseClassStudentMsg(data));
  };
  //清空
  onDeleteAllClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    this.setState({
      tableSource: []
    });
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //选择弹窗
  onSelectStudentAllClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    let UserMsg = DataState.LoginUser;
    if (this.state.SubjectSelect.value === 0) {
      //   dispatch(
      //     actions.UpUIState.showErrorAlert({
      //       type: "warn",
      //       title: "请选择学科",
      //       ok: this.onAppAlertOK.bind(this),
      //       cancel: this.onAppAlertCancel.bind(this),
      //       close: this.onAppAlertClose.bind(this),
      //       onHide: this.onAlertWarnHide.bind(this)
      //     })
      //   );
      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_OPEN });
      return;
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    if (this.state.GradeSelect.value === 0) {
      //   dispatch(
      //     actions.UpUIState.showErrorAlert({
      //       type: "warn",
      //       title: "请选择年级",
      //       ok: this.onAppAlertOK.bind(this),
      //       cancel: this.onAppAlertCancel.bind(this),
      //       close: this.onAppAlertClose.bind(this),
      //       onHide: this.onAlertWarnHide.bind(this)
      //     })
      //   );
      dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });
    }
    // console.log(';ll')
    dispatch(
      actions.UpDataState.getGradeClassMsg(
        "/GetStudentForAddOrEditCourseClassByInit?schoolID=" +
          UserMsg.SchoolID +
          "&gradeID=" +
          this.state.GradeSelect.value
      )
    );
    dispatch(actions.UpUIState.AddStudentModalOpen());
  };
  //选择学科
  onSelectSubjectChange = value => {
    const { DataState, UIState, dispatch } = this.props;
    // console.log(value)
    if (value.value !== this.state.SubjectSelect.value) {
      if(this.state.type === "Admin"){
        dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
      dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
      }
      dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
      dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
      dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
      dispatch(
        actions.UpDataState.setCourseClassDataMsg({
          Grade: {}
        })
      );
      this.setState({
        GradeSelect: { value: 0, title: "请选择年级" }
      });
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });

    this.setState({
      Subject: value,
      SubjectSelect: value
    });
    dispatch(actions.UpDataState.setCourseClassDataMsg({ Subject: value }));
  };
  //选择年级
  onSelectGradeChange = value => {
    const { DataState, UIState, dispatch } = this.props;
    // console.log(value)
    if (value.value !== this.state.GradeSelect.value) {
      dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
      dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
      dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
    }
    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });

    this.setState({
      GradeSelect: value
      // SubjectSelect: value
    });
    dispatch(actions.UpDataState.setCourseClassDataMsg({ Grade: value }));

    // if(this.state.Subject.value===0){
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没有选择学科哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    // }
  };

  //提示
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  render() {
    const { DataState, UIState } = this.props;
    //获取路由
    // console.log(this.props.type)
    if (!this.props.type) {
      return;
    }
    let type = this.props.type;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    //*************** */

    let SubjectSelect = { value: 0, title: "请选择学科" };
    let GradeSelect = { value: 0, title: "请选择年级" };
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    let SubjectDropList = [];
    let GradeDropList = [{ value: 0, title: "请选择年级" }];
    let tableSource = data.TableSource ? data.TableSource : [];
    let teacher = data.selectData
      ? data.selectData.Teacher.length !== 0
        ? data.selectData.Teacher
        : {}
      : {};
    if (type === "Admin") {
      let Subjects = DataState.GetCoureClassAllMsg.Subjects;

      for (let index in Subjects) {
        SubjectDropList.push({
          value: index,
          title: Subjects[index].subjectName
        });
        let Grade = [];
        for (let child in Subjects[index]) {
          if (child !== "subjectName") {
            Grade.push({
              value: child,
              title: Subjects[index][child]
            });
          }
        }
        GradeDropList[index] = Grade;
      }
    } else if (type === "Teacher") {
      let Subjects = DataState.GetTeacherSubjectAndGradeMsg.Subjects;

      Subjects.map((child, index) => {
        SubjectDropList.push({
          value: child.value,
          title: child.title
        });
        GradeDropList[child.value] = child.grade;
      });
    }

    console.log(this.state.SubjectSelect, this.state.GradeSelect);
    return (
      <React.Fragment>
        <div id="HandleCourseClass" className="HandleCourseClass">
          <div className="row clearfix">
            <div className="row-column">
              <span className="left">教学班名称：</span>
              <span className="right ">
                <Tips
                  overlayClassName="tips"
                  visible={UIState.AppTipsShow.nameTipsShow}
                  getPopupContainer={e => e.parentNode}
                  title={this.state.SubjectNameTipsTitle}
                >
                  {" "}
                  <Input
                    placeholder="请输入教学班名称..."
                    style={{ width: 180 + "px" }}
                    type="text"
                    maxLength={10}
                    onBlur={this.onCourseClassNameBlur.bind(this)}
                    onChange={this.onCourseClassNameChange.bind(this)}
                    value={this.state.courseClassName}
                  />
                </Tips>
              </span>
              {/* <span className='right text-style'>{data.CourseClassName}</span> */}
            </div>
            <div className="row-column">
              <span className="left">学科：</span>
              <span className="right ">
                {type !== "Teacher" ||
                DataState.GetTeacherSubjectAndGradeMsg.Subjects.length !== 1 ? (
                  <Tips
                    overlayClassName="tips"
                    visible={UIState.AppTipsShow.subjectTipsShow}
                    getPopupContainer={e => e.parentNode}
                    title={this.state.SubjectTipsTitle}
                  >
                    <DropDown
                      width={150}
                      height={98}
                      type="simple"
                      dropList={SubjectDropList}
                      dropSelectd={this.state.SubjectSelect}
                      onChange={this.onSelectSubjectChange.bind(this)}
                    ></DropDown>
                  </Tips>
                ) : (
                  <span
                    title={this.state.SubjectSelect.title}
                    className="noChange SubjectName"
                  >
                    {this.state.SubjectSelect.title}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="row clearfix">
            <div className="row-column">
              <span className="left">所属年级：</span>
              <span className="right ">
                <Tips
                  overlayClassName="tips"
                  visible={UIState.AppTipsShow.gradeTipsShow}
                  getPopupContainer={e => e.parentNode}
                  title={this.state.GradeTipsTitle}
                >
                  <DropDown
                    disabled={
                      this.state.SubjectSelect.value === 0 ? true : false
                    }
                    height={98}
                    width={180}
                    type="simple"
                    dropSelectd={this.state.GradeSelect}
                    dropList={
                      this.state.SubjectSelect.value === 0
                        ? []
                        : GradeDropList[this.state.SubjectSelect.value]
                    }
                    onChange={this.onSelectGradeChange.bind(this)}
                  ></DropDown>
                </Tips>
              </span>
            </div>
            <div className="row-column">
              <span className="left">任课老师：</span>
              {handleRoute !== "Teacher" ? (
                <span className="right">
                  <Input
                    readOnly
                    unselectable="on"
                    onClick={this.onTeacherSelectClick.bind(this)}
                    className=" selectTeacher"
                    type="text"
                    value={data.selectData ? data.selectData.Teacher.title : ""}
                    style={{ width: 150 + "px" }}
                    onChange={this.onCourseClassNameChange.bind(this)}
                  />
                  <span
                    onClick={this.onTeacherSelectClick.bind(this)}
                    className="teacher-select"
                  >
                    选择
                  </span>
                </span>
              ) : (
                <span className="right">
                  <span
                    title={data.selectData.Teacher.title}
                    className="noChange teacherName"
                  >
                    {data.selectData ? data.selectData.Teacher.title : ""}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="row clearfix">
            <div className=" row-column row-column-2">
              <span className="left">学生名单：</span>
              <span className="right right-2">
                <div className="Student-box">
                  <div className="box-top">
                    <span className="top-left">
                      已选
                      <span className="count">
                        {this.state.tableSource.length}
                      </span>
                      名学生
                    </span>
                    <span className="top-right">
                      <span
                        onClick={this.onSelectStudentAllClick.bind(this)}
                        className="handle select"
                      >
                        选择
                      </span>
                      <span
                        onClick={this.onDeleteAllClick.bind(this)}
                        className="handle deleteAll"
                      >
                        清空
                      </span>
                    </span>
                  </div>

                  <Scrollbars style={{ width: 100 + "%", height: 193 + "px" }}>
                    <div className="box-content">
                      {this.state.tableSource.map((child, index) => {
                        return (
                          <span className="content-card" key={child.StudentID}>
                            <span
                              title={child.StudentName}
                              className="card-name"
                            >
                              {child.StudentName}
                            </span>
                            <span title={child.StudentID} className="card-id">
                              {child.StudentID}
                            </span>

                            <span
                              onClick={this.onDeleteStudentClick.bind(
                                this,
                                index
                              )}
                              className="icon-x"
                            ></span>
                          </span>
                        );
                      })}
                    </div>
                  </Scrollbars>
                </div>
              </span>
            </div>
          </div>
        </div>
        <Modal
          ref="SelectTeacherMadal"
          type="1"
          width={680}
          title={"选择教师"}
          mask={false}
          bodyStyle={{ height: 525 + "px", padding: 0 }}
          visible={UIState.AddTeacherModalShow.Show}
          onOk={this.AddTeacherModalOk}
          onCancel={this.AddTeacherModalCancel}
        >
          {UIState.AddTeacherModalShow.Show ? (
            <SelectTeacher
              subject={this.state.SubjectSelect.value}
            ></SelectTeacher>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="SelectStudentMadal"
          type="1"
          width={680}
          mask={false}
          title={"选择学生"}
          bodyStyle={{ height: 477 + "px", padding: 0 }}
          visible={UIState.AddStudentModalShow.Show}
          onOk={this.AddStudentModalOk}
          onCancel={this.AddStudentModalCancel}
        >
          {UIState.AddStudentModalShow.Show ? (
            <SelectStudent></SelectStudent>
          ) : (
            ""
          )}
        </Modal>
      </React.Fragment>
    );
  }
}
AddCourseClass.defaultProps = {
  type: "Admin"
};
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(AddCourseClass);
