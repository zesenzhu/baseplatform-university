import React,{useRef,useState,useEffect,memo,useImperativeHandle,forwardRef} from 'react';

import '../../scss/common/HandleCourseClass.scss';

import {DropDown,Tips,Modal,Loading} from "../../../common";

import {Input,Button} from "antd";

import {Scrollbars} from "react-custom-scrollbars";

// import {GetTeacherInfo_University,GetCourseClassDetail_University,GetGradeInfo_University} from '../../actions/apiActions';

// import {subNameReg} from '../../actions/utils';

import { useStateValue } from '../actions/hooks';

import SelectStudent from "./SelectStudent";

import { connect } from 'react-redux';



function AddTmpCourseClass(props,ref) {

    //loading
    const [loading,setLoading] = useState(true);

    //初次加载

    const [selectStuModal,setSelectStuModal] = useState(false);

    //教学班相关
    const [courseClass,setCourseClass] = useState({

        tip:false,

        tipTitle:'请输入教学班名称',

        value:''

    });


    //学生和行政班
    const [stuList,setStu] = useState({

        list:[],

        tip:false

    });



    //获取props
    const { LoginUser,dispatch } = props;

    const { SchoolID,UserID,UserType,UserName } = LoginUser;

    const { StudentList,CourseClassName } = props;


    //ref

    const SelectCourseModalRef = useRef();

    const SelectStudentModalRef = useRef();


    const stuListRef = useStateValue(stuList);

    //初始化

    useEffect(()=>{

        setStu(d=>({...d,list:StudentList}));

        setCourseClass(d=>({...d,value:CourseClassName}));

        setLoading(false);

    },[StudentList,CourseClassName]);





    //课程名称blur

    const courseClassBlur = () =>{

        if(courseClass.value){

            let result = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/.test(courseClass.value);

            if (result){

                setCourseClass(data=>({...data,tip:false}));

            }else{

                setCourseClass(data=>({...data,tip:true,tipTitle:'教学班名称格式不正确'}));

            }

        }else{

            setCourseClass(data=>({...data,tip:false}));

        }

    };

    //选择学生点击OK

    const selectStudentOk = () =>{

        const { checkedList } = SelectStudentModalRef.current;

        setStu(d=>({...d,list:checkedList,tip:false}));

        setSelectStuModal(false);

    };





    //删除已选中的班级或者学生
    const delCheckedItem = (item) =>{

        const list = Array.from(stuListRef.current.list);

        const sList = list.filter(i=>i.StudentID!==item.StudentID);

        setStu(d=>({...d,list:sList}));

    };


    //清空

    const clearEmpty = () =>{

        setStu(d=>({...d,list:[]}));

    };


    useImperativeHandle(ref,()=>({

        CourseClassName:courseClass.value,

        showCourseClassTip:(title)=>setCourseClass(e=>({...e,tip:true,tipTitle:title})),

        StudentList:stuList.list,

        classNameTrue:!courseClass.tip,

        showStuTip:()=>setStu(d=>({...d,tip:true})),

        showModalLoading:()=>setLoading(true),

        hideModalLoading:()=>setLoading(false)

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
                                style={{width: 300}}
                                type="text"
                                maxLength={20}
                                onBlur={courseClassBlur}
                                onChange={e=>{e.persist();setCourseClass(data=>({...data,value:e.target.value}))}}
                                value={courseClass.value}
                            />

                        </Tips>

                    </span>

                    </div>

                </div>

                <div className="row clearfix">

                    <div className=" row-column row-column-2">

                        <span className="left">学生名单：</span>

                        <span className="right right-2">

                        <Tips visible={stuList.tip} title={"请选择学生"}>

                            <div className="Student-box">

                          <div className="box-top">
                            <span className="top-left">
                              已选
                              <span className="count">
                                {stuList.list.length}
                              </span>
                              名学生

                            </span>

                            <span className="top-right">

                                <span onClick={e=>setSelectStuModal(true)} className="handle select">选择</span>

                                <span onClick={clearEmpty} className="handle deleteAll">清空</span>

                            </span>

                          </div>

                          <div className="box-content">

                              <div className={`stu-list-wrapper list-wrapper no-border`}>

                                  <Scrollbars style={{width:600,height:280}}>

                                      <div className={"card-wrapper"}>

                                          {

                                              stuList.list.map((i,k)=>{

                                                  return(

                                                      <span className="content-card" key={k}>

                                                 <span title={i.StudentName} className="card-name">{i.StudentName}</span>

                                                 <span title={i.StudentID} className="card-id">{i.StudentID}</span>

                                                 <span className="icon-x" onClick={e=>delCheckedItem(i)}></span>

                                            </span>

                                                  )

                                              })

                                          }

                                      </div>

                                  </Scrollbars>

                              </div>

                          </div>

                        </div>

                        </Tips>

                    </span>

                    </div>

                </div>

            </div>


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

                        <SelectStudent  dataList={stuList.list} ref={SelectStudentModalRef}></SelectStudent>

                        : ''

                }

            </Modal>

        </Loading>



    )

}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    return { LoginUser };

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(AddTmpCourseClass)));