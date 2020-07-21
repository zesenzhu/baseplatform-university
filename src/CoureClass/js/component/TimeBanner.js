import React,{useState,useEffect,memo,useRef} from "react";
import {HashRouter as Router,Route,NavLink,BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import {Button, Modal, Search} from "../../../common";
import "../../scss/TimeBanner.scss";
import actions from "../actions";
import history from "../containers/history";
import {changeBreadCrumb} from '../reducers/breadCrumb';

import CourseClassDetails from "./CourseClassDetails";

import {showSuccessAlert,subNameReg} from "../actions/utils";

import {AhthorCreateCourseClass_University,InsertOrEditCourseClass_University} from '../actions/apiActions';

import AutoCourseContent from "../containers/Manager/AutoCourseContent";

import AddEditCourseClass from "../containers/Manager/AddEditCourseClass";

function TimeBanner(props){

  //state

    const [keyword,setKeyWord] = useState('');

    const [CancelBtnShow,setCancelBtn] = useState('n');

    const [searchValue,setSearchValue] = useState('');

    const [userMsg,setUserMsg] = useState(props.DataState.LoginUser);

    const [autoCourseModal,setAutoCourse] = useState(false);

    //添加教学班

    const [addEditCourse,setAddEditCourse]= useState({

        show:false,

        CourseInfo:{

            CourseNO:'',

            CourseName:'',

            MajorIDs:''

        }

    });


    //props

    const {dispatch,UIState,DataState,breadCrumb} = props;

    const { LoginUser } = DataState;


    const { SchoolID,UserID,UserType } = LoginUser;

    //初始化

    useEffect(()=>{

        let route = history.location.pathname;
        let pathArr = route.split("/");
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];
        let Key = '';
        if(handleRoute==='Search'){

            setCancelBtn('y');

            setKeyWord(routeID);

            setSearchValue(routeID);

        }else{

            setCancelBtn('n');

            setKeyWord('');

            setSearchValue('');

        }

    },[]);



    //ref

    //弹窗ref

    const AddEditClassRef = useRef();

    const AutoCourseRef = useRef();

  const onAddCourseClassClick = () => {

    /*dispatch(actions.UpDataState.setCourseClassName([]));
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
    dispatch(actions.UpUIState.AddCourseClassModalOpen());*/

    let CourseNO='',CourseName = '',MajorIDs='';

    if(history.location.pathname.split('/')[4]&&breadCrumb.step===3){

        if (history.location.pathname.split('/')[2]==='subject'){

            CourseNO = breadCrumb.subject.activeCourse.id;

            CourseName = breadCrumb.subject.activeCourse.name;

            MajorIDs = breadCrumb.subject.activeCourse.majorIDs;

        }else if(history.location.pathname.split('/')[2]==='college'){

            CourseNO = breadCrumb.college.activeCourse.id;

            CourseName = breadCrumb.college.activeCourse.name;

            MajorIDs = breadCrumb.college.activeCourse.majorIDs;

        }

    }

    setAddEditCourse(data=>({...data,show:true,CourseInfo:{CourseNO,CourseName,MajorIDs}}));

  };
  const onTeacherAddCoureClassClick = () => {
    const { dispatch, UIState } = props;
    if (UIState.teacherAddLoading) {
      return;
    }
    dispatch(actions.UpDataState.setCourseClassName([]));
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
    dispatch(actions.UpUIState.AddCourseClassModalOpen());
  };
  //关闭
  const  onAlertWarnHide = () => {
    const { dispatch } = props;

    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //搜索
  const onClickSearch = value => {
    const { DataState, UIState, dispatch } = props;
    if (value.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "搜索关键字不能为空",
          ok: onAppAlertOK,
          cancel: onAppAlertCancel,
          close: onAppAlertClose,
          onHide: onAlertWarnHide
        })
      );
      return;
    }
    if (/^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value.value) ===false ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "搜索关键字为汉字、字母、数字以及括号组成",
          ok: onAppAlertOK,
          cancel: onAppAlertCancel,
          close: onAppAlertClose
        })
      );
      return;
    }

    history.push("/Search/" + value.value);

    console.log(value.value);

    let SubjectID = DataState.GetCoureClassAllMsg.Subject;
    let GradeID = DataState.GetCoureClassAllMsg.Grade;
      setCancelBtn('y');
      setKeyWord(value.value);
  };
  //通用提示弹窗
  const onAppAlertOK = () => {
    const { dispatch } = props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  const onAppAlertCancel = () => {
    const { dispatch } = props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  const onAppAlertClose = () => {
    const { dispatch } = props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //查看记录
  const onCheckLogClick = () => {

    const { DataState, UIState, dispatch } = props;


  };
  //搜索change
  const onChangeSearch = e => {

    setSearchValue(e.target.value.toString().trim());

  };
  // 取消搜索
  const onCancelSearch = e => {
    const { dispatch, DataState } = props;
    let SubjectID = DataState.GetCoureClassAllMsg.Subject;
    let GradeID = DataState.GetCoureClassAllMsg.Grade;
      setCancelBtn('n');

      setKeyWord('');

      setSearchValue('');

    history.push("/All");

  };


  const tabChange = () =>{

      dispatch(changeBreadCrumb({step:1,...breadCrumb}));

  };

  //自动生成教学班OK
  const autoCourseOk = () =>{

        const pathList = history.location.pathname.split('/');

        const  { courseIDs,gradeIDs,type,showCourseTip,hideCourseTip,showGradeTip,hideGradeTip,showModalLoading,hideModalLoading } = AutoCourseRef.current;

        let courseOk=false,gradeOk = false;

       if (courseIDs.length>0){

           courseOk = true;

       }else{

           showCourseTip();

       }
       
       if (gradeIDs.length>0){

           gradeOk = true;

       }else{

           showGradeTip();

       }

       if (gradeOk&&courseOk){

           const CourseNOs = courseIDs.join(',');

           const GradeIDs = gradeIDs.join(',');

           const Type = type;

           showModalLoading();

           AhthorCreateCourseClass_University({SchoolID,UserType,UserID,CourseNOs,GradeIDs,Type,dispatch}).then(data=>{

               if (data===0){

                   setAutoCourse(false);

                    dispatch(showSuccessAlert({title:'自动生成教学班成功'}));

                    //window.location.reload()

                   if (pathList[4]){

                       window.updateCourseClassTable();

                   }else{
                       
                       if (pathList[1]==='Teacher'){

                           window.updateTeacherCourseClass();

                       }else if (pathList[1]==='Search'){

                           window.updateCourseClassTable();

                       }else{

                           if (pathList[2]==='subject'){

                               if (pathList[3]==='all'){

                                   window.updateSubjectList();

                               }else{

                                   window.updateSubjectCourseList();

                               }

                           }else if (pathList[2]==='college') {

                               if (pathList[3]==='all'){

                                   window.updateCollegeList();

                               }else{

                                   window.updateCollegeCourseList();

                               }

                           }

                       }

                   }

               }

               hideModalLoading();

           });
       }

  };


  //添加教学班OK

    const addEditOk = () =>{

        const pathList = history.location.pathname.split('/');

        const { CourseClassID,CourseClassName,showCourseClassTip,GradeID,showGradeTip,CourseNO, showCourseTip, TeacherID, showTeacherTip, ClassIDs, StudentIDs, showModalLoading,hideModalLoading } = AddEditClassRef.current;

        const { SchoolID,UserID,UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));

       let courseClassOk = false,courseOk = false,teacherOk = false,gradeOk=false;

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

            gradeOk = true;

        }else{

            showGradeTip();

        }


        if (courseClassOk&&courseOk&&teacherOk&&gradeOk){

            showModalLoading();

            InsertOrEditCourseClass_University({SchoolID,UserID,GradeID,UserType,CourseClassID,CourseClassName,CourseNO,TeacherID,ClassIDs,StudentIDs,dispatch}).then(data=>{

                if (data===0){

                    setAddEditCourse(e=>({...e,show:false,CourseInfo:{CourseNO:'',CourseName:''}}));

                    dispatch(showSuccessAlert({title:'添加教学班成功！'}));

                    if (pathList[4]){

                        window.updateCourseClassTable();

                    }else{

                        if (pathList[1]==='Teacher'){

                            window.updateTeacherCourseClass();

                        }else if (pathList[1]==='Search'){

                            window.updateCourseClassTable();

                        }else{

                            if (pathList[2]==='subject'){

                                if (pathList[3]==='all'){

                                    window.updateSubjectList();

                                }else{

                                    window.updateSubjectCourseList();

                                }

                            }else if (pathList[2]==='college') {

                                if (pathList[3]==='all'){

                                    window.updateCollegeList();

                                }else{

                                    window.updateCollegeCourseList();

                                }

                            }

                        }

                    }

                }

                hideModalLoading();

            })

        }


    };


    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];

    return (
      <React.Fragment>
        <Router>
          {

            handleRoute !== "Teacher" ?

                <>

                  <div className={"course-college-wrapper ant-radio-group ant-radio-group-solid"}>

                    <NavLink to={{pathname:'/manager/college'}} onClick={tabChange} activeClassName={"ant-radio-button-checked"}  className={"ant-radio-button-wrapper"}>

                        <span className="ant-radio-button">

                            <input type="radio" className="ant-radio-button-input" value="b" />

                            <span className="ant-radio-button-inner"></span>

                            <span>按学院管理</span>

                        </span>

                    </NavLink>

                      <NavLink to={{pathname:'/manager/subject'}} onClick={tabChange} activeClassName={"ant-radio-button-checked"} className={"ant-radio-button-wrapper"}>

                        <span className="ant-radio-button">

                            <input type="radio" className="ant-radio-button-input" value="b" />

                            <span className="ant-radio-button-inner"></span>

                            <span>按学科管理</span>

                        </span>

                      </NavLink>


                  </div>

                  <div>
              {DataState.GetCoureClassAllMsg.newData.LastLogCount?(<span className="timeBanner_tips">
                当前共有
                <span style={{ color: "#333", fontSize: 16 + "px" }}>
                  {DataState.GetCoureClassAllMsg.newData
                    ? DataState.GetCoureClassAllMsg.newData.LastLogCount
                    : 0}
                  条更新记录
                </span>
                <NavLink
                  to="/Log/Dynamic"
                  target="_blank"
                  rel="tips_handle"
                  onClick={onCheckLogClick}
                  className="tips_handle"
                >
                  查看详情
                </NavLink>
              </span>):(<span className="timeBanner_tips">
                <span>当前没有更新记录</span>

                <NavLink
                  to="/Log/Record"
                  target="_blank"
                  rel="tips_handle"
                  style={{marginLeft:'5px'}}
                  onClick={onCheckLogClick}
                  className="tips_handle"
                >
                  查看历史记录
                </NavLink>
              </span>)}
              <div className="handle-content">

                  <div className={"enter_class_wrapper"}>

                        <span className={" input"}>录入教学班</span>

                        <div className="import-list-wrapper">

                             <div className="import-cours-class">

                                 <span className={"import"}>

                                     <NavLink exact to={"/ImportFile"} target="_blank">导入教学班</NavLink>

                                 </span>

                             </div>

                             <div className="auto-cours-class">

                                 <span className={"auto"} onClick={e=>setAutoCourse(true)}>自动生成教学班</span>

                             </div>

                            <div className="add-cours-class">

                                <span className={"add"} onClick={onAddCourseClassClick}>添加教学班</span>

                            </div>

                        </div>

                  </div>

               {/* <Button
                  onClick={onAddCourseClassClick}
                  className="content content-button"
                  height="24"
                  type="primary"
                  color="blue"
                  value="添加教学班"
                  shape="round"
                />

                <NavLink exact to={"/ImportFile"} target="_blank">
                  <Button
                    className="content content-button"
                    height="24"
                    type="primary"
                    color="blue"
                    value="导入教学班"
                    shape="round"
                  />
                </NavLink>*/}

                <span className="divide content">|</span>
                <Search
                  className="content search"
                  placeHolder="请输入班级名称或教师信息搜索..."
                  width={270}
                  Value={searchValue}
                  onChange={onChangeSearch}
                  onCancelSearch={onCancelSearch}
                  CancelBtnShow={CancelBtnShow}
                  onClickSearch={onClickSearch}>

                </Search>
              </div>
            </div>

                </>

                :

                <div className="handle-content">
              <Button
                onClick={onAddCourseClassClick}
                className="content content-button"
                height="24"
                type="primary"
                color="blue"
                value="添加教学班"
                shape="round"
              />
              <NavLink to={"/ImportFile"} target="_blank">
                <Button
                  className="content content-button"
                  height="24"
                  type="primary"
                  color="blue"
                  value="导入教学班"
                  shape="round"
                />
              </NavLink>
            </div>
          }
        </Router>

          <Modal
              className={"auto-course-class-modal"}
              bodyStyle={{height:'auto'}}
              width={640}
              type="1"
              destroyOnClose={true}
              title={"自动生成教学班"}
              visible={autoCourseModal}
              onOk={autoCourseOk}
              onCancel={e=>setAutoCourse(false)}
          >

              {

                  autoCourseModal?

                      <AutoCourseContent ref={AutoCourseRef} dispatch={dispatch} LoginUser={LoginUser}></AutoCourseContent>

                      :''

              }

          </Modal>

          <Modal
              className={"add-edit-course-class-modal"}
              type="1"
              width={800}
              destroyOnClose={true}
              title={"添加教学班"}
              bodyStyle={{ height:520,padding:0}}
              visible={addEditCourse.show}
              onOk={addEditOk}
              onCancel={e=>setAddEditCourse(data=>({...data,show:false,CourseInfo:{CourseNO:'',CourseName:''}}))}
          >

              {

                  addEditCourse.show?

                      <AddEditCourseClass  ref={AddEditClassRef} dispatch={dispatch} LoginUser={LoginUser} CourseInfo={addEditCourse.CourseInfo}></AddEditCourseClass>

                      :''

              }

          </Modal>

      </React.Fragment>
    );

}
const mapStateToProps = state => {
  let { UIState, DataState,breadCrumb } = state;
  return {
    UIState,
    DataState,
    breadCrumb
  };
};
export default connect(mapStateToProps)(memo(TimeBanner));
