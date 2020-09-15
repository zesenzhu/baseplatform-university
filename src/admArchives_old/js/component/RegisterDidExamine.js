import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../images/admAriHeadImg-1.png";
import { Menu, Loading, Alert } from "../../../common";
import Frame from "../../../common/Frame";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../containers/history";
import TimeBanner from "./TimeBanner";
import All from "./All";
import Student from "./Student";
import Teacher from "./Teacher";
import Leader from "./Leader";
import actions from "../actions";
import $ from "jquery";
import "../../scss/index.scss";
import "../../scss/RegisterExamine.scss";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
  Empty,
} from "../../../common/index";

import { getData } from "../../../common/js/fetch";

class RegisterDidExamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      columns: [
        {
          title: "注册时间",
          align: "center",
          dataIndex: "SignUpTime",
          width: 255,
          key: "SignUpTime",
          sorter: true,
          render: (time) => {
            return (
              <div className="registerTime-content">
                <span title={time} className="registerTime">
                  {time ? time : "--"}
                </span>
              </div>
            );
          },
        },
        // {
        //   title: "",
        //   align: "right",
        //   dataIndex: "UserName",
        //   key: "UserImg",
        //   colSpan: 0,
        //   width: 60,
        //   render: (arr) => {
        //     return (
        //       <div className="name-content">
        //         {/* <img
        //           alt={arr.UserName}
        //           onClick={this.onUserNameClick.bind(this, arr.key)}
        //           className="name-img"
        //           width="47"
        //           height="47"
        //           src={arr.PhotoPath}
        //         ></img> */}
        //         <i
        //           alt={arr.UserName}
        //           onClick={this.onUserNameClick.bind(this, arr.key)}
        //           className="name-img"
        //           style={{
        //             width: "47px",
        //             height: "47px",
        //             display: "inline-block",
        //             background: `url(${arr.PhotoPath}) no-repeat center center / 47px`,
        //           }}
        //         ></i>
        //       </div>
        //     );
        //   },
        // },
        {
          title: "姓名",
          align: "center",
          dataIndex: "UserName",
          colSpan: 1,
          width: 150,
          key: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  // onClick={this.onUserNameClick.bind(this, arr.key)}
                >
                  {arr.UserName ? arr.UserName : "--"}
                </span>
              </div>
            );
          },
        },
        {
          title: "学号",
          align: "center",
          dataIndex: "UserID",
          width: 220,
          key: "UserID",
          sorter: true,
          render: (UserID) => {
            return (
              <span title={UserID} className="UserID">
                {UserID ? UserID : "--"}
              </span>
            );
          },
        },
        {
          title: "性别",
          align: "center",
          width: 55,
          dataIndex: "Gender",
          key: "Gender",
          render: (Gender) => {
            return (
              <span title={Gender} className="Gender">
                {Gender ? Gender : "--"}
              </span>
            );
          },
        },
        {
          title: "班级",
          align: "center",
          width: 250,
          key: "MyClass",
          dataIndex: "MyClass",
          render: (MyClass) => {
            return MyClass.College ||
              MyClass.Major ||
              MyClass.Grade ||
              MyClass.Grade ? (
              <span className="MyClass">
                <span
                  className="CollegeMajor"
                  title={MyClass.College + ">" + MyClass.Major}
                >
                  {MyClass.College + ">" + MyClass.Major}
                </span>{" "}
                <br></br>
                <span
                  className="GradeClass"
                  title={MyClass.Grade + ">" + MyClass.Class}
                >
                  {MyClass.Grade + ">" + MyClass.Class}
                </span>
              </span>
            ) : (
              "--"
            );
          },
        },
        // {
        //   title: "年级",
        //   align: "center",
        //   width: 105,
        //   dataIndex: "Grade",
        //   key: "Grade",
        //   render: Grade => {
        //     return (
        //       <span title={Grade.GradeName} className="GradeName">
        //         {Grade.GradeName ? Grade.GradeName : "--"}
        //       </span>
        //     );
        //   }
        // },
        // {
        //   title: "班级",
        //   align: "center",
        //   width: 161,
        //   dataIndex: "Class",
        //   key: "Class",
        //   render: Class => {
        //     return (
        //       <span title={Class.ClassName} className="ClassName">
        //         {Class.ClassName ? Class.ClassName : "--"}
        //       </span>
        //     );
        //   }
        // },
        {
          title: "状态",
          align: "center",
          width: 170,
          dataIndex: "Status",
          key: "Status",
          render: (Status) => {
            return (
              <div className="handle-content">
                <span
                  title={
                    Status.Status === 1
                      ? "审核通过"
                      : Status.Status === 2
                      ? "审核未通过"
                      : "未审核"
                  }
                  className={`handle-tips `}
                >
                  {Status.Status === 1
                    ? "审核通过"
                    : Status.Status === 2
                    ? "审核未通过"
                    : "未审核"}
                </span>
              </div>
            );
          },
        },
      ],
      keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      UserExamineModalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      firstSelect: props.DataState.GetSignUpLog.College,
      secondSelect: props.DataState.GetSignUpLog.Major,
      thirdSelect: props.DataState.GetSignUpLog.Grade,
      fourthSelect: props.DataState.GetSignUpLog.Class,
      firstList: [{ value: 0, title: "全部学院" }],
      secondList: [{ value: 0, title: "全部专业" }],
      thirdList: [{ value: 0, title: "全部年级" }],
      fourthList: [{ value: 0, title: "全部班级" }],
      handleUserMsg: [],
      pageindex: 0,
      pagination: 1,
      StudentDetailsMsgModalVisible: false,
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: "",
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      secondParam: "",
      TeacherClassSelect: {},
      firstParam: "",
      searchWord: "",
      thirdParam: "",
      fourthParam: "",
      pageSize: 10,
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    let isWho = "1";
    // console.log(this.props.DataState.GradeClassMsg.College)
    if (
      userMsg.UserType === "0" ||
      userMsg.UserType === "7" ||
      userMsg.UserType === "6" ||
      userMsg.UserType === "10"
    ) {
      isWho = "1";
      if (DataState.GetSignUpLog.Class.value !== 0) {
        this.StudentDropMenuFourth(DataState.GetSignUpLog.Class);
        this.setState({
          fourthSelect: DataState.GetSignUpLog.Class,
          fourthParam: "&classID=" + DataState.GetSignUpLog.Class.value,
        });
      }
      if (
        DataState.GetSignUpLog.Grade.value !== 0 &&
        DataState.GetSignUpLog.Major.value !== 0 &&
        DataState.GetSignUpLog.College.value !== 0
      ) {
        let Classes = [];

        let ClassArr = this.props.DataState.GradeClassMsg.Classes[
          DataState.GetSignUpLog.Major.value
        ][DataState.GetSignUpLog.Grade.value];
        ClassArr.map((Class) => {
          Classes.push(Class);
        });
        this.setState({
          DropMenuShow: true,
          fourthList: Classes,
          // thirdSelect: DataState.GetSignUpLog.Grade,
          // thirdParam: "&gradeID=" + DataState.GetSignUpLog.Grade.value,
        });
      }
      if (DataState.GetSignUpLog.Grade.value !== 0) {
        this.setState({
          DropMenuShow: true,

          thirdSelect: DataState.GetSignUpLog.Grade,
          thirdParam: "&gradeID=" + DataState.GetSignUpLog.Grade.value,
        });
      }
      if (DataState.GetSignUpLog.Major.value !== 0) {
        let GradeList = [];

        let GradeArr = this.props.DataState.GradeClassMsg.Grades[
          DataState.GetSignUpLog.Major.value
        ];
        GradeArr.map((Grade) => {
          GradeList.push(Grade);
        });

        this.setState({
          DropMenuShow: true,
          thirdList: GradeList,
          secondSelect: DataState.GetSignUpLog.Major,
          secondParam: "&majorID=" + DataState.GetSignUpLog.Major.value,
        });
      }
      if (DataState.GetSignUpLog.College.value !== 0) {
        let MajorList = [];

        let MajorArr = this.props.DataState.GradeClassMsg.Majors[
          DataState.GetSignUpLog.College.value
        ];
        MajorArr.map((major) => {
          MajorList.push(major);
        });

        this.setState({
          DropMenuShow: true,
          secondList: MajorList,
          firstSelect: DataState.GetSignUpLog.College,
          firstParam: "&collegeID=" + DataState.GetSignUpLog.College.value,
        });
      }

      this.setState(
        {
          firstList: this.props.DataState.GradeClassMsg.College,
          thirdSelect: DataState.GetSignUpLog.Grade,
          fourthSelect: DataState.GetSignUpLog.Class,
          firstSelect: DataState.GetSignUpLog.College,
          secondSelect: DataState.GetSignUpLog.Major,
          firstParam: DataState.GetSignUpLog.College.value
            ? "&collegeID=" + DataState.GetSignUpLog.College.value
            : "",
          secondParam: DataState.GetSignUpLog.Major.value
            ? "&majorID=" + DataState.GetSignUpLog.Major.value
            : "",
          thirdParam: DataState.GetSignUpLog.Grade.value
            ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
            : "",
          fourthParam: DataState.GetSignUpLog.Class.value
            ? "&classID=" + DataState.GetSignUpLog.Class.value
            : "",
        },
        () => {
          // console.log(DataState.GetSignUpLog.College);
          if (DataState.GetSignUpLog.Class.value !== 0) {
            this.StudentDropMenuFourth(DataState.GetSignUpLog.Class);
          } else if (DataState.GetSignUpLog.Grade.value !== 0) {
            this.StudentDropMenuThird(DataState.GetSignUpLog.Grade);
          } else if (DataState.GetSignUpLog.Major.value !== 0) {
            this.StudentDropMenuSecond(DataState.GetSignUpLog.Major);
          } else if (DataState.GetSignUpLog.College.value !== 0) {
            this.StudentDropMenu(DataState.GetSignUpLog.College);
          } else {
            this.StudentDropMenu(DataState.GetSignUpLog.College);
          }
        }
      );

      // if (DataState.GetSignUpLog.College.value !== 0) {
      //   let Majors = [{ value: 0, title: "全部专业" }];
      //   let Grades = [{ value: 0, title: "全部年级" }];
      //   let Classes = [{ value: 0, title: "全部班级" }];
      //   let Major = DataState.GetSignUpLog.Major;
      //   let Grade = DataState.GetSignUpLog.Grade;
      //   let Class = DataState.GetSignUpLog.Class;
      //   Majors = this.props.DataState.GradeClassMsg.Majors[
      //     DataState.GetSignUpLog.College.value
      //   ];
      //   if (DataState.GetSignUpLog.Major.value !== 0) {
      //     Grades = this.props.DataState.GradeClassMsg.Grades[
      //       DataState.GetSignUpLog.Major.value
      //     ];
      //   }
      //   if (DataState.GetSignUpLog.Grade.value !== 0) {
      //     Classes = this.props.DataState.GradeClassMsg.Classes[
      //       DataState.GetSignUpLog.Grade.value
      //     ];
      //   }
      //   this.setState({
      //     secondSelect: Major,
      //     thirdSelect: Grade,
      //     fourthSelect: Class,
      //     firstList: this.props.DataState.GradeClassMsg.College,
      //     thirdList: Grades,
      //     fourthList: Classes,
      //     firstSelect: DataState.GetSignUpLog.College,
      //     secondList: Majors
      //   });
      // }
      // if (DataState.GetSignUpLog.Grade.value !== 0) {
      //   let Classes = [{ value: 0, title: "全部班级" }];

      //   let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[
      //     DataState.GetSignUpLog.Grade.value
      //   ];
      //   ClassArr.map(Class => {
      //     Classes.push(Class);
      //   });
      //   this.setState({
      //     secondList: Classes
      //   });
      // }
      // this.setState({
      //   firstSelect: DataState.GetSignUpLog.Grade,
      //   secondSelect: DataState.GetSignUpLog.Class,
      //   firstParam: "&gradeID=" + DataState.GetSignUpLog.Grade.value,
      //   secondParam: "&classID=" + DataState.GetSignUpLog.Class.value
      // });
      // if (DataState.GetSignUpLog.Class.value === 0) {
      //   this.StudentDropMenu(DataState.GetSignUpLog.Grade);
      // } else {
      //   this.StudentDropMenuSecond(DataState.GetSignUpLog.Class);
      // }
    } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
      isWho = "2";

      if (DataState.GetSignUpLog.Class.value !== 0) {
        this.TeacherDropMenuSecond(DataState.GetSignUpLog.Class);
      }
    }
    this.setState({
      isWho: isWho,
    });

    // if(DataState.GetSignUpLog.Grade!==this.state.firstSelect||DataState.GetSignUpLog.Class!==this.state.secondSelect){
    //   this.setState({
    //     firstSelect:DataState.GetSignUpLog.Grade,
    //     secondSelect:DataState.GetSignUpLog.Class
    //   })
    //   if(DataState.GetSignUpLog.Grade.value!==0){
    //     this.setState({
    //       DropMenuShow: true
    //     })
    //   }else{
    //     this.setState({
    //       DropMenuShow: false
    //     })
    //   }
    // }
    // if(DataState.GetSignUpLog.Grade!==this.state.firstSelect){
    // let Classes = [{ value: 0, title: "全部班级" }];

    // this.setState({
    //   firstSelect: DataState.GetSignUpLog.Grade,
    //   secondSelect: DataState.GetSignUpLog.Class
    // });
    // if (DataState.GetSignUpLog.Grade.value !== 0) {
    //   let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[
    //     DataState.GetSignUpLog.Grade.value
    //   ];
    //   ClassArr.map(Class => {
    //     Classes.push(Class);
    //   });
    //   this.setState({
    //     DropMenuShow: true,
    //     secondDropList: Classes,
    //     firstParam: "&gradeID=" + DataState.GetSignUpLog.Grade.value
    //   });
    // }
    // if (DataState.GetSignUpLog.Class.value === 0) {
    //   // this.StudentDropMenu(DataState.GetSignUpLog.Grade);
    // } else {
    //   // this.StudentDropMenuSecond(DataState.GetSignUpLog.Class);
    //   this.setState({
    //     secondSelect: DataState.GetSignUpLog.Class,
    //     secondParam: "&classID=" + DataState.GetSignUpLog.Class.value
    //   });
    // }
    // }
    // if(DataState.GetSignUpLog.Class!==this.state.secondSelect){

    //   this.StudentDropMenuSecond(DataState.GetSignUpLog.Class);

    // }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, DataState } = nextProps;
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;
    let userMsg = DataState.LoginUser;

    if (
      userMsg.UserType === "1" &&
      userMsg.UserClass[2] === "1" &&
      Object.keys(this.state.TeacherClassSelect).length === 0 &&
      TeacherClass[0] &&
      DataState.GetSignUpLog.Class.value === 0
    ) {
      this.TeacherDropMenuSecond(TeacherClass[0]);

      // this.setState({
      //   TeacherClassSelect: TeacherClass[0],
      //   secondParam: "&classID=" + TeacherClass[0].value
      // });
    } else {
      let College = DataState.GradeClassMsg.College;
      let OldCollege = this.props.DataState.GradeClassMsg.College;
      let Majors = DataState.GradeClassMsg.Majors;
      let firstList = this.state.firstList;
      let secondList = this.state.secondList;
      let userType = this.state.userType;
      let len = College.length;
      let route = history.location.pathname;

      let pathArr = route.split("/");
      let handleRoute = pathArr[2];
      let ID = pathArr[3];

      // console.log(secondList, College);
      if (
        College !== OldCollege &&
        secondList instanceof Array &&
        secondList.length <= 1 &&
        userType &&
        DataState.LoginUser.CollegeID
      ) {
        let major = { value: 0, title: "全部专业" };
        if (ID !== "all") {
          Majors[DataState.LoginUser.CollegeID] instanceof Array &&
            Majors[DataState.LoginUser.CollegeID].map((child) => {
              if (child.value === ID) {
                major = child;
              }
            });
        }
        // console.log(major, Majors[DataState.LoginUser.CollegeID]);

        this.setState({
          secondList: Majors[DataState.LoginUser.CollegeID],
          secondSelect: major,
        });
      } else if (College !== OldCollege && !userType) {
        let college = { value: 0, title: "全部学院" };
        if (ID !== "all") {
          for (let key in Majors) {
            if (key === ID) {
              college = key;
            }
          }
        }
        // console.log(college, College);
        this.setState({
          firstList: College,
          firstSelect: college,
        });
      }
    }
    this.setState({
      pagination: DataState.GetSignUpLog.DidData.PageIndex + 1,
    });
    // if(DataState.GetSignUpLog.Grade.value!==this.state.firstSelect.value||DataState.GetSignUpLog.Class.value!==this.state.secondSelect.value){

    //   if(DataState.GetSignUpLog.Class.value===0){
    //     this.StudentDropMenu(DataState.GetSignUpLog.Grade);

    //    }else{
    //     this.StudentDropMenuSecond(DataState.GetSignUpLog.Class);
    //    }

    // }
    // if(DataState.GetSignUpLog.Grade!==this.state.firstSelect||DataState.GetSignUpLog.Class!==this.state.secondSelect){
    //   this.setState({
    //     firstSelect:DataState.GetSignUpLog.Grade,
    //     secondSelect:DataState.GetSignUpLog.Class
    //   })
    //   if(DataState.GetSignUpLog.Grade.value!==0){
    //     this.setState({
    //       DropMenuShow: true
    //     })
    //   }else{
    //     this.setState({
    //       DropMenuShow: false
    //     })
    //   }
    // }
    // if(DataState.GetSignUpLog.Grade!==this.state.firstSelect){

    //   this.StudentDropMenu(DataState.GetSignUpLog.Grade);

    // }
    // if(DataState.GetSignUpLog.Class!==this.state.secondSelect){

    //   this.StudentDropMenuSecond(DataState.GetSignUpLog.Class);

    // }
  }
  // StudentDropMenu = e => {
  //   const { dispatch } = this.props;

  //   //console.log(e);
  //   let Classes = [{ value: 0, title: "全部班级" }];
  //   this.setState({
  //     firstSelect: e,
  //     secondParam: ""
  //   });
  //   dispatch({
  //     type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
  //     data: { Grade: e }
  //   });
  //   if (e.value === 0) {
  //     dispatch({
  //       type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
  //       data: { Class: { value: 0, title: "全部班级" } }
  //     });
  //   }

  //   ////console.log(this.refs.dropMenuSecond)
  //   if (e.value !== 0) {
  //     let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[
  //       e.value
  //     ];
  //     ClassArr.map(Class => {
  //       Classes.push(Class);
  //     });
  //     //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
  //     //this.refs.dropMenuSecond.state.dropList = Classes;]
  //     this.setState({
  //       secondDropList: Classes,
  //       pagination: 1,
  //       keyword: "",
  //       firstParam: "&gradeID=" + e.value,
  //       CancelBtnShow: "n",
  //       searchValue: "",
  //       secondSelect: { value: 0, title: "全部班级" }
  //     });
  //     dispatch(
  //       actions.UpDataState.getDidSignUpLog(
  //         "/GetSignUpLogToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" +
  // this.state.pageSize + "&status=1&gradeID=" +
  //           e.value +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );

  //     this.setState({
  //       DropMenuShow: true
  //     });
  //   } else {
  //     dispatch(
  //       actions.UpDataState.getDidSignUpLog(
  //         "/GetSignUpLogToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" +
  // this.state.pageSize + "&status=1" +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );

  //     this.setState({
  //       DropMenuShow: false,
  //       pagination: 1,
  //       keyword: "",
  //       secondParam: "",
  //       firstParam: "",
  //       CancelBtnShow: "n",
  //       searchValue: "",
  //       secondSelect: { value: 0, title: "全部班级" }
  //     });
  //   }
  // };

  // StudentDropMenuSecond = e => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     secondSelect: e,
  //     pagination: 1,
  //     keyword: "",
  //     CancelBtnShow: "n",
  //     searchValue: ""
  //   });
  //   dispatch({
  //     type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
  //     data: { Class: e }
  //   });

  //   if (e.value === 0) {
  //     this.setState({
  //       secondParam: ""
  //     });
  //     dispatch(
  //       actions.UpDataState.getDidSignUpLog(
  //         "/GetSignUpLogToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" +
  // this.state.pageSize + "&status=1" +
  //           this.state.firstParam +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );
  //   } else {
  //     this.setState({
  //       secondParam: "&classID=" + e.value
  //     });
  //     dispatch(
  //       actions.UpDataState.getDidSignUpLog(
  //         "/GetSignUpLogToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" +
  // this.state.pageSize + "&status=1" +
  //           this.state.firstParam +
  //           "&classID=" +
  //           e.value +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );
  //   }
  // };
  // 第一级：学院

  StudentDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // console.log(DataState.GradeClassMsg.Majors[e.value], e.value);
    dispatch({
      type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
      data: {
        College: e,
        Major: { value: 0, title: "全部专业" },
        // Grade: { value: 0, title: "全部年级" },
        Class: { value: 0, title: "全部班级" },
      },
    });
    if (e.value !== 0) {
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: "",
        secondSelect: { value: 0, title: "全部专业" },
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondList: DataState.GradeClassMsg.Majors[e.value],
        // thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        firstParam: "&collegeID=" + e.value,

        secondParam: "",
        // thirdParam: "",
        fourthParam: "",
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            "&collegeID=" +
            e.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: "",
        secondSelect: { value: 0, title: "全部专业" },
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondParam: "",
        // thirdParam: "",
        fourthParam: "",
        secondList: [{ value: 0, title: "全部专业" }],
        // thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        firstParam: "",
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第二级：专业

  StudentDropMenuSecond = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
      data: {
        Major: e,
        // Grade: { value: 0, title: "全部年级" },
        Class: { value: 0, title: "全部班级" },
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        keyword: "",

        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondParam: "",
        // thirdParam: "",
        fourthParam: "",
        // thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondParam: "&majorID=" + e.value,
        // thirdParam: "",
        keyword: "",
        fourthParam: "",
        // thirdList: DataState.GradeClassMsg.Grades[e.value],
        // fourthList: [{ value: 0, title: "全部班级" }],
        // 差年级班级
        pagination: 1,
        fourthList: this.state.thirdSelect.value
          ? DataState.GradeClassMsg.Classes[e.value][
              this.state.thirdSelect.value
            ]
          : [],
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            "&majorID=" +
            e.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第三级：年级
  StudentDropMenuThird = (e) => {
    const { dispatch, DataState } = this.props;
    console.log(e, this.state.firstParam);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
      data: {
        Grade: e,
        Class: { value: 0, title: "全部班级" },
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        keyword: "",

        fourthSelect: { value: 0, title: "全部班级" },
        thirdParam: "",
        fourthParam: "",
        fourthList: [{ value: 0, title: "全部班级" }],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        keyword: "",
        searchValue: "",
        CancelBtnShow: "n",
        fourthSelect: { value: 0, title: "全部班级" },
        thirdParam: "&gradeID=" + e.value,

        fourthParam: "",
        // fourthList:
        //   DataState.GradeClassMsg.Classes[this.state.secondSelect.value][
        //     e.value
        //   ],
        fourthList: this.state.secondSelect.value
          ? DataState.GradeClassMsg.Classes[this.state.secondSelect.value][
              e.value
            ]
          : [],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            "&gradeID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第四级：班级
  StudentDropMenuFourth = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
      data: {
        Class: e,
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        keyword: "",
        CancelBtnShow: "n",
        fourthParam: "",
        searchValue: "",
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        keyword: "",
        searchValue: "",
        CancelBtnShow: "n",
        fourthParam: "&classID=" + e.value,
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  TeacherDropMenuSecond = (e) => {
    const { dispatch } = this.props;

    this.setState({
      TeacherClassSelect: e,
      checkedList: [],
      checkAll: false,
      pagination: 1,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
    });
    dispatch({
      type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
      data: { Class: e },
    });
    if (e.value === 0) {
      this.setState({
        secondParam: "",
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        secondParam: "&classID=" + e.value,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }

    //dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=" +
    // this.state.pageSize + "&SortFiled=UserID&SortType=ASC'));
  };
  OnCheckAllChange = (e) => {
    //console.log(e.target.checked, this.state.keyList)
    if (e.target.checked) {
      this.setState({
        checkedList: this.state.keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  onCheckBoxGroupChange = (checkedList) => {
    //console.log(checkedList)
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.keyList.length ? true : false,
    });
  };
  onExamineClick = (Others) => {
    //console.log(Others);
    let arr = this.state.data;
    //arr[Others.key-1].Others[isAgree] = !arr[Others.key-1].Others[isAgree];
    this.setState({
      UserExamineModalVisible: true,
    });
  };
  onPagiNationChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      pagination: e,
    });

    dispatch(
      actions.UpDataState.getDidSignUpLog(
        "/GetSignUpLogToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          (e - 1) +
          "&PageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
          this.state.firstParam +
          this.state.secondParam +
          this.state.thirdParam +
          this.state.fourthParam
      )
    );
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { dispatch } = this.props;

    this.setState({
      pageSize,
      checkedList: [],
      checkAll: false,
      pagination: 1,
    });
    dispatch(
      actions.UpDataState.getDidSignUpLog(
        "/GetSignUpLogToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0" +
          // (e - 1) +
          "&PageSize=" +
          pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
          this.state.firstParam +
          this.state.secondParam +
          this.state.thirdParam +
          this.state.fourthParam
      )
    );
  };
  UserExamineMadalOk = (e) => {
    //console.log(e)
    this.setState({
      UserExamineModalVisible: false,
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  };
  UserExamineMadalCancel = (e) => {
    //console.log(e)
    this.setState({
      UserExamineModalVisible: false,
    });
  };
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      StudentDetailsMsgModalVisible: true,
      handleUserMsg: DataState.GetSignUpLog.DidData.returnData[key].UserMsg,
    });
  };
  onAgreeAll = (e) => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定通过勾选的注册吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选所要通过的注册",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  RefuseAll = (e) => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定不通过勾选的注册吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选所要不通过的注册",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    }
  };
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertWarnOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onTableChange = (page, filter, sorter, extra) => {
    const { DataState, dispatch } = this.props;
    //console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "SignUpTime" ||
        sorter.columnKey === "UserName" ||
        sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=" +
            this.state.pageSize +
            "&status=1&sortFiled=" +
            sorter.columnKey +
            "&" +
            sortType +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            this.state.fourthParam
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
      });
      dispatch(
        actions.UpDataState.getDidSignUpLog(
          "/GetSignUpLogToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=" +
            this.state.pageSize +
            "&status=1" +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            this.state.fourthParam
        )
      );
    }
  };
  //搜索
  LogSearch = (e) => {
    const { dispatch } = this.props;
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请输入关键字搜索",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      e.value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "输入的学号或姓名格式不正确",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
        })
      );
      return;
    }
    this.setState({
      keyword: e.value,
      CancelBtnShow: "y",
      pagination: 1,
      searchWord: e.value,
    });
    dispatch(
      actions.UpDataState.getDidSignUpLog(
        "/GetSignUpLogToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          "&Keyword=" +
          e.value +
          this.state.firstParam +
          this.state.secondParam +
          this.state.thirdParam +
          this.state.fourthParam
      )
    );
  };
  //学生详情信息
  StudentDetailsMsgModalOk = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false,
    });
  };
  StudentDetailsMsgModalCancel = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false,
    });
  };
  //搜索change
  onChangeSearch = (e) => {
    this.setState({
      searchValue: e.target.value.trim(),
    });
  };
  // 取消搜索
  onCancelSearch = (e) => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      pagination: 1,
    });

    dispatch(
      actions.UpDataState.getDidSignUpLog(
        "/GetSignUpLogToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.firstParam +
          this.state.secondParam +
          this.state.thirdParam +
          this.state.fourthParam
      )
    );
  };
  render() {
    const { UIState, DataState } = this.props;
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;
    // console.log(this.state.userType);
    let {
      GradeClassMsg: { Grades },
    } = DataState;
    let GradeList = [{ value: 0, title: "全部年级" }];
    for (let i in Grades) {
      if (Grades[i] instanceof Array) {
        GradeList = Grades[i];
        break;
      }
    }
    // const data = {
    //     userName: '康欣',
    //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
    //     Gende: '男',
    //     userText: '学如逆水行舟，不进则退',
    //     userID: '20170025444',
    //     userGrade: '一年级',
    //     userClass: '1班',
    //     userIDCard: '',
    //     userPhone: '15626248624',
    //     userMail: '1519406168@qq.com',
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
    //     userRegisterTime: '2019-01-01 12:24',
    //     userRegisterIP: '190.163.252.198'
    // };
    return (
      <React.Fragment>
        <div className="main-select">
          {this.state.isWho === "1" ? (
            <div>
              <DropDown
                ref="dropMenuFirst"
                onChange={this.StudentDropMenu}
                width={120}
                disabled={this.state.userType}
                title="院系专业:"
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={this.state.firstList}
              ></DropDown>
              <DropDown
                ref="dropMenuSecond"
                width={120}
                height={240}
                // style={{
                //   display:
                //     this.state.userType || this.state.firstSelect.value !== 0
                //       ? "block"
                //       : "none",
                // }}
                disabled={this.state.firstSelect.value !== 0 ? false : true}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown>
              <DropDown
                ref="dropMenuThird"
                width={120}
                height={240}
                // style={{
                //   display:
                //     this.state.secondSelect.value !== 0 ? "block" : "none",
                // }}
                style={{ marginLeft: "70px" }}
                title={"年级班级:"}
                dropSelectd={this.state.thirdSelect}
                dropList={GradeList}
                onChange={this.StudentDropMenuThird}
              ></DropDown>
              <DropDown
                ref="dropMenuFourth"
                width={120}
                height={240}
                // style={{
                //   display:
                //     this.state.thirdSelect.value !== 0 ? "block" : "none",
                // }}
                disabled={
                  this.state.firstSelect.value !== 0 &&
                  this.state.secondSelect.value !== 0 &&
                  this.state.thirdSelect.value !== 0
                    ? false
                    : true
                }
                dropSelectd={this.state.fourthSelect}
                dropList={this.state.fourthList}
                onChange={this.StudentDropMenuFourth}
              ></DropDown>
              {/* <DropDown
                onChange={this.StudentDropMenu}
                width={120}
                height={240}
                title="班级："
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.GradeClassMsg.returnData
                    ? DataState.GradeClassMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown> */}
            </div>
          ) : TeacherClass.length > 1 ? (
            <DropDown
              width={120}
              height={240}
              title="班级："
              dropSelectd={this.state.TeacherClassSelect}
              dropList={TeacherClass}
              onChange={this.TeacherDropMenuSecond}
            ></DropDown>
          ) : (
            <span className="single">
              {this.state.TeacherClassSelect.title}
            </span>
          )}
          <div className="Search">
            <span
              className="search-tips"
              style={{
                display: this.state.CancelBtnShow === "y" ? "block" : "none",
              }}
            >
              <span>{"搜索关键词“" + this.state.searchWord + "”共找到"}</span>
              <span className="Total">
                {" " + DataState.GetSignUpLog.DidData.Total + " "}
              </span>
              人
            </span>
            <Search
              placeHolder="请输入学号或姓名进行搜索"
              onClickSearch={this.LogSearch}
              height={30}
              width={250}
              onCancelSearch={this.onCancelSearch}
              Value={this.state.searchValue}
              onChange={this.onChangeSearch.bind(this)}
              CancelBtnShow={this.state.CancelBtnShow}
            ></Search>
          </div>
        </div>
        <div className="content-render did">
          {/* <Loading tip="loading..." spinning={this.state.loading}> */}
          <Loading
            tip="加载中..."
            opacity={false}
            size="large"
            spinning={UIState.AppLoading.TableLoading}
          >
            <CheckBoxGroup
              style={{ width: "100%" }}
              value={this.state.checkedList}
              onChange={this.onCheckBoxGroupChange.bind(this)}
            >
              {DataState.GetSignUpLog.DidData.returnData instanceof Array &&
              DataState.GetSignUpLog.DidData.returnData.length !== 0 ? (
                <Table
                  className="table didTable"
                  columns={this.state.columns}
                  pagination={false}
                  loading={UIState.AppLoading.TableLoading}
                  dataSource={DataState.GetSignUpLog.DidData.returnData}
                  onChange={this.onTableChange.bind(this)}
                ></Table>
              ) : (
                <Empty
                  title={
                    this.state.CancelBtnShow === "y" ||
                    this.state.firstSelect.value !== 0
                      ? "暂无符合条件的学生注册"
                      : "暂无学生注册"
                  }
                  type="3"
                  style={{ marginTop: "80px" }}
                ></Empty>
              )}
            </CheckBoxGroup>
            {/* </Loading> */}

            <div className="pagination-box">
              <PagiNation
                showQuickJumper
                showSizeChanger
                pageSize={this.state.pageSize}
                hideOnSinglePage={
                  DataState.GetSignUpLog.DidData.Total === 0 ? true : false
                }
                onShowSizeChange={this.onShowSizeChange}
                current={this.state.pagination}
                // hideOnSinglepage={true}
                total={DataState.GetSignUpLog.DidData.Total}
                onChange={this.onPagiNationChange}
              ></PagiNation>
            </div>
          </Loading>
        </div>

        <DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.StudentDetailsMsgModalVisible}
          module={1}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.handleUserMsg}
          type="student"
        ></DetailsModal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};

export default connect(mapStateToProps)(RegisterDidExamine);
