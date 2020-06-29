import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";

//操作常量
// 设置用户注册信息
const SET_USER_MSG = "SET_USER_MSG";
// 获取学生年级，班级
const GET_GRADE_CLASS_DATA = "GET_GRADE_CLASS_DATA";
// 获取学科信息
const GET_SUBJECT_DATA = "GET_SUBJECT_DATA";
//获取教研室信息
const GET_GROUP_DATA = 'GET_GROUP_DATA'
// 获取学校信息
const GET_SCHOOL_INFO = "GET_SCHOOL_INFO";
//获取网站资源数据
// const getWebsiteResourceData = url => {
//   return dispatch => {
//     getData(CONFIG.WebsiteProxy + url, 2)
//       .then(res => {
//         dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
//         return res.json();
//       })
//       .then(json => {
//         if (json.StatusCode === 200) {
//           dispatch({ type: GET_WEBSITE_RESOURCE_DATA, data: json.Data });
//           dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
//         }
//       });
//   };
// };

const setUserMsg = data => {
  //data:{userMsg:userMsg}
  return dispatch => {
    dispatch({ type: SET_USER_MSG, data: data });
  };
};
const getGradeClassData = ({ SchoolID = "" }) => {
  return dispatch => {
    getData(CONFIG.RegisterProxy + "/GetTree_Univ?SchoolID=" + SchoolID)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_GRADE_CLASS_DATA, data: json.Data });
        }
      });
  };
};
const getSubjectData = ({ SchoolID = "" }) => {
  return (dispatch, getState) => {
    getData(CONFIG.RegisterProxy + "/GetSubject_univ?SchoolID=" + SchoolID)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUBJECT_DATA, data: json.Data });
        }
      });
  };
};
const getGroupData = ({ SchoolID = "" }) => {
  return (dispatch, getState) => {
    getData(CONFIG.RegisterProxy + "/GetCollegeGroup_Univ?SchoolID=" + SchoolID)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_GROUP_DATA, data: json.Data });
        }
      });
  };
};
// 接口
const getSchoolInfo = () => {
  return (dispatch, getState) => {
    dispatch(UpUIState.AppLoadingOpen());
    getData(CONFIG.RegisterProxy + "/GeSchoolInfo_univ")
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SCHOOL_INFO, data: json.Data });
          let { DataState } = getState();
          if (
            DataState.getReisterData.SchoolList instanceof Array &&
            DataState.getReisterData.SchoolList.length === 1
          ) {
            dispatch(
              getGradeClassData({
                SchoolID: DataState.getReisterData.SchoolList[0].value
              })
            );
            dispatch(
              getGroupData({
                SchoolID: DataState.getReisterData.SchoolList[0].value
              })
            );
            dispatch(
              getSubjectData({
                SchoolID: DataState.getReisterData.SchoolList[0].value
              })
            );
            dispatch(setUserMsg({
              SchoolID: DataState.getReisterData.SchoolList[0].value
            }))
            dispatch(UpUIState.AppLoadingClose());
          } else {
            dispatch(UpUIState.AppLoadingClose());
          }
        }
      });
  };
};
export default {
  SET_USER_MSG,
  setUserMsg,
  GET_GRADE_CLASS_DATA,
  getGradeClassData,
  getSubjectData,
  GET_SUBJECT_DATA,
  getSchoolInfo,
  GET_SCHOOL_INFO,
  GET_GROUP_DATA,
  getGroupData
};
