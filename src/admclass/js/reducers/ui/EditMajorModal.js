import UpUIState from "../../actions/UpUIState";
import UpDataState from "../../actions/UpDataState";
const EditMajorModal = (
  state = {
    show: false,

    inputDisabled: true,
    AddShow: false,
    EditShow: false,
    inputValue: "",
    handleMajorMsg: {
      college: { value: "", title: "请选择学院" },
      major: { value: "", title: "" }
    },
    handleMajorTipsShow:{
      majorNameTipsShow:false
    },
    inputTipsShow: {
      collegeTipsShow: false,
      majorTipsShow: false,
      gradeTipsShow: false,
      classNameTipsShow: false
    },
    editMajor: {},
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
    majorList: []
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.EDIT_MAJOR_MODAL_SHOW:
      return {
        ...state,
        show: true,
        handleMajorMsg: {
          college: { value: "", title: "请选择学院" },
          major: { value: "", title: "" }
        },
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
        }
      };
    case UpDataState.SET_EDIT_MAJOR_DROPDOWN_DATA:
      let data = handleTreeUnivData(actions.data);
      return { ...state, dropDownData: data };
    case UpUIState.EDIT_MAJOR_MODAL_HIDE:
      return { ...state, show: false };
    case UpUIState.ADD_MAJOR_MODAL_HIDE:
      return { ...state, AddShow: false };
    case UpUIState.ADD_MAJOR_MODAL_SHOW:
      return { ...state, AddShow: true , handleMajorMsg: {
        college: { value: "", title: "请选择学院" },
        major: { value: "", title: "" }
      },
      handleMajorTipsShow:{
        majorNameTipsShow:false
      },};
    case UpUIState.EDIT_MAJOR_MODAL_MODAL_HIDE:
      return { ...state, EditShow: false };
    case UpUIState.EDIT_MAJOR_MODAL_MODAL_SHOW:
      return { ...state, EditShow: true,
        handleMajorMsg: {
          college: { value: "", title: "请选择学院" },
          major: { value: "", title: "" }
        },
        handleMajorTipsShow:{
          majorNameTipsShow:false
        },
      };
    case UpUIState.EDIT_MAJOR_MODAL_MODAL_DATA:
      return { ...state, handleMajorMsg:{ ...state.handleMajorMsg,...actions.data }};
    case UpUIState.EDIT_MAJOR_INPUT_DISABLED:
      return { ...state, inputDisabled: true };
      case UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW:
      return { ...state, handleMajorTipsShow: {majorNameTipsShow:true} };
      case UpUIState.EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE:
      return { ...state, handleMajorTipsShow: {majorNameTipsShow:false} };
    case UpUIState.EDIT_MAJOR_INPUT_ABLED:
      return { ...state, inputDisabled: false };
    case UpUIState.EDIT_MAJOR_INPUT_CHANGE:
      return { ...state, inputValue: actions.value };
    case UpUIState.EDIT_MAJOR_SELECT_CHANGE:
      return {
        ...state,
        selectValue: { ...state.selectValue, ...actions.selectValue }
      };
    case UpUIState.EDIT_MAJOR_SELECT_TIPS_SHOW:
      return { ...state, selectTipsShow: true };
    case UpUIState.EDIT_MAJOR_SELECT_TIPS_HIDE:
      return { ...state, selectTipsShow: false };
    case UpUIState.EDIT_MAJOR_SELECT_TIPS:
      return { ...state, selectTips: { ...state.selectTips, ...actions.tips } };
    case UpUIState.EDIT_MAJOR_GRADE_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, gradeTipsShow: true }
      };
    case UpUIState.EDIT_MAJOR_GRADE_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, gradeTipsShow: false }
      };
    case UpUIState.EDIT_MAJOR_COLLEGE_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, collegeTipsShow: true }
      };
    case UpUIState.EDIT_MAJOR_COLLEGE_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, collegeTipsShow: false }
      };
    case UpUIState.EDIT_MAJOR_MAJOR_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, majorTipsShow: true }
      };
    case UpUIState.EDIT_MAJOR_MAJOR_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, majorTipsShow: false }
      };
    case UpUIState.EDIT_MAJOR_INPUT_TIPS_SHOW:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, classNameTipsShow: true }
      };
    case UpUIState.EDIT_MAJOR_INPUT_TIPS_HIDE:
      return {
        ...state,
        inputTipsShow: { ...state.inputTipsShow, classNameTipsShow: false }
      };
    case UpUIState.EDIT_MAJOR_INPUT_TIPS:
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
export default EditMajorModal;
