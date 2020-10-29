import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
  DetailsModal,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
import RegisterModel from '../RegisterModel'

import Temple from "../Temple";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;

class RegisterExamine extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "",
          key: "OrderNo",
          width: 66,
          align: "left",
          render: (key) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "normal" }}>
                  {key.Status === 0 ? (
                    <CheckBox
                      // type="gray"
                      value={key.key}
                    ></CheckBox>
                  ) : (
                    ""
                  )}
                  <span className="key-content">{key.OrderNo}</span>
                </label>
              </div>
            );
          },
        },
        {
          title: "注册时间",
          align: "center",
          width: 225,
          // dataIndex: "SignUpTime",
          key: "SignUpTime",
          sorter: true,
          render: (data) => {
            return (
              <div className="registerTime-content">
                <span title={data.SignUpTime} className="registerTime">
                  {data.SignUpTime ? data.SignUpTime : "--"}
                </span>
              </div>
            );
          },
        },
        // {
        //   title: "",
        //   align: "right",
        //   dataIndex: "UserName",
        //   colSpan: 0,
        //   key: "UserImg",
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
          // dataIndex: "UserName",
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
                  {arr.UserName}
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
          width: 210,
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
          width: 45,
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
          align: "center",
          width: 250,
          key: "MyGroup",
          // dataIndex: "data",
          render: (data) => {
            return (
              <span className="MyClass">
                <span
                  className="CollegeMajor"
                  title={
                    (data.CollegeName ? data.CollegeName : "--") +
                    ">" +
                    (data.GroupName ? data.GroupName : "--")
                  }
                >
                  {(data.CollegeName ? data.CollegeName : "--") +
                    ">" +
                    (data.GroupName ? data.GroupName : "--")}
                </span>{" "}
              </span>
            );
          },
        },
        // {
        //   title: "年级",
        //   align: "center",
        //   dataIndex: "Grade",
        //   width: 95,
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
        //   width: 155,
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
          title: "操作",
          align: "center",
          // dataIndex: "key",
          width: 170,
          // key: "Others",
          render: (data) => {
            return (
              <div className="handle-content">
                {data.Status === 0 ? (
                  <Button
                    color="blue"
                    type="default"
                    disabled={false}
                    onClick={this.onExamineClick.bind(this, data)}
                    className={`handle-btn `}
                  >
                    {"审核"}
                  </Button>
                ) : (
                  <span
                    title={
                      data.Status === 1
                        ? "审核通过"
                        : data.Status === 2
                        ? "审核未通过"
                        : "未审核"
                    }
                    className={`handle-tips `}
                  >
                    {data.Status === 1
                      ? "审核通过"
                      : data.Status === 2
                      ? "审核未通过"
                      : "未审核"}
                  </span>
                )}
              </div>
            );
          },
        },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      DataState: {
        CommonData: { ModalVisible },
      },
    } = nextProps;
  }
  componentDidMount() {}
  onExamineClick = (data) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        ExamineDetails: data.UserMsg,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        ExamineDetailsModalVisible: true,
      })
    );
  };
  onSelectStatusClick = (status) => {
    let { dispatch } = this.props;
    if (status === 0) {
      history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
    } else {
      history.push("/TeacherRegisterExamine/TeacherRegisterDidExamine");
    }
  };
  //学院选择
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        collegeID: e.value,
        collegeName: e.title,
        groupID: "",
        groupName: "",

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onGroupChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        groupID: e.value,
        groupName: e.title,

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };

  // 搜索
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        searchValue: e.target.value.trim(),
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onTeacherSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        keyword: e.value,
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
      },
    } = this.props;
    let Order = "";
    if (sorter.order === "descend") {
      Order = "DESC";
    } else if (sorter.order === "ascend") {
      Order = "ASC";
    }
    dispatch(
      CommonAction.SetRegisterExamineParams({
        sortType: Order,
        sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onShowSizeChange = (current, pageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        pageIndex: 0,
        pageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        pageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherSignUpLogToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
        MainData: {
          TeacherRegisterData: { List },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRegisterExamineParams({
        checkedList,
        checkAll: List.length === checkedList.length ? true : false,
      })
    );
  };
  onCheckAllChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { searchValue },
        },
        MainData: {
          TeacherRegisterData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.key);
    dispatch(
      CommonAction.SetRegisterExamineParams({
        checkedList: checkAll ? keyList : [],
        checkAll,
      })
    );
  };

  //通过
  UserExamineMadalOk = (data) => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { ExamineDetails },
        },
      },
    } = this.props;
    dispatch(
      MainAction.TeacherSignUpLogAudit({
        LogID: ExamineDetails.logID,
        Status: 1,
        fn: () => {
          dispatch(
            CommonAction.SetRegisterExamineParams({
              checkedList: [],
              checkAll: false,
            })
          );
          dispatch(MainAction.GetTeacherSignUpLogToPage({}));

          this.UserExamineMadalCancel();

          // dispatch(PublicAction.TableLoadingClose());
        },
      })
    );
  };
  //不通过
  UserExamineMadalFail = (data) => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { ExamineDetails },
        },
      },
    } = this.props;
    dispatch(
      MainAction.TeacherSignUpLogAudit({
        LogID: ExamineDetails.logID,
        Status: 2,
        fn: () => {
          dispatch(
            CommonAction.SetRegisterExamineParams({
              checkedList: [],
              checkAll: false,
            })
          );
          dispatch(MainAction.GetTeacherSignUpLogToPage({}));

          this.UserExamineMadalCancel();

          // dispatch(PublicAction.TableLoadingClose());
        },
      })
    );
  };
  UserExamineMadalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        ExamineDetailsModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetRegisterExamineParams({
        ExamineDetails: {},
      })
    );
  };
  // 批量通过
  onAgreeAll = (e) => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { checkedList },
        },
      },
    } = this.props;
    //console.log(this.state.checkedList)
    if (checkedList.length) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定通过所勾选的注册吗？",
          onOk: () => {
            dispatch(
              MainAction.TeacherSignUpLogAuditMulti({
                Status: 1,
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "审核成功",
                    })
                  );
                  dispatch(
                    CommonAction.SetRegisterExamineParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetTeacherSignUpLogToPage({}));
                },
              })
            );
          },
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要通过的注册",
        })
      );
    }
  };

  onRefuseAll = (e) => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          RegisterExamineParams: { checkedList },
        },
      },
    } = this.props;
    //console.log(this.state.checkedList)
    if (checkedList.length) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定不通过所勾选的注册吗？",
          onOk: () => {
            dispatch(
              MainAction.TeacherSignUpLogAuditMulti({
                Status: 2,
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "审核成功",
                    })
                  );
                  dispatch(
                    CommonAction.SetRegisterExamineParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetTeacherSignUpLogToPage({}));
                },
              })
            );
          },
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要不通过的注册",
        })
      );
    }
  };

  onPassQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let checkedList = this.state.checkedList;
    let StatusCodeCount = DataState.GetSignUpLog.newStatus;
    let logID = checkedList.map((child, index) => {
      return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg
        .logID;
    });
    let url = "/SignUpLogAuditMulti_univ";

    //console.log(StatusCodeCount)
    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: logID.join(),
        Status: 1,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());

          this.setState({
            checkAll: false,
            checkedList: [],
          });

          // dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCodeCount))
          dispatch(
            actions.UpDataState.setSignUpLogCountMsg(
              StatusCodeCount + logID.length
            )
          );
          //   if (this.state.firstSelect.value === 0) {
          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=" +
                this.state.pageSize +
                "&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                this.state.firstParam +
                this.state.secondParam +
                this.state.thirdParam +
                this.state.fourthParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
          if (
            window.opener &&
            window.opener.location.href.includes("/html/admArchives")
          ) {
            window.opener.location.reload();
          }
          //   } else if (this.state.secondSelect.value === 0)
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
          //           this.state.userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=" +
          // this.state.pageSize + "&status=0&gradeID=" +
          //           this.state.firstSelect.value
          //       )
          //     );
          //   else {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
          //           this.state.userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=" +
          // this.state.pageSize + "&status=0&gradeID=" +
          //           this.state.firstSelect.value +
          //           "&classID=" +
          //           this.state.secondSelect.value
          //       )
          //     );
          //   }
        }
      });
  };
  //批量不通过
  onFailQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let checkedList = this.state.checkedList;
    // console.log(checkedList, DataState);
    let logID = checkedList.map((child, index) => {
      // console.log(child);
      return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg
        .logID;
    });
    let StatusCodeCount = DataState.GetSignUpLog.newStatus;
    let url = "/SignUpLogAuditMulti_univ";

    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: logID.join(),
        Status: 2,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());

          this.setState({
            checkAll: false,
            checkedList: [],
          });
          // dispatch(actions.UpDataState.setSignUpLogCountMsg(StatusCodeCount + logID.length));
          dispatch(
            actions.UpDataState.setSignUpLogCountMsg(
              StatusCodeCount + logID.length
            )
          );
          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetTeacherSignUpLogToPage_univ?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=" +
                this.state.pageSize +
                "&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                this.state.firstParam +
                this.state.secondParam +
                this.state.thirdParam +
                this.state.fourthParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
          if (
            window.opener &&
            window.opener.location.href.includes("/html/admArchives")
          ) {
            window.opener.location.reload();
          }
        }
      });
  };
  render() {
    const {
      DataState: {
        MainData: {
          TeacherTree: { CollegeList, GroupList },
          TeacherRegisterData: { Total, PageIndex, List },
        },
        CommonData: {
          ModalVisible: {
            ExamineDetailsModalVisible,
            UserArchivesModalVisible,
          },
          RegisterExamineParams: {
            status,
            collegeID,
            collegeName,
            groupID,
            groupName,
            gradeName,
            gradeID,
            classID,
            className,
            keyword,
            cancelBtnShow,
            searchValue,
            pageSize,
            sortFiled,
            sortType,
            checkAll,
            checkedList,
            ExamineDetails,
          },
          RolePower: { IsCollege },
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;
    let College = [{ value: "", title: "全部学院" }].concat(CollegeList);
    let Group = [{ value: "", title: "全部教研室" }];
    let Class = [];
    collegeID  &&
      GroupList instanceof Array &&
      GroupList.forEach((child) => {
        if (child.CollegeID === collegeID) {
          Group.push(
            //   {
            //   value:child.value,title:child.title
            // }
            child
          );
        }
      });
    return (
      <div id="RegisterExamine" className="Content">
        <div className="Content-top">
          <span className="top-tips">
            <span className="tips menu39 ">教师注册审核</span>
          </span>
          <RegisterModel role={'teacher'}></RegisterModel>
        </div>
        <div className="Content-hr"></div>
        <div className="Content-handle clearfix">
          <div className="Ch-Type">
            <span
              onClick={this.onSelectStatusClick.bind(this, 0)}
              className={`Type-Bar ${status === 0 ? "active" : ""}`}
            >
              待审核
            </span>
            <span
              onClick={this.onSelectStatusClick.bind(this, 1)}
              className={`Type-Bar ${status === 1 ? "active" : ""}`}
            >
              已审核
            </span>
          </div>
          <span className="dropTitle">教研室:</span>
          {!IsCollege ? (
            <DropDown
              ref="dropMenuFirst"
              onChange={this.onCollegeSelect}
              width={120}
              disabled={IsCollege}
              // title="教研室:"
              height={240}
              dropSelectd={{
                value: collegeID,
                title: collegeID  ? collegeName : "全部学院",
              }}
              dropList={College}
            ></DropDown>
          ) : (
            ""
          )}
          <DropDown
            ref="dropMenuSecond"
            width={120}
            height={240}
            disabled={
              collegeID  ? (Group.length > 1 ? false : true) : true
            }
            dropSelectd={{
              value: groupID,
              title:
                groupID 
                  ? groupName
                  : collegeID  && Group.length <= 1
                  ? "暂无教研室"
                  : "全部教研室",
            }}
            dropList={Group}
            onChange={this.onGroupChange}
          ></DropDown>
          <div className="Search">
            <Search
              placeHolder="请输入学号或姓名进行搜索..."
              onClickSearch={this.onTeacherSearch}
              height={30}
              width={250}
              Value={searchValue}
              onCancelSearch={this.onCancelSearch}
              onChange={this.onChangeSearch}
              CancelBtnShow={cancelBtnShow}
            ></Search>
            {/* <span
              className="search-tips"
              style={{
                display: cancelBtnShow === "y" ? "block" : "none",
              }}
            >
              <span>{"搜索关键词“" + keyword + "”共找到"}</span>
              <span className="Total">{" " + Total + " "}</span>人
            </span> */}
          </div>
        </div>
        <div className="Content-table">
          <Loading
            // tip="加载中..."
            opacity={0.5}
            size="small"
            spinning={TableLoading}
          >
            {List instanceof Array && List.length !== 0 ? (
              <>
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={checkedList}
                  onChange={this.onCheckBoxGroupChange}
                >
                  <Table
                    className="table"
                    // loading={TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange}
                    dataSource={List}
                  ></Table>
                </CheckBoxGroup>

                {status === 0 ? (
                  <div style={{ display: "inline-block" }}>
                    <CheckBox
                      className="checkAll-box"
                      // type="gray"
                      onChange={this.onCheckAllChange}
                      checked={checkAll}
                    >
                      <span className="checkAll-title">全选</span>
                    </CheckBox>
                    <Button
                      key="agree"
                      className="agreeAll"
                      color="blue"
                      onClick={this.onAgreeAll.bind(this)}
                    >
                      通过
                    </Button>
                    <Button
                      key="refuse"
                      className="refuseAll"
                      color="red"
                      onClick={this.onRefuseAll.bind(this)}
                    >
                      不通过
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <div className="pagination-box"  style={status===1?{textAlign:'center',float:'none'}:{}}>
                  <PagiNation
                    showQuickJumper
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange}
                    pageSize={pageSize}
                    current={PageIndex + 1}
                    hideOnSinglePage={Total === 0 ? true : false}
                    total={Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </>
            ) : (
              <Empty
                title={
                  cancelBtnShow === "y" || cancelBtnShow !== 0
                    ? "暂无符合条件的教师注册"
                    : "暂无教师注册"
                }
                type="3"
                style={{ marginTop: "150px" }}
              ></Empty>
            )}
          </Loading>
        </div>
        <DetailsModal
          ref="TeacherDetailsMsgModal"
          visible={ExamineDetailsModalVisible}
          onOk={this.UserExamineMadalOk}
          onCancel={this.UserExamineMadalCancel}
          onFail={this.UserExamineMadalFail}
          data={ExamineDetails}
          type="examine"
        ></DetailsModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(RegisterExamine);
