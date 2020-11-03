import React,{useCallback,useEffect,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {checkUrlAndPostMsg} from "../../../../common/js/public";

import config from '../../../../common/js/config';

function AdjustBtnsWrapper(props){

        const {

            addScheduleModalShow,

            adjustByTimeModalShow,stopScheduleShow,delScheduleShow,

            adjustByTeacherShow,Import,ScheduleSettingShow,adjustByClassRoomShow,

            Intellenct,IntellenctUrl,isCollegeManager

        } = props;

        const lookAdjustLog = useCallback(()=>{

            const url = config.HashPrevProxy+location.pathname+'#/manager/adjustlog'+location.search;

            checkUrlAndPostMsg({btnName:'查看调课日志',url});

        },[]);

        return (

            <div className="adjust-schedule-wrapper">

                {

                    !isCollegeManager?

                        <>

                            <span className="schedule-setting" onClick={()=>ScheduleSettingShow()}>课程表设置</span>

                            {

                                IntellenctUrl?

                                    <span className="enter-schedule">

                                        <span>录入课程安排</span>

                                        <div className="import-list-wrapper" id="import-list-wrapper" >

                                            <div className="import-schedule" onClick={()=>Import()}><span>导入课表</span></div>

                                            <div className="intellenct-schedule" onClick={()=>Intellenct()}><span>智能排课</span></div>

                                        </div>

                                    </span>

                                    :

                                    <span className="import-schedule single" onClick={()=>Import()}>导入课表</span>

                            }

                            <span className="adjust-schedule" id="adjust-schedule"  >

                    <span>调整课程安排</span>

                    <div className="adjust-list-wrapper" id="adjust-list-wrapper" >

                        <div className="add-schedule" onClick={()=>{addScheduleModalShow();}}><span>添加临时课程</span></div>

                        <div className="adjust-by-teacher" onClick={()=>adjustByTeacherShow()}><span>按老师调整</span></div>

                        <div className="adjust-by-time" onClick={()=>{adjustByTimeModalShow();}}><span>按时间调整</span></div>

                        <div className="adjust-by-classroom" onClick={()=>{adjustByClassRoomShow()}}><span>按教室调整</span></div>

                        <div className="stop-schedule" onClick={()=>{stopScheduleShow();}}><span>停课</span></div>

                        <div className="delete-schedule" onClick={()=>{delScheduleShow();}}><span>删除课程</span></div>

                    </div>

                </span>

                            <span className="see-adjust-log" onClick={lookAdjustLog}>查看调课日志</span>

                        </>

                        :

                        <>


                            {

                                IntellenctUrl?

                                    <span className="enter-schedule">

                                        <span>录入课程安排</span>

                                        <div className="import-list-wrapper" id="import-list-wrapper" >

                                            <div className="import-schedule" onClick={()=>Import()}><span>导入课表</span></div>

                                            <div className="intellenct-schedule" onClick={()=>Intellenct()}><span>智能排课</span></div>

                                        </div>

                                    </span>

                                    :

                                    <span className="import-schedule single" onClick={()=>Import()}>导入课表</span>

                            }

                            <span className="see-adjust-log" onClick={lookAdjustLog}>查看调课日志</span>

                        </>

                }


            </div>

        );



}

export default AdjustBtnsWrapper;