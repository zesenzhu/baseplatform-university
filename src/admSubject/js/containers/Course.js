import React,{useState,useEffect,memo,useRef} from 'react';

import {connect} from 'react-redux';

import {Loading, DropDown, Button, Search, Table, PagiNation, Modal, Empty} from "../../../common";

import  '../../scss/course.scss';

import * as apiActions from '../actions/apiActions';

import {showWarnAlert,showQueryAlert,showSuccessAlert,subNameReg}  from '../actions/utils'

import {useStateValue} from "../component/hooks";

import CourseModal from '../component/CourseModal';

import upUIState from '../actions/UpUIState';




function Course(props) {

    //state

    //loading
    const [courseLoading,setCourseLoading] = useState(true);

    //学科drop
    const [subjects,setSubjects] = useState({

        dropSelectd:{value:0,title:'全部学科'},

        dropList:[]

    });

    //学院drop
    const [college,setCollege] = useState({

        dropSelectd:{value:0,title:'全部学院'},

        dropList:[],

        collegeData:[]

    });

    //课程
    const [course,setCourse] = useState({

        count:0,

        dataSource:[],

        culumns:[

            {

                title:"课程名称",

                key:'CourseName',

                dataIndex:'CourseName',

                width:260,

                align:'left',

                className:'course-name-title',

                render:(i,k)=>{

                    return <div title={i} className={"course_name"}>{i?i:'--'}</div>

                }

            },

            {

                title:"课程编号",

                key:'CourseNumber',

                dataIndex:'CourseNumber',

                // sorter:true,

                width:150,

                align:'center',

                render:(i,k)=>{

                    return <div title={i} className={"course_number"}>{i?i:'--'}</div>

                }

            },

            {

                title:"所属学科",

                key:'SubjectName',

                dataIndex:'SubjectName',

                width:120,

                align:'center',

                render:(i,k)=>{

                    return <div title={i} className={"subject_name"}>{i?i:'--'}</div>

                }

            },

            {

                title:"开课学院",

                key:'CollegeName',

                dataIndex:'CollegeName',

                width:150,

                align:'center',

                render:(i,k)=>{

                    return <div title={i} className={"college_name"}>{i?i:'--'}</div>

                }

            },

            {

                title:"课程类型",

                key:'CourseType',

                dataIndex:'CourseType',

                width:100,

                align:'center',

                render:(i,k)=>{

                    let type = '--';

                    switch (parseInt(i)) {

                        case 1:

                            type = '专业必修';

                            break;

                        case 2:

                            type = '公共必修';

                            break;

                        case 3:

                            type = '专业选修';

                            break;

                        case 4:

                            type = '公共选修';

                            break;

                        case 5:

                            type = '其他';

                            break;

                        default:

                            type = '--';

                    }

                    return <div className={"course_type"}>{type}</div>

                }

            },

            {

                title:"面向专业",

                key:'MajorNames',

                dataIndex:'MajorNames',

                width:140,

                align:'center',

                render:(i,k)=>{

                    return <div title={i} className={"major_name"}>{i?i:'--'}</div>

                }

            },

            {

                title:"操作",

                align:'center',

                dataIndex:'index',

                key:'index',

                render:(k)=>{

                    return <div className={"cooperate_wrapper"}>

                        <Button
                            color="blue"
                            type="default"
                            onClick={e=>modalOpen("edit",k)}
                            className="handle-btn"
                        >
                            编辑
                        </Button>

                        <Button color="blue" type="default" onClick={e=>delCourse(k)} className="handle-btn">删除</Button>


                        {/*<button onClick={e=>modalOpen("edit",k)} className={"btn edit"}></button>

                        <button  onClick={e=>delCourse(k)} className={"btn del"}></button>
*/}
                    </div>

                }

            },

        ]

    });

    //分页
    const [pagination,setPagination] = useState({

        current:1,

        total:0,

        pageSize:10

    });

    //排序状态
    const [order,setOrder] = useState('');

    const [search,setSearch] = useState({

       value:'',

       cancelShow:'n',

       searched:false

    });

    const [modal,setModal] = useState({

        show:false,

        type:'add',

        courseName:'',

        courseNum:'',

        subject:"",

        college:"",

        courseType:'',

        majors:[],

        courseNO:'',

        courseCredit:''

    });



    //props

    const { dispatch,LoginUser,subjectProps } = props;

    const { UserID,SchoolID,UserType } = LoginUser;

    //refs

    const pageRef = useStateValue(pagination);

    const orderRef = useStateValue(order);

    const searchRef = useStateValue(search);

    const subjectsRef = useStateValue(subjects);

    const collegeRef = useStateValue(college);

    const modalRef = useStateValue(modal);

    const courseRef = useStateValue(course);

    const CourseModalRef = useRef();


    useEffect(()=>{

         //先获取学科
         apiActions.GetSubjectInfo_University({schoolID:SchoolID,userID:UserID,userType:UserType,pageSize:0,pageIndex:1,dispatch}).then(data=>{

             if (data){//先判断查看的学科是否被删除

                 const index = data.Subjects.findIndex(i=>i.SubjectID===subjectProps.SubjectID);

                 let subjectId = '';

                 if (subjectProps.SubjectID){//判断是否传查看的学科ID

                     if (index===-1){//查看的学科没找到

                         dispatch(showWarnAlert({title:"查看的学科不存在或已被删除"}));

                     }else{//找到查看的学科

                         subjectId = subjectProps.SubjectID;

                         const targetSub = data.Subjects.find(i=>i.SubjectID===subjectProps.SubjectID)

                         const dropSelectd = {value:targetSub.SubjectID,title:targetSub.SubjectName};

                         setSubjects(e=>({...e,dropSelectd}));

                     }

                 }

                 const dropList = data.Subjects.map(item=>{

                    return { value:item.SubjectID,title:item.SubjectName };

                 });

                 dropList.unshift({value:0,title:"全部学科"});

                 setSubjects(e=>({...e,dropList}));

                 const getColleges = apiActions.GetMajorInfo_University({schoolID:SchoolID,dispatch});

                 const getCourse = apiActions.GetCourseInfo_University({schoolID:SchoolID,pageIndex:1,pageSize:10,subjectID:subjectId,dispatch});

                 Promise.all([getColleges,getCourse]).then(res=>{

                    if (res[0]){

                        const list1 = res[0].map(i=>({value:i.CollegeID,title:i.CollegeName}));

                        list1.unshift({value:0,title:"全部学院"});

                        setCollege(e=>({...e,dropList:list1,collegeData:res[0]}));

                    }

                    if (res[1]){

                        const dataSource = res[1].Courses?res[1].Courses.map((i,k)=>({...i,key:k,index:k})):[];

                        setCourse(e=>({...e,dataSource,count:res[1].Total}));

                        setPagination(e=>({...e,total:res[1].Total}));

                    }

                    setCourseLoading(false);

                    dispatch({type:upUIState.APP_LOADING_CLOSE});

                 });

             }

         });

    },[]);


    //学科选取

    const subDropChange = (obj) =>{

        setSubjects(e=>({...e,dropSelectd:obj}));

        setPagination(e=>({...e,current:1}));

        setTimeout(updateCourseTable,0);

    };

    //学院选取
    const collegeDropChange = (obj) =>{

        setCollege(e=>({...e,dropSelectd:obj}));

        setPagination(e=>({...e,current:1}));

        setTimeout(updateCourseTable,0);

    };


    //分页更新

    const pageChange = (page) =>{

        setPagination(e=>({...e,current:page}));

        setTimeout(updateCourseTable,0);

    };

    const tableChange = (p,f,sorter) =>{

        let type = '';

        switch(sorter.order){

            case 'ascend':

                type = 'ASC';

                break;

            case 'descend':

                type = 'DEC';

                break;

            default:

                type = '';



        }

        setOrder(type);

        setTimeout(updateCourseTable,0);

    };


    //搜索框输入更新
    const searchValueChange = (e) => {

        setSearch({...search,value:e.target.value});

    };

    //点击搜索按钮

    const searchClick = (key)=>{

        const {value} = key;

        let result = subNameReg(value);

        if (result){

            setPagination(e=>({...e,current:1}));

            setSearch(e=>({...e,cancelShow:'y',searched:true}));

            setTimeout(updateCourseTable,0);

        }else{

            dispatch(showWarnAlert({title:"输入的课程名称或ID格式不正确"}));

        }

    };




    //点击取消搜索
    const cancelClick = () =>{

        setPagination(e=>({...e,current:1}));

        setSearch(e=>({...e,cancelShow:'n',value:'',searched:false}));

        setTimeout(updateCourseTable,0);

    };


    //更新课程列表
    const updateCourseTable = () =>{

        setCourseLoading(true);

        const { current,pageSize }= pageRef.current;

        const value = searchRef.current.searched?searchRef.current.value:'';

        const subjectValue = subjectsRef.current.dropSelectd.value!==0?subjectsRef.current.dropSelectd.value:'';

        const collegeValue = collegeRef.current.dropSelectd.value!==0?collegeRef.current.dropSelectd.value:'';

        const orderType = orderRef.current;

        apiActions.GetCourseInfo_University({schoolID:SchoolID,subjectID:subjectValue,collegeID:collegeValue,pageIndex:current,pageSize,orderType,key:value,dispatch}).then(data=>{

           if (data){

               const dataSource = data.Courses?data.Courses.map((i,k)=>({...i,key:k,index:k})):[];

               setCourse(e=>({...e,dataSource}));

               setPagination(e=>({...e,current:data.PageIndex,total:data.Total}));

           }

            setCourseLoading(false);

        });

    };


    //关闭弹窗

    const modalClose = () =>{

        setModal(e=>({...e,show:false}));

    };

    //打开弹窗
    const modalOpen = (type,key) =>{

        if (type==='edit'){//新增课程

            const item = courseRef.current.dataSource[key];

            const { CourseNO,CourseName,CourseNumber,SubjectID,SubjectName,CollegeID,CollegeName,CourseType,MajorIDs,MajorNames,CourseCredit } = item;

            const subObj = { value:SubjectID?SubjectID:0,title:SubjectName?SubjectName:'请选择学科' };

            const collegeObj = { value:CollegeID?CollegeID:0,title:CollegeName?CollegeName:'请选择学院' };

            let courseTitle = '其他';

            switch (parseInt(CourseType)) {

                case 1:

                    courseTitle = '专业必修';

                    break;

                case 2:

                    courseTitle = '公共必修';

                    break;

                case 3:

                    courseTitle = '专业选修';

                    break;

                case 4:

                    courseTitle = '公共选修';

                    break;

                case 5:

                    courseTitle = '其他';

                    break;

                default:

                    courseTitle = '请选择课程类型';

            }

            const courseObj = {value:CourseType,title:courseTitle};

            const majorIDArr = MajorIDs?MajorIDs.split(','):[];

            setModal(e=>({...e,show:true,courseNO:CourseNO,type,courseName:CourseName,courseNum:CourseNumber,subject:subObj,college:collegeObj,courseType:courseObj,majors:majorIDArr,courseCredit:CourseCredit}));

        }else{

            setModal(e=>({...e,show:true,courseNO:'',type,courseName:'',courseNum:'',subject:subjectsRef.current.dropSelectd,college:collegeRef.current.dropSelectd,courseType:{value:0,title:"请选择课程类型"},majors:[]}));

        }

    };


    //添加/编辑课程
    const modalOk = () => {

        const { courseName,courseNum,courseNO,courseNameTipShow,courseNumTipShow,subID,collegeID,courseType,majorIDs,credit } = CourseModalRef.current;

        const { showCourseNameTips,showCourseNumTips,showSubjectTips,showCollegeTips,showCourseTypeTips,

                showMajorTips,showLoading,hideLoading

        } = CourseModalRef.current;

        let courseNameTrue=false,courseNumTrue=false,subTrue=false,collegeTrue=false,courseTypeTrue=false,majorTrue=false;

        if (!courseName){

            showCourseNameTips("请输入课程名称");

        }else if (!courseNameTipShow){

            courseNameTrue=true;

        }

        if (!courseNum){

            showCourseNumTips("请输入课程编号");

        }else if (!courseNumTipShow){

            courseNumTrue=true;

        }

        if (subID===0){

            showSubjectTips();

        }else{

            subTrue=true;

        }

        if (collegeID===0){

            showCollegeTips();

        }else{

            collegeTrue=true;

        }

        if (courseType===''||courseType===0){

            showCourseTypeTips();

        }else{

            courseTypeTrue=true;

        }

        if ((courseType===1)&&(!majorIDs)){

            showMajorTips();

        }else{

            majorTrue=true;

        }

        if (courseNameTrue&&courseNumTrue&&subTrue&&collegeTrue&&courseTypeTrue&&majorTrue){//所有的都没问题的情况下

            showLoading();

            apiActions.UpdateCourseInfo_University({SchoolID,UserID,UserType,SubjectID:subID,CourseNO:courseNO,CourseName:courseName,CourseNumber:courseNum,CollegeID:collegeID,CourseType:courseType,MajorIDs:majorIDs,CourseCredit:credit!==0?credit:'',dispatch}).then(data=>{

                if (data===0){

                    setModal(e=>({...e,show:false}));

                    dispatch(showSuccessAlert({title:modalRef.current.type==='edit'?"修改课程成功":"添加课程成功"}));

                    setTimeout(updateCourseTable,0);

                }

                hideLoading();

            });


        }

    };

    //删除课程
    const delCourse = (k) =>{

        const { CourseNO } = courseRef.current.dataSource[k];

        dispatch(showQueryAlert({title:"确定删除该课程？",ok:e=>delCourseOk(CourseNO)}))

    };

    //删除课程OK
    const delCourseOk = (CourseNO) =>{

            apiActions.DeleteCourse_University({CourseNO,SchoolID,UserType,UserID,dispatch}).then(data=>{

                if (data===0){

                    dispatch(showSuccessAlert({title:"删除成功"}));

                    setTimeout(updateCourseTable,0);

                }

            });

    };


    return(

        <div className={"course_wrapper"}>

            <Loading spinning={courseLoading}>

                <div className={"top_wrapper"}>

                    <div className={"top_title_wrapper clearfix"}>

                        <div className={"top_text"}>

                            <div className={"title"}>课程管理</div>

                        </div>

                        <Button onClick={e=>modalOpen('add')} className="top_btn" color="blue" shape="round">+添加课程</Button>

                    </div>

                    <div className={"top_content"}>

                        <div className={"top_select_wrapper"}>

                            <div className={"drop_wrapper"}>

                                <div className={"subject_wrapper"}>

                                    <span className={"drop_title"}>学科:</span>

                                    <DropDown


                                        dropSelectd={subjects.dropSelectd}

                                        dropList={subjects.dropList}

                                        onChange={subDropChange}

                                        height={300}

                                    >


                                    </DropDown>

                                    <span className={"drop_title"}>学院:</span>

                                    <DropDown

                                        dropSelectd={college.dropSelectd}

                                        dropList={college.dropList}

                                        onChange={collegeDropChange}

                                        height={300}

                                    >


                                    </DropDown>

                                </div>

                               {/* <div className={"colloge_wrapper"}>

                                    <span className={"drop_title"}>学院:</span>

                                    <DropDown

                                        dropSelectd={college.dropSelectd}

                                        dropList={college.dropList}

                                        onChange={collegeDropChange}

                                        height={300}

                                    >


                                    </DropDown>

                                </div>*/}

                            </div>

                            <div className={"selectd_layout"}>

                                {

                                    subjects.dropSelectd.value!==0&&college.dropSelectd.value!==0?

                                    `${subjects.dropSelectd.title}在${college.dropSelectd.title}下`

                                        :

                                     subjects.dropSelectd.value===0&&college.dropSelectd.value===0?

                                      '全部学科在全部学院下'

                                      :

                                      `${subjects.dropSelectd.value===0?college.dropSelectd.title:subjects.dropSelectd.title}`

                                }

                                共{search.searched?'搜索到':'开设'}<span className={"color_red"}>{pagination.total}</span>门课程

                            </div>

                        </div>

                        <div className={"top_btn_wrapper clearfix"}>

                            <Search onClickSearch={searchClick} onCancelSearch={cancelClick} onChange={e=>{e.persist();searchValueChange(e)}} Value={search.value} CancelBtnShow={search.cancelShow} placeHolder={"请输入课程编号或名称搜索"} width={240}></Search>

                        </div>

                    </div>

                </div>

                <div className={"table_wrapper"}>

                    {

                        pagination.total!==0?

                            <>

                                <Table onChange={tableChange} pagination={false} columns={course.culumns}  dataSource={course.dataSource}></Table>

                                <PagiNation current={pagination.current} onChange={pageChange} pageSize={pagination.pageSize} total={pagination.total}></PagiNation>

                            </>

                            :

                            <Empty type={"3"} title={search.searched?'没有搜索到相关课程数据':'没有课程数据'}></Empty>


                    }


                </div>

            </Loading>

            <Modal
                className={"course_modal"}
                bodyStyle={{height:'auto',padding:'20px 32px'}}
                width={740}
                type="1"
                title={modal.type==='add'?"添加课程":'编辑课程'}
                visible={modal.show}
                onOk={modalOk}
                onCancel={modalClose}

            >

                {

                    modal.show?

                        <CourseModal

                        courseNameE={modal.courseName}

                        courseNumE={modal.courseNum}

                        subList={subjects.dropList.filter(i=>i.value!==0)}

                        subSelectd={modal.subject}

                        collegeList={college.dropList.filter(i=>i.value!==0)}

                        collegeData={college.collegeData}

                        collegeSelectd={modal.college}

                        courseTypeE={modal.courseType}

                        majorListE={modal.majors}

                        type={modal.type}

                        courseNO={modal.courseNO}

                        courseCredit={modal.courseCredit}

                        ref={CourseModalRef}

                    >


                    </CourseModal>

                    :''

                }

            </Modal>

        </div>

    )

}

const mapStateToProps = (state)=>{

    const { LoginUser } = state.DataState;

    const { subjectProps } = state;

    return {LoginUser,subjectProps};

};

export default connect(mapStateToProps)(memo(Course));