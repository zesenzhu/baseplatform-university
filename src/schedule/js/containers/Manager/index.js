import React,{useMemo,useCallback,useState,useRef,useEffect,memo} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import SubjectTeacher from './SubjectTeacher';

import ClassTotalSingle from './ClassTotalSingle';

import ClassRoomTotalSingle from './ClassRoomTotalSingle';

import AdjustByTeacherModal from "./AdjustByTeacherModal";

import AdjustByClassRoom from "./AdjustByClassRoom";

import {useSelector,useDispatch} from 'react-redux';



function Index(){


    const {LoginUser,productType} = useSelector(state=>state);



    const HeaderLinkList = useMemo(()=>{

        if (productType===6){

            return [

                {link:"/manager/class",name:"班级课表",logo:"class"},

                {link:"/manager/room",name:"教室课表",logo:"classroom"},

            ];

        }else{

            return [

                {link:"/manager/subject-teacher",name:"学科教师课表",logo:"subject"},

                {link:"/manager/class",name:"班级课表",logo:"class"},

                {link:"/manager/room",name:"教室课表",logo:"classroom"},

            ];

        }



    },[LoginUser.UserID,productType]);

    return (

        <React.Fragment>
            {/*头部的路由选项卡*/}

            <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
           {/* 泡泡型标签链接按钮*/}

            <Router>

                <Switch>

                    <Route path="/manager/subject-teacher/*" component={SubjectTeacher}></Route>

                    <Redirect path="/manager/subject-teacher*" to={{pathname:"/manager/subject-teacher/subject"}}></Redirect>

                    <Route exact path="/manager/class/*" component={ClassTotalSingle}></Route>

                    <Redirect path="/manager/class*" to={{pathname:"/manager/class/total"}}></Redirect>

                    <Route path="/manager/room/*" component={ClassRoomTotalSingle}></Route>

                    <Redirect path="/manager/room*" to={{pathname:"/manager/room/total"}}></Redirect>


                </Switch>

            </Router>

            <AdjustByTeacherModal></AdjustByTeacherModal>

            <AdjustByClassRoom></AdjustByClassRoom>

        </React.Fragment>

    );


}



export default memo(Index);