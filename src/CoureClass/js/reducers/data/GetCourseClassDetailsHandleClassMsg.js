import UpDataState from "../../actions/UpDataState";
import history from "../../containers/history";

const GetCourseClassDetailsHandleClassMsg = (
  state = {
    selectData: { CourseClass: { CourseClassName: "" }, Subject: {}, Grade: {},Teacher:[],Student:[] }
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG:
      let data = handleData(actions.data);
      return Object.assign({}, state, { ...data });
    case UpDataState.SET_COURSE_CLASS_DATA:
      // console.log(actions.data)
      let courseClassData = Object.assign({}, state.selectData, {
        ...actions.data
      });
      return Object.assign({}, state, { selectData: courseClassData });
    case UpDataState.SET_COURSE_CLASS_NAME:
      let courseClass = Object.assign({}, state.selectData, {
        CourseClass: actions.data
      });
      return Object.assign({}, state, { selectData: courseClass });

    case UpDataState.SET_SUBJECT_TEACHER_TRANSFER_MSG:
      let transferTeacher = Object.assign({}, state.transfer, {
        Teacher: actions.data
      });
      return Object.assign({}, state, { transfer: transferTeacher });

    case UpDataState.SET_CLASS_STUDENT_TRANSFER_MSG:
      let transferStudent = Object.assign({}, state.transfer, {
        Student: actions.data
      });
      return Object.assign({}, state, { transfer: transferStudent });
    case UpDataState.SET_CLASS_STUDENT_TRANSFER_TRANSFER_MSG:
      let transfertransferStudent = Object.assign({}, state.transfer, {
        TransferStudent: actions.data
      });
      return Object.assign({}, state, { transfer: transfertransferStudent });

    case UpDataState.SET_SUBJECT_TEACHER_MSG:
      let selectData = Object.assign({}, state.selectData, {
        Teacher: actions.data
      });
      return Object.assign({}, state, { selectData: selectData });

    case UpDataState.SET_SUBJECT_TEACHER_DEFAULT_MSG:
      return Object.assign({}, state, {
        TeacherID: actions.data.value,
        TeacherName: actions.data.title
      });

    case UpDataState.SET_COURSE_CLASS_STUDENT_MSG:
      let selectDataStudent = Object.assign({}, state.selectData, {
        Student: actions.data
      });
      let transferStudent2 = Object.assign({}, state.transfer, {
        Student: actions.data
      });
      return Object.assign({}, state, {
        selectData: selectDataStudent,
        transfer: transferStudent2
      });

    case UpDataState.SET_COURSE_CLASS_STUDENT_DEFAULT_MSG:
      return Object.assign({}, state, { TableSource: actions.data });
    default:
      return state;
  }
};

function handleData(data) {
  const { Item, ...otherData } = data;
  let Student = [];

  let TableSource = Item.map((child, index) => {
    Student.push({
      StudentName: child.StudentName,
      StudentID: child.StudentID
    });
    return {
      StudentName: child.StudentName,
      StudentID: child.StudentID
    };
  });

  return {
    ...data,
    TableSource: TableSource,
    transfer: { Teacher: {}, Student: Student },
    selectData: {
      CourseClass: {
        CourseClassName: data.CourseClassName,
        CourseClassID: data.CourseClassID
      },
      Teacher: { value: data.TeacherID, title: data.TeacherName },
      Student: Student,
      Grade:{value:data.GradeID,title:data.GradeName},
      Subject:{value:data.SubjectID,title:data.SubjectName}
    }
  };
}
export default GetCourseClassDetailsHandleClassMsg;
