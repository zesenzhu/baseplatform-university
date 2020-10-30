import React, { Component } from "react";

import { Loading, Alert, LeftMenu, Modal } from "../../../common";

import { connect } from "react-redux";

import {HashRouter as Router,withRouter} from "react-router-dom";

import Frame from "../../../common/Frame";

import logo from "../../images/image-MyClass.png";

import LogDetails from "../component/LogDetails";

import CourseClassDetails from "../component/CourseClassDetails";

import {leftMemuShow,leftMemuHide,leftMenuListUpdate} from "../reducers/leftMenu";

import {userIndetifyChange} from "../reducers/identify";



import {
    bannerShow,
    bannerHide,
    bannerBtnShow,
    bannerLogHide,
    bannerTabHide,
    bannerBtnHide
} from "../reducers/bannerState";


import Banner from '../component/banner/index';

import AppRoutes from './AppRoutes';

import "../../scss/index.scss";

import actions from "../actions";

import { QueryPower,QueryOtherPower } from "../../../common/js/power";

import {loginUserUpdate} from "../reducers/LoginUser";

import {teacherPowerChange} from "../reducers/teacherManagePower";

import CONFIG from "../../../common/js/config";

const COURECLASS_MODULEID = "000-2-0-17"; //教学班管理


let listenHistory = null;

class App extends Component {

    constructor(props){

        super(props);

        this.state = {

          firstLoad:true

        };

    }


  //界面初始化
  pageInit(){

      const { dispatch, DataState,history } = this.props;

      // 获取接口数据
      let route = history.location.pathname;
      // let UserMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
      let that = this;

      let token = sessionStorage.getItem("token");

      let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      const UserInfoCopy = {...UserInfo,UserType:parseInt(UserInfo.UserType),UserClass:UserInfo.UserClass};

      let ModuleID = '';

      if ([0,7,10].includes(UserInfoCopy.UserType)){

          ModuleID = '000005';

      }else if (UserInfoCopy.UserType===1) {

          ModuleID = '000013';

      }else{

          window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";

      }

      this.Frame.getIdentity({ModuleID},(identify)=>{

              const isCollegeManager = identify&&identify[0].IdentityCode==='IC0009';

              dispatch(userIndetifyChange({isCollegeManager,identifyList:identify?identify:[]}));

              if (isCollegeManager){

                  dispatch(leftMenuListUpdate([ {
                      link:'/statics/course',
                      name:'课程教学班统计',
                      id:'course',
                      menu:'menu46'
                  },
                  {
                      link:'/statics/teacher',
                      name:'教师教学班统计',
                      id:'teacher',
                      menu:'menu20'
                  }
                  ]));

              }

              dispatch(
                  actions.UpDataState.getLoginUser(
                      UserInfo
                  )
              );

              dispatch(loginUserUpdate(UserInfoCopy));

              that.setState({
                  UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
              });

              that.requestData(route);

              history.listen(() => {

                  //路由监听
                  let route = history.location.pathname;

                  if(route.split('/')[1]==='statics'){

                      dispatch(bannerShow());

                      dispatch(leftMemuShow());

                  }

                  if(route.split('/')[1]==='manage'){

                      dispatch(bannerShow());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='ImportFile'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Log'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Teacher'){

                      dispatch(bannerShow());

                      dispatch(bannerBtnShow());

                      dispatch(bannerLogHide());

                      dispatch(bannerTabHide());

                      dispatch(leftMemuHide());

                  }

                  that.requestData(route);

              });

          });

  }


  UNSAFE_componentWillReceiveProps(nextProps){

      if (this.state.firstLoad){

          const {history,dispatch} = nextProps;

          const route = history.location.pathname;

          this.setState({

              firstLoad:false

          },()=>{

              if(route.split('/')[1]==='statics'){

                  dispatch(bannerShow());

                  dispatch(leftMemuShow());

              }

              if(route.split('/')[1]==='manage'){

                  dispatch(bannerShow());

                  dispatch(leftMemuHide());

              }


              if(route.split('/')[1]==='ImportFile'){

                  dispatch(bannerHide());

                  dispatch(leftMemuHide());

              }

              if(route.split('/')[1]==='Log'){

                  dispatch(bannerHide());

                  dispatch(leftMemuHide());

              }

              if(route.split('/')[1]==='Teacher'){

                  dispatch(bannerShow());

                  dispatch(bannerLogHide());

                  dispatch(bannerTabHide());

                  dispatch(bannerBtnShow());

                  dispatch(leftMemuHide());

              }

          });

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

      const { ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

      const { dispatch, DataState } = this.props;
    if (!DataState.LoginUser.SchoolID && !JSON.parse(sessionStorage.getItem("UserInfo"))){

      return;

    }

    let UserMsg = DataState.LoginUser.SchoolID?DataState.LoginUser:JSON.parse(sessionStorage.getItem("UserInfo"));

    const { UserType } = JSON.parse(sessionStorage.getItem("UserInfo"));

      if (parseInt(ProductType)===3){

          if (parseInt(UserType)===7||parseInt(UserType)===10||parseInt(UserType)===0){

              let SubjectID = DataState.GetCoureClassAllMsg.Subject;
              let GradeID = DataState.GetCoureClassAllMsg.Grade;

              let pathArr = route.split("/");
              let handleRoute = pathArr[1];
              let routeID = pathArr[2];
              let subjectID = pathArr[3];
              let classID = pathArr[4];

              if (handleRoute === "Log"){

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

              } else if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

                  dispatch(
                      actions.UpDataState.getTeacherCourseClassMsg(
                          "/GetCourseClassByUserID?schoolID=" +
                          UserMsg.SchoolID +
                          "&teacherID=" +
                          UserMsg.UserID
                      )
                  );


              }

          }else if (parseInt(UserType)===1){

              QueryOtherPower({
                  SchoolID:UserMsg.SchoolID,
                  ModuleID: COURECLASS_MODULEID,
                  Power:'Teacher_CourseClass_CURD',
                  UserType:UserMsg.UserType
              }).then(data=> {

                  if (data) {

                      if (handleRoute==='Teacher'){

                          dispatch(bannerShow());

                      }

                  } else {

                      dispatch(bannerHide());

                  }

                  dispatch(teacherPowerChange(data));

                  let SubjectID = DataState.GetCoureClassAllMsg.Subject;
                  let GradeID = DataState.GetCoureClassAllMsg.Grade;

                  let pathArr = route.split("/");
                  let handleRoute = pathArr[1];
                  let routeID = pathArr[2];
                  let subjectID = pathArr[3];
                  let classID = pathArr[4];

                  if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

                      dispatch(
                          actions.UpDataState.getTeacherCourseClassMsg(
                              "/GetCourseClassByUserID?schoolID=" +
                              UserMsg.SchoolID +
                              "&teacherID=" +
                              UserMsg.UserID
                          )
                      );

                  }

              });

          }


      }else{

          if (parseInt(UserType)===7||parseInt(UserType)===10){

              let SubjectID = DataState.GetCoureClassAllMsg.Subject;
              let GradeID = DataState.GetCoureClassAllMsg.Grade;

              let pathArr = route.split("/");
              let handleRoute = pathArr[1];
              let routeID = pathArr[2];
              let subjectID = pathArr[3];
              let classID = pathArr[4];

              if (
                  (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                  handleRoute === "Log"
              ) {



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

              }

          }else if (parseInt(UserType)===0){

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



                      if (
                          (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                          handleRoute === "Log"
                      ) {

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



                          /* dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });*/

                      } else if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

                          dispatch(
                              actions.UpDataState.getTeacherCourseClassMsg(
                                  "/GetCourseClassByUserID?schoolID=" +
                                  UserMsg.SchoolID +
                                  "&teacherID=" +
                                  UserMsg.UserID
                              )
                          );


                      }
                  }
              });

          }else if (parseInt(UserType)===1){

              QueryOtherPower({
                  SchoolID:UserMsg.SchoolID,
                  ModuleID: COURECLASS_MODULEID,
                  Power:'Teacher_CourseClass_CURD',
                  UserType:UserMsg.UserType
              }).then(data=> {

                  if (data) {

                      if (handleRoute==='Teacher'){

                          dispatch(bannerShow());

                      }

                  } else {

                      dispatch(bannerHide());

                  }

                  dispatch(teacherPowerChange(data));

                  let SubjectID = DataState.GetCoureClassAllMsg.Subject;
                  let GradeID = DataState.GetCoureClassAllMsg.Grade;

                  let pathArr = route.split("/");
                  let handleRoute = pathArr[1];
                  let routeID = pathArr[2];
                  let subjectID = pathArr[3];
                  let classID = pathArr[4];

                  if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

                      dispatch(
                          actions.UpDataState.getTeacherCourseClassMsg(
                              "/GetCourseClassByUserID?schoolID=" +
                              UserMsg.SchoolID +
                              "&teacherID=" +
                              UserMsg.UserID
                          )
                      );

                  }

              });

          }

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

  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };


  menuClick({id,name}){

    const { dispatch,breadCrumb,history } = this.props;

    const path  = history.location.pathname;

  }

  onRef(ref){

        this.Frame = ref;

    }


  render() {
    const { LoginUser,UIState,DataState,leftMenu,AppLoading,bannerState,history } = this.props;

    let {UserID,UserType,UserClass} = LoginUser;

    if (DataState.GetCoureClassAllMsg.isError) {

      window.location.href = "/html/CoureClass#/All";
    }
    let route = history.location.pathname.split("/");

    let cnname = "教学班管理";
    
     let subtitle = '';
    
    let enname = "CoureClass Management";

    if (parseInt(UserType)===1) {

        cnname = "我的教学班管理";

        enname = "My class Management";

    }

    if (route[1]==='ImportFile'){

        subtitle = '导入教学班';

    }else if(route[1]==='Log'){

        subtitle = route[2] === 'Dynamic'?'最新动态':'历史记录';

    }

    return (

      <>

        <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={AppLoading}
        >

                <Router>

                    <Frame

                    pageInit={this.pageInit.bind(this)}

                    module={{
                      cnname: cnname,
                      enname: enname,
                      subtitle:subtitle,
                      image: logo
                    }}
                    type="triangle"
                    showBarner={bannerState.show}
                    showLeftMenu={leftMenu.show}
                    onRef={this.onRef.bind(this)}
                  >
                    <div ref="frame-time-barner">

                      <Banner/>

                    </div>

                    <div ref="frame-left-menu">

                        <LeftMenu Icon={"pic3"} Menu={leftMenu.menuList} menuClick={this.menuClick.bind(this)}></LeftMenu>

                    </div>

                    <div ref="frame-right-content">

                       {

                         UserID?

                           <AppRoutes></AppRoutes>

                         :null

                        }

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
          title={parseInt(UserType)===1?'学生名单详情':"教学班详情"}
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

      </>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState,breadCrumb,AppLoading,leftMenu,LoginUser,bannerState } = state;
  return {
    UIState,
    DataState,
    leftMenu,
    breadCrumb,
    AppLoading,
    LoginUser,
    bannerState
  };
};
export default connect(mapStateToProps)(withRouter(App));
