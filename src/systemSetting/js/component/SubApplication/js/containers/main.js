import React, { Component } from "react";
import "../../scss/index.scss";
import { connect } from "react-redux";
import { DropDown, Search, Empty, Loading } from "../../../../../../common";
import AccessAction from "../../../../action/data/AccessAction";
import AppAlertAction from "../../../../action/UI/AppAlertAction";
import SubCard from "../component/SubCard";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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

  //搜索框的查询事件
  simpleClickSearch = (e) => {
    let { dispatch } = this.props;

    //如果搜索框中的值是空的默认查找数据库中所有的子系统
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
  // 点击修改
  onEditDetailClick = (applicationID) => {
    let { dispatch } = this.props;
    dispatch(
      AccessAction.SetAddApplicationParams({
 
        Type:'edit'
      })
    );
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
        Type:'add'
      })
    );
    dispatch(AccessAction.GetSubjectListData({ func: () => {} }));
  };
  render() {
    const { subsystemInfo, semesterloading, AccessData, UIState } = this.props;
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
    } = AccessData;
    let { TotalCount, ThirdPartyAppCount, List } = AccessInfoData;
    let {
      searchValue,
      CancelBtnShow,
      applicationType,
      userType,
      isOpened,
    } = AccessInfoParams;
    let { ApplicationStatus, UserType, ApplicationType } = StaticData;
    return (
      <div id="Main">
        <div className="main-top">
          <span className="mt-title">子应用设置</span>
          <span className="mt-btn btn-add" onClick={this.onAddAccessClick}>添加应用</span>
        </div>
        <div className="main-handle">
          <DropDown
            title={"运行状态:"}
            width={120}
            dropSelectd={isOpened}
            dropList={ApplicationStatus}
            height={120}
            style={{ zIndex: 400 }}
            onChange={this.dropAccessChange}
          ></DropDown>
          <DropDown
            title={"用户类型:"}
            width={120}
            dropSelectd={userType}
            dropList={UserType}
            height={120}
            style={{ zIndex: 400 }}
            onChange={this.dropUserTypeChange}
          ></DropDown>
          <DropDown
            title={"应用分类:"}
            width={120}
            dropSelectd={applicationType}
            dropList={ApplicationType}
            height={120}
            style={{ zIndex: 400 }}
            onChange={this.dropAppTypeChange}
          ></DropDown>
          <Search
            className="mh-search"
            placeHolder="输入关键词快速搜索..."
            onClickSearch={this.simpleClickSearch}
            Value={searchValue}
            CancelBtnShow={CancelBtnShow}
            onCancelSearch={this.onCancelSearch}
            onChange={this.SearchValueChange}
          ></Search>
        </div>
        <Loading
          spinning={AccessContentLoadingVisible}
          opacity={false}
          tip="加载中..."
          size="large"
        >
          <div className="main-content">
            {List instanceof Array && List.length > 0 ? (
              <p className="mc-title">
                共计<span className="mct-total">{TotalCount}</span> 个应用，其中
                <span className="mct-count">{ThirdPartyAppCount}</span>
                个为第三方应用
              </p>
            ) : (
              ""
            )}
            <div className="mc-map">
              {List instanceof Array && List.length > 0 ? (
                List.map((child, index) => {
                  return (
                    <SubCard
                      type={"main"}
                      className={"mcm-card"}
                      key={index}
                      data={child}
                      onEditOpenClick={this.onEditOpenClick.bind(this)}
                      onAccessDetailClick={this.onAccessDetailClick.bind(this)}
                      onEditDetailClick={this.onEditDetailClick.bind(this)}
                      onDeleteAccessClick={this.onDeleteAccessClick.bind(this)}
                    ></SubCard>
                  );
                })
              ) : (
                <Empty
                  title={
                    searchValue || applicationType || isOpened !== 2 || userType
                      ? "暂无符合条件的子系统应用"
                      : "暂无子系统应用"
                  }
                  type="4"
                  style={{ marginTop: "100px" }}
                ></Empty>
              )}
            </div>
          </div>
        </Loading>
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
export default connect(mapStateToProps)(Main);
