import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
// import "../../scss/Main.scss";
import $ from "jquery";
const { UpDataState, UpUIState, PublicAction } = actions;
class TimeBanner extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  render() {
    const {
      DataState: {
        MainData,
        CommonData: { BannerList ,RouteData},
      },
      PublicState,
      SelectMenu,
    } = this.props;
    let handleRoute = RouteData[1];
    
    return (
      <div className="TimeBanner">
        {BannerList instanceof Array &&
          BannerList.map((child, index) => {
            return (
              <span
                key={index}
                onClick={()=>SelectMenu( child.value)}
                className={`menu-bar ${
                  handleRoute === child.value ? "active" : ""
                }`}
              >
                <span className={`bar-content ${"bar-icon-" + child.icon}`}>
                  {child.title}
                </span>
              </span>
            );
          })}
          {}
      </div>
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
export default connect(mapStateToProps)(TimeBanner);
