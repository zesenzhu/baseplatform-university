import STSActions from '../../actions/Teacher/SubjectTeacherSubjectActions';

const SubjectTeacherSubjectSchedule = (state={

    schedule:[],

    ItemSubjectSelect:{value:0,title:"全部学科"},

    NowWeekNO:1,

    NowWeekDay:1,

    NowClassDate:'',

    pageIndex:1,

    loadingShow:true,

    TeacherCount:0,

    SubjectSelectd:"",

    SubjectDropList:[],

    SubjectDropShow:false,

    SubjectTitleName:"",

    SubjectTitleID:'',

}, actions) => {

    switch (actions.type) {

        case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {

                ...state,

                schedule:actions.data,

                ItemSubjectSelect:{value:0,title:"全部学科"},

                pageIndex:1,

                loadingShow:true

            };

        case STSActions.STS_SUBJECT_CHANGE:

          return {...state,ItemSubjectSelect:actions.data};

        case STSActions.TEACHER_STS_NOW_WEEK_NO_CHANGE:

            return {...state,NowWeekNO:actions.data};

        case STSActions.TEACHER_STS_NOW_WEEK_DAY_CHANGE:

            return {...state,NowWeekDay:actions.data};

        case STSActions.TEACHER_STS_NOW_CLASS_DATE_CHANGE:

            return {...state,NowClassDate:actions.data};

        case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

            return {...state,schedule:actions.data};

        case STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT:

            return {...state,TeacherCount:actions.data};

        case STSActions.STS_PAGE_ADD:

            return {...state,pageIndex:state.pageIndex+1};

        case STSActions.LOADING_HIDE:

            return {...state,loadingShow:false};

        case STSActions.LOADING_SHOW:

            return {...state,loadingShow:true};

        case STSActions.TEACHER_STS_SUBJECT_DROP_SHOW:

            return { ...state,SubjectDropShow:true };

        case STSActions.TEACHER_STS_SUBJECT_DROP_HIDE:

            return { ...state,SubjectDropShow:false };

        case STSActions.TEACHER_STS_SUBJECT_DROP_CHANGE:

            return { ...state,SubjectSelectd:actions.data };

        case STSActions.TEACHER_STS_SUBJECT_DROP_LIST_CHANGE:

            return { ...state,SubjectDropList:actions.data };

        case STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE:

            return { ...state,SubjectTitleName:actions.data.title,SubjectTitleID:actions.data.id };

        case STSActions.TEACHER_STS_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case STSActions.TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case STSActions.TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case STSActions.TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case STSActions.TEACHER_STS_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case STSActions.TEACHER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SHOW:

            return {

                ...state,

                AdjustClassRoom:{

                    ...state.AdjustClassRoom,

                    Show:true,

                    ModalLoading:true,

                    ClassRoomList:[],

                    ClassRoomTabActive:0,

                    CheckedValue:'',

                    SearchValue:'',

                    CancelBtnShow:'n',

                    SearchWrapperShow:false,

                    SearchList:[],

                    SearchLoading:false

                }

            };

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case STSActions.TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SHOW:

            return {

                ...state,

                ReplaceSchedule:{

                    ...state.ReplaceSchedule,

                    Show:true,

                    ModalLoading:true,

                    SearchWrapperShow:false,

                    SearchList:[],

                    ActiveTeacherID:'',

                    CancelBtnShow:'n',

                    SearchValue:'',

                    SearchLoadingShow:false

                }

            };

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case STSActions.TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};


        default:

            return state;

    }

};

export default SubjectTeacherSubjectSchedule