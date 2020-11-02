import React from "react";
import { connect } from "react-redux";
import "../../../scss/Barner/TimeBanner.scss";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import TopMenu from "./TopMenu";
import TopHandle from "./TopHandle";
import AddClassModal from "../Modal/AddClassModal";
import actions from "../../actions";
import Public from "../../../../common/js/public";

import config from "../../../../common/js/config";

import { Button, Modal } from "../../../../common";
const { UpDataState, UpUIState, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;
class TimeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "Grade", title: "年级管理", icon: "Grade" },
        { value: "Class", title: "行政班级管理", icon: "Class" },
      ],
    };
  }
  onSelectMenu = (key) => {
    let { dispatch } = this.props;
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[1];

    // console.log(key)
    if (handleRoute === "Class") {
      dispatch(
        UpDataState.SetSelectGradeData({
          value: "",
          title: "全部年级",
        })
      );
    }
    history.push("/" + key);
  };
  onAddClassClick = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { selectGrade,selectCollege ,selectMajor},
      },
    } = this.props;
    dispatch(UpDataState.GetSummary({isFirst :false}));

    dispatch(
      UpDataState.SetAddClassParams({
        GradeID: selectGrade.value,
        GradeName: selectGrade.title,
        CollegeID: selectCollege.value,
        CollegeName: selectCollege.title,
        MajorID: selectMajor.value,
        MajorName: selectMajor.title,
      })
    );
    dispatch(
      UpDataState.SetModalVisible({
        AddClassModalVisible: true,
      })
    );
  };
  onImportClick = () => {
    let { dispatch } = this.props;

    let url =
      config.HashPrevProxy +
      "/html/class" +
      window.location.search +
      "#/Import/Genger";

    // console.log(url);
    checkUrlAndPostMsg({ btnName: "导入班主任及班长", url });
    // window.open("/html/class/#/Import/Genger");
  };
  onAddClassModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          AddClassParams: { GradeID, ClassName, CollegeID, MajorID },
        },
      },
    } = this.props;
    let isError = false;
    if (CollegeID === "") {
      isError = true;

      dispatch(
        UpDataState.SetTipsVisible({
          AddClassSelectCollegeTipsVisible: true,
        })
      );
    } else if (MajorID === "") {
      isError = true;

      dispatch(
        UpDataState.SetTipsVisible({
          AddClassSelectMajorTipsVisible: true,
        })
      );
    } else if (GradeID === "") {
      isError = true;

      dispatch(
        UpDataState.SetTipsVisible({
          AddClassSelectGradeTipsVisible: true,
        })
      );
    } else {
      dispatch(
        UpDataState.SetTipsVisible({
          AddClassSelectGradeTipsVisible: false,
        })
      );
    }
    if (!this.checkName(ClassName) && !isError) {
      dispatch(
        UpDataState.AddClass({
          func: () => {
            this.onAddClassModalCancel();
            dispatch(UpDataState.GetSummary({}));
            // console.log(history)
            if (history.location.pathname.includes("Class")) {
              dispatch(UpDataState.GetGradeSummary({}));
            }
          },
        })
      );
    }
  };
  onAddClassModalCancel = () => {
    let { dispatch } = this.props;

    dispatch(
      UpDataState.SetModalVisible({
        AddClassModalVisible: false,
      })
    );
    dispatch(
      UpDataState.SetAddClassParams({
        GradeName: "",
        GradeID: "",
        ClassName: "",
        CollegeName: "",
        CollegeID: "",
        MajorName: "",
        MajorID: "",
      })
    );
    dispatch(
      UpDataState.SetTips({
        AddClassSelectGradeTips: "请选择年级",
        AddClassNameTips: "班级名称不能为空",
        AddClassSelectCollegeTips: "请选择学院",
        AddClassSelectMajorTips: "请选择专业",
      })
    );
    dispatch(
      UpDataState.SetTipsVisible({
        AddClassSelectGradeTipsVisible: false,
        AddClassNameTipsVisible: false,
        AddClassSelectCollegeTipsVisible: false,
        AddClassSelectMajorTipsVisible: false,
      })
    );
  };
  //
  onEditNameChange = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value);
    dispatch(
      UpDataState.SetAddClassParams({
        ClassName: e.target.value,
      })
    );
  };
  onEditNameBlur = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value);

    // dispatch(
    //   UpDataState.SetGradeData({
    //     GradeName: e.target.value,
    //   })
    // );
  };
  checkName = (name, func = () => {}) => {
    let { dispatch } = this.props;
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      name
    );
    let isError = false;
    if (name === "") {
      dispatch(UpDataState.SetTips({ AddClassNameTips: "班级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ AddClassNameTipsVisible: true }));
      isError = true;
    } else if (!Test) {
      dispatch(UpDataState.SetTips({ AddClassNameTips: "班级名称格式不正确" }));
      dispatch(UpDataState.SetTipsVisible({ AddClassNameTipsVisible: true }));
      isError = true;
    } else {
      dispatch(UpDataState.SetTips({ AddClassNameTips: "班级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ AddClassNameTipsVisible: false }));
      func();
    }
    return isError;
  };

  onSelectGrade = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetTipsVisible({
        AddClassSelectGradeTipsVisible: false,
      })
    );
    dispatch(
      UpDataState.SetAddClassParams({
        GradeName: e.title,
        GradeID: e.value,
      })
    );
    // dispatch(UpDataState.GetGradeSummary({}));
  };
  onSelectCollege = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetTipsVisible({
        AddClassSelectCollegeTipsVisible: false,
      })
    );
    dispatch(
      UpDataState.SetAddClassParams({
        CollegeName: e.title,
        CollegeID: e.value,
        // MajorName: e.title,
        MajorID: '',
      })
    );
    // dispatch(UpDataState.GetGradeSummary({}));
  };
  onSelectMajor = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetTipsVisible({
        AddClassSelectMajorTipsVisible: false,
      })
    );
    dispatch(
      UpDataState.SetAddClassParams({
        MajorName: e.title,
        MajorID: e.value,
      })
    );
    // dispatch(UpDataState.GetGradeSummary({}));
  };

  onImportStudentClick = () => {
    let { dispatch } = this.props;
  };
  onAddStudentClick = () => {
    let { dispatch } = this.props;
  };
  onGoLoginUpClick = () => {
    let { dispatch } = this.props;
  };
  render() {
    const {
      DataState: {
        CommonData: {
          ModalVisible: { AddClassModalVisible },
          TipsVisible,
          Tips,
          AddClassParams,
          UserPower,
        },
        MainData: { GradeData, TreeData },
      },
      UIState,
      route,
    } = this.props;
    let GradeList = [];
    GradeData instanceof Array &&
      GradeData.forEach((child) => {
        GradeList.push({
          value: child.GradeID,
          title: child.GradeName,
        });
      });

    let CollegeList = [];
    let MajorData = {};

    TreeData instanceof Array &&
      TreeData.forEach((child) => {
        CollegeList.push({
          value: child.CollegeID,
          title: child.CollegeName,
        });
        MajorData[child.CollegeID] = [];
        // let MajorList = [{ value: "", title: "全部专业" }];

        child.Majors instanceof Array &&
          child.Majors.forEach((child) => {
            MajorData[child.CollegeID].push({
              value: child.MajorID,
              title: child.MajorName,
            });
          });
      });
    let pathname = history.location.pathname;

    let pathArr = pathname.split("/");
    let handleRoute = pathArr[1];
    return (
      <Router>
        {/* {UserPower.includes('Admin') && handleRoute !== "ClassDetails" ? (
          <TopMenu onSelectMenu={this.onSelectMenu}></TopMenu>
        ) : (
          ""
        )} */}
        {
          <TopHandle
            userPower={UserPower}
            handleRoute={handleRoute}
            onImportClick={this.onImportClick}
            onAddClassClick={this.onAddClassClick}
            onImportStudentClick={this.onImportStudentClick}
            onAddStudentClick={this.onAddStudentClick}
            onGoLoginUpClick={this.onGoLoginUpClick}
          ></TopHandle>
        }

        <Modal
          ref="ReNameClass"
          bodyStyle={{ padding: 0, height: "270px" }}
          type="1"
          title="添加班级"
          width={540}
          visible={AddClassModalVisible}
          onOk={this.onAddClassModalOk}
          onCancel={this.onAddClassModalCancel}
        >
          <AddClassModal
            type="class"
            data={AddClassParams}
            onEditNameChange={this.onEditNameChange}
            onEditNameBlur={this.onEditNameBlur}
            onSelectGrade={this.onSelectGrade}
            onSelectCollege={this.onSelectCollege}
            onSelectMajor={this.onSelectMajor}
            tipsVisible={TipsVisible}
            tipsTitle={Tips}
            UserPower={UserPower}
            gradeList={GradeList}
            collegeList={CollegeList}
            majorData={MajorData}
          ></AddClassModal>
        </Modal>
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
