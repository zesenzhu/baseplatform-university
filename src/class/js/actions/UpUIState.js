//操作名称

//app层级的loading
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_SHOW = 'APP_LOADING_SHOW';
//app层级的弹出层
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
//班级总览的loading
const GRADE_LOADING_SHOW = 'GRADE_LOADING_SHOW';
const GRADE_LOADING_HIDE = 'GRADE_LOADING_HIDE';
//某一年级的loaing
const CLASS_LOADING_SHOW = 'CLASS_LOADING_SHOW';
const CLASS_LOADING_HIDE = 'CLASS_LOADING_HIDE';
//某一具体班级的loading
const STUDENT_LOADING_HIDE = 'STUDENT_LOADING_HIDE';
const STUDENT_LOADING_SHOW = 'STUDENT_LOADING_SHOW';
//弹出一个添加班级的弹出层
const  ADD_CLASS_MODAL_SHOW = 'ADD_CLASS_MODAL_SHOW';
const  ADD_CLASS_MODAL_HIDE = 'ADD_CLASS_MODAL_HIDE';
//添加班级弹出层select改变
const ADD_CLASS_SELECT_CHANGE = 'ADD_CLASS_SELECT_CHANGE';



//将添加班级弹出层的input置为disabled或者可输入
const ADD_CLASS_INPUT_DISABLED = 'ADD_CLASS_INPUT_DISABLED';
const ADD_CLASS_INPUT_ABLED = 'ADD_CLASS_INPUT_ABLED';

//班级弹出层input 改变
const ADD_CLASS_INPUT_CHANGE = 'ADD_CLASS_INPUT_CHANGE';
//添加班级select的提示
const ADD_CLASS_SELECT_TIPS_SHOW = 'ADD_CLASS_SELECT_TIPS_SHOW';
const ADD_CLASS_SELECT_TIPS_HIDE = 'ADD_CLASS_SELECT_TIPS_HIDE';
const ADD_CLASS_SELECT_TIPS = 'ADD_CLASS_SELECT_TIPS';
//添加班级input的提示
const ADD_CLASS_INPUT_TIPS_SHOW = 'ADD_CLASS_INPUT_TIPS_SHOW';
const ADD_CLASS_INPUT_TIPS_HIDE = 'ADD_CLASS_INPUT_TIPS_HIDE';
const ADD_CLASS_INPUT_TIPS = 'ADD_CLASS_INPUT_TIPS';
//调班弹窗操作
const ADJUST_CLASS_MODAL_SHOW = 'ADJUST_CLASS_MODAL_SHOW';
const ADJUST_CLASS_MODAL_HIDE = 'ADJUST_CLASS_MODAL_HIDE';
//调班弹窗选择年级、班级以及班级列表更新
const ADJUST_CLASS_GRADE_CHANGE = 'ADJUST_CLASS_GRADE_CHANGE';
const ADJUST_CLASS_CLASS_CHANGE = 'ADJUST_CLASS_CLASS_CHANGE';
const ADJUST_CLASS_CLASS_LIST_UPDATE = 'ADJUST_CLASS_CLASS_LIST_UPDATE';
const ADJUST_CLASS_CLASSLIST_DISABLED = 'ADJUST_CLASS_CLASSLIST_DISABLED';
const ADJUST_CLASS_CLASSLIST_ABLED = 'ADJUST_CLASS_CLASSLIST_ABLED';
//tip操作
const ADJUST_CLASS_ERROR_HIDE = 'ADJUST_CLASS_ERROR_HIDE';
const ADJUST_CLASS_ERROR_SHOW = 'ADJUST_CLASS_ERROR_SHOW';

//添加教师弹窗
const ADD_TEACHER_MODAL_SHOW = 'ADD_TEACHER_MODAL_SHOW';
const ADD_TEACHER_MODAL_HIDE = 'ADD_TEACHER_MODAL_HIDE';
const ADD_TEACHER_LOADING_HIDE = "ADD_TEACHER_LOADING_HIDE";
const ADD_TEACHER_LOADING_SHOW = 'ADD_TEACHER_LOADING_SHOW';
const ADD_TEACHER_LIST_LOADING_HIDE = 'ADD_TEACHER_LIST_LOADING_HIDE';
const ADD_TEACHER_LIST_LOADING_SHOW = 'ADD_TEACHER_LIST_LOADING_SHOW';
const ADD_TEACHER_SUBJECTS_SELECT_DISABLED = 'ADD_TEACHER_SUBJECTS_SELECT_DISABLED';
const ADD_TEACHER_SUBJECTS_SELECT_ABLED = 'ADD_TEACHER_SUBJECTS_SELECT_ABLED';
const ADD_TEACHER_SUBJECTS_SELECT_CHANGE = 'ADD_TEACHER_SUBJECTS_SELECT_CHANGE';
const ADD_TEACHER_INPUT_CHANGE = 'ADD_TEACHER_INPUT_CHANGE';
const ADD_TEACHER_EMPTY_HIDE = 'ADD_TEACHER_EMPTY_HIDE';
const ADD_TEACHER_EMPTY_SHOW = 'ADD_TEACHER_EMPTY_SHOW';
const ADD_TEACHER_CLOSE_SHOW = 'ADD_TEACHER_CLOSE_SHOW';
const ADD_TEACHER_CLOSE_HIDE = 'ADD_TEACHER_CLOSE_HIDE';
//操作函数
//切换组件变化
const CHANGE_STU_ACTIVE = 'CHANGE_STU_ACTIVE';
const CHANGE_GRADE_ACTIVE = 'CHANGE_GRADE_ACTIVE';
const CHANGE_CLASS_ACTIVE = 'CHANGE_CLASS_ACTIVE';
const CHANGE_MAJOR_ACTIVE = 'CHANGE_MAJOR_ACTIVE';
const CHANGE_COLLEGE_ACTIVE = 'CHANGE_COLLEGE_ACTIVE';

//重命名班级名称的弹窗

const RESET_CLASS_NAME_SHOW = 'RESET_CLASS_NAME_SHOW';

const RESET_CLASS_NAME_HIDE = 'RESET_CLASS_NAME_HIDE';

const RESET_CLASS_NAME_INPUT_CHANG = 'RESET_CLASS_NAME_INPUT_CHANG';

const RESET_CLASS_NAME_TIPS_SHOW = 'RESET_CLASS_NAME_TIPS_SHOW';

const RESET_CLASS_NAME_TIPS_HIDE = 'RESET_CLASS_NAME_TIPS_HIDE';

const ADD_CLASS_COLLEGE_TIPS_SHOW = 'ADD_CLASS_COLLEGE_TIPS_SHOW';

const ADD_CLASS_COLLEGE_TIPS_HIDE = 'ADD_CLASS_COLLEGE_TIPS_HIDE';

const ADD_CLASS_MAJOR_TIPS_SHOW = 'ADD_CLASS_MAJOR_TIPS_SHOW';

const ADD_CLASS_MAJOR_TIPS_HIDE = 'ADD_CLASS_MAJOR_TIPS_HIDE';

const ADD_CLASS_GRADE_TIPS_SHOW = 'ADD_CLASS_GRADE_TIPS_SHOW';

const ADD_CLASS_GRADE_TIPS_HIDE = 'ADD_CLASS_GRADE_TIPS_HIDE';
const ADJUST_CLASS_GRADE_TIPS_SHOW = 'ADJUST_CLASS_GRADE_TIPS_SHOW';

const ADJUST_CLASS_GRADE_TIPS_HIDE = 'ADJUST_CLASS_GRADE_TIPS_HIDE';

const ADJUST_CLASS_COLLEGE_TIPS_HIDE = 'ADJUST_CLASS_COLLEGE_TIPS_HIDE';

const ADJUST_CLASS_COLLEGE_TIPS_SHOW = 'ADJUST_CLASS_COLLEGE_TIPS_SHOW';

const ADJUST_CLASS_MAJOR_TIPS_HIDE = 'ADJUST_CLASS_MAJOR_TIPS_HIDE';

const ADJUST_CLASS_MAJOR_TIPS_SHOW = 'ADJUST_CLASS_MAJOR_TIPS_SHOW';

const ADJUST_CLASS_CLASS_TIPS_SHOW = 'ADJUST_CLASS_CLASS_TIPS_SHOW';

const ADJUST_CLASS_CLASS_TIPS_HIDE = 'ADJUST_CLASS_CLASS_TIPS_HIDE';

const ADJUST_CLASS_SELECT_CHANGE = 'ADJUST_CLASS_SELECT_CHANGE';

const EDIT_MAJOR_MODAL_SHOW = 'EDIT_MAJOR_MODAL_SHOW';
const SET_EDIT_MAJOR_DROPDOWN_DATA = 'SET_EDIT_MAJOR_DROPDOWN_DATA';
const EDIT_MAJOR_MODAL_HIDE = 'EDIT_MAJOR_MODAL_HIDE';
const EDIT_MAJOR_INPUT_DISABLED = 'EDIT_MAJOR_INPUT_DISABLED';
const EDIT_MAJOR_INPUT_ABLED = 'EDIT_MAJOR_INPUT_ABLED';
const EDIT_MAJOR_INPUT_CHANGE = 'EDIT_MAJOR_INPUT_CHANGE';
const EDIT_MAJOR_SELECT_CHANGE = 'EDIT_MAJOR_SELECT_CHANGE';
const ADD_MAJOR_MODAL_HIDE = 'ADD_MAJOR_MODAL_HIDE';
const ADD_MAJOR_MODAL_SHOW = 'ADD_MAJOR_MODAL_SHOW';
const EDIT_MAJOR_MODAL_MODAL_HIDE = 'EDIT_MAJOR_MODAL_MODAL_HIDE';
const EDIT_MAJOR_MODAL_MODAL_SHOW = 'EDIT_MAJOR_MODAL_MODAL_SHOW';
const EDIT_MAJOR_MODAL_MODAL_DATA = 'EDIT_MAJOR_MODAL_MODAL_DATA';
const EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE = 'EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE';
const EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW = 'EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW';
const EDIT_MAJOR_INPUT_TIPS = 'EDIT_MAJOR_INPUT_TIPS';

export default {
    EDIT_MAJOR_INPUT_TIPS,
    EDIT_MAJOR_MODAL_MODAL_TIPS_SHOW,
    EDIT_MAJOR_MODAL_MODAL_TIPS_HIDE,
    EDIT_MAJOR_MODAL_MODAL_DATA,
    ADD_MAJOR_MODAL_HIDE,
    ADD_MAJOR_MODAL_SHOW,
    EDIT_MAJOR_MODAL_MODAL_HIDE,
    EDIT_MAJOR_MODAL_MODAL_SHOW,
    EDIT_MAJOR_SELECT_CHANGE,
    EDIT_MAJOR_INPUT_ABLED,
    EDIT_MAJOR_INPUT_CHANGE,
    EDIT_MAJOR_INPUT_DISABLED,
    EDIT_MAJOR_MODAL_HIDE,
    SET_EDIT_MAJOR_DROPDOWN_DATA,
    EDIT_MAJOR_MODAL_SHOW,
    ADJUST_CLASS_GRADE_TIPS_SHOW,
    ADJUST_CLASS_GRADE_TIPS_HIDE,
    ADJUST_CLASS_COLLEGE_TIPS_HIDE,
    ADJUST_CLASS_COLLEGE_TIPS_SHOW,
    ADJUST_CLASS_MAJOR_TIPS_HIDE,
    ADJUST_CLASS_MAJOR_TIPS_SHOW,
    ADJUST_CLASS_CLASS_TIPS_HIDE,
    ADJUST_CLASS_CLASS_TIPS_SHOW,
    ADD_CLASS_GRADE_TIPS_SHOW,
    ADD_CLASS_GRADE_TIPS_HIDE,
    ADD_CLASS_COLLEGE_TIPS_HIDE,
    ADD_CLASS_COLLEGE_TIPS_SHOW,
    ADD_CLASS_MAJOR_TIPS_HIDE,
    ADD_CLASS_MAJOR_TIPS_SHOW,
    APP_LOADING_CLOSE,
    APP_LOADING_SHOW,
    SHOW_ERROR_ALERT,
    CLOSE_ERROR_ALERT,
    CLASS_LOADING_SHOW,
    CLASS_LOADING_HIDE,
    GRADE_LOADING_HIDE,
    GRADE_LOADING_SHOW,
    STUDENT_LOADING_HIDE,
    STUDENT_LOADING_SHOW,
    ADD_CLASS_MODAL_HIDE,
    ADD_CLASS_MODAL_SHOW,

    ADD_CLASS_INPUT_ABLED,
    ADD_CLASS_INPUT_DISABLED,
    ADD_CLASS_INPUT_CHANGE,
    ADD_CLASS_SELECT_CHANGE,
    ADD_CLASS_SELECT_TIPS_SHOW,
    ADD_CLASS_SELECT_TIPS_HIDE,
    ADD_CLASS_SELECT_TIPS,
    ADD_CLASS_INPUT_TIPS_SHOW,
    ADD_CLASS_INPUT_TIPS_HIDE,
    ADD_CLASS_INPUT_TIPS,
    ADJUST_CLASS_MODAL_SHOW,
    ADJUST_CLASS_MODAL_HIDE,
    ADJUST_CLASS_CLASS_LIST_UPDATE,
    ADJUST_CLASS_CLASS_CHANGE,
    ADJUST_CLASS_GRADE_CHANGE,
    ADJUST_CLASS_CLASSLIST_ABLED,
    ADJUST_CLASS_CLASSLIST_DISABLED,
    ADJUST_CLASS_ERROR_SHOW,
    ADJUST_CLASS_ERROR_HIDE,
    ADD_TEACHER_MODAL_HIDE,
    ADD_TEACHER_MODAL_SHOW,
    ADD_TEACHER_LOADING_SHOW,
    ADD_TEACHER_LOADING_HIDE,
    ADD_TEACHER_LIST_LOADING_HIDE,
    ADD_TEACHER_LIST_LOADING_SHOW,
    ADD_TEACHER_SUBJECTS_SELECT_CHANGE,
    ADD_TEACHER_SUBJECTS_SELECT_DISABLED,
    ADD_TEACHER_SUBJECTS_SELECT_ABLED,
    ADD_TEACHER_INPUT_CHANGE,
    ADD_TEACHER_EMPTY_SHOW,
    ADD_TEACHER_EMPTY_HIDE,
    ADD_TEACHER_CLOSE_HIDE,
    ADD_TEACHER_CLOSE_SHOW,
    CHANGE_CLASS_ACTIVE,
    CHANGE_GRADE_ACTIVE,
    CHANGE_STU_ACTIVE,
    CHANGE_COLLEGE_ACTIVE,
    CHANGE_MAJOR_ACTIVE,

    RESET_CLASS_NAME_SHOW,

    RESET_CLASS_NAME_HIDE,

    RESET_CLASS_NAME_INPUT_CHANG,

    RESET_CLASS_NAME_TIPS_SHOW,

    RESET_CLASS_NAME_TIPS_HIDE,

    ADJUST_CLASS_SELECT_CHANGE
}