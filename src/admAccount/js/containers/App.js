import React, { Component } from "react";
import { Menu, Loading, Alert } from "../../../common";
import { connect } from "react-redux";
import Introduce from "../component/Introduce";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
import Frame from "../../../common/Frame";
import config from "../../../common/js/config";

import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "./history";

import logo from "../../images/admAccoHeadImg-1.png";
//import TimeBanner from '../component/TimeBanner'

import Student from "../component/Student";
import Parents from "../component/Parents";
import Teacher from "../component/Teacher";
import Leader from "../component/Leader";
import Admin from "../component/Admin";
import "../../scss/index.scss";
import $ from "jquery";
import { getData } from "../../../common/js/fetch";
import actions from "../actions";
import {
  QueryPower,
  QueryAdminPower,
  QueryConfigPower,
} from "../../../common/js/power";

//import { urlAll, proxy } from './config'
const ACCOUNT_MODULEID = "000-2-0-10"; //用户账号管理模块ID

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      MenuParams: {
        MenuBox: {
          display: true,
          width: 240,
          MenuBoxTopPic: "pic10",
        },
        children: [
          {
            key: "Student",
            title: "学生账号管理",
            icon: "menu39",
            onTitleClick: this.handleClick,
          },
          {
            key: "Parents",
            title: "家长账号管理",
            icon: "menu39",
            onTitleClick: this.handleClick,
          },
          {
            key: "Teacher",
            title: "教师账号管理",
            icon: "menu33",
            onTitleClick: this.handleClick,
          },
          {
            key: "Leader",
            title: "领导账号管理",
            icon: "menu35",
            onTitleClick: this.handleClick,
          },
          {
            key: "Admin",
            title: "管理员账号管理",
            icon: "menu34",
            onTitleClick: this.handleClick,
          },
        ],
        userType:
          props.DataState.LoginUser.UserType === "0" &&
          (props.DataState.LoginUser.UserClass === "3" ||
            props.DataState.LoginUser.UserClass === "4")
            ? true
            : false, //0为学院，6为学校
      },
    };
    let route = history.location.pathname;
    // TokenCheck()
    //判断token是否存在
    let that = this;

    TokenCheck_Connect(false, () => {
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        that.requestData(route);
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function () {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            that.requestData(route);

            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
    });
  }

  componentWillMount() {
    //this.handleMenu()
    const { dispatch, DataState } = this.props;

    let route = history.location.pathname;
    // 获取接口数据
    //this.requestData(route)
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
    this.handleMenu();
    history.listen(() => {
      //路由监听
      let route = history.location.pathname;

      // 获取接口数据
      this.requestData(route);

      this.handleMenu();

      // if (history.location.pathname === '/' || history.location.pathname === '/UserAccount') {
      //     history.push('/UserAccount/All')
      //     console.log(this.state)
      // }
      // if (history.location.pathname === '/RegisterExamine' ) {
      //     history.push('/RegisterExamine/RegisterWillExamine')
      //     console.log(this.state)
      // }
    });
  }
  componentWillUpdate() {}
  componentDidUpdate() {}

  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    window.location.href = "/html/login";
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
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let ParentsPower = true;
    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }

    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let AdminPower = true;
    let Menu = this.state.MenuParams;

    if (
      userMsg.UserType !== "6" &&
      (userMsg.UserType !== "0" || userMsg.UserClass !== "2")
    ) {
      let children = Menu.children;
      if (children[children.length - 1].key === "Admin") {
        children.pop();
      }
      Menu.children = children;
      this.setState({
        MenuParams: Menu,
      });
      AdminPower = false;
    }
    let ConfigPower = QueryConfigPower({ SchoolID: userMsg.SchoolID });
    // console.log(Data.ParentsShow);
    // if (Data.ParentsShow !== 1) {
    //   let children = [];
    //   ParentsPower = false;
    //   Menu.children instanceof Array &&
    //     Menu.children.map((child) => {
    //       if (child.key !== "Parents") {
    //         children.push(child);
    //       }
    //     });
    //   Menu.children = children;
    //   this.setState({
    //     MenuParams: Menu,
    //   });
    // }
    ConfigPower.then((Data) => {
      if (Data.ParentsShow !== 1) {
        let children = [];
        ParentsPower = false;
        Menu.children instanceof Array &&
          Menu.children.map((child) => {
            if (child.key !== "Parents") {
              children.push(child);
            }
          });
        Menu.children = children;
        this.setState({
          MenuParams: Menu,
        });
      }
      let havePower = QueryPower({
        UserInfo: userMsg,
        ModuleID: ACCOUNT_MODULEID,
      });
      havePower.then((res) => {
        if (res) {
          if (route === "/") {
            //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          } else if (handleRoute === "Student") {
            //dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.GradeClassMsg.returnData.grades)
              dispatch(
                actions.UpDataState.getGradeClassMsg(
                  "/GetTree_Univ?schoolID=" + userMsg.SchoolID
                )
              );
            if (this.state.userType) {
              dispatch(
                actions.UpDataState.getGradeStudentPreview(
                  "/GetStudentToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&CollegeID=" +
                    userMsg.CollegeID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            } else {
              dispatch(
                actions.UpDataState.getGradeStudentPreview(
                  "/GetStudentToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            }
          } else if (handleRoute === "Parents") {
            if (!ParentsPower) {
              history.push("/");
              return;
            }
            //dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.GradeClassMsg.returnData.grades)
              dispatch(
                actions.UpDataState.getGradeClassMsg(
                  "/GetTree_Univ?schoolID=" + userMsg.SchoolID
                )
              );
            if (this.state.userType) {
              dispatch(
                actions.UpDataState.getGradeParentsPreview(
                  "/GetParentsToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&CollegeID=" +
                    userMsg.CollegeID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            } else {
              dispatch(
                actions.UpDataState.getGradeParentsPreview(
                  "/GetParentsToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            }
          } else if (handleRoute === "Teacher") {
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.SubjectTeacherMsg.returnData)
              dispatch(
                actions.UpDataState.getSubjectTeacherMsg(
                  "/GetCollegeGroup_Univ?schoolID=" + userMsg.SchoolID
                )
              );
            if (this.state.userType) {
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&CollegeID=" +
                    userMsg.CollegeID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            } else {
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&PageIndex=0&PageSize=10"
                )
              );
            }
          } else if (handleRoute === "Leader") {
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(
              actions.UpDataState.GetCollege_Univ(
                "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
              )
            );
            if (this.state.userType) {
              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&UserType=10&CollegeID=" +
                    userMsg.CollegeID
                )
              );
            } else {
              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader_univ?SchoolID=" +
                    userMsg.SchoolID +
                    "&UserType=-1"
                )
              );
            }
          } else if (handleRoute === "Admin") {
            if (!AdminPower) {
              history.push("/");
              return;
            }
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage_univ?SchoolID=" +
                  userMsg.SchoolID +
                  "&PageIndex=0&PageSize=10"
              )
            );
          } else {
            history.push("/");
          }
        }
      });
    });
  };
  //操作左侧菜单，响应路由变化
  handleMenu = () => {
    // $('.frame_leftmenu_mainitem').removeClass('selected active');
    // $('.frame_leftmenu_mainitem').children('*').removeClass('active');
    let path = history.location.pathname.split("/")[1];

    let param = this.state.MenuParams;
    let len = param.children.length;
    for (let i = 0; i < len; i++) {
      param.children[i]["active"] = false;
      param.children[i]["selected"] = false;
      if (path === param.children[i].key) {
        param.children[i]["active"] = true;
        param.children[i]["selected"] = true;
      }
    }
    this.setState({
      MenuParams: param,
    });
  };
  //左侧菜单每项的点击事件
  handleClick = (key) => {
    let route = history.location.pathname;
    // 获取接口数据
    //this.requestData(route)
    //let route = history.location.pathname;
    // let userMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    if (handleRoute === "Student") {
      window.StudentCancelSearch && window.StudentCancelSearch();
    }
    if (handleRoute === "Parents") {
      window.ParentsCancelSearch && window.ParentsCancelSearch();
    } else if (handleRoute === "Teacher") {
      window.TeacherCancelSearch && window.TeacherCancelSearch();
    } else if (handleRoute === "Leader") {
      window.LeaderCancelSearch && window.LeaderCancelSearch();
    } else if (handleRoute === "Admin") {
      window.AdminCancelSearch && window.AdminCancelSearch();
    }
    history.push("/" + key);
  };
  //每个组件的下拉菜单的数据请求
  AllDropDownMenu = (route) => {};

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;

    return (
      <React.Fragment>
        <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath,
            }}
            module={{
              cnname: "用户账号管理",
              enname: "User Account Management",
              image: logo,
            }}
            type="triangle"
            showBarner={false}
            showLeftMenu={true}
          >
            {/* <div ref="frame-time-barner"><TimeBanner /></div> */}
            <div ref="frame-left-menu">
              <Menu params={this.state.MenuParams}></Menu>
            </div>

            <div ref="frame-right-content">
              <Loading
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.RightLoading}
              >
                {UserID ? (
                  <Router>
                    <Route
                      path="/"
                      history={history}
                      exact
                      component={Introduce}
                    ></Route>
                    <Route
                      path="/Student"
                      history={history}
                      component={Student}
                    ></Route>
                    <Route
                      path="/Parents"
                      history={history}
                      component={Parents}
                    ></Route>
                    <Route
                      path="/Teacher"
                      exact
                      history={history}
                      component={Teacher}
                    ></Route>
                    <Route
                      path="/Leader"
                      exact
                      history={history}
                      component={Leader}
                    ></Route>
                    <Route
                      path="/Admin"
                      exact
                      history={history}
                      component={Admin}
                    ></Route>
                  </Router>
                ) : (
                  ""
                )}
              </Loading>
            </div>
          </Frame>
        </Loading>
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
          abstract={UIState.AppAlert.littleTitle}
          title={UIState.AppAlert.title}
          onHide={UIState.AppAlert.onHide}
          onOk={UIState.AppAlert.onOk}
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
