import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useReducer,
  forwardRef,
  useCallback,
  useContext,
  createContext,
} from "react";
import { connect } from "react-redux";
import {
  LgModal,
  Loading,
  DropDown,
  Search,
  Empty,
  PagiNation,
} from "../../../../common";
import { useHistory } from "react-router-dom";
import "./scss/index.scss";
import useGetList from "../hooks/useGetList";
import { GetAllSubSystem, ToggleAccessState } from "./api";
import { Context, reducer, initState } from "./context";
import Card from "./component/card";
import AddSubSystem from "./Modal/addSubSystem";
/**
 * @description: 子系统模块
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function SubSystem(props, ref) {
  const { dispatch } = props;
  const [state, Dispatch] = useReducer(reducer, initState);
  let {
    SysTypeData,
    UserTypeData,
    SysStateData,
    SysStateList,
    UserTypeList,
    SysTypeList,
  } = state;
  const [Query, setQuery] = useState({
    sysState: 0,
    userType: "",
    sysType: 0,
    key: "",
  });
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const [SysState, setSysState] = useState({ value: 0, title: "全部" });
  const [UserType, setUserType] = useState({ value: 0, title: "全部" });
  const [SysType, setSysType] = useState({ value: 0, title: "全部" });
  const [Data, handleChange, LoadingShow, reloadList] = useGetList(
    GetAllSubSystem,
    Query,
    {
      pageSize: 12,
    }
  );

  const onModalCancel = useCallback((func, callback) => {
    typeof func === "function" &&
      func(() => {
        typeof callback === "function" && callback();
        return false;
      });
  }, []);
  const onToggleStatus = useCallback(async (params) => {
    let res = await ToggleAccessState(params);
    return res.StatusCode === 200;
  }, []);
  return (
    <Context.Provider value={{ state, Dispatch }}>
      <div className="System-content SubSystem">
        <p className="System-content-top">
          子系统访问设置
          <span
            className="btn-add-sub"
            onClick={() => {
              // GetSubSystemToAdd()
              setAddModalVisible(true);
            }}
          >
            添加应用
          </span>
        </p>
        <div className="System-content-center">
          <div className="params-box">
            <DropDown
              width={120}
              title={"访问状态:"}
              dropSelectd={SysState}
              dropList={SysStateList}
              height={120}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setSysState(value);
                setQuery((data) => {
                  return { ...data, sysState: value.value };
                });
              }}
            ></DropDown>
            <DropDown
              width={120}
              title={"用户对象:"}
              dropSelectd={UserType}
              dropList={UserTypeList}
              height={120}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setUserType(value);
                setQuery((data) => {
                  return { ...data, userType: value.value };
                });
              }}
            ></DropDown>
            <DropDown
              width={120}
              title={"应用分类:"}
              dropSelectd={SysType}
              dropList={SysTypeList}
              height={120}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setSysType(value);
                setQuery((data) => {
                  return { ...data, sysType: value.value };
                });
              }}
            ></DropDown>

            <Search
              placeHolder="输入关键词快速搜索..."
              onClickSearch={(e) => {
                if (e.value === "") {
                  dispatch(
                    AppAlertAction.alertTips({
                      title: "搜索内容不能为空",
                      cancelTitle: "确定",
                    })
                  );
                  return;
                }
                setQuery((data) => {
                  return { ...data, key: e.value };
                });
              }}
              onCancelSearch={() => {
                setQuery((data) => {
                  return { ...data, key: "" };
                });
              }}
            ></Search>
          </div>
          <Loading spinning={LoadingShow} opacity={false} tip="请稍候...">
            <div className="System-content-center-box">
              {Data ? (
                <>
                  <div
                    className="subsystem-detail"
                    // style={{ display: `${exeit === "0" ? "block" : "none"}` }}
                  >
                    共计<span>{Data.TotalCount}</span>个系统 ，其中
                    <span className="title-2">{Data.ThirdPartyAppCount}</span>
                    个为第三方应用
                  </div>
                  {Data.List instanceof Array &&
                    Data.List.length > 0 &&
                    Data.List.map((child, index) => {
                      child.SysStateName = SysStateData[child.SysState];
                      child.SysTypeName = SysTypeData[child.SysType];
                      let UserTypesList = [];
                      typeof child.UserTypes === "string" &&
                        child.UserTypes.split(",").forEach((c) => {
                          UserTypesList.push(UserTypeData[c]);
                        });
                      child.UserTypesName = UserTypesList.join(",");
                      return (
                        <Card
                          onToggleStatus={onToggleStatus}
                          data={child}
                          key={index}
                        ></Card>
                      );
                    })}
                  <PagiNation
                    showQuickJumper
                    showSizeChanger
                    onShowSizeChange={(current, pageSize) => {
                      handleChange({ pageSize });
                    }}
                    pageSize={Data.PageSize}
                    current={Data.PageIndex}
                    hideOnSinglePage={Data.TotalCount === 0 ? true : false}
                    total={Data.TotalCount}
                    pageSizeOptions={["12", "24", "36", "48"]}
                    onChange={(value) => {
                      handleChange({ pageIndex: value });
                    }}
                  ></PagiNation>
                </>
              ) : (
                ""
              )}
              {!(
                Data &&
                Data.List instanceof Array &&
                Data.List.length > 0
              ) && (
                <Empty
                  title={
                    SysState.value ||
                    UserType.value ||
                    SysType.value ||
                    Query.key
                      ? "暂无符合条件的子系统应用"
                      : "暂无子系统应用"
                  }
                  type="4"
                  style={{ marginTop: "100px" }}
                ></Empty>
              )}
            </div>
          </Loading>
        </div>
      </div>
      <LgModal
        type="1"
        title="添加应用"
        onOk={onModalCancel.bind(this, setAddModalVisible, () => {})}
        onCancel={onModalCancel.bind(this, setAddModalVisible)}
        width={"1160px"}
        height={596}
        visible={AddModalVisible}
        okText="保存"
      >
        <AddSubSystem visible={AddModalVisible}></AddSubSystem>
      </LgModal>
    </Context.Provider>
  );
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(memo(forwardRef(SubSystem)));
