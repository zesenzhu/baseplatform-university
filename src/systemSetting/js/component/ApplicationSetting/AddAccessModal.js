import React, { Component } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import {
  Tips,
  Table,
  CheckBox,
  CheckBoxGroup,
  Loading,
} from "../../../../common";
import { Tabs } from "antd";
import AddAccessCard from "./AddAccessCard";
import AddAppilicationModal from "./AddAppilicationModal";
import ApiActions from "../../action/data/Api";
import AppAlertAction from "../../action/UI/AppAlertAction";
import CropperModal from "../../../../common/js/CropperModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
// import UIState from '../../reducers/UIState'
import { Scrollbars } from "react-custom-scrollbars";
import AccessAction from "../../action/data/AccessAction";
import "../../../sass/AddAccessModal.scss";
const { TabPane } = Tabs;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class AddAccessModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // activekey change
  onActiveKeyChange = (key) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetAddAccessComponentChange({ ComponentChange: key })
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
  // 多选
  onCheckBoxGroupChange = (value)=>{
    let { dispatch,AccessData } = this.props;
    let {KeyList} = AccessData.ApplicationList
    dispatch(
      AccessAction.SetAddAccessComponentChange({
        CheckList: value,
        CheckAll:value.length===KeyList.length?true:false
      })
    );
  }
  render() {
    const {
      AccessData,

      UIState,
      DataUpdate,
    } = this.props;
    let { ComponentChange, CheckList } = AccessData.AddAccessModalData;
    let { List, KeyList } = AccessData.ApplicationList;
    let { AddAccessLoadingVisible,EditAccessLoadingVisible } = AccessData.LoadingVisible;
    return (
      <div className="AddAccessModal">
        {/* <div className='Component-edit-box'>

        </div> */}
        <Tabs
          onChange={this.onActiveKeyChange.bind(this)}
          type="card"
          activeKey={ComponentChange}
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
                  <CheckBoxGroup onChange={this.onCheckBoxGroupChange} value={CheckList}>
                    {List instanceof Array &&
                      List.map((child, index) => (
                        <AddAccessCard
                        className='add-card'
                          key={index}
                          data={child}
                          onAccessDetailClick={this.onAccessDetailClick}
                        ></AddAccessCard>
                      ))}
                  </CheckBoxGroup>
                </Scrollbars>
              </div>
            </Loading>
          </TabPane>
          <TabPane tab="录入新的应用" key="1">
          <Loading
            spinning={EditAccessLoadingVisible}
            opacity={true}
            tip="请稍候..."
          >
            <AddAppilicationModal type='add'></AddAppilicationModal>
            </Loading>
          </TabPane>
        </Tabs>
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
export default connect(mapStateToProps)(AddAccessModal);
