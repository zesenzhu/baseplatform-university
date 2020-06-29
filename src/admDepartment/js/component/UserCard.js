import React from "react";
import "../../scss/index.scss";
import { CheckBox } from "../../../common";
class UserCard extends React.Component {
  render() {
    let {
      UserID,
      UserName,
      UserType,
      UserTypeName,
      PhotoPath,
    } = this.props.params;
    // console.log(PhotoPath)
    return (
      <div key={UserID} className={`UserCard ${this.props.className}`}>
        <div className="Card-box">
          <div className="card-UserTypeName">{UserTypeName}</div>
          <i
            onClick={() => this.props.onMsgClick(UserID)}
            className="card-PhotoPath"
            style={{
              backgroundImage: `url(${PhotoPath})`,
              backgroundSize: "60px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></i>
          <span className="card-msg-box">
            <span
              title={UserName ? UserName : "--"}
              onClick={() => this.props.onMsgClick(UserID)}
              className="card-msg card-msg-UserName"
            >
              {UserName ? UserName : "--"}
            </span>
            <span
              title={UserID ? UserID : "--"}
              onClick={() => this.props.onMsgClick(UserID)}
              className="card-msg card-msg-UserID"
            >
              {UserID ? UserID : "--"}
            </span>
          </span>
          <CheckBox className="card-checkBox" value={UserID}></CheckBox>
        </div>
      </div>
    );
  }
}
export default UserCard;
