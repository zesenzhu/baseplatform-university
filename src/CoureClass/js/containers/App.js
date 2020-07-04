import React, { Component } from "react";
import { Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from "react-redux";
import TimeBanner from "../component/TimeBanner";
import CONFIG from "../../../common/js/config";
import deepCompare from "../../../common/js/public";

import {HashRouter as Router,Redirect,Route, Link, Switch} from "react-router-dom";
import history from "./history";
import Frame from "../../../common/Frame";

import logo from "../../images/image-MyClass.png";
import All from "../component/All";
import Subject from "../component/Subject";
import Search from "../component/Search";
import Class from "../component/Class";
import Dynamic from "../component/Dynamic";
import Record from "../component/Record";
import ImportFile from "../component/ImportFile";
import LogDetails from "../component/LogDetails";
import HandleCourseClass from "../component/HandleCourseClass";
import AddCourseClass from "../component/AddCourseClass";
import {
  TokenCheck_Connect,
  getUserInfo
} from "../../../common/js/disconnect";

import CourseClassDetails from "../component/CourseClassDetails";

import {changeBreadCrumb} from '../reducers/breadCrumb';

import Teacher from "../component/Teacher";

import Manager from './Manager/index';



import "../../scss/index.scss";

import { postData } from "../../../common/js/fetch";

import actions from "../actions";

import { QueryPower } from "../../../common/js/power";

const COURECLASS_MODULEID = "000-2-0-17"; //教学班管理

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      MenuParams: {},
      showBarner: true,
      showLeftMenu: true,
      UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
    };

    window.MenuClcik = this.MenuClcik.bind(this);



  }

/*  componentWillMount() {
    const { dispatch, DataState } = this.props;

    // 获取接口数据
    let route = history.location.pathname;
    // let UserMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
    let that = this;
    //判断token是否存在
    TokenCheck_Connect(false, () => {

      let token = sessionStorage.getItem("token");

      let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      let UserType = UserInfo.UserType;

      if (parseInt(UserType)===7||parseInt(UserType)===10){

          UserInfo.UserType = '0';

      }

      if (sessionStorage.getItem("UserInfo")) {


        dispatch(
          actions.UpDataState.getLoginUser(
              UserInfo
          )
        );
        that.setState({
          UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
        });

        that.requestData(route);

      } else {

        let timeRun = setInterval(function() {
          if (sessionStorage.getItem("UserInfo")) {

              let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

              let UserType = UserInfo.UserType;

              if (parseInt(UserType)===7||parseInt(UserType)===10){

                  UserInfo.UserType = 0;

              }

            dispatch(
              actions.UpDataState.getLoginUser(
                  UserInfo
              )
            );
            that.setState({
              UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
            })

            that.requestData(route);

            clearInterval(timeRun);

          }
        }, 1000);

      }
      history.listen(() => {
        //路由监听
        let route = history.location.pathname;

        that.requestData(route);

      });
    });
  }*/


  pageInit(){

      const { dispatch, DataState } = this.props;

      // 获取接口数据
      let route = history.location.pathname;
      // let UserMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
      let that = this;

      let token = sessionStorage.getItem("token");

      let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      let UserType = UserInfo.UserType;

      if (parseInt(UserType)===7||parseInt(UserType)===10){

          UserInfo.UserType = '0';

      }

      dispatch(
          actions.UpDataState.getLoginUser(
              UserInfo
          )
      );
      that.setState({
          UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
      });

      that.requestData(route);

      history.listen(() => {
          //路由监听
          let route = history.location.pathname;

          that.requestData(route);

      });

  }


  componentWillReceiveProps(nextProps) {

    this.setState({
      MenuParams: nextProps.DataState.GetCoureClassAllMsg.MenuParams
    });

    if(history.location.pathname.split('/')[1]==='ImportFile'){

      this.setState({showBarner: false,
          showLeftMenu: false});

    }

      if(history.location.pathname.split('/')[1]==='Log'){

          this.setState({showBarner: false,
              showLeftMenu: false});

      }



  }

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



  // 请求每个组件主要渲染的数据
  requestData = route => {
    const { dispatch, DataState } = this.props;
    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }

    let UserMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));



      const { UserType } = JSON.parse(sessionStorage.getItem("UserInfo"));

      if (parseInt(UserType)===7||parseInt(UserType)===10){

          console.log(UserMsg,this.state.UserMsg);
          let SubjectID = DataState.GetCoureClassAllMsg.Subject;
          let GradeID = DataState.GetCoureClassAllMsg.Grade;

          let pathArr = route.split("/");
          let handleRoute = pathArr[1];
          let routeID = pathArr[2];
          let subjectID = pathArr[3];
          let classID = pathArr[4];

          if (UserMsg.UserType==='0'&&handleRoute==='manager'){

              this.setState({
                  showBarner: true,
                  showLeftMenu: true
              });

          }else if (
              (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
              handleRoute === "Log"
          ) {

              this.setState({
                  showBarner: true,
                  showLeftMenu: true
              });

              if (routeID === "Record") {
                  dispatch(
                      actions.UpDataState.getCourseClassRecordMsg(
                          "/GetGourseClassLogForPage?userID=" +
                          UserMsg.UserID +
                          "&userType=" +
                          UserMsg.UserType +
                          "&schoolID=" +
                          UserMsg.SchoolID +
                          "&startDate=" +

                          "&endDate=" +

                          "&operateType=0"
                      )
                  );
              } else {
                  dispatch(
                      actions.UpDataState.getCourseClassDynamicMsg(
                          "/GetGourseClassLogNew?userID=" +
                          UserMsg.UserID +
                          "&userType=" +
                          UserMsg.UserType +
                          "&schoolID=" +
                          UserMsg.SchoolID +
                          "&startDate=" +
                          "&endDate=" +
                          "&operateType=0"
                      )
                  );
              }

              dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

          }else if (handleRoute === "ImportFile") {
              this.setState({
                  showBarner: false,
                  showLeftMenu: false
              });
          }

      }else{

          let havePower = QueryPower({
              UserInfo: UserMsg,
              ModuleID: COURECLASS_MODULEID
          });

          havePower.then(res => {

              if (res) {
                  let SubjectID = DataState.GetCoureClassAllMsg.Subject;
                  let GradeID = DataState.GetCoureClassAllMsg.Grade;

                  let pathArr = route.split("/");
                  let handleRoute = pathArr[1];
                  let routeID = pathArr[2];
                  let subjectID = pathArr[3];
                  let classID = pathArr[4];

                  /*if (UserMsg.UserType === "0" || UserMsg.UserType === "7")
                    dispatch(
                      actions.UpDataState.getCoureClassAllMsg(
                        "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
                        this.MenuClcik
                      )
                    );

                  dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                  if (route === "/") {
                    if (UserMsg.UserType === "1") {
                      history.push("/Teacher");
                      return;
                    } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
                      history.push("/All");
                    } else {
                      console.log("用户没有权限访问");
                      return;
                    }

                  } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "All"
                  ) {
                    dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg("all"));
                    dispatch(
                      actions.UpDataState.getCoureClassAllMsg(
                        "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
                        this.MenuClcik
                      )
                    );
                    this.setState({
                      showBarner: true,
                      showLeftMenu: true
                    });
                  } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Subject" &&
                    subjectID === "all"
                  ) {
                    dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
                    //if (DataState.getSubjectAllMsg[routeID] === undefined)
                    dispatch(
                      actions.UpDataState.getSubjectAllMsg(
                        "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                        routeID
                      )
                    );
                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));
                    this.setState({
                      showBarner: true,
                      showLeftMenu: true
                    });
                  } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Subject" &&
                    subjectID === "Class"
                  ) {

                    this.setState({
                      showBarner: true,
                      showLeftMenu: true
                    });
                    dispatch(
                      actions.UpDataState.getSubjectAllMsg(
                        "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                        routeID
                      )
                    );
                    dispatch(
                      actions.UpDataState.getClassAllMsg(
                        "/GetGradeCouseclassDetailForPage?schoolID=" +
                          UserMsg.SchoolID +
                          "&key=&pageIndex=1&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                          routeID +
                          "&gradeID=" +
                          classID,
                        routeID,
                        classID
                      )
                    );

                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg(classID, routeID));
                  } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Search"
                  ) {

                    this.setState({
                      showBarner: true,
                      showLeftMenu: true
                    });
                    dispatch(
                      actions.UpDataState.getClassAllMsg(
                        "/GetGradeCouseclassDetailForPage?schoolID=" +
                          UserMsg.SchoolID +
                          "&key=" +
                          routeID +
                          "&pageIndex=1&pageSize="+DataState.SetPagiSizeMsg.SearchPagisize+"&subjectID=" +

                          "&gradeID="

                      )
                    );
                  } else */


                  if (UserMsg.UserType==='0'&&handleRoute==='manager'){

                      this.setState({
                          showBarner: true,
                          showLeftMenu: true
                      });

                  }else if (
                      (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                      handleRoute === "Log"
                  ) {

                      this.setState({
                          showBarner: true,
                          showLeftMenu: true
                      });

                      if (routeID === "Record") {
                          dispatch(
                              actions.UpDataState.getCourseClassRecordMsg(
                                  "/GetGourseClassLogForPage?userID=" +
                                  UserMsg.UserID +
                                  "&userType=" +
                                  UserMsg.UserType +
                                  "&schoolID=" +
                                  UserMsg.SchoolID +
                                  "&startDate=" +

                                  "&endDate=" +

                                  "&operateType=0"
                              )
                          );
                      } else {
                          dispatch(
                              actions.UpDataState.getCourseClassDynamicMsg(
                                  "/GetGourseClassLogNew?userID=" +
                                  UserMsg.UserID +
                                  "&userType=" +
                                  UserMsg.UserType +
                                  "&schoolID=" +
                                  UserMsg.SchoolID +
                                  "&startDate=" +
                                  "&endDate=" +
                                  "&operateType=0"
                              )
                          );
                      }

                      dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

                  } else if (UserMsg.UserType === "1" && handleRoute === "Teacher") {
                      this.setState({
                          showBarner: true,
                          showLeftMenu: false
                      });

                      dispatch(
                          actions.UpDataState.getTeacherCourseClassMsg(
                              "/GetCourseClassByUserID?schoolID=" +
                              UserMsg.SchoolID +
                              "&teacherID=" +
                              UserMsg.UserID
                          )
                      );

                      /*dispatch(
                        actions.UpDataState.getSubjectAndGradeInfoForTeacher(
                          "/GetSubjectAndGradeInfoForTeacher?schoolID=" +
                            UserMsg.SchoolID +
                            "&userID=" +
                            UserMsg.UserID
                        )
                      );*/
                  } else if (handleRoute === "ImportFile") {
                      this.setState({
                          showBarner: false,
                          showLeftMenu: false
                      });
                  } /*else {
          if (UserMsg.UserType === "1") {
            history.push("/Teacher");
          } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
            history.push("/All");
          } else {
            console.log("用户没有权限访问");
            return;
          }
        }*/
              }
          });

      }



  };

  MenuClcik = (id, type, sub = null) => {

    if (type === "All") {
      history.push("/All");
    } else if (type === "Subject") {
      history.push("/Subject/" + id + "/all");
    } else if (type === "Class") {
      history.push("/Subject/" + sub + "/Class/" + id);
    }

  };

  //模态框关闭
  CourseClassDetailsModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.CourseClassDetailsModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  CourseClassDetailsModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.CourseClassDetailsModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  //日志模态框关闭
  LogDetailsModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.LogDetailsModalClose());
  };
  LogDetailsModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.LogDetailsModalClose());
  };
  //编辑教学班模态框
  ChangeCourseClassModalOk = () => {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let SubjectID = DataState.GetCoureClassAllMsg.Subject;
    let GradeID = DataState.GetCoureClassAllMsg.Grade;
    let pageIndex = DataState.GetClassAllMsg.allClass.pageIndex;
    let isFalse = false;


    if (
      data.selectData.Teacher.value === data.TeacherID &&
      data.selectData.CourseClass.CourseClassName === data.CourseClassName &&

      JSON.stringify(data.selectData.Student)===JSON.stringify(data.TableSource)
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教学班信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
        })
      );
      return;
    }
    let value = data.selectData.CourseClass.CourseClassName;
    if (value === "") {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true
    }
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);
    if (!Test) {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true
    }
    if(isFalse){
      return
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });
    let courseClassStus = data.selectData.Student.map((child, index) => {
      return child.StudentID;
    }).join();
    let url = "/InsertOrEditCourseClass";

    postData(
      CONFIG.CourseClassProxy + url,
      {
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        schoolID: userMsg.SchoolID,
        courseClassName: data.selectData.CourseClass.CourseClassName,
        teacherID: data.selectData.Teacher.value,
        gradeID: data.GradeID,
        subjectID: data.SubjectID,
        courseClassStus: courseClassStus,
        courseClassID: data.selectData.CourseClass.CourseClassID
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          if (userMsg.UserType === "0") {
            if (handleRoute === "Search") {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=" +
                    routeID +
                    "&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +

                    "&gradeID=" 

                )
              );
            } else {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                    routeID +
                    "&gradeID=" +
                    classID,
                  routeID,
                  classID
                )
              );
            }
          } else if (userMsg.UserType === "1") {
            history.push("/Teacher");
          }
        }
      });
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
    dispatch(actions.UpUIState.ChangeCourseClassModalClose());
    dispatch(actions.UpDataState.setCourseClassName([]));
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  ChangeCourseClassModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpDataState.setCourseClassName({}));
    dispatch(actions.UpDataState.setCourseClassStudentMsg({}));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg({}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({}));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg({}));
    dispatch(
      actions.UpDataState.setCourseClassDataMsg({
        Subject: {},
        Grade: {},
        Teacher: [],
        Student: []
      })
    );
    dispatch(actions.UpUIState.ChangeCourseClassModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  //添加教学班模态框
  AddCourseClassModalOk = () => {
    const { dispatch, DataState } = this.props;
    let Student =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    let userMsg = DataState.LoginUser;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let pageIndex = DataState.GetClassAllMsg.allClass.pageIndex;
    let isFalse = false

    if (data.selectData.CourseClass.CourseClassName === "") {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
      isFalse = true
    }
    let value = data.selectData.CourseClass.CourseClassName;
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);
    if (value === "" || value === undefined || !Test) {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true

    }

    if (
      data.selectData.Subject &&
      data.selectData.Subject instanceof Object &&
      !data.selectData.Subject.value
    ) {
     
      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_OPEN });

      isFalse = true

    }

    if (
      data.selectData.Grade &&
      data.selectData.Grade instanceof Object &&
      !data.selectData.Grade.value
    ) {

      dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_OPEN });


      isFalse = true

    }

    if(isFalse){
      return
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });


    let courseClassStus = data.selectData.Student.map((child, index) => {
      return child.StudentID;
    }).join();
    let url = "/InsertOrEditCourseClass";


    postData(
      CONFIG.CourseClassProxy + url,
      {
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        schoolID: userMsg.SchoolID,
        courseClassName: data.selectData.CourseClass.CourseClassName,
        teacherID: data.selectData.Teacher.value,
        gradeID: data.selectData.Grade.value,
        subjectID: data.selectData.Subject.value,
        courseClassStus: courseClassStus,
        courseClassID: ""
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {

        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          if (userMsg.UserType === "0") {
            if (handleRoute === "Search") {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=" +
                    routeID +
                    "&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.SearchPagisize+"&subjectID=" +

                    "&gradeID=" 

                )
              );
            } else {
              if(classID){
                dispatch(
                  actions.UpDataState.getClassAllMsg(
                    "/GetGradeCouseclassDetailForPage?schoolID=" +
                      this.state.UserMsg.SchoolID +
                      "&key=&pageIndex=" +
                      pageIndex +
                      "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                      routeID +
                      "&gradeID=" +
                      classID,
                    routeID,
                    classID
                  )
                );
              }else if(routeID){
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });

                dispatch(
                  actions.UpDataState.getSubjectAllMsg(
                    "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                    routeID
                  )
                );
              }else{
                dispatch(
                  actions.UpDataState.getCoureClassAllMsg(
                    "/GetCouseclassSumarry?schoolID=" + this.state.UserMsg.SchoolID,
                    this.MenuClcik
                  )
                );
              }
              
            }
          } else if (userMsg.UserType === "1") {
            history.push("/Teacher");
          }
        }
      });
    dispatch(actions.UpUIState.AddCourseClassModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });

    dispatch(actions.UpDataState.setCourseClassName({ CourseClassName: "" }));
    dispatch(
      actions.UpDataState.setCourseClassDataMsg({
        Subject: {},
        Grade: {},
        Teacher: [],
        Student: []
      })
    );
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
  };
  AddCourseClassModalCancel = () => {
    const { dispatch, DataState } = this.props;
    let Student = DataState.GetCourseClassDetailsHandleClassMsg.TableSource;
    let Teacher = {
      value: DataState.GetCourseClassDetailsHandleClassMsg.TeacherID,
      title: DataState.GetCourseClassDetailsHandleClassMsg.TeacherName
    };
    dispatch(actions.UpUIState.AddCourseClassModalClose());
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };

  menuClick({id,name}){

    const { dispatch,breadCrumb } = this.props;

    const path  = history.location.pathname;

    const state = path.split('/')[2];

    if (state==='subject'){ //判断是在学科管理下还是学院管理下

        let step = id==='all'?1:2;

        dispatch(changeBreadCrumb({step,subject:{...breadCrumb.subject,activeSub:{id,name}}}));

    }else{

        let step = id==='all'?1:2;

        dispatch(changeBreadCrumb({step,college:{...breadCrumb.college,activeCollege:{id,name}}}));

    }

  }

  render() {
    const { UIState, DataState,leftMenu } = this.props;
    let {UserID,UserType,UserClass} = DataState.LoginUser;

    if (DataState.GetCoureClassAllMsg.isError) {

      window.location.href = "/html/CoureClass#/All";
    }
    let route = history.location.pathname.split("/");
    let cnname = "教学班管理";
    let enname = "CoureClass Management";
    if (route[1] === "Teacher") {
      cnname = "我的教学班管理";
      enname = "My class Management";
    }
    return (
      <React.Fragment>
        <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
            <Router>
             <Frame
           /* userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath
            }}*/
            pageInit={this.pageInit.bind(this)}

            module={{
              cnname: cnname,
              enname: enname,
              image: logo
            }}
            type="triangle"
            showBarner={this.state.showBarner}
            showLeftMenu={this.state.showLeftMenu}
          >
            <div ref="frame-time-barner">
              <TimeBanner key={history.location.pathname}/>
            </div>

            <div ref="frame-left-menu">
              {/*<Menu params={DataState.GetCoureClassAllMsg.MenuParams}></Menu>*/}

                <LeftMenu Menu={leftMenu} menuClick={this.menuClick.bind(this)}></LeftMenu>

            </div>

            <div ref="frame-right-content">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.rightLoading}
              >
               {

                 UserID?

                    <>

                     {

                         parseInt(UserType)===0||(parseInt(UserType)===7&&parseInt(UserClass)===2)?

                             <Switch>

                                   <Route exact path="/ImportFile" component={ImportFile}></Route>

                                   <Route path={'/manager'} component={Manager}></Route>

                                   <Route path="/Log/Record" component={Record}></Route>

                                   <Route path="/Search/:value" key={history.location.pathname}  component={Search}></Route>

                                   <Route path="/Log/Dynamic" component={Dynamic}></Route>

                                   <Redirect path={"/"} to={"/manager/subject/all"}></Redirect>

                             </Switch>

                             :''

                     }

                     {

                         parseInt(UserType)===1?

                             <Switch>

                               <Route exact path="/ImportFile" component={ImportFile}></Route>

                               <Route path="/Teacher" component={Teacher}></Route>

                               <Redirect path={"/"} to={"/Teacher"}></Redirect>

                             </Switch>

                         :''

                     }

                     {/*<Route path="/All" exact component={All}></Route>
            <Route
              path="/Subject/:subjectID/all"
              component={Subject}
            ></Route>
            <Route
              path="/Subject/:subjectID/Class/:classID"
              component={Class}
            ></Route>
            <Route path="/Search" component={Search}></Route>
            <Route path="/Log/Record" component={Record}></Route>
            <Route path="/Log/Dynamic" component={Dynamic}></Route>
            <Route path="/ImportFile" component={ImportFile}></Route>*/}

                  </>

                 :''

                }

              </Loading>
            </div>
          </Frame>

            </Router>

        </Loading>
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
          abstract={UIState.AppAlert.littleTitle}
          title={UIState.AppAlert.title}
          onOk={UIState.AppAlert.onOk}
          onHide={UIState.AppAlert.onHide}
          onCancel={UIState.AppAlert.onCancel}
          onClose={UIState.AppAlert.onClose}
          okShow={UIState.AppAlert.okShow}
          cancelShow={UIState.AppAlert.cancelShow}
          okTitle={UIState.AppAlert.okTitle}
          cancelTitle={UIState.AppAlert.cancelTitle}
        >

        </Alert>

        {/* 模态框 */}
        <Modal
          ref="CourseClassDetailsMadal"
          bodyStyle={{ padding: 0 }}
          width={720}
          type="1"
          destroyOnClose={true}
          title={"教学班详情"}
          visible={
            UIState.SetCourseClassDetailsModalShow
              .setCourseClassDetailsMadalShow
          }
          onOk={this.CourseClassDetailsModalOk}
          onCancel={this.CourseClassDetailsModalCancel}
        >
          <Loading
            wrapperClassName="Detail-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            <CourseClassDetails></CourseClassDetails>
          </Loading>
        </Modal>
        <Modal
          ref="CourseClassDetailsMadal"
          type="1"
          width={800}

          destroyOnClose={true}
          title={"编辑教学班"}
          bodyStyle={{ height: 405 + "px", padding: 0 }}

          visible={UIState.ChangeCourseClassModalShow.Show}
          onOk={this.ChangeCourseClassModalOk}
          onCancel={this.ChangeCourseClassModalCancel}
        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            <HandleCourseClass></HandleCourseClass>

          </Loading>
        </Modal>
        <Modal
          ref="AddCourseClassDetailsMadal"
          type="1"
          width={800}

          destroyOnClose={true}
          title={"添加教学班"}
          bodyStyle={{ height: 405 + "px", padding: 0 }}


          visible={UIState.AddCourseClassModalShow.Show}
          onOk={this.AddCourseClassModalOk}
          onCancel={this.AddCourseClassModalCancel}
        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            {UIState.AddCourseClassModalShow.Show ? (
              <AddCourseClass
                type={
                  DataState.LoginUser.UserType === "0"
                    ? "Admin"
                    : DataState.LoginUser.UserType === "1"
                    ? "Teacher"
                    : false
                }
              ></AddCourseClass>
            ) : (
              ""
            )}
          </Loading>
        </Modal>
        <Modal
          ref="LogDetailsMadal"
          type="1"
          width={720}
          title={"教学班调整详情"}
          bodyStyle={{ height: 532 + "px", padding: 0 }}
          visible={UIState.LogDetailsModalShow.Show}
          footer={null}
          destroyOnClose={true}
          onOk={this.LogDetailsModalOk}
          onCancel={this.LogDetailsModalCancel}
        >
          <LogDetails></LogDetails>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState,leftMenu,breadCrumb } = state;
  return {
    UIState,
    DataState,
    leftMenu,
    breadCrumb
  };
};
export default connect(mapStateToProps)(App);
