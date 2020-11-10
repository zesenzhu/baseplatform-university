import React, { Component } from "react";
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
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class AppDetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // 关闭详情
  onAccessDetailCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        AccessDetailModalVisible: false,
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

      ApplicationDetail: {
        Entrances,
        ApplicationID,
        ApplicationName,
        Provider,
        Introduction,
        ApplicationImgUrl,
        ApplicationStatus,
        ApplicationType,
        IsThirdPartyName,
        CreateTime,
        ApplicationStatusName,
        ApplicationUrl,
        ApplicationTypeName,
        ApplicationSecret,
        ApplicationCallbackAddr,
        ApplicationApiAddr,
      },
    } = AccessData;

    return (
      <Modal
        type="1"
        title="查看应用详情"
        // className="SetAppModal"
        
        onCancel={this.onAccessDetailCancel}
        width={"1033px"}
        bodyStyle={{ height: "400px" }}
        visible={AccessDetailModalVisible}
        okText="保存"
        //   footer={null}
        destroyOnClose={true}
      >
        <Loading spinning={AccessDetailLoadingVisible} opacity={false} tip="请稍候...">
          <div className="AppDetailModal">
            <div className="access-main-msg-box">
              <span className="row clearfix">
                应用名称：
                <span title={ApplicationName} className="access-main-msg">
                  {ApplicationName ? ApplicationName : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                所有者：
                <span
                  title={Provider + "(" + IsThirdPartyName + ")"}
                  className="access-main-msg"
                >
                  {Provider ? Provider : "未填写"}
                  {/* (
              {IsThirdPartyName ? IsThirdPartyName : "未填写"}) */}
                </span>
              </span>
              <span className="row clearfix">
                添加时间：
                <span title={CreateTime} className="access-main-msg">
                  {CreateTime ? CreateTime : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                运行状态：
                <span title={ApplicationStatusName} className="access-main-msg">
                  {ApplicationStatusName ? ApplicationStatusName : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用ID：
                <span title={ApplicationID} className="access-main-msg">
                  {ApplicationID ? ApplicationID : "未填写"}
                </span>
              </span>

              <span className="row clearfix">
                应用密钥：
                <span title={ApplicationSecret} className="access-main-msg">
                  {ApplicationSecret ? ApplicationSecret : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用简介：
                <span title={Introduction} className="access-main-msg">
                  {Introduction ? Introduction : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用图标：
                <img
                  width={40}
                  height={40}
                  src={ApplicationImgUrl}
                  alt={ApplicationImgUrl}
                ></img>
                {/* <span title={ApplicationImgUrl} className="access-main-msg">
              
              {ApplicationImgUrl ? ApplicationImgUrl : "未填写"}
            </span> */}
              </span>
              <span className="row clearfix">
                授权回调地址：
                <span
                  title={ApplicationCallbackAddr}
                  className="access-main-msg"
                >
                  {ApplicationCallbackAddr ? ApplicationCallbackAddr : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用分类：
                <span title={ApplicationTypeName} className="access-main-msg">
                  {ApplicationTypeName ? ApplicationTypeName : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用访问地址：
                <span title={ApplicationUrl} className="access-main-msg">
                  {ApplicationUrl ? ApplicationUrl : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                接口服务地址：
                <span title={ApplicationApiAddr} className="access-main-msg">
                  {ApplicationApiAddr ? ApplicationApiAddr : "未填写"}
                </span>
              </span>
              <span className="row clearfix">
                应用访问入口：
                <span
                  title={"当前已添加" + Entrances.length + "个入口"}
                  className="access-main-msg"
                >
                  当前已添加{Entrances.length}个入口
                </span>
              </span>
            </div>
          </div>
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
export default connect(mapStateToProps)(AppDetailModal);
