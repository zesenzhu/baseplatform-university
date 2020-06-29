import React,{useState,useEffect,memo} from 'react';

import Aniamtion from "../../../common/js/Aniamtion";

function CourseStatistics(props) {

    const { title,courseStaticsShow,courseStatics } =props;

    const { course=0,teacher=0,courseClass=0,student=0 } = courseStatics;

    return(

        <div className="All">
            <div className="All-box">
                <div className="All-top">
            <span className="top-tips">
              <span className="tips menu10">{title}</span>
            </span>
                </div>
                <div className="All-hr"></div>
                <div className="All-content">
                    <div className="content-All-box">

                        {

                            courseStaticsShow?

                                <div className="all All-course">

                                    <Aniamtion.WaveRound
                                        background={'#aaacdf'}
                                        num={course}
                                    ></Aniamtion.WaveRound>

                                    <span className="all-tips">课程数量</span>

                                </div>

                                :''

                        }

                        <div className="all All-courseClass">

                            <Aniamtion.WaveRound
                                background={'#1ca222'}
                                num={courseClass}>

                            </Aniamtion.WaveRound>

                            <span className="all-tips">教学班数量</span>

                        </div>

                        <div className="all All-teacher">

                            <Aniamtion.WaveRound
                                background={'#ff7e00'}
                                num={teacher}>

                            </Aniamtion.WaveRound>

                            <span className="all-tips">任课教师数量</span>

                        </div>

                        <div className="all All-subject">
                            <Aniamtion.WaveRound
                                background={'#1790e5'}
                                num={student}>

                            </Aniamtion.WaveRound>

                            <span className="all-tips">学生人数</span>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )

}

export default memo(CourseStatistics);