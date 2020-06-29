import React, { Component } from "react";
import { DropDown, Tips, Empty } from "../../../common";
import { Input } from "antd";
import { connect } from "react-redux";
import UpUIState from "../actions/UpUIState";
import { Scrollbars } from "react-custom-scrollbars";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import "../../scss/edit-group-modal.scss";
import UpDataState from "../actions/UpDataState";
import actions from "../actions";

class EditGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserType: props.DataState.LoginUser.UserType,
    };
  }
  componentWillMount() {
    const { DataState, dispatch } = this.props;
    let collegeSelectd = { value: 0, title: "全部学院" };
    let firstList = DataState.SubjectTeacherMsg.College;
    if (DataState.SubjectTeacherPreview.College.value !== 0) {
      //检查主页是否有选择了学院
      collegeSelectd = DataState.SubjectTeacherPreview.College;
    } else {
      if (
        DataState.SubjectTeacherMsg.College[0] &&
        DataState.SubjectTeacherMsg.College[0].value === 0
      ) {
        collegeSelectd = DataState.SubjectTeacherMsg.College[1];
      } else if (
        DataState.SubjectTeacherMsg.College[0] &&
        DataState.SubjectTeacherMsg.College[0].value !== 0
      ) {
        collegeSelectd = DataState.SubjectTeacherMsg.College[0];
      }
    }
    if (
      DataState.SubjectTeacherMsg.College[0] &&
      DataState.SubjectTeacherMsg.College[0].value === 0
    ) {
      //检查数组是否有全部学院
      firstList.shift();
    }
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        College: collegeSelectd,
      },
    });
    this.setState({
      firstList,
      collegeSelectd,
    });
  }
  addCollgeDropChange = (e) => {
    let { dispatch } = this.props;
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        College: e,
      },
    });
    this.setState({
      collegeSelectd: e,
    });
  };

  // 编辑
  onEditClick = (Group) => {
    let { dispatch, UIState, DataState } = this.props;
    dispatch({ type: UpUIState.EDIT_GROUP_MODAL_OPEN });
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        Group,
      },
    });
  };
  // 编辑
  addGroupClick = (major) => {
    let { dispatch, UIState, DataState } = this.props;
    dispatch({ type: UpUIState.ADD_GROUP_MODAL_OPEN });
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        Group: { value: "", title: "" },
      },
    });
  };
  // 删除
  onDeleteClick = (group) => {
    let { dispatch } = this.props;

    //  console.log(group)
    dispatch(
      UpUIState.showErrorAlert({
        type: "btn-query",
        title: "确定删除该教研室？",
        ok: this.onAppAlertOK.bind(this, group),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this),
      })
    );
  };

  //提示事件
  onAppAlertOK(group) {
    const { dispatch, DataState } = this.props;

    // let { dispatch } = this.props;
    // console.log(major);
    let url = "/DeleteGroup_Univ";
    postData(
      CONFIG.UserInfoProxy_univ + url,
      {
        CollegeID: DataState.EditGroupMsg.College.value,
        GroupID: group.value,
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
              "/GetCollegeGroup_Univ?schoolID=" + DataState.LoginUser.SchoolID,
              false
            )
          );
        }
      });
  }
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  AlterDeleteOk = (major) => {
    let { dispatch } = this.props;
    console.log(major);
    UpDataState.delGroup({ GroupID: major.value, dispatch }).then((data) => {
      if (data === "success") {
        dispatch({ type: AppAlertActions.CLOSE_ERROR_ALERT });
        dispatch(UpDataState.GetDropdownData());
      }
    });
  };
  render() {
    const { DataState, UIState } = this.props;
    let { SubjectTeacherPreview, LoginUser, SubjectTeacherMsg } = DataState;
    let { UserType } = DataState.LoginUser;
    let { College: collegeSelectd } = SubjectTeacherPreview;
    let {
      College: firstDropDown,
      Group: secondDropDown,
    } = DataState.SubjectTeacherMsg;
    let isNull = true;
    return (
      <React.Fragment>
        <div className="addclass-select-grade" style={{ zIndex: 10 }}>
          <span className="props">选择学院:</span>

          <DropDown
            style={{ zIndex: 10 }}
            width={150}
            dropSelectd={this.state.collegeSelectd}
            onChange={this.addCollgeDropChange}
            dropList={this.state.firstList}
            height={200}
          ></DropDown>
          <span className="addGroup" onClick={this.addGroupClick}>
            添加教研室
          </span>
        </div>
        <div className="major-box">
          <Scrollbars style={{ height: "360px", width: "100%" }}>
            {this.state.collegeSelectd.value !== "" &&
            secondDropDown[this.state.collegeSelectd.value] instanceof Array &&
            secondDropDown[this.state.collegeSelectd.value].length !== 1 ? (
              secondDropDown[this.state.collegeSelectd.value].map(
                (child, index) => {
                  if (child.value === 0 || child.IsUngroup !== 0) {
                    if (
                      secondDropDown[this.state.collegeSelectd.value].length -
                        1 ===
                        index &&
                      isNull
                    ) {
                      return (
                        <Empty key={index}
                          title={"暂无教研室"}
                          type="3"
                          style={{ marginTop: "120px" }}
                        ></Empty>
                      );
                    } else {
                      return "";
                    }
                  } else {
                    isNull = false;
                    return (
                      <div key={index} className="major-content">
                        <span className="major-name">{child.title}</span>
                        {child.IsUngroup === 0 ? (
                          <div className="edit-box">
                            <span
                              onClick={this.onEditClick.bind(this, child)}
                              className="edit"
                            >
                              编辑
                            </span>
                            <span
                              onClick={this.onDeleteClick.bind(this, child)}
                              className="delete"
                            >
                              删除
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }
                }
              )
            ) : (
              <Empty
                title={"暂无教研室"}
                type="3"
                style={{ marginTop: "120px" }}
              ></Empty>
            )}
          </Scrollbars>
        </div>
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
export default connect(mapStateToProps)(EditGroupModal);
