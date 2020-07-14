import React,{memo} from 'react';

import '../../scss/time-banner.scss';

function TimeBanner(props) {

    const { active,list=[] } = props;

    const { timeBannerChange } = props;

    return(

        <div className={"banner-wrapper"}>

            {

                list.map((i)=>{

                    return(

                        <button key={i.ID} onClick={e=>timeBannerChange(i.ID)} className={`banner-item ${i.ID} ${active===i.ID?'active':''}`}>{i.Name}</button>

                    )

                })

            }

        </div>

    )

}

export default memo(TimeBanner);