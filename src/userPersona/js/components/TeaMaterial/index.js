import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty, DropDown } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";
import echarts from "echarts";
const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class TeaMaterial extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      firstTime: true, //是否第一次，进行接口请求控制
      firstShow: false, //第一个模块
      secondShow: false, //是第二个模块
      thirdShow: false, //第三个模块
      forthShow: false, //第四个模块
      fifthShow: false, //第五个模块
      sixthShow: false, //第六个模块
      firstAllScore: 0,
      firstSubjectScore: 0,
      secondAllScore: 0,
      secondSubjectScore: 0,
      thirdAllScore: 0,
      thirdSubjectScore: 0,
      forthAllScore: 0,
      forthSubjectScore: 0,
      fifthAllScore: 0,
      fifthSubjectScore: 0,
      sixthAllScore: 0,
      sixthSubjectScore: 0,
      secondSubjectID: "",
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    let {
      firstTime,
      firstShow,
      secondShow,
      thirdShow,
      forthShow,
      fifthShow,
      sixthShow,
    } = this.state;
    let {
      dispatch,
      MoreData: {
        CommonData: {
          TeaMaterialParams: { StartTime, EndTime },
        },
        MainData: {
          TermAndPeriod: { NowWeekSelect, WeekList, ItemWeek },
        },
      },
      systemUrl: { Urls },
      loginUser: { SchoolID, SubjectIDs },
      targetUser: { UserID, UserType },
      termInfo: { Term },
      userArchives: { ShortName, ClassID, GradeID, UserName },
    } = nextProps;
    // let {}
    let that = this;
    let token = sessionStorage.getItem("token");
    if (firstTime && UserID && UserType && SchoolID) {
      //获取周信息
      this.setState({
        firstTime: false,
      });
      dispatch(
        MainActions.GetTermAndPeriodAndWeekNOInfo({
          func: (State) => {
            let {
              MoreData: {
                MainData: {
                  TermAndPeriod: { NowWeekSelect },
                },
              },
            } = State;
            // dispatch(
            //   CommonActions.SetTeaMaterialParams({
            //     SelectWeek: NowWeekSelect,
            //   })
            // );
            this.onSemesterChange(NowWeekSelect);
          },
        })
      );
    }

    // 电子资源
    if (!firstShow && token && StartTime && EndTime && Urls["C10"].WebUrl) {
      this.setState({
        firstShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          FirstProxy: Urls["C10"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: StartTime,
          EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherResView({
          func: this.ResVeiwChart,
        })
      );
      // this.ESPMaterialChart();
      // this.AITeachPlanChart()
    }
    // 教案
    if (!secondShow && token && StartTime && EndTime && Urls["310"].WebUrl) {
      this.setState({
        secondShow: true,
        secondSubjectID: SubjectIDs.split(",")[0],
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          SecondProxy: Urls["310"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: StartTime,
          EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeachPlanStatistics({
          func: this.TeachPlanChart,
        })
      );
    }
    // 课程精品
    if (!thirdShow && token && StartTime && EndTime && Urls["D21"].WsUrl) {
      this.setState({
        thirdShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          ThirdProxy: Urls["D21"].WsUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: StartTime,
          EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherpercentage({
          func: this.TeachPercentChart,
        })
      );
    }
    // 电子资源
    if (!forthShow && token && StartTime && EndTime && Urls["930"].WsUrl) {
      // return;
      this.setState({
        forthShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          ForthProxy: Urls["930"].WsUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: StartTime,
          EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherETextBook({
          func: this.ETextBookChart,
        })
      );
    }
    // 教学方案
    if (!fifthShow && token && StartTime && EndTime && Urls["S14"].WsUrl) {
      // return;
      this.setState({
        fifthShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          FifthProxy: Urls["S14"].WsUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: StartTime,
          EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherAITeachPlan({
          func: this.AITeachPlanChart,
        })
      );
    }
    // ESP
    if (
      !sixthShow &&
      token &&
      // && StartTime && EndTime
      Urls["930"].WsUrl
    ) {
      // return;
      this.setState({
        sixthShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          SixthProxy: Urls["930"].WsUrl,
          // Urls["810"].WsUrl,
          Token: token,
          // StartTime: StartTime,
          // EndTime: EndTime,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherESPMaterial({
          func: this.ESPMaterialChart,
        })
      );
    }
    // // 测试
    // this.ResVeiwChart(this.props);
    // this.TeachPlanChart(this.props);
    // this.TeachPercentChart(this.props);
  }

  onSemesterChange = (value) => {
    let {
      dispatch,
      MoreData: {
        CommonData: {
          TeaWorkParams: { Semester, Proxy },
        },
        MainData: {
          TermAndPeriod: { NowWeekSelect, WeekList, ItemWeek },
        },
      },
    } = this.props;
    let {
      firstTime,
      firstShow,
      secondShow,
      thirdShow,
      forthShow,
      fifthShow,
      sixthShow,
    } = this.state;

    let selectWeek = ItemWeek.find((child) => {
      return child.WeekNO === NowWeekSelect.value;
    });
    let StartTime = "";
    let EndTime = "";
    if (selectWeek) {
      //存在当前周
      StartTime = selectWeek.StartDate;
      EndTime = selectWeek.EndDate;
    }
    dispatch(
      CommonActions.SetTeaMaterialParams({
        SelectWeek: value,
        StartTime: StartTime,
        EndTime: EndTime,
      })
    );
    if (firstShow) {
      dispatch(
        MainActions.GetTeacherResView({
          func: this.ResVeiwChart,
        })
      );
    }
    if (secondShow) {
      dispatch(
        MainActions.GetTeachPlanStatistics({
          func: this.TeachPlanChart,
        })
      );
    }
    if (thirdShow) {
      dispatch(
        MainActions.GetTeacherpercentage({
          func: this.TeachPercentChart,
        })
      );
    }
    if (forthShow) {
      dispatch(
        MainActions.GetTeacherETextBook({
          func: this.ETextBookChart,
        })
      );
    }
    if (fifthShow) {
      dispatch(
        MainActions.GetTeacherAITeachPlan({
          func: this.AITeachPlanChart,
        })
      );
    }
    if (sixthShow) {
      dispatch(
        MainActions.GetTeacherESPMaterial({
          func: this.ESPMaterialChart,
        })
      );
    }
  };
  //
  ResVeiwChart = () => {
    let {
      MoreData: {
        MainData: {
          TeacherResView: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;
    clearTimeout(that.ResVeiwTimeout);
    clearInterval(that.ResVeiwInterval);
    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});
    if (document.getElementById("ResView")) {
      let mychart = echarts.init(document.getElementById("ResView"), null, {
        renderer: "svg",
      });
      mychart.resize();
      that.setState({
        firstAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          that.ResVeiwTimeout = setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectID: child.SubjectID,

              SubjectScale: child.SubjectScale,
            };
            that.setState({
              firstSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart, "first");
            that.ResVeiwInterval = setInterval(() => {
              that.setState({
                firstSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart, "first");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     console.log(params)
      //  });
    }
  };
  //
  TeachPlanChart = () => {
    let {
      MoreData: {
        MainData: {
          TeachPlan: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
      systemUrl: { Urls },
    } = this.props;
    let that = this;
    clearTimeout(that.TeachPlanTimeout);
    clearInterval(that.TeachPlanInterval);
    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});
    if (document.getElementById("TeachPlan")) {
      let mychart = echarts.init(document.getElementById("TeachPlan"), null, {
        renderer: "svg",
      });
      mychart.resize();
      that.setState({
        secondAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          that.TeachPlanTimeout = setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              SubjectID: child.SubjectID,
              UploadAllScale,
              SubjectScale: child.SubjectScale,
            };
            that.setState({
              secondSubjectID: child.SubjectID,

              secondSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart, "second");
            that.TeachPlanInterval = setInterval(() => {
              that.setState({
                secondSubjectID: child.SubjectID,
                secondSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart, "second");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     let {seriesName,seriesId} = params;
      //     let token = sessionStorage.getItem('token')
      //     if(seriesName!=='同学科'&&Urls['300']&&Urls['300'].WebUrl){
      //       window.open(Urls['300'].WebUrl+'html/TeachingPlan/?subjectid='+seriesId+'&lg_tk='+token+"&lg_ic="+IdentityCode)
      //     }
      //     console.log(params)
      //  });
    }
  };
  //精品课程
  TeachPercentChart = () => {
    let {
      MoreData: {
        MainData: {
          TeachPercent: {
            uploadAllScale: UploadAllScale, //上传数量领先全校比值
            uploadSubjectScale: UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;
    clearTimeout(that.TeachPercentTimeout);
    clearInterval(that.TeachPercentInterval);
    let SubjectScale = 0;
    UploadAllScale = this.SetNaNToNumber(UploadAllScale);
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});

    if (document.getElementById("TeachPercent")) {
      let mychart = echarts.init(
        document.getElementById("TeachPercent"),
        null,
        {
          renderer: "svg",
        }
      );
      mychart.resize();
      that.setState({
        thirdAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;

        UploadSubjectScale.map((child, index) => {
          that.TeachPercentTimeout = setTimeout(() => {
            let subjectScale = this.SetNaNToNumber(child.subjectScale);

            let data = {
              SubjectName: child.subjectName,
              UploadAllScale,
              SubjectID: child.subjectID,
              SubjectScale: subjectScale,
            };
            that.setState({
              thirdSubjectScore: subjectScale,
            });
            that.SetEChart(data, mychart, "third");
            that.TeachPercentInterval = setInterval(() => {
              that.setState({
                thirdSubjectScore: subjectScale,
              });
              that.SetEChart(data, mychart, "third");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     console.log(params)
      //  });
    }
  };

  //电子教材
  ETextBookChart = () => {
    let {
      MoreData: {
        MainData: {
          ETextBook: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;
    clearTimeout(that.ETextBookTimeout);
    clearInterval(that.ETextBookInterval);
    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;

    if (document.getElementById("ETextBook")) {
      let mychart = echarts.init(document.getElementById("ETextBook"), null, {
        renderer: "svg",
      });
      mychart.resize();
      that.setState({
        forthAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          that.ETextBookTimeout = setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectID: child.SubjectID,

              SubjectScale: child.SubjectScale,
            };
            that.setState({
              forthSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart, "forth");
            that.ETextBookInterval = setInterval(() => {
              that.setState({
                forthSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart, "forth");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          // SubjectName: "同学科",
          // haveSub: false,
          UploadAllScale,
          // SubjectScale: 0,
        };
        that.SetEChart(data, mychart, "forth");
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     console.log(params)
      //  });
    }
  };

  //AI的教学方案
  AITeachPlanChart = () => {
    let {
      MoreData: {
        MainData: {
          AITeachPlan: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;
    clearTimeout(that.AITeachPlanTimeout);
    clearInterval(that.AITeachPlanInterval);
    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;

    if (document.getElementById("AITeachPlan")) {
      let mychart = echarts.init(document.getElementById("AITeachPlan"), null, {
        renderer: "svg",
      });
      mychart.resize();
      that.setState({
        fifthAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          that.AITeachPlanTimeout = setTimeout(() => {
            let data = {
              SubjectName: "同学科",
              // child.SubjectName,
              UploadAllScale,
              SubjectID: child.SubjectID,

              SubjectScale: child.SubjectScale,
            };
            that.setState({
              fifthSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart, "fifth");
            that.AITeachPlanInterval = setInterval(() => {
              that.setState({
                fifthSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart, "fifth");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          haveSub: false,
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart, "fifth");
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     console.log(params)
      //  });
    }
  };
  //ESP素材
  ESPMaterialChart = () => {
    let {
      MoreData: {
        MainData: {
          ESPMaterial: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;
    clearTimeout(that.ESPMaterialTimeout);
    clearInterval(that.ESPMaterialInterval);
    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;

    if (document.getElementById("ESPMaterial")) {
      let mychart = echarts.init(document.getElementById("ESPMaterial"), null, {
        renderer: "svg",
      });
      mychart.resize();
      that.setState({
        sixthAllScore: UploadAllScale,
      });
      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          that.ESPMaterialTimeout = setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectID: child.SubjectID,

              SubjectScale: child.SubjectScale,
            };
            that.setState({
              sixthSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart, "sixth");
            that.ESPMaterialInterval = setInterval(() => {
              that.setState({
                sixthSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart, "sixth");
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          // SubjectName: "同学科",
          // haveSub: false,
          UploadAllScale,
          // SubjectScale: 0,
        };
        that.SetEChart(data, mychart, "sixth");
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
      //   mychart.on("click", function(params) {
      //     console.log(params)
      //  });
    }
  };
  SetNaNToNumber = (data) => {
    return isNaN(Number(data)) ? 0 : Number(data);
  };
  // 设置echart
  SetEChart = (data, mychart, type) => {
    let {
      MoreData: {
        MainData: { TeacherResView, TeachPlan, TeachPercent },
      },
      systemUrl: { Urls },
      targetUser: { UserID },
      loginUser,
    } = this.props;
    let {
      SubjectName,
      UploadAllScale,
      SubjectID,
      SubjectScale,
      haveSub,
    } = data;
    if (haveSub === undefined) {
      haveSub = true;
    }
    // SubjectName = (SubjectName+Math.round(Math.random()*10))
    let option = {
      name: type,
      legend: {
        orient: "vertical",
        left: "center",
        top: "center",
        data: haveSub ? ["全校教师", SubjectName] : ["全校教师"],
        itemWidth: 12,
        itemHeight: 12,
        selectedMode: false,
        textStyle: {
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
      },
      color: ["#ff6f61", "#8099ff"],
      angleAxis: {
        max: 100, // 满分
        clockwise: false, // 逆时针
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      radiusAxis: {
        type: "category",
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        z: 10,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          interval: 0,
        },
        splitLine: {
          show: true,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "163%", //图形大小
      },
      series: [
        {
          type: "bar",
          name: SubjectName,
          // id:SubjectID,
          data: [
            {
              value: `${SubjectScale <= 0 ? 0.1 : SubjectScale * 100}`,
              itemStyle: {
                normal: {
                  color: "#ff6f61",
                },
              },
            },
          ],
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
          barGap: 0.8,
        },
        {
          type: "bar",
          name: "全校教师",
          id: "all",
          data: [
            {
              value: `${UploadAllScale <= 0 ? 0.1 : UploadAllScale * 100}`,
              itemStyle: {
                color: "#8099ff",
              },
            },
          ],
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
        },
      ],
    };
    mychart.setOption(option);
    mychart.off("click");
    mychart.on("click", (params) => this.ClickBar(params, type, SubjectID));
  };
  // 点击事件
  ClickBar = (params, type, SubjectID) => {
    let {
      MoreData: {
        MainData: {
          TeacherResView,
          TeachPlan,
          TeachPercent,
          ETextBook,
          AITeachPlan,
          ESPMaterial,
        },
      },
      systemUrl: { Urls },
      targetUser: { UserID },
      loginUser,
      identifyInfo,
    } = this.props;
    let IdentityCode =
      identifyInfo instanceof Array && identifyInfo[0]
        ? identifyInfo[0].IdentityCode
        : "";
    if (loginUser.UserID !== UserID) {
      //如果不是本人，就退出
      return;
    }
    let TeachingResourceUrl = "/Manage/Personal.aspx";
    let TeachingSchemaUrl = "html/TeachingPlan/";
    let TeachingCourseUrl = "#/record/course";
    let { seriesName } = params;
    let token = sessionStorage.getItem("token");
    if (
      seriesName !== "同学科" &&
      Urls["C10"] &&
      Urls["C10"].WebUrl &&
      type === "first"
    ) {
      window.open(
        Urls["C10"].WebUrl + "/Manage/Personal.aspx?lg_ic=" + IdentityCode
      );
    } else if (
      seriesName !== "同学科" &&
      Urls["300"] &&
      Urls["300"].WebUrl &&
      type === "second" &&
      SubjectID
    ) {
      window.open(
        Urls["300"].WebUrl +
          "html/TeachingPlan/?subjectid=" +
          SubjectID +
          "&lg_tk=" +
          token +
          "&lg_ic=" +
          IdentityCode
      );
    } else if (
      seriesName !== "同学科" &&
      Urls["D21"] &&
      Urls["D21"].WebUrl &&
      type === "third"
    ) {
      window.open(
        Urls["D21"].WebUrl +
          "#/record/course?lg_tk=" +
          token +
          "&lg_ic=" +
          IdentityCode
      );
    } else if (
      seriesName !== "同学科" &&
      Urls["930"] &&
      Urls["930"].WsUrl &&
      type === "forth" &&
      ETextBook.Url
    ) {
      window.open(ETextBook.Url);
    } else if (
      // seriesName !== "同学科" &&
      Urls["S14"] &&
      Urls["S14"].WebUrl &&
      type === "fifth" &&
      AITeachPlan.Url
    ) {
      window.open(AITeachPlan.Url);
    } else if (
      seriesName !== "同学科" &&
      Urls["930"] &&
      Urls["930"].WsUrl &&
      type === "sixth" &&
      ESPMaterial.Url
    ) {
      window.open(ESPMaterial.Url);
    }
    // console.log(params, SubjectID, type);
  };
  render() {
    let {
      MoreData: {
        CommonData: {
          TeaMaterialParams: { SemesterC, Semester, SelectWeek },
        },
        MainData: {
          TeaWorkData: { data },
          AllTerm,
          TeacherResView,
          TeachPlan,
          TeachPercent,
          TermAndPeriod: { WeekList, WeekNO },
          ETextBook,
          ESPMaterial,
          AITeachPlan,
        },
      },
      targetUser: { UserID },
      loginUser,
    } = this.props;
    let {
      firstShow,
      secondShow,
      thirdShow,
      firstAllScore,
      firstSubjectScore,
      secondAllScore,
      secondSubjectScore,
      thirdAllScore,
      thirdSubjectScore,
      secondSubjectID,
      forthShow, //第四个模块
      fifthShow, //第五个模块
      sixthShow, //第六个模块

      forthAllScore,
      forthSubjectScore,
      fifthAllScore,
      fifthSubjectScore,
      sixthAllScore,
      sixthSubjectScore,
    } = this.state;

    return (
      <ContentItem type="material" tabName={"教学资料统计"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={
            false
            // !firstShow && !secondShow && !thirdShow
          }
        >
          <div className="TeaMaterial">
            <div className="SR-top">
              {WeekList instanceof Array && WeekList.length > 0 ? (
                <DropDown
                  ref="Semester"
                  width={120}
                  height={120}
                  style={{ zIndex: 10 }}
                  onChange={this.onSemesterChange}
                  dropList={WeekList}
                  dropSelectd={SelectWeek}
                ></DropDown>
              ) : (
                ""
              )}
            </div>
            <div className="SQ-box">
              {firstShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        TeacherResView.UploadCount ||
                        TeacherResView.UploadCount === 0
                          ? TeacherResView.UploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (TeacherResView.UploadCount ||
                            TeacherResView.UploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        TeacherResView.UploadCount ||
                        TeacherResView.UploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "first",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {TeacherResView.UploadCount ||
                      TeacherResView.UploadCount === 0
                        ? TeacherResView.UploadCount
                        : "--"}
                    </p>
                    <p className="name">上传电子资源</p>
                    <p className="UseCount">
                      浏览:
                      <span title={TeacherResView.BrowseCount}>
                        {TeacherResView.BrowseCount}
                      </span>
                    </p>
                  </div>
                  <div className="TWc-right">
                    <div className="chartsbox" id="ResView"></div>
                    <p className="AllScore">
                      领先
                      {firstAllScore > 0
                        ? (firstAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    <p className="SubjectScore">
                      领先
                      {firstSubjectScore > 0
                        ? (firstSubjectScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {secondShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        TeachPlan.UploadCount || TeachPlan.UploadCount === 0
                          ? TeachPlan.UploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (TeachPlan.UploadCount ||
                            TeachPlan.UploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        TeachPlan.UploadCount || TeachPlan.UploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "second",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {TeachPlan.UploadCount || TeachPlan.UploadCount === 0
                        ? TeachPlan.UploadCount
                        : "--"}
                    </p>
                    <p className="name">制作教学方案</p>
                    <p className="UseCount">
                      应用数:
                      <span title={TeachPlan.UseCount}>
                        {TeachPlan.UseCount}次
                      </span>
                    </p>
                  </div>
                  <div className="TWc-right">
                    <div className="chartsbox" id="TeachPlan"></div>
                    <p className="AllScore">
                      领先
                      {secondAllScore > 0
                        ? (secondAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    <p className="SubjectScore">
                      领先
                      {secondSubjectScore > 0
                        ? (secondSubjectScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {thirdShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        TeachPercent.uploadCount ||
                        TeachPercent.uploadCount === 0
                          ? TeachPercent.uploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (TeachPercent.uploadCount ||
                            TeachPercent.uploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        TeachPercent.uploadCount ||
                        TeachPercent.uploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "third",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {TeachPercent.uploadCount ||
                      TeachPercent.uploadCount === 0
                        ? TeachPercent.uploadCount
                        : "--"}
                    </p>
                    <p className="name">录制精品课程</p>
                    <p className="UseCount">
                      浏览:
                      <span title={TeachPercent.browseCount}>
                        {TeachPercent.browseCount}
                      </span>
                    </p>
                  </div>
                  <div className="TWc-right">
                    <div className="chartsbox" id="TeachPercent"></div>
                    <p className="AllScore">
                      领先
                      {thirdAllScore > 0
                        ? (thirdAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    <p className="SubjectScore">
                      领先
                      {thirdSubjectScore > 0
                        ? (thirdSubjectScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {forthShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        ETextBook.UploadCount || ETextBook.UploadCount === 0
                          ? ETextBook.UploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (ETextBook.UploadCount ||
                            ETextBook.UploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        ETextBook.UploadCount || ETextBook.UploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "forth",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {ETextBook.UploadCount || ETextBook.UploadCount === 0
                        ? ETextBook.UploadCount
                        : "--"}
                    </p>
                    <p className="name">上传电子教材</p>
                    {ETextBook.BrowseCount || ETextBook.BrowseCount === 0 ? (
                      <p className="UseCount">
                        浏览:
                        <span title={ETextBook.BrowseCount}>
                          {ETextBook.BrowseCount}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="TWc-right">
                    <div
                      className={`chartsbox ${
                        ETextBook.UploadSubjectScale instanceof Array &&
                        ETextBook.UploadSubjectScale.length
                          ? ""
                          : "chartsbox-2"
                      }`}
                      id="ETextBook"
                    ></div>
                    <p className="AllScore">
                      领先
                      {forthAllScore > 0
                        ? (forthAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    {ETextBook.UploadSubjectScale instanceof Array &&
                    ETextBook.UploadSubjectScale.length ? (
                      <p className="SubjectScore">
                        领先
                        {forthSubjectScore > 0
                          ? (forthSubjectScore * 100).toFixed(1)
                          : "0.0"}
                        %
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {fifthShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        AITeachPlan.UploadCount || AITeachPlan.UploadCount === 0
                          ? AITeachPlan.UploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (AITeachPlan.UploadCount ||
                            AITeachPlan.UploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        AITeachPlan.UploadCount || AITeachPlan.UploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "fifth",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {AITeachPlan.UploadCount || AITeachPlan.UploadCount === 0
                        ? AITeachPlan.UploadCount
                        : "--"}
                    </p>
                    <p className="name">制作教学方案</p>
                    {AITeachPlan.BrowseCount ||
                    AITeachPlan.BrowseCount === 0 ? (
                      <p className="UseCount">
                        应用数:
                        <span title={AITeachPlan.BrowseCount}>
                          {AITeachPlan.BrowseCount}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="TWc-right">
                    <div
                      className={`chartsbox ${
                        AITeachPlan.UploadSubjectScale instanceof Array &&
                        AITeachPlan.UploadSubjectScale.length
                          ? ""
                          : "chartsbox-2"
                      }`}
                      id="AITeachPlan"
                    ></div>
                    <p className="AllScore">
                      领先
                      {fifthAllScore > 0
                        ? (fifthAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    {AITeachPlan.UploadSubjectScale instanceof Array &&
                    AITeachPlan.UploadSubjectScale.length ? (
                      <p className="SubjectScore">
                        领先
                        {fifthSubjectScore > 0
                          ? (fifthSubjectScore * 100).toFixed(1)
                          : "0.0"}
                        %
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {sixthShow ? (
                <div className="TW-content">
                  <div className="TWc-left">
                    <p
                      title={
                        ESPMaterial.UploadCount || ESPMaterial.UploadCount === 0
                          ? ESPMaterial.UploadCount
                          : ""
                      }
                      className="count"
                      style={{
                        cursor:
                          (ESPMaterial.UploadCount ||
                            ESPMaterial.UploadCount === 0) &&
                          loginUser.UserID === UserID
                            ? "pointer"
                            : "auto",
                      }}
                      onClick={
                        ESPMaterial.UploadCount || ESPMaterial.UploadCount === 0
                          ? this.ClickBar.bind(
                              this,
                              {},
                              "sixth",
                              secondSubjectID
                            )
                          : () => {}
                      }
                    >
                      {ESPMaterial.UploadCount || ESPMaterial.UploadCount === 0
                        ? ESPMaterial.UploadCount
                        : "--"}
                    </p>
                    <p className="name">ESP素材建设</p>
                    {ESPMaterial.BrowseCount ||
                    ESPMaterial.BrowseCount === 0 ? (
                      <p className="UseCount">
                        浏览:
                        <span title={ESPMaterial.BrowseCount}>
                          {ESPMaterial.BrowseCount}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="TWc-right">
                    <div
                      className={`chartsbox ${
                        ESPMaterial.UploadSubjectScale instanceof Array &&
                        ESPMaterial.UploadSubjectScale.length
                          ? ""
                          : "chartsbox-2"
                      }`}
                      id="ESPMaterial"
                    ></div>
                    <p className="AllScore">
                      领先
                      {sixthAllScore > 0
                        ? (sixthAllScore * 100).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                    {ESPMaterial.UploadSubjectScale instanceof Array &&
                    ESPMaterial.UploadSubjectScale.length ? (
                      <p className="SubjectScore">
                        领先
                        {sixthSubjectScore > 0
                          ? (sixthSubjectScore * 100).toFixed(1)
                          : "0.0"}
                        %
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Loading>
      </ContentItem>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(TeaMaterial);
