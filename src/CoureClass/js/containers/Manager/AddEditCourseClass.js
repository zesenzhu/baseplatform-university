import React,{useRef,useState,useEffect,memo,useCallback,useImperativeHandle,forwardRef} from 'react';

import '../../../scss/HandleCourseClass.scss';

import {DropDown,Tips,Modal,Loading} from "../../../../common";

import {Input,Button} from "antd";

import {Scrollbars} from "react-custom-scrollbars";

import {
    GetTeacherInfo_University,
    GetCourseClassDetail_University,
    GetGradeInfo_University,
    GetAllTeachInfo_university,
    GetCourseInfoByUserID_University
} from '../../actions/apiActions';

import {subNameReg} from '../../actions/utils';

import SelectCourseModal from "./AddEditCourseClass/SelectCourseModal";

import SelectStudent from "./AddEditCourseClass/SelectStudent";

import {useSelector,useDispatch} from 'react-redux';


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

       courseCheckInfo:{CourseNO:'',CourseName:'',MajorIDs:''},

        dropSelectd:{value:'',title:'请选择课程'},

        dropList:[],

        disabled:true

    });

    const [subject,setSubject] = useState({

       tip:false,

       dropSelectd:{value:'',title:'请选择学科'},

       dropList:[]

    });

    //后台获取的元数据

    const [dataSource,setDataSource] = useState({

       subject:[],

       course:[],

       grade:[]

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

    const LoginUser = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    const { SchoolID,UserID,UserType,UserName } = LoginUser;

    const { IsEdit,CourseClassID,CourseInfo ,subjectSelectd,courseSelectd} = props;

    //ref

    const SelectCourseModalRef = useRef();

    const SelectStudentModalRef = useRef();

    const dataSourceRef = useRef(dataSource);

    //初始化

    useEffect(()=>{

        if (IsEdit){

            const getGrade = GetGradeInfo_University({schoolID:SchoolID,dispatch});

            const getCourseClassDetail = GetCourseClassDetail_University({courseClassID:CourseClassID,dispatch});

            Promise.all([getGrade,getCourseClassDetail]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const grade = data.length>0?data.map(i=>({value:i.GradeID,title:i.GradeName})):[{value:'',title:'暂无可选年级'}];

                    setGrade(d=>({...d,dropList:grade}));

                }

                 if (res[1]){

                     const data = res[1];

                    const { Item,ClassItem,CourseClassID,CourseClassName,CourseNO,CourseName,TeacherID,TeacherName,GradeID,GradeName,MajorIDs } = data;

                    if (parseInt(UserType)===1){//如果是教师端

                        setTeacher(e=>({...e,teacherInfo:{TeacherID:UserID,TeacherName:UserName}}));

                    }else if (parseInt(UserType)===0||parseInt(UserType)===10||parseInt(UserType)===7){

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

            if (parseInt(UserType)===1){

                const getSubjectCourse = GetCourseInfoByUserID_University({userID:UserID,schoolID:SchoolID,dispatch});

                const getGrade = GetGradeInfo_University({schoolID:SchoolID,dispatch});

                Promise.all([getSubjectCourse,getGrade]).then(res=>{

                    if (res[0]){

                        const data = res[0];

                        let subjectList = [],subjectDataList=[],courseDataList = [];

                        if (data.length>0){

                            subjectList = data.map(i=>({value:i.SubjectID,title:i.SubjectName}));

                            data.map(i=>{

                                if (i.Courses&&i.Courses.length>0){

                                    i.Courses.map(item=>{

                                        courseDataList.push({SubjectID:i.SubjectID,CourseNO:item.CourseNO,CourseName:item.CourseName});

                                    })

                                }

                                subjectDataList.push({SubjectID:i.SubjectID,SubjectName:i.SubjectName});

                            });

                            dataSourceRef.current.subject = subjectDataList;

                        }else{

                            subjectList.push({value:'',title:'暂无可选学科'});

                        }

                        setSubject(d=>({...d,dropList:subjectList}));

                        dataSourceRef.current.course = courseDataList;

                        setDataSource(d=>({...d,subject:subjectList,course:courseDataList}));


                    }

                    if (res[1]){

                        const data = res[1];

                        const grade = data.length>0?data.map(i=>({value:i.GradeID,title:i.GradeName})):[{value:'',title:'暂无可选年级'}];

                        setGrade(d=>({...d,dropList:grade}));

                    }

                    setTeacher(e=>({...e,teacherInfo:{TeacherID:UserID,TeacherName:UserName}}));

                    setLoading(false);

                });

            }else if (parseInt(UserType)===0||parseInt(UserType)===7||parseInt(UserType)===10) {

                //先获取全部的所需信息
                GetAllTeachInfo_university({schoolID:SchoolID,dispatch}).then(data=>{

                    if (data){

                        const { SubjectItem=[],GradeItem=[],CourseItem=[] } = data;

                        let gradeList = [],subjectList=[],courseList=[];

                        if (GradeItem&&GradeItem.length>0){

                            gradeList = GradeItem.map(i=>({value:i.GradeID,title:i.GradeName}));

                        }else{

                            gradeList = [{value:'',title:'暂无年级可选'}]

                        }

                        if (SubjectItem&&SubjectItem.length>0){

                            subjectList = SubjectItem.map(i=>({value:i.SubjectID,title:i.SubjectName}));

                        }else{

                            subjectList = [{value:'',title:'暂无学科可选'}]

                        }

                        if (CourseItem&&CourseItem.length>0){

                            courseList = CourseItem.map(i=>({value:i.CourseNO,title:i.CourseName}));

                        }else{

                            courseList = [{value:'',title:'暂无课程可选'}]

                        }

                        dataSourceRef.current.grade = GradeItem;

                        dataSourceRef.current.subject = SubjectItem;

                        dataSourceRef.current.course = CourseItem;

                        setDataSource(d=>({...d,subject:SubjectItem,course:CourseItem,grade:GradeItem}));

                        setCourse(d=>({...d,dropList:courseList}));

                        setSubject(d=>({...d,dropList:subjectList}));

                        setGrade(e=>({...e,dropList:gradeList}));

                        //三种情况
                        if (subjectSelectd.value&&courseSelectd.value){//当已选择某一个课程的时候

                            GetTeacherInfo_University({schoolID:SchoolID,courseNO:courseSelectd.value,dispatch}).then(data=>{

                                if (data){

                                    const dropList =  data.length>0?data.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:"#999999"}}>[{i.TeacherID}]</span></span>})):[{value:'',title:'该课程下暂无教师'}];

                                    setTeacher(e=>({...e,dropList,disabled:false}));

                                }

                                setLoading(false);

                            });

                            const {course} = dataSourceRef.current;

                            const list = course.filter(i=>i.SubjectID===subjectSelectd.value).map(i=>({value:i.CourseNO,title:i.CourseName}));

                            setCourse(d=>({...d,dropSelectd:courseSelectd,disabled:false,dropList:list}));

                            setSubject(d=>({...d,dropSelectd:subjectSelectd}));

                        }else if (subjectSelectd.value){//当只选择了学科的时候

                            const { course } = dataSourceRef.current;

                            const list = course.filter(i=>i.SubjectID===subjectSelectd.value).map(i=>({value:i.CourseNO,title:i.CourseName}));

                            if (list.length===0){

                                list.push({value:'',title:'暂无可选课程'});

                            }

                            setCourse(d=>({...d,dropSelectd:{value:'',title:"请选择课程"},disabled:false,dropList:list}));

                            setSubject(d=>({...d,dropSelectd:subjectSelectd}));

                            setLoading(false);

                        }else{

                            const { subject } = dataSourceRef.current;

                            const list = subject.map(i=>({value:i.SubjectID,title:i.SubjectName}));

                            if (list.length===0){

                                list.push({value:'',title:'暂无可选学科'});

                            }

                            setSubject(d=>({...d,dropSelectd:{value:'',title:"请选择学科"},dropList:list}));

                            setLoading(false);

                        }

                    }

                });

            }

            /*if (CourseInfo.CourseNO){

                if (parseInt(UserType)===0){

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

            }*/


        }

    },[]);



    //选择课程点击OK

    const selectCourseOk = () =>{

        const { checked } = SelectCourseModalRef.current;

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

        SubjectID:subject.dropSelectd.value,

        showSubjectTip:()=>setSubject(d=>({...d,tip:true})),

        CourseNO:IsEdit?course.courseCheckInfo.CourseNO:course.dropSelectd.value,

        showCourseTip:()=>setCourse(e=>({...e,tip:true})),

        TeacherID:(parseInt(UserType)===0||parseInt(UserType)===10||parseInt(UserType)===7)?teacher.dropSelectd.value:teacher.teacherInfo.TeacherID,

        showTeacherTip:()=>setTeacher(e=>({...e,tip:true})),

        ClassIDs:stuClasses.classList.map(i=>i.ClassID).join(','),

        StudentIDs:stuClasses.stuList.map(i=>i.StudentID).join(','),

        GradeID:grade.dropSelectd.value,

        showModalLoading:()=>setLoading(true),

        hideModalLoading:()=>setLoading(false),

        showGradeTip:()=>setGrade(d=>({...d,tip:true}))

    }));



    //修改选择的学科

    const subjectChange = useCallback((data)=>{

        const { value,title } = data;

        let courseList = [];

        if (value){

            const { course } = dataSourceRef.current;

            courseList = course.filter(i=>i.SubjectID===value).map(i=>({value:i.CourseNO,title:i.CourseName}))

            if (courseList.length===0){

                courseList.push({value:'',title:'暂无可选课程'});

            }

        }

        setSubject(d=>({...d,dropSelectd:data,tip:false}));

        setTeacher(d=>({...d,dropSelectd:{value:'',title:'请选择教师'},tip:false,disabled:true}));

        setCourse(d=>({...d,disabled:false,dropSelectd:{value:'',title:'请选择课程'},dropList:courseList}))

    },[]);


    //修改选择的课程

    const courseChange = useCallback((data)=>{

        const { value,title } = data;

        setCourse(d=>({...d,tip:false,dropSelectd:data}));

        if (value){

            GetTeacherInfo_University({schoolID:SchoolID,courseNO:value,dispatch}).then(data=>{

                const dropList =  data&&data.length>0?data.map(i=>({value:i.TeacherID,title:<span title={`${i.TeacherName}[${i.TeacherID}]`}>{i.TeacherName}<span style={{color:"#999999"}}>[{i.TeacherID}]</span></span>})):[{value:'',title:'该课程下暂无教师'}];

                setTeacher(e=>({...e,dropList,dropSelectd:{value:'',title:'请选择教师'},disabled:false}));

            });

        }

    },[]);


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

                        <span className="left">{IsEdit?'课程':'学科课程'}：</span>

                        <span className="right ">

                            {/*<span className={"course-name"} title={course.courseCheckInfo.CourseName}>{course.courseCheckInfo.CourseName}</span>*/}

                            {

                                !IsEdit?

                                    <>

                                        <Tips visible={subject.tip} title={"请选择学科"}>

                                            <DropDown className={"select-subject"} dropSelectd={subject.dropSelectd} dropList={subject.dropList} onChange={subjectChange}></DropDown>

                                        </Tips>

                                        <Tips visible={course.tip} title={"请选择课程"}>

                                            <DropDown className={"select-course"} disabled={course.disabled} dropSelectd={course.dropSelectd} dropList={course.dropList} onChange={courseChange}></DropDown>

                                        </Tips>

                                    </>

                                    :

                                    <span className={"course-name"}>{course.courseCheckInfo.CourseName}</span>

                            }


                        </span>

                    </div>

                </div>

                <div className="row clearfix">

                    <div className="row-column">

                        <span className="left">任课老师：</span>

                        <span className="right">

                            {

                                parseInt(UserType)===1?

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



const ForwardAddEdit = forwardRef(AddEditCourseClass);

ForwardAddEdit.defaultProps = {

    subjectSelectd:{value:'',title:'请选择学科'},

    courseSelectd:{value:'',title:'请选择课程'}

};



export default memo(ForwardAddEdit);