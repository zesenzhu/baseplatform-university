import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
import ReactDOM from "react-dom";
import { Img } from "../../../../../../../common";
import "./index.scss";
function SubCard(props, ref) {
  let {
    data,
    type,
    className,
    onEditOpenClick,
    onAccessDetailClick,
    onEditDetailClick,
    onDeleteAccessClick,
    onSelectApp,
    select,
    ...other
  } = props;
  if (!type) {
    type = "main";
  }

  let {
    ApplicationImgUrl,
    ApplicationName,
    ApplicationTypeName,
    IsThirdPartyName,
    DeviceTypesName,
    UserTypeName,
    ApplicationID,
  } = data;
  useImperativeHandle(ref, () => ({}));
  return (
    <div
      ref={ref}
      className={`SubCard ${
        type === "main" ? "SubCard-main" : "SubCard-modal"
      } ${className}`}
    >
      <div className="sc-top">
        <Img
          width={64}
          height={64}
          src={ApplicationImgUrl}
          title={ApplicationName}
        ></Img>
        <div className="sc-title">
          <p className="sct-name" title={ApplicationName}>
            {ApplicationName}
          </p>
          <p className={"sct-group"}>
            <span className="sctg-box sctg-type" title={ApplicationTypeName}>
              {ApplicationTypeName}
            </span>
            <span
              className={`sctg-box ${
                IsThirdPartyName === "蓝鸽应用" ? "sctg-lancoo" : "sctg-other"
              }`}
              title={IsThirdPartyName}
            >
              {IsThirdPartyName}
            </span>
          </p>
        </div>
      </div>
      <div className="sc-center">
        <p className="scc-row">
          <span className="sccr-left">用户对象:</span>
          <span title={UserTypeName} className="sccr-right">
            {UserTypeName ? UserTypeName : "--"}
          </span>
        </p>
        {/* <p className="scc-row">
          <span className="sccr-left">支持设备:</span>
          <span title={DeviceTypesName} className="sccr-right">
            {DeviceTypesName ? DeviceTypesName : "--"}
          </span>
        </p> */}
        {type === "main" ? (
          <p className="scc-row">
            <span className="sccr-left">运行状态:</span>
            <span title={UserTypeName} className="sccr-right">
              <button
                className={`btn-state ${
                  data.ApplicationStatus === 1 && data.CanBeClose === true
                    ? "open"
                    : data.ApplicationStatus === 1 && data.CanBeClose === false
                    ? "ban"
                    : ""
                }`}
                onClick={(e) => onEditOpenClick(e, data)}
                //   disabled={item.CanBeClose === false}
                title={data.CanBeClose === false ? "该子系统不能被关闭" : ""}
              ></button>
              {/* {data.ApplicationStatus === 1 ? "已开启访问" : "已关闭访问"} */}
            </span>
          </p>
        ) : (
          ""
        )}
        {type === "modal" ? (
          <p className="scc-row">
            <span className="sccr-left">更多信息:</span>
            <span title={UserTypeName} className="sccr-right sccr-more">
              点击查看详情
            </span>
          </p>
        ) : (
          ""
        )}
      </div>

      {type === "main" ? (
        <div className="sc-handle">
          <span
            className="sch-model sch-detail"
            onClick={(e) => onAccessDetailClick(ApplicationID)}
          >
            详情
          </span>
          <span
            className="sch-model sch-edit"
            onClick={(e) => onEditDetailClick(ApplicationID)}
          >
            修改
          </span>
          <span
            className="sch-model sch-delete"
            onClick={(e) => onDeleteAccessClick(ApplicationID)}
          >
            删除
          </span>
        </div>
      ) : (
        ""
      )}
      {type === "modal" ? (
        <span
          onClick={() =>  onSelectApp(ApplicationID, !select)}
          className={`sc-select ${select ? "selected" : "no-selected"}`}
        ></span>
      ) : (
        ""
      )}
    </div>
  );
}
export default memo(forwardRef(SubCard));
