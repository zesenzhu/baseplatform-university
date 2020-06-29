import AppAlertActions from '../AppAlertActions'

import ApiActions from "../ApiActions";

import ComPageRefresh from "../ComPageRefresh";

//停课弹窗
const DEL_SCHEDULE_SHOW = 'DEL_SCHEDULE_SHOW';

const DEL_SCHEDULE_HIDE = 'DEL_SCHEDULE_HIDE';

const DEL_SCHEDULE_LOADING_HIDE = 'DEL_SCHEDULE_LOADING_HIDE';

const DEL_SCHEDULE_LOADING_SHOW = 'DEL_SCHEDULE_LOADING_SHOW';

const DEL_SCHEDULE_INFO_UPDATE = 'DEL_SCHEDULE_INFO_UPDATE';

const DEL_SCHEDULE_PERIOD_GRADE_CHECKED = 'DEL_SCHEDULE_PERIOD_GRADE_CHECKED';


//弹窗信息初始化
const InfoInit = () => {

    return (dispatch,getState) => {

        let {SchoolID} = getState().LoginUser;

        let Periods = getState().PeriodWeekTerm.ItemPeriod;

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data => {

            let Grades = data.ItemGrade;



            dispatch({type:DEL_SCHEDULE_INFO_UPDATE,data:{

                    Grades

                }});

            dispatch({type:DEL_SCHEDULE_LOADING_HIDE});

        });

    }

};



//点击年级选中
const periodChecked = (opts) => {

    return (dispatch,getState) => {

        const { periodGradesCheckedList,periodGradesPlainOpts } = getState().Manager.DelScheduleModal;

        let checkedList = [];

        if (opts.type === 'period'){

            checkedList = periodGradesCheckedList.map((item) => {

                if (item.id === opts.id){
                    //判断状态如果是已选改为未选
                    if (item.checked){

                        return{

                            id:item.id,

                            checked:false,

                            list:[]

                        }

                    }else{//如果是未选改为已选

                        let list = [];

                        periodGradesPlainOpts.map(i => {

                            if (i.id === item.id){

                                list = i.list;

                            }

                        });

                        return {

                            id:item.id,

                            checked:true,

                            list

                        }

                    }

                }else{

                    return item;

                }

            });

        }else{

            checkedList = periodGradesCheckedList.map(item => {

                if (item.id === opts.pid){

                    //如果已经选中，去除选中的状态
                    if (item.list.includes(opts.id)){

                        item.list.remove(opts.id);

                        return {

                            id:item.id,

                            checked:false,

                            list:item.list

                        }

                    }else{//没有选中。先选中然后判断上一层的状态

                        item.list.push(opts.id);

                        let plainOptions = [];

                        periodGradesPlainOpts.map(i => {

                            if (i.id === item.id){

                                plainOptions = i.list;

                            }

                        });

                        //判断是否是需要置为全选
                        if(item.list.length === plainOptions.length){//需要全选

                            return{

                                id:item.id,

                                checked:true,

                                list:item.list

                            }

                        }else{//不需要全选

                            return{

                                id:item.id,

                                checked:false,

                                list:item.list

                            }

                        }

                    }

                }else{

                    return item;

                }

            });

        }

        dispatch({type:DEL_SCHEDULE_PERIOD_GRADE_CHECKED,data:{periodGradesCheckedList:checkedList}});

    }

};

//隐藏弹窗
const hideAlert = (dispatch) => {

    return  () =>dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};

//提交弹窗信息
const commitInfo = ({that,checkedGrades}) => {

    return (dispatch,getState) => {

        const { UserType,UserID } = getState().LoginUser;

        //判断是否全部都已经选择完毕
        let gradeChecked = checkedGrades.length>0?true:false;

        if (!gradeChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择需要删除课程的年级！"}));

            that.setState({GradeTips:true});

        }else{

            let SchoolID = getState().LoginUser.SchoolID;

            let GradeIDs = checkedGrades.join(',');

            dispatch({type:DEL_SCHEDULE_LOADING_SHOW});

            ApiActions.DeleteScheduleByGrades({UserID,UserType:parseInt(UserType),SchoolID,GradeIDs,dispatch}).then(data => {

                if (data === 0) {

                    dispatch({type:DEL_SCHEDULE_HIDE});

                    that.setState({GradeTips:false, Grades:[],

                        update:false,

                        checkedGrades:[]});

                    dispatch(AppAlertActions.alertSuccess({title:"删除课程成功！"}));

                    ComPageRefresh.ComPageUpdate(dispatch);

                }

                dispatch({type:DEL_SCHEDULE_LOADING_HIDE});


        });

        }

    }

};

export default {

    DEL_SCHEDULE_SHOW,

    DEL_SCHEDULE_HIDE,

    DEL_SCHEDULE_LOADING_HIDE,

    DEL_SCHEDULE_LOADING_SHOW,

    DEL_SCHEDULE_INFO_UPDATE,

    DEL_SCHEDULE_PERIOD_GRADE_CHECKED,

    periodChecked,

    commitInfo,

    InfoInit

}