import AccessAction from "../action/data/AccessAction";
// import history from "../../containers/history";
let ApplicationType = {
  "1": {
    value: `1`,
    title: `教学类`,
  },
  "2": {
    value: `2`,
    title: "辅助工具类",
  },
  "3": {
    value: `3`,
    title: `办公类`,
  },
  "4": {
    value: `4`,
    title: `后台管理类`,
  },
  "5": {
    value: `5`,
    title: `资源库类`,
  },
};
let UserType = {
  0: {
    value: `0`,
    title: `管理员`,
  },
  1: {
    value: `1`,
    title: "教师",
  },
  2: {
    value: `2`,
    title: `学生`,
  },
  3: {
    value: `3`,
    title: `家长`,
  },
  7: {
    value: `7`,
    title: `领导`,
  },
};
let DeviceTypes = {
  android: {
    value: `android`,
    title: `安卓`,
  },
  ios: {
    value: `ios`,
    title: "IOS",
  },
  pc: {
    value: `pc`,
    title: `PC`,
  },
};
const AccessData = (
  state = {
    StaticData: {
      ApplicationStatus: [
        {
          value: "2",
          title: "全部",
        },
        {
          value: "1",
          title: "已开启",
        },
        {
          value: "0",
          title: `已关闭`,
        },
      ],
      UserType: [
        {
          value: ``,
          title: `全部`,
        },
        {
          value: `0`,
          title: `管理员`,
        },
        {
          value: `1`,
          title: "教师",
        },
        {
          value: `2`,
          title: `学生`,
        },
        {
          value: `3`,
          title: `家长`,
        },
        {
          value: `7`,
          title: `领导`,
        },
      ],
      ApplicationType: [
        {
          value: ``,
          title: `全部`,
        },
        {
          value: `1`,
          title: `教学类`,
        },
        {
          value: `2`,
          title: "辅助工具类",
        },
        {
          value: `3`,
          title: `办公类`,
        },
        {
          value: `4`,
          title: `后台管理类`,
        },
        {
          value: `5`,
          title: `资源库类`,
        },
      ],
      ApplicationTypeForKey: ApplicationType,
      UserTypeForKey: UserType,
    },
    LoginUser: {
      isLogin: false,
      UserName: "",
      PhotoPath: "",
      UserID: "",
      Gender: "",
      UserType: "",
      UserClass: "",
      SchoolID: "",
    },
    AccessInfo: {
      AccessInfoData: {
        List: [],
        TotalCount: 0,
        InnerAppCount: 0,
        ThirdPartyAppCount: 0,
      },
      AccessInfoParams: {
        userType: {
          value: ``,
          title: `全部`,
        },
        isOpened: {
          value: "2",
          title: "全部",
        },
        keyword: "",
        searchValue: "",
        CancelBtnShow: "n",
        applicationType: {
          value: ``,
          title: `全部`,
        },
      },
    },
    ApplicationDetail: {
      Entrances: [],
      ApplicationID: "",
      ApplicationName: "",
      Provider: "",
      Introduction: "",
      ApplicationImgUrl: "",
      ApplicationStatus: "",
      ApplicationType: "",
      IsThirdPartyName: "",
      CreateTime: "",
      ApplicationUrl: "",
      ApplicationTypeName: "",
      ApplicationSecret: "",
      ApplicationCallbackAddr: "",
      ApplicationApiAddr: "",
    },
    ModalVisible: {
      AccessDetailModalVisible: false,
      AddAccessModalVisible: false,
      EditAccessModalVisible: false,
      AddAccessComponentModalVisible: false,
      AddAccessEntrancesModalVisible: false,
      EditAccessEntrancesModalVisible: false,
    },
    LoadingVisible: {
      AccessDetailLoadingVisible: false,
      AddAccessLoadingVisible: false,
      EditAccessLoadingVisible: false,
      AddAccessEntrancesLoadingVisible: false,
      EditAccessEntrancesLoadingVisible: false,
      AddAccessComponentLoadingVisible: false,
      AccessContentLoadingVisible:false
    },
    ApplicationList: {
      List: [],
      TotalCount: 0,
      InnerAppCount: 0,
      ThirdPartyAppCount: 0,
      KeyList: [],
    },
    AddAccessModalData: {
      ComponentChange: "0", //0:切换已存在应用，1：切换添加新应用
      CheckList: [],
      CheckAll: false,
    },
    ApplicationMsg: {
      ApplicationID: "",
      EntranceID: "",
    },
    AddAppilicationData: {
      Entrances: [],
      ApplicationID: "",
      ApplicationName: "",
      Provider: "",
      Introduction: "",
      ApplicationImgUrl: "",
      ApplicationStatus: "",
      ApplicationType: "",
      IsThirdPartyName: "",
      CreateTime: "",
      ApplicationUrl: "",
      ApplicationTypeName: "",
      ApplicationSecret: "",
      ApplicationCallbackAddr: "",
      ApplicationApiAddr: "",
    },
    AddAppilicationTipsVisible: {
      ApplicationNameTipsVisible: false,
      ProviderTipsVisible: false,
      ApplicationIDTipsVisible: false,
      ApplicationSecretTipsVisible: false,
      IntroductionipsVisible: false,
      ApplicationImgUrlVisible: false,
      ApplicationCallbackAddrTipsVisible: false,
      ApplicationUrlTipsVisible: false,
      ApplicationApiAddrTipsVisible: false,
      // ProviderTipsVisible:true,
      EntranceNameTipsVisible: false,
      UserTypeTipsVisible: false,
      pcTipsVisible: false,
      androidTipsVisible: false,
      iosTipsVisible: false,
    },
    InitAppilicationTipsVisible: {
      //初始化提示显示数据
      ApplicationNameTipsVisible: false,
      ProviderTipsVisible: false,
      ApplicationIDTipsVisible: false,
      ApplicationSecretTipsVisible: false,
      IntroductionTipsVisible: false,
      ApplicationImgUrlVisible: false,
      ApplicationCallbackAddrTipsVisible: false,
      ApplicationUrlTipsVisible: false,
      ApplicationApiAddrTipsVisible: false,
      // ProviderTipsVisible:true,
      EntranceNameTipsVisible: false,
      UserTypeTipsVisible: false,
      pcTipsVisible: false,
      androidTipsVisible: false,
      iosTipsVisible: false,
    },
    AddAppilicationTips: {
      ApplicationNameTips: "应用名称格式不正确",
      ProviderTips: "公司名称格式不正确",
      ApplicationIDTips: "应用ID格式不正确",
      ApplicationSecretTips: "应用密钥格式不正确",
      IntroductionTips: "应用简介格式不正确",
      ApplicationCallbackAddrTips: "授权回调地址格式不正确",
      ApplicationUrlTips: "应用访问地址格式不正确",
      ApplicationApiAddrTips: "接口服务地址格式不正确",
      ApplicationImgUrlTips: "请上传应用图标",
      // s*******
      EntranceNameTips: "入口名称格式不正确",
      pcTips: "PC端访问路径不正确",
      UserTypeTips: "至少选择一个用户类型",
      androidTips: "安卓端访问路径不正确",
      iosTips: "IOS端访问路径不正确",
    },
    AddAppilicationParams: {
      Entrances: [],
      ApplicationID: "",
      ApplicationName: "",
      Provider: "",
      Introduction: "",
      ApplicationImgUrl: "",
      ApplicationImgUrlShow: "",
      ApplicationStatus: "",
      ApplicationType: "1",
      IsThirdPartyName: "",
      IsThirdParty: "0",
      CreateTime: "",
      ApplicationUrl: "",
      ApplicationTypeName: "",
      ApplicationSecret: "",
      ApplicationCallbackAddr: "",
      ApplicationApiAddr: "",
      DeleteEntrances: [],
    },
    AddAppilicationInitParams: {
      Type:'add',

      Entrances: [],
      ApplicationID: "",
      ApplicationName: "",
      Provider: "",
      Introduction: "",
      ApplicationImgUrl: "",
      ApplicationStatus: "",
      ApplicationImgUrlShow: "",
      ApplicationType: "1",
      IsThirdParty: "0",
      IsThirdPartyName: "",
      CreateTime: "",
      ApplicationUrl: "",
      ApplicationTypeName: "",
      ApplicationSecret: "",
      ApplicationCallbackAddr: "",
      ApplicationApiAddr: "",
      DeleteEntrances: [],
    },
    AppilicationInitParams: {
      //为初始化清除旧数据
      Type:'add',
      Entrances: [],
      DeleteEntrances: [],

      ApplicationImgUrlShow: "",
      ApplicationID: "",
      ApplicationName: "",
      Provider: "",
      Introduction: "",
      ApplicationImgUrl: "",
      ApplicationStatus: "",
      ApplicationType: "1",
      IsThirdParty: "0",
      IsThirdPartyName: "",
      CreateTime: "",
      ApplicationUrl: "",
      ApplicationTypeName: "",
      ApplicationSecret: "",
      ApplicationCallbackAddr: "",
      ApplicationApiAddr: "",
    },
    ImgUrlProxy: "",
    EntrancesParams: {
      EntranceID: "",
      ApplicationName: "",
      EntranceName: "",
      EntranceImgUrl: "",
      EntranceIconLarge: "",
      EntranceIconMini: "",
      UserType: [],
      UserTypeSelect: [],
      SubjectIds: [],
      ApplicationID: "",
      SubjectNames: "",
      checkAllSubject: false,
      DeviceType: "",
      AccessParam: "",
      EntranceIconLargeShow: "",
      EntranceIconMiniShow: "",
      CanAdd: true,
      pc: "",
      android: "",
      AccessType: "",
      ios: "",
    },
    EntrancesInitParams: {
      EntranceID: "",
      EntranceName: "",
      ApplicationName: "",
      EntranceImgUrl: "",
      EntranceIconLarge: "",
      EntranceIconMini: "",
      UserType: [],
      UserTypeSelect: [],
      SubjectIds: [],
      ApplicationID: "",
      CanAdd: true,
      SubjectNames: "",EntranceIconLargeShow: "",
      EntranceIconMiniShow: "",
      checkAllSubject: false,
      DeviceType: "",
      AccessParam: "",
      AccessType: "",
      pc: "",
      android: "",
      ios: "",
    },
    InitEntrancesParams: {
      EntranceID: "",
      EntranceName: "",
      ApplicationName: "",
      EntranceImgUrl: "",
      EntranceIconLarge: "",
      EntranceIconMini: "",
      UserType: [],
      CanAdd: true,
      UserTypeSelect: [],EntranceIconLargeShow: "",
      EntranceIconMiniShow: "",
      SubjectIds: [],
      ApplicationID: "",
      SubjectNames: "",
      checkAllSubject: false,
      DeviceType: "",
      AccessParam: "",
      AccessType: "",
      pc: "",
      android: "",
      ios: "",
    },
    defaultPicUrl: "SysSetting/Attach/app_default.png",
    SubjectList: [],
  },
  actions
) => {
  let LoginUser = {};
  let AccessInfo = {};
  let ApplicationDetail = {};
  let ApplicationList = {};
  let AccessInfoParams = {};
  switch (actions.type) {
    case AccessAction.GET_SUBJECT_LIST_DATA:
      return Object.assign({}, state, {
        SubjectList: actions.data,
      });
    case AccessAction.SET_APPLICATION_INIT_PARAMS:
      return Object.assign({}, state, {
        EntrancesParams: {
          ...state.EntrancesParams,
          ...actions.data,
        },
        EntrancesInitParams: {
          ...state.EntrancesInitParams,
          ...actions.data,
        },
      });
    case AccessAction.SET_APPLICATION_PARAMS:
      return Object.assign({}, state, {
        EntrancesParams: {
          ...state.EntrancesParams,
          ...actions.data,
        },
      });
    case AccessAction.SET_EDIT_APPLICATION_MSG:
      return Object.assign({}, state, {
        ApplicationMsg: { ...state.ApplicationMsg, ...actions.data },
      });
    case AccessAction.GET_IMG_URL_PROXY:
      return Object.assign({}, state, { ImgUrlProxy: actions.data.ResHttp });
    case AccessAction.SET_ADD_APPLICATION_INIT_PARAMS:
      return Object.assign({}, state, {
        AddAppilicationParams: {
          ...state.AddAppilicationParams,
          ...actions.data,
        },
        AddAppilicationInitParams: {
          ...state.AddAppilicationInitParams,
          ...actions.data,
        },
      });
    case AccessAction.SET_ADD_APPLICATION_PARAMS:
      return Object.assign({}, state, {
        AddAppilicationParams: {
          ...state.AddAppilicationParams,
          ...actions.data,
        },
      });
    case AccessAction.GET_APPLICATION_PARAMS:
      return Object.assign({}, state, {
        AddAppilicationParams: {
          ...state.AddAppilicationParams,
          ...handleApplicationParamsData(actions.data, state.SubjectList,state.ImgUrlProxy),
        },
      });
    case AccessAction.SET_ADD_APPLICATION_TIPS:
      return Object.assign({}, state, {
        AddAppilicationTips: { ...state.AddAppilicationTips, ...actions.data },
      });
    case AccessAction.SET_ADD_APPLICATION_TIPS_VISIBLE:
      return Object.assign({}, state, {
        AddAppilicationTipsVisible: {
          ...state.AddAppilicationTipsVisible,
          ...actions.data,
        },
      });
    case AccessAction.SET_ADD_ACCESS_COMPONENT_CHANGE:
      return Object.assign({}, state, {
        AddAccessModalData: { ...state.AddAccessModalData, ...actions.data },
      });
    case AccessAction.GET_LOGIN_USER_INFO:
      return Object.assign({}, state, {
        LoginUser: { ...state.LoginUser, isLogin: true, ...actions.data },
      });
    case AccessAction.SET_MODAL_VISIBLE:
      return Object.assign({}, state, {
        ModalVisible: { ...state.ModalVisible, ...actions.data },
      });
    case AccessAction.SET_LOADING_VISIBLE:
      return Object.assign({}, state, {
        LoadingVisible: { ...state.LoadingVisible, ...actions.data },
      });
    case AccessAction.GET_ACCESS_INFO_DATA:
      AccessInfo = {
        ...state.AccessInfo,
        AccessInfoData: handleAccessInfoData(actions.data),
      };
      return Object.assign({}, state, {
        AccessInfo,
      });
    case AccessAction.SET_ACCESS_INFO_PARAMS:
      AccessInfoParams = {
        ...state.AccessInfo.AccessInfoParams,
        ...actions.data,
      };
      return Object.assign({}, state, {
        AccessInfo: { ...state.AccessInfo, AccessInfoParams },
      });
    case AccessAction.GET_APPLICATION_DETAIL_DATA:
      ApplicationDetail = handleAccessDetailData(actions.data);
      return Object.assign({}, state, {
        ApplicationDetail,
      });
    case AccessAction.GET_APPLICATION_LIST_DATA:
      ApplicationList = handleAccessListData(actions.data);
      return Object.assign({}, state, {
        ApplicationList,
      });
    default:
      return state;
  }
};
// 处理学科列表
function handleSubjectList(Data) {
  // if(Data instanceof Array ){
  //   Data
  // }
}
// 处理修改应用详情
function handleApplicationParamsData(Data, SubjectList,ImgUrlProxy) {
  let AccessInfoList = [];

  let { Entrances, ...other } = Data;
  if (other.IsThirdParty === true) {
    other.IsThirdPartyName = "第三方公司";
    other.IsThirdParty = "1";
  } else {
    other.IsThirdPartyName = "蓝鸽公司";
    other.IsThirdParty = "0";
  }
  if (Entrances instanceof Array) {
    Entrances.map((child) => {
      let UserTypeName = [];
      let UserTypeSelect = [];
      // console.log(child.UserType,typeof child.UserType === "string")

      if (typeof child.UserType === "string") {
        child.UserType.split(",").map((userType) => {
          UserType[userType] && UserTypeName.push(UserType[userType].title);
        });
        UserTypeSelect = child.UserType.split(",");
      } else if (typeof child.UserType === "number") {
        UserType[child.UserType] &&
          UserTypeName.push(UserType[child.UserType].title);
        UserTypeSelect = [child.UserType];
      }
      child.CanAdd = false;
      child.UserType = UserTypeSelect;
      child.ApplicationID = other.ApplicationID;
      child.ApplicationName = other.ApplicationName;
 

      child.UserTypeName = UserTypeName.join("、");
      let SubjectSelect = [];
      if (typeof child.SubjectIds === "string") {
        SubjectSelect = child.SubjectIds = child.SubjectIds.split(",");
      }
      // 判断学科是否全选
      let checkAllSubject = true;

      SubjectList.map((subject) => {
        let isSelect = false;
        SubjectSelect.map((subjectSelect) => {
          if (subjectSelect === subject.SubjectId) {
            isSelect = true;
          }
        });
        if (checkAllSubject && !isSelect) {
          checkAllSubject = false;
        }
      });
      child.checkAllSubject = checkAllSubject;
      child.OperationType = "3";
      let DeviceTypesName = [];
      if (typeof child.DeviceType === "string") {
        child.DeviceType.split(",").map((deviceType) => {
          DeviceTypesName.push(DeviceTypes[deviceType].title);
          if (deviceType === "pc") {
            child.pc = child.AccessParam;
          } else if (deviceType === "ios") {
            child.ios = child.AccessParam;
          } else if (deviceType === "android") {
            child.android = child.AccessParam;
          }
        });
      }
      child.DeviceTypesName = DeviceTypesName.join("、");
      child.EntranceIconLarge = child.entranceIconLarge;
      child.EntranceIconLargeShow = child.entranceIconLarge; //绝对路径显示
      child.EntranceIconMini = child.entranceIconMini;
      child.EntranceIconMiniShow = child.entranceIconMini; //绝对路径显示
      AccessInfoList.push(child);
    });
  }

  return { Entrances: AccessInfoList,ApplicationImgUrlShow : other.ApplicationImgUrl, ...other };
}
// 处理备选列表
function handleAccessListData(Data) {
  let { List, ...other } = Data;
  let KeyList = [];
  let AccessList = [];
  let IsAddedList = [];
  if (List instanceof Array) {
    List.map((child) => {
      child.ApplicationTypeName = ApplicationType[child.ApplicationType].title;
      if (child.IsThirdParty) {
        child.IsThirdPartyName = "第三方应用";
      } else {
        child.IsThirdPartyName = "蓝鸽应用";
      }
      let UserTypeName = [];
      if (typeof child.UserType === "string") {
        child.UserType.split(",").map((userType) => {
          UserType[userType] && UserTypeName.push(UserType[userType].title);
        });
      } else if (typeof child.UserType === "number") {
        UserType[child.UserType] &&
          UserTypeName.push(UserType[child.UserType].title);
        // UserTypeSelect = [child.UserType]
      }
      child.UserTypeName = UserTypeName.join("、");
      let DeviceTypesName = [];
      if (typeof child.DeviceTypes === "string") {
        child.DeviceTypes.split(",").map((deviceType) => {
          DeviceTypes[deviceType] &&
            DeviceTypesName.push(DeviceTypes[deviceType].title);
        });
      }
      child.DeviceTypesName = DeviceTypesName.join("、");
      if (!child.IsAdded) {
        KeyList.push(child.ApplicationID);
        AccessList.push(child);
      } else {
        IsAddedList.push(child);
      }
    });
  }
  return { List: AccessList, KeyList, IsAddedList, ...other };
}
// 处理后台返回的应用信息详情
function handleAccessDetailData(Data) {
  let AccessInfoList = [];

  let { Entrances, ...other } = Data;
  if (other.IsThirdParty) {
    other.IsThirdPartyName = "第三方公司";
  } else {
    other.IsThirdPartyName = "蓝鸽公司";
  }
  if (other.ApplicationStatus === 0) {
    other.ApplicationStatusName = "已开启访问";
  } else {
    other.ApplicationStatusName = "已关闭访问";
  }
  other.ApplicationTypeName = ApplicationType[other.ApplicationType].title;

  if (Entrances instanceof Array) {
    Entrances.map((child) => {
      let UserTypeName = [];
      if (typeof child.UserType === "string") {
        child.UserType.split(",").map((userType) => {
          UserType[userType] && UserTypeName.push(UserType[userType].title);
        });
      } else if (typeof child.UserType === "number") {
        UserType[child.UserType] &&
          UserTypeName.push(UserType[child.UserType].title);
        // UserTypeSelect = [child.UserType]
      }
      child.UserTypeName = UserTypeName.join("、");
      let DeviceTypesName = [];
      if (typeof child.DeviceType === "string") {
        child.DeviceType.split(",").map((deviceType) => {
          DeviceTypesName.push(DeviceTypes[deviceType].title);
        });
      }
      child.DeviceTypesName = DeviceTypesName.join("、");
      AccessInfoList.push(child);
    });
  }
  return { Entrances: AccessInfoList, ...other };
}
// 处理后台返回的应用信息
function handleAccessInfoData(Data) {
  let AccessInfoList = [];

  let { List, ...other } = Data;
  if (List instanceof Array) {
    List.map((child) => {
      child.ApplicationTypeName = ApplicationType[child.ApplicationType].title;
      if (child.IsThirdParty) {
        child.IsThirdPartyName = "第三方应用";
      } else {
        child.IsThirdPartyName = "蓝鸽应用";
      }
      let UserTypeName = [];
      if (typeof child.UserType === "string") {
        child.UserType.split(",").map((userType) => {
          UserType[userType] && UserTypeName.push(UserType[userType].title);
        });
      } else if (typeof child.UserType === "number") {
        UserTypeName.push(UserType[child.UserType].title);
        // UserTypeSelect = [child.UserType]
      }
      child.UserTypeName = UserTypeName.join("、");
      let DeviceTypesName = [];
      if (typeof child.DeviceTypes === "string") {
        child.DeviceTypes.split(",").map((deviceType) => {
          DeviceTypes[deviceType] &&
            DeviceTypesName.push(DeviceTypes[deviceType].title);
        });
      }
      child.DeviceTypesName = DeviceTypesName.join("、");

      AccessInfoList.push(child);
    });
  }
  return { List: AccessInfoList, ...other };
}
export default AccessData;
