import React,{useRef,useState,useEffect,memo,forwardRef,useImperativeHandle} from 'react';

import {Loading,DropDown,Tips} from "../../../../common";

import {Input} from 'antd';

import {GetTeacherInfo_University} from '../../actions/apiActions';

import {subNameReg} from "../../actions/utils";

import '../../../scss/combine-course-class-modal.scss';


function CombineCourseClass(pros,ref) {

    //state
    const [modal,setModal] = useState({

        loading:true,

        firstLoad:true

    });

    //合班的传递的信息

    const [courseClassProps,setCourseClassProps] = useState({

        classNames:'',

        classIDs:''

    });

    const [teacher,setTeacher] = useState({

        dropSelectd:{value:'',title:'请选择教师'},

        dropList:[],

        tip:false

    });

    const [courseClass,setCourseClass] = useState({

        value:'',

        tip:false,

        tipTitle:'请输入新的教学班名称'

    });



    //props

    const { LoginUser,CourseNO,checkClassProps,dispatch } = pros;

    const { SchoolID,UserID,UserType } = LoginUser;

    //初始化

    useEffect(()=>{

        if (modal.firstLoad&&CourseNO){

            const classNamesStr = checkClassProps.map(i=>i.CourseClassName).join('、');

            const classIDsStr = checkClassProps.map(i=>i.CourseClassID).join(',');

            const teacherIDList = [...new Set(checkClassProps.map(i=>i.TeacherID))].filter(i=>i!==null);

            const teacherList = teacherIDList.map(i=>checkClassProps.find(item=>item.TeacherID===i)).map(i=>({TeacherID:i.TeacherID,TeacherName:i.TeacherName}));

            setCourseClassProps(e=>({...e,classNames:classNamesStr,classIDs:classIDsStr}));

            GetTeacherInfo_University({schoolID:SchoolID,courseNO:CourseNO,dispatch}).then(data=>{

                if (data){

                    const teachers = data.filter(i=>!teacherIDList.includes(i.TeacherID));

                    teachers.unshift(...teacherList);

                    const dropList = teachers.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:'#999999'}}>[{i.TeacherID}]</span></span>}))

                    setTeacher(e=>({...e,dropList}));

                }

                setModal(e=>({...e,loading:false,firstLoad:false}));

            })

        }

    },[CourseNO,checkClassProps]);

    //ref

    const courseClassRef = useRef();

    //对外抛出
    useImperativeHandle(ref,()=>({

        showModalLoading:()=>setModal(data=>({...data,loading:true})),

        hideModalLoading:()=>setModal(data=>({...data,loading:false})),

        showCourseClassTip:(title)=>setCourseClass(data=>({...data,tip:true,tipTitle:title})),

        showTeacherTip:()=>setTeacher(data=>({...data,tip:true})),

        CombinedClassIDs:courseClassProps.classIDs,

        courseClassName:courseClassRef.current.state.value,

        teacherID:teacher.dropSelectd.value,

        courseClassTip:courseClass.tip

    }));


    //教师选取

    const teacherChange = (e) =>{

        setTeacher(data=>({...data,dropSelectd:e,tip:false}));

    };

    //教学班输入框blur
    const courseClassBlur = () =>{

        const value = courseClassRef.current.state.value;

        if (!value){

            setCourseClass(data=>({...data,tip:false,tipTitle:'请输入新的教学班名称'}));

        }else{

            const result = subNameReg(value);

            const tip = result?false:true;

            const tipTitle = result?'':'教学班名称格式不正确';

            setCourseClass(data=>({...data,tip,tipTitle}));

        }

    };


    return(

        <Loading tip={"加载中，请稍候..."} spinning={modal.loading}>

            <div className={"combine-content"}>

                <div className={"class-checked"}>

                    <span className={"props"}>已选择的教学班:</span>

                    <span className={"class-name-wrapper"}>{courseClassProps.classNames}</span>

                </div>

                <div className={"new-class-name"}>

                    <span className={"props"}>新的教学班名称:</span>

                    <Tips autoAdjustOverflow={false} title={courseClass.tipTitle} visible={courseClass.tip}>

                        <Input onBlur={courseClassBlur} ref={courseClassRef} placeholder={"请输入教学班名称"} className={"class-name-input"}/>

                    </Tips>

                </div>

                <div className={"class-teacher"}>

                    <span className={"props"}>指定任课教师:</span>

                    <Tips title={"请选择教师"} visible={teacher.tip}>

                        <DropDown

                            className={"select-teacher"}

                            height={320}

                            width={200}

                            dropSelectd={teacher.dropSelectd}

                            dropList={teacher.dropList}

                            onChange={teacherChange}

                        >


                        </DropDown>

                    </Tips>

                </div>

                <div className={"tips"}>

                    <i className={"warn-tip"}/>

                    <span className={"tip-title"}>
                        注意:1.合班后的新教学班名称不允许和本课程内已有教学班名称重复；
                        2.合班后原教学班及其课程安排数据将会被删除，请谨慎操作！
                    </span>

                </div>

            </div>

        </Loading>

    )

}

export default memo(forwardRef(CombineCourseClass));