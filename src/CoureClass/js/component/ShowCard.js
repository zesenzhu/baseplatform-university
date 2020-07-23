import React,{memo} from 'react'

import { connect } from 'react-redux';

import '../../scss/ShowCard.scss'

import { HashRouter as Router,Route,NavLink } from 'react-router-dom';

import {Empty} from "../../../common";

function ShowCard(props){

    const {data,empTitle,clickLink} = props;

    return (

        <Router>

            <div className="content-subject-box">

                {

                    data&&data.length>0?data.map((i,k)=>{

                            return  <NavLink key={k} onClick={e=>clickLink(i)} className='ShowCard-box' to={{pathname:i.pathname}}>

                                <div className='box-3'></div>
                                <div className='box-2'></div>
                                <div className='box-main'>
                                    <div className='main-content'>
                                        <p title={i.ObjectName} className='content-tips'>{i.ObjectName}</p>
                                        <div className='content-hr' ></div>
                                        <div className='content-details'>
                                            {

                                                i.CourseCount?

                                                    <div className='details-row clearfix'>
                                                        <span className='left'>课程数量：</span>
                                                        <span className='right'>{i.CourseCount}个</span>
                                                    </div>

                                                    :''

                                            }

                                            <div className='details-row clearfix'>
                                                <span className='left'>教学班数量：</span>
                                                <span className='right'>{i.CourseClassCount}个</span>
                                            </div>
                                            <div className='details-row clearfix'>
                                                <span className='left'>任课教师数量：</span>
                                                <span className='right'>{i.TeacherCount}人</span>
                                            </div>
                                            <div className='details-row clearfix'>
                                                <span className='left'>学生数量：</span>
                                                <span className='right'>{i.StudentCount}人</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </NavLink>

                        })

                        :

                        <Empty type={"3"} title={empTitle}></Empty>

                }

            </div>

        </Router>

    )

}

export default memo(ShowCard);
