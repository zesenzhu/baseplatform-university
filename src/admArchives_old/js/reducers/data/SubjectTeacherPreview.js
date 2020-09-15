import UpDataState from "../../actions/UpDataState";

const SubjectTeacherPreview = (
  state = {
    Group: { value: 0, title: "全部教研室" },
    // College: { value: 0, title: "全部学院" },
    pageIndex: 0,
    newList: [],
    keyList: [],
    pensonalList: []
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_SUBJECT_TEACHER_PREVIEW:
      let { Total, ...list } = actions.data;

      let List = handleData(list, actions.pageIndex, actions.pageSize);

      return Object.assign({}, state, { Total, ...List, loading: false });
    case UpDataState.GET_UNIV_SUBJECT_TEACHER_PREVIEW:
      List = handleUnivData(actions.data, actions.pageIndex, actions.pageSize);

      return Object.assign({}, state, { ...List, loading: false });
    case UpDataState.SET_SUBJECTID:
      return Object.assign({}, state, {
        College: actions.College,
        Group: actions.Group
      });

    default:
      return state;
  }
};
function handleUnivData(data, pageIndex, pageSize) {
  let keyList = [];
  let pensonalList = [];
  let PageIndex = data.PageIndex;

  let newList = data.List.map((child, index) => {
    let list = {};
    list.UserName = { key: index, UserName: child.UserName };
    list.UserID = child.UserID;
    list.UserImgs = {
      key: index,
      UserName: child.UserName,
      UserImg: child.PhotoPath_NoCache || child.PhotoPath,
      UserImg_Nocache: child.PhotoPath_NoCache
    };
    list.Gender = child.Gender;
    list.OrderNo = { key: index, OrderNo: index + PageIndex * pageSize };
    list.key = index;
    keyList.push(list.key);

    let NewSubject = handleSubject(child.SubjectNames, child.SubjectIDs);
    list.SubjectNames = NewSubject;
    list.Titles = { TitleID: child.TitleID, TitleName: child.TitleName };
    list.GroupMsg = { Group: child.GroupName, College: child.CollegeName };
    list.Group = { value: child.GroupID, title: child.GroupName };
    list.College = { value: child.CollegeID, title: child.CollegeName };
    //let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
    list.handleMsg = { ...child, key: index, ...NewSubject };
    list.Others = child;
    let person = {
      userName: child.UserName,
      userImg: child.PhotoPath_NoCache || child.PhotoPath,
      Gende: child.Gender,
      userText: child.Sign,
      subjectName: child.SubjectNames,
      userID: child.UserID,
      titleName: child.TitleName,
      userCollege: child.CollegeName,
      userGroup: child.GroupName,
      userGrade: child.GradeName,
      userClass: child.ClassName,
      userIDCard: child.IDCardNo,
      userPhone: child.Telephone,
      userMail: child.Email,
      userAddress: child.HomeAddress
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
    pageSize
  };
}
function handleData(data, pageIndex, pageSize) {
  let keyList = [];
  let pensonalList = [];
  let PageIndex = data.PageIndex;

  let newList = data.List.map((child, index) => {
    let list = {};
    list.UserName = { key: index, UserName: child.UserName };
    list.UserID = child.UserID;
    list.UserImgs = {
      key: index,
      UserName: child.UserName,
      UserImg: child.PhotoPath_NoCache || child.PhotoPath,
      UserImg_Nocache: child.PhotoPath_NoCache
    };
    list.Gender = child.Gender;
    list.OrderNo = { key: index, OrderNo: index + PageIndex * pageSize };
    list.key = index;
    keyList.push(list.key);

    let NewSubject = handleSubject(child.SubjectNames, child.SubjectIDs);
    list.SubjectNames = NewSubject;
    list.Titles = { TitleID: child.TitleID, TitleName: child.TitleName };

    //let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
    list.handleMsg = { ...child, key: index, ...NewSubject };
    list.Others = child;
    let person = {
      userName: child.UserName,
      userImg: child.PhotoPath_NoCache || child.PhotoPath,
      Gende: child.Gender,
      userText: child.Sign,
      subjectName: child.SubjectNames,
      userID: child.UserID,
      titleName: child.TitleName,
      userGrade: child.GradeName,
      userClass: child.ClassName,
      userIDCard: child.IDCardNo,
      userPhone: child.Telephone,
      userMail: child.Email,
      userAddress: child.HomeAddress
    };
    pensonalList.push(person);
    return { ...list, child };
  });
  return { newList, keyList, pensonalList, pageIndex: PageIndex, pageSize };
}
function handleSubject(name = "", id = "") {
  if (typeof name !== "string") {
    name = "";
  }
  let nameArr = name.split(",");
  let idArr = id.split(",");
  let showTwo = "";
  nameArr.map((child, index) => {
    if (index !== nameArr.length - 1) showTwo += child + ",";
    else showTwo += child;
  });

  let newSubjects = [];
  let SubjectArr = [];
  nameArr.map((name, index) => {
    newSubjects[idArr[index]] = name;
    SubjectArr.push(idArr[index]);
  });

  return { showTwo: showTwo, newSubjects: newSubjects, SubjectArr: SubjectArr };
}

export default SubjectTeacherPreview;
