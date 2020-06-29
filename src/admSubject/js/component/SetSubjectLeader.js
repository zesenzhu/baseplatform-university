import React,{useState,useRef,useEffect,memo,forwardRef,useImperativeHandle} from "react";

import "../../scss/SetSubjectLeader.scss";

import { Loading, DropDown,Tips } from "../../../common";

import {GetTeacherInfoBySubjectAndKey} from "../actions/apiActions";

import {showWarnAlert, teacherSearchReg} from "../actions/utils";

import {useStateValue} from '../component/hooks';


function SetSubjectLeader (props,ref){

    const [loading,setLoading] = useState(true);

    const [leader,setLeader] = useState({

       dropSelectd:props.originLeaderName?{value:props.originLeaderID,title:props.originLeaderName}:{value:0,title:"请选择教师"},

       loading:false,

       searchList:[],

       tipShow:false,

       selectd:false,

       value:'',

       cancelShow:'n'

    });



    const leaderRef = useStateValue(leader);


    //结构传参
    const { dispatch,SubjectName,SubjectID,originLeaderID,originLeaderName,LoginUser } = props;

    const { SchoolID } = LoginUser;


    //初始化
    useEffect(()=>{

        GetTeacherInfoBySubjectAndKey({subjectID:SubjectID,schoolID:SchoolID,dispatch}).then(data=>{

            if (data){

                const { TeacherInfoItem } = data;

                const teacherList = TeacherInfoItem.filter(i=>i.TeacherID!==originLeaderID).map(item=>({id:item.TeacherID,name:item.TeacherName}));

                setLeader(e=>({...e,searchList:teacherList}));

            }

            setLoading(false);

        })

    },[]);



    //下拉改变

    const dropLeaderChange = (obj) =>{

        const { value,id } = obj;

        setLeader(e=>({...e,dropSelectd:{value:id,title:value},tipShow:false,selectd:true}));

    };

    //搜索内容改变

    const inputChange = (e)=>{

        e.persist();

        setLeader({...leader,value:e.target.value});

    };

    //搜索教师

    const dropLeaderSearch = (key) =>{

        const { value } = key;

        const result = teacherSearchReg(value);

        if (result){

            setLeader(e=>{

                return {...e,cancelShow:'y'};

            });

            updateDropList(value);

        }else{

            dispatch(showWarnAlert({title:"输入的教师名称或工号错误"}));

        }

    };

    //取消搜索
    const dropLeaderCancel = () =>{

        setLeader(e=>{

            return {...e,cancelShow:'n',value:''};

        });

        setTimeout(updateDropList,0);

    };


    //更新droplist
    const updateDropList = (value) =>{

        setLeader(e=>({...e,loading:true}));

        GetTeacherInfoBySubjectAndKey({subjectID:SubjectID,schoolID:SchoolID,key:value?value:leaderRef.current.value,dispatch}).then(data=>{

            if (data){

                const { TeacherInfoItem } = data;

                const teacherList = TeacherInfoItem.filter(i=>i.TeacherID!==originLeaderID).map(item=>({id:item.TeacherID,name:item.TeacherName}));

                setLeader(e=>({...e,searchList:teacherList}));

            }

            setLeader(e=>({...e,loading:false}));

        })


    };




    //将ref暴露给外部

    useImperativeHandle(ref,()=>({

        leaderID:leader.dropSelectd.value,

        subID:SubjectID,

        setLeader,

        showLoading:()=>{

            setLoading(true);

        },

        hideLoading:()=>{

            setLoading(false);

        }

    }));



    return (

      <Loading size="large" spinning={loading}>

          <div className="SetSubjectTeacher" ref={ref}>

          <div className="row clearfix">

            <span className="culonm-1">学科名称：</span>

            <span className="culonm-2">

              <span
                title={SubjectName}
                className="subjectName"
              >
                {SubjectName}

                </span>

            </span>

          </div>

          <div  className="row clearfix">

                  <span className="culonm-1">学科主管：</span>

                  <div className="culonm-2 culonm-3">

                    <Tips visible={leader.tipShow} title={"请选择教师"}>

                        <DropDown
                            type="multiple"
                            style={{ zIndex:5}}
                            className={"DropMenu"}
                            width={120}
                            mutipleOptions={{
                                searchWidth: 300,
                                width:500,
                                height:300,
                                range: 1,
                                searchOpen: true,
                                dropCancelSearch:dropLeaderCancel,
                                searchLoadingShow:leader.loading,
                                searchPlaceholder: "请输入任课教师工号或名称进行搜索",
                                searchList:leader.searchList,
                                dropClickSearch:dropLeaderSearch,
                                dropMultipleChange:dropLeaderChange,
                                inputValue:leader.value,
                                CancelBtnShow:leader.cancelShow,
                                inputChange:inputChange,
                                empTitle:'暂未有相关教师数据',
                                empSearchTitle:'暂未有相关教师数据'
                            }}
                            dropSelectd={leader.dropSelectd}>

                        </DropDown>

                    </Tips>

                      {

                          leader.selectd&&originLeaderName?

                              <span className="TeacherChange">{`原教研组长:${originLeaderName}`}</span>

                              :''

                      }

                  </div>

                </div>

        </div>

      </Loading>

    );

}

export default memo(forwardRef(SetSubjectLeader));
