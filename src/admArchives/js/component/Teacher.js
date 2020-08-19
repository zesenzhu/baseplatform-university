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
import UpUIState from "../actions/UpUIState";
import UpDataState from "../actions/UpDataState";
// import name from '../../../common/js/public';
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";
import { Scrollbars } from "react-custom-scrollbars";
import HandleGroupModal from "./HandleGroupModal";
import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import EditGroupModal from "./EditGroupModal";
import StudentChangeRecord from "./StudentChangeRecord";
import "../../scss/Teacher.scss";

let { checkUrlAndPostMsg } = Public;

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
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
          colSpan: 0,
          width: 50,
          dataIndex: "UserImgs",
          render: (arr) => {
            return (
              <div className="name-content">
                {/* <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.UserImg}
                ></img> */}
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{
                    width: "47px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.UserImg}) no-repeat center center / 47px`,
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
          title: "工号",
          align: "center",
          dataIndex: "UserID",
          key: "UserID",
          width: 100,
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
          dataIndex: "Gender",
          width: 60,
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
          title: "所属教研室",
          width: 170,
          align: "center",
          key: "GroupMsg",
          dataIndex: "GroupMsg",
          render: (arr) => {
            return (
              <span
                title={
                  arr.College || arr.Group
                    ? (arr.College ? arr.College : "--") +
                      ">" +
                      (arr.Group ? arr.Group : "--")
                    : "--"
                }
                className="SubjectName"
              >
                {arr.College || arr.Group
                  ? (arr.College ? arr.College : "--") +
                    ">" +
                    (arr.Group ? arr.Group : "--")
                  : "--"}
              </span>
            );
          },
        },
        {
          title: "职称",
          width: 90,
          align: "center",
          key: "Titles",
          dataIndex: "Titles",
          render: (Titles) => {
            return (
              <span title={Titles.TitleName} className="Title">
                {Titles.TitleName ? Titles.TitleName : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 232,
          key: "handleMsg",
          dataIndex: "handleMsg",
          render: (handleMsg) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.TeacherEdit.bind(this, handleMsg)}
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
                    onClick={this.TeacherChange.bind(this, handleMsg)}
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
      TeacherModalVisible: false,
      userKey: 0,
      TeacherChangeKey: 0,
      TeacherChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      TeacherDetailsMsgModalVisible: false,
      addTeacherModalVisible: false,
      secondList: [{ value: 0, title: "全部教研室" }],
      firstList: [{ value: 0, title: "全部学院" }],
      firstSelect: { value: 0, title: "全部学院" },
      secondSelect: { value: 0, title: "全部教研室" },
      selectSubject: { value: "all", title: "全部学科" },
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      sortType: "",
      sortFiled: "",
      searchWord: "",
      teacherChangeUserLog: {},
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
    window.TeacherCancelSearch = this.TeacherDropMenu.bind(this, {
      value: 0,
      title: "全部学院",
    });
  }
  TeacherCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
  };
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState, dispatch } = nextProps;
    let SubjectTeacherPreview = DataState.SubjectTeacherPreview;
    let College = DataState.SubjectTeacherMsg.College;
    let OldCollege = this.props.DataState.SubjectTeacherMsg.College;
    let Group = DataState.SubjectTeacherMsg.Group;
    let firstList = this.state.firstList;
    let secondList = this.state.secondList;
    let userType = this.state.userType;
    let len = College.length;
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    let ID = pathArr[3];
    // console.log(secondList,group, Group[DataState.LoginUser.CollegeID]);
    let college = this.state.firstSelect;

    // console.log(
    //   firstList,secondList,
    //   Public.comparisonObject(College, OldCollege),
    //   OldCollege,
    //   College
    // );
    if (
      userType &&
      (!secondList ||
        (secondList instanceof Array && secondList.length <= 1) ||
        (College.length > 1 &&
          !Public.comparisonObject(College, OldCollege) &&
          // userType &&
          DataState.LoginUser.CollegeID))
    ) {
      let group = { value: 0, title: "全部教研室" };
      if (ID !== "all") {
        Group[DataState.LoginUser.CollegeID] instanceof Array &&
          Group[DataState.LoginUser.CollegeID].map((child) => {
            if (child.value === ID) {
              group = child;
            }
          });
        // dispatch({
        //   type: actions.UpDataState.SET_SUBJECTID,
        //   Group: group,
        //   College: {
        //     value: DataState.LoginUser.CollegeID,
        //     title: DataState.LoginUser.CollegeName,
        //   },
        // });
      }

      this.setState({
        secondList: Group[DataState.LoginUser.CollegeID],
        secondSelect: group,
      });
    } else if (
      !userType &&
      (!firstList ||
        (firstList instanceof Array && firstList.length <= 1) ||
        (College.length > 1 && !Public.comparisonObject(College, OldCollege)))
    ) {
      if (ID !== "all") {
        College.map((child) => {
          if (child.value === ID) {
            college = child;
          }
        });
        // console.log(College,ID,college)
        // for (let key in College) {
        //   if (College[key].value === ID) {
        //     college = College[key];
        //   }
        // }
        // dispatch({ type: actions.UpDataState.SET_SUBJECTID, College: college?college: { value: 0, title: "全部学院" },Group : {
        //   value: 0,
        //   title: "全部教研室"
        // } });
      }
      // console.log(Group);
      if (college.value !== 0) {
        this.setState({
          firstSelect: college,
          secondList: Group[college.value],
        });
      }
      // console.log(college, College);
      this.setState({
        firstList: College,

        // secondSelect: group,
      });
    }
    if (!userType && this.state.secondSelect.value !== 0) {
      let GroupSelect = true;
      let haveGroup = false;
      Group[this.state.firstSelect.value] instanceof Array &&
        Group[this.state.firstSelect.value].map((child, index) => {
          if (child.value === this.state.secondSelect.value) {
            haveGroup = true;
          } else if (
            !haveGroup &&
            index === Group[this.state.firstSelect.value].length - 1
          ) {
            GroupSelect = false;
          }
        });
      // console.log(
      //   GroupSelect,
      //   Group,
      //   this.state.firstSelect,
      //   Group[this.state.firstSelect.value],
      //   this.state.secondSelect
      // );
      if (!GroupSelect) {
        this.setState({
          secondSelect: { value: 0, title: "全部教研室" },
        });
        dispatch(
          actions.UpDataState.GetTeacherToPage_univ(
            "/GetTeacherToPage_univ?SchoolID=" +
              this.state.userMsg.SchoolID +
              "&PageIndex=0&PageSize=10" +
              this.state.sortType +
              this.state.sortFiled +
              (this.state.firstSelect.value !== 0
                ? "&collegeID=" + this.state.firstSelect.value
                : ""),
            this.state.firstSelect
          )
        );
      }
    }
    this.setState({
      pagination: DataState.SubjectTeacherPreview.pageIndex + 1,
    });
    // let selectSubject = SubjectTeacherPreview.Subject || {
    //   value: "all",
    //   title: "全部学科"
    // };
    // console.log(SubjectTeacherPreview.Subject);
    // this.setState({
    //   selectSubject: selectSubject,
    //   pagination: Number(SubjectTeacherPreview.pageIndex) + 1
    // });
    // dispatch(
    //   actions.UpDataState.GetTeacherToPage_univ(
    //     "/GetTeacherToPage_univ?SchoolID=" +
    //       this.state.userMsg.SchoolID +
    //       "&SubjectIDs=" +
    //       selectSubject.value +
    //       "&PageIndex=0&PageSize=10" +
    //       this.state.sortType +
    //       this.state.sortFiled,
    //       selectSubject
    //   )
    // );
  }
  componentWillMount() {}

  TeacherDropMenu = (e) => {
    const { dispatch, DataState } = this.props;
    console.log(e);
    if (e.value !== 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        searchValue: "",
        keyword: "",
        // pagination: 1,
        CancelBtnShow: "n",
        secondSelect: { value: 0, title: "全部教研室" },
        secondList: DataState.SubjectTeacherMsg.Group[e.value],
      });
      dispatch(
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortType +
            this.state.sortFiled +
            "&collegeID=" +
            e.value,
          e
        )
      );
      // dispatch(
      //   actions.UpDataState.GetTeacherToPage_univ(
      //     "/GetTeacherToPage_univ?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&SubjectIDs=" +
      //       e.value +
      //       "&PageIndex=0&PageSize=10" +
      //       this.state.sortType +
      //       this.state.sortFiled,
      //     e
      //   )
      // );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        searchValue: "",
        keyword: "",
        // pagination: 1,
        CancelBtnShow: "n",
        secondSelect: { value: 0, title: "全部教研室" },
        secondList: [{ value: 0, title: "全部教研室" }],
      });
      dispatch(
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };

  SecondDropMenu = (e) => {
    const { dispatch, DataState } = this.props;
    if (e.value !== 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        keyword: "",
        // pagination: 1,
        CancelBtnShow: "n",
      });
      dispatch(
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortType +
            this.state.sortFiled +
            "&collegeID=" +
            this.state.firstSelect.value +
            "&GroupID=" +
            e.value,
          this.state.firstSelect,
          e
        )
      );
      // dispatch(
      //   actions.UpDataState.GetTeacherToPage_univ(
      //     "/GetTeacherToPage_univ?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&SubjectIDs=" +
      //       e.value +
      //       "&PageIndex=0&PageSize=10" +
      //       this.state.sortType +
      //       this.state.sortFiled,
      //     e
      //   )
      // );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        keyword: "",
        // pagination: 1,
        CancelBtnShow: "n",
      });
      dispatch(
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortType +
            this.state.sortFiled +
            "&collegeID=" +
            this.state.firstSelect.value,
          this.state.firstSelect
        )
      );
    }
  };
  TeacherSearch = (e) => {
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
          title: "输入的工号或姓名格式不正确",
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
      CancelBtnShow: "y",
      searchWord: e.value,
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.GetTeacherToPage_univ(
        "/GetTeacherToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&PageSize=10&keyword=" +
          e.value +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value
            ? "&GroupID=" + this.state.secondSelect.value
            : ""),
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };

  onSelectChange = (e) => {
    //this.setState({ selectedRowKeys });
  };

  TeacherEdit = (e) => {
    const { dispatch } = this.props;

    dispatch(
      actions.UpDataState.GetCollegeGroup_Univ(
        "/GetCollegeGroup_Univ?schoolID=" + this.state.userMsg.SchoolID,
        false
      )
    );
    this.setState({
      TeacherModalVisible: true,
      userKey: e.key,
    });
  };

  TeacherChange = (e) => {
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SubjectTeacherPreview.newList[e.key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "teacher"));
    this.setState({
      teacherChangeUserLog:
        DataState.SubjectTeacherPreview.newList[e.key].Others,
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = (e) => {
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SubjectTeacherPreview.keyList,
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
    const { dispatch } = this.props;

    // postData('http://192.168.2.9:8082/Schedule/api/SetSubstituteTeacher', {
    //     Type:0,
    //     schooID: "s0003",
    //     Item:'',
    //     TeacherID1:'T0002',
    //     TeacherID2:'T0003'
    // }, 2, 'json').then(res => {
    //     return res.json()
    // }).then(json => {
    //     if (json.StatusCode !== 200) {
    //         dispatch(actions.UpUIState.showErrorAlert({
    //             type: 'btn-error',
    //             title: json.Message,
    //             ok: this.onAppAlertOK.bind(this),
    //             cancel: this.onAppAlertCancel.bind(this),
    //             close: this.onAppAlertClose.bind(this)
    //         }));
    //     } else if (json.StatusCode === 200) {

    //         this.setState({
    //             TeacherModalVisible: false
    //         })
    //         dispatch(actions.UpDataState.GetTeacherToPage_univ('/GetTeacherToPage_univ?SchoolID=school1&SubjectIDs=all&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));

    //     }
    // });
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.SubjectTeacherPreview.keyList.length
          ? true
          : false,
    });
  };
  handleTeacherModalOk = (e) => {
    // console.log(e)
    let url = "/EditTeacher_univ";
    const { DataState, dispatch, UIState } = this.props;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let picObj = DataState.GetPicUrl.picObj;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }
    //用户ID必填
    if (changeTeacherMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeTeacherMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeTeacherMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //职称必选
    if (changeTeacherMsg.titleID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          TitleIDVisible: true,
        })
      );
      haveMistake = true;
    }
    //学科存在
    let SubjectListChange =
      DataState.SubjectTeacherMsg.returnData.SubjectListChange;
    let isSubject = false;
    SubjectListChange.map((child) => {
      typeof changeTeacherMsg.subjectIDs === "string" &&
        changeTeacherMsg.subjectIDs.split(",").map((subjectID) => {
          if (child.value === subjectID) {
            isSubject = true;
          }
        });
    });

    //学科必选
    if (changeTeacherMsg.subjectIDs === "" || !isSubject) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          changeSubjectTipsVisible: true,
        })
      );
      haveMistake = true;
    }

    if (haveMistake) {
      return;
    }
    // console.log(visible)
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教师信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy_univ + url,
          {
            ...changeTeacherMsg,
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
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Message,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                TeacherModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.GetTeacherToPage_univ(
                  "/GetTeacherToPage_univ?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=10" +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled +
                    (this.state.firstSelect.value !== 0
                      ? "&collegeID=" + this.state.firstSelect.value
                      : "") +
                    (this.state.secondSelect.value
                      ? "&GroupID=" + this.state.secondSelect.value
                      : ""),
                  this.state.firstSelect,
                  this.state.secondSelect
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
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
  //
  handleTeacherModalCancel = (e) => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    this.setState({
      TeacherModalVisible: false,
    });
  };
  //添加教师
  handleAddTeacherModalOk = (e) => {
    // console.log(e);
    let url = "/AddTeacher_univ";
    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }
    //用户ID必填
    if (changeTeacherMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeTeacherMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeTeacherMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //学院必选
    if (changeTeacherMsg.CollegeID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          CollegeTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //教研室必选
    if (changeTeacherMsg.GroupID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GroupTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //职称必选
    if (changeTeacherMsg.titleID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          TitleIDVisible: true,
        })
      );
      haveMistake = true;
    }
    //学科存在
    let SubjectListChange =
      DataState.SubjectTeacherMsg.returnData.SubjectListChange;
    let isSubject = false;
    SubjectListChange.map((child) => {
      typeof changeTeacherMsg.subjectIDs === "string" &&
        changeTeacherMsg.subjectIDs.split(",").map((subjectID) => {
          if (child.value === subjectID) {
            isSubject = true;
          }
        });
    });

    //学科必选
    if (changeTeacherMsg.subjectIDs === "" || !isSubject) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          changeSubjectTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教师信息没有发生改变",
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
            ...changeTeacherMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              // console.log(json.Data)
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                addTeacherModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.GetTeacherToPage_univ(
                  "/GetTeacherToPage_univ?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=10" +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled +
                    (this.state.firstSelect.value !== 0
                      ? "&collegeID=" + this.state.firstSelect.value
                      : "") +
                    (this.state.secondSelect.value
                      ? "&GroupID=" + this.state.secondSelect.value
                      : ""),
                  this.state.firstSelect,
                  this.state.secondSelect
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleAddTeacherModalCancel = (e) => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addTeacherModalVisible: false,
    });
  };
  TeacherChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };
  TeacherChangeMadalCancel = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList);
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的教师",
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
          title: "确定删除勾选的教师吗？",
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
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteTeacher_univ";
    let checkList = this.state.checkedList;
    let Total = DataState.SubjectTeacherPreview.Total;

    let dataList = DataState.SubjectTeacherPreview.newList;
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
      2,
      "urlencoded",
      false,
      false
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          let id = [];
          let name = [];
          json.Data instanceof Array &&
            json.Data.map((child) => {
              id.push(child.UserID);
              name.push(child.UserName + "（" + child.UserID + "）");
            });
          if (json.ErrCode === -2) {
            // UserIDList.join()

            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: "工号" + id.join("、") + "的教师不存在",
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          } else if (json.ErrCode === -3 || json.ErrCode === -4) {
            // UserIDList.join()
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: name.join("、") + "有正在任课的班级，不允许删除",
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          } else {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: json.Msg,
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          }
        } else if (json.StatusCode === 200) {
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
          dispatch(
            actions.UpDataState.GetTeacherToPage_univ(
              "/GetTeacherToPage_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                pagination +
                "&PageSize=10" +
                this.state.keyword +
                this.state.sortType +
                this.state.sortFiled +
                (this.state.firstSelect.value !== 0
                  ? "&collegeID=" + this.state.firstSelect.value
                  : "") +
                (this.state.secondSelect.value
                  ? "&GroupID=" + this.state.secondSelect.value
                  : ""),
              this.state.firstSelect,
              this.state.secondSelect
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });
        }
      });
  };
  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;
    // console.log(this.state.selectSubject)
    this.setState({
      checkedList: [],
      checkAll: false,
      // pagination: e
    });
    dispatch(
      actions.UpDataState.GetTeacherToPage_univ(
        "/GetTeacherToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          (e - 1) +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value
            ? "&GroupID=" + this.state.secondSelect.value
            : ""),
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
    // this.setState({
    //   checkedList: [],
    //   checkAll: false,
    //   // pagination: e
    // });
  };
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      TeacherDetailsMsgModalVisible: true,
      detailData: DataState.SubjectTeacherPreview.pensonalList[key],
    });
  };
  TeacherDetailsMsgModalOk = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false,
    });
  };
  TeacherDetailsMsgModalCancel = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false,
    });
  };
  onAddTeacher = (e) => {
    // console.log(e);
    const { dispatch } = this.props;
    dispatch(
      actions.UpDataState.getSubjectTeacherMsg_univ(
        "/GetSubject_univ?schoolID=" + this.state.userMsg.SchoolID
      )
    );
    dispatch(
      actions.UpDataState.GetCollegeGroup_Univ(
        "/GetCollegeGroup_Univ?schoolID=" + this.state.userMsg.SchoolID,
        false
      )
    );
    this.setState({
      addTeacherModalVisible: true,
      userKey: "add",
    });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };

  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // console.log(sorter)
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
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageSize=10&" +
            sortType +
            this.state.keyword +
            (this.state.firstSelect.value !== 0
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value
              ? "&GroupID=" + this.state.secondSelect.value
              : ""),
          this.state.firstSelect,
          this.state.secondSelect
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
        actions.UpDataState.GetTeacherToPage_univ(
          "/GetTeacherToPage_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10" +
            this.state.keyword +
            (this.state.firstSelect.value !== 0
              ? "&collegeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value
              ? "&GroupID=" + this.state.secondSelect.value
              : ""),
          this.state.firstSelect,
          this.state.secondSelect
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
      actions.UpDataState.GetTeacherToPage_univ(
        "/GetTeacherToPage_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.firstSelect.value !== 0
            ? "&collegeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value
            ? "&GroupID=" + this.state.secondSelect.value
            : ""),
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };

  // 教研室
  editGroupOk = () => {
    const { UIState, DataState, dispatch } = this.props;
    dispatch({ type: actions.UpUIState.GROUP_MODAL_CLOSE });
  };
  editGroupCancel = () => {
    const { UIState, DataState, dispatch } = this.props;
    dispatch({ type: actions.UpUIState.GROUP_MODAL_CLOSE });
  };
  onAddGroup = () => {
    const { UIState, DataState, dispatch } = this.props;
    dispatch({ type: actions.UpUIState.GROUP_MODAL_OPEN });
  };
  EditGroupOk = () => {
    const { UIState, DataState, dispatch } = this.props;
    let url = "/EditGroup_Univ";

    let { Group, College } = DataState.EditGroupMsg;
    if (!College.title) {
      return;
    }
    if (Group.title === "") {
      dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });

      dispatch({
        type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
        data: {
          inputTips: "教研室名称不能为空",
        },
      });
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(Group.title)) {
        dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

        let isChong = false;
        DataState.SubjectTeacherMsg.College.map((child, key) => {
          if (
            !(DataState.SubjectTeacherMsg.Group[child.value] instanceof Array)
          )
            DataState.SubjectTeacherMsg.Group[child.value].map(
              (group, index) => {
                if (group.title === Group.title) {
                  isChong = true;
                }
              }
            );
        });

        if (isChong) {
          //有同名
          dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });
          dispatch({
            type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
            data: {
              inputTips: "该学院下已存在同名教研室",
            },
          });
        } else {
          //向后台请求添加教研室的接口
          postData(
            CONFIG.UserInfoProxy_univ + url,
            {
              CollegeID: DataState.EditGroupMsg.College.value,
              GroupName: DataState.EditGroupMsg.Group.title,
              GroupID: DataState.EditGroupMsg.Group.value,
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

                dispatch(
                  actions.UpDataState.GetCollegeGroup_Univ(
                    "/GetCollegeGroup_Univ?schoolID=" +
                      this.state.userMsg.SchoolID,
                    false
                  )
                );
                dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

                dispatch({ type: actions.UpUIState.EDIT_GROUP_MODAL_CLOSE });
              }
            });
        }
      } else {
        dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });
        dispatch({
          type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
          data: {
            inputTips:
              "教研室名称应由1-20位的汉字、字母、数字以及括号组成，建议以学院为前缀",
          },
        });
      }
    }
  };
  EditGroupCancel = () => {
    const { UIState, DataState, dispatch } = this.props;
    dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

    dispatch({ type: actions.UpUIState.EDIT_GROUP_MODAL_CLOSE });
  };
  addGroupOk = () => {
    const { UIState, DataState, dispatch } = this.props;
    let url = "/AddGroup_Univ";

    let { Group, College } = DataState.EditGroupMsg;
    if (!College.title) {
      return;
    }
    if (Group.title === "") {
      dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });

      dispatch({
        type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
        data: {
          inputTips: "教研室名称不能为空",
        },
      });
    } else {
      //输入合法和不合法的情况
      if (this.UserComm_CheckGroupName(Group.title)) {
        dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

        let isChong = false;
        DataState.SubjectTeacherMsg.College.map((child, key) => {
          if (
            !(DataState.SubjectTeacherMsg.Group[child.value] instanceof Array)
          )
            DataState.SubjectTeacherMsg.Group[child.value].map(
              (group, index) => {
                if (group.title === Group.title) {
                  isChong = true;
                }
              }
            );
        });

        if (isChong) {
          //有同名
          dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });
          dispatch({
            type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
            data: {
              inputTips: "该学院下已存在同名教研室",
            },
          });
        } else {
          //向后台请求添加教研室的接口
          postData(
            CONFIG.UserInfoProxy_univ + url,
            {
              CollegeID: DataState.EditGroupMsg.College.value,
              GroupName: DataState.EditGroupMsg.Group.title,
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

                dispatch(
                  actions.UpDataState.GetCollegeGroup_Univ(
                    "/GetCollegeGroup_Univ?schoolID=" +
                      this.state.userMsg.SchoolID,
                    false
                  )
                );
                dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

                dispatch({ type: actions.UpUIState.ADD_GROUP_MODAL_CLOSE });
              }
            });
        }
      } else {
        dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_OPEN });
        dispatch({
          type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
          data: {
            inputTips:
              "教研室名称应由1-20位的汉字、字母、数字以及括号组成，建议以学院为前缀",
          },
        });
      }
    }
  };
  addGroupCancel = () => {
    const { UIState, DataState, dispatch } = this.props;
    // console.log('sss')
    dispatch({ type: UpUIState.EDIT_GROUP_TIPS_VISIBLE_CLOSE });

    dispatch({ type: actions.UpUIState.ADD_GROUP_MODAL_CLOSE });
  };
  UserComm_CheckGroupName(strInput) {
    //用户群名称检测（学校、年级、班级、教师组、专家组）
    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      strInput
    );
  }

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
    return (
      <div className="Teacher">
        <div className="Teacher-box">
          <div className="Teacher-top">
            <span className="top-tips">
              <span className="tips menu33 ">教师档案管理</span>
            </span>
            <div className="top-nav">
            {!this.state.userType ? (
                <span
                  className="link"
                  style={{ cursor: "pointer" }}
                  onClick={this.onAddGroup}
                >
                  <span className="addGroup">教研室管理</span>
                </span>
              ) : (
                ""
              )}
              {!this.state.userType ? <span className="divide">|</span> : ""}
              <a
                className="link"
                // target="_blank"
                // to="/TeacherRegisterExamine"
                // replace
              >
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "教师注册审核",
                    "#/TeacherRegisterExamine/TeacherRegisterWillExamine"
                  )}
                  className="RegisterExamine"
                >
                  教师注册审核
                  <i
                    style={{
                      display: DataState.GetTeacherSignUpLog.WillData.Total
                        ? "inline-block"
                        : "none",
                    }}
                    className="have-red"
                  ></i>
                </span>
              </a>
              <span className="divide">|</span>
              
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddTeacher}
              >
                <span className="add">添加教师</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Teacher"
                // replace
              >
                <span onClick={this.onLinkClick.bind(
                  this,
                  "导入教师",
                  "#/ImportFile/Teacher"
                )} className="ImportFile">导入教师</span>
              </a>
            </div>
          </div>
          <div className="Teacher-hr"></div>
          <div className="Teacher-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                title="教研室："
                onChange={this.TeacherDropMenu.bind(this)}
                width={120}
                disabled={this.state.userType}
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={this.state.firstList}
              ></DropDown>
              <DropDown
                ref="dropMenuSecond"
                onChange={this.SecondDropMenu.bind(this)}
                width={120}
                height={240}
                style={{
                  display:
                    this.state.firstSelect.value === 0 ? "none" : "block",
                }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondList}
              ></DropDown>
              <div className="Search">
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
                    {" " + DataState.SubjectTeacherPreview.Total + " "}
                  </span>
                  人
                </span>
                <Search
                  placeHolder="请输入工号或姓名进行搜索..."
                  onClickSearch={this.TeacherSearch.bind(this)}
                  width={250}
                  height={30}
                  Value={this.state.searchValue}
                  onCancelSearch={this.onCancelSearch}
                  onChange={this.onChangeSearch.bind(this)}
                  CancelBtnShow={this.state.CancelBtnShow}
                ></Search>
              </div>
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
                    {DataState.SubjectTeacherPreview.newList instanceof Array &&
                    DataState.SubjectTeacherPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        columns={this.state.columns}
                        pagination={false}
                        loading={UIState.AppLoading.TableLoading}
                        dataSource={DataState.SubjectTeacherPreview.newList}
                        onChange={this.onTableChange.bind(this)}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y" ||
                          this.state.selectSubject.value !== "all"
                            ? "暂无符合条件的教师档案"
                            : "暂无教师档案"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.SubjectTeacherPreview.Total ? (
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
                      current={this.state.pagination}
                      hideOnSinglepage={true}
                      total={DataState.SubjectTeacherPreview.Total}
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
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0, height: "550px" }}
          type="1"
          title={"编辑教师"}
          visible={this.state.TeacherModalVisible}
          onOk={this.handleTeacherModalOk}
          onCancel={this.handleTeacherModalCancel}
        >
          {this.state.TeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0, height: "550px" }}
          type="1"
          title={"添加教师"}
          visible={this.state.addTeacherModalVisible}
          onOk={this.handleAddTeacherModalOk}
          onCancel={this.handleAddTeacherModalCancel}
        >
          {this.state.addTeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        {/* <Modal
          ref="TeacherChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={this.state.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
        >
          <div className="modal-TeacherChange">
            <div className="content-top">
              <img
                src={IconLocation}
                width="30"
                height="40"
                alt="icon-location"
              />
              <span className="top-text">毛峰的档案变更记录</span>
            </div>
            <div className="content">
              <TeacherChangeRecord data={""}></TeacherChangeRecord>
            </div>
          </div>
        </Modal> */}
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={UIState.AppModal.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
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
                  {this.state.teacherChangeUserLog.UserName}的档案变更记录
                </span>
              </div>
              <div className="content">
                <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                  {UIState.AppModal.TeacherChangeMadalVisible ? (
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
              style={{ top: "150px", position: "relative" }}
            ></Empty>
          )}
        </Modal>
        <DetailsModal
          ref="TeacherDetailsMsgModal"
          visible={this.state.TeacherDetailsMsgModalVisible}
          module={1}
          onOk={this.TeacherDetailsMsgModalOk}
          onCancel={this.TeacherDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="teacher"
        >
          <div className="modal-top"></div>
          <div className="modal-content"></div>
        </DetailsModal>
        {/* 提示框 */}
        <Modal
          type={1}
          title="教研室管理"
          visible={UIState.AppModal.GroupMadalVisible}
          mask={true}
          width={800}
          footer={null}
          bodyStyle={{ height: 400, padding: 0 }}
          className="editGroupModal"
          onOk={this.editGroupOk.bind(this)}
          onCancel={this.editGroupCancel.bind(this)}
        >
          {/*弹出层内容区域*/}

          <div className="ModalContent">
            <EditGroupModal></EditGroupModal>
          </div>
        </Modal>
        <Modal
          type={1}
          title="添加教研室"
          visible={UIState.AppModal.AddGroupMadalVisible}
          mask={true}
          width={400}
          bodyStyle={{ height: 130, padding: 0 }}
          className="editMajorModal"
          onOk={this.addGroupOk.bind(this)}
          onCancel={this.addGroupCancel.bind(this)}
        >
          <div className="HandleGroupModal">
            <HandleGroupModal type="add"></HandleGroupModal>
          </div>
        </Modal>
        <Modal
          type={1}
          title="编辑教研室"
          visible={UIState.AppModal.EditGroupMadalVisible}
          mask={true}
          width={400}
          bodyStyle={{ height: 130, padding: 0 }}
          className="editMajorModal"
          onOk={this.EditGroupOk.bind(this)}
          onCancel={this.EditGroupCancel.bind(this)}
        >
          <div className="HandleGroupModal">
            <HandleGroupModal type="edit"></HandleGroupModal>
          </div>
        </Modal>
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
export default connect(mapStateToProps)(Teacher);
