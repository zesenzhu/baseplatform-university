import React from "react";
import CONFIG from "../../../common/js/config";
import { connect } from "react-redux";
import {
  Alert,
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Tips,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
  Empty,
  Loading,
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import "../../scss/Parents.scss";
import { postData, getData } from "../../../common/js/fetch";
import md5 from "md5";
import { Tooltip, Input } from "antd";
import TipsContact from "./TipsContact";
import Public from "../../../common/js/public";
import history from "../containers/history";
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from "../actions";
//import ParentsChangeRecord from './ParentsChangeRecord'
class Parents extends React.Component {
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
          dataIndex: "handle",
          width: 70,
          key: "key",
          align: "left",
          render: (handle) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  {" "}
                  <CheckBox
                    value={handle.key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {handle.OrderNo + 1 >= 10
                      ? handle.OrderNo + 1
                      : "0" + (handle.OrderNo + 1)}
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
          width: 70,
          colSpan: 0,
          // dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.UserName.UserID)}
                  className="name-img"
                  style={{
                    width: "47px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.Others.AvatarPath}) no-repeat center center / 47px`,
                  }}
                ></i>
              </div>
            );
          },
        },
        {
          title: "姓名",
          align: "left",
          key: "UserName",
          colSpan: 2,
          width: 130,
          dataIndex: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
                  title={arr.Name}
                >
                  {arr.Name}
                </span>
                <br />
                <span className="name-UserID">
                  (
                  <span className="UserID-content" title={arr.UserID}>
                    {arr.UserID}
                  </span>
                  )
                </span>
              </div>
            );
          },
        },
        {
          title: "用户名",
          align: "center",
          width: 120,
          dataIndex: "ShortName",
          key: "ShortName",
          sorter: true,
          render: (ShortName) => {
            return (
              <span className="UserName" title={ShortName}>
                {ShortName ? ShortName : "--"}
              </span>
            );
          },
        },
        // {
        //   title: "个性签名",
        //   align: "center",
        //   width: 300,
        //   dataIndex: "Sign",
        //   key: "Sign",
        //   render: (Sign) => {
        //     return (
        //       <span className="Sign" title={Sign}>
        //         {Sign ? Sign : "--"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "联系方式",
        //   align: "center",
        //   width: 120,
        //   key: "UserContact",
        //   dataIndex: "UserContact",
        //   render: (UserContact) => {
        //     return (
        //       <Tooltip
        //         placement="topLeft"
        //         trigger="click"
        //         arrowPointAtCenter={true}
        //         title={<TipsContact data={UserContact}></TipsContact>}
        //       >
        //         <span
        //           className="UserContact"
        //           onClick={this.onUserContactClick.bind(this, UserContact)}
        //         >
        //           查看
        //         </span>
        //       </Tooltip>
        //     );
        //   },
        // },
        {
          title: "最后一次登录",
          align: "center",
          width: 200,
          // dataIndex: "LastTime",
          key: "LastTime",
          render: (data) => {
            return (
              <div className="LastTime">
                <p
                  className="last"
                  title={
                    data.Others && data.Others.LastTimeLogin
                      ? data.Others.LastTimeLogin
                      : "--"
                  }
                >
                  时间:
                  {data.Others && data.Others.LastTimeLogin
                    ? data.Others.LastTimeLogin
                    : "--"}
                </p>
                <p
                  className="last"
                  title={
                    data.Others && data.Others.LastTimeIP
                      ? data.Others.LastTimeIP
                      : "--"
                  }
                >
                  IP:
                  {data.Others && data.Others.LastTimeIP
                    ? data.Others.LastTimeIP
                    : "--"}
                </p>
              </div>
            );
          },
        },
        {
          title: "联系方式",
          align: "center",
          width: 270,
          key: "UserContact",
          dataIndex: "UserContact",
          render: (UserContact) => {
            return (
              <div className="uc">
                <div className="uc-float">
                  <p className="uc-box uc-left">
                    <span
                      title={UserContact.QQ ? UserContact.QQ : "--"}
                      className="uc-title uc-QQ"
                    >
                      {UserContact.QQ ? UserContact.QQ : "--"}
                    </span>
                    <span
                      title={UserContact.Weibo ? UserContact.Weibo : "--"}
                      className="uc-title uc-Weibo"
                    >
                      {UserContact.Weibo ? UserContact.Weibo : "--"}
                    </span>
                  </p>
                </div>
                <div className="uc-float">
                  <p className="uc-box uc-right">
                    <span
                      title={UserContact.WeiXin ? UserContact.WeiXin : "--"}
                      className="uc-title uc-WeiXin"
                    >
                      {UserContact.WeiXin ? UserContact.WeiXin : "--"}
                    </span>
                    <span
                      title={
                        UserContact.Telephone ? UserContact.Telephone : "--"
                      }
                      className="uc-title uc-Telephone"
                    >
                      {UserContact.Telephone ? UserContact.Telephone : "--"}
                    </span>
                  </p>
                </div>
              </div>
            );
          },
        },
        {
          title: "操作",
          width: 232,
          align: "center",
          key: "handle",
          // dataIndex: "key",
          render: (data) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onChangePwdClick.bind(this, data.key)}
                  className="handle-btn"
                >
                  重置密码
                </Button>
                <Button
                  color={data.Others.IsEnable ? "red" : "green"}
                  type="default"
                  onClick={this.onChangeEnableClick.bind(this, data.key)}
                  className="handle-btn"
                >
                  {data.Others.IsEnable ? "禁用账号" : "启用账号"}
                </Button>
              </div>
            );
          },
        },
      ],
      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      studentModalVisible: false,
      userKey: 0,
      ParentsChangeKey: 0,
      ChangePwdMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      ParentsDetailsMsgModalVisible: false,
      addParentsModalVisible: false,
      defaultPwd: "pwd888888",
      onClickKey: 0,
      userMsgKey: 0,
      keyword: "",
      CancelBtnShow: "n",

      firstSelect: { value: 0, title: "全部学院" },
      secondSelect: { value: 0, title: "全部专业" },
      thirdSelect: { value: 0, title: "全部年级" },
      fourthSelect: { value: 0, title: "全部班级" },
      firstList: [{ value: 0, title: "全部学院" }],
      secondList: [{ value: 0, title: "全部专业" }],
      thirdList: [{ value: 0, title: "全部年级" }],
      fourthList: [{ value: 0, title: "全部班级" }],
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: "",
      PwdTipsTitle:
        "密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成",
      ChangeAllPwdMadalVisible: false,
      PwdStrong: 0,
      pageSize: 10,

      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
    window.ParentsCancelSearch = this.ParentsCancelSearch.bind(this);
  }
  componentDidMount() {
    history.listen(() => {
      this.setState({
        pageSize: 10,
        CancelBtnShow: "n",
        keyword: "",
        checkedList: [],
        checkAll: false,
        pagination: 1,
        searchValue: "",
        DropMenuShow: false,
        secondSelect: { value: 0, title: "全部专业" },
        firstSelect: { value: 0, title: "全部学院" },
        thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
      });
    });
  }
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
      College.length > 1 &&
      !Public.comparisonObject(College, OldCollege) &&
      !userType
    ) {
      let college = { value: 0, title: "全部学院" };

      this.setState({
        firstList: College,
        firstSelect: college,
      });
    }
    let Grades = this.props.DataState.GradeClassMsg.Grades
      ? this.props.DataState.GradeClassMsg.Grades
      : [];
    let len1 = Grades.lenght;
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len1; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }

    this.setState({
      GradeArr: GradeArr,
    });
  }

  ParentsCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      checkedList: [],
      checkAll: false,
      pagination: 1,
      searchValue: "",
      DropMenuShow: false,
      secondSelect: { value: 0, title: "全部专业" },
      firstSelect: { value: 0, title: "全部学院" },
      thirdSelect: { value: 0, title: "全部年级" },
      fourthSelect: { value: 0, title: "全部班级" },
    });
  };
  componentWillMount() {
    let { DataState, dispatch } = this.props;
    let pwd = "pwd888888";

    dispatch(actions.UpDataState.getChangeInputValue(pwd));

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
      secondList instanceof Array &&
      secondList.length <= 1 &&
      userType &&
      DataState.LoginUser.CollegeID
    ) {
      let major = { value: 0, title: "全部专业" };

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

      // console.log(ID,college, College);
      this.setState({
        firstList: College,
        firstSelect: college,
      });
    }
  }

  // 第一级：学院

  ParentsDropMenu = (e) => {
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
        pagination: 1,
        secondSelect: { value: 0, title: "全部专业" },
        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondList: DataState.GradeClassMsg.Majors[e.value],
        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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
        // keyword: "",
        pagination: 1,
        secondList: [{ value: 0, title: "全部专业" }],
        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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

  ParentsDropMenuSecond = (e) => {
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

        // thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        keyword: "",
        pagination: 1,
        // thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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
        pagination: 1,
        thirdList: DataState.GradeClassMsg.Grades[e.value],
        fourthList: this.state.thirdSelect.value
          ? DataState.GradeClassMsg.Classes[e.value][
              this.state.thirdSelect.value
            ]
          : [],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&collegeID=" +
            this.state.firstSelect.value +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            "&majorID=" +
            e.value +
            "&PageIndex=0&PageSize=" +
            this.state.pageSize +
            "" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          e
        )
      );
    }
  };
  // 第三级：年级
  ParentsDropMenuThird = (e) => {
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
        pagination: 1,
        fourthSelect: { value: 0, title: "全部班级" },

        fourthList: [{ value: 0, title: "全部班级" }],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
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
        pagination: 1,
        fourthList: this.state.secondSelect.value
          ? DataState.GradeClassMsg.Classes[this.state.secondSelect.value][
              e.value
            ]
          : [],
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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
          this.state.secondSelect
        )
      );
    }
  };
  // 第四级：班级
  ParentsDropMenuFourth = (e) => {
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
        pagination: 1,
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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
          this.state.secondSelect
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
        pagination: 1,
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
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
          this.state.secondSelect
        )
      );
    }
  };
  // ParentsDropMenu = e => {
  //   const { dispatch, DataState } = this.props;

  //   let Classes = [{ value: 0, title: "全部班级" }];

  //   //console.log(this.refs.dropMenuSecond)
  //   if (e.value !== 0) {
  //     let ClassArr = DataState.GradeClassMsg.returnData.AllClasses[e.value];
  //     ClassArr.map(Class => {
  //       Classes.push(Class);
  //     });
  //     //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
  //     //this.refs.dropMenuSecond.state.dropList = Classes;]
  //     this.setState({
  //       secondDropList: Classes
  //     });
  //     dispatch(
  //       actions.UpDataState.getGradeParentsPreview(
  //         "/GetParentsToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" + this.state.pageSize + "&gradeID=" +
  //           e.value +
  //           this.state.sortFiled +
  //           this.state.sortType
  //       )
  //     );
  //     this.setState({
  //       DropMenuShow: true,
  //       firstSelect: e,
  //       secondSelect: { value: 0, title: "全部班级" },

  //       searchValue: "",
  //       checkedList: [],
  //       checkAll: false,
  //       keyword: "",
  //       pagination: 1,
  //       CancelBtnShow: "n"
  //     });
  //   } else {
  //     dispatch(
  //       actions.UpDataState.getGradeParentsPreview(
  //         "/GetParentsToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" + this.state.pageSize + "" +
  //           this.state.sortFiled +
  //           this.state.sortType
  //       )
  //     );
  //     this.setState({
  //       DropMenuShow: false,
  //       secondSelect: { value: 0, title: "全部班级" },
  //       searchValue: "",
  //       firstSelect: e,
  //       pagination: 1,
  //       checkedList: [],
  //       checkAll: false,
  //       keyword: "",
  //       CancelBtnShow: "n"
  //     });
  //   }
  // };

  // ParentsDropMenuSecond = e => {
  //   const { dispatch, DataState } = this.props;
  //   this.setState({
  //     secondSelect: e,
  //     searchValue: "",
  //     keyword: "",
  //     pagination: 1,
  //     CancelBtnShow: "n",
  //     checkedList: [],
  //     checkAll: false
  //   });
  //   if (e.value !== 0)
  //     dispatch(
  //       actions.UpDataState.getGradeParentsPreview(
  //         "/GetParentsToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" + this.state.pageSize + "&gradeID=" +
  //           this.state.firstSelect.value +
  //           "&classID=" +
  //           e.value +
  //           this.state.sortFiled +
  //           this.state.sortType
  //       )
  //     );
  //   else
  //     dispatch(
  //       actions.UpDataState.getGradeParentsPreview(
  //         "/GetParentsToPage_univ?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&PageSize=" + this.state.pageSize + "&gradeID=" +
  //           this.state.firstSelect.value +
  //           this.state.sortFiled +
  //           this.state.sortType
  //       )
  //     );
  // };
  //搜索
  ParentsSearch = (e) => {
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
    dispatch(
      actions.UpDataState.getGradeParentsPreview(
        "/GetParentsToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&PageSize=" +
          this.state.pageSize +
          "&keyword=" +
          e.value +
          (this.state.firstSelect.value
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          this.state.sortFiled +
          this.state.sortType
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: e.value,
      CancelBtnShow: "y",
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
      checkedList: [],
      checkAll: false,
      pagination: 1,
      searchValue: e.value,
    });
    dispatch(
      actions.UpDataState.getGradeParentsPreview(
        "/GetParentsToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          this.state.pageSize +
          "" +
          (this.state.firstSelect.value
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value
            ? "&majorID=" + this.state.secondSelect.value
            : "") +
          (this.state.thirdSelect.value
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onSelectChange = (e) => {
    //this.setState({ selectedRowKeys });
  };

  onUserContactClick = (UserContact) => {
    // this.setState({
    //     ParentsChangeMadalVisible: true,
    //     ParentsChangeKey: key
    // })
  };
  // onChangePwdClick = (e, key) => {
  //   // console.log(e, key)
  //     this.setState({
  //         ParentsChangeMadalVisible: true,
  //         ParentsChangeKey: key
  //     })
  // }
  onPwdBlur = (e) => {
    const { dispatch } = this.props;
    // console.log(e.target.value);
    let value = e.target.value;
    const { isOK, txt } = this.UserComm_ValidatePwd(value);
    let PwdStrong = this.UserComm_PwdStrong(value);
    this.setState({
      PwdStrong: PwdStrong,
    });
    if (!isOK) {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
      return;
    }
    // let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(
    //   value
    // );
    // if (!Test || value === "") {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
    //   return;
    // } else {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
    //   return;
    // }
  };
  // 批量重置
  onAllPwdBlur = (e) => {
    const { dispatch } = this.props;
    // console.log(e.target.value);
    let value = e.target.value;
    const { isOK, txt } = this.UserComm_ValidatePwd(value);
    let PwdStrong = this.UserComm_PwdStrong(value);
    this.setState({
      PwdStrong: PwdStrong,
    });
    if (!isOK) {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
      return;
    }
    // let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(
    //   value
    // );
    // if (!Test || value === "") {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
    //   return;
    // } else {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
    //   return;
    // }
  };
  onMouseEnterName = () => {};
  OnCheckAllChange = (e) => {
    const { DataState, dispatch } = this.props;
    if (e.target.checked) {
      this.setState({
        checkedList: DataState.GradeParentsPreview.keyList,
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
    const { DataState, dispatch } = this.props;
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.GradeParentsPreview.keyList.length
          ? true
          : false,
    });
  };
  handleParentsModalOk = (e) => {
    this.setState({
      studentModalVisible: false,
    });
  };
  handleParentsModalCancel = (e) => {
    this.setState({
      studentModalVisible: false,
    });
  };
  ChangePwdMadalOk = (e) => {
    this.setState({
      ChangePwdMadalVisible: false,
    });
  };
  ChangeAllPwdMadalOk = (e) => {
    this.setState({
      ChangeAllPwdMadalVisible: false,
    });
  };

  onChangePwdAllClick = () => {
    const { dispatch } = this.props;
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选所要重置密码的家长账号",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-query",
      //     title: "确定批量重置密码？",
      //     ok: this.onAlertQueryOk.bind(this, "pwd888888"),
      //     cancel: this.onAlertQueryClose.bind(this),
      //     close: this.onAlertQueryClose.bind(this)
      //   })
      // );
      this.setState({
        ChangeAllPwdMadalVisible: true,
      });
    }
  };
  //table点击重置密码
  onChangePwdClick = (key) => {
    const { dispatch, DataState } = this.props;

    let pwd = "pwd888888";
    // console.log(key)
    this.setState({
      ChangePwdMadalVisible: true,
      onClickKey: key,
    });
  };
  // 重置密码ok
  onPwdchangeOk = (pwd) => {
    const { dispatch, DataState, UIState } = this.props;
    let url = "/ResetPwd_univ";
    let UserMsg = DataState.LoginUser;
    if (this.state.defaultPwd === "") {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    } else {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID:
            DataState.GradeParentsPreview.newList[this.state.onClickKey].Others
              .UserID,
          userType: 3,
          newPwd: md5(this.state.defaultPwd),
        },
        2
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this),
              })
            );
            this.setState({
              ChangePwdMadalVisible: false,
              defaultPwd: "pwd888888",
              checkedList: [],
              checkAll: false,
              PwdStrong: 0,
            });
            dispatch(
              actions.UpDataState.getGradeParentsPreview(
                "/GetParentsToPage_univ?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "&keyword=" +
                  this.state.keyword +
                  (this.state.firstSelect.value
                    ? "&collegeID=" + this.state.firstSelect.value
                    : "") +
                  (this.state.secondSelect.value
                    ? "&majorID=" + this.state.secondSelect.value
                    : "") +
                  (this.state.thirdSelect.value
                    ? "&gradeID=" + this.state.thirdSelect.value
                    : "") +
                  (this.state.fourthSelect.value
                    ? "&classID=" + this.state.fourthSelect.value
                    : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          }
        });
    }
  };
  // 批量重置密码ok
  onAllPwdchangeOk = (pwd) => {
    const { dispatch, DataState, UIState } = this.props;
    let url = "/ResetPwd_univ";
    let UserMsg = DataState.LoginUser;
    if (this.state.defaultPwd === "") {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    } else {
      let userIDs = this.state.checkedList.map((child, index) => {
        return DataState.GradeParentsPreview.newList[child].Others.UserID;
      });
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: userIDs.join(),
          userType: 3,
          newPwd: md5(this.state.defaultPwd),
        },
        2
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this),
              })
            );

            this.setState({
              ChangeAllPwdMadalVisible: false,
              defaultPwd: "pwd888888",
              checkedList: [],
              checkAll: false,
              PwdStrong: 0,
            });
            dispatch(
              actions.UpDataState.getGradeParentsPreview(
                "/GetParentsToPage_univ?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "&keyword=" +
                  this.state.keyword +
                  (this.state.firstSelect.value
                    ? "&collegeID=" + this.state.firstSelect.value
                    : "") +
                  (this.state.secondSelect.value
                    ? "&majorID=" + this.state.secondSelect.value
                    : "") +
                  (this.state.thirdSelect.value
                    ? "&gradeID=" + this.state.thirdSelect.value
                    : "") +
                  (this.state.fourthSelect.value
                    ? "&classID=" + this.state.fourthSelect.value
                    : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          }
        });
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  // 重置密码close
  onPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });

    this.setState({
      ChangePwdMadalVisible: false,
      defaultPwd: "pwd888888",
      PwdStrong: 0,
    });
  };
  // 批量重置密码close
  onAllPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });

    this.setState({
      ChangeAllPwdMadalVisible: false,
      defaultPwd: "pwd888888",
      PwdStrong: 0,
    });
  };
  onPwdchange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      defaultPwd: e.target.value.trim(),
    });
  };
  // 批量change
  onAllPwdchange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      defaultPwd: e.target.value.trim(),
    });
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
  onAlertQueryOk = (pwd) => {
    let url = "/ResetPwd_univ";
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    let userIDs = this.state.checkedList.map((child, index) => {
      return DataState.GradeParentsPreview.newList[child].Others.UserID;
    });
    postData(
      CONFIG.UserAccountProxy + url,
      {
        userID: userIDs.join(),
        userType: 3,
        newPwd: md5(this.state.defaultPwd),
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
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
            actions.UpDataState.getGradeParentsPreview(
              "/GetParentsToPage_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=" +
                this.state.pageSize +
                "&keyword=" +
                this.state.keyword +
                (this.state.firstSelect.value
                  ? "&collegeID=" + this.state.firstSelect.value
                  : "") +
                (this.state.secondSelect.value
                  ? "&majorID=" + this.state.secondSelect.value
                  : "") +
                (this.state.thirdSelect.value
                  ? "&gradeID=" + this.state.thirdSelect.value
                  : "") +
                (this.state.fourthSelect.value
                  ? "&classID=" + this.state.fourthSelect.value
                  : "") +
                this.state.sortFiled +
                this.state.sortType
            )
          );
        }
      });
  };
  //分页
  onPagiNationChange = (value) => {
    const { dispatch } = this.props;
    this.setState({
      pagination: value,
    });
    let firstSelect = "";
    let secondSelect = "";
    let keyword = "";
    if (this.state.firstSelect.value !== 0) {
      firstSelect = "&collegeID=" + this.state.firstSelect.value;
    }
    if (this.state.secondSelect.value !== 0) {
      secondSelect = "&majorID=" + this.state.secondSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      firstSelectStr: firstSelect,
      secondSelectStr: secondSelect,
      keywordStr: keyword,
    });
    dispatch(
      actions.UpDataState.getGradeParentsPreview(
        "/GetParentsToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          --value +
          "&PageSize=" +
          this.state.pageSize +
          "" +
          keyword +
          firstSelect +
          secondSelect +
          (this.state.thirdSelect.value
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { dispatch } = this.props;
    let firstSelect = "";
    let secondSelect = "";
    let keyword = "";
    if (this.state.firstSelect.value !== 0) {
      firstSelect = "&gradeID=" + this.state.firstSelect.value;
    }
    if (this.state.secondSelect.value !== 0) {
      secondSelect = "&classID=" + this.state.secondSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      pageSize,
      pagination: 1,
      firstSelectStr: firstSelect,
      secondSelectStr: secondSelect,
      keywordStr: keyword,
    });
    dispatch(
      actions.UpDataState.getGradeParentsPreview(
        "/GetParentsToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0" +
          "&PageSize=" +
          pageSize +
          keyword +
          firstSelect +
          secondSelect +
          (this.state.thirdSelect.value
            ? "&gradeID=" + this.state.thirdSelect.value
            : "") +
          (this.state.fourthSelect.value
            ? "&classID=" + this.state.fourthSelect.value
            : "") +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onChangeEnableClick = (key, isEnable) => {
    const {
      dispatch,
      DataState: {
        GradeParentsPreview: { newList },
      },
    } = this.props;
    let {
      Others: { UserID, UserType, IsEnable },
    } = newList[key];
    // console.log(IsEnable);
    let firstSelect = "";
    let secondSelect = "";
    let keyword = "";
    if (this.state.firstSelect.value !== 0) {
      firstSelect = "&collegeID=" + this.state.firstSelect.value;
    }
    if (this.state.secondSelect.value !== 0) {
      secondSelect = "&majorID=" + this.state.secondSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      firstSelectStr: firstSelect,
      secondSelectStr: secondSelect,
      keywordStr: keyword,
    });
    dispatch(
      actions.UpDataState.DisableAccount({
        UserID,
        UserType,
        Flag: !IsEnable ? 1 : 0,
        func: () => {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          this.setState({
            ChangePwdMadalVisible: false,
            defaultPwd: "pwd888888",
            checkedList: [],
            checkAll: false,
            PwdStrong: 0,
          });

          dispatch(
            actions.UpDataState.getGradeParentsPreview(
              "/GetParentsToPage_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=" +
                this.state.pageSize +
                "" +
                keyword +
                firstSelect +
                secondSelect +
                (this.state.thirdSelect.value
                  ? "&gradeID=" + this.state.thirdSelect.value
                  : "") +
                (this.state.fourthSelect.value
                  ? "&classID=" + this.state.fourthSelect.value
                  : "") +
                this.state.sortFiled +
                this.state.sortType
            )
          );
        },
      })
    );
  };
  //table改变，进行排序操作
  onTableChange = (a, b, sorter) => {
    const { DataState, dispatch } = this.props;
    let firstSelect = "";
    let secondSelect = "";
    let keyword = "";
    if (this.state.firstSelect.value !== 0) {
      firstSelect = "&collegeID=" + this.state.firstSelect.value;
    }
    if (this.state.secondSelect.value !== 0) {
      secondSelect = "&majorID=" + this.state.secondSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "ShortName")
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
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageSize=" +
            this.state.pageSize +
            "&" +
            sortType +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword +
            firstSelect +
            secondSelect +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            (this.state.fourthSelect.value
              ? "&classID=" + this.state.fourthSelect.value
              : "")
          //  +
          // "&sortFiled=" +
          // sorter.columnKey +
          // "&" +
          // sortType
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
        checkedList: [],
        checkAll: false,
      });
      dispatch(
        actions.UpDataState.getGradeParentsPreview(
          "/GetParentsToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=" +
            this.state.pageSize +
            "" +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword +
            firstSelect +
            secondSelect +
            (this.state.thirdSelect.value
              ? "&gradeID=" + this.state.thirdSelect.value
              : "") +
            (this.state.fourthSelect.value
              ? "&classID=" + this.state.fourthSelect.value
              : "")
        )
      );
    }
  };
  onUserNameClick = (UserID) => {
    const { dispatch } = this.props;
    dispatch(
      actions.UpDataState.getUserMsg("/GetUserDetail?userid=" + UserID, () => {
        this.setState({
          ParentsDetailsMsgModalVisible: true,
        });
      })
    );
  };
  ParentsDetailsMsgModalOk = () => {
    this.setState({
      ParentsDetailsMsgModalVisible: false,
    });
  };
  ParentsDetailsMsgModalCancel = () => {
    this.setState({
      ParentsDetailsMsgModalVisible: false,
    });
  };
  onAddParents = (e) => {
    this.setState({
      addParentsModalVisible: true,
      userKey: "add",
    });
  };
  handleAddParentsModalOk = (e) => {
    this.setState({
      addParentsModalVisible: false,
    });
  };
  handleAddParentsModalCancel = (e) => {
    this.setState({
      addParentsModalVisible: false,
    });
  };
  //密码合法判断
  UserComm_ValidatePwd = (pwd) => {
    let lengthOver8 = true;
    let lengthLess20 = true;
    let containNumber = true;
    let containLetters = true;
    let containSymbol = true;
    let isOK = true;

    let txt = "";

    lengthOver8 = pwd.length >= 8;
    lengthLess20 = pwd.length <= 20;
    containNumber = /[0-9]+/.test(pwd);
    containLetters = /[a-zA-Z]+/.test(pwd);
    containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);
    isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(
      pwd
    );

    if (!lengthOver8) {
      txt += "密码长度不足8位、";
    }
    if (!lengthLess20) {
      txt += "密码长度不能超过20位、";
    }

    if (
      (containNumber && containLetters) ||
      (containNumber && containSymbol) ||
      (containLetters && containSymbol) ||
      (containNumber && containLetters && containSymbol)
    ) {
      //密码合法
    } else {
      txt += "至少包含字母、数字及特殊符号中的两种、";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
      txt += "密码包含非法字符、";
    }

    if (txt === "") {
      txt = "密码合法";
      return { isOK: true, txt: txt };
    } else {
      txt = txt.substr(0, txt.length - 1);
      return { isOK: false, txt: txt };
    }
  };
  // 密码强度
  UserComm_PwdStrong = (pwd) => {
    const containNumber = /[0-9]+/.test(pwd);

    const containLetters = /[a-zA-Z]+/.test(pwd);

    const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(
      pwd
    );

    //判断是否是强

    if (containLetters && containNumber && containSymbol) {
      return 3;
    } else if (
      (containLetters && !containSymbol && !containNumber) ||
      (containSymbol && !containLetters && !containNumber) ||
      (containNumber && !containLetters && !containSymbol)
    ) {
      //判断是否是弱类型

      return 1;
    } else if (!containLetters && !containNumber && !containSymbol) {
      //是否是这样的类型
      return 0;
    } else {
      //是否是中等类型

      return 2;
    }
  };
  render() {
    const { UIState, DataState } = this.props;
    const data = {
      userName: "康欣",
      userImg:
        "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
      Gende: "男",
      userText: "学如逆水行舟，不进则退",
      userID: "20170025444",
      userGrade: "一年级",
      userClass: "1班",
      userIDCard: "",
      userPhone: "15626248624",
      userMail: "1519406168@qq.com",
      userAddress: "蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团",
    };
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
    return (
      <div className="Parents">
        <div className="Parents-box">
          <div className="Parents-top">
            <span className="top-tips">
              <span className="tips menu39 ">家长账号管理</span>
            </span>
            <span
              style={{
                float: "right",
                fontSize: "14px",
                color: "#999",
                lineHeight: "37px",
              }}
            >
              注:家长账号由学生账号一对一自动生成
            </span>
            {/* <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>家长注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddParents}>添加家长</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportParents' replace>导入家长</Link>
                        </div> */}
          </div>
          <div className="Parents-hr"></div>
          <div className="Parents-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                onChange={this.ParentsDropMenu}
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
                disabled={
                  this.state.firstSelect.value !== 0 &&
                  this.state.secondList.length > 1
                    ? false
                    : true
                }
                dropSelectd={
                  this.state.secondList.length > 1
                    ? this.state.secondSelect
                    : {
                        value: 0,
                        title:
                          this.state.firstSelect.value === 0
                            ? "全部专业"
                            : "暂无专业",
                      }
                }
                dropList={this.state.secondList}
                onChange={this.ParentsDropMenuSecond}
              ></DropDown>
              <DropDown
                ref="dropMenuThird"
                width={120}
                height={240}
                // style={{
                //   display:
                //     this.state.secondSelect.value !== 0 ? "block" : "none",
                // }}
                title={"年级班级:"}
                style={{ marginLeft: "70px" }}
                dropSelectd={this.state.thirdSelect}
                dropList={GradeList}
                onChange={this.ParentsDropMenuThird}
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
                  this.state.thirdSelect.value !== 0 &&
                  this.state.fourthList.length > 1
                    ? false
                    : true
                }
                dropSelectd={
                  this.state.fourthList.length > 1
                    ? this.state.fourthSelect
                    : {
                        value: 0,
                        title:
                          this.state.firstSelect.value !== 0 &&
                          this.state.secondSelect.value !== 0 &&
                          this.state.thirdSelect.value !== 0
                            ? "暂无班级"
                            : "全部班级",
                      }
                }
                dropList={this.state.fourthList}
                onChange={this.ParentsDropMenuFourth}
              ></DropDown>
              {/* <DropDown
                ref="dropMenuFirst"
                onChange={this.ParentsDropMenu}
                width={120}
                title="班级："
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.GradeClassMsg.returnData
                    ? DataState.GradeClassMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                ref="dropMenuSecond"
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.ParentsDropMenuSecond}
              ></DropDown> */}
              <Search
                placeHolder="请输入家长编号或姓名进行搜索..."
                onClickSearch={this.ParentsSearch}
                Value={this.state.searchValue}
                onChange={this.onChangeSearch.bind(this)}
                CancelBtnShow={this.state.CancelBtnShow}
                onCancelSearch={this.onCancelSearch}
                width={270}
                height={30}
              ></Search>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                <div>
                  <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={this.state.checkedList}
                    onChange={this.onCheckBoxGroupChange.bind(this)}
                  >
                    {DataState.GradeParentsPreview.newList instanceof Array &&
                    DataState.GradeParentsPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        columns={this.state.columns}
                        pagination={false}
                        loading={UIState.AppLoading.TableLoading}
                        onChange={this.onTableChange.bind(this)}
                        dataSource={DataState.GradeParentsPreview.newList}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y" ||
                          this.state.firstSelect.value !== 0
                            ? "暂无符合条件的家长账号"
                            : "暂无家长账号"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.GradeParentsPreview.Total ? (
                    <div style={{ display: "inline-block" }}>
                      <CheckBox
                        style={{
                          display:
                            DataState.GradeParentsPreview.Total === 0
                              ? "none"
                              : "inline-block",
                        }}
                        className="checkAll-box"
                        // type="gray"
                        onChange={this.OnCheckAllChange}
                        checked={this.state.checkAll}
                      >
                        <span className="checkAll-title">全选</span>
                      </CheckBox>
                      <Button
                        onClick={this.onChangePwdAllClick}
                        className="changePwdAll"
                        color="blue"
                      >
                        批量重置密码
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      pageSize={this.state.pageSize}
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      hideOnSinglePage={
                        DataState.GradeParentsPreview.Total === 0 ? true : false
                      }
                      current={this.state.pagination}
                      // hideOnSinglepage={true}
                      total={DataState.GradeParentsPreview.Total}
                      onChange={this.onPagiNationChange}
                      // showTotal={(total, range) => `共${DataState.GradeParentsPreview.Total/10} 页 `}
                    ></PagiNation>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        {/* <Modal
                    ref='handleParentsMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑家长'
                    visible={this.state.studentModalVisible}
                    onOk={this.handleParentsModalOk}
                    onCancel={this.handleParentsModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
        {/* <Modal
                    ref='ParentsChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.ParentsChangeMadalVisible}
                    onOk={this.ParentsChangeMadalOk}
                    onCancel={this.ParentsChangeMadalCancel}
                >
                    <div className='modal-studentChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <ParentsChangeRecord data={''}></ParentsChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加家长'}
                    visible={this.state.addParentsModalVisible}
                    onOk={this.handleAddParentsModalOk}
                    onCancel={this.handleAddParentsModalCancel}
                >
                    <EditModal type='student' userKey={this.state.userKey}></EditModal>
                </Modal> */}
        <DetailsModal
          ref="ParentsDetailsMsgModal"
          visible={this.state.ParentsDetailsMsgModalVisible}
          onOk={this.ParentsDetailsMsgModalOk}
          onCancel={this.ParentsDetailsMsgModalCancel}
          data={DataState.GetUserMsg}
          type="parents"
        ></DetailsModal>
        {/* <AntdModal
                    ref='changePwdMadal'
                    
                    footer={null}
                    title='重置密码'
                    visible={this.state.ChangePwdMadalVisible}
                    onOk={this.ChangePwdMadalOk}
                    onCancel={this.ChangePwdMadalCancel}
                >
                    <div>

                    </div>
                </AntdModal> */}
        {/* 提示框 */}
        <Alert
          show={this.state.ChangePwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={(e) => e.parentNode}
              >
                <Input
                  onBlur={this.onPwdBlur.bind(this)}
                  size="small"
                  onChange={this.onPwdchange.bind(this)}
                  style={{ width: 120 + "px" }}
                  value={this.state.defaultPwd}
                ></Input>
              </Tips>
              <div
                className="PwdStrong"
                style={{ display: this.state.PwdStrong ? "block" : "none" }}
              >
                <span className="strongTips">密码强度：</span>
                <span className="pwd-box">
                  <span
                    className={`color-first-${this.state.PwdStrong} box-first `}
                  ></span>
                  <span
                    className={`color-second-${this.state.PwdStrong} box-second`}
                  ></span>
                  <span
                    className={`color-third-${this.state.PwdStrong} box-third`}
                  ></span>
                </span>
                <span
                  className={`strongTips tips-color-${this.state.PwdStrong} `}
                >
                  {this.state.PwdStrong === 1
                    ? "弱"
                    : this.state.PwdStrong === 2
                    ? "中"
                    : this.state.PwdStrong === 3
                    ? "强"
                    : ""}
                </span>
              </div>
            </div>
          }
          title={
            this.state.ChangePwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                <span
                  title={
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  )
                </span>{" "}
                的密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onPwdchangeOk.bind(this)}
          onCancel={this.onPwdchangeClose}
          onClose={this.onPwdchangeClose}
        ></Alert>
        {/* 批量重置 */}
        <Alert
          show={this.state.ChangeAllPwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={(e) => e.parentNode}
              >
                <Input
                  onBlur={this.onAllPwdBlur.bind(this)}
                  size="small"
                  onChange={this.onAllPwdchange.bind(this)}
                  style={{ width: 120 + "px" }}
                  value={this.state.defaultPwd}
                ></Input>
              </Tips>
              <div
                className="PwdStrong"
                style={{ display: this.state.PwdStrong ? "block" : "none" }}
              >
                <span className="strongTips">密码强度：</span>
                <span className="pwd-box">
                  <span
                    className={`color-first-${this.state.PwdStrong} box-first `}
                  ></span>
                  <span
                    className={`color-second-${this.state.PwdStrong} box-second`}
                  ></span>
                  <span
                    className={`color-third-${this.state.PwdStrong} box-third`}
                  ></span>
                </span>
                <span
                  className={`strongTips tips-color-${this.state.PwdStrong} `}
                >
                  {this.state.PwdStrong === 1
                    ? "弱"
                    : this.state.PwdStrong === 2
                    ? "中"
                    : this.state.PwdStrong === 3
                    ? "强"
                    : ""}
                </span>
              </div>
            </div>
          }
          title={
            this.state.ChangeAllPwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                {/* <span
                  title={
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.GradeParentsPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  )
                </span>{" "}
                的 */}
                密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onAllPwdchangeOk.bind(this)}
          onCancel={this.onAllPwdchangeClose}
          onClose={this.onAllPwdchangeClose}
        ></Alert>
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
export default connect(mapStateToProps)(Parents);
