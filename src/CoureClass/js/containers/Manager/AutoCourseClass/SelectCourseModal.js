import React,{useState,useEffect,memo,useRef,forwardRef,useImperativeHandle} from 'react';

import {Empty,CheckBox, CheckBoxGroup,Loading} from '../../../../../common'

import {GetRequiredCourse_University} from "../../../actions/apiActions";

import Scroll from 'react-custom-scrollbars';

import {TransitionGroup,CSSTransition} from 'react-transition-group';

import '../../../../scss/auto-select-course-modal.scss';

function SelectCourseModal(props,ref) {

    //loading相关的state
    const [loading,setLoading] = useState(true);

    //第一次加载

    const [firstLoad,setFirstLoad] = useState(true);

    //课程相关的state
    const [courses,setCourse] = useState({

        list:[],

        checkList:[]

    });



    //props

    const { LoginUser,dispatch,courseList } = props;

    const { SchoolID,UserID,UserType,UserClass } = LoginUser;


    //初始化
    useEffect(()=>{

        if (courseList&&firstLoad){

            GetRequiredCourse_University({schoolID:SchoolID,userID:UserID,userType:UserType,userClass:UserClass,dispatch}).then(data=>{

                if (data){

                    const dataSourse = data.map(i=>({...i,drop:false}));

                    const checkCompare = data.map(i=>{

                         const findIndex = courseList.findIndex(item=>item.SubjectID===i.SubjectID);

                         if (findIndex>=0){

                             const Courses = courseList.find(item=>item.SubjectID===i.SubjectID).Courses;

                             const checked = Courses.length===i.Courses.length;

                             return {

                                 SubjectID:i.SubjectID,

                                 SubjectName:i.SubjectName,

                                 checked,

                                 Courses

                             }

                         }else{

                             return {SubjectID:i.SubjectID,SubjectName:i.SubjectName,checked:false,Courses:[]};

                         }

                      });

                    setCourse(e=>({...e,list:dataSourse,checkList:checkCompare}));

                }

                setLoading(false);

            });

            setFirstLoad(false);

        }

    },[courseList]);

    //初始化

    useEffect(()=>{

        setCourse(data=>({...data,checkList:courseList}));

    },[courseList]);




    //drop发生变化

    const dropChange = (SubjectID) =>{

        const  list = courses.list.map(i=>{

            if (i.SubjectID===SubjectID){

                return {...i,drop:!i.drop};

            }else{

                return i;

            }

        });

        setCourse(e=>({...e,list}));

    };


    //选择课程

    const courseCheck = (e,SubjectID) => {

        const copyList = Array.from(courses.checkList);

        const findSubject = courses.list.find(i=>i.SubjectID===SubjectID);

        const findIndex = copyList.findIndex(i=>i.SubjectID===SubjectID);

        let subChecked = findSubject.Courses.length===e.length?true:false;

        copyList[findIndex].checked=subChecked;

        copyList[findIndex].Courses = e;

        setCourse(data=>({...data,checkList:copyList}));

    };

    const subCheck = (SubjectID) =>{

        const copyList = Array.from(courses.checkList);

        const checked = !copyList.find(i=>i.SubjectID===SubjectID).checked;

        const findIndex = copyList.findIndex(i=>i.SubjectID===SubjectID);

        let courseList = [];

        if (checked){

            courseList = courses.list.find(i=>i.SubjectID===SubjectID).Courses.map(item=>JSON.stringify({CourseNO:item.CourseNO,CourseName:item.CourseName}));

        }

        copyList[findIndex].checked= checked;

        copyList[findIndex].Courses = courseList;

        setCourse(data=>({...data,checkList:copyList}));

    };


    //js形式的动画

    const sliderEntering = (node,length) => {

        node.style.maxHeight = length>0?length*22+'px':'30px';

    };

    const sliderEntered = (node,length) => {

        node.style.maxHeight = length>0?length*22+'px':'30px';

    };


    //对外抛出属性

    useImperativeHandle(ref,()=>({

        checkList:courses.checkList

    }));

    return(

        <Loading ref={ref} spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"auto-select-course-content"}>



                {

                    courses.list.length>0?

                        <Scroll style={{height:340}} autoHide={false}>

                            {

                                courses.list.map((i,k)=>{

                                    const checkCourse = courses.checkList.find(it=>it.SubjectID===i.SubjectID).Courses;

                                    const checkedSub = courses.checkList.find(it=>it.SubjectID===i.SubjectID).checked;

                                    return(

                                        <div key={k} className={"subject-wrapper"}>

                                            <div className={"subject-row"}>

                                                <CheckBox checked={checkedSub} onChange={e=>subCheck(i.SubjectID)}>{i.SubjectName}</CheckBox>

                                                <CSSTransition

                                                    timeout={300}

                                                    in={i.drop}

                                                    classNames={'drop'}

                                                >

                                                    <i className={"trangle"} onClick={e=>dropChange(i.SubjectID)}></i>

                                                </CSSTransition>

                                            </div>

                                                <CSSTransition

                                                classNames={"slider"}

                                                in={i.drop}

                                                timeout={300}

                                                onEntering={node=>sliderEntering(node,i.Courses.length)}

                                                onEntered={node=>sliderEntered(node,i.Courses.length)}

                                            >

                                                <div className={"item-wrapper"}>

                                                    {

                                                        i.Courses&&i.Courses.length>0?

                                                            <CheckBoxGroup value={checkCourse} onChange={e=>courseCheck(e,i.SubjectID)}>

                                                                {

                                                                    i.Courses.map((item,key)=>{

                                                                        return <div key={key} className={"course-wrapper"}>

                                                                            <CheckBox value={JSON.stringify({CourseNO:item.CourseNO,CourseName:item.CourseName})}>{item.CourseName}</CheckBox>

                                                                        </div>

                                                                    })

                                                                }

                                                            </CheckBoxGroup>

                                                            :

                                                            <div className={"course-empty"} style={{color:'#999999'}}>该学科下暂无必修课程</div>

                                                    }



                                                </div>

                                            </CSSTransition>

                                        </div>

                                    )

                                })

                            }

                        </Scroll>

                        :

                        <Empty type={"2"} title={"没有必修课程数据"}></Empty>

                }

            </div>

        </Loading>

    )

}

export default memo(forwardRef(SelectCourseModal));