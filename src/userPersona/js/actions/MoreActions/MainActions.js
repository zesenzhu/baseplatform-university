import { postData, getData } from "../../../../common/js/fetch";

import CONFIG from "../../../../common/js/config";
import "whatwg-fetch";
import CommonActions from "./CommonActions";
import Public, { correctNumber } from "../../../../common/js/public";
import $ from "jquery";
const { HashPrevProxy, UserScheduleProxy, BasicProxy } = CONFIG;
// 查询我的班级德育信息
const MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS =
  "MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS";

const GetClassMoralEduInfoByCriterias = ({
  func = () => {},
  userId,
  title,
  pageSize,
  pageNum,
  semester,
  token,classId
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          MoralEduParams: {
            Token,
            Proxy,
            UserID,
            Title,
            PageSize,
            PageNum,
            Semester,ClassId
          },
        },
      },
    } = State;
    if (userId === undefined) {
      userId = UserID;
    }
    if (title === undefined) {
      title = Title;
    }
    if (pageSize === undefined) {
      pageSize = PageSize;
    }
    if (pageNum === undefined) {
      pageNum = PageNum;
    }
    if (semester === undefined) {
      semester = Semester;
    }
    if (token === undefined) {
      token = Token;
    }
    if (classId === undefined) {
      classId = ClassId;
    }
    getClassMoralEduInfoByCriterias({
      Proxy,
      title,
      userId,
      pageSize,
      pageNum,
      semester,classId,
      token,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS,
          data: res.data,
        });
        func(getState());
      }
    });
  };
};
const getClassMoralEduInfoByCriterias = async ({
  title = "",
  userId = "",
  pageSize = "",
  pageNum = "",
  semester = "",
  token = "",classId='',
  Proxy,
}) => {
  let url =
    Proxy +
    "/getClassMoralEduInfoByCriterias?title=" +
    title +'&classId='+classId+
    // "&userId=" +
    // userId +
    "&pageSize=" +
    pageSize +
    "&pageNum=" +
    pageNum +
    "&semester=" +
    semester +
    "&token=" +
    token;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 关闭日程提醒_支持一次性删除多个
// const CloseScheduleRemind = ({ func = () => {}, data }) => {
//   return (dispatch, getState) => {
//     let State = getState();
//     // "scheduleid":"94964516824249168309,15156",//要关闭日程的ID串多个时用,号分割
//     // "scheduledate":"2019-09-18,2019-09-18",//要关闭日程对应的日程日期多个时用,号分割
//     // "scheduletype":"0,5",//要关闭日程对应的日程类型标识串多个时用,号分割
//     // "remindflag":"0,0",//要关闭日程对应的日程提醒标识串多个时用,号分割
//     // "deleteplanflag":"0,1"//要关闭日程对应的关闭类型标识串多个时用,号分割0自动关闭1手动关闭
//     let url = WorkScheduleProxy + "/CloseScheduleRemind";

//     postData(url, data, 2)
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.StatusCode === 200) {
//           func(getState());
//         } else {
//           dispatch(
//             PublicAction.showErrorAlert({ type: "error", title: json.Msg })
//           );
//         }
//       });
//   };
// };
// 获取学生期末总评
const MAIN_GET_STUDENT_REPORT = "MAIN_GET_STUDENT_REPORT";
const GetStudentReport = ({
  func = () => {},
  Term,
  ClassID,
  GradeID,
  SchoolID,
  Proxy,
  XH,
}) => {
  return (dispatch, getState) => {
    dispatch(
      CommonActions.SetStuResultParams({
        TabLoadingVisible: true,
      })
    );
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuResultParams },
      },
      systemUrl,
    } = State;
    if (Term === undefined) {
      Term = StuResultParams.Term;
    }

    if (SchoolID === undefined) {
      SchoolID = StuResultParams.SchoolID;
    }
    if (Proxy === undefined) {
      Proxy = StuResultParams.Proxy;
    }
    if (XH === undefined) {
      XH = StuResultParams.XH;
    }
    getStudentReport({ Term, ClassID, GradeID, SchoolID, Proxy, XH }).then(
      (res) => {
        if (res) {
          dispatch({ type: MAIN_GET_STUDENT_REPORT, data: res.data });
          func(getState());
        }
        dispatch(
          CommonActions.SetStuResultParams({
            TabLoadingVisible: false,
          })
        );
      }
    );
  };
};
const getStudentReport = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  XH = "",
}) => {
  let url =
    Proxy +
    "/api/JWCJZP/GetStudentReport?Term=" +
    Term +
    "&XH=" +
    XH +
    "&SchoolID=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.success === true) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学生最近一次考试

const MAIN_GET_STU_NEAR_EXAM = "MAIN_GET_STU_NEAR_EXAM";
const GetStuNearExam = ({
  func = () => {},
  Term,
  ClassID,
  GradeID,
  SchoolID,
  Proxy,
  XH,
}) => {
  return (dispatch, getState) => {
    dispatch(
      CommonActions.SetStuResultParams({
        TabLoadingVisible: true,
      })
    );
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuResultParams },
      },
      systemUrl,
    } = State;
    if (Term === undefined) {
      Term = StuResultParams.Term;
    }
    if (ClassID === undefined) {
      ClassID = StuResultParams.ClassID;
    }
    if (GradeID === undefined) {
      GradeID = StuResultParams.GradeID;
    }
    if (SchoolID === undefined) {
      SchoolID = StuResultParams.SchoolID;
    }
    if (Proxy === undefined) {
      Proxy = StuResultParams.Proxy;
    }
    if (XH === undefined) {
      XH = StuResultParams.XH;
    }
    const timeout = setTimeout(() => {
      console.log("请求超时了");
      dispatch(
        CommonActions.SetStuResultParams({
          TabLoadingVisible: false,
        })
      );
    }, 10000);
    let StuNearExam = getStuNearExam({
      Term,
      ClassID,
      GradeID,
      SchoolID,
      Proxy,
      XH,
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_STU_NEAR_EXAM, data: res.data });
        func(getState());
      }
      dispatch(
        CommonActions.SetStuResultParams({
          TabLoadingVisible: false,
        })
      );
    });
    Promise.race([StuNearExam, timeout]);
  };
};
const getStuNearExam = async ({
  Term = "",
  ClassID = "",
  GradeID = "",
  SchoolID = "",
  Proxy = "",
  XH = "",
}) => {
  let url =
    Proxy +
    "/api/JWCJZP/GetStuNearExam?Term=" +
    Term +
    "&ClassID=" +
    ClassID +
    "&GradeID=" +
    GradeID +
    "&XH=" +
    XH +
    "&SchoolID=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.success === true) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学生综合素养评价
const MAIN_GET_STUDENT_QUALITY = "MAIN_GET_STUDENT_QUALITY";
const GetStudentQuality = ({
  func = () => {},
  Term,

  Proxy,
  XH,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuQualityParams },
      },
      systemUrl,
    } = State;
    if (Term === undefined) {
      Term = StuQualityParams.Term;
    }

    if (Proxy === undefined) {
      Proxy = StuQualityParams.Proxy;
    }
    if (XH === undefined) {
      XH = StuQualityParams.XH;
    }
    getStudentQuality({ Term, Proxy, XH }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_STUDENT_QUALITY, data: res.data });
        func(getState());
      }
    });
  };
};
const getStudentQuality = async ({
  Term = "",

  Proxy = "",
  XH = "",
}) => {
  let url = Proxy + "/api/JWCJZP/GetStudentQuality?Term=" + Term + "&XH=" + XH;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.success === true) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学生综合素养评价
const MAIN_GET_TEACHER_WORK = "MAIN_GET_TEACHER_WORK";
const GetTeacherWork = ({
  func = () => {},
  semester,
  pageSize,
  Proxy,
  pageNum,
  userName,
  token,academyId
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: { TeaWorkParams },
      },
      systemUrl,
    } = State;
    if (semester === undefined) {
      semester = TeaWorkParams.Semester;
    }

    if (Proxy === undefined) {
      Proxy = TeaWorkParams.Proxy;
    }
    if (userName === undefined) {
      userName = TeaWorkParams.UserName;
    }
    
    if (academyId === undefined) {
      academyId = TeaWorkParams.academyId;
    }
    if (pageSize === undefined) {
      pageSize = TeaWorkParams.PageSize;
    }
    if (pageNum === undefined) {
      pageNum = TeaWorkParams.PageNum;
    }
    if (token === undefined) {
      token = TeaWorkParams.Token;
    }
    getTeacherWork({
      semester,
      Proxy,
      userName,
      pageSize,
      pageNum,
      token,academyId
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_TEACHER_WORK, data: res.data });
        func(getState());
      }
    });
  };
};
const getTeacherWork = async ({
  semester = "",
  userName = "",
  Proxy = "",
  pageSize = "",
  token = "",
  pageNum = "",academyId=''
}) => {
  let url =
    Proxy +
    "/getTeacherWorkCase?userName=" +
    userName +
    "&pageNum=" +
    pageNum +
    "&pageSize=" +
    pageSize +
    "&semester=" +
    semester +'&academyId='+academyId+
    "&token=" +
    token;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学生综合素养评价
const MAIN_GET_ALL_TERM = "MAIN_GET_ALL_TERM";
const GetAllTerm = ({
  func = () => {},

  Proxy,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: { TeaWorkParams },
      },
      systemUrl,
    } = State;

    if (Proxy === undefined) {
      Proxy = TeaWorkParams.Proxy;
    }

    getAllTerm({ Proxy }).then((res) => {
      if (res) {
        let List = [];
        res.data instanceof Array &&
          res.data.forEach((child) => {
            List.push({
              value: child.term,
              title: constructTerm(child.term),
            });
          });
        dispatch({ type: MAIN_GET_ALL_TERM, data: List });
        func(getState());
      }
    });
  };
};
let constructTerm = (Term) => {
  if (Term.includes("-")) {
    let Term1 = Term.slice(0, Term.length - 2);
    let Term2 = Term.slice(Term.length - 2, Term.length);
    let TermC = "";
    if (Term2 === "01") {
      TermC = "第一学期";
    } else if (Term2 === "02") {
      TermC = "第二学期";
    }
    return Term1 + "学年" + TermC;
  }
  return "";
};
const getAllTerm = async ({
  semester = "",
  userName = "",
  Proxy = "",
  pageSize = "",
  token = "",
  pageNum = "",
}) => {
  let url = Proxy + "/getAllTerm";
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取教师电子资源
const MAIN_GET_TEACHER_RES_VIEW = "MAIN_GET_TEACHER_RES_VIEW";
const GetTeacherResView = ({
  func = () => {},
  schoolID,
  teacherID,
  Proxy,
  token,
  subjectNames,
  startTime,
  subjectIDs,
  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { Token, StartTime, EndTime, FirstProxy },
        },
      },
      loginUser: { SchoolID },
      targetUser: { UserID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    if (Proxy === undefined) {
      Proxy = FirstProxy;
    }
    if (teacherID === undefined) {
      teacherID = UserID;
    }
    if (token === undefined) {
      token = Token;
    }
    if (subjectIDs === undefined) {
      subjectIDs = SubjectIDs;
    }
    if (subjectNames === undefined) {
      subjectNames = SubjectNames;
    }
    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    getTeacherResView({
      startTime,
      endTime,
      schoolID,
      Proxy,
      teacherID,
      subjectIDs,
      subjectNames,
      token,
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_TEACHER_RES_VIEW, data: res.data });
        func(getState());
      }
    });
  };
};
const getTeacherResView = async ({
  schoolID = "",
  teacherID = "",
  Proxy = "",
  subjectIDs = "",
  token = "",
  subjectNames = "",
  startTime = "",
  endTime = "",
}) => {
  let url =
    Proxy +
    "/api/Public/GetTeacherResView?SchoolID=" +
    schoolID +
    "&TeacherID=" +
    teacherID +
    "&Token=" +
    token +
    "&SubjectIDs=" +
    subjectIDs +
    "&SubjectNames=" +
    subjectNames +
    "&startTime=" +
    startTime +
    " 00:00:00" +
    "&endTime=" +
    endTime +
    " 23:59:59";
  let TransUrl =
    BasicProxy +
    "/Global/GetHttpRequestTransfer?appid=000&token=" +
    token +
    "&reqUrl=" +
    encodeURIComponent(url);
  let data = "";
  try {
    let res = await getData(TransUrl, 2, "cors", false, false);
    let json = await res.json();
    json = JSON.parse(json);
    // console.log(json)

    if (json.error === 0) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch {
    data = false; //有错误
  }
  return data;
};

// 获取教师教学方案
const MAIN_GET_TEACHER_PLAN_STATISTICS = "MAIN_GET_TEACHER_PLAN_STATISTICS";
const GetTeachPlanStatistics = ({
  func = () => {},
  userID,
  teacherID,
  Proxy,
  token,

  startTime,

  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { SecondProxy, Token, StartTime, EndTime },
        },
      },
      loginUser: { SchoolID },

      targetUser: { UserID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (userID === undefined) {
      userID = UserID;
    }

    if (Proxy === undefined) {
      Proxy = SecondProxy;
    }

    if (token === undefined) {
      token = Token;
    }

    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    getTeachPlanStatistics({
      startTime,
      endTime,
      userID,
      Proxy,
      teacherID,

      token,
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_TEACHER_PLAN_STATISTICS, data: res.Data });
        func(getState());
      }
    });
  };
};
const getTeachPlanStatistics = async ({
  userID = "",
  Proxy = "",

  token = "",

  startTime = "",
  endTime = "",
}) => {
  let url =
    Proxy +
    "TeachingPlan/ApiForOutside/GetTeachPlanStatistics?UserID=" +
    userID +
    // "&Token=" +
    // token +
    "&StartTime=" +
    startTime +
    " 00:00:00" +
    "&EndTime=" +
    endTime +
    " 23:59:59";
  // let TransUrl =
  // BasicProxy +
  // "/Global/GetHttpRequestTransfer?appid=000&token=" +
  // token +
  // "&reqUrl=" +
  // encodeURIComponent(url);
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  // json = JSON.parse(json)

  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取课程精品
const MAIN_GET_TEACHER_PERCENT_AGE = "MAIN_GET_TEACHER_PERCENT_AGE";
const GetTeacherpercentage = ({
  func = () => {},
  userID,
  teacherID,
  Proxy,
  token,
  schoolId,
  startTime,

  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { ThirdProxy, Token, StartTime, EndTime },
        },
      },
      targetUser: { UserID },
      loginUser: { SchoolID },

      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (userID === undefined) {
      userID = UserID;
    }

    if (Proxy === undefined) {
      Proxy = ThirdProxy;
    }

    if (token === undefined) {
      token = Token;
    }

    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    if (schoolId === undefined) {
      schoolId = SchoolID;
    }
    teacherpercentage({
      startTime,
      endTime,
      userID,
      Proxy,
      schoolId,

      token,
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_TEACHER_PERCENT_AGE, data: res.data });
        func(getState());
      }
    });
  };
};
const teacherpercentage = async ({
  userID = "",
  Proxy = "",

  token = "",

  startTime = "",
  endTime = "",
  schoolId = "",
}) => {
  let url =
    Proxy +
    "api/common/teacherpercentage?teacherId=" +
    userID +
    // "&Token=" +
    // token +
    "&StartTime=" +
    startTime +
    " 00:00:00" +
    "&EndTime=" +
    endTime +
    " 23:59:59" +
    "&schoolId=" +
    schoolId;
  let TransUrl =
    BasicProxy +
    "/Global/GetHttpRequestTransfer?appid=000&token=" +
    token +
    "&reqUrl=" +
    encodeURIComponent(url);
  let data = "";
  try {
    let res = await getData(TransUrl, 2, "cors", false, false);
    let json = await res.json();
    json = JSON.parse(json);

    if (json.code === 0) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch {
    data = false; //有错误
  }

  return data;
};
// 获取学期周次
const MAIN_GET_TERM_AND_PERIOD = "MAIN_GET_TERM_AND_PERIOD";
const GetTermAndPeriodAndWeekNOInfo = ({
  func = () => {},
  userID,
  userType,
  Proxy,
  token,
  schoolId,
  startTime,

  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { Token, StartTime, EndTime },
        },
      },
      targetUser: { UserID, UserType },
      loginUser: { SchoolID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,
        UserName,
      },
    } = State;
    if (userID === undefined) {
      userID = UserID;
    }

    if (Proxy === undefined) {
      Proxy = TeaWorkParams.SecondProxy;
    }

    if (userType === undefined) {
      userType = UserType;
    }

    if (schoolId === undefined) {
      schoolId = SchoolID;
    }
    getTermAndPeriodAndWeekNOInfo({
      userType,
      userID,
      Proxy,
      schoolId,

      token,
    }).then((res) => {
      if (res) {
        if (res.Data && res.Data.ItemWeek instanceof Array) {
          let WeekList = [];
          let NowWeekSelect;
          let NowWeek = res.Data.WeekNO;
          if (NowWeek > res.Data.ItemWeek.length || NowWeek <= 0) {
            NowWeek = 1;
          }
          res.Data.ItemWeek.forEach((child) => {
            let data = {
              value: child.WeekNO,
              title: "第" + child.WeekNO + "周",
            };
            WeekList.push(data);
            if (NowWeek === child.WeekNO) {
              NowWeekSelect = data;
            }
          });

          res.Data.WeekList = WeekList;
          res.Data.NowWeekSelect = NowWeekSelect;
        }
        dispatch({ type: MAIN_GET_TERM_AND_PERIOD, data: res.Data });
        func(getState());
      }
    });
  };
};
const getTermAndPeriodAndWeekNOInfo = async ({
  userID = "",
  Proxy = "",

  token = "",

  userType = "",
  schoolId = "",
}) => {
  let url =
    UserScheduleProxy +
    "/GetTermAndPeriodAndWeekNOInfo?userID=" +
    userID +
    "&userType=" +
    userType +
    "&schoolId=" +
    schoolId;
  let data = "";
  let res = await getData(url, 2, "cors", false, false);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 获取作业自习
const MAIN_GET_SELF_STUDY = "MAIN_GET_SELF_STUDY";
const MAIN_GET_AI_TRAIN = "MAIN_GET_AI_TRAIN";
const MAIN_GET_BEFORE_CLASS = "MAIN_GET_BEFORE_CLASS";
const MAIN_GET_AFTER_CLASS = "MAIN_GET_AFTER_CLASS";
const MAIN_GET_RE_TRAIN = "MAIN_GET_RE_TRAIN";
const MAIN_GET_PLAN_CLASS = "MAIN_GET_PLAN_CLASS";
const MAIN_GET_RES_STUDY = "MAIN_GET_RES_STUDY";
const GetSelfStudy = ({
  func = () => {},
  Term,
  ClassID,
  GradeID,
  SchoolID,
  Proxy,
  XH,
  Token,
}) => {
  return (dispatch, getState) => {
    dispatch(
      CommonActions.SetStuResultParams({
        TabLoadingVisible: true,
      })
    );
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuResultParams, TabLoadingVisible },
      },
      systemUrl: { Urls },
    } = State;
    if (Term === undefined) {
      Term = StuResultParams.Term;
    }

    if (SchoolID === undefined) {
      SchoolID = StuResultParams.SchoolID;
    }
    if (Proxy === undefined) {
      Proxy = StuResultParams.Proxy;
    }
    if (XH === undefined) {
      XH = StuResultParams.XH;
    }
    if (Token === undefined) {
      Token = StuResultParams.Token;
    }
    // AI教材
    Urls[930].WsUrl &&
      getAITrain({ userID: StuResultParams.XH, Proxy: Urls[930].WsUrl }).then(
        (res) => {
          if (res) {
            let DataList = [
              {
                Num: res.Result ? res.Result.AverageScore : 0,
                NumName: "平均得分",
                // Unit: "%",
              },
              {
                Num: res.Result ? res.Result.TrainTime : 0,
                NumName: "训练次数",
              },
            ];

            dispatch({
              type: MAIN_GET_AI_TRAIN,
              data: { ...res.Result, IsExist: true, DataList },
            });
            func(getState());
          }
          if (
            getState().MoreData.CommonData.StuResultParams.TabLoadingVisible
          ) {
            dispatch(
              CommonActions.SetStuResultParams({
                TabLoadingVisible: false,
              })
            );
          }
        }
      );

    // 课前预习
    Urls[630].WsUrl &&
      getBeforeClass({
        userid: StuResultParams.XH,
        Proxy: Urls[630].WsUrl,
        Term,
        SchoolID,
        Token,
      }).then((res) => {
        if (res) {
          // "val":{
          //   "UserID":"",//学生id
          //   "TrainTime":7,//训练次数
          //   "PercentageRate":0.571,//完成率
          //    "ReachStandardCount":4.0//完成次数
          //   },
          let DataList = [
            {
              Num: res.val ? correctNumber(res.val.PercentageRate * 100) : 0,
              NumName: "完成率",
              Unit: "%",
            },
            {
              Num: res.val ? res.val.TrainTime : 0,
              NumName: "训练次数",
            },
          ];

          dispatch({
            type: MAIN_GET_BEFORE_CLASS,
            data: { ...res.val, IsExist: true, DataList },
          });

          func(getState());
        }
        if (getState().MoreData.CommonData.StuResultParams.TabLoadingVisible) {
          dispatch(
            CommonActions.SetStuResultParams({
              TabLoadingVisible: false,
            })
          );
        }
      });
    // 课后作业
    Urls[510].WebUrl &&
      getAfterClass({
        userid: StuResultParams.XH,
        Proxy: Urls[510].WebUrl,
        Term,
        SchoolID,
        Token,
      }).then((res) => {
        if (res) {
          // "val":{
          //   "UserID":"",//学生id
          //   "TrainTime":7,//训练次数
          //   "PercentageRate":0.571,//完成率
          //    "ReachStandardCount":4.0//完成次数
          //   },
          let DataList = [
            {
              Num: res.Data ? Math.round(res.Data.ScoreRate * 100) : 0,
              Unit: "%",
              NumName: "平均得分率",
            },
            {
              Num: res.Data ? Math.round(res.Data.PercentageRate * 100) : 0,
              NumName: "完成率",
              Unit: "%",
            },
            {
              Num: res.Data ? res.Data.TrainTime : 0,
              NumName: "训练次数",
            },
          ];

          dispatch({
            type: MAIN_GET_AFTER_CLASS,
            data: { ...res.Data, IsExist: true, DataList },
          });

          func(getState());
        }
        if (getState().MoreData.CommonData.StuResultParams.TabLoadingVisible) {
          dispatch(
            CommonActions.SetStuResultParams({
              TabLoadingVisible: false,
            })
          );
        }
      });

    // 过关训练
    Urls[627].WsUrl &&
      getReTrain({
        userid: StuResultParams.XH,
        Proxy: Urls[627].WsUrl,
      }).then((res) => {
        if (res) {
          // "val":{
          //   "UserID":"",//学生id
          //   "TrainTime":7,//训练次数
          //   "PercentageRate":0.571,//完成率
          //    "ReachStandardCount":4.0//完成次数
          //   },
          let DataList = [
            {
              Num: res.Data ? res.Data.TrainTime : 0,
              NumName: "训练次数",
            },
            {
              Num: res.Data ? res.Data.LearningTime : 0,
              NumName: "学习时长",
              Unit: "h",
            },
          ];

          dispatch({
            type: MAIN_GET_RE_TRAIN,
            data: { ...res.Data, IsExist: true, DataList },
          });

          func(getState());
        }
        if (getState().MoreData.CommonData.StuResultParams.TabLoadingVisible) {
          dispatch(
            CommonActions.SetStuResultParams({
              TabLoadingVisible: false,
            })
          );
        }
      });

    // 电子素材
    Urls[629].WsUrl &&
      getResStudy({
        userid: StuResultParams.XH,
        Proxy: Urls[629].WsUrl,
      }).then((res) => {
        if (res) {
          // "val":{
          //   "UserID":"",//学生id
          //   "TrainTime":7,//训练次数
          //   "PercentageRate":0.571,//完成率
          //    "ReachStandardCount":4.0//完成次数
          //   },
          let DataList = [
            {
              Num: res.Data ? res.Data.TotalStudyData : 0,
              NumName: "学习资料数",
            },
            {
              Num: res.Data ? res.Data.LearningTime : 0,
              NumName: "学习时长",
              Unit: "h",
            },
          ];

          dispatch({
            type: MAIN_GET_RES_STUDY,
            data: { ...res.Data, IsExist: true, DataList },
          });

          func(getState());
        }
        if (getState().MoreData.CommonData.StuResultParams.TabLoadingVisible) {
          dispatch(
            CommonActions.SetStuResultParams({
              TabLoadingVisible: false,
            })
          );
        }
      });
    // 课外计划
    Urls[624].WsUrl &&
      getPlanClass({
        userid: StuResultParams.XH,
        Proxy: Urls[624].WsUrl,
      }).then((res) => {
        if (res) {
          // "val":{
          //   "UserID":"",//学生id
          //   "TrainTime":7,//训练次数
          //   "PercentageRate":0.571,//完成率
          //    "ReachStandardCount":4.0//完成次数
          //   },
          let DataList = [
            {
              Num: res.Data ? res.Data.TotalPlan : 0,
              NumName: "计划总数",
            },
            {
              Num: res.Data ? res.Data.LearningTime : 0,
              NumName: "学习时长",
              Unit: "h",
            },
          ];

          dispatch({
            type: MAIN_GET_PLAN_CLASS,
            data: { ...res.Data, IsExist: true, DataList },
          });

          func(getState());
        }
        if (getState().MoreData.CommonData.StuResultParams.TabLoadingVisible) {
          dispatch(
            CommonActions.SetStuResultParams({
              TabLoadingVisible: false,
            })
          );
        }
      });
  };
};
const getAITrain = async ({
  Term = "",
  userID = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  XH = "",
}) => {
  let url = Proxy + "WebService.asmx/GetStuScoreAndTrainTime";
  let data = "";
  // $.post(url, { userID }, (data, status) => {
  //   console.log(data, status);
  // });
  let res = await postData(url, { userID }, 1, "cors", false, false);
  let json = await res.json();

  if (json.ReturnCode === 1) {
    data = json;
  } else {
    data = false; //有错误
  }

  return data;
};
// 课前预习
const getBeforeClass = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  userid = "",
  Token = "",
}) => {
  let url =
    Proxy +
    "api/public/v2/kqyx/studentportrayal?term=" +
    Term +
    "&userid=" +
    userid +
    "&token=" +
    Token +
    "&schoolid=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 1, "cors", false, false);

  let json = await res.json();

  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 课后作业
const getAfterClass = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  userid = "",
  Token = "",
}) => {
  let url =
    Proxy +
    "api/Com/studentportrayal?term=" +
    Term +
    "&userid=" +
    userid +
    "&token=" +
    Token +
    "&schoolid=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 1, "cors", false, false);

  let json = await res.json();

  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 过关训练
const getReTrain = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  userid = "",
  Token = "",
}) => {
  let url = Proxy + "api/Public/ReTrainInfos?StuID=" + userid;
  let data = "";
  let res = await getData(url, 1, "cors", false, false);

  let json = await res.json();

  if (json.Status === 1) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 课外计划
const getPlanClass = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  userid = "",
  Token = "",
}) => {
  let url =
    Proxy + "FreeStudyCloudApi/StudyPlan/GetPlanStudyInfo?UserID=" + userid;
  let data = "";
  try {
    let res = await getData(url, 1, "cors", false, false);

    let json = await res.json();

    if (json.StatusCode === 0) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch {
    data = false;
  }
  return data;
};
// 课外计划
const getResStudy = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  userid = "",
  Token = "",
}) => {
  let url = Proxy + "api/Public/GetResStudyInfo?UserID=" + userid;
  let data = "";
  try {
    let res = await getData(url, 1, "cors", false, false);

    let json = await res.json();

    if (json.StatusCode === 0) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch (e) {
    data = false;
  }
  return data;
};

// 获取教师电子教材
const MAIN_GET_TEACHER_E_TEXTBOOK = "MAIN_GET_TEACHER_E_TEXTBOOK";
const GetTeacherETextBook = ({
  func = () => {},
  schoolID,
  teacherID,
  Proxy,
  token,
  subjectNames,
  startTime,
  subjectIDs,
  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { Token, StartTime, EndTime, ForthProxy },
        },
      },
      loginUser: { SchoolID },
      targetUser: { UserID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    if (Proxy === undefined) {
      Proxy = ForthProxy;
    }
    if (teacherID === undefined) {
      teacherID = UserID;
    }
    if (token === undefined) {
      token = Token;
    }
    if (subjectIDs === undefined) {
      subjectIDs = SubjectIDs;
    }
    if (subjectNames === undefined) {
      subjectNames = SubjectNames;
    }
    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    getTeacherETextBook({
      startTime,
      endTime,
      schoolID,
      Proxy,
      teacherID,
      subjectIDs,
      subjectNames,
      token,
    }).then((res) => {
      // console.log(res);
      if (res) {
        dispatch({
          type: MAIN_GET_TEACHER_E_TEXTBOOK,
          data: { ...res.Result, UploadCount: res.Result.BookCount },
        });
        func(getState());
      }
    });
  };
};
const getTeacherETextBook = async ({
  schoolID = "",
  teacherID = "",
  Proxy = "",
  subjectIDs = "",
  token = "",
  subjectNames = "",
  startTime = "",
  endTime = "",
}) => {
  let url = Proxy + "WebService.asmx/GetTeacherBookData";
  // ?SchoolID="
  //  +
  //   schoolID +
  //   "&TeacherID=" +
  //   teacherID +
  //   "&Token=" +
  //   token +
  //   // "&SubjectIDs=" +
  //   // subjectIDs +
  //   // "&SubjectNames=" +
  //   // subjectNames +
  //   "&startTime=" +
  //   startTime +
  //   " 00:00:00" +
  //   "&endTime=" +
  //   endTime +
  //   " 23:59:59";
  // let TransUrl =
  //   BasicProxy +
  //   "/Global/GetHttpRequestTransfer?appid=000&token=" +
  //   token +
  //   "&reqUrl=" +
  //   encodeURIComponent(url);
  let data = "";
  try {
    let res = await postData(
      url,
      { schoolID, userID: teacherID },
      1,
      "cors",
      false,
      false
    );
    // console.log(
    //   res.json
    //   // ,res.body.cancel()
    //   // ,res.body.getReader().closed
    // );

    let json = await res.json();
    // console.log(json, res);
    if (json.ReturnCode === 1) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch {
    console.log(data);

    data = false; //有错误
  }
  return data;
};
// 获取教师AI
const MAIN_GET_TEACHER_AI_TEACH_PLAN = "MAIN_GET_TEACHER_AI_TEACH_PLAN";
const GetTeacherAITeachPlan = ({
  func = () => {},
  schoolID,
  teacherID,
  Proxy,
  token,
  subjectNames,
  startTime,
  subjectIDs,
  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { Token, StartTime, EndTime, FifthProxy },
        },
      },
      loginUser: { SchoolID },
      targetUser: { UserID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    if (Proxy === undefined) {
      Proxy = FifthProxy;
    }
    if (teacherID === undefined) {
      teacherID = UserID;
    }
    if (token === undefined) {
      token = Token;
    }
    if (subjectIDs === undefined) {
      subjectIDs = SubjectIDs;
    }
    if (subjectNames === undefined) {
      subjectNames = SubjectNames;
    }
    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    getTeacherAITeachPlan({
      startTime,
      endTime,
      schoolID,
      Proxy,
      teacherID,
      subjectIDs,
      subjectNames,
      token,
    }).then((res) => {
      if (res) {
        dispatch({ type: MAIN_GET_TEACHER_AI_TEACH_PLAN, data: res.Data });
        func(getState());
      }
    });
  };
};
const getTeacherAITeachPlan = async ({
  schoolID = "",
  teacherID = "",
  Proxy = "",
  subjectIDs = "",
  token = "",
  subjectNames = "",
  startTime = "",
  endTime = "",
}) => {
  let url =
    Proxy +
    "CouldPreparation/TeachingProgram/queryPersonalData?SchoolID=" +
    schoolID +
    "&TeacherID=" +
    teacherID +
    "&Token=" +
    token +
    // 默认英语
    "&SubjectID="+(subjectIDs?subjectIDs:"S1-English") +
     
    // "&SubjectNames=" +
    // subjectNames +
    "&StartTime=" +
    startTime +
    " 00:00:00" +
    "&EndTime=" +
    endTime +
    " 23:59:59";
  // let TransUrl =
  //   BasicProxy +
  //   "/Global/GetHttpRequestTransfer?appid=000&token=" +
  //   token +
  //   "&reqUrl=" +
  //   encodeURIComponent(url);
  let data = "";
  try {
    let res = await getData(
      url,

      1,
      "cors",
      false,
      false
    );

    let json = await res.json();

    if (json.ErrorFlag === 0) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch (e) {
    data = false;
  }
  return data;
};
// 获取ESP
const MAIN_GET_TEACHER_ESP_MATERIAL = "MAIN_GET_TEACHER_ESP_MATERIAL";
const GetTeacherESPMaterial = ({
  func = () => {},
  schoolID,
  teacherID,
  Proxy,
  token,
  subjectNames,
  startTime,
  subjectIDs,
  endTime,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams,
          TeaMaterialParams: { Token, StartTime, EndTime, SixthProxy },
        },
      },
      loginUser: { SchoolID },
      targetUser: { UserID },
      termInfo: { Term },
      userArchives: {
        SubjectIDs,
        SubjectNames,
        ShortName,
        ClassID,
        GradeID,

        UserName,
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    if (Proxy === undefined) {
      Proxy = SixthProxy;
    }
    if (teacherID === undefined) {
      teacherID = UserID;
    }
    if (token === undefined) {
      token = Token;
    }
    if (subjectIDs === undefined) {
      subjectIDs = SubjectIDs;
    }
    if (subjectNames === undefined) {
      subjectNames = SubjectNames;
    }
    if (startTime === undefined) {
      startTime = StartTime;
    }
    if (endTime === undefined) {
      endTime = EndTime;
    }
    getTeacherESPMaterial({
      startTime,
      endTime,
      schoolID,
      Proxy,
      teacherID,
      subjectIDs,
      subjectNames,
      token,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_TEACHER_ESP_MATERIAL,
          data: { ...res.Result, UploadCount: res.Result.BookCount },
        });
        func(getState());
      }
    });
  };
};
const getTeacherESPMaterial = async ({
  schoolID = "",
  teacherID = "",
  Proxy = "",
  subjectIDs = "",
  token = "",
  subjectNames = "",
  startTime = "",
  endTime = "",
}) => {
  let url = Proxy + "WebService.asmx/GetTeacherEspUploadData";
  // ?schoolID=" +
  // schoolID +
  // "&userID=" +
  // teacherID;
  // +
  // "&Token=" +
  // token +
  // // "&SubjectIDs=" +
  // // subjectIDs +
  // // "&SubjectNames=" +
  // // subjectNames +
  // "&startTime=" +
  // startTime +
  // " 00:00:00" +
  // "&endTime=" +
  // endTime +
  // " 23:59:59";
  let data = "";
  try {
    let res = await postData(
      url,
      { schoolID, userID: teacherID },
      1,
      "cors",
      false,
      false
    );

    let json = await res.json();

    if (json.ReturnCode === 1) {
      data = json;
    } else {
      data = false; //有错误
    }
  } catch (e) {
    data = false;
  }
  // let TransUrl =
  //   BasicProxy +
  //   "/Global/GetHttpRequestTransfer?appid=000&token=" +
  //   token +
  //   "&reqUrl=" +
  //   encodeURIComponent(url);
  // let data = "";
  // try {
  //   let res = await getData(TransUrl, 2, "cors", false, false);
  //   let json = await res.json();
  //   json = JSON.parse(json);
  //   // console.log(json)

  //   if (json.error === 0) {
  //     data = json;
  //   } else {
  //     data = false; //有错误
  //   }
  // } catch {
  //   data = false; //有错误
  // }
  return data;
};
const MainActions = {
  MAIN_GET_TEACHER_ESP_MATERIAL,
  GetTeacherESPMaterial,

  MAIN_GET_TEACHER_AI_TEACH_PLAN,
  GetTeacherAITeachPlan,

  MAIN_GET_TEACHER_E_TEXTBOOK,
  GetTeacherETextBook,
  MAIN_GET_RES_STUDY,
  MAIN_GET_PLAN_CLASS,
  MAIN_GET_RE_TRAIN,
  MAIN_GET_AFTER_CLASS,
  MAIN_GET_BEFORE_CLASS,
  MAIN_GET_AI_TRAIN,
  MAIN_GET_SELF_STUDY,
  GetSelfStudy,

  GetTermAndPeriodAndWeekNOInfo,
  MAIN_GET_TERM_AND_PERIOD,

  GetTeacherpercentage,
  MAIN_GET_TEACHER_PERCENT_AGE,

  MAIN_GET_TEACHER_PLAN_STATISTICS,
  GetTeachPlanStatistics,

  GetTeacherResView,
  MAIN_GET_TEACHER_RES_VIEW,

  GetAllTerm,
  MAIN_GET_ALL_TERM,

  GetTeacherWork,
  MAIN_GET_TEACHER_WORK,

  GetStudentQuality,
  MAIN_GET_STUDENT_QUALITY,

  GetStudentReport,
  MAIN_GET_STUDENT_REPORT,

  GetStuNearExam,
  MAIN_GET_STU_NEAR_EXAM,

  MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS,
  GetClassMoralEduInfoByCriterias,
};
export default MainActions;
