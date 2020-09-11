import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, Input } from "antd";
import { Modal, DropDown, Loading, Tips } from "../../../../common";
import moment from "moment";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import actions from "../../actions";
import $ from "jquery";
import "../../../../common/js/PicUpload/photoUpload.scss";
import "../../../../common/js/PicUpload/Cropper/cropper.css";

import "../../../../common/js/PicUpload/Cropper/cropper";
window.jQuery = $;
window.$ = $;

require("../../../../common/js/PicUpload/juqery.cp.picUploader");
let { MainAction, CommonAction, PublicAction, util } = actions;

class UserArchivesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUpload: "",
    };
  }
  componentDidMount() {
    const {
      dispatch,
      DataState: {
        CommonData: {
          EditUserArchivesData: { UserID, ImgPath, Gender },
          UserArchivesParams: { UserArchivesModalRole },
        },
      },
    } = this.props;
    let token = sessionStorage.getItem("token");
    let { ResHttpRootUrl } = sessionStorage.getItem("LgBasePlatformInfo")
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let gender = "-1"; //-1:保密，0:男，1:女；
    switch (Gender) {
      case "男":
        gender = "0";
        break;
      case "女":
        gender = "1";
        break;
      default:
        gender = "-1";
        break;
    }
    // 图片上传
    let option = {
      token: token,
      resWebUrl: ResHttpRootUrl, //资源站点地址
      userType: UserArchivesModalRole, //用户类型，可选值Admin、Student、Teacher、SchoolLeader
      userID: UserID, //新增时传空字符串、编辑时传相应UserID
      curImgPath: ImgPath, //用户当前头像，新增时可不传
      gender: gender,
    };
    let picUpload = $("#picUpload");
    picUpload.picUploader(option); //初始化
    this.setState({
      picUpload,
    });
    console.log(picUpload, option);
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
      CommonAction.SetTipsVisibleParams({
        TelephoneTipsVisible: false,
        EmailTipsVisible: false,
        HomeAddressTipsVisible: false,
        DiscriptionTipsVisible: false,

        IDCardNoTipsVisible: false,
        TitleTipsVisible: false,
        GradeTipsVisible: false,
        UserNameTipsVisible: false,
        UserIDTipsVisible: false,
        GenderTipsVisible: false,
        ClassTipsVisible: false,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: false,
      })
    );
  };
  onEditIDChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        UserID: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onEditIDBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkUserID({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ UserID: value }));
        },
      })
    );
  };
  onEditNameChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        UserName: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onEditNameBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkUserName({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ UserName: value }));
        },
      })
    );
  };
  //性别
  onEditGendeChange = (e) => {
    const { dispatch } = this.props;

    this.state.picUpload.picUploader.setGender(e.title);
    dispatch(
      util.checkGender({
        value: e.title,
        success: () => {
          dispatch(CommonAction.SetEditUserArchivesData({ Gender: e.title }));
        },
      })
    );
    // dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: false }));
  };
  //学院
  onEditCollegeChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkCollege({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              CollegeID: e.value,
              CollegeName: e.title,
              MajorID: "",
              MajorName: "",
              GroupID: "",
              GroupName: "",
              ClassID: "",
              ClassName: "",
            })
          );
        },
      })
    );
  };
  // 教研室
  onEditGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkGroup({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              GroupID: e.value,
              GroupName: e.title,
            })
          );
        },
      })
    );
  };
  render() {
    let {
      DataState: {
        MainData: { StudentTree, TeacherTree },
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
          RolePower: { IsCollege },

          TipsVisible: {
            UserIDTipsVisible,
            IDCardNoTipsVisible,
            TitleTipsVisible,
            GradeTipsVisible,
            UserNameTipsVisible,
            GenderTipsVisible,
            ClassTipsVisible,
            MajorTipsVisible,
            GroupTipsVisible,
            CollegeTipsVisible,
            TelephoneTipsVisible,
            EmailTipsVisible,
            HomeAddressTipsVisible,
          },
          TipsTitle: {
            UserIDTipsTitle,
            UserNameTipsTitle, //（首尾不允许空格）
            GradeTipsTitle,
            TitleTipsTitle,

            ClassTipsTitle,
            CollegeTipsTitle,
            GroupTipsTitle,
            MajorTipsTitle,
            IDCardNoTipsTitle,
            HomeAdressTipsTitle,
            GenderTipsTitle,
            HomeAddressTipsTitle,
            EmailTipsTitle,
            TelephoneTipsTitle,
          },
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            CollegeID,
            CollegeName,
            Position,

            IDCardNo,
            Telephone,
            Email,
            HomeAddress,
            GroupID,
            GroupName,
            MajorID,
            MajorName,
            GradeID,
            GradeName,
            ClassID,
            ClassName,
          },
          StudentParams,
          // : {
          //   collegeID,
          //   collegeName,
          //   schoolID,
          //   majorID,
          //   majorName,
          //   gradeID,
          //   gradeName,
          //   classID,
          //   className,
          // }
          TeacherParams,

          LeaderParams,
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
    let UserIDC = "学号";
    let CollegeList = [];
    let MajorList = [];
    let GradeList = [];
    let ClassList = [];
    let GroupList = [];
    let PositionList = [
      { value: 0, title: "校长" },
      { value: 1, title: "副校长" },
      { value: 2, title: "教务主任" },
    ];
    let GenderList = [
      {
        value: "男",
        title: "男",
      },
      {
        value: "女",
        title: "女",
      },
      {
        value: "保密",
        title: "保密",
      },
    ];

    switch (UserArchivesModalRole) {
      case "Student":
        RoleName = "学生";
        UserIDC = "学号";
        CollegeList = StudentTree.CollegeList;
        // MajorList = StudentTree.MajorList;
        GradeList = StudentTree.GradeList;
        ClassList = StudentTree.ClassList;
        CollegeID !== "" &&
          StudentTree.MajorList instanceof Array &&
          MajorList.forEach((child) => {
            if (child.CollegeID === CollegeID) {
              MajorList.push(child);
            }
          });
        CollegeID !== "" &&
          MajorID !== "" &&
          GradeID !== "" &&
          StudentTree.ClassList instanceof Array &&
          StudentTree.ClassList.forEach((child) => {
            if (
              child.CollegeID === CollegeID &&
              child.MajorID === MajorID &&
              child.GradeID === GradeID
            ) {
              ClassList.push(child);
            }
          });
        break;
      case "Teacher":
        RoleName = "教师";
        UserIDC = "工号";
        CollegeList = TeacherTree.CollegeList;
        // GroupList = TeacherTree.GroupList;
        CollegeID !== "" &&
          TeacherTree.GroupList instanceof Array &&
          TeacherTree.GroupList.forEach((child) => {
            if (child.CollegeID === collegeID) {
              GroupList.push(child);
            }
          });
        break;
      case "Leader":
        RoleName = "领导";
        UserIDC = "工号";
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
          <div className="Modal-box">
            <div className="Left" id="picUpload"></div>
            <div className="Right">
              <div
                className="row clearfix"
                style={{
                  marginTop:
                    UserArchivesModalRole === "Student" ||
                    !UserArchivesModalRole
                      ? 18 + "px"
                      : 5 + "px",
                }}
              >
                <span className="culonm-1">
                  <span
                    className="must-icon"
                    style={{
                      display:
                        UserArchivesModalType === "add"
                          ? "inline-block"
                          : "none",
                    }}
                  >
                    *
                  </span>
                  {UserIDC + "："}
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={UserIDTipsVisible}
                    autoAdjustOverflow={false}
                    getPopupContainer={(e) => e.parentNode}
                    title={UserIDTipsTitle}
                  >
                    {UserArchivesModalType === "add" ? (
                      <Input
                        maxLength={24}
                        id="123"
                        placeholder={"请输入" + UserIDC + "..."}
                        className="UserName-input"
                        type="text"
                        name="EditID"
                        value={UserID}
                        onChange={this.onEditIDChange}
                        onBlur={this.onEditIDBlur}
                      />
                    ) : (
                      <span className="UserID-text" title={UserID}>
                        {UserID ? UserID : "--"}
                      </span>
                    )}
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">
                  <span className="must-icon">*</span>姓名：
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    placement={"right"}
                    getPopupContainer={(e) => e.parentNode}
                    autoAdjustOverflow={false}
                    visible={UserNameTipsVisible}
                    title={UserNameTipsTitle}
                  >
                    <Input
                      className="UserName-input"
                      maxLength={20}
                      placeholder={"请输入姓名..."}
                      type="text"
                      name="EditName"
                      value={UserName}
                      onChange={this.onEditNameChange}
                      onBlur={this.onEditNameBlur}
                    />
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">
                  <span className="must-icon">*</span>性别：
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={GenderTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    title={GenderTipsTitle}
                  >
                    <DropDown
                      style={{ zIndex: 10 }}
                      dropSelectd={{
                        value: Gender,
                        title: Gender ? Gender : "请选择性别",
                      }}
                      dropList={GenderList}
                      width={120}
                      height={96}
                      onChange={this.onEditGendeChange}
                    ></DropDown>
                  </Tips>
                </div>
              </div>
              {UserArchivesModalRole === "Student" ||
              UserArchivesModalRole === "Teacher" ? (
                <div className="row clearfix">
                  <span className="culonm-1">
                    <span className="must-icon">*</span>学院：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={CollegeTipsVisible}
                      getPopupContainer={(e) => e.parentNode}
                      title={CollegeTipsTitle}
                    >
                      {IsCollege ? (
                        <span title={CollegeName}>
                          {CollegeName ? CollegeName : "--"}
                        </span>
                      ) : (
                        <DropDown
                          style={{ zIndex: 4 }}
                          dropSelectd={
                            CollegeList.length > 0
                              ? {
                                  value: CollegeID,
                                  title: CollegeID ? CollegeName : "请选择学院",
                                }
                              : { value: -1, title: "暂无创建学院" }
                          }
                          dropList={CollegeList}
                          width={200}
                          height={96}
                          onChange={this.onEditCollegeChange}
                        ></DropDown>
                      )}
                    </Tips>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {UserArchivesModalRole === "Teacher" ? (
              <div className="row clearfix ">
                <span className="culonm-1 ">
                  <span className="must-icon">*</span>教研室：
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={
                      CollegeID && GroupList.length !== 0
                        ? GroupTipsVisible
                        : false
                    }
                    getPopupContainer={(e) => e.parentNode}
                    title={GroupTipsTitle}
                  >
                    <DropDown
                      style={{ zIndex: 2 }}
                      disabled={
                        GroupList.length === 0 || !CollegeID ? true : false
                      }
                      // disabled={this.state.ClassChange.value===-1?false:true}
                      dropSelectd={
                        !CollegeID || GroupList.length > 0
                          ? {
                              value: GroupID,
                              title: GroupID ? GroupName : "请选择教研室",
                            }
                          : { value: -1, title: "暂无创建教研室" }
                      }
                      dropList={GroupList}
                      width={200}
                      height={96}
                      onChange={this.onEditGroupChange}
                    ></DropDown>
                  </Tips>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
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
