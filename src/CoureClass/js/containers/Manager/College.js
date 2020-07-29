import React,{useState,useEffect,memo} from 'react';

import { connect } from 'react-redux';

import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';

import All from './College/All';

import CollegeCourse from './College/CollegeCourse';

import CourseClass from './CourseClass';

import {GetCouseclassSumarry_University} from "../../actions/apiActions";

import {leftMenuListUpdate} from "../../reducers/leftMenu";

import {collegeDataChange} from "../../reducers/previewData";

import history from '../history';

import actions from "../../actions";

function College(props) {

    const { LoginUser,dispatch,leftMenu } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    useEffect(()=>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:1,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                console.log(data);

                const routers = data.Item?data.Item.map(i=>({link:`/manager/college/${i.ObjectID}`,name:i.ObjectName,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/college/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(leftMenuListUpdate(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:i.ObjectName})):[];

                dispatch(collegeDataChange({college:data}));

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});


                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        })

        window.updateCollegeList =updateCollegeList;

    },[]);


    const updateCollegeList = () =>{

        GetCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,type:1,dispatch}).then(data=>{

            if (data){

                const { LastLogCount } = data;

                console.log(data);

                const routers = data.Item?data.Item.map(i=>({link:`/manager/college/${i.ObjectID}`,name:i.ObjectName,menu:'menu20',id:i.ObjectID})):[];

                routers.unshift({link:'/manager/college/all',name:'教学班信息总览',menu:'menu10',id:'all'});

                dispatch(leftMenuListUpdate(routers));

                data.Item = data.Item?data.Item.map(i=>({...i,ObjectName:i.ObjectName})):[];

                dispatch(collegeDataChange({college:data}));

                dispatch({type:actions.UpDataState.GET_COURE_CLASS_ALL_MSG,data:{LastLogCount}});


                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }

        })


    };


    return(

        <Router key={"subject"}>

            <Switch>

                <Route key={"all"} exact path={'/manager/college/all'} component={All}></Route>

                <Route key={history.location.pathname} exact path={'/manager/college/:collegeID'} component={CollegeCourse}></Route>

                <Route key={history.location.pathname} exact path={'/manager/college/:collegeID/:courseID'} component={CourseClass}></Route>

                <Redirect path={'/manager/college*'} to={'/manager/college/all'}></Redirect>

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

export default connect(mapStateToProps)(memo(College));