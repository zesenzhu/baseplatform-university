import React, { Component } from "react";
import Frame from "../../../../common/Frame";
import { TokenCheck_Connect } from "../../../../common/js/disconnect";
import Semester from "../SettingOptions/YearSemesterSetting";
import Import from "../Import";
import School from "../SettingOptions/SchoolnfoSetting";
// import Subsystem from '../ApplicationSetting'
import Subsystem from "../SettingOptions/SubsystemAccessSetting";
import setting from "../../../images/setting_logo.png";
import { Menu, Loading } from "../../../../common";
import config from "../../../../common/js/config";
import history from "../../containers/history";
import { QueryPower } from "../../../../common/js/power";
import versionChenck from "../../../../common/js/public";
import TimeBanner from '../newEdition/TimeBanner'
import { connect } from "react-redux";

import DataChange from "../../action/data/DataChange";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MenuParams: {
        MenuBox: {
          display: true,
          width: 240,
          MenuBoxTopPic: "pic8",
        },
        children: [
          {
            key: "Semester",
            title: "学年学期设置",
            icon: "menu38",
            onTitleClick: this.handleClick.bind(this.key),
            active: true,
            selected: true,
          },
          {
            key: "School",
            title: "学校基础资料设置",
            icon: "menu44",
            onTitleClick: this.handleClick.bind(this.key),
          },
          {
            key: "Subsystem",
            title: "子系统访问设置",
            icon: "menu43",
            onTitleClick: this.handleClick.bind(this.key),
          },
        ],
      },
      route: false,
      havePower: false,
      List: [
        { value: "School", title: "学校基础资料设置", icon: "School" },

        { value: "Semester", title: "学年学期设置", icon: "Semester" },
        { value: "Subsystem", title: "子系统访问设置", icon: "Subsystem" },
        
      ],
    };
    const { dispatch } = props;
    const Hash = location.hash;
    versionChenck.IEVersion(); //如果是檢查IE版本是否符合
    //判断是否登录成功
    TokenCheck_Connect(false, () => {
      if (sessionStorage.getItem("UserInfo")) {
        const { SchoolID, UserType } = JSON.parse(
          sessionStorage.getItem("UserInfo")
        );
        const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

        console.log(UserType === "0");
        // dispatch(DataChange.getCurrentSbusystemInfo());////模拟测试使用

        //判断该用户是否是管理员,如果该用户不是管理员跳转到错误页,
        if (UserType !== "0") {
          window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
        } else {
          //如果该用户是管理员则检查用户信息和模块ID是否符合
          QueryPower({ UserInfo, ModuleID: "000-2-0-13" }).then((restlu) => {
            console.log(restlu);

            if (restlu) {
              this.setState({
                havePower: true,
              });
              dispatch(DataChange.getCurrentSemester(SchoolID));
              //    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
              //    dispatch(DataChange.getCurrentSbusystemInfo({}));
              dispatch(DataChange.getServerAdd());
            }
          });
        }
      } else {
        //如果登录不成功则开启定时器,直到登录后获取到token
        let getUserInfo = setInterval(() => {
          if (sessionStorage.getItem("UserInfo")) {
            const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

            const { SchoolID, UserType } = UserInfo;

            if (UserType !== "0") {
              window.location.href =
                config.ErrorProxy + "/Error.aspx?errcode=E011";
            } else {
              //如果该用户是管理员则检查用户信息和模块ID是否符合
              QueryPower({ UserInfo, ModuleID: "000-2-0-13" }).then(
                (restlu) => {
                  console.log(restlu);
                  if (restlu) {
                    this.setState({
                      havePower: true,
                    });
                    dispatch(DataChange.getCurrentSemester(SchoolID));
                    dispatch(DataChange.getServerAdd());
                  }
                }
              );
            }
            // dispatch(DataChange.getCurrentSbusystemInfo());//模拟测试使用

            clearInterval(getUserInfo);
          }
        }, 20);
      }
    });
  }
  componentDidMount() {
    let that = this;
    that.handleMenu();

    //     history.listen((location)=>{
    //     let path =  location.pathname.split("/")[2];
    // console.log(path)
    // that.handleMenu(path)
    //     })
  }
  //操作左侧菜单，响应路由变化
  handleMenu = (path) => {
    if (history.location.pathname === "/MainContent") {
      history.push("/MainContent/School");
    }
    path = path || history.location.pathname.split("/")[2];
    // console.log(path);
    let param = this.state.MenuParams;
    let len = param.children.length;

    for (let i = 0; i < len; i++) {
      param.children[i]["active"] = false;
      param.children[i]["selected"] = false;
      if (path === param.children[i].key) {
        param.children[i]["active"] = true;
        param.children[i]["selected"] = true;
        this.setState({
          MenuParams: param,
        });
        // console.log(param)
      }
    }
  };
  //左侧菜单每项的点击事件
  handleClick = (key) => {
    // console.log(key);

    history.push("/MainContent/" + key);

    // console.log(this.state.MenuParams)
    // this.handleMenu();
  };

  render() {
    let UserName = "";
    let PhotoPath = "";
    //获取用户信息，并渲染到骨架上
    if (sessionStorage.getItem("UserInfo")) {
      const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      UserName = UserInfo.UserName;
      PhotoPath = UserInfo.PhotoPath;
    } else {
      return <div></div>;
    }
    let path = history.location.pathname.split("/")[2];
    let isImport = false;
    if (path === "Import") {
      isImport = true;
    }
    // console.log(path)
    if (
      path !== "Semester" &&
      path !== "School" &&
      path !== "Subsystem" &&
      path !== "Import"
    ) {
      history.push("/MainContent/School");
    }
    return (
      <Loading opacity={false} size="large" spinning={!this.state.havePower}>
        <Frame
          showLeftMenu={false}
          showBarner={!isImport}
          type={"triangle"}
          module={{
            image: setting,
            cnname: "系统设置",
            enname: "System Settings",
          }}
          userInfo={{ name: UserName, image: PhotoPath }}
        >
          <div ref="frame-time-barner">
            <TimeBanner path={path} List={this.state.List} />
          </div>

          <div ref="frame-right-content">
            {this.state.havePower ? (
              <Router>
                <Route
                  path="/MainContent/Semester*"
                  exact
                  history={history}
                  component={Semester}
                ></Route>

                <Route
                  path="/MainContent/School*"
                  exact
                  history={history}
                  component={School}
                ></Route>

                <Route
                  path="/MainContent/Subsystem*"
                  exact
                  history={history}
                  component={Subsystem}
                ></Route>
                <Route
                  path="/MainContent/Import*"
                  exact
                  history={history}
                  component={Import}
                ></Route>
                {/* <Redirect path="/*" to="/MainContent/Semester"></Redirect> */}
              </Router>
            ) : (
              ""
            )}
          </div>
        </Frame>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(MainContent);
