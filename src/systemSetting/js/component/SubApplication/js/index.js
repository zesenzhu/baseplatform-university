import React, { Component } from "react";
import "../scss/index.scss";
import { connect } from "react-redux";
import { Modal, Loading } from "../../../../../common";
import AccessAction from "../../../action/data/AccessAction";
import Main from "./containers/main";
import SetAppModal from './containers/setAppModal'
import EditAppModal from './containers/editAppModal'

class SubApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { dispatch } = props;

    dispatch(AccessAction.GetAccessInfo({}));
    dispatch(AccessAction.getImgUrlProxy());
    dispatch(
      AccessAction.getLoginUser(JSON.parse(sessionStorage.getItem("UserInfo")))
    );
  }

  render() {
    return (
      <div id="SubApplication">
        <Main></Main>
        <SetAppModal></SetAppModal>
        <EditAppModal></EditAppModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { DataUpdate, AccessData, UIState } = state;
  const { subsystemInfo, semesterloading } = DataUpdate;
  // console.log(AppAlert);

  return {
    subsystemInfo,
    semesterloading,
    AccessData,
    UIState,
  };
};
export default connect(mapStateToProps)(SubApplication);
