import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";
import {
  Tips,
  Table,
  Radio,
  RadioGroup,
  Button,
  DropDown,
  Empty,
} from "../../../../../../../common";
import ClassCropperModal from "../../../../../../../common/js/CropperModal";
import { Input, Tooltip } from "antd";
import DataChange from "../../../../../action/data/DataChange";
import ApiActions from "../../../../../action/data/Api";
import AppAlertAction from "../../../../../action/UI/AppAlertAction";
import AccessAction from "../../../../../action/data/AccessAction";
// import DefaultImg from "../../../images/logo_application_default.png";
import CropperModal from "../../../../../../../common/js/CropperModal";
// import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
// import UIState from '../../reducers/UIState'
import { Scrollbars } from "react-custom-scrollbars";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class AddAppilicationModal extends Component {
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
          dataIndex: "EntranceIconLargeShow",
          key: "EntranceIconLarge",
          render: (EntranceIconLargeShow) => {
            return (
              <span title={EntranceIconLargeShow} className="EntranceImgUrl">
                <img
                  width={40}
                  height={40}
                  src={EntranceIconLargeShow}
                  alt={EntranceIconLargeShow}
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
            return AccessParam ? (
              <a
                target="_blank"
                href={AccessParam}
                title={AccessParam}
                className="AccessParam"
              >
                {AccessParam}
              </a>
            ) : (
              "--"
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          // dataIndex: "AccessParam",
          key: "handle",
          render: (data, a, index) => {
            return (
              <div className="btn-box">
                <span
                  onClick={this.onEditEntrancesClick.bind(this, data)}
                  className="handle-btn"
                >
                  修改
                </span>
                <span
                  onClick={this.onDeleteEntrancesClick.bind(
                    this,
                    data.EntranceID,
                    index
                  )}
                  className="handle-btn"
                >
                  删除
                </span>
              </div>
            );
          },
        },
      ],
      classResultImgUrl:
        props.AccessData.ImgUrlProxy +
        props.AccessData.AddAppilicationParams.ApplicationImgUrl,
      picVisible: false,
    };
  }
  // 名称change
  onApplicationNameChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationName: e.target.value.trim(),
      })
    );
  };
  // 名称blur
  onApplicationNameBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationName((error) => {
        if (!error) {
          dispatch(
            AccessAction.GetClientidAndKey({
              ApplicationName: e.target.value,
              // useDefault: this.props.type === "add" ? true : false,
              func: ({ AccessData }) => {},
            })
          );
        }
      })
    );
  };
  // 是否是第三方
  onIsThirdPartyChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        IsThirdParty: e.target.value,
      })
    );
    console.log(e.target.value);
    if (e.target.value === 0) {
      dispatch(
        AccessAction.SetAddApplicationParams({
          Provider: "",
        })
      );
      dispatch(
        AccessAction.SetAddApplicationTipsVisible({
          ProviderTipsVisible: false,
        })
      );
      dispatch(
        AccessAction.SetAddApplicationTips({
          ApplicationNameTips: "公司名称格式不正确",
        })
      );
    }
  };
  // 第三方名称change
  onProviderChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        Provider: e.target.value.trim(),
      })
    );
  };
  // 第三方名称blur
  onProviderBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkProvider((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 应用ID change
  onApplicationIDChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationID: e.target.value.trim(),
      })
    );
  };
  // 应用ID blur
  onApplicationIDBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationID((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 应用秘钥 change
  onApplicationSecretChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationSecret: e.target.value.trim(),
      })
    );
  };
  // 应用秘钥blur
  onApplicationSecretBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationSecret((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 应用简介 change
  onIntroductionChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        Introduction: e.target.value.trim(),
      })
    );
  };
  // 应用简介blur
  onIntroductionBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkIntroduction((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 图片编辑
  handleGetResultImgUrl = (key) => (blob, filePath) => {
    const {
      dispatch,
      AccessData: { ImgUrlProxy },
    } = this.props;

    const str = URL.createObjectURL(blob);
    this.setState({
      [key]: str,
      //[key]: this.state.baseUrl+'/http_subjectResMgr/'+filePath
    });
    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationImgUrl: filePath,
        ApplicationImgUrlShow: `${ImgUrlProxy + filePath}`,
      })
    );
  };
  CropperModalClose = () => {
    this.setState({
      picVisible: false,
    });
  };
  CropperModalOpen = () => {
    this.setState({
      picVisible: true,
    });
  };
  //监听使用默认图片按钮
  useDefault = (key) => {
    let { dispatch, AccessData } = this.props;
    let { ImgUrlProxy } = AccessData;
    this.setState({
      [key]: `${ImgUrlProxy}SysSetting/Attach/app_default.png `,
      // onlineImg: `/SysSetting/Attach/default.png`,
    });

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationImgUrl: "SysSetting/Attach/app_default.png",
        ApplicationImgUrlShow: `${ImgUrlProxy}SysSetting/Attach/app_default.png `,
      })
    );

    // d
  };
  // 授权回调地址 change
  onApplicationCallbackAddrChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationCallbackAddr: e.target.value.trim(),
      })
    );
  };
  // 授权回调地址 blur
  onApplicationCallbackAddrBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationCallbackAddr((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 应用访问地址： change
  onApplicationUrlChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationUrl: e.target.value.trim(),
      })
    );
  };
  // 应用访问地址： blur
  onApplicationUrlBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationUrl((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 接口服务地址 change
  onApplicationApiAddrChange = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationApiAddr: e.target.value.trim(),
      })
    );
  };
  // 接口服务地址 blur
  onApplicationApiAddrBlur = (e) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.checkApplicationApiAddr((error) => {
        // console.log(error)
        // if(!error){
        // }
      })
    );
  };
  // 应用类型 change
  dropApplicationTypeChange = (value) => {
    const { dispatch } = this.props;

    dispatch(
      AccessAction.SetAddApplicationParams({
        ApplicationType: value.value,
      })
    );
  };
  // 添加访问入口
  onAddAddrClick = () => {
    const { dispatch, AccessData } = this.props;
    let {
      ApplicationID,
      ApplicationName,
      ApplicationSecret,
    } = AccessData.AddAppilicationParams;
    // let ApplicationIDError = false;
    // let ApplicationIDError2 = false;
    // dispatch(
    //   AccessAction.checkApplicationID((Error, Error2) => {
    //     ApplicationIDError = Error;
    //     ApplicationIDError2 = Error2;
    //   })
    // );

    let ApplicationNameError = false;
    let ApplicationNameError2 = false;
    dispatch(
      AccessAction.checkApplicationName((Error, Error2) => {
        ApplicationNameError = Error;
        ApplicationNameError2 = Error2;
      })
    );
    // let ApplicationSecretError = false;
    // let ApplicationSecretError2 = false;
    // dispatch(
    //   AccessAction.checkApplicationSecret((Error, Error2) => {
    //     ApplicationSecretError = Error;
    //     ApplicationSecretError2 = Error2;
    //   })
    // );
    if (ApplicationNameError) {
      dispatch(
        AppAlertAction.alertQuery({
          title: `请填写应用名称`,
          // ok: () => {},
        })
      );
      return;
    }
    dispatch(
      AccessAction.SetEditApplicationMsg({ ApplicationID: ApplicationID })
    );
    dispatch(
      AccessAction.SetApplicationInitParams({ ApplicationID, ApplicationName })
    );

    dispatch(AccessAction.GetSubjectListData({}));

    dispatch(
      AccessAction.SetModalVisible({
        AddAccessEntrancesModalVisible: true,
      })
    );
  };
  // 删除访问入口
  onDeleteEntrancesClick = (EntranceID, index) => {
    const { dispatch, AccessData } = this.props;
    dispatch(AccessAction.SetEditApplicationMsg({ EntranceID: EntranceID }));
    console.log(EntranceID, index);
    let Entrances = AccessData.AddAppilicationParams.Entrances;
    let DeleteEntrances = AccessData.AddAppilicationParams.DeleteEntrances;
    //表示当前状态已关闭, 需要开启
    dispatch(
      AppAlertAction.alertQuery({
        title: `是否删除该访问入口`,
        ok: () => {
          return () => {
            let Delete = Entrances.splice(index, 1);
            if (EntranceID) {
              DeleteEntrances.push(Delete);
            }
            dispatch(
              AccessAction.SetAddApplicationParams({
                Entrances: Entrances,
                DeleteEntrances,
              })
            );
            dispatch(AccessAction.SetEditApplicationMsg({ EntranceID: "" }));
            dispatch(AppAlertAction.closeAlert(dispatch));
            dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
            // dispatch(
            //   AccessAction.SetLoadingVisible({
            //     EditAccessLoadingVisible: true,
            //   })
            // );
          };
          // dispatch(
          //   AccessAction.DeleteEntrance({
          //     func: (State) => {
          //       dispatch(
          //         AccessAction.SetEditApplicationMsg({ EntranceID: "" })
          //       );
          //       dispatch(AppAlertAction.closeAlert(dispatch));
          //       dispatch(AppAlertAction.alertSuccess({ title: "操作成功" }));
          //       dispatch(
          //         AccessAction.SetLoadingVisible({
          //           EditAccessLoadingVisible: true,
          //         })
          //       );

          //       dispatch(
          //         AccessAction.GetApplicationDetail({
          //           // applicationID,
          //           userDefault: false,
          //           func: (State, Data) => {
          //             let { IsThirdParty, ...other } = Data;
          //             dispatch(
          //               AccessAction.SetAddApplicationParams({
          //                 IsThirdParty: IsThirdParty ? "1" : "0",

          //                 ...other,
          //               })
          //             );
          //             dispatch(
          //               AccessAction.SetLoadingVisible({
          //                 EditAccessLoadingVisible: false,
          //               })
          //             );
          //           },
          //         })
          //       );
          //     },
          //   })
          // );
        }, //调用SubsystemAccess方法进行开启
        okTitle: "是",
        cancelTitle: "否",
      })
    );
  };
  // 修改访问入口
  onEditEntrancesClick = (data) => {
    const { dispatch, AccessData } = this.props;
    dispatch(AccessAction.GetSubjectListData({}));

    dispatch(
      AccessAction.SetModalVisible({
        EditAccessEntrancesModalVisible: true,
      })
    );
    dispatch(
      AccessAction.SetEditApplicationMsg({ EntranceID: data.EntranceID })
    );
    dispatch(AccessAction.SetApplicationInitParams(data));
  };
  render() {
    const {
      AccessData,

      UIState,
      DataUpdate,
      className
    } = this.props;
    let {
      Entrances,
      ApplicationID,
      ApplicationName,
      Provider,
      IsThirdParty,
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
      ApplicationImgUrlShow,
      Type,
    } = AccessData.AddAppilicationParams;
    let {
      ApplicationNameTipsVisible,
      ProviderTipsVisible,
      ApplicationSecretTipsVisible,
      ApplicationIDTipsVisible,
      IntroductionTipsVisible,
      ApplicationCallbackAddrTipsVisible,
      ApplicationUrlTipsVisible,
      ApplicationApiAddrTipsVisible,
    } = AccessData.AddAppilicationTipsVisible;
    let {
      ApplicationNameTips,
      ProviderTips,
      ApplicationIDTips,
      ApplicationSecretTips,
      IntroductionTips,
      ApplicationCallbackAddrTips,
      ApplicationUrlTips,
      ApplicationApiAddrTips,
    } = AccessData.AddAppilicationTips;
    let {
      ImgUrlProxy,
      LoginUser,

      StaticData: {
        ApplicationTypeForKey,
        ApplicationType: ApplicationTypeList,
      },
    } = AccessData;
    // console.log(ApplicationTypeList);
    if (
      ApplicationTypeList instanceof Array &&
      ApplicationTypeList[0].value === ""
    ) {
      ApplicationTypeList.shift();
    }
    console.log(this.state.classResultImgUrl, Type);
    return (
      <div className={`AddAppilication ${className?className:''}`}>
        <div className="access-main-msg-box">
          <span className="row clearfix left-row">
            <span className="access-main-msg-tips">
              <span className="must-icon">*</span>应用名称：
            </span>
            <span className="access-main-msg">
              <Input
                maxLength={8}
                onChange={this.onApplicationNameChange.bind(this)}
                onBlur={this.onApplicationNameBlur.bind(this)}
                value={ApplicationName}
                width={200}
                height={20}
                placeholder={"请输入8位以内的中英文名称..."}
                className="access-main-msg-input"
              ></Input>
              <span
                className=" msg-tips"
                style={{
                  display: ApplicationNameTipsVisible ? "block" : "none",
                }}
              >
                {ApplicationNameTips}
              </span>
            </span>
          </span>
          <span className="row clearfix rigth-row">
            <span className="access-main-msg-tips">
              <span
                style={{
                  display:
                    Type !== "add" && IsThirdParty === "0" ? "none" : "inline",
                }}
                className="must-icon"
              >
                *
              </span>
              所有者：
            </span>
            {Type !== "add" && IsThirdParty === "0" ? (
              <span className="access-main-msg">{"蓝鸽公司"}</span>
            ) : (
              <span className="access-main-msg msg-IsThirdParty">
                <RadioGroup
                  value={IsThirdParty}
                  onChange={this.onIsThirdPartyChange.bind(this)}
                >
                  <Radio value={"0"}>蓝鸽</Radio>
                  <Radio value={"1"}>第三方</Radio>
                </RadioGroup>
                <Input
                  maxLength={20}
                  onChange={this.onProviderChange.bind(this)}
                  onBlur={this.onProviderBlur.bind(this)}
                  disabled={IsThirdParty === "0" ? true : false}
                  style={{
                    display: IsThirdParty === "0" ? "none" : "inline-block",
                  }}
                  placeholder={"请输入6位以内的公司名..."}
                  value={Provider}
                  width={200}
                  height={20}
                  className="access-main-msg-input"
                ></Input>
                <span
                  className=" msg-tips"
                  style={{
                    display: ProviderTipsVisible ? "block" : "none",
                  }}
                >
                  {ProviderTips}
                </span>
              </span>
            )}
          </span>
          <span className="row clearfix left-row">
            <span className="access-main-msg-tips">
              <span className="must-icon">*</span>应用ID：
            </span>
            {Type === "add" ? (
              <span className="access-main-msg">
                <Input
                  maxLength={20}
                  onChange={this.onApplicationIDChange.bind(this)}
                  onBlur={this.onApplicationIDBlur.bind(this)}
                  value={ApplicationID}
                  width={200}
                  height={20}
                  placeholder={"请输入应用ID..."}
                  className="access-main-msg-input"
                ></Input>
                <span
                  className=" msg-tips"
                  style={{
                    display: ApplicationIDTipsVisible ? "block" : "none",
                  }}
                >
                  {ApplicationIDTips}
                </span>
              </span>
            ) : (
              <span className="access-main-msg">{ApplicationID}</span>
            )}
          </span>
          <span className="row clearfix rigth-row row-pwd">
            {Type !== "add" && IsThirdParty === "0" ? (
              ""
            ) : (
              <>
                <span
                  // style={{
                  //   display:
                  //     Type !== "add" && IsThirdParty === "0"
                  //       ? "none"
                  //       : "inline-block",
                  // }}
                  className="access-main-msg-tips"
                >
                  <span className="must-icon">*</span>应用密钥：
                </span>
                <span
                  // style={{
                  //   display:
                  //     Type !== "add" && IsThirdParty === "0"
                  //       ? "none"
                  //       : "inline-block",
                  // }}
                  className="access-main-msg"
                >
                  <Input
                    maxLength={100}
                    onBlur={this.onApplicationSecretBlur.bind(this)}
                    onChange={this.onApplicationSecretChange.bind(this)}
                    placeholder={"请输入应用密钥..."}
                    value={ApplicationSecret}
                    width={200}
                    height={20}
                    className="access-main-msg-input"
                  ></Input>
                  <span
                    className=" msg-tips"
                    style={{
                      display: ApplicationSecretTipsVisible ? "block" : "none",
                    }}
                  >
                    {ApplicationSecretTips}
                  </span>
                </span>
              </>
            )}
          </span>
          <span className="row clearfix left-row Introduce-row">
            <span className="access-main-msg-tips">
              <span className="must-icon">*</span>应用简介：
            </span>
            <span className="access-main-msg">
              <Input.TextArea
                maxLength={100}
                onChange={this.onIntroductionChange.bind(this)}
                onBlur={this.onIntroductionBlur.bind(this)}
                value={Introduction}
                width={200}
                height={20}
                placeholder={"请输入100字以内的应用简介..."}
                className="access-main-msg-input Introduction-TextArea"
                rows="3"
                cols="30"
                name="Introduction"
              ></Input.TextArea>
              <span
                className=" msg-tips"
                style={{
                  display: IntroductionTipsVisible ? "block" : "none",
                }}
              >
                {IntroductionTips}
              </span>
            </span>
          </span>
          <span className="row clearfix rigth-row img-row">
            <span className="access-main-msg-tips">
              <span className="must-icon">*</span>应用图标：
            </span>
            <span className="access-main-msg">
              <div
                className="ToolImgBox"
                style={
                  ApplicationImgUrlShow
                    ? {
                        backgroundImage: "url(" + ApplicationImgUrlShow + ")",
                        // +
                        // "," +
                        // "url(" +
                        // DefaultImg +
                        // ")"
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        // background:
                        //   "url(" +
                        //   (this.state.classResultImgUrl
                        //     ? this.state.classResultImgUrl
                        //     : DefaultImg) +
                        //   ") no-repeat center / contain",
                        // backgroundSize: "contain"
                      }
                    : {}
                }
                onClick={this.CropperModalOpen}
              ></div>
              {/* <div className="btn-box">
                <Button
                  className="imgBtn"
                  color="blue"
                  onClick={this.CropperModalOpen}
                >
                  上传图标
                </Button>
                <Button
                  color="green"
                  className="imgBtn"
                  onClick={this.useDefault.bind(this, "classResultImgUrl")}
                >
                  使用默认
                </Button>
              </div> */}
              <p className="imgTips">
                请上传一张80*80的png格式的
                <br />
                应用图标文件
              </p>
              {/* <p className="imgTips">
            请选择类型为png/jpg、大小在128*128以内的图片。
          </p> */}
              <ClassCropperModal
                // uploadedImageFile={classModalFile}
                UpDataUrl={
                  ImgUrlProxy +
                  "SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=" +
                  LoginUser.UserID
                }
                Visiable={this.state.picVisible}
                InitPic={this.state.classResultImgUrl}
                onClose={this.CropperModalClose}
                diskName="SysSetting"
                onSubmit={this.handleGetResultImgUrl("classResultImgUrl")}
              ></ClassCropperModal>

              {/* <span
                className=" msg-tips"
                style={{
                  display: ApplicationSecretTipsVisible
                    ? "block"
                    : "none",
                }}
              >
                {ApplicationSecretTips}
              </span> */}
            </span>
          </span>
          <span className="row clearfix left-row">
            <span className="access-main-msg-tips">应用分类：</span>
            <span className="access-main-msg">
              <DropDown
                width={120}
                dropSelectd={ApplicationTypeForKey[`${ApplicationType}`]}
                dropList={ApplicationTypeList}
                height={120}
                style={{ zIndex: 10 }}
                onChange={this.dropApplicationTypeChange}
              ></DropDown>
            </span>
          </span>
          <span className="row clearfix rigth-row">
            <span className="access-main-msg-tips">授权回调地址：</span>
            <span className="access-main-msg">
              <Input
                maxLength={100}
                onChange={this.onApplicationCallbackAddrChange.bind(this)}
                onBlur={this.onApplicationCallbackAddrBlur.bind(this)}
                value={ApplicationCallbackAddr}
                width={200}
                height={20}
                placeholder={
                  "如需进行OAuth2.0单点登录授权，必须填写登录后的回调地址..."
                }
                className="access-main-msg-input"
              ></Input>
              <span
                className=" msg-tips"
                style={{
                  display: ApplicationCallbackAddrTipsVisible
                    ? "block"
                    : "none",
                }}
              >
                {ApplicationCallbackAddrTips}
              </span>
            </span>
          </span>

          <span className="row clearfix left-row">
            <span className="access-main-msg-tips">应用访问地址：</span>
            <span className="access-main-msg">
              <Input
                maxLength={100}
                onChange={this.onApplicationUrlChange.bind(this)}
                onBlur={this.onApplicationUrlBlur.bind(this)}
                value={ApplicationUrl}
                width={200}
                height={20}
                placeholder={"应用访问的网页路径，如http://www.baidu.com"}
                className="access-main-msg-input"
              ></Input>
              <span
                className=" msg-tips"
                style={{
                  display: ApplicationUrlTipsVisible ? "block" : "none",
                }}
              >
                {ApplicationUrlTips}
              </span>
            </span>
          </span>
          <span className="row clearfix rigth-row">
            <span className="access-main-msg-tips">接口服务地址：</span>
            <span className="access-main-msg">
              <Input
                maxLength={100}
                onChange={this.onApplicationApiAddrChange.bind(this)}
                onBlur={this.onApplicationApiAddrBlur.bind(this)}
                value={ApplicationApiAddr}
                width={200}
                height={20}
                placeholder={
                  "应用提供接口给平台调用访问时的根路径，如http://www.123.com"
                }
                className="access-main-msg-input"
              ></Input>
              <span
                className=" msg-tips"
                style={{
                  display: ApplicationApiAddrTipsVisible ? "block" : "none",
                }}
              >
                {ApplicationApiAddrTips}
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}
AddAppilicationModal.defaultProps = {
  type: "add",
};
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
export default connect(mapStateToProps)(AddAppilicationModal);
