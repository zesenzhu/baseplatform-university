import ModuleSettingActions from './ModuleSettingActions';

import PeriodWeekTermActions from './PeriodWeekTermActions';

import ApiActions from './ApiActions';

import LoginUserActions from "./LoginUserActions";
import {getQueryVariable} from "../../../common/js/disconnect";

const MANAGER_INTELLENCT_URL_UPDATE = 'MANAGER_INTELLENCT_URL_UPDATE';

const getCommonInfo = () => {

    return (dispatch,getState)  => {
        //获取登录信息

            const {identify} = getState();

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            let {SchoolID,UserID,UserType,UserClass} = UserInfo;

            if (parseInt(UserType)===7||parseInt(UserType)===10){

                UserType = 0;

            }

            if (parseInt(UserType)===0||(parseInt(UserType)===0&&parseInt(UserClass)===2)){

                //获取智能排课的URL

                ApiActions.GetSingleSubsystemServer(dispatch).then(data=>{

                    if (data){

                        dispatch({type:MANAGER_INTELLENCT_URL_UPDATE,data:data.WebSvrAddr});

                    }

                })

            }

            switch (parseInt(UserType)) {

                case 0:

                case 10:

                case 7:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

                    break;

                case 1:

                    dispatch({type:ModuleSettingActions.UPDATE_TEACHER_MODULE_SETTING});

                    break;

                case 2:

                    dispatch({type:ModuleSettingActions.UPDATE_STUDENT_MODULE_SETTING});

                    if (getQueryVariable('isWorkPlantform')||getQueryVariable('iFrame')){

                        document.getElementsByClassName("frame-content-wrapper")[0].style.marginTop=0;

                    }
                    break;

                default:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

            }

            //如果是导入界面
            const Hash = location.hash;

            if (Hash.includes('Import')||Hash.includes('adjustlog')||Hash.includes('scheduleSetting')){

                if (parseInt(UserType)===7||parseInt(UserType)===10){

                    UserInfo.UserType = 0;

                }

                dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

            }else{

                //获取学段等等的信息


                //修改usertype === 0 实际等于7
                ApiActions.GetTermAndPeriodAndWeekNOInfo({SchoolID,UserID,UserType,dispatch}).then(data => {

                    if (data){

                        const { ItemCollege } = data;

                        let dropShow = true,dropList=[],dropObj='';

                        if (identify.isCollegeManager){

                            dropShow=false;

                            dropObj = {id:UserInfo.CollegeID,name:UserInfo.CollegeName};

                        }else{

                             dropShow = ItemCollege.length>1?true:false;

                             dropList = ItemCollege.map(i=>({value:i.CollegeID,title:i.CollegeName}));

                            dropList.unshift({value:'',title:'全部学院'});

                            dropObj = dropShow===false?{id:ItemCollege.length>0?ItemCollege[0].CollegeID:'',name:ItemCollege.length>0?ItemCollege[0].CollegeName:''}:'';

                        }

                        const newItem = data.ItemWeek.map(i=>{

                            if (i.WeekNO===1){

                                const StartWeekDay = i.StartWeekDay;

                                let lessDate = 0;

                                switch (StartWeekDay) {

                                    case '星期日':

                                        lessDate = 6;

                                        break;

                                    case '星期六':

                                        lessDate = 5;

                                        break;

                                    case '星期五':

                                        lessDate = 4;

                                        break;

                                    case '星期四':

                                        lessDate = 3;

                                        break;

                                    case '星期三':

                                        lessDate = 2;

                                        break;

                                    case '星期二':

                                        lessDate = 1;

                                        break;

                                    default:

                                        lessDate = 0;

                                }

                                const date = new Date(i.StartDate);

                                const StartDate = getBeforeDate(date,lessDate);

                                return {

                                    ...i,

                                    StartDate,

                                    StartWeekDay:'星期一'

                                }

                            }else{

                                return i;

                            }

                        });

                        data['ItemWeek'] = newItem;

                        dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:{...data,dropShow,dropList,dropObj}});


                        if (parseInt(UserType)===0){

                            UserInfo.UserType = 0;

                        }

                        dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

                    }

                });


            }


    }

};


//在某个日期之前的某天
const  getBeforeDate = (d,n) =>{

    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;

};


export default {

    getCommonInfo,

    MANAGER_INTELLENCT_URL_UPDATE

}