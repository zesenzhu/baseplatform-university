import React from "react";
import "../../scss/Leader.scss";
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
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import EditModal from "./EditModal";
import { Scrollbars } from "react-custom-scrollbars";

import Public from "../../../common/js/public";
import IconLocation from "../../images/icon-location.png";
import StudentChangeRecord from "./StudentChangeRecord";
import actions from "../actions";
let { checkUrlAndPostMsg } = Public;

class Leader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  {" "}
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
          dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                {/* <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.PhotoPath}
                ></img> */}
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
          title: "工号",
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
        //   title: "所属学院",
        //   align: "center",
        //   width: 100,
        //   key: "College",
        //   dataIndex: "College",
        //   render: (College) => {
        //     return (
        //       <span title={College.title} className="Position">
        //         {College.title ? College.title : "--"}
        //       </span>
        //     );
        //   },
        // },
        {
          title: "行政职务",
          align: "center",
          width: 100,
          key: "Position",
          dataIndex: "Position",
          render: (Position) => {
            return (
              <span title={Position} className="Position">
                {Position ? Position : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 252,
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderEdit.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderChange.bind(this, key)}
                  className="check-btn"
                >
                  查看变更记录
                </Button>
              </div>
            );
          },
        },
      ],
      checkedList: [],
      checkAll: false,
      userMsg: props.DataState.LoginUser,
      LeaderDetailsMsgModalVisible: false,
      sortType: "",
      sortFiled: "",
      leaderChangeUserLog: {},
      College: [{ value: 0, title: "全部学院" }],
      firstSelect:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? { value: -1, title: "全部领导" }
          : { value: 7, title: "学校领导" },
      collegeSelect: { value: 0, title: "全部学院" },
      initCollege: { value: 0, title: "全部学院" },
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
    window.LeaderCancelSearch = this.FirstDropMenu.bind(this, {
      value: -1,
      title: "全部领导",
    });
  }
  componentWillMount() {
    const { DataState } = this.props;
  }
  componentWillReceiveProps(nextProps) {
    let College = nextProps.DataState.CollegeMsg.College;
    let oldCollege = this.props.DataState.CollegeMsg.College;
    let { DataState } = nextProps;
    if (College !== oldCollege) {
      let firstSelect = { value: -1, title: "全部领导" };
      let collegeSelect;
      let College = DataState.CollegeMsg.College.slice();
      College[0] &&
        College[0].value !== 0 &&
        [{ value: 0, title: "全部学院" }].concat(College);
      if (this.state.userType) {
        //学院
        firstSelect = { value: 10, title: "学院领导" };
        collegeSelect = {
          value: DataState.LoginUser.CollegeID,
          title: DataState.LoginUser.CollegeName,
        };
      } else {
        firstSelect = { value: -1, title: "全部领导" };
        // firstSelect = { value: 7, title: "学校领导" };

        collegeSelect = { value: 0, title: "全部学院" };
      }
      // console.log(College, firstSelect, collegeSelect);
      this.setState({
        College: College,
        firstSelect,
        collegeSelect,
        initCollege: collegeSelect,
      });
    }
  }
  LeaderCancelSearch = () => {
    this.setState({
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
  };
  // 点击全选
  OnCheckAllChange = (e) => {
    // console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SchoolLeaderPreview.keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  // 点击多选组
  onCheckBoxGroupChange = (checkedList) => {
    const { DataState } = this.props;
    // console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.SchoolLeaderPreview.keyList.length
          ? true
          : false,
    });
  };
  // 点击删除全部
  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选领导",
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
          title: "确定删除所勾选的领导吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    }
  };
  // 提示弹窗事件
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
  // 删除全部
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteSchoolLeader_univ";
    let checkList = this.state.checkedList;
    let dataList = DataState.SchoolLeaderPreview.newList;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let UserIDListString = UserIDList.join();

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
            actions.UpDataState.GetSchoolLeader_univ(
              "/GetSchoolLeader_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&userType=" +
                this.state.firstSelect.value +
                "&collegeID=" +
                (this.state.userType
                  ? this.state.userMsg.CollegeID
                  : this.state.collegeSelect.value === 0
                  ? ""
                  : this.state.collegeSelect.value) +
                this.state.sortFiled +
                this.state.sortType
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });
        }
      });
  };

  // tableCulomn事件
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      LeaderDetailsMsgModalVisible: true,
      detailData: DataState.SchoolLeaderPreview.pensonalList[key],
    });
  };
  // 编辑记录
  LeaderChange = (key) => {
    // console.log(key)
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SchoolLeaderPreview.newList[key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "leader"));
    this.setState({
      leaderChangeUserLog: DataState.SchoolLeaderPreview.newList[key].Others,
    });
  };
  // 编辑领导
  LeaderEdit = (key) => {
    // console.log(key)
    const { dispatch } = this.props;
    this.setState({
      userKey: key,
    });
    dispatch(actions.UpUIState.HandleLeaderModalOpen());
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
      dispatch(
        actions.UpDataState.GetSchoolLeader_univ(
          "/GetSchoolLeader_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&userType=" +
            this.state.firstSelect.value +
            "&collegeID=" +
            (this.state.userType
              ? this.state.userMsg.CollegeID
              : this.state.collegeSelect.value === 0
              ? ""
              : this.state.collegeSelect.value) +
            "&sortFiled=" +
            sorter.columnKey +
            " &" +
            sortType
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
    } else if (sorter && !sorter.columnKey) {
      dispatch(
        actions.UpDataState.GetSchoolLeader_univ(
          "/GetSchoolLeader_univ?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&userType=" +
            this.state.firstSelect.value +
            "&collegeID=" +
            (this.state.userType
              ? this.state.userMsg.CollegeID
              : this.state.collegeSelect.value === 0
              ? ""
              : this.state.collegeSelect.value)
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: "",
      });
    }
  };
  // 用户详情弹窗事件
  LeaderDetailsMsgModalOk = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false,
    });
  };
  LeaderDetailsMsgModalCancel = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false,
    });
  };

  // 编辑事件
  handleLeaderModalOk = (e) => {
    let url = "/EditSchoolLeader_univ";

    const { DataState, dispatch, UIState } = this.props;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    let picObj = DataState.GetPicUrl.picObj;

    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    // console.log(initLeaderMsg,changeLeaderMsg,Public.comparisonObject(changeLeaderMsg, initLeaderMsg))
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "领导信息没有发生改变",
          // ok: this.onAppAlertOK.bind(this),
          // cancel: this.onAppAlertCancel.bind(this),
          // close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy_univ + url,
          {
            ...data,
            position: position.title,
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
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              // console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              dispatch(actions.UpUIState.HandleLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.GetSchoolLeader_univ(
                  "/GetSchoolLeader_univ?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&userType=" +
                    this.state.firstSelect.value +
                    "&collegeID=" +
                    (this.state.userType
                      ? this.state.userMsg.CollegeID
                      : this.state.collegeSelect.value === 0
                      ? ""
                      : this.state.collegeSelect.value) +
                    this.state.sortFiled +
                    this.state.sortType
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleLeaderModalCancel = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    dispatch(actions.UpUIState.HandleLeaderModalClose());
  };

  // 添加事件
  onAddLeader = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    this.setState({
      userKey: "add",
    });
    dispatch(actions.UpUIState.AddLeaderModalOpen());
  };
  handleAddLeaderModalOk = (e) => {
    // console.log(e)
    let url = "/AddSchoolLeader_univ";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        return;
      }
    }
    //用户ID必填
    if (changeLeaderMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeLeaderMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeLeaderMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //职务必选
    if (!changeLeaderMsg.position || changeLeaderMsg.position.value === -1) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          PositionTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    // 学院选择
    if (changeLeaderMsg.UserType === 10 && changeLeaderMsg.collegeID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          CollegeTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    // console.log(haveMistake)
    if (haveMistake) {
      return;
    }
    // console.log(visible,haveMistake)
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请填写领导信息",
          // ok: this.onAppAlertOK.bind(this),
          // cancel: this.onAppAlertCancel.bind(this),
          // close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;

        postData(
          CONFIG.UserInfoProxy_univ + url,
          {
            ...changeLeaderMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            position: position.title,
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
              // console.log(json.Data)
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
              dispatch(actions.UpUIState.AddLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              // console.log(this.state.userType
              //   ? this.state.userMsg.CollegeID
              //   : this.state.collegeSelect.value === 0
              //   ? ""
              //   : this.state.collegeSelect.value,this.state.userType)
              dispatch(
                actions.UpDataState.GetSchoolLeader_univ(
                  "/GetSchoolLeader_univ?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&userType=" +
                    this.state.firstSelect.value +
                    "&collegeID=" +
                    (this.state.userType
                      ? this.state.userMsg.CollegeID
                      : this.state.collegeSelect.value === 0
                      ? ""
                      : this.state.collegeSelect.value) +
                    this.state.sortFiled +
                    this.state.sortType
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
  handleAddLeaderModalCancel = (e) => {
    const { dispatch } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    dispatch(actions.UpUIState.AddLeaderModalClose());
  };

  LeaderChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });
  };
  LeaderChangeMadalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });
  };
  FirstDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // console.log(DataState.GradeClassMsg.Majors[e.value], e.value);
    // if (e.value !== 7) {
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
      collegeSelect: this.state.initCollege,
    });
    dispatch(
      actions.UpDataState.GetSchoolLeader_univ(
        "/GetSchoolLeader_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&userType=" +
          e.value +
          "&collegeID=" +
          // (e.value!==10?"":this.state.collegeSelect.value)+
          this.state.sortFiled +
          this.state.sortType
      )
    );
    dispatch(
      actions.UpDataState.setDropLeaderMsg({
        SchoolCollege: e.value === -1 ? { value: 7, title: "学校领导" } : e,
      })
    );
    dispatch(
      actions.UpDataState.setDropLeaderMsg({
        CollegeSelect: this.state.initCollege,
      })
    );

    // } else {
    //   this.setState({
    //     checkedList: [],
    //     checkAll: false,
    //     firstSelect: e,
    //     CancelBtnShow: "n",
    //     searchValue: "",
    //     // pagination: 1,
    //     keyword: "",
    //     collegeSelect: { value: 0, title: "全部学院" }
    //   });
    // }
  };
  SecondDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];

    //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
    //this.refs.dropMenuSecond.state.dropList = Classes;]
    this.setState({
      checkedList: [],
      checkAll: false,
      collegeSelect: e,
      CancelBtnShow: "n",
      searchValue: "",
      // pagination: 1,
      keyword: "",
    });
    dispatch(
      actions.UpDataState.GetSchoolLeader_univ(
        "/GetSchoolLeader_univ?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&userType=" +
          this.state.firstSelect.value +
          "&collegeID=" +
          (e.value === 0 ? "" : e.value) +
          this.state.sortFiled +
          this.state.sortType
      )
    );
    dispatch(actions.UpDataState.setDropLeaderMsg({ CollegeSelect: e }));
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  render() {
    const { UIState, DataState } = this.props;

    return (
      <div className="Leader">
        <div className="Leader-box">
          <div className="Leader-top">
            <span className="top-tips">
              <span className="tips menu35 ">领导档案管理</span>
            </span>
            <div className="top-nav">
              {/* <Link className='link' to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddLeader}
              >
                <span className="add">添加领导</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Leader"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "导入领导",
                  "#/ImportFile/Leader"
                )}
              >
                <span className="ImportFile">导入领导</span>
              </a>
            </div>
          </div>
          <div className="Leader-hr"></div>
          <div className="Leader-content">
            <div
              style={{
                display: "none",
              }}
              className="content-top"
            >
              <DropDown
                ref="dropMenuFirst"
                // title="学科："
                onChange={this.FirstDropMenu.bind(this)}
                width={120}
                // disabled={this.state.userType}
                style={{
                  display: !this.state.userType ? "block" : "none",
                }}
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={[
                  { value: -1, title: "全部领导" },

                  { value: 7, title: "学校领导" },
                  { value: 10, title: "学院领导" },
                ]}
              ></DropDown>
              <DropDown
                ref="dropMenuFirst"
                // title="学科："
                onChange={this.SecondDropMenu.bind(this)}
                width={120}
                // disabled={this.state.userType}
                style={{
                  display:
                    !this.state.userType && this.state.firstSelect.value === 10
                      ? "block"
                      : "none",
                }}
                height={240}
                dropSelectd={this.state.collegeSelect}
                dropList={this.state.College}
              ></DropDown>
            </div>
            <div className="content-render">
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
                  {DataState.SchoolLeaderPreview.newList instanceof Array &&
                  DataState.SchoolLeaderPreview.newList.length !== 0 ? (
                    <Table
                      className="table"
                      loading={UIState.AppLoading.TableLoading}
                      columns={this.state.columns}
                      pagination={false}
                      onChange={this.onTableChange.bind(this)}
                      dataSource={DataState.SchoolLeaderPreview.newList}
                    ></Table>
                  ) : (
                    <Empty
                      title={"暂无领导档案"}
                      type="3"
                      style={{ marginTop: "150px" }}
                    ></Empty>
                  )}
                </CheckBoxGroup>
                {DataState.SchoolLeaderPreview.Total > 0 ? (
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
              </Loading>
            </div>
          </div>
        </div>
        {/* 用户详情弹窗 */}
        <DetailsModal
          ref="LeaderDetailsMsgModal"
          visible={this.state.LeaderDetailsMsgModalVisible}
          module={1}
          onOk={this.LeaderDetailsMsgModalOk}
          onCancel={this.LeaderDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="leader"
        ></DetailsModal>
        {/* 模态框 */}
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0, height: "400px" }}
          type="1"
          title="编辑领导"
          visible={UIState.AppModal.handleLeaderModalVisible}
          onOk={this.handleLeaderModalOk}
          onCancel={this.handleLeaderModalCancel}
        >
          {UIState.AppModal.handleLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0, height: "400px" }}
          type="1"
          title={"添加领导"}
          visible={UIState.AppModal.addLeaderModalVisible}
          onOk={this.handleAddLeaderModalOk}
          onCancel={this.handleAddLeaderModalCancel}
        >
          {UIState.AppModal.addLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          footer={null}
          width={650}
          visible={UIState.AppModal.LeaderChangeMadalVisible}
          onOk={this.LeaderChangeMadalOk}
          onCancel={this.LeaderChangeMadalCancel}
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
                    {this.state.leaderChangeUserLog.UserName}的档案变更记录
                  </span>
                </div>
                <div className="content">
                  <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                    {UIState.AppModal.LeaderChangeMadalVisible ? (
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
                style={{ top: "150px", position: "relative",height:'411px' }}
              ></Empty>
            )}
          </Loading>
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
export default connect(mapStateToProps)(Leader);
