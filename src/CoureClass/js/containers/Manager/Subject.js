import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';

import All from './Subject/All';

import SubjectCourse from './Subject/SubjectCourse';

import CourseClass from './CourseClass';

import {GetCouseclassSumarry_University} from "../../actions/apiActions";

import {leftMenuListUpdate} from "../../reducers/leftMenu";

import {subjectDataChange} from "../../reducers/previewData";

import history from '../history';

import actions from '../../actions';


function Subject(props) {

    const { LoginUser,dispatch,leftMenu } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    /*useEffect(()=>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:2,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                const routers = data.Item?data.Item.map(i=>({link:`/manager/subject/${i.ObjectID}`,name:`${i.ObjectName}教学班`,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/subject/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(menuRouterInit(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:`${i.ObjectName}教学班`})):[];

                dispatch(subjectDataChange({sub:data}));

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});

                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        });

        window.updateSubjectList = updateSubjectList;

    },[]);*/

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


    return(

        <Router key={"subject"}>

            <Switch>

                <Route key={"all"} exact path={'/manager/subject/all'} component={All}></Route>

                <Route key={location.href} exact path={'/manager/subject/:subjectID'} component={SubjectCourse}></Route>

                <Route key={location.href} path={'/manager/subject/:subjectID/:courseID'} component={CourseClass}></Route>

                <Redirect path={'/manager/subject*'} to={'/manager/subject/all'}></Redirect>

            </Switch>

        </Router>

    )

}

const mapStateToProps = (state) =>{

    const { DataState,leftMenu } = state;

    const {LoginUser} = DataState;

    return{

        LoginUser,

        leftMenu

    }

};

export default connect(mapStateToProps)(memo(Subject));