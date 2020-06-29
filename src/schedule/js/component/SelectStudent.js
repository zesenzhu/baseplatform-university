import React,{memo,forwardRef,useRef,useImperativeHandle,useEffect,useState} from "react";

import { connect } from "react-redux";

import "../../scss/common/SelectStudent.scss";

import { Scrollbars } from "react-custom-scrollbars";

// import {teacherSearchReg,subNameReg,showWarnAlert}

import {useStateValue} from "../actions/hooks";

import {GetMajorInfo_University,GetGradeInfo_University,GetClassInfo_University,GetStudentInfoByClassID_University,GetStudentInfoByKey_University} from "../actions/ApiActions";

import {Search, Loading, CheckBox, CheckBoxGroup, Empty,DropDown} from "../../../common";


function SelectStudent(props,ref){


    //第一次进入

    const [firstLoad,setFirstLoad] = useState(true);

    //loading

    const [loading,setLoading] = useState(true);

    //内容区域的loading
    const [contentLoading,setContentLoading] = useState(false);

    //内容区域右侧的loading
    const [rightLoading,setRightLoading] = useState(false);

    const [activeClass,setActiveClass] = useState('');

    //左右结构

    const [layOut,setLayOut] = useState({

        show:false,

        layOutList:[],

        //0代表是学生1代表搜索的是行政班
        layOutType:0

    });

    //学院
    const [college,setCollege] = useState({

        collegeData:[],

        dropSelectd:{value:'',title:'全部学院'},

        dropList:[],

    });

    //专业
    const [major,setMajor] = useState({

        dropSelectd:{value:'',title:'全部专业'},

        disabled:true,

        dropList:[]

    });

    //年级
    const [grade,setGrade] = useState({

        dropSelectd:{value:'',title:'全部年级'},

        dropList:[]

    });

    //搜索
    const [search,setSearch] = useState({

        Value:'',

        CancelBtnShow:'n'

    });

    //班级
    const [classesList,setClass] = useState([]);

    //学生

    const [stuList,setStu] = useState({

        list:[],

        checkedAll:false

    });


    //选择

    const [checkedList,setCheckedList] = useState([]);


    //props 传参
    const { LoginUser,dispatch,dataList } = props;

    const { SchoolID,UserID,UserType } = LoginUser;


    //ref

    const collegeRef = useStateValue(college);

    const majorRef = useStateValue(major);

    const gradeRef = useStateValue(grade);

    const searchRef = useStateValue(search);

    const activeClassRef = useStateValue(activeClass);

    const stuListRef = useStateValue(stuList);

    const checkedListRef = useStateValue(checkedList);


    //初始化

    useEffect(()=>{

        if (firstLoad){

            setFirstLoad(false);

            const getMajor = GetMajorInfo_University({schoolID:SchoolID,dispatch});

            const getGrade = GetGradeInfo_University({schoolID:SchoolID,dispatch});

            const getClass = GetClassInfo_University({schoolID:SchoolID,dispatch});

            Promise.all([getMajor,getGrade,getClass]).then(res=>{

                if (res[0]){

                    const dropList = res[0].map(i=>({value:i.CollegeID,title:i.CollegeName}));

                    dropList.unshift({value:'',title:'全部学院'});

                    setCollege(data=>({...data,collegeData:res[0],dropList}));

                }

                if (res[1]){

                    const dropList = res[1].map(i=>({value:i.GradeID,title:i.GradeName}));

                    dropList.unshift({value:'',title:'全部年级'});

                    setGrade(data=>({...data,dropList}));

                }

                if (res[2]){

                    setClass(res[2]);

                }

                setLoading(false);

            });

            setCheckedList(dataList);

        }

    },[dataList]);


    //事件

    //学院选取
    const collegeChange = (e) =>{

        setCollege(data=>({...data,dropSelectd:e}));

        const {value} = e;

        if (value===''){

            setMajor(data=>({...data,dropSelectd:{value:'',title:'全部专业'},disabled:true}));

        }else{

            const { collegeData } = collegeRef.current;

            const majors = collegeData.find(i=>i.CollegeID===value).Majors.map(i=>({value:i.MajorID,title:i.MajorName}));

            majors.unshift({value:'',title:'全部专业'});

            setMajor(data=>({...data,dropList:majors,disabled:false,dropSelectd:{value:'',title:'全部专业'}}));

        }

        if (layOut.show){

            setTimeout(updateSearch,0);

        }else{

            setTimeout(updateClass,0);

        }

    };

    //专业选取
    const majorChange = (e) =>{

        setMajor(data=>({...data,dropSelectd:e}));

        if (layOut.show){

            setTimeout(updateSearch,0);

        }else{

            setTimeout(updateClass,0);

        }

    };

    //年级选取

    const gradeChange = (e)=>{

        setGrade(data=>({...data,dropSelectd:e}));

        if (layOut.show){

            setTimeout(updateSearch,0);

        }else{

            setTimeout(updateClass,0);

        }

    };


    //点击班级选

    const classClick = (ClassID) =>{

        setActiveClass(ClassID);

        setTimeout(e=>updateStu(ClassID),0);

    };

    //选取学生

    const stuCheck = (item,checked) =>{

        const activeID = activeClassRef.current;

        const copyCheckList = Array.from(checkedListRef.current);

        const sList = stuListRef.current.list;

        let nClist = copyCheckList,checkedAll = false;

        //是否已选中这个选项
        if (checked){

            nClist = copyCheckList.filter(i=>i.StudentID!==item.StudentID);

        }else{

            nClist.push(item);

            //判断是否是班级全选

            checkedAll = nClist.filter(i=>i.ClassID===activeID).length === sList.length;

        }

        setStu(d=>({...d,checkedAll}));

        setCheckedList(nClist);

    };


    //全选
    const allChecked = (checkedAll) => {

       const cList = checkedListRef.current;

       const sList = stuListRef.current.list;

       const activeID = activeClassRef.current;

       let nClist = cList,checked = false;

        if(checkedAll){

           nClist = cList.filter(i=>i.ClassID!==activeID);

        }else{

           const lackList = sList.filter(i=>cList.findIndex(item=>item.StudentID===i.StudentID)===-1);

           nClist.push(...lackList);

           checked = true;

        }

        setCheckedList(nClist);

        setStu(d=>({...d,checkedAll:checked}));

    };


    //点击搜索
    const searchClick = ()=>{

        //对应不同的正则

        let  result = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(search.Value);


        if (result){

            setSearch(data=>({...data,CancelBtnShow:'y'}));

            setTimeout(updateSearch,0);

        }else{

            dispatch(showWarnAlert({title:`输入的学生姓名格式不正确`}));

        }



    };


    //搜索的结果取消

    const searchCancel = () =>{

        setLayOut(data=>({...data,show:false}));

        setSearch(e=>({...e,CancelBtnShow:'n',Value:''}));

        setTimeout(updateClass,0);

    };

    //更新班级列表

    const updateClass = () =>{

        const collegeID = collegeRef.current.dropSelectd.value;

        const majorID = majorRef.current.dropSelectd.value;

        const gradeID = gradeRef.current.dropSelectd.value;

        setContentLoading(true);

        GetClassInfo_University({schoolID:SchoolID,collegeID,gradeID,majorID,dispatch}).then(data=>{

            const list = data?data:[];

            setClass(list);

            setActiveClass('');

            setStu(d=>({...d,list:[]}));

            setContentLoading(false);

        });

    };

    //更新学生列表
    const updateStu = (activeClassID) =>{

        const ClassID = activeClassID?activeClassID:activeClassRef.current;

        const cList = checkedListRef.current;

        setRightLoading(true);

        GetStudentInfoByClassID_University({schoolID:SchoolID,classID:ClassID,dispatch}).then(data=>{

            const list = data&&data.length>0?data:[];

            const checkedAll = data&&data.length>0?cList.filter(i=>i.ClassID===ClassID).length===data.length:false;

            setStu(d=>({...d,list,checkedAll}));

            setRightLoading(false);

        });

    };

    //更新搜索
    const updateSearch = () =>{

        const { selectd,Value:key } = searchRef.current;

        const collegeID = collegeRef.current.dropSelectd.value;

        const majorID = majorRef.current.dropSelectd.value;

        const gradeID = gradeRef.current.dropSelectd.value;

        setContentLoading(true);

        GetStudentInfoByKey_University({schoolID:SchoolID,collegeID,majorID,gradeID,key,dispatch}).then(data=>{

            const layOutList = data&&data.length>0?data:[];

            setLayOut(e=>({...e,layOutList,show:true}));

            setContentLoading(false);

        });

    };

    //对外抛出

    useImperativeHandle(ref,()=>({

        checkedList:checkedList

    }));

    return(

        <Loading ref={ref} spinning={loading} tip={"加载中,请稍候..."}>

            <div id="SelectStudent"  ref={ref} className="selectStudent-box">

                <div className="box-top">

                    <DropDown

                        dropSelectd={college.dropSelectd}

                        dropList={college.dropList}

                        height={300}

                        onChange={collegeChange}

                    >

                    </DropDown>

                    <DropDown

                        dropSelectd={major.dropSelectd}

                        dropList={major.dropList}

                        disabled={major.disabled}

                        height={300}

                        onChange={majorChange}

                    >

                    </DropDown>

                    <DropDown

                        dropSelectd={grade.dropSelectd}

                        dropList={grade.dropList}

                        height={300}

                        onChange={gradeChange}

                    >

                    </DropDown>

                    <Search
                        className="top-search"
                        placeHolder="请输入学生姓名进行搜索..."
                        width="280"
                        Value={search.Value}
                        onChange={e=>{e.persist();setSearch(data=>({...data,Value:e.target.value}))}}
                        onCancelSearch={searchCancel}
                        CancelBtnShow={search.CancelBtnShow}
                        onClickSearch={searchClick}
                    >

                    </Search>

                </div>

                <Loading spinning={contentLoading}>

                    <div className="box-content">

                        {

                            layOut.show?

                                <ul className="selectStudent" style={{width:'100%'}}>

                                    {

                                        layOut.layOutList.length>0?

                                            <Scrollbars style={{ width: 100 + "%", height: 440 + "px" }}>

                                                {
                                                    layOut.layOutList.map((i, k) => {

                                                        const checked = checkedList.findIndex(item=>item.StudentID===i.StudentID)>=0;

                                                        return (

                                                            <li className="selectContent" key={k}>

                                                                <CheckBox checked={checked} onChange={e=>stuCheck(i,checked)}>

                                                                    <span title={i.StudentName} className="studentName">{i.StudentName}</span>

                                                                    <span title={i.StudentID} className="studentID">{"[" + i.StudentID + "]"}</span>

                                                                </CheckBox>

                                                            </li>
                                                        );


                                                    })
                                                }

                                            </Scrollbars>

                                            :

                                            <Empty type="4" title={`没有搜索到相关学生数据`}></Empty>

                                    }



                                </ul>

                                :

                                <>

                                    <div className={"left-content"}>

                                        <ul className="selectClassBox">

                                            {

                                                classesList.length>0?

                                                    <Scrollbars style={{width:180,height:440}}>

                                                        {

                                                            classesList.map((i,k) => {

                                                                return (

                                                                    <li title={i.ClassName} className={`selectContent ${activeClass===i.ClassID?'active':''}`} key={k} >

                                                                        <span onClick={e=>classClick(i.ClassID)} className={"class-name"}>{i.ClassName}</span>

                                                                    </li>

                                                                );
                                                            })

                                                        }

                                                    </Scrollbars>

                                                    :

                                                    <Empty type="4" title="暂无班级数据" style={{paddingTop:172}}></Empty>

                                            }

                                        </ul>

                                    </div>

                                    <div className={"right-content"}>

                                        <Loading spinning={rightLoading}>

                                            <ul className="selectStudent">

                                                {

                                                    !activeClass?

                                                        <Empty type="4" title="请选择班级获取学生数据"></Empty>

                                                        :

                                                        stuList.list.length>0?

                                                            <>

                                                            <li className="selectAllBox">

                                                                <CheckBox onClick={e=>allChecked(stuList.checkedAll)} checked={stuList.checkedAll}>

                                                                    <span className="selectAll">全选</span>

                                                                </CheckBox>

                                                            </li>

                                                            <Scrollbars style={{ width:`100%`, height:392}}>

                                                                    {
                                                                        stuList.list.map((i, k) => {

                                                                            const checked = checkedList.findIndex(item=>item.StudentID===i.StudentID)>=0;

                                                                            return (

                                                                                <li className="selectContent" key={k}>

                                                                                    <CheckBox value={i.StudentID} checked={checked} onClick={e=>stuCheck(i,checked)}>

                                                                                        <span title={i.StudentName} className="studentName">{i.StudentName}</span>

                                                                                        <span title={i.StudentID} className="studentID">{"[" + i.StudentID + "]"}</span>

                                                                                    </CheckBox>

                                                                                </li>
                                                                            );


                                                                        })
                                                                    }

                                                            </Scrollbars>

                                                            </>

                                                            :

                                                            <Empty type="4" title="暂无学生数据"></Empty>


                                                }



                                            </ul>

                                        </Loading>

                                    </div>

                                </>

                        }

                    </div>

                    {/*<Empty type="4" title="请选择相关项获取数据" style={{ marginTop:238,transform:"translateY(-50%)"}}></Empty>*/}

                </Loading>

            </div>

        </Loading>



    )

}

const mapStateToProps = state => {

    const { LoginUser } = state;

    return {
        LoginUser
    };
};
export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(SelectStudent)));