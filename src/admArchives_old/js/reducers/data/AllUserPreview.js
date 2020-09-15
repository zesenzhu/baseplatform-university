import UpDataState from "../../actions/UpDataState";
import { Children } from "react";

const AllUserPreview = (
  state = {
    Student: "",
    Teacher: "",
    CollegeLeader: 0,
    SchoolLeader: 0,
    Total: "",
    NewGrades: {},
    NewSubjects: {},
    FirstBar: {},
    SecondBar: {},
    FirstNames :[],
  SecondNames : [],
  FirstArray:[],
    SecondArray:[],
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_SCHOOL_ALL_USER_PREVIEW:
      let SchoolData = handleSchoolData(actions.data);
      return Object.assign({}, state, { ...SchoolData });
    case UpDataState.GET_COLLEGE_ALL_USER_PREVIEW:
      let CollegeData = handleCollegeData(actions.data);
      return Object.assign({}, state, { ...CollegeData });
    default:
      return state;
  }
};
function handleCollegeData(data) {
  const { Majors, Groups,CollegeLeader, MajorStudent,GroupTeacher,...other } = data;
//   console.log(data)
  let FirstBar = {};
  let SecondBar = {};
  let FirstNames = [];
  let SecondNames = [];
  // let CollegeLeader = CollegeLeader;
  let SchoolLeader = data.SchoolLeader?data.SchoolLeader:0
  Majors.map((child, index) => {
    FirstBar[child.MajorName] = child;
    FirstNames.push(child.MajorName);
  });
  Groups.map((child, index) => {
    SecondBar[child.GroupName] = child;
    SecondNames.push(child.GroupName);
  });
  return {
    ...other,
    CollegeLeader,
    FirstArray:MajorStudent,
    SecondArray:GroupTeacher,
    FirstBar,
    SchoolLeader,
    FirstNames,
    SecondBar,
    SecondNames
  };
}
function handleSchoolData(data) {
  const { Colleges, Subjects, CollegeLeader, CollegeStudent,CollegeTeacher,...other } = data;
  let FirstBar = {};
  let SecondBar = {};
  let FirstNames = [];
  let SecondNames = [];
  // let CollegeLeader = CollegeLeader;
  let SchoolLeader = data.SchoolLeader?data.SchoolLeader:0
  Colleges.map((child, index) => {
    SecondBar[child.CollegeName] = FirstBar[child.CollegeName] = child;
    FirstNames.push(child.CollegeName);
    SecondNames.push(child.CollegeName);
  });
  
  return {
    ...other,
    CollegeLeader,
    FirstArray:CollegeStudent,
    SecondArray:CollegeTeacher,
    FirstBar,
    SchoolLeader,
    FirstNames,
    SecondBar,
    SecondNames
  };
}
export default AllUserPreview;
