import React, { Component } from "react";
import "../../../sass/MainAccessCard.scss";
import { Button, CheckBox } from "../../../../common";
import  '../../../sass/AddAccessCard.scss'
class AddAccessCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div className={`AddAccessCard ${className}`}>
        <div className="grey-bg"></div>
        <div className="subsystem-content">
          <CheckBox className='checkBox' value={data.ApplicationID}></CheckBox>
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
              <span className="row-right">{data.UserTypeName}</span>
            </div>
            <div className="clearfix row">
              <span className="row-left">支持设备：</span>
              <span className="row-right">{data.DeviceTypesName}</span>
            </div>
            <div className="clearfix row">
              <span className="row-left">更多信息：</span>
              <span
                onClick={() => onAccessDetailClick(data.ApplicationID)}
                className="row-right more-details"
              >
                {"点击查看详情"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddAccessCard.defaultProps = {
  className: "",
  data: {},
  onAccessDetailClick: () => {},
};
export default AddAccessCard;
