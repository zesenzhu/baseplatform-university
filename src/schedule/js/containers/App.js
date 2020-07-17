import React,{Component} from 'react';

import {Loading,Alert,DropDown} from "../../../common";

import publicJS from '../../../common/js/public';

import Frame from '../../../common/Frame';

import {TokenCheck_Connect} from "../../../common/js/disconnect";

import { connect } from 'react-redux';

import {HashRouter as Router} from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import AdjustBtnsWrapper from '../component/Manager/AdjustBtnsWrapper';

import AddScheduleModal from './Manager/AddScheduleModal';

import AdjustByTimeModal from  './Manager/AdjustByTimeModal'

import ModuleCommonActions from '../actions/ModuleCommonActions';

import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';

import ASMAction from  '../actions/Manager/AddScheduleModalActions';

import ABTMActions from '../actions/Manager/AdjustByTimeModalActions';

import ABCRActions from '../actions/Manager/AdjustByClassRoomActions';

import StopScheduleActions from '../actions/Manager/StopScheduleActions'

import DelScheduleActions from '../actions/Manager/DelScheduleActions';

import StopScheduleModal from './Manager/StopScheduleModal';

import DelScheduleModal from './Manager/DelScheduleModal';

import ABTActions from '../actions/Manager/AdjustByTeacherActions';

import RouterWrapper from './RouterWrapper';

import '../../scss/index.scss';

import RouterSetActions from "../actions/RouterSetActions";

import $ from 'jquery';

import ComPageRefresh from '../actions/ComPageRefresh';

import TeacherPowerActions from '../actions/Teacher/TeacherPowerActions';

import {QueryPower,QueryOtherPower} from '../../../common/js/power/index';

import ScheduleDetailModal from "../component/ScheduleDetailModal";

import ChangeTimeModal from "../component/ChangeTimeModal";

import AdjustClassRoomModal from "../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../component/ReplaceScheduleModal";

import ChangeScheduleModal from '../component/ChangeScheduleModal';

import SDActions from "../actions/ScheduleDetailActions";



class App extends Component{

    /*constructor(props) {

        super(props);

        const {dispatch} = props;

        const Hash = location.hash;

        //获取公共的信息

        if(publicJS.IEVersion()){

            TokenCheck_Connect(false,()=>{

                if (sessionStorage.getItem('UserInfo')){
    
                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                    let { UserType,UserClass } = UserInfo;

                    console.log(UserInfo);
    
                    //判断权限
    
                    if (parseInt(UserType)===0||parseInt(UserType)===1||parseInt(UserType)===2||parseInt(UserType)===7||parseInt(UserType)===10){
    
                        if (parseInt(UserType)===0){//判断管理员权限
    
                            QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{
    
                                if (data){

                                    dispatch(ModuleCommonActions.getCommonInfo());
    
                                    if (Hash.includes('Import')){
    
                                        dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})
    
                                    }else{
    
                                        dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})
    
                                    }
    
                                }else{
    
                                    window.location.href='/Error.aspx?errcode=E011';
    
                                }
    
                            });

                        }else if (parseInt(UserType)===1){
    
                            let GetAdjustPower =  QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});
    
                            let GetImportPower = QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'});
    
                            Promise.all([GetAdjustPower,GetImportPower]).then(res=>{
    
                                dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});
    
                                dispatch(ModuleCommonActions.getCommonInfo());
    
                                if (Hash.includes('Import')){
    
                                    dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})
    
                                }else{
    
                                    dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})
    
                                }
    
                            });
    
                        }else{

                            dispatch(ModuleCommonActions.getCommonInfo());

                        }
    
                    }else{//无权限角色
    
                        //window.location.href='/Error.aspx?errcode=E011';
    
                    }
    
                }else{
    
    
                    let getUserInfo = setInterval(()=>{
    
                        if (sessionStorage.getItem('UserInfo')){
    
                            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                            /!* dispatch(ModuleCommonActions.getCommonInfo());
    
                             if (Hash.includes('Import')){
    
                                 dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})
    
                             }else{
    
                                 dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})
    
                             }*!/

                            let { UserType,UserClass } = UserInfo;

                            //判断权限
    
                            if (parseInt(UserType)===0||parseInt(UserType===1)||parseInt(UserType)===2||parseInt(UserType)===7||parseInt(UserType)===10){
    
                                if (parseInt(UserType)===0){//判断管理员权限
    
                                    QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{
    
                                        if (data){
    
                                            dispatch(ModuleCommonActions.getCommonInfo());
    
                                            if (Hash.includes('Import')){
    
                                                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})
    
                                            }else{
    
                                                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})
    
                                            }
    
                                        }else{
    
                                            window.location.href='/Error.aspx?errcode=E011';
    
                                        }
    
                                    });
    
                                }else if (parseInt(UserType)===1) {
    
                                    let GetAdjustPower =  QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});
    
                                    let GetImportPower = QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'})
    
                                    Promise.all([GetAdjustPower,GetImportPower]).then(res=>{
    
                                        dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});
    
                                        dispatch(ModuleCommonActions.getCommonInfo());
    
                                        if (Hash.includes('Import')){
    
                                            dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})
    
                                        }else{
    
                                            dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})
    
                                        }
    
                                    });
    
                                }else{

                                    dispatch(ModuleCommonActions.getCommonInfo());

                                }
    
                            }else{//无权限角色
    
                                //window.location.href='/Error.aspx?errcode=E011';
    
                            }
    
                            clearInterval(getUserInfo);
    
                        }
    
                    },10);
    
                }
    
            });

        }

    }*/



    componentDidMount(){

        window.onerror=()=>{return true};

    }

    pageInit(){

        const {dispatch} = this.props;

        const Hash = location.hash;

        let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        let { UserType,UserClass } = UserInfo;

        //判断权限

        if (parseInt(UserType)===0||parseInt(UserType)===1||parseInt(UserType)===2||parseInt(UserType)===7||parseInt(UserType)===10){

            if (parseInt(UserType)===0){//判断管理员权限

                QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{

                    if (data){

                        dispatch(ModuleCommonActions.getCommonInfo());

                        if (Hash.includes('Import')){

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                        }else{

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                        }

                    }else{

                        window.location.href='/Error.aspx?errcode=E011';

                    }

                });

            }else if (parseInt(UserType)===1){

                let GetAdjustPower =  QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});

                let GetImportPower = QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'});

                Promise.all([GetAdjustPower,GetImportPower]).then(res=>{

                    dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});

                    dispatch(ModuleCommonActions.getCommonInfo());

                    if (Hash.includes('Import')){

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                    }else{

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                    }

                });

            }else{

                dispatch(ModuleCommonActions.getCommonInfo());

            }

        }else{//无权限角色

            //window.location.href='/Error.aspx?errcode=E011';

        }


    }


    periodChange(key) {

        const {dispatch} = this.props;

        dispatch({type:PeriodWeekTermActions.PERIOD_VALUE_CHANGE,data:key});

        ComPageRefresh.ComPageUpdate(dispatch);

    }

    //弹出添加临时课程弹窗
    addScheduleModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ASMAction.ADD_SCHEDULE_MODAL_SHOW});

        $('.add-schedule-modal-wrapper .dropdown_list_ul3').hide();

        $('.add-schedule-modal-wrapper .dropdown_item1_name').removeClass('slide');

        $('.add-schedule-modal-wrapper .dropdown_item3_li').removeClass('active');

        dispatch(ASMAction.InfoInit());

    }
    //按时间调整弹窗
    adjustByTimeModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_SHOW});

        dispatch(ABTMActions.InfoInit());

    }

    //停课弹窗
    stopScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_SHOW});

        dispatch(StopScheduleActions.InfoInit());

    }

    //删除课程弹窗
    delScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_SHOW});

        dispatch(DelScheduleActions.InfoInit());

    }

    //弹出调整教师弹窗

    adjustByTeacherShow(){

        const { dispatch } = this.props;

        dispatch({type:ABTActions.ADJUST_BY_TEACHER_SHOW});

        dispatch(ABTActions.AdjustByTeacherModalInit());

    }

    //弹出调整教室弹窗

    adjustByClassRoomShow(){

        const { dispatch } = this.props;

        dispatch({type:ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_SHOW});

    }


    //导入课表

    Import(){

        window.open('/html/schedule#/Import');

    }

    //跳转到课表设置

    ScheduleSettingShow(){

        window.open('/html/schedule#/manager/scheduleSetting');

    }

    //跳转到智能排课

    PathToIntellenct(){

        const { Url } = this.props.state.Manager.Intellenct;

        const token = sessionStorage.getItem('token');

        if (Url){

            window.open(`${Url}?lg_tk=${token}`);

        }

    }



    //停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(SDActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;



        dispatch(SDActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_HIDE});

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(SDActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(SDActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(SDActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(SDActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackReplaceSchedule(params));

    }

    //换课

    ChangeScheduleShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeScheduleShow(params));

    }



    render() {

        const {state} = this.props;

        const { LoginUser,ScheduleDetail,AppLoading,ModuleSetting,Manager,PeriodWeekTerm,AppAlert,RouterSet } = state;

        const { AdjustBtns } = Manager;

        return (

            <Router>

                <React.Fragment>

                   <DocumentTitle title={ModuleSetting.moduleCnName}>

                       <React.Fragment>

                       {

                           AppLoading.show?

                               <Loading opacity={false} size="large" tip="加载中..."></Loading>

                               :''

                       }


                       <Frame
                            module={{
                                cnname:ModuleSetting.moduleCnName,
                                enname:ModuleSetting.moduleEnName,
                                image:ModuleSetting.logo
                            }}
                           /* userInfo={{
                                name:LoginUser.UserName,
                                image:LoginUser.PhotoPath
                            }}*/

                            showBarner={RouterSet.router==='/'?ModuleSetting.timeBar:false}

                            pageInit={this.pageInit.bind(this)}

                            type="circle"

                        >

                            <div ref="frame-time-barner">

                                <div className="college_change clearfix">

                                    {

                                        PeriodWeekTerm.dropShow?

                                            <DropDown

                                                dropSelectd={PeriodWeekTerm.dropSelectd}

                                                dropList={PeriodWeekTerm.dropList}

                                                height={300}

                                                onChange={this.periodChange.bind(this)}

                                            >

                                            </DropDown>

                                            :

                                            <div className={"college_name"}>{PeriodWeekTerm.dropObj.name}</div>

                                    }

                                </div>

                                {

                                    parseInt(LoginUser.UserType) === 0||(parseInt(LoginUser.UserType)===7&&parseInt(LoginUser.UserClass)===2)?

                                        <AdjustBtnsWrapper

                                            adjustBtns={AdjustBtns}

                                            ScheduleSettingShow={this.ScheduleSettingShow.bind(this)}

                                            addScheduleModalShow={this.addScheduleModalShow.bind(this)}

                                            adjustByTimeModalShow = {this.adjustByTimeModalShow.bind(this)}

                                            stopScheduleShow={this.stopScheduleShow.bind(this)}

                                            delScheduleShow = {this.delScheduleShow.bind(this)}

                                            adjustByTeacherShow = {this.adjustByTeacherShow.bind(this)}

                                            adjustByClassRoomShow={this.adjustByClassRoomShow.bind(this)}



                                            Import={this.Import.bind(this)}

                                            Intellenct={this.PathToIntellenct.bind(this)}

                                            IntellenctUrl={Manager.Intellenct.Url}

                                        >

                                        </AdjustBtnsWrapper>

                                        :''

                                }

                            </div>

                            <div ref="frame-right-content">

                                <RouterWrapper></RouterWrapper>

                            </div>

                        </Frame>

                       </React.Fragment>

                   </DocumentTitle>

                   <AddScheduleModal></AddScheduleModal>

                   <AdjustByTimeModal></AdjustByTimeModal>

                   <StopScheduleModal></StopScheduleModal>

                   <DelScheduleModal></DelScheduleModal>


                   <Alert type={AppAlert.type}
                          title={AppAlert.title}
                          abstract={AppAlert.abstract}
                          show={AppAlert.show}
                          onClose={AppAlert.close}
                          onCancel={AppAlert.cancel}
                          onOk={AppAlert.ok}
                          onHide={AppAlert.hide}
                          okTitle={AppAlert.okTitle}
                          cancelTitle={AppAlert.cancelTitle}>

                   </Alert>

                    <ScheduleDetailModal

                        Params={ScheduleDetail.ScheduleDetail}

                        CanOperate={ScheduleDetail.Params.CanOperate}

                        StopSchedule={this.StopSchedule.bind(this)}

                        RebackStopSchedule={this.RebackStopSchedule.bind(this)}

                        ChangeTimeShow={this.ChangeTimeShow.bind(this)}

                        ScheduleDetailClose={this.ScheduleDetailClose.bind(this)}

                        RebackTime={this.RebackTime.bind(this)}

                        AdjustClassRoomShow={this.AdjustClassRoomShow.bind(this)}

                        RebackClassRoom={this.RebackClassRoom.bind(this)}

                        ChooseReplaceTeacherShow={this.ChooseReplaceTeacherShow.bind(this)}

                        ChangeScheduleShow={this.ChangeScheduleShow.bind(this)}

                        RebackReplaceSchedule={this.RebackReplaceSchedule.bind(this)}

                    >

                    </ScheduleDetailModal>

                    <ChangeTimeModal

                        Params={ScheduleDetail.ChangeTime}

                        SelectClassHour={this.SelectClassHour.bind(this)}

                        WeekPick={this.WeekPick.bind(this)}

                        CloseChangeTime={this.CloseChangeTime.bind(this)}

                        ChangeTimeCommit={this.ChangeTimeCommit.bind(this)}

                    >

                    </ChangeTimeModal>

                    <AdjustClassRoomModal

                        Params={ScheduleDetail.AdjustClassRoom}

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

                        Params={ScheduleDetail.ReplaceSchedule}

                        ReplaceTeacherPick={this.ReplaceTeacherPick.bind(this)}

                        SearchValueChange={this.ReplaceSearchValueChange.bind(this)}

                        ReplaceSearchClick={this.ReplaceSearchClick.bind(this)}

                        ReplaceSearchCancel={this.ReplaceSearchCancel.bind(this)}

                        ReplaceScheduleClose={this.ReplaceScheduleClose.bind(this)}

                        ReplaceScheduleCommit={this.ReplaceScheduleCommit.bind(this)}

                    >



                    </ReplaceScheduleModal>

                    <ChangeScheduleModal></ChangeScheduleModal>

                </React.Fragment>

            </Router>
        );
    }
}

const mapStateToProps = (state) => {

  return{
      state
  }

};

export default connect(mapStateToProps)(App);