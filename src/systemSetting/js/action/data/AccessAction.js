import { postData, getData } from "../../../../common/js/fetch";
import UpUIState from "../UpUIState";
import CONFIG from "../../../../common/js/config";
import Public from "../../../../common/js/public";

const { AccessProxy_univ, SubjectForAccessProxy_univ } = CONFIG;
//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
// 获取用户子系统
const GET_ACCESS_INFO_DATA = "GET_ACCESS_INFO_DATA";
const GetAccessInfo = ({
  isUserDefault = true,
  userType,
  isOpened,
  keyword,
  applicationType,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    let { AccessInfoParams } = getState().AccessData.AccessInfo;
    dispatch(SetLoadingVisible({ AccessContentLoadingVisible: true }));

    if (userType === undefined) {
      userType = AccessInfoParams.userType.value;
    }
    if (isOpened === undefined) {
      isOpened = AccessInfoParams.isOpened.value;
    }
    if (keyword === undefined) {
      keyword = AccessInfoParams.keyword;
    }
    if (applicationType === undefined) {
      applicationType = AccessInfoParams.applicationType.value;
    }

    let url =
      AccessProxy_univ +
      "/GetAccessInfo?userType=" +
      userType +
      "&isOpened=" +
      isOpened +
      "&keyword=" +
      keyword +
      "&applicationType=" +
      applicationType;
    getData(url, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_ACCESS_INFO_DATA, data: json.Data });
          // dispatch(UpUIState.RightLoadingClose());
          dispatch(SetLoadingVisible({ AccessContentLoadingVisible: false }));

          func(getState());
        }
      });
  };
};
// 修改访问状态
const UpdateApplicationState = ({ applicationId, status, func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/UpdateApplicationState";
    postData(
      url,
      {
        applicationId,
        state: status,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 删除应用
const RemoveApplication = ({ applicationIds, func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/RemoveApplication";
    postData(
      url,
      {
        applicationIds,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 添加存在应用
const AddApplicationToSchool = ({ applicationIds, func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/AddApplicationToSchool";
    postData(
      url,
      {
        applicationIds,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 添加新应用
const AddApplicationInfo = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/AddApplicationInfo";
    let {
      ApplicationID,
      ApplicationName,
      IsThirdParty,
      Provider: ProviderName,
      ApplicationSecret,
      Introduction,
      ApplicationType,
      ApplicationImgUrl: applicationIcon,
      ApplicationCallbackAddr,
      ApplicationUrl,
      ApplicationApiAddr: applicationApiUrl,
      Entrances,
      DeleteEntrances,
    } = getState().AccessData.AddAppilicationParams;
    let { defaultPicUrl } = getState().AccessData;

    let newEntrances = [];
    Entrances instanceof Array &&
      Entrances.map((child) => {
        let deviceType =
          child.DeviceType === "pc"
            ? 1
            : child.DeviceType === "ios"
            ? 2
            : child.DeviceType === "android"
            ? 3
            : 1;
        //  console.log("设备有问题");
        newEntrances.push({
          ApplicationID,
          entranceId: child.EntranceID,
          entranceName: child.EntranceName,
          userType:
            child.UserType instanceof Array
              ? child.UserType.join(",")
              : typeof child.UserType === "string"
              ? child.UserType
              : "",
          entranceIconLarge: child.EntranceIconLarge
            ? child.EntranceIconLarge
            : defaultPicUrl,
          entranceIconMini: child.EntranceIconMini
            ? child.EntranceIconMini
            : defaultPicUrl,
          operationType: child.OperationType,

          path: child.AccessParam,
          subjectIds:
            child.SubjectIds instanceof Array
              ? child.SubjectIds.join(",")
              : typeof child.SubjectIds === "string"
              ? child.SubjectIds instanceof Array
                ? child.SubjectIds.join(",")
                : child.SubjectIds
              : "",
          accessType: child.DeviceType === "pc" ? child.AccessType : "href",
          deviceType,
        });
      });
    DeleteEntrances instanceof Array &&
      DeleteEntrances.map((child) => {
        newEntrances.push({
          ApplicationID,
          entranceId: child.EntranceID,
          operationType: "1",
          entranceName: child.EntranceName,
          userType:
            child.UserType instanceof Array
              ? child.UserType.join(",")
              : typeof child.UserType === "string"
              ? child.UserType
              : "",
          entranceIconLarge: child.EntranceIconLarge
            ? child.EntranceIconLarge
            : defaultPicUrl,
          entranceIconMini: child.EntranceIconMini
            ? child.EntranceIconMini
            : defaultPicUrl,
          path: child.AccessParam,
          subjectIds:
            child.SubjectIds instanceof Array
              ? child.SubjectIds.join(",")
              : typeof child.SubjectIds === "string"
              ? child.SubjectIds instanceof Array
                ? child.SubjectIds.join(",")
                : child.SubjectIds
              : "",
          accessType: child.DeviceType === "pc" ? child.AccessType : "",
          deviceType,
        });
      });
    // if(!applicationIcon){
    //   return;
    // }
    dispatch(
      checkAllAppParams({
        success: (Data) => {
          dispatch(UpUIState.ModalLoadingOpen());

          postData(
            url,
            {
              ApplicationID,
              ApplicationName,
              IsThirdParty,
              ProviderName,
              ApplicationSecret: ApplicationSecret
                ? ApplicationSecret
                : "12456",
              Introduction,
              ApplicationType,
              applicationIcon,
              ApplicationCallbackAddr,
              ApplicationUrl,
              applicationApiUrl,
              Entrances: newEntrances,
            },
            2,
            "json"
          )
            .then((data) => data.json())
            .then((json) => {
              if (json.StatusCode === 200) {
                func(getState());
                dispatch(UpUIState.ModalLoadingClose());
              }
            });
        },
      })
    );
  };
};
// 修改应用详情
const UpdateApplicationInfo = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/AddApplicationInfo";
    let {
      ApplicationID,
      ApplicationName,
      IsThirdParty,
      Provider: ProviderName,
      ApplicationSecret,
      Introduction,
      ApplicationType,
      ApplicationImgUrl: applicationIcon,
      ApplicationCallbackAddr,
      ApplicationUrl,
      ApplicationApiAddr: applicationApiUrl,
      Entrances,
      DeleteEntrances,
    } = getState().AccessData.AddAppilicationParams;
    let { defaultPicUrl } = getState().AccessData;
    let newEntrances = [];
    Entrances instanceof Array &&
      Entrances.map((child) => {
        let deviceType =
          child.DeviceType === "pc"
            ? 1
            : child.DeviceType === "ios"
            ? 2
            : child.DeviceType === "android"
            ? 3
            : 1;
        //  console.log("设备有问题");
        newEntrances.push({
          ApplicationID,
          entranceId: child.EntranceID,
          entranceName: child.EntranceName,
          userType:
            child.UserType instanceof Array
              ? child.UserType.join(",")
              : typeof child.UserType === "string"
              ? child.UserType
              : "",
          entranceIconLarge: child.EntranceIconLarge
            ? child.EntranceIconLarge
            : defaultPicUrl,
          entranceIconMini: child.EntranceIconMini
            ? child.EntranceIconMini
            : defaultPicUrl,
          operationType: child.OperationType,

          path: child.AccessParam,
          subjectIds:
            child.SubjectIds instanceof Array
              ? child.SubjectIds.join(",")
              : typeof child.SubjectIds === "string"
              ? child.SubjectIds instanceof Array
                ? child.SubjectIds.join(",")
                : child.SubjectIds
              : "",
          accessType: child.DeviceType === "pc" ? child.AccessType : "",
          deviceType,
        });
      });
    DeleteEntrances instanceof Array &&
      DeleteEntrances.map((child) => {
        newEntrances.push({
          ApplicationID,
          entranceId: child.EntranceID,
          operationType: "1",
          entranceName: child.EntranceName,
          userType:
            child.UserType instanceof Array
              ? child.UserType.join(",")
              : typeof child.UserType === "string"
              ? child.UserType
              : "",
          entranceIconLarge: child.EntranceIconLarge
            ? child.EntranceIconLarge
            : defaultPicUrl,
          entranceIconMini: child.EntranceIconMini
            ? child.EntranceIconMini
            : defaultPicUrl,
          path: child.AccessParam,
          subjectIds:
            child.SubjectIds instanceof Array
              ? child.SubjectIds.join(",")
              : typeof child.SubjectIds === "string"
              ? child.SubjectIds instanceof Array
                ? child.SubjectIds.join(",")
                : child.SubjectIds
              : "",
          accessType: child.DeviceType === "pc" ? child.AccessType : "",
          deviceType,
        });
      });
    dispatch(
      checkAllAppParams({
        isAdd: false,
        success: (Data) => {
          postData(
            url,
            {
              ApplicationID,
              ApplicationName,
              IsThirdParty,
              ProviderName,
              ApplicationSecret: ApplicationSecret
                ? ApplicationSecret
                : "123456",
              Introduction,
              ApplicationType,
              applicationIcon,
              ApplicationCallbackAddr,
              ApplicationUrl,
              applicationApiUrl,
              Entrances: newEntrances,
            },
            2,
            "json"
          )
            .then((data) => data.json())
            .then((json) => {
              if (json.StatusCode === 200) {
                func(getState());
              }
            });
        },
      })
    );
  };
};
// 添加新应用
const AddEntrance = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/AddEntrance";
    let {
      ApplicationID,
      EntranceID,
      EntranceName,
      UserType: userTypes,
      EntranceIconLarge,
      EntranceIconMini,
      SubjectIds,
      pc: pcPath,
      android: androidPath,
      ios: iOSPath,
      // ApplicationImgUrl: applicationIcon,
      // ApplicationCallbackAddr,
      // ApplicationUrl,
      // ApplicationApiAddr: applicationApiUrl,
    } = getState().AccessData.EntrancesParams;
    if (EntranceIconLarge === "") {
      EntranceIconLarge = getState().AccessData.AccessData;
    }
    if (EntranceIconMini === "") {
      EntranceIconMini = getState().AccessData.AccessData;
    }
    dispatch(
      checkAllEntrancesParams({
        success: (Data) => {
          postData(
            url,
            {
              ApplicationID,
              EntranceID,
              EntranceName,
              userTypes,
              EntranceIconLarge,
              EntranceIconMini,
              SubjectIds,
              pcPath,
              androidPath,
              iOSPath,
            },
            2
          )
            .then((data) => data.json())
            .then((json) => {
              if (json.StatusCode === 200) {
                func(getState());
              }
            });
        },
      })
    );
  };
};
// 添加新应用
const ModifyEntrance = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/ModifyEntrance";
    let {
      ApplicationID,
      EntranceID,
      EntranceName,
      UserType: userTypes,
      EntranceIconLarge,
      EntranceIconMini,
      SubjectIds,
      pc: pcPath,
      android: androidPath,
      ios: iOSPath,
      // ApplicationImgUrl: applicationIcon,
      // ApplicationCallbackAddr,
      // ApplicationUrl,
      // ApplicationApiAddr: applicationApiUrl,
    } = getState().AccessData.EntrancesParams;
    if (EntranceIconLarge === "") {
      EntranceIconLarge = getState().AccessData.AccessData;
    }
    if (EntranceIconMini === "") {
      EntranceIconMini = getState().AccessData.AccessData;
    }
    dispatch(
      checkAllEntrancesParams({
        success: (Data) => {
          postData(
            url,
            {
              ApplicationID,
              EntranceID,
              EntranceName,
              userTypes,
              EntranceIconLarge,
              EntranceIconMini,
              SubjectIds,
              pcPath,
              androidPath,
              iOSPath,
            },
            2
          )
            .then((data) => data.json())
            .then((json) => {
              if (json.StatusCode === 200) {
                func(getState());
              }
            });
        },
      })
    );
  };
};
// 删除访问入口
const DeleteEntrance = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/DeleteEntrance";
    let { ApplicationID, EntranceID } = getState().AccessData.ApplicationMsg;

    postData(
      url,
      {
        ApplicationID,
        EntranceID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};

// 设置查询应用详情参数
const SET_ACCESS_INFO_PARAMS = "SET_ACCESS_INFO_PARAMS";
const SetAccessInfoParams = ({ data, func = () => {} }) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ACCESS_INFO_PARAMS, data });
  };
};
// 查看应用详情
const GET_APPLICATION_DETAIL_DATA = "GET_APPLICATION_DETAIL_DATA";
const GetApplicationDetail = ({
  userDefault = true,
  applicationID,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    if (applicationID === undefined) {
      applicationID = getState().AccessData.ApplicationMsg.ApplicationID;
      // console.log("application是必须的");
      // return;
    }

    let url =
      AccessProxy_univ + "/GetApplicationDetail?applicationID=" + applicationID;
    // dispatch(UpUIState.ModalLoadingOpen());
    dispatch(SetLoadingVisible({ AccessDetailLoadingVisible: true }));
    getData(url, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          if (userDefault) {
            dispatch({ type: GET_APPLICATION_DETAIL_DATA, data: json.Data });
            //   dispatch(UpUIState.ModalLoadingClose());
            dispatch(SetLoadingVisible({ AccessDetailLoadingVisible: false }));
          }

          func(getState(), json.Data);
        }
      });
  };
};

// 查看备用应用列表
const GET_APPLICATION_LIST_DATA = "GET_APPLICATION_LIST_DATA";
const GetApplicationList = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let url = AccessProxy_univ + "/GetApplicationList";
    dispatch(SetLoadingVisible({ AddAccessLoadingVisible: true }));

    getData(url, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_APPLICATION_LIST_DATA, data: json.Data });
          dispatch(SetLoadingVisible({ AddAccessLoadingVisible: false }));

          func(getState());
        }
      });
  };
};
// 获取学科列表
const GET_SUBJECT_LIST_DATA = "GET_SUBJECT_LIST_DATA";
const GetSubjectListData = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let schoolID = getState().AccessData.LoginUser.SchoolID;
    let url =
      SubjectForAccessProxy_univ + "/GetSubjectList?schoolID=" + schoolID;
    // dispatch(SetLoadingVisible({ AddAccessLoadingVisible: true }));

    getData(url, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUBJECT_LIST_DATA, data: json.Data });
          // dispatch(SetLoadingVisible({ AddAccessLoadingVisible: false }));

          func(getState());
        }
      });
  };
};
// 设置Modal显示
const SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE";
const SetModalVisible = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_MODAL_VISIBLE, data });
  };
};
// 设置Loading显示
const SET_LOADING_VISIBLE = "SET_LOADING_VISIBLE";
const SetLoadingVisible = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_VISIBLE, data });
  };
};
// 设置添加窗口数据
const SET_ADD_ACCESS_COMPONENT_CHANGE = "SET_ADD_ACCESS_COMPONENT_CHANGE";
const SetAddAccessComponentChange = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ADD_ACCESS_COMPONENT_CHANGE, data });
  };
};
// 设置添加窗口tips显示
const SET_ADD_APPLICATION_TIPS_VISIBLE = "SET_ADD_APPLICATION_TIPS_VISIBLE";
const SetAddApplicationTipsVisible = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ADD_APPLICATION_TIPS_VISIBLE, data });
  };
};
// 设置添加窗口tips
const SET_ADD_APPLICATION_TIPS = "SET_ADD_APPLICATION_TIPS";
const SetAddApplicationTips = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ADD_APPLICATION_TIPS, data });
  };
};
// 设置添加窗口参数
const SET_ADD_APPLICATION_PARAMS = "SET_ADD_APPLICATION_PARAMS";
const SetAddApplicationParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ADD_APPLICATION_PARAMS, data });
  };
};
// 获取修改窗口应用详情参数
const GET_APPLICATION_PARAMS = "GET_APPLICATION_PARAMS";
const GetApplicationParams = ({ applicationID, func = () => {} }) => {
  return (dispatch, getState) => {
    if (applicationID === undefined) {
      applicationID = getState().AccessData.ApplicationMsg.ApplicationID;
      // console.log("application是必须的");
      // return;
    }

    let url =
      AccessProxy_univ + "/GetApplicationDetail?applicationID=" + applicationID;
    // dispatch(UpUIState.ModalLoadingOpen());
    dispatch(SetLoadingVisible({ EditAccessLoadingVisible: true }));
    getData(url, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_APPLICATION_PARAMS, data: json.Data });
          //   dispatch(UpUIState.ModalLoadingClose());
          dispatch(SetLoadingVisible({ EditAccessLoadingVisible: false }));

          func(getState(), json.Data);
        }
      });
  };
};
// 设置添加窗口初始数据
const SET_ADD_APPLICATION_INIT_PARAMS = "SET_ADD_APPLICATION_INIT_PARAMS";
const SetAddApplicationInitParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ADD_APPLICATION_INIT_PARAMS, data });
  };
};
// 设置添加访问入口窗口数据
const SET_APPLICATION_PARAMS = "SET_APPLICATION_PARAMS";
const SetApplicationParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_APPLICATION_PARAMS, data });
  };
};
// 设置添加访问入口窗口初始数据
const SET_APPLICATION_INIT_PARAMS = "SET_APPLICATION_INIT_PARAMS";
const SetApplicationInitParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_APPLICATION_INIT_PARAMS, data });
  };
};
// 应用编辑：应用名称修改检查
const checkApplicationName = (func = (error, ApplicationNameError) => {}) => {
  //error:普通错误，ApplicationNameError：抛出没改变错误
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let ApplicationNameError = false; //与初始的是否相同

    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/;
    let ApplicationName = AccessData.AddAppilicationParams.ApplicationName;
    let InitApplicationName =
      AccessData.AddAppilicationInitParams.ApplicationName;
    let error = false;
    if (!ApplicationName) {
      dispatch(
        SetAddApplicationTips({ ApplicationNameTips: "应用名称不能为空" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationNameTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(ApplicationName)) {
      dispatch(
        SetAddApplicationTips({ ApplicationNameTips: "应用名称格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationNameTipsVisible: true,
        })
      );

      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationNameTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationNameTips: "应用名称格式不正确" })
      );

      if (Public.comparisonObject(InitApplicationName, ApplicationName)) {
        ApplicationNameError = true;
      }
      // console.log(error)
    }
    func(error, ApplicationNameError);
  };
};
// 应用编辑：第三方名称修改检查
const checkProvider = (func = (error, ProviderError) => {}) => {
  //error:普通错误，ProviderError：抛出没改变错误
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let ProviderError = false; //与初始的是否相同

    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/;
    let Provider = AccessData.AddAppilicationParams.Provider;
    let IsThirdParty = AccessData.AddAppilicationParams.IsThirdParty;
    let InitProvider = AccessData.AddAppilicationInitParams.Provider;
    let error = false;
    if (IsThirdParty !== "0" && !Provider) {
      dispatch(
        SetAddApplicationTips({ ProviderTips: "第三方公司名称不能为空" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ProviderTipsVisible: true,
        })
      );
      error = true;
    } else if (IsThirdParty !== "0" && !Test.test(Provider)) {
      dispatch(
        SetAddApplicationTips({ ProviderTips: "第三方公司名称格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ProviderTipsVisible: true,
        })
      );

      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ProviderTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ProviderTips: "第三方公司名称格式不正确" })
      );

      if (Public.comparisonObject(InitProvider, Provider)) {
        ProviderError = true;
      }
      // console.log(error)
    }
    func(error, ProviderError);
  };
};
// 应用编辑：应用ID修改检查
const checkApplicationID = (func = (error, ApplicationIDError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^([a-zA-Z0-9]{1,24})$/;
    let ApplicationIDError = false;

    let ApplicationID = AccessData.AddAppilicationParams.ApplicationID;
    let InitApplicationID = AccessData.AddAppilicationInitParams.ApplicationID;
    let error = false;
    if (!ApplicationID) {
      dispatch(SetAddApplicationTips({ ApplicationIDTips: "应用ID不能为空" }));
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationIDTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(ApplicationID)) {
      dispatch(
        SetAddApplicationTips({ ApplicationIDTips: "应用ID格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationIDTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationIDTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationIDTips: "应用ID格式不正确" })
      );

      if (Public.comparisonObject(InitApplicationID, ApplicationID)) {
        ApplicationIDError = true;
      }
    }
    func(error, ApplicationIDError);
  };
};
// 应用编辑：应用密钥修改检查
const checkApplicationSecret = (
  func = (error, ApplicationSecretError) => {}
) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^([a-zA-Z0-9]{1,24})$/;
    let ApplicationSecretError = false;

    let ApplicationSecret = AccessData.AddAppilicationParams.ApplicationSecret;
    let InitApplicationSecret =
      AccessData.AddAppilicationInitParams.ApplicationSecret;
    let error = false;

    if (!ApplicationSecret) {
      dispatch(
        SetAddApplicationTips({ ApplicationSecretTips: "应用密钥不能为空" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationSecretTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(ApplicationSecret)) {
      dispatch(
        SetAddApplicationTips({ ApplicationSecretTips: "应用密钥格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationSecretTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationSecretTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationSecretTips: "应用密钥格式不正确" })
      );

      if (Public.comparisonObject(InitApplicationSecret, ApplicationSecret)) {
        ApplicationSecretError = true;
      }
    }
    func(error, ApplicationSecretError);
  };
};
// 应用编辑：应用简介修改检查
const checkIntroduction = (func = (error, IntroductionError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,100}$/;
    let IntroductionError = false;

    let Introduction = AccessData.AddAppilicationParams.Introduction;
    let InitIntroduction = AccessData.AddAppilicationInitParams.Introduction;
    let error = false;

    if (!Introduction) {
      dispatch(SetAddApplicationTips({ IntroductionTips: "应用简介不能为空" }));
      dispatch(
        SetAddApplicationTipsVisible({
          IntroductionTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(Introduction)) {
      dispatch(
        SetAddApplicationTips({ IntroductionTips: "应用简介格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          IntroductionTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          IntroductionTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ IntroductionTips: "应用简介格式不正确" })
      );

      if (Public.comparisonObject(InitIntroduction, Introduction)) {
        IntroductionError = true;
      }
    }
    func(error, IntroductionError);
  };
};
// 应用编辑：授权回调地址修改检查
const checkApplicationCallbackAddr = (
  func = (error, ApplicationCallbackAddrError) => {}
) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    let ApplicationCallbackAddrError = false;

    let ApplicationCallbackAddr =
      AccessData.AddAppilicationParams.ApplicationCallbackAddr;
    let InitApplicationCallbackAddr =
      AccessData.AddAppilicationInitParams.ApplicationCallbackAddr;
    let error = false;

    if (ApplicationCallbackAddr && !Test.test(ApplicationCallbackAddr)) {
      dispatch(
        SetAddApplicationTips({
          ApplicationCallbackAddrTips: "授权回调地址格式不正确",
        })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationCallbackAddrTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationCallbackAddrTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({
          ApplicationCallbackAddrTips: "授权回调地址格式不正确",
        })
      );

      if (
        Public.comparisonObject(
          InitApplicationCallbackAddr,
          ApplicationCallbackAddr
        )
      ) {
        ApplicationCallbackAddrError = true;
      }
    }
    func(error, ApplicationCallbackAddrError);
  };
};
// 应用编辑：应用访问地址修改检查
const checkApplicationUrl = (func = (error, ApplicationUrlError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    let ApplicationUrlError = false;

    let ApplicationUrl = AccessData.AddAppilicationParams.ApplicationUrl;
    let InitApplicationUrl =
      AccessData.AddAppilicationInitParams.ApplicationUrl;
    let error = false;

    if (ApplicationUrl && !Test.test(ApplicationUrl)) {
      dispatch(
        SetAddApplicationTips({ ApplicationUrlTips: "应用访问地址格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationUrlTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationUrlTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationUrlTips: "应用访问地址格式不正确" })
      );

      if (Public.comparisonObject(InitApplicationUrl, ApplicationUrl)) {
        ApplicationUrlError = true;
      }
    }
    func(error, ApplicationUrlError);
  };
};
// 应用编辑：应用访问地址修改检查
const checkApplicationApiAddr = (
  func = (error, ApplicationApiAddrError) => {}
) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    let ApplicationApiAddrError = false;

    let ApplicationApiAddr =
      AccessData.AddAppilicationParams.ApplicationApiAddr;
    let InitApplicationApiAddr =
      AccessData.AddAppilicationInitParams.ApplicationApiAddr;
    let error = false;

    if (ApplicationApiAddr && !Test.test(ApplicationApiAddr)) {
      dispatch(
        SetAddApplicationTips({ ApplicationApiAddrTips: "接口服务地址不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationApiAddrTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationApiAddrTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationApiAddrTips: "接口服务地址不正确" })
      );

      if (Public.comparisonObject(InitApplicationApiAddr, ApplicationApiAddr)) {
        ApplicationApiAddrError = true;
      }
    }
    func(error, ApplicationApiAddrError);
  };
};

// 应用编辑：应用ID修改检查
const checkApplicationImgUrl = (
  func = (error, ApplicationImgUrlError) => {}
) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^([a-zA-Z0-9]{1,24})$/;
    let ApplicationImgUrlError = false;

    let ApplicationImgUrl = AccessData.AddAppilicationParams.ApplicationImgUrl;
    let InitApplicationImgUrl =
      AccessData.AddAppilicationInitParams.ApplicationImgUrl;
    let error = false;
    if (!ApplicationImgUrl) {
      dispatch(
        SetAddApplicationTips({ ApplicationImgUrlTips: "请上传应用图标" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationImgUrlTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          ApplicationImgUrlTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ ApplicationImgUrlTips: "请上传应用图标" })
      );

      if (Public.comparisonObject(InitApplicationImgUrl, ApplicationImgUrl)) {
        ApplicationImgUrlError = true;
      }
    }
    func(error, ApplicationImgUrlError);
  };
};
// 检测所有添加的参数
const checkAllAppParams = ({
  isAdd = true,
  success = () => {},
  error1 = () => {},
  error2 = () => {},
}) => {
  return (dispatch, getState) => {
    let ApplicationSecretError = false;
    let ApplicationSecretError2 = false;
    dispatch(
      checkApplicationSecret((Error, Error2) => {
        ApplicationSecretError = Error;
        ApplicationSecretError2 = Error2;
      })
    );

    let IntroductionError = false;
    let IntroductionError2 = false;
    dispatch(
      checkIntroduction((Error, Error2) => {
        IntroductionError = Error;
        IntroductionError2 = Error2;
      })
    );

    let ApplicationCallbackAddrError = false;
    let ApplicationCallbackAddrError2 = false;
    dispatch(
      checkApplicationCallbackAddr((Error, Error2) => {
        ApplicationCallbackAddrError = Error;
        ApplicationCallbackAddrError2 = Error2;
      })
    );

    let ApplicationUrlError = false;
    let ApplicationUrlError2 = false;
    dispatch(
      checkApplicationUrl((Error, Error2) => {
        ApplicationUrlError = Error;
        ApplicationUrlError2 = Error2;
      })
    );

    let ApplicationApiAddrError = false;
    let ApplicationApiAddrError2 = false;
    dispatch(
      checkApplicationApiAddr((Error, Error2) => {
        ApplicationApiAddrError = Error;
        ApplicationApiAddrError2 = Error2;
      })
    );

    let ApplicationIDError = false;
    let ApplicationIDError2 = false;
    dispatch(
      checkApplicationID((Error, Error2) => {
        ApplicationIDError = Error;
        ApplicationIDError2 = Error2;
      })
    );

    let ApplicationNameError = false;
    let ApplicationNameError2 = false;
    dispatch(
      checkApplicationName((Error, Error2) => {
        ApplicationNameError = Error;
        ApplicationNameError2 = Error2;
      })
    );

    let ProviderError = false;
    let ProviderError2 = false;
    dispatch(
      checkProvider((Error, Error2) => {
        ProviderError = Error;
        ProviderError2 = Error2;
      })
    );
    let ApplicationImgUrlError = false;
    let ApplicationImgUrlError2 = false;
    dispatch(
      checkApplicationImgUrl((Error, Error2) => {
        ApplicationImgUrlError = Error;
        ApplicationImgUrlError2 = Error2;
      })
    );
    let {
      AddAppilicationTipsVisible,
      AddAppilicationParams: { IsThirdParty },
    } = getState().AccessData;
    if (
      ProviderError ||
      ApplicationNameError ||
      ApplicationIDError ||
      ApplicationApiAddrError ||
      ApplicationUrlError ||
      ApplicationCallbackAddrError ||
      IntroductionError ||
      ApplicationImgUrlError ||
      (isAdd && ApplicationSecretError && IsThirdParty !== "0") ||
      AddAppilicationTipsVisible.ApplicationNameTipsVisible
    ) {
      error1(getState());
    } else {
      if (isAdd) {
        success(getState());
      } else {
        let {
          AddAppilicationInitParams,
          AddAppilicationParams,
        } = getState().AccessData;
        if (
          ProviderError2 &&
          ApplicationNameError2 &&
          ApplicationIDError2 &&
          ApplicationApiAddrError2 &&
          ApplicationUrlError2 &&
          ApplicationCallbackAddrError2 &&
          IntroductionError2 &&
          ApplicationSecretError2 &&
          ApplicationImgUrlError2 &&
          AddAppilicationParams.ApplicationImgUrl ===
            AddAppilicationInitParams.ApplicationImgUrl &&
          AddAppilicationParams.ApplicationType ===
            AddAppilicationInitParams.ApplicationType &&
          Public.comparisonObject(
            AddAppilicationParams.Entrances,
            AddAppilicationInitParams.Entrances
          )
        ) {
          error2(getState());
          dispatch(
            AppAlertAction.alertTips({
              title: "您还没修改数据",
              cancelTitle: "确定",
            })
          );
        } else {
          success(getState());
        }
      }
    }
  };
};
// 应用编辑：应用名称修改检查
const checkEntranceName = (func = (error, EntranceNameError) => {}) => {
  //error:普通错误，EntranceNameError：抛出没改变错误
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let EntranceNameError = false; //与初始的是否相同

    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/;
    let EntranceName = AccessData.EntrancesParams.EntranceName;
    let InitEntranceName = AccessData.EntrancesInitParams.EntranceName;
    let error = false;
    if (EntranceName === "") {
      dispatch(SetAddApplicationTips({ EntranceNameTips: "入口名称不能为空" }));
      dispatch(
        SetAddApplicationTipsVisible({
          EntranceNameTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(EntranceName)) {
      dispatch(
        SetAddApplicationTips({ EntranceNameTips: "入口名称格式不正确" })
      );
      dispatch(
        SetAddApplicationTipsVisible({
          EntranceNameTipsVisible: true,
        })
      );

      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          EntranceNameTipsVisible: false,
        })
      );
      dispatch(
        SetAddApplicationTips({ EntranceNameTips: "入口名称格式不正确" })
      );

      if (Public.comparisonObject(InitEntranceName, EntranceName)) {
        EntranceNameError = true;
      }
      // console.log(error)
    }
    func(error, EntranceNameError);
  };
};
// 应用编辑：应用名称修改检查
const checkUserType = (func = (error, UserTypeError) => {}) => {
  //error:普通错误，UserTypeError：抛出没改变错误
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let UserTypeError = false; //与初始的是否相同

    // let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/;
    let UserType = AccessData.EntrancesParams.UserType;
    let InitUserType = AccessData.EntrancesInitParams.UserType;
    let error = false;
    if (UserType.length === 0) {
      dispatch(SetAddApplicationTips({ UserTypeTips: "至少选择一个用户类型" }));
      dispatch(
        SetAddApplicationTipsVisible({
          UserTypeTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          UserTypeTipsVisible: false,
        })
      );
      dispatch(SetAddApplicationTips({ UserTypeTips: "至少选择一个用户类型" }));

      if (Public.comparisonObject(InitUserType, UserType)) {
        UserTypeError = true;
      }
      // console.log(error)
    }
    func(error, UserTypeError);
  };
};
// 入口编辑：入口访问地址修改检查
const checkpc = (func = (error, pcError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/; //href
    let Test2 = /^[a-zA-z]+:\/\/[^\s]*$/;
    let pcError = false;

    let pc = AccessData.EntrancesParams.pc;
    let Initpc = AccessData.EntrancesParams.pc;
    let error = false;

    if (pc !== "" && (!Test.test(pc) || !Test2.test(pc))) {
      dispatch(SetAddApplicationTips({ pcTips: "PC端访问路径不正确" }));
      dispatch(
        SetAddApplicationTipsVisible({
          pcTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          pcTipsVisible: false,
        })
      );
      dispatch(SetAddApplicationTips({ pcTips: "PC端访问路径不正确" }));

      if (Public.comparisonObject(Initpc, pc)) {
        pcError = true;
      }
    }
    func(error, pcError);
  };
};
// 入口编辑：入口访问地址修改检查
const checkios = (func = (error, iosError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    // let Test = /^[a-zA-Z0-9]+:\/\/[a-zA-Z0-9]+$/;
    let Test = true;
    let iosError = false;

    let ios = AccessData.EntrancesParams.ios;
    let Initios = AccessData.EntrancesParams.ios;
    let error = false;

    if (ios !== "" && !Test) {
      dispatch(SetAddApplicationTips({ iosTips: "IOS端访问路径不正确" }));
      dispatch(
        SetAddApplicationTipsVisible({
          iosTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          iosTipsVisible: false,
        })
      );
      dispatch(SetAddApplicationTips({ iosTips: "IOS端访问路径不正确" }));

      if (Public.comparisonObject(Initios, ios)) {
        iosError = true;
      }
    }
    func(error, iosError);
  };
};
// 入口编辑：入口访问地址修改检查
const checkandroid = (func = (error, androidError) => {}) => {
  return (dispatch, getState) => {
    let { AccessData, UIState } = getState();
    // let Test = /^[a-zA-Z0-9]+:\/\/[a-zA-Z0-9]+$/;
    let Test = true;
    let androidError = false;

    let android = AccessData.EntrancesParams.android;
    let Initandroid = AccessData.EntrancesParams.android;
    let error = false;

    if (android !== "" && !Test) {
      dispatch(SetAddApplicationTips({ androidTips: "安卓端访问路径不正确" }));
      dispatch(
        SetAddApplicationTipsVisible({
          androidTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        SetAddApplicationTipsVisible({
          androidTipsVisible: false,
        })
      );
      dispatch(SetAddApplicationTips({ androidTips: "安卓端访问路径不正确" }));

      if (Public.comparisonObject(Initandroid, android)) {
        androidError = true;
      }
    }
    func(error, androidError);
  };
};
// 检测所有添加的参数
const checkAllEntrancesParams = ({
  isAdd = true,
  success = () => {},
  error1 = () => {},
  error2 = () => {},
}) => {
  return (dispatch, getState) => {
    let EntranceNameError = false;
    let EntranceNameError2 = false;
    dispatch(
      checkEntranceName((Error, Error2) => {
        EntranceNameError = Error;
        EntranceNameError2 = Error2;
      })
    );

    let UserTypeError = false;
    let UserTypeError2 = false;
    dispatch(
      checkUserType((Error, Error2) => {
        UserTypeError = Error;
        UserTypeError2 = Error2;
      })
    );

    let pcError = false;
    let pcError2 = false;
    dispatch(
      checkpc((Error, Error2) => {
        pcError = Error;
        pcError2 = Error2;
      })
    );

    let androidError = false;
    let androidError2 = false;
    dispatch(
      checkandroid((Error, Error2) => {
        androidError = Error;
        androidError2 = Error2;
      })
    );

    let iosError = false;
    let iosError2 = false;
    dispatch(
      checkios((Error, Error2) => {
        iosError = Error;
        iosError2 = Error2;
      })
    );
    console.log(
      iosError,
      androidError,
      pcError,
      UserTypeError,
      EntranceNameError
    );
    let { EntrancesParams, EntrancesInitParams } = getState().AccessData;

    if (
      iosError ||
      androidError ||
      pcError ||
      UserTypeError ||
      EntranceNameError ||
      (EntrancesParams.pc === "" &&
        EntrancesParams.ios === "" &&
        EntrancesParams.android === "")
    ) {
      error1(getState());
    } else {
      if (isAdd) {
        success(getState());
      } else {
        if (
          iosError2 &&
          androidError2 &&
          pcError2 &&
          UserTypeError2 &&
          EntranceNameError2 &&
          EntrancesParams.EntranceIconLarge ===
            EntrancesInitParams.EntranceIconLarge &&
          EntrancesParams.EntranceIconMini ===
            EntrancesInitParams.EntranceIconMini &&
          Public.comparisonObject(
            EntrancesParams.SubjectIds,
            EntrancesInitParams.SubjectIds
          )
        ) {
          error2(getState());
          dispatch(
            AppAlertAction.alertTips({
              title: "您还没修改数据",
              cancelTitle: "确定",
            })
          );
        } else {
          success(getState());
        }
      }
    }
  };
};
// 接口
const GET_IMG_URL_PROXY = "GET_IMG_URL_PROXY";
const getImgUrlProxy = () => {
  return (dispatch) => {
    // console.log(url)
    let url = "/Base/GetBaseServerAddr";
    getData(CONFIG.ImgUrlProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json === false) {
          return false;
        }
        if (json.StatusCode === 200) {
          dispatch({ type: GET_IMG_URL_PROXY, data: json.Data });
        }
      });
  };
};

const GetClientidAndKey = ({
  useDefault = true,
  ApplicationName,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let {
      AccessData: {
        AddAppilicationInitParams: { Type },
      },
    } = getState();
    if(Type!=='add'){
      return;
    }
    let url =
      AccessProxy_univ +
      "/GetClientidAndKey?ApplicationName=" +
      ApplicationName;
    dispatch(SetLoadingVisible({ EditAccessLoadingVisible: true }));
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json === false) {
          return false;
        }
        if (json.StatusCode === 200) {
          let { result, clientMsg } = json.Data;
          // if (useDefault) {
            if (result) {
              dispatch(
                SetAddApplicationParams({
                  ApplicationID: clientMsg.clientId,
                  ApplicationSecret: clientMsg.clientSecret,
                })
              );
              dispatch(checkApplicationID((error) => {}));
              dispatch(checkApplicationSecret((error) => {}));
            } else {
              dispatch(
                SetAddApplicationTips({ ApplicationNameTips: "应用名称重复" })
              );
              dispatch(
                SetAddApplicationTipsVisible({
                  ApplicationNameTipsVisible: true,
                })
              );
            }
          // }
          dispatch(SetLoadingVisible({ EditAccessLoadingVisible: false }));
          func(getState());
        }
      });
  };
};
// 设置 应用ID
const SET_EDIT_APPLICATION_MSG = "SET_EDIT_APPLICATION_MSG";
const SetEditApplicationMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_EDIT_APPLICATION_MSG, data });
  };
};
// 合并单独的入口到应用里的入口列表去
const SetEntrancesToApplication = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    let {
      EntrancesParams,
      AddAppilicationParams,
      defaultPicUrl,
      StaticData,
    } = getState().AccessData;
    let Entrances = AddAppilicationParams.Entrances;
    let isEqual = false;
    let newEntrances = [];
    if (EntrancesParams.EntranceIconMini === "") {
      EntrancesParams.EntranceIconMini = defaultPicUrl;
    }
    if (EntrancesParams.EntranceIconLarge === "") {
      EntrancesParams.EntranceIconLarge = defaultPicUrl;
    }

    let {
      UserType,
      UserTypeName,
      ios,
      pc,
      android,
      AccessParam,
      ...EntranceData
    } = EntrancesParams;

    let UserTypeArr = [];
    UserType instanceof Array &&
      UserType.map((child) => {
        UserTypeArr.push(StaticData.UserTypeForKey[child].title);
      });

    if (EntrancesParams.EntranceID !== "") {
      //修改

      Entrances instanceof Array &&
        Entrances.map((entrance) => {
          if (entrance.EntranceID === EntrancesParams.EntranceID) {
            isEqual = true;
            newEntrances.push({
              ...EntrancesParams,
              OperationType: "2",
              CanAdd: false,
            });
          } else {
            newEntrances.push({
              ...entrance,
              OperationType: "2",
              CanAdd: false,
            });
          }
        });
      if (!isEqual) {
        console.log("没有相同入口id");
      }
    } else {
      //添加
      newEntrances = Entrances;

      UserType instanceof Array &&
        UserType.map((child) => {
          //用户类型可以多生成路径
          if (ios) {
            newEntrances.push({
              ...EntranceData,
              UserType: [child],
              UserTypeName: StaticData.UserTypeForKey[child].title,
              ios,
              AccessParam: ios,
              CanAdd: false,
              OperationType: "0",
              DeviceType: "ios",
              DeviceTypesName: "IOS",
            });
          }
          if (pc) {
            newEntrances.push({
              ...EntranceData,
              UserType: [child],
              UserTypeName: StaticData.UserTypeForKey[child].title,
              pc,
              OperationType: "0",
              CanAdd: false,
              DeviceType: "pc",
              AccessParam: pc,
              DeviceTypesName: "PC",
            });
          }
          if (android) {
            newEntrances.push({
              ...EntranceData,
              UserType: [child],
              UserTypeName: StaticData.UserTypeForKey[child].title,
              CanAdd: false,
              android,
              DeviceType: "android",
              OperationType: "0",
              AccessParam: android,
              DeviceTypesName: "安卓",
            });
          }
        });
      // newEntrances.push(EntrancesParams);
    }
    dispatch(SetAddApplicationParams({ Entrances: newEntrances }));
    func(getState());
  };
};
// 删除

export default {
  GetClientidAndKey,
  SetEntrancesToApplication,

  ModifyEntrance,
  AddEntrance,

  GetSubjectListData,
  GET_SUBJECT_LIST_DATA,
  checkAllEntrancesParams,
  checkEntranceName,
  checkUserType,
  checkpc,
  checkandroid,
  checkios,

  SetApplicationParams,
  SET_APPLICATION_PARAMS,

  SetApplicationInitParams,
  SET_APPLICATION_INIT_PARAMS,

  GetApplicationParams,
  GET_APPLICATION_PARAMS,

  UpdateApplicationInfo,
  AddApplicationInfo,
  DeleteEntrance,

  SET_EDIT_APPLICATION_MSG,
  SetEditApplicationMsg,
  GET_IMG_URL_PROXY,
  getImgUrlProxy,

  checkAllAppParams,
  checkApplicationSecret,
  checkIntroduction,
  checkApplicationCallbackAddr,
  checkApplicationUrl,
  checkApplicationApiAddr,
  checkApplicationID,
  checkApplicationName,
  checkProvider,
  // SetApplicationInitParams,
  SetAddApplicationInitParams,
  SET_ADD_APPLICATION_INIT_PARAMS,

  SET_ADD_APPLICATION_PARAMS,
  SetAddApplicationParams,

  SetAddApplicationTipsVisible,
  SET_ADD_APPLICATION_TIPS_VISIBLE,

  SET_ADD_APPLICATION_TIPS,
  SetAddApplicationTips,

  SET_ADD_ACCESS_COMPONENT_CHANGE,
  SetAddAccessComponentChange,

  SET_LOADING_VISIBLE,
  SetLoadingVisible,

  SET_MODAL_VISIBLE,
  SetModalVisible,

  AddApplicationToSchool,

  RemoveApplication,

  UpdateApplicationState,

  SetAccessInfoParams,
  SET_ACCESS_INFO_PARAMS,

  GetApplicationList,
  GET_APPLICATION_LIST_DATA,

  GET_APPLICATION_DETAIL_DATA,
  GetApplicationDetail,

  GET_ACCESS_INFO_DATA,
  GetAccessInfo,

  getLoginUser,
  GET_LOGIN_USER_INFO,
};
