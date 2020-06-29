import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  let Grades = data.Grades;
  let len = Grades.length;

  let GradeArr = [{ value: 0, title: "全部年级" }];
  let NewGrade = [];
  let AllClasses = {};
  for (let i = 0; i < len; i++) {
    let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
    let ClassArr = [];
    for (let j = 0; j < Grades[i].Classes.length; j++) {
      let Class = {
        value: Grades[i].Classes[j].ClassID,
        title: Grades[i].Classes[j].ClassName
      };
      ClassArr.push(Class);
    }
    AllClasses[Grades[i].GradeID] = ClassArr;

    GradeArr.push(Grade);
    NewGrade.push(Grade);
  }

  return { NewGrade: NewGrade, grades: GradeArr, AllClasses: AllClasses };
}

// 班主任
function handleTeacherData(data) {
  let Class = [];
  data instanceof Array &&
    data.map((child, index) => {
      Class.push({
        value: child.ClassID,
        title: child.ClassName
      });
    });
  return Class;
}
// 获取学生档案-获取学院、专业、年级、班级
function handleTreeUnivData(data) {
  if (!(data instanceof Array)) {
    return {};
  }
  let CollegeArr = [{ value: 0, title: "全部学院" }];
  let Classes = {};
  let College = {};
  let Majors = {};
  let Grades = {};
  let CollegeArray = {}
  data.map((child, index) => {
    let MajorsArr = [{ value: 0, title: "全部专业" }];

    child.Majors instanceof Array &&
      child.Majors.map(major => {
        let GradesArr = [{ value: 0, title: "全部年级" }];
        Classes[major.MajorID] = {}
        major.Grades instanceof Array &&
          major.Grades.map(grade => {
            let ClassesArr = [{ value: 0, title: "全部班级" }];

            grade.Classes instanceof Array &&
              grade.Classes.map(Class => {
                // console.log(Class)
                ClassesArr.push({
                  value: Class.ClassID,
                  title: Class.ClassName,
                  father: Class.GradeID
                });
              });
            // console.log(grade.Classes,ClassesArr)

            Classes[major.MajorID][grade.GradeID] = ClassesArr;
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
    CollegeArray[child.CollegeID] = {
      value: child.CollegeID,
      title: child.CollegeName,
      childred: MajorsArr
    }
    CollegeArr.push({
      value: child.CollegeID,
      title: child.CollegeName,
      childred: MajorsArr
    });
  });
  return { College: CollegeArr, Majors, Grades, Classes,CollegeArray };
}
const GradeClassMsg = (
  state = {
    College: [{ value: 0, title: "全部学院" }],
    returnData: {},
    TeacherClass: [],
    StudentDropMenu: {},
    Majors: {},
    Grades: {},
    Classes: {},CollegeArray:{}
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
    case UpDataState.GET_GRADE_CLASS_MSG:
      returnData = handleData(actions.data);
      // console.log(returnData)
      return Object.assign({}, state, { returnData });
    case UpDataState.GET_TREE_UNIV_MSG:
      let data = handleTreeUnivData(actions.data);
      return Object.assign({}, state, { ...data });
    case UpDataState.GET_TEACHER_CLASS_DATA:
      let TeacherClass = handleTeacherData(actions.data);
      return Object.assign({}, state, { TeacherClass });
    default:
      return state;
  }
};

export default GradeClassMsg;
