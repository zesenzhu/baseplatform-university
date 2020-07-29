import React,{Component} from 'react';

import {connect} from 'react-redux';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import { Loading } from "../../../../common";

import $ from 'jquery';

import ComPageRefresh from '../../actions/ComPageRefresh';

import SingleDoubleTable from '../../component/SingleDoubleTable';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import STTActions from '../../actions/Manager/SubjectTeacherTeacherActions';

import AppAlertActions from '../../actions/AppAlertActions';

/*import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";*/

import SDActions from "../../actions/ScheduleDetailActions";




class Teacher extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.STTPageInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:e.value});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }
    //左侧菜单选取某一个教师
    menuPickClick(pickInfo){

       const {dispatch} = this.props;

       dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

       dispatch(STTActions.STTTeacherUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value.trim()===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(STTActions.STTTeacherSearch(e.value));

        }

    }



    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch({type:STTActions.SEARCH_TEACHER_RESULT_HIDE});

        dispatch({type:STTActions.MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

        dispatch({type:STTActions.MANAGER_STT_LEFT_MENU_CANCEL_BTN_HIDE});

    }

    //左侧菜单输入框改变

    LeftMenuSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:STTActions.MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Manager } = this.props;

        /*dispatch(STTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = Manager.SubjectCourseGradeClassRoom;

        const WeekNO = Manager.SubjectTeacherTeacherSchedule.NowWeekNo;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    componentWillUpdate(){

        if (window.ScheduleLeftMenuHeightChange){

            window.ScheduleLeftMenuHeightChange($('.subject-teacher-teacher-content').height());

        }

    }

    componentDidMount(){

        console.log(this.Term);

    }

    render() {

        const { PeriodWeekTerm ,Manager} = this.props;

        const {SubjectTeacherTeacherSchedule,SubjectCourseGradeClassRoom} = Manager;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = SubjectTeacherTeacherSchedule;

        let ItemWeek = [];

        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={SubjectTeacherTeacherSchedule.ScheduleLoadingShow}>

                    <LeftMenu
                        title="教师列表"
                        type="person"
                        pickList={SubjectTeacherTeacherSchedule.teacherList}
                        EmptyTitle="教师"
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={SubjectTeacherTeacherSchedule.searchWrapperShow}
                        searchResult={SubjectTeacherTeacherSchedule.searchResult}
                        leftMenuSearchLoading={SubjectTeacherTeacherSchedule.searchLoadingShow}
                        PickID={SubjectTeacherTeacherSchedule.pickTeacherID}
                        CancelBtnShow={SubjectTeacherTeacherSchedule.CancelBtnShow}
                        SearchValue={SubjectTeacherTeacherSchedule.SearchValue}
                        SearchValueChange={this.LeftMenuSearchValueChange.bind(this)}
                        placeHolder={'请输入工号或姓名搜索'}
                        >

                    </LeftMenu>

                    <div className="pick-teacher-wrapper">

                    {

                        SubjectTeacherTeacherSchedule.pickTeacher!==''?

                            <React.Fragment>

                            <span className="teacher-name" title={SubjectTeacherTeacherSchedule.pickTeacher}>{SubjectTeacherTeacherSchedule.pickTeacher}</span>

                            <span className="course-count"> (本周共<span className="count">{SubjectTeacherTeacherSchedule.ScheduleCount}</span>节课)</span>

                            </React.Fragment>

                            :<div className="please-select-teacher">请选择教师</div>

                    }

                    </div>

                    <TermPick

                        ItemWeek={ItemWeek}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}
                        
                        WeekNO={PeriodWeekTerm.WeekNO?PeriodWeekTerm.WeekNO:''}

                    >

                    </TermPick>

                    <SingleDoubleTable

                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={106}
                        leftOneWidth ={32}
                        leftTwoWidth = {110}
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}
                        schedule={SubjectTeacherTeacherSchedule.schedule}
                        NowDate={PeriodWeekTerm.NowDate}

                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}

                    >

                    </SingleDoubleTable>

                </Loading>

               {/* <ScheduleDetailModal

                    Params={ScheduleDetail}

                    StopSchedule={this.StopSchedule.bind(this)}

                    RebackStopSchedule={this.RebackStopSchedule.bind(this)}

                    ChangeTimeShow={this.ChangeTimeShow.bind(this)}

                    ScheduleDetailClose={this.ScheduleDetailClose.bind(this)}

                    RebackTime={this.RebackTime.bind(this)}

                    AdjustClassRoomShow={this.AdjustClassRoomShow.bind(this)}

                    RebackClassRoom={this.RebackClassRoom.bind(this)}

                    ChooseReplaceTeacherShow={this.ChooseReplaceTeacherShow.bind(this)}

                    RebackReplaceSchedule={this.RebackReplaceSchedule.bind(this)}

                >

                </ScheduleDetailModal>

                <ChangeTimeModal

                    Params={ChangeTime}

                    SelectClassHour={this.SelectClassHour.bind(this)}

                    WeekPick={this.WeekPick.bind(this)}

                    CloseChangeTime={this.CloseChangeTime.bind(this)}

                    ChangeTimeCommit={this.ChangeTimeCommit.bind(this)}

                >

                </ChangeTimeModal>

                <AdjustClassRoomModal

                    Params={AdjustClassRoom}

                    ChangeClassRoomPick={this.ChangeClassRoomPick.bind(this)}

                    ChangeClassRoomType={this.ChangeClassRoomType.bind(this)}

                    SearchValueChange={this.SearchValueChange.bind(this)}

                    ClassRoomSearchClick={this.ClassRoomSearchClick.bind(this)}

                    ClassRoomSearchCancel={this.ClassRoomSearchCancel.bind(this)}

                    CloseAdjustClassRoom={this.CloseAdjustClassRoom.bind(this)}

                    AdjustClassRoomCommit={this.AdjustClassRoomCommit.bind(this)}

                >

                </AdjustClassRoomModal>

                <ReplaceScheduleModal

                    Params={ReplaceSchedule}

                    ReplaceTeacherPick={this.ReplaceTeacherPick.bind(this)}

                    SearchValueChange={this.ReplaceSearchValueChange.bind(this)}

                    ReplaceSearchClick={this.ReplaceSearchClick.bind(this)}

                    ReplaceSearchCancel={this.ReplaceSearchCancel.bind(this)}

                    ReplaceScheduleClose={this.ReplaceScheduleClose.bind(this)}

                    ReplaceScheduleCommit={this.ReplaceScheduleCommit.bind(this)}

                >



                </ReplaceScheduleModal>*/}

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const {PeriodWeekTerm,Manager} = state;

    return{

        PeriodWeekTerm,

        Manager

    }

};

export default connect(mapStateToProps)(Teacher);