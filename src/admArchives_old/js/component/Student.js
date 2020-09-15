import React from "react";
import { connect } from "react-redux";
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
  Loading,
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import "../../scss/Student.scss";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";
import { Scrollbars } from "react-custom-scrollbars";
import UIState from "../reducers/UIState";
import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import StudentChangeRecord from "./StudentChangeRecord";
import EditMajorModal from "./EditMajorModal";
import HandleMajorModal from "./HandleMajorModal";
let { checkUrlAndPostMsg } = Public;
let { UpDataState } = actions;
class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: (key) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={key.key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {key.OrderNo + 1 >= 10
                      ? key.OrderNo + 1
                      : "0" + (key.OrderNo + 1)}
                  </span>
                </label>
              </div>
            );
          },
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          width: 50,
          colSpan: 0,
          dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{
                    width: "37.5px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.PhotoPath}) no-repeat center center / 100% auto`,
                  }}
                ></i>
              </div>
            );
          },
        },
        {
          title: "姓名",
          align: "left",
          colSpan: 2,
          width: 90,
          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.key)}
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
          width: 120,
          dataIndex: "UserID",
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
          width: 80,
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
        // {
        //   title: "年级",
        //   align: "center",
        //   key: "GradeName",
        //   width: 110,
        //   dataIndex: "GradeName",
        //   render: GradeName => {
        //     return (
        //       <span title={GradeName} className="GradeName">
        //         {GradeName ? GradeName : "--"}
        //       </span>
        //     );
        //   }
        // },
        {
          title: "院系专业",
          align: "center",
          width: 220,
          key: "MyCollege",
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
                {/* <br></br>
                <span
                  className="GradeClass"
                  title={MyClass.Grade + ">" + MyClass.Class}
                >
                  {MyClass.Grade + ">" + MyClass.Class}
                </span> */}
              </span>
            ) : (
              "--"
            );
          },
        },
        {
          title: "年级班级",
          align: "center",
          width: 220,
          key: "MyClass",
          dataIndex: "MyClass",
          render: (MyClass) => {
            return MyClass.College ||
              MyClass.Major ||
              MyClass.Grade ||
              MyClass.Grade ? (
              <span className="MyClass">
                {/* <span
                  className="CollegeMajor"
                  title={MyClass.College + ">" + MyClass.Major}
                >
                  {MyClass.College + ">" + MyClass.Major}
                </span>{" "}
                <br></br> */}
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
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 232,
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.StudentEdit.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                {props.DataState.LoginUser.UserType === "7" &&
                props.DataState.LoginUser.UserClass === "2" ? (
                  ""
                ) : (
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.StudentChange.bind(this, key)}
                    className="check-btn"
                  >
                    查看变更记录
                  </Button>
                )}
              </div>
            );
          },
        },
      ],
      data: [
        {
          key: 1,
          UserName: {
            key: "01",
            PhotoPath:
              "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
            UserName: "祝泽森",
          },
          UserID: "S00001",
          Grader: "男",
          GradeName: "一年级",
          ClassName: "一年1班",
          Others: {},
        },
      ],
      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      studentModalVisible: false,
      userKey: 0,
      StudentChangeKey: 0,
      StudentChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      StudentDetailsMsgModalVisible: false,
      addStudentModalVisible: false,
      firstSelect: { value: 0, title: "全部学院" },
      secondSelect: { value: 0, title: "全部专业" },
      thirdSelect: { value: 0, title: "全部年级" },
      fourthSelect: { value: 0, title: "全部班级" },
      firstList: [{ value: 0, title: "全部学院" }],
      secondList: [{ value: 0, title: "全部专业" }],
      thirdList: [{ value: 0, title: "全部年级" }],
      fourthList: [{ value: 0, title: "全部班级" }],
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      pageSize: 10,

      sortType: "",
      sortFiled: "",
      searchWord: "",
      studentChangeUserLog: {},
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
    window.StudentCancelSearch = this.StudentDropMenu.bind(this, {
      value: 0,
      title: "全部学院",
    });
  }
  StudentCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      checkedList: [],
      pagination: 1,
    });
  };
  componentWillReceiveProps(nextProps) {
    let { DataState, dispatch } = nextProps;

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
      College.length > 1 &&
      !Public.comparisonObject(College, OldCollege) &&
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
        dispatch({
          type: actions.UpDataState.SET_GRADE_CLASS_MSG,
          data: {
            College: {
              value: DataState.LoginUser.CollegeID,
              title: DataState.LoginUser.CollegeName,
            },
            Major: major,
          },
        });
      }
      // console.log(major, Majors[DataState.LoginUser.CollegeID]);

      this.setState({
        secondList: Majors[DataState.LoginUser.CollegeID],
        secondSelect: major,
        firstList: College,
        firstSelect: {
          value: DataState.LoginUser.CollegeID,
          title: DataState.LoginUser.CollegeName,
        },
      });
    } else if (
      College instanceof Array &&
      College.length > 1 &&
      !Public.comparisonObject(College, OldCollege) &&
      !userType
    ) {
      let college = this.state.firstSelect;
      if (ID !== "all") {
        if (
          DataState.GradeStudentPreview.College &&
          DataState.GradeStudentPreview.College.value !== 0
        ) {
          college = DataState.GradeStudentPreview.College;
        } else {
          for (let key in College) {
            if (College[key].value === ID) {
              college = College[key];
            }
          }
        }
        dispatch({
          type: actions.UpDataState.SET_GRADE_CLASS_MSG,
          data: {
            College: college,
          },
        });
      }
      // console.log(ID,college, College);
      this.setState({
        firstList: College,
        firstSelect: college,
        secondList:
          college.value !== 0 && Majors[college.value]
            ? Majors[college.value]
            : this.state.secondList,
      });
    }
    if (
      !userType &&
      this.state.secondList &&
      this.state.secondList.length <= 1 &&
      this.state.firstSelect.value !== 0
    ) {
      this.setState({
        secondList: Majors[this.state.firstSelect.value],
      });
    }
    this.setState({
      pagination: DataState.GradeStudentPreview.pageIndex + 1,
    });
    // 做修改转业后对下拉的修改
    let {
      GradeClassMsg: { Majors: OldMajor },
    } = this.props.DataState;
    let {
      GradeClassMsg: { Majors: NewMajors },
      CommonData: { EditMajor },
      GradeStudentPreview: { College: NowCollege },
    } = nextProps.DataState;
    if (
      // !Public.comparisonObject(Major, OldMajor)
      NowCollege &&
      NowCollege.value &&
      NewMajors[NowCollege.value] !== OldMajor[NowCollege.value]
      // &&
      // this.state.firstSelect.value === NowCollege.value
    ) {
      this.setState({
        secondSelect: { value: 0, title: "全部专业" },
      });
    }
  }
  componentWillMount() {
    let { DataState, dispatch } = this.props;

    let College = DataState.GradeClassMsg.College;
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
      userType &&
      secondList instanceof Array &&
      secondList.length <= 1 &&
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
        dispatch({
          type: actions.UpDataState.SET_GRADE_CLASS_MSG,
          data: {
            College: {
              value: DataState.LoginUser.CollegeID,
              title: DataState.LoginUser.CollegeName,
            },
            Major: major,
          },
        });
      }
      // console.log(major, Majors[DataState.LoginUser.CollegeID]);

      this.setState({
        secondList: Majors[DataState.LoginUser.CollegeID],
        secondSelect: major,
        firstList: College,
        firstSelect: {
          value: DataState.LoginUser.CollegeID,
          title: DataState.LoginUser.CollegeName,
        },
      });
    } else if (!userType) {
      let college = { value: 0, title: "全部学院" };
      if (ID !== "all") {
        if (
          DataState.GradeStudentPreview.College &&
          DataState.GradeStudentPreview.College.value !== 0
        ) {
          college = DataState.GradeStudentPreview.College;
        } else {
          for (let key in College) {
            if (College[key].value === ID) {
              college = College[key];
            }
          }
        }
        dispatch({
          type: actions.UpDataState.SET_GRADE_CLASS_MSG,
          data: {
            College: college,
          },
        });
      }

      // console.log(ID,college, College);
      this.setState({
        firstList: College,
        firstSelect: college,
      });
    }
  }
  // 第一级：学院

  StudentDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // console.log(DataState.GradeClassMsg.Majors[e.value], e.value);
    if (e.value !== 0) {
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        // pagination: 1,
        keyword: "",
        secondSelect: { value: 0, title: "全部专业" },
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondList: DataState.GradeClassMsg.Majors[e.value],
        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            e.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          e
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        // pagination: 1,
        keyword: "",
        secondSelect: { value: 0, title: "全部专业" },
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },

        secondList: [{ value: 0, title: "全部专业" }],
        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType
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

        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            this.state.firstSelect.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect
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
        keyword: "",
        thirdList: DataState.GradeClassMsg.Grades[e.value],
        // fourthList: [{ value: 0, title: "全部班级" }],
        fourthList: this.state.thirdSelect.value
          ? DataState.GradeClassMsg.Classes[e.value][
              this.state.thirdSelect.value
            ]
          : [],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            this.state.firstSelect.value +
            "&majorID=" +
            e.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          e,
          this.state.thirdSelect
        )
      );
    }
  };
  // 第三级：年级
  StudentDropMenuThird = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        keyword: "",
        fourthSelect: { value: 0, title: "全部班级" },

        fourthList: [{ value: 0, title: "全部班级" }],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            // "&collegeID=" +
            // this.state.firstSelect.value +
            // "&majorID=" +
            // this.state.secondSelect.value +
            (this.state.firstSelect.value
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value
              ? "&majorID=" + this.state.secondSelect.value
              : "") +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          this.state.secondSelect
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        fourthSelect: { value: 0, title: "全部班级" },
        keyword: "",
        fourthList: this.state.secondSelect.value
          ? DataState.GradeClassMsg.Classes[this.state.secondSelect.value][
              e.value
            ]
          : [],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value
              ? "&majorID=" + this.state.secondSelect.value
              : "") +
            "&gradeID=" +
            e.value +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          this.state.secondSelect,
          e
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
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        keyword: "",
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            this.state.firstSelect.value +
            "&majorID=" +
            this.state.secondSelect.value +
            "&gradeID=" +
            this.state.thirdSelect.value +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          this.state.secondSelect,
          this.state.thirdSelect
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        keyword: "",
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            this.state.firstSelect.value +
            "&majorID=" +
            this.state.secondSelect.value +
            "&gradeID=" +
            this.state.thirdSelect.value +
            "&classID=" +
            e.value +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          this.state.secondSelect,
          this.state.thirdSelect,
          e
        )
      );
    }
  };
  StudentSearch = (e) => {
    const { dispatch, DataState } = this.props;
    // this.setState({
    //     keyword: '&keyword='+e.value,
    //     CancelBtnShow: 'y',
    //     pagination: 1,
    // })
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",

          title: "请输入关键字搜索",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
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
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
        })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: "&keyword=" + e.value,
      searchWord: e.value,
      CancelBtnShow: "y",
      // pagination: 1
    });
    // //  console.log(e)
    dispatch(
      actions.UpDataState.getUnivStudentPreview(
        "/GetStudentToPage_Univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value !== 0
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value !== 0
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          "&keyword=" +
          e.value +
          "&PageIndex=0&PageSize=" +
          this.state.pageSize +
          "" +
          this.state.sortFiled +
          this.state.sortType,
        this.state.firstSelect,
        this.state.secondSelect,
        this.state.thirdSelect,
        this.state.fourthSelect
      )
    );
  };

  onSelectChange = (e) => {
    // //  console.log(e)
    //this.setState({ selectedRowKeys });
  };

  StudentEdit = (e, key) => {
    //  console.log(e, key)
    const { dispatch, DataState } = this.props;
    let { userMsg, userType } = this.state;
    dispatch(
      actions.UpDataState.getTree_Univ(
        "/GetTree_Univ?schoolID=" + userMsg.SchoolID
        //  + (userType?'&collegeID='+userMsg.CollegeID:'')
      )
    );
    this.setState({
      studentModalVisible: true,
      userKey: e,
    });
  };

  StudentChange = (key) => {
    //  console.log(e, key)
    const { dispatch, DataState } = this.props;

    let innerID = DataState.GradeStudentPreview.newList[key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "student"));
    this.setState({
      studentChangeUserLog: DataState.GradeStudentPreview.newList[key].Others,
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = (e) => {
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.GradeStudentPreview.keyList,
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
    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.GradeStudentPreview.keyList.length
          ? true
          : false,
    });
  };
  handleStudentModalOk = (e) => {
    let url = "/EditStudent_Univ";

    const { DataState, dispatch, UIState } = this.props;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let picObj = DataState.GetPicUrl.picObj;
    // console.log(picObj.picUploader.isChanged());
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    //    if(EditModalTipsVisible.UserIDTipsVisible||EditModalTipsVisible.UserNameTipsVisible||EditModalTipsVisible.GenderTipsVisible||EditModalTipsVisible.GradeTipsVisible||EditModalTipsVisible.ClassTipsVisible){
    //        return;
    //    }
    if (!changeStudentMsg.classID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: true,
        })
      );
      return;
    } else if (changeStudentMsg.classID === -1) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
      return;
    } else {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
    }
    if (
      Public.comparisonObject(changeStudentMsg, initStudentMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "学生信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        // console.log(picObj.picUploader.getCurImgPath())
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy_univ + url,
          {
            ...changeStudentMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            PhotoEdit: PhotoEdit,
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
            }
            dispatch(
              actions.UpDataState.getUnivStudentPreview(
                "/GetStudentToPage_Univ?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  (this.state.firstSelect.value !== 0
                    ? "&collegeID=" + this.state.firstSelect.value
                    : "") +
                  (this.state.secondSelect.value !== 0
                    ? "&majorID=" + this.state.secondSelect.value
                    : "") +
                  (this.state.thirdSelect.value !== 0
                    ? "&gradeID=" + this.state.thirdSelect.value
                    : "") +
                  (this.state.fourthSelect.value !== 0
                    ? "&classID=" + this.state.fourthSelect.value
                    : "") +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  this.state.sortFiled +
                  this.state.sortType +
                  this.state.keyword,
                this.state.firstSelect,
                this.state.secondSelect,
                this.state.thirdSelect,
                this.state.fourthSelect
              )
            );
            dispatch(actions.UpUIState.editAlltModalTipsVisible());
          });
      }
    }
  };
  handleStudentModalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      studentModalVisible: false,
    });
  };
  StudentChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.STUDENT_CHANGE_MODAL_CLOSE });
  };
  StudentChangeMadalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.STUDENT_CHANGE_MODAL_CLOSE });
  };

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的学生",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定删除勾选的学生吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
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
    const { dispatch, DataState } = this.props;
    let url = "/DeleteStudent_Univ";
    let checkList = this.state.checkedList;
    let dataList = DataState.GradeStudentPreview.newList;
    let Total = DataState.GradeStudentPreview.Total;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let len = UserIDList.length;
    let UserIDListString = UserIDList.join();
    let pagination = this.state.pagination - 1;

    postData(
      CONFIG.UserInfoProxy_univ + url,
      {
        userIDs: UserIDListString,
        schoolID: this.state.userMsg.SchoolID,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          // if((Total-len)%(this.state.pagination-1)===0){
          //   pagination = this.state.pagination - 2;
          //   this.setState({
          //     pagination:pagination+1
          //   })
          // }
          this.setState({
            checkedList: [],
            checkAll: false,
          });

          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(
            actions.UpDataState.getUnivStudentPreview(
              "/GetStudentToPage_Univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.firstSelect.value !== 0
                  ? "&collegeID=" + this.state.firstSelect.value
                  : "") +
                (this.state.secondSelect.value !== 0
                  ? "&majorID=" + this.state.secondSelect.value
                  : "") +
                (this.state.thirdSelect.value !== 0
                  ? "&gradeID=" + this.state.thirdSelect.value
                  : "") +
                (this.state.fourthSelect.value !== 0
                  ? "&classID=" + this.state.fourthSelect.value
                  : "") +
                "&PageIndex=" +
                pagination +
                "&PageSize=" +
                this.state.pageSize +
                this.state.sortFiled +
                this.state.sortType +
                this.state.keyword,
              this.state.firstSelect,
              this.state.secondSelect,
              this.state.thirdSelect,
              this.state.fourthSelect
            )
          );
        }
      });
  };
  //提示事件
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }

  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      // pagination: e
    });
    dispatch(
      actions.UpDataState.getUnivStudentPreview(
        "/GetStudentToPage_Univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value !== 0
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value !== 0
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          "&PageIndex=" +
          (e - 1) +
          "&PageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.firstSelect,
        this.state.secondSelect,
        this.state.thirdSelect,
        this.state.fourthSelect
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
      actions.UpDataState.getUnivStudentPreview(
        "/GetStudentToPage_Univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value !== 0
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value !== 0
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          "&PageIndex=0" +
          // (this.state.pagination - 1) +
          "&PageSize=" +
          pageSize +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.firstSelect,
        this.state.secondSelect,
        this.state.thirdSelect,
        this.state.fourthSelect
      )
    );
  };
  onUserNameClick = (key) => {
    const {
      DataState: {
        GradeStudentPreview: { pensonalList },
      },
    } = this.props;
    if (pensonalList[key]) {
      let token = sessionStorage.getItem("token");
      window.open(
        "/html/userPersona/index.html?userType=" +
          2 +
          "&userID=" +
          pensonalList[key].userID +
          "&lg_tk=" +
          token
      );
    }
    // const { DataState } = this.props;
    // this.setState({
    //   StudentDetailsMsgModalVisible: true,
    //   detailData: DataState.GradeStudentPreview.pensonalList[key],
    // });
  };
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
  onAddStudent = (e) => {
    //  console.log(e)
    const { dispatch, DataState } = this.props;

    dispatch(
      actions.UpDataState.getGradeClassMsg(
        "/GetGradeClassTree?schoolID=" + this.state.userMsg.SchoolID
      )
    );
    this.setState({
      addStudentModalVisible: true,
      userKey: "add",
    });
  };
  handleAddStudentModalOk = (e) => {
    //  console.log(e)
    let url = "/AddStudent_Univ";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        console.log(visi);
        haveMistake = true;
      }
    }

    // 错误
    //用户ID必填
    if (changeStudentMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeStudentMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeStudentMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //学院必选
    if (!changeStudentMsg.collegeID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          CollegeTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //专业必选
    if (!changeStudentMsg.majorID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          MajorTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //年级必选
    if (!changeStudentMsg.gradeID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GradeTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //班级必选
    if (!changeStudentMsg.classID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: true,
        })
      );
      haveMistake = true;
    } else if (changeStudentMsg.classID === -1) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
      haveMistake = true;
    } else {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(
        changeStudentMsg,
        initStudentMsg && !picObj.picUploader.isChanged()
      )
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "请先填写学生信息",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        postData(
          CONFIG.UserInfoProxy_univ + url,
          {
            ...changeStudentMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                addStudentModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.getUnivStudentPreview(
                  "/GetStudentToPage_Univ?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    (this.state.firstSelect.value !== 0
                      ? "&collegeID=" + this.state.firstSelect.value
                      : "") +
                    (this.state.secondSelect.value !== 0
                      ? "&majorID=" + this.state.secondSelect.value
                      : "") +
                    (this.state.thirdSelect.value !== 0
                      ? "&gradeID=" + this.state.thirdSelect.value
                      : "") +
                    (this.state.fourthSelect.value !== 0
                      ? "&classID=" + this.state.fourthSelect.value
                      : "") +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=" +
                    this.state.pageSize +
                    this.state.sortFiled +
                    this.state.sortType +
                    this.state.keyword,
                  this.state.firstSelect,
                  this.state.secondSelect,
                  this.state.thirdSelect,
                  this.state.fourthSelect
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  handleAddStudentModalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addStudentModalVisible: false,
    });
  };

  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // //  console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&majorID=" + this.state.secondSelect.value
              : "") +
            (this.state.thirdSelect.value !== 0
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            (this.state.fourthSelect.value !== 0
              ? "&classID=" + this.state.fourthSelect.value
              : "") +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=" +
            this.state.pageSize +
            "&" +
            sortType +
            this.state.keyword,
          this.state.firstSelect,
          this.state.secondSelect,
          this.state.thirdSelect,
          this.state.fourthSelect
        )
      );
    } else if (sorter && !sorter.columnKey) {
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: "",
      });
      dispatch(
        actions.UpDataState.getUnivStudentPreview(
          "/GetStudentToPage_Univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&majorID=" + this.state.secondSelect.value
              : "") +
            (this.state.thirdSelect.value !== 0
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            (this.state.fourthSelect.value !== 0
              ? "&classID=" + this.state.fourthSelect.value
              : "") +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=" +
            this.state.pageSize +
            this.state.keyword,
          this.state.firstSelect,
          this.state.secondSelect,
          this.state.thirdSelect,
          this.state.fourthSelect
        )
      );
    }
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
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.getUnivStudentPreview(
        "/GetStudentToPage_Univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value !== 0
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value !== 0
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled,
        this.state.firstSelect,
        this.state.secondSelect,
        this.state.thirdSelect,
        this.state.fourthSelect
      )
    );
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  editMajorOk = () => {
    const { dispatch } = this.props;
    dispatch(
      UpDataState.SetEditMajorSelectChange({
        ModalVisible: false,
      })
    );
  };
  editMajorCancel = () => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          EditMajor: { isChange },
        },
      },
    } = this.props;
    // history.
    if (isChange) {
      window.StudentCancelSearch && window.StudentCancelSearch();
      history.push("/UserArchives/Student/all");
    }

    dispatch(
      UpDataState.SetEditMajorSelectChange({
        ModalVisible: false,
      })
    );
  };
  onEditMajor = () => {
    const { dispatch } = this.props;
    dispatch(
      UpDataState.SetEditMajorSelectChange({
        ModalVisible: true,
      })
    );
  };
  handleMajorOk = () => {
    const { dispatch, DataState } = this.props;
    let {
      CommonData: {
        EditMajor: { CollegeSelect, type, Collect, Name, Id },
      },
      GradeClassMsg: { College },
      GradeStudentPreview,
    } = DataState;
    if (Collect.value === "") {
      // dispatch({ type: UpUIState.ADD_CLASS_COLLEGE_TIPS_SHOW });
      // isError = true;
      return;
    }

    // if (isError) {
    //   return;
    // }
    //输入为空
    if (Name === "") {
      dispatch(
        UpDataState.SetEditMajorSelectChange({
          TisTitleVisible: true,
          TisTitle: "专业名称不能为空",
        })
      );
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(Name)) {
        dispatch(
          UpDataState.SetEditMajorSelectChange({
            TisTitleVisible: false,
            TisTitle: "专业名称不能为空",
          })
        );

        let isChong = false;
        for (let key in College) {
          if (College[key].childred instanceof Array)
            for (let index in College[key].childred) {
              if (College[key].childred[index].title === Name) {
                isChong = true;
              }
            }
        }

        if (isChong) {
          //有同名
          dispatch(
            UpDataState.SetEditMajorSelectChange({
              TisTitleVisible: true,
              TisTitle: "该学校下已存在同名专业",
            })
          );
          // dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

          // dispatch({
          //   type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
          //   tips: "该学院下已存在同名专业",
          // });
        } else {
          //向后台请求添加班级的接口
          dispatch(
            UpDataState.SetEditMajorSelectChange({
              // TisTitle: "",
              TisTitleVisible: false,
            })
          );
          let func = "";
          let data = {};

          if (type === "add") {
            func = UpDataState.addMajor;
            data = { CollegeID: Collect.value, MajorName: Name };
          } else if (type === "edit") {
            func = UpDataState.editMajor;
            data = { CollegeID: Collect.value, MajorName: Name, MajorID: Id };
          } else {
            return;
          }
          dispatch(
            func({
              data: data,
              func: (data) => {
                dispatch(
                  UpDataState.SetEditMajorSelectChange({
                    isChange: true,
                  })
                );
                dispatch(
                  actions.UpUIState.showErrorAlert({
                    type: "success",
                    title: "操作成功",
                    onHide: this.onAlertWarnHide.bind(this),
                  })
                );
                this.handleMajorCancel();

                dispatch(
                  actions.UpDataState.getTree_Univ(
                    "/GetTree_Univ?schoolID=" + DataState.LoginUser.SchoolID
                  )
                );
                // dispatch(
                //   actions.UpDataState.getUnivStudentPreview(
                //     "/GetStudentToPage_Univ?SchoolID=" +
                //       DataState.LoginUser.SchoolID +
                //       (GradeStudentPreview.College.value
                //         ? "&collegeID=" + GradeStudentPreview.College.value
                //         : "") +
                //       (GradeStudentPreview.Major.value
                //         ? "&majorID=" + GradeStudentPreview.Major.value
                //         : "") +
                //       (GradeStudentPreview.Grade.value
                //         ? "&gradeID=" + GradeStudentPreview.Grade.value
                //         : "") +
                //       (GradeStudentPreview.Class.value
                //         ? "&classID=" + GradeStudentPreview.Class.value
                //         : "") +
                //       "&PageIndex=0&PageSize=" + this.state.pageSize + ""
                //     // { value: CollegeSelect.value, title: CollegeSelect.title }
                //   )
                // );
              },
            })
          );
        }
      } else {
        dispatch(
          UpDataState.SetEditMajorSelectChange({
            TisTitleVisible: true,
            TisTitle:
              "专业名称应由1-20位的汉字、字母、数字以及括号组成，建议以学院为前缀",
          })
        );
      }
    }
  };
  UserComm_CheckGroupName(strInput) {
    //用户群名称检测（学校、年级、班级、教师组、专家组）
    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      strInput
    );
  }

  handleMajorCancel = () => {
    const { dispatch } = this.props;

    dispatch(
      UpDataState.SetEditMajorSelectChange({
        EditMajorModalVivsible: false,
        Name: "",
        Id: "",
        TisTitle: "专业名称格式不正确",
        TisTitleVisible: false,
      })
    );
  };

  render() {
    const { UIState, DataState } = this.props;
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
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
    // };
    //  console.log(this.state.pagination)
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

    let {
      CommonData: {
        EditMajor: {
          StudentLoading,
          type,
          ModalVisible,
          EditMajorModalVivsible,
        },
      },
    } = DataState;
    let { LockerVersion } = JSON.parse(
      //校园基础信息管理 XG5.2-免费版,1为基础版
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(
          //校园基础信息管理 XG5.2-免费版,1为基础版
          sessionStorage.getItem("LgBasePlatformInfo")
        )
      : {};
    return (
      <div className="Student">
        <div className="Student-box">
          <div className="Student-top">
            <span className="top-tips">
              <span className="tips menu39 ">学生档案管理</span>
            </span>
            <div className="top-nav">
              {/* <Link
                className="link"
                to="/UserArchives/Graduate"
                target="_blank"
                replace
              >
                <span className="Graduate">毕业生档案管理</span>
              </Link>
              <span className="divide">|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onEditMajor}
              >
                <span className="addMajor">专业管理</span>
              </span>
              <span className="divide">|</span>
              {LockerVersion !== "1" ? (
                <>
                  <a
                    className="link"
                    // target="_blank"
                    // to="/RegisterExamine"
                    // replace
                  >
                    <span
                      onClick={this.onLinkClick.bind(
                        this,
                        "学生注册审核",
                        "#/RegisterExamine/RegisterWillExamine"
                      )}
                      className="RegisterExamine"
                    >
                      学生注册审核
                      <i
                        style={{
                          display: DataState.GetSignUpLog.WillData.Total
                            ? "inline-block"
                            : "none",
                        }}
                        className="have-red"
                      ></i>
                    </span>
                  </a>
                  <span className="divide">|</span>{" "}
                </>
              ) : (
                ""
              )}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddStudent}
              >
                <span className="add">添加学生</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Student"
                // replace
              >
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "导入学生",
                    "#/ImportFile/Student"
                  )}
                  className="ImportFile"
                >
                  导入学生
                </span>
              </a>
            </div>
          </div>
          <div className="Student-hr"></div>
          <div className="Student-content">
            <div className="content-top">
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
                //     this.state.firstSelect.value !== 0 ? "block" : "none",
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
                style={{ marginLeft: "70px" }}
                title={"年级班级:"}
                // style={{
                //   display:
                //     this.state.secondSelect.value !== 0 ? "block" : "none",
                // }}
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
              <div className="Search">
                <Search
                  placeHolder="请输入学号或姓名进行搜索..."
                  onClickSearch={this.StudentSearch.bind(this)}
                  height={30}
                  width={250}
                  Value={this.state.searchValue}
                  onCancelSearch={this.onCancelSearch}
                  onChange={this.onChangeSearch.bind(this)}
                  CancelBtnShow={this.state.CancelBtnShow}
                ></Search>
                <span
                  className="search-tips"
                  style={{
                    display:
                      this.state.CancelBtnShow === "y" ? "block" : "none",
                  }}
                >
                  <span>
                    {"搜索关键词“" + this.state.searchWord + "”共找到"}
                  </span>
                  <span className="Total">
                    {" " + DataState.GradeStudentPreview.Total + " "}
                  </span>
                  人
                </span>
              </div>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={StudentLoading}
              >
                <div>
                  <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={this.state.checkedList}
                    onChange={this.onCheckBoxGroupChange.bind(this)}
                  >
                    {DataState.GradeStudentPreview.newList instanceof Array &&
                    DataState.GradeStudentPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        loading={UIState.AppLoading.TableLoading}
                        columns={this.state.columns}
                        pagination={false}
                        onChange={this.onTableChange.bind(this)}
                        dataSource={DataState.GradeStudentPreview.newList}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y" ||
                          this.state.firstSelect.value !== 0
                            ? "暂无符合条件的学生档案"
                            : "暂无学生档案"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.GradeStudentPreview.Total > 0 ? (
                    <div style={{ display: "inline-block" }}>
                      <CheckBox
                        className="checkAll-box"
                        // type="gray"
                        onChange={this.OnCheckAllChange}
                        checked={this.state.checkAll}
                      >
                        <span className="checkAll-title">全选</span>
                      </CheckBox>
                      <Button
                        onClick={this.onDeleteAllClick}
                        className="deleteAll"
                        color="blue"
                      >
                        删除
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      pageSize={this.state.pageSize}
                      current={this.state.pagination}
                      // hideOnSinglepage={true}
                      hideOnSinglePage={
                        DataState.GradeStudentPreview.Total === 0 ? true : false
                      }
                      total={DataState.GradeStudentPreview.Total}
                      onChange={this.onPagiNationChange}
                    ></PagiNation>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        <Modal
          ref="handleStudentMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          destroyOnClose
          title="编辑学生"
          visible={this.state.studentModalVisible}
          onOk={this.handleStudentModalOk}
          onCancel={this.handleStudentModalCancel}
        >
          {this.state.studentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          footer={null}
          visible={UIState.AppModal.StudentChangeMadalVisible}
          onOk={this.StudentChangeMadalOk}
          onCancel={this.StudentChangeMadalCancel}
        >
          <Loading
            // tip="加载中..."
            opacity={false}
            size="small"
            spinning={UIState.AppLoading.modalLoading}
          >
            {DataState.GetUserLog.UserLog instanceof Array &&
            DataState.GetUserLog.UserLog.length > 0 ? (
              <div className="modal-studentChange">
                <div className="content-top">
                  <img
                    src={IconLocation}
                    width="30"
                    height="40"
                    alt="icon-location"
                  />
                  <span className="top-text">
                    {this.state.studentChangeUserLog.UserName}的档案变更记录
                  </span>
                </div>
                <div className="content">
                  <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                    {UIState.AppModal.StudentChangeMadalVisible ? (
                      <StudentChangeRecord
                        data={DataState.GetUserLog.UserLog}
                      ></StudentChangeRecord>
                    ) : (
                      ""
                    )}
                  </Scrollbars>
                </div>
              </div>
            ) : (
              <Empty
                type="4"
                title="该用户暂无档案变更记录"
                style={{ top: "150px", position: "relative", height: "411px" }}
              ></Empty>
            )}
          </Loading>
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加学生"}
          destroyOnClose
          visible={this.state.addStudentModalVisible}
          onOk={this.handleAddStudentModalOk}
          onCancel={this.handleAddStudentModalCancel}
        >
          {this.state.addStudentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.StudentDetailsMsgModalVisible}
          module={1}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="student"
        ></DetailsModal>
        <Modal
          type={1}
          title="专业管理"
          visible={ModalVisible}
          mask={true}
          width={810}
          footer={null}
          bodyStyle={{ height: 480, padding: 0 }}
          className="editMajorModal"
          onOk={this.editMajorOk.bind(this)}
          onCancel={this.editMajorCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <EditMajorModal></EditMajorModal>
          </div>
        </Modal>
        <Modal
          type={1}
          title={type === "add" ? "添加专业" : "编辑专业"}
          visible={EditMajorModalVivsible}
          mask={true}
          width={400}
          bodyStyle={{ height: 130, padding: 0 }}
          className="HandleMajorModal"
          onOk={this.handleMajorOk.bind(this)}
          onCancel={this.handleMajorCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <HandleMajorModal></HandleMajorModal>
          </div>
        </Modal>
        {/* 提示框 */}
      </div>
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
export default connect(mapStateToProps)(Student);
