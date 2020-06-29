import UpUIState from '../../actions/UpUIState';
const AdjustClassModal = (state={show:false,
    gradeDropSelectd:{value:"none",title:"请选择年级"},
    classDropSelectd:{value:"none",title:"请选择班级"},
    classDisabled:true,
    gradeChecked:{value:"none",title:"请选择年级"},
    classChecked:{value:"none",title:"请选择班级"},
    classList:[],
    selectValue: {
        collegeSelectd: { value: "", title: "请选择学院" },
        majorSelectd: { value: "", title: "请选择专业" },
        gradeSelectd: { value: "", title: "请选择年级" },
        classSelectd: { value: "", title: "请选择班级" },
      },
      dropDownData:{
        firstDropDown:[{value: "", title: "请选择学院"}],
        secondDropDown:{},
        thirdDropDown:{},
        fourthDropDown:{},
    },
    errTips:"请选择目标班级",
    errTipsShow:false,
    inputTipsShow: {
        collegeTipsShow: false,
        majorTipsShow: false,
        gradeTipsShow: false,
        classTipsShow:false
      },
      selectTips:{
        collegeTips: '请选择学院',
        majorTips: '请选择专业',
        gradeTips: '请选择年级',
        classTips:'请选择班级'
      }
},actions) => {
    switch (actions.type) {
        case UpUIState.ADJUST_CLASS_MODAL_SHOW:
            return {...state,show:true,
                gradeDropSelectd:{value:"none",title:"请选择年级"},
                classDropSelectd:{value:"none",title:"请选择班级"},
                classDisabled:true,
                gradeChecked:{value:"none",title:"请选择年级"},
                classChecked:{value:"none",title:"请选择班级"},
                classList:[],
                errTips:"请选择目标班级",
                errTipsShow:false,
                inputTipsShow: {
                    collegeTipsShow: false,
                    majorTipsShow: false,
                    gradeTipsShow: false,
                    classTipsShow:false
                  },
                  selectValue: {
                    collegeSelectd: { value: "", title: "请选择学院" },
                    majorSelectd: { value: "", title: "请选择专业" },
                    gradeSelectd: { value: "", title: "请选择年级" },
                    classSelectd: { value: "", title: "请选择班级" },
                  },
                  dropDownData:{
                    firstDropDown:[{value: "", title: "请选择学院"}],
                    secondDropDown:{},
                    thirdDropDown:{},
                    fourthDropDown:{},
                },
            };
            case UpUIState.ADJUST_CLASS_SELECT_CHANGE:
      return {
        ...state,
        selectValue: { ...state.selectValue, ...actions.selectValue }
      };
        case UpUIState.ADJUST_CLASS_MODAL_HIDE:
            return {...state,show:false};
        case UpUIState.ADJUST_CLASS_GRADE_CHANGE:
            return {...state,gradeChecked:actions.checked,gradeDropSelectd:actions.checked};
        case UpUIState.ADJUST_CLASS_CLASS_CHANGE:
            return {...state,classChecked:actions.checked,classDropSelectd:actions.checked};
        case UpUIState.ADJUST_CLASS_CLASS_LIST_UPDATE:
            return {...state,classList:actions.list};
        case UpUIState.ADJUST_CLASS_CLASSLIST_ABLED:
            return {...state,classDisabled:false};
        case UpUIState.ADJUST_CLASS_CLASSLIST_DISABLED:
            return {...state,classDisabled:true};
        case UpUIState.ADJUST_CLASS_ERROR_SHOW:
            return {...state,errTipsShow:true,tips:actions.tips};
        case UpUIState.ADJUST_CLASS_ERROR_HIDE:
            return {...state,errTipsShow:false};
            case UpUIState.ADJUST_CLASS_GRADE_TIPS_SHOW:
                return { ...state, inputTipsShow: {...state.inputTipsShow,gradeTipsShow:true} };
              case UpUIState.ADJUST_CLASS_GRADE_TIPS_HIDE:
                return { ...state, inputTipsShow: {...state.inputTipsShow,gradeTipsShow:false} };
              case UpUIState.ADJUST_CLASS_COLLEGE_TIPS_SHOW:
                return { ...state, inputTipsShow: {...state.inputTipsShow,collegeTipsShow:true} };
              case UpUIState.ADJUST_CLASS_COLLEGE_TIPS_HIDE:
                return { ...state, inputTipsShow: {...state.inputTipsShow,collegeTipsShow:false} };
              case UpUIState.ADJUST_CLASS_MAJOR_TIPS_SHOW:
                return { ...state, inputTipsShow: {...state.inputTipsShow,majorTipsShow:true} };
              case UpUIState.ADJUST_CLASS_MAJOR_TIPS_HIDE:
                return { ...state, inputTipsShow: {...state.inputTipsShow,majorTipsShow:false} };
                case UpUIState.ADJUST_CLASS_CLASS_TIPS_SHOW:
                return { ...state, inputTipsShow: {...state.inputTipsShow,classTipsShow:true} };
              case UpUIState.ADJUST_CLASS_CLASS_TIPS_HIDE:
                return { ...state, inputTipsShow: {...state.inputTipsShow,classTipsShow:false} };
        default:
            return state;
    }
}
export default AdjustClassModal;