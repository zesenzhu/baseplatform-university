import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {Table, Loading,PagiNation,Empty} from "../../../common";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";

import './index.scss'

function Import(props) {

    //states

    const [loading,setLoading] = useState(true);

    //step
    const [step,setStep] = useState(7);


    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;


    //下一步
    const completeClick = useCallback(()=>{



    },[]);

    //上一步
    const backStepClick = useCallback(()=>{

        const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        let hash = '/power';

        if (parseInt(LockerVersion)===1){

           if (schoolType==='university'){

               hash = parseInt(ProductType)===6?'/scheduleSetting':'/subject';

           }else{

               hash = '/subject';

           }

        }

        history.push(hash);

    },[]);

    useEffect(()=>{

        let step = 7;

        const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        if (parseInt(LockerVersion)===1){

            if (schoolType==='university'){

                step = parseInt(ProductType)===6?5:6;

            }else{

                step = 5;

            }

        }else{

            if (schoolType==='university'){

                step = parseInt(ProductType)===6?6:7;

            }else{

                step = 6;

            }

        }

        dispatch(guiderStepChange(step));

        setStep(step);

        setLoading(false);

    },[]);

    const lg_tk = useMemo(()=>{

        return sessionStorage.getItem("token");

    },[]);

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"快速导入基础数据"} step={step} tips={"(可跳过，后续可通过“用户档案管理”、“教学班管理”、“课程安排管理”等模块进行管理)"}></GuideTitle>

            <div className={'import-wrapper'}>

                <ul className={"content-wrapper clearfix"}>

                    <li className="item-wrapper stu">

                        <a target={"_blank"} href={`/html/admArchives/index.html?lg_tk=${lg_tk}#/ImportFile/Student`} className={"icon"}></a>

                        <div className={"title"}>导入学生</div>

                    </li>

                    <li className="item-wrapper teacher">

                        <a target={"_blank"} href={`/html/admArchives/index.html?lg_tk=${lg_tk}#/ImportFile/Teacher`} className={"icon"}></a>

                        <div className={"title"}>导入教师</div>

                    </li>

                    <li className="item-wrapper course-class">

                        <a target={"_blank"} href={`/html/CoureClass/index.html?lg_tk=${lg_tk}#/ImportFile`} className={"icon"}></a>

                        <div className={"title"}>导入教学班</div>

                    </li>

                    <li className="item-wrapper schedule">

                        <a target={"_blank"} href={`/html/schedule/index.html?lg_tk=${lg_tk}#/Import`} className={"icon"}></a>

                        <div className={"title"} >导入课程安排</div>

                    </li>

                </ul>

            </div>

            <GuideFooter back={true} next={false} complete={true} backStepClick={backStepClick}  completeClick={completeClick}></GuideFooter>

        </Loading>

    )

}

export default memo(Import);