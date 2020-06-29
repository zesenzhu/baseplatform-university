import React, { Component } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import {
  Tips,
  Table,
  Radio,
  RadioGroup,
  Button,
  DropDown,
  Empty,
  CheckBoxGroup,
  CheckBox,
} from "../../../../common";
import ClassCropperModal from "../../../../common/js/CropperModal";
import { Input, Tooltip } from "antd";
import DataChange from "../../action/data/DataChange";
import ApiActions from "../../action/data/Api";
import AppAlertAction from "../../action/UI/AppAlertAction";
import AccessAction from "../../action/data/AccessAction";
import DefaultImg from "../../../images/logo_application_default.png";
import CropperModal from "../../../../common/js/CropperModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
// import UIState from '../../reducers/UIState'
import { Scrollbars } from "react-custom-scrollbars";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class AddAccessEntrancesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bigImgUrl: "",
      smallImgUrl: "",
      picVisible: false,
      picUpType: false, //false:small,true:big
    };
  }
  // 选择用户类型
  onUserTypeListChange = (value) => {
    let { dispatch, AccessData } = this.props;
    // let UserTypeArr = []
    // value instanceof Array && value.map(child=>{
    //   UserTypeArr.push(AccessData.StaticData.UserTypeForKey[child].title)
    // })
    dispatch(
      AccessAction.SetApplicationParams({
        UserType: value,
        // ,UserTypeName:UserTypeArr.join(',')
      })
    );
    dispatch(AccessAction.checkUserType());
  };
  // 学科修改
  onSubjectIdsChange = (value) => {
    let { dispatch, AccessData } = this.props;
    let SubjectArr = [];
    value instanceof Array &&
      value.map((child) => {
        AccessData.SubjectList instanceof Array &&
          AccessData.SubjectList.map((subject) => {
            if (subject.SubjectId === child) {
              SubjectArr.push(subject.SubjectName);
            }
          });
      });
    dispatch(
      AccessAction.SetApplicationParams({
        SubjectIds: value,
        checkAllSubject: AccessData.SubjectList.length === value.length,
        SubjectNames: SubjectArr.join("、"),
      })
    );
  };
  // 全选
  onCheckAllChange = (e) => {
    let { dispatch, AccessData } = this.props;
    let SubjectArr = [];
    let selectList = [];
    AccessData.SubjectList instanceof Array &&
      AccessData.SubjectList.map((child) => {
        selectList.push(child.SubjectId);
        SubjectArr.push(child.SubjectName);
      });
    dispatch(
      AccessAction.SetApplicationParams({
        SubjectIds: e.target.checked ? selectList : [],
        checkAllSubject: e.target.checked,
        SubjectNames: SubjectArr.join("、"),
      })
    );
  };
  // 入口名称change
  onApplicationSecretChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      AccessAction.SetApplicationParams({ EntranceName: e.target.value.trim() })
    );
  };
  onApplicationSecretBlur = (e) => {
    let { dispatch } = this.props;

    dispatch(AccessAction.checkEntranceName());
  };
  // 图片编辑
  handleGetResultImgUrl = (key) => (blob, filePath) => {
    const { dispatch, AccessData } = this.props;
    let { ImgUrlProxy, defaultPicUrl } = AccessData;

    const str = URL.createObjectURL(blob);
    this.setState({
      [key]: str,
      //[key]: this.state.baseUrl+'/http_subjectResMgr/'+filePath
    });
    // console.log(this.state.picUpType);
    if (this.state.picUpType) {
      dispatch(
        AccessAction.SetApplicationParams({
          EntranceIconLarge: filePath,
          EntranceIconLargeShow:ImgUrlProxy+ filePath,
        })
      );
    } else {
      dispatch(
        AccessAction.SetApplicationParams({
          EntranceIconMini: filePath,
          EntranceIconMiniShow: ImgUrlProxy+filePath,
        })
      );
    }
  };
  CropperModalClose = () => {
    this.setState({
      picVisible: false,
    });
  };
  CropperModalOpen = (picUpType) => {
    console.log(picUpType);
    this.setState({
      picVisible: true,
      picUpType,
    });
  };
  //监听使用默认图片按钮
  useDefault = (key) => {
    let { dispatch, AccessData } = this.props;
    let { ImgUrlProxy, defaultPicUrl } = AccessData;
    this.setState({
      [key]: `${ImgUrlProxy + defaultPicUrl} `,
      // onlineImg: `/SysSetting/Attach/default.png`,
    });
    if (this.state.picUpType) {
      dispatch(
        AccessAction.SetApplicationParams({
          EntranceIconLarge: defaultPicUrl,
          EntranceIconLargeShow:ImgUrlProxy+ defaultPicUrl,


        })
      );
    } else {
      dispatch(
        AccessAction.SetApplicationParams({
          EntranceIconMiniShow: ImgUrlProxy+defaultPicUrl,
          EntranceIconMini: defaultPicUrl,
        })
      );
    }

    // d
  };
  // pc
  // onPcBlur = (value) => {};
  // 入口名称change
  onPcChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      AccessAction.SetApplicationParams({
        pc: e.target.value.trim(),
        AccessParam: e.target.value.trim(),
        AccessType: "href",
      })
    );
  };
  onPcBlur = (e) => {
    let { dispatch } = this.props;

    dispatch(
      AccessAction.checkpc((error, pcError) => {
        if (!error) {
          let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/; //href
          let Test2 = /^[a-zA-z]+:\/\/[^\s]*$/;
          let AccessType = "";
          if (Test.test(e.target.value.trim())) {
            AccessType = "href";
          } else if (Test2.test(e.target.value.trim())) {
            AccessType = "exe";
          }else{
            console.log('测试PC正则有问题')
            return ;
          }
          dispatch(
            AccessAction.SetApplicationParams({
              pc: e.target.value.trim(),
              AccessParam: e.target.value.trim(),
              AccessType: AccessType,
            })
          );
        }
      })
    );
  };
  // 入口名称change
  onIosChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      AccessAction.SetApplicationParams({
        ios: e.target.value.trim(),
        AccessParam: e.target.value.trim(),
      })
    );
  };
  onIosBlur = (e) => {
    let { dispatch } = this.props;

    dispatch(AccessAction.checkios());
  };
  // 入口名称change
  onAndroidChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      AccessAction.SetApplicationParams({
        android: e.target.value.trim(),
        AccessParam: e.target.value.trim(),
      })
    );
  };
  onAndroidBlur = (e) => {
    let { dispatch } = this.props;

    dispatch(AccessAction.checkandroid());
  };
  render() {
    const {
      AccessData,

      UIState,
      DataUpdate,
    } = this.props;
    let {
      Entrances,
      ApplicationName,
      UserTypeSelect,
    } = AccessData.AddAppilicationParams;

    let {
      ImgUrlProxy,
      LoginUser,
      SubjectList,
      EntrancesParams: {
        EntranceName,
        EntranceImgUrl,
        UserType,
        // UserTypeSelect,
        SubjectIds,
        checkAllSubject,
        SubjectNames,
        DeviceType,
        CanAdd,
        UserTypeName,
        // DeviceType: "",
        // AccessParam: "",
        pc,
        android,
        ios,
        EntranceIconLargeShow,
        EntranceIconMiniShow,
      },
      AddAppilicationTipsVisible: {
        EntranceNameTipsVisible,
        UserTypeTipsVisible,
        pcTipsVisible,
        androidTipsVisible,
        iosTipsVisible,
      },
      AddAppilicationTips: {
        UserTypeTips,
        EntranceNameTips,
        pcTips,
        androidTips,
        iosTips,
      },
      StaticData: { UserType: UserTypeList, ApplicationTypeForKey },
    } = AccessData;
    if (UserTypeList instanceof Array && UserTypeList[0].value === "") {
      UserTypeList.shift();
    }
    return (
      <div className="AddAccessEntrancesModal">
        <div className="row clearfix app-name-row">
          <span className="row-left access-main-msg-tips">
             应用名称：
          </span>
          <span className="row-rigth access-main-msg">{ApplicationName}</span>
        </div>
        <div className="row clearfix">
          <span className="row-left access-main-msg-tips">
            <span
              style={{ display: CanAdd ? "inline" : "none" }}
              className="must-icon"
            >
              *
            </span>
            用户对象：
          </span>
          {CanAdd ? (
            <span className="row-rigth access-main-msg">
              <Tips
                overlayClassName="tips"
                visible={UserTypeTipsVisible}
                getPopupContainer={(e) => e.parentNode}
                title={UserTypeTips}
              >
                <CheckBoxGroup
                  value={UserType}
                  onChange={this.onUserTypeListChange}
                >
                  {UserTypeList instanceof Array &&
                    UserTypeList.map((child) => {
                      return (
                        <CheckBox key={child.value} value={child.value}>
                          {child.title}
                        </CheckBox>
                      );
                    })}
                </CheckBoxGroup>
              </Tips>
              <span className="tips-title">
                选择多个用户对象类型时，会自动为每个用户类型创建一个相同的入口
              </span>
            </span>
          ) : (
            <span title={UserTypeName} className="row-rigth access-main-msg">
              {UserTypeName ? UserTypeName : "--"}
            </span>
          )}
        </div>
        <div className="row clearfix">
          <span className="row-left access-main-msg-tips">
            <span className="must-icon">*</span>入口名称：
          </span>
          <span className="row-rigth access-main-msg">
            <span className="access-main-msg">
              <Tips
                overlayClassName="tips"
                visible={EntranceNameTipsVisible}
                getPopupContainer={(e) => e.parentNode}
                title={EntranceNameTips}
              >
                <Input
                  maxLength={100}
                  onBlur={this.onApplicationSecretBlur.bind(this)}
                  onChange={this.onApplicationSecretChange.bind(this)}
                  placeholder={"请输入入口名称"}
                  value={EntranceName}
                  width={200}
                  height={20}
                  className="access-main-msg-input"
                ></Input>
              </Tips>
              {/* <span
                className=" msg-tips"
                style={{
                  display: EntranceNameTipsVisible ? "block" : "none",
                }}
              >
                {EntranceNameTips}
              </span> */}
              {/* <span className="tips-title">
              选择多个用户对象类型时，会自动为每个用户类型创建一个相同的入口
            </span> */}
            </span>
          </span>
        </div>
        <div className="row clearfix img-row">
          <span className="row-left access-main-msg-tips">
            <span className="must-icon">*</span>入口图标：
          </span>
          <span className="access-main-msg">
            <span className="img-box bigImg-box">
              <div
                className="ToolImgBox"
                style={{
                  backgroundImage:
                    "url(" +
                    (EntranceIconLargeShow? EntranceIconLargeShow : DefaultImg) +
                    ")" +
                    "," +
                    "url(" +
                    DefaultImg +
                    ")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  // background:
                  //   "url(" +
                  //   (this.state.bigImgUrl
                  //     ? this.state.bigImgUrl
                  //     : DefaultImg) +
                  //   ") no-repeat center / contain",
                  // backgroundSize: "contain"
                }}
              ></div>
              <div className="btn-box">
                <Button
                  className="imgBtn"
                  color="blue"
                  onClick={this.CropperModalOpen.bind(this, true)}
                >
                  上传图标
                </Button>
                <Button
                  color="green"
                  className="imgBtn"
                  onClick={this.useDefault.bind(this, "bigImgUrl")}
                >
                  使用默认
                </Button>
              </div>
              <p className="imgTips">
                入口图标文件1
                <br />
                请上传80*80的png/jpg格式的图片，图片大小不能超过2MB
              </p>
              {/* <p className="imgTips">
            请选择类型为png/jpg、大小在128*128以内的图片。
          </p> */}

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
            <span className="img-box smallImg-box">
              <div
                className="ToolImgBox"
                style={{
                  backgroundImage:
                    "url(" +
                    (EntranceIconMiniShow
                      ? EntranceIconMiniShow
                      : DefaultImg) +
                    ")" +
                    "," +
                    "url(" +
                    DefaultImg +
                    ")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  // background:
                  //   "url(" +
                  //   (this.state.bigImgUrl
                  //     ? this.state.bigImgUrl
                  //     : DefaultImg) +
                  //   ") no-repeat center / contain",
                  // backgroundSize: "contain"
                }}
              ></div>
              <div className="btn-box">
                <Button
                  className="imgBtn"
                  color="blue"
                  onClick={this.CropperModalOpen.bind(this, false)}
                >
                  上传图标
                </Button>
                <Button
                  color="green"
                  className="imgBtn"
                  onClick={this.useDefault.bind(this, "smallImgUrl")}
                >
                  使用默认
                </Button>
              </div>
              <p className="imgTips">
                入口图标文件2
                <br />
                请上传32*32的png/jpg格式的图片，图片大小不能超过2MB
              </p>
            </span>
          </span>
          <ClassCropperModal
            // uploadedImageFile={classModalFile}
            UpDataUrl={
              ImgUrlProxy +
              "SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=" +
              LoginUser.UserID
            }
            Visiable={this.state.picVisible}
            InitPic={
              this.state.picUpType
                ? this.state.bigImgUrl
                : this.state.smallImgUrl
            }
            onClose={this.CropperModalClose}
            diskName="SysSetting"
            onSubmit={this.handleGetResultImgUrl(
              this.state.picUpType ? "bigImgUrl" : "smallImgUrl"
            )}
          ></ClassCropperModal>
        </div>
        <div className="row clearfix subject-row">
          <span className="row-left access-main-msg-tips">适用学科：</span>
          <span className="row-rigth access-main-msg">
            <CheckBox
              className="checkAll-box"
              // type="gray"
              onChange={this.onCheckAllChange}
              checked={checkAllSubject}
            >
              全部学科
            </CheckBox>
            <span className="devide"></span>

            <CheckBoxGroup
              value={SubjectIds}
              onChange={this.onSubjectIdsChange}
            >
              <Scrollbars
                autoHeightMin={25}
                autoHeightMax={50}
                // autoWidthMin={100}
                // autoWidthMax={400}
                className="Scrollbars"
              >
                {SubjectList instanceof Array &&
                  SubjectList.map((child) => {
                    return (
                      <CheckBox key={child.SubjectId} value={child.SubjectId}>
                        <span className="subject" title={child.SubjectName}>
                          {child.SubjectName}
                        </span>
                      </CheckBox>
                    );
                  })}
              </Scrollbars>
            </CheckBoxGroup>
            {/* <span className="tips-title">
              选择多个用户对象类型时，会自动为每个用户类型创建一个相同的入口
            </span> */}
          </span>
        </div>
        <div className="row clearfix addr-row">
          <span className="row-left access-main-msg-tips">
            <span className="must-icon">*</span>访问路径：
          </span>
          <span className="row-rigth access-main-msg">
            <span className="access-main-msg">
              PC端、安卓端、I0S端的访问路径，至少要填写一个;
              填写多个时，则为每个端创建一个入口
              {/* <Input
                maxLength={100}
                onBlur={this.onApplicationSecretBlur.bind(this)}
                onChange={this.onApplicationSecretChange.bind(this)}
                placeholder={"请输入入口名称"}
                value={EntranceName}
                width={200}
                height={20}
                className="access-main-msg-input"
              ></Input>
              <span
                className=" msg-tips"
                style={{
                  display: EntranceNameTipsVisible ? "block" : "none",
                }}
              >
                {EntranceNameTips}
              </span>
              {/* <span className="tips-title">
              选择多个用户对象类型时，会自动为每个用户类型创建一个相同的入口
            </span> * /}{" "}
              */}
            </span>
          </span>
        </div>
        <div
          className="row clearfix pc-row"
          style={{
            display:
              this.props.type === "add" || DeviceType === "pc"
                ? "block"
                : "none",
          }}
        >
          <span className="row-left access-main-msg-tips">PC端：</span>
          <span className="row-rigth access-main-msg">
            <span className="access-main-msg">
              <Tips
                overlayClassName="tips"
                visible={pcTipsVisible}
                getPopupContainer={(e) => e.parentNode}
                title={pcTips}
              >
                <Input
                  maxLength={100}
                  onBlur={this.onPcBlur.bind(this)}
                  onChange={this.onPcChange.bind(this)}
                  placeholder={"http(s)://"}
                  value={pc}
                  width={200}
                  height={20}
                  className="access-main-msg-input"
                ></Input>
              </Tips>
              {/* <span
                className=" msg-tips"
                style={{
                  display: EntranceNameTipsVisible ? "block" : "none",
                }}
              >
                {EntranceNameTips}
              </span> */}
            </span>
            <span className="tips-title">
              1、应用方式为网页访问时，填写绝对路径，
              http://www.myapp.com/note/read/index.html
              <br />
              2、应用方式为客户端EXE时，填写EXE的协议启动路径，如myapp://read
            </span>
          </span>
        </div>
        <div
          className="row clearfix ios-row"
          style={{
            display:
              this.props.type === "add" || DeviceType === "ios"
                ? "block"
                : "none",
          }}
        >
          <span className="row-left access-main-msg-tips">IOS端：</span>
          <span className="row-rigth access-main-msg">
            <span className="access-main-msg">
              <Tips
                overlayClassName="tips"
                visible={iosTipsVisible}
                getPopupContainer={(e) => e.parentNode}
                title={iosTips}
              >
                <Input
                  maxLength={100}
                  onBlur={this.onIosBlur.bind(this)}
                  onChange={this.onIosChange.bind(this)}
                  placeholder={"http(s)://"}
                  value={ios}
                  width={200}
                  height={20}
                  className="access-main-msg-input"
                ></Input>
              </Tips>
              {/* <span
                className=" msg-tips"
                style={{
                  display: EntranceNameTipsVisible ? "block" : "none",
                }}
              >
                {EntranceNameTips}
              </span> */}
            </span>
            <span className="tips-title">
              填写IOS的APP包名，如com.lancoo.myapp
            </span>
          </span>
        </div>
        <div
          className="row clearfix android-row"
          style={{
            display:
              this.props.type === "add" || DeviceType === "android"
                ? "block"
                : "none",
          }}
        >
          <span className="row-left access-main-msg-tips">安卓端：</span>
          <span className="row-rigth access-main-msg">
            <span className="access-main-msg">
              <Tips
                overlayClassName="tips"
                visible={androidTipsVisible}
                getPopupContainer={(e) => e.parentNode}
                title={androidTips}
              >
                <Input
                  maxLength={100}
                  onBlur={this.onAndroidBlur.bind(this)}
                  onChange={this.onAndroidChange.bind(this)}
                  placeholder={"http(s)://"}
                  value={android}
                  width={200}
                  height={20}
                  className="access-main-msg-input"
                ></Input>
              </Tips>
              {/* <span
                className=" msg-tips"
                style={{
                  display: EntranceNameTipsVisible ? "block" : "none",
                }}
              >
                {EntranceNameTips}
              </span> */}
            </span>
            <span className="tips-title">
              填写安卓的APP包名，如urlSchemes://xxxxxxxx
            </span>
          </span>
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
export default connect(mapStateToProps)(AddAccessEntrancesModal);
