import React, { Component, useRef, createRef } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import {
  Modal,
  Loading,
  Search,
  PagiNation,
  CheckBox,
  Empty,
  CheckBoxGroup,
  Table,
  Button,
} from "../../../../common";
import { Input, Tooltip } from "antd";
import DataChange from "../../action/data/DataChange";
import ApiActions from "../../action/data/Api";
import config from "../../../../common/js/config";
import AppAlertAction from "../../action/UI/AppAlertAction";
import UpUIState from "../../action/UpUIState";
import CropperModal from "../../../../common/js/CropperModal";
// import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
import HandleCollegeModal from "../Modal/HandleCollegeModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
import AreaCheck from "../../../../initGuide/components/areaCheck";
import SchoolBadge from "../SchoolBadge";

// import UIState from '../../reducers/UIState'
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M
// const default_schoolPic = config.SystemSettingProxy_univ+'Base/SysIcon/defaultSchoolIcon.png'
class SchoolnfoSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "",
          dataIndex: "orderNO",
          key: "orderNO",
          width: 58,
          align: "left",
          render: (key) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={key.Key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {key.orderNO >= 10 ? key.orderNO : "0" + key.orderNO}
                  </span>
                </label>
              </div>
            );
          },
        },
        {
          title: "院系名称",
          align: "center",
          // colSpan: 2,
          width: 210,
          key: "College",
          dataIndex: "College",
          sorter: true,
          render: (College) => {
            return (
              <div className="name-content">
                <span title={College.CollegeName} className="name-College">
                  {College.CollegeName ? College.CollegeName : "--"}
                </span>
              </div>
            );
          },
        },
        {
          title: "代码",
          align: "center",
          width: 100,
          dataIndex: "CollegeCode",
          key: "CollegeCode",
          sorter: true,
          render: (CollegeCode) => {
            return (
              <span title={CollegeCode} className="CollegeCode">
                {CollegeCode ? CollegeCode : "--"}
              </span>
            );
          },
        },
        // {
        //   title: "管理员账号",
        //   align: "center",
        //   width: 240,
        //   // dataIndex: "CollegeCode",
        //   key: "CollegeAccount",
        //   // sorter: true,
        //   render: ({ CollegeCode, SchoolCode } = data) => {
        //     return (
        //       <span
        //         title={
        //           CollegeCode && SchoolCode
        //             ? "cadimin" + "_" + SchoolCode + "_" + CollegeCode
        //             : ""
        //         }
        //         className="CollegeAccount"
        //       >
        //         {CollegeCode && SchoolCode
        //           ? "cadimin" + "_" + SchoolCode + "_" + CollegeCode
        //           : "--"}
        //       </span>
        //     );
        //   },
        // },
        {
          title: "用户总人数",
          align: "center",
          width: 80,
          dataIndex: "TotalUserCount",
          key: "TotalUserCount",
          render: (TotalUserCount) => {
            return (
              <span title={TotalUserCount} className="LeaderCount">
                {TotalUserCount ? TotalUserCount : "0"}
              </span>
            );
          },
        },

        {
          title: "学生人数",
          align: "center",
          width: 80,
          dataIndex: "StudentCount",
          key: "StudentCount",
          render: (StudentCount) => {
            return (
              <span title={StudentCount} className="StudentCount">
                {StudentCount ? StudentCount : "0"}
              </span>
            );
          },
        },
        {
          title: "教师人数",
          align: "center",
          width: 80,
          dataIndex: "TeacherCount",
          key: "TeacherCount",
          render: (TeacherCount) => {
            return (
              <span title={TeacherCount} className="TeacherCount">
                {TeacherCount ? TeacherCount : "0"}
              </span>
            );
          },
        },
        // {
        //   title: "领导人数",
        //   align: "center",
        //   width: 80,
        //   dataIndex: "LeaderCount",
        //   key: "LeaderCount",
        //   render: (LeaderCount) => {
        //     return (
        //       <span title={LeaderCount} className="LeaderCount">
        //         {LeaderCount ? LeaderCount : "0"}
        //       </span>
        //     );
        //   },
        // },
        {
          title: "操作",
          align: "center",
          key: "Key",
          width: 166,
          dataIndex: "Key",
          render: (Key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onEditCollegeClick.bind(this, Key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onDeleteCollegeClick.bind(this, Key)}
                  className="check-btn"
                >
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      edit_visible: false,
      active: 1,

      emptyNameTipsShow: false,
      emptyCodeTipsShow: false,
      tipsTitle: "",
      codeTipsTitle: "",
      selectedImageFile: null,
      coreModalVisible: false,
      coreResultImage: null,
      imageUploadModal: false,
      schoolLogo: "",
      onlineImg: "",
      checkedList: [],
      checkAll: false,
      keyword: "",
      searchWord: "",
      CancelBtnShow: "n",
      searchValue: "",
      type: "",
      pageSize: 4,
    };
    const { dispatch } = props;
    const { SchoolID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
    dispatch(DataChange.getCollegePreview());
    this.AreaCheck = createRef();
    this.SchoolBadge = createRef();
  }

  //切换年级的选中状态
  changeActive = (ID) => {
    let { dispatch, periodInfo, schoolInfo } = this.props;
    let newPeriodInfo = periodInfo.map((item) => {
      if (item.ID === ID) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    dispatch({
      type: DataChange.INIT_PERIOD_LIST,
      data: newPeriodInfo,
    });
  };

  //监听右上角编辑的状态
  openEdite = () => {
    this.setState({
      edit_visible: true,
    });
  };

  //导入院系
  onImportCollegeClick = () => {
    // dconsole.log("import");
    window.open("/html/systemSetting/#/MainContent/Import");
  };
  //确认保存编辑好的信息
  editComfirm = () => {
    let {
      primaryNum,
      middleNum,
      highNum,
      SchoolCode,
      SchoolName,
      SchoolLogoUrl,
      SchoolSessionType,
      SchoolTel,
      SchoolLinkman,
    } = this.props.schoolInfo;
    const { dispatch, periodInfo } = this.props;
    let SchoolType = ""; //学制的代码数字
    // let SchoolSessionType = ""; //学制类型对应的参数（7=>3/6/3 或者5/4/3）
    // console.log(primaryNum, middleNum, SchoolCode, SchoolName, SchoolLogoUrl);
    let {
      provinceID,
      showProvinceTip,
      hideProvinceTip,
      cityID,
      hideCityTip,
      showCityTip,
      countyID,
      showCountyTip,
      hideCountyTip,
    } = this.AreaCheck.current;
    let ImgUrl = "";
    if (this.SchoolBadge.current) {
      ImgUrl = this.SchoolBadge.current.ImgUrl;
    } else {
      ImgUrl = schoolInfo.SchoolLogoUrl_Long;
    }
    // { ImgUrl } = this.SchoolBadge.current;
    highNum = highNum ? highNum : "3";
    // if (
    //   periodInfo[0].checked === true &&
    //   periodInfo[1].checked === false &&
    //   periodInfo[2].checked === false
    // ) {
    //   SchoolType = 1; //只有小学
    //   SchoolSessionType = `${primaryNum}/0/0`;
    // } else if (
    //   periodInfo[1].checked === true &&
    //   periodInfo[0].checked === false &&
    //   periodInfo[2].checked === false
    // ) {
    //   SchoolType = 2; //只有初中
    //   SchoolSessionType = `0/${middleNum}/0`;
    // } else if (
    //   periodInfo[0].checked === true &&
    //   periodInfo[1].checked === true &&
    //   periodInfo[2].checked === false
    // ) {
    //   SchoolType = 3; //小学加初中
    //   SchoolSessionType = `${primaryNum}/${middleNum}/0`;
    // } else if (
    //   periodInfo[2].checked === true &&
    //   periodInfo[0].checked === false &&
    //   periodInfo[1].checked === false
    // ) {
    //   SchoolType = 4; //只有高中
    //   SchoolSessionType = `0/0/${highNum}`;
    // } else if (
    //   periodInfo[0].checked === true &&
    //   periodInfo[1].checked === true &&
    //   periodInfo[2].checked === true
    // ) {
    //   SchoolType = 7; //小学+初中+高中
    //   SchoolSessionType = `${primaryNum}/${middleNum}/${highNum}`;
    // } else if (
    //   periodInfo[0].checked === false &&
    //   periodInfo[1].checked === true &&
    //   periodInfo[2].checked === true
    // ) {
    //   SchoolType = 6; //初中+高中
    //   SchoolSessionType = `0/${middleNum}/${highNum}`;
    // } else {
    //   SchoolType = "error";
    // }

    // console.log(SchoolType);
    //如果学校名称或者学校代码为空则显示错误信息
    if (
      // SchoolCode === "" ||
      SchoolName === ""
    ) {
      dispatch(AppAlertAction.alertError({ title: "学校代码或名称不能为空!" }));
      console.log(SchoolName);
    } else {
      if (SchoolName.length >= 21) {
        dispatch(AppAlertAction.alertError({ title: "学校名称过长!" }));
        this.setState({
          emptyNameTipsShow: true,
        });
        return;
      }
      // if (!/^[a-zA-Z0-9]+$/.test(SchoolCode)) {
      //   dispatch(AppAlertAction.alertError({ title: "学校代码需为纯数字" }));
      //   this.setState({
      //     emptyCodeTipsShow: true,
      //   });
      //   return;
      // }
      // if (SchoolCode.length >= 21) {
      //   dispatch(AppAlertAction.alertError({ title: "学校代码过长!" }));
      //   this.setState({
      //     emptyCodeTipsShow: true,
      //   });
      //   return;
      // }
      if (!SchoolSessionType) {
        dispatch(AppAlertAction.alertError({ title: "请选择学校类型" }));
        this.setState({
          emptyCodeTipsShow: true,
        });
        return;
      }
      //当SchoolType 不是ERROR的时候才执行post数据

      //根据学制参照情况判断SchoolSessionType
      // if (SchoolType === 7 || SchoolType === 3 || SchoolType === 6) {
      //     SchoolSessionType = `${primaryNum}/${middleNum}`
      // }
      // else {
      //     SchoolSessionType = "6/3"
      // }
      //判断省市县
      if (provinceID) {
        // provinceOk = true;

        hideProvinceTip();
      } else {
        showProvinceTip();
        return;
      }

      if (cityID) {
        // cityOk = true;

        hideCityTip();
      } else {
        showCityTip();
        return;
      }

      if (countyID) {
        // countyOk = true;

        hideCountyTip();
      } else {
        showCountyTip();
        return;
      }

      this.setState(
        {
          edit_visible: false,
          emptyNameTipsShow: false,
          emptyCodeTipsShow: false,
        },
        () => {
          dispatch({
            type: DataChange.SEMESTER_LOADING_HIDE,
            data: true,
          });
          const { SchoolID, UserID } = JSON.parse(
            sessionStorage.getItem("UserInfo")
          );

          ApiActions.postMethod("/SysMgr/Setting/EditSchoolInfo_Univ", {
            UserID: UserID,
            SchoolID: SchoolID,
            SchoolName: SchoolName,
            SchoolCode: SchoolCode,
            SchoolTel: SchoolTel,
            SchoolLinkman: SchoolLinkman,
            SchoolType: 2,
            SchoolSessionType: SchoolSessionType,
            SchoolImgUrl:
              this.state.onlineImg === ""
                ? SchoolLogoUrl
                : this.state.onlineImg,
            CountyID: countyID,
            SchoolImgUrl_Long: ImgUrl,
          }).then((data) => {
            console.log(data);
            if (data === 0) {
              console.log("success");
              dispatch(AppAlertAction.alertSuccess({ title: "修改成功" }));
              dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
            } else {
              dispatch({
                type: DataChange.SEMESTER_LOADING_HIDE,
                data: false,
              });
              dispatch(
                AppAlertAction.alertError({ title: data ? data : "未知异常" })
              );
            }
          });
        }
      );
    }
  };

  //取消（关闭）编辑框
  editCancel = () => {
    this.setState({
      edit_visible: false,
      emptyNameTipsShow: false,
      emptyCodeTipsShow: false,
    });
    const { SchoolID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    const { dispatch } = this.props;
    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
  };

  //监听学制（radio）的选择情况
  handelSchoolSystem = (e) => {
    let { schoolInfo, dispatch, periodInfo } = this.props;
    // console.log("当前点击值" + e.target.value);
    // console.log("一开始时的内容" + schoolInfo.primaryNum);

    if (Object.keys(schoolInfo).length !== 0) {
      //判断小学的学制选择情况
      // if(e.target.value==="6"||e.target.value==="5"){
      //     // 如果后台的也是六年制,视为取消当前选中的六年制
      //     if(schoolInfo.primaryNum===e.target.value){
      //             schoolInfo={
      //                 ...schoolInfo,
      //                 primaryNum:"0"
      //             }

      //     }else{
      //         schoolInfo={
      //             ...schoolInfo,
      //             primaryNum:e.target.value
      //         }
      //     }

      // }
      if (
        e.target.value === "3" ||
        e.target.value === "4" ||
        e.target.value === "5"
      ) {
        schoolInfo = {
          ...schoolInfo,
          SchoolSessionType: e.target.value,
          // primaryNum: "5",
          // middleNum: "4",
        };
      }
    }

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //监听学校代码的获取事件
  getSchoolCode = (e) => {
    let valueableCode = e.target.value.replace(/\s*/g, "").substring(0, 20);
    let timerID = "";

    if (e.target.value !== "") {
      this.setState({
        emptyCodeTipsShow: false,
      });
    }
    let isNum = /^\d+$/.test(e.target.value);
    if (isNum === false) {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码必须是数字",
      });
    }
    if (e.target.value.length > 20) {
      this.setState({
        codeTipsTitle: "学校代码不能超过20位数字",
        emptyCodeTipsShow: true,
      });

      timerID = setTimeout(() => {
        this.setState(
          {
            emptyCodeTipsShow: false,
          },
          () => {
            clearTimeout(timerID);
          }
        );
      }, 1000);
    }
    let { schoolInfo, dispatch } = this.props;
    schoolInfo = {
      ...schoolInfo,
      SchoolCode:
        e.target.value.length > 20
          ? valueableCode.trim()
          : e.target.value.trim(),
    };

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //学校代码输入框失去焦点后的回调事件
  visibleCode = (e) => {
    if (e.target.value === "") {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码不能为空",
      });
    } else if (e.target.value.length > 20) {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码不能超过20位数字",
      });
    } else {
      this.setState({
        emptyCodeTipsShow: false,
      });
    }
  };

  //监听学校名字改变的事件
  getSchoolName = (e) => {
    let { schoolInfo, dispatch } = this.props;
    let timerID = 0;

    //定义输入数据的有效长度
    let valueableLength = "";
    //当学校名称不为空，提示框信息不显示

    if (e.target.value !== "") {
      this.setState({
        emptyNameTipsShow: false,
      });

      //当输入数据长度超过20,提示学校名称长度不能超过20
      // 截取前20个作为输入
      if (e.target.value.length > 20) {
        valueableLength = e.target.value.substring(0, 20);
        this.setState({
          tipsTitle: "学校名称不能超过20个字符",
          emptyNameTipsShow: true,
        });
        timerID = setTimeout(() => {
          this.setState(
            {
              emptyNameTipsShow: false,
            },
            () => {
              clearInterval(timerID);
            }
          );
        }, 1000);
      }
    }
    schoolInfo = {
      ...schoolInfo,
      SchoolName:
        e.target.value.length > 20
          ? valueableLength.trim()
          : e.target.value.trim(),
    };

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //学校名称输入框失去焦点后的回调事件
  visibleName = (e) => {
    if (e.target.value === "") {
      this.setState({
        emptyNameTipsShow: true,
        tipsTitle: "学校名称不能为空",
      });
    } else if (e.target.value.length > 20) {
      this.setState({
        emptyNameTipsShow: true,
        tipsTitle: "学校名称不能超过20个字符",
      });
    } else {
      this.setState({
        emptyNameTipsShow: false,
      });
    }
  };

  //配合使用onClick 无用的onChange回调
  tempFunction = () => {};

  //上传图片的时候file输入框的监听事件
  // handleFileChange = (e) => {
  //     const { dispatch } = this.props
  //     const file = e.target.files[0];
  //     if (file) {
  //         if (file.size <= MAX_FILE_SIZE) {
  //             this.setState({
  //                 selectedImageFile: file //将文件占时存放到state中
  //             }, () => {
  //                 this.setState({
  //                     coreModalVisible: true//弹出裁剪框
  //                 })
  //                 console.log(file)
  //             })
  //         }
  //         else {
  //             dispatch(AppAlertAction.alertError({ title: "文件过大" }))
  //         }
  //     }
  // }

  // handleGetResultImgUrl = key => blob => {
  //     const str = URL.createObjectURL(blob)
  //     this.setState({
  //       [key]: str
  //     })
  //   }

  //图片上传弹层点击事件
  imageUpload = () => {
    this.setState({
      imageUploadModal: true,
      edit_visible: true,
    });
  };

  //图片上传弹层关闭和取消事件
  upLoadCancel = () => {
    this.setState({
      imageUploadModal: false,
      edit_visible: true,
    });
    // console.log("hhhh")
  };
  //图片上传弹层确认按钮点击事件
  handleGetResultImgUrl = (blob, filePath) => {
    let { dispatch, schoolInfo } = this.props;
    console.log(blob);
    const str = URL.createObjectURL(blob);

    this.setState({
      schoolLogo: str,
      onlineImg: filePath,
      //[key]: this.state.baseUrl+'/http_subjectResMgr/'+filePath
    });
    schoolInfo = {
      ...schoolInfo,
      SchoolLogoUrl: str,
    };
    console.log(str);
    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //监听使用默认图片按钮
  useDefault = () => {
    let { dispatch, schoolInfo, serverAddress } = this.props;
    this.setState({
      schoolLogo: `${serverAddress}SysSetting/Attach/default.png `,
      onlineImg: `/SysSetting/Attach/default.png`,
    });

    schoolInfo = {
      ...schoolInfo,
      SchoolLogoUrl: `${serverAddress}SysSetting/Attach/default.png `,
    };
    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };
  //裁剪工具所返回的参数判断，overSize图片过大，fileNull未选择图片进行上传
  // paramDetect=(param)=>{
  //     const {dispatch}=this.props
  //     if(param==="overSize"){

  //         dispatch(AppAlertAction.alertError({title:"图片过大"}))
  //     }
  //     else if(param==="fileNull"){
  //         dispatch(AppAlertAction.alertTips({title:"你还没选择图片喔~",cancelTitle:"确定"}))
  //     }
  // }
  //取消搜索
  onCancelSearch = () => {
    const { dispatch } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: "",
      searchValue: "",
      CancelBtnShow: "n",
      // pagination: 1
    });
    dispatch(
      DataChange.getCollegePreview(
        "",
        1,
        this.state.sortType,
        this.state.sortFiled,
        this.state.pageSize
      )
    );
  };
  // 院系搜索
  onCollegeSearch = (e) => {
    const { dispatch } = this.props;
    if (e.value === "") {
      dispatch(AppAlertAction.alertError({ title: `请输入关键字搜索 ` }));
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      e.value
    );
    if (!Test) {
      dispatch(
        AppAlertAction.alertError({ title: `输入的名称或代码格式不正确 ` })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: "&keyword=" + e.value,
      searchValue: e.value,
      CancelBtnShow: "y",
      // pagination: 1
    });
    dispatch(
      DataChange.getCollegePreview(
        e.value,
        1,
        this.state.sortType,
        this.state.sortFiled,
        this.state.pageSize
      )
    );
    // //  console.log(e)
  };
  // 修改搜索关键字
  onChangeSearch = (e) => {
    this.setState({
      searchValue: e.target.value.trim(),
    });
  };
  // 添加学院
  onAddCollegeClick = (key) => {
    const { dispatch, handleCollegeMsg, collegePreview } = this.props;

    dispatch(DataChange.setCollegeInitMsg());
    dispatch({ type: UpUIState.ADD_COLLEGE_OPEN });
  };
  // 编辑学院
  onEditCollegeClick = (key) => {
    const { dispatch, handleCollegeMsg, collegePreview } = this.props;
    let { CollegeName, CollegeID } = collegePreview.CollegeList[key].College;
    let CollegeCode = collegePreview.CollegeList[key].CollegeCode;
    dispatch(
      DataChange.setCollegeInitMsg({
        CollegeName,
        CollegeCode,
        CollegeID,
      })
    );
    dispatch({ type: UpUIState.EDIT_COLLEGE_OPEN });
  };
  // 删除学院
  onDeleteCollegeClick = (key) => {
    const { dispatch, collegePreview } = this.props;
    let url = "/DeleteCollege";
    // let checkList = this.state.checkedList;
    let CollegeID = collegePreview.CollegeList[key].College.CollegeID;
    let pagination = collegePreview.currentIndex;
    dispatch(
      AppAlertAction.alertQuery({
        title: `确定删除该学院吗？`,
        ok: () => {
          return this.onAlertQueryOk.bind(this, CollegeID);
        },
      })
    );
    // dispatch(
    //   DataChange.DeleteCollege({
    //     CollegeIDs: key,
    //     success: () => {
    //       dispatch(
    //         DataChange.getCollegePreview(
    //           this.state.searchValue,
    //           pagination,
    //           this.state.sortType,
    //           this.state.sortFiled
    //         )
    //       );
    //       this.setState({
    //         checkedList: [],
    //         checkAll: false,
    //       });

    //       dispatch(AppAlertAction.closeAlert(dispatch));

    //       dispatch(AppAlertAction.alertSuccess({ title: `操作成功` }));
    //     },
    //   })
    // );
  };

  // 选择学院
  OnCheckAllChange = (e) => {
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.collegePreview.KeyList,
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
        checkedList.length === this.props.collegePreview.KeyList.length
          ? true
          : false,
    });
  };
  //删除所选学院
  onDeleteAllClick = () => {
    const { dispatch, collegePreview } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(AppAlertAction.alertError({ title: `请先勾选所要删除的学院` }));
    } else {
      let checkList = this.state.checkedList;
      let dataList = collegePreview.CollegeList;
      let Total = collegePreview.totalCount;
      let CollegeIDList = checkList.map((child, index) => {
        return dataList[index].College.CollegeID;
      });
      let CollegeIDListString = CollegeIDList.join();
      dispatch(
        AppAlertAction.alertQuery({
          title: `确定删除勾选的学院吗？`,
          ok: () => {
            return this.onAlertQueryOk.bind(this, CollegeIDListString);
          },
        })
      );
    }
  };
  onAlertQueryOk = (CollegeIDListString) => {
    const { dispatch, collegePreview } = this.props;
    let url = "/DeleteCollege";

    let pagination = collegePreview.currentIndex;
    dispatch(
      DataChange.DeleteCollege({
        CollegeIDs: CollegeIDListString,
        success: () => {
          dispatch(
            DataChange.getCollegePreview(
              this.state.searchValue,
              pagination,
              this.state.sortType,
              this.state.sortFiled,
              this.state.pageSize
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });

          dispatch(AppAlertAction.closeAlert(dispatch));

          dispatch(AppAlertAction.alertSuccess({ title: `操作成功` }));
        },
      })
    );
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
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch, collegePreview } = this.props;
    // //  console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "College" || sorter.columnKey === "CollegeCode")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "DESC"
          : sorter.order === "ascend"
          ? "ASC"
          : "";
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: sortType,
        sortFiled:
          sorter.columnKey === "College" ? "CollegeName" : "CollegeCode",
      });
      dispatch(
        DataChange.getCollegePreview(
          this.state.searchValue,
          collegePreview.currentIndex,
          sortType,
          sorter.columnKey === "College" ? "CollegeName" : "CollegeCode",
          this.state.pageSize
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
        DataChange.getCollegePreview(
          this.state.searchValue,
          collegePreview.currentIndex,
          "",
          "",
          this.state.pageSize
        )
      );
    }
  };

  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      // pagination: e
    });
    dispatch(
      DataChange.getCollegePreview(
        this.state.searchValue,
        e,
        this.state.sortType,
        this.state.sortFiled,
        this.state.pageSize
      )
    );
  };
  onShowSizeChange = (current, pageSize) => {
    let { dispatch } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: 1,
      pageSize,
    });
    dispatch(
      DataChange.getCollegePreview(
        this.state.searchValue,
        1,
        this.state.sortType,
        this.state.sortFiled,
        pageSize
      )
    );
  };
  onEditCollegeOk = () => {
    const { dispatch, DataUpdate, UIState } = this.props;
    let CollegeCodeError = false;
    let CollegeNameError = false;
    dispatch(
      DataChange.checkCollegeCode((Error1, Error2) => {
        CollegeCodeError = Error2;
      })
    );
    dispatch(
      DataChange.checkCollegeName((Error1, Error2) => {
        CollegeNameError = Error2;
      })
    );
    if (
      UIState.EditModalTipsVisible.CollegeCodeTipsVisible ||
      UIState.EditModalTipsVisible.CollegeNameTipsVisible
    ) {
      return;
    }
    if (CollegeNameError && CollegeCodeError) {
      dispatch(AppAlertAction.alertError({ title: `学院名称和代码没有修改` }));
      return;
    }
    dispatch(
      DataChange.EditCollege({
        ...DataUpdate.handleCollegeMsg,
        success: () => {
          dispatch(UpUIState.editCollegeModalClose());
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(
            DataChange.getCollegePreview(
              this.state.searchValue,
              DataUpdate.collegePreview.currentIndex,
              this.state.sortType,
              this.state.sortFiled,
              this.state.pageSize
            )
          );
        },
      })
    );
  };
  onEditCollegeCancel = () => {
    const { dispatch, UIState } = this.props;
    dispatch(UpUIState.editCollegeModalClose());
  };
  onAddCollegeOk = () => {
    const { dispatch, DataUpdate, UIState } = this.props;
    let CollegeCodeError = false;
    let CollegeNameError = false;
    dispatch(
      DataChange.checkCollegeCode((Error1) => {
        CollegeCodeError = Error1;
      })
    );
    dispatch(
      DataChange.checkCollegeName((Error1) => {
        CollegeNameError = Error1;
      })
    );

    if (
      UIState.EditModalTipsVisible.CollegeCodeTipsVisible ||
      UIState.EditModalTipsVisible.CollegeNameTipsVisible ||
      CollegeNameError ||
      CollegeCodeError
    ) {
      return;
    }
    dispatch(
      DataChange.AddCollege({
        CollegeCode: DataUpdate.handleCollegeMsg.CollegeCode,
        CollegeName: DataUpdate.handleCollegeMsg.CollegeName,
        success: () => {
          dispatch(UpUIState.addCollegeModalClose());
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(
            DataChange.getCollegePreview(
              this.state.searchValue,
              // DataUpdate.collegePreview.currentIndex,
              1,
              this.state.sortType,
              this.state.sortFiled,
              this.state.pageSize
            )
          );
        },
      })
    );
  };
  onAddCollegeCancel = () => {
    const { dispatch } = this.props;
    dispatch(UpUIState.addCollegeModalClose());
  };
  render() {
    const {
      schoolInfo,
      semesterloading,
      periodInfo,
      serverAddress,
      UIState,
      DataUpdate,
    } = this.props;
    let { collegePreview } = DataUpdate;
    let {
      CityID,
      CityName,
      CountyID,
      CountyName,
      ProvinceID,
      ProvinceName,
      SchoolCode,
    } = schoolInfo;
    let {
      currentIndex,
      totalCount,
      List,
      CollegeList,
      KeyList,
    } = collegePreview;
    const { UserID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    // console.log(totalCount,currentIndex)
    let schoolSys = "";
    let schoolLength = "";

    //根据学校类型选择渲染内容
    switch (
      schoolInfo.SchoolSessionType //SchoolType:SchoolType为1：
    ) {
      // 学校类型；1表示本科，2表示专科，3，表示本科和专科
      // case 7:
      //   schoolSys = `${schoolInfo.primaryType}+${schoolInfo.middleType}+${schoolInfo.highType}`;
      //   schoolLength = "十二年一贯制";
      //   break;

      // case 1:
      //   schoolSys = schoolInfo.primaryType;
      //   schoolLength =
      //     schoolInfo.primaryNum === "6" ? "六年一贯制" : "五年一贯制";

      //   break;

      // case 2:
      //   schoolSys = schoolInfo.middleType;
      //   schoolLength =
      //     schoolInfo.middleNum === "3" ? "三年一贯制" : "四年一贯制";
      //   break;

      case "3":
        // schoolSys = `${schoolInfo.primaryType}+${schoolInfo.middleType}`;
        schoolLength = "三年制";
        break;

      case "4":
        // schoolSys = "三年制初中";
        schoolLength = "四年制";
        // selected = "4"
        break;
      case "5":
        // schoolSys = "三年制初中";
        schoolLength = "五年制";
        // selected = "4"
        break;
      // case 6:
      //   schoolSys = `${schoolInfo.middleType}+三年制高中`;
      //   schoolLength =
      //     schoolInfo.middleNum === "3" ? "六年一贯制" : "七年一贯制";
      //   break;

      default:
        schoolLength = "学制获取失败";

        schoolSys = "学制获取失败";
    }
    let CollegeList2 = CollegeList;
    if (CollegeList2 instanceof Array) {
      CollegeList = [];

      CollegeList2.forEach((child) => {
        child.SchoolCode = SchoolCode;
        CollegeList.push(child);
      });
    }

    // 多学校：当ProductType为3的时候不出现长条校徽
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let isMoreSchool = parseInt(ProductType) === 3;
    return (
      <Loading spinning={semesterloading} opacity={false} tip="请稍后...">
        <div className="school-InfoSetting">
          <div className="edite-info-box edit-info-box-2">
            <span className="top-tips">学校基础资料</span>
            <div
              className="edite-info"
              onClick={this.openEdite}
              title="点击编辑学校信息"
            >
              <span></span>编辑
            </div>
          </div>
          <div className="hr"></div>
          <div className="school-msg-box">
            <div className="school-logo">
              <img
                src={
                  schoolInfo.SchoolLogoUrl === "" ||
                  schoolInfo.SchoolLogoUrl === null
                    ? default_schoolPic
                    : schoolInfo.SchoolLogoUrl
                }
                alt={
                  schoolInfo.SchoolLogoUrl === "" ||
                  schoolInfo.SchoolLogoUrl === null
                    ? "图片丢失"
                    : schoolInfo.SchoolLogoUrl
                }
              />
            </div>
            <div
              className="school-msg-box-2"
              style={isMoreSchool ? { marginTop: "30px" } : {}}
            >
              <div className="school-name" title={schoolInfo.SchoolName}>
                学校名称:
                <span>{schoolInfo.SchoolName}</span>
              </div>
              <div className="school-info">
                {!isMoreSchool ? (
                  <div className="school-badge">
                    长条校徽:
                    <i
                      className="SchoolLogoUrl_Long"
                      style={{
                        background: `url(${schoolInfo.SchoolLogoUrl_Long}) no-repeat center center/280px 40px`,
                      }}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
                <div className="school-code">
                  学校代码: <span>{schoolInfo.SchoolCode}</span>
                </div>
                <div className="school-type">
                  学校类型:
                  <span>{schoolLength}</span>
                  {/* ({schoolSys}) */}
                </div>
                {CountyID ? (
                  <div className="school-type">
                    学校区域:
                    <span>
                      {ProvinceName + ">" + CityName + ">" + CountyName}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="edite-info-box edit-info-box-2">
            <span className="top-tips">院系基础资料</span>
            <div
              className="add-info"
              onClick={this.onImportCollegeClick.bind(this)}
              title="批量导入院系"
            >
              <span></span>批量导入院系
            </div>
            <div
              className="import-info"
              onClick={this.onAddCollegeClick.bind(this)}
              title="单个添加院系"
            >
              <span></span>单个添加院系
            </div>
          </div>
          <div className="hr"></div>
          <div className="college-msg-box">
            <div className="college-top-box">
              <span className="college-msg-total">
                总共有<span className="college-msg-num">[{totalCount}]</span>
                个院系
              </span>
              <div className="college-search-box">
                <Search
                  placeHolder="请输入院系名称或代码进行搜索..."
                  onClickSearch={this.onCollegeSearch.bind(this)}
                  height={30}
                  width={270}
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
                    {CollegeList instanceof Array &&
                    CollegeList.length !== 0 ? (
                      <Table
                        className="table"
                        loading={UIState.AppLoading.TableLoading}
                        columns={this.state.columns}
                        pagination={false}
                        onChange={this.onTableChange.bind(this)}
                        dataSource={CollegeList}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y"
                            ? "暂无符合条件的学院"
                            : "暂无学院"
                        }
                        type="3"
                        style={{ marginTop: "33px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {totalCount > 0 ? (
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
                      showSizeChanger
                      showQuickJumper
                      onShowSizeChange={this.onShowSizeChange}
                      pageSize={this.state.pageSize}
                      current={currentIndex}
                      hideOnSinglePage={totalCount === 0 ? true : false}
                      total={totalCount}
                      pageSizeOptions={[4, 10, 20, 50]}
                      onChange={this.onPagiNationChange}
                    ></PagiNation>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
          <Modal
            type="1"
            title="编辑学院"
            className="Modal-HandleCollegeModal"
            onOk={this.onEditCollegeOk.bind(this)}
            onCancel={this.onEditCollegeCancel}
            width={"400px"}
            bodyStyle={{ height: "150px" }}
            visible={UIState.AppModal.EditCollegeVisible}
            okText="保存"
            destroyOnClose={true}
          >
            <HandleCollegeModal type="edit"></HandleCollegeModal>
          </Modal>
          <Modal
            type="1"
            title="添加学院"
            onOk={this.onAddCollegeOk.bind(this)}
            onCancel={this.onAddCollegeCancel.bind(this)}
            width={"400px"}
            className="Modal-HandleCollegeModal"
            bodyStyle={{ height: "150px" }}
            visible={UIState.AppModal.AddCollegeVisible}
            okText="保存"
            destroyOnClose={true}
          >
            <HandleCollegeModal type="add"></HandleCollegeModal>
          </Modal>
          <Modal
            type="1"
            onClick={this.openEdite}
            title="编辑学校基础资料"
            onOk={this.editComfirm}
            onCancel={this.editCancel}
            width={"784px"}
            bodyStyle={{ height: isMoreSchool ? "330px" : "372px" }}
            visible={this.state.edit_visible}
            okText="保存"
            destroyOnClose={true}
          >
            <div className="editContent">
              <div className="content-left">
                <div className="school-logo">
                  <img
                    src={
                      schoolInfo.SchoolLogoUrl === "" ||
                      schoolInfo.SchoolLogoUrl === null
                        ? default_schoolPic
                        : schoolInfo.SchoolLogoUrl
                    }
                    alt=""
                  />
                </div>

                <Button className="btn choose-pic" onClick={this.imageUpload}>
                  上传图片
                </Button>

                <CropperModal
                  Visiable={this.state.imageUploadModal}
                  onClose={this.upLoadCancel}
                  onSubmit={(blob, filePath) =>
                    this.handleGetResultImgUrl(blob, filePath)
                  }
                  diskName="SysSetting"
                  UpDataUrl={`${serverAddress}SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`}
                  // onCheck={(param)=>this.paramDetect(param)}
                ></CropperModal>

                <Button className="btn upload-pic" onClick={this.useDefault}>
                  使用默认
                </Button>
                <p className="upload-tips">
                  上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB
                </p>
              </div>

              <div className="content-right">
                <div className="row clearfix win-shcool-name">
                  <span className="left">学校名称:</span>
                  <span className="right">
                    <Tooltip
                      visible={this.state.emptyNameTipsShow}
                      placement="right"
                      title={this.state.tipsTitle}
                    >
                      <input
                        type="text"
                        maxLength="20"
                        width={200}
                        value={schoolInfo.SchoolName}
                        onChange={this.getSchoolName}
                        onBlur={this.visibleName}
                      />
                    </Tooltip>
                  </span>
                </div>
                {!isMoreSchool ? (
                  <div className={"row clearfix row-SchoolBadge"}>
                    <span className="left">长条校徽:</span>
                    <span className="right">
                      <SchoolBadge
                        schoolBadge={
                          typeof schoolInfo.SchoolLogoUrl_Long === "string"
                            ? schoolInfo.SchoolLogoUrl_Long.replace(
                                ResHttpRootUrl,
                                ""
                              )
                            : ""
                        }
                        ref={this.SchoolBadge}
                      ></SchoolBadge>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="row clearfix win-school-code">
                  <span className="left">学校代码:</span>
                  <span className="right">
                    <Tooltip
                      visible={this.state.emptyCodeTipsShow}
                      placement="right"
                      title={this.state.codeTipsTitle}
                    >
                      {/* <input
                      type="text"
                      maxLength="20"
                      disabled={true}
                      value={schoolInfo.SchoolCode}
                      onChange={this.getSchoolCode}
                      onBlur={this.visibleCode}
                    /> */}
                      <span
                        style={{
                          lineHeight: "20px",
                          height: "20px",
                          // paddingLeft: "10px",
                          display: "inline-block",
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#ff6600",
                        }}
                      >
                        {schoolInfo.SchoolCode}
                      </span>
                    </Tooltip>
                  </span>
                </div>

                <div className="  row clearfix win-school-type">
                  {/* <div style={{ lineHeight: "28px" }}>学校学制:</div> */}
                  <span className="left">学校学制:</span>

                  <div className="primary-school right">
                    <div className="radio" style={{ display: "inline-block" }}>
                      <input
                        type="radio"
                        value="3" /* checked={schoolInfo.primaryNum==="5"}  */
                        checked={schoolInfo.SchoolSessionType === "3"}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                        style={{ verticalAlign: "middle" }}
                      />
                      三年制
                    </div>

                    <div className="radio" style={{ display: "inline-block" }}>
                      <input
                        type="radio"
                        value="4" /* checked={schoolInfo.primaryNum==="5"}  */
                        checked={schoolInfo.SchoolSessionType === "4"}
                        onChange={this.tempFunction}
                        style={{ verticalAlign: "middle" }}
                        onClick={this.handelSchoolSystem}
                      />
                      四年制
                    </div>

                    <div className="radio" style={{ display: "inline-block" }}>
                      <input
                        type="radio"
                        value="5" /* checked={schoolInfo.primaryNum==="6"}  */
                        checked={schoolInfo.SchoolSessionType === "5"}
                        onChange={this.tempFunction}
                        style={{ verticalAlign: "middle" }}
                        onClick={this.handelSchoolSystem}
                      />
                      五年制
                    </div>
                  </div>
                </div>
                <div className={"row clearfix"}>
                  <span className="left">所在区域:</span>
                  <span className="right">
                    <AreaCheck
                      ProvinceID={ProvinceID}
                      CityID={CityID}
                      CountyID={CountyID}
                      ref={this.AreaCheck}
                    ></AreaCheck>
                  </span>
                  <div className="edit-tips">
                    <span></span>
                    修改学校类型会引起基础数据重新初始化，请谨慎操作
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  const { DataUpdate, UIState } = state;

  const {
    schoolInfo,
    semesterloading,
    periodInfo,
    serverAddress,
    collegePreview,
    handleCollegeMsg,
  } = DataUpdate;
  // console.log(periodInfo);

  return {
    schoolInfo,
    semesterloading,
    periodInfo,
    serverAddress,
    UIState,
    DataUpdate,
    collegePreview,
    handleCollegeMsg,
  };
};
export default connect(mapStateToProps)(SchoolnfoSetting);
