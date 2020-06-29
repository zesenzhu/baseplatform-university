import React,{useState,useEffect,memo,useRef,forwardRef,useImperativeHandle} from 'react';

import {Empty, Loading, Radio,RadioGroup} from '../../../../../common'

import {connect} from 'react-redux';

import {GetCouseclassSumarry_University,GetCouseclassSumarryOne_University,GetCourseInfoByUserID_University} from "../../../actions/apiActions";

import Scroll from 'react-custom-scrollbars';

import {TransitionGroup,CSSTransition} from 'react-transition-group';

import '../../../../scss/select-course-modal.scss';

function SelectCourseModal(props,ref) {

    //loading相关的state
    const [loading,setLoading] = useState(true);

    //第一次加载

    const [firstLoad,setFirstLoad] = useState(true);

    //课程相关的state
    const [courses,setCourse] = useState({

        list:[],

        checked:{CourseNO:'',CourseName:'',MajorIDs:''}

    });



    //props

    const { LoginUser,courseCheckInfo,dispatch } = props;

    const { SchoolID,UserID,UserType,UserClass } = LoginUser;


    //初始化
    useEffect(()=>{

        if (firstLoad&&UserType==='0'){

            GetCouseclassSumarry_University({schoolID:SchoolID,userType:UserType,userID:UserID,type:2,dispatch}).then(data=>{

                if (data){

                    const Item = data.Item?data.Item:[];

                    const subList = Item.map(i=>({SubjectID:i.ObjectID,SubjectName:i.ObjectName,Courses:[],drop:false,loaded:false}));

                    setCourse(e=>({...e,list:subList}));

                }

                setCourse(e=>({...e,checked:courseCheckInfo}));

                setLoading(false);

                setFirstLoad(false);

            });

        }else if (firstLoad&&UserType==='1'){//如果是教师端点开的这个界面

            GetCourseInfoByUserID_University({userID:UserID,schoolID:SchoolID,dispatch}).then(data=>{

                if (data){

                    const subList = data.map(i=>{

                        const Courses = i.Courses?i.Courses:[];

                        return {SubjectID:i.SubjectID,SubjectName:i.SubjectName,Courses,drop:false}

                    });

                    setCourse(e=>({...e,list:subList}));

                }

                setLoading(false);

            });

        }

    },[courseCheckInfo]);





    //drop发生变化

    const dropChange = (SubjectID) =>{

        const  list = courses.list.map(i=>{

            if (i.SubjectID===SubjectID){

                return {...i,drop:!i.drop};

            }else{

                return i;

            }

        });

        const copyList = Array.from(list);

        if (UserType==='0'){//是管理员的时候

            const loaded = list.find(i=>i.SubjectID===SubjectID).loaded;

            if (loaded){

                setCourse(e=>({...e,list:copyList}));

            }else{

                GetCouseclassSumarryOne_University({schoolID:SchoolID,objectID:SubjectID,type:2,dispatch}).then(data=>{

                    if (data){

                        const Courses = data.Item?data.Item.map(i=>({CourseNO:i.ObjectID,CourseName:i.ObjectName,MajorIDs:i.MajorIDs?i.MajorIDs:''})):[];

                        const findIndex = copyList.findIndex(i=>i.SubjectID===SubjectID);

                        copyList[findIndex].Courses = Courses;

                        copyList[findIndex].loaded= true;

                        setCourse(e=>({...e,list:copyList}));

                    }

                })

            }

        }else{//不是管理员的时候

            setCourse(e=>({...e,list:copyList}));

        }



        /*setCourse(e=>({...e,list}));*/

    };


    //选择课程

    const courseChange = (e) => {

        const json = JSON.parse(e.target.value);

        setCourse(data=>({...data,checked:json}));

    };

    //js形式的动画

    const sliderEntering = (node,length) => {

        node.style.maxHeight = length*22+'px';

    };

    const sliderEntered = (node,length) => {

        node.style.maxHeight = length*22+'px';

    };


    //对外抛出属性

    useImperativeHandle(ref,()=>({

        checked:courses.checked

    }));

    return(

        <Loading ref={ref} spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"add-edit-select-course"}>


                {

                    courses.list.length>0?

                        <Scroll style={{height:340}} autoHide={false}>

                            <RadioGroup value={JSON.stringify(courses.checked)} onChange={courseChange}>

                                {

                                    courses.list.map((i,k)=>{

                                        return(

                                            <div key={k} className={"subject-wrapper"}>

                                                <div className={"subject-row"}>

                                                    <div >

                                                        <CSSTransition timeout={300} in={i.drop} classNames={'drop'}>

                                                            <i className={"trangle"} onClick={e=>dropChange(i.SubjectID)}></i>

                                                        </CSSTransition>

                                                        <span style={{cursor:'pointer'}} onClick={e=>dropChange(i.SubjectID)}>{i.SubjectName}</span>

                                                    </div>

                                                </div>

                                                <CSSTransition

                                                    classNames={"slider"}

                                                    in={i.drop}

                                                    timeout={300}

                                                    onEntering={node=>sliderEntering(node,i.Courses.length)}

                                                    onEntered={node=>sliderEntered(node,i.Courses.length)}

                                                >

                                                    <div className={"item-wrapper"}>

                                                        {

                                                            i.Courses.map((item,key)=>{

                                                                return <div key={key} className={"course-wrapper"}>

                                                                    <Radio value={JSON.stringify({CourseNO:item.CourseNO,CourseName:item.CourseName,MajorIDs:item.MajorIDs?item.MajorIDs:''})}>{item.CourseName}</Radio>

                                                                </div>

                                                            })

                                                        }

                                                    </div>

                                                </CSSTransition>

                                            </div>

                                        )

                                    })

                                }

                            </RadioGroup>

                        </Scroll>

                        :

                        <Empty type={"2"} title={"没有学科和课程数据"}></Empty>

                }



            </div>

        </Loading>

    )

}

const mapStateToProps = (state) =>{

    const { DataState } = state;

    const { LoginUser } = DataState;

    return { LoginUser };

};

export default memo(connect(mapStateToProps,null,null,{forwardRef:true})(forwardRef(SelectCourseModal)));