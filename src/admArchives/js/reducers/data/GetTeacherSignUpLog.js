import UpDataState from "../../actions/UpDataState";

const GetTeacherSignUpLog = (
  state = {
    DidData: {},
    newStatus: 0,
    WillData: { PageIndex: 0 },
    Grade: { value: 0, title: "全部年级" },
    College: { value: 0, title: "全部学院" },
    Major: { value: 0, title: "全部专业" },
    Class: { value: 0, title: "全部班级" },
    Group:{ value: 0, title: "全部教研室" }
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_TEACHER_WILL_SIGN_UP_LOG_MSG:
      let WillData = handleData(actions.data);
      return Object.assign({}, state, { WillData: WillData });
    case UpDataState.GET_TEACHER_DID_SIGN_UP_LOG_MSG:
      let DidData = handleData(actions.data);
      return Object.assign({}, state, { DidData: DidData });
    case UpDataState.SET_TEACHER_SIGN_UP_LOG_STATUS_MSG:
      return Object.assign({}, state, { newStatus: actions.data });
    case UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG:
      return Object.assign({}, state, { ...actions.data });
    default:
      return state;
  }
};

function handleData(data) {
  const { Total, List, PageIndex, ...Data } = data;
  let keyList = [];
  let returnData = List.map((child, index) => {
    keyList.push(index + 1);
    return {
      key: index,
      OrderNo: { OrderNo: index + 1 + PageIndex * 10, key: index + 1 },
      SignUpTime: child.SignUpTime,
      UserName: {
        key: index,
        PhotoPath: child.PhotoPath_NoCache || child.PhotoPath,
        UserName: child.UserName,
        UserID: child.UserID
      },
      UserID: child.UserID,
      Gender: child.Gender,
      Grade: { GradeName: child.GradeName, GradeID: child.GradeID },
      Class: { ClassName: child.ClassName, ClassID: child.ClassID },
      Status: {
        Status: child.Status,
        StatusTxt: child.StatusTxt
      },
      College:{
        CollegeName:child.CollegeName,
        CollegeID:child.CollegeID,
        GroupName:child.GroupName,
        GroupID:child.GroupID,
      },
      UserMsg: {
        logID: child.LogID,
        userName: child.UserName,
        userImg: child.PhotoPath_NoCache || child.PhotoPath,
        Gende: child.Gender,
        userID: child.UserID,
        subjectName: child.SubjectNames,
        userGrade: child.GradeName,
        userClass: child.ClassName,
        userIDCard: child.IDCardNo,userCollege: child.CollegeName,
        userGroup: child.GroupName,
        userPhone: child.Telephone,
        userMail: child.Email,
        userAddress: child.HomeAddress,
        userRegisterTime: child.SignUpTime,
        userRegisterIP: child.SignUpIP,
        userText: child.Sign,
        college:child.CollegeName,
        group:child.GroupName,
      },
      Data: child
    };
  });

  return { Total: Total, returnData: returnData, keyList, PageIndex, ...Data };
}

function getStatus(oldData, newData) {
  // console.log(oldData, newData)

  return newData.StatusCount - oldData.StatusCount;
}

export default GetTeacherSignUpLog;
