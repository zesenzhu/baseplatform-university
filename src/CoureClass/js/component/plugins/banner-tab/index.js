import React,{useEffect,useCallback,useMemo,memo} from 'react';

import history from '../../../containers/history';

import './index.scss';

function Banner(props) {

    const {tabList,tabActive} = props;

    //切换活动状态
    const activeChange = useCallback(()=>{

        const activeUrl = tabList.find(i=>i.TabID===tabActive).TabUrl;

        return history.push(activeUrl);

    },[tabActive]);

    return(

        <div className={"banner-tab-wrapper"}>

            {

                tabList.map(i=>{

                    return(

                        <button onClick={activeChange} key={i.TabID} className={`tab-item ${i.TabID} ${i.TabID===tabActive?'active':''}`}>{i.TabName}</button>

                    )

                })

            }

        </div>

    )

}

Banner.defaultProps = {

    tabList:[],

    tabActive:''

};

export default memo(Banner);