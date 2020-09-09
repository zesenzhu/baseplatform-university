import { postData, getData } from "../../../common/js/fetch";
import CommonAction from "./CommonAction";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";
import Public from "../../../common/js/public";
import PublicAction from "./PublicAction";

const { BasicProxy, UserInfoProxy } = CONFIG;
//获取子系统的服务器地址信息
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
// 获取总览信息
const MAIN_GET_SUMMARY_DATA = "MAIN_GET_SUMMARY_DATA";
// 获取学校总览--大学
const GetSchoolSummary = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getSchoolSummary({
      schoolID,
    }).then((res) => {
      if (res) {
        let Data = {};
        let {
          Total,
          Student,
          Teacher,
          SchoolLeader: Leader,
          Colleges,
          CollegeStudent: StudentAcount,
          CollegeTeacher: TeacherAcount,
          CollegeStudent,
          CollegeTeacher,
        } = res.Data;
        let StudentList = [];
        let TeacherList = [];
        Colleges instanceof Array &&
          Colleges.forEach((child, index) => {
            StudentList.push({
              value: child.CollegeID,
              title: child.CollegeName,
              acount: CollegeStudent[index],
            });
            TeacherList.push({
              value: child.CollegeID,
              title: child.CollegeName,
              acount: CollegeTeacher[index],
            });
          });
        dispatch({
          type: MAIN_GET_SUMMARY_DATA,
          data: {
            ...res.Data,
            Leader,
            StudentList,
            TeacherList,
            StudentAcount,
            TeacherAcount,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getSchoolSummary = async ({ schoolID = "" }) => {
  let url = UserInfoProxy + "/GetSchoolSummary_Univ?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学院总览--大学
const GetCollegeSummary = ({ fn = () => {}, collegeID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
    } = State;
    if (collegeID === undefined) {
      collegeID = CollegeID;
    }

    getCollegeSummary({
      collegeID,
    }).then((res) => {
      if (res) {
        let Data = {};
        let {
          Total,
          Student,
          Teacher,
          CollegeLeader: Leader,
          Majors,
          Groups,
          MajorStudent: StudentAcount,
          GroupTeacher: TeacherAcount,
          MajorStudent,
          GroupTeacher,
        } = res.Data;
        let StudentList = [];
        let TeacherList = [];
        Majors instanceof Array &&
          Majors.forEach((child, index) => {
            StudentList.push({
              value: child.MajorID,
              title: child.MajorName,
              acount: MajorStudent[index],
            });
          });
        Groups instanceof Array &&
          Groups.forEach((child, index) => {
            TeacherList.push({
              value: child.GroupID,
              title: child.GroupName,
              acount: GroupTeacher[index],
            });
          });
        dispatch({
          type: MAIN_GET_SUMMARY_DATA,
          data: {
            ...res.Data,
            Leader,
            StudentList,
            TeacherList,
            StudentAcount,
            TeacherAcount,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getCollegeSummary = async ({ collegeID = "" }) => {
  let url = UserInfoProxy + "/GetCollegeSummary_Univ?collegeID=" + collegeID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学院、专业、年级、班级信息（用于构建下拉列表）
const MAIN_GET_TREE_DATA = "MAIN_GET_TREE_DATA";

const GetTree = ({ fn = () => {}, collegeID, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsCollege) {
      if (collegeID === undefined) {
        collegeID = CollegeID;
      }
    } else {
      collegeID = "";
    }
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getTree({
      collegeID,
      schoolID,
    }).then((res) => {
      if (res) {
        let CollegeList = [];
        let MajorList = [];
        let GradeList = [];
        let ClassList = [];
        res.Data instanceof Array &&
          res.Data.forEach((college) => {
            let { CollegeID, CollegeName, Majors } = college;
            CollegeList.push({ value: CollegeID, title: CollegeName });
            Majors instanceof Array &&
              Majors.forEach((major) => {
                let { MajorID, MajorName, Grades } = major;
                MajorList.push({
                  value: MajorID,
                  title: MajorName,
                  CollegeID,
                  CollegeName,
                });
                Grades instanceof Array &&
                  Grades.forEach((grade) => {
                    let { GradeID, GradeName, Classes } = grade;
                    if (
                      GradeList.length === 0 ||
                      GradeList[GradeList.length - 1].MajorID === MajorID
                    ) {
                      //年级只要一个就可以了，所以专业不一样就没必要在加了
                      GradeList.push({
                        value: GradeID,
                        title: GradeName,
                        CollegeID,
                        CollegeName,
                        MajorID,
                        MajorName,
                      });
                    }

                    Classes instanceof Array &&
                      Classes.forEach((Class) => {
                        let { ClassID, ClassName } = Class;
                        ClassList.push({
                          value: ClassID,
                          title: ClassName,
                          CollegeID,
                          CollegeName,
                          MajorID,
                          MajorName,
                          GradeID,
                          GradeName,
                        });
                      });
                  });
              });
          });

        dispatch({
          type: MAIN_GET_TREE_DATA,
          data: {
            CollegeList,
            MajorList,
            GradeList,
            ClassList,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getTree = async ({ collegeID = "", schoolID = "" }) => {
  let url =
    UserInfoProxy +
    "/GetTree_Univ?collegeID=" +
    collegeID +
    "&schoolID=" +
    schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取学生
const MAIN_GET_STUDENT_TO_PAGE = "MAIN_GET_STUDENT_TO_PAGE";

const GetStudentToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  majorID,
  gradeID,
  classID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { StudentParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = StudentParams.collegeID;
    }
    if (majorID === undefined) {
      majorID = StudentParams.majorID;
    }
    if (gradeID === undefined) {
      gradeID = StudentParams.gradeID;
    }
    if (classID === undefined) {
      classID = StudentParams.classID;
    }
    if (keyword === undefined) {
      keyword = StudentParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = StudentParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = StudentParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = StudentParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = StudentParams.sortType;
    }

    getStudentToPage({
      collegeID,
      schoolID,
      majorID,
      gradeID,
      classID,
      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_STUDENT_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getStudentToPage = async ({
  collegeID = "",
  schoolID = "",
  majorID = "",
  gradeID = "",
  classID = "",
  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetStudentToPage_Univ?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (gradeID !== "" ? "&gradeID=" + gradeID : "") +
    (classID !== "" ? "&classID=" + classID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (majorID !== "" ? "&majorID=" + majorID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取教师
const MAIN_GET_TEACHER_TO_PAGE = "MAIN_GET_TEACHER_TO_PAGE";

const GetTeacherToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  groupID,

  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { TeacherParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = TeacherParams.collegeID;
    }
    if (groupID === undefined) {
      groupID = TeacherParams.groupID;
    }

    if (keyword === undefined) {
      keyword = TeacherParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = TeacherParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = TeacherParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = TeacherParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = TeacherParams.sortType;
    }

    getTeacherToPage({
      collegeID,
      schoolID,
      groupID,

      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_TEACHER_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getTeacherToPage = async ({
  collegeID = "",
  schoolID = "",
  groupID = "",

  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetTeacherToPage_univ?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (groupID !== "" ? "&groupID=" + groupID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取领导
const MAIN_GET_LEADER_TO_PAGE = "MAIN_GET_LEADER_TO_PAGE";

const GetLeaderToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  userType,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { LeaderParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = LeaderParams.collegeID;
    }
    if (userType === undefined) {
      userType = LeaderParams.userType; //usertype==7为学校领导
      //usertype==10为学院领导
    }

    if (keyword === undefined) {
      keyword = LeaderParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = LeaderParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = LeaderParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = LeaderParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = LeaderParams.sortType;
    }

    getLeaderToPage({
      collegeID,
      schoolID,
      userType,

      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo: index + 1 >= 10 ? index + 1 : "0" + (index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_LEADER_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getLeaderToPage = async ({
  collegeID = "",
  schoolID = "",
  userType = "",

  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetSchoolLeader_univ?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    // "&pageIndex=" +
    // pageIndex +
    // "&pageSize=" +
    // pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (userType !== "" ? "&userType=" + userType : 7);
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取教师档案-获取学院、教研室信息
const MAIN_GET_TEACHER_TREE_DATA = "MAIN_GET_TEACHER_TREE_DATA";

const GetTeacherTree = ({ fn = () => {}, collegeID, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsCollege) {
      if (collegeID === undefined) {
        collegeID = CollegeID;
      }
    } else {
      collegeID = "";
    }
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getTeacherTree({
      collegeID,
      schoolID,
    }).then((res) => {
      if (res) {
        let CollegeList = [];
        let GroupList = [];

        res.Data instanceof Array &&
          res.Data.forEach((college) => {
            let { CollegeID, CollegeName } = college;
            CollegeList.push({ value: CollegeID, title: CollegeName });
            college.GroupList instanceof Array &&
              college.GroupList.forEach((group) => {
                let { GroupID, GroupName } = group;
                GroupList.push({
                  value: GroupID,
                  title: GroupName,
                  CollegeID,
                  CollegeName,
                });
              });
          });

        dispatch({
          type: MAIN_GET_TEACHER_TREE_DATA,
          data: {
            CollegeList,
            GroupList,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};

const getTeacherTree = async ({ collegeID = "", schoolID = "" }) => {
  let url =
    UserInfoProxy +
    "/GetCollegeGroup_Univ?collegeID=" +
    collegeID +
    "&schoolID=" +
    schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取对象的修改历史
const MAIN_GET_USER_LOG_DATA = "MAIN_GET_USER_LOG_DATA";
// 获取对象的修改历史
const GetUserLog = ({ fn = () => {}, innerID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    // if (innerID === undefined) {
    //   innerID = SchoolID;
    // }

    getUserLog({
      innerID,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_USER_LOG_DATA,
          data: res.Data,
        });
        fn(getState());
        dispatch(PublicAction.ModalLoadingClose());
      }
    });
  };
};
const getUserLog = async ({ innerID = "" }) => {
  let url = UserInfoProxy + "/GetUserLog?innerID=" + innerID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 删除学生
const DeleteStudent = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteStudent_Univ";
    let {
      DataState: {
        CommonData: {
          StudentParams: { checkedList },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: checkedList.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
      });
  };
};
// 删除教师
const DeleteTeacher = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteTeacher_Univ";
    let {
      DataState: {
        CommonData: {
          TeacherParams: { checkedList },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: checkedList.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
      });
  };
};
// 删除领导
const DeleteLeader = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteSchoolLeader_Univ";
    let {
      DataState: {
        CommonData: {
          LeaderParams: { checkedList },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: checkedList.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
      });
  };
};
export default {
  MAIN_GET_LEADER_TO_PAGE,
  GetLeaderToPage,

  DeleteLeader,
  DeleteTeacher,

  GetTeacherToPage,
  MAIN_GET_TEACHER_TO_PAGE,

  GetTeacherTree,
  MAIN_GET_TEACHER_TREE_DATA,

  DeleteStudent,

  MAIN_GET_USER_LOG_DATA,
  GetUserLog,

  GetStudentToPage,
  MAIN_GET_STUDENT_TO_PAGE,

  GetTree,
  MAIN_GET_TREE_DATA,

  GetCollegeSummary,
  MAIN_GET_SUMMARY_DATA,
  GetSchoolSummary,

  GetSubSystemsMainServerBySubjectID,
  MAIN_GET_SUB_SYSTEMS_MAIN_SERVER,
};
