import UpDataState from "./UpDataState";

const CLASS_PAGINATION_TOTAL_UPDATE = "CLASS_PAGINATION_TOTAL_UPDATE";

const CLASS_PAGINATION_CURRENT_UPDATE = "CLASS_PAGINATION_CURRENT_UPDATE";

const GRADE_PAGINATION_TOTAL_UPDATE = "GRADE_PAGINATION_TOTAL_UPDATE";

const GRADE_PAGINATION_CURRENT_UPDATE = "GRADE_PAGINATION_CURRENT_UPDATE";

const STUDENT_PAGINATION_CURRENT_UPDATE = "STUDENT_PAGINATION_CURRENT_UPDATE";

const STUDENT_PAGINATION_TOTAL_UPDATE = "STUDENT_PAGINATION_TOTAL_UPDATE";

//年级班级列表变化
const GradeClassPageChange = (GradeID, PageIndex) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;

    let { SearchKey } = getState().DataState.TheGradePreview;

    dispatch({ type: UpDataState.THE_GRADE_CLASS_LOADING_SHOW });

    UpDataState.getClassList({
      SchoolID,
      GradeID,
      PageIndex,
      PageSize: 12,
      dispatch,
      Keyword: SearchKey,
    }).then((data) => {
      if (data) {
        dispatch({ type: UpDataState.THE_GRADE_CLASS_LIST_UPDATE, data: data });

        dispatch({
          type: CLASS_PAGINATION_CURRENT_UPDATE,
          data: PageIndex + 1,
        });

        dispatch({ type: CLASS_PAGINATION_TOTAL_UPDATE, data: data.Total });

        dispatch({ type: UpDataState.THE_GRADE_CLASS_LOADING_HIDE });
      }
    });
  };
};

//学校班级列表变化
const SchoolClassPageChange = (PageIndex) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;

    let { SearchKey } = getState().DataState.AllGradePreview;

    dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_SHOW });
    console.log(PageIndex)
    UpDataState.getClassList({
      SchoolID,
      PageIndex,
      PageSize: 12,
      dispatch,
      Keyword: SearchKey,
    }).then((data) => {
      if (data) {
        dispatch({ type: UpDataState.ALL_GRADE_CLASS_LIST_UPDATE, data: data });

        dispatch({
          type: GRADE_PAGINATION_CURRENT_UPDATE,
          data: PageIndex + 1,
        });

        dispatch({ type: GRADE_PAGINATION_TOTAL_UPDATE, data: data.Total });

        dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_HIDE });
      }
    });
  };
};
//学校班级列表变化
const CollegeClassPageChange = (PageIndex) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;

    let { SearchKey, CollegeID } = getState().DataState.MajorPreview;

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_SHOW});

    // UpDataState.getClassList({SchoolID,PageIndex,PageSize:12,dispatch,Keyword:SearchKey}).then(data=>{

    //     if (data){

    //         dispatch({type:UpDataState.ALL_GRADE_CLASS_LIST_UPDATE,data:data});

    //         dispatch({type:GRADE_PAGINATION_CURRENT_UPDATE,data:PageIndex+1});

    //         dispatch({type:GRADE_PAGINATION_TOTAL_UPDATE,data:data.Total});

    //         dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_HIDE});

    //     }

    // });

    // let { SchoolID } = getState().DataState.LoginUser;

    dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_SHOW });

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW});

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_CONTENT_SHOW});

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,data:SearchKey});

    UpDataState.getClassList({
      SchoolID,
      CollegeID: CollegeID,
      PageIndex: PageIndex,
      PageSize: 12,
      dispatch,
      Keyword: SearchKey,
    }).then((data) => {
      if (data) {
        dispatch({ type: UpDataState.COLLEGE_CLASS_LIST_UPDATE, data: data });

        dispatch({
          type: GRADE_PAGINATION_CURRENT_UPDATE,
          data: PageIndex + 1,
        });

        dispatch({ type: GRADE_PAGINATION_TOTAL_UPDATE, data: data.Total });
      }

      dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_HIDE });
    });
  };
};
//学校班级列表变化
const MajorClassPageChange = (PageIndex, isSearch = false) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;

    let { SearchKey, MajorID,GradeID } = getState().DataState.MajorClassPreview;

    dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_SHOW });

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW});

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_CONTENT_SHOW});

    // dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,data:SearchKey});
    // console.log(PageIndex);
    console.log(PageIndex)
    UpDataState.getClassList({
      SchoolID,
      MajorID: MajorID,
      PageIndex: PageIndex,
      PageSize: 12,
      GradeID,
      dispatch,
      Keyword: SearchKey,
    }).then((data) => {
      if (data) {
        if (isSearch) {
          dispatch({ type: UpDataState.MAJOR_CLASS_LIST_UPDATE, data: data });
        } else {
          dispatch({ type: UpDataState.GET_THE_MAJOR_PREVIEW, data: data });
        }

        dispatch({
          type: GRADE_PAGINATION_CURRENT_UPDATE,
          data: PageIndex + 1,
        });

        dispatch({ type: GRADE_PAGINATION_TOTAL_UPDATE, data: data.Total });
      }

      dispatch({ type: UpDataState.ALL_GRADE_CLASS_LOADING_HIDE });
    });
  };
};
const StudentPageChange = (PageIndex, ClassID) => {
  return (dispatch, getState) => {
    let { SearchKey } = getState().DataState.TheStudentList;

    dispatch({ type: UpDataState.STUDENT_WRAPPER_LOADING_SHOW });

    UpDataState.getStudents({
      ClassID,
      PageIndex,
      PageSize: 12,
      dispatch,
      Keyword: SearchKey,
    }).then((data) => {
      if (data) {
        dispatch({ type: UpDataState.GET_THE_CLASS_STUDENTS, data: data });

        dispatch({
          type: STUDENT_PAGINATION_CURRENT_UPDATE,
          data: PageIndex + 1,
        });

        dispatch({ type: STUDENT_PAGINATION_TOTAL_UPDATE, data: data.Total });

        dispatch({ type: UpDataState.STUDENT_WRAPPER_LOADING_HIDE });

        if (data.List.length > 0) {
          let list = data.List.map((item) => {
            return JSON.stringify({ id: item.UserID, name: item.UserName });
          });

          dispatch({
            type: UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,
            data: list,
          });
        } else {
          dispatch({ type: UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS, data: [] });
        }

        dispatch({ type: UpDataState.STUDENTS_CHECK_LIST_CHANGE, list: [] });

        dispatch({ type: UpDataState.STUDENTS_CHECKED_NONE });
      }
    });
  };
};

export default {
  CLASS_PAGINATION_TOTAL_UPDATE,

  CLASS_PAGINATION_CURRENT_UPDATE,

  GRADE_PAGINATION_TOTAL_UPDATE,

  GRADE_PAGINATION_CURRENT_UPDATE,

  STUDENT_PAGINATION_CURRENT_UPDATE,

  STUDENT_PAGINATION_TOTAL_UPDATE,

  GradeClassPageChange,

  SchoolClassPageChange,

  StudentPageChange,

  CollegeClassPageChange,

  MajorClassPageChange,
};
