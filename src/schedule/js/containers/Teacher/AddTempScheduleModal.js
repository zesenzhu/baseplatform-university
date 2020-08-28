import React,{useState,useEffect,useRef,memo} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading,Tips } from "../../../../common";

import ATSMActions from '../../actions/Teacher/AddTempScheduleModalActions'

import {Input,Button} from "antd";


import apiActions from "../../actions/ApiActions";

import AddTmpCourseClass from "../../component/AddTmpCourseClass";

import {useStateValue} from "../../actions/hooks";

import $ from "jquery";

import utils from '../../actions/utils';







function AddTempScheduleModal(props){

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

        tip:false,

        modalShow:false,

        stuList:[]

    });

    //临时教室输入

    const [classRoomInput,setClassRoomInput] = useState({

        tip:false,

        tipTitle:'请输入教室名称',

        edit:false,

        value:''

    });



    const { LoginUser,AddTempScheduleModal,dispatch,PeriodWeekTerm,SubjectCourseGradeClassRoom } = props;

    const { course } = AddTempScheduleModal;

   const { SchoolID,UserID,UserType,UserName } = LoginUser;


    //refs

    const AddCourseRef = useRef();

    const AddScheduleModalRef = useStateValue(AddTempScheduleModal);

    const courseInputRef = useStateValue(courseInput);

    const tmpClassRef = useStateValue(tmpClass);

    const classRoomInputRef = useStateValue(classRoomInput);

    const courseStateRef = useStateValue(courseState);

    const courseClassRef = useStateValue(courseClass);


    useEffect(()=>{

        setCourseState(e=>({...e,dropList:course}));

    },[course]);


    //课程选项改变
    const courseChange  =(e)=>{

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

       setCourseState(d=>({...d,dropSelectd:{value:e.id,title:e.value}}));

        if (!tmpClassRef.current.className){

            setCourseClass(d=>({...d,dropSelectd:{value:'none',title:"请选择班级"}}));

            apiActions.GetCourseClassCourseNOAndKey({SchoolID,CourseNO:e.id,dispatch}).then(data=>{

                if (data){

                    let gradeClass = data.map(i=>({value:i.CourseClassID,title:i.CourseClassName}));

                    setCourseClass(d=>({...d,dropList:gradeClass}));

                }

                dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            });

        }

    };

    //课程搜索
    const courseSearchClick = (e) => {

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
    const courseSearchClose = (e) =>{

        setCourseState(d=>({...d,CancelBtnShow:'n',searchOpen:false}));

    };


    //班级选项改变
    const classChange = (e) => {

        setCourseClass(d=>({...d,dropSelectd:e}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    };


    //周次变更
    const weekChange = (e) =>{

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date } = AddTempScheduleModal;

        if (WeekNO===value){

            const newDate = date.filter(i=>i.value+1>=WeekDay);

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,data:{value:'none',title:'请选择星期'}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED});

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

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

        }

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    };

    //星期变更
    const dateChange = (e) => {

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date,oldClassHour,classHour,checkedWeek } = AddTempScheduleModal;

        const { NowClassHourNO=0 } = SubjectCourseGradeClassRoom;

        if (checkedWeek.value===WeekNO&&(value+1)===WeekDay){

            const newClassHour = oldClassHour.filter(i=>i.value>=NowClassHourNO);

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{classHour:newClassHour}});


        }else{

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{classHour:oldClassHour}});

        }

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}})

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    };

    //课时变更
    const classHourChange = (e) =>{

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    };

    //教室变更
    const classRoomChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };
    //点击OK按钮
    const ok = (e) => {

        let courseOK=false,courseClassOk=false,weekOk=false,dayOk=false,classHourOk=false,classRoomOk = false;

        let CourseNO='',CourseName='',TeacherID='',TeacherName='',ClassID='',CourseClassID='',CourseClassName='',ClassRoomID='',ClassRoomName='',StudentIDs='';

//课程
        if (courseInputRef.current.edit){

            if (courseInputRef.current.value){

                let result = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/.test(courseInputRef.current.value);

                if (result){

                    CourseName = courseInputRef.current.value;

                    courseOK = true;

                    setCourseInput(d=>({...d,tip:false}));

                }else{

                    setCourseInput(d=>({...d,tip:true,tipTitle:'输入的课程名称不正确'}));

                }

            }else{

                setCourseInput(d=>({...d,tip:true,tipTitle:'请输入课程名称'}));

            }

        }else if (courseStateRef.current.dropSelectd.value==='none'){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

        }else{

            courseOK = true;

            CourseNO = courseStateRef.current.dropSelectd.value;

        }


        //班级

        if (courseInputRef.current.edit){//先判断是否是自定义的课程

            if (!tmpClassRef.current.className){

                setTmpClass(d=>({...d,tip:true}));

            }else{

                courseClassOk = true;

                CourseClassName = tmpClassRef.current.className;

                StudentIDs = tmpClassRef.current.stuList.map(i=>i.StudentID).join(',');

            }

        }else {//非自定义课程

            if (tmpClassRef.current.className) {

                CourseClassName = tmpClassRef.current.className;

                StudentIDs = tmpClassRef.current.stuList.map(i => i.StudentID).join(',');

                courseClassOk = true;

            } else if (courseClassRef.current.dropSelectd.value === 'none') {

                dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

            } else {

                courseClassOk = true;

                CourseClassID = courseClassRef.current.dropSelectd.value;

            }

        }

        //周次
        if (Object.keys(AddScheduleModalRef.current.checkedWeek).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }else{

            weekOk = true;

        }



        if (Object.keys(AddScheduleModalRef.current.checkedDate).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }else{

            dayOk = true;

        }

        if (Object.keys(AddScheduleModalRef.current.checkedClassHour).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }else {

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

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }else{

            classRoomOk = true;

            ClassRoomID = AddScheduleModalRef.current.checkedClassRoom.value;

        }

        if (courseOK&&courseClassOk&&weekOk&&dayOk&&classHourOk&&classRoomOk){

            dispatch(ATSMActions.commitInfo({modalInit,CourseNO,CourseName,TeacherID,TeacherName,ClassID,CourseClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs}));


        }

    };

    //点击取消交互
    const cancel = () => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_HIDE});

        modalInit();

    };

    //点击教室搜索
    const classRoomSearchClick =(e) =>{

        const {value} = e;

        dispatch(ATSMActions.classRoomSearch(value));

    };

    //取消教室搜索
    const classRoomSearchClose = () =>{

        dispatch(ATSMActions.classRoomSearchClose());

    };



    //新functions

    //点击添加临时课程按钮
    const addCourseShow = () =>{

        const { gradeClass,teachers,subject,teacherOriginData,subjectOriginData,course } = AddScheduleModalRef.current;

        setCourseInput(data=>({...data,edit:true}));

        setCourseSelect(data=>({...data,disabled:true}));

        setCourseState(d=>({...d,tip:false,dropSelectd:{value:'none',title:'请选择课程'}}))

    };


    //取消编辑临时学科

    const addCourseClose = () =>{

        setCourseInput(data=>({...data,edit:false,tip:false,value:''}));//切换编辑状态

        setCourseSelect(data=>({...data,disabled:false}));//左侧选择禁用

        setCourseClass(d=>({...d,dropSelectd:{value:'none',title:'请选择班级'}}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

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

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:gradeClass});

        }else{

            if (dropSelectd.value!=='none'){

                setCourseClass(d=>({...d,dropSelectd:{value:'none',title:"请选择班级"}}));

                apiActions.GetCourseClassCourseNOAndKey({SchoolID,CourseNO:dropSelectd.value,dispatch}).then(data=>{

                    if (data){

                        let gradeClass = data.map(i=>({value:i.CourseClassID,title:i.CourseClassName}));

                        setCourseClass(d=>({...d,dropList:gradeClass}));

                    }

                    dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

                });

            }

        }

    };


    //添加临时教室
    const addClassRoomShow = () =>{

        setClassRoomInput(data=>({...data,edit:true}));

        setClassRoomSelect(data=>({...data,disabled:true}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };

    //添加临时教室取消
    const addClassRoomClose = () =>{

        setClassRoomInput(data=>({...data,edit:false,tip:false,value:''}));

        setClassRoomSelect(data=>({...data,disabled:false}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

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

            setTmpClass(e=>({...e,stuList:StudentList,className:CourseClassName,modalShow:false,tip:false}));

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_CHANGE,data:{title:'请选择班级',value:'none'}});

        }

    };

    const courseInputBlur = () => {

        if (courseInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(courseInput.value);

            if (result){

                setCourseInput(e=>({...e,tip:false}));

            }else{

                setCourseInput(e=>({...e,tip:true,tipTitle:'输入的学科名称格式不正确'}));

            }

        }else{

            setCourseInput(e=>({...e,tip:false}));

        }

    };

    const classRoomInputBlur = () => {

        if (classRoomInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(classRoomInput.value);

            if (result){

                setClassRoomInput(e=>({...e,tip:false}));

            }else{

                setClassRoomInput(e=>({...e,tip:true,tipTitle:'输入的学科名称格式不正确'}));

            }

        }else{

            setClassRoomInput(e=>({...e,tip:false}));

        }

    };


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

            modalShow:false,

            stuList:[],

            tip:false

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
               visible={AddTempScheduleModal.show}
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

                <Loading spinning={AddTempScheduleModal.loadingShow} tip="加载中...">

                    <table className="modalTable">

                    <tbody>

                        <tr>

                            <td className="props">上课老师:</td>

                            <td>

                                <div className="teacher-name" >{UserName}</div>

                            </td>

                        </tr>

                        <tr>

                            <td className="props">课程:</td>

                            <td style={{position:'relative',zIndex:4,width:160}}>

                                <Tips title="请选择课程"  visible={AddTempScheduleModal.subjectErrorShow}>

                                    <DropDown
                                    width={150}
                                    height={200}
                                    type={"multiple"}
                                    className={"select-course"}
                                    style={{zIndex:10}}
                                    disabled={courseSelect.disabled}
                                    dropSelectd={courseState.dropSelectd}
                                    mutipleOptions={{
                                    range:2,
                                        dropMultipleList:courseState.dropList,
                                        dropSelectd:courseState.dropSelectd,
                                        dropMultipleChange:courseChange,
                                        dropClickSearch:courseSearchClick,
                                        dropCancelSearch:courseSearchClose,
                                        searchList:courseState.searchList,
                                        searchPlaceholder:"请输入课程名称进行搜索...",
                                        searchOpen:courseState.searchOpen,
                                        searchLoadingShow:courseState.searchLoadingShow,
                                        CancelBtnShow:courseState.CancelBtnShow
                                }}>

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

                                courseInput.edit ?

                                    <td>

                                        <div className={"add-course-name-wrapper"}>

                                            {

                                                tmpClass.className ?

                                                    <span className={"add-class-name"}
                                                          title={tmpClass.className}>{tmpClass.className}</span>

                                                    : ''

                                            }

                                            <Tips visible={tmpClass.tip} title={"请创建教学班"} autoAdjustOverflow={false}>

                                                <Button type={"link"} onClick={e => setTmpClass(data => ({...data, modalShow: true}))}>{tmpClass.className ? '编辑' : '+添加'}临时班级</Button>

                                            </Tips>

                                            {

                                                tmpClass.className ?

                                                    <Button type={"link"} onClick={cancelEditClass}>取消</Button>

                                                    : ''

                                            }

                                        </div>

                                    </td>

                                    :

                                    <>

                                        <td style={{position:'relative',zIndex:3,width:160}}>

                                            <Tips title="请选择班级"  visible={AddTempScheduleModal.classErrorShow} >

                                                <DropDown
                                                    width={150}

                                                    height={300}

                                                    disabled={AddTempScheduleModal.classDisabled}

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

                            <td className="props">上课时间:</td>

                            <td style={{position:'relative',zIndex:2}}>

                                <Tips title="请选择周次"  visible={AddTempScheduleModal.weekErrorShow}>

                                    <DropDown
                                    width={150}
                                    style={{zIndex:7}}
                                    TitleShow={false}
                                    height={300}
                                    className="week"
                                    dropSelectd={AddTempScheduleModal.checkedWeek?AddTempScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                    dropList={AddTempScheduleModal.week}
                                    onChange={weekChange}>

                                </DropDown>

                                </Tips>

                                <Tips title="请选择星期"  visible={AddTempScheduleModal.dateErrorShow}>

                                    <DropDown
                                    width={150}
                                    style={{zIndex:7}}
                                    height={300}
                                    className="date"
                                    disabled={AddTempScheduleModal.dateDisabled}
                                    dropSelectd={AddTempScheduleModal.checkedDate?AddTempScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                    dropList={AddTempScheduleModal.date}
                                    onChange={dateChange}>

                                </DropDown>

                                </Tips>

                                <Tips title="请选择课时" visible={AddTempScheduleModal.classHourErrorShow}>

                                    <DropDown
                                    width={150}
                                    style={{zIndex:7}}
                                    height={300}
                                    TitleShow={false}
                                    className="classHour"
                                    disabled={AddTempScheduleModal.classHourDisabled}
                                    dropSelectd={AddTempScheduleModal.checkedClassHour?AddTempScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                    dropList={AddTempScheduleModal.classHour}
                                    onChange={classHourChange}>

                                </DropDown>

                                </Tips>

                            </td>

                        </tr>

                        <tr>

                            <td className="props">上课教室:</td>

                            <td style={{position:'relative',zIndex:1}}>

                                <Tips title="请选择教室" visible={AddTempScheduleModal.classRoomErrorShow}>

                                    <DropDown
                                    width={150}
                                    type="multiple"
                                    className={"select-class-room"}
                                    disabled={classRoomSelect.disabled}
                                    dropSelectd={AddTempScheduleModal.checkedClassRoom?AddTempScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                    mutipleOptions={{
                                        range:2,
                                        dropSelectd:AddTempScheduleModal.checkedClassRoom?AddTempScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"},
                                        dropMultipleList:AddTempScheduleModal.classRoom,
                                        dropMultipleChange:classRoomChange,
                                        dropClickSearch:classRoomSearchClick,
                                        searchList:AddTempScheduleModal.classRoomSearchList,
                                        searchPlaceholder:"请输入教室名称或ID搜索...",
                                        searchLoadingShow:AddTempScheduleModal.classRoomSearchLoadingShow,
                                        dropCancelSearch:classRoomSearchClose,
                                        searchOpen:AddTempScheduleModal.classRoomSearchOpen,
                                        CancelBtnShow:AddTempScheduleModal.classRoomSearchCancelShow
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

    const { AddTempScheduleModal,SubjectCourseGradeClassRoom } = state.Teacher;

    const { LoginUser,PeriodWeekTerm } = state;

    return{

        AddTempScheduleModal,

        LoginUser,

        PeriodWeekTerm,

        SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToState)(memo(AddTempScheduleModal));