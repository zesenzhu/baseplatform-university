import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import { Loading, Empty } from "../../../../common";
import ContentItem from "../contentItem";
import StudyCard from "./StudyCard";
let { MainActions, CommonActions } = actions;
const { TabPane } = Tabs;
class SelfStudy extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillMount() {}

  render() {
    let {
      MoreData: {
        CommonData: {
          StuResultParams: { SelectBar, TabLoadingVisible },
        },
        MainData: {
          AITrain,
          BeforeClass,
          AfterClass,
          ReTrain,
          PlanClass,
          ResStudy,
        },
      },
    } = this.props;
    let CommentData = "";
    return (
      <div id="SelfStudy">
        <div className="TR-box">
          {AITrain.IsExist ? (
            <StudyCard data={AITrain}></StudyCard>
          ) : (
            ""
          )}
          {BeforeClass.IsExist ? (
            <StudyCard data={BeforeClass}></StudyCard>
          ) : (
            ""
          )}
          {AfterClass.IsExist ? (
            <StudyCard data={AfterClass}></StudyCard>
          ) : (
            ""
          )}
          {ReTrain.IsExist ? (
            <StudyCard data={ReTrain}></StudyCard>
          ) : (
            ""
          )}
          {PlanClass.IsExist ? (
            <StudyCard data={PlanClass}></StudyCard>
          ) : (
            ""
          )}
          {ResStudy.IsExist ? (
            <StudyCard data={ResStudy}></StudyCard>
          ) : (
            ""
          )}
          {/* {StudentReportData instanceof Array &&
          StudentReportData.length > 0 ? (
            StudentReportData.map((child, index) => {
              
              return <StudyCard data={child} key={index}></StudyCard>;
            })
          ) : (
            <Empty
              style={{ marginBottom: "20px" }}
              type={"4"}
              title={"作业自学"}
            ></Empty>
          )} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(SelfStudy);
