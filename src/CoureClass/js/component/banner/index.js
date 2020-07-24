import React,{useEffect,useState,useMemo,memo} from 'react';

import BannerTab from '../plugins/banner-tab/index';


import {useSelector,useDispatch} from 'react-redux';

import { NavLink,withRouter } from 'react-router-dom';

import './index.scss';

import history from "../../containers/history";

import {bannerHide, bannerShow} from "../../reducers/bannerState";

import {leftMemuHide, leftMemuShow} from "../../reducers/leftMenu";

function Index(props) {


    const {UserType,UserClass} = useSelector(state=>state.LoginUser);

    const {LogCount} = useSelector(state=>state.commonSetting);


    //tab
    const tabList = useMemo(()=>{

        return [{TabID:'statics',TabName:'教学班统计',TabPath:'/statics'},{TabID:'manage',TabName:'教学班管理',TabPath:'/manage'}]

    },[]);



    return(

        <div className={"banner-wrapper"}>

            <BannerTab tabList={tabList}>

            </BannerTab>

            <div className={"log-count-wrapper"}>

                <span className="tips">当前共有<span className={"red"}>{LogCount}</span>条更新记录

                    <NavLink target={"_blank"} to={"/Log/Dynamic"} className="tips_handle">查看详情</NavLink>

                </span>

            </div>

        </div>

    )

}

export default memo(Index);