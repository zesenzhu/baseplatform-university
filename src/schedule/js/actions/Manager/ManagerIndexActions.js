import SCGCRActions  from './SCGCRActions'

import utils from '../utils';

import AppLoadingActions from '../../actions/AppLoadingActions'

import STSActions from './SubjectTeacherScheduleActions';

import STTActions from './SubjectTeacherTeacherActions';

import CTActions from './ClassTotalActions';

import CSActions from './ClassSingleActions';

import CRTActions from './ClassRoomTotalActions';

import CRSActions from './ClassRoomSingleActions';

import ApiActions from "../ApiActions";




//学科教师总表学科课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Manager} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

        let CollegeID = PeriodWeekTerm.dropShow?PeriodWeekTerm.dropSelectd.value:PeriodWeekTerm.dropObj.id;

            //所需的参数

        let NowWeekNo = PeriodWeekTerm.WeekNO;

        dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

        if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

            ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                SchoolID,SubjectID:'',WeekNO:0,PageIndex:1,PageSize:10,CollegeID,dispatch

            }).then(data=>{

                if (data){

                    let SubjectTeacherSchedule = [];

                    if (data.ItemTeacher.length>0){

                        SubjectTeacherSchedule =  data.ItemTeacher.map((item) => {

                            let teacherObj = {

                                id:item.TeacherID,

                                name:item.TeacherName,

                                active:false

                            };

                            let list = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((i) => {

                                if (i.TeacherID === item.TeacherID){

                                    return {

                                        ...i,

                                        type:i.ScheduleType,

                                        title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                        titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                        secondTitle:i.SubjectName,

                                        secondTitleID:i.SubjectID,

                                        thirdTitle:i.ClassRoomName,

                                        thirdTitleID:i.ClassRoomID,

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined}));

                            teacherObj['list'] = list;

                            return teacherObj;

                        });

                    }

                    const ScheduleList = [];

                    ScheduleList.push(Array.from(SubjectTeacherSchedule));

                    dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                    dispatch({type:STSActions.MANAGER_STS_SCHEDULE_UPDATE,data:ScheduleList});

                    dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT,data:data.TeacherCount});

                }

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

            let GetAllScheduleOfTeachersBySubjectIDForPage = ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                CollegeID,SchoolID,SubjectID:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfTeachersBySubjectIDForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                //组织课表的信息存放到redux中
                const json = res[1];

                let SubjectTeacherSchedule = [];

                if (json.ItemTeacher.length>0){

                    SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                        let teacherObj = {

                            id:item.TeacherID,

                            name:item.TeacherName,

                            active:false

                        };

                        let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

                            if (i.TeacherID === item.TeacherID){

                                return {

                                    ...i,

                                    type:i.ScheduleType,

                                    title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                    titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                    secondTitle:i.SubjectName,

                                    secondTitleID:i.SubjectID,

                                    thirdTitle:i.ClassRoomName,

                                    thirdTitleID:i.ClassRoomID,

                                };

                            }else {

                                return ;

                            }

                        }).filter(i => {return i!==undefined}));

                        teacherObj['list'] = list;

                        return teacherObj;

                    });

                }

                const ScheduleList = [];

                ScheduleList.push(Array.from(SubjectTeacherSchedule));

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                dispatch({type:STSActions.MANAGER_STS_SCHEDULE_UPDATE,data:ScheduleList});

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT,data:json.TeacherCount});

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }


    }

};

//学科教师总表教师课表界面初始化
const STTPageInit = () => {

  return (dispatch,getState) => {

      dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

      let {PeriodWeekTerm,LoginUser,Manager} = getState();
      //如果前面获取的周次、学段信息已获得
      let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

      let CollegeID = PeriodWeekTerm.dropShow?PeriodWeekTerm.dropSelectd.value:PeriodWeekTerm.dropObj.id;

      let NowWeekNo = PeriodWeekTerm.WeekNO;

      dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});

      if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

          ApiActions.GetTeacherBySubjectIDAndKey({

              SchoolID,SubjectID:'',CollegeID,Key:'',dispatch,Flag:0

          }).then(data=>{

              if (data){

                  //根据获取的学科信息和教师信息组织数据
                  let subjectList = Manager.SubjectCourseGradeClassRoom.ItemSubject;

                  let leftMenuData = subjectList.map((item) => {

                          let list = data.map((i) => {

                              if (i.SubjectID.includes(item.SubjectID)){

                                  return {

                                      id:i.TeacherID,

                                      name:i.TeacherName

                                  }

                              }else{

                                  return;

                              }

                          }).filter((i) =>i!==undefined);

                          return {

                              id:item.SubjectID,

                              name:item.SubjectName,

                              list

                          }

                      });

                  dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

              }

              dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

              dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

          })

      }else{

          let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

          let GetTeacherBySubjectIDAndKey = ApiActions.GetTeacherBySubjectIDAndKey({

              SchoolID,SubjectID:'',CollegeID,Key:'',dispatch,Flag:0

          });

          Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {

              //将课程、学期、等等放到redux中

              if (res[0]){

                  dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

              }

              if (res[1]){

                  //根据获取的学科信息和教师信息组织数据
                  let subjectList = res[0].ItemSubject;

                  let leftMenuData = subjectList.map((item) => {

                      let list = res[1].map((i) => {

                          if (i.SubjectID.includes(item.SubjectID)){

                              return {

                                  id:i.TeacherID,

                                  name:i.TeacherName

                              }

                          }else{

                              return;

                          }

                      }).filter((i) =>i!==undefined);

                      return {

                          id:item.SubjectID,

                          name:item.SubjectName,

                          list

                      }

                  });

                  dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

              }

              dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

              dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

          });

      }

  }

};



const ClassTotalInit = (ResetClassHour) => {

    return (dispatch,getState) => {

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Manager} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

        let WeekList = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek.length>0) {

            WeekList = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE,data:WeekList});

        let NowWeekNo = PeriodWeekTerm.WeekNO;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:NowWeekNo});

        let CollegeID = PeriodWeekTerm.dropShow?PeriodWeekTerm.dropSelectd.value:PeriodWeekTerm.dropObj.id;//所需的参数

        if (ResetClassHour){

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

            let GetAllScheduleOfCourseClassByForPage = ApiActions.GetAllScheduleOfCourseClassByForPage({

                CollegeID,SchoolID,CourseNO:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfCourseClassByForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    let ClassDropList = res[0].ItemCourse.map(item=>{

                        return {

                            value:item.CourseNO,

                            title:item.CourseName

                        }

                    });

                    ClassDropList.unshift({value:"",title:"全部课程"});

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_UPDATE,data:ClassDropList});

                }

                if (res[1]){

                    //组织课表的信息存放到redux中
                    const json = res[1];

                    let Schedule = [];

                    if (json.ItemCourseClass.length>0){

                        Schedule =  json.ItemCourseClass.map((item) => {

                            let classObj = {

                                id:item.CourseClassID,

                                name:item.CourseClassName,

                                active:false

                            };

                            let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

                                if (i.CourseClassID === item.CourseClassID){

                                    return {

                                        ...i,

                                        type:i.ScheduleType,

                                        title:i.SubjectName,

                                        titleID:i.SubjectID,

                                        secondTitle:i.TeacherName,

                                        secondTitleID:i.TeacherID,

                                        thirdTitle:i.ClassRoomName,

                                        thirdTitleID:i.ClassRoomID,

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined}));

                            classObj['list'] = list;

                            return classObj;

                        });

                    }



                    let ScheduleList = [];

                    ScheduleList.push(Array.from(Schedule));

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_INIT,data:Schedule});

                    dispatch({type:CTActions.MANAGER_CT_SCHEDULE_LIST_UPDATE,data:ScheduleList});

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_CLASS_COUNT,data:json.ClassCount});


                }

                dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            });

        }else if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

                let ClassDropList = Manager.SubjectCourseGradeClassRoom.ItemCourse.map(item=>{

                    return {

                        value:item.CourseNO,

                        title:item.CourseName

                    }

                });

                ClassDropList.unshift({value:"",title:"全部课程"});

                dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_UPDATE,data:ClassDropList});

                ApiActions.GetAllScheduleOfCourseClassByForPage({

                    CollegeID,SchoolID,CourseNO:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

                }).then(data=>{

                    if (data){

                        //组织课表的信息存放到redux中

                        let Schedule = [];

                        if (data.ItemCourseClass.length>0){

                            Schedule =  data.ItemCourseClass.map((item) => {

                                let classObj = {

                                    id:item.CourseClassID,

                                    name:item.CourseClassName,

                                    active:false

                                };

                                let list = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((i) => {

                                    if (i.CourseClassID === item.CourseClassID){

                                        return {

                                            ...i,

                                            type:i.ScheduleType,

                                            title:i.SubjectName,

                                            titleID:i.SubjectName,

                                            secondTitle:i.TeacherName,

                                            secondTitleID:i.TeacherID,

                                            thirdTitle:i.ClassRoomName,

                                            thirdTitleID:i.ClassRoomID,

                                            WeekDay:i.WeekDay,

                                            ClassHourNO:i.ClassHourNO

                                        };

                                    }else {

                                        return ;

                                    }

                                }).filter(i => {return i!==undefined}));

                                classObj['list'] = list;

                                return classObj;

                            });

                        }

                        let ScheduleList = [];

                        ScheduleList.push(Array.from(Schedule));

                        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_INIT,data:Schedule});

                        dispatch({type:CTActions.MANAGER_CT_SCHEDULE_LIST_UPDATE,data:ScheduleList});

                        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_CLASS_COUNT,data:data.ClassCount});


                    }

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

        }else{

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

            let GetAllScheduleOfCourseClassByForPage = ApiActions.GetAllScheduleOfCourseClassByForPage({

                CollegeID,SchoolID,CourseNO:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfCourseClassByForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    let ClassDropList = res[0].ItemCourse.map(item=>{

                        return {

                            value:item.CourseNO,

                            title:item.CourseName

                        }

                    });

                    ClassDropList.unshift({value:"",title:"全部课程"});

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_UPDATE,data:ClassDropList});

                }

                if (res[1]){

                    //组织课表的信息存放到redux中
                    const json = res[1];

                    let Schedule = [];

                    if (json.ItemCourseClass.length>0){

                        Schedule =  json.ItemCourseClass.map((item) => {

                            let classObj = {

                                id:item.CourseClassID,

                                name:item.CourseClassName,

                                active:false

                            };

                            let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

                                if (i.CourseClassID === item.CourseClassID){

                                    return {

                                        ...i,

                                        type:i.ScheduleType,

                                        title:i.SubjectName,

                                        titleID:i.SubjectID,

                                        secondTitle:i.TeacherName,

                                        secondTitleID:i.TeacherID,

                                        thirdTitle:i.ClassRoomName,

                                        thirdTitleID:i.ClassRoomID,

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined}));

                            classObj['list'] = list;

                            return classObj;

                        });

                    }



                    let ScheduleList = [];

                    ScheduleList.push(Array.from(Schedule));

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_INIT,data:Schedule});

                    dispatch({type:CTActions.MANAGER_CT_SCHEDULE_LIST_UPDATE,data:ScheduleList});

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_CLASS_COUNT,data:json.ClassCount});


                }

                dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            });

        }

    }

};

const ClassSingleInit = (ResetClassHour) => {

    return (dispatch,getState) => {

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});


        let {PeriodWeekTerm,LoginUser,Manager} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

        let CollegeID = PeriodWeekTerm.dropShow?PeriodWeekTerm.dropSelectd.value:PeriodWeekTerm.dropObj.id;//所需的参数

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_INIT});

        let NowWeekNo = PeriodWeekTerm.WeekNO;

        let WeekList = [];

        PeriodWeekTerm.ItemWeek.map(item=>{

            WeekList.push({

                value:item.WeekNO,

                title:item.WeekNO

            });

        });

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE,data:WeekList});

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:NowWeekNo});

        if (ResetClassHour){

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

            let GetCourseClassCourseNOAndKey = ApiActions.GetCourseClassCourseNOAndKey({

                SchoolID,CourseNO:'',CollegeID,Key:'',Flag:0,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetCourseClassCourseNOAndKey]).then(res => {

                //将课程、学期、等等放到redux中

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                }

                if (res[1]){

                    //根据获取的学科信息和教师信息组织数据
                    let GradeList = res[0].ItemCourse;

                    let leftMenuData = GradeList.map((item) => {

                        let list = res[1].map((i) => {

                            if (i.CourseNO===item.CourseNO){

                                return {

                                    id:i.CourseClassID,

                                    name:i.CourseClassName

                                }

                            }else{

                                return;

                            }

                        }).filter((i) =>i!==undefined);

                        return {

                            id:item.CourseNO,

                            name:item.CourseName,

                            list

                        }

                    });

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,data:leftMenuData});

                }

                dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

            ApiActions.GetCourseClassCourseNOAndKey({

                SchoolID,CourseNO:'',CollegeID,Key:'',Flag:0,dispatch

            }).then(data=>{

                if (data){


                    //根据获取的学科信息和教师信息组织数据
                    let GradeList = Manager.SubjectCourseGradeClassRoom.ItemCourse;

                    let leftMenuData = GradeList.map((item) => {

                        let list = data.map((i) => {

                            if (i.CourseNO===item.CourseNO){

                                return {

                                    id:i.CourseClassID,

                                    name:i.CourseClassName

                                }

                            }else{

                                return;

                            }

                        }).filter((i) =>i!==undefined);

                        return {

                            id:item.CourseNO,

                            name:item.CourseName,

                            list

                        }

                    });

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,data:leftMenuData});

                }

                dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID,UserID,UserType,dispatch});

            let GetCourseClassCourseNOAndKey = ApiActions.GetCourseClassCourseNOAndKey({

                SchoolID,CourseNO:'',CollegeID,Key:'',Flag:0,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetCourseClassCourseNOAndKey]).then(res => {

                //将课程、学期、等等放到redux中

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                }

                if (res[1]){

                    //根据获取的学科信息和教师信息组织数据
                    let GradeList = res[0].ItemCourse;

                    let leftMenuData = GradeList.map((item) => {

                        let list = res[1].map((i) => {

                            if (i.CourseNO===item.CourseNO){

                                return {

                                    id:i.CourseClassID,

                                    name:i.CourseClassName

                                }

                            }else{

                                return;

                            }

                        }).filter((i) =>i!==undefined);

                        return {

                            id:item.CourseNO,

                            name:item.CourseName,

                            list

                        }

                    });

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,data:leftMenuData});

                }

                dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }

    }

};


const ClassRoomTotalInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Manager} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            // let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

        let WeekList = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek.length>0) {

            WeekList = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE,data:WeekList});

        let NowWeekNo = PeriodWeekTerm.WeekNO;

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,data:NowWeekNo});

        if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

            let ClassRoomDropList = Manager.SubjectCourseGradeClassRoom.ItemClassRoomType.map(item=>{

                return {

                    value:item.ClassRoomTypeID,

                    title:item.ClassRoomTypeName

                }

            });

            ClassRoomDropList.unshift({value:"",title:"全部教室"});

            dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE,data:ClassRoomDropList});

            ApiActions.GetAllScheduleOfClassRoomByClassRoomTypeForPage({

                PeriodID:'',SchoolID,ClassRoomType:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            }).then(data=>{

                if (data){

                    //组织课表的信息存放到redux中

                    let Schedule = [];

                    if (data.ItemClassRoom.length>0){

                        Schedule =  data.ItemClassRoom.map((item) => {

                            let classRoomObj = {

                                id:item.ClassRoomID,

                                name:item.ClassRoomName,

                                active:false

                            };

                            let list = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((i) => {

                                if (i.ClassRoomID === item.ClassRoomID){

                                    return {

                                        ...i,

                                        type:i.ScheduleType,

                                        title:i.SubjectName,

                                        titleID:i.SubjectName,

                                        secondTitle:i.TeacherName,

                                        secondTitleID:i.TeacherID,

                                        thirdTitle:(i.ClassName?i.ClassName:i.CourseClassName),

                                        thirdTitleID:(i.ClassName?i.ClassID:i.CourseClassID),

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined}));

                            classRoomObj['list'] = list;

                            return classRoomObj;

                        });

                    }

                    let ScheduleList = [];

                    ScheduleList.push(Array.from(Schedule));

                    dispatch({type:CRTActions.MANAGER_CRT_SCHEDULE_LIST_UPDATE,data:ScheduleList});

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_INIT,data:Schedule});

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT,data:data.ClassRoomCount});


                }

                dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });


        }else{

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID:'',UserID,UserType,dispatch});

            let GetAllScheduleOfClassRoomByClassRoomTypeForPage = ApiActions.GetAllScheduleOfClassRoomByClassRoomTypeForPage({

                PeriodID:'',SchoolID,ClassRoomType:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfClassRoomByClassRoomTypeForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                if (res[0]){

                    let ClassRoomDropList = res[0].ItemClassRoomType.map(item=>{

                        return {

                            value:item.ClassRoomTypeID,

                            title:item.ClassRoomTypeName

                        }

                    });

                    ClassRoomDropList.unshift({value:"",title:"全部教室"});

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE,data:ClassRoomDropList});

                }

                if (res[1]){

                    //组织课表的信息存放到redux中
                    const json = res[1];

                    let Schedule = [];

                    if (json.ItemClassRoom.length>0){

                        Schedule =  json.ItemClassRoom.map((item) => {

                            let classRoomObj = {

                                id:item.ClassRoomID,

                                name:item.ClassRoomName,

                                active:false

                            };

                            let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

                                if (i.ClassRoomID === item.ClassRoomID){

                                    return {

                                        ...i,

                                        type:i.ScheduleType,

                                        title:i.SubjectName,

                                        titleID:i.SubjectName,

                                        secondTitle:i.TeacherName,

                                        secondTitleID:i.TeacherID,

                                        thirdTitle:(i.ClassName?i.ClassName:i.CourseClassName),

                                        thirdTitleID:(i.ClassName?i.ClassID:i.CourseClassID),

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined}));

                            classRoomObj['list'] = list;

                            return classRoomObj;

                        });

                    }

                    let ScheduleList = [];

                    ScheduleList.push(Array.from(Schedule));

                    dispatch({type:CRTActions.MANAGER_CRT_SCHEDULE_LIST_UPDATE,data:ScheduleList});

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_INIT,data:Schedule});

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT,data:json.ClassRoomCount});

                }

                dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }


    }

};

const ClassRoomSingleInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Manager} = getState();
        //如果前面获取的周次、学段信息已获得
        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

        // let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_INIT});

        let WeekList = [];

        let NowWeekNo = PeriodWeekTerm.WeekNO;

        PeriodWeekTerm.ItemWeek.map(item=>{

            WeekList.push({

                value:item.WeekNO,

                title:item.WeekNO

            });

        });

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE,data:WeekList});

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:NowWeekNo});

        if (Object.keys(Manager.SubjectCourseGradeClassRoom).length>0){

            ApiActions.GetClassRoomByClassTypeAndKey({

                SchoolID,ClassRoomTypeID:'',PeriodID:'',Key:'',Flag:0,dispatch

            }).then(data=>{

                if (data) {

                    //根据获取的学科信息和教师信息组织数据
                    let ClassRoomTypeList = Manager.SubjectCourseGradeClassRoom.ItemClassRoomType;

                    let leftMenuData = ClassRoomTypeList.map((item) => {

                        let list = data.map((i) => {

                            if (i.ClassRoomTypeID === item.ClassRoomTypeID) {

                                return {

                                    id: i.ClassRoomID,

                                    name: i.ClassRoomName

                                }

                            } else {

                                return;

                            }

                        }).filter((i) => i !== undefined);

                        return {

                            id: item.ClassRoomTypeID,

                            name: item.ClassRoomTypeName,

                            list

                        }

                    });

                    dispatch({type: CRSActions.MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE, data: leftMenuData});

                }

                dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,CollegeID:'',UserID,UserType,dispatch});

            let GetClassRoomByClassTypeAndKey = ApiActions.GetClassRoomByClassTypeAndKey({

                SchoolID,ClassRoomTypeID:'',PeriodID:'',Key:'',Flag:0,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetClassRoomByClassTypeAndKey]).then(res => {
                //将课程、学期、等等放到redux中

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});


                    if (res[1]){

                        //根据获取的学科信息和教师信息组织数据
                        let ClassRoomTypeList = res[0].ItemClassRoomType;

                        let leftMenuData = ClassRoomTypeList.map((item) => {

                            let list = res[1].map((i) => {

                                if (i.ClassRoomTypeID===item.ClassRoomTypeID){

                                    return {

                                        id:i.ClassRoomID,

                                        name:i.ClassRoomName

                                    }

                                }else{

                                    return;

                                }

                            }).filter((i) =>i!==undefined);

                            return {

                                id:item.ClassRoomTypeID,

                                name:item.ClassRoomTypeName,

                                list

                            }

                        });

                        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE,data:leftMenuData});

                    }

                }

                dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }


    }

};

export default {

    STSPageInit,

    STTPageInit,

    ClassTotalInit,

    ClassSingleInit,

    ClassRoomTotalInit,

    ClassRoomSingleInit

}