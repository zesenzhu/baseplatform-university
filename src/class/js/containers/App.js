import React, { Component, createRef } from "react";

import { Loading, Alert, Modal, MenuLeftNoLink, Menu } from "../../../common";

import publicJS from "../../../common/js/public";

import Frame from "../../../common/Frame";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { TokenCheck_Connect } from "../../../common/js/disconnect";

import { connect } from "react-redux";
import PaginationActions from "../actions/PaginationActions";
import SearchActions from "../actions/SearchActions";

import "../../scss/index.scss";

import UpUIState from "../actions/UpUIState";

import UpDataState from "../actions/UpDataState";

import RouterSetActions from "../actions/RouterSetActions";

import ModuleActions from "../actions/ModuleActions";

import Banner from "../component/Banner";

import TeacherBtnBanner from "../component/Teacher/TeacherBtnBanner";

import ContentContainer from "./ContentContainer";

import AddClassModal from "../component/AddClassModal";

import HandleMajorModal from "../component/HandleMajorModal";

import Import from "./Import";

import logo from "../../images/logo.png";

import TeacherLogo from "../../images/teacher-logo.png";

import TMActions from "../actions/Teacher/TeacherModalActions";

import SIMActions from "../actions/Teacher/StudentInfoModalActions";

import { QueryPower, QueryOtherPower } from "../../../common/js/power/index";

import ApiActions from "../actions/ApiActions";

import AppAlertActions from "../actions/AppAlertActions";

import EditMajorModal from "../component/EditMajorModal";
import logo2 from "../../images/icon-logo.png";
import logo3 from "../../images/logo.png";

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    //判断token是否存在

    const hash = location.hash;

    // if (publicJS.IEVersion()) {
    //   TokenCheck_Connect(false, () => {
    //     if (sessionStorage.getItem("UserInfo")) {
    //       let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    //       let { UserType, UserClass } = UserInfo;
    //       if (UserType === "7" || UserType === "10") {
    //         UserInfo.UserClass = "2";
    //         UserInfo.UserType = "7";
    //         UserType = "7";
    //         UserClass = "2";
    //       }
    //       // console.log(UserInfo)
    //       dispatch({ type: UpDataState.GET_LOGIN_USER_INFO, data: UserInfo });

    //       //判断用户权限

    //       //是管理员的情况下
    //       if (parseInt(UserType) === 0) {
    //         QueryPower({ UserInfo: UserInfo, ModuleID: "000-2-0-06" }).then(
    //           (data) => {
    //             console.log(data);
    //             if (data) {
    //               if (hash.includes("Import")) {
    //                 //导入界面
    //                 // if (!hash.includes("Student")) {
    //                 //   window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //                 //   return;
    //                 // }

    //                 dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

    //                 //判断用户类型

    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: false,

    //                     ShowBarner: false,

    //                     ModuleInfo: {
    //                       cnname: "行政班管理",

    //                       enname: "Administration class management",

    //                       image: logo,

    //                       subtitle: "导入班主任及班长",
    //                     },
    //                   },
    //                 });
    //               } else {
    //                 //非导入界面
    //                 //非导入界面
    //                 window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //                 return;
    //                 dispatch({ type: RouterSetActions.ROUTER_SET_TO_DEFAULT });

    //                 let UserInfo = JSON.parse(
    //                   sessionStorage.getItem("UserInfo")
    //                 );

    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: true,

    //                     ShowBarner: true,

    //                     ModuleInfo: {
    //                       cnname: "行政班管理",

    //                       enname: "Administration class management",

    //                       image: logo,
    //                     },
    //                   },
    //                 });

    //                 dispatch(UpDataState.getPageInit());
    //               }
    //             } else {
    //               window.location.href = "/Error.aspx?errcode=E011";
    //             }
    //           }
    //         );
    //       } else {
    //         //是非管理员的情况下

    //         //判断是否是教师账号
    //         // console.log(UserClass,UserType)
    //         if (parseInt(UserType) === 1 && UserClass[2] === "1") {
    //           if (hash.includes("Import")) {
    //             //导入界面

    //             dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

    //             dispatch({
    //               type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //               data: {
    //                 ShowLeftMenu: false,

    //                 ShowBarner: false,

    //                 ModuleInfo: {
    //                   cnname: "班级管理",

    //                   enname: "Class management",

    //                   image: TeacherLogo,

    //                   subtitle: "导入学生档案",
    //                 },
    //               },
    //             });
    //           } else {
    //             dispatch({
    //               type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //               data: {
    //                 ShowLeftMenu: false,

    //                 ShowBarner: true,
    //                 ModuleInfo: {
    //                   cnname: "我的行政班",

    //                   enname: "My Class",

    //                   image: logo3,

    //                   subtitle: "",
    //                 },
    //                 // ModuleInfo: {
    //                 //   cnname: "班级管理",

    //                 //   enname: "Class management",

    //                 //   image: TeacherLogo,
    //                 // },
    //               },
    //             });
    //           }

    //           /*dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                 ShowLeftMenu:false,

    //                                 ShowBarner:false,

    //                                 ModuleInfo:{

    //                                     cnname:'班级管理',

    //                                     enname:"Class management",

    //                                     image:TeacherLogo

    //                                 }

    //                             }});

    //                         dispatch(UpDataState.getPageInit());*/
    //         } else if (
    //           parseInt(UserType) === 7 ||
    //           parseInt(UserType) === 10
    //           //  && UserClass === "2"
    //         ) {
    //           //判断是否是教务主任

    //           // QueryOtherPower({
    //           //   SchoolID: UserInfo.SchoolID,
    //           //   ModuleID: "000-2-0-06",
    //           //   Power: "Dean_Class_CURD",
    //           //   UserType: UserType,
    //           // }).then((data) => {
    //           //   if (data) {
    //           //有权限的教务主任

    //           if (hash.includes("Import")) {
    //             //导入界面

    //             dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

    //             //判断用户类型

    //             dispatch({
    //               type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //               data: {
    //                 ShowLeftMenu: false,

    //                 ShowBarner: false,

    //                 ModuleInfo: {
    //                   cnname: "行政班管理",

    //                   enname: "Administration class management",

    //                   image: logo,

    //                   subtitle: "导入班主任及班长",
    //                 },
    //               },
    //             });
    //           } else {
    //             //非导入界面
    //             //非导入界面
    //             // window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //             // return;
    //             dispatch({ type: RouterSetActions.ROUTER_SET_TO_DEFAULT });

    //             let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    //             dispatch({
    //               type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //               data: {
    //                 ShowLeftMenu: true,

    //                 ShowBarner: true,

    //                 ModuleInfo: {
    //                   cnname: "行政班管理",

    //                   enname: "Administration class management",

    //                   image: logo,

    //                   subtitle: "",
    //                 },
    //               },
    //             });

    //             dispatch(UpDataState.getPageInit());
    //           }
    //           // } else {
    //           //   //没有权限的教务主任

    //           //   // window.location.href = "/Error.aspx?errcode=E011";
    //           // }
    //           // });
    //         } else if (parseInt(UserType) === 2 && parseInt(UserType) === 3) {
    //           //家长或学生
    //           window.location.href = "/html/admclass#/ClassDetails"; //直接去到最新的版本
    //           return;
    //         } else {
    //           //既不是教务主任，也不是班主任也不是管理员的情况下
    //           // window.location.href = "/Error.aspx?errcode=E011";
    //         }
    //       }

    //     } else {
    //       let getUserInfo = setInterval(() => {
    //         if (sessionStorage.getItem("UserInfo")) {
    //           let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    //           let { UserType, UserClass } = UserInfo;
    //           if (UserType === "7" || UserType === "10") {
    //             UserInfo.UserClass = "2";
    //             UserInfo.UserType = "7";
    //             UserType = "7";
    //             UserClass = "2";
    //           }
    //           dispatch({
    //             type: UpDataState.GET_LOGIN_USER_INFO,
    //             data: UserInfo,
    //           });

    //           /*  if (hash.includes('Import')){//导入界面

    //                               dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT});

    //                               //判断用户类型
    //                               if (parseInt(UserType)===0){

    //                                   dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                           ShowLeftMenu:false,

    //                                           ShowBarner:false,

    //                                           ModuleInfo:{

    //                                               cnname:'行政班管理',

    //                                               enname:"Administration class management",

    //                                               image:logo

    //                                           }

    //                                       }});

    //                               }else if (parseInt(UserType)===1) {

    //                                   dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                           ShowLeftMenu:false,

    //                                           ShowBarner:false,

    //                                           ModuleInfo:{

    //                                               cnname:'班级管理',

    //                                               enname:"Class management",

    //                                               image:TeacherLogo

    //                                           }

    //                                       }});

    //                               }

    //                           }else{//非导入界面

    //                               dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT});

    //                               if (parseInt(UserType)===0){

    //                                   dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                           ShowLeftMenu:true,

    //                                           ShowBarner:true,

    //                                           ModuleInfo:{

    //                                               cnname:'行政班管理',

    //                                               enname:"Administration class management",

    //                                               image:logo

    //                                           }

    //                                       }});

    //                               }else if (parseInt(UserType)===1) {

    //                                   dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                           ShowLeftMenu:false,

    //                                           ShowBarner:true,

    //                                           ModuleInfo:{

    //                                               cnname:'班级管理',

    //                                               enname:"Class management",

    //                                               image:TeacherLogo

    //                                           }

    //                                       }});

    //                               }

    //                               dispatch(UpDataState.getPageInit());

    //                           }*/

    //           //是管理员的情况下
    //           if (parseInt(UserType) === 0) {
    //             QueryPower({ UserInfo: UserInfo, ModuleID: "000-2-0-06" }).then(
    //               (data) => {
    //                 if (data) {
    //                   if (hash.includes("Import")) {
    //                     //导入界面
    //                     // if (hash.includes("Student")) {
    //                     //   window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //                     //   return;
    //                     // }
    //                     dispatch({
    //                       type: RouterSetActions.ROUTER_SET_TO_IMPORT,
    //                     });

    //                     //判断用户类型

    //                     dispatch({
    //                       type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                       data: {
    //                         ShowLeftMenu: false,

    //                         ShowBarner: false,

    //                         ModuleInfo: {
    //                           cnname: "行政班管理",

    //                           enname: "Administration class management",

    //                           image: logo,

    //                           subtitle: "导入班主任及班长",
    //                         },
    //                       },
    //                     });
    //                   } else {
    //                     //非导入界面
    //                     window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //                     return;
    //                     dispatch({
    //                       type: RouterSetActions.ROUTER_SET_TO_DEFAULT,
    //                     });

    //                     let UserInfo = JSON.parse(
    //                       sessionStorage.getItem("UserInfo")
    //                     );

    //                     dispatch({
    //                       type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                       data: {
    //                         ShowLeftMenu: true,

    //                         ShowBarner: true,

    //                         ModuleInfo: {
    //                           cnname: "行政班管理",

    //                           enname: "Administration class management",

    //                           image: logo,
    //                         },
    //                       },
    //                     });

    //                     dispatch(UpDataState.getPageInit());
    //                   }
    //                 } else {
    //                   window.location.href = "/Error.aspx?errcode=E011";
    //                 }
    //               }
    //             );
    //           } else {
    //             //是非管理员的情况下

    //             //判断是否是教师账号

    //             if (parseInt(UserType) === 1 && UserClass[2] === "1") {
    //               if (hash.includes("Import")) {
    //                 //导入界面

    //                 dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: false,

    //                     ShowBarner: false,

    //                     ModuleInfo: {
    //                       cnname: "班级管理",

    //                       enname: "Class management",

    //                       image: TeacherLogo,

    //                       subtitle: "导入学生档案",
    //                     },
    //                   },
    //                 });
    //               } else {
    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: false,

    //                     ShowBarner: true,

    //                     // ModuleInfo: {
    //                     //   cnname: "班级管理",

    //                     //   enname: "Class management",

    //                     //   image: TeacherLogo,
    //                     // },
    //                     ModuleInfo: {
    //                       cnname: "我的行政班",

    //                       enname: "My Class",

    //                       image: logo3,

    //                       subtitle: "",
    //                     },
    //                   },
    //                 });
    //               }

    //               /* dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

    //                                          ShowLeftMenu:false,

    //                                          ShowBarner:false,

    //                                          ModuleInfo:{

    //                                              cnname:'班级管理',

    //                                              enname:"Class management",

    //                                              image:TeacherLogo

    //                                          }

    //                                      }});

    //                                  dispatch(UpDataState.getPageInit());*/
    //             } else if (
    //               parseInt(UserType) === 7 ||
    //               parseInt(UserType) === 10
    //               //  && UserClass === "2"
    //             ) {
    //               //判断是否是教务主任

    //               // QueryOtherPower({
    //               //   SchoolID: UserInfo.SchoolID,
    //               //   ModuleID: "000-2-0-06",
    //               //   Power: "Dean_Class_CURD",
    //               //   UserType: UserType,
    //               // }).then((data) => {
    //               //   if (data) {
    //               //有权限的教务主任

    //               if (hash.includes("Import")) {
    //                 //导入界面

    //                 dispatch({
    //                   type: RouterSetActions.ROUTER_SET_TO_IMPORT,
    //                 });

    //                 //判断用户类型

    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: false,

    //                     ShowBarner: false,

    //                     ModuleInfo: {
    //                       cnname: "行政班管理",

    //                       enname: "Administration class management",

    //                       image: logo,

    //                       subtitle: "导入班主任及班长",
    //                     },
    //                   },
    //                 });
    //               } else {
    //                 //非导入界面
    //                 //非导入界面
    //                 window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
    //                 return;
    //                 dispatch({
    //                   type: RouterSetActions.ROUTER_SET_TO_DEFAULT,
    //                 });

    //                 let UserInfo = JSON.parse(
    //                   sessionStorage.getItem("UserInfo")
    //                 );

    //                 dispatch({
    //                   type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
    //                   data: {
    //                     ShowLeftMenu: true,

    //                     ShowBarner: true,

    //                     ModuleInfo: {
    //                       cnname: "行政班管理",

    //                       enname: "Administration class management",

    //                       image: logo,
    //                     },
    //                   },
    //                 });

    //                 dispatch(UpDataState.getPageInit());
    //               }
    //               //   } else {
    //               //     //没有权限的教务主任

    //               //     window.location.href = "/Error.aspx?errcode=E011";
    //               //   }
    //               // });
    //             } else if (
    //               parseInt(UserType) === 2 &&
    //               parseInt(UserType) === 3
    //             ) {
    //               //家长或学生
    //               window.location.href = "/html/admclass#/ClassDetails"; //直接去到最新的版本
    //               return;
    //             } else {
    //               //既不是教务主任，也不是班主任也不是管理员的情况下

    //               window.location.href = "/Error.aspx?errcode=E011";
    //             }
    //           }

    //           clearInterval(getUserInfo);
    //         }
    //       }, 20);
    //     }
    //   });
    // }
    this.Frame = createRef();
    window.menuClick = this.menuClick.bind(this);
  }

  addClass(e) {
    const { dispatch, UIState, DataState } = this.props;

    const { SchoolGradeClasses, MajorClassPreview, LoginUser } = DataState;

    const { ComponentChange } = UIState;

    let { GradeSlect } = MajorClassPreview;

    const {
      stu,
      grade,
      gradeInfo,
      classInfo,
      collegeInfo,
      majorInfo,
      college,
      major,
    } = ComponentChange;

    dispatch({ type: UpUIState.ADD_CLASS_MODAL_SHOW });

    //如果不是在全部学生界面
    if (!stu) {
      let collegeSelectd = { value: "", title: "请选择学院" };
      let majorSelectd = { value: "", title: "请选择专业" };
      let gradeSelectd = { value: "", title: "请选择年级" };

      if (college) {
        collegeSelectd = { value: collegeInfo.id, title: collegeInfo.name };
      } else if (major) {
        if (GradeSlect.value !== "") {
          collegeSelectd = {
            value: majorInfo.collegeID,
            title: majorInfo.collegeName,
          };

          majorSelectd = { value: majorInfo.id, title: majorInfo.name };
          gradeSelectd = GradeSlect;
        } else {
          collegeSelectd = {
            value: majorInfo.collegeID,
            title: majorInfo.collegeName,
          };
          // gradeSelectd = GradeSlect;
          majorSelectd = { value: majorInfo.id, title: majorInfo.name };
        }
      } else if (ComponentChange.class) {
        collegeSelectd = {
          value: classInfo.collegeID,
          title: classInfo.collegeName,
        };
        // gradeSelectd = GradeSlect;
        majorSelectd = { value: classInfo.majorID, title: classInfo.majorName };
      }
      if (LoginUser.UserClass === "3" || LoginUser.UserClass === "4") {
        collegeSelectd = {
          value: LoginUser.CollegeID,
          title: LoginUser.CollegeName,
        };
      }
      if (majorSelectd.value !== 0) {
        dispatch(UpDataState.setAddClassGradePreview(majorSelectd.value));
      }
      console.log(
        gradeSelectd,
        collegeSelectd,
        majorSelectd,
        stu,
        grade,
        gradeInfo,
        classInfo,
        collegeInfo,
        majorInfo,
        college,
        major
      );
      dispatch({
        type: UpUIState.ADD_CLASS_SELECT_CHANGE,
        selectValue: { gradeSelectd, collegeSelectd, majorSelectd },
      });

      dispatch({ type: UpUIState.ADD_CLASS_INPUT_ABLED });
    }
  }

  addClassDropChange(e) {
    //添加班级的下拉选择产生变化

    const { dispatch } = this.props;

    const { value } = e;

    if (value === 0) {
      dispatch({ type: UpUIState.ADD_CLASS_SELECT_CHANGE, selectValue: e });

      dispatch({ type: UpUIState.ADD_CLASS_INPUT_DISABLED });
      //修改input的值
      dispatch({ type: UpUIState.ADD_CLASS_INPUT_CHANGE, value: "" });

      dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_HIDE });
    } else {
      dispatch({ type: UpUIState.ADD_CLASS_SELECT_CHANGE, selectValue: e });

      //取消警告如果有的话

      dispatch({ type: UpUIState.ADD_CLASS_SELECT_TIPS_HIDE });

      dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_HIDE });

      dispatch({ type: UpUIState.ADD_CLASS_INPUT_ABLED });
    }
  }

  //添加班级输入框值变化
  addClassInputChange(e) {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.ADD_CLASS_INPUT_CHANGE, value: e.target.value });

    dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_HIDE });
  }
  //添加班级点击确定
  addClassOk(e) {
    const { dispatch, DataState } = this.props;

    const { SchoolGradeClasses, TheGradePreview } = DataState;

    let TheGradePreviewID = TheGradePreview.GradeID
      ? TheGradePreview.GradeID
      : "";
    const { AddClassModal } = this.props.UIState;
    let { dropDownData, selectValue } = AddClassModal;
    // let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;
    let { collegeSelectd, majorSelectd, gradeSelectd } = selectValue;
    let { Classes } = dropDownData;

    let isError = false;

    //判断是否已经选择了学院
    if (collegeSelectd.value === "") {
      dispatch({ type: UpUIState.ADD_CLASS_COLLEGE_TIPS_SHOW });
      isError = true;
      return;
    }

    //判断是否已经选择了专业
    if (majorSelectd.value === "") {
      dispatch({ type: UpUIState.ADD_CLASS_MAJOR_TIPS_SHOW });
      isError = true;
      return;
    }
    //判断是否已经选择了年级
    if (gradeSelectd.value === "") {
      dispatch({ type: UpUIState.ADD_CLASS_GRADE_TIPS_SHOW });
      isError = true;
      return;
    }
    // if (isError) {
    //   return;
    // }
    //输入为空
    if (AddClassModal.inputValue === "") {
      dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_SHOW });

      dispatch({
        type: UpUIState.ADD_CLASS_INPUT_TIPS,
        tips: "班级名称不能为空",
      });
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(AddClassModal.inputValue)) {
        dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_HIDE });

        let isChong = false;
        for (let key in Classes) {
          if (!(Classes[key] instanceof Array))
            for (let index in Classes[key]) {
              if (Classes[key][index].title === AddClassModal.inputValue) {
                isChong = true;
              }
            }
        }

        if (isChong) {
          //有同名
          dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_SHOW });

          dispatch({
            type: UpUIState.ADD_CLASS_INPUT_TIPS,
            tips: "班级名称和其他班级名称重复",
          });
        } else {
          // console.log(majorSelectd.value)
          //向后台请求添加班级的接口
          dispatch(
            UpDataState.addClass({
              GradeID: gradeSelectd.value,
              // CollegeID: collegeSelectd.value,
              MajorID: majorSelectd.value,
              ClassName: AddClassModal.inputValue,
              TheGradePreviewID,
            })
          );
        }
      } else {
        dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_SHOW });

        dispatch({
          type: UpUIState.ADD_CLASS_INPUT_TIPS,
          tips:
            "班级名称应由1-20位的汉字、字母、数字以及括号组成，建议以学院为前缀",
        });
      }
    }
  }
  //添加班级点击取消和（x）的按钮
  addClassCancel() {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.ADD_CLASS_MODAL_HIDE });
  }
  //添加班级点击确定
  editMajorOk(e) {
    const { dispatch, DataState } = this.props;
    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_HIDE });
  }
  //添加班级点击取消和（x）的按钮
  addMajorCancel() {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.ADD_MAJOR_MODAL_HIDE });
  }
  //添加班级点击取消和（x）的按钮
  addMajorOk() {
    const { dispatch, DataState, UIState } = this.props;
    const { SchoolGradeClasses, TheGradePreview } = DataState;
    // console.log(111)
    let { SchoolID } = DataState.LoginUser;

    let TheGradePreviewID = TheGradePreview.GradeID
      ? TheGradePreview.GradeID
      : "";
    const { EditMajorModal, AddClassModal } = this.props.UIState;
    let { college, major } = EditMajorModal.handleMajorMsg;
    let { secondDropDown } = AddClassModal;
    let { handleMajorTipsShow, handleMajorMsg } = EditMajorModal;
    // let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;

    //判断是否已经选择了学院
    if (college.value === "") {
      // dispatch({ type: UpUIState.ADD_CLASS_COLLEGE_TIPS_SHOW });
      // isError = true;
      return;
    }

    // if (isError) {
    //   return;
    // }
    //输入为空
    if (major.title === "") {
      dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

      dispatch({
        type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
        tips: "专业名称不能为空",
      });
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(major.title)) {
        dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE });

        let isChong = false;
        for (let key in secondDropDown) {
          if (!(secondDropDown[key] instanceof Array))
            for (let index in secondDropDown[key]) {
              if (secondDropDown[key][index].title === major.title) {
                isChong = true;
              }
            }
        }

        if (isChong) {
          //有同名
          dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

          dispatch({
            type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
            tips: "该学院下已存在同名专业",
          });
        } else {
          //向后台请求添加班级的接口

          UpDataState.addMajor({
            CollegeID: college.value,
            MajorName: major.title,
            dispatch,
          }).then((data) => {
            if (data === "success") {
              dispatch({ type: UpUIState.ADD_MAJOR_MODAL_HIDE });
              dispatch(
                UpDataState.getPageInit_Univ(
                  DataState.SchoolGradeClasses.selectID
                )
              );
              let { collegeInfo } = UIState.ComponentChange;
              let {
                ClassContentShow,
                SearchKey,

                CancelBtnShow,
                ClassInfo,
              } = DataState.MajorPreview;
              let { PageIndex } = ClassInfo;
              if (UIState.ComponentChange.college && SearchKey === "") {
                dispatch(
                  UpDataState.getTheCollgePreview(collegeInfo.id, {
                    ClassContentShow,
                    SearchKey,

                    CancelBtnShow,
                  })
                );
              } else if (UIState.ComponentChange.college && SearchKey !== "") {
                dispatch(PaginationActions.CollegeClassPageChange(PageIndex));
              }
              if (
                window.opener &&
                window.opener.location.href.includes("/html/admArchives")
              ) {
                window.opener.location.reload();
              }
            }
          });
        }
      } else {
        dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

        dispatch({
          type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
          tips:
            "专业名称应由1-20位的汉字、字母、数字以及括号组成，建议以学院为前缀",
        });
      }
    }
    // dispatch({ type: UpUIState.ADD_MAJOR_MODAL_HIDE });
  }
  //添加班级点击取消和（x）的按钮
  EditMajorCancel() {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_HIDE });
  }
  //添加班级点击取消和（x）的按钮
  EditMajorOk() {
    const { dispatch, DataState, UIState } = this.props;

    const { SchoolGradeClasses, TheGradePreview } = DataState;

    let TheGradePreviewID = TheGradePreview.GradeID
      ? TheGradePreview.GradeID
      : "";
    const { EditMajorModal, AddClassModal } = this.props.UIState;
    let { college, major } = EditMajorModal.handleMajorMsg;
    let { secondDropDown } = AddClassModal;
    let { handleMajorTipsShow, handleMajorMsg } = EditMajorModal;
    // let { collegeTips, majorTips, gradeTips, classNameTips } = selectTips;

    //判断是否已经选择了学院
    if (college.value === "") {
      // dispatch({ type: UpUIState.ADD_CLASS_COLLEGE_TIPS_SHOW });
      // isError = true;
      return;
    }

    // if (isError) {
    //   return;
    // }
    //输入为空
    if (major.title === "") {
      dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

      dispatch({
        type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
        tips: "专业名称不能为空",
      });
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(major.title)) {
        dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE });

        let isChong = false;
        for (let key in secondDropDown) {
          if (!(secondDropDown[key] instanceof Array))
            for (let index in secondDropDown[key]) {
              if (secondDropDown[key][index].title === major.title) {
                isChong = true;
              }
            }
        }

        if (isChong) {
          //有同名
          dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

          dispatch({
            type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
            tips: "该学院下已存在同名专业",
          });
        } else {
          //向后台请求添加班级的接口

          UpDataState.editMajor({
            MajorID: major.value,
            CollegeID: college.title,
            MajorName: major.title,
            dispatch,
          }).then((data) => {
            if (data === "success") {
              dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_HIDE });
              dispatch(
                UpDataState.getPageInit_Univ(
                  DataState.SchoolGradeClasses.selectID
                )
              );
              let { collegeInfo } = UIState.ComponentChange;
              let {
                ClassContentShow,
                SearchKey,

                CancelBtnShow,
                ClassInfo,
              } = DataState.MajorPreview;
              let { PageIndex } = ClassInfo;
              if (UIState.ComponentChange.college && SearchKey === "") {
                dispatch(
                  UpDataState.getTheCollgePreview(collegeInfo.id, {
                    ClassContentShow,
                    SearchKey,

                    CancelBtnShow,
                  })
                );
              } else if (UIState.ComponentChange.college && SearchKey !== "") {
                dispatch(PaginationActions.CollegeClassPageChange(PageIndex));
              }
            }
          });
        }
      } else {
        dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

        dispatch({
          type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
          tips:
            "专业名称应由1-20位的汉字、字母、数字以及括号组成，建议以年级为前缀",
        });
      }
    }
  }
  //添加班级点击取消和（x）的按钮
  editMajorCancel() {
    const { dispatch } = this.props;

    dispatch({ type: UpUIState.ADD_CLASS_MODAL_HIDE });
  }
  UserComm_CheckGroupName(strInput) {
    //用户群名称检测（学校、年级、班级、教师组、专家组）
    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      strInput
    );
  }

  //点击左侧的菜单

  menuClick(e) {
    const { ident, id, name, collegeID, collegeName, majorID, majorName } = e;
    console.log(e);
    const { dispatch, UIState } = this.props;
    // $('.MenuBox').find('.active').removeClass('active')
    // $('.MenuBox').find('.selected').removeClass('selected')
    // $('.MenuBox').find('.actived').removeClass('actived')
    dispatch(UpDataState.setSchoolGradeClasses(id));
    let ComponentChange = UIState.ComponentChange;
    switch (ident) {
      case "stu":
        dispatch({
          type: UpUIState.CHANGE_STU_ACTIVE,
          info: { id: id, name: name },
        });
        if (ComponentChange[ident]) {
          // dispatch(UpDataState.getAllGradePreview());
          dispatch(SearchActions.SchoolCancelClassSearch());
          console.log(ident);
        }
        break;
      case "college":
        dispatch({
          type: UpUIState.CHANGE_COLLEGE_ACTIVE,
          info: { id: id, name: name },
        });
        if (ComponentChange[ident]) {
          // dispatch(UpDataState.getTheCollgePreview(id));
          dispatch(SearchActions.CollegeClassCloseSearch(id));
        }
        break;
      case "major":
        dispatch({
          type: UpUIState.CHANGE_MAJOR_ACTIVE,
          info: { id: id, name: name, collegeID, collegeName },
        });
        if (ComponentChange[ident]) {
          // dispatch(UpDataState.getTheMajorPreview(id));
          dispatch(SearchActions.MajorClassCloseSearch(id));
        }
        break;

      case "class":
        dispatch({
          type: UpUIState.CHANGE_CLASS_ACTIVE,
          info: {
            id: id,
            name: name,
            collegeID,
            collegeName,
            majorID,
            majorName,
          },
        });
        if (ComponentChange[ident]) {
          // dispatch(UpDataState.getTheClassPreview(id));
          dispatch(SearchActions.StudentCancelSearch(id));
        }
        break;

      default:
        dispatch({
          type: UpUIState.CHANGE_STU_ACTIVE,
          info: { id: id, name: name },
        });
    }
  }

  //点击导入

  Import(type) {
    if (type === 1) {
      window.open("/html/admclass/#/Import/Teacher");
    }

    if (type === 2) {
      window.open("/html/admclass/#/Import/Genger");
    }
  }

  //教师端弹出教师弹窗
  TeacherTeacherModalShow(opt) {
    const { dispatch, ClassCharge } = this.props;

    switch (opt.type) {
      case 1:
        ApiActions.GetSubject({
          ClassID: ClassCharge.ActiveClassID,
          dispatch,
        }).then((data) => {
          const { Total, List } = data;

          if (Total > 0) {
            if (List.length === 0) {
              dispatch(
                AppAlertActions.alertWarn({
                  title: `本班${Total}门学科均已设置任课教师,无需添加`,
                })
              );
            } else {
              dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_SHOW });

              dispatch(
                TMActions.getTeacherData({
                  ClassID: ClassCharge.ActiveClassID,
                  ...opt,
                })
              );
            }
          } else {
            dispatch(
              AppAlertActions.alertWarn({
                title: "本班未开设学科，无法添加任课教师。",
              })
            );
          }
        });

        break;

      case 2:
        dispatch({
          type: TMActions.TEACHER_TEACHER_MODAL_SHOW,
          options: {
            originTeacherShow: true,

            originTeacherInfo: opt.originTeacherInfo,

            originTeacherTitle: "原任课教师",

            newTeacherTitle: "新任课教师",

            modalTitle: "更改任课教师",

            type: 2,

            SubjectID: opt.originTeacherInfo.SubjectID,
          },
        });

        dispatch(
          TMActions.getTeacherData({
            ClassID: ClassCharge.ActiveClassID,
            ...opt,
          })
        );

        break;

      default:
        dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_SHOW });
    }
    //初始化所有的教师和学科的数据
  }

  //弹出添加学生的弹窗

  AddStudentShow(e) {
    const { dispatch } = this.props;

    dispatch({ type: SIMActions.TEACHER_STUDENT_INFO_MODAL_SHOW });
  }
  // 专业管理

  editMajor = () => {
    const { dispatch, DataState, UIState } = this.props;
    const { SchoolGradeClasses, MajorClassPreview, LoginUser } = DataState;

    const { ComponentChange, AddClassModal } = UIState;

    let { GradeSlect } = MajorClassPreview;
    let { firstDropDown } = AddClassModal.dropDownData;
    const {
      stu,
      grade,
      gradeInfo,
      classInfo,
      collegeInfo,
      majorInfo,
      college,
      major,
    } = ComponentChange;

    // dispatch({ type: UpUIState.ADD_CLASS_MODAL_SHOW });

    //如果不是在全部学生界面
    // console.log(firstDropDown)
    let collegeSelectd = firstDropDown[0];
    // let majorSelectd = { value: "", title: "请选择专业" };
    // let gradeSelectd = { value: "", title: "请选择年级" };

    if (college) {
      collegeSelectd = { value: collegeInfo.id, title: collegeInfo.name };
    } else if (major) {
      if (GradeSlect.value !== "") {
        collegeSelectd = {
          value: majorInfo.collegeID,
          title: majorInfo.collegeName,
        };
      } else {
        collegeSelectd = {
          value: majorInfo.collegeID,
          title: majorInfo.collegeName,
        };
      }
    } else if (ComponentChange.class) {
      collegeSelectd = {
        value: classInfo.collegeID,
        title: classInfo.collegeName,
      };
    }
    if (LoginUser.UserClass === "3" || LoginUser.UserClass === "4") {
      collegeSelectd = {
        value: LoginUser.CollegeID,
        title: LoginUser.CollegeName,
      };
    }
    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_SHOW });

    dispatch({
      type: UpUIState.EDIT_MAJOR_SELECT_CHANGE,
      selectValue: { collegeSelectd },
    });
  };
  editMajorCancel = () => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_HIDE });
  };
  // editMajorOk =()=>{
  //   const { dispatch,DataState,UIState } = this.props;

  //   dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_HIDE });
  // }
  // 获取frame的ref
  onRef = (ref) => {
    this.Frame = ref;
  };
  RequestData = () => {
    const { dispatch, DataState, UIState } = this.props;
    const hash = location.hash;
    let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      let { UserType, UserClass } = UserInfo;
    let ModuleID =  '000014';
    if(UserType==='0'){
      ModuleID = '000011'
    }
    // return;
    this.Frame.getIdentity({ ModuleID }, (identify) => {
      
      if (UserType === "7" || UserType === "10") {
        UserInfo.UserClass = "2";
        UserInfo.UserType = "7";
        UserType = "7";
        UserClass = "2";
      }
      // console.log(UserInfo)
      dispatch({ type: UpDataState.GET_LOGIN_USER_INFO, data: {...UserInfo,identify} });

      //判断用户权限

      //是管理员的情况下
      if (parseInt(UserType) === 0) {
        // QueryPower({ UserInfo: UserInfo, ModuleID: "000-2-0-06" }).then(
        //   (data) => {
        // console.log(data);
        // if (data) {
        if (hash.includes("Import")) {
          //导入界面
          // if (!hash.includes("Student")) {
          //   window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
          //   return;
          // }

          dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

          //判断用户类型

          dispatch({
            type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
            data: {
              ShowLeftMenu: false,

              ShowBarner: false,

              ModuleInfo: {
                cnname: "行政班管理",

                enname: "Administration class management",

                image: logo,

                subtitle: "导入班主任及班长",
              },
            },
          });
        } else {
          //非导入界面
          //非导入界面
          window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
          return;
          dispatch({ type: RouterSetActions.ROUTER_SET_TO_DEFAULT });

          let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

          dispatch({
            type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
            data: {
              ShowLeftMenu: true,

              ShowBarner: true,

              ModuleInfo: {
                cnname: "行政班管理",

                enname: "Administration class management",

                image: logo,
              },
            },
          });

          dispatch(UpDataState.getPageInit());
        }
        // } else {
        //   window.location.href = "/Error.aspx?errcode=E011";
        // }
        //   }
        // );
      } else {
        //是非管理员的情况下

        //判断是否是教师账号
        // console.log(UserClass,UserType)
        if (parseInt(UserType) === 1 && UserClass[2] === "1") {
          if (hash.includes("Import")) {
            //导入界面

            dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

            dispatch({
              type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
              data: {
                ShowLeftMenu: false,

                ShowBarner: false,

                ModuleInfo: {
                  cnname: "班级管理",

                  enname: "Class management",

                  image: TeacherLogo,

                  subtitle: "导入学生档案",
                },
              },
            });
          } else {
            dispatch({
              type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
              data: {
                ShowLeftMenu: false,

                ShowBarner: true,
                ModuleInfo: {
                  cnname: "我的行政班",

                  enname: "My Class",

                  image: logo3,

                  subtitle: "",
                },
                // ModuleInfo: {
                //   cnname: "班级管理",

                //   enname: "Class management",

                //   image: TeacherLogo,
                // },
              },
            });
          }

          /*dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:false,

                            ShowBarner:false,

                            ModuleInfo:{

                                cnname:'班级管理',

                                enname:"Class management",

                                image:TeacherLogo

                            }

                        }});

                    dispatch(UpDataState.getPageInit());*/
        } else if (
          parseInt(UserType) === 7 ||
          parseInt(UserType) === 10
          //  && UserClass === "2"
        ) {
          //判断是否是教务主任

          // QueryOtherPower({
          //   SchoolID: UserInfo.SchoolID,
          //   ModuleID: "000-2-0-06",
          //   Power: "Dean_Class_CURD",
          //   UserType: UserType,
          // }).then((data) => {
          //   if (data) {
          //有权限的教务主任

          if (hash.includes("Import")) {
            //导入界面

            dispatch({ type: RouterSetActions.ROUTER_SET_TO_IMPORT });

            //判断用户类型

            dispatch({
              type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
              data: {
                ShowLeftMenu: false,

                ShowBarner: false,

                ModuleInfo: {
                  cnname: "行政班管理",

                  enname: "Administration class management",

                  image: logo,

                  subtitle: "导入班主任及班长",
                },
              },
            });
          } else {
            //非导入界面
            //非导入界面
            // window.location.href = "/html/admclass#/Class"; //直接去到最新的版本
            // return;
            dispatch({ type: RouterSetActions.ROUTER_SET_TO_DEFAULT });

            let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

            dispatch({
              type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
              data: {
                ShowLeftMenu: true,

                ShowBarner: true,

                ModuleInfo: {
                  cnname: "行政班管理",

                  enname: "Administration class management",

                  image: logo,

                  subtitle: "",
                },
              },
            });

            dispatch(UpDataState.getPageInit());
          }
          // } else {
          //   //没有权限的教务主任

          //   // window.location.href = "/Error.aspx?errcode=E011";
          // }
          // });
        } else if (parseInt(UserType) === 2 && parseInt(UserType) === 3) {
          //家长或学生
          window.location.href = "/html/admclass#/ClassDetails"; //直接去到最新的版本
          return;
        } else {
          //既不是教务主任，也不是班主任也不是管理员的情况下
          // window.location.href = "/Error.aspx?errcode=E011";
        }
      }
    });
  };
  render() {
    const {
      UIState,
      DataState,
      RouterSet,
      ModuleSetting,
      AppAlertSuccess,
    } = this.props;

    const { Grades = [] } = DataState.SchoolGradeClasses; //左侧菜单的年级和班级信息
    // console.log(DataState.SchoolGradeClasses.MenuParams)
    // let Menu = [
    //   {
    //     name: "班级信息总览",
    //     link: "/",
    //     menu: "menu10",
    //     ident: "stu",
    //     id: "all",
    //     default: true
    //   }
    // ];
    // //遍历年级和班级将menu填充

    // Grades.map((item, key) => {
    //   let Data = {
    //     name: item.GradeName,
    //     id: item.GradeID,
    //     menu: "menu20",
    //     link: `/${item.GradeID}`,
    //     ident: "grade",
    //     List: []
    //   };
    //   if (item.Classes) {
    //     item.Classes.map((i, k) => {
    //       Data["List"].push({
    //         name: i.ClassName,
    //         id: i.ClassID,
    //         ident: "class",
    //         link: `/${item.GradeID}/${i.ClassID}`
    //       });
    //     });
    //   }
    //   Menu.push(Data);
    // });

    return (
      <Router>
        {/*loading包含Frame*/}

        {UIState.AppLoading.show ? (
          <Loading
            className="AppLoading"
            tip="加载中..."
            size="large"
            delay={200}
          ></Loading>
        ) : (
          ""
        )}

        <Frame
          type="triangle"
          showLeftMenu={ModuleSetting.ShowLeftMenu}
          showBarner={ModuleSetting.ShowBarner}
          style={{ display: `${UIState.AppLoading.show ? "none" : "block"}` }}
          userInfo={{
            name: DataState.LoginUser.UserName,
            image: DataState.LoginUser.PhotoPath,
          }}
          module={ModuleSetting.ModuleInfo}
          pageInit={this.RequestData}
          onRef={this.onRef.bind(this)}
        >
          {/*banner*/}

          <div ref="frame-time-barner">
            {parseInt(DataState.LoginUser.UserType) === 0 ? (
              <Banner
                addClass={this.addClass.bind(this)}
                editMajor={this.editMajor.bind(this)}
                Import={this.Import.bind(this)}
              ></Banner>
            ) : (
              ""
            )}

            {parseInt(DataState.LoginUser.UserType) === 1 ? (
              <TeacherBtnBanner
                TeacherModalShow={this.TeacherTeacherModalShow.bind(this)}
                AddStudentShow={this.AddStudentShow.bind(this)}
              ></TeacherBtnBanner>
            ) : (
              ""
            )}
          </div>

          {/*左侧菜单*/}

          <div ref="frame-left-menu">
            {/* <LeftMenu Menu={Menu} Icon="pic3"></LeftMenu>*/}

            {/* <MenuLeftNoLink
              Menu={Menu}
              menuClick={this.menuClick.bind(this)}
              Icon="pic3"
            ></MenuLeftNoLink> */}
            <Menu params={DataState.SchoolGradeClasses.MenuParams}></Menu>
          </div>

          {/*右侧内容区域，Router变化区域*/}
          <div ref="frame-right-content">
            <Switch>
              <Route path="/Import*" component={Import}></Route>

              <Route path="/*" exact component={ContentContainer}></Route>
            </Switch>
          </div>
        </Frame>

        {/*提示弹出框组件*/}
        <Alert
          show={UIState.AppAlert.show}
          type={UIState.AppAlert.type}
          title={UIState.AppAlert.title}
          onOk={UIState.AppAlert.ok}
          onCancel={UIState.AppAlert.cancel}
          onClose={UIState.AppAlert.close}
          onHide={UIState.AppAlert.hide}
          abstract={UIState.AppAlert.abstract}
        ></Alert>

        <Alert
          show={AppAlertSuccess.show}
          type={AppAlertSuccess.type}
          title={AppAlertSuccess.title}
          onHide={AppAlertSuccess.hide}
        ></Alert>

        {/* 添加班级弹出层*/}

        <Modal
          type={1}
          title="添加班级"
          visible={UIState.AddClassModal.show}
          mask={true}
          width={540}
          bodyStyle={{ height: 270 }}
          className="addClassModal"
          onOk={this.addClassOk.bind(this)}
          onCancel={this.addClassCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <AddClassModal
              grade={Grades}
              addClassDropChange={this.addClassDropChange.bind(this)}
              inputDisabled={UIState.AddClassModal.inputDisabled}
              inputValue={UIState.AddClassModal.inputValue}
              inputChange={this.addClassInputChange.bind(this)}
              selectTipsShow={UIState.AddClassModal.selectTipsShow}
              selectTips={UIState.AddClassModal.selectTips}
              inputTips={UIState.AddClassModal.inputTips}
              inputTipsShow={UIState.AddClassModal.inputTipsShow}
              selectedValue={UIState.AddClassModal.selectValue}
              dropDisabled={UIState.AddClassModal.dropDisabled}
            ></AddClassModal>
          </div>
        </Modal>
        {/* 添加专业 */}

        <Modal
          type={1}
          title="专业管理"
          visible={UIState.EditMajorModal.show}
          mask={true}
          width={800}
          bodyStyle={{ height: 400, padding: 0 }}
          className="editMajorModal"
          footer={null}
          onOk={this.editMajorOk.bind(this)}
          onCancel={this.editMajorCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <EditMajorModal
              grade={Grades}
              addClassDropChange={this.addClassDropChange.bind(this)}
              inputDisabled={UIState.AddClassModal.inputDisabled}
              inputValue={UIState.AddClassModal.inputValue}
              inputChange={this.addClassInputChange.bind(this)}
              selectTipsShow={UIState.AddClassModal.selectTipsShow}
              selectTips={UIState.AddClassModal.selectTips}
              inputTips={UIState.AddClassModal.inputTips}
              inputTipsShow={UIState.AddClassModal.inputTipsShow}
              selectedValue={UIState.AddClassModal.selectValue}
              dropDisabled={UIState.AddClassModal.dropDisabled}
            ></EditMajorModal>
          </div>
        </Modal>
        <Modal
          type={1}
          title="添加专业"
          visible={UIState.EditMajorModal.AddShow}
          mask={true}
          width={400}
          bodyStyle={{ height: 130, padding: 0 }}
          className="editMajorModal"
          onOk={this.addMajorOk.bind(this)}
          onCancel={this.addMajorCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <HandleMajorModal type="add"></HandleMajorModal>
          </div>
        </Modal>
        <Modal
          type={1}
          title="编辑专业"
          visible={UIState.EditMajorModal.EditShow}
          mask={true}
          width={400}
          bodyStyle={{ height: 130, padding: 0 }}
          className="editMajorModal"
          onOk={this.EditMajorOk.bind(this)}
          onCancel={this.EditMajorCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <HandleMajorModal type="edit"></HandleMajorModal>
          </div>
        </Modal>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  let {
    UIState,
    DataState,
    RouterSet,
    ModuleSetting,
    Teacher,
    AppAlertSuccess,
  } = state;

  const { ClassCharge } = Teacher;

  return {
    UIState,

    DataState,

    RouterSet,

    ModuleSetting,

    ClassCharge,

    AppAlertSuccess,
  };
};

export default connect(mapStateToProps)(App);
