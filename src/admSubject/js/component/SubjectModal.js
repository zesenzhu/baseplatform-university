import React,{useState,useEffect,useRef,memo,forwardRef,useImperativeHandle} from "react";

import "../../scss/subject-modal.scss";

import { Input } from "antd";

import {
  Loading,
  DropDown,
  Tips
} from "../../../common";


import {GetSubjectInfoValid_University} from "../actions/apiActions";

import {subNameReg,subNumReg} from "../actions/utils";


function SubjectModal(props,ref){

    const [loading,setLoading] = useState(true);

    const [subjects,setSubjects] = useState({

        dropSelectd:{value:'',title:'自定义'},

        dropList:[],

        subList:[]

    });

    const [subInput,setSubInput] = useState({

           tipShow:false,

           tipTitle:'',

           value:'',

           show:true

    });

    const [subNumInput,setSubNumInput] = useState({

        tipShow:false,

        tipTitle:'',

        value:'',

        show:true

    });

    const [subNum,setSubNum] = useState('');

    const subModalRef = useRef();


    const { type,LoginUser,dispatch,subName,subId,isDefault } = props;


    useEffect(()=>{

      if (type==='add'){

          GetSubjectInfoValid_University({schoolID:LoginUser.SchoolID,dispatch}).then(data=>{

              if (data){

                  const subjectArr = data.ItemSubject?data.ItemSubject.map(item=>{

                      return{ value:item.SubjectID,title:item.SubjectName };

                  }):[];

                  subjectArr.unshift({value:'',title:'自定义'});

                  setSubjects(subjects=>{ return { ...subjects,dropList:subjectArr,subList:data.ItemSubject}});

                  setLoading(false);

              }

          });

      }else{

          if (isDefault){

              setSubInput(data=>{return{...data,show:false,value:subName}});

          }else{

              setSubInput(data=>{return{...data,show:true,value:subName}});

          }

           setSubNumInput(data=>{return {...data,value:props.subNum?props.subNum:''}});

           setLoading(false);

      }

    },[]);


    //下拉框选择
    const dropMenuSubject = (obj) => {

        const { value,title } = obj;

        setSubjects(subjects=>{ return { ...subjects,dropSelectd:obj} });

        if (value!==''){

            setSubInput(subInput=>{ return { ...subInput,tipShow:false,tipTitle:'',value:'',show:false}});

            setSubNumInput(subNumInput=>{ return { ...subNumInput,tipShow:false,tipTitle:'',value:''} });

            const subNumber = subjects.subList.find(item=>item.SubjectID===value).SubjectNumber;

            setSubNumInput(e=>({...e,value:subNumber,tipShow:false}));

        }else{

            setSubInput(subInput=>{ return { ...subInput,show:true}});

            setSubNumInput(subNumInput=>{ return { ...subNumInput,value:''}});

        }

    };

    //学科名称变化
    const subInputChange = (value) => {

        setSubInput(subInput=>{ return {  ...subInput,value } });

    };


    //学科名称blur
    const subInputBlur = () => {

        if (subInput.value.toString().trim()){

            const result =  subNameReg(subInput.value);

            result?setSubInput(subInput=>{ return {...subInput,tipShow:false}}):setSubInput(subInput=>{ return {...subInput,tipShow:true,tipTitle:"学科名称格式不正确"}});


        }else{

            setSubInput(subInput=>{ return {...subInput,tipShow:false}});

        }

    };


    //学科编号变化
    const subNumInputChange = (value) =>{

        setSubNumInput(subNumInput=>{ return {  ...subNumInput,value } });

    };

    //学科编号blur
    const subNumInputBlur = () =>{

        if (subNumInput.value.toString().trim()){

            const result = subNumReg(subNumInput.value);

            result?setSubNumInput(subNumInput=>{ return {...subNumInput,tipShow:false}}):setSubNumInput(subNumInput=>{ return {...subNumInput,tipShow:true,tipTitle:"学科编号由字母或数字组成"}});

        }else{

            setSubNumInput(subNumInput=>{ return {...subNumInput,tipShow:false}});

        }

    };




    useImperativeHandle(ref,()=>({

        id:type==='add'?(subInput.show?'':subjects.dropSelectd.value):subId,

        number:subNumInput.value.toString().trim(),

        name:subInput.show?subInput.value.toString().trim():type==='add'?subjects.dropSelectd.title:subInput.value,

        nameTrue:subInput.show?!subInput.tipShow:true,

        numTrue:subNumInput.show?!subNumInput.tipShow:true,

        setLoading:setLoading,

        setSubInput:setSubInput,

        setSubNumInput:setSubNumInput

    }));



    return (

        <Loading size="large" spinning={loading} ref={subModalRef}>

          <div className="chageSubject">

              <div className="row clearfix">

                  <span className="culonm-1">学科名称：</span>

                  <div className="culonm-2 dropMenuBox">

                  {

                    type === 'add'?

                            <>

                                <DropDown
                                style={{ zIndex: 2 }}
                                className={"DropMenu"}
                                onChange={dropMenuSubject}
                                width={120}
                                height={300}
                                dropSelectd={subjects.dropSelectd}
                                dropList={subjects.dropList}>

                                </DropDown>

                                {
                                    subInput.show?

                                        <Tips
                                            overlayClassName="tips"
                                            visible={subInput.tipShow}
                                            title={subInput.tipTitle}
                                        >
                                            <Input
                                                type="text"
                                                width={200}
                                                maxLength={12}
                                                onChange={e=>subInputChange(e.target.value)}
                                                onBlur={subInputBlur}
                                                value={subInput.value}
                                                className="box-input"
                                                placeholder="输入学科名称...">

                                            </Input>

                                        </Tips>

                                        :''
                                }

                            </>

                        :

                        subInput.show?

                            <Tips
                                  overlayClassName="tips"
                                  visible={subInput.tipShow}
                                  title={subInput.tipTitle}
                              >
                                        <Input
                                            type="text"
                                            width={200}
                                            maxLength={12}
                                            onChange={e=>subInputChange(e.target.value)}
                                            onBlur={subInputBlur}
                                            value={subInput.value}
                                            className="box-input"
                                            placeholder="输入学科名称...">

                                        </Input>

                                    </Tips>

                            :

                            <div className={"sub-default-name"}>{subInput.value}</div>

                  }

              </div>

              </div>

              <div className="row clearfix">

                  <span className="culonm-1">学科编号：</span>

                  <div className="culonm-2 dropMenuBox">

                      <Tips
                          overlayClassName="tips"
                          visible={subNumInput.tipShow}
                          title={subNumInput.tipTitle}
                      >
                          <Input
                              type="text"
                              width={200}
                              maxLength={30}
                              onChange={e=>subNumInputChange(e.target.value)}
                              onBlur={subNumInputBlur}
                              value={subNumInput.value}
                              className="box-input number"
                              placeholder="输入学科编号...">

                          </Input>

                      </Tips>

                  </div>

              </div>

          </div>

        </Loading>

    );
}


export default memo(forwardRef(SubjectModal));
