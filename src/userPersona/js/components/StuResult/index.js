import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";
import NearExam from "./NearExam";
import TermReport from "./TermReport";
import SelfStudy from "./SelfStudy";

const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class StuQuality extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      firstTime: true, //是否第一次，进行接口请求控制
      isSelfStudy: false,
    };
  }
  componentWillMount() {
    // 控制作业自习显示，ProductType为2
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};

    if (Number(ProductType) === 2) {
      this.setState({
        isSelfStudy: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    let { firstTime } = this.state;
    let {
      dispatch,
      MoreData: {
        CommonData: { StuResultParams },
      },
      systemUrl: { Urls },
      loginUser: { SchoolID },

      targetUser: { UserID },
      termInfo: { Term },
      userArchives: { ClassID, GradeID },
    } = nextProps;
    // let {}
    // Term = 1;
    // GradeID = "1AD37424-9F56-4DAD-81C6-B94CE498A8DA";
    // ClassID = "A00C8711-A908-41E0-98B4-4DFD8038E8E0";
    // SchoolID = "S-888";
    let token = sessionStorage.getItem("token");
    if (
      firstTime &&
      ClassID &&
      Term &&
      GradeID &&
      UserID &&
      token &&
      SchoolID &&
      Urls["810"].WsUrl
    ) {
      this.setState({
        firstTime: false,
      });
      dispatch(
        CommonActions.SetStuResultParams({
          Proxy: Urls["810"].WsUrl,
          ClassID,
          Term,
          GradeID,
          SchoolID,
          XH: UserID,
          Token: token,
          // SelectBar: "NearExam",
        })
      );
      this.onSelectBar("NearExam");
    }
  }

  onSelectBar = (key) => {
    //默认选中最近考试
    let { dispatch } = this.props;
    dispatch(
      CommonActions.SetStuResultParams({
        SelectBar: key ? key : "NearExam",
      })
    );
    // return ;

    if (key === "TermReport") {
      dispatch(MainActions.GetStudentReport({}));
    } else if (key === "SelfStudy") {
      dispatch(MainActions.GetSelfStudy({}));
    } else {
      dispatch(MainActions.GetStuNearExam({}));
    }
  };
  render() {
    let {
      MoreData: {
        CommonData: {
          StuResultParams: { SelectBar, TabLoadingVisible },
        },
        MainData: {
          StuNearExamData: { PubName },
        },
      },
      systemUrl: {
        Urls: { E34 },
      },
      identifyInfo,
    } = this.props;
    // TabLoadingVisible= false
    let { firstTime, isSelfStudy } = this.state;
    return (
      <ContentItem type="score" tabName={"学生成绩信息"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={firstTime}
        >
          <div className="StuResult">
            <div className="SR-top">
              <div className="SRt-left">
                <span
                  className={`SRtl-bar SRtl-NearExam ${
                    SelectBar === "NearExam" ? "SRtl-bar-select" : ""
                  }`}
                  onClick={this.onSelectBar.bind(this, "NearExam")}
                >
                  最近考试
                </span>
                <span className="devide"></span>
                <span
                  className={`SRtl-bar SRtl-TermReport  ${
                    SelectBar === "TermReport" ? "SRtl-bar-select" : ""
                  }`}
                  onClick={this.onSelectBar.bind(this, "TermReport")}
                >
                  期末总评
                </span>
                {isSelfStudy ? (
                  <>
                    <span className="devide"></span>
                    <span
                      className={`SRtl-bar SRtl-SelfStudy  ${
                        SelectBar === "SelfStudy" ? "SRtl-bar-select" : ""
                      }`}
                      onClick={this.onSelectBar.bind(this, "SelfStudy")}
                    >
                      作业自学
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
              {E34 && E34.WebUrl ? (
                <LinkBtn
                  type="score"
                  onClick={() => {
                    let token = sessionStorage.getItem("token");
                    window.open(
                      E34.WebUrl +
                        "/index_user.html?lg_tk=" +
                        token +
                        "&lg_ic=" +
                        identifyInfo[0].IdentityCode +
                        "#6|1|0"
                    );
                  }}
                  className="SRt-go"
                >
                  学生成绩查询
                </LinkBtn>
              ) : (
                ""
              )}
            </div>
            <Loading
              //  tip="加载中..."
              size="small"
              opacity={false}
              spinning={TabLoadingVisible}
              // spinning={false}
            >
              <Tabs
                activeKey={SelectBar}
                renderTabBar={() => {
                  return <div></div>;
                }}
              >
                <TabPane key="NearExam">
                  {PubName ? (
                    <NearExam></NearExam>
                  ) : (
                    <Empty
                      style={{ margin: "20px 0" }}
                      type={"4"}
                      title={"最近暂无考试"}
                    ></Empty>
                  )}
                </TabPane>
                <TabPane key="TermReport">
                  <TermReport></TermReport>
                </TabPane>
                {isSelfStudy ? (
                  <TabPane key="SelfStudy">
                    <SelfStudy></SelfStudy>
                  </TabPane>
                ) : (
                  ""
                )}
              </Tabs>
            </Loading>
          </div>{" "}
        </Loading>
      </ContentItem>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(StuQuality);
