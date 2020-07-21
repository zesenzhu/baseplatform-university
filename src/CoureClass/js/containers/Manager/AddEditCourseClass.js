import React,{useRef,useState,useEffect,memo,useImperativeHandle,forwardRef} from 'react';

import '../../../scss/HandleCourseClass.scss';

import {DropDown,Tips,Modal,Loading} from "../../../../common";

import {Input,Button} from "antd";

import {Scrollbars} from "react-custom-scrollbars";

import {GetTeacherInfo_University,GetCourseClassDetail_University,GetGradeInfo_University} from '../../actions/apiActions';

import {subNameReg} from '../../actions/utils';

import SelectCourseModal from "./AddEditCourseClass/SelectCourseModal";

import SelectStudent from "./AddEditCourseClass/SelectStudent";


function AddEditCourseClass(props,ref) {

    //loading
    const [loading,setLoading] = useState(true);

    //初次加载

    const [selectCourseModal,setSelectCourseModal] = useState(false);

    const [selectStuModal,setSelectStuModal] = useState(false);

    //教学班相关
    const [courseClass,setCourseClass] = useState({

        tip:false,

        tipTitle:'请输入教学班名称',

        value:'',

        courseClassID:''

    });

    //课程相关
    const [course,setCourse] = useState({

       tip:false,

       courseCheckInfo:{CourseNO:'',CourseName:'',MajorIDs:''}

    });

    //教师相关
    const [teacher,setTeacher] = useState({

       tip:false,

       disabled:true,

       dropSelectd:{value:'',title:'请选择教师'},

       dropList:[],

       teacherInfo:{TeacherID:'',TeacherName:''}

    });

    //学生和行政班
    const [stuClasses,setStuClasses] = useState({

        stuList:[],

        classList:[],

        dataList:[]

    });


    //年级相关

    const [grade,setGrade] = useState({

        tip:false,

        dropSelectd:{value:'',title:'请选择所属年级'},

        dropList:[]

    });


    //获取props
    const { LoginUser,dispatch } = props;

    const { SchoolID,UserID,UserType,UserName } = LoginUser;

    const { IsEdit,CourseClassID,CourseInfo } = props;


    //ref

    const SelectCourseModalRef = useRef();

    const SelectStudentModalRef = useRef();

    //初始化

    useEffect(()=>{

        if (IsEdit){

            GetCourseClassDetail_University({courseClassID:CourseClassID,dispatch}).then(data=>{

                 if (data){

                    const { Item,ClassItem,CourseClassID,CourseClassName,CourseNO,CourseName,TeacherID,TeacherName,GradeID,GradeName,MajorIDs } = data;

                    if (UserType===1){//如果是教师端

                        setTeacher(e=>({...e,teacherInfo:{TeacherID:UserID,TeacherName:UserName}}));

                    }else if (UserType===0){

                        setTeacher(e=>({...e,disabled:false,dropSelectd:{value:TeacherID?TeacherID:'',title:TeacherName?<span title={`${TeacherName}[${TeacherID}]`}>{TeacherName}<span style={{color:'#999999'}}>[{TeacherID}]</span></span>:'请选择教师'}}));

                        GetTeacherInfo_University({schoolID:SchoolID,courseNO:CourseNO,dispatch}).then(data=>{

                            if (data){

                                const dropList =  data.length>0?data.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:"#999999"}}>[{i.TeacherID}]</span></span>})):[{value:'',title:'该课程下暂无教师'}];

                                setTeacher(e=>({...e,dropList}));

                            }

                        });

                    }

                    setCourseClass(e=>({...e,courseClassID:CourseClassID,value:CourseClassName}));

                    const ids = MajorIDs?MajorIDs:'';

                    setCourse(e=>({...e,courseCheckInfo:{CourseNO,CourseName,MajorIDs:ids}}));

                    setGrade(e=>({...e,dropSelectd:{value:GradeID?GradeID:'',title:GradeName?GradeName:'请选择所属年级'}}));

                    //组织数据

                    const classList = ClassItem?ClassItem:[];

                    const classIDs = classList.map(item=>item.ClassID);

                    const stuList = Item?Item.filter(i=>{

                        const isContain = classIDs.includes(i.ClassID);

                        return !isContain;

                    }):[];

                    setStuClasses(e=>({...e,stuList,classList}));

                 }

                 setLoading(false);

            })

        }else{

            if (UserType===1){

                setTeacher(e=>({...e,teacherInfo:{TeacherID:UserID,TeacherName:UserName}}));

            }


            if (CourseInfo.CourseNO){

                if (UserType===0){

                    GetTeacherInfo_University({schoolID:SchoolID,courseNO:CourseInfo.CourseNO,dispatch}).then(data=>{

                        if (data){

                            const dropList =  data.length>0?data.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:"#999999"}}>[{i.TeacherID}]</span></span>})):[{value:'',title:'该课程下暂无教师'}];

                            setTeacher(e=>({...e,dropList,disabled:false}));

                        }

                        const MajorIDs = CourseInfo.MajorIDs?CourseInfo.MajorIDs:'';

                        setCourse(e=>({...e,courseCheckInfo:{CourseNO:CourseInfo.CourseNO,CourseName:CourseInfo.CourseName,MajorIDs}}));

                        setLoading(false);

                    });

                }else{

                    setCourse(e=>({...e,courseCheckInfo:{CourseNO:CourseInfo.CourseNO,CourseName:CourseInfo.CourseName,MajorIDs:''}}));

                    setLoading(false);

                }

            }else{

                setLoading(false);

            }

        }

        GetGradeInfo_University({schoolID:SchoolID,dispatch}).then(data=>{

               let gradeList = [];

                if (data&&data.length>0){

                    gradeList = data.map(i=>({value:i.GradeID,title:i.GradeName}));

                }else{

                    gradeList = [{value:'',title:'暂无年级可选'}]

                }

                setGrade(e=>({...e,dropList:gradeList}));

        });

    },[]);



    //选择课程点击OK

    const selectCourseOk = () =>{

        const { checked } = SelectCourseModalRef.current;


        console.log(checked);

        setCourse(data=>({...data,courseCheckInfo:checked,tip:false}));

        const {CourseNO} = checked;

        
        if (CourseNO){

            GetTeacherInfo_University({schoolID:SchoolID,courseNO:CourseNO,dispatch}).then(data=>{

                const dropList =  data&&data.length>0?data.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:"#999999"}}>[{i.TeacherID}]</span></span>})):[{value:'',title:'该课程下暂无教师'}];

                setTeacher(e=>({...e,dropList,dropSelectd:{value:'',title:'请选择教师'}}));

                setTeacher(e=>({...e,disabled:false}));

            });

        }

        setSelectCourseModal(false);

    };

    //选择学生点击OK

    const selectStudentOk = () =>{

        const { classCheckList,stuCheckList } = SelectStudentModalRef.current;

        setStuClasses(data=>({...data,classList:classCheckList,stuList:stuCheckList}));

        setSelectStuModal(false);

    };


    //课程名称blur

    const courseClassBlur = () =>{

        if(courseClass.value){

            let result = subNameReg(courseClass.value);

            if (result){

                setCourseClass(data=>({...data,tip:false}));

            }else{

                setCourseClass(data=>({...data,tip:true,tipTitle:'课程名称格式不正确'}));

            }

        }else{

            setCourseClass(data=>({...data,tip:false}));

        }

    };


    //删除已选中的班级或者学生
    const delCheckedItem = ({type,ClassID,StudentID}) =>{

        const copyClassList = Array.from(stuClasses.classList);

        const copyStuList = Array.from(stuClasses.stuList);

        if (type===1){//删除的是班级

            const findIndex = copyClassList.findIndex(i=>i.ClassID===ClassID);

            copyClassList.splice(findIndex,1);

        }else{

            const findIndex = copyStuList.findIndex(i=>i.StudentID===StudentID);

            copyStuList.splice(findIndex,1);

        }

        setStuClasses(data=>({...data,stuList:copyStuList,classList:copyClassList}));

    };


    //清空

    const clearEmpty = () =>{

      setStuClasses(e=>({...e,stuList:[],classList:[],dataList:[]}));

    };


    useImperativeHandle(ref,()=>({

        CourseClassName:courseClass.value,

        CourseClassID:courseClass.courseClassID,

        showCourseClassTip:(title)=>setCourseClass(e=>({...e,tip:true,tipTitle:title})),

        CourseNO:course.courseCheckInfo.CourseNO,

        showCourseTip:()=>setCourse(e=>({...e,tip:true})),

        TeacherID:UserType===0?teacher.dropSelectd.value:teacher.teacherInfo.TeacherID,

        showTeacherTip:()=>setTeacher(e=>({...e,tip:true})),

        ClassIDs:stuClasses.classList.map(i=>i.ClassID).join(','),

        StudentIDs:stuClasses.stuList.map(i=>i.StudentID).join(','),

        GradeID:grade.dropSelectd.value,

        showModalLoading:()=>setLoading(true),

        hideModalLoading:()=>setLoading(false),

        showGradeTip:()=>setGrade(d=>({...d,tip:true}))

    }));




    return(

        <Loading spinning={loading} tip={"加载中，请稍候..."}>

            <div id="HandleCourseClass" ref={ref} className="HandleCourseClass">

                <div className="row clearfix">

                    <div className="row-column">

                        <span className="left">教学班名称：</span>

                        <span className="right ">

                        <Tips
                            overlayClassName="tips"
                            visible={courseClass.tip}
                            title={courseClass.tipTitle}
                        >
                            <Input
                                placeholder="请输入教学班名称..."
                                style={{width: 180}}
                                type="text"
                                maxLength={10}
                                onBlur={courseClassBlur}
                                onChange={e=>{e.persist();setCourseClass(data=>({...data,value:e.target.value}))}}
                                value={courseClass.value}
                            />

                        </Tips>

                    </span>


                    </div>

                    <div className="row-column">

                        <span className="left">课程：</span>

                        <span className="right ">

                            <Tips visible={course.tip} title={"请选择课程"}>

                                <span className={"course-name"} title={course.courseCheckInfo.CourseName}>{course.courseCheckInfo.CourseName}</span>

                                {

                                    !IsEdit?

                                        <Button type={'link'} onClick={e=>setSelectCourseModal(true)}>选择课程</Button>

                                        :''
                                }

                            </Tips>

                        </span>

                    </div>

                </div>

                <div className="row clearfix">

                    <div className="row-column">

                        <span className="left">任课老师：</span>

                        <span className="right">

                            {

                                UserType===1?

                                    <span className={"teacher-name"}>{teacher.teacherInfo.TeacherName}</span>

                                    :

                                    <Tips visible={teacher.tip} title={"请选择任课教师"}>

                                        <DropDown

                                            dropSelectd={teacher.dropSelectd}

                                            dropList={teacher.dropList}

                                            disabled={teacher.disabled}

                                            height={300}

                                            width={160}

                                            TitleShow={false}

                                            onChange={e=>setTeacher(data=>({...data,dropSelectd:e,tip:false}))}

                                        >

                                        </DropDown>

                                    </Tips>

                            }

                        </span>

                    </div>

                    <div className="row-column">

                        <span className="left">所属年级：</span>

                        <span className="right">

                            <Tips visible={grade.tip} title={"请选择所属年级"}>

                                <DropDown

                                    dropSelectd={grade.dropSelectd}

                                    dropList={grade.dropList}

                                    height={300}

                                    width={160}

                                    onChange={e=>setGrade(data=>({...data,dropSelectd:e,tip:false}))}

                                >

                                </DropDown>

                            </Tips>

                        </span>

                    </div>

                </div>

                <div className="row clearfix">

                    <div className=" row-column row-column-2">

                        <span className="left">学生名单：</span>

                        <span className="right right-2">

                        <div className="Student-box">

                          <div className="box-top">

                            <span className="top-left">

                                {

                                    stuClasses.classList.length>0?

                                        <span>已选<span className={"count"}>{stuClasses.classList.length}</span>个行政班</span>

                                        :''

                                }

                                {

                                    stuClasses.stuList.length>0?

                                        stuClasses.classList.length>0?

                                        <span>+<span className="count">{stuClasses.stuList.length}</span>名学生</span>

                                        :

                                        <span>已选<span className="count">{stuClasses.stuList.length}</span>名学生</span>

                                        :''

                                }

                            </span>

                            <span className="top-right">

                                <span onClick={e=>setSelectStuModal(true)} className="handle select">选择</span>

                                <span onClick={clearEmpty} className="handle deleteAll">清空</span>

                            </span>

                          </div>

                          <div className="box-content">



                              {

                                  stuClasses.classList.length>0?

                                      <div className={"class-wrapper"}>

                                          {
                                              stuClasses.stuList.length>0?

                                                  <div className="props">

                                                      行政班:

                                                  </div>

                                                  :''

                                          }

                                          <div className={`class-list-wrapper list-wrapper ${stuClasses.stuList.length===0?'no-border':''}`}>

                                              <Scrollbars style={{height:stuClasses.stuList.length>0?130:324}}>

                                                  <div className={"card-wrapper"}>

                                                      {

                                                          stuClasses.classList.map((i,k)=>{

                                                              return(

                                                                  <span className="content-card" key={k}>

                                                                     <span title={i.ClassName} className="card-name">{i.ClassName}</span>

                                                                      {/*<span title={i.ClassID} className="card-id">{i.ClassID}</span>*/}

                                                                      <span className="icon-x" onClick={e=>delCheckedItem({type:1,ClassID:i.ClassID})}></span>

                                                                </span>

                                                              )

                                                          })

                                                      }

                                                  </div>

                                              </Scrollbars>

                                          </div>

                                      </div>

                                      :''

                              }

                              {

                                  stuClasses.stuList.length>0?

                                      <div className={"stu-wrapper"}>

                                          {

                                              stuClasses.classList.length>0?

                                                  <div className="props">

                                                      学生:

                                                  </div>

                                                  :''

                                          }

                                          <div className={`stu-list-wrapper list-wrapper ${stuClasses.classList.length===0?'no-border':''}`}>

                                              <Scrollbars style={{height:stuClasses.classList.length>0?130:324}}>

                                                  <div className={"card-wrapper"}>

                                                      {

                                                          stuClasses.stuList.map((i,k)=>{

                                                              return(

                                                                  <span className="content-card" key={k}>

                                                             <div title={i.StudentName} className="card-name">{i.StudentName}</div>

                                                             <div title={i.StudentID} className="card-id">{i.StudentID}</div>

                                                             <span className="icon-x" onClick={e=>delCheckedItem({type:2,StudentID:i.StudentID,ClassID:i.ClassID})}></span>

                                                        </span>

                                                              )

                                                          })

                                                      }

                                                  </div>

                                              </Scrollbars>

                                          </div>

                                      </div>

                                      :''

                              }


                          </div>

                        </div>

                    </span>

                    </div>

                </div>

            </div>

            <Modal
                className={"select-course-modal"}
                bodyStyle={{height:400,padding:'30px 0px 30px 40px'}}
                width={400}
                type="1"
                destroyOnClose={true}
                title={"选择课程"}
                visible={selectCourseModal}
                onOk={selectCourseOk}
                onCancel={e=>setSelectCourseModal(false)}

            >

                {

                    selectCourseModal?

                        <SelectCourseModal courseCheckInfo={course.courseCheckInfo} ref={SelectCourseModalRef}>



                        </SelectCourseModal>

                        :''

                }

            </Modal>

            <Modal
                type="1"
                width={720}
                mask={false}
                title={"选择学生"}
                bodyStyle={{ height:480, padding: 0 }}
                visible={selectStuModal}
                onOk={selectStudentOk}
                onCancel={e=>setSelectStuModal(false)}
            >
                {

                    selectStuModal ?

                        <SelectStudent majorChecked={course.courseCheckInfo.MajorIDs?course.courseCheckInfo.MajorIDs:''}  gradeChecked={grade.dropSelectd} stuCheckedList={stuClasses.stuList}  classCheckedList={stuClasses.classList} ref={SelectStudentModalRef}></SelectStudent>

                        : ''

                }

            </Modal>

        </Loading>



    )

}

export default memo(forwardRef(AddEditCourseClass));