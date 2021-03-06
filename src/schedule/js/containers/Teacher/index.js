import React,{useEffect,useMemo,memo,useState} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import TeacherPersonalSchedule from './TeacherPersonalSchedule'

import SubjectTeacher from './SubjectTeacher';

import ClassTotalStudent from "../Teacher/ClassTotalStudent";

import {useSelector,useDispatch} from 'react-redux';

import $ from 'jquery';

import {getQueryVariable} from "../../../../common/js/disconnect";



function Index(){

    const [HeaderLinkList,setHeaderLinkList] = useState();

    const {LoginUser,productType,frames} = useSelector(state=>state);

    const {UserType,UserClass,UserID } = LoginUser;

    const {iFrame} = frames;

    const dispatch = useDispatch();




    useEffect(()=>{

        if (UserID){

             if (productType!==6) {

                 if (parseInt(UserType) === 1) {

                     let UserClassType = UserClass[2];

                     if (UserClassType === '1') {

                         setHeaderLinkList([

                             {link: "/teacher/mine", name: "我的课表", logo: "mine"},

                             {link: "/teacher/subject-teacher", name: "学科教师课表", logo: "subject"},

                             {link: "/teacher/class/student", name: "学生课表", logo: "class"},

                         ]);

                     } else {

                         let list = [];

                         if (iFrame){

                            $('.frame-content-rightside').css({marginTop:0,borderTop:0});

                         }else{

                            list = [

                                {link: "/teacher/mine", name: "我的课表", logo: "mine"},

                                {link: "/teacher/subject-teacher", name: "学科教师课表", logo: "subject"},

                            ];

                         }

                         setHeaderLinkList(list);

                     }

                 } else {

                     window.location.href = '/Error.aspx?errcode=E011';

                 }

                if (getQueryVariable('isWorkPlantform')){

                    $('.frame-content-wrapper').css({marginTop:0});

                }

             }

        }

    },[UserID]);


        return (

            <React.Fragment>

                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
                {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route path="/teacher/subject-teacher/*" component={SubjectTeacher}></Route>

                        <Route path="/teacher/mine" component={TeacherPersonalSchedule}></Route>

                        <Route path="/teacher/class/*" component={ClassTotalStudent}></Route>

                        <Redirect path="/teacher/subject-teacher*" to={{pathname:"/teacher/subject-teacher/subject"}}></Redirect>

                        <Redirect path="/teacher/class*" to={{pathname:"/teacher/class/student"}}></Redirect>


                    </Switch>

                </Router>

            </React.Fragment>

        );

}



export default memo(Index);