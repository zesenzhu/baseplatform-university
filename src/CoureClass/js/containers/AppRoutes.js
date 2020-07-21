import React,{useState,useEffect,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import Manage from './manage';



function AppRoutes(props){

    const {UserType,UserClass} = useSelector(state=>state.LoginUser);

    const RedirctPath = useMemo(()=>{

        switch (UserType) {

            case 0:

                return <Redirect path={"/*"} to={'/manage'}></Redirect>

                break;

        }

    },[UserType]);

    return(

        <Switch>

           {/* {

                parseInt(UserType)===0||(parseInt(UserType)===7&&parseInt(UserClass)===2)?

                    <Switch>

                        <Route exact path="/ImportFile" component={ImportFile}></Route>

                        <Route path={'/manager'} component={Manager}></Route>

                        <Route path="/Log/Record" component={Record}></Route>

                        <Route path="/Search/:value" key={history.location.pathname}  component={Search}></Route>

                        <Route path="/Log/Dynamic" component={Dynamic}></Route>

                        <Redirect path={"/"} to={"/manager/subject/all"}></Redirect>

                    </Switch>

                    :''

            }

            {

                parseInt(UserType)===1?

                    <Switch>

                        <Route exact path="/ImportFile" component={ImportFile}></Route>

                        <Route path="/Teacher" component={Teacher}></Route>

                        <Redirect path={"/"} to={"/Teacher"}></Redirect>

                    </Switch>

                    :''

            }*/}

            <Route exact path={"/manage"} component={Manage}></Route>

            {RedirctPath}

        </Switch>

    )

}



export default memo(AppRoutes);