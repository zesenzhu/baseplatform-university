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
import { Loading, Empty, PagiNation } from "../../../../../common";
import useGetList from "../../hooks/useGetList";
import { GetSubSystemToAdd, GetAllSubSystem } from "../api";
import Card from "../component/card";
import { Input } from "antd";
import { Context } from "../context";
import { Scrollbars } from "react-custom-scrollbars";
function AddSubSystem(props, ref) {
  const [TabList] = useState([
    { value: "old", title: "选择已有应用" },
    { value: "new", title: "录入新的应用" },
  ]);
  const [TabSelect, setTabSelect] = useState(TabList[0].value);

  return (
    <div className="System-Modal AddSubSystem">
      <div className="AddSubSystem-top">
        {TabList.map((c, i) => {
          return (
            <span
              key={i}
              onClick={() => {
                setTabSelect(c.value);
              }}
              className={`tab ${
                TabSelect === c.value ? "tab-select" : "tab-default"
              }`}
            >
              {c.title}
            </span>
          );
        })}
      </div>
      <Scrollbars autoHeight autoHeightMin={539}>
        <div className="AddSubSystem-center">
          {TabSelect === TabList[0].value && <OldSubSystem></OldSubSystem>}
          {TabSelect === TabList[1].value && <NewSubSystem></NewSubSystem>}
        </div>
      </Scrollbars>
    </div>
  );
}

// 选择已有应用

function OldSubSystem(props) {
  let { getCardSelect } = props;
  const { state } = useContext(Context);
  const { SysTypeData, UserTypeData, SysStateData } = state;
  const [Query, setQuery] = useState({});
  const [SelectList, setSelectList] = useState([]);
  const [Data, handleChange, LoadingShow] = useGetList(GetAllSubSystem, Query, {
    pageSize: 12,
  });
  const onCardSelect = useCallback(
    (id, checked) => {
      let next = [];
      setSelectList((pre) => {
        pre = pre.filter((c) => c !== id);
        next = checked ? pre.push(id) : pre;
        return next;
      });
      typeof getCardSelect === "function" && getCardSelect(next);
    },
    [getCardSelect]
  );
  return (
    <Loading spinning={LoadingShow} opacity={false} tip="请稍候...">
      <div className="AddSubSystem-tab OldSubSystem">
        {Data && Data.List instanceof Array && Data.List.length > 0 ? (
          <>
            {Data.List.map((child, index) => {
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
                  type={"old"}
                  onCardSelect={onCardSelect}
                  data={child}
                  key={index}
                ></Card>
              );
            })}
            <PagiNation
              showQuickJumper
              showSizeChanger
              onShowSizeChange={(current, pageSize) => {
                console.log(pageSize);
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
          <Empty
            title={"暂无子系统应用"}
            type="4"
            style={{ marginTop: "200px" }}
          ></Empty>
        )}
      </div>
    </Loading>
  );
}

// 录入新的应用

function NewSubSystem(props) {
  let { defaultData } = props;
  return (
    <div className={"AddSubSystem-tab NewSubSystem"}>
      <table>
        <tr>
          <td colSpan={1} className={"table-td-1 must "}>
            <td>应用名称:</td>
            <td>
              <Input
                placeholder={"请输入8位以内的中英文名称..."}
                className="add-input add-input-1"
                width={527}
              ></Input>
            </td>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default memo(forwardRef(AddSubSystem), (pre, next) => {
  return pre.visible === next.visible;
});
