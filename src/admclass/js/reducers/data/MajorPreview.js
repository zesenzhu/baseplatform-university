import UpDataState from "../../actions/UpDataState";
import UpUIState from "../../actions/UpUIState";

const MajorPreview = (
  state = {
    ClassContentShow: false,

    ClassLoading: false,

    CurrentPage: 1,

    SearchKey: "",

    Total: 0,

    ClassInfo: "",

    CancelBtnShow: "n",
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.CHANGE_STU_ACTIVE:
      return {
        ...state,
        CancelBtnShow: "n",
        SearchKey: "",
      };

    case UpUIState.CHANGE_CLASS_ACTIVE:
      return {
        ...state,
        CancelBtnShow: "n",
        SearchKey: "",
      };
    case UpUIState.CHANGE_GRADE_ACTIVE:
      return {
        ...state,
        CancelBtnShow: "n",
        SearchKey: "",
      };
    case UpUIState.CHANGE_COLLEGE_ACTIVE:
      return {
        ...state,
        CancelBtnShow:state.CancelBtnShow==='y'? "y":'n',
        SearchKey: "",
      };
    case UpUIState.CHANGE_MAJOR_ACTIVE:
      return {
        ...state,
        CancelBtnShow: "n",
        SearchKey: "",
      };

    case UpDataState.GET_COLLEGE_PREVIEW:
      return {
        ...state,

        IsMajor: false,

        ClassContentShow: false,

        ClassLoading: false,

        CurrentPage: 1,

        Total: 0,

        SearchKey: "",

        CancelBtnShow: "n",

        ...actions.data,
      };

    case UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE:
      return { ...state, SearchKey: actions.data };

    case UpDataState.ALL_GRADE_CLASS_LOADING_HIDE:
      return { ...state, ClassLoading: false };

    case UpDataState.ALL_GRADE_CLASS_LOADING_SHOW:
      return { ...state, ClassLoading: true };

    case UpDataState.ALL_GRADE_CLASS_CONTENT_SHOW:
      return { ...state, ClassContentShow: true };

    case UpDataState.ALL_GRADE_CLASS_CONTENT_HIDE:
      return { ...state, ClassContentShow: false, IsMajor: false };

    case UpDataState.ALL_MAJOR_CONTENT_HIDE:
      return { ...state, IsMajor: true, ClassContentShow: false };

    case UpDataState.COLLEGE_CLASS_LIST_UPDATE:
      return { ...state, ClassInfo: actions.data };

    case UpDataState.ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW:
      return { ...state, CancelBtnShow: "y" };

    case UpDataState.ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE:
      return { ...state, CancelBtnShow: "n" };

    default:
      return state;
  }
};

export default MajorPreview;
