import React,{Component} from 'react';

import { Modal,Loading,Tips } from "../../../../common";

import { connect } from 'react-redux';

import DelScheduleActions from '../../actions/Manager/DelScheduleActions';

class DelScheduleModal extends Component{

    constructor(props) {

        super(props);

        this.state={

            GradeTips:false,

            Grades:[],

            update:false,

            checkedGrades:[]

        }

    }


    //当学段年级被选中的情况下
    gradeChecked(id) {

        const { dispatch } = this.props;

        const index = this.state.checkedGrades.findIndex(i=>i===id);

        let arr = [];

        if (index>=0){

            arr = this.state.checkedGrades;

            arr.splice(index,1);

        }else{

            arr = this.state.checkedGrades;

            arr.push(id);

        }

        this.setState({GradeTips:false,checkedGrades:arr});

    }

    //弹窗关闭
    alertClose(){

        const { dispatch } = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_HIDE});

        this.setState({GradeTips:false, Grades:[],

            update:false,

            checkedGrades:[]});

    }

    //弹窗确定
    alertCommit(){

        const { dispatch } = this.props;

        dispatch(DelScheduleActions.commitInfo({that:this,checkedGrades:this.state.checkedGrades}));

    }

    componentWillUpdate(nextProps){

        const { PeriodWeekTerm,DelScheduleModal } = nextProps;

        const { Grades,show } = DelScheduleModal;

        const { ItemCollege } = PeriodWeekTerm;

        if (!this.state.update&&Grades){

            let GrdList = Grades.map(i=>({id:i.GradeID,name:i.GradeName}));

            this.setState({Grades:GrdList,update:true,colleges:ItemCollege});

        }

    }

    render() {

        const { DelScheduleModal } = this.props;

        const {

            show,

            loadingShow,

            Grades

        } = DelScheduleModal;

        return (

            <Modal className="del-schedule-modal"
                   title="删除课程"
                   type={1}
                   visible={show}
                   width={740}
                   bodyStyle={{height:234}}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.alertClose.bind(this)}
                   onOk={this.alertCommit.bind(this)} >

                <div className="ModalContent">

                    <Loading opacity={false} spinning={loadingShow} tip="加载中...">

                        <div className="grade-selected-wrapper">

                            <div className="props">范围:</div>

                            <Tips placement="top" title="请选择需要删除课程的年级" visible={this.state.GradeTips}>

                                <div className="grade-selected-container clearfix">

                                    {

                                        this.state.Grades.map((i,k)=>{

                                            const isChecked = this.state.checkedGrades.includes(i.id)?true:false;

                                            return <div key={k} className={`check-item ${isChecked?'active':''}`} onClick={this.gradeChecked.bind(this,i.id)}>{i.name}</div>


                                        })

                                    }

                                </div>

                            </Tips>

                        </div>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

  const { DelScheduleModal } = state.Manager;

  const { PeriodWeekTerm } =state;

  return{

      DelScheduleModal,

      PeriodWeekTerm

  }

};

export default connect(mapStateToProps)(DelScheduleModal);