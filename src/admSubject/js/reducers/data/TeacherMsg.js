import UpDataState from "../../actions/UpDataState";

const TeacherMsg = (state = "", actions) => {
  switch (actions.type) {
    case UpDataState.GET_TEACHER_MSG:
      let newData = handleData(actions.data);

      return { data: newData };
    default:
      return state;
  }
};
function handleData(data) {
  // console.log(data)
  if (!data) {
    return {};
  }
  return {
    userName: data.UserName,
    userImg: data.PhotoPath,
    Gende: data.Gender,
    userText: data.Sign,
    userID: data.UserID,
    userGrade: data.GradeName,
    userClass: data.ClassName,
    userIDCard: data.IDCardNo,
    userPhone: data.Telephone2,
    // Telephone: data.Telephone,//Telephone为用户档案的电话
    // Telephone: data.Telephone2,//Telephone2 是指用户账号的电话号码
    userMail: data.Email,
    userAddress: data.HomeAddress,
    titleName: data.TitleName,
    subjectName: data.SubjectNames,
    source: data.Source,
    position: data.Position,
      userMajor: data.MajorName,
      userGroup: data.GroupName,
      userCollege: data.CollegeName,
  };
}
export default TeacherMsg;
