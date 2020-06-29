import React,{ Component } from 'react';

import {Modal, Loading, Search,Empty} from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class ReplaceScheduleModal extends Component{

    render() {

        const  {

            Params,ReplaceTeacherPick,SearchValueChange,ReplaceSearchClick,ReplaceSearchCancel,

            ReplaceScheduleClose,ReplaceScheduleCommit

        } = this.props;

        const {

            Show=false,ModalLoading=true,SearchValue='',CancelBtnShow='n',

            SearchWrapperShow=false,TeacherList=[],ActiveTeacherID='',

            SearchList=[],SearchLoadingShow=false,TeacherID

        } = Params;


        return (

            <Modal type={1}

                   title='选择代课教师'

                   visible={Show}

                   width={680}

                   bodyStyle={{height:324}}

                   mask={true}

                   cancelText="取消"

                   className="component-replace-schedule-wrapper"

                   onCancel={e=>ReplaceScheduleClose()}

                   onOk={e=>ReplaceScheduleCommit()}

            >

                <Loading spinning={ModalLoading}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search

                                width={220}

                                Value={SearchValue}

                                CancelBtnShow={CancelBtnShow}

                                onChange={e=>SearchValueChange(e)}

                                placeHolder='输入教师名称进行搜索'

                                onClickSearch={e=>ReplaceSearchClick(SearchValue)}

                                onCancelSearch={e=>ReplaceSearchCancel()}
                            >

                            </Search>

                        </div>

                        <div className="teacher-list-wrapper">

                            <Loading spinning={SearchLoadingShow}>

                                <ScrollBars style={{width:680,height:276}}>

                                    <div className="list-wrapper clearfix">

                                {

                                    SearchWrapperShow?

                                        SearchList.length>0?SearchList.map((item,key)=> {

                                            if (item.ID !== TeacherID) {

                                                return <div key={key}
                                                            className={`teacher-item ${ActiveTeacherID === item.ID ? 'active' : ''}`}
                                                            title={`${item.Name}[${item.ID}]`}
                                                            onClick={e => ReplaceTeacherPick(item.ID)}>{item.Name}</div>

                                            }

                                        }):<Empty type="5" title="没有搜索到内容,请换个搜索词试试"></Empty>

                                        :

                                        TeacherList.length>0?TeacherList.map((item,key)=>{

                                            if (item.ID !== TeacherID) {

                                                return <div key={key} className={`teacher-item ${ActiveTeacherID===item.ID?'active':''}`} title={`${item.Name}[${item.ID}]`} onClick={e=>ReplaceTeacherPick(item.ID)}>{item.Name}</div>

                                            }

                                        })

                                        :<Empty type="3" title="没有相关教师数据"></Empty>

                                }

                                </div>

                                </ScrollBars>

                            </Loading>

                        </div>

                    </div>

                </Loading>

            </Modal>

        );

    }

}

export default ReplaceScheduleModal;