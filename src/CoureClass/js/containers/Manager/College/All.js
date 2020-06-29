import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import CourseStatistics from '../../../component/CourseStatistics';

import {Loading} from "../../../../../common";

import ShowCard from '../../../component/ShowCard';

import {changeBreadCrumb} from '../../../reducers/breadCrumb';

import {GetCouseclassSumarry_University} from "../../../actions/apiActions";


import {menuRouterInit} from "../../../reducers/leftMenu";

import {collegeDataChange} from "../../../reducers/previewData";

import actions from "../../../actions";


function All(props) {


    //state
    const [loading,setLoading] = useState(true);

    const [firstLoad,setFirstLoad] = useState(true);

    const [courseData,setCourse] = useState([]);

    //props

    const { dispatch,LoginUser,leftMenu,previewData,breadCrumb } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    const {colleges} = previewData;

    const { college } = colleges;


    //初始化
   /* useEffect(()=>{

        if (leftMenu.length>0&&Object.keys(college).length>0){

            const { Item } = college;

            const newItem = Item.map(i=>({...i,pathname:`/manager/college/${i.ObjectID}`}));

            setCourse(newItem);

            setLoading(false);

        }

    },[leftMenu,college]);*/


   useEffect(()=>{

       GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:1,dispatch}).then(data=>{

           if (data){

               const { LastLogCount } = data;

               const routers = data.Item?data.Item.map(i=>({link:`/manager/college/${i.ObjectID}`,name:i.ObjectName,menu:'menu20',id:i.ObjectID})):[];

               routers.unshift({link:'/manager/college/all',name:'教学班信息总览',menu:'menu10',id:'all'});

               dispatch(menuRouterInit(routers));

               data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:i.ObjectName})):[];

               dispatch(collegeDataChange({college:data}));

               const { Item } = data;

               const newItem = Item.map(i=>({...i,pathname:`/manager/college/${i.ObjectID}`}));

               setCourse(newItem);

               setLoading(false);

               dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});

               dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

           }

       });

       window.updateCollegeList =updateCollegeList;

   },[]);



    const updateCollegeList = () =>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:1,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                const routers = data.Item?data.Item.map(i=>({link:`/manager/college/${i.ObjectID}`,name:i.ObjectName,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/college/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(menuRouterInit(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:i.ObjectName})):[];

                dispatch(collegeDataChange({college:data}));

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});


                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        })


    };


    //事件

    const clickSubject = (item) =>{

        dispatch(changeBreadCrumb({step:2,college:{...breadCrumb.college,activeCollege:{id:item.ObjectID,name:item.ObjectName}}}));

    };


    return(

        <Loading tip={"加载中,请稍候..."} spinning={loading}>

            <CourseStatistics

                title={"教学班信息总览"}

                courseStaticsShow={true}

                courseStatics={{

                    course:college.CourseCount,

                    courseClass:college.CourseClassCount,

                    teacher:college.TeacherCount,

                    student:college.StudentCount

                }}>

            </CourseStatistics>

            <ShowCard

            data={courseData}

            empTitle={'暂无学院信息'}

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