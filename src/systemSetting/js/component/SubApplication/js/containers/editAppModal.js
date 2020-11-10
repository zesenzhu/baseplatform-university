import React, { Component } from "react";
import "../../scss/index.scss";
import { connect } from "react-redux";
import {
  DropDown,
  Search,
  Empty,
  Loading,
  Modal,
  CheckBoxGroup,
} from "../../../../../../common";
import AccessAction from "../../../../action/data/AccessAction";
import AppAlertAction from "../../../../action/UI/AppAlertAction";
import { Tabs } from "antd";
import UpUIState from "../../../../action/UpUIState";
import { Scrollbars } from "react-custom-scrollbars";
import SubCard from "../component/SubCard";
import AddApplication from "../component/AddApplication";
let { ModalLoadingOpen, ModalLoadingClose } = UpUIState;
const { TabPane } = Tabs;

class EditAppModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddAccessOk = () => {
    let { dispatch, AccessData } = this.props;
  
      dispatch(
        AccessAction.UpdateApplicationInfo({
          func: (state) => {
            dispatch(
              AccessAction.SetModalVisible({
                EditAccessModalVisible: false,
              })
            );
            dispatch(
              AccessAction.SetAddApplicationParams({
                ...AccessData.AppilicationInitParams,
              })
            );
            dispatch(
              AccessAction.SetAddApplicationTipsVisible({
                ...AccessData.InitAppilicationTipsVisible,
              })
            );
            
            dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
            dispatch(AccessAction.GetAccessInfo({}));
          },
        })
      );
     
  };

  onAddAccessCancel = () => {
    let { dispatch, AccessData } = this.props;
    dispatch(ModalLoadingClose());

    dispatch(
      AccessAction.SetModalVisible({
        EditAccessModalVisible: false,
      })
    );
    dispatch(
      AccessAction.SetAddAccessComponentChange({
        ComponentChange: "0",
      })
    );
    dispatch(
      AccessAction.SetAddApplicationTipsVisible({
        ...AccessData.InitAppilicationTipsVisible,
      })
    );
    dispatch(
      AccessAction.SetAddApplicationParams({
        ...AccessData.AppilicationInitParams,
      })
    );
  };

  render() {
    const {
      subsystemInfo,
      semesterloading,
      AccessData,
      UIState: {
        AppLoading: { modalLoading },
      },
    } = this.props;
    let {
      StaticData,
      LoginUser,
      AccessInfo: { AccessInfoParams, AccessInfoData },
      LoadingVisible: {
        AccessDetailLoadingVisible,
        AddAccessLoadingVisible,
        EditAccessLoadingVisible,
        AddAccessEntrancesLoadingVisible,
        EditAccessEntrancesLoadingVisible,
        AddAccessComponentLoadingVisible,
        AccessContentLoadingVisible,
      },
      ModalVisible: {
        AccessDetailModalVisible,
        AddAccessModalVisible,
        EditAccessModalVisible,
        AddAccessComponentModalVisible,
        AddAccessEntrancesModalVisible,
        EditAccessEntrancesModalVisible,
      },
      AddAccessModalData: { ComponentChange, CheckList },
      ApplicationList: { List, KeyList },
    } = AccessData;
    return (
      <Modal
        type="1"
        title="编辑应用"
        className="EditAppModal"
        onOk={() => {
          if (EditAccessLoadingVisible) {
            return;
          }
          this.onAddAccessOk();
        }}
        onCancel={this.onAddAccessCancel}
        width={"1159px"}
        bodyStyle={{ height: "400px" }}
        visible={EditAccessModalVisible}
        okText="保存"
        //   footer={null}
        destroyOnClose={true}
      >
        <Loading
          spinning={EditAccessLoadingVisible}
          opacity={0.5}
          tip="请稍候..."
        >
          <AddApplication className='EditApplication'></AddApplication>
        </Loading>
      </Modal>
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
export default connect(mapStateToProps)(EditAppModal);
