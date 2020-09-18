import React,{Component} from 'react';

import {connect} from 'react-redux';

import TermPick from "../../component/TermPick"

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import apiActions from '../../actions/ApiActions';

import SDActions from "../../actions/ScheduleDetailActions";

import utils from "../../actions/utils";

import appLoading from '../../actions/AppLoadingActions';


class TeacherPersonalSchedule extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        this.state={

            loading:true,

            firstLoad:true,

            schedule:[],

            NowWeekNO:1

        };



    }

    //选择某一周次
    weekPickEvent(e){

        this.setState({NowWeekNO:e.value},()=>{

            this.updateSchedule(e.value);

        })

    }

    //选择下一周次
    weekNextEvent(week){

        this.setState({

            NowWeekNO:this.state.NowWeekNO+1

        },()=>{

            this.updateSchedule(this.state.NowWeekNO);

        });

    }

    //选择上一周次
    weekPrevEvent(week){

        this.setState({

            NowWeekNO:this.state.NowWeekNO-1

        },()=>{

            this.updateSchedule(this.state.NowWeekNO);

        });

    }


    //弹出课程详情弹窗



    ScheduleDetailShow(Params){

        const { dispatch,Student } = this.props;

        const { CommonInfo } = Student;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = CommonInfo;

        const WeekNO = this.state.NowWeekNO;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }

    componentWillReceiveProps(nextProps){

        const { Student,dispatch,PeriodWeekTerm,LoginUser } = nextProps;

        const { WeekNO } = PeriodWeekTerm;

        const {ItemClassHour} = Student.CommonInfo;

        const { SchoolID,UserID } = LoginUser;

        if (ItemClassHour.length>0&&this.state.firstLoad){

            this.setState({firstLoad:false},()=>{

                apiActions.GetScheduleByUserID({SchoolID,PeriodID:'',UserType:2,UserID,WeekNO,dispatch}).then(data=>{

                        let schedule = [];

                        if (data){

                            schedule = data.ItemSchedule&&data.ItemSchedule.length>0?utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                                return {

                                    ...item,

                                    title:item.CourseName,

                                    titleID:item.CourseNO,

                                    secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                                    secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                                    thirdTitle:item.ClassRoomName,

                                    thirdTitleID:item.ClassRoomID,

                                    WeekDay:item.WeekDay,

                                    ClassHourNO:item.ClassHourNO,

                                    ScheduleType:item.ScheduleType

                                }


                            })):[];

                        }

                        this.setState({loading:false,schedule,NowWeekNO:PeriodWeekTerm.WeekNO});

                        dispatch({type:appLoading.APP_LOADING_HIDE});

                    })

            })

        }

    }


    updateSchedule(WeekNO){

        const { dispatch,LoginUser } = this.props;

        const { SchoolID,UserID } = LoginUser;

        this.setState({loading:true});

        apiActions.GetScheduleByUserID({SchoolID,PeriodID:'',UserType:2,UserID,WeekNO,dispatch}).then(data=>{

            let schedule = [];

            if (data){

                schedule = data.ItemSchedule&&data.ItemSchedule.length>0?utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                    return {

                        ...item,

                        title:item.CourseName,

                        titleID:item.CourseNO,

                        secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                        secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }


                })):[];

            }

            this.setState({loading:false,schedule});

        })

    }


    componentDidMount(){

        document.getElementsByClassName("frame-content-rightside")[0].style.marginTop = '0px';

        document.getElementsByClassName("frame-content-rightside")[0].style.borderTop = '0px';

        document.getElementsByClassName("frame-content-rightside")[0].style.borderRadius = '12px';


    }


    render() {

        const { Student,PeriodWeekTerm } = this.props;

        const {CommonInfo} = Student;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek){

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="teacher-mine-wrapper">

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={this.state.NowWeekNO}

                    ItemWeek ={ItemWeek}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                    
                    WeekNO={PeriodWeekTerm.WeekNO}
                    
                    >

                </TermPick>

                <Loading tip="请稍后..." spinning={this.state.loading}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={128}
                        leftOneWidth ={52}
                        leftTwoWidth = {136}
                        ItemClassHourCount={CommonInfo.ItemClassHourCount}
                        ItemClassHour={CommonInfo.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={this.state.NowWeekNO}
                        schedule={this.state.schedule}
                        NowDate = {PeriodWeekTerm.NowDate}

                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                    </SingleDoubleTable>

                </Loading>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { Student,PeriodWeekTerm,LoginUser } = state;

    return {

        Student,

        PeriodWeekTerm,

        LoginUser

    };

};

export default connect(mapStateToProps)(TeacherPersonalSchedule);