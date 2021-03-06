import React, { Component } from "react";
import {
  Frame,
  Menu,
  Loading,
  Alert,
  LeftMenu,
  Modal,
  Radio as MyRadio,
  RadioGroup,
} from "../../../common";
import { connect } from "react-redux";
import CONFIG from "../../../common/js/config";
import student from "../../images/img-student.png";
import master from "../../images/img-master.png";
import teacher from "../../images/img-teacher.png";
import director from "../../images/img-director.png";
import Radio from "./Radio";
// import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { postData, getData } from "../../../common/js/fetch";
import actions from "../actions";
import "../../scss/PowerContent.scss";
import { async } from "q";

class PowerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      disabled: false,
      userMsg: props.DataState.LoginUser,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    if (DataState.GetUserPowerMsg.Power.student) {
      // // console.log(DataState.GetUserPowerMsg.Power.student[0].Status)
      this.setState({
        radioValue: DataState.GetUserPowerMsg.Power.student[0].Status,
      });
    }
  }
  onRadioChange = (value, id) => {
    // console.log(value, id)
    const { DataState, UIState, dispatch } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    let UserMsg = DataState.LoginUser;
    let url = "/SetGlobalUserPower";
    if (this.state.disabled === true) return;
    this.setState({
      disabled: true,
    });
    postData(
      CONFIG.PowerProxy + url,
      {
        PowerID: id,
        SchoolID: this.state.userMsg.SchoolID,
        Status:
          id === "Student_SginUp" || id === "Teacher_SginUp"
            ? value
              ? 2
              : 1
            : value
            ? 1
            : 0,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          this.setState({
            disabled: false,
          });
          if (json.Data === null) {
            // Power = this.handlePower(Power, value ? 1 : 0, id);
            Power = this.handlePower(
              Power,
              id === "Student_SginUp" || id === "Teacher_SginUp"
                ? value
                  ? 2
                  : 1
                : value
                ? 1
                : 0,
              id
            );

            dispatch(actions.UpDataState.setUserPowerMsg(Power));
          } else if (json.Data === -2) {
            // console.log('????????????')
          } else if (json.Data === -10) {
            // console.log('????????????????????????')
          }
        }
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  //
  onChangeRadio = (e, id) => {
    // console.log(e.target.value, this.state.radioValue)
    const { DataState, UIState, dispatch } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    let UserMsg = DataState.LoginUser;
    // let id = Power.student[0].PowerID;
    let url = "/SetGlobalUserPower";
    let value = e.target.value;
    if (this.state.disabled === true) return;
    this.setState({
      disabled: true,
    });
    postData(
      CONFIG.PowerProxy + url,
      {
        PowerID: id,
        SchoolID: UserMsg.SchoolID,
        Status: value,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          this.setState({
            disabled: false,
          });
          if (json.Data === null) {
            Power = this.handlePower(Power, value, id);
            dispatch(actions.UpDataState.setUserPowerMsg(Power));
          } else if (json.Data === -1) {
            // console.log('??????')
          } else if (json.Data === -2) {
            // console.log('????????????')
          } else if (json.Data === -10) {
            // console.log('????????????????????????')
          }
        }
      })
      .catch((err) => {
        // console.log(err)
      });
    // this.setState({
    //     radioValue: e.target.value
    // })
  };
  //????????????
  handlePower(power, value, id) {
    for (let key in power) {
      power[key] = power[key].map((child, index) => {
        if (child.PowerID === id) {
          child.Status = value;
        }
        return child;
      });
    }
    return power;
  }
  render() {
    const { DataState, UIState } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    let { ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {}; //?????????????????????????????????ProductType???2??????????????????
    // console.log(ProductType)
    // console.log(Power)
    return (
      <div id="powerContent" className="powerContent">
        <div className="power-box">
          <div className="power-top">
            <span className="top-tips">
              <span className="tips tip-menu">{"??????????????????"}</span>
            </span>
          </div>
          <div className="power-hr"></div>
          {Power.student ? (
            <div className="power-content">
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="student" src={student} />
                </div>
                <div className="right">
                  <div className="radio-box-1">
                    <div>
                      <Radio
                        value={Power.student[0].PowerID}
                        checked={Power.student[0].Status !== 1 ? true : false}
                        className="radio"
                        onChange={this.onRadioChange.bind(this)}
                      >
                        {/* {Power.student[0].PowerName}
                         */}
                        <span className="radio-tips-1">
                          {Power.student[0].PowerName}
                        </span>
                        <span className="radio-tips-2">
                          ({" "}
                          {
                            Power.student[0].Status === 1
                              ? "???????????????????????????" +
                                (ProductType !== 2 ? "????????????" : "") +
                                "?????????????????????????????????????????????????????????"
                              : "??????????????????????????????????????????????????????"
                            // "?????????????????????????????????????????????????????????"
                          }
                          )
                        </span>
                      </Radio>
                      {/* <div className="radio-box-2">
                        <RadioGroup
                          name="radioGroup"
                          value={Power.student[0].Status}
                          onChange={(e) =>
                            this.onChangeRadio(e, Power.student[0].PowerID)
                          }
                        >
                          <div className="radio-2">
                            <MyRadio
                              type
                              value={1}
                              disabled={
                                Power.student[0].Status === 0 ? true : false
                              }
                            ></MyRadio>
                            <span className="radio-tips-1">??????????????????</span>
                            <span className="radio-tips-2">
                              ????????????????????????????????????????????????????????????????????????????????????????????????
                            </span>
                          </div>
                          <div className="radio-2">
                            <MyRadio
                              type
                              value={2}
                              disabled={
                                Power.student[0].Status === 0 ? true : false
                              }
                            ></MyRadio>
                            <span className="radio-tips-1">??????????????????</span>
                            <span className="radio-tips-2">
                              ?????????????????????????????????????????????????????????
                            </span>
                          </div>
                        </RadioGroup>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="teacher" src={teacher} />
                </div>
                <div className="right">
                  <div>
                    <Radio
                      value={Power.teacher[0].PowerID}
                      checked={Power.teacher[0].Status !== 1 ? true : false}
                      className="radio"
                      onChange={this.onRadioChange.bind(this)}
                    >
                      {/* {Power.teacher[0].PowerName} */}
                      <span className="radio-tips-1">
                        {Power.teacher[0].PowerName}
                      </span>
                      <span className="radio-tips-2">
                        (
                        {
                          Power.teacher[0].Status === 1
                            ? "????????????????????????????????????????????????????????????????????????????????????"
                            : "??????????????????????????????????????????????????????"
                          // "?????????????????????????????????????????????????????????"
                        }
                        )
                      </span>
                    </Radio>
                    {/* <div className="radio-box-2">
                      <RadioGroup
                        name="radioGroup"
                        value={Power.teacher[0].Status}
                        onChange={(e) =>
                          this.onChangeRadio(e, Power.teacher[0].PowerID)
                        }
                      >
                        <div className="radio-2">
                          <MyRadio
                            type
                            value={1}
                            disabled={
                              Power.teacher[0].Status === 0 ? true : false
                            }
                          ></MyRadio>
                          <span className="radio-tips-1">??????????????????</span>
                          <span className="radio-tips-2">
                            ??????????????????/?????????????????????????????????????????????????????????
                          </span>
                        </div>
                        <div className="radio-2">
                          <MyRadio
                            type
                            value={2}
                            disabled={
                              Power.teacher[0].Status === 0 ? true : false
                            }
                          ></MyRadio>
                          <span className="radio-tips-1">??????????????????</span>
                          <span className="radio-tips-2">
                            ?????????????????????????????????????????????????????????
                          </span>
                        </div>
                      </RadioGroup>
                    </div> */}
                    {Power.teacher instanceof Array &&
                      Power.teacher.map((child, index) => {
                        if (index === 0) {
                          return "";
                        } else
                          return (
                            <Radio
                              key={child.PowerID}
                              value={child.PowerID}
                              checked={child.Status !== 0 ? true : false}
                              className="radio"
                              onChange={this.onRadioChange.bind(this)}
                            >
                              {/* {child.PowerName} */}
                              <span className="radio-tips-1">
                                {child.PowerName}
                              </span>
                              <span className="radio-tips-2">
                                {
                                  child.PowerID === "Teacher_CourseClass_CURD"
                                    ? "(?????????????????????????????????????????????)"
                                    : child.PowerID === "Teacher_Schedule_C"
                                    ? "(??????????????????????????????)"
                                    : child.PowerID === "Teacher_Schedule_U"
                                    ? "(????????????????????????)"
                                    : ""
                                  // "?????????????????????????????????????????????????????????"
                                }
                              </span>
                            </Radio>
                          );
                      })}
                    {/* <Radio
                      value={Power.teacher[1].PowerID}
                      checked={Power.teacher[1].Status !== 0 ? true : false}
                      className="radio"
                      onChange={this.onRadioChange.bind(this)}
                    >
                      {Power.teacher[1].PowerName}
                    </Radio>
                    <Radio
                      value={Power.teacher[2].PowerID}
                      checked={Power.teacher[2].Status !== 0 ? true : false}
                      className="radio"
                      onChange={this.onRadioChange.bind(this)}
                    >
                      {Power.teacher[2].PowerName}
                    </Radio> */}
                  </div>
                </div>
              </div>
              {
                // <div className="content-row clearfix">
                //   <div className="left">
                //     <img width={108} height={116} alt="master" src={master} />
                //   </div>
                //   <div className="right">
                //     <div>
                //       {Power.ganger instanceof Array &&
                //         Power.ganger.map((child, index) => {
                //           return (
                //             <Radio
                //               key={child.PowerID}
                //               value={child.PowerID}
                //               checked={child.Status !== 0 ? true : false}
                //               className="radio"
                //               onChange={this.onRadioChange.bind(this)}
                //             >
                //               {/* {child.PowerName} */}
                //               <span className="radio-tips-1">
                //                 {child.PowerName}
                //               </span>
                //               <span className="radio-tips-2">
                //                 {
                //                   child.PowerID === "Ganger_Student_CURD"
                //                     ? "(??????????????????????????????????????????????????????)"
                //                     : ""
                //                   // "?????????????????????????????????????????????????????????"
                //                 }
                //               </span>
                //             </Radio>
                //           );
                //         })}
                //     </div>
                //   </div>
                // </div>
              }
              {/* <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="director" src={director} />
                </div>
                <div className="right">
                  <div>
                    {Power.dean instanceof Array &&
                      Power.dean.map((child, index) => {
                        return (
                          <Radio
                            key={child.PowerID}
                            value={child.PowerID}
                            checked={child.Status !== 0 ? true : false}
                            className="radio"
                            onChange={this.onRadioChange.bind(this)}
                          >
                            {child.PowerName}
                          </Radio>
                        );
                      })}
                  </div>
                </div>
              </div> */}
              {ProductType !== 2 ? (
                <div className="content-row clearfix">
                  <div className="left">
                    <img
                      width={108}
                      height={116}
                      alt="director"
                      src={director}
                    />
                  </div>
                  <div className="right">
                    <div>
                      {Power.parents instanceof Array &&
                        Power.parents.map((child, index) => {
                          return (
                            <Radio
                              key={child.PowerID}
                              value={child.PowerID}
                              checked={child.Status !== 0 ? true : false}
                              className="radio"
                              onChange={this.onRadioChange.bind(this)}
                            >
                              <span className="radio-tips-1">
                                {child.PowerName}
                              </span>
                              <span className="radio-tips-2">
                                {
                                  child.PowerID === "Parents_Show"
                                    ? "(????????????????????????????????????)"
                                    : ""
                                  // "?????????????????????????????????????????????????????????"
                                }
                              </span>
                            </Radio>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(PowerContent);
