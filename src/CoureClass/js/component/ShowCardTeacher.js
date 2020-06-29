import React,{useState,useRef,useEffect,memo} from 'react'

import { connect } from 'react-redux';

import actions from '../actions';

import { postData } from '../../../common/js/fetch'

import '../../scss/ShowCard.scss'

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';

import CONFIG from '../../../common/js/config';

import history from "../containers/history";

function ShowCardTeacher(props){


    //props

    const { dispatch, DataState, UIState,editCourseClass } = props;

    const { LoginUser } = DataState;

    const { SchoolID, UserID, UserType } = LoginUser;


    //编辑教学班
    const onHandleClick = (classID) => {

        editCourseClass(classID);

        /*dispatch(actions.UpUIState.ChangeCourseClassModalOpen());

        dispatch(actions.UpDataState.getCourseClassDetailsHandleClassMsg('/GetCourseClassDetail_University?courseClassID=' + classID))
*/


    };
    //删除教学班
    const onDeleteClick = (classID) => {
        
        dispatch(actions.UpUIState.showErrorAlert({
            type: 'btn-warn',
            title: "您确定删除？",
            ok: e=>onAppAlertDeleteOK(classID),
            cancel:onAppAlertCancel,
            close:onAppAlertClose
        }));

    };

     //关闭
  const onAlertWarnHide = () => {

    dispatch(actions.UpUIState.hideErrorAlert());

  };
    //单个删除
    const onAppAlertDeleteOK = (id) => {

        let userMsg = DataState.LoginUser;

        let url = '/DeleteCourseClass';

        dispatch(actions.UpUIState.hideErrorAlert());

        postData(CONFIG.CourseClassProxy + url, {
            courseClassIDs: id,
            schoolID:SchoolID,
            userID:UserID,
            userType:UserType
        },2,'json').then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: e=>onAlertWarnHide()
                }));
                history.push('/Teacher')

            }
        })
    };

    //通用提示弹窗
    const onAppAlertOK = () => {

        dispatch(actions.UpUIState.hideErrorAlert());

    };


    const onAppAlertCancel = () => {

        dispatch(actions.UpUIState.hideErrorAlert());

    };
    const onAppAlertClose = () => {

        dispatch(actions.UpUIState.hideErrorAlert());

    };
    //查看教学班
    const onCheckClick = (classID) => {

        dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

        dispatch(actions.UpDataState.getCourseClassDetailsMsg('/GetCourseClassDetail_University?courseClassID='+classID))

    };

        return (

            <div className='ShowCard-box-Teacher '>

                <div className='box-3'></div>
                <div className='box-2'></div>

                <div className='box-main'>
                    <div className='main-content'>
                        <p className='content-tips' title={props.params.CourseClassName}>{props.params.CourseClassName}</p>
                        <div className='content-hr' ></div>
                        <div className='content-details'>
                            <div className='details-row clearfix'>
                                <span className='left'>学科：</span>
                                <span className='right subjectName'>{props.params.SubjectName}</span>
                            </div>
                            <div className='details-row clearfix'>
                                <span className='left'>学生数量：</span>
                                <span className='right'>{props.params.StudentCount}人<span onClick={e=>onCheckClick(props.params.CourseClassID)} className='checkStudent' >查看学生名单</span></span>
                            </div>

                        </div>

                    </div>
                    <div className='handle-content'>
                        <span onClick={e=>onHandleClick(props.params.CourseClassID)} className='left'><i className='resetName'></i><span>编辑</span></span>
                        <span onClick={e=>onDeleteClick(props.params.CourseClassID)} className='right'><i className='Delete'></i><span>删除</span></span>
                        <span className='divide'></span>
                    </div>
                </div>
            </div>

        )

}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};


export default memo(connect(mapStateToProps)(ShowCardTeacher));