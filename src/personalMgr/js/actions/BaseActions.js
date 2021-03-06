import Method from "./Method";

import AppAlertActions from "./AppAlertActions";

import AppLoadingActions from "./AppLoadingActions";

import CONFIG from "../../../common/js/config";

import "../../../common/js/PicUpload/Cropper/cropper.css";

import "../../../common/js/PicUpload/photoUpload.scss";

import "../../../common/js/PicUpload/Cropper/cropper";
import { postData, getData } from "../../../common/js/fetch";

import $ from "jquery";
import ApiActions from "./ApiActions";

window.$ = $;

window.jQuery = $;

require("../../../common/js/PicUpload/juqery.cp.picUploader");
const { BasicProxy, UserInfoProxy, ClassProxy } = CONFIG;

const BASE_INFO_UPDATE = "BASE_INFO_UPDATE";

const BASE_SETTING_EDITOR_OPEN = "BASE_SETTING_EDITOR_OPEN";

const BASE_SETTING_EDITOR_CLOSE = "BASE_SETTING_EDITOR_CLOSE";

const BASE_SETTING_SHORT_NAME_CHANGE = "BASE_SETTING_SHORT_NAME_CHANGE";

const BASE_SETTING_QQ_CHANGE = "BASE_SETTING_QQ_CHANGE";

const BASE_SETTING_WEIXIN_CHANGE = "BASE_SETTING_WEIXIN_CHANGE";

const BASE_SETTING_WEIBO_CHANGE = "BASE_SETTING_WEIBO_CHANGE";

const BASE_SETTING_TEL_CHANGE = "BASE_SETTING_TEL_CHANGE";

const BASE_SETTING_SIGN_CHANGE = "BASE_SETTING_SIGN_CHANGE";

const BASE_SETTING_SHORT_NAME_TIPS_SHOW = "BASE_SETTING_SHORT_NAME_TIPS_SHOW";

const BASE_SETTING_SHORT_NAME_TIPS_HIDE = "BASE_SETTING_SHORT_NAME_TIPS_HIDE";

const BASE_SETTING_QQ_TIPS_SHOW = "BASE_SETTING_QQ_TIPS_SHOW";

const BASE_SETTING_QQ_TIPS_HIDE = "BASE_SETTING_QQ_TIPS_HIDE";

const BASE_SETTING_WEIXIN_TIPS_SHOW = "BASE_SETTING_WEIXIN_TIPS_SHOW";

const BASE_SETTING_WEIXIN_TIPS_HIDE = "BASE_SETTING_WEIXIN_TIPS_HIDE";

const BASE_SETTING_WEIBO_TIPS_SHOW = "BASE_SETTING_WEIBO_TIPS_SHOW";

const BASE_SETTING_WEIBO_TIPS_HIDE = "BASE_SETTING_WEIBO_TIPS_HIDE";

const BASE_SETTING_TEL_TIPS_SHOW = "BASE_SETTING_TEL_TIPS_SHOW";

const BASE_SETTING_TEL_TIPS_HIDE = "BASE_SETTING_TEL_TIPS_HIDE";

const BASE_SETTING_MANAGER_MODULES_SHOW = "BASE_SETTING_MANAGER_MODULES_SHOW";

const BASE_SETTING_MANAGER_MODULES_HIDE = "BASE_SETTING_MANAGER_MODULES_HIDE";

const BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW =
  "BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW";

const BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE =
  "BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE";

const PICUPLOADER_OPTIONS_UPDATE = "PICUPLOADER_OPTIONS_UPDATE";

const BASE_SETTING_LOADING_HIDE = "BASE_SETTING_LOADING_HIDE";

const BASE_SETTING_LOADING_SHOW = "BASE_SETTING_LOADING_SHOW";

//?????????????????????
const Init = () => {
  return (dispatch, getState) => {
    dispatch({ type: BASE_SETTING_LOADING_SHOW });

    let { UserID, UserType, Gender } = getState().LoginUser;

    let { BaseSetting } = getState();

    const { AvatarPath } = BaseSetting;

    let userType = "";

    let gender = "";

    switch (Number(UserType)) {
      case 0:
        userType = "Admin";

        break;

      case 1:
        userType = "Teacher";

        break;

      case 2:
        userType = "Student";

        break;

      default:
        userType = "Admin";
    }

    switch (Gender) {
      case "???":
        gender = "0";

        break;

      case "???":
        gender = "1";

        break;

      default:
        gender = "-1";
    }

    /*getBaseInfo({UserID,UserType,dispatch}).then(data => {

            if (data){


                if (data.AvatarPath===BaseSetting.AvatarPath) {//???????????????photo??????

                    delete data.AvatarPath;

                    delete data.AvatarPath;

                }

                dispatch({type:BASE_INFO_UPDATE,data:data});

                const { AvatarPath } = data;

                let userType = '';

                let gender = '';

                switch (UserType) {

                    case 0:

                        userType = 'Admin';

                        break;

                    case 1:

                        userType = 'Teacher';

                        break;

                    case 2:

                        userType = 'Student';

                        break;

                    default:

                        userType = 'Admin';

                }

                switch (Gender) {

                    case '???':

                        gender = '0';

                        break;

                    case '???':

                        gender = '1';

                        break;

                    default:

                        gender = '-1';

                }

                ApiActions.GetResHttpServerAddr({dispatch}).then(data=>{

                    if (data){

                        var option = {

                            token: sessionStorage.getItem('token'),

                            resWebUrl: data, //??????????????????

                            userType:userType,   //????????????????????????Admin???Student???Teacher???SchoolLeader

                            userID:UserID, //?????????????????????????????????????????????UserID

                            curImgPath:AvatarPath?AvatarPath:BaseSetting.AvatarPath, //???????????????????????????????????????

                            size:"small",

                            gender

                        };

                        dispatch({type:PICUPLOADER_OPTIONS_UPDATE,data:option});

                        $('#PicUpload').picUploader(option);

                    }

                    dispatch({type:BASE_SETTING_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });



            }

        });*/

    ApiActions.GetResHttpServerAddr({ dispatch }).then((data) => {
      if (data) {
        var option = {
          token: sessionStorage.getItem("token"),
          UploadType: "Avatar", //??????

          resWebUrl: data, //??????????????????

          userType: userType, //????????????????????????Admin???Student???Teacher???SchoolLeader

          userID: UserID, //?????????????????????????????????????????????UserID

          curImgPath: AvatarPath
            ? AvatarPath
            : BaseSetting.AvatarPath, //???????????????????????????????????????

          size: "small",

          gender,
        };

        dispatch({ type: PICUPLOADER_OPTIONS_UPDATE, data: option });

        $("#PicUpload").picUploader(option);
      }

      dispatch({ type: BASE_SETTING_LOADING_HIDE });

      dispatch({ type: AppLoadingActions.APP_LOADING_HIDE });
    });
  };
};

const Commit = (dom) => {
  return (dispatch, getState) => {
    let {
      ShortNameTipsShow,
      QQTipsShow,
      WeixinTipsShow,
      WeiboTipsShow,
      TelephoneTipsShow,
    } = getState().BaseSetting;

    let { UserID, UserType } = getState().LoginUser;

    let {
      ShortNameValue,
      QQValue,
      WeixinValue,
      TelephoneValue,
      WeiboValue,
      SignValue,
    } = getState().BaseSetting;

    if (
      !ShortNameTipsShow &&
      !QQTipsShow &&
      !WeixinTipsShow &&
      !WeiboTipsShow &&
      !TelephoneTipsShow
    ) {
      if ($(dom).picUploader.uploadSubmit()) {
        let AvatarPath = $(dom).picUploader.getCurImgPath();

        let PhotoEdit = $("#picUpload").picUploader.isChanged() ? 1 : 0;

        UpdateBasicInfo({
          UserID,
          UserType,
          ShortName: ShortNameValue ? ShortNameValue : "",
          QQ: QQValue ? QQValue : "",
          Weixin: WeixinValue ? WeixinValue : "",

          Weibo: WeiboValue ? WeiboValue : "",
          Telephone: TelephoneValue ? TelephoneValue : "",
          Sign: SignValue ? SignValue : "",
          AvatarPath,
          dispatch,

          PhotoEdit,
        }).then((data) => {
          if (data === 0) {
            dispatch({ type: BASE_SETTING_EDITOR_CLOSE });

            dispatch(AppAlertActions.alertSuccess({ title: "????????????" }));

            UpdateSesstionStorage();

            getBaseInfo({ UserID, UserType, dispatch }).then((data) => {
              if (data) {
                dispatch({ type: BASE_INFO_UPDATE, data: data });

                let option = getState().BaseSetting.PicUploader;

                option.curImgPath = data.AvatarPath;

                dispatch({ type: PICUPLOADER_OPTIONS_UPDATE, data: option });

                $("#PicUpload").picUploader.reset(option);
              }
            });
          }
        });
      } else {
        dispatch(AppAlertActions.alertError({ title: "?????????????????????" }));
      }
    }
  };
};

//??????sesstionStorage

const UpdateSesstionStorage = () => {
  let date = new Date();

  let time = date.getTime();

  const token = sessionStorage.getItem("token");

  $.ajax({
    url: `${CONFIG.TokenProxy}/UserMgr/Login/Api/Login.ashx?token=${token}&method=GetUserInfo&params=000`,

    type: "GET",

    dataType: "jsonp",

    jsonp: "jsoncallback", //??????????????????????????????????????????

    success: function (data) {
      let loginInfo = data.data;

      let UserInfo = {};

      Object.keys(loginInfo).forEach((key) => {
        if (key === "AvatarPath") {
          let date = new Date();

          let time = date.getTime();

          loginInfo[key] = loginInfo[key] + "?T=" + time;
        }

        UserInfo[key] = decodeURIComponent(loginInfo[key]);
      });

      /* for (let [key, value] of Object.entries(loginInfo)) {

                if (key === "AvatarPath") {

                    let date = new Date();

                    let time = date.getTime();

                    value = value + "?T=" + time;

                }

                UserInfo[key] = decodeURIComponent(value);

            }*/

      sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));
    },
  });
};

//??????base??????

export const getBaseInfo = async ({ UserID, UserType, dispatch }) => {
  let res = await Method.getGetData(
    `/UserMgr/PersonalMgr/GetBasicInfo?UserID=${UserID}&UserType=${UserType}`,
    2,
    CONFIG.PersonalProxy
  );

  if (res.StatusCode === 200) {
    return res.Data;
  } else {
    dispatch(
      AppAlertActions.alertError({
        title: res.Msg ? res.Msg : "????????????",
        ok: res.Msg
          ? ""
          : () => {
              return () => (window.location.href = "/error.aspx");
            },
      })
    );
  }
};

//????????????
let UpdateBasicInfo = async ({
  PhotoEdit,
  UserID,
  UserType,
  ShortName,
  AvatarPath,
  QQ,
  Weixin,
  Telephone,
  Weibo,
  Sign,
  dispatch,
}) => {
  let res = await Method.getPostData(
    "/UserMgr/PersonalMgr/UpdateBasicInfo",
    {
      UserID,
      UserType,
      ShortName,
      QQ,
      Weixin,

      Weibo,
      Telephone,
      Sign,
      AvatarPath,
      PhotoEdit,
    },
    2,
    CONFIG.PersonalProxy
  );

  if (res.StatusCode === 200) {
    return res.ErrCode;
  } else {
    dispatch(
      AppAlertActions.alertError({ title: res.Msg ? res.Msg : "????????????" })
    );
  }
};

const hideAlert = (dispatch) => {
  return () => {
    dispatch({ type: AppAlertActions.APP_ALERT_HIDE });
  };
};
//???????????????????????????????????????
let MAIN_GET_SUB_SYSTEMS_MAIN_SERVER = "MAIN_GET_SUB_SYSTEMS_MAIN_SERVER";
const GetSubSystemsMainServerBySubjectID = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    let url =
      "/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=000&access_token=4d39af1bff534514e24948568b750f6c&sysIDs=E27&subjectID=";
    getData(BasicProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: MAIN_GET_SUB_SYSTEMS_MAIN_SERVER, data: json.Data });
        }
        fn(getState());
      });
  };
};
export default {
  BASE_INFO_UPDATE,

  BASE_SETTING_EDITOR_OPEN,

  BASE_SETTING_EDITOR_CLOSE,

  BASE_SETTING_SHORT_NAME_CHANGE,

  BASE_SETTING_QQ_CHANGE,

  BASE_SETTING_WEIXIN_CHANGE,

  BASE_SETTING_WEIBO_CHANGE,

  BASE_SETTING_TEL_CHANGE,

  BASE_SETTING_SIGN_CHANGE,

  BASE_SETTING_SHORT_NAME_TIPS_SHOW,

  BASE_SETTING_SHORT_NAME_TIPS_HIDE,

  BASE_SETTING_QQ_TIPS_SHOW,

  BASE_SETTING_QQ_TIPS_HIDE,

  BASE_SETTING_WEIXIN_TIPS_SHOW,

  BASE_SETTING_WEIXIN_TIPS_HIDE,

  BASE_SETTING_WEIBO_TIPS_SHOW,

  BASE_SETTING_WEIBO_TIPS_HIDE,

  BASE_SETTING_TEL_TIPS_SHOW,

  BASE_SETTING_TEL_TIPS_HIDE,

  BASE_SETTING_MANAGER_MODULES_SHOW,

  BASE_SETTING_MANAGER_MODULES_HIDE,

  BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW,

  BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE,

  BASE_SETTING_LOADING_HIDE,

  BASE_SETTING_LOADING_SHOW,

  PICUPLOADER_OPTIONS_UPDATE,

  Init,

  Commit,

  GetSubSystemsMainServerBySubjectID,
  MAIN_GET_SUB_SYSTEMS_MAIN_SERVER,
};
