import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import Public from "../../../../../common/js/public";
function get() {
  return new Promise((resolve, reject) => {
    // arguments
    let data = [...arguments]
    data[1] || data.push(2);

    try {
      getData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
function post() {
  return new Promise((resolve, reject) => {
    // arguments
    
    let data = [...arguments]

    data[2] || data.push(2);
    data[3] || data.push("json");
    try {
      postData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
const { SubSystemProxy } = CONFIG;
//操作常量
/**
 * @description: 获取所有应用（子系统）列表  http://192.168.129.1:8033/showdoc/web/#/11?page_id=2266
 * @param {*} payload
 * @return {*}
 */
export function GetAllSubSystem(payload = {}) {
  let { sysState, userType, sysType, key, pageIndex, pageSize } = payload;
  let url =
    SubSystemProxy +
    `/GetAllSubSystem?${sysState ? "sysState=" + sysState : ""}${
      userType ? "&userType=" + userType : ""
    }${sysType ? "&sysType=" + sysType : ""}${key ? "&key=" + key : ""}${
      pageIndex ? "&pageIndex=" + pageIndex : ""
    }${pageSize ? "&pageSize=" + pageSize : ""}`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data
            ? {
                ...json.Data,
                PageSize: pageSize,
                PageIndex:
                  pageIndex * pageSize > json.Data.TotalCount
                    ? Math.ceil(json.Data.TotalCount / pageSize)
                    : pageIndex,
              }
            : {},
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 获取可添加的应用（子系统）列表 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2268
export function GetSubSystemToAdd(payload = {}) {
  let { pageIndex, pageSize } = payload;
  let url =
    SubSystemProxy +
    `/GetSubSystemToAdd?${pageIndex ? "pageIndex=" + pageIndex : ""}${
      pageSize ? "&pageSize=" + pageSize : ""
    }`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data
            ? {
                ...json.Data,
                PageSize: pageSize,
                PageIndex:
                  pageIndex * pageSize > json.Data.TotalCount
                    ? Math.ceil(json.Data.TotalCount / pageSize)
                    : pageIndex,
              }
            : {},
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

// 更改应用（子系统）可访问状态 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2272
export function ToggleAccessState(payload = {}) {
  // let {  sysID, accessible } = payload;
  let url = SubSystemProxy + `/ToggleAccessState`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
