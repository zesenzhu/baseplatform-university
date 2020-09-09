import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker } from "antd";
import { Modal, DropDown, Loading } from "../../../../common";
import moment from "moment";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import actions from "../../actions";
let { MainAction, CommonAction, PublicAction } = actions;

class UserArchivesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    if (ModalLoading) {
      return;
    }
    let TypeName = "";
    switch (UserArchivesModalType) {
      case "add":
        TypeName = "添加";
        break;
      case "edit":
        TypeName = "编辑";
        break;
      default:
        break;
    }
    this.ModalCancel();
    dispatch(
      PublicAction.showErrorAlert({
        type: "success",
        title: TypeName + "成功",
      })
    );
  };
  ModalCancel = () => {
    let { dispatch } = this.props;
    // if (modalLoading) {
    //   return;
    // }
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: false,
      })
    );
  };

  render() {
    let {
      DataState: {
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    let TypeName = "";
    switch (UserArchivesModalType) {
      case "add":
        TypeName = "添加";
        break;
      case "edit":
        TypeName = "编辑";
        break;
      default:
        break;
    }
    let RoleName = "";
    switch (UserArchivesModalRole) {
      case "Student":
        RoleName = "学生";
        break;
      case "Teacher":
        RoleName = "教师";
        break;
      case "Leader":
        RoleName = "领导";
        break;
      default:
        break;
    }
    return (
      <Modal
        ref="UserArchivesModal"
        bodyStyle={{ minHeight: "456px" }}
        type="1"
        title={TypeName + RoleName}
        width={810}
        visible={UserArchivesModalVisible}
        className="UserArchivesModal"
        onOk={this.ModalOk}
        onCancel={this.ModalCancel}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={ModalLoading}
        >
          {UserArchivesModalType}
        </Loading>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(UserArchivesModal);
