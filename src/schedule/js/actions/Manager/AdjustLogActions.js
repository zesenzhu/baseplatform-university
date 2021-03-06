import AppAlertActions from '../AppAlertActions';

import ApiActions from "../ApiActions";

import AppLoadingActions from "../AppLoadingActions";

import MSActions from "../ModuleSettingActions";

import logo from "../../../images/adjust-log-logo.png";

const MANAGER_ADJUST_LOG_INIT = 'MANAGER_ADJUST_LOG_INIT';

const MANAGER_ADJUST_LOG_END_DATE_UPDATE = 'MANAGER_ADJUST_LOG_END_DATE_UPDATE';

const MANAGER_ADJUST_LOG_START_DATE_UPDATE = 'MANAGER_ADJUST_LOG_START_DATE_UPDATE';

const MANAGER_ADJUST_LOG_TABLE_UPDATE = 'MANAGER_ADJUST_LOG_TABLE_UPDATE';

const MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE = 'MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE';

const MANAGER_ADJUST_LOG_TABLE_LOADING_SHOW = 'MANAGER_ADJUST_LOG_TABLE_LOADING_SHOW';

const MANAGER_ADJUST_LOG_DROP_CHANGE = 'MANAGER_ADJUST_LOG_DROP_CHANGE';

const MANAGER_ADJUST_LOG_PAGE_CHANGE = 'MANAGER_ADJUST_LOG_PAGE_CHANGE';




const PageInit = () => {

  return (dispatch,getState) => {

      const {LoginUser,identify} = getState();

      const {SchoolID} = LoginUser;

      const OperateType = 0,StartDate = '',

          EndDate = '',PageIndex = 1,PageSize = 10,ScheduleID = '';

      ApiActions.GetScheduleLogForPage({SchoolID,OperateType,StartDate,

          EndDate,PageIndex,PageSize,ScheduleID,CollegeID:identify.isCollegeManager?LoginUser.CollegeID:'',dispatch}).then(data=>{

         if (data){

             const {ItemScheduleLog,TotalCount} = data;

             let LogList = ItemScheduleLog.map(item=>{

                return {

                    key:item.RowNum,

                    RowNum:item.RowNum,

                    OperateFlag:{

                        LogID:item.LogID,

                        Flag:item.Flag

                    },
                    OperatePerson:{

                        OperatorID:item.OperatorID,

                        OperatorName:item.OperatorName,

                    },

                    OperateTime:item.OperateTime,

                    OperateType:item.OperateType,

                    OperateTypeName:item.OperateTypeName,

                    OperateDesc:item.OperateDesc

                }

             });

            dispatch({type:MANAGER_ADJUST_LOG_INIT,data:{LogList,TotalCount}});

         }

          dispatch({type:MSActions.MODULE_SETTINGS_UPDATE,data:{

                 /* moduleCnName:"????????????",

                  moduleEnName:"Transfer Log",

                  logo:logo,*/

                  timeBar:false

              }});

         dispatch({type:MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE});

         dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

      });

  }

};

//??????????????????
const DatePick = () =>{

    return (dispatch,getState) => {

        const { StartDate,EndDate,DropSelectd } = getState().Manager.AdjustLog;

        let start = new Date(StartDate.replace('-','/'));

        let end = new Date(EndDate.replace('-','/'));

        const { SchoolID } = getState().LoginUser;

        const  OperateType = DropSelectd.value;

        const ScheduleID = '';

        if (end<start){

            dispatch(AppAlertActions.alertWarn({title:"???????????????????????????????????????"}));

        }else {

            dispatch(LogUpdate({StartDate,ScheduleID,SchoolID,EndDate,OperateType,PageIndex:1,PageSize:10}));

        }

    }

};

//????????????
const DropChange = (e) =>{

  return (dispatch,getState) => {

      dispatch({type:MANAGER_ADJUST_LOG_DROP_CHANGE,data:e});

      const { StartDate,EndDate } = getState().Manager.AdjustLog;

      const { SchoolID } = getState().LoginUser;

      const  OperateType = e.value;

      const ScheduleID = '';

      dispatch(LogUpdate({StartDate,ScheduleID,SchoolID,EndDate,OperateType,PageIndex:1,PageSize:10}));


  }

};

//??????????????????
const TablePageChange = (e) =>{

    return (dispatch,getState) => {

        const { StartDate,EndDate,DropSelectd } = getState().Manager.AdjustLog;

        const { SchoolID } = getState().LoginUser;

        const  OperateType = DropSelectd.value;

        const ScheduleID = '';

        dispatch(LogUpdate({StartDate,ScheduleID,SchoolID,EndDate,OperateType,PageIndex:e,PageSize:10}));

    }

};

const Reback = ({LogID,OperateType}) => {

    return (dispatch,getState) => {

        const { StartDate,EndDate,DropSelectd } = getState().Manager.AdjustLog;

        const { SchoolID,UserID,UserName } = getState().LoginUser;

        const  OperateType = DropSelectd.value;

        const ScheduleID = '';

        ApiActions.RevolveScheduleLog({UserID,UserName,SchoolID,OperateType,LogID,dispatch}).then(data=>{

           if (data===0){

               dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

               dispatch(LogUpdate({StartDate,ScheduleID,SchoolID,EndDate,OperateType,PageIndex:1,PageSize:10}));

           }

        });


    }

};




//??????table??????
const LogUpdate = ({OperateType,SchoolID,StartDate,EndDate,ScheduleID,PageIndex,PageSize}) => {

    return (dispatch,getState) => {

        const {LoginUser,identify} = getState();

        dispatch({type:MANAGER_ADJUST_LOG_TABLE_LOADING_SHOW});

        dispatch({type:MANAGER_ADJUST_LOG_PAGE_CHANGE,data:PageIndex});

        ApiActions.GetScheduleLogForPage({CollegeID:identify.isCollegeManager?LoginUser.CollegeID:'',SchoolID,StartDate,EndDate,ScheduleID,PageIndex,PageSize,OperateType}).then(data=>{

            if (data){

                const {ItemScheduleLog,TotalCount} = data;

                let LogList = ItemScheduleLog.map(item=>{

                    return {

                        key:item.RowNum,

                        RowNum:item.RowNum,

                        OperateFlag:{

                            LogID:item.LogID,

                            Flag:item.Flag

                        },
                        OperatePerson:{

                            OperatorID:item.OperatorID,

                            OperatorName:item.OperatorName,

                        },

                        OperateTime:item.OperateTime,

                        OperateType:item.OperateType,

                        OperateTypeName:item.OperateTypeName,

                        OperateDesc:item.OperateDesc

                    }

                });

                dispatch({type:MANAGER_ADJUST_LOG_TABLE_UPDATE,data:{LogList,TotalCount}});

            }

            dispatch({type:MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE});

        })

    }

};

export default {

    MANAGER_ADJUST_LOG_INIT,

    MANAGER_ADJUST_LOG_START_DATE_UPDATE,

    MANAGER_ADJUST_LOG_END_DATE_UPDATE,

    MANAGER_ADJUST_LOG_TABLE_UPDATE,

    MANAGER_ADJUST_LOG_TABLE_LOADING_SHOW,

    MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE,

    MANAGER_ADJUST_LOG_DROP_CHANGE,

    MANAGER_ADJUST_LOG_PAGE_CHANGE,

    PageInit,

    DropChange,

    DatePick,

    TablePageChange,

    Reback

}