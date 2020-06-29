import React, { Component } from "react";
import "../../../sass/MainAccessCard.scss";
import { Button } from "../../../../common";
class MainAccessCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAccessDetailClick(){

      const { data,onAccessDetailClick } = this.props;



      onAccessDetailClick(data.ApplicationID);


  }
  onEditOpenClick(e){

    const { data,onEditOpenClick } = this.props;



    onEditOpenClick(e,data);


}
onEditDetailClick(){

  const { data,onEditDetailClick } = this.props;



  onEditDetailClick(data.ApplicationID);


}
onDeleteAccessClick(){

  const { data,onDeleteAccessClick } = this.props;



  onDeleteAccessClick(data.ApplicationID);


}
  render() {
    let {
      className,
      data,
      onEditOpenClick,
      onAccessDetailClick,
      onDeleteAccessClick,
      onEditDetailClick,
    } = this.props;
    return (
      <div className={`MainAccessCard ${className}`}>
        <div className="grey-bg"></div>
        <div className="subsystem-content">
          <div className="content-msg-box">
            <div className="pic-bg">
              {" "}
              <img
                src={data.ApplicationImgUrl}
                alt="图片丢失"
                title={data.ApplicationName}
              />
            </div>
            <div className="msg-tilte-box">
              <p title={data.ApplicationName} className="msg-app-name">
                {data.ApplicationName}
              </p>
              <span
                title={data.ApplicationTypeName}
                className="msg-app-type ApplicationType"
              >
                {data.ApplicationTypeName}
              </span>
              <span
                title={data.IsThirdPartyName}
                className="msg-app-type IsThirdParty"
              >
                {data.IsThirdPartyName}
              </span>
            </div>
          </div>
          <div className="content-center-msg-box">
            <div className="clearfix row">
              <span className="row-left">用户对象：</span>
              <span title={data.UserTypeName} className="row-right">
                {data.UserTypeName?data.UserTypeName:'--'}
              </span>
            </div>
            <div className="clearfix row">
              <span className="row-left">支持设备：</span>
              <span title={data.DeviceTypesName} className="row-right">
                {data.DeviceTypesName ? data.DeviceTypesName : "--"}
              </span>
            </div>
            <div className="clearfix row">
              <span className="row-left">运行状态：</span>
              <button
                className={`btn-state ${
                  data.ApplicationStatus === 1 && data.CanBeClose === true
                    ? "open"
                    : data.ApplicationStatus === 1 && data.CanBeClose === false
                    ? "ban"
                    : ""
                }`}
                onClick={this.onEditOpenClick.bind(this)}
                //   disabled={item.CanBeClose === false}
                title={data.CanBeClose === false ? "该子系统不能被关闭" : ""}
              ></button>
            </div>
          </div>

          <div className="edit-bar-box">
            <Button
              color="green"
              //   type="default"
              onClick={this.onAccessDetailClick.bind(this)}
              className="btn-base btn-detail"
            >
              详情
            </Button>
            <Button
              color="blue"
              //   type="default"
              onClick={this.onEditDetailClick.bind(this)}
              className="btn-base btn-change"
            >
              修改
            </Button>
            <Button
              color="red"
              //   type="default"
              onClick={this.onDeleteAccessClick.bind(this)}
              className="btn-base btn-delete"
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
MainAccessCard.defaultProps = {
  className: "",
  data: {},
};
export default MainAccessCard;
