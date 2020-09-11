import React, { Component } from "react";
import {
  Menu,
  Loading,
  Alert,
  Modal,
  // Frame,
  Button,
  Empty,
  Search,
  DetailsModal,
} from "../../../common";
import Frame from "../../../common/Frame";
import { connect } from "react-redux";
import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  // IndexRedirect ,
  BrowserRouter,
} from "react-router-dom";
import { IndexRedirect } from "react-router";
import Main from "../component/Main";
import history from "./history";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
// import WebsiteCustom from '../component/WebsiteCustom'
import "../../scss/index.scss";
import actions from "../actions";
import Public from "../../../common/js/public";
import { Select } from "antd";
import Scrollbars from "react-custom-scrollbars";
import Icon, { CaretDownOutlined } from "@ant-design/icons";
// import { console } from "es6-shim";
import UserArchives from "../component/UserArchives";
import All from "../component/UserArchives/All";
import Student from "../component/UserArchives/Student";
import Temple from "../component/Temple";
import TimeBanner from "../component/Common/TimeBanner";
const { Bs2CsProxy } = CONFIG;
let { getQueryVariable } = Public;
const { MainAction, CommonAction, PublicAction } = actions;
class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.PublicState.LoginMsg,
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    // 获取人脸库地址
    dispatch(
      MainAction.GetSubSystemsMainServerBySubjectID({
        fn: () => {
          this.SetBannerList(); //获取到后再次进行列表更新
        },
      })
    );
  }

  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState, PublicState } = this.props;
    // if (!PublicState.LoginMsg.isLogin) {
    //查询userInfo是否存在
    if (JSON.parse(sessionStorage.getItem("UserInfo"))) {
      let userMsg = this.setRole(
        JSON.parse(sessionStorage.getItem("UserInfo"))
      ); //做角色处理，增加个Role字段
      dispatch(
        PublicAction.getLoginUser(
          // ...JSON.parse(sessionStorage.getItem("UserInfo")),
          userMsg
        )
      );

      if (!userMsg.SchoolID) {
        //做字段排除，不存在就不能进界面
        return;
      }
      // 数据请求前的处理
      this.SetBannerList();
      this.SetRoleLeader();
      this.SetRoleCollege();

      this.RouteListening({ isFirst: true });

      history.listen(() => this.RouteListening({}));
      // this.RequestData();
      dispatch(PublicAction.AppLoadingClose());
    }
    // }

    // console.log(userMsg.UserType,userMsg.UserClass,userMsg.UserType !== "6" || userMsg.UserClass !== "2")
  };
  // 路由监听
  RouteListening = ({ isFirst = false, fn = () => {} }) => {
    const { dispatch, DataState, PublicState } = this.props;

    let Route = this.ConstructRoute();
    dispatch(CommonAction.SetRouteParams(Route));

    let FirstRoute = Route[0];
    let SecondRoute = Route[1];
    if (FirstRoute === "All") {
    } else if (FirstRoute === "UserArchives") {
      if (
        SecondRoute === "Student" ||
        SecondRoute === "Teacher" ||
        SecondRoute === "Leader" ||
        SecondRoute === "Graduate" ||
        SecondRoute === "All"
      ) {
        console.log(SecondRoute);
        this.AllGetData({ type: SecondRoute });
      } else {
        this.SetFirstDefaultRoute({});
      }
    } else if (FirstRoute === "RegisterExamine") {
      if (SecondRoute === "RegisterWillExamine") {
      } else if (SecondRoute === "RegisterDidExamine") {
      } else {
        this.SetRegisterExamineDefaultRoute();
      }
    } else if (FirstRoute === "TeacherRegisterExamine") {
      if (SecondRoute === "TeacherRegisterWillExamine") {
      } else if (SecondRoute === "TeacherRegisterDidExamine") {
      } else {
        this.SetTeacherRegisterExamineDefaultRoute();
      }
    } else if (FirstRoute === "ImportFile") {
      if (SecondRoute === "Student") {
      } else {
        this.SetFirstDefaultRoute({});
      }
    } else {
      this.SetFirstDefaultRoute({ isFirst });
    }
    fn();
    // history.push("11");
    console.log(history, Route);
  };
  // 设置点击头部列表事件
  SelectMenu = (data) => {
    //value
    const {
      dispatch,
      DataState: {
        CommonData: { BannerList },
      },
      PublicState,
    } = this.props;
    let { value: key, url } = BannerList.find((child) => child.value === data);
    let handleRoute = this.ConstructRoute(1);

    if (key === "Face") {
      window.open(url);
    } else {
      history.push("/UserArchives/" + key);
      if (key === handleRoute) {
        //如果路由不变，但点击菜单，默认是不会进行数据请求的
        this.AllGetData({ type: key });
      }
    }

    // history.push('/'+key)
  };
  // 数据请求汇总
  AllGetData = ({ type = "All", fn = () => {} }) => {
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, ColegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          InitLeaderParams,
          InitGraduateParams,
        },
      },
    } = this.props;
    // let isCollege = Role.includes("College"); //判断是否是学院领导或管理员
    // console.log(type, IsCollege);

    if (type === "Student") {
      if (RouteData[2]) {
        //如果有值，说明是要进行学院或专业筛选，需等待下拉数据回来
        dispatch(
          MainAction.GetTree({
            fn: (State) => {
              this.GetStudentModuleData(RouteData[2]);
            },
          })
        );
      } else {
        dispatch(MainAction.GetTree({}));
        this.GetStudentModuleData();
      }
    } else if (type === "Teacher") {
      if (RouteData[2]) {
        //如果有值，说明是要进行学院或专业筛选，需等待下拉数据回来
        dispatch(
          MainAction.GetTeacherTree({
            fn: (State) => {
              this.GetTeacherModuleData(RouteData[2]);
            },
          })
        );
      } else {
        dispatch(MainAction.GetTeacherTree({}));
        this.GetTeacherModuleData();
      }
    } else if (type === "Leader") {
      dispatch(CommonAction.SetLeaderParams(InitLeaderParams));
      dispatch(MainAction.GetLeaderToPage({}));
    } else if (type === "Graduate") {
      dispatch(CommonAction.SetGraduateParams(InitGraduateParams));
      dispatch(
        MainAction.GetGraduateTree({
          fn: (State) => {},
        })
      );
      dispatch(MainAction.GetGraduateToPage({}));
    } else if (type === "All") {
      if (IsCollege) {
        dispatch(MainAction.GetCollegeSummary({}));
      } else {
        dispatch(MainAction.GetSchoolSummary({}));
      }
    }
    fn();
  };
  GetStudentModuleData = (id) => {
    //id为链接上的
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, ColegeID, CollegeName },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          StudentParams: { collegeID },
          InitStudentParams,
        },
        MainData: {
          StudentTree: { CollegeList, MajorList },
        },
      },
    } = this.props;
    let data = { ...InitStudentParams }; //初始学生参数
    // console.log(id);
    if (IsCollege) {
      //是学院且参数没选择，第一次进来
      //学院的
      data.collegeID = ColegeID;
      data.collegeName = CollegeName;
      let major;
      if (id) {
        if ((major = MajorList.find((child) => child.value === id))) {
          //专业
          data.majorID = major.value;
          data.majorName = major.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Student");
        }
      }
    } else {
      //学校
      let college;

      if (id) {
        if ((college = CollegeList.find((child) => child.value === id))) {
          //学院
          data.collegeID = college.value;
          data.collegeName = college.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Student");
        }
      }
    }
    dispatch(
      CommonAction.SetStudentParams({
        ...data,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  GetTeacherModuleData = (id) => {
    //id为链接上的
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, ColegeID, CollegeName },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          TeacherParams: { collegeID },
          InitTeacherParams,
        },
        MainData: {
          TeacherTree: { CollegeList, GroupList },
        },
      },
    } = this.props;
    let data = { ...InitTeacherParams }; //初始学生参数
    if (IsCollege) {
      //是学院且参数没选择，第一次进来
      //学院的
      data.collegeID = ColegeID;
      data.collegeName = CollegeName;
      let group;
      if (id) {
        if ((group = GroupList.find((child) => child.value === id))) {
          //专业
          data.groupID = group.value;
          data.groupName = group.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Teacher");
        }
      }
    } else {
      //学校
      let college;

      if (id) {
        if ((college = CollegeList.find((child) => child.value === id))) {
          //学院
          data.collegeID = college.value;
          data.collegeName = college.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Teacher");
        }
      }
    }
    dispatch(
      CommonAction.SetTeacherParams({
        ...data,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  // 设置教师注册默认路径
  SetTeacherRegisterExamineDefaultRoute = () => {
    history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
  };
  // 设置学生注册默认路径
  SetRegisterExamineDefaultRoute = () => {
    history.push("/RegisterExamine/RegisterWillExamine");
  };
  // 设置第一级默认路径
  SetFirstDefaultRoute = ({ isFirst }) => {
    let { dispatch } = this.props;
    if (isFirst) {
      //如果是第一次,因为不会进行数据和路由更新，需要手动
      dispatch(CommonAction.SetRouteParams(["UserArchives", "All"]));

      this.AllGetData({});
    }
    history.push("/UserArchives/All");
  };
  // 解析路由
  ConstructRoute = (tpye = "construct", key) => {
    // type:construct,直接解析，获取pathname，分解为数组
    let route = history.location.pathname.slice(1);
    // console.log(history, route);
    let pathArr = route.split("/");
    if (tpye === "construct") {
      if (key === undefined) {
        return pathArr;
      } else if (key instanceof Number) {
        return pathArr[key];
      } else if (key instanceof String) {
        return pathArr.includes((child) => child === key);
      }
    }
  };
  // 设置用户角色,模块角色统一在这处理
  setRole = (LoginMsg) => {
    // let {
    //   dispatch,
    //   DataState,
    //   PublicState: {
    //     LoginMsg: { UserType, UserClass },
    //   },
    // } = this.props;
    let { UserType, UserClass } = LoginMsg;
    let Role = "";
    UserType = parseInt(UserType);
    UserClass = parseInt(UserClass);
    if (UserType === 0 && (UserClass === 1 || UserClass === 2)) {
      //学校管理员（admin_学校代码，创建学校时生成）
      Role = "Admin-School";
    } else if (UserType === 0 && (UserClass === 3 || UserClass === 4)) {
      //学院管理员
      Role = "Admin-College";
    } else if (UserType === 1) {
      //教师,— UserClass=100000~111111：
      //后5位分别代表：
      //任课教师、班主任、教研者（V3.0无效，恒为0）、学科主管、校领导
      //（V3.0无效，恒为0），值为1时代表有该身份；
      Role = "Teacher";
    } else if (UserType === 2) {
      //学生
      Role = "Student";
    } else if (UserType === 7) {
      //学校领导（V3.0之后的版本才有此角色）
      // — UserClass=0 校长
      //— UserClass=1 副校长
      //— UserClass=2 教务主任
      Role = "Leader-School";
    } else if (UserType === 10) {
      //学院领导（V3.0之后的版本才有此角色）
      // — UserClass=3 院长
      //— UserClass=4 副院长
      Role = "Leader-College";
    } else if (UserType === 3) {
      //家长

      Role = "Parent";
    } else if (UserType === 4) {
      //教育专家

      Role = "Specialist";
    } else if (UserType === 5) {
      //教育局领导

      Role = "Leader-Education";
    }
    return { ...LoginMsg, Role };
  };
  // 设置banner的选择列表
  SetBannerList = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          BannerInitList,
          RolePower: { IsCollege, IsLeader },
        },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    let BannerList = [];

    // Role为领导的时候不能显示领导，
    // ProductType===6，适配人工智能实训室，不要领导
    // LockerVersion===1 ，校园基础信息管理 XG5.2-免费版,1为基础版，不要毕业生
    BannerInitList instanceof Array &&
      BannerInitList.forEach((child, index) => {
        if (child.value === "Leader") {
          //领导的
          if (!this.SetProductTypeLeader() && !IsCollege && !IsLeader) {
            BannerList.push(child);
          }
        } else if (child.value === "Graduate") {
          if (!this.SetLockerVersionGradute()) {
            BannerList.push(child);
          }
        } else if (child.value === "Face") {
          if (
            SysUrl instanceof Array &&
            SysUrl.length > 0 &&
            Role.includes("Admin")
          ) {
            List.push({
              url: SysUrl[0].WebSvrAddr + "?lg_tk=" + token,
              ...child,
            });
          }
        } else {
          BannerList.push(child);
        }
      });

    dispatch(CommonAction.SetBannerParams(BannerList));
  };
  // // ProductType===6，适配人工智能实训室，不要领导,统一处理
  SetProductTypeLeader = () => {
    let { ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let token = sessionStorage.getItem("token");
    ProductType = parseInt(ProductType);
    return ProductType === 6;
  };
  SetRoleLeader = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { BannerInitList },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRolePowerParams({
        IsLeader: Role.includes("Leader"),
      })
    );
    return Role.includes("Leader");
  };
  SetRoleCollege = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { BannerInitList },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRolePowerParams({
        IsCollege: Role.includes("College"),
      })
    );
    return Role.includes("College");
  };
  // LockerVersion===1 ，校园基础信息管理 XG5.2-免费版,1为基础版，不要毕业生
  SetLockerVersionGradute = () => {
    let { dispatch } = this.props;
    let { LockerVersion } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let token = sessionStorage.getItem("token");
    LockerVersion = parseInt(LockerVersion);
    dispatch(
      CommonAction.SetRolePowerParams({ LockerVersion_1: LockerVersion === 1 })
    );
    return LockerVersion === 1;
  };
  // 详情关闭
  onDetailsModalCancel = () => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        DetailsModalVisible: false,
      })
    );
  };
  render() {
    const {
      UIState,
      DataState: {
        CommonData: {
          FrameData: {
            type: FrameType,
            cnname,
            enname,
            image,
            showLeftMenu,
            showBarner,
          },
          ModalVisible: { DetailsModalVisible },
          UserArchivesParams: { DetailsType, DetailsData },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading },
        Alert: {
          appAlert,
          title,
          type,
          littleTitle,
          onOk,
          onHide,
          onCancel,
          onClose,
        },
        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;

    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={AppLoading}
        >
          <Frame
            userInfo={{
              name: UserName,
              image: PhotoPath,
            }}
            module={{
              cnname: cnname,
              enname: enname,
              image: image,
            }}
            type={FrameType}
            showLeftMenu={showLeftMenu}
            showBarner={showBarner}
            className="myFrame AdmArchives-frame"
            pageInit={this.RequestData}
          >
            <div ref="frame-time-barner">
              <TimeBanner SelectMenu={this.SelectMenu} />
            </div>
            <div ref="frame-right-content">
              <Loading
                opacity={false}
                // tip="加载中..."
                size="small"
                spinning={ContentLoading}
              >
                <Router>
                  <Route path="/UserArchives" component={UserArchives}>
                    {/* <Redirect from="/UserArchives*" to="/UserArchives/All" /> */}
                  </Route>
                  <Route
                    path="/RegisterExamine/*"
                    exact
                    component={Temple}
                  ></Route>
                  <Route
                    path="/TeacherRegisterExamine/*"
                    component={Temple}
                    exact
                  ></Route>
                  <Route
                    path="/ImportFile/:role"
                    exact
                    component={Temple}
                  ></Route>
                  {/* <Redirect from="/" to="/UserArchives" /> */}
                  {/* <Route path="/" component={Temple}>
                    <Redirect from="/" to="/UserArchives" />
                  </Route> */}
                </Router>
              </Loading>
            </div>
          </Frame>
        </Loading>
        <Alert
          show={appAlert}
          type={type}
          abstract={littleTitle}
          title={title}
          onOk={onOk}
          onHide={onHide}
          onCancel={onCancel}
          onClose={onClose}
        ></Alert>
        <DetailsModal
          ref="DetailsMsgModal"
          visible={DetailsModalVisible}
          module={1}
          onCancel={this.onDetailsModalCancel}
          data={DetailsData}
          type={DetailsType}
        ></DetailsModal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(App);
