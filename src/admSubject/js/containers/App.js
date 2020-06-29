import React, { Component } from 'react';

import {  MenuLeftNoLink, Loading, Alert } from "../../../common";

import { connect } from 'react-redux';

import { TokenCheck_Connect } from '../../../common/js/disconnect';

import Frame from '../../../common/Frame';

import logo from '../../images/SubjectLogo.png'


import Subject from './Subject'

import Course from './Course';

import '../../scss/index.scss'

import actions from '../actions';

import * as menuActions from '../actions/menuActions';

import { QueryPower } from "../../../common/js/power";

import * as subActions from "../actions/subPassActions";

import {getQueryVariable} from "../../../common/js/disconnect";

const SUBJECT_MODULEID = "000-2-0-18"; //学科管理

class App extends Component {


    componentDidMount(){

        const { dispatch } = this.props;

        TokenCheck_Connect(false,()=>{

            if (sessionStorage.getItem('UserInfo')) {

                dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));

                const { UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));

                if (UserType==='0'){

                    this.requestData();

                }else{

                 window.location.href = '/error.aspx?ErrCode=E011';

                }

            }
            else {

                let that = this;

                let timeRun = setInterval(function () {

                    if (sessionStorage.getItem('UserInfo')) {

                        dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));

                        const { UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));

                        if (UserType==='0'){

                            that.requestData();

                        }else{

                            window.location.href = '/error.aspx?ErrCode=E011';

                        }

                        clearInterval(timeRun)
                    }
                }, 1000)
            }
        })

    }




    // 请求每个组件主要渲染的数据
    requestData = () => {

        const { dispatch,DataState } = this.props;

        const { LoginUser,PeriodMsd } = DataState;

        const { SchoolID } = LoginUser;

        let havePower = QueryPower({

            UserInfo: LoginUser,

            ModuleID: SUBJECT_MODULEID

        });
        havePower.then(res => {

            console.log(res);

            if (res) {//有权限

            const isCourse = getQueryVariable('isCourse');

                if (isCourse){

                    dispatch(menuActions.leftMenuChange('course'));

                }else{

                    dispatch(menuActions.leftMenuChange('subject'));

                }

            }else{

                window.location.href='/Error.aspx?errcode=E011';

            }


        })

    };


    menuClick(item){

        const { dispatch } = this.props;

        dispatch(menuActions.leftMenuChange(item.ident));

        dispatch(subActions.lookSubject(''));

    }


    render() {

        const { UIState, DataState,menu } = this.props;

        const { LoginUser } = DataState;

        const { AppAlert,AppLoading } = UIState;

        const { UserID,UserName,PhotoPath } = LoginUser;

        return (
            <React.Fragment>

                <Loading opacity={false} tip="加载中..." size="large" spinning={AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: UserName,
                        image: PhotoPath
                    }}

                           module={{
                               cnname: "学科管理",
                               enname: "Subject Management",
                               image: logo
                           }}
                           className='myFrame'
                           type="triangle"

                           showBarner={false}

                           showLeftMenu={true}>

                        <div ref={"frame-left-menu"}>

                            <MenuLeftNoLink Menu={menu.list} menuClick={this.menuClick.bind(this)}></MenuLeftNoLink>

                        </div>


                        <div ref="frame-right-content">

                            {

                                menu.active==='subject'?

                                    <Subject></Subject>

                                    :''

                            }

                            {

                                menu.active==='course'?

                                    <Course></Course>

                                    :''

                            }

                        </div>

                    </Frame>

                </Loading>

                <Alert show={AppAlert.appAlert}
                       type={AppAlert.type}
                       abstract={AppAlert.littleTitle}
                       title={AppAlert.title}
                       onOk={AppAlert.onOk}
                       onHide={AppAlert.onHide}
                       onCancel={AppAlert.onCancel}
                       onClose={AppAlert.onClose}
                       cancelShow={AppAlert.cancelShow}
                       okShow={AppAlert.okShow}
                       okTitle={AppAlert.okTitle}
                       cancelTitle={AppAlert.cancelTitle}>

                </Alert>

            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return state
};
export default connect(mapStateToProps)(App);
