import React,{memo,useState,useEffect,useRef,forwardRef,useImperativeHandle} from 'react';


import { Loading,DropDown,Tips } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Teacher/AdjustByTeacherActions";

import { DatePicker,ConfigProvider,Button } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

import SelectNotBusyRoom from '../../component/SelectNotBusyRoom';

import {useStateValue} from '../../actions/hooks';

import {showNotBusyRoomModal,hideNotBusyRoomModal} from '../../reducers/NotBusyRoomModal';

import apiActions from '../../actions/ApiActions';

import appAlert from '../../actions/AppAlertActions';

moment.locale('zh-cn');



function ChangeTime(props,ref){



    //教室选择
    const [classRoomSelectd,setClassRoomSelectd] = useState({

        classRoomID:'',classRoomName:'',tipShow:false,isUsed:false

    });


    //新日期
    const [newDate,setNewDate] = useState({

        date:'',

        tipShow:false,

        disabled:true

    });


    //新的课时选择
    const [newClassHour,setNewClassHour] = useState({

        dropSelectd:{value:'',title:'请选择节次'},

        tipShow:false,

        disabled:true

    });


    //weekDay

    const [weekDay,setWeekDay] = useState({

        weekNO:'',

        weekDay:'',

        classHour:''

    });


    const {dispatch,changeTime,ClassRoomTypeList,LoginUser,ClassHourList}  = props;

    const {originDate, oldClassHourDrop, oldClassHourList, oldClassHourDisabled, oldWeek, oldWeekLoading,oldClassRoomList, newClassHourDrop, newClassHourList, newClassHourDisabled, newWeek, newWeekLoading, newClassRoomDrop, newClassRoomList, newClassRoomDisabled, errorTips, teacherTips, originDateTips, originScheduleTips, targetDateTips, targetScheduleTips, targetClassRoomTips} = changeTime;

    const {SchoolID,UserID,UserType} = LoginUser;






    //ref

    const newDateRef = useStateValue(newDate);

    const newClassHourRef = useStateValue(newClassHour);

    const notBusyRef = useRef();


    useEffect(()=>{

        setClassRoomSelectd(e=>({...e,classRoomID:newClassRoomDrop.value!=='none'?newClassRoomDrop.value:'',classRoomName:newClassRoomDrop.value!=='none'?newClassRoomDrop.title:''}));

    },[newClassRoomDrop]);


    const newDateInit = () =>{

        setNewDate(d=>({...d,date:'',tipShow:false, disabled:true}));

    };

    const newClassHourInit = () =>{

        //新的课时选择
        setNewClassHour(d=>({...d,dropSelectd:{value:'',title:'请选择节次'}, tipShow:false, disabled:true}));

    };

    const classRoomInit = () =>{

        //新的课时选择
        setClassRoomSelectd(d=>({...d,classRoomID:'',classRoomName:'',tipShow:false,isUsed:false}));

    };

    const weekDayInit = ()=>{

        setWeekDay({

            weekNO:'',

            weekDay:'',

            classHour:''

        });

    };



    //旧日期更改

    const originTimeChange = (date,dateString) =>{

        dispatch(ABTActions.changeTimeOriginDate(dateString));

        dispatch({type:ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:'originDate'}});

        newDateInit();

        newClassHourInit();

        classRoomInit();

        weekDayInit();

    };
    //旧课时选取
    const oldClassHourPick = (info) =>{

        dispatch(ABTActions.changTimeOldClassHourPick(info));

        dispatch({type:ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:'originSchedule'}})

        newDateInit();

        setClassRoomSelectd(d=>({...d,classRoomID:newClassRoomDrop.value,classRoomName:newClassRoomDrop.title,isUsed:false}));

        weekDayInit();

        newClassHourInit();

        console.log(info);

        if (info.value!=='none'&&info.value){

            setNewDate(d=>({...d,disabled:false}));

        }else{

            setNewDate(d=>({...d,disabled:true}));

        }

    };

    const dateDisabled = (current) =>{

        return  dispatch(utils.DateDisabled(current));

    };

    //新日期选取

    const newTimeChange = (date,dateString) => {

        /*dispatch(ABTActions.changeTimeNewTimeChange(dateString));

        dispatch({type:ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:'targetDate'}});*/

        if (dateString){

            apiActions.GetWeekInfoByDate({SchoolID,ClassDate:dateString,dispatch}).then(data=>{

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    setWeekDay(d=>({...d,weekNO:WeekNO,weekDay:WeekDay,classHour:''}));

                    let ClassHour = ClassHourList.map(item => {

                        let title = '';

                        switch (item.Type) {


                            case 1:

                                title = '上午';

                                break;

                            case 2:

                                title = '下午';

                                break;

                            case 3:

                                title = '晚上';

                                break;

                            default:

                                title = ''

                        }

                        let titleWrapper = <span title={`第${item.ID}节 (${title})`}>第{item.ID}节 <span className="noon">({title})</span></span>;

                        return {

                            value:item.ID,

                            title:titleWrapper

                        }

                    });

                    dispatch({type:ABTActions.CHANGE_TIME_NEW_CHANGE,data:{type:"classHourListChange",value:ClassHour}});

                }

                setNewDate(d=>({...d,date:dateString,tipShow:false}));

                setNewClassHour(d=>({...d,disabled:false,dropSelectd:{value:'',title:'请选择节次'}}));

                setClassRoomSelectd(d=>({...d,tipShow:false,isUsed:false}));

            });

        }else{

            setWeekDay(d=>({...d,weekNO:'',weekDay:'',classHour:''}));

            setNewDate(d=>({...d,date:dateString,tipShow:false}));

            setNewClassHour(d=>({...d,disabled:true,dropSelectd:{value:'',title:'请选择节次'}}));

            setClassRoomSelectd(d=>({...d,tipShow:false,isUsed:false}));

        }




    };

    //新的课时选取

    const newClassHourPick = (info) =>{

        /*dispatch(ABTActions.changeTimeNewClassHourPick(info));

        dispatch({type:ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:'targetSchedule'}})*/

        setNewClassHour(d=>({...d,dropSelectd:info,tipShow:false}));

        setWeekDay(d=>({...d,classHour:info.title}));

        apiActions.ClassRoomIsUseded({ClassRoomID:newClassRoomDrop.value,ClassDate:newDateRef.current.date,ClassHourNO:info.value,dispatch}).then(data=>{

            const used = data&&data.Useded;

            setClassRoomSelectd(d=>({...d,isUsed:used,tipShow:false}));

        });

    };

    //新的教室变化

    const newClassRoomChange = (info) => {

        dispatch(ABTActions.changeTimeNewClassRoomPick(info));

        dispatch({type:ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:'targetClassRoom'}})

    };



    const showModal = () =>{

        dispatch(showNotBusyRoomModal());

    };


    const notBusyRoomOk = () =>{

        const { ClassRoomID,ClassRoomName } = notBusyRef.current;

        console.log(ClassRoomID,ClassRoomName);

        if (ClassRoomID&&ClassRoomName){

            setClassRoomSelectd(e=>({...e,tipShow:false,classRoomID:ClassRoomID,classRoomName:ClassRoomName}));

            dispatch(hideNotBusyRoomModal());

        }else{

            dispatch(appAlert.alertWarn({title:'请选择教室'}));

        }

    };


    useImperativeHandle(ref,()=>({

        newDate:newDate.date,

        newClassHour:newClassHour.dropSelectd.value,

        classRoomID:classRoomSelectd.isUsed?(classRoomSelectd.classRoomID===newClassRoomDrop.value?'':(classRoomSelectd.classRoomID!=='none'?classRoomSelectd.classRoomID:'')):(newClassRoomDrop.value!=='none'?newClassRoomDrop.value:''),

        isSameDay:originDate===newDate.date&&(oldClassHourList.length>0&&oldClassHourList.find(i=>i.value===oldClassHourDrop.value)?(oldClassHourList.find(i=>i.value===oldClassHourDrop.value).no?oldClassHourList.find(i=>i.value===oldClassHourDrop.value).no:''):'')===newClassHour.dropSelectd.value,

        showDateTip:()=>setNewDate(d=>({...d,tipShow:true})),

        hideDateTip:()=>setNewDate(d=>({...d,tipShow:false})),

        showClassHourTip:()=>setNewClassHour(d=>({...d,tipShow:true})),

        hideClassHourTip:()=>setNewClassHour(d=>({...d,tipShow:false})),

        showClassRoomTip:()=>setClassRoomSelectd(d=>({...d,tipShow:true})),

        hideClassRoomTip:()=>setClassRoomSelectd(d=>({...d,tipShow:false})),

    }));

    return (

        <>

            <div className="change-time-wrapper clearfix" ref={ref}>

                <div className="old-time-wrapper clearfix" style={{marginLeft:0,marginTop:12}}>

                    <span className="props">时间:</span>

                    <div className="content-wrapper">

                        <ConfigProvider locale={zhCN}>

                            <Tips visible={originDateTips} title="请选择日期">

                                <DatePicker disabledDate={dateDisabled} value={originDate?moment(originDate):null} onChange={originTimeChange}></DatePicker>

                            </Tips>

                        </ConfigProvider>


                        <Tips  visible={originScheduleTips} title="请选择节次">

                        <DropDown width={146}
                                  height={300}
                                  style={{zIndex:4}}
                                  dropSelectd={oldClassHourDrop}
                                  dropList={oldClassHourList}
                                  disabled={oldClassHourDisabled}
                                  onChange={oldClassHourPick}>

                        </DropDown>

                        </Tips>

                        <div className="week-wrapper">{oldWeek.WeekNO?`第${oldWeek.WeekNO}周`:''} {oldWeek.WeekDay} { oldWeek.ClassHour }</div>


                    </div>

                </div>

                <div className="new-time-wrapper clearfix" style={{marginTop:12}}>

                    <span className="props">时间:</span>

                    <div className="content-wrapper">

                        <ConfigProvider locale={zhCN}>

                            <Tips visible={newDate.tipShow} title="请选择时间">

                                <DatePicker disabled={newDate.disabled} disabledDate={dateDisabled} value={newDate.date?moment(newDate.date):null} onChange={newTimeChange}></DatePicker>

                            </Tips>

                        </ConfigProvider>

                        <Tips visible={newClassHour.tipShow} title="请选择节次">

                        <DropDown width={146}
                                  height={300}
                                  style={{zIndex:4}}
                                 /* dropSelectd={newClassHourDrop}
                                  dropList={newClassHourList}
                                  disabled={newClassHourDisabled}*/

                                  dropSelectd={newClassHour.dropSelectd}
                                  dropList={newClassHourList}
                                  disabled={newClassHour.disabled}

                                  onChange={newClassHourPick}
                                    >

                        </DropDown>

                        </Tips>

                        {/*<div className="week-wrapper">{newWeek.WeekNO?`第${newWeek.WeekNO}周`:''} {newWeek.WeekDay} {newWeek.ClassHour}</div>*/}

                        <div className="week-wrapper">{weekDay.weekNO?`第${weekDay.weekNO}周`:''} {weekDay.weekDay} {weekDay.classHour}</div>


                      {/*  <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={targetClassRoomTips} title="请选择教室">

                        <DropDown width={146}
                                  height={300}
                                  style={{zIndex:2,marginLeft:'-8px',
                                      marginTop:'8px'}}
                                  // dropSelectd={newClassRoomDrop}
                                  // dropList={newClassRoomList}
                                  // disabled={newClassRoomDisabled}

                                  dropSelectd={newClassHour.dropSelectd}
                                  dropList={newClassHourList}
                                  disabled={newClassHour.disabled}
                                  onChange={ newClassRoomChange}  >

                        </DropDown>

                        </Tooltip>


                        <div className="error-tips" style={{display:`${errorTips?'block':'none'}`}}>该教室已被占用</div>
*/}


                    </div>

                    {/*<span className="props">新的教室:</span>*/}

                    {

                        classRoomSelectd.isUsed?

                            <div className={"new-class-room"}>

                                <span className="title" style={{marginRight:classRoomSelectd.classRoomName?14:0}}>新的教室:</span>

                                <Tips visible={classRoomSelectd.tipShow} title="请选择新的教室">

                                    {

                                        classRoomSelectd.classRoomName?

                                            <div>{classRoomSelectd.classRoomName}</div>

                                            :''

                                    }

                                    <Button type={'link'} onClick={showModal}>选择新的教室</Button>

                                </Tips>

                                {/*<DropDown width={146}
                                        height={200}
                                        style={{zIndex:2,right:0,top:62}}
                                        dropSelectd={newClassRoomDrop}
                                        dropList={newClassRoomList}
                                        disabled={newClassRoomDisabled}
                                        onChange={ this.newClassRoomChange.bind(this)}
                                        ></DropDown>

                                        <div className="error-tips" style={{display:`${errorTips?'block':'none'}`}}>该教室已被占用</div>
    */}

                            </div>

                            :''

                    }


                </div>

                <div className="icon"></div>

            </div>

            <SelectNotBusyRoom

                ClassDate={newDate.date}

                ClassHourNO={newClassHour.dropSelectd.value}

                RoomTypeList={ClassRoomTypeList}

                ref={notBusyRef}

                notBusyRoomOk={notBusyRoomOk}

                OriginClassRoomName={classRoomSelectd.classRoomName}

                OriginClassRoomID={classRoomSelectd.classRoomID}>

            </SelectNotBusyRoom>

        </>

    );

}


const mapStateToProps = (state) => {

    const { teacherList,changeTime,ClassHourList,ClassRoomTypeList } = state.Teacher.AdjustByTeacherModal;

    const { LoginUser } = state;

    return {

        changeTime,

        teacherList,

        ClassHourList,

        ClassRoomTypeList,

        LoginUser

    }

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(ChangeTime)));