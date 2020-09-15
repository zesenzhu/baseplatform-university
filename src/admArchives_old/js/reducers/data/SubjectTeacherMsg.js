import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  //let SubjectList = data.SubjectList;
  let len = data.length;
  let newSubject = [];
  let SubjectListChange = [];
  for (let i = 0; i < len; i++) {
    let Subject = { value: data[i].SubjectID, title: data[i].SubjectName };

    newSubject.push(Subject);
    if (data[i].SubjectID !== "all") SubjectListChange.push(Subject);
  }

  return { SubjectList: newSubject, SubjectListChange: SubjectListChange };
}
function handleUnivData(data) {
  //let SubjectList = data.SubjectList;
  // console.log(data);

  // let { CollegeList } = data;
  let College = [{ value: 0, title: "全部学院" }];
  let CollegeArray = {};
  let Group = [];
  data instanceof Array &&
  data.map(college => {
      let GroupArr = [{ value: 0, title: "全部教研室" }];
      college.GroupList instanceof Array &&
        college.GroupList.map(group => {
          GroupArr.push({
            value: group.GroupID,
            title: group.GroupName,
            IsUngroup:group.IsUngroup
          });
        });
      Group[college.CollegeID] = GroupArr;
      CollegeArray[college.CollegeID] = {
        value: college.CollegeID,
        title: college.CollegeName,
        childred: GroupArr
      }
      College.push({
        value: college.CollegeID,
        title: college.CollegeName,
        childred: GroupArr
      });
    });
    return {College,Group,CollegeArray}
  // let len = data.length;
  // let newSubject = [];
  // let SubjectListChange = [];
  // for(let i = 0; i < len; i++){
  //     let Subject = {value:data[i].SubjectID,title:data[i].SubjectName};

  //     newSubject.push(Subject)
  //     if(data[i].SubjectID!=='all')
  //     SubjectListChange.push(Subject)
  // }

  // return {SubjectList:newSubject,SubjectListChange:SubjectListChange}
}
const SubjectTeacherMsg = (
  state = {
    College: [{ value: 0, title: "全部学院" }],
    Group:{},
    CollegeArray:{},
    returnData : { grades: null }
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
    case UpDataState.GET_SUBJECT_TEACHER_MSG:
      returnData = handleData(actions.data);

      return Object.assign({}, state, { returnData });
    case UpDataState.GET_UNIV_COLLEGE_GROUP_MSG: 
      returnData = handleUnivData(actions.data);

      return Object.assign({}, state, { ...returnData });
    default:
      return state;
  }
};

export default SubjectTeacherMsg;
