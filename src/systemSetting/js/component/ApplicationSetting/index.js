import React, { Component } from "react";
import "../../../sass/subSystemAccessSet.scss";
import { connect } from "react-redux";
import { Modal, Loading } from "../../../../common";
import { DropDown, Search, Empty, Button } from "../../../../common";

import ApiAction from "../../action/data/Api";
import DataChange from "../../action/data/DataChange";
import AppAlertAction from "../../action/UI/AppAlertAction";
import UpUIState from "../../action/UpUIState";
import AccessAction from "../../action/data/AccessAction";
import MainAccessCard from "./MainAccessCard";
import AccessDetailModal from "./AccessDetailModal";
import AddAccessModal from "./AddAccessModal";
import AddAppilicationModal from "./AddAppilicationModal";
import AddAccessEntrancesModal from "./AddAccessEntrancesModal";
class ApplicationSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSearch: "", //搜索框中的输入值
      AccessDropValue: "2", //默认的访问类型（对应的默认title为全部）
      AccessDropTitle: "全部",
      UserDropValue: "", //默认的用户类型（对应的默认title为全部）
      UserDropTitle: "全部",
    };
    const { dispatch } = props;

    dispatch(AccessAction.GetAccessInfo({}));
    dispatch(AccessAction.getImgUrlProxy());
    dispatch(
      AccessAction.getLoginUser(JSON.parse(sessionStorage.getItem("UserInfo")))
    );
  }

  //搜索框的查询事件
  simpleClickSearch = (e) => {
    let { dispatch } = this.props;

    //如果搜索框中的值是空的默认查找数据库中所有的子系统
    console.log(e.value);
    if (e.value === "") {
      dispatch(
        AppAlertAction.alertTips({
          title: "搜索内容不能为空",
          cancelTitle: "确定",
        })
      );
    }
    //如果不是空的,按照关键字,和默认选中的下拉框中的值(全部)(全部)来查找
    else {
      dispatch(
        AccessAction.SetAccessInfoParams({
          data: {
            keyword: e.value,
            CancelBtnShow: "y",
          },
        })
      );
      dispatch(AccessAction.GetAccessInfo({}));
    }
  };
  //监听搜索框中值的变化情况
  SearchValueChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      AccessAction.SetAccessInfoParams({
        data: {
          searchValue: e.target.value,
          //   CancelBtnShow: true,
        },
      })
    );
  };
  onCancelSearch = (e) => {
    const { dispatch } = this.props;
    dispatch(
      AccessAction.SetAccessInfoParams({
        data: {
          searchValue: "",
          CancelBtnShow: "n",
          keyword: "",
        },
      })
    );
    dispatch(AccessAction.GetAccessInfo({}));
  };

  /*   监听访问状态状态下拉框的的选择事件 
      @parma checked 被选中的内容 包括value和title   
    */
  dropAccessChange = (checked) => {
    const { dispatch } = this.props;
    dispatch(
      AccessAction.SetAccessInfoParams({
        data: {
          isOpened: checked,
          searchValue: "",
          CancelBtnShow: "n",
          keyword: "",
        },
      })
    );
    dispatch(AccessAction.GetAccessInfo({}));
  };

  //监听用户类别下拉框的选择事件
  dropUserTypeChange = (checked) => {
    const { dispatch } = this.props;
    dispatch(
      AccessAction.SetAccessInfoParams({
        data: {
          userType: checked,
          searchValue: "",
          CancelBtnShow: "n",
          keyword: "",
        },
      })
    );
    dispatch(AccessAction.GetAccessInfo({}));
  };
  //监听应用分类下拉框的选择事件
  dropAppTypeChange = (checked) => {
    const { dispatch } = this.props;
    dispatch(
      AccessAction.SetAccessInfoParams({
        data: {
          applicationType: checked,
          searchValue: "",
          CancelBtnShow: "n",
          keyword: "",
        },
      })
    );
    dispatch(AccessAction.GetAccessInfo({}));
  };
  /* 监听每个子系统的开启状态按钮的点击事件
    @param1 事件对象
    @param2 触发点击事件对应的子系统ID
    @param3 对应子系统的名字
    @parma4 子系统当前状态
    
    */
  onEditOpenClick = (e, data) => {
    let { subsystemInfo, dispatch } = this.props;
    // const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'));
    let {
      CanBeClose,
      ApplicationID: SubSystemID,
      ApplicationStatus: status,
      ApplicationName: SubSystemName,
    } = data;
    if (!CanBeClose) {
      dispatch(AppAlertAction.alertTips({ title: "该子系统不能关闭" }));
      return;
    }

    //表示当前状态已关闭, 需要开启
    dispatch(
      AppAlertAction.alertQuery({
        title: `是否${
          status === 0 ? "开启" : "关闭"
        }对[${SubSystemName}]的访问`,
        ok: () => {
          return this.SubsystemAccess.bind(this, SubSystemID, status);
        }, //调用SubsystemAccess方法进行开启
        okTitle: "是",
        cancelTitle: "否",
      })
    );
  };

  /* 提示框中确认按钮触发的子系统开启或关闭的回调函数 
        @Parma1 子系统对应的ID
        @Parma2 判断关闭或者开启 开启为:open 关闭:close
    */
  SubsystemAccess = (applicationId, status) => {
    const { SchoolID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    const { dispatch } = this.props;

    dispatch(
      AccessAction.UpdateApplicationState({
        applicationId,
        status: status === 1 ? 0 : 1,
        func: () => {
          dispatch(AppAlertAction.closeAlert(dispatch));
          dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
          dispatch(AccessAction.GetAccessInfo({}));
        },
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
  // 关闭详情
  onAccessDetailCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        AccessDetailModalVisible: false,
      })
    );
  };
  //
  onAddAccessOk = () => {
    let { dispatch, AccessData } = this.props;
    if (AccessData.AddAccessModalData.ComponentChange === "0") {
      dispatch(
        AccessAction.AddApplicationToSchool({
          applicationIds: AccessData.AddAccessModalData.CheckList.join(","),
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
  // 修改
  onEditAccessOk = () => {
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
  onEditAccessCancel = () => {
    let { dispatch, AccessData } = this.props;

    dispatch(
      AccessAction.SetModalVisible({
        EditAccessModalVisible: false,
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
  // 完成添加访问入口
  onAddAccessEntrancesOk = () => {
    let { dispatch, AccessData } = this.props;
    // dispatch(AccessAction.AddEntrance({func:()=>{
    //   dispatch(
    //     AccessAction.SetModalVisible({
    //       AddAccessEntrancesModalVisible: false,
    //     })
    //   );
    //   dispatch(
    //     AccessAction.SetAddApplicationParams({
    //       ...AccessData.AppilicationInitParams,
    //     })
    //   );
    //   dispatch(
    //     AccessAction.SetAddApplicationTipsVisible({
    //       ...AccessData.InitAppilicationTipsVisible,
    //     })
    //   );
    //   dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
    // }}))
    dispatch(
      AccessAction.checkAllEntrancesParams({
        success: (Data) => {
          dispatch(
            AccessAction.SetModalVisible({
              AddAccessEntrancesModalVisible: false,
            })
          );
          // dispatch(
          //   AccessAction.SetAddApplicationParams({
          //     ...AccessData.AppilicationInitParams,
          //   })
          // );
          dispatch(
            AccessAction.SetAddApplicationTipsVisible({
              ...AccessData.InitAppilicationTipsVisible,
            })
          );
          dispatch(
            AccessAction.SetEntrancesToApplication({
              func: () => {
                dispatch(
                  AccessAction.SetApplicationInitParams(
                    AccessData.InitEntrancesParams
                  )
                );
              },
            })
          );
        },
      })
    );
  };
  // 完成添加访问入口
  onAddAccessEntrancesCancel = () => {
    let { dispatch, AccessData } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        AddAccessEntrancesModalVisible: false,
      })
    );
    // dispatch(
    //   AccessAction.SetAddApplicationParams({
    //     ...AccessData.AppilicationInitParams,
    //   })
    // );
    dispatch(
      AccessAction.SetAddApplicationTipsVisible({
        ...AccessData.InitAppilicationTipsVisible,
      })
    );
    dispatch(
      AccessAction.SetApplicationInitParams(AccessData.InitEntrancesParams)
    );
  };
  // 完成修改访问入口
  onEditAccessEntrancesOk = () => {
    let { dispatch, AccessData } = this.props;
    // dispatch(AccessAction.checkAllEntrancesParams())
    dispatch(
      AccessAction.checkAllEntrancesParams({
        success: (Data) => {
          dispatch(
            AccessAction.SetModalVisible({
              EditAccessEntrancesModalVisible: false,
            })
          );
          // dispatch(
          //   AccessAction.SetAddApplicationParams({
          //     ...AccessData.AppilicationInitParams,
          //   })
          // );
          dispatch(
            AccessAction.SetAddApplicationTipsVisible({
              ...AccessData.InitAppilicationTipsVisible,
            })
          );
          dispatch(
            AccessAction.SetEntrancesToApplication({
              func: () => {
                dispatch(
                  AccessAction.SetApplicationInitParams(
                    AccessData.InitEntrancesParams
                  )
                );
              },
            })
          );
        },
      })
    );
  };
  // 完成修改访问入口
  onEditAccessEntrancesCancel = () => {
    let { dispatch, AccessData } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        EditAccessEntrancesModalVisible: false,
      })
    );
    // dispatch(
    //   AccessAction.SetAddApplicationParams({
    //     ...AccessData.AppilicationInitParams,
    //   })
    // );
    dispatch(
      AccessAction.SetAddApplicationTipsVisible({
        ...AccessData.InitAppilicationTipsVisible,
      })
    );
    dispatch(
      AccessAction.SetApplicationInitParams(AccessData.InitEntrancesParams)
    );
  };
  //打开添加应用弹窗
  onAddAccessClick = () => {
    let { dispatch, AccessData } = this.props;
    dispatch(AccessAction.GetApplicationList({}));
    dispatch(
      AccessAction.SetModalVisible({
        AddAccessModalVisible: true,
      })
    );
    dispatch(
      AccessAction.SetAddApplicationParams({
        //添加新应用时预设参数
        ApplicationType: "1",
        ApplicationImgUrl: AccessData.defaultPicUrl,
        IsThirdParty: "0",
      })
    );
    dispatch(AccessAction.GetSubjectListData({ func: () => {} }));
  };
  // 点击修改
  onEditDetailClick = (applicationID) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetModalVisible({
        EditAccessModalVisible: true,
      })
    );
    dispatch(
      AccessAction.SetLoadingVisible({ EditAccessLoadingVisible: true })
    );
    dispatch(
      AccessAction.SetEditApplicationMsg({ ApplicationID: applicationID })
    );
    dispatch(
      AccessAction.GetSubjectListData({
        func: () => {
          dispatch(
            AccessAction.GetApplicationParams({
              applicationID,

              func: (State, Data) => {},
            })
          );
        },
      })
    );
  };
  // 点击删除
  onDeleteAccessClick = (applicationIds) => {
    let { dispatch } = this.props;
    // dispatch(AccessAction.SetModalVisible({
    //     AccessDetailModalVisible:true
    // }));
    // dispatch(AccessAction.GetApplicationDetail({
    //     applicationID
    // }))
    //表示当前状态已关闭, 需要开启
    dispatch(
      AppAlertAction.alertQuery({
        title: `确认删除该应用吗？`,
        ok: () => {
          return this.DeleteAccess.bind(this, applicationIds);
        }, //调用SubsystemAccess方法进行开启
        //   okTitle: "是",
        //   cancelTitle: "否",
      })
    );
  };
  // 确认删除
  DeleteAccess = (applicationIds) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.RemoveApplication({
        applicationIds,
        func: () => {
          dispatch(AppAlertAction.closeAlert(dispatch));
          dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
          dispatch(AccessAction.GetAccessInfo({}));
        },
      })
    );
  };
  render() {
    const { subsystemInfo, semesterloading, AccessData, UIState } = this.props;

    //渲染子系统信息
    let renderSubSystem = "";
    let tipInfo = "";
    let exeit = "0";
    if (subsystemInfo.List) {
      if (subsystemInfo.List.length === 0) {
        console.log("不存在");
        tipInfo = (
          <Empty
            type="3"
            className="Empty"
            title={"再检查一下，没有你要的子系统喔"}
          />
        );
        exeit = "1";
      }
    }

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
      },
      ModalVisible: {
        AccessDetailModalVisible,
        AddAccessModalVisible,
        EditAccessModalVisible,
        AddAccessComponentModalVisible,
        AddAccessEntrancesModalVisible,
        EditAccessEntrancesModalVisible,
      },
    } = AccessData;

    return (
      <div className="ApplicationSetting">
        <div className="guide">
          <div className="subsystem-logo"></div>
          <span className="subsystem-title">子系统访问设置</span>
          <Button
            color="blue"
            //   type="default"
            onClick={this.onAddAccessClick.bind(this)}
            className="btn-base btn-add"
          >
            添加应用
          </Button>
        </div>
        <div className="hr"></div>
        <div className="params-box">
          <div className="access-status">
            访问状态:
            <DropDown
              width={120}
              dropSelectd={AccessInfoParams.isOpened}
              dropList={StaticData.ApplicationStatus}
              height={120}
              style={{ zIndex: 400 }}
              onChange={this.dropAccessChange}
            ></DropDown>
          </div>
          <div className="users-type">
            用户类型:
            <DropDown
              width={120}
              dropSelectd={AccessInfoParams.userType}
              dropList={StaticData.UserType}
              height={120}
              style={{ zIndex: 400 }}
              onChange={this.dropUserTypeChange}
            ></DropDown>
          </div>
          <div className="users-type">
            应用分类:
            <DropDown
              width={120}
              dropSelectd={AccessInfoParams.applicationType}
              dropList={StaticData.ApplicationType}
              height={120}
              style={{ zIndex: 400 }}
              onChange={this.dropAppTypeChange}
            ></DropDown>
          </div>
          <div className="subsystem-search">
            <Search
              placeHolder="输入关键词快速搜索..."
              onClickSearch={this.simpleClickSearch}
              Value={AccessInfoParams.searchValue}
              CancelBtnShow={AccessInfoParams.CancelBtnShow}
              onCancelSearch={this.onCancelSearch}
              onChange={this.SearchValueChange}
            ></Search>
          </div>
        </div>
        <Loading
          spinning={UIState.AppLoading.RightLoading}
          opacity={false}
          tip="请稍后..."
        >
          <div
            className="subsystem-detail"
            style={{ display: `${exeit === "0" ? "block" : "none"}` }}
          >
            共计<span>{AccessInfoData.TotalCount}</span>个系统
            {/* 如果用户下拉框的值为""(空字符串表示全部)同时访问的参数下来框的值为"2"(表示全部)，同时总子系统中没有被关闭的
                                才渲染如下对应的内容。简单的说就是，仅当两个下来框的都选中"全部" 时才显示有多少个已关闭的子系统
                            */}
            {this.state.UserDropValue === "" &&
            this.state.AccessDropValue === "2" &&
            subsystemInfo.TotalClose !== 0 ? (
              <React.Fragment>
                ，其中
                <span>{AccessInfoData.ThirdPartyAppCount}</span>
                个已关闭访问
              </React.Fragment>
            ) : (
              ""
            )}
          </div>

          <div className="clearfix subsystem-container">
            {AccessInfoData.List instanceof Array &&
            AccessInfoData.List.length > 0 ? (
              AccessInfoData.List.map((child, index) => {
                return (
                  <MainAccessCard
                    onEditOpenClick={this.onEditOpenClick.bind(this)}
                    onAccessDetailClick={this.onAccessDetailClick.bind(this)}
                    onEditDetailClick={this.onEditDetailClick.bind(this)}
                    onDeleteAccessClick={this.onDeleteAccessClick.bind(this)}
                    key={index}
                    data={child}
                  ></MainAccessCard>
                );
              })
            ) : (
              <Empty
                title={
                  AccessInfoParams.searchValue ||
                  AccessInfoParams.applicationType ||
                  AccessInfoParams.isOpened !==2 ||
                  AccessInfoParams.userType
                    ? "暂无符合条件的子系统应用"
                    : "暂无子系统应用"
                }
                type="4"
                style={{ marginTop: "100px" }}
              ></Empty>
            )}
          </div>
        </Loading>
        <Modal
          type="1"
          title="查看应用详情"
          //   onOk={this.onAddCollegeOk.bind(this)}
          onCancel={this.onAccessDetailCancel.bind(this)}
          width={"800px"}
          bodyStyle={{ height: "500px" }}
          visible={AccessDetailModalVisible}
          okText="保存"
          footer={null}
          destroyOnClose={true}
        >
          <Loading
            spinning={AccessDetailLoadingVisible}
            opacity={false}
            tip="请稍候..."
          >
            <AccessDetailModal></AccessDetailModal>
          </Loading>
        </Modal>
        <Modal
          type="1"
          title="添加应用"
          onOk={this.onAddAccessOk.bind(this)}
          onCancel={this.onAddAccessCancel.bind(this)}
          width={"1000px"}
          bodyStyle={{ height: "500px" }}
          visible={AddAccessModalVisible}
          okText="保存"
          //   footer={null}
          destroyOnClose={true}
        >
          <AddAccessModal></AddAccessModal>
        </Modal>
        <Modal
          type="1"
          title="修改应用"
          onOk={this.onEditAccessOk.bind(this)}
          onCancel={this.onEditAccessCancel.bind(this)}
          width={"1000px"}
          bodyStyle={{ height: "460px" }}
          visible={EditAccessModalVisible}
          okText="保存"
          //   footer={null}
          destroyOnClose={true}
        >
          <Loading
            spinning={EditAccessLoadingVisible}
            opacity={false}
            tip="请稍候..."
          >
            <AddAppilicationModal type='edit'></AddAppilicationModal>
          </Loading>
        </Modal>
        <Modal
          type="1"
          title="添加访问入口"
          onOk={this.onAddAccessEntrancesOk.bind(this)}
          onCancel={this.onAddAccessEntrancesCancel.bind(this)}
          width={"800px"}
          bodyStyle={{ height: "500px" }}
          visible={AddAccessEntrancesModalVisible}
          okText="保存"
          //   footer={null}
          destroyOnClose={true}
        >
          <Loading
            spinning={AddAccessEntrancesLoadingVisible}
            opacity={false}
            tip="请稍候..."
          >
            <AddAccessEntrancesModal type="add"></AddAccessEntrancesModal>
          </Loading>
        </Modal>
        <Modal
          type="1"
          title="修改访问入口"
          onOk={this.onEditAccessEntrancesOk.bind(this)}
          onCancel={this.onEditAccessEntrancesCancel.bind(this)}
          width={"800px"}
          bodyStyle={{ height: "500px" }}
          visible={EditAccessEntrancesModalVisible}
          okText="保存"
          //   footer={null}
          destroyOnClose={true}
        >
          <Loading
            spinning={EditAccessEntrancesLoadingVisible}
            opacity={false}
            tip="请稍候..."
          >
            <AddAccessEntrancesModal type="edit"></AddAccessEntrancesModal>
          </Loading>
        </Modal>
        {/* <div>{subsystemInfo.SysID}</div> */}
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
export default connect(mapStateToProps)(ApplicationSetting);
