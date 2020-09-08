import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {DatePicker} from "antd";

import {Tips,DropDown, Loading} from "../../../common";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";

import {SetTermInfo} from '../../actions/apiActions';

import './index.scss'

import moment from 'moment';

import {getQueryVariable} from "../../../common/js/disconnect";



function YearAndTerm(props) {

    //states

    const [loading,setLoading] = useState(true);

    //年学期
    const [term,setTerm] = useState({

        dropSelectd:{},

        dropList:[]

    });

    //步奏

    const [step,setStep] = useState(3);

    //学期开始日期
    const [startDate,setStartDate] = useState({

        date:'',

        tip:false

    });

    //学期结束日期
    const [endDate,setEndDate] = useState({

        date:'',

        tip:false

    });

    //学期可选范围
    const [dateRange,setDateRange] = useState([]);




    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;

    const termRef = useRef(term);

    const startDateRef = useRef(startDate);

    const endDateRef = useRef(endDate);

    const dateRangeRef = useRef(dateRange);

    const schoolTypeRef = useRef(schoolType);

    const loginUserRef = useRef(LoginUser);


    useEffect(()=>{

        loginUserRef.current = LoginUser;

    },[LoginUser]);

    useEffect(()=>{

        schoolTypeRef.current = schoolType;

        setStep(schoolType==='middle'?2:3);

    },[schoolType]);


    useEffect(()=>{

        if (SchoolID){

            const nowDate = moment();

            const nowMonth = nowDate.month();

            const nowYear = parseInt(nowDate.year());

            let title = '',value = '',dropList=[],startTime = '',endTime = '',range = [];

            if (nowMonth>6){

                value = `${nowYear}-${nowYear+1}01`;

                title = `${nowYear}～${nowYear+1}学年第1学期`;

                const preValue = `${nowYear}-${nowYear}02`;

                const preTitle = `${nowYear}～${nowYear}学年第2学期`;

                const nextValue = `${nowYear+1}-${nowYear+1}02`;

                const nextTitle = `${nowYear+1}～${nowYear+1}学年第2学期`;

                dropList = [{value:preValue,title:preTitle},{value,title},{value:nextValue,title:nextTitle}];

                range = [

                    {ID:preValue,startDate:`${nowYear}-02-01`,endDate:`${nowYear}-07-01`,startRange:`${nowYear}-01-01`,endRange:`${nowYear}-09-01`},

                    {ID:value,startDate:`${nowYear}-09-01`,endDate:`${nowYear+1}-02-01`,startRange:`${nowYear}-07-01`,endRange:`${nowYear+1}-03-01`},

                    {ID:nextValue,startDate:`${nowYear+1}-02-01`,endDate:`${nowYear+1}-07-01`,startRange:`${nowYear+1}-01-01`,endRange:`${nowYear+1}-09-01`}

                ];

                startTime = `${nowYear}-09-01`;

                endTime = `${nowYear+1}-02-01`;

            }else{

                title = `${nowYear}～${nowYear}学年第2学期`;

                value = `${nowYear}-${nowYear}02`;

                const preValue = `${nowYear-1}-${nowYear}01`;

                const preTitle = `${nowYear-1}～${nowYear}学年第1学期`;

                const nextValue = `${nowYear}-${nowYear+1}01`;

                const nextTitle = `${nowYear}～${nowYear+1}学年第1学期`;

                dropList = [{value:preValue,title:preTitle},{value,title},{value:nextValue,title:nextTitle}];

                range = [

                    {ID:preValue,startDate:`${nowYear-1}-09-01`,endDate:`${nowYear}-02-01`,startRange:`${nowYear-1}-07-01`,endRange:`${nowYear}-03-01`},

                    {ID:value,startDate:`${nowYear}-02-01`,endDate:`${nowYear}-07-01`,startRange:`${nowYear}-01-01`,endRange:`${nowYear}-09-01`},

                    {ID:nextValue,startDate:`${nowYear}-09-01`,endDate:`${nowYear+1}-02-01`,startRange:`${nowYear}-07-01`,endRange:`${nowYear+1}-03-01`}

                ]

                startTime = `${nowYear}-02-01`;

                endTime = `${nowYear}-07-01`;

            }

            setTerm(d=>{

                termRef.current = {...d,dropSelectd:{value,title},dropList};

                return {...d,dropSelectd:{value,title},dropList};

            });

            setDateRange(d=>{

                dateRangeRef.current = range;

                return range

            });

            setStartDate(d=>{

                startDateRef.current = {...d,date:startTime};

                return {...d,date:startTime};

            });

            setEndDate(d=>{

                endDateRef.current = {...d,date:endTime};

                return {...d,date:endTime};

            });

            if (schoolType==='middle'){

                dispatch(guiderStepChange(2));

                setLoading(false);

                dispatch(appLoadingHide());

            }else{

                dispatch(guiderStepChange(3));

                setLoading(false);

                dispatch(appLoadingHide());

            }

        }else{

            history.push('/schoolSetting');

        }

    },[UserID]);


    //学期变更
    const termChange = useCallback((data)=>{

        const { value } = data;


        setTerm(d=>{

           termRef.current = {...d,dropSelectd:data};

           return {...d,dropSelectd:data};

        });

        const item = dateRangeRef.current.find(i=>i.ID===value);

        setStartDate(d=>{

            startDateRef.current = {...d,date:item.startDate,tip:false};

            return {...d,date:item.startDate,tip:false};

        });

        setEndDate(d=>{

            endDateRef.current = {...d,date:item.endDate,tip:false};

            return {...d,date:item.endDate,tip:false};

        });

    },[]);


    //开始日期的禁用区间

    const startDateDisabled = useCallback((current)=>{

        const {value} = termRef.current.dropSelectd;

        const item = dateRangeRef.current.find(i=>i.ID===value);

        const endDate = endDateRef.current.date;

        const { startRange,endRange } = item;

        return current<moment(startRange)||current>moment(endRange)||current>=moment(endDate)||current<moment(endDate).subtract(6,'M');

    },[]);


    //结束日期的禁用区间

    const endDateDisabled = useCallback((current)=>{

        const {value} = termRef.current.dropSelectd;

        const item = dateRangeRef.current.find(i=>i.ID===value);

        const startDate = startDateRef.current.date;

        const { endRange,startRange } = item;

        return current<moment(startRange)||current>moment(endRange)||current<=moment(startDate)||current>moment(startDate).add(6,'M');

    },[]);

    //开始日期选取

    const startDateChange = useCallback((date,dateStr)=>{

        setStartDate(d=>{

            startDateRef.current = {...d,date:dateStr,tip:false};

            return {...d,date:dateStr,tip:false};

        });

    },[]);

    //结束日期选取

    const endDateChange = useCallback((date,dateStr)=>{

        setEndDate(d=>{

            endDateRef.current = {...d,date:dateStr,tip:false};

            return {...d,date:dateStr,tip:false};

        });

    },[]);


    //下一步
    const nextStepClick = useCallback(()=>{

        const StartDate = startDateRef.current.date;

        const EndDate = endDateRef.current.date;

        let startOk=false,endOk=false;

        if (StartDate){

            startOk = true;

        }else{

            setStartDate(d=>{

                startDateRef.current = {...d,tip:true};

                return {...d,tip:true};

            });

        }

        if (EndDate){

            endOk = true;

        }else{

            setEndDate(d=>{

                endDateRef.current = {...d,tip:true};

                return {...d,tip:true};

            });

        }

        if (endOk&&startOk){

            const TermName = termRef.current.dropSelectd.value;

            const { UserID,SchoolID } = loginUserRef.current;

            setLoading(true);

            SetTermInfo({SchoolID,UserID,TermName,StartDate,EndDate,dispatch}).then(data=>{

                if (data===0){

                    /*const url = getQueryVariable('lg_preurl');

                    const token = sessionStorage.getItem("token");

                    const {WebIndexUrl} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

                    window.location.href = url?url+'?lg_tk='+token:WebIndexUrl+'?lg_tk='+token;
*/

                    history.push('/scheduleSetting');


                }

                setLoading(false);

            })

        }

    },[]);

    //上一步

    const backStepClick = useCallback(()=>{

        if (schoolTypeRef.current==='middle'){

            history.push('/schoolSetting');

        }else{

            history.push('/college');

        }

    },[]);

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置学年学期"} step={step} tips={"(后续可通过“系统设置”模块进行管理)"}></GuideTitle>

            <div className={"year-and-term-setting"}>

                <table>

                    <tbody>

                    <tr>

                        <td className={"col1"}>学期名称:</td>

                        <td>

                            <DropDown width={250} onChange={termChange} dropSelectd={term.dropSelectd} dropList={term.dropList}></DropDown>

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>开学时间:</td>

                        <td>

                            <Tips visible={startDate.tip} title={"请选择开学时间"}>

                                <DatePicker onChange={startDateChange} disabledDate={startDateDisabled} value={startDate.date?moment(startDate.date):null}></DatePicker>

                            </Tips>

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>放假时间:</td>

                        <td>

                            <Tips visible={endDate.tip} title={"请选择放假时间"}>

                                <DatePicker disabledDate={endDateDisabled} onChange={endDateChange} value={endDate.date?moment(endDate.date):null}></DatePicker>

                            </Tips>

                        </td>

                    </tr>

                    </tbody>

                </table>

                <GuideFooter nextStepClick={nextStepClick} backStepClick={backStepClick} next={true} back={true}></GuideFooter>

            </div>

        </Loading>

    )

}

export default memo(YearAndTerm)