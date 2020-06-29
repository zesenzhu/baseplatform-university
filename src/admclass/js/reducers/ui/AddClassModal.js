import UpUIState from "../../actions/UpUIState";
import UpDataState from "../../actions/UpDataState";
import { func } from "prop-types";
const AddClassModal = (
  state = {
    show: false,

    inputDisabled: true,

    inputValue: "",

    inputTipsShow: {
      collegeTipsShow: false,
      majorTipsShow: false,
      gradeTipsShow: false,
      classNameTipsShow: false
    },

    inputTips: "",

    selectTips: {
      collegeTips: "请选择学院",
      majorTips: "请选择专业",
      gradeTips: "请选择年级"
    },
    selectTipsShow: false,

    selectValue: {
      collegeSelectd: { value: "", title: "请选择学院" },
      majorSelectd: { value: "", title: "请选择专业" },
      gradeSelectd: { value: "", title: "请选择年级" }
    },
    dropDownData: {
      firstDropDown: [{ value: "", title: "请选择学院" }],
      secondDropDown: {},
      thirdDropDown: {}
    },
    gradeList : [{ value: "", title: "暂无年级" }],
    classList : {},

  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.ADD_CLASS_MODAL_SHOW:
      return {
        ...state,
        show: true,
        inputDisabled: true,
        inputValue: "",
        inputTipsShow: {
          collegeTipsShow: false,
          majorTipsShow: false,
          gradeTipsShow: false,
          classNameTipsShow: false
        },
        inputTips: "",
        // selectTips: "请选择对应的年级！",
        selectTipsShow: false,
        selectValue: {
          collegeSelectd: { value: "", title: "请选择学院" },
          majorSelectd: { value: "", title: "请选择专业" },
          gradeSelectd: { value: "", title: "请选择年级" }
        },
    gradeList : [{ value: "", title: "暂无年级" }],
    classList : {},

      };
    case UpDataState.SET_ADD_CLASS_DROPDOWN_DATA:
      let data = handleTreeUnivData(actions.data);
      return { ...state, dropDownData: data };
    case UpDataState.SET_ADD_CLASS_GRADE:
      data = handleMajorGradeData(actions.data);
      return {
        ...state,
        ...data 
      };
    case UpUIState.ADD_CLASS_MODAL_HIDE:
      return { ...state, show: false };
    case UpUIState.ADD_CLASS_INPUT_DISABLED:
      return { ...state, inputDisabled: true };
    case UpUIState.ADD_CLASS_INPUT_ABLED:
      return { ...state, inputDisabled: false };
    case UpUIState.ADD_CLASS_INPUT_CHANGE:
      return { ...state, inputValue: actions.value };
    case UpUIState.ADD_CLASS_SELECT_CHANGE:
      return {
        ...state,
        selectValue: { ...state.selectValue, ...actions.selectValue }
      };
    case UpUIState.ADD_CLASS_SELECT_TIPS_SHOW:
      return { ...state, selectTipsShow: true };
    case UpUIState.ADD_CLASS_SELECT_TIPS_HIDE:
      return { ...state, selectTipsShow: false };
    case UpUIState.ADD_CLASS_SELECT_TIPS:
      return { ...state, selectTips: { ...state.selectTips, ...actions.tips } };
    case UpUIState.ADD_CLASS_GRADE_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, gradeTipsShow: true }
      };
    case UpUIState.ADD_CLASS_GRADE_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, gradeTipsShow: false }
      };
    case UpUIState.ADD_CLASS_COLLEGE_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, collegeTipsShow: true }
      };
    case UpUIState.ADD_CLASS_COLLEGE_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, collegeTipsShow: false }
      };
    case UpUIState.ADD_CLASS_MAJOR_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, majorTipsShow: true }
      };
    case UpUIState.ADD_CLASS_MAJOR_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, majorTipsShow: false }
      };
    case UpUIState.ADD_CLASS_INPUT_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, classNameTipsShow: true }
      };
    case UpUIState.ADD_CLASS_INPUT_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, classNameTipsShow: false }
      };
    case UpUIState.ADD_CLASS_INPUT_TIPS:
      return { ...state, inputTips: actions.tips };
    case UpUIState.CHANGE_GRADE_ACTIVE:
      return {
        ...state,
        selectValue: {
          ...state.selectValue,
          gradeSelectd: { value: actions.info.id, title: actions.info.name }
        }
      };
    case UpUIState.CHANGE_COLLEGE_ACTIVE:
      return {
        ...state,
        selectValue: {
          ...state.selectValue,
          collegeSelectd: { value: actions.info.id, title: actions.info.name }
        }
      };
    case UpUIState.CHANGE_MAJOR_ACTIVE:
      return {
        ...state,
        selectValue: {
          ...state.selectValue,
          majorSelectd: { value: actions.info.id, title: actions.info.name }
        }
      };
    default:
      return state;
  }
};
// 获取各专业的年级
function handleMajorGradeData(data) {
  if (!(data.GradeList instanceof Array)&&!(data.List instanceof Array)) {
    return {};
  }
  let classList = {}

  let gradeList = data.GradeList.map((child, index) => {
    classList[child.GradeID] = []
    data.List.map((child2, index) => {
      if(child2.GradeID===child.GradeID){
        classList[child.GradeID].push({
          value: child2.ClassID,
          title: child2.ClassName
        })
      }else{
        return 
      }
    });
    return {
      value: child.GradeID,
      title: child.GradeName
    };
  });
  
  return {gradeList,classList};
}
// 获取学生档案-获取学院、专业、年级、班级
function handleTreeUnivData(data) {
  if (!(data instanceof Array)) {
    return {};
  }
  // console.log(data)
  let CollegeArr = [];
  let Classes = {};
  let College = {};
  let Majors = {};
  let Grades = {};
  data.map((child, index) => {
    let MajorsArr = [];

    child.Majors instanceof Array &&
      child.Majors.map(major => {
        let GradesArr = [];

        major.Grades instanceof Array &&
          major.Grades.map(grade => {
            let ClassesArr = [];

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
  return {
    firstDropDown: CollegeArr,
    secondDropDown: Majors,
    thirdDropDown: Grades,
    Classes
  };
}
export default AddClassModal;
