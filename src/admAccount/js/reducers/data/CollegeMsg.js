import UpDataState from "../../actions/UpDataState";


function handleUnivData(data) {
  //let SubjectList = data.SubjectList;
  // console.log(data);
let CollegeSelect = {}
  // let { CollegeList } = data;
  let College = [{ value: 0, title: "全部学院" }];
  let Group = [];
  data instanceof Array &&
  data.map(college => {
      let GroupArr = [{ value: 0, title: "全部教研室" }];
      college.GroupList instanceof Array &&
        college.GroupList.map(group => {
          GroupArr.push({
            value: group.GroupID,
            title: group.GroupName
          });
        });
      Group[college.CollegeID] = GroupArr;
      College.push({
        value: college.CollegeID,
        title: college.CollegeName,
        childred: GroupArr
      });
    });
    return {College,Group}
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
const CollegeMsg = (
  state = {
    College: [{ value: 0, title: "全部学院" }],
    Group:[{ value: 0, title: "全部教研室" }],
    SchoolCollege:{value:7,title:'学校领导'},
    CollegeSelect:{value:0,tilte:'请选择学院'}
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
   
    case UpDataState.GET_COLLEGE_UNIV:
      returnData = handleUnivData(actions.data);

      return Object.assign({}, state, { ...returnData });
      case UpDataState.SET_DROP_LEADER_MSG:

      return Object.assign({}, state, { ...actions.data });
    default:
      return state;
  }
};

export default CollegeMsg;
