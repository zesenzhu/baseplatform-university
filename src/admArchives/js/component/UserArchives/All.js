import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
import echarts from "echarts";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;

class All extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      Chart_teacher: "",
      Chart_student: "",
      TeacherID: "all-teacher-content",
      StudentID: "all-student-conten",
    };
  }
  componentDidMount() {
    let {dispatch}=this.props
    let Chart_teacher = this.initEChart(this.state.TeacherID);
    let Chart_student = this.initEChart(this.state.StudentID);
    Chart_teacher.on("click", (params) =>{
      let {DataState:{
        MainData:{
          SummaryData:{StudentList,TeacherList}
        }
      }}=this.props
      let {dataIndex} = params;
      let id = TeacherList[dataIndex]?TeacherList[dataIndex].value:'';
      console.log(params,id);
      dispatch(PublicAction.TableLoadingOpen());

      history.push('/UserArchives/Teacher/'+id);

    });
    Chart_student.on("click",  (params)=> {
      let {DataState:{
        MainData:{
          SummaryData:{StudentList,TeacherList}
        }
      }}=this.props
      let {dataIndex} = params;
      let id = StudentList[dataIndex]?StudentList[dataIndex].value:'';
      console.log(params,StudentList,StudentList[dataIndex],id);
      dispatch(PublicAction.TableLoadingOpen());

      history.push('/UserArchives/Student/'+id)
      
    });
    this.setState({
      Chart_teacher,
      Chart_student,
    });
  }
  initEChart(id) {
    //??????Chart?????????DOM,??????react?????????????????????DOM,??????Echart????????????????????????????????????DOM???
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }

    // myChart.setOption(config)
    return myChart;
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
    this.StudentECharts();
    this.TeacherECharts()
  }
  // ????????????
  StudentECharts = () => {
    let {
      DataState: {
        MainData: {
          SummaryData: { StudentList, StudentAcount },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    let { Chart_student } = this.state;
    let data =  this.XData(StudentList)   
    let len =  data.length;
    let maxCount = 11
    // ????????????
    Chart_student.setOption({
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 0% ????????????
            offset: 0,
            color: "#42cfff",
          },
          {
            // 100% ????????????
            offset: 1,
            color: "#7c7cfc",
          },
        ],
        false
      ),
      dataZoom: {
        type: "slider",
        show: data.length>maxCount,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: ((maxCount-1) / (data.length-1  )) * 100,
        maxSpan: ((maxCount-1) / (data.length-1  )) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 20,
      },
      title: {},
      
      xAxis: {
        type: "category",
        data: data,
        //   data: ['?????????','?????????','?????????','?????????','?????????','?????????'],
        name: !IsCollege ? "??????" : "??????",
        nameTextStyle: {
          color: "#999",
          fontSize: "14",
        },
        axisPointer: {
          show: true
        },
        axisLabel: {
          // interval: 0,
          // rotate: this.Xrotate(StudentList),
          width: 30,
          formatter: (value) => {
            let data = value;
            let max = len>maxCount?4:maxCount-len+4
            if (typeof value === "string" && value.length > max) {
              data = value.slice(0, max) + "...";
            }
            return data;
          },
          textStyle: {
            color: "#333",
            fontSize: "14",
          },
        },
        axisTick: {
          inside: true,
        },
      },
      yAxis: {
        axisLine: {
          show: false, //??????y???
        },
        axisTick: {
          show: false, //??????y?????????
        },
        // max: function(value) {
        //     for(let i = 0;)
        //     return value.max + 20;
        // },
        boundaryGap: ["0", "10%"], //y????????????
        type: "value",
        name: "????????????(??????:??????)",
        nameTextStyle: {
          color: "#999",
          fontSize: "14",
          padding: [0, 0, 10, 70],
        },
        splitLine: {
          //???????????????
          lineStyle: {
            type: "dotted",
            // ????????????????????????
            color: ["#ccc"],
          },
        },
        axisLabel: {
          // interval: 0,

          textStyle: {
            color: "#333",
        fontSize: "14",
          },
        },
      },
      grid: {
        width: "90%",
        left: "5%",
      },
      series: [
        {
          data: StudentAcount,
          type: "bar",
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: { color: "#333", fontSize: "12" },
              // backgroundColor:'rgba(250,250,250,0.3)',
              // borderRadius:'4'
            },
            //   emphasis: {
            //     show: true,
            //     textStyle: {
            //       fontSize: "16",
            //     //   fontWeight: "bold"
            //     }
            //   }
          },
          // encode: {
          //   x: [1, 2],
          //   y: 0,
          //   // ???????????????2???????????????3??????????????? tooltip ??????
          //   tooltip: [2, 3]
          // },
          // // ??????????????????2???????????????3???????????????????????????????????????????????????????????? tooltip ??????
          // dimensions: [null, null, "??????", "?????????"],
          formatter: function (params) {
            // console.log(params)
          },
        },
      ],
      barMinHeight: 0, // ??????????????????0
      // barMaxWidth: '',
      // barWidth: null,        // ???????????????
      barGap: "30%", // ???????????????????????????????????????30%??????????????????
      barCategoryGap: this.BarWidth(StudentList), // ????????????????????????????????????????????????20%??????????????????
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0], // ???????????????????????????px????????????0
        //   normal: {
        //     // color: '??????',

        //     barBorderColor: "#7c7cfc", // ????????????
        //     barBorderRadius: 5, // ???????????????????????????px????????????0
        //     barBorderWidth: 1, // ???????????????????????????px????????????1
        //     label: {
        //       show: false
        //       // position: ?????????????????????????????????'top'??????????????????'right'????????????
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // ???????????????????????????????????????TEXTSTYLE
        //     }
        //   },
        //   emphasis: {
        //     // color: '??????',
        //     barBorderColor: "rgba(0,0,0,0)", // ????????????
        //     barBorderRadius: 5, // ???????????????????????????px????????????0
        //     barBorderWidth: 1, // ???????????????????????????px????????????1
        //     label: {
        //       show: false
        //       // position: ?????????????????????????????????'top'??????????????????'right'????????????
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // ???????????????????????????????????????TEXTSTYLE
        //     }
        //   }
      },
    });
  };
  // ????????????
  TeacherECharts = () => {
    let {
      DataState: {
        MainData: {
          SummaryData: { TeacherList, TeacherAcount },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    let { Chart_teacher } = this.state;
    let data =  this.XData(TeacherList)   
    let len =  data.length;
    let maxCount = 11
    // ????????????
    Chart_teacher.setOption({
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 0% ????????????
            offset: 0,
            color: "#fb3737",
          },
          {
            // 100% ????????????
            offset: 1,
            color: "#ffa800",
          },
        ],
        false
      ),
      title: {},
      dataZoom: {
        type: "slider",
        show: data.length>maxCount,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: ((maxCount-1) / (data.length-1  )) * 100,
        maxSpan: ((maxCount-1) / (data.length-1  )) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 20,
      },
      xAxis: {
        type: "category",
        data: data,
        name: !IsCollege ? "??????" : "?????????",
        nameTextStyle: {
          color: "#999",
          fontSize: "14",
        },
        axisTick: {
          inside: true,
        }, axisPointer: {
          show: true
        },
        axisLabel: {
          // interval: 0,
          // rotate: this.Xrotate(TeacherList),
          width: 30,
          formatter: (value) => {
            let data = value;
            let max = len>maxCount?4:maxCount-len+4
            if (typeof value === "string" && value.length > max) {
              data = value.slice(0, max) + "...";
            }
            return data;
          },
          rich: {},
          textStyle: {
            color: "#333",
            fontSize: "14",
          },
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        boundaryGap: ["0", "10%"],
        type: "value",
        name: "????????????(??????:??????)",
        nameTextStyle: {
          color: "#999",
          fontSize: "14",
          padding: [0, 0, 10, 70], //??????name??????
        },
        axisLabel: {
          // interval: 0,

          textStyle: {
            color: "#333",
        fontSize: "14",
          },
        },
        color: "#999",
        fontSize: "12",
        splitLine: {
          lineStyle: {
            type: "dotted",
            // ????????????????????????
            color: ["#ccc"],
          },
        },
        //   axisTick:{
        //     lineStyle:{type:'dotted'}
        //   } ,
      },
      grid: {
        width: "90%", //????????????
        left: "5%", //?????????????????????
      },
      series: [
        {
          data: TeacherAcount,

          type: "bar",
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: { color: "#333", fontSize: "12" },
            },
          },
        },
      ],
      barMinHeight: 0, // ??????????????????0
      // barWidth: null,        // ???????????????
      barGap: "30%", // ???????????????????????????????????????30%??????????????????
      barCategoryGap: this.BarWidth(TeacherList), // ????????????????????????????????????????????????20%??????????????????
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0], // ???????????????????????????px????????????0

        //   normal: {
        //     // color: '??????',

        //     barBorderColor: "#ffa800", // ????????????
        //     barBorderRadius: 5, // ???????????????????????????px????????????0
        //     barBorderWidth: 1, // ???????????????????????????px????????????1
        //     label: {
        //       show: false
        //       // position: ?????????????????????????????????'top'??????????????????'right'????????????
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // ???????????????????????????????????????TEXTSTYLE
        //     }
        //   },
        //   emphasis: {
        //     // color: '??????',
        //     barBorderColor: "rgba(0,0,0,0)", // ????????????
        //     barBorderRadius: 5, // ???????????????????????????px????????????0
        //     barBorderWidth: 1, // ???????????????????????????px????????????1
        //     label: {
        //       show: false
        //       // position: ?????????????????????????????????'top'??????????????????'right'????????????
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // ???????????????????????????????????????TEXTSTYLE
        //     }
        //   }
      },
    });
  };
  // x????????????
  Xrotate = (data) => {
    // console.log(data)
    if (!(data instanceof Array)) {
      return 25;
    }
    let len = data.length;
    if (len <= 6) {
      return 0;
    } else {
      return 25;
    }
  };
  // X??????????????????
  XData = (data) => {
    // console.log(data)
    if (!(data instanceof Array)) {
      return data;
    }
    return data.map((child) => {
      // let dots = "";
      // if (child.title.length >= 6) {
      //   dots = "...";
      // }
      let value = child.title
      // .split("").splice(0, 5).join("") + dots;
      let textStyle = {};
      return { value, textStyle };
    });
  };
  // ????????? ??????
  BarWidth = (data) => {
    if (!(data instanceof Array)) {
      return "50%";
    }
    let len = data.length;
    if (len <= 3) {
      return "80%";
    } else if (len <= 6) {
      return "65%";
    } else return "50%";
  };
  render() {
    const {
      DataState: {
        MainData: {
          SummaryData: {
            Total,
            Student,
            Teacher,
            Leader,
            StudentList,
            TeacherList,
          },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege,NoLeader },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    return (
      <div id="All" className="Content">
        <div className="All-box All-user">
          <p className="All-tips">
            <span
              className="tips "
              style={{
                paddingLeft: 0,
                fontSize: "14px",
                fontWeight: "blod",
                color: "#999",
              }}
            >
              ???????????????:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Total}
              </span>
              ?????????????????????:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Student}
              </span>
              ???????????????:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Teacher}
              </span>
              {!LockerVersion_1&&!NoLeader ? (
                <>
                  ???????????????:
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "blod",
                      color: "#ff6600",
                    }}
                  >
                    {Leader}
                  </span>
                </>
              ) : (
                ""
              )}
            </span>
          </p>
        </div>
        <div className="All-box All-student">
          <p className="All-tips">
            <span className="tips menu10 ">
              {!IsCollege ? "???????????????????????????" : "???????????????????????????"}
            </span>
          </p>
          <div className="All-hr"></div>
          <div
            id={this.state.StudentID}
            className="All-content student-content"
          ></div>
        </div>
        <div className="All-box All-teacher">
          <p className="All-tips">
            <span className="tips menu10 ">
              {!IsCollege ? "???????????????????????????" : "??????????????????????????????"}
            </span>
          </p>
          <div className="All-hr"></div>
          <div
            id={this.state.TeacherID}
            className="All-content teacher-content"
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(All);
