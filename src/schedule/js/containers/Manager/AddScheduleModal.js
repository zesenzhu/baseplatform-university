import React,{useEffect,useState,useRef,memo} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading,Tips } from "../../../../common";

import {Button,Input} from 'antd';

import ASMActions from '../../actions/Manager/AddScheduleModalActions';

import apiActions from '../../actions/ApiActions';

import appAlertActions from '../../actions/AppAlertActions';

import $ from 'jquery';

import {useStateValue} from '../../actions/hooks';

import utils from "../../actions/utils";

import AddTmpCourseClass from '../../component/AddTmpCourseClass';


function AddScheduleModal(props){

    const [courseState,setCourseState] = useState({

        dropSelectd:{value:'none',title:"请选择课程"},

        dropList:[],

        searchList:[],

        searchOpen:false,

        searchLoadingShow:true,

        CancelBtnShow:'n'

    });

    const [courseClass,setCourseClass] = useState({

        dropSelectd:{value:'none',title:"请选择班级"},

        dropList:[]

    });


    //学科能否选取
    const [courseSelect,setCourseSelect] = useState({

        disabled:false

    });

    //教室能否选取
    const [classRoomSelect,setClassRoomSelect] = useState({

        disabled:false

    });


    //课程输入

    const [courseInput,setCourseInput] = useState({

        tip:false,

        tipTitle:'请输入课程名称',

        edit:false,

        value:''

    });

    //临时班级

    const [tmpClass,setTmpClass] = useState({

        className:'',

        edit:false,

        modalShow:false,

        stuList:[]

    });


    //临时教师输入

    const [teacherInput,setTeacherInput] = useState({

        tip:false,

        tipTitle:'请输入教师姓名',

        edit:false,

        value:''

    });

    //教师多选的

    const [teacherMutiple,setTeacherMutile] = useState({

        tip:false,

        dropSelectd:{value:'none',title:'请选择教师'},

        dropList:[],

        searchOpen:false,

        searchList:[],

        disabled:true,

        searchLoading:false,

        CancelBtnShow:'n'

    });


    //临时教室输入

    const [classRoomInput,setClassRoomInput] = useState({

        tip:false,

        tipTitle:'请输入教室名称',

        edit:false,

        value:''

    });



    const { AddScheduleModal,SubjectCourseGradeClassRoom,LoginUser,PeriodWeekTerm,dispatch } = props;

    const { course } = AddScheduleModal;

    const{ SchoolID } = LoginUser;



    //refs

    const AddCourseRef = useRef();

    const AddScheduleModalRef = useStateValue(AddScheduleModal);

    const courseInputRef = useStateValue(courseInput);

    const tmpClassRef = useStateValue(tmpClass);

    const teacherInputRef = useStateValue(teacherInput);

    const classRoomInputRef = useStateValue(classRoomInput);

    const courseStateRef = useStateValue(courseState);

    const courseClassRef = useStateValue(courseClass);

    const teacherMutipleRef = useStateValue(teacherMutiple);


    useEffect(()=>{

        setCourseState(e=>({...e,dropList:course}));

    },[course]);




    //课程选项改变
    const courseChange = (e) => {

        dispatch({type: ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        setCourseState(d=>({...d,dropSelectd:{value:e.id,title:e.value}}));

        if (!tmpClassRef.current.className){

            setCourseClass(d=>({...d,dropSelectd:{value:'none',title:"请选择班级"}}));

            apiActions.GetCourseClassCourseNOAndKey({SchoolID,CourseNO:e.id,dispatch}).then(data=>{

               if (data){

                   let gradeClass = data.map(i=>({value:i.CourseClassID,title:i.CourseClassName}));

                   setCourseClass(d=>({...d,dropList:gradeClass}));

               }

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            });

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE});

        }

        if (!teacherInputRef.current.edit){

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{value:'none',title:'请选择教师'}});

            apiActions.GetTeacherByCourseNOAndKey({SchoolID,CourseNO:e.id,dispatch}).then(data=>{

               if (data){

                   let teachers = data.map(i=>({value:i.TeacherID,title:i.TeacherName}));

                   dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{teacherList:teachers}});

               }

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

            });

            $('.select-teacher-multiple .search_cancel_input').hide();

            $('.select-teacher-multiple .search_text_input').val('');

            $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

            $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();


        }


    };


    //课程搜索
    const courseSearchClick = (e) =>{

        const  result = utils.SearchReg({key:e.value,type:'2',dispatch,ErrorTips:'输入的课程名称格式不正确'});

        if (result){

            let searchList = [];

            courseState.dropList.map(i=>{

                let list = i.list.filter(item=>item.name.indexOf(e.value)!==-1);

                searchList.push(...list);

            });

            setCourseState(d=>({...d,searchOpen:true,CancelBtnShow:'y',searchList,searchLoadingShow:false}));

        }


    };


    //课程搜索取消
    const courseSearchClose = (e) => {

        setCourseState(d=>({...d,CancelBtnShow:'n',searchOpen:false}));

    };



    //班级选项改变
    const classChange = (e) =>{

        setCourseClass(d=>({...d,dropSelectd:e}));

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    };

    //老师改变
    const teacherChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };
    //周次变更
    const weekChange = (e) => {

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date,oldClassHour,classHour } = AddScheduleModal;

        const { NowClassHourNO=0 } = SubjectCourseGradeClassRoom;

        if (WeekNO===value){

            const newDate = date.filter(i=>i.value+1>=WeekDay);

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:{value:'none',title:'请选择星期'}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED});

        }else{

            let newDate = [];

            for (let i = 0; i <= 6; i++){

                let title = '';

                switch (i) {

                    case 0:

                        title = '星期一';

                        break;

                    case 1:

                        title = '星期二';

                        break;

                    case 2:

                        title = '星期三';

                        break;

                    case 3:

                        title = '星期四';

                        break;

                    case 4:

                        title = '星期五';

                        break;

                    case 5:

                        title = '星期六';

                        break;

                    case 6:

                        title = '星期日';

                        break;

                    default:

                        title = '星期一';

                }

                newDate.push({

                    value:i,

                    title

                });

            }

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

        }

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    };

    //星期变更
    const dateChange = (e) => {

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date,oldClassHour,classHour,checkedWeek } = AddScheduleModal;

        const { NowClassHourNO=0 } = SubjectCourseGradeClassRoom;

        if (checkedWeek.value===WeekNO&&(value+1)===WeekDay){

            const newClassHour = oldClassHour.filter(i=>i.value>=NowClassHourNO);

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{classHour:newClassHour}});


        }else{

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{classHour:oldClassHour}});

        }

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}})

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    };

    //课时变更
    const classHourChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    };

    //教室变更
    const classRoomChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };
    //点击OK按钮
    const ok = (e)=>{

        let courseOk = false,courseClassOk = false,teacherOk = false,weekOk = false,dayOk = false,classHourOk = false,classRoomOk=false;

        let CourseNO='',CourseName='',ClassID = '',TeacherID='',TeacherName='',CourseClassID='',CourseClassName='',ClassRoomID='',ClassRoomName='',StudentIDs='';

        //课程
        if (courseInputRef.current.edit){

            if (courseInputRef.current.value){

                let result = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/.test(courseInputRef.current.value);

                if (result){

                    CourseName = courseInputRef.current.value;

                    courseOk = true;

                    setCourseInput(d=>({...d,tip:false}));

                }else{

                    setCourseInput(d=>({...d,tip:true,tipTitle:'输入的课程名称不正确'}));

                }

            }else{

                setCourseInput(d=>({...d,tip:true,tipTitle:'请输入课程名称'}));

            }

        }else if(courseStateRef.current.dropSelectd.value==='none'){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

        }else{

            courseOk = true;

            CourseNO = courseStateRef.current.dropSelectd.value;

        }


        //班级
        if (tmpClassRef.current.className){

            CourseClassName = tmpClassRef.current.className;

            StudentIDs = tmpClassRef.current.stuList.map(i=>i.StudentID).join(',');

            courseClassOk = true;

        }else if (courseClassRef.current.dropSelectd.value==='none'){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

        }else{

            courseClassOk = true;

            CourseClassID = courseClassRef.current.dropSelectd.value;

        }


        //教师
        if (teacherInputRef.current.edit){

            if (teacherInputRef.current.value){

                let result = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(teacherInputRef.current.value);

                if (result){

                    teacherOk = true;

                    setTeacherInput(d=>({...d,tip:false}));

                    TeacherName = teacherInputRef.current.value;

                }else{

                    setTeacherInput(d=>({...d,tip:true,tipTitle:'输入的教师名称格式不正确'}));

                }

            }else{

                setTeacherInput(d=>({...d,tip:true,tipTitle:'请输入教师名称'}));

            }

        }else if(Object.keys(AddScheduleModalRef.current.checkedTeacher).length <= 0||AddScheduleModalRef.current.checkedTeacher.value==='none'){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW});

        }else{

            TeacherID = AddScheduleModalRef.current.checkedTeacher.value;

            teacherOk = true;

        }



        //周次
        if (Object.keys(AddScheduleModalRef.current.checkedWeek).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }else{

            weekOk = true;

        }

        //日期
        if (Object.keys(AddScheduleModalRef.current.checkedDate).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }else{

            dayOk = true;

        }

        //课时
        if (Object.keys(AddScheduleModalRef.current.checkedClassHour).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }else{

            classHourOk = true;

        }

        //教室
        if (classRoomInputRef.current.edit){

            if (classRoomInputRef.current.value){

                let result = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/.test(classRoomInputRef.current.value);

                if (result){

                    classRoomOk = true;

                    setClassRoomInput(d=>({...d,tip:false}));

                    ClassRoomName = classRoomInputRef.current.value;

                }else{

                    setClassRoomInput(d=>({...d,tip:true,tipTitle:'输入的教室名称格式不正确'}));

                }

            }else{

                setClassRoomInput(d=>({...d,tip:true,tipTitle:'请输入教室名称'}));

            }

        }else if (Object.keys(AddScheduleModalRef.current.checkedClassRoom).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }else{

            classRoomOk = true;

            ClassRoomID = AddScheduleModalRef.current.checkedClassRoom.value;

        }

        if (courseOk&&courseClassOk&&teacherOk&&weekOk&&dayOk&&classHourOk&&classRoomOk){

            dispatch(ASMActions.commitInfo({modalInit,ClassID,CourseNO,CourseName,TeacherID,TeacherName,CourseClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs}));

        }

    };

    //点击取消交互
    const cancel = () => {

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_HIDE});

        modalInit();

    };

    //点击班级的搜索
    const classSearchClick = (e) => {

        const {value} = e;

        dispatch(ASMActions.classSearch(value));

    };

    //取消班级搜索
    const classSearchClose = () => {

        dispatch(ASMActions.classSearchClose());

    };


    //点击教室搜索
    const classRoomSearchClick = (e) => {

        const {value} = e;

        dispatch(ASMActions.classRoomSearch(value));

    };

    //取消教室搜索
    const classRoomSearchClose = () => {

        dispatch(ASMActions.classRoomSearchClose());

    };


    const teacherMultipleChange = (e) => {

        const value = e.id;

        const title = e.value;

        setTeacherMutile(data=>({...data,dropSelectd:{value,title}}));

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{value,title}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };


    //点击教师
    const teacherClickSearch = (e) => {

        const {value} = e;

        let result =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(value);

        if (result){

            setTeacherMutile(d=>({...d,searchOpen:true,searchLoading:true,CancelBtnShow:'y'}));

            apiActions.GetTeacherBySubjectIDAndKey({SchoolID,CollegeID:'',SubjectID:'',Key:value,dispatch}).then(data=>{

                if (data){

                    const searchList = data.map(i=>({id:i.TeacherID,name:i.TeacherName}));

                    setTeacherMutile(d=>({...d,searchList}));

                }

                setTeacherMutile(d=>({...d,searchLoading:false}));

            });

        }else{

            dispatch(appAlertActions.alertWarn({title:'输入教师姓名或工号不正确'}))

        }

    };

    //教师取消搜索
    const teacherSearchClose = () => {

        setTeacherMutile(d=>({...d,searchOpen:false,CancelBtnShow:'n'}));

    };


    //点击添加临时课程按钮
    const addCourseShow = () =>{

        const { gradeClass,teachers,subject,teacherOriginData,subjectOriginData,course } = AddScheduleModalRef.current;

        setCourseInput(data=>({...data,edit:true}));

        setCourseSelect(data=>({...data,tip:false,disabled:true,dropSelectd:{value:'none',title:'请选择课程'}}));

        if (!teacherInput.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

            const courseList = [];

            const teacherDropList = course.map(i=>{

                const list = teacherOriginData.filter(item=>item.SubjectID === i.id).map(it=>({id:it.TeacherID,name:it.TeacherName}));

                return {

                    id:i.id,

                    name:i.name,

                    list

                };

            });

             setTeacherMutile(e=>({...e,disabled:false,dropList:teacherDropList}));

            $('.select-teacher-multiple .search_cancel_input').hide();

            $('.select-teacher-multiple .search_text_input').val('');

            $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

            $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();


        }

    };


    //取消编辑临时学科

    const addCourseClose = () =>{

        setCourseInput(data=>({...data,edit:false,tip:false,value:''}));//切换编辑状态

        setCourseSelect(data=>({...data,disabled:false}));//左侧选择禁用

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        setCourseClass(d=>({...d,dropSelectd:{value:'none',title:'请选择班级'}}));

        if (!tmpClass.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        }

        if (!teacherInput.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

            $('.select-teacher-multiple .search_cancel_input').hide();

            $('.select-teacher-multiple .search_text_input').val('');

            $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

            $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();

        }


        $('.select-course .search_cancel_input').hide();

        $('.select-course .search_text_input').val('');

        $('.select-course .dropdown_item1_name.slide').removeClass('slide');

        $('.select-course .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };


    //取消临时班级

    const cancelEditClass = () => {

        const { dropSelectd } = courseStateRef.current;

        setTmpClass(data=>({...data,className:'',stuList:[]}));

        const { SubjectList,gradeClass } = AddScheduleModalRef.current;

        if (courseInput.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{classList:gradeClass}});

        }else{

            if (dropSelectd.value!=='none'){

                setCourseClass(d=>({...d,dropSelectd:{value:'none',title:"请选择班级"}}));

                apiActions.GetCourseClassCourseNOAndKey({SchoolID,CourseNO:dropSelectd.value,dispatch}).then(data=>{

                    if (data){

                        let gradeClass = data.map(i=>({value:i.CourseClassID,title:i.CourseClassName}));

                        setCourseClass(d=>({...d,dropList:gradeClass}));

                    }

                    dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

                });

            }

        }


    };


    //点击添加临时教师
    const addTeacherShow = () =>{

        setTeacherInput(data=>({...data,edit:true}));

        setTeacherMutile(data=>({...data,disabled:true,dropSelectd:{value:'none',title:'请选择教师'}}));

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

        dispatch({type: ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{value:'none',title:'请选择教师'}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };


    //取消添加临时教师
    const addTeacherClose = () =>{

        const { checkedSubject,teachers } = AddScheduleModalRef.current;

        setTeacherInput(data=>({...data,edit:false,tip:false,value:''}));

        console.log(AddScheduleModalRef.current);

        if (!courseInput.edit){

            if (courseState.dropSelectd.value==='none'){

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE,data:{value:'none',title:'请选择教师'}});

            }else{

                apiActions.GetTeacherByCourseNOAndKey({SchoolID,CourseNO:courseState.dropSelectd.value,dispatch}).then(data=>{

                    if (data){

                        let teachers = data.map(i=>({value:i.TeacherID,title:i.TeacherName}));

                        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{teacherList:teachers}});

                    }

                    dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

                });

            }

        }else{

            setTeacherMutile(e=>({...e,disabled:false}));

            $('.select-teacher-multiple .search_cancel_input').hide();

            $('.select-teacher-multiple .search_text_input').val('');

            $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

            $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();


        }



    };


    //添加临时教室
    const addClassRoomShow = () =>{

        setClassRoomInput(data=>({...data,edit:true}));

        setClassRoomSelect(data=>({...data,disabled:true}));

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };

    //添加临时教室取消
    const addClassRoomClose = () =>{

        setClassRoomInput(data=>({...data,edit:false,tip:false,value:''}));

        setClassRoomSelect(data=>({...data,disabled:false}));

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        $('.select-class-room .search_cancel_input').hide();

        $('.select-class-room .search_text_input').val('');

        $('.select-class-room .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class-room .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };

    const addCourseClassOk = () =>{

        const {CourseClassName,classNameTrue,showCourseClassTip,StudentList,showModalLoading,hideModalLoading,showStuTip} = AddCourseRef.current;


        if (!CourseClassName){

            showCourseClassTip('请输入班级名称');

        }

        if (StudentList.length===0){

            showStuTip();

        }

        if (classNameTrue&&CourseClassName&&StudentList.length>0){

            setCourseClass(d=>({...d,dropSelectd:{value:'none',title:"请选择班级"}}));

            setTmpClass(e=>({...e,stuList:StudentList,className:CourseClassName,modalShow:false}));

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE,data:{title:'请选择班级',value:'none'}});

        }

    };


    const courseInputBlur = () => {

        if (courseInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(courseInput.value);

            if (result){

                setCourseInput(e=>({...e,tip:false}));

            }else{

                setCourseInput(e=>({...e,tip:true,tipTitle:'输入的课程名称格式不正确'}));

            }

        }else{

            setCourseInput(e=>({...e,tip:false}));

        }

    };

    const teacherInputBlur = () => {

        if (teacherInput.value){

            let result =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(teacherInput.value);

            if (result){

                setTeacherInput(e=>({...e,tip:false}));

            }else{

                setTeacherInput(e=>({...e,tip:true,tipTitle:'输入的上课老师名称格式不正确'}));

            }

        }else{

            setTeacherInput(e=>({...e,tip:false}));

        }

    };

    const classRoomInputBlur = () => {

        if (classRoomInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(classRoomInput.value);

            if (result){

                setClassRoomInput(e=>({...e,tip:false}));

            }else{

                setClassRoomInput(e=>({...e,tip:true,tipTitle:'输入的上课教室名称格式不正确'}));

            }

        }else{

            setClassRoomInput(e=>({...e,tip:false}));

        }

    };

    //将模块置为初始状态

    const modalInit = () =>{

        setCourseState({

            dropSelectd:{value:'none',title:"请选择课程"},

            dropList:[],

            searchList:[],

            searchOpen:false,

            searchLoadingShow:true,

            CancelBtnShow:'n'

        });

        setCourseClass({

            dropSelectd:{value:'none',title:"请选择班级"},

            dropList:[]

        });


        //学科能否选取
        setCourseSelect({

            disabled:false

        });

        //教室能否选取
        setClassRoomSelect({

            disabled:false

        });


        //课程输入

        setCourseInput({

            tip:false,

            tipTitle:'请输入课程名称',

            edit:false,

            value:''

        });

        //临时班级

        setTmpClass({

            className:'',

            edit:false,

            modalShow:false,

            stuList:[]

        });


        //临时教师输入

        setTeacherInput({

            tip:false,

            tipTitle:'请输入教师姓名',

            edit:false,

            value:''

        });

        //教师多选的

        setTeacherMutile({

            tip:false,

            dropSelectd:{value:'none',title:'请选择教师'},

            dropList:[],

            searchOpen:false,

            searchList:[],

            disabled:true,

            searchLoading:false,

            CancelBtnShow:'n'

        });


        //临时教室输入

        setClassRoomInput({

            tip:false,

            tipTitle:'请输入教室名称',

            edit:false,

            value:''

        });



    };

    return (

        <>

            <Modal className="add-schedule-modal-wrapper"
                   visible={AddScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={false}
                   cancelText="取消"
                   onOk={ok}
                   onCancel={cancel}
                   destroyOnClose={true}>

                <div className="ModalContent">

                    <Loading spinning={AddScheduleModal.loadingShow} tip="加载中...">

                        <table className="modalTable">

                        <tbody>

                            <tr>

                                <td className="props">课程:</td>

                                <td style={{position:"relative",zIndex:5,width:160}}>

                                    <Tips title="请选择课程" visible={AddScheduleModal.subjectErrorShow} autoAdjustOverflow={false}>

                                        <DropDown
                                            width={150}
                                            height={300}
                                            className={"select-course"}
                                            type={"multiple"}
                                            style={{zIndex:10}}
                                            disabled={courseSelect.disabled}
                                            dropSelectd={courseState.dropSelectd}
                                            mutipleOptions={{
                                                range:2,
                                                dropSelectd:courseState.dropSelectd,
                                                dropMultipleList:courseState.dropList,
                                                dropMultipleChange:courseChange,
                                                dropClickSearch:courseSearchClick,
                                                dropCancelSearch:courseSearchClose,
                                                searchList:courseState.searchList,
                                                searchPlaceholder:"请输入课程名称进行搜索...",
                                                searchOpen:courseState.searchOpen,
                                                searchLoadingShow:courseState.searchLoadingShow,
                                                CancelBtnShow:courseState.CancelBtnShow
                                            }}

                                        >

                                        </DropDown>

                                    </Tips>

                                </td>

                                <td>

                                    {

                                        courseInput.edit?

                                            <>

                                                <Tips title={courseInput.tipTitle} visible={courseInput.tip} autoAdjustOverflow={false}>

                                                    <Input value={courseInput.value} onBlur={courseInputBlur} onChange={e=>{e.persist();setCourseInput(data=>({...data,value:e.target.value}))}}/>

                                                </Tips>

                                                <Button type={"link"} onClick={addCourseClose}>取消</Button>

                                            </>

                                            :

                                            <Button type={"link"} onClick={addCourseShow}>+添加临时课程</Button>


                                    }

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课班级:</td>

                                {

                                    courseInput.edit?

                                        <td>

                                            <div className={"add-course-name-wrapper"}>

                                            {

                                                tmpClass.className?

                                                    <span className={"add-class-name"} title={tmpClass.className}>{tmpClass.className}</span>

                                                    :''

                                            }

                                            <Button type={"link"} onClick={e=>setTmpClass(data=>({...data,modalShow:true}))}>{tmpClass.className?'编辑':'+添加'}临时班级</Button>

                                            {

                                                tmpClass.className?

                                                    <Button type={"link"} onClick={cancelEditClass}>取消</Button>

                                                    :''

                                            }

                                            </div>

                                        </td>

                                        :

                                        <>

                                            <td style={{position:"relative",zIndex:4,width:160}}>

                                                <Tips title="请选择班级" visible={AddScheduleModal.classErrorShow}>

                                                    <DropDown

                                                        width={150}

                                                        height={300}

                                                        disabled={AddScheduleModal.classDisabled}

                                                        dropSelectd={courseClass.dropSelectd}

                                                        dropList={courseClass.dropList}

                                                        onChange={classChange}

                                                        style={{zIndex:9}}>

                                                    </DropDown>

                                                </Tips>

                                            </td>

                                            <td>

                                                {

                                                    tmpClass.className?

                                                        <span className={"add-class-name"} title={tmpClass.className}>{tmpClass.className}</span>

                                                        :''

                                                }

                                                <Button type={"link"} onClick={e=>setTmpClass(data=>({...data,modalShow:true}))}>{tmpClass.className?'编辑':'+添加'}临时班级</Button>

                                                {

                                                    tmpClass.className?

                                                        <Button type={"link"} onClick={cancelEditClass}>取消</Button>

                                                        :''

                                                }

                                            </td>

                                        </>

                                }

                            </tr>

                            <tr>

                                <td className="props">上课老师:</td>

                                <td style={{position:"relative",zIndex:3,width:160}}>

                                    <Tips title="请选择教师" visible={AddScheduleModal.teacherErrorShow}>

                                        {

                                            courseInput.edit?

                                                <DropDown
                                                    width={150}
                                                    height={300}
                                                    className={"select-teacher-multiple"}
                                                    type="multiple"
                                                    TitleShow={false}
                                                    disabled={AddScheduleModal.teacherDisabled}
                                                    dropSelectd={AddScheduleModal.checkedTeacher?AddScheduleModal.checkedTeacher:{value:"none",title:"请选择教师"}}
                                                    dropList={AddScheduleModal.teacherList}
                                                    mutipleOptions={{
                                                        range:2,
                                                        dropSelectd:teacherMutiple.dropSelectd,
                                                        dropMultipleList:teacherMutiple.dropList,
                                                        dropMultipleChange:teacherMultipleChange,
                                                        dropClickSearch:teacherClickSearch,
                                                        dropCancelSearch:teacherSearchClose,
                                                        searchList:teacherMutiple.searchList,
                                                        searchPlaceholder:"请输入教师名称进行搜索...",
                                                        searchOpen:teacherMutiple.searchOpen,
                                                        searchLoadingShow:teacherMutiple.searchLoadingShow,
                                                        CancelBtnShow:teacherMutiple.CancelBtnShow
                                                    }}
                                                    style={{zIndex:8}}>

                                                </DropDown>

                                                :

                                                <DropDown
                                                    width={150}
                                                    type="simple"
                                                    TitleShow={false}
                                                    disabled={AddScheduleModal.teacherDisabled}
                                                    dropSelectd={AddScheduleModal.checkedTeacher?AddScheduleModal.checkedTeacher:{value:"none",title:"请选择教师"}}
                                                    dropList={AddScheduleModal.teacherList}
                                                    onChange={teacherChange}
                                                    height={300}
                                                    style={{zIndex:8}}>

                                                </DropDown>

                                        }

                                    </Tips>

                                </td>

                                <td>

                                    {

                                        teacherInput.edit?

                                            <>

                                                <Tips visible={teacherInput.tip} title={teacherInput.tipTitle}>

                                                    <Input value={teacherInput.value} onBlur={teacherInputBlur} onChange={e=>{e.persist();setTeacherInput(data=>({...data,value:e.target.value}))}}/>

                                                </Tips>

                                                <Button type={"link"} onClick={addTeacherClose}>取消</Button>

                                            </>

                                            :

                                            <Button type={"link"} onClick={addTeacherShow}>+添加临时教师</Button>

                                    }

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                                <td style={{position:"relative",zIndex:2}}>

                                    <Tips title="请选择周次" visible={AddScheduleModal.weekErrorShow}>

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={300}
                                        className="week"
                                        TitleShow={false}
                                        dropSelectd={AddScheduleModal.checkedWeek?AddScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                        dropList={AddScheduleModal.week}
                                        onChange={weekChange}>

                                    </DropDown>

                                    </Tips>

                                    <Tips title="请选择星期" visible={AddScheduleModal.dateErrorShow}>

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={300}
                                        className="date"
                                        disabled={AddScheduleModal.dateDisabled}
                                        dropSelectd={AddScheduleModal.checkedDate?AddScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                        dropList={AddScheduleModal.date}
                                        onChange={dateChange}>

                                    </DropDown>

                                    </Tips>

                                    <Tips title="请选择课时" visible={AddScheduleModal.classHourErrorShow}>

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={300}
                                        TitleShow={false}
                                        className="classHour"
                                        disabled={AddScheduleModal.classHourDisabled}
                                        dropSelectd={AddScheduleModal.checkedClassHour?AddScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                        dropList={AddScheduleModal.classHour}
                                        onChange={classHourChange}>

                                    </DropDown>

                                    </Tips>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                                <td style={{position:"relative",zIndex:1,width:160}}>

                                    <Tips title="请选择教室" visible={AddScheduleModal.classRoomErrorShow}>

                                        <DropDown
                                        width={150}
                                        type="multiple"
                                        className={"select-class-room"}
                                        dropSelectd={AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                        disabled={classRoomSelect.disabled}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.classRoom,
                                            dropSelectd:AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"},
                                            dropMultipleChange:classRoomChange,
                                            dropClickSearch:classRoomSearchClick,
                                            searchList:AddScheduleModal.classRoomSearchList,
                                            searchPlaceholder:"请输入教室名称或ID进行搜索...",
                                            searchLoadingShow:AddScheduleModal.classRoomSearchLoadingShow,
                                            dropCancelSearch:classRoomSearchClose,
                                            searchOpen:AddScheduleModal.classRoomSearchOpen,
                                            CancelBtnShow:AddScheduleModal.classRoomSearchCancelShow
                                        }}
                                        style={{zIndex:6}}>

                                    </DropDown>

                                    </Tips>

                                </td>

                                <td>

                                    {

                                        classRoomInput.edit?

                                            <>

                                                <Tips visible={classRoomInput.tip} title={classRoomInput.tipTitle}>

                                                    <Input value={classRoomInput.value} onBlur={classRoomInputBlur} onChange={e=>{e.persist();setClassRoomInput(data=>({...data,value:e.target.value}))}}/>

                                                </Tips>

                                                <Button type={"link"} onClick={addClassRoomClose}>取消</Button>

                                            </>

                                            :

                                            <Button type={"link"} onClick={addClassRoomShow}>+添加临时教室</Button>

                                    }

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    </Loading>

                </div>

            </Modal>

            <Modal
                className={"add-edit-course-class-modal"}
                type="1"
                width={800}
                destroyOnClose={true}
                title={"编辑教学班"}
                bodyStyle={{ height:480,padding: 0 }}
                visible={tmpClass.modalShow}
                onOk={addCourseClassOk}
                onCancel={e=>setTmpClass(d=>({...d,modalShow:false}))}
            >

                {

                    tmpClass.modalShow?

                        <AddTmpCourseClass CourseClassName={tmpClass.className} StudentList={tmpClass.stuList} ref={AddCourseRef}></AddTmpCourseClass>

                        :''

                }

            </Modal>

        </>

    );


}

const mapStateToState = (state) => {

    const { AddScheduleModal,SubjectCourseGradeClassRoom } = state.Manager;

    const { LoginUser,PeriodWeekTerm } = state;

    return{

        AddScheduleModal,

        SubjectCourseGradeClassRoom,

        LoginUser,

        PeriodWeekTerm

    }

};

export default connect(mapStateToState)(AddScheduleModal);