import UpUIState from "../../actions/UpUIState";

const ComponentChange = (
  state = {
    stu: false,

    class: false,

    grade: false,
    college: false,
    major: false,

    stuInfo: { id: "", name: "" },

    gradeInfo: { id: "", name: "" },

    classInfo: {
      id: "",
      name: "",
      preName: "",
      preId: "",
      collegeID: "",
      collegeName: "",
      majorID: "",
      majorName: ""
    },

    collegeInfo: { id: "", name: "" },

    majorInfo: { id: "", name: "", collegeID: "", collegeName: "" }
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.CHANGE_STU_ACTIVE:
      return {
        ...state,
        stu: true,
        class: false,
        grade: false,
        college: false,
        major: false,
        gradeInfo: { id: "", name: "" },
        classInfo: {
          id: "",
          name: "",
          preName: "",
          preId: "",
          collegeID: "",
          collegeName: "",
          majorID: "",
          majorName: ""
        },
        collegeInfo: { id: "", name: "" },

    majorInfo: { id: "", name: "", collegeID: "", collegeName: "" },
        stuInfo: actions.info
      };

    case UpUIState.CHANGE_CLASS_ACTIVE:
      return {
        ...state,
        stu: false,
        class: true,
        grade: false,
        college: false,
        major: false,
        gradeInfo: { id: "", name: "" },
        classInfo: actions.info
      };

    case UpUIState.CHANGE_GRADE_ACTIVE:
      return {
        ...state,
        // stu: false,
        // class: false,
        // grade: true,
        // college: false,
        // major: false,
        gradeInfo: actions.info
      };
    case UpUIState.CHANGE_COLLEGE_ACTIVE:
      return {
        ...state,
        stu: false,
        class: false,
        grade: false,
        college: true,
        major: false,
        gradeInfo: { id: "", name: "" },
        collegeInfo: actions.info
      };
    case UpUIState.CHANGE_MAJOR_ACTIVE:
      return {
        ...state,
        stu: false,
        class: false,
        grade: false,
        college: false,
        major: true,
        gradeInfo: { id: "", name: "" },
        majorInfo: actions.info
      };
    default:
      return state;
  }
};

export default ComponentChange;
