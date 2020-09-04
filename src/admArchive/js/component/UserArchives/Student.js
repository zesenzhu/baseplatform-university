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
} from "../../../../common";
import Public from "../../../../common/js/public";

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
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class Student extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "",
          // dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: (data) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={data.key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">{data.OrderNo}</span>
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
          // dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
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
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  className="name-UserName"
                  title={arr.UserName ? arr.UserName : ""}
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
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
        // // {
        // //   title: "年级",
        // //   align: "center",
        // //   key: "GradeName",
        // //   width: 110,
        // //   dataIndex: "GradeName",
        // //   render: GradeName => {
        // //     return (
        // //       <span title={GradeName} className="GradeName">
        // //         {GradeName ? GradeName : "--"}
        // //       </span>
        // //     );
        // //   }
        // // },
        {
          title: "院系专业",
          align: "center",
          width: 220,
          key: "MyCollege",
          render: (data) => {
            return data.CollegeName ||
              data.MajorName ||
              data.GradeName ||
              data.ClassName ? (
              <span className="data">
                <span
                  className="CollegeMajor"
                  title={data.CollegeName + ">" + data.MajorName}
                >
                  {data.CollegeName + ">" + data.MajorName}
                </span>
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
          key: "data",
          render: (data) => {
            return data.CollegeName ||
              data.MajorName ||
              data.GradeName ||
              data.ClassName ? (
              <span className="data">
                <span
                  className="GradeClass"
                  title={data.GradeName + ">" + data.ClassName}
                >
                  {data.GradeName + ">" + data.ClassName}
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
          // dataIndex: "key",
          render: (data) => {
            let {
              DataState: {
                CommonData: {
                  RolePower: { IsLeader },
                },
              },
            } = props;
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.StudentEdit.bind(this, data)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                {IsLeader ? (
                  ""
                ) : (
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.StudentChange.bind(this, data)}
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
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  //
  StudentChange = (data) => {
    console.log(data);
  };
  StudentEdit = (data) => {
    console.log(data);
  };
  // 点击姓名头像
  onUserNameClick = (UserID) => {
    const {
      DataState: {
        // GradeStudentPreview: { pensonalList },
      },
    } = this.props;
    console.log(UserID);
    // if (pensonalList[key]) {
    let token = sessionStorage.getItem("token");
    window.open(
      "/html/userPersona/index.html?userType=" +
        2 +
        "&userID=" +
        UserID +
        "&lg_tk=" +
        token
    );
    // }
    // const { DataState } = this.props;
    // this.setState({
    //   StudentDetailsMsgModalVisible: true,
    //   detailData: DataState.GradeStudentPreview.pensonalList[key],
    // });
  };
  //学院选择
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        collegeID: e.value,
        collegeName: e.title,
        majorID: "",
        majorName: "",
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onMajorChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        majorID: e.value,
        majorName: e.title,
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onGradeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        gradeID: e.value,
        gradeName: e.title,
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onClassChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        classID: e.value,
        className: e.title,

        keyword: "",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  // 搜索
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        searchValue: e.target.value,
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onStudentSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        keyword: e.value,
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onTableChange = (e) => {};
  render() {
    let {
      DataState: {
        MainData: {
          StudentTree: { CollegeList, MajorList, GradeList, ClassList },
          StudentData: { Total, PageIndex, List },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
          StudentParams: {
            collegeID,
            collegeName,
            majorID,
            majorName,
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
          },
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;

    let College = [{ value: "", title: "全部学院" }].concat(CollegeList);
    let Major = [];
    let Class = [];
    collegeID !== "" &&
      MajorList instanceof Array &&
      MajorList.forEach((child) => {
        if (child.CollegeID === collegeID) {
          Major.push(
            //   {
            //   value:child.value,title:child.title
            // }
            child
          );
        }
      });
    collegeID !== "" &&
      majorID !== "" &&
      gradeID !== "" &&
      ClassList instanceof Array &&
      ClassList.forEach((child) => {
        if (
          child.CollegeID === collegeID &&
          child.MajorID === majorID &&
          child.GradeID === gradeID
        ) {
          Class.push(
            //   {
            //   value:child.value,title:child.title
            // }
            child
          );
        }
      });
    return (
      <div id="Student" className="Content">
        <div className="Student-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">学生档案管理</span>
            </span>
            <div className="top-nav">
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onEditMajor}
              >
                <span className="addMajor">专业管理</span>
              </span>
              <span className="divide">|</span>
              {!LockerVersion_1 ? (
                <>
                  <a className="link">
                    <span
                      onClick={this.onLinkClick.bind(
                        this,
                        "学生注册审核",
                        "#/RegisterExamine/RegisterWillExamine"
                      )}
                      className="RegisterExamine"
                    >
                      学生注册审核
                      {/* <i
                        style={{
                          display: DataState.GetSignUpLog.WillData.Total
                            ? "inline-block"
                            : "none",
                        }}
                        className="have-red"
                      ></i> */}
                    </span>
                  </a>
                  <span className="divide">|</span>
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
              <a className="link">
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
          <div className="Content-hr"></div>
          <div className="Content-handle">
            <DropDown
              ref="dropMenuFirst"
              onChange={this.onCollegeSelect}
              width={120}
              disabled={IsCollege}
              title="院系专业:"
              height={240}
              dropSelectd={{
                value: collegeID,
                title: collegeID !== "" ? collegeName : "全部学院",
              }}
              dropList={College}
            ></DropDown>
            <DropDown
              ref="dropMenuSecond"
              width={120}
              height={240}
              disabled={
                collegeID !== "" ? (Major.length > 0 ? false : true) : true
              }
              dropSelectd={{
                value: majorID,
                title:
                  majorID !== ""
                    ? majorName
                    : collegeID !== "" && Major.length === 0
                    ? "暂无专业"
                    : "全部专业",
              }}
              dropList={Major}
              onChange={this.onMajorChange}
            ></DropDown>
            <DropDown
              ref="dropMenuThird"
              width={120}
              height={240}
              style={{ marginLeft: "50px" }}
              title={"年级班级:"}
              dropSelectd={{
                value: gradeID,
                title: gradeID !== "" ? gradeName : "全部年级",
              }}
              dropList={GradeList}
              onChange={this.onGradeChange}
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
                collegeID !== "" &&
                majorID !== "" &&
                gradeID !== "" &&
                Class.length > 0
                  ? false
                  : true
              }
              dropSelectd={{
                value: classID,
                title:
                  classID !== ""
                    ? className
                    : collegeID !== "" &&
                      majorID !== "" &&
                      gradeID !== "" &&
                      Class.length === 0
                    ? "暂无班级"
                    : "全部班级",
              }}
              dropList={Class}
              onChange={this.onClassChange}
            ></DropDown>
            <div className="Search">
              <Search
                placeHolder="请输入学号或姓名进行搜索..."
                onClickSearch={this.onStudentSearch}
                height={30}
                width={250}
                Value={searchValue}
                onCancelSearch={this.onCancelSearch}
                onChange={this.onChangeSearch}
                CancelBtnShow={cancelBtnShow}
              ></Search>
              <span
                className="search-tips"
                style={{
                  display: cancelBtnShow === "y" ? "block" : "none",
                }}
              >
                <span>{"搜索关键词“" + keyword + "”共找到"}</span>
                <span className="Total">{" " + Total + " "}</span>人
              </span>
            </div>
          </div>
          <div className="Content-table">
            <Loading
              // tip="加载中..."
              opacity={false}
              size="small"
              spinning={TableLoading}
            >
              <CheckBoxGroup
                style={{ width: "100%" }}
                value={this.state.checkedList}
                onChange={this.onCheckBoxGroupChange}
              >
                {List instanceof Array && List.length !== 0 ? (
                  <>
                    <Table
                      className="table"
                      // loading={TableLoading}
                      columns={this.state.columns}
                      pagination={false}
                      onChange={this.onTableChange}
                      dataSource={List}
                    ></Table>
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
                    <div className="pagination-box">
                      <PagiNation
                        showQuickJumper
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                        pageSize={pageSize}
                        current={PageIndex}
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
                        ? "暂无符合条件的学生档案"
                        : "暂无学生档案"
                    }
                    type="3"
                    style={{ marginTop: "150px" }}
                  ></Empty>
                )}
              </CheckBoxGroup>
            </Loading>
          </div>
        </div>
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
export default connect(mapStateToProps)(Student);
