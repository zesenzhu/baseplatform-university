import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import CourseStatistics from '../../../component/CourseStatistics';

import {Loading} from "../../../../../common";

import ShowCard from '../../../component/ShowCard';

import {changeBreadCrumb} from '../../../reducers/breadCrumb';

import {GetCouseclassSumarryOne_University} from "../../../actions/apiActions";

import {subjectDataChange} from "../../../reducers/previewData";

import history from '../../history';


function SubjectCourse(props) {


    //state
    const [loading,setLoading] = useState(true);

    const [firstLoad,setFirstLoad] = useState(true);

    const [courseData,setCourse] = useState([]);

    const [title,setTitle] = useState('教学班信息总览');

    //props

    const { dispatch,LoginUser,leftMenu,previewData,breadCrumb,commonSetting } = props;

    const { SchoolID } = LoginUser;

    const {subjects} = previewData;

    const { course } = subjects;

    //初始化
    useEffect(()=>{

        /*if (breadCrumb.step===2&&firstLoad){

            setFirstLoad(false);*/

            if (commonSetting.firstLoad){

                history.push('/manager');

            }else{

                const { id } = breadCrumb.subject.activeSub;

                setTitle(breadCrumb.subject.activeSub.name);
                //设置title
                GetCouseclassSumarryOne_University({schoolID:SchoolID,type:2,objectID:id,dispatch}).then(data=>{

                    if (data){

                        dispatch(subjectDataChange({course:data}));

                        const courseData = data.Item?data.Item.map(i=>({...i,pathname:`/manager/subject/${breadCrumb.subject.activeSub.id}/${i.ObjectID}`})):[];

                        setCourse(courseData);

                    }

                    setLoading(false);

                });

                window.updateSubjectCourseList = updateSubjectCourseList;

            }



      /*  }*/

    },[]);


    const updateSubjectCourseList = ()=>{

        const { id } = breadCrumb.subject.activeSub;

        setTitle(breadCrumb.subject.activeSub.name);
        //设置title
        GetCouseclassSumarryOne_University({schoolID:SchoolID,type:2,objectID:id,dispatch}).then(data=>{

            if (data){

                dispatch(subjectDataChange({course:data}));

                const courseData = data.Item?data.Item.map(i=>({...i,pathname:`/manager/subject/${breadCrumb.subject.activeSub.id}/${i.ObjectID}`})):[];

                setCourse(courseData);

            }

            setLoading(false);

        });


    };


    //点击跳转事件

    const clickSubject = (item) =>{

        dispatch(changeBreadCrumb({step:3,subject:{...breadCrumb.subject,activeCourse:{id:item.ObjectID,name:item.ObjectName,majorIDs:item.MajorIDs?item.MajorIDs:''}}}));

    };


    return(

        <Loading tip={"加载中,请稍候..."} spinning={loading}>

            <CourseStatistics

                title={title}

                courseStaticsShow={true}

                courseStatics={{

                    course:course.CourseCount,

                    courseClass:course.CourseClassCount,

                    teacher:course.TeacherCount,

                    student:course.StudentCount

                }}>

            </CourseStatistics>

            <ShowCard

                data={courseData}

                empTitle={'该学科下暂无课程信息'}

                clickLink={clickSubject}

            >

            </ShowCard>

        </Loading>
    )

}

const mapStateToProps = (state) =>{

    const { DataState,leftMenu,previewData,breadCrumb,commonSetting} = state;

    const { LoginUser } = DataState;

    return {

        LoginUser,

        leftMenu,

        previewData,

        breadCrumb,

        commonSetting

    }


};

export default connect(mapStateToProps)(memo(SubjectCourse));