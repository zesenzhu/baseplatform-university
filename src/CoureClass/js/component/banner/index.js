import React,{useEffect,useState,useMemo,memo} from 'react';

import BannerTab from '../plugins/banner-tab/index';

import history from '../../containers/history';

import {useSelector,useDispatch} from 'react-redux';

import { NavLink } from 'react-router-dom';

import './index.scss';

function Index(props) {

    //是否显示tab和右侧的详情
    const [domStatus,setDomStatus] = useState({

        tab:true,

        log:true

    });


    //左侧的tab活动状态
    const [tabActive,setTabActive] = useState('manage');



    const {UserType,UserClass} = useSelector(state=>state.LoginUser);


    const {LogCount} = useSelector(state=>state.commonSetting);


    useEffect(()=>{

        switch (UserType) {

            case 0:

                setDomStatus(d=>({...d,tab:true,log:true}));

                break;

            case 1:

            case 2:

            case 7:

            case 10:

                setDomStatus(d=>({...d,tab:false,log:false}));

                break;

        }

        const pathname = history.location.pathname;

        if (pathname.includes('/manage')){

            setTabActive('manage');

        }else if (pathname.includes('/statics')){

            setTabActive('statics');

        }

    },[]);

    //tab
    const tabList = useMemo(()=>{

        return [{TabID:'statics',TabName:'教学班统计',TabUrl:'/statics'},{TabID:'manage',TabName:'教学班管理',TabUrl:'/manage'}]

    },[]);



    return(

        <div className={"banner-wrapper"}>

            <BannerTab tabList={tabList} tabActive={tabActive}>

            </BannerTab>

            <div className={"log-count-wrapper"}>

                <span className="tips">当前共有<span className={"red"}>{LogCount}</span>条更新记录

                 <NavLink className="tips_handle">查看详情</NavLink>

                </span>

            </div>

        </div>

    )

}

export default memo(Index);