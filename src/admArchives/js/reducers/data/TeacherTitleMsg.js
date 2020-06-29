import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  let newData = data.map((child, index) => {
    return {
      value: child.TitleID,
      title: child.TitleName
    };
  });
  return newData;
}
const TeacherTitleMsg = (state = {}, actions) => {
  switch (actions.type) {
    case UpDataState.GET_TEACHER_TITLE_MSG:
      let returnData = handleData(actions.data);
      return Object.assign({}, state, { returnData: returnData });
    // console.log(returnData)
    case UpDataState.GET_TITLE_UNIV_MSG:
      returnData = handleData(actions.data);
      return Object.assign({}, state, { returnData: returnData });
    default:
      return state;
  }
};

export default TeacherTitleMsg;
