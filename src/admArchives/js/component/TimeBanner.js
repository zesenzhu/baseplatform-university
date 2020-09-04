import React from "react";
import { connect } from "react-redux";
import history from "../containers/history";
import TopMenu from "./newEdition/TopMenu";

import "../../scss/TimeBanner.scss";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Button } from "../../../common";
class TimeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "All", title: "用户档案总览", icon: "All" },
        { value: "Student", title: "学生档案", icon: "Student" },
        { value: "Teacher", title: "教师档案", icon: "Teacher" },
        { value: "Leader", title: "领导档案", icon: "Leader" },
        { value: "Graduate", title: "毕业生档案 ", icon: "Graduate" },
      ],
    };
  }
  onSelectMenu = (key) => {
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    if (key !== "All") {
      // console.log(key)
      if (handleRoute === "Student") {
        window.StudentCancelSearch && window.StudentCancelSearch();
      } else if (handleRoute === "Teacher") {
        window.TeacherCancelSearch && window.TeacherCancelSearch();
      } else if (handleRoute === "Leader") {
        window.LeaderCancelSearch && window.LeaderCancelSearch();
      }
      history.push("/UserArchives/" + key + "/all");
    } else {
      history.push("/UserArchives/" + key);
    }
    // history.push('/'+key)
  };
  render() {
    const { DataState, UIState } = this.props;
    let {
      MainData: { SysUrl },
 
    } = DataState;
    let userMsg = DataState.LoginUser;
    let AdminPower = true;
    // let pathname = history.location.pathname;

    // let pathArr = pathname.split("/");
    // let handleRoute = pathArr[2];
    // console.log(handleRoute);
    let { ProductType,LockerVersion } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
      let token =  
      sessionStorage.getItem("token");
    let List = [];
    if (userMsg.UserType === "7") {
      this.state.List.map((child, index) => {
        if (child.value !== "Leader") {
          List.push(child);
        }
      });
    } else if (ProductType === 6) {
      //适配人工智能实训室，不要领导
      this.state.List.map((child, index) => {
        if (child.value !== "Leader") {
          List.push(child);
        }
      });
    } else {
      List = this.state.List;
    }
    if (LockerVersion === "1") {
      //校园基础信息管理 XG5.2-免费版,1为基础版
      let CopyList = List;
      List = [];
      CopyList.map((child, index) => {
        if (child.value !== "Graduate") {
          List.push(child);
        }
      });
    }
    if (SysUrl instanceof Array && SysUrl.length > 0&&userMsg.UserType === "0") {
      let CopyList = List;
      List = [];
      CopyList.map((child, index) => {
          List.push(child);
      });
      List.push({
        value: SysUrl[0].WebSvrAddr+'?lg_tk='+token,
        title: "人脸库 ",
        icon: "Face",
      });
    }
    return (
      <Router>
        <TopMenu List={List}></TopMenu>
        {this.props.route ? (
          // (<Link to='/ImportFile/Graduate' target='_blank'><Button className='btn-toGraduate' color='blue' shape='round'>导入毕业去向</Button></Link>)
          ""
        ) : AdminPower ? (
          DataState.LogPreview.unreadLogCount !== 0 ? (
            <span className="timeBanner_tips">
              最近有
              <span className="tips_num">
                {DataState.LogPreview.unreadLogCount}
              </span>
              份档案发生了变更，
              <Link
                to="/UserArchives/LogDynamic"
                target="_blank"
                className="tips_handle"
              >
                查看详情{">>"}
              </Link>
            </span>
          ) : (
            <span className="timeBanner_tips">
              最近没有档案发生变更，
              <Link
                to="/UserArchives/LogRecord"
                target="_blank"
                className="tips_handle"
              >
                查看全部变更记录{">>"}
              </Link>
            </span>
          )
        ) : (
          ""
        )}
      </Router>
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
export default connect(mapStateToProps)(TimeBanner);
