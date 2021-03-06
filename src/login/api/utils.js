import { getData, postData } from "../../common/js/fetch";

import { getQueryVariable, LogOut } from "../../common/js/disconnect";

import { hideAlert, showErrorAlert } from "../store/appAlert";

import { ChangePwdParams } from "../store/changePwd";

import { GetSchoolInitStatus } from "./index";

//获取数据以及封装数据格式
const getGetData = async (url, level, api = "", mode = "cors", arr = false) => {
  try {
    let fetchAsync = "";

    try {
      fetchAsync = await getData(api + url, level, mode, false, arr);
    } catch (e) {
      return e;
    }

    let json = await fetchAsync.json();

    return json;
  } catch (e) {
    return e;
  }
};
//调用post接口
const getPostData = async (
  url,
  data,
  level,
  api = "",
  content_type = "urlencoded",
  arr = false
) => {
  try {
    let fetchAsync = "";

    try {
      fetchAsync = await postData(
        api + url,
        data,
        level,
        content_type,
        false,
        arr
      );
    } catch (e) {
      return e;
    }

    let json = await fetchAsync.json();

    return json;
  } catch (e) {
    return e;
  }
};

//拼接URL，有jointParam，返回拼接jointParam之后的URL，没有jointParam的话返回删除过?lg_tl的URL
export const getNewTkUrl = ({ preUrl, jointParam }) => {
  const decodeUrl = decodeURIComponent(preUrl);

  let newUrl = "";

  if (decodeUrl.includes("?lg_tk")) {
    let nexType = 0;

    const queryIndex = decodeUrl.indexOf("?");

    const andIndex = decodeUrl.indexOf("&");

    if (andIndex === -1) {
      newUrl = jointParam
        ? decodeUrl.replace(decodeUrl.substring(queryIndex), jointParam)
        : decodeUrl.replace(decodeUrl.substring(queryIndex), "");

      nexType = 1;
    } else {
      newUrl = jointParam
        ? decodeUrl.replace(
            decodeUrl.substring(queryIndex, andIndex),
            jointParam
          )
        : decodeUrl.replace(decodeUrl.substring(queryIndex, andIndex + 1), "?");

      nexType = 2;
    }

    return { type: 1, newUrl, nexType };
  } else if (decodeUrl.includes("?")) {
    return { type: 2, newUrl: decodeUrl };
  } else {
    return { type: 3, newUrl: decodeUrl };
  }
};

//判断跳转
export const goToNextPage = ({ dispatch, loadingHide, oldPwd }) => {
  const { UserType, SchoolID, UserID, LoginInfo } = JSON.parse(
    sessionStorage.getItem("UserInfo")
  );

  const { WebIndexUrl } = JSON.parse(
    sessionStorage.getItem("LgBasePlatformInfo")
  );
  // 为1才是第一次登陆
  let isFirstLogin =
    typeof LoginInfo === "string" && LoginInfo.split("|")[3] === '1';
  const token = sessionStorage.getItem("token");

  const preUri = getQueryVariable("lg_preurl");
  function success() {
    // alert(UserType,SchoolID)
    if (parseInt(UserType) === 6) {
      window.location.href = "/html/admSchoolSetting/index.html";
    } else if (SchoolID) {
      const urlObj = preUri
        ? getNewTkUrl({ preUrl: preUri, jointParam: `?lg_tk=${token}` })
        : getNewTkUrl({ preUrl: WebIndexUrl, jointParam: `?lg_tk=${token}` });

      const uriMain = urlObj.newUrl.split("#/")[0];

      const uriHash = urlObj.newUrl.split("#/")[1]
        ? "#/" + urlObj.newUrl.split("#/")[1]
        : "";

      switch (urlObj.type) {
        case 1:
          nexUrl = urlObj.newUrl;

          break;
        case 2:
        case 3:
          nexUrl =
            uriMain +
            (uriMain.includes("?") ? "&lg_tk=" : "?lg_tk=") +
            token +
            uriHash;
          break;
        // case 2:

        //     nexUrl = uriMain + '&lg_tk=' + token+uriHash;

        //     break;

        // case 3:

        //     nexUrl = uriMain + '?lg_tk=' + token+uriHash;

        //     break;
        default:
          break;
      }

      if (parseInt(UserType) === 0) {
        GetSchoolInitStatus({ SchoolId: SchoolID }).then((data) => {
          if (data) {
            window.location.href = nexUrl;
          } else {
            window.location.href = `/html/initGuide?lg_tk=${token}${
              preUri ? "&lg_preurl=" + preUri : ""
            }`;
          }
        });
      } else {
        window.location.href = nexUrl;
      }
    } else if (parseInt(UserType) === 0) {
      nexUrl = `/html/initGuide?lg_tk=${token}${
        preUri ? "&lg_preurl=" + preUri : ""
      }`;

      window.location.href = nexUrl;
    } else {
      dispatch(
        showErrorAlert({
          title: "登录异常,登录失败",
          cancelShow: "n",
          cancel: (e) => logErr(dispatch),
          close: (e) => logErr(dispatch),
          ok: (e) => logErr(dispatch),
        })
      );

      loadingHide(false);
    }
  }
  let nexUrl = "";
  // console.log(oldPwd);
  // 有旧密码才能修改密码
  if (isFirstLogin && oldPwd) {
    // console.log(PreLoginTime);
    dispatch(
      ChangePwdParams({
        visible: true,
        oldPwd,
        onOk: () => {
          success();
        },
        onCancel: () => {
          success();
        },
      })
    );
  } else {
    success();
  }
  // return;

  /*if (parseInt(UserType)===6){

            window.location.href= `/html/admSchoolSetting/index.html?lg_tk=${token}`;

        }else if(SchoolID){

            const urlObj = preUri?getNewTkUrl({preUrl:preUri,jointParam:`?lg_tk=${token}`}):getNewTkUrl({preUrl:WebIndexUrl,jointParam:`?lg_tk=${token}`});

            switch (urlObj.type) {

                case 1:

                    nexUrl = urlObj.newUrl;

                    break;

                case 2:

                    nexUrl = urlObj.newUrl + '&lg_tk=' + token;

                    break;

                case 3:

                    nexUrl = urlObj.newUrl + '?lg_tk=' + token;

                    break;

            }

            window.location.href = nexUrl;

        }else{

            dispatch(showErrorAlert({title:"登录异常,登录失败",cancelShow:'n',cancel:e=>logErr(dispatch),close:e=>logErr(dispatch),ok:e=>logErr(dispatch)}));

            loadingHide(false);

    }*/
};

const logErr = (dispatch) => {
  LogOut();

  dispatch(hideAlert(dispatch));
};

//将对象值解码后返回
export const decodeObjValue = (obj) => {
  let UserInfo = {};

  for (let [key, value] of Object.entries(obj)) {
    if (key === "PhotoPath") {
      let date = new Date();

      let time = date.getTime();

      value = value + "?T=" + time;
    }

    UserInfo[key] = decodeURIComponent(value);
  }

  UserInfo.isLogin = true;

  // console.log(JSON.stringify(UserInfo))

  return UserInfo;
};

export const removeSlashUrl = (url) => {
  const urlArr = url.split("");

  if (urlArr[urlArr.length - 1] === "/") {
    return url.substr(0, urlArr.length - 1);
  } else {
    return url;
  }
};

export const downLoadFile = (url) => {
  /* const form = document.createElement('form');
    form.setAttribute('action', url);
    form.setAttribute('method', 'get');
    form.setAttribute('target', '');
    form.setAttribute('style', 'display:none');
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);*/

  const oldIframe = document.getElementById("down_load_iframe");

  if (oldIframe) {
    document.body.removeChild(oldIframe);
  }

  const iframe = document.createElement("iframe");

  iframe.setAttribute("id", "down_load_iframe");

  iframe.src = url;

  iframe.style.display = "none";

  document.body.appendChild(iframe);
};

//清除sessionStorage 保留一些元素。
export const clearSessionStorage = (save) => {
  const saveList = save.split(",");

  const saveItemList = saveList.map((i) => {
    return { key: i, value: sessionStorage.getItem(i) };
  });

  sessionStorage.clear();

  saveItemList.map((i) => {
    sessionStorage.setItem(i.key, i.value);
  });
};

export { getPostData, getGetData };
