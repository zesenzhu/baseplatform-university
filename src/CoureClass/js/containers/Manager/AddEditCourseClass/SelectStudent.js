import React,{memo,forwardRef,useRef,useImperativeHandle,useEffect,useState} from "react";

import { useSelector,useDispatch } from "react-redux";

import "../../../../scss/SelectStudent.scss";

import { Scrollbars } from "react-custom-scrollbars";

import {teacherSearchReg,subNameReg,showWarnAlert} from "../../../actions/utils";

import {useStateValue} from "../../../actions/hooks";

import {

    GetMajorInfo_University,GetGradeInfo_University,

    GetClassInfo_University,GetStudentInfoByClassID_University,

    GetStudentInfoByKey_University

} from "../../../actions/apiActions";

import {Search, Loading, CheckBox, CheckBoxGroup, Empty,DropDown} from "../../../../../common";



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

        CancelBtnShow:'n',

        selectd:{

            selectList:[

                {value:1,title:'搜学生'},

                {value:2,title:'搜行政班'}

            ],

            selectdValue:{value:1,title:'搜学生'}

        }

    });

    //班级
    const [classesList,setClass] = useState([]);

    //学生

    const [stuList,setStu] = useState([]);


    //选择

    //学生选择
    const [stuCheckList,setStuCheckList] = useState([]);

    //班级选择
    const [classCheckList,setClassCheckList] = useState([]);


    //props 传参
    const { stuCheckedList,classCheckedList,gradeChecked,majorChecked,courseType } = props;

    const {LoginUser,identify,commonSetting} = useSelector(state=>state);

    const {iFrame} = commonSetting;

    const dispatch = useDispatch();

    const { SchoolID,UserID,UserType } = LoginUser;


    //ref
    const collegeRef = useStateValue(college);

    const majorRef = useStateValue(major);

    const gradeRef = useStateValue(grade);

    const searchRef = useStateValue(search);

    const activeClassRef = useStateValue(activeClass);

    const stuCheckListRef = useStateValue(stuCheckList);

    const classCheckListRef = useStateValue(classCheckList);


    //初始化

    useEffect(()=>{

        if (firstLoad){

            console.log(courseType,majorChecked);

            setFirstLoad(false);

            const getMajor = GetMajorInfo_University({schoolID:SchoolID,dispatch});

            const getGrade = GetGradeInfo_University({schoolID:SchoolID,dispatch});

            //年级
            const gradeID = gradeChecked.value;


           //const getClass = GetClassInfo_University({schoolID:SchoolID,collegeID:colID,majorID:majID,gradeID,dispatch});

           Promise.all([getMajor,getGrade]).then(res=>{

                if (res[0]){

                    //查看专业问题
                    const majorid = [1,3].includes(courseType)&&majorChecked?majorChecked.split(',')[0]:'';

                    //collegeID和majorID
                    let colID = '';

                    const majorObj = {};

                    const majList  = [{value:'',title:'全部专业'}];

                    if ([1,3].includes(courseType)){ //如果是专业必修或选修

                        const collegeListData = [];

                        res[0].map(i=>{

                            const majList  = i.Majors.filter(item=>majorChecked.includes(item.MajorID));

                            if (majList.length>0){

                             collegeListData.push({...i,Majors:majList});

                            }

                        });

                        const collegeDropList = collegeListData.map(i=>({value:i.CollegeID,title:i.CollegeName}));

	                    colID = collegeDropList[0].value;

	                    const majorSelectd = collegeListData[0].Majors.find(i=>i.MajorID===majorid);

                        const majorDropList =  collegeListData[0].Majors.map(i=>({value:i.MajorID,title:i.MajorName}));

                        setCollege(d=>({...d,collegeData:collegeListData,dropList:collegeDropList,dropSelectd:{value:collegeListData[0].CollegeID,title:collegeListData[0].CollegeName}}));

                        setMajor(d=>({...d,disabled:false,dropList:majorDropList,dropSelectd:{value:majorSelectd.MajorID,title:majorSelectd.MajorName}}));

                    }else{

	                    const dropList = res[0].map(i=>({value:i.CollegeID,title:i.CollegeName}));

	                    dropList.unshift({value:'',title:'全部学院'});

	                    setCollege(data=>({...data,collegeData:res[0],dropList}));

	                    const findItem = res[0].find(i=>{

		                    const index = i.Majors&&i.Majors.length>0?i.Majors.findIndex(item=>item.MajorID===majorid):-1;

		                    if (index>=0){

			                    majorObj['value'] = i.Majors[index].MajorID;

			                    majorObj['title'] = i.Majors[index].MajorName;

		                    }

		                    return index>=0;

	                    });

	                    if (findItem){

		                    if(findItem.Majors&&findItem.Majors.length>0){

			                    findItem.Majors.map(i=>{

				                    majList.push({value:i.MajorID,title:i.MajorName});

			                    });

		                    }

		                    colID = findItem.CollegeID;

		                    setCollege(d=>({...d,dropSelectd:{value:findItem.CollegeID,title:findItem.CollegeName}}));

		                    setMajor(d=>({...d,disabled:false,dropSelectd:majorObj,dropList:majList}));


	                    }else{

		                    if (identify.isCollegeManager){

			                    setCollege(d=>({...d,dropSelectd:{value:LoginUser.CollegeID,title:LoginUser.CollegeName}}));

			                    const list = res[0].find(i=>i.CollegeID===LoginUser.CollegeID).Majors.map(i=>({value:i.MajorID,title:i.MajorName}));

			                    setMajor(d=>({...d,disabled:false,dropList:list}));


		                    }

	                    }

                    }

                    GetClassInfo_University({schoolID:SchoolID,collegeID:identify.isCollegeManager?LoginUser.CollegeID:colID,majorID:majorid,gradeID,dispatch}).then(data=>{

                        if (data){

                            setClass(data);

                        }

                    });

                }

                if (res[1]){

                    const dropList = res[1].map(i=>({value:i.GradeID,title:i.GradeName}));

                    dropList.unshift({value:'',title:'全部年级'});

                    setGrade(data=>({...data,dropList}));

                }

                // if (res[2]){
                //
                //     setClass(res[2]);
                //
                // }

                setClassCheckList(classCheckedList);

                setStuCheckList(stuCheckedList);

                setGrade(e=>({...e,dropSelectd:{value:gradeChecked.value,title:gradeChecked.value!==''?gradeChecked.title:'全部年级'}}));

                setLoading(false);

            });

        }

    },[stuCheckedList,classCheckedList,gradeChecked]);



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

            if (![1,3].includes(courseType)){

	            majors.unshift({value:'',title:'全部专业'});

	            setMajor(data=>({...data,dropList:majors,disabled:false,dropSelectd:{value:'',title:'全部专业'}}));

            }else{

                const selectdMajor = collegeData.find(i=>i.CollegeID===value).Majors[0];

                const majorSelectd = {value:selectdMajor.MajorID,title:selectdMajor.MajorName};

	            setMajor(data=>({...data,dropList:majors,disabled:false,dropSelectd:majorSelectd}));

            }

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

    //选取班级

    const classCheck = (e,ClassID,checked) =>{

        let sList = Array.from(stuCheckListRef.current);

        let cList = Array.from(classCheckListRef.current);

        e.stopPropagation();

        if (checked){//判断是否是选中状态

            //需要将其不选中

            cList = cList.filter(i=>i.ClassID!==ClassID);

            sList = sList.filter(i=>i.ClassID!==ClassID);

        }else{//不是选中状态

            //将其选中
            const classData = classesList.find(i=>i.ClassID===ClassID);

            cList.push(classData);

            if (activeClassRef.current===ClassID){//如果点击的是选中状态的班级

                //将该班级的所有学生放到已选列表中

                const supplyList = stuList.filter(i=>{

                    const isContain = sList.map(item=>item.StudentID).includes(i.StudentID);

                    return !isContain;

                });

                sList.push(...supplyList);

            }

        }

        setClassCheckList(cList);

        setStuCheckList(sList);

        if (activeClassRef.current!==ClassID){//如果选择的班级不是活动状态的班级

            classClick(ClassID);

        }

    };



    //选取学生

    const stuCheck = (data,checked) =>{

        let sList = Array.from(stuCheckListRef.current);

        let cList = Array.from(classCheckListRef.current);

        if (checked){//如果是已经选中

            //将该年级从已选中的列表中删除
            cList = cList.filter(i=>i.ClassID!==data.ClassID);

            sList = sList.filter(i=>i.StudentID!==data.StudentID);

        }else{//未选中

            //将其选中
            sList.push(data);

            //判断是否需要将年级全选

            const isNeedChecked = stuList.length === sList.filter(i=>i.ClassID===data.ClassID).length;

            if (isNeedChecked){//是否需要选中

                const classData = classesList.find(i=>i.ClassID===data.ClassID);

                cList.push(classData);

            }

        }

        setClassCheckList(cList);

        setStuCheckList(sList);

    };



    //搜索选择变化
    const searchSelectChage = (e) =>{

        setSearch(data=>({...data,selectd:{...data.selectd, selectdValue:e}}));

    };


    //点击搜索
    const searchClick = ()=>{

        //对应不同的正则

        let  result = false;

        if (search.selectd.selectdValue.value===1){

            result = teacherSearchReg(search.Value);

        }else{

            result = subNameReg(search.Value);

        }

        if (result){

            const layOutType = search.selectd.selectdValue.value===1?0:1;

            setLayOut(data=>({...data,layOutType}));

            setSearch(data=>({...data,CancelBtnShow:'y'}));

            setTimeout(updateSearch,0);

        }else{

            dispatch(showWarnAlert({title:`输入的${search.selectd.selectdValue.value===1?'学生姓名':'行政班名称'}格式不正确`}))

        }

    };


    //搜索的选项点击
    const layOutItemChange = (item,checked) =>{

        const type = search.selectd.selectdValue.value;

        const { LayOutID,LayOutName,PreID } = item;

        let cList = Array.from(classCheckListRef.current);

        let sList = Array.from(stuCheckListRef.current);

        if (type===1){//点击的是学生

            //现将自身状态改变

            const data = {

              ClassID:item.PreID,

              StudentID:item.LayOutID,

              StudentName:item.LayOutName

            };

            stuCheck(data,checked);

        }else{

            const data = {

                ClassID:item.LayOutID,

                ClassName:item.LayOutName

            };

            if (checked){//判断是否是选中状态

                //需要将其不选中

                cList = cList.filter(i=>i.ClassID!==item.LayOutID);

                sList = sList.filter(i=>i.ClassID!==item.LayOutID);

                setStuCheckList(sList);

            }else{//不是选中状态

                //将其选中
                const classData = classesList.find(i=>i.ClassID===item.LayOutID);

                cList.push(classData);

            }

            setClassCheckList(cList);

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

        GetClassInfo_University({schoolID:SchoolID,collegeID,gradeID,majorID,dispatch}).then(data=>{

            const list = data?data:[];

            setClass(list);

            setActiveClass('');

            setStu([]);

            setContentLoading(false);

        });

    };

    //更新学生列表
    const updateStu = (activeClassID) =>{

        const ClassID = activeClassRef.current;

        const cList = Array.from(classCheckListRef.current);

        const sList = Array.from(stuCheckListRef.current);

        setRightLoading(true);

        GetStudentInfoByClassID_University({schoolID:SchoolID,classID:ClassID,dispatch}).then(data=>{

            if (data){

               const hasInList = cList.map(i=>i.ClassID).includes(ClassID);

               if (hasInList){//需要将所有获取的学生全选

                   const supplyList = data.filter(i=>{

                      const isContain = sList.map(item=>item.StudentID).includes(i.StudentID);

                      return !isContain;

                   });

                   sList.push(...supplyList);

                   setStuCheckList(sList);

               }

               setStu(data);

            }

            setRightLoading(false);

        });

    };

    //更新搜索
    const updateSearch = () =>{

        const { selectd,Value:key } = searchRef.current;

        const type = selectd.selectdValue.value;

        const collegeID = collegeRef.current.dropSelectd.value;

        const majorID = majorRef.current.dropSelectd.value;

        const gradeID = gradeRef.current.dropSelectd.value;

        setContentLoading(true);

        if (type===1){//搜索的是学生的话

            GetStudentInfoByKey_University({schoolID:SchoolID,collegeID,majorID,gradeID,key,dispatch}).then(data=>{

                const layOutList = data&&data.length>0?data.map(i=>{

                    return {LayOutID:i.StudentID,LayOutName:i.StudentName,PreID:i.ClassID}

                }):[];

                setLayOut(e=>({...e,show:true,layOutList}));

                setContentLoading(false);

            });

        }else{

            GetClassInfo_University({schoolID:SchoolID,collegeID,majorID,gradeID,key,dispatch}).then(data=>{

                const layOutList = data&&data.length>0?data.map(i=>{

                    return {LayOutID:i.ClassID,LayOutName:i.ClassName,PreID:i.ClassID};

                }):[];

                setLayOut(e=>({...e,show:true,layOutList}));

                setContentLoading(false);

            });

        }

    };

    //对外抛出

    useImperativeHandle(ref,()=>{

        const stuSupplyList = stuCheckList.filter(i=>{

            const isContain = classCheckList.map(item=>item.ClassID).includes(i.ClassID);

            return !isContain;

        });

        return {

            classCheckList,

            stuCheckList:stuSupplyList

        }

    });

    return(

        <Loading ref={ref} spinning={loading} tip={"加载中,请稍候..."}>

            <div id="SelectStudent"  ref={ref} className="selectStudent-box">

                <div className="box-top">

                    {

                        !identify.isCollegeManager?

                            <DropDown

                                dropSelectd={college.dropSelectd}

                                dropList={college.dropList}

                                height={300}

                                onChange={collegeChange}

                            >

                            </DropDown>

                            :null

                    }

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
                        placeHolder="请输入关键字进行搜索..."
                        width="280"
                        Value={search.Value}
                        onChange={e=>{e.persist();setSearch(data=>({...data,Value:e.target.value}))}}
                        onCancelSearch={searchCancel}
                        CancelBtnShow={search.CancelBtnShow}
                        select={true}
                        selectOptions={search.selectd}
                        selectChange={searchSelectChage}
                        onClickSearch={searchClick}
                    >

                    </Search>

                </div>

                <Loading spinning={contentLoading}>

                    <div className="box-content" style={{height:iFrame?360:440}}>

                        {

                            layOut.show?

                                <ul className="selectStudent" style={{width:'100%'}}>

                                    {

                                        layOut.layOutList.length>0?

                                            <Scrollbars style={{ width: 100 + "%", height: iFrame?360:440+ "px" }}>

                                                    {
                                                        layOut.layOutList.map((i, k) => {

                                                            let checked = false;

                                                            if (layOut.layOutType===0){//结果是学生

                                                                checked = stuCheckList.map(item=>item.StudentID).includes(i.LayOutID);

                                                            }else{//结果是班级

                                                                checked = classCheckList.map(item=>item.ClassID).includes(i.LayOutID);

                                                            }

                                                            return (

                                                                <li className="selectContent" key={k}>

                                                                    <CheckBox checked={checked} onChange={e=>layOutItemChange(i,checked)}>

                                                                        <span title={i.LayOutName} className="studentName">{i.LayOutName}</span>


                                                                        {

                                                                            layOut.layOutType===0?

                                                                                <span title={i.LayOutID} className="studentID">{"[" + i.LayOutID + "]"}</span>

                                                                                :''

                                                                        }

                                                                    </CheckBox>

                                                                </li>
                                                            );


                                                        })
                                                    }

                                            </Scrollbars>

                                            :

                                            <Empty type="4" title={`没有搜索到相关${search.selectd.selectdValue.value===1?'学生数据':'行政班数据'}`}></Empty>

                                    }



                                </ul>

                                :

                                <>

                                    <div className={"left-content"}>

                                        <ul className="selectClassBox">

                                            {

                                                classesList.length>0?

                                                    <Scrollbars style={{width:180,height:iFrame?360:440}}>

                                                        {

                                                            classesList.map((i,k) => {

                                                                const checked = classCheckList.map(item=>item.ClassID).includes(i.ClassID);

                                                                return (

                                                                    <li title={i.ClassName} className={`selectContent ${activeClass===i.ClassID?'active':''}`} key={k} >

                                                                        <CheckBox onChange={e=>classCheck(e,i.ClassID,checked)} checked={checked}></CheckBox>

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

                                                        stuList.length>0?

                                                            <Scrollbars style={{ width: 100 + "%", height: iFrame?360:440 + "px" }}>

                                                                {
                                                                        stuList.map((i, k) => {

                                                                            //判断是否需要选中

                                                                            const checked = classCheckList.map(item=>item.ClassID).includes(i.ClassID)?true:stuCheckList.map(item=>item.StudentID).includes(i.StudentID);

                                                                            return (

                                                                                <li className="selectContent" key={k}>

                                                                                    <CheckBox  value={i.StudentID} checked={checked} onClick={e=>stuCheck(i,checked)}>

                                                                                        <span title={i.StudentName} className="studentName">{i.StudentName}</span>

                                                                                        <span title={i.StudentID} className="studentID">{"[" + i.StudentID + "]"}</span>

                                                                                    </CheckBox>

                                                                                </li>
                                                                            );

                                                                        })
                                                                    }

                                                            </Scrollbars>

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
    const { UIState, DataState } = state;

    const { LoginUser } = DataState;

    return {
        LoginUser
    };
};

export default memo(forwardRef(SelectStudent));
