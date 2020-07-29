import React,{useState,useEffect,memo} from 'react';

import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import {connect} from 'react-redux';



import Subject from './Subject';

import College from './College';

function Index(props) {


    const { dispatch } = props;

    return(

        <Router>

            <Switch>

                <Route path={'/manager/subject'}  component={Subject}></Route>

                <Route path={'/manager/college'}  component={College}></Route>

                <Redirect path={'/manager'}  to={'/manager/subject/all'}></Redirect>

            </Switch>

        </Router>

    )

}

const mapStateToProps = (state) => {

  const { commonSetting } = state;

  return {commonSetting};

};

export default connect(mapStateToProps)(memo(Index));