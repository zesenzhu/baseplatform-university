import React, { Component } from "react";
import { DropDown, Tips } from "../../../common";
import { Input } from "antd";
import { connect } from "react-redux";
import UpUIState from "../actions/UpUIState";
import { Scrollbars } from "react-custom-scrollbars";
import   '../../scss/add-class-modal.scss'
import actions from "../actions";

import UpDataState from "../actions/UpDataState";
class HandleGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserType: props.DataState.LoginUser.UserType
    };
  }
  componentWillMount() {
    const { DataState,dispatch } = this.props;
    
    let firstList = DataState.SubjectTeacherMsg.College;
     
    if (
      DataState.SubjectTeacherMsg.College[0] &&
      DataState.SubjectTeacherMsg.College[0].value === 0
    ) {
      //检查数组是否有全部学院
      firstList.shift();
    }
     
    this.setState({
      firstList 
    });
  }
  editCollgeDropChange = e => {
    let { dispatch } = this.props;
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        College: e
      }
    });
   
  };
 

  // 编辑
  onEditClick = major => {
    let { dispatch } = this.props;

    dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_SHOW,major });
  };
  // 删除
  onDeleteClick = major => {
    let { dispatch } = this.props;

    dispatch(
      AppAlertActions.alertQuery({
        title: `确定删除该专业？`,
        ok:()=>{console.log(111)},
        // cancel:this.AlterDeleteCancel.bind(this),
        // close:this.AlterDeleteCancel.bind(this)
      })
    );
  };
  AlterDeleteCancel = ()=>{
    let { dispatch } = this.props;

    dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT})
  }

  AlterDeleteOk = (major)=>{
    let { dispatch } = this.props;
    console.log(major)
    UpDataState.delMajor({ MajorID:major.value, dispatch }).then(data=>{
      if(data.Msg==='success'){
        dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT})
      }
    })
  }
  //添加班级输入框值变化
  inputChange(e) {
    const { dispatch,UIState,DataState } = this.props;
    let Group = DataState.EditGroupMsg.Group
    dispatch({
      type: UpDataState.EDIT_GROUP_SELECT_CHANGE,
      data: {
        
        Group: { value: Group.value, title: e.target.value.trim() }
      }
    });
    // dispatch({ type: UpUIState.ADD_CLASS_INPUT_TIPS_HIDE });
  }
  UserComm_CheckGroupName(strInput) {
    //用户群名称检测（学校、年级、班级、教师组、专家组）
    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      strInput
    );
  }
  inputBlur(e){
    const { dispatch } = this.props;
    // if (major.title === "") {
    //   dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

    //   dispatch({
    //     type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
    //     tips: "班级名称不能为空"
    //   });
    // } else {
    //   //输入合法和不合法的情况
    //   if (this.UserComm_CheckGroupName(major.title)) {
    //     dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE });

    //     let isChong = false;
    //     for (let key in secondDropDown) {
    //       if (!(secondDropDown[key] instanceof Array))
    //         for (let index in secondDropDown[key]) {
    //           if (secondDropDown[key][index].title === major.title) {
    //             isChong = true;
    //           }
    //         }
    //     }

    //     if (isChong) {
    //       //有同名
    //       dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

    //       dispatch({
    //         type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
    //         tips: "该年级下已存在同名班级"
    //       });
    //     } else {
    //       //向后台请求添加班级的接口
          
    //         UpDataState.editMajor({
    //           MajorID: major.value,
    //           CollegeID: college.title,
    //           MajorName:major.title,
    //           dispatch
    //         }).then(data=>{
    //           if(data==='success'){
    //             dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_HIDE });

    //           }
    //         })
         
    //     }
    //   } else {
    //     dispatch({ type: UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW });

    //     dispatch({
    //       type: UpUIState.EDIT_MAJOR_INPUT_TIPS,
    //       tips:
    //         "班级名称应由1-20位的汉字、字母、数字以及括号组成，建议以年级为前缀"
    //     });
    //   }
    // }
  }
  render() {
    const {

      DataState,
      UIState
    } = this.props;

    let {SubjectTeacherPreview,SubjectTeacherMsg,EditGroupMsg} = DataState
    return (
      <React.Fragment>
        <div className="addclass-select-grade" style={{ zIndex: 10 }}>
          <span className="props">选择学院:</span>

          <DropDown
            style={{ zIndex: 10 }}
            width={150}
            disabled={this.props.type!=='add'?true:false}
            dropSelectd={EditGroupMsg.College}
            onChange={this.editCollgeDropChange}
            dropList={this.state.firstList}
            height={200}
          ></DropDown>
        </div>
        <div style={{    marginLeft: '22px'}} className="addclass-select-grade"> <span className="props">教研室名称:</span>
        <Tips
            // placement="bottom"
            overlayClassName="tips"
            visible={UIState.EditModalTipsVisible.GroupNameTipsVisible}
            title={EditGroupMsg.inputTips}
          >
            <Input
              type="text"
              value={EditGroupMsg.Group.title}
              placeholder="请输入教研室名称，建议以学院为前缀"
              onChange={e => this.inputChange(e)}
              onBlur={e => this.inputBlur(e)}
            //   disabled={gradeSelectd.valu ? false : true}
            />
          </Tips>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  let {
    UIState,
    DataState,
     
  } = state;


  return {
    UIState,

    DataState,
 
  };
};
export default connect(mapStateToProps)(HandleGroupModal);
