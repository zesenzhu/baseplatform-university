import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  //  console.log(data)
  if (data === null) {
    return {
      userName: "",
      userImg: "",
      Gende: "",
      userText: "",
      userID: "",
      subjectName: "",
      userGrade: "",
      userClass: "",
      userIDCard: "",
      userPhone: "",
      userMail: "",
      userAddress: "",
      titleName:'',
      StudentID:''
    };
  }
  return {
    userName: data.UserName,
    userImg: data.AvatarPath,
    Gende: data.Gender,
    userText: data.Sign,
    userID: data.UserID,
    subjectName: data.SubjectNames,
    userGrade: data.GradeName,
    userClass: data.ClassName,
    userIDCard: data.IDCardNo,
    userPhone: data.Telephone,
    userMail: data.Email,
    userAddress: data.HomeAddress,
    Position: data.Position,
    QQ: data.QQ,
    titleName:data.TitleName,
    Weixin: data.Weixin,userMajor: data.MajorName,
    
    userGroup: data.GroupName,
    StudentID: data.StudentID,
    userCollege: data.CollegeName,
    // Telephone: data.Telephone,//Telephone为用户档案的电话
    Telephone: data.Telephone2,//Telephone2 是指用户账号的电话号码
    Weibo: data.Weibo
  };
}
const GetUserMsg = (
  state = {
    userName: "",
    userImg: "",
    Gende: "",
    userText: "",
    userID: "",
    subjectName: "",
    userGrade: "",
    userClass: "",
    userIDCard: "",
    userPhone: "",
    userMail: "",
    userAddress: "",
    Position: "",
    QQ: "",
    WeiXin: "",
    Telephone: "",
    Weibo: ""
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
    case UpDataState.GET_USER_MSG:
      returnData = handleData(actions.data);

      return Object.assign({}, state, { ...returnData });
    default:
      return state;
  }
};

export default GetUserMsg;
