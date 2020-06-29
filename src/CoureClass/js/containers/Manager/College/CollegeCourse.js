import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import CourseStatistics from '../../../component/CourseStatistics';

import {Loading} from "../../../../../common";

import ShowCard from '../../../component/ShowCard';

import {changeBreadCrumb} from '../../../reducers/breadCrumb';

import {GetCouseclassSumarryOne_University} from "../../../actions/apiActions";

import {collegeDataChange} from "../../../reducers/previewData";

import history from "../../history";


function CollegeCourse(props) {


    //state
    const [loading,setLoading] = useState(true);

    const [firstLoad,setFirstLoad] = useState(true);

    const [courseData,setCourse] = useState([]);

    const [title,setTitle] = useState('教学班信息总览');

    //props

    const { dispatch,LoginUser,leftMenu,previewData,breadCrumb,commonSetting } = props;

    const { SchoolID } = LoginUser;

    const {colleges} = previewData;


    //初始化
    useEffect(()=>{

        if (commonSetting.firstLoad){

            history.push('/manager/college/all');

        }else if (breadCrumb.step===2&&firstLoad){

            const { id } = breadCrumb.college.activeCollege;

            setTitle(breadCrumb.college.activeCollege.name);
            //设置title

            GetCouseclassSumarryOne_University({schoolID:SchoolID,type:1,objectID:id,dispatch}).then(data=>{

                if (data){

                    dispatch(collegeDataChange({colleges:data}));

                    const courseData = data.Item?data.Item.map(i=>({...i,pathname:`/manager/college/${breadCrumb.college.activeCollege.id}/${i.ObjectID}`})):[];

                    setCourse(courseData);

                }

                setLoading(false);

                setFirstLoad(false);

            });

            window.updateCollegeCourseList = updateCollegeCourseList;

        }

    },[]);


    //点击跳转事件

    const clickSubject = (item) =>{

        dispatch(changeBreadCrumb({step:3,college:{...breadCrumb.college,activeCourse:{id:item.ObjectID,name:item.ObjectName,majorIDs:item.MajorIDs?item.MajorIDs:''}}}));

    };


    const updateCollegeCourseList = () =>{

        const { id } = breadCrumb.college.activeCollege;

        setTitle(breadCrumb.college.activeCollege.name);
        //设置title

        GetCouseclassSumarryOne_University({schoolID:SchoolID,type:1,objectID:id,dispatch}).then(data=>{

            if (data){

                dispatch(collegeDataChange({colleges:data}));

                const courseData = data.Item?data.Item.map(i=>({...i,pathname:`/manager/college/${breadCrumb.college.activeCollege.id}/${i.ObjectID}`})):[];

                setCourse(courseData);

            }

            setLoading(false);

            setFirstLoad(false);

        });


    };


    return(

        <Loading tip={"加载中,请稍候..."} spinning={loading}>

            <CourseStatistics

                title={title}

                courseStaticsShow={true}

                courseStatics={{

                    course:colleges.colleges?colleges.colleges.CourseCount:0,

                    courseClass:colleges.colleges?colleges.colleges.CourseClassCount:0,

                    teacher:colleges.colleges?colleges.colleges.TeacherCount:0,

                    student:colleges.colleges?colleges.colleges.StudentCount:0

                }}>

            </CourseStatistics>

            <ShowCard

                data={courseData}

                empTitle={'该学院下暂无课程信息'}

                clickLink={clickSubject}

            >

            </ShowCard>

        </Loading>
    )

}

const mapStateToProps = (state) =>{

    const { DataState,leftMenu,previewData,breadCrumb,commonSetting } = state;

    const { LoginUser } = DataState;

    return {

        LoginUser,

        leftMenu,

        previewData,

        breadCrumb,

        commonSetting

    }


};

export default connect(mapStateToProps)(memo(CollegeCourse));