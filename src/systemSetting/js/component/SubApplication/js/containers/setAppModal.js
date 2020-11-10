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

class SetAppModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddAccessOk = () => {
    let { dispatch, AccessData } = this.props;
    if (AccessData.AddAccessModalData.ComponentChange === "0") {
      if (
        !(AccessData.AddAccessModalData.CheckList instanceof Array) ||
        AccessData.AddAccessModalData.CheckList.length === 0
      ) {
        dispatch(
          AppAlertAction.alertSuccess({ title: "请选择应用", type: "warn" })
        );
        return;
      }
      dispatch(ModalLoadingOpen());

      dispatch(
        AccessAction.AddApplicationToSchool({
          applicationIds: AccessData.AddAccessModalData.CheckList.join(","),
          func: (state) => {
            dispatch(ModalLoadingClose());

            dispatch(
              AccessAction.SetModalVisible({
                AddAccessModalVisible: false,
              })
            );
            dispatch(
              AccessAction.SetAddApplicationParams({
                ...AccessData.AppilicationInitParams,
              })
            );
            dispatch(
              AccessAction.SetAddAccessComponentChange({
                ComponentChange: "0",
              })
            );
            dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
            dispatch(AccessAction.GetAccessInfo({}));
          },
        })
      );
    } else if (AccessData.AddAccessModalData.ComponentChange === "1") {
      dispatch(
        AccessAction.AddApplicationInfo({
          func: (state) => {
            dispatch(
              AccessAction.SetModalVisible({
                AddAccessModalVisible: false,
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
            dispatch(
              AccessAction.SetAddAccessComponentChange({
                ComponentChange: "0",
              })
            );
            dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
            dispatch(AccessAction.GetAccessInfo({}));
          },
        })
      );
    }
  };

  onAddAccessCancel = () => {
    let { dispatch, AccessData } = this.props;
    dispatch(ModalLoadingClose());

    dispatch(
      AccessAction.SetModalVisible({
        AddAccessModalVisible: false,
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
  // 点击详情
  onAccessDetailClick = (applicationID) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        AccessDetailModalVisible: true,
      })
    );
    dispatch(
      AccessAction.GetApplicationDetail({
        applicationID,
      })
    );
  };
  // activekey change
  onActiveKeyChange = (key) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetAddAccessComponentChange({ ComponentChange: key })
    );
  };
  // 多选
  onSelectApp = (id, select) => {
    let { dispatch, AccessData } = this.props;
    let {
      ApplicationList: { KeyList },
      AddAccessModalData: { CheckList },
    } = AccessData;
    let Check = [];
    CheckList.forEach((child) => {
      if (child !== id) {
        Check.push(child);
      }
    });
    if (select) {
      Check.push(id);
    }
    dispatch(
      AccessAction.SetAddAccessComponentChange({
        CheckList: Check,
        // CheckAll: value.length === KeyList.length ? true : false,
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
        title="添加应用"
        className="SetAppModal"
        onOk={()=>{
            if(EditAccessLoadingVisible||AddAccessLoadingVisible){
                return;
            }
            this.onAddAccessOk()}}
        onCancel={this.onAddAccessCancel}
        width={"1159px"}
        bodyStyle={{ height: "596px" }}
        visible={AddAccessModalVisible}
        okText="保存"
        //   footer={null}
        destroyOnClose={true}
      >
        <Loading spinning={modalLoading} opacity={false} tip="请稍候...">
          <div className="tab-bar-top">
            <span
              className={`tab-bar ${
                ComponentChange === "0" ? "actived" : "default"
              }`}
              onClick={this.onActiveKeyChange.bind(this, "0")}
            >
              选择已有应用
            </span>
            <span
              onClick={this.onActiveKeyChange.bind(this, "1")}
              className={`tab-bar ${
                ComponentChange === "1" ? "actived" : "default"
              }`}
            >
              录入新的应用
            </span>
          </div>
          <Tabs
            onChange={this.onActiveKeyChange}
            type="card"
            activeKey={ComponentChange}
            renderTabBar={(props, DefaultTabBar) => {
              return <></>;
            }}
          >
            <TabPane tab="添加已有应用" key="0">
              <Loading
                spinning={AddAccessLoadingVisible}
                opacity={false}
                tip="请稍候..."
              >
                <div className="exists-content">
                  <Scrollbars
                    autoHeightMin={33}
                    autoHeightMax={500}
                    // autoWidthMin={100}
                    // autoWidthMax={400}
                    className="Scrollbars"
                  >
                    {/* <CheckBoxGroup
                    onChange={this.onCheckBoxGroupChange}
                    value={CheckList}
                  > */}
                    {List instanceof Array &&
                      List.map((child, index) => (
                        <SubCard
                          className="add-card"
                          type={"modal"}
                          key={index}
                          data={child}
                          select={
                            CheckList instanceof Array &&
                            CheckList.some(
                              (value) => value === child.ApplicationID
                            )
                              ? true
                              : false
                          }
                          onAccessDetailClick={this.onAccessDetailClick}
                          onSelectApp={this.onSelectApp}
                        ></SubCard>
                      ))}
                    {/* </CheckBoxGroup> */}
                  </Scrollbars>
                </div>
              </Loading>
            </TabPane>
            <TabPane tab="录入新的应用" key="1">
              <Loading
                spinning={EditAccessLoadingVisible}
                opacity={0.5}
                tip="请稍候..."
              >
                <AddApplication></AddApplication>
              </Loading>
            </TabPane>
          </Tabs>
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
export default connect(mapStateToProps)(SetAppModal);
