import React,{useEffect,useState} from 'react';


import './assets/scss/index.scss';

import { Loading,Alert } from "../common";

import {getQueryVariable} from "../common/js/disconnect";

// import {decodeObjValue} from "./api/utils";

// import { showWarnAlert,hideAlert } from './store/appAlert';







function App(props){

    const [AppLoading,setAppLoading] = useState(true);



    useEffect(()=>{



    },[]);


    return(

        <div className={`app`}>



        </div>

    )

}




export default App;