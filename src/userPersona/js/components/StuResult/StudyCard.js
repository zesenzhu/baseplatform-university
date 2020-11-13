import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import { Loading } from "../../../../common";
import ContentItem from "../contentItem";
let { MainActions, CommonActions } = actions;
const { TabPane } = Tabs;
class StudyCard extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillMount() {}

  render() {
    let { data } = this.props;
    let { CardName, DataList } = data;
    return (
      <div className={`StudyCard  `}>
        <p title={CardName} className="CardName">
          {CardName}
        </p>
        <div className="RC-Msg">
          {DataList instanceof Array &&
            DataList.map((child, index) => {
              let { Num, NumName, Unit } = child;
              return (
                <div
                  key={index}
                  className={`RCM-content`}
                  style={{
                    width: `${Math.floor((1 / DataList.length) * 100)}%`,
                  }}
                >
                  <p title={Num} className="RCMc-top">
                    {Num}
                    {Unit ? <span className="Unit">{Unit}</span> : ""}
                  </p>
                  <p className="RCMc-bottom" title={NumName}>
                    {NumName}
                  </p>
                </div>
              );
            })}
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
export default connect(mapStateToProps)(StudyCard);
