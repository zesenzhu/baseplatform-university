import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const getReisterData = (
  state = {
    GradeList: {},
    CollegeList: [{ value: 0, title: "暂无学院" }],
    CollegeList_Tea: [{ value: 0, title: "暂无学院" }],
    ClassList: {},
    MajorList: {},
    SubjectList: [{ value: 0, title: "暂无学科" }],
    GroupList: {},
    // SchoolList:[{value:'',title:'暂无学校'}],
    SchoolList: [
      // { value: "S27-511-AF57", title: "一体化教育云    平台sadasda" },
      { value: "0", title: "暂无学校" }
    ]
    // SubjectList:[{value:0,title:'暂无学科'}]
  },
  actions
) => {
  let data = "";

  switch (actions.type) {
    // case UpDataState.SET_USER_MSG:
    //   return Object.assign({}, state, { ...actions.data });
    case UpDataState.GET_GRADE_CLASS_DATA:
      data = handleGradeInfo(actions.data);
      return Object.assign({}, state, { ...data });
    case UpDataState.GET_SUBJECT_DATA:
      data = handleSubjectInfo(actions.data);
      // return Object.assign({}, state, {SubjectList: [{ value: 1, title: "暂无学科" }] });
      return Object.assign({}, state, { ...data });
      case UpDataState.GET_GROUP_DATA:
      data = handleGroupInfo(actions.data);
      return Object.assign({}, state, { ...data });
    case UpDataState.GET_SCHOOL_INFO:
      data = handleSchoolInfo(actions.data);
      return Object.assign({}, state, { SchoolList: data });
    default:
      return state;
  }
};
function handleGroupInfo(data) {
  if (data instanceof Array) {
    let GroupList = [];
    let CollegeList = [];

    data.map((child, index) => {
      if (child.CollegeID === "all") {
        return;
      } else {
        CollegeList.push({
          value: child.CollegeID,
          title: child.CollegeName
        });
        let Groups = []
        child.GroupList instanceof Array && child.GroupList.map((child1,index1)=>{
          Groups.push({
            value: child1.GroupID,
            title: child1.GroupName,
            CollegeID: child.CollegeID,
            CollegeName: child.CollegeName
          });
        })
        if(Groups.length===0){
          Groups = [{ value: 0, title: "暂无教研室" }]
        }
        GroupList[child.CollegeID] = Groups
      }
    });
    if(CollegeList.length===0){
      CollegeList = [{ value: 0, title: "暂无学院" }]
    }
    return {
      CollegeList_Tea:CollegeList,
      GroupList
    };
  } else {
    return {
      CollegeList_Tea: [{ value: 0, title: "暂无学院" }],
      GroupList:[{ value: 0, title: "暂无教研室" }]
    };
  }
}
function handleSubjectInfo(data) {
  if (data instanceof Array) {
    let SubjectList = [];

    data.map((child, index) => {
      if (child.SubjectID === "all") {
        return;
      } else {
        SubjectList.push({
          value: child.SubjectID,
          title: child.SubjectName
        });
      }
    });
    return {
      SubjectList
    };
  } else {
    return {
      GradeList: [{ value: 0, title: "暂无年级" }],
      ClassList: {}
    };
  }
}
function handleGradeInfo(data) {
  if (data instanceof Array) {
    let GradeList = {};
    let ClassList = {};
    let CollegeList = [];
    let MajorList = {};
    data.map((child, index) => {
      CollegeList.push({
        value: child.CollegeID,
        title: child.CollegeName
      });
      let Majors = [];
      child.Majors instanceof Array &&
        child.Majors.map((child1, index1) => {
          Majors.push({
            value: child1.MajorID,
            title: child1.MajorName,
            CollegeID: child.CollegeID,
            CollegeName: child.CollegeName
          });
          let Grades = [];
          ClassList[child1.MajorID] = []
          child1.Grades instanceof Array &&
          child1.Grades.map((child2, index2) => {
              Grades.push({
                value: child2.GradeID,
                title: child2.GradeName,
                CollegeID: child.CollegeID,
                CollegeName: child.CollegeName,
                MajorName: child1.MajorName,
                MajorID: child1.MajorID
              });
              let Classes = [];
              child2.Classes instanceof Array &&
              child2.Classes.map((child3, index3) => {
                  Classes.push({
                    value: child3.ClassID,
                    title: child3.ClassName,
                    GradeID: child2.GradeID,
                    GradeName: child2.GradeName,
                    CollegeID: child.CollegeID,
                    CollegeName: child.CollegeName,
                    MajorName: child1.MajorName,
                    MajorID: child1.MajorID
                  });
                });
              if (Classes.length === 0) {
                Classes = [{ value: 0, title: "暂无班级" }];
              }
              ClassList[child1.MajorID][child2.GradeID] = Classes;
            });
          if (Grades.length === 0) {
            Grades = [{ value: 0, title: "暂无年级" }];
          }
          GradeList[child1.MajorID] = Grades;
        });
      if (Majors.length === 0) {
        Majors = [{ value: 0, title: "暂无专业" }];
      }
      MajorList[child.CollegeID] = Majors;
    });
    if(CollegeList.length===0){
      CollegeList = [{ value: 0, title: "暂无学院" }]
    }
    return {
      GradeList,
      ClassList,
      MajorList,
      CollegeList
    };
  } else {
    return {
      GradeList: {},
      CollegeList: [{ value: 0, title: "暂无学院" }],
      ClassList: {},
      MajorList: {}
    };
  }
}
function handleSchoolInfo(data) {
  if (data instanceof Array) {
    let SchoolList = data.map((child, index) => {
      return {
        value: child.SchoolID,
        title: child.SchoolName
      };
    });
    return SchoolList;
  } else {
    return [{ value: "", title: "暂无学校" }];
  }
}

export default getReisterData;
