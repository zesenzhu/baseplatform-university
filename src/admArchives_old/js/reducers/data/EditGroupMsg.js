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
            title: group.GroupName
          });
        });
      Group[college.CollegeID] = GroupArr;
      CollegeArray[college.CollegeID] = {
        value: college.CollegeID,
        title: college.CollegeName,
        childred: GroupArr
      };
      College.push({
        value: college.CollegeID,
        title: college.CollegeName,
        childred: GroupArr
      });
    });
  return { College, Group, CollegeArray };
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
const EditGroupMsg = (
  state = {
    College: { value: 0, title: "请选择学院" },
    Group: {value: '', title: ""},
    GroupName: '',
    inputTips:''
  },
  actions
) => {
  let data = null;
  switch (actions.type) {
    case UpDataState.EDIT_GROUP_SELECT_CHANGE:
      return Object.assign({}, state, {...actions.data });
    default:
      return state;
  }
};

export default EditGroupMsg;
