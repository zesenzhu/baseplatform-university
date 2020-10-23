import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "../../scss/EditModal.scss";
import { Input } from "antd";
import {
  Radio,
  RadioGroup,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  Tips,
  Loading,
} from "../../../common/index";
import actions from "../actions";
import "../../../common/js/PicUpload/Cropper/cropper.css";
import { Scrollbars } from "react-custom-scrollbars";

import "../../../common/js/PicUpload/photoUpload.scss";

import "../../../common/js/PicUpload/Cropper/cropper";

import $ from "jquery";
window.$ = $;

window.jQuery = $;
require("../../../common/js/PicUpload/juqery.cp.picUploader");
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultUserName: "",
      UserIDChange: "",
      UserKey: props.userKey,
      type: props.type,
      UserIDTipsVisible: false,
      UserIDTipsTitle: "由1-24位字母与数字组成",
      UserNameTipsVisible: false,
      UserNameTipsTitle:
        "姓名由1-20位的汉字、字母、数字、下划线、空格组成（首尾不允许空格）",
      data: props.userKey === "change" ? props.data : [],
      PowerList: props.PowerList,
      checkAll: [],
      indeterminate: [],
      checkedList: [],
      checkedListArr: [],
      plainOptionsArr: [],
      PowerChildLen: [],
      // props.userKey === 'change' ? props.data.Power.Powers.map((child, index) => {
      //     return child.PowerChild.length
      // }) : props.PowerList.map((child, index) => 0)
    };
  }
  componentWillMount() {
    const { DataState, dispatch } = this.props;
    // //console.log(this.state.data)
    let token = sessionStorage.getItem("token");
    let userType = "Admin";
    let userID = "";
    let curImgPath = "";
    if (this.state.UserKey === "change") {
      userID = this.state.data.UserName.UserID;
      this.setState({
        UserIDChange: this.state.data.UserName.UserID,
        defaultUserName: this.state.data.UserName.Name,
        defaultTelephone: this.state.data.Others.Telephone,
        defaultQQ: this.state.data.Others.QQ,
        defaultWeixin: this.state.data.Others.Weixin,
        defaultWeibo: this.state.data.Others.Weibo,
      });
      dispatch(
        actions.UpDataState.setAdminPreview({
          UserID: this.state.data.UserName.UserID,
          UserName: this.state.data.UserName.Name,
          PhotoPath: this.state.data.Others.AvatarPath,
          Telephone: this.state.data.Others.Telephone,
          QQ: this.state.data.Others.QQ,
          Weixin: this.state.data.Others.Weixin,
          Weibo: this.state.data.Others.Weibo,
          IdentityIDs: this.state.data.Others.IdentityIDs,
        })
      );
      dispatch(
        actions.UpDataState.setAdminInitPreview({
          UserID: this.state.data.UserName.UserID,
          UserName: this.state.data.UserName.Name,
          PhotoPath: this.state.data.Others.AvatarPath,
          Telephone: this.state.data.Others.Telephone,
          QQ: this.state.data.Others.QQ,
          Weixin: this.state.data.Others.Weixin,
          Weibo: this.state.data.Others.Weibo,
          IdentityIDs: this.state.data.Others.IdentityIDs,
        })
      );
      this.state.PowerList.map((power, index) => {
        let checkAll = this.state.checkAll;
        let indeterminate = this.state.indeterminate;
        let plainOptions = [];
        let plainOptionsArr = this.state.plainOptionsArr;
        let checkedList = [];
        let PowerChildLen = this.state.PowerChildLen;
        let checkedListArr = this.state.checkedListArr;
        this.state.PowerList[index].PowerChild.map((child, index) => {
          plainOptions[index] = child.value;
        });

        plainOptionsArr[index] = plainOptions;
        // //console.log(plainOptionsArr, index)
        let Powers = this.props.data.Power.Powers[index]
          ? this.props.data.Power.Powers[index].PowerChild
          : [];
        this.props.data.Power.Powers.map((child, powerIndex) => {
          if (child.value === power.value) {
            child.PowerChild.map((child, key) => {
              checkedList[key] = child.value;
            });
          }
        });

        checkAll[index] = checkedList.length !== 0 ? true : false;

        PowerChildLen[index] = checkedList ? checkedList.length : 0;

        indeterminate[index] =
          plainOptionsArr[index].length === checkedList.length ||
          checkedList.length === 0
            ? false
            : true;
        //console.log(plainOptionsArr, checkedList, indeterminate)
        checkedListArr[index] = checkedList;
        this.setState({
          checkAll: checkAll,
          indeterminate: indeterminate,
          checkedListArr: checkedListArr,
          plainOptionsArr: plainOptionsArr,
        });
        // return (
        //     <div key={this.state.PowerList[index].value}>
        //         <CheckBox
        //             indeterminate={this.state.indeterminate[index]}
        //             onChange={this.onCheckAllChange.bind(this, index)}
        //             checked={this.state.checkAll[index]}
        //         >
        //             {power.PowerName}
        //             <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
        //         </CheckBox>
        //         <CheckBoxGroup

        //             value={this.state.checkedListArr[index]}
        //             onChange={this.onCheckChange.bind(this,index)}
        //         >
        //             {this.state.PowerList[index].PowerChild.map((child, index) => {

        //                 return(
        //                     <CheckBox
        //                     value={child.value}
        //                     key = {child.value}
        //                     >{child.PowerChildName}</CheckBox>
        //                 )
        //             })}
        //         </CheckBoxGroup>
        //     </div>
        // )
      });
      let ModulesID = [];
      this.state.checkedListArr.map((child) => {
        //console.log(child.length)
        if (child.length !== 0) ModulesID.push(child.join());
      });
      dispatch(
        actions.UpDataState.setAdminPreview({
          ModuleIDs: ModulesID.join(),
        })
      );
      dispatch(
        actions.UpDataState.setAdminInitPreview({
          ModuleIDs: ModulesID.join(),
        })
      );
      curImgPath = this.state.data.Others.AvatarPath;
    } else if (this.state.UserKey === "add") {
      curImgPath = "";
      this.state.PowerList.map((power, index) => {
        let checkAll = this.state.checkAll;
        let indeterminate = this.state.indeterminate;
        let plainOptions = [];
        let plainOptionsArr = this.state.plainOptionsArr;
        let checkedList = [];
        let checkedListArr = this.state.checkedListArr;
        this.state.PowerList[index].PowerChild.map((child, index) => {
          plainOptions[index] = child.value;
        });

        plainOptionsArr[index] = plainOptions;
        // //console.log(plainOptionsArr, index)

        checkAll[index] = false;

        checkedList = [];
        indeterminate[index] = false;
        checkedListArr[index] = checkedList;
        this.setState({
          checkAll: checkAll,
          indeterminate: indeterminate,
          checkedListArr: checkedListArr,
          plainOptionsArr: plainOptionsArr,
        });
        // return (
        //     <div key={this.state.PowerList[index].value}>
        //         <CheckBox
        //             indeterminate={this.state.indeterminate[index]}
        //             onChange={this.onCheckAllChange.bind(this, index)}
        //             checked={this.state.checkAll[index]}
        //         >
        //             {power.PowerName}
        //             <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
        //         </CheckBox>
        //         <CheckBoxGroup

        //             value={this.state.checkedListArr[index]}
        //             onChange={this.onCheckChange.bind(this,index)}
        //         >
        //             {this.state.PowerList[index].PowerChild.map((child, index) => {

        //                 return(
        //                     <CheckBox
        //                     value={child.value}
        //                     key = {child.value}
        //                     >{child.PowerChildName}</CheckBox>
        //                 )
        //             })}
        //         </CheckBoxGroup>
        //     </div>
        // )
      });
    }
    // 图片上传
    let option = {
      UploadType: "Avatar", //头像
      token: token,
      resWebUrl: DataState.GetPicUrl.picUrl, //资源站点地址
      userType: userType, //用户类型，可选值Admin、Student、Teacher、SchoolLeader
      userID: userID, //新增时传空字符串、编辑时传相应UserID
      curImgPath: curImgPath, //用户当前头像，新增时可不传
    };
    this.setState({
      option: option,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    // console.log(this.state.option, $("#picUpload"))
    $("#picUpload").picUploader(this.state.option); //初始化
    dispatch(actions.UpDataState.getPicObject($("#picUpload")));
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
    if (
      DataState.GetPicUrl.picUrl &&
      DataState.GetPicUrl.picUrl !== this.state.option.resWebUrl
    ) {
      let option = this.state.option;
      option.resWebUrl = DataState.GetPicUrl.picUrl;
      this.setState({
        option: option,
      });
      $("#picUpload").picUploader(option); //初始化
      dispatch(actions.UpDataState.getPicObject($("#picUpload")));
    }
  }
  // componentWillReceiveProps() {
  //     //const { DataState } = this.props;
  //     // //console.log(this.props.data)
  //     let checkedListArr = [];
  //     let PowerChildLen = [];
  //     let indeterminate = [];
  //     let checkAll = [];
  //     let plainOptionsArr = [];
  //     if (this.state.UserKey === 'change') {
  //         this.setState({
  //             UserIDChange: this.props.data.UserName.UserID,
  //             defaultUserName: this.props.data.UserName.Name
  //         })
  //         this.state.PowerList.map((power, index) => {

  //             let plainOptions = [];

  //             let checkedList = [];

  //             this.state.PowerList[index].PowerChild.map((child, index) => {
  //                 plainOptions[index] = child.value;

  //             })

  //             plainOptionsArr[index] = plainOptions;
  //             // //console.log(plainOptionsArr, index)
  //             let Powers = this.props.data.Power.Powers[index]?this.props.data.Power.Powers[index].PowerChild:[]
  //             this.props.data.Power.Powers.map((child,powerIndex) => {
  //                 if(child.value===power.value){
  //                     child.PowerChild.map((child, key) => {
  //                         checkedList[key] = child.value;
  //                     })
  //                 }
  //             })

  //             checkAll[index] = checkedList.length!==0 ? true : false;

  //             PowerChildLen[index] = checkedList ? checkedList.length : 0;
  //             indeterminate[index] = this.state.plainOptionsArr[index].length === checkedList.length || checkedList === [] ? false : true;;
  //             checkedListArr[index] = checkedList;
  //             ////console.log(checkedListArr)
  //             this.setState({
  //                 checkAll: checkAll,
  //                 indeterminate: indeterminate,
  //                 checkedListArr: checkedListArr,
  //                 plainOptionsArr: plainOptionsArr,
  //                 PowerChildLen: PowerChildLen
  //             })
  //             // return (
  //             //     <div key={this.state.PowerList[index].value}>
  //             //         <CheckBox
  //             //             indeterminate={this.state.indeterminate[index]}
  //             //             onChange={this.onCheckAllChange.bind(this, index)}
  //             //             checked={this.state.checkAll[index]}
  //             //         >
  //             //             {power.PowerName}
  //             //             <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
  //             //         </CheckBox>
  //             //         <CheckBoxGroup

  //             //             value={this.state.checkedListArr[index]}
  //             //             onChange={this.onCheckChange.bind(this,index)}
  //             //         >
  //             //             {this.state.PowerList[index].PowerChild.map((child, index) => {

  //             //                 return(
  //             //                     <CheckBox
  //             //                     value={child.value}
  //             //                     key = {child.value}
  //             //                     >{child.PowerChildName}</CheckBox>
  //             //                 )
  //             //             })}
  //             //         </CheckBoxGroup>
  //             //     </div>
  //             // )
  //         })
  //     } else if (this.state.UserKey === 'add') {

  //         let checkAll = [];
  //         let indeterminate = [];

  //         let plainOptionsArr = [];

  //         this.state.PowerList.map((power, index) => {
  //             let plainOptions = [];
  //             let checkedList = [];
  //             let checkedListArr = this.state.checkedListArr;
  //             this.state.PowerList[index].PowerChild.map((child, index) => {
  //                 plainOptions[index] = child.value;

  //             })

  //             plainOptionsArr[index] = plainOptions;
  //             // //console.log(plainOptionsArr, index)

  //             checkAll[index] = false;

  //             checkedList = []
  //             indeterminate[index] = false;
  //             checkedListArr[index] = checkedList;
  //             this.setState({
  //                 checkAll: checkAll,
  //                 indeterminate: indeterminate,
  //                 checkedListArr: checkedListArr,
  //                 plainOptionsArr: plainOptionsArr
  //             })
  //             // return (
  //             //     <div key={this.state.PowerList[index].value}>
  //             //         <CheckBox
  //             //             indeterminate={this.state.indeterminate[index]}
  //             //             onChange={this.onCheckAllChange.bind(this, index)}
  //             //             checked={this.state.checkAll[index]}
  //             //         >
  //             //             {power.PowerName}
  //             //             <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
  //             //         </CheckBox>
  //             //         <CheckBoxGroup

  //             //             value={this.state.checkedListArr[index]}
  //             //             onChange={this.onCheckChange.bind(this,index)}
  //             //         >
  //             //             {this.state.PowerList[index].PowerChild.map((child, index) => {

  //             //                 return(
  //             //                     <CheckBox
  //             //                     value={child.value}
  //             //                     key = {child.value}
  //             //                     >{child.PowerChildName}</CheckBox>
  //             //                 )
  //             //             })}
  //             //         </CheckBoxGroup>
  //             //     </div>
  //             // )
  //         })

  //     }
  // }
  onEditIDChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      UserIDChange: e.target.value.trim(),
    });
  };
  onEditIDBlur = (e) => {
    const { dispatch } = this.props;

    //用户ID（工号/学号）检测
    //长度是1~30位，只能由字母与数字组成。
    let Test = /^([a-zA-Z0-9]{1,24})$/.test(e.target.value);
    // //console.log(Test,e.target.value)
    if (!Test) {
      dispatch(actions.UpUIState.UserIDTipsVisibleOpen());
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          UserID: e.target.value,
        })
      );
      dispatch(actions.UpUIState.UserIDTipsVisibleClose());
    }
  };
  onEditNameChange = (e) => {
    const { dispatch } = this.props;

    this.setState({
      defaultUserName: e.target.value.trim(),
    });
  };
  onEditNameBlur = (e) => {
    const { dispatch } = this.props;
    //用户姓名检测
    //用户姓名由1-20位的汉字、字母、数字、下划线组成。
    let value = e.target.value;
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(
      value
    );

    if (!Test) {
      dispatch(actions.UpUIState.UserNameTipsVisibleOpen());
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          UserName: value,
        })
      );
      dispatch(actions.UpUIState.UserNameTipsVisibleClose());
    }
  };

  // 新
  onCheckAllChange = (index, e) => {
    const { dispatch, DataState } = this.props;

    let checkedListArr = this.state.checkedListArr;
    let indeterminate = this.state.indeterminate;
    let checkAll = this.state.checkAll;
    let PowerChildLen = this.state.PowerChildLen;
    checkedListArr[index] = e.target.checked
      ? this.state.plainOptionsArr[index]
      : [];
    indeterminate[index] = false;
    checkAll[index] = e.target.checked;
    PowerChildLen[index] = e.target.checked
      ? this.state.plainOptionsArr[index].length
      : 0;
    let ModulesID = [];
    // let InitPower =  DataState.AdminPreview.InitData.split(',');
    // let len = InitPower.length
    // let CopyPower = InitPower.slice()
    checkedListArr.map((child) => {
      //console.log(child.length)
      // child instanceof Array && child.map((newChild)=>{
      //   InitPower instanceof Array && InitPower.map((power)=>{
      //     if(power===newChild){
      //       len--
      //     }
      //   })
      // })

      if (child.length !== 0) ModulesID.push(child.join());
    });

    // if()
    dispatch(
      actions.UpDataState.setAdminPreview({
        // isChange: true,
        ModuleIDs: ModulesID.join(),
      })
    );
    //console.log(indeterminate, checkedListArr, checkAll);
    this.setState({
      checkedListArr: checkedListArr,
      indeterminate: indeterminate,
      checkAll: checkAll,
      PowerChildLen: PowerChildLen,
    });
  };
  onCheckChange = (index, value, e) => {
    const { dispatch } = this.props;

    //console.log(index, value, this.state.plainOptionsArr[index], this.state.checkedListArr, this.state.PowerChildLen)
    let checkedListArr = this.state.checkedListArr;
    let indeterminate = this.state.indeterminate;
    let checkAll = this.state.checkAll;
    let PowerChildLen = this.state.PowerChildLen;
    checkedListArr[index] = value;
    indeterminate[index] =
      this.state.plainOptionsArr[index].length !== value.length &&
      value.length !== 0
        ? true
        : false;
    checkAll[index] =
      this.state.plainOptionsArr[index].length === value.length ? true : false;
    PowerChildLen[index] = value.length;
    //console.log(checkedListArr, indeterminate, checkAll)
    let ModulesID = [];
    checkedListArr.map((child) => {
      //console.log(child.length)
      if (child.length !== 0) ModulesID.push(child.join());
    });
    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: true,
        ModuleIDs: ModulesID.join(),
      })
    );
    this.setState({
      checkedListArr: checkedListArr,
      indeterminate: indeterminate,
      checkAll: checkAll,
      PowerChildLen: PowerChildLen,
    });
  };
  onEditTelChange = (e) => {
    const { dispatch } = this.props;

    this.setState({
      defaultTelephone: e.target.value.trim(),
    });
  };
  onEditTelBlur = (e) => {
    const { dispatch } = this.props;
    //用户姓名检测
    //用户姓名由1-20位的汉字、字母、数字、下划线组成。
    let value = e.target.value;
    let Test = /^([0-9\/-]){1,40}$/.test(value);

    if (value !== "" && !Test) {
      dispatch(actions.UpUIState.SetTipsVisible({ TelphoneTipsVisible: true }));
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          Telephone: value,
        })
      );
      dispatch(
        actions.UpUIState.SetTipsVisible({ TelphoneTipsVisible: false })
      );
    }
  };
  onEditQQChange = (e) => {
    const { dispatch } = this.props;

    this.setState({
      defaultQQ: e.target.value.trim(),
    });
  };
  onEditQQBlur = (e) => {
    const { dispatch } = this.props;
    //用户姓名检测
    //用户姓名由1-20位的汉字、字母、数字、下划线组成。
    let value = e.target.value;
    let Test = /^[1-9]*[1-9][0-9]{4,18}$/.test(value);

    if (value !== "" && !Test) {
      dispatch(actions.UpUIState.SetTipsVisible({ QQTipsVisible: true }));
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          QQ: value,
        })
      );
      dispatch(actions.UpUIState.SetTipsVisible({ QQTipsVisible: false }));
    }
  };
  onEditWeixinChange = (e) => {
    const { dispatch } = this.props;

    this.setState({
      defaultWeixin: e.target.value.trim(),
    });
  };
  onEditWeixinBlur = (e) => {
    const { dispatch } = this.props;
    //用户姓名检测
    //用户姓名由1-20位的汉字、字母、数字、下划线组成。
    let value = e.target.value;
    let Test = false;
    Test = Test || this.UserComm_CheckPhoneNumber(value); //手机号码

    Test = Test || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,20}$/.test(value); //微信ID（微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头。）

    Test = Test || this.UserComm_CheckQQ(value); //QQ号

    Test = Test || this.UserComm_CheckEmail(value); //邮箱
    if (value !== "" && !Test) {
      dispatch(actions.UpUIState.SetTipsVisible({ WeixinTipsVisible: true }));
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          Weixin: value,
        })
      );
      dispatch(actions.UpUIState.SetTipsVisible({ WeixinTipsVisible: false }));
    }
  };
  onEditWeiboChange = (e) => {
    const { dispatch } = this.props;

    this.setState({
      defaultWeibo: e.target.value.trim(),
    });
  };
  onEditWeiboBlur = (e) => {
    const { dispatch } = this.props;
    //用户姓名检测
    //用户姓名由1-20位的汉字、字母、数字、下划线组成。
    let value = e.target.value;

    let Test = false;
    Test = Test || this.UserComm_CheckPhoneNumber(value); //手机号码

    Test = Test || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,20}$/.test(value); //微信ID（微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头。）

    // Test = Test || this.UserComm_CheckQQ(value); //QQ号

    Test = Test || this.UserComm_CheckEmail(value); //邮箱
    if (value !== "" && !Test) {
      dispatch(actions.UpUIState.SetTipsVisible({ WeiboTipsVisible: true }));
    } else {
      dispatch(
        actions.UpDataState.setAdminPreview({
          isChange: true,
          Weibo: value,
        })
      );
      dispatch(actions.UpUIState.SetTipsVisible({ WeiboTipsVisible: false }));
    }
  };
  //检测手机
  UserComm_CheckPhoneNumber(strInput) {
    return /^[0-9]{11}$/.test(strInput);
  }
  //检测电话
  UserComm_CheckTelephone(strInput) {
    return /^([0-9\/-]){1,40}$/.test(strInput);
  }
  //检测QQ
  UserComm_CheckQQ(strInput) {
    return /^[1-9]*[1-9][0-9]{4,18}$/.test(strInput); //QQ号
  }
  //检测邮箱
  UserComm_CheckEmail(strInput) {
    //\S表示非空字符
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(strInput)) {
      return false;
    } else {
      return /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(
        strInput
      );
    }
  }
  constructList = (List) => {
    return List.map((child, index) => {
      return (
        <CheckBox key={index} value={child.IdentityID}>
          <span className="check-title" title={child.IdentityName}>
            {child.IdentityName}
          </span>
        </CheckBox>
      );
    });
  };

  changeCheckBox = (value) => {
    const { dispatch } = this.props;
    if (value.length <= 0) {
      return;
    }
    dispatch(actions.UpUIState.SetTipsVisible({ IdentityTipsVisible: false }));

    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: true,
        IdentityIDs: value.join(","),
      })
    );
  };
  render() {
    const { UIState, DataState } = this.props;
    let {
      AdminPreview: {
        IdentityType,
        TrasferData: { IdentityIDs },
      },
    } = DataState;
    let IdentityCode =
      typeof IdentityIDs === "string"
        ? IdentityIDs.split("-")[IdentityIDs.split("-").length - 1]
        : "";
    // IdentityType = IdentityType.concat(IdentityType, IdentityType);
    let IdentityList =
      typeof IdentityIDs === "string" ? IdentityIDs.split(",") : [];

    // 身份在ProductType为3出来
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let HaveIdentity = parseInt(ProductType) === 3;
    return (
      <div className="EditModal_Admin">
        <div className="Left" id="picUpload"></div>
        <div className="Right">
          <div className="row clearfix" style={{ marginTop: 18 + "px" }}>
            <span className="culonm-1">
              <span
                style={{
                  display:
                    this.state.UserKey === "change" ? "none" : "inline-block",
                }}
                className="must-icon"
              >
                *
              </span>
              {"工号："}
            </span>
            <div className="culonm-2">
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-userName"}
                visible={UIState.TipsVisible.UserIDTipsVisible}
                title={"工号" + this.state.UserIDTipsTitle}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {this.state.UserKey === "change" ? (
                  <span title={this.state.UserIDChange} className="UserID-text">
                    {this.state.UserIDChange}
                  </span>
                ) : (
                  <Input
                    maxLength={24}
                    id="123"
                    style={{ display: "block" }}
                    className="UserName-input"
                    type="text"
                    name="EditID"
                    value={this.state.UserIDChange}
                    onChange={this.onEditIDChange}
                    onBlur={this.onEditIDBlur}
                  />
                )}
              </Tips>
            </div>
          </div>
          <div className="row clearfix">
            <span className="culonm-1">
              <span className="must-icon">*</span>账号名称：
            </span>
            <div className="culonm-2 ">
              {/* <div className="EditName-tips"> */}
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-userName"}
                visible={UIState.TipsVisible.UserNameTipsVisible}
                title={this.state.UserNameTipsTitle}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {/* </div> */}
                <Input
                  className="UserName-input"
                  maxLength={20}
                  type="text"
                  name="EditName"
                  value={this.state.defaultUserName}
                  onChange={this.onEditNameChange}
                  onBlur={this.onEditNameBlur}
                />
              </Tips>
            </div>
          </div>
          {HaveIdentity ? (
            <div className="row clearfix">
              <span className="culonm-1">
                <span className="must-icon">*</span>身份：
              </span>
              <div className="culonm-2 culomn-identity">
                {/* <div className="EditName-tips"> */}
                <Tips
                  // placement="bottomRight"
                  // getPopupContainer={trigger => trigger.parentNode}
                  overlayClassName={"tips-edit tips-iden"}
                  visible={UIState.TipsVisible.IdentityTipsVisible}
                  title={"请选择身份"}
                  getPopupContainer={(e) => e.parentNode}
                  autoAdjustOverflow={false}
                >
                  {IdentityCode === "IC0009" ? (
                    <p
                      className="empty"
                      style={{ margin: 0, lineHeight: "40px" }}
                    >
                      院系管理员
                    </p>
                  ) : IdentityType instanceof Array &&
                    IdentityType.length !== 0 ? (
                    <CheckBoxGroup
                      onChange={this.changeCheckBox}
                      className={"identity-checkedBoxGroupMap"}
                      value={IdentityList}
                    >
                      {IdentityType.length <= 16 ? (
                        this.constructList(IdentityType)
                      ) : (
                        <Scrollbars
                          autoHeightMin={28}
                          autoHeightMax={90}
                          autoHeight={true}
                          autoHideTimeout={0}
                          autoHideDuration={0}
                          className="Scrollbars"
                          // renderTrackVertical={props=>{return this.MapPlainOptions().length <= 16 ? <div></div> : <div {...props}/>}}
                          style={{
                            display: "inline-block",
                            width: "unset",
                            // height: "unset",
                            // maxWidth: "400px",
                            minWidth: "100px",
                          }}
                        >
                          {this.constructList(IdentityType)}
                        </Scrollbars>
                      )}
                    </CheckBoxGroup>
                  ) : (
                    <p
                      className="empty"
                      style={{ margin: 0, lineHeight: "40px" }}
                    >
                      暂无身份
                    </p>
                  )}
                </Tips>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row clearfix">
            <span className="culonm-1">联系电话：</span>
            <div className="culonm-2 ">
              {/* <div className="EditName-tips"> */}
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-tel"}
                visible={UIState.TipsVisible.TelphoneTipsVisible}
                title={"应由数字及-/组成"}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {/* </div> */}
                <Input
                  className="More-input"
                  maxLength={20}
                  type="text"
                  name="Telephone"
                  value={this.state.defaultTelephone}
                  onChange={this.onEditTelChange}
                  onBlur={this.onEditTelBlur}
                />
              </Tips>
            </div>
          </div>
          <div className="row clearfix">
            <span className="culonm-1">QQ：</span>
            <div className="culonm-2 ">
              {/* <div className="EditName-tips"> */}
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-QQ"}
                visible={UIState.TipsVisible.QQTipsVisible}
                title={"应由数字组成"}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {/* </div> */}
                <Input
                  className="More-input"
                  maxLength={20}
                  type="text"
                  name="QQ"
                  value={this.state.defaultQQ}
                  onChange={this.onEditQQChange}
                  onBlur={this.onEditQQBlur}
                />
              </Tips>
            </div>
          </div>
          <div className="row clearfix">
            <span className="culonm-1">微信：</span>
            <div className="culonm-2 ">
              {/* <div className="EditName-tips"> */}
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-Weixin"}
                visible={UIState.TipsVisible.WeixinTipsVisible}
                title={"应为手机号/QQ号/邮箱地址或微信ID"}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {/* </div> */}
                <Input
                  className="More-input"
                  maxLength={40}
                  type="text"
                  name="Weixin"
                  value={this.state.defaultWeixin}
                  onChange={this.onEditWeixinChange}
                  onBlur={this.onEditWeixinBlur}
                />
              </Tips>
            </div>
          </div>
          <div className="row clearfix">
            <span className="culonm-1">微博：</span>
            <div className="culonm-2 ">
              {/* <div className="EditName-tips"> */}
              <Tips
                // placement="bottomRight"
                // getPopupContainer={trigger => trigger.parentNode}
                overlayClassName={"tips-edit tips-Weibo"}
                visible={UIState.TipsVisible.WeiboTipsVisible}
                title={"应为手机号或邮箱地址"}
                getPopupContainer={(e) => e.parentNode}
                autoAdjustOverflow={false}
              >
                {/* </div> */}
                <Input
                  className="More-input"
                  maxLength={40}
                  type="text"
                  name="Weibo"
                  value={this.state.defaultWeibo}
                  onChange={this.onEditWeiboChange}
                  onBlur={this.onEditWeiboBlur}
                />
              </Tips>
            </div>
          </div>
          {/* <div className="row clearfix">
            <span className="culonm-1">权限分配：</span>
            <div className="culonm-2 culonm-3">
              <Scrollbars style={{height:'350px', width: "100%" }}>
              {this.state.PowerList.map((power, index) => {
                // let checkAll = this.state.checkAll;
                // let indeterminate = this.state.indeterminate;
                // let plainOptions = [];
                // let plainOptionsArr = this.state.plainOptionsArr;
                // let checkedList = [];
                // let checkedListArr = this.state.checkedListArr;
                // //console.log(power)
                // power.PowerChild.map((child, index) => {
                //     plainOptions[index] = child.value;

                // })

                // plainOptionsArr[index] = plainOptions;
                // //console.log(plainOptionsArr,index)
                // indeterminate[index] = true;
                // checkAll[index] = this.state.data.Power.Powers[index].PowerChild.length !== 0 ? true : false

                // this.state.data.Power.Powers[index].PowerChild.map((child, key) => {
                //     checkedList[key] = child.value;
                // })
                // checkedListArr[index] = checkedList;
                // this.setState({
                //     checkAll: checkAll,
                //     indeterminate: indeterminate,
                //     checkedListArr: checkedListArr,
                //     plainOptionsArr:plainOptionsArr
                // })
                // //console.log(this.state.checkedListArr[index],this.state.PowerList[index])
                return (
                  <div key={this.state.PowerList[index].value}>
                    <CheckBox
                      className="checkBoxTips"
                      type='gray'
                      indeterminate={this.state.indeterminate[index]}
                      onChange={this.onCheckAllChange.bind(this, index)}
                      checked={this.state.checkAll[index]}
                    >
                      {power.PowerName}
                      <span className="checkTips">
                        [已选
                        <span style={{ color: "red",    verticalAlign: 'baseline' }}>
                          {this.state.PowerChildLen[index]
                            ? this.state.PowerChildLen[index]
                            : 0}
                        </span>
                        项/共<span style={{ color: "red",    verticalAlign: 'baseline' }}>
                          {this.state.PowerList[index].PowerChild
                            ? this.state.PowerList[index].PowerChild.length
                            : 0}
                        </span>项]
                      </span>
                    </CheckBox>
                    <CheckBoxGroup
                      className="CheckBoxGroup"
                      value={this.state.checkedListArr[index]}
                      onChange={this.onCheckChange.bind(this, index)}
                    >
                      {this.state.PowerList[index].PowerChild.map(
                        (child, index) => {
                          return (
                            <CheckBox
                              className="checkChild"
                              value={child.value}
                              type='gray'
                              key={child.value + index}
                              title={child.PowerChildName}
                            >
                              <span className='checkChild-title' title={child.PowerChildName}>{child.PowerChildName}</span>
                            </CheckBox>
                          );
                        }
                      )}
                    </CheckBoxGroup>
                  <div
                      style={{
                        display:
                          this.state.PowerList.length === index + 1
                            ? "none"
                            : "block"
                      }}
                      className="editModal-hr"
                    ></div>
                  </div>
                );
              })}
              </Scrollbars>
            </div>

          </div> */}
        </div>
      </div>
    );
  }
}

class MapPlainOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    let map = this.props.plainOptions.map((opt, index) => {
      return (
        <CheckBox className={"checkedBoxMap"} key={index} value={opt}>
          {opt}
        </CheckBox>
      );
    });
    //console.log(map)
    this.setState({
      map: map,
    });
  }
  render() {
    return <div>{this.state.map}</div>;
  }
}
MapPlainOptions.defaultProps = {
  plainOptions: [],
};
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(EditModal);
