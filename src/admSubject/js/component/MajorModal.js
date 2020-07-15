import React,{useState,useEffect,useRef,memo,useImperativeHandle,forwardRef} from 'react';

import Scroll from 'react-custom-scrollbars';

import  '../../scss/major-modal.scss';

import {useStateValue} from "../component/hooks";

import {CheckBox, CheckBoxGroup, Empty} from "../../../common";


function MajorModal(props,ref) {

    //state
    const [major,setMajor] = useState({

        checkedList:[],

        list:[]

    });

    //props
    const {pickCollegeID,majorPickList,collegeData,isCommon} = props;



    useEffect(()=>{

        let list = [];

        if (isCommon){//如果是公共必修

            list = collegeData.map(i=>{

                let checked = true;

                if (i.Majors.length>0){

                    i.Majors.map(item=>{

                        const index = majorPickList.findIndex(it=>it.MajorID===item.MajorID);

                        if (index===-1){

                            checked = false;

                        }

                        return item;

                    });

                }else{

                    checked = false

                }

                return {

                    ...i,

                    checked

                }

            });

        }else{

            list = collegeData.filter(i=>i.CollegeID===pickCollegeID).map(i=>{

                let checked = true;

                if (i.Majors.length>0){

                    i.Majors.map(item=>{

                        const index = majorPickList.findIndex(it=>it.MajorID===item.MajorID);

                        if (index===-1){

                            checked = false;

                        }

                        return item

                    });

                }else{

                    checked = false;

                }

                return {

                    ...i,

                    checked

                }

            });

        }

        setMajor(e=>({...e,list,checkedList:majorPickList}));

    },[]);

    //选择专业
    const majorCheck = (item,checked) =>{

        let nCheckList = major.checkedList;

        const list = major.list;

        let nList = [];

        if (checked){//由选择变为不选

            nCheckList = nCheckList.filter(i=>i.MajorID!==item.MajorID);

        }else{

            nCheckList.push(item);

        }

        if (isCommon){//如果是公共必修

            nList = list.map(i=>{

                let checked = true;

                if (i.Majors.length>0){

                    i.Majors.map(item=>{

                        const index = nCheckList.findIndex(it=>it.MajorID===item.MajorID);

                        if (index===-1){

                            checked = false;

                        }

                        return item;

                    });

                }else{

                    checked = i.checked;

                }

                return {

                    ...i,

                    checked

                }

            });

        }else{

            nList = collegeData.filter(i=>i.CollegeID===pickCollegeID).map(i=>{

                let checked = true;

                i.Majors.map(item=>{

                    const index = nCheckList.findIndex(it=>it.MajorID===item.MajorID);

                    if (index===-1){

                        checked = false;

                    }

                    return item

                });

                return {

                    ...i,

                    checked

                }

            });

        }

        setMajor(e=>({...e,checkedList:nCheckList,list:nList}));

    };




    //选择学院
    const collegeCheck = (item,checked) =>{

        let nList = Array.from(major.list);

        const index = nList.findIndex(i=>i.CollegeID===item.CollegeID);

        nList[index].checked = !checked;

        let nCheckList = Array.from(major.checkedList);

        const Majors = nList.find(i=>i.CollegeID===item.CollegeID).Majors;

        if (checked){//将去除该学院的专业

            nCheckList = nCheckList.filter(i=>!Majors.map(it=>it.MajorID).includes(i.MajorID));

        }else{

            const supplyList = Majors.filter(i=>!nCheckList.map(it=>it.MajorID).includes(i.MajorID));

            nCheckList.push(...supplyList);

        }

        setMajor(d=>({...d,checkedList:nCheckList,list:nList}));

    };






    //对外抛出

    useImperativeHandle(ref,()=>({

        majorPickList:major.checkedList

    }));

    return(

        <div className={"major_modal_content"}>

            {

                isCommon?

                    <Scroll style={{height:340}}>

                        {

                            major.list.map((i,k)=>{

                                return(

                                    <React.Fragment key={k}>

                                        <div className={"parent check_wrapper"}>

                                            <CheckBox checked={i.checked?i.checked:false} onClick={e=>collegeCheck(i,i.checked)}>{i.CollegeName}</CheckBox>

                                        </div>

                                        {

                                            i.Majors&&i.Majors.length>0?


                                                i.Majors.map((item,key)=>{

                                                const checked = major.checkedList.findIndex(it=>it.MajorID===item.MajorID)>=0;

                                                return(

                                                    <div key={key} className={"check_wrapper child"}>

                                                        <CheckBox checked={checked} onClick={e=>majorCheck(item,checked)}>{item.MajorName}</CheckBox>

                                                    </div>

                                                )

                                            })

                                                :

                                                <div  className={"check_wrapper child"} style={{color:'#cccccc'}}>该学院下暂无专业</div>

                                        }

                                    </React.Fragment>

                                )

                            })

                        }

                    </Scroll>

                    :

                    major.list.length>0&&major.list[0].Majors.length>0?

                        <>

                            <div className={"parent check_wrapper"}>

                                <CheckBox checked={major.list[0].checked} onChange={e=>collegeCheck(major.list[0],major.list[0].checked)}>{major.list[0].CollegeName}</CheckBox>

                            </div>

                            <Scroll style={{height:360}}>

                                    {

                                        major.list[0].Majors.map((i,k)=>{

                                            const checked = major.checkedList.findIndex(item=>item.MajorID===i.MajorID)>=0;

                                            return(

                                                <div key={k} className={"check_wrapper child"}>

                                                    <CheckBox checked={checked} onClick={e=>majorCheck(i,checked)}>{i.MajorName}</CheckBox>

                                                </div>

                                            )

                                        })

                                    }

                            </Scroll>

                        </>

                        :

                        <Empty type={"2"} title={"该学院下没有相关专业数据"}></Empty>

            }

        </div>

    )

}

export default memo(forwardRef(MajorModal))