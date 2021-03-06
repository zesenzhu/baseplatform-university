import ApiActions from "../ApiActions";

import AppLoadingActions from '../AppLoadingActions';

import AppAlertActions from '../AppAlertActions';

import MSActions from '../../actions/ModuleSettingActions';

import moment from 'moment';




const MANAGER_SCHEDULE_SETTING_INIT = 'MANAGER_SCHEDULE_SETTING_INIT';

const MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE = 'MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE';

const MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE = 'MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE';

const MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW = 'MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW';

const MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE = 'MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE';

const MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE = 'MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE';

const MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE = 'MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE';

const MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT = 'MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT';

const MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT = 'MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE';

const MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE = 'MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE';

const MANAGER_SCHEDULE_SETTING_SET_SWITCH_CHANGE = 'MANAGER_SCHEDULE_SETTING_SET_SWITCH_CHANGE';

const MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OPEN = 'MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OPEN';

const MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE = 'MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE';

const MANAGER_SCHEDULE_SETTING_LINKAGE_INPUT_CHANGE = 'MANAGER_SCHEDULE_SETTING_LINKAGE_INPUT_CHANGE';

const MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL = 'MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL';

const MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OK = 'MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OK';




const PageInit = ({SchoolID}) => {

    return (dispatch) =>{

        dispatch({type:MSActions.MODULE_SETTINGS_UPDATE,data:{

             /*   moduleCnName:"???????????????",

                moduleEnName:"Schedule Setting",*/

                timeBar:false

            }});

        ApiActions.GetAllPeriodAndClassHours({SchoolID,dispatch}).then(data=>{

            if (data){

                let SettingType = data.CreateType;

                let AMLimit = data.AMLimit;

                if (SettingType === 0){

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    data.ItemClassHour.map(item=>{

                       if (item.ClassHourType===1){

                           ClassHourList.Morning.push(item);

                       }else if (item.ClassHourType===2){

                           ClassHourList.Afternoon.push(item);

                       }

                    });

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        return {

                            ...item,

                            ClassHourList:{

                                Morning:[],

                                Afternoon:[]

                            }

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByUnify:{ClassHourList},

                            SettingByPeriod:{PeriodSettingList},

                            Times:data.PreStartMinute,

                            IsEnable:data.IsEnable,

                            EditTimes:data.PreStartMinute,

                            AMLimit

                        }});

                }else{

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        let ClassHour = { Morning:[],Afternoon:[] };

                        data.ItemClassHour.map(i=>{

                            if (item.PeriodID === i.PeriodID){

                                if (i.ClassHourType === 1){

                                    ClassHour.Morning.push(i);

                                }else if (i.ClassHourType===2){

                                    ClassHour.Afternoon.push(i)

                                }

                            }

                        });

                        return {

                            PeriodID:item.PeriodID,

                            PeriodName:item.PeriodName,

                            ClassHourList:ClassHour

                        }

                    });

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByPeriod:{PeriodSettingList},

                            SettingByUnify:{ClassHourList},

                            Times:data.PreStartMinute,

                            IsEnable:data.IsEnable,

                            EditTimes:data.PreStartMinute,

                            AMLimit

                        }});



                }

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            }else{

                //window.location.href='/error.aspx';

            }

        });

    }

};


const PageUpdate = () => {

    return (dispatch,getState) => {

        const {SchoolID} = getState().LoginUser;

        ApiActions.GetAllPeriodAndClassHours({SchoolID,dispatch}).then(data=>{

            if (data){

                let SettingType = data.CreateType;

                let AMLimit = data.AMLimit;

                if (SettingType === 0){

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    data.ItemClassHour.map(item=>{

                        if (item.ClassHourType===1){

                            ClassHourList.Morning.push(item);

                        }else if (item.ClassHourType===2){

                            ClassHourList.Afternoon.push(item);

                        }

                    });

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        return {

                            ...item,

                            ClassHourList:{

                                Morning:[],

                                Afternoon:[]

                            }

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByUnify:{ClassHourList},

                            SettingByPeriod:{PeriodSettingList},

                            Times:data.PreStartMinute,

                            IsEnable:data.IsEnable,

                            EditTimes:data.PreStartMinute,

                            AMLimit

                        }});

                }else{

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        let ClassHour = { Morning:[],Afternoon:[] };

                        data.ItemClassHour.map(i=>{

                            if (item.PeriodID === i.PeriodID){

                                if (i.ClassHourType === 1){

                                    ClassHour.Morning.push(i);

                                }else if (i.ClassHourType===2){

                                    ClassHour.Afternoon.push(i)

                                }

                            }

                        });

                        return {

                            PeriodID:item.PeriodID,

                            PeriodName:item.PeriodName,

                            ClassHourList:ClassHour

                        }

                    });

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByPeriod:{PeriodSettingList},

                            SettingByUnify:{ClassHourList},

                            Times:data.PreStartMinute,

                            IsEnable:data.IsEnable,

                            EditTimes:data.PreStartMinute,

                            AMLimit

                        }});

                }

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            }else{

                //window.location.href='/error.aspx';

            }

        });

    }

};



//??????????????????
const SettingTypeSitch = ({type}) => {

    return (dispatch, getState) => {

        const {SchoolID} = getState().LoginUser;

        const {SettingByUnify, SettingByPeriod} = getState().Manager.ScheduleSetting;

        let {ClassHourList} = SettingByUnify;

        let {PeriodSettingList} = SettingByPeriod;

        ApiActions.ShiftClassHourModel({SchoolID, CreateType: type, dispatch}).then(data => {

            if (data) {


                //???????????????????????????
                if (type === 1) {

                    //??????????????????????????????,???????????????
                    PeriodSettingList = PeriodSettingList.map(item => {

                        return {

                            ...item,

                            ClassHourList: {}

                        }

                    });

                    //??????????????????????????????????????????
                    PeriodSettingList = PeriodSettingList.map(item => {

                        let Morning = [], Afternoon = [];

                        data.map(i => {

                            if (i.PeriodID === item.PeriodID) {

                                if (i.ClassHourType === 1) {

                                    Morning.push(i);

                                } else if (i.ClassHourType === 2) {

                                    Afternoon.push(i);

                                }

                            }

                        });

                        return {

                            ...item,

                            ClassHourList: {Morning, Afternoon}

                        }

                    });

                    dispatch({type: MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT, data: PeriodSettingList});

                } else {//???????????????????????????

                    data.sort((a,b)=>{  return a.OrderNO-b.OrderNO});

                    //??????????????????????????????
                    ClassHourList = {};

                    let Morning = [], Afternoon = [];

                    //??????????????????????????????????????????

                    data.map(item => {

                        if (item.ClassHourType === 1) {

                            Morning.push(item);

                        } else if (item.ClassHourType === 2) {

                            Afternoon.push(item);

                        }

                    });

                    ClassHourList['Morning'] = Morning;

                    ClassHourList['Afternoon'] = Afternoon;

                    dispatch({type: MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT, data: ClassHourList});

                }
                //????????????????????????

                dispatch({type: AppAlertActions.APP_ALERT_HIDE});

                dispatch(AppAlertActions.alertSuccess({title: "????????????"}));

                dispatch({type: MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE, data: type});

            }

        });

    };

};

//??????????????????
const AdjustClassHour = ({IsUnify,PeriodID,ClassHourList}) => {

    return (dispatch,getState) => {

            if (ClassHourList.length===0){

                dispatch(AppAlertActions.alertWarn({title:'?????????????????????????????????????????????'}));

            }else{

                if (IsUnify){

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,data:""});

                }else{

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,data:PeriodID});

                }

            }

    }

};


//????????????OK

const AdjustClassHourOk = () =>{

  return (dispatch,getState)=>{

      const { SchoolID } = getState().LoginUser;

      const { PeriodID,MorningTime,MorningRadioChecked,AfternoonTime,AfternoonRadioChecked } = getState().Manager.ScheduleSetting.AdjustClassHourModal;

      const { SettingByUnify,SettingByPeriod } = getState().Manager.ScheduleSetting;


      if (MorningRadioChecked===''&&AfternoonRadioChecked===''){

          dispatch(AppAlertActions.alertWarn({title:"??????????????????!"}));

      }else{

          let MorningTimes,AfternoonTimes = 0;

          if (parseInt(MorningTime)<0||parseInt(MorningTime)<0){

              dispatch(AppAlertActions.alertWarn({title:"??????????????????!"}));

          }else{

              if (MorningRadioChecked==='before'){

                  MorningTimes = -parseInt(MorningTime);


              }else{

                  MorningTimes = parseInt(MorningTime);

              }

              if (AfternoonRadioChecked==='before'){

                  AfternoonTimes = -parseInt(AfternoonTime);

              }else{

                  AfternoonTimes = parseInt(AfternoonTime);

              }


              let conflict = false,conflictType = 1;

              if (PeriodID){

                  const { PeriodSettingList } = SettingByPeriod;

                  const { ClassHourList } = PeriodSettingList.find(i=>i.PeriodID===PeriodID);

                  const { Afternoon,Morning } = ClassHourList;

                  const newMor = Morning.map(i=>{

                      let { StartTime,EndTime } = i;

                      const startMin = getMins(StartTime)+MorningTimes;

                      const endMin = getMins(EndTime)+MorningTimes;

                      return {start:startMin,end:endMin};

                  });

                  const newAft = Afternoon.map(i=>{

                      let { StartTime,EndTime } = i;

                      const startMin = getMins(StartTime)+AfternoonTimes;

                      const endMin = getMins(EndTime)+AfternoonTimes;

                      return {start:startMin,end:endMin};

                  });

                  if (newMor[0].start<=0){

                      conflict = true;

                      conflictType = 1;

                  }else if (newAft[newAft.length-1].end>=60*24){

                      conflict = true;

                      conflictType = 2;

                  }else if (newMor[newMor.length-1].end>=newAft[0].start){

                      conflict = true;

                      conflictType = 3;

                  }

              }else{

                  const { ClassHourList } = SettingByUnify;

                  const { Afternoon,Morning } = ClassHourList;

                  const newMor = Morning.map(i=>{

                     let { StartTime,EndTime } = i;

                     const startMin = getMins(StartTime)+MorningTimes;

                     const endMin = getMins(EndTime)+MorningTimes;

                     return {start:startMin,end:endMin};

                  });

                  const newAft = Afternoon.map(i=>{

                      let { StartTime,EndTime } = i;

                      const startMin = getMins(StartTime)+AfternoonTimes;

                      const endMin = getMins(EndTime)+AfternoonTimes;

                      return {start:startMin,end:endMin};

                  });

                  if (newMor[0].start<=0){

                      conflict = true;

                      conflictType = 1;

                  }else if (newAft[newAft.length-1].end>=60*24){

                      conflict = true;

                      conflictType = 2;

                  }else if (newMor[newMor.length-1].end>=newAft[0].start){

                      conflict = true;

                      conflictType = 3;

                  }

              }

              if (conflict){

                switch (conflictType) {

                    case 1:

                    case 2:

                        dispatch(AppAlertActions.alertWarn({title:"???????????????????????????????????????????????????"}));

                        break;

                    case 3:

                        dispatch(AppAlertActions.alertWarn({title:"??????????????????????????????"}));

                        break;

                }

              }else{

                   ApiActions.UpdateClassHourTimeInstall({SchoolID,PeriodID,MorningTimes,AfternoonTimes,dispatch}).then(data=>{

                       if (data===0){

                           dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE});

                           dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

                           dispatch(PageUpdate());

                       }

                   });

              }

          }

      }

  }

};





//??????????????????????????????

const getMins = (time)=>{

    const Hours = time.split(':')[0];

    const Mins = time.split(':')[1];

    return parseInt(Hours)*60+parseInt(Mins);

};


//??????????????????

const AddClassHour = (opts) => {

    return (dispatch,getState) => {

        const { PeriodID,IsUnify,type } = opts;

        const { SettingByPeriod,SettingByUnify,AMLimit } = getState().Manager.ScheduleSetting;

        const { ClassHourList } = SettingByUnify;

        const { PeriodSettingList } = SettingByPeriod;

        if (IsUnify){

            if (type==='morning'){

                if (ClassHourList.Morning.length>0){

                    let EndTimeList = ClassHourList.Morning[ClassHourList.Morning.length-1].EndTime.split(':');

                    let PreEndHour = parseInt(EndTimeList[0]),PreEndMin = parseInt(EndTimeList[1]);

                    let StartHour = SupplyZero(PreEndHour + Math.floor((PreEndMin + 10)/60));

                    let StartMin = SupplyZero((PreEndMin + 10)%60);

                    let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                    let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{StartHour,StartMin,EndHour,EndMin,IsUnify:true,Type:type}});

                }else{

                    let StartHour = '08',StartMin = '00',EndHour = '08',EndMin = '45';

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{StartHour,StartMin,EndHour,EndMin,IsUnify:true,Type:type}});

                }

            }else if (type === 'afternoon') {

                if (ClassHourList.Afternoon.length>0){

                    let EndTimeList = ClassHourList.Afternoon[ClassHourList.Afternoon.length-1].EndTime.split(':');

                    let PreEndHour = parseInt(EndTimeList[0]),PreEndMin = parseInt(EndTimeList[1]);

                    let StartHour = SupplyZero(PreEndHour + Math.floor((PreEndMin + 10)/60));

                    let StartMin = SupplyZero((PreEndMin + 10)%60);

                    let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                    let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{StartHour,StartMin,EndHour,EndMin,IsUnify:true,Type:type}});


                }else {

                    let StartTimeList = AMLimit.split(':');

                    let PreStartHour = parseInt(StartTimeList[0]);

                    let PreStartMin = parseInt(StartTimeList[1]);

                    let StartHour = SupplyZero(PreStartHour + Math.floor(PreStartHour/60));

                    let StartMin = SupplyZero(PreStartMin%60);

                    let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                    let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{StartHour,StartMin,EndHour,EndMin,IsUnify:true,Type:type}});


                }

            }

        }else{

            PeriodSettingList.map(item=>{

               if (item.PeriodID === PeriodID){

                   if (type==='morning'){

                       if (item.ClassHourList.Morning.length>0){

                           let EndTimeList = item.ClassHourList.Morning[item.ClassHourList.Morning.length-1].EndTime.split(':');

                           let PreEndHour = parseInt(EndTimeList[0]),PreEndMin = parseInt(EndTimeList[1]);

                           let StartHour = SupplyZero(PreEndHour + Math.floor((PreEndMin + 10)/60));

                           let StartMin = SupplyZero((PreEndMin + 10)%60);

                           let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                           let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                           dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{PeriodID,StartHour,StartMin,EndHour,EndMin,Type:type,IsUnify:false}});

                       }else{

                           let StartHour = '08',StartMin = '00',EndHour = '08',EndMin = '45';

                           dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{PeriodID,StartHour,StartMin,EndHour,EndMin,IsUnify:false,Type:type}});

                       }

                   }else if (type === 'afternoon') {

                       if (item.ClassHourList.Afternoon.length>0){

                           let EndTimeList = item.ClassHourList.Afternoon[item.ClassHourList.Afternoon.length-1].EndTime.split(':');

                           let PreEndHour = parseInt(EndTimeList[0]),PreEndMin = parseInt(EndTimeList[1]);

                           let StartHour = SupplyZero(PreEndHour + Math.floor((PreEndMin + 10)/60));

                           let StartMin = SupplyZero((PreEndMin + 10)%60);

                           let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                           let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                           dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{PeriodID,StartHour,StartMin,EndHour,EndMin,IsUnify:false,Type:type}});


                       }else {

                           let StartTimeList = AMLimit.split(':');

                           let PreStartHour = parseInt(StartTimeList[0]);

                           let PreStartMin = parseInt(StartTimeList[1]);

                           let StartHour = SupplyZero(PreStartHour + Math.floor(PreStartHour/60));

                           let StartMin = SupplyZero(PreStartMin%60);

                           let EndHour = SupplyZero(parseInt(StartHour) + Math.floor((parseInt(StartMin) + 45)/60));

                           let EndMin = SupplyZero((parseInt(StartMin) + 45)%60);

                           dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{PeriodID,StartHour,StartMin,EndHour,EndMin,IsUnify:false,Type:type}});


                       }

                   }

               }

            });

        }



    }

};

//???????????????OK
const AddClassHourOk = () => {

    return (dispatch,getState) => {

        let { SchoolID } = getState().LoginUser;

        let { SettingByPeriod,SettingByUnify,AMLimit,SettingType } = getState().Manager.ScheduleSetting;

        let { PeriodSettingList } = SettingByPeriod;

        let { ClassHourList } = SettingByUnify;

        let { IsUnify,PeriodID,StartHour,StartMin,EndHour,EndMin } = getState().Manager.ScheduleSetting.AddClassHourModal;


        let IsCorrect = IsHourMinCorrect({StartHour,StartMin,EndHour,EndMin});

        
        //????????????????????????????????????
        if (IsCorrect.ErrorCode===0){

            //?????????????????????
            if (IsUnify){

                let SortResult = SortClassHourList({StartHour,StartMin,EndHour,EndMin,ClassHourList,AMLimit})

                if (SortResult.ErrorCode===0){

                    let ClassHourName = `???${SortResult.ClassHourNO}???`;

                   ApiActions.InsertClassHourInfo({

                       SchoolID,OrderNO:SortResult.ClassHourNO,StartTime:`${SupplyZero(StartHour)}:${SupplyZero(StartMin)}`,

                       EndTime:`${SupplyZero(EndHour)}:${SupplyZero(EndMin)}`,ClasssHourType:SortResult.NoonType,

                       ClassHourName,CreateType:SettingType,PeriodID:'',dispatch


                   }).then(data=>{

                        if (data===0){

                            dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE});

                            dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                            dispatch(PageUpdate());

                        }

                   });

                }else {

                    dispatch(AppAlertActions.alertWarn({title:SortResult.Msg}));

                }

            }else {

               let ClassHourList =  PeriodSettingList.find(item=>item.PeriodID===PeriodID).ClassHourList;

                let SortResult = SortClassHourList({StartHour,StartMin,EndHour,EndMin,ClassHourList,AMLimit});

                if (SortResult.ErrorCode===0){

                    let ClassHourName = `???${SortResult.ClassHourNO}???`;

                    ApiActions.InsertClassHourInfo({

                        SchoolID,OrderNO:SortResult.ClassHourNO,StartTime:`${SupplyZero(StartHour)}:${SupplyZero(StartMin)}`,

                        EndTime:`${SupplyZero(EndHour)}:${SupplyZero(EndMin)}`,ClasssHourType:SortResult.NoonType,

                        ClassHourName,CreateType:SettingType,PeriodID:PeriodID,dispatch


                    }).then(data=>{

                        if (data===0){

                            dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE});

                            dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                            dispatch(PageUpdate());

                        }

                    });

                }else {

                    dispatch(AppAlertActions.alertWarn({title:SortResult.Msg}));

                }

            }


        }else{

            dispatch(AppAlertActions.alertWarn({title:IsCorrect.Msg}));

        }


    }

};


const EditClassHourOk = () => {

  return (dispatch,getState) => {

      let { SchoolID } = getState().LoginUser;

      let { SettingByPeriod,SettingByUnify,AMLimit,SettingType } = getState().Manager.ScheduleSetting;

      let { PeriodSettingList } = SettingByPeriod;

      let NewClassHourList = [];

      let { ClassHourList } = SettingByUnify;

      let { IsUnify,Type,PeriodID,ClassHourNO,StartHour,StartMin,EndHour,EndMin } = getState().Manager.ScheduleSetting.EditClassHourModal;


      let IsCorrect = IsHourMinCorrect({StartHour,StartMin,EndHour,EndMin});

      if (IsCorrect.ErrorCode===0){

          if (IsUnify){

              NewClassHourList = JSON.parse(JSON.stringify(ClassHourList));

              if(Type===1){

                  NewClassHourList.Morning.splice(NewClassHourList.Morning.findIndex(item=>item.ClassHourNO===ClassHourNO),1);

              }

              if (Type===2){

                  NewClassHourList.Afternoon.splice(NewClassHourList.Afternoon.findIndex(item=>item.ClassHourNO===ClassHourNO),1);

              }

              let SortResult = SortClassHourList({StartHour,StartMin,EndHour,EndMin,ClassHourList:NewClassHourList,AMLimit});


              if (SortResult.ErrorCode===0){

                  let ClassHourName = `???${SortResult.ClassHourNO}???`;

                  ApiActions.UpdateClassHourInfo({

                      SchoolID,ClassHourNO,NewClassHourNO:SortResult.ClassHourNO,StartTime:`${SupplyZero(StartHour)}:${SupplyZero(StartMin)}`,

                      EndTime:`${SupplyZero(EndHour)}:${SupplyZero(EndMin)}`,ClasssHourType:SortResult.NoonType,

                      ClassHourName,CreateType:SettingType,PeriodID:PeriodID,dispatch

                  }).then(data=>{

                      if (data===0){

                          dispatch({type:MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE});

                          dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                          dispatch(PageUpdate());

                      }

                  });

              }else {

                  dispatch(AppAlertActions.alertWarn({title:SortResult.Msg}));

              }
          }else{

              NewClassHourList =  JSON.parse(JSON.stringify(PeriodSettingList.find(item=>item.PeriodID===PeriodID).ClassHourList));

              if(Type===1){

                  NewClassHourList.Morning.splice(NewClassHourList.Morning.findIndex(item=>item.ClassHourNO===ClassHourNO),1);

              }

              if (Type===2){

                  NewClassHourList.Afternoon.splice(NewClassHourList.Afternoon.findIndex(item=>item.ClassHourNO===ClassHourNO),1);

              }

              let SortResult = SortClassHourList({StartHour,StartMin,EndHour,EndMin,ClassHourList:NewClassHourList,AMLimit});

              if (SortResult.ErrorCode===0){

                  let ClassHourName = `???${SortResult.ClassHourNO}???`;

                  ApiActions.UpdateClassHourInfo({

                      SchoolID,ClassHourNO,NewClassHourNO:SortResult.ClassHourNO,StartTime:`${SupplyZero(StartHour)}:${SupplyZero(StartMin)}`,

                      EndTime:`${SupplyZero(EndHour)}:${SupplyZero(EndMin)}`,ClasssHourType:SortResult.NoonType,

                      ClassHourName,CreateType:SettingType,PeriodID:PeriodID,dispatch


                  }).then(data=>{

                      if (data===0){

                          dispatch({type:MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE});

                          dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                          dispatch(PageUpdate());

                      }

                  });

              }else {

                  dispatch(AppAlertActions.alertWarn({title:SortResult.Msg}));

              }

          }

      }else{

          dispatch(AppAlertActions.alertWarn({title:IsCorrect.Msg}));

      }



  }

};

//????????????

const LinkageChange = () => {

    return (dispatch,getState) => {

        const { IsEnable,Times } = getState().Manager.ScheduleSetting;

        const { SchoolID } = getState().LoginUser;

        let NewIsEnable = '';

       if(IsEnable===1){

           NewIsEnable = 0;

       }else if(IsEnable===0){

           NewIsEnable = 1;

       }

        ApiActions.SetScheduleIsAutomatic({IsEnable:NewIsEnable,Times:parseInt(Times),SchoolID,dispatch}).then(data=>{

           if (data===0){

               dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

               dispatch({type:MANAGER_SCHEDULE_SETTING_SET_SWITCH_CHANGE,data:{IsEnable:NewIsEnable,Times}});

           }

        });

    }

};

//????????????OK

const SwitchTimeEditOk = () => {

    return (dispatch,getState) => {

        const { SchoolID } = getState().LoginUser;

        const { EditTimes,Times,IsEnable } = getState().Manager.ScheduleSetting;

        if (!(/(^[1-9]\d*$)/.test(EditTimes))){

            dispatch(AppAlertActions.alertWarn({title:"????????????????????????"}));

            dispatch({type:MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL});

        }else {

            if (Times===EditTimes){

                dispatch(AppAlertActions.alertWarn({title:"?????????????????????"}));

            }else{

                ApiActions.SetScheduleIsAutomatic({SchoolID,IsEnable,Times:EditTimes,dispatch}).then(data=>{

                    if (data===0){

                        dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

                        dispatch({type:MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OK});

                        dispatch({type:MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE});

                        PageUpdate();

                    }

                })

            }

        }

    }

};



/*???????????????*/

//??????????????????????????????
const IsHourMinCorrect = ({StartHour,StartMin,EndHour,EndMin}) => {

    let StartTime = TransformTime(`${StartHour}:${StartMin}`);

    let EndTime = TransformTime(`${EndHour}:${EndMin}`);

    if (StartMin===''||StartHour===''||EndMin===''||EndHour===''){

        return {

            ErrorCode:-1,

            Msg:"?????????????????????"

        }

    }

    if ((StartHour>23||StartHour<0)||(StartMin>59||StartMin<0)){

        return {

            ErrorCode:-1,

            Msg:"???????????????????????????"

        };

    }

    if ((EndHour>23||EndHour<0)||(EndMin>59||EndMin<0)){

        return {

            ErrorCode:-1,

            Msg:"???????????????????????????"

        };

    }

    if (StartTime>=EndTime){

        return {

            ErrorCode:-1,

            Msg:"???????????????????????????????????????"

        };

    }


    return {

        ErrorCode:0

    };

};


//???????????????????????????
const SortClassHourList = ({StartHour,StartMin,EndHour,EndMin,ClassHourList,AMLimit}) =>{


    let List = [...ClassHourList.Morning,...ClassHourList.Afternoon];

    let StartTime =  TransformTime(`${StartHour}:${StartMin}`);

    let EndTime =  TransformTime(`${EndHour}:${EndMin}`);

    let ErrorCode = '',ClassHourNO = '',NoonType = '',Msg = '';


    //???????????????????????????
    if (StartTime>=TransformTime(AMLimit)){

        NoonType = 2;

    }else {

        NoonType = 1;

    }

    //????????????????????????
    if (List.length===0){

        ClassHourNO = 1;

        ErrorCode = 0;

    }else{

        for(let i = 0;i<=List.length-1;i++){

            let _StartTime = TransformTime(List[i].StartTime);

            let _EndTime = TransformTime(List[i].EndTime);

            //?????????????????????????????????????????????

            if (StartTime<_StartTime){

                if (EndTime>=_StartTime){

                    ErrorCode = -1;

                    Msg = "?????????????????????";

                    break ;

                }else{

                    ClassHourNO = i+1;

                    ErrorCode = 0;

                    break ;

                }

            }else if ((StartTime>=_StartTime)&&(StartTime<=_EndTime)){



                ErrorCode = -1;

                Msg = "?????????????????????";

                break ;


            }else {

                if (i === List.length-1){

                    ClassHourNO = i+2;

                    ErrorCode = 0;

                    break ;

                }

            }


        }

    }

    return { ErrorCode:ErrorCode,ClassHourNO,NoonType,Msg };

};


//???????????????????????????????????????
const TransformTime = (Time)=>{

    let Hour = parseInt(Time.split(':')[0]);

    let Min = parseInt(Time.split(':')[1]);

    return Hour*3600+Min*60;

};

const SupplyZero = (number) => {

  let NumberStr = number.toString();

  let Number = number;

  if (NumberStr.length < 2){

      Number = `0${NumberStr}`;

  }else{

      Number = NumberStr

  }

  return Number;

};



export default {

    MANAGER_SCHEDULE_SETTING_INIT,

    MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE,

    MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE,

    MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,

    MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE,

    MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE,

    MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE,

    MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT,

    MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE,

    MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE,

    MANAGER_SCHEDULE_SETTING_SET_SWITCH_CHANGE,

    MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OPEN,

    MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE,

    MANAGER_SCHEDULE_SETTING_LINKAGE_INPUT_CHANGE,

    MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL,

    MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OK,

    PageInit,

    SettingTypeSitch,

    AdjustClassHour,

    AdjustClassHourOk,

    AddClassHour,

    AddClassHourOk,

    EditClassHourOk,

    PageUpdate,

    LinkageChange,

    SwitchTimeEditOk

};