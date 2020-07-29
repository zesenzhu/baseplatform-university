import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import CourseStatistics from '../../../component/CourseStatistics';

import {Loading} from "../../../../../common";

import ShowCard from '../../../component/ShowCard';

import {changeBreadCrumb} from '../../../reducers/breadCrumb';

import {leftMenuListUpdate} from "../../../reducers/leftMenu";

import {subjectDataChange} from "../../../reducers/previewData";

import {GetCouseclassSumarry_University} from "../../../actions/apiActions";

import actions from '../../../actions';


function All(props) {


    //state
    const [loading,setLoading] = useState(true);

    const [firstLoad,setFirstLoad] = useState(true);

    const [courseData,setCourse] = useState([]);

    //props

    const { dispatch,LoginUser,leftMenu,previewData,breadCrumb } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    const {subjects} = previewData;

    const { sub } = subjects;


    //初始化
    /*useEffect(()=>{

        if (leftMenu.length>0&&Object.keys(sub).length>0){

            const { Item } =sub;

            const newItem = Item.map(i=>({...i,pathname:`/manager/subject/${i.ObjectID}`}));

            setCourse(newItem);

            setLoading(false);

        }

    },[leftMenu,sub]);*/


    useEffect(()=>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:2,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                const routers = data.Item?data.Item.map(i=>({link:`/manager/subject/${i.ObjectID}`,name:`${i.ObjectName}教学班`,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/subject/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(leftMenuListUpdate(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:`${i.ObjectName}教学班`})):[];

                dispatch(subjectDataChange({sub:data}));


                const { Item } =data;

                const newItem = Item.map(i=>({...i,pathname:`/manager/subject/${i.ObjectID}`}));

                setCourse(newItem);

                setLoading(false);

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});

                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        });

        window.updateSubjectList = updateSubjectList;

    },[]);


    const updateSubjectList = ()=>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:2,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                const routers = data.Item?data.Item.map(i=>({link:`/manager/subject/${i.ObjectID}`,name:`${i.ObjectName}教学班`,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/subject/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(leftMenuListUpdate(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:`${i.ObjectName}教学班`})):[];

                dispatch(subjectDataChange({sub:data}));

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});

                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        })

    };


    //事件

    const clickSubject = (item) =>{

        dispatch(changeBreadCrumb({step:2,subject:{...breadCrumb.subject,activeSub:{id:item.ObjectID,name:item.ObjectName}}}));

    };


    return(

        <Loading tip={"加载中,请稍候..."} spinning={loading}>

            <CourseStatistics

                title={"教学班信息总览"}

                courseStaticsShow={true}

                courseStatics={{

                    course:sub.CourseCount,

                    courseClass:sub.CourseClassCount,

                    teacher:sub.TeacherCount,

                    student:sub.StudentCount

                }}>

            </CourseStatistics>

            <ShowCard

            data={courseData}

            empTitle={'暂无学科信息'}

            clickLink={clickSubject}

            >

            </ShowCard>

        </Loading>
    )

}

const mapStateToProps = (state) =>{

    const { DataState,leftMenu,previewData,breadCrumb } = state;

    const { LoginUser } = DataState;

    return {

        LoginUser,

        leftMenu,

        previewData,

        breadCrumb

    }


};

export default connect(mapStateToProps)(memo(All));