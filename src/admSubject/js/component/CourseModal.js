import React,{useState,useEffect,useRef,memo,useImperativeHandle,forwardRef} from 'react';

import { DropDown,Modal,Tips,Loading } from "../../../common";

import Scroll from 'react-custom-scrollbars';

import MajorModal from './MajorModal';

import {Input,InputNumber} from "antd";

import  '../../scss/course-modal.scss';

import * as apiActions from '../actions/apiActions';

import {showWarnAlert,showErrorAlert,showSuccessAlert,subNameReg}  from '../actions/utils'

import {useStateValue} from "../component/hooks";

import {useSelector,useDispatch} from 'react-redux';



function CourseModal(props,ref) {


    //课程类型
    const [courseType,setCourseType] = useState({

       dropSelectd:{value:'',title:'请选择学科类型'},

       dropList:[

           {value:1,title:'专业必修'},

           {value:2,title:'公共必修'},

           {value:3,title:'专业选修'},

           {value:4,title:'公共选修'},

           {value:5,title:'其它'},

       ],

       tipShow:false

    });

    //学科
    const [subjects,setSubject] = useState({

        dropSelectd:{value:0,title:'请选择学科'},

        dropList:[],

        tipShow:false

    });

    //学院
    const [college,setCollege] = useState({

       dropSelectd:{value:0,title:"请选择学院"},

       dropList:[],

       tipShow:false,

       collegeData:[]

    });

    //课程
    const [course,setCourse] = useState({

       nameTipShow:false,

       nameTipTitle:'请输入课程名称',

       numTipShow:false,

       numTipTitle:'请输入课程编号'

    });

    const [courseNameInput,setCourseNameInput] = useState('');

    const [courseNumInput,setCourseNumInput] = useState('');

    //专业
    const [major,setMajor] = useState({

        modalShow:false,

        majorPickList:[],

        tipShow:false,

        isCommon:false

    });

    //loading
    const [loading,setLoading] = useState(false);

    const [credit,setCredit] = useState('');

    const {productType,identify,DataState} = useSelector(state=>state);

    const {LoginUser} = DataState;

    //props
    const { type,subList,collegeList,courseNO,collegeData,courseNameE,courseNumE,subSelectd,collegeSelectd,courseTypeE,majorListE,courseCredit } = props;





    //refs

    const courseNameRef = useRef();

    const courseNumRef = useRef();

    const MajorModalRef = useRef();

    const creditRef = useStateValue(credit);


    //弹窗初始化将需要的东西组合

    useEffect(()=>{

        setSubject(e=>({...e,dropList:subList,dropSelectd:subSelectd.value!==0?subSelectd:{value:0,title:'请选择学科'}}));

        if (identify.isCollegeManager){

            setCollege(e=>({...e,collegeData,dropSelectd:{value:LoginUser.CollegeID,title:LoginUser.CollegeName}}));

        }else{

            setCollege(e=>({...e,dropList:collegeList,collegeData,dropSelectd:collegeSelectd.value!==0?collegeSelectd:{value:0,title:'请选择学院'}}));

        }

        setCourseNameInput(courseNameE);

        setCourseNumInput(courseNumE);

        setCourseType(e=>({...e,dropSelectd:courseTypeE}));

        setCredit(courseCredit);

        if (collegeSelectd.value!==0){//如果找不到对应的学院数据

            let index = collegeData.findIndex(i=>i.CollegeID===collegeSelectd.value);

            if (index===-1){

                setCollege(e=>({...e,dropSelectd:{value:0,title:'请选择学院'}}));

            }

        }

        if (subSelectd.value!==0){//如果找不到对应的学院数据

            let index = subList.findIndex(i=>i.value===subSelectd.value);

            if (index===-1){

                setSubject(e=>({...e,dropSelectd:{value:0,title:'请选择学科'}}));

            }

        }

        const majorPickList = majorListE.map(i=>{

           let data = {};

           collegeData.map(item=>{

              item.Majors.map(it=>{

                  if (it.MajorID===i){

                      data = it;

                      return;

                  }

              })

           });

           return data;

        });

        setMajor(e=>({...e,majorPickList}));

    },[subList,collegeList,collegeData,courseNameE,courseNumE,subSelectd,collegeSelectd,courseTypeE,majorListE,courseCredit]);


    //事件

    //学科下拉改变
    const subChange = (obj) =>{

        setSubject(e=>({...e,tipShow:false,dropSelectd:obj}));

    };

    //学院下拉改变
    const collegeChange = (obj) =>{

        setCollege(e=>({...e,tipShow:false,dropSelectd:obj}));

        setMajor(e=>({...e,majorPickList:[],tipShow:false}));

    };

    //课程类型下拉改变
    const courseTypeChange = (obj) =>{

        setCourseType(e=>({...e,tipShow:false,dropSelectd:obj}));

        setMajor(e=>({...e,tipShow:false,majorPickList:[]}));

    };

    //点击编辑专业

    const editMajorClick = () =>{

        const isCommon = courseType.dropSelectd.value===2;

        setMajor(e=>({...e,modalShow:true,isCommon}));

    };

    //关闭专业窗

    const majorClose = () =>{

        setMajor(e=>({...e,modalShow:false}));

    };

    //关闭专业窗

    const majorOk = () =>{

        const {majorPickList} = MajorModalRef.current;

        if (majorPickList.length>0){

            setMajor(e=>({...e,modalShow:false,tipShow:false,majorPickList}));

        }else{

            setMajor(e=>({...e,modalShow:false,majorPickList}));

        }

    };


    //课程名称blur
    const courseNameBlur = () =>{

      const value = courseNameRef.current.state.value;

      let result = subNameReg(value);

      if (value&&!result){

        setCourse(e=>({...e,nameTipShow:true,nameTipTitle:"格式不正确"}));

      }else{

          setCourse(e=>({...e,nameTipShow:false}));

      }

    };

    //课程编号blur
    const courseNumBlur = () =>{

        const value = courseNumRef.current.state.value;

        let result = subNameReg(value);

        if (value&&!result){

            setCourse(e=>({...e,numTipShow:true,numTipTitle:"格式不正确"}));

        }else{

            setCourse(e=>({...e,numTipShow:false}));

        }

    };




    useImperativeHandle(ref,()=>({

        courseNO:courseNO,

        courseName:productType===6?courseNameInput:courseNameRef.current.state.value,

        courseNum:productType===6?courseNumInput:courseNumRef.current.state.value,

        courseNameTipShow:course.nameTipShow,

        courseNumTipShow:course.numTipShow,

        subID:subjects.dropSelectd.value,

        collegeID:college.dropSelectd.value,

        courseType:courseType.dropSelectd.value,

        credit:credit,

        majorIDs:major.majorPickList.map(i=>i.MajorID).join(','),

        showCourseNameTips:(title)=>{

            setCourse(e=>({...e,nameTipShow:true,nameTipTitle:title}));

        },

        showCourseNumTips:(title)=>{

            setCourse(e=>({...e,numTipShow:true,numTipTitle:title}));

        },

        showSubjectTips:()=>{

            setSubject(e=>({...e,tipShow:true}));

        },

        showCollegeTips:()=>{

            setCollege(e=>({...e,tipShow:true}));

        },

        showCourseTypeTips:()=>{

            setCourseType(e=>({...e,tipShow:true}));

        },

        showMajorTips:()=>{

            setMajor(e=>({...e,tipShow:true}));

        },

        showLoading:()=>{

            setLoading(true)

        },

        hideLoading:()=>{

            setLoading(false)

        }

    }));


    console.log(college.collegeData,major);

    return(

            <Loading spinning={loading} tip={"加载中，请稍候..."}>

                <div className={"course_content_wrapper"} ref={ref}>

                    <div className={"row_wrapper clearfix"}>

                        <div className={"content"}>

                            <span className={"props"}>课程名称:</span>

                            {

                                productType!==6?

                                    <Tips visible={course.nameTipShow} title={course.nameTipTitle}>

                                        <Input placeholder={"请输入课程名称"} onBlur={courseNameBlur} ref={courseNameRef} onChange={e=>setCourseNameInput(e.target.value)} value={courseNameInput}/>

                                    </Tips>

                                    :

                                    <span className={"course-name"}>{courseNameInput}</span>

                            }



                        </div>

                        <div className={"content"}>

                            <span className={"props"}>课程编号:</span>

                            {

                                productType!==6?

                                    <Tips visible={course.numTipShow} title={course.numTipTitle}>

                                        <Input placeholder={"请输入课程编号"} onBlur={courseNumBlur} ref={courseNumRef} onChange={e=>setCourseNumInput(e.target.value)} value={courseNumInput}/>

                                    </Tips>

                                    :

                                    <span className={"course-no"}>{courseNumInput?courseNumInput:'--'}</span>

                            }



                        </div>

                    </div>

                    <div className={"row_wrapper clearfix"}>

                        <div className={"content"}>

                            <span className={"props"}>所属学科:</span>

                            {

                                productType===6?

                                    <span className={"subject"}>{subjects.dropSelectd.title}</span>

                                    :

                                    <Tips visible={subjects.tipShow} title={"请选择学科"}>

                                        <DropDown

                                            width={150}

                                            style={{zIndex:5}}

                                            height={300}

                                            dropSelectd={subjects.dropSelectd}

                                            dropList={subjects.dropList}

                                            onChange={subChange}

                                        >

                                        </DropDown>

                                    </Tips>

                            }





                        </div>

                        <div className={"content"}>

                            <span className={"props"}>开课学院:</span>

                            {

                                identify.isCollegeManager?

                                    <span>{LoginUser.CollegeName}</span>

                                    :

                                    <Tips visible={college.tipShow} title={"请选择学院"}>

                                        <DropDown

                                            width={150}

                                            style={{zIndex:5}}

                                            height={300}

                                            dropSelectd={college.dropSelectd}

                                            dropList={college.dropList}

                                            onChange={collegeChange}

                                        >

                                        </DropDown>

                                    </Tips>

                            }

                        </div>

                    </div>

                    <div className={"row_wrapper clearfix"}>

                        <div className={"content"}>

                            <span className={"props"}>课程类型:</span>

                            <Tips visible={courseType.tipShow} title={"请选择课程类型"}>

                                <DropDown

                                    width={150}

                                    dropSelectd={courseType.dropSelectd}

                                    dropList={courseType.dropList}

                                    height={120}

                                    style={{zIndex:3}}

                                    onChange={courseTypeChange}

                                >

                                </DropDown>

                            </Tips>

                        </div>

                        <div className={"content"}>

                            <span className={"props"}>课程学分:</span>

                            <InputNumber maxLength={3}  min={0} className={"course-credit"}  placeHolder={"请输入课程学分"} value={credit} onChange={v=>{setCredit(v)}}/>

                        </div>

                    </div>

                    <div className={"row_wrapper major-container clearfix"}>

                        <div className={"major_text"}>面向专业:</div>

                        <Tips visible={major.tipShow} title={"请选择面向的专业"}>

                            <div className={"major_wrapper"}>

                                <div className={"major_content"}>

                                    <Scroll style={{height:110}}>


                                        {

                                            major.majorPickList.length>0?

                                                major.majorPickList.map((i,k)=>{

                                                    return <span key={k} className={"major_item"}>{i.MajorName};</span>

                                                })

                                                :

                                                <div className={"emp"}>暂无选中专业</div>

                                        }



                                    </Scroll>

                                </div>

                                {

                                    college.dropSelectd.value!==0&&(courseType.dropSelectd.value===1||courseType.dropSelectd.value===3)?

                                        <button onClick={editMajorClick} className={"edit btn"}></button>

                                        :null

                                }

                            </div>

                        </Tips>

                    </div>

                    <Modal
                        className={"major_modal"}
                        bodyStyle={{height:400,padding:'20px 0 20px 40px'}}
                        width={360}
                        type="1"
                        title={"选择专业"}
                        visible={major.modalShow}
                        maskClosable={true}
                        // onOk={majorOk}
                        onCancel={majorOk}
                        footer={null}

                    >

                        {

                            major.modalShow?

                                <MajorModal

                                    pickCollegeID={college.dropSelectd.value}

                                    majorPickList={major.majorPickList}

                                    collegeData={college.collegeData}

                                    isCommon={major.isCommon}

                                    ref={MajorModalRef}

                                >


                                </MajorModal>

                                :''

                        }

                    </Modal>

                </div>

            </Loading>

    )

}

export default memo(forwardRef(CourseModal))