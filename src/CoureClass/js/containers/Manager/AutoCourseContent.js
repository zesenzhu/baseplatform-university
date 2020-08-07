import React,{useState,useEffect,memo,useRef,useImperativeHandle,forwardRef} from 'react';

import {Empty, Tips, CheckBox, CheckBoxGroup, RadioGroup, Radio, Loading, Modal} from '../../../../common'

import {Icon} from 'antd';

import {GetGradeInfo_University} from "../../actions/apiActions";

import Scroll from 'react-custom-scrollbars';

import SelectCourseModal from './AutoCourseClass/SelectCourseModal';




import '../../../scss/auto-course-class-modal.scss';

function AutoCourseContent(props,ref) {

    //loading相关的state
    const [loading,setLoading] = useState(true);

    //课程相关的state
    const [courses,setCourse] = useState({

        tip:false,

        list:[]

    });

    //年级相关的state
    const [grades,setGrade] = useState({

        tip:false,

        list:[],

        checkList:[]

    });

    //类型相关的state
    const [types,setType] = useState({

        checked:1,

        list:[

            {id:1,name:'使用原行政班名称'},

            {id:3,name:'课程+行政班名称'}

        ]

    });

    //modal相关

    const [modal,setModal] = useState({

        show:false

    });


    //props

    const { LoginUser,dispatch } = props;

    const { SchoolID,UserID,UserType } = LoginUser;


    //refs

    const ModalRef = useRef();


    //初始化
    useEffect(()=>{

        GetGradeInfo_University({schoolID:SchoolID,dispatch}).then(data=>{

            if (data){

                setGrade(e=>({...e,list:data}));

            }

            setLoading(false);

        })

    },[]);


    //年级选取

    const gradeChange = (list) =>{

        setGrade(data=>({...data,tip:false,checkList:list}));

    };


    //类型切换

    const typeChange = (e) =>{

        setType(data=>({...data,checked:e.target.value}));

    };

    //选择完课程后点击确定


    const autoCourseOk = () =>{

        const { checkList } = ModalRef.current;

        setCourse(e=>({...e,tip:false,list:checkList}));

        setModal(e=>({...e,show:false}));

    };


    //对外调用

    useImperativeHandle(ref,()=>{

        const list = [];

        courses.list.map(i=>{

            list.push(...i.Courses.map(item=>JSON.parse(item).CourseNO))

        });

        return {

            courseIDs:list,

            gradeIDs: grades.checkList,

            type: types.checked,

            showCourseTip: () => {

                setCourse(data => ({...data, tip: true}));

            },

            hideCourseTip: () => {

                setCourse(data => ({...data, tip: false}));

            },

            showGradeTip: () => {

                setGrade(data => ({...data, tip: true}));

            },

            hideGradeTip: () => {

                setGrade(data => ({...data, tip: false}));

            },

            showModalLoading: () => {

                setLoading(true);

            },

            hideModalLoading: () => {

                setLoading(false);

            }

        }

    });


    return(

        <Loading ref={ref} spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"auto-course-content"}>

                <div className={"props"}>开课课程：</div>

                <Tips autoAdjustOverflow={false} visible={courses.tip} title={"请选择课程"}>

                    <div className={"course_wrapper"}>

                        <div className={"course_scroll"}>

                            {

                                courses.list.length>0?

                                    <Scroll style={{height:110}}>

                                        {

                                            courses.list.map((item)=>{

                                                return item.Courses.map((i,k)=>{

                                                    return <div key={k} className={"course-item"}>{JSON.parse(i).CourseName}</div>

                                                });

                                            })

                                        }

                                    </Scroll>

                                    :

                                    <Empty type={"3"} title={"暂无选中课程"}></Empty>

                            }

                        </div>

                        <button className={"btn edit"} onClick={e=>setModal(data=>({...data,show:true}))}></button>

                    </div>

                </Tips>

                <div className={"grade-wrapper clearfix"}>

                    <div className={"props"}>开课年级：</div>

                    <Tips visible={grades.tip} title={"请选择开课年级"}>

                        <CheckBoxGroup value={grades.checkList} onChange={gradeChange}>

                            {

                                grades.list.length>0?

                                    grades.list.map((i,k)=>{

                                        return <CheckBox key={k} value={i.GradeID}>{i.GradeName}</CheckBox>

                                    })

                                    :

                                    <div className={"emp-grade"}>暂无年级数据</div>

                            }

                        </CheckBoxGroup>

                    </Tips>

                </div>

                <div className={"type-wrapper clearfix"}>

                    <div className={"props"}>教学班命名规则：</div>

                    <RadioGroup onChange={typeChange} value={types.checked}>

                        {

                            types.list.map((i,k)=>{

                                return(

                                    <Radio key={k} value={i.id}>{i.name}</Radio>

                                )

                            })

                        }

                    </RadioGroup>

                </div>

                <div className={"warn-tips"}>

                    <Icon type="warning" style={{color:'#ff6600'}}/>

                    <div className={"tips"}>

                        注意：1. 自动生成教学班指以行政班为单位，根据行政班的开课课程自动生成教学班。开课课程

                        必须是必修课。2. 教学班命名规则范例：“课程+序号”->“应用数学1班”；“课程+行政班名称”->"应

                        用数学（2014级数学1班）"。请根据需求选择教学班命名规则。

                    </div>

                </div>

            </div>

            <Modal
                bodyStyle={{height:400,padding:'30px 0px 30px 40px'}}
                width={400}
                type="1"
                destroyOnClose={true}
                title={"选择课程"}
                visible={modal.show}
                onOk={autoCourseOk}
                onCancel={e=>setModal(data=>({...data,show:false}))}
            >

                {

                    modal.show?

                        <SelectCourseModal ref={ModalRef} courseList={courses.list} dispatch={dispatch} LoginUser={LoginUser}></SelectCourseModal>

                        :''

                }

            </Modal>

        </Loading>

    )

}

export default memo(forwardRef(AutoCourseContent));