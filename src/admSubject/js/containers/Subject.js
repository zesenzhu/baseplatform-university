import "../../scss/Subject.scss";

import React,{useEffect,useState,useRef,memo} from "react";

import { connect } from "react-redux";

import SubjectModal from "../component/SubjectModal.js";

import {Empty} from "../../../common";

import SetSubjectLeader from "../component/SetSubjectLeader.js";

import * as apiActions from "../actions/apiActions";

import {showSuccessAlert, showWarnAlert,subNameReg} from "../actions/utils";

import {useStateValue} from "../component/hooks";

import * as subActions from '../actions/subPassActions';

import actions from "../actions";

import * as menuActions from '../actions/menuActions';

import $ from 'jquery';


import {
  Search,
  Loading,
  Button,
  Table,
  DetailsModal,
  PagiNation,
  Modal
} from "../../../common";



function Subject(props){

    const [isAIProduct,setIsAI] = useState(false);

    //table列名
    const [columns,setColumns] = useState([

           {
               title: "学科名称",
               align: "left",
               key: "SubjectName",
               width:270,
               dataIndex: "SubjectName",
               className:'subject-name-title',
               render: item => {

                   return (
                       <div className="SubjectName-content">
                           {/*<img
                               className="SubjectName-img"
                               alt={arr.SubjectName}
                               src={arr.SubjectImg}
                               width={80}
                               height={50}
                           />*/}
                           <div title={item} className="SubjectName-name">{item}</div>

                       </div>
                   );
               }
           },

            {

                title:'学科编号',
                align:'center',
                key:'SubjectNumber',
                width:170,
                dataIndex:'SubjectNumber',
                // sorter:true,
                render:item=>{

                    return <div title={item} className={"subject_number"}>{item?item:'--'}</div>

                }

            },

           {
               title: "开课课程总数",
               align: "center",
               width:170,
               dataIndex: "CourseCount",
               key: "CourseCount",
               render: (item,key) => {
                   return (

                    <div className={"course_num"}>

                        <span >{item}</span>

                        <button onClick={e=>lookCourse(key)}>查看</button>

                    </div>

                   );
               }
           },
           {
               title: "学科主任",
               align: "center",
               width:180,
               dataIndex: "LeaderName",
               key: "LeaderName",
               render: (item,k) => {
                       return (

                            item?

                                <a title={item} onClick={e=>personDetail(k)} className={"teacher_name"}>{item}</a>

                            : <span>--</span>

                       );
               }
           },
           {
               title: "操作",
               align: "center",
               dataIndex:'index',
               key:'index',
               width:346,
               render: (key,item) => {

                   return (

                       <div className="handle-content">

                           <Button
                               color="blue"
                               type="default"
                               onClick={e=>onHandleClick(key)}
                               className="handle-btn"
                           >
                               编辑
                           </Button>

                           <Button
                               color="blue"
                               type="default"
                               onClick={e=>{

                                   console.log(item);

                                   onSetTeacherClick(key)

                               }}
                               className="handle-btn"
                           >
                               设置学科主任
                           </Button>

                           {


                               !isAIRef.current?

                                   <Button color="blue" type="default" onClick={e=>onDeleteSubjectClick(key)} className="handle-btn">删除</Button>

                                   :

                                   ''

                           }

                       </div>
                   );
               }
           }
       ]);

    //分页state
    const [pagination,setPagination] = useState({

        current:1,

        pageSize:10,

        total:0

    });

    //数据

    const [tableData,setTableData] = useState([]);

    //表格state
    const [tableLoading,setTableLoading] = useState(true);

    //排序state
    const [tabOrder,setTabOrder] = useState('');

    //添加学科
    const [addSubjectModalShow,setAddSubjectModal] = useState(false);

    //编辑学科
    const [editSubModal,setEditSubModal] = useState({

        show:false,

        isDefault:0,

        subId:'',

        subName:'',

        subNum:''

    });

    //搜索
    const [search,setSearch] = useState({

        value:'',

        cancelShow:'n',

        searched:false,

        searchedValue:''

    });

    //设置教研组长
    const [subLeader,setSubLeader] = useState({

       show:false,

       subId:'',

       subName:'',

       leaderName:'',

       leaderId:''

    });





    //及时获取state的真实值
    const editSubRef = useStateValue(editSubModal);

    const pageRef = useStateValue(pagination);

    const tabOrderRef = useStateValue(tabOrder);

    const searchRef = useStateValue(search);

    const leaderRef = useStateValue(subLeader);

    const tableDataRef = useStateValue(tableData);

    const isAIRef = useStateValue(isAIProduct);

    const SubjectModalRef = useRef();

    const SubLeaderRef = useRef();




    const { dispatch,DataState,UIState } = props;

    const { LoginUser,SubjectMsg } = DataState;

    const { UserID,SchoolID,UserType } = LoginUser;


    //界面初始化
   useEffect(()=>{

       const GetBaseInfoForPages = apiActions.GetBaseInfoForPages({dispatch});

       const GetSubjectInfo_University = apiActions.GetSubjectInfo_University({schoolID:SchoolID,userID:LoginUser.UserID,userType:LoginUser.UserType,pageSize:pagination.pageSize,pageIndex:pagination.current,dispatch});

       Promise.all([GetBaseInfoForPages,GetSubjectInfo_University]).then(res=>{

           if (res[0]){

                let isAI = res[0].ProductType===2;

                setIsAI(isAI);

           }

           if (res[1]){

               const tbData = res[1].Subjects?res[1].Subjects.map((i,k)=>({...i,index:k,key:k})):[];

               setTableData(tbData);

               dispatch(actions.UpUIState.appLoadingHide());

               setPagination(page=>{ return {...page,current:res[1].PageIndex,total:res[1].Total}});


           }

           setTableLoading(false);

       });


    },[]);


  //事件

  //编辑学科
  const onHandleClick = key => {

        const item = tableDataRef.current[key];

        const { SubjectID,SubjectName,SubjectNumber,IsDefault } = item;

        setEditSubModal(editSubModal=>{return{...editSubModal,show:true,subName:SubjectName,subId:SubjectID,subNum:SubjectNumber,isDefault:IsDefault}});

  };




  //添加学科
  const onAddSubjectClick = () => {

      setAddSubjectModal(true);

  };


  const personDetail = key => {

    const { LeaderID } = key;

    const token = sessionStorage.getItem("token");

    window.open(`/html/userPersona/index.html?userID=${LeaderID}&userType=1&lg_tk=${token}`);

    // dispatch(actions.UpDataState.getTeacherMsg("/GetUserDetail?userID=" + LeaderID));

  };



  //操作分页

  const onPagiNationChange = value => {

      setPagination(page=>{

          updateTable(value);

          return {...page,current:value}

      });

  };

  // 关闭信息弹窗
  const SubjectDetailsMsgModalCancel = () => {

    dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_CLOSE });

  };


  //删除
  const onDeleteSubjectClick = key => {

    // console.log(key)
    dispatch(showWarnAlert({title:'删除学科将删除相关的教学班、课表等数据',ok:e=>onAlertWarnOk(key)}));

  };

  //删除按钮确定

  const onAlertWarnOk = key => {

      const item = tableDataRef.current[key];

      const { SubjectID,SubjectName,SubjectNumber } = item;

      apiActions.DeleteSubject＿University({UserID,UserType,SchoolID,SubjectName,SubjectNumber,SubjectID,dispatch}).then(data=>{

          if (data===0){

              dispatch(showSuccessAlert({title:"删除成功"}));

              setTimeout(updateTable,0);

          }

      })

  };

  //编辑弹窗点击OK事件
  const changeSubjectModalOk = () => {

      const { id,name,number,nameTrue,numTrue,setLoading,setSubInput,setSubNumInput } = SubjectModalRef.current;

      let nameEmp=true,numEmp = true;

      if (!name){

          setSubInput(input=>({...input,tipShow:true,tipTitle:'请输入学科名称'}));

      }else{

          nameEmp = false;

      }

      if (!number){

          setSubNumInput(input=>({...input,tipShow:true,tipTitle:'请输入学科编号'}));

      }else{

          numEmp=false;

      }

      if (nameTrue&&numTrue&&!nameEmp&&!numEmp){//判断是否符合提交条件

          console.log(number,editSubRef.current.subNum);

          if ((name===editSubRef.current.subName)&&(number.toString()===(editSubRef.current.subNum?editSubRef.current.subNum.toString():''))){//判断是否发生了变化

              dispatch(showWarnAlert({title:"没有学科名称和学科编号没有发生变化"}));

          }else{

              setLoading(true);

              apiActions.UpdateSubjectInfo_University({UserID:LoginUser.UserID,SchoolID:LoginUser.SchoolID,UserType:LoginUser.UserType,SubjectID:id,SubjectName:name,SubjectNumber:number,dispatch}).then(data=>{

                  if (data===0){

                      setEditSubModal(e=>({...e,show:false}));

                      dispatch(showSuccessAlert({title:"修改成功"}));

                     setTimeout(updateTable,0);

                  }

                  setLoading(false);

              });

          }

      }


  };


  //编辑弹窗关闭
  const changeSubjectModalCancel = () => {

      setEditSubModal(e=>{return {...e,show:false}});

  };
  //添加学科确定弹窗操作
  const AddSubjectModalOk = () => {

    const { id,name,number,nameTrue,numTrue } = SubjectModalRef.current;

    const { setLoading,setSubInput,setSubNumInput } = SubjectModalRef.current;

    let nameEmp=true,numEmp=true;

    if (!name){

        setSubInput(input=>{return{...input,tipShow:true,tipTitle:'请输入学科名称'}});

    }else{

        nameEmp = false;

    }

    if (!number){

        setSubNumInput(input=>{return{...input,tipShow:true,tipTitle:'请输入学科编号'}});

    }else{

        numEmp=false;

    }



    if (numTrue&&nameTrue&&!nameEmp&&!numEmp){//判断是否符合提交条件

        setLoading(true);

        apiActions.AddSubject_University({UserID:LoginUser.UserID,SchoolID:LoginUser.SchoolID,UserType:LoginUser.UserType,SubjectID:id,SubjectName:name,SubjectNumber:number,dispatch}).then(data=>{

           if (data===0){

              setAddSubjectModal(false);

              dispatch(showSuccessAlert({title:"添加成功"}));

              setTimeout(updateTable,0);

           }

            setLoading(false);

        });

    }

  };


  //更新table
  const updateTable = (PageIndex='',PageSize='',Key='',OrderType='') => {

      const key = Key?Key:(searchRef.current.searched?searchRef.current.value:'');

      setTableLoading(true);

      apiActions.GetSubjectInfo_University({schoolID:SchoolID,userID:LoginUser.UserID,userType:LoginUser.UserType,pageSize:PageSize?PageSize:pageRef.current.pageSize,pageIndex:PageIndex?PageIndex:pageRef.current.current,orderType:OrderType?OrderType:tabOrderRef.current,key,dispatch}).then(data=>{

          if (data){

              setPagination(page=>{ return {...page,current:data.PageIndex,total:data.Total}});

              const tbData = data.Subjects?data.Subjects.map((i,k)=>({...i,index:k,key:k})):[];

              setTableData(tbData);

          }

          setTableLoading(false);

      })

  };


  //添加学科弹窗关闭
  const AddSubjectModalCancel = () => {

      setAddSubjectModal(false);

  };


  //table更新事件

  const tableChange = (p,f,sorter) => {

      const { order } = sorter;

      let orderName = '';

      if (order==='ascend'){

          orderName = 'ASC';

      }else if (order==='descend'){

          orderName = 'DEC';

      }

      setTabOrder(orderName);

      setTimeout(updateTable,0);

  };

  //搜索

  //搜索值变化

  const searchValueChange = (e) => {

      setSearch(data=>({...data,value:e.target.value}));

  };

  //点击搜索
  const subSearch = (key) =>{

    const result = subNameReg(key.value);

    if (result){

        setPagination(page=>({...page,current:1}));

        setSearch(e=>({...e,cancelShow:'y',searched:true,searchedValue:key.value}));

        setTimeout(updateTable,0);

    }else{

        dispatch(showWarnAlert({title:"输入的学科名称或学科ID格式错误"}));

    }

  };

  //取消搜索

  const subSearchCancel = () =>{

    setSearch(e=>({...e,value:'',cancelShow:'n',searched:false,searchedValue:''}));

    setPagination(page=>({...page,current:1}));

    setTimeout(updateTable,0);

  };


  //设置学科教研组长
  const onSetTeacherClick = key => {

      const item = tableDataRef.current[key];

      const { SubjectID,SubjectName,LeaderID,LeaderName } = item;

      setSubLeader(e=>({...e,show:true,subId:SubjectID,subName:SubjectName,leaderId:LeaderID,leaderName:LeaderName}));

  };

  //设置学科主管弹窗
  const SetSubjectTeacherModalOk = () => {

    const { leaderID,subID,setLeader,showLoading,hideLoading } = SubLeaderRef.current;

    const { leaderId } = leaderRef.current;

    console.log(SubLeaderRef.current,leaderId);

    if (leaderID===0){

        setLeader(e=>({...e,tipShow:true}));

    }else if (leaderId===leaderID) {

        dispatch(showWarnAlert({title:"没有选择新的教研组长"}));

    }else{

        showLoading();

        apiActions.SetSubjectLeaderUniversity({SchoolID,UserID,UserType,SubjectID:subID,NewLeaderID:leaderID,OldLeaderID:leaderId,dispatch}).then(data=>{

            if (data===0){

                setSubLeader(e=>({...e,show:false}));

                dispatch(showSuccessAlert({title:"设置成功"}));

                setTimeout(updateTable,0);

            }

            hideLoading();

        })

    }

  };

  //设置学科主管关闭
  const SetSubjectTeacherModalCancel = () => {

      setSubLeader(e=>({...e,show:false}));

  };


  //查看课程学科信息
  const lookCourse = (key) =>{

    const { SubjectID } = key;

    dispatch(subActions.lookSubject(SubjectID));

    dispatch(menuActions.leftMenuChange('course'));

  };


    return (

      <React.Fragment>

        <div className="Adm ">

          <Loading spinning={tableLoading}>

              <div className="Adm-box">
                  <div className="Adm-top">
              <span className="top-tips">
                <span className="tips tips-subject">学科管理</span>
              </span>

                      {

                          !isAIProduct?

                              <Button onClick={onAddSubjectClick} className="top-btn" color="blue" shape="round">+添加学科</Button>

                              :

                              null

                      }

              </div>

                  <div className="Adm-hr" ></div>

                  <div className="Adm-content">

                      <div className="content-top">

                          <div className={"result_text_wrapper"}>

                              <span className={"result_text"}>当前共有<span className={"color_red"}>{pagination.total}</span>门学科</span>

                          </div>

                      </div>

                      <div className="content-render">

                          {

                              pagination.total!==0?

                                  <>

                                      <Table
                                          className="table"
                                          columns={columns}
                                          pagination={false}
                                          dataSource={tableData}
                                          onChange={tableChange}>

                                      </Table>

                                      <PagiNation
                                          showQuickJumper
                                          // defaultCurrent={DataState.SubjectMsg ? DataState.SubjectMsg.PageIndex : 1}
                                          pageSize={pagination.pageSize}
                                          current={pagination.current}
                                          hideOnSinglepage={true}
                                          total={pagination.total}
                                          onChange={onPagiNationChange}>

                                      </PagiNation>

                                  </>

                                  :

                                  <Empty type={"3"} title={'没有相关学科数据'}></Empty>

                          }

                      </div>
                  </div>
              </div>

          </Loading>

        </div>
        <DetailsModal

          visible={UIState.SubjectDetailsMsgModalShow.Show}

          onCancel={SubjectDetailsMsgModalCancel}

          data={DataState.TeacherMsg ? DataState.TeacherMsg.data : {}}

          type="teacher">

        </DetailsModal>

        <Modal

          bodyStyle={{ height:220, padding:0}}
          width={600}
          type="1"
          title={"编辑学科"}
          visible={editSubModal.show}
          onOk={changeSubjectModalOk}
          onCancel={changeSubjectModalCancel}
        >

            {
                editSubModal.show ?

                  <SubjectModal ref={SubjectModalRef} type="change" LoginUser={LoginUser} subId={editSubModal.subId} isDefault={editSubModal.isDefault} subName={editSubModal.subName} subNum={editSubModal.subNum} dispatch={dispatch} ></SubjectModal>

                  :

                  ""
          }

        </Modal>

        <Modal

          bodyStyle={{height:220,padding: 0 }}
          type="1"
          width={600}
          title={"添加学科"}
          visible={addSubjectModalShow}
          onOk={AddSubjectModalOk}
          onCancel={AddSubjectModalCancel}
        >
          {

              addSubjectModalShow?

              <SubjectModal ref={SubjectModalRef} type="add" LoginUser={LoginUser} dispatch={dispatch}>



              </SubjectModal>

              :

              ""

          }
        </Modal>

        <Modal

          bodyStyle={{height:160,padding: 0 }}
          type="1"
          width={580}

          title={"设置学科主任"}
          visible={subLeader.show}
          onOk={SetSubjectTeacherModalOk}
          onCancel={SetSubjectTeacherModalCancel}
          destroyOnClose={true}
        >
          {

              subLeader.show ?

                  <SetSubjectLeader LoginUser={LoginUser} dispatch={dispatch} SubjectID={subLeader.subId} SubjectName={subLeader.subName} originLeaderID={subLeader.leaderId} originLeaderName={subLeader.leaderName} ref={SubLeaderRef}></SetSubjectLeader>

              :

                ""

          }

        </Modal>

      </React.Fragment>
    );

}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(memo(Subject));
