import React, { Component } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import { Tips, Table } from "../../../../common";
import { Input, Tooltip } from "antd";
import DataChange from "../../action/data/DataChange";
import ApiActions from "../../action/data/Api";
import AppAlertAction from "../../action/UI/AppAlertAction";
import CropperModal from "../../../../common/js/CropperModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
// import UIState from '../../reducers/UIState'
import { Scrollbars } from "react-custom-scrollbars";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class AccessDetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "用户对象",
          key: "UserTypeName",
          dataIndex: "UserTypeName",
          width: 120,
          align: "center",
          render: (UserTypeName) => {
            return (
              <div title={UserTypeName} className="UserType">
                {UserTypeName ? UserTypeName : "--"}
              </div>
            );
          },
        },
        {
          title: "入口名称",
          align: "center",
          // colSpan: 2,
          width: 120,
          key: "EntranceName",
          dataIndex: "EntranceName",
          render: (EntranceName) => {
            return (
              <div title={EntranceName} className="EntranceName">
                {EntranceName ? EntranceName : "--"}
              </div>
            );
          },
        },
        {
          title: "入口图标",
          align: "center",
          width: 120,
          // dataIndex: "EntranceImgUrl",
          key: "EntranceImgUrl",
          render: (data) => {
            return (
              <span title={data.entranceIconLarge?data.entranceIconLarge:data.entranceIconMini} className="EntranceImgUrl">
                <img
                  width={40}
                  height={40}
                  src={data.entranceIconLarge?data.entranceIconLarge:data.entranceIconMini}
                  alt={data.entranceIconLarge?data.entranceIconLarge:data.entranceIconMini}
                ></img>
              </span>
            );
          },
        },
        {
          title: "适用学科",
          align: "center",
          width: 120,
          dataIndex: "SubjectNames",
          key: "SubjectNames",
          render: (SubjectNames) => {
            return (
              <span title={SubjectNames} className="SubjectNames">
                {SubjectNames ? SubjectNames : "--"}
              </span>
            );
          },
        },

        {
          title: "支持设备",
          align: "center",
          width: 120,
          dataIndex: "DeviceTypesName",
          key: "DeviceTypesName",
          render: (DeviceTypesName) => {
            return (
              <span title={DeviceTypesName} className="DeviceTypesName">
                {DeviceTypesName ? DeviceTypesName : "--"}
              </span>
            );
          },
        },

        {
          title: "访问路径",
          align: "center",
          width: 200,
          dataIndex: "AccessParam",
          key: "AccessParam",
          render: (AccessParam) => {
            return (
              <a
                target="_blank"
                href={AccessParam}
                title={AccessParam}
                className="AccessParam"
              >
                {AccessParam ? AccessParam : "--"}
              </a>
            );
          },
        },
      ],
    };
  }

  render() {
    const {
      AccessData,

      UIState,
      DataUpdate,
    } = this.props;
    let {
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
    } = AccessData.ApplicationDetail;
    return (
      <div className="AccessDetailModal">
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
            <span title={ApplicationCallbackAddr} className="access-main-msg">
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
        <div className="Entrances-table">
          <table>
          <thead className="ant-table-thead table-top">
            <tr>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">用户对象</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">入口名称</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">入口图标</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">适用学科</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">支持设备</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
              <th
                className="ant-table-align-center"
                style={{ textAlign: "center" }}
              >
                <span className="ant-table-header-column">
                  <div>
                    <span className="ant-table-column-title">访问路径</span>
                    <span className="ant-table-column-sorter"></span>
                  </div>
                </span>
              </th>
            </tr>
          </thead>
          </table>
          <div style={{ height: "33px" }}></div>
          <Scrollbars
            autoHeightMin={33}
            autoHeightMax={220}
            // autoWidthMin={100}
            // autoWidthMax={400}
            className="Scrollbars"
          >
            <Table
              className="Entrances"
              columns={this.state.columns}
              pagination={false}
              dataSource={Entrances}
            ></Table>
          </Scrollbars>
        </div>
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
export default connect(mapStateToProps)(AccessDetailModal);
