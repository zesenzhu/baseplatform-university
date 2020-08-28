import React, { Component } from "react";
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from "react-redux";
import UserArchives from "../component/UserArchives";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
import config from "../../../common/js/config";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "./history";
import RegisterExamine from "../component/RegisterExamine";
import TeacherRegisterExamine from "../component/TeacherRegisterExamine";
import ImportFile from "../component/ImportFile";
// import logo from '../../images/admAriHeadImg-1.png'
// import TimeBanner from '../component/TimeBanner'
// import All from '../component/All'
// import Student from '../component/Student'
// import Teacher from '../component/Teacher'
// import Leader from '../component/Leader'
import "../../scss/index.scss";
import $ from "jquery";
import { getData } from "../../../common/js/fetch";
import actions from "../actions";
import { urlAll, proxy } from "./config";
import { QueryPower, QueryAdminPower } from "../../../common/js/power";

const PROFILE_MODULEID = "000-2-0-05"; //用户档案管理模块ID

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      AdminPower: true,
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    TokenCheck_Connect(false, () => {
      // console.log('sss')
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        let Info = JSON.parse(sessionStorage.getItem("UserInfo"));
        if (Info.UserType === "7" || Info.UserType === "10") {
          Info.UserType = "7";
          Info.UserClass = "2";
        }
        dispatch(actions.UpDataState.getLoginUser(Info));
        that.requestRegister();
        that.requestData(route);
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function () {
          if (sessionStorage.getItem("UserInfo")) {
            let Info = JSON.parse(sessionStorage.getItem("UserInfo"));
            if (Info.UserType === "7" || Info.UserType === "10") {
              Info.UserType = "7";
              Info.UserClass = "2";
            }
            dispatch(actions.UpDataState.getLoginUser(Info));
            that.requestRegister();

            that.requestData(route);
            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
    });
  }

  componentWillMount() {
    const { dispatch } = this.props;
    this.handleMenu();
    let route = history.location.pathname;
    // 获取接口数据
    getData(config.PicProxy + "/Global/GetResHttpServerAddr")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //console.log(json.StatusCode)
        } else if (json.StatusCode === 200) {
          // console.log(json)
          dispatch({ type: actions.UpDataState.GET_PIC_URL, data: json.Data });
        }
      });
    // this.requestData(route);
    if (
      history.location.pathname === "/" ||
      history.location.pathname === "/UserArchives"
    ) {
      history.push("/UserArchives/All");
      // console.log(this.state)
    }
    if (history.location.pathname === "/RegisterExamine") {
      history.push("/RegisterExamine/RegisterWillExamine");
      // console.log(this.state)
    }
    if (history.location.pathname === "/TeacherRegisterExamine") {
      history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
      // console.log(this.state)
    }

    history.listen(() => {
      //路由监听
      let route = history.location.pathname;
      // 获取接口数据
      this.requestData(route);

      if (
        history.location.pathname === "/" ||
        history.location.pathname === "/UserArchives"
      ) {
        history.push("/UserArchives/All");
        // console.log(this.state)
      }
      if (history.location.pathname === "/RegisterExamine") {
        history.push("/RegisterExamine/RegisterWillExamine");
        // console.log(this.state)
      }
      if (history.location.pathname === "/TeacherRegisterExamine") {
        history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
        // console.log(this.state)
      }
    });

    // 获取人脸库地址
    dispatch(actions.UpDataState.GetSubSystemsMainServerBySubjectID());
  }
  componentWillUpdate() {}
  componentDidUpdate() {}

  requestRegister() {
    const { dispatch, DataState } = this.props;

    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    if (userMsg.UserType === "0" || userMsg.UserType === "7") {
      if (handleRoute === "RegisterDidExamine") {
        dispatch(
          actions.UpDataState.getDidSignUpLog(
            "/GetSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1" +
              (DataState.GetSignUpLog.Grade.value !== 0
                ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
                : "") +
              (DataState.GetSignUpLog.College.value !== 0
                ? "&collegeID=" + DataState.GetSignUpLog.College.value
                : "") +
              (DataState.GetSignUpLog.Major.value !== 0
                ? "&majorID=" + DataState.GetSignUpLog.Major.value
                : "") +
              (DataState.GetSignUpLog.Class.value !== 0
                ? "&classID=" + DataState.GetSignUpLog.Class.value
                : "")
          )
        );
      } else if (handleRoute === "RegisterWillExamine") {
        dispatch(
          actions.UpDataState.getWillSignUpLog(
            "/GetSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0" +
              (DataState.GetSignUpLog.Grade.value !== 0
                ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
                : "") +
              (DataState.GetSignUpLog.College.value !== 0
                ? "&collegeID=" + DataState.GetSignUpLog.College.value
                : "") +
              (DataState.GetSignUpLog.Major.value !== 0
                ? "&majorID=" + DataState.GetSignUpLog.Major.value
                : "") +
              (DataState.GetSignUpLog.Class.value !== 0
                ? "&classID=" + DataState.GetSignUpLog.Class.value
                : "")
          )
        );
      }
      if (handleRoute === "TeacherRegisterDidExamine") {
        dispatch(
          actions.UpDataState.getTeacherDidSignUpLog(
            "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1" +
              (DataState.GetTeacherSignUpLog.Group.value !== 0
                ? "&groupID=" + DataState.GetTeacherSignUpLog.Group.value
                : "") +
              (DataState.GetTeacherSignUpLog.College.value !== 0
                ? "&collegeID=" + DataState.GetTeacherSignUpLog.College.value
                : "")
          )
        );
      } else if (handleRoute === "TeacherRegisterWillExamine") {
        dispatch(
          actions.UpDataState.getTeacherWillSignUpLog(
            "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0" +
              (DataState.GetTeacherSignUpLog.Group.value !== 0
                ? "&gradeID=" + DataState.GetTeacherSignUpLog.Group.value
                : "") +
              (DataState.GetTeacherSignUpLog.College.value !== 0
                ? "&collegeID=" + DataState.GetTeacherSignUpLog.College.value
                : "")
          )
        );
      }
    } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
      let TeacherClass = DataState.GradeClassMsg.TeacherClass;
      if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
        return;
      }
      // console.log("11");
      if (handleRoute === "RegisterDidExamine") {
        dispatch(
          actions.UpDataState.getDidSignUpLog(
            "/GetSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1&classID=" +
              TeacherClasses.value
          )
        );
      } else if (handleRoute === "RegisterWillExamine") {
        dispatch(
          actions.UpDataState.getWillSignUpLog(
            "/GetSignUpLogToPage_univ?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0&classID=" +
              TeacherClasses.value
          )
        );
      }
    }
  }
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    // window.location.href = "/html/login"
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
  requestData = (route) => {
    const { dispatch, DataState } = this.props;
    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }
    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let havePower = QueryPower({
      UserInfo: userMsg,
      ModuleID: PROFILE_MODULEID,
    });
    let { LockerVersion } = JSON.parse(
      //校园基础信息管理 XG5.2-免费版,1为基础版
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(
          //校园基础信息管理 XG5.2-免费版,1为基础版
          sessionStorage.getItem("LgBasePlatformInfo")
        )
      : {};
    havePower.then((res) => {
      // console.log(res)
      if (res) {
        let AdminPower = true;
        if (userMsg.UserType === "7" && userMsg.UserClass === "2") {
          AdminPower = false;
        }
        // let pathname = history.location.pathname;

        let pathArr = route.split("/");
        let handleRoute = pathArr[2];
        let ID = pathArr[3];
        // console.log(pathArr);
        // console.log('ddd')
        if (
          (userMsg.UserType === "0" || userMsg.UserType === "7") &&
          (route === "/" || route.split("/")[1] === "UserArchives")
        ) {
          // dispatch(actions.UpDataState.getAllUserPreview('/GetSummary'));
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          if (handleRoute) {
            //dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (handleRoute === "Student") {
              // if (!Object.keys(DataState.GradeClassMsg.returnData).length)
              // console.log('sss')
              // if (DataState.GradeClassMsg.College.length <= 1) {
              dispatch(
                actions.UpDataState.getTree_Univ(
                  "/GetTree_Univ?schoolID=" + userMsg.SchoolID,
                  ID
                  // + (userMsg.UserType||userMsg.UserType===6?"":'&collegeID='+userMsg.CollegeID)
                )
              );
              // }
              dispatch(
                actions.UpDataState.getWillSignUpLog(
                  "/GetSignUpLogToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&PageIndex=0&PageSize=10&status=0"
                )
              );
              if (ID === "all") {
                dispatch(
                  actions.UpDataState.getUnivStudentPreview(
                    "/GetStudentToPage_Univ?SchoolID=" +
                      userMsg.SchoolID +
                      (userMsg.UserClass === "1" || userMsg.UserClass === "2"
                        ? ""
                        : "&collegeID=" + userMsg.CollegeID) +
                      "&PageIndex=0&PageSize=10"
                  )
                );
              } else {
                // console.log("sss");
                dispatch(
                  actions.UpDataState.getUnivStudentPreview(
                    "/GetStudentToPage_Univ?SchoolID=" +
                      userMsg.SchoolID +
                      (userMsg.UserClass === "1" || userMsg.UserClass === "2"
                        ? "&collegeID=" + ID
                        : "&collegeID=" +
                          userMsg.CollegeID +
                          "&majorID=" +
                          ID) +
                      "&PageIndex=0&PageSize=10",
                    userMsg.UserClass === "1" || userMsg.UserClass === "2"
                      ? DataState.GradeClassMsg.CollegeArray[ID]
                      : DataState.GradeClassMsg.CollegeArray[userMsg.CollegeID],
                    userMsg.UserClass === "1" || userMsg.UserClass === "2"
                      ? { value: 0, title: "全部专业" }
                      : DataState.GradeClassMsg.Majors[ID]
                  )
                );
                console.log(DataState.GradeClassMsg.CollegeArray[ID]);
              }
            } else if (handleRoute === "Teacher") {
              // console.log("Teacher：" + DataState.SubjectTeacherMsg.returnData);
              // if (!DataState.SubjectTeacherMsg.returnData || ID !== "all") {
              //学科信息
              // console.log(ID);
              dispatch(
                actions.UpDataState.getTeacherWillSignUpLog(
                  "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&PageIndex=0&PageSize=10&status=0"
                )
              );
              dispatch(
                actions.UpDataState.GetCollegeGroup_Univ(
                  "/GetCollegeGroup_Univ?schoolID=" + userMsg.SchoolID,
                  ID
                )
              );
              dispatch(
                actions.UpDataState.getSubjectTeacherMsg_univ(
                  "/GetSubject_univ?schoolID=" + userMsg.SchoolID
                )
              );
              // }

              //职称
              dispatch(
                actions.UpDataState.GetTitle_univ(
                  "/GetTitle_univ?schoolID=" + userMsg.SchoolID
                )
              );

              // console.log(ID);
              if (ID === "all") {
                // dispatch(
                //   actions.UpDataState.getSubjectTeacherPreview(
                //     "/GetTeacherToPage?SchoolID=" +
                //       userMsg.SchoolID +
                //       "&SubjectIDs=all&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC"
                //   )
                // );
                dispatch(
                  actions.UpDataState.GetTeacherToPage_univ(
                    "/GetTeacherToPage_univ?SchoolID=" +
                      userMsg.SchoolID +
                      "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC" +
                      (userMsg.UserClass === "1" || userMsg.UserClass === "2"
                        ? ""
                        : "&collegeID=" + userMsg.CollegeID)
                  )
                );
              } else {
                // dispatch(
                //   actions.UpDataState.getSubjectTeacherPreview(
                //     "/GetTeacherToPage?SchoolID=" +
                //       userMsg.SchoolID +
                //       "&SubjectIDs=" +
                //       ID +
                //       "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC",
                //     ID
                //   )
                // );
                dispatch(
                  actions.UpDataState.GetTeacherToPage_univ(
                    "/GetTeacherToPage_univ?SchoolID=" +
                      userMsg.SchoolID +
                      "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC" +
                      (userMsg.UserClass === "1" || userMsg.UserClass === "2"
                        ? "&collegeID=" + ID
                        : "&collegeID=" + userMsg.CollegeID + "&majorID=" + ID),
                    userMsg.UserClass === "1" || userMsg.UserClass === "2"
                      ? DataState.SubjectTeacherMsg.CollegeArray[ID]
                      : DataState.SubjectTeacherMsg.CollegeArray[
                          userMsg.CollegeID
                        ],
                    userMsg.UserClass === "1" || userMsg.UserClass === "2"
                      ? { value: 0, title: "全部教研室" }
                      : DataState.SubjectTeacherMsg.Group[ID]
                  )
                );
              }
            } else if (handleRoute === "Leader") {
              if (!AdminPower) {
                history.push("/UserArchives/All");
                return;
              }
              dispatch(
                actions.UpDataState.GetCollege_Univ(
                  "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
                )
              );
              dispatch(
                actions.UpDataState.GetSchoolLeader_univ(
                  "/GetSchoolLeader_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&userType=" +
                    (userMsg.UserClass === "1" || userMsg.UserClass === "2"
                      ? "-1"
                      : "10") +
                    "&collegeID=" +
                    // +( userMsg.userType === '0'
                    // ? userMsg.CollegeID
                    // : "")
                    "&SortFiled=UserID&SortType=ASC"
                )
              );
            } else if (handleRoute === "Graduate") {
              if (LockerVersion !== "1") {
                dispatch(
                  actions.UpDataState.GetTreeOfGraduate_univ(
                    "/GetTreeOfGraduate_univ?SchoolID=" + userMsg.SchoolID
                  )
                );
                dispatch(
                  actions.UpDataState.getGraduatePreview(
                    "/GetGraduate_Univ?PageIndex=0&PageSize=10&schoolID=" +
                      userMsg.SchoolID
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "LogDynamic") {
              if (LockerVersion !== "1") {
                if (!AdminPower) {
                  history.push("/UserArchives/All");
                  return;
                }
                dispatch(
                  actions.UpDataState.GetCollege_Univ(
                    "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
                  )
                );
                dispatch(actions.UpUIState.RightLoadingOpen());

                dispatch(
                  actions.UpDataState.getUnreadLogPreview(
                    "/GetUnreadLogToPage_univ?UserType=-1&CollegeID=&OperationType=-1&PageIndex=0&PageSize=10&OnlineUserID=" +
                      userMsg.UserID
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "LogRecord") {
              if (LockerVersion !== "1") {
                if (!AdminPower) {
                  history.push("/UserArchives/All");
                  return;
                }
                dispatch(
                  actions.UpDataState.GetCollege_Univ(
                    "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
                  )
                );
                dispatch(actions.UpUIState.RightLoadingOpen());
                dispatch(
                  actions.UpDataState.getLogRecordPreview(
                    "/GetAllLogToPage_univ?SchoolID=" +
                      userMsg.SchoolID +
                      "&UserType=-1&CollegeID=&OperationType=-1&PageIndex=0&PageSize=10"
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "All") {
              if (
                userMsg.UserType === "0" &&
                (userMsg.UserClass === "3" || userMsg.UserClass === "4")
              ) {
                dispatch(
                  actions.UpDataState.getCollegeAllUserPreview(
                    "/GetCollegeSummary_Univ?CollegeID=" + userMsg.CollegeID
                  )
                );
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
              } else if (
                (userMsg.UserType === "0" &&
                  (userMsg.UserClass === "1" || userMsg.UserClass === "2")) ||
                (userMsg.UserType === "7" && userMsg.UserClass === "2")
              ) {
                dispatch(
                  actions.UpDataState.getSchoolAllUserPreview(
                    "/GetSchoolSummary_Univ?SchoolID=" + userMsg.SchoolID
                  )
                );
                dispatch(
                  actions.UpDataState.getTree_Univ(
                    "/GetTree_Univ?schoolID=" + userMsg.SchoolID
                    // + (userMsg.UserType||userMsg.UserType===6?"":'&collegeID='+userMsg.CollegeID)
                  )
                );
                dispatch(
                  actions.UpDataState.GetCollegeGroup_Univ(
                    "/GetCollegeGroup_Univ?schoolID=" + userMsg.SchoolID
                  )
                );
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
              }
            } else {
              history.push("/UserArchives/All");
              // console.log(handleRoute);
            }
          } else {
            history.push("/UserArchives/All");
          }
        } else if (
          ((userMsg.UserType === "1" && userMsg.UserClass[2] === "1") ||
            userMsg.UserType === "0" ||
            userMsg.UserType === "7") &&
          route.split("/")[1] === "RegisterExamine"
        ) {
          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          // console.log('12356')
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          if (this.props.DataState.GradeClassMsg.College.length === 1) {
            dispatch(
              actions.UpDataState.getTree_Univ(
                "/GetTree_Univ?schoolID=" + userMsg.SchoolID
                // + (userMsg.UserType||userMsg.UserType===6?"":'&collegeID='+userMsg.CollegeID)
              )
            );
          }
          if (this.state.UserType) {
            dispatch({
              type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
              data: {
                College: {
                  value: userMsg.CollegeID,
                  title: userMsg.CollegeName,
                },
              },
            });
          }

          // dispatch(
          //   actions.UpDataState.GetCollege_Univ(
          //     "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
          //   )
          // );
          //监听
          if (
            route.split("/")[2] !== "RegisterWillExamine" &&
            route.split("/")[2] !== "RegisterDidExamine"
          ) {
            history.push("/RegisterExamine/RegisterWillExamine");
          }

          // if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //   if (handleRoute === "RegisterDidExamine") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1" +
          //           (DataState.GetSignUpLog.Grade.value !== 0
          //             ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
          //             : "") +
          //           (DataState.GetSignUpLog.Class.value !== 0
          //             ? "&classID=" + DataState.GetSignUpLog.Class.value
          //             : "")
          //       )
          //     );
          //   } else if (handleRoute === "RegisterWillExamine") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0" +
          //           (DataState.GetSignUpLog.Grade.value !== 0
          //             ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
          //             : "") +
          //           (DataState.GetSignUpLog.Class.value !== 0
          //             ? "&classID=" + DataState.GetSignUpLog.Class.value
          //             : "")
          //       )
          //     );
          //   }
          // } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
          //   let TeacherClass = DataState.GradeClassMsg.TeacherClass;
          //   if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
          //     return;
          //   }
          //   // console.log("11");
          //   if (handleRoute === "RegisterDidExamine") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1&classID=" +
          //           TeacherClasses.value
          //       )
          //     );
          //   } else if (handleRoute === "RegisterWillExamine") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0&classID=" +
          //           TeacherClasses.value
          //       )
          //     );
          //   }
          // }

          // if (handleRoute === "RegisterDidExamine") {

          //   if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1"+
          //           (DataState.GetSignUpLog.Grade.value!==0?'&gradeID='+DataState.GetSignUpLog.Grade.value:'') +
          //           (DataState.GetSignUpLog.Class.value!==0?'&classID='+DataState.GetSignUpLog.Class.value:'')
          //       )
          //     );
          //   }
          // } else if (handleRoute === "RegisterWillExamine") {

          //   console.log('554',userMsg.UserType === "0" || userMsg.UserType === "7",userMsg)

          //   if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage_univ?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0"+
          //           (DataState.GetSignUpLog.Grade.value!==0?'&gradeID='+DataState.GetSignUpLog.Grade.value:'') +
          //           (DataState.GetSignUpLog.Class.value!==0?'&classID='+DataState.GetSignUpLog.Class.value:'')
          //       )
          //     );
          //   }
          // }
        } else if (
          ((userMsg.UserType === "1" && userMsg.UserClass[2] === "1") ||
            userMsg.UserType === "0" ||
            userMsg.UserType === "7") &&
          route.split("/")[1] === "TeacherRegisterExamine"
        ) {
          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          // console.log('12356')
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          if (this.props.DataState.GradeClassMsg.College.length === 1) {
            dispatch(
              actions.UpDataState.getTree_Univ(
                "/GetTree_Univ?schoolID=" + userMsg.SchoolID
                // + (userMsg.UserType||userMsg.UserType===6?"":'&collegeID='+userMsg.CollegeID)
              )
            );
            dispatch(
              actions.UpDataState.GetCollegeGroup_Univ(
                "/GetCollegeGroup_Univ?schoolID=" + userMsg.SchoolID
              )
            );
          }
          if (this.state.UserType) {
            dispatch({
              type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
              data: {
                College: {
                  value: userMsg.CollegeID,
                  title: userMsg.CollegeName,
                },
              },
            });
          }

          // dispatch(
          //   actions.UpDataState.GetCollege_Univ(
          //     "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
          //   )
          // );
          //监听
          if (
            route.split("/")[2] !== "TeacherRegisterWillExamine" &&
            route.split("/")[2] !== "TeacherRegisterDidExamine"
          ) {
            history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
          }
        } else if (
          (userMsg.UserType === "0" || userMsg.UserType === "7") &&
          route.split("/")[1] === "ImportFile"
        ) {
          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          if (
            route.split("/")[2] !== "Student" &&
            route.split("/")[2] !== "Teacher" &&
            route.split("/")[2] !== "Graduate" &&
            route.split("/")[2] !== "Leader"
          ) {
            history.push("/UserArchives/All");
          }
          let role = route.split("/")[2];
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          document.title =
            role === "Teacher"
              ? "导入教师档案"
              : role === "Leader"
              ? "导入领导档案"
              : role === "Student"
              ? "导入学生档案"
              : "导入毕业生档案";
        } else {
          if (userMsg.UserType === "0" || userMsg.UserType === "7") {
            history.push("/UserArchives/All");
          } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
            history.push("/RegisterExamine/RegisterWillExamine");
          } else {
            // window.location.href =
            //   config.ErrorProxy + "/Error.aspx?errcode=E011";
          }
        }
      }
    });
  };
  //操作左侧菜单，响应路由变化
  handleMenu = () => {
    if (
      history.location.pathname === "/" ||
      history.location.pathname === "/UserArchives"
    ) {
      history.push("/UserArchives/All");
      // console.log(this.state);
    }
  };
  //左侧菜单每项的点击事件
  handleClick = (key) => {
    // console.log(key);
    history.push("/" + key);
  };
  //每个组件的下拉菜单的数据请求
  AllDropDownMenu = (route) => {};

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;
    return (
      <React.Fragment>
        {/* <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={UIState.AppLoading.appLoading}
        > */}
        {UserID ? (
          <Router>
            <Route path="/UserArchives" component={UserArchives}></Route>
            <Route path="/RegisterExamine" component={RegisterExamine}></Route>
            <Route
              path="/TeacherRegisterExamine"
              component={TeacherRegisterExamine}
            ></Route>
            <Route path="/ImportFile/:role" component={ImportFile}></Route>
          </Router>
        ) : (
          ""
        )}
        {/* </Loading> */}
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
          title={UIState.AppAlert.title}
          onOk={UIState.AppAlert.onOk}
          onHide={UIState.AppAlert.onHide}
          onCancel={UIState.AppAlert.onCancel}
          onClose={UIState.AppAlert.onClose}
        ></Alert>
      </React.Fragment>
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
export default connect(mapStateToProps)(App);
