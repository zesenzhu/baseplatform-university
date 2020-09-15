import UpDataState from "../../actions/UpDataState";

const GradeStudentPreview = (
  state = {
    College: {},

    Major: {},

    Grade: {},
    Class: {},
    pageIndex: 0,
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_GRADE_STUDENT_PREVIEW:
      let { Total, ...list } = actions.data;

      let List = handleData(list, actions.pageIndex, actions.pageSize);
      //console.log(actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName})
      return Object.assign({}, state, {
        Total,
        ...List,
        GradeID: actions.GradeID || {
          value: List.newList[0].child.GradeID,
          title: List.newList[0].child.GradeName,
        },
        ClassID: actions.ClassID || {
          value: List.newList[0].child.ClassID,
          title: List.newList[0].child.ClassName,
        },
      });
    case UpDataState.GET_UNIV_STUDENT_PREVIEW:
      List = handleUnivData(actions.data, actions.pageIndex, actions.pageSize);
      //console.log(actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName})
      return Object.assign({}, state, {
        ...List,
        College: actions.College,

        Major: actions.Major,

        Grade: actions.Grade,
        Class: actions.Class,
      });
    case UpDataState.SET_GRADE_CLASS_MSG:
      return Object.assign({}, state, {
        ...actions.data,
      });
    default:
      return state;
  }
};
function handleUnivData(data, pageIndex, pageSize) {
  let keyList = [];
  let PageIndex = data.PageIndex;
  let pensonalList = [];
  // console.log(window.StudentPagination)
  // window.StudentPagination&&window.StudentPagination(PageIndex)
  let newList = data.List.map((child, index) => {
    let list = {};
    list.UserName = {
      key: index,
      PhotoPath: child.PhotoPath_NoCache || child.PhotoPath,
      UserName: child.UserName,
    };
    list.UserID = child.UserID;
    list.Gender = child.Gender;
    list.key = index;
    keyList.push(list.key);
    list.GradeName = child.GradeName;
    list.ClassName = child.ClassName;
    list.CollegeName = child.CollegeName;
    list.MajorName = child.MajorName;
    list.MyClass = {
      Major: child.MajorName,
      College: child.CollegeName,
      Grade: child.GradeName,
      Class: child.ClassName,
    };
    list.Major = { value: child.MajorID, title: child.MajorName };
    list.College = { value: child.CollegeID, title: child.CollegeName };

    list.OrderNo = { key: index, OrderNo: index + PageIndex * pageSize };
    let {
      UserID,
      Grader,
      GradeName,
      ClassName,
      PhotoPath,
      UserName,
      ...others
    } = child;
    list.Others = child;
    let person = {
      userName: child.UserName,
      userImg: child.PhotoPath_NoCache || child.PhotoPath,
      Gende: child.Gender,
      userText: child.Sign,
      userID: child.UserID,
      userGrade: child.GradeName,
      userClass: child.ClassName,
      userIDCard: child.IDCardNo,
      userPhone: child.Telephone,
      userMail: child.Email,
      userAddress: child.HomeAddress,
      userCollege: child.CollegeName,
      userMajor: child.MajorName,
    };
    pensonalList.push(person);
    return { ...list, child };
  });

  return {
    Total: data.Total,
    newList,
    keyList,
    pensonalList,
    pageIndex: PageIndex,
    pageSize,
  };
}
function handleData(data, pageIndex, pageSize) {
  let keyList = [];
  let PageIndex = data.PageIndex;
  let pensonalList = [];
  // console.log(window.StudentPagination)
  // window.StudentPagination&&window.StudentPagination(PageIndex)
  let newList = data.List.map((child, index) => {
    let list = {};
    list.UserName = {
      key: index,
      PhotoPath: child.PhotoPath_NoCache || child.PhotoPath,
      UserName: child.UserName,
    };
    list.UserID = child.UserID;
    list.Gender = child.Gender;
    list.key = index;
    keyList.push(list.key);
    list.GradeName = child.GradeName;
    list.ClassName = child.ClassName;
    list.OrderNo = { key: index, OrderNo: index + PageIndex * pageSize };
    let {
      UserID,
      Grader,
      GradeName,
      ClassName,
      PhotoPath,
      UserName,
      ...others
    } = child;
    list.Others = child;
    let person = {
      userName: child.UserName,
      userImg: child.PhotoPath_NoCache || child.PhotoPath,
      Gende: child.Gender,
      userText: child.Sign,
      userID: child.UserID,
      userGrade: child.GradeName,
      userClass: child.ClassName,
      userIDCard: child.IDCardNo,
      userPhone: child.Telephone,
      userMail: child.Email,
      userAddress: child.HomeAddress,
    };
    pensonalList.push(person);
    return { ...list, child };
  });

  return { newList, keyList, pensonalList, pageIndex: PageIndex, pageSize };
}

export default GradeStudentPreview;
