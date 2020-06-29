import React,{Component} from 'react';

import {Modal, Loading, Tips, CheckBoxGroup, CheckBox} from "../../../../common";

import { DatePicker,ConfigProvider } from 'antd';

import { connect } from 'react-redux';

import StopScheduleActions from '../../actions/Manager/StopScheduleActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from '../../actions/utils';
import Scroll from "react-custom-scrollbars";

moment.locale('zh-cn');

class StopScheduleModal extends Component{

    constructor(props) {

        super(props);

        this.state={

            GradeTips:false,

            DateTips:false,

            ScheduleTips:false,

            collegeTips:false,

            Grades:[],

            update:false,

            checkedGrades:[],

            checkedColleges:[],

            colleges:[],

            collegeModal:{

                show:false,

                checkedColleges:[]

            }

        }

    }


    //日期选择后
    datePick(date,dateString){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.dateChange(dateString));

        this.setState({DateTips:false});

    }

    //点击课时
    classHoursChecked(opts){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.classHoursChecked(opts));

        this.setState({ScheduleTips:false});

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

        this.setState({DateTips:false});

    }

    //当学段年级被选中的情况下
    gradeChecked(id) {

        const { dispatch } = this.props;

        const index = this.state.checkedGrades.findIndex(i=>i===id);

        let arr = [];

        if (index>=0){

            arr = this.state.checkedGrades;

            arr.splice(index,1);

        }else{

            arr = this.state.checkedGrades;

            arr.push(id);

        }

        this.setState({GradeTips:false,checkedGrades:arr});

    }

    componentWillUpdate(nextProps){

        const { PeriodWeekTerm,StopScheduleModal } = nextProps;

        const { Grades } = StopScheduleModal;

        const { ItemCollege } = PeriodWeekTerm;

        if (!this.state.update&&Grades){

            let GrdList = Grades.map(i=>({id:i.GradeID,name:i.GradeName}));

            this.setState({Grades:GrdList,update:true,colleges:ItemCollege});

        }

    }


    //弹窗出现

    collegeCheckShow(){

        this.setState({collegeModal:{...this.state.collegeModal,show:true,checkedColleges:this.state.checkedColleges}});

    }

    //弹窗消失

    collegeModalClose(){

        this.setState({collegeModal:{...this.state.collegeModal,show:false}})

    }

    //弹窗内部选择修改

    collegeChange(e){

        this.setState({collegeModal:{...this.state.collegeModal,checkedColleges:e}});

    }

    //弹窗点击OK
    collegeOk(){

        this.setState({collegeTips:false,checkedColleges:this.state.collegeModal.checkedColleges,collegeModal:{...this.state.collegeModal,show:false}});

    }

    //弹窗关闭
    alertClose(){

        const { dispatch } = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_HIDE});

        this.setState({

            GradeTips:false,

            DateTips:false,

            ScheduleTips:false,

            collegeTips:false,

            Grades:[],

            update:false,

            checkedGrades:[],

            checkedColleges:[],

            colleges:[],

            collegeModal:{

                show:false,

                checkedColleges:[]

            }

        });

    }

    //弹窗确定
    alertCommit(){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.commitInfo({that:this,checkedColleges:this.state.checkedColleges,checkedGrades:this.state.checkedGrades}));

    }

    render() {

        const { StopScheduleModal } = this.props;

        const {

            loadingShow,

            date,

            dateLoadingShow,

            weekNO,

            weekDay,

            classHours,

            classHoursCheckedList,

            Grades

        } = StopScheduleModal;


        return (

            <Modal className="stop-schedule-modal"
                   title="停课"
                   type={1}
                   visible={StopScheduleModal.show}
                   width={780}
                   bodyStyle={{height:'auto'}}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.alertClose.bind(this)}
                   onOk={this.alertCommit.bind(this)} >

                <div className="ModalContent">

                    <Loading opacity={false} spinning={loadingShow} tip="加载中...">

                        <div className="checked-date-wrapper">

                                <span className="props">日期:</span>

                                <ConfigProvider locale={zhCN}>

                                    <Tips title="请选择停课日期" visible={this.state.DateTips}>

                                        <DatePicker disabledDate={this.dateDisabled.bind(this)} value={date?moment(date,'YYYY-MM-DD'):null} onChange={this.datePick.bind(this)}></DatePicker>

                                    </Tips>


                                    <Loading spinning={dateLoadingShow} type="loading">

                                        {

                                            weekNO?

                                                <span className="date-picked-time">(第{weekNO}周 {weekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                </ConfigProvider>

                        </div>

                        <div className="class-hour-wrapper clearfix">

                            <span className="props">节次:</span>

                            <Tips title="请选择停课节次" visible={this.state.ScheduleTips}>

                                <div className="class-hour-pick-wrapper">

                                    {

                                        classHours.map((item,key) => {


                                            let noonChecked = false;


                                            classHoursCheckedList.map(itm => {

                                                if (itm.type === item.type){

                                                    if (itm.checked){

                                                        noonChecked = true;

                                                    }

                                                }

                                            });

                                            return  <div key={key} className="class-hour-item clearfix">

                                                <div className="noon">

                                                    <div className={`check-item ${noonChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'noon',id:item.type})}>

                                                        {item.name}

                                                    </div>

                                                </div>

                                                {

                                                    item.list.map((i,k) => {

                                                        let itemChecked = false;

                                                        classHoursCheckedList.map(it => {

                                                            if (it.type === item.type){

                                                                if (it.list.includes(i.no)){

                                                                    itemChecked = true;

                                                                }

                                                            }

                                                        });

                                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                            {i.name}

                                                        </div>

                                                    })

                                                }

                                            </div>

                                        })

                                    }
                                </div>

                            </Tips>

                        </div>

                        <div className="college-selected-wrapper clearfix">

                            <div className="college-selected-title">学院:</div>

                            <Tips  title="请选择需要停课的学院" visible={this.state.collegeTips}>

                                <div className="college-wrapper">

                                    <div className={"college-scroll"}>

                                        <Scroll style={{heiht:"90px"}}>

                                            {

                                                this.state.checkedColleges.length>0?

                                                    this.state.checkedColleges.map((i,k)=>{

                                                        const item = this.state.colleges.find(it=>it.CollegeID===i.toString());

                                                        return <div className={"college-checked-item"} key={k}>{item.CollegeName}</div>

                                                    })

                                                    :

                                                    <div className={"college-emp"}>请选择学院</div>

                                            }

                                        </Scroll>

                                    </div>

                                    <button className={"btn edit"} onClick={this.collegeCheckShow.bind(this)}></button>

                                </div>

                            </Tips>

                        </div>

                        <div className="grade-selected-wrapper clearfix">

                            <div className="props">范围:</div>

                            <Tips  title="请选择需要停课的年级" visible={this.state.GradeTips}>

                                <div className="grade-selected-container clearfix">

                                    {

                                        this.state.Grades.map((i,k)=>{

                                            const isChecked = this.state.checkedGrades.includes(i.id)?true:false;

                                            return <div key={k} className={`check-item ${isChecked?'active':''}`} onClick={this.gradeChecked.bind(this,i.id)}>{i.name}</div>


                                        })

                                    }

                                </div>

                            </Tips>

                        </div>

                    </Loading>

                </div>

                <Modal

                    title="选择学院"
                    type={1}
                    className="check-college-modal"
                    visible={this.state.collegeModal.show}
                    width={400}
                    bodyStyle={{height:300,padding:0}}
                    mask={true}
                    cancelText="取消"
                    onCancel={this.collegeModalClose.bind(this)}
                    onOk={this.collegeOk.bind(this)}

                >

                    <div className={"colleges-detail-wrapper"}>

                        <Scroll style={{height:240}}>

                            <CheckBoxGroup onChange={this.collegeChange.bind(this)} value={this.state.collegeModal.checkedColleges}>

                                {

                                    this.state.colleges.length>0?

                                        this.state.colleges.map((i,k)=>{

                                            return <div key={k}><CheckBox value={i.CollegeID}>{i.CollegeName}</CheckBox></div>

                                        })

                                        :

                                        <div className={"emp"}>暂无学院</div>

                                }

                            </CheckBoxGroup>

                        </Scroll>

                    </div>

                </Modal>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

  const { StopScheduleModal } = state.Manager;

  const { PeriodWeekTerm } = state;

  return{

      StopScheduleModal,

      PeriodWeekTerm

  }

};

export default connect(mapStateToProps)(StopScheduleModal);