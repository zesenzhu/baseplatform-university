import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Empty, Loading} from "../../../../common";

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CTActions from '../../actions/Manager/ClassTotalActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import $ from "jquery";

import SelfDoubleSingleTable from "../../component/selfDoubleSingleTable";

import SDActions from "../../actions/ScheduleDetailActions";

import {CSSTransition} from 'react-transition-group';

import WeekDayPick from '../../component/WeekDayPick';



class ClassTotal extends Component{

    constructor(props){

        super(props);

        this.state = {

            fullScreen:false

        };

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassTotalInit()));

    }


    //年级下拉改变

    GradeChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }



    //日期变化
    weekDateChange(date,week,weekDay){

        const {dispatch,ClassTotal} = this.props;

        dispatch({type:CTActions.MANAGER_CT_NOW_WEEK_NO_CHANGE,data:week});

        dispatch({type:CTActions.MANAGER_CT_NOW_WEEK_DAY_CHANGE,data:weekDay});

        dispatch({type:CTActions.MANAGER_CT_NOW_CLASS_DATE_CHANGE,data:date});

        // $('#tb').find('div.ant-table-body').scrollTop(0);

        this.tableRef.scrollToTop();

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        const {dispatch,ClassTotal} = this.props;

        const { ClassCount,PageIndex } = ClassTotal;

        if (PageIndex < Math.ceil(ClassCount/10)){

            dispatch(CTActions.ClassTotalPageUpdate({nextPage:true}));

        }

    }

    //表格点击某一行
    clickRow(record){

        const { ClassTotal,dispatch } = this.props;

        const { Schedule } = ClassTotal;

        let rID  = record.id;

        Schedule.map((item,key)=>{

            if (item.id === rID){

                Schedule[key]['active'] = true;

            }else{

                Schedule[key]['active'] = false;

            }

        });

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        /*dispatch(CTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const {NowWeekNO,ScheduleList} = ClassTotal;

        const { ClassID } = Params;

        let FindPage = 1;

        ScheduleList.map((item,key)=>{

            let FindIndex = item.findIndex(i=>i.id===ClassID);

            if(FindIndex>=0){

                FindPage = key+1

            }

        });

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO:NowWeekNO,PageIndex:FindPage}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    //点击全屏按钮

   /* FullScreenClick(e) {

        this.setState({fullScreen: !this.state.fullScreen}, () => {

            if (this.state.fullScreen) {

                document.body.style.overflowY = "hidden";

            } else {

                document.body.style.overflowY = "scroll";

            }

        });

    }*/


    render(){

        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        return(

            <CSSTransition in={this.state.fullScreen} timeout={200} classNames={"full-screen"}>

                <div className={`class-total-content ${this.state.fullScreen?'full-screen-doing':''}`}>

                    {/*<div className="full-screen-btn" onClick={this.FullScreenClick.bind(this)}>{this.state.fullScreen?'退出全屏':'全屏'}</div>*/}

                    <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

                        <DropDown

                            dropSelectd={ClassTotal.GradeDropSelectd}

                            dropList={ClassTotal.GradeDropList}

                            style={{zIndex:5}}

                            height={200}

                            onChange={this.GradeChange.bind(this)}>

                        </DropDown>

                        <WeekDayPick

                            NowWeekNO={ClassTotal.NowWeekNO}

                            NowWeekDay={ClassTotal.NowWeekDay}

                            NowClassDate={ClassTotal.NowClassDate}

                            WeekList ={ClassTotal.WeekList}

                            weekDateChange={this.weekDateChange.bind(this)}

                            OriginWeekList={PeriodWeekTerm.ItemWeek}

                        >


                        </WeekDayPick>

                             {

                                ClassTotal.Schedule.length>0?

                                    <SelfDoubleSingleTable
                                        ref={ref=>this.tableRef=ref}
                                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                        schedule={ClassTotal.Schedule}
                                        scrollToBottom={this.scrollToBottom.bind(this)}
                                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                                    >

                                    </SelfDoubleSingleTable>

                                    :

                                    <Empty type="3" title="暂无班级课表数据"></Empty>

                             }


                    </Loading>

                </div>

            </CSSTransition>

        )

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Manager } = state;

    let { ClassTotal,SubjectCourseGradeClassRoom } = Manager;

    return {

        PeriodWeekTerm,ClassTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassTotal);