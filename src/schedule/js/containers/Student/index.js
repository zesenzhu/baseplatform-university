import React,{Component} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import { connect } from 'react-redux';

import StudentPersonalSchedule from "./StudentPersonalSchedule";

import apiActions from '../../actions/ApiActions';

import stuIndexActions from '../../actions/Student/StudentIndexActions';


class Index extends Component{

    constructor(props){

        super(props);

        this.state = {

            firstLoad:true

        }

    }

    componentWillReceiveProps(nextProps){

        const { LoginUser,dispatch } = nextProps;

        const { UserID,StudyLevel,SchoolID,UserType } = LoginUser;

        if (UserID&&this.state.firstLoad){

            this.setState({firstLoad:false},()=>{

                apiActions.GetAllOptionByPeriodID({SchoolID,PeriodID:'',UserID,UserType,CollegeID:''}).then(data=>{

                    if (data){

                        dispatch({type:stuIndexActions.STUDENT_CLASSHOURS_INFO_INIT,data:data});

                    }

                })


            })

        }

    }


    render() {

        return (

            <React.Fragment>

                <Router>

                    <Switch>

                        <Route key={"mine"} path="/student/mine" component={StudentPersonalSchedule}></Route>

                        <Redirect path="/student*" to={{pathname:"/student/mine"}}></Redirect>

                    </Switch>

                </Router>

            </React.Fragment>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    return { LoginUser };

};

export default connect(mapStateToProps)(Index);