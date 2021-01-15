import React, { Component } from "react";

import { MenuLeftNoLink, Loading, Alert } from "../../../common";

import { connect } from "react-redux";

import Frame from "../../../common/Frame";

import logo from "../../images/SubjectLogo.png";

import Subject from "./Subject";

import Course from "./Course";

import "../../scss/index.scss";

import actions from "../actions";

import * as menuActions from "../actions/menuActions";

import TimeBanner from "../component/TimeBanner";

import { QueryPower } from "../../../common/js/power";

import * as subActions from "../actions/subPassActions";

import { getQueryVariable } from "../../../common/js/disconnect";

import { productTypeChange } from "../reducers/productType";

import productType from "../reducers/productType";

import { userIndetifyChange } from "../reducers/identify";

import ImportFile from "./ImportFile";

import history from "./history";

const SUBJECT_MODULEID = "000-2-0-18"; //学科管理

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitGuide: false,
      Import: false, //导入
      ImportData: {
        course: { subtitle: "导入课程", route: "course" },
        subject: { subtitle: "导入学科", route: "subject" },
      },
    };
  }

  componentWillMount() {
    //   简单点，不做路由监听了，本身路由变化就是打开新界面
    let { ImportData } = this.state;
    let { dispatch } = this.props;
    if (history.location) {
      let { pathname } = history.location;
      let path = pathname.slice(1).split("/");

      if (path[0] === "ImportFile" && ImportData[path[1]]) {
        //只管导入和对应导入界面的
        this.setState({ Import: ImportData[path[1]] });
        dispatch(actions.UpUIState.appLoadingHide());
      }
    }
  }

  pageInit() {
    const { dispatch } = this.props;

    const { ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    );

    dispatch(productTypeChange(parseInt(ProductType)));

    dispatch(
      actions.UpDataState.getLoginUser(
        JSON.parse(sessionStorage.getItem("UserInfo"))
      )
    );

    const { UserType } = JSON.parse(sessionStorage.getItem("UserInfo"));

    if (getQueryVariable("isInitGuide")) {
      this.setState({ isInitGuide: true });
    }

    this.Frame.getIdentity({ ModuleID: "000007" }, (identify) => {
      const isCollegeManager =
        identify && identify[0].IdentityCode === "IC0009";

      dispatch(
        userIndetifyChange({
          isCollegeManager,
          identifyList: identify ? identify : [],
        })
      );

      this.requestData();
    });

    if (parseInt(ProductType) === 6) {
      document.title = "课程管理";
    } else {
      document.title = "学科课程管理";
    }
  }

  // 请求每个组件主要渲染的数据
  requestData = () => {
    const { dispatch, DataState, productType } = this.props;

    const { LoginUser, PeriodMsd } = DataState;

    const { SchoolID, UserType } = LoginUser;

    if (UserType === "7" || UserType === "10") {
      const isCourse = getQueryVariable("isCourse");

      if (isCourse || productType === 6) {
        dispatch(menuActions.leftMenuChange("course"));
      } else {
        dispatch(menuActions.leftMenuChange("subject"));
      }
    } else {
      /*let havePower = QueryPower({

                UserInfo: LoginUser,

                ModuleID: SUBJECT_MODULEID

            });

            havePower.then(res => {

                console.log(res);

                if (res) {//有权限

                    const isCourse = getQueryVariable('isCourse');

                    if (isCourse||productType===6){

                        dispatch(menuActions.leftMenuChange('course'));

                    }else{

                        dispatch(menuActions.leftMenuChange('subject'));

                    }

                }else{

                    window.location.href='/Error.aspx?errcode=E011';

                }


            })*/

      const isCourse = getQueryVariable("isCourse");

      if (isCourse || productType === 6) {
        dispatch(menuActions.leftMenuChange("course"));
      } else {
        dispatch(menuActions.leftMenuChange("subject"));
      }
    }
  };

  menuClick(ID) {
    const { dispatch } = this.props;

    dispatch(menuActions.leftMenuChange(ID));

    dispatch(subActions.lookSubject(""));
  }

  onRef(ref) {
    this.Frame = ref;
  }

  render() {
    const { UIState, DataState, menu, productType } = this.props;

    const { LoginUser } = DataState;

    const { AppAlert, AppLoading } = UIState;

    const { UserID, UserName, PhotoPath } = LoginUser;
    const { Import } = this.state;
    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={AppLoading.appLoading}
        >
          <Frame
            pageInit={this.pageInit.bind(this)}
            module={{
              cnname: productType === 6 ? "课程管理" : "学科课程管理",
              enname:
                productType === 6
                  ? "Course Management"
                  : "Subject&Course Management",
              image: logo,
              subtitle: Import && Import.subtitle,
            }}
            className="myFrame"
            type="triangle"
            showLeftMenu={false}
            showBarner={!Import && productType !== 6}
            onRef={this.onRef.bind(this)}
          >
            <div ref={"frame-time-barner"}>
              <TimeBanner
                timeBannerChange={this.menuClick.bind(this)}
                active={menu.active}
                list={[
                  { ID: "subject", Name: "学科管理" },
                  { ID: "course", Name: "课程管理" },
                ]}
              ></TimeBanner>
            </div>

            <div ref="frame-right-content">
              {Import ? (
                <ImportFile
                  title={Import.subtitle}
                  route={Import.route}
                ></ImportFile>
              ) : (
                <>
                  {menu.active === "subject" ? <Subject></Subject> : ""}

                  {menu.active === "course" ? <Course></Course> : ""}
                </>
              )}
            </div>
          </Frame>
        </Loading>

        <Alert
          className={`${this.state.isInitGuide ? "isInitGuide" : ""}`}
          show={AppAlert.appAlert}
          type={AppAlert.type}
          abstract={AppAlert.littleTitle}
          title={AppAlert.title}
          onOk={AppAlert.onOk}
          onHide={AppAlert.onHide}
          onCancel={AppAlert.onCancel}
          onClose={AppAlert.onClose}
          cancelShow={AppAlert.cancelShow}
          okShow={AppAlert.okShow}
          okTitle={AppAlert.okTitle}
          cancelTitle={AppAlert.cancelTitle}
        ></Alert>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(App);
