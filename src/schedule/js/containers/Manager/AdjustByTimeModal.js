import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,Loading,Button,Tips,CheckBoxGroup,CheckBox } from "../../../../common";

import { DatePicker,ConfigProvider } from  'antd';

import ABTMActions from '../../actions/Manager/AdjustByTimeModalActions';

import Scroll from 'react-custom-scrollbars';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from '../../actions/utils';

moment.locale('zh-cn');



class AdjustByTimeModal extends Component{

    constructor(props) {

        super(props);

        this.state={

          GradeTips:false,

          collegeTips:false,

          BeforeTimeTips:false,

          AfterTimeTips:false,

          BeforeScheduleTips:false,

          AfterScheduleTips:false,

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


    componentWillUpdate(nextProps){

        const { PeriodWeekTerm,AdjustByTimeModal } = nextProps;

        const { Grades,show } = AdjustByTimeModal;

        const { ItemCollege } = PeriodWeekTerm;

        if (!this.state.update&&Grades){

            let GrdList = Grades.map(i=>({id:i.GradeID,name:i.GradeName}));

            this.setState({Grades:GrdList,update:true,colleges:ItemCollege});

        }

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

    //当旧的课时被选中的时候

    oldClassHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTMActions.oldClassHourChecked(opts));

        this.setState({BeforeScheduleTips:false});

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

    }

    //当新的课时被选中的时候

    newClassHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTMActions.newClassHourChecked(opts));

        this.setState({AfterScheduleTips:false});

    }

    //旧的日期发生变化
    oldDateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTMActions.oldDateUpdate(dateString));

        this.setState({BeforeTimeTips:false});

    }

    //新的日期发生变化
    newDateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTMActions.newDateUpdate(dateString));

        this.setState({AfterTimeTips:false});

    }

    //弹窗点击关闭
    AlertHide(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_HIDE});

        this.setState({ GradeTips:false,

            collegeTips:false,

            BeforeTimeTips:false,

            AfterTimeTips:false,

            BeforeScheduleTips:false,

            AfterScheduleTips:false,

            Grades:[],

            update:false,

            checkedGrades:[],

            checkedColleges:[],

            colleges:[],

            collegeModal:{

                show:false,

                checkedColleges:[]

            }});

    }
    //弹窗点击确定

    AlertOk(){

        const {dispatch} = this.props;

        dispatch(ABTMActions.commitInfo({that:this,checkedColleges:this.state.checkedColleges,checkedGrades:this.state.checkedGrades}));

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




    render() {

        const { AdjustByTimeModal } = this.props;

        const {

            periodGrades,

            periodGradesCheckedList,

            oldClassHours,

            newClassHours,

            oldClassHourCheckedList,

            newClassHourCheckedList,

            oldWeekNo,

            oldWeekDay,

            newWeekNo,

            newWeekDay,

            oldDate,

            newDate,

            oldDateLoadingShow,

            newDateLoadingShow

        } = AdjustByTimeModal;




        return (

            <Modal className="adjust-by-time-modal"
                   title="按时间调整课程"
                   type={1}
                   visible={AdjustByTimeModal.show}
                   width={1042}
                   bodyStyle={{height:'auto'}}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.AlertHide.bind(this)}
                   footer={[

                            <span key="footer-tips" className="footer-tips">注:调整上课时间后，上课节次的数量及顺序须与调整前一致。</span>,

                            <Button key='agree' color='green' onClick={this.AlertOk.bind(this)}>确定</Button>,

                            <Button key='refuse' color='blue' onClick={this.AlertHide.bind(this)}>取消</Button>

                   ]}>

                <div className="ModalContent">

                    <Loading opacity={false} spinning={AdjustByTimeModal.loadingShow} tip="加载中...">

                        <div className="college-selected-wrapper clearfix">

                            <div className="college-selected-title">学院:</div>

                            <Tips  title="请选择需要调课的学院" visible={this.state.collegeTips}>

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

                            <div className="grade-selected-title">年级:</div>

                            <Tips  title="请选择需要调课的年级" visible={this.state.GradeTips}>

                                <div className="grade-selected-container">

                                    {/*{

                                        periodGrades.map((item,key) => {

                                            let periodChecked = false;
                                            //变量看看是否全选
                                            periodGradesCheckedList.map((itm) => {

                                                if (itm.id === item.id){

                                                    if (itm.checked){

                                                        periodChecked = true;

                                                    }

                                                }

                                            });

                                            return <div key={key} className="period-item-wrapper clearfix">

                                                <div className="period">

                                                    <div className={`check-item ${periodChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"period",id:item.id})}>

                                                        {item.name}

                                                    </div>

                                                </div>

                                                {

                                                    item.list.map((i,k) => {

                                                        //判断该选项是否是选中

                                                        let itemChecked = false;

                                                        periodGradesCheckedList.map((itm) => {

                                                            if (itm.id === item.id){

                                                                itm.list.map((it) => {

                                                                    if (it === i.id){

                                                                        itemChecked = true;

                                                                    }

                                                                });

                                                            }

                                                        });

                                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"item",pid:item.id,id:i.id})}>{i.name}</div>

                                                    })

                                                }

                                            </div>

                                        })

                                    }*/}

                                    {

                                        this.state.Grades.map((i,k)=>{

                                            const isChecked = this.state.checkedGrades.includes(i.id)?true:false;

                                            return <div key={k} className={`check-item ${isChecked?'active':''}`} onClick={this.gradeChecked.bind(this,i.id)}>{i.name}</div>


                                        })

                                    }

                                </div>

                            </Tips>

                        </div>

                        <div className="class-hour-pick-wrapper clearfix">

                            <div className="adjust-old-wrapper">

                                <div className="adjust-old-title">时间:</div>

                                <ConfigProvider locale={zhCN}>

                                    <Tips title="请选择调整前日期" visible={this.state.BeforeTimeTips}>

                                        <DatePicker disabledDate={this.dateDisabled.bind(this)} className="date-pick" value={oldDate?moment((oldDate),'YYYY-MM-DD'):null} onChange={this.oldDateChange.bind(this)}></DatePicker>

                                    </Tips>

                                    <Loading spinning={oldDateLoadingShow} type="loading">

                                        {

                                            oldWeekNo?

                                                    <span className="date-picked-time">(第{oldWeekNo}周 {oldWeekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                    <Tips title="请选择调整前节次" visible={this.state.BeforeScheduleTips}>

                                        <div className="class-hour-wrapper">

                                            {

                                                oldClassHours.map((item,key) => {


                                                    let noonChecked = false;


                                                    oldClassHourCheckedList.map(itm => {

                                                        if (itm.type === item.type){

                                                            if (itm.checked){

                                                                noonChecked = true;

                                                            }

                                                        }

                                                    });


                                                    return  <div key={key} className="class-hour-item clearfix">

                                                        <div className="noon">

                                                            <div className={`check-item ${noonChecked?'active':''}`} onClick={this.oldClassHourChecked.bind(this,{type:'noon',id:item.type})}>

                                                                {item.name}

                                                            </div>

                                                        </div>

                                                        {

                                                            item.list.map((i,k) => {

                                                                let itemChecked = false;

                                                                oldClassHourCheckedList.map(it => {

                                                                    if (it.type === item.type){

                                                                        if (it.list.includes(i.no)){

                                                                            itemChecked = true;

                                                                        }

                                                                    }

                                                                });

                                                                return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.oldClassHourChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                                    {i.name}

                                                                </div>

                                                            })

                                                        }

                                                    </div>

                                                })

                                            }

                                        </div>

                                    </Tips>

                                </ConfigProvider>

                            </div>

                            <div className="adjust-new-wrapper">

                                <div className="adjust-new-title">新的时间:</div>

                                <ConfigProvider locale={zhCN}>

                                    <Tips title="请选择调整后日期" visible={this.state.AfterTimeTips}>

                                        <DatePicker disabledDate={this.dateDisabled.bind(this)} className="date-pick" value={newDate?moment((newDate),'YYYY-MM-DD'):null} onChange={this.newDateChange.bind(this)}></DatePicker>

                                    </Tips>

                                    <Loading spinning={newDateLoadingShow} type="loading">

                                        {

                                            newWeekNo?

                                                    <span className="date-picked-time">(第{newWeekNo}周 {newWeekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                    <Tips title="请选择调整后节次" visible={this.state.AfterScheduleTips}>

                                        <div className="class-hour-wrapper">

                                        {

                                            newClassHours.map((item,key) => {


                                                let noonChecked = false;


                                                newClassHourCheckedList.map(itm => {

                                                    if (itm.type === item.type){

                                                        if (itm.checked){

                                                            noonChecked = true;

                                                        }

                                                    }

                                                });


                                                return  <div key={key} className="class-hour-item clearfix">

                                                    <div className="noon">

                                                        <div className={`check-item ${noonChecked?'active':''}`} onClick={this.newClassHourChecked.bind(this,{type:'noon',id:item.type})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                    {

                                                        item.list.map((i,k) => {

                                                            let itemChecked = false;

                                                            newClassHourCheckedList.map(it => {

                                                                if (it.type === item.type){

                                                                    if (it.list.includes(i.no)){

                                                                        itemChecked = true;

                                                                    }

                                                                }

                                                            });

                                                            return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.newClassHourChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                                        {i.name}

                                                                    </div>

                                                        })

                                                    }

                                                </div>

                                            })

                                        }


                                    </div>

                                    </Tips>

                                </ConfigProvider>

                            </div>

                            <div className="arr-wrapper"></div>

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

                        <Scroll style={{height:280}}>

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

    const { AdjustByTimeModal } = state.Manager;

    const { PeriodWeekTerm } = state;

    return{

        AdjustByTimeModal,

        PeriodWeekTerm

    }

};

export default connect(mapStateToProps)(AdjustByTimeModal);