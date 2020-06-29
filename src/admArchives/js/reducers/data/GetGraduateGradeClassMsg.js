import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  let Grades = data.Grades;

  let Grade = [{ value: 0, title: "全部" }];
  let Class = { 0: [{ value: 0, title: "全部" }] };

  Grades instanceof Array &&
    Grades.map((child, index) => {
      Grade.push({
        value: child.GradeID,
        title: child.GradeName
      });
      let childClass = [{ value: 0, title: "全部班级" }];
      child.Classes instanceof Array &&
        child.Classes.map((child, index) => {
          childClass.push({
            value: child.ClassID,
            title: child.ClassName,
            GradeID: child.GradeID
          });
        });
      Class[child.GradeID] = childClass;
    });
  return { Grade: Grade, Class: Class };
}
function handleTreeUnivData(data) {
  if (!(data instanceof Array)) {
    return {};
  }
  let CollegeArr = [{ value: 0, title: "全部学院" }];
  let Classes = {};
  let College = {};
  let Majors = {};
  let Grades = {};
  data.map((child, index) => {
    let MajorsArr = [{ value: 0, title: "全部专业" }];

    child.Majors instanceof Array &&
      child.Majors.map(major => {
        let GradesArr = [{ value: 0, title: "全部年级" }];

        major.Grades instanceof Array &&
          major.Grades.map(grade => {
            let ClassesArr = [{ value: 0, title: "全部班级" }];

            grade.Classes instanceof Array &&
              grade.Classes.map(Class => {
                ClassesArr.push({
                  value: Class.ClassID,
                  title: Class.ClassName,
                  father: Class.GradeID
                });
              });
            Classes[grade.GradeID] = ClassesArr;
            GradesArr.push({
              value: grade.GradeID,
              title: grade.GradeName,
              childred: ClassesArr
            });
          });
        Grades[major.MajorID] = GradesArr;
        MajorsArr.push({
          value: major.MajorID,
          title: major.MajorName,
          childred: GradesArr
        });
      });
    Majors[child.CollegeID] = MajorsArr;
    CollegeArr.push({
      value: child.CollegeID,
      title: child.CollegeName,
      childred: MajorsArr
    });
  });
  return { College: CollegeArr, Majors, Grades, Classes };
}
const GetGraduateGradeClassMsg = (
  state = {
    Grade: [{ value: 0, title: "全部" }],
    Class: { 0: [{ value: 0, title: "全部" }] },
    College: [{ value: 0, title: "全部学院" }],
    returnData: {},
    TeacherClass: [],
    StudentDropMenu: {},
    Majors: {},
    Grades: {},
    Classes: {}
  },
  actions
) => {
  // let returnData = {grades:null};
  switch (actions.type) {
    case UpDataState.GET_GRADUATE_GRADE_CLASS_MSG:
      let returnData = handleData(actions.data);
      // console.log(returnData)
      return Object.assign({}, state, { ...returnData });
    case UpDataState.GET_TREE_OF_GRADUATE_UNIV:
      returnData = handleTreeUnivData(actions.data);
      // console.log(returnData)
      return Object.assign({}, state, { ...returnData });
    default:
      return state;
  }
};

export default GetGraduateGradeClassMsg;
