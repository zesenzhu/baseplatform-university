import React,{useEffect,useRef,useState,memo,useCallback} from "react";

import { connect } from "react-redux";

import {Empty, Modal} from "../../../common";

import ShowCardTeacher from "./ShowCardTeacher";


import "../../scss/Teacher.scss";

import AddEditCourseClass from "../containers/Manager/AddEditCourseClass";

import {InsertOrEditCourseClass_University} from '../actions/apiActions';

import {subNameReg,showSuccessAlert} from "../actions/utils";

import {getQueryVariable } from '../../../common/js/disconnect';

import actions from "../actions";

import $ from 'jquery';

function Teacher(props){

    const [addEditCourse,setAddEditCourse] = useState({

        show:false,

        courseClassID:''

    });

    const [aiPractice,setAiPractice] = useState(false);

    //props
    const { DataState,UIState,dispatch } = props;

    const {GetTeacherCourseClassMsg,LoginUser } = DataState;

    const { CourseClassSource } = GetTeacherCourseClassMsg;

    const { UserID,UserType,SchoolID } = LoginUser;




    useEffect(()=>{

        window.updateTeacherCourseClass = updateTeacherCourseClass;

        if (getQueryVariable('aiPractice')){

            $('.frame-time-bar').css({marginBottom:'0px'});

            $('.frame-content-rightside').css({borderRadius:'0px',minHeight:'auto'});

            $('.Teacher').css({paddingTop:'0px'});

            $('.handle-content .content').css({borderRadius:'0px',boxShadow:'none',textShadow:'0px 1px 1px #333333'});

        }

    },[]);

    //ref

    const AddEditClassRef = useRef();


    const editCourseClass = useCallback((classID) => {

      setAddEditCourse(e=>({...e,show:true,courseClassID:classID}));

    },[]);

    //编辑教学班OK
    const addEditOk = useCallback(() =>{

        const { CourseClassID,CourseClassName,GradeID,showGradeTip,showCourseClassTip, CourseNO, showCourseTip, TeacherID, showTeacherTip, ClassIDs, StudentIDs, showModalLoading,hideModalLoading } = AddEditClassRef.current;

        const { SchoolID,UserID,UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));

        let courseClassOk = false,courseOk = false,teacherOk = false,gradeOk = false;

        if (!CourseClassName){

            showCourseClassTip('请输入教学班名称');

        }else{

            let result = subNameReg(CourseClassName);

            if (!result){

                showCourseClassTip('教学班名称格式不正确');

            }else{

                courseClassOk = true;

            }

        }

        if (CourseNO){

            courseOk = true;

        }else{

            showCourseTip();

        }

        if (TeacherID){

            teacherOk = true;

        }else{

            showTeacherTip();

        }

        if (GradeID){

            gradeOk = true

        }else{

            showGradeTip();

        }


        if (courseClassOk&&courseOk&&teacherOk&&gradeOk){

            showModalLoading();

            InsertOrEditCourseClass_University({SchoolID,UserID,GradeID,UserType,CourseClassID,CourseClassName,CourseNO,TeacherID,ClassIDs,StudentIDs,dispatch}).then(data=>{

                if (data===0){

                    setAddEditCourse(false);

                    dispatch(showSuccessAlert({title:'编辑教学班成功！'}));

                    dispatch(
                        actions.UpDataState.getTeacherCourseClassMsg(
                            "/GetCourseClassByUserID?schoolID=" +
                            SchoolID +
                            "&teacherID=" +
                            UserID
                        )
                    );

                }

                hideModalLoading();

            })

        }


    },[]);


    const updateTeacherCourseClass = useCallback(() =>{

        dispatch(
            actions.UpDataState.getTeacherCourseClassMsg(
                "/GetCourseClassByUserID?schoolID=" +
                SchoolID +
                "&teacherID=" +
                UserID
            )
        );

    },[]);

    return (

        <div id="Teacher" className="Teacher">

          {

          CourseClassSource instanceof Array && CourseClassSource.length > 0 ?


              CourseClassSource.map((i,k) => {

                return (

                  <ShowCardTeacher
                  key={k}
                  params={i}
                  editCourseClass ={editCourseClass}

                  updateTeacherCourseClass={updateTeacherCourseClass}

                  >

                </ShowCardTeacher>
              );
            })

              :

                <Empty
                  type="4"
                  title="您的还没有教学班哦~"
                  style={{ marginTop: "200px", transform: "translateY(-50%)" }}>

                </Empty>

        }

            <Modal
                className={"add-edit-course-class-modal"}
                type="1"
                width={800}
                destroyOnClose={true}
                title={"编辑教学班"}
                bodyStyle={{ height:520,padding: 0 }}
                visible={addEditCourse.show}
                onOk={addEditOk}
                onCancel={e=>setAddEditCourse(false)}
            >

                {

                    addEditCourse?

                        <AddEditCourseClass IsEdit={true} CourseClassID={addEditCourse.courseClassID} ref={AddEditClassRef} dispatch={dispatch} LoginUser={LoginUser}></AddEditCourseClass>

                        :''

                }

            </Modal>

      </div>

    );

}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default memo(connect(mapStateToProps)(Teacher));
