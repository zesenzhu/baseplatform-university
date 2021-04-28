import React,{useMemo,memo,useState,useCallback,useEffect} from 'react';

import { Button } from "../../../../common";

import {getQueryVariable} from "../../../../common/js/disconnect";

import {useSelector} from 'react-redux';

function TopButtons(props){

    const [aiPractice,setAiPractice] = useState(false);

    const {frames} = useSelector(state=>state);


    const { Power } = props;

    const {AdjustScheduleShow,AddTempScheduleShow,Import} = props;

    const {iFrame} = frames;

    useEffect(()=>{

        if (getQueryVariable('aiPractice')){

            setAiPractice(true);

        }

    },[]);

    console.log(iFrame);

        return (

            <div className={`teacher-top-btns ${aiPractice?'aiPractice':''} clearfix`}>

                {

                    Power.Adjust?

                        <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AdjustScheduleShow()}>调整课表</Button>

                        :''

                }

                {

                    Power.AddImport?

                        <React.Fragment>

                            {

                                // !iFrame?

                                    <Button color="blue" className="teacher-btn import-schedule" onClick={()=>Import()}>导入课程安排</Button>

                                    // :null

                            }

                            <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AddTempScheduleShow()}>添加临时课程</Button>

                        </React.Fragment>

                        :''


                }


            </div>

        );

}

export default memo(TopButtons);