import React,{useState,useEffect,memo,useRef} from 'react';

import { connect } from 'react-redux';

import {Button, CheckBox, CheckBoxGroup, Empty, Loading, PagiNation, Table,Alert} from "../../../common/index";

import actions from '../actions';

import {
    GetCourseClassInfo_University,
    DeleteCourseClass_University,
    CombineCourseClass_University,
    InsertOrEditCourseClass_University
} from "../actions/apiActions";

import {useStateValue} from '../actions/hooks';

import history from '../containers/history';

import {showQueryAlert,showSuccessAlert,subNameReg} from "../actions/utils";

import CombineCourseClass from '../containers/Manager/CombineCourseClass';

import '../../scss/Class.scss';

import '../../scss/Search.scss';

import {Modal} from "../../../common";

import AddEditCourseClass from "../containers/Manager/AddEditCourseClass";

import {firstLoadClose} from "../reducers/commonSetting";



function Search(props) {

    //state

    //loading
    const [loading,setLoading] = useState(true);

    const [oldHistory,setOldHistory] = useState('');

    //是否是第一次加载界面
    const [firstLoad,setFirstLoad] = useState(true);

    //table的loading
    const [tableLoading,setTabLoading] = useState(false);

    //加载table所储存的参数
    const [tableData,setTableData] = useState({

        dataSource:[],

        checkedList:[],

        checkedAll:false,

        checkClassListProps:[]

    });

    //table的columns
    const [columns,setColumns] = useState([

        {
            title: "序号",
            align: "left",
            key: "OrderNO",
            width: 120,
            dataIndex: "OrderNO",
            render: (item,data) => {
                return (
                    <div className="CheckBox-content">

                        <label>

                            <CheckBox value={data.index} 
                            // type="gray"
                            ></CheckBox>

                            <span className="key-content">{parseInt(item)>=10?item:"0" + item}</span>

                        </label>

                    </div>
                );
            }
        },
        {
            title: "班级名称",
            align: "center",
            dataIndex: "CourseClassName",
            width: 200,
            key: "CourseClassName",
            render: (item,data) => {
                return (
                    <React.Fragment>
                <span
                    title={item}
                    onClick={e=>CourseClassClick(data)}
                    className="courseClass-name"
                >
                  {item}

                </span>
                    </React.Fragment>
                );
            }
        },
        {
            title: "任课教师",
            align: "center",
            dataIndex: "TeacherName",
            width: 220,
            key: "TeacherName",
            render: (item,key) => {
                return key.TeacherID === 0 || key.TeacherID ? (
                    <div className={"teacher-name-wrapper"}>
                        <span className={'Class-img'} style={{backgroundImage:`url(${key.PhotoPath})`}}></span>
                        <span title={key.TeacherName} className="Class-name">
                  {key.TeacherName}

                  </span>
                        <span title={key.TeacherID} className="Class-id">
                  (<span> {key.TeacherID}</span>)
                </span>
                    </div>
                ) : (
                    <span>--</span>
                );
            }
        },
        {
            title: "学生人数",
            align: "center",
            dataIndex: "StudentCount",
            width: 120,
            key: "StudentCount",
            render: item => {
                return (
                    <span title={item} className="StudentCount">
                {item}
              </span>
                );
            }
        },
        {
            title: "操作",
            align: "center",
            width: 185,
            key:'index',
            dataIndex:'index',
            render: (key,item) => {
                return (
                    <div className="handle-content">
                        <Button
                            color="blue"
                            type="default"
                            onClick={e=>editCourseClass(key)}
                            className="handle-btn"
                        >
                            编辑
                        </Button>
                        <Button
                            color="blue"
                            type="default"
                            onClick={e=>delOneCourseClass(key)}
                            className="handle-btn"
                        >
                            删除
                        </Button>
                    </div>
                );
            }
        }

    ]);

    //合班modal
    const [combineModal,setCombineModal] = useState(false);

    const [addEditCourse,setAddEditCourse] = useState({

        show:false,

        courseClassID:''

    });

    //更新table所需参数
    const [tableUpdateParams,setTbUpParams] = useState({

        pageIndex:1,

        pageSize:10,

        courseNO:'',

        Total:0,

        key:''

    });

    //alert
    const [alert,setAlert] = useState({

        show:false,

        type:'btn-query',

        title:'确定要删除该教学班么？',

        ok:e=>alertHide(),

        cancel:e=>alertHide(),

        close:e=>alertHide(),

        hide:e=>alertHide(),

        okShow:true,

        cancelShow:true

    });

    //props

    const { dispatch,LoginUser,commonSetting } = props;

    const { SchoolID,UserID,UserType } = LoginUser;


    //初始化
    useEffect(()=>{

        const params = history.location.pathname.split('/')[2];

        if (commonSetting.firstLoad){

            history.push('/manager');

        }else{

            if (oldHistory!==params){//信息已经获取并且第一次加载

                setOldHistory(params);

                GetCourseClassInfo_University({schoolID:SchoolID,courseNO:'',pageIndex:1,key:params,pageSize:10,dispatch}).then(data=>{

                    if (data){

                        let tbData = data.Item?data.Item.map((i,k)=>({...i,key:i.OrderNO,index:k})):[];

                        setTableData(e=>({...e,dataSource:tbData}));

                        setTbUpParams(e=>({...e,pageIndex:data.PageIndex,key:params,Total:data.CourseClassCount}));

                    }

                    setLoading(false);

                    dispatch({type:actions.UpUIState.APP_LOADING_CLOSE});

                    window.updateCourseClassTable = updateCourseClass;

                });

            }

        }

    });




    //获取state的最新值

    const tableParmasRef = useStateValue(tableUpdateParams);

    const tableDataRef = useStateValue(tableData);

    //弹窗ref
    const CombineCourseRef = useRef();

    const AddEditClassRef = useRef();

    //更新table事件

    const updateCourseClass = (PageIndex='',Key='',CourseNO='',PageSize='')=>{


        console.log(PageIndex);

        const { courseNO,pageIndex,pageSize,key } = tableParmasRef.current;

        setTabLoading(true);

        GetCourseClassInfo_University({schoolID:SchoolID,courseNO:CourseNO?CourseNO:courseNO,key:Key?Key:key,pageIndex:PageIndex?PageIndex:pageIndex,pageSize:PageSize?PageSize:pageSize,dispatch}).then(data=>{

            if (data){

                let tbData = data.Item?data.Item.map((i,k)=>({...i,key:i.OrderNO,index:k})):[];

                setTableData(e=>({...e,dataSource:tbData}));

                setTbUpParams(e=>({...e,pageIndex:data.PageIndex,Total:data.CourseClassCount}));

                setTableData(e=>({...e,checkedList:[],checkedAll:false}));

            }

            setTabLoading(false);

            setLoading(false);

        });

    };

    //页码变化
    const pageChange = (e) =>{

        setTbUpParams(data=>{

            updateCourseClass(e);

            return {...data,pageIndex:e};

        });

    };

    //点击
    const tableRowCheck = (keyList) =>{

        const {dataSource} = tableDataRef.current;

        const checkedAll = keyList.length=== dataSource.length?true:false;

        setTableData(e=>({...e,checkedList:keyList,checkedAll}));

    };


    //全选
    const tableCheckAll = () =>{

        const { checkedAll,dataSource } = tableDataRef.current;

        const newCheckedAll = !checkedAll;

        const checkedList = checkedAll?[]:dataSource.map(i=>i.index);

        setTableData(data=>({...data,checkedAll:newCheckedAll,checkedList}));

    };




    //删除单个教学班
    const delOneCourseClass = (key) =>{

        alertShow({type:'btn-query',title:'确定要删除该教学班么？',ok:e=>delOneCourseClassOk(key)});

    };

    //删除单个教学班ok
    const delOneCourseClassOk = (key) =>{

        const {dataSource} = tableDataRef.current;

        DeleteCourseClass_University({SchoolID,UserID,UserType,CourseClassIDs:dataSource[key].CourseClassID,dispatch}).then(data=>{

            if (data===0){

                setTimeout(updateCourseClass,0);

                alertShow({type:'success',title:"删除成功"});

            }

        });

    };


    //编辑教学班

    const editCourseClass = (key)=>{

        const {dataSource} = tableDataRef.current;

        //弹出弹窗

        setAddEditCourse(e=>({...e,show:true,courseClassID:dataSource[key].CourseClassID}));

    };

    //编辑教学班OK
    const addEditOk = () =>{

        const { CourseClassID,CourseClassName,GradeID,showGradeTip,showCourseClassTip, CourseNO, showCourseTip, TeacherID, showTeacherTip, ClassIDs, StudentIDs, showModalLoading,hideModalLoading } = AddEditClassRef.current;

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

                    setAddEditCourse(false);

                    setTimeout(updateCourseClass,0);

                    alertShow({type:'success',title:"添加教学班成功"});


                }

                hideModalLoading();

            })

        }


    };



    //删除全部教学班

    const delAllCourseClass = () =>{

        const { checkedList,dataSource } = tableDataRef.current;

        if (checkedList.length>0){

            const CourseClassIDs = checkedList.map(i=>dataSource.find(item=>item.index===i).CourseClassID).join(',');

            alertShow({type:'btn-query',title:'确定删除勾选的教学班么？',ok:e=>delAllCourseClassOk(CourseClassIDs)});

        }else{

            alertShow({type:'btn-warn',title:'请选择教学班',cancelShow:false});

        }


    };

    //删除多选的教学班
    const delAllCourseClassOk = (CourseClassIDs) =>{

        DeleteCourseClass_University({SchoolID,UserID,UserType,CourseClassIDs,dispatch}).then(data=>{

            if (data===0){

                setTimeout(updateCourseClass,0);

                alertShow({type:'success',title:"删除成功"});

            }

        });

    };


    //合班

    const combineCourseClass = () =>{

        const { checkedList,dataSource } = tableDataRef.current;

        if (checkedList.length<=1){

            alertShow({type:'btn-warn',title:"选择班级的数量不能小于2"});

        }else{

            const checkClasses = checkedList.map(i=>{

                const findItem = dataSource.find(item=>item.index===i);

                return findItem;

            });

            const checkCourseNOList = [];

            checkedList.map(i=>{

                const findItem = dataSource.find(item=>item.index===i).CourseNO;

                if(!checkCourseNOList.includes(findItem)){

                    checkCourseNOList.push(findItem);

                }

            });

            if (checkCourseNOList.length>1){

                alertShow({type:'btn-warn',title:"选择的班级必须是在同一课程下的班级"});

            }else{

                setTbUpParams(e=>({...e,courseNO:checkCourseNOList[0]}));

                setTableData(data=>({...data,checkClassListProps:checkClasses}));

                setCombineModal(true);

            }

        }

    };

    const CourseClassClick = (item) =>{

        dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

        dispatch(
            actions.UpDataState.getCourseClassDetailsMsg(
                "/GetCourseClassDetail_University?courseClassID=" + item.CourseClassID
            )
        );

    };


    //alert 消失事件

    const alertHide = () =>{

        setAlert(e=>({...e,show:false}));

    };

    const alertShow = ({type,title,ok,cancel,close,hide,okShow,cancelShow})=>{

        setAlert(e=>({...e,show:true,type:type,title:title,ok:ok?ok:e=>alertHide(),cancel:cancel?cancel:e=>alertHide(),hide:hide?hide:e=>alertHide(),okShow:okShow?okShow:false,cancelShow:cancelShow?cancelShow:false}));

    };


    //合班点击OK

    const combineOk = () =>{

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

                    setCombineModal(false);

                    alertShow({type:'success',title:'合班完成'});

                    setTimeout(updateCourseClass,0);

                }

                hideModalLoading();

            })

        }

    };


    return(

        <Loading tip={"加载中,请稍候..."} spinning={loading}>

            <div className="Search">

                <div className="Search-box">

                    <div className="Search-top">
            <span className="top-tips">
              <span className="tips tip-menu">

                 搜索结果: 共找到
                <span style={{ color: "#666" }}>
                    {tableUpdateParams.Total}
                </span>
                个教学班

              </span>
            </span>
                    </div>

                    <div className="Search-hr"></div>

                    <div className="Search-content">

                        <Loading
                            tip="加载中..."
                            opacity={false}
                            size="large"
                            spinning={tableLoading}
                        >

                            {

                                tableUpdateParams.Total!==0?

                                    <>

                                        <CheckBoxGroup style={{ width: "100%" }} value={tableData.checkedList} onChange={e=>tableRowCheck(e)}
                                        >

                                            <Table pagination={false} columns={columns} dataSource={tableData.dataSource}></Table>

                                        </CheckBoxGroup>

                                        <div style={{ display: "inline-block" }}>
                                            <CheckBox
                                                className="checkAll-box"
                                                // type="gray"
                                                onChange={tableCheckAll}
                                                checked={tableData.checkedAll}
                                            >
                                                <span className="checkAll-title">全选</span>

                                            </CheckBox>

                                            <Button
                                                onClick={delAllCourseClass}
                                                className="deleteAll"
                                                color="blue"
                                            >
                                                删除
                                            </Button>

                                            <Button
                                                onClick={combineCourseClass}
                                                color="blue"
                                                type="default"
                                                className="crossClass"

                                            >
                                                合班
                                            </Button>

                                        </div>

                                        <div className="pagination-box">
                                            <PagiNation
                                                //showSizeChanger={true}
                                                pageSize={tableUpdateParams.pageSize}
                                                current={tableUpdateParams.pageIndex}
                                                total={tableUpdateParams.Total}
                                                // onShowSizeChange={this.onPagiSizeChange.bind(this)}
                                                onChange={pageChange}
                                            >

                                            </PagiNation>
                                        </div>

                                    </>

                                    :

                                    <Empty type={"3"} title={"没有相关教学班数据"}></Empty>

                            }

                        </Loading>

                    </div>

                </div>

            </div>

            <Alert type={alert.type} title={alert.title} show={alert.show} onOk={alert.ok} onCancel={alert.close} onClose={alert.close} onHide={alert.hide} okShow={alert.okShow} cancelShow={alert.cancelShow}></Alert>

            {/*合班弹窗*/}

            <Modal
                className={"combine-course-class-modal"}
                bodyStyle={{height:300}}
                width={600}
                type="1"
                destroyOnClose={true}
                title={"合班"}
                visible={combineModal}
                onOk={combineOk}
                onCancel={e=>setCombineModal(false)}
            >

                {

                    combineModal ?

                        <CombineCourseClass checkClassProps={tableData.checkClassListProps} dispatch={dispatch} CourseNO={tableUpdateParams.courseNO} LoginUser={LoginUser} ref={CombineCourseRef}></CombineCourseClass>

                        :''

                }

            </Modal>

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

        </Loading>
    )

}

const mapStateToProps = (state) =>{

    const { DataState,leftMenu,previewData,breadCrumb,commonSetting } = state;

    const { LoginUser } = DataState;

    return {

        LoginUser,

        leftMenu,

        previewData,

        breadCrumb,

        commonSetting

    }


};

export default connect(mapStateToProps)(memo(Search));