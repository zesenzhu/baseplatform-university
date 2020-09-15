import React,{useState,useEffect,memo,useRef,useMemo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {appLoadingHide} from "../../reducers/AppLoading";

import {
    GetAllTeachInfo_university,
    GetCourseClassInfoForPage_University,
    DeleteCourseClass_University,
    InsertOrEditCourseClass_University,
    CombineCourseClass_University
} from '../../actions/apiActions';

import TitleBar from '../../component/plugins/title-bar';

import AddEditCourseClass from "../Manager/AddEditCourseClass";

import {logCountUpdate} from "../../reducers/commonSetting";

import {Button} from "antd";

import {DropDown, Search, Table, PagiNation, CheckBox,

    CheckBoxGroup, Loading, Empty, Alert, Modal} from "../../../../common";

import {teacherSearchReg,showWarnAlert,hideAlert,showQueryAlert,subNameReg} from '../../actions/utils';

import CombineCourseClass from "../Manager/CombineCourseClass";

import {leftMemuHide} from "../../reducers/leftMenu";

import './index.scss';

import actions from "../../actions";


function Index(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //tableLoading
    const [tableLoading,setTableLoading] = useState(false);

    //学科

    const [subjects,setSubjects] = useState({

       dropSelectd:{value:'',title:'全部学科'},

       dropList:[]

    });

    //课程
    const [courses,setCourses] = useState({

        dropSelectd:{value:'',title:'全部课程'},

        dropList:[],

        disabled:true

    });

    //年级
    const [grades,setGrades] = useState({

        dropSelectd:{value:'',title:'全部年级'},

        dropList:[]

    });

    //学院
    const [college,setColleges] = useState({

        dropSelectd:{value:'',title:'全部学院'},

        dropList:[]

    });

    //搜索

    const [search,setSearch] = useState({

        value:'',

        CancelBtnShow:'n',

    });

    //分页

    const [pagination,setPagination] = useState({

       current:1,

       pageSize:10,

       total:0,

       pageSizeList:['10','20','50','100']

    });


    //dataSoucrce 后台返回的数据源

    const [dataSource,setDataSource] = useState({

        dropsInfo:{},

        courseClass:[]

    });


    //选择
    const [check,setCheck] = useState({

       list:[],

       checked:false

    });


    //成功的alert

    const [successAlert,setSuccessAlert] = useState({

        show:false,

        title:''

    });

    //合班modal
    const [combineModal,setCombineModal] = useState({

        show:false,

        courseNO:''

    });

    //添加或者编辑教学班
    const [addEditCourse,setAddEditCourse] = useState({

        show:false,

        courseClassID:'',

        isEdit:false,

        CourseInfo:{

            CourseNO:'',

            CourseName:'',

            MajorIDs:''

        }

    });


    //是否是ai实训

    const [isAiPractice,setIsAiPractice] = useState(false);


    const LoginUser = useSelector(state=>state.LoginUser);

    const { collegeID,collegeName,gradeID,gradeName,subjectID,subjectName,courseType,courseTypeName,courseName,courseID,teachingRoomID,teachingRoomName,teacherID,teacherName } = useSelector(state=>state.breadCrumb.manage);

    const {UserType,UserClass,SchoolID,UserID} = LoginUser;

    const dispatch = useDispatch();




    //ref

    const subjectsRef = useRef(subjects);

    const coursesRef = useRef(courses);

    const gradesRef = useRef(grades);

    const collegeRef = useRef(college);

    const searchRef = useRef(search);

    const paginationRef = useRef(pagination);

    const dataSourceRef = useRef(dataSource);

    const checkRef = useRef(check);

    //弹窗ref
    const CombineCourseRef = useRef();

    const AddEditClassRef = useRef();


    //componentDidMount




    useEffect(()=>{

        let isUnmount = false;

        if (SchoolID){

            const {ProductType} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            if (collegeID&&collegeName&&gradeID&&gradeName){

                collegeRef.current = {...collegeRef.current,dropSelectd:{value:collegeID,title:collegeName}};

                gradesRef.current = {...gradesRef.current,dropSelectd:{value:gradeID,title:gradeName}};

                setColleges(d=>({...d,dropSelectd:{value:collegeID,title:collegeName}}));

                setGrades(d=>({...d,dropSelectd:{value:gradeID,title:gradeName}}));

            }

            if (subjectID&&courseID){

                subjectsRef.current = {...subjectsRef.current,dropSelectd:{value:subjectID,title:subjectName}};

                coursesRef.current = {...coursesRef.current,dropSelectd:{value:courseID,title:courseName}};

                setSubjects(d=>({...d,dropSelectd:{value:subjectID,title:subjectName}}));

                setCourses(d=>({...d,dropSelectd:{value:courseID,title:courseName}}));

            }

            if (teacherID&&teacherName){

                searchRef.current = {...searchRef.current,value:teacherID,CancelBtnShow:'y'};

                setSearch(d=>({...d,value:teacherID,CancelBtnShow:'y'}));

            }

            if (parseInt(ProductType)===6){

                setIsAiPractice(true);

            }

            const subjectIDValue = subjectsRef.current.dropSelectd.value;

            const courseNOValue = coursesRef.current.dropSelectd.value;

            const collegeIDValue = collegeRef.current.dropSelectd.value;

            const gradeIDValue = gradesRef.current.dropSelectd.value;

            const key = searchRef.current.CancelBtnShow==='n'?'':searchRef.current.value;

            const pageSize = paginationRef.current.pageSize;

            const pageIndex = paginationRef.current.current;

            const GetAllInfo = GetAllTeachInfo_university({schoolID:SchoolID,dispatch});

            const GetCourseClassInfoForPage = GetCourseClassInfoForPage_University({schoolID:SchoolID,subjectID:subjectIDValue,courseNO:courseNOValue,collegeID:collegeIDValue,gradeID:gradeIDValue,key,pageIndex,pageSize,userID:UserID,userType:UserType,dispatch});

            Promise.all([GetAllInfo,GetCourseClassInfoForPage]).then(res=>{

                if (!isUnmount){

                    let LogCount = 0;

                    if (res[0]){

                        //数据源留存
                        setDataSource(d=>{

                            dataSourceRef.current = {...d,dropsInfo:{...res[0]}};

                            return {...d,dropsInfo:{...res[0]}}

                        });

                        const data = res[0];

                        let subjectList = [],collegeList = [],gradeList=[],courseList = [],courseDisabled=true;

                        if(data.SubjectItem&&data.SubjectItem.length>0){

                            subjectList = data.SubjectItem.map(i=>({value:i.SubjectID,title:i.SubjectName}));

                        }

                        subjectList.unshift({value:'',title:'全部学科'});

                        if(data.CollegeItem&&data.CollegeItem.length>0){

                            collegeList = data.CollegeItem.map(i=>({value:i.CollegeID,title:i.CollegeName}));

                        }

                        collegeList.unshift({value:'',title:'全部学院'});

                        if(data.GradeItem&&data.GradeItem.length>0){

                            gradeList = data.GradeItem.map(i=>({value:i.GradeID,title:i.GradeName}));

                        }

                        gradeList.unshift({value:'',title:'全部年级'});

                        if (parseInt(ProductType)===6){

                            courseList = data.CourseItem.map(i=>{

                                return { value:i.CourseNO,title:i.CourseName };

                            });

                            setCourses(d=>({...d,dropList:courseList,disabled:false}));

                        }else{

                            if (courseID&&subjectID){

                                if(data.CourseItem&&data.CourseItem.length>0){

                                    courseList = data.CourseItem.filter(i=>i.SubjectID===subjectID).map(i=>({value:i.CourseNO,title:i.CourseName}));

                                }

                                courseList.unshift({value:'',title:'全部课程'});

                                courseDisabled = false;

                            }

                            setCourses(d=>({...d,dropList:courseList,disabled:courseDisabled}));

                        }

                        setSubjects(d=>{

                            subjectsRef.current = {...d,dropList:subjectList};

                            return {...d,dropList:subjectList};

                        });

                        setColleges(d=>{

                            collegeRef.current = {...d,dropList:collegeList};

                            return {...d,dropList:collegeList};

                        });

                        setGrades(d=>{

                            gradesRef.current = {...d,dropList:gradeList};

                            return {...d,dropList:gradeList};

                        });

                    }

                    if (res[1]){

                        let tableList = res[1].Item&&res[1].Item.length>0?res[1].Item.map((i,k)=>{

                            const NO = createNO(k);

                            return {...i,key:i.CourseClassID,NO};

                        }):[];

                        const total = res[1].CourseClassCount?res[1].CourseClassCount:0;

                        const current = res[1].PageIndex?res[1].PageIndex:1;

                        setPagination(d=>{

                            paginationRef.current = {...d,total:total,current};

                            return {...d,total:total,current};

                        });

                        setDataSource(d=>{

                            dataSourceRef.current = {...d,courseClass:tableList};

                            return {...d,courseClass:tableList}

                        });

                        LogCount = res[1].LastLogCount?res[1].LastLogCount:0;

                    }

                    dispatch(logCountUpdate(LogCount));

                    setLoading(false);

                    dispatch(appLoadingHide());

                    dispatch(leftMemuHide());

                }

            });

        }

        return ()=>{

            isUnmount = true;

        }

    },[UserID]);


    //成功的出现函数

    const successAlertShow = useCallback((title)=>{

        setSuccessAlert(d=>({...d,show:true,title}));

    },[]);

    //成功的消失函数

    const successAlertHide = useCallback(()=>{

        setSuccessAlert(d=>({...d,show:false}));

    },[]);

    //界面初始化函数
    const pageInit = (isUnmount) =>{

        const subjectID = subjectsRef.current.dropSelectd.value;

        const courseNO = coursesRef.current.dropSelectd.value;

        const collegeID = collegeRef.current.dropSelectd.value;

        const gradeID = gradesRef.current.dropSelectd.value;

        const key = searchRef.current.CancelBtnShow==='n'?'':searchRef.current.value;

        const pageSize = paginationRef.current.pageSize;

        const pageIndex = paginationRef.current.current;

        const GetAllInfo = GetAllTeachInfo_university({schoolID:SchoolID,dispatch});

        const GetCourseClassInfoForPage = GetCourseClassInfoForPage_University({schoolID:SchoolID,subjectID,courseNO,collegeID,gradeID,key,pageIndex,pageSize,userID:UserID,userType:UserType,dispatch});

        Promise.all([GetAllInfo,GetCourseClassInfoForPage]).then(res=>{

           if (!isUnmount){

               let LogCount = 0;

               if (res[0]){

                   //数据源留存
                   setDataSource(d=>{

                       dataSourceRef.current = {...d,dropsInfo:{...res[0]}};

                       return {...d,dropsInfo:{...res[0]}}

                   });

                   const data = res[0];

                   let subjectList = [],collegeList = [],gradeList=[],courseList = [],courseDisabled=true;

                   if(data.SubjectItem&&data.SubjectItem.length>0){

                       subjectList = data.SubjectItem.map(i=>({value:i.SubjectID,title:i.SubjectName}));

                   }

                   subjectList.unshift({value:'',title:'全部学科'});

                   if(data.CollegeItem&&data.CollegeItem.length>0){

                       collegeList = data.CollegeItem.map(i=>({value:i.CollegeID,title:i.CollegeName}));

                   }

                   collegeList.unshift({value:'',title:'全部学院'});

                   if(data.GradeItem&&data.GradeItem.length>0){

                       gradeList = data.GradeItem.map(i=>({value:i.GradeID,title:i.GradeName}));

                   }

                   gradeList.unshift({value:'',title:'全部年级'});


                   if (courseID&&subjectID){

                       if(data.CourseItem&&data.CourseItem.length>0){

                           courseList = data.CourseItem.filter(i=>i.SubjectID===subjectID).map(i=>({value:i.CourseNO,title:i.CourseName}));

                       }

                       courseList.unshift({value:'',title:'全部课程'});

                       courseDisabled = false;

                   }

                   setCourses(d=>({...d,dropList:courseList,disabled:courseDisabled}));

                   setSubjects(d=>{

                       subjectsRef.current = {...d,dropList:subjectList};

                       return {...d,dropList:subjectList};

                   });

                   setColleges(d=>{

                       collegeRef.current = {...d,dropList:collegeList};

                       return {...d,dropList:collegeList};

                   });

                   setGrades(d=>{

                       gradesRef.current = {...d,dropList:gradeList};

                       return {...d,dropList:gradeList};

                   });

               }

               if (res[1]){

                   let tableList = res[1].Item&&res[1].Item.length>0?res[1].Item.map((i,k)=>{

                       const NO = createNO(k);

                       return {...i,key:i.CourseClassID,NO};

                   }):[];

                   const total = res[1].CourseClassCount?res[1].CourseClassCount:0;

                   const current = res[1].PageIndex?res[1].PageIndex:1;

                   setPagination(d=>{

                       paginationRef.current = {...d,total:total,current};

                       return {...d,total:total,current};

                   });

                   setDataSource(d=>{

                       dataSourceRef.current = {...d,courseClass:tableList};

                       return {...d,courseClass:tableList}

                   });

                   LogCount = res[1].LastLogCount?res[1].LastLogCount:0;

               }

               dispatch(logCountUpdate(LogCount));

               setLoading(false);

               dispatch(appLoadingHide());

           }

        });

    };


    const titleBtns = useMemo(()=>{

        return <>

            <Button type={"link"} className={"add"} onClick={e=>addCourseClass()}>添加教学班</Button>

            <Button type={"link"} className={"import"} onClick={e=>importCourseClass()}>导入教学班</Button>

        </>

    },[]);

    //导入教学班
    const importCourseClass = ()=>{

        const token = sessionStorage.getItem("token");

        window.open("/html/CoureClass#/ImportFile?lg_tk="+token);

    };


    //生成序号函数
    const createNO = useCallback((key)=>{

        const {current,pageSize} = paginationRef.current;

        const num = (current - 1)*pageSize + (key+1);

        const NO = num<10?`0${num}`:num;

        return NO;

    },[]);

    //表格的table
    const columns = useMemo(()=>{

        if (isAiPractice){

            return [

                {

                    dataIndex:'NO',

                    align:'center',

                    width:80,

                    render:(i,data)=>{

                        return <div className={"no"}>

                            <CheckBox value={data}>{i}</CheckBox>

                        </div>

                    }

                },

                {

                    dataIndex:'CourseClassName',

                    width:210,

                    title:'班级名称',

                    render:(i,data)=>{

                        return <Button type={"link"} onClick={e=>openClassDetail(data.CourseClassID)} className={"course-class-name"} title={i}>{i}</Button>

                    }

                },

                {

                    width:140,

                    title:'任课教师',

                    align:'left',

                    render:(i)=>{

                        return <div className={"teacher-info"}>

                            {

                                i.TeacherID?

                                    <>

                                        <i className={"teacher-pic"} style={{backgroundImage:`url(${i.PhotoPath})`}}></i>

                                        <div className={"teacher-msg"}>

                                            <div className={"name"} title={i.TeacherName}>{i.TeacherName}</div>

                                            <div className={"id"} title={i.TeacherID}>{i.TeacherID}</div>

                                        </div>

                                    </>

                                    :

                                    <div className={"emp"}>--</div>

                            }

                        </div>

                    }

                },

                {

                    dataIndex:'StudentCount',

                    width:90,

                    align:'center',

                    title:'学生人数',

                    render:(i)=>{

                        return <div className={"stu-num"}>{i}人</div>

                    }

                },

                {

                    width:150,

                    align:'center',

                    title:'课程',

                    render:(i)=>{

                        return <div className={"sub-course"} title={i.CourseName}>{i.CourseName}</div>

                    }

                },

                {

                    dataIndex:'GradeName',

                    width:100,

                    align:'center',

                    title:'所属年级',

                    render:(i)=>{

                        return <div className={"grade"} title={i}>{i}</div>

                    }

                },

                {

                    dataIndex:'CollegeName',

                    width:170,

                    align:'center',

                    title:'所属院系',

                    render:(i)=>{

                        return <div className={"college"} title={i}>{i}</div>

                    }

                },

                {

                    width:170,

                    align:'center',

                    title:'操作',

                    render:(i)=>{

                        return <div className={"cooperate"}>

                            <Button className={"edit btn-blue-default"} onClick={e=>editCourseClass(i.CourseClassID)}>编辑</Button>

                            <Button className={"del btn-blue-default"} onClick={e=>delCourseClass(2,i.CourseClassID)}>删除</Button>

                        </div>

                    }

                }

            ]

        }else{

            return [

                {

                    dataIndex:'NO',

                    align:'center',

                    width:80,

                    render:(i,data)=>{

                        return <div className={"no"}>

                            <CheckBox value={data}>{i}</CheckBox>

                        </div>

                    }

                },

                {

                    dataIndex:'CourseClassName',

                    width:210,

                    title:'班级名称',

                    render:(i,data)=>{

                        return <Button type={"link"} onClick={e=>openClassDetail(data.CourseClassID)} className={"course-class-name"} title={i}>{i}</Button>

                    }

                },

                {

                    width:140,

                    title:'任课教师',

                    align:'left',

                    render:(i)=>{

                        return <div className={"teacher-info"}>

                            {

                                i.TeacherID?

                                    <>

                                        <i className={"teacher-pic"} style={{backgroundImage:`url(${i.PhotoPath})`}}></i>

                                        <div className={"teacher-msg"}>

                                            <div className={"name"} title={i.TeacherName}>{i.TeacherName}</div>

                                            <div className={"id"} title={i.TeacherID}>{i.TeacherID}</div>

                                        </div>

                                    </>

                                    :

                                    <div className={"emp"}>--</div>

                            }

                        </div>

                    }

                },

                {

                    dataIndex:'StudentCount',

                    width:90,

                    align:'center',

                    title:'学生人数',

                    render:(i)=>{

                        return <div className={"stu-num"}>{i}人</div>

                    }

                },

                {

                    width:150,

                    align:'center',

                    title:'学科课程',

                    render:(i)=>{

                        return <div className={"sub-course"} title={`${i.SubjectName}>${i.CourseName}`}>{i.SubjectName}>{i.CourseName}</div>

                    }

                },

                {

                    dataIndex:'GradeName',

                    width:100,

                    align:'center',

                    title:'所属年级',

                    render:(i)=>{

                        return <div className={"grade"} title={i}>{i}</div>

                    }

                },

                {

                    dataIndex:'CollegeName',

                    width:170,

                    align:'center',

                    title:'所属院系',

                    render:(i)=>{

                        return <div className={"college"} title={i}>{i}</div>

                    }

                },

                {

                    width:170,

                    align:'center',

                    title:'操作',

                    render:(i)=>{

                        return <div className={"cooperate"}>

                            <Button className={"edit btn-blue-default"} onClick={e=>editCourseClass(i.CourseClassID)}>编辑</Button>

                            <Button className={"del btn-blue-default"} onClick={e=>delCourseClass(2,i.CourseClassID)}>删除</Button>

                        </div>

                    }

                }

            ]

        }

    },[isAiPractice]);

    //学科变化
    const subjectChange = useCallback((data)=>{

        const {value} = data;

        const { dropsInfo } = dataSourceRef.current;

        subjectsRef.current = {...subjectsRef.current,dropSelectd:data};

        setSubjects(d=>{

           return {...d,dropSelectd:data};

        });

        let courseList = [];

        if (dropsInfo.CourseItem&&(dropsInfo.CourseItem instanceof Array)){

            courseList = dropsInfo.CourseItem.filter(i=>i.SubjectID===value).map(i=>({value:i.CourseNO,title:i.CourseName}));

        }

        courseList.unshift({value:'',title:'全部课程'});

        const disabled = value?false:true;

        coursesRef.current = {...coursesRef.current,disabled,dropSelectd:{value:'',title:'全部课程'},dropList:courseList};

        setCourses(d=>{

            return {...d,disabled,dropSelectd:{value:'',title:'全部课程'},dropList:courseList};

        });

        paginationRef.current = {...paginationRef.current,current:1};

        setPagination(d=>{

            return {...d,current:1};

        });

        updateTable();

    },[]);

    //课程变化
    const courseChange = useCallback((data)=>{

        coursesRef.current = {...coursesRef.current,dropSelectd:data};

        setCourses(d=>{

            return {...d,dropSelectd:data};

        });

        paginationRef.current = {...paginationRef.current,current:1};

        setPagination(d=>{

            return {...d,current:1};

        });

        updateTable();

    },[]);

    //学院变化
    const collegeChange = useCallback((data)=>{

        collegeRef.current = {...collegeRef.current,dropSelectd:data};

        setColleges(d=>{

            return {...d,dropSelectd:data};

        });

        paginationRef.current = {...paginationRef.current,current:1};

        setPagination(d=>{

            return {...d,current:1};

        });

        updateTable();

    },[]);

    //年级变化
    const gradeChange = useCallback((data)=>{

        gradesRef.current = {...gradesRef.current,dropSelectd:data};

        setGrades(d=>{

            return {...d,dropSelectd:data};

        });

        paginationRef.current = {...paginationRef.current,current:1};

        setPagination(d=>{

            return {...d,current:1};

        });

        updateTable();

    },[]);

    //页码变化
    const pageChange = useCallback((page)=>{

        paginationRef.current = {...paginationRef.current,current:page};

        setPagination(d=>{

            return {...d,current:page};

        });

        updateTable();

    },[]);

    //页容变化
    const pageSizeChange = useCallback((current,pageSize)=>{

        paginationRef.current = {...paginationRef.current,current:1,pageSize};

        setPagination(d=>{

            return {...d,current:1,pageSize};

        });

        updateTable();

    },[]);

    //搜索变化
    const searchValueChange = useCallback((e)=>{

        e.persist();

        setSearch(d=>{

            searchRef.current = {...d,value:e.target.value};

            return {...d,value:e.target.value};

        })

    },[]);

    //点击搜索

    const searchClick = useCallback((data)=>{

        const {value} =data;

        const result = teacherSearchReg(value);

        if (result){

            searchRef.current = {...searchRef.current,CancelBtnShow:'y'};

            setSearch(d=>{

                return {...d,CancelBtnShow:'y'};

            });

            paginationRef.current = {...paginationRef.current,current:1};

            setPagination(d=>{

                return {...d,current:1};

            });

            updateTable();

        }else{

            dispatch(showWarnAlert({title:'输入的教师姓名或教学班名称格式不正确'}));

        }

    },[]);


    //取消搜索

    const searchCancel = useCallback(()=>{

        searchRef.current = {...searchRef.current,CancelBtnShow:'n',value:''};

        setSearch(d=>{

            return {...d,CancelBtnShow:'n',value:''};

        });

        paginationRef.current = {...paginationRef.current,current:1};

        setPagination(d=>{

            return {...d,current:1};

        });

        updateTable();

    },[]);

    //选择变化
    const checkChange = useCallback((data)=>{

      const { courseClass } = dataSourceRef.current;

      const checked = data.length===courseClass.length;

      setCheck(d=>{

          checkRef.current = {...d,list:data,checked};

          return {...d,list:data,checked};

      });

    },[]);


    //全选变化
    const checkAll = useCallback(()=>{

        const {checked} = checkRef.current;

        const { courseClass } = dataSourceRef.current;

        let list = [],newChecked = false;

        if (!checked){

            newChecked = true;

            list = courseClass;

        }

        setCheck(d=>{

           checkRef.current = {...d,list,checked:newChecked};

            return {...d,list,checked:newChecked};

        });

    },[]);

    //删除教学班
    const delCourseClass = useCallback((type,CourseClassID) =>{

        const {list} = checkRef.current;

        //type ===1 全选，type===2单选删除
        if (type===1){

            if (list.length>0){

                const CourseClassIDs = list.map(i=>i.CourseClassID).join(',');

                dispatch(showQueryAlert({title:'确定要删除选中教学班？',ok:e=>delOk(CourseClassIDs)}));

            }else{

                dispatch(showWarnAlert({title:'请先选择教学班'}));

            }

        }else{

            const CourseClassIDs = CourseClassID;

            dispatch(showQueryAlert({title:'确定要删除选中教学班？',ok:e=>delOk(CourseClassIDs)}));

        }

    },[]);


    //确定删除教学班
    const delOk = useCallback((CourseClassIDs)=>{

        DeleteCourseClass_University({SchoolID,UserID,UserType,CourseClassIDs,dispatch}).then(data=>{

            if (data===0){

                hideAlert(dispatch)();

                successAlertShow('删除成功');

                updateTable();

            }

        })

    },[]);


    //添加教学班

    const addCourseClass = useCallback(()=>{

        setAddEditCourse(d=>({...d,show:true,isEdit:false}));

    },[]);

    //编辑教学班

    const editCourseClass = (courseClassID)=>{

        setAddEditCourse(d=>({...d,show:true,isEdit:true,courseClassID}));

    };


    //编辑教学班OK
    const addEditOk = () =>{

        const { CourseClassID,CourseClassName,GradeID,showGradeTip,showCourseClassTip,SubjectID,showSubjectTip, CourseNO, showCourseTip, TeacherID, showTeacherTip, ClassIDs, StudentIDs, showModalLoading,hideModalLoading } = AddEditClassRef.current;

        let courseClassOk = false,courseOk = false,teacherOk = false,gradeOk=false;

        if (!CourseClassName){

            showCourseClassTip('请输入教学班名称');

        }else{

            let result = subNameReg(CourseClassName);

            if (!result){

                showCourseClassTip('教学班名称应由字母或数字或中文或,_->/()（）等特殊字符构成');

            }else{

                courseClassOk = true;

            }

        }


        if (CourseNO){

            courseOk = true;

        }else{

            showCourseTip();

        }

        if (!SubjectID){

            showSubjectTip()

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

                    setAddEditCourse(d=>({...d,show:false}));

                    successAlertShow('成功');

                    updateTable()

                }

                hideModalLoading();

            })

        }


    };


    //关闭添加/编辑教学班弹窗

    const closeAddEditModal = useCallback(()=>{

        setAddEditCourse(d=>({...d,show:false}));

    },[]);


    //合班弹窗OK
    const combineOk = useCallback(()=>{

        const {courseClassTip,showModalLoading,hideModalLoading,showCourseClassTip,showTeacherTip,CombinedClassIDs,courseClassName,teacherID} = CombineCourseRef.current;

        let teacherOk = false,courseClassOk = false;

        if (teacherID){

            teacherOk = true;

        }else{

            showTeacherTip();

        }

        if (!courseClassName){

            showCourseClassTip('请输入新的教学班名称');

        }else if (!courseClassTip){

            courseClassOk = true;

        }

        if (courseClassOk&&teacherOk){//两个都没问题的情况下

            showModalLoading();

            CombineCourseClass_University({SchoolID,UserID,UserType,CourseClassIDs:CombinedClassIDs,CourseClassName:courseClassName,TeacherID:teacherID,dispatch}).then(data=>{

                if (data===0){

                    setCombineModal(d=>({...d,show:false}));

                    successAlertShow('合班完成');

                    updateTable();

                }

                hideModalLoading();

            })

        }

    },[]);

    //关闭合班弹窗

    const closeCombine = useCallback(()=>{

        setCombineModal(d=>({...d,show:false}));

    },[]);


    //合班弹窗出现
    const combineCourseClass = useCallback(()=>{

        const {list} = checkRef.current;

        if (list.length<2){

            dispatch(showWarnAlert({title:'选择班级的数量不能小于2'}));

        }else{

            const checkCourseNOList = [];

            list.map(i=>{

                if(!checkCourseNOList.includes(i.CourseNO)){

                    checkCourseNOList.push(i.CourseNO);

                }

            });

            if (checkCourseNOList.length>1){

                dispatch(showWarnAlert({title:'选择的班级必须是在同一课程下的班级'}));

            }else{

                setCombineModal(d=>({...d,show:true,courseNO:checkCourseNOList[0]}));

            }

        }

    },[]);

    //表格内容刷新

    const updateTable = () =>{

        const subjectID = subjectsRef.current.dropSelectd.value;

        const courseNO = coursesRef.current.dropSelectd.value;

        const collegeID = collegeRef.current.dropSelectd.value;

        const gradeID = gradesRef.current.dropSelectd.value;

        const key = searchRef.current.CancelBtnShow==='n'?'':searchRef.current.value;

        const pageSize = paginationRef.current.pageSize;

        const pageIndex = paginationRef.current.current;

        setTableLoading(true);

        GetCourseClassInfoForPage_University({schoolID:SchoolID,subjectID,courseNO,collegeID,gradeID,key,pageIndex,pageSize,userID:UserID,userType:UserType,dispatch}).then(data=>{

            if (data){

                let tableList = data.Item&&data.Item.length>0?data.Item.map((i,k)=>{

                    const NO = createNO(k);

                    return {...i,key:i.CourseClassID,NO};

                }):[];

                const total = data.CourseClassCount?data.CourseClassCount:0;

                const current = data.PageIndex?data.PageIndex:1;

                setPagination(d=>{

                    paginationRef.current = {...d,total:total,current};

                    return {...d,total:total,current};

                });

                setDataSource(d=>{

                    dataSourceRef.current = {...d,courseClass:tableList};

                    return {...d,courseClass:tableList}

                });

                setCheck(d=>{

                   checkRef.current = {...d,checked:false,list:[]};

                   return {...d,checked:false,list:[]};

                });

                const LogCount = data.LastLogCount?data.LastLogCount:0;

                dispatch(logCountUpdate(LogCount));

            }

            setTableLoading(false);

        });

    };


    //打开教学班详情的弹窗

    const openClassDetail = (classID)=>{

        dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

        dispatch(actions.UpDataState.getCourseClassDetailsMsg('/GetCourseClassDetail_University?courseClassID='+classID))

    };



    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"manage-wrapper"}>

                <TitleBar type={"manage"} title={"教学班管理"} rightContent={titleBtns}></TitleBar>

                <div className={"drops-search-wrapper"}>


                    <span className={"props"}>{`${isAiPractice?'':'学科'}课程:`}</span>

                    {

                        !isAiPractice?

                            <DropDown onChange={subjectChange} dropSelectd={subjects.dropSelectd} dropList={subjects.dropList}>

                            </DropDown>

                            :null

                    }

                    <DropDown onChange={courseChange} dropSelectd={courses.dropSelectd} dropList={courses.dropList} disabled={courses.disabled}>

                    </DropDown>

                    <span className={"props"}>院系:</span>

                    <DropDown onChange={collegeChange} dropSelectd={college.dropSelectd} dropList={college.dropList}>

                    </DropDown>

                    <span className={"props"}>所属年级:</span>

                    <DropDown onChange={gradeChange} dropSelectd={grades.dropSelectd} dropList={grades.dropList}>

                    </DropDown>

                    <span className={"result"}>共找到<span className={"red"}>{pagination.total}</span>个教学班</span>

                    <Search onClickSearch={searchClick} onCancelSearch={searchCancel} CancelBtnShow={search.CancelBtnShow} width={270} Value={search.value} onChange={searchValueChange} placeHolder={"请输入教学班名称/教师姓名搜索..."}></Search>

                </div>

                <div className={"course-class-table"}>

                    <Loading spinning={tableLoading}>

                        {

                            pagination.total>0?

                                <CheckBoxGroup onChange={checkChange} value={check.list}>

                                    <Table pagination={false} columns={columns} dataSource={dataSource.courseClass}></Table>

                                </CheckBoxGroup>

                                :

                                <Empty type={"3"} title={"暂无符合条件的教学班"}></Empty>

                        }


                    </Loading>

                </div>

                <div className={"course-class-bottom"}>

                    {

                        pagination.total>0?

                            <div className={"selector-all"}>

                                <CheckBox checked={check.checked} onClick={checkAll}>全选</CheckBox>

                                <Button type={"primary"} onClick={e=>delCourseClass(1)}>删除</Button>

                                <Button className={"combine"} onClick={combineCourseClass}>合班</Button>

                            </div>

                            :null

                    }

                    <PagiNation pageSizeOptions={pagination.pageSizeList} hideOnSinglePage={pagination.pageSize===parseInt(pagination.pageSizeList[0])} onShowSizeChange={pageSizeChange} onChange={pageChange} showSizeChanger={true} current={pagination.current} total={pagination.total} pageSize={pagination.pageSize}>


                    </PagiNation>

                </div>

            </div>

            <Alert type={"success"} show={successAlert.show} title={successAlert.title} onHide={successAlertHide}></Alert>

            <Modal
                className={"add-edit-course-class-modal"}

                type="1"

                width={800}

                destroyOnClose={true}

                title={`${addEditCourse.isEdit?'编辑':'添加'}教学班`}

                bodyStyle={{ height:520,padding: 0 }}

                visible={addEditCourse.show}

                onOk={addEditOk}

                onCancel={closeAddEditModal}>

                {

                    addEditCourse.show?

                        <AddEditCourseClass subjectSelectd={subjects.dropSelectd} courseSelectd={courses.dropSelectd}  IsEdit={addEditCourse.isEdit} CourseInfo={addEditCourse.CourseInfo}  CourseClassID={addEditCourse.courseClassID} ref={AddEditClassRef}></AddEditCourseClass>

                        :null

                }

            </Modal>


            <Modal
                className={"combine-course-class-modal"}
                bodyStyle={{height:300}}
                width={600}
                type="1"
                destroyOnClose={true}
                title={"合班"}
                visible={combineModal.show}
                onOk={combineOk}
                onCancel={closeCombine}
            >

                {

                    combineModal ?

                        <CombineCourseClass checkClassProps={check.list} dispatch={dispatch} CourseNO={combineModal.courseNO} LoginUser={LoginUser} ref={CombineCourseRef}></CombineCourseClass>

                        :''

                }

            </Modal>


        </Loading>

    )

}

export default memo(Index);