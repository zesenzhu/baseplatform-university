import React from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  DropDown,
  Button,
  Radio,
  RadioGroup,
  Loading,
} from "../../../common";
import { Input, Tree, Select } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";

import "../../scss/LeftMenu.scss";

const { Option } = Select;
const { UpDataState, UpUIState } = actions;
const { TreeNode } = Tree;
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  // 树节点选择
  onSelect = (selectedKeys, info) => {
    //可控，待实现
    console.log(selectedKeys, info);
    const { dispatch, DataState } = this.props;
    if (selectedKeys.length === 0) {
      selectedKeys = [
        DataState.CommonData.DepartmentDetailData.DepartmentID ||
          DataState.MainData.DepartmentData.DepartMentTree[0].DepartmentID,
      ];
    }
    console.log(selectedKeys, info);

    dispatch(UpDataState.InitDepartmentDetailParams({}));
    dispatch(UpDataState.SetSelectedDepartmentTreeKeys(selectedKeys));
    dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };
  onExpand = (ExpandedKeys, info) => {
    //可控，待实现
    const { dispatch } = this.props;
    dispatch(UpDataState.SetExpandedDepartmentTreeKeys(ExpandedKeys));
    console.log(ExpandedKeys, info);
  };
  //阻止冒泡+出现/隐藏
  onStopPropagation = (e, key, bool) => {
    const { dispatch } = this.props;

    e.stopPropagation();
    dispatch(UpDataState.MainSetHandleBoxVisible(key, bool));
  };

  // 删除
  onTreeNodeDeleteClick = (e, key) => {
    const { dispatch, DataState } = this.props;

    e.stopPropagation();
    dispatch(
      UpDataState.SetDeleteDepartmentParams({
        DepartmentID: key,
      })
    );
    let DeleteChildren =
      DataState.CommonData.DeleteDepartmentMsg.DeleteChildren;
      let departmentName = DataState.MainData.DepartmentData.DepartMentTreeForKey[key].DepartmentName
    // const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: (
          <div className="alert-delete-department">
            <p className="alert-delete-department-title">
        确定删除该部门<span className="title-bold">{departmentName}</span>吗？
            </p>
            <div className='alert-delete-department-handle-box'>
              <span className="alert-delete-department-tips">
                是否保留子部门？
              </span>
              <div className="alert-delete-department-box">
                <RadioGroup
                  onChange={(e) => {
                    return this.onRadioGraoupChange(e,key);
                  }}
                  value={
                    DataState.CommonData.DeleteDepartmentMsg.DeleteChildren
                  }
                >
                  <Radio type="gray" value={0}>
                    保留，迁移至上一级
                  </Radio>
                  <Radio type="gray" value={1}>
                    不保留，同时删掉子部门
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        ),
        type: "btn-warn",
        onOk: () => {
          dispatch(
            UpDataState.DeleteDepartment({
              // DeleteChildren: false,
              // DepartmentID: key,
              func: () => {
                dispatch(
                  UpDataState.SetDeleteDepartmentParams({
                    DeleteChildren: 0,
                    DepartmentID: "",
                  })
                );
                this.onAppAlertClose();
              },
            })
          );
        },
        onClose: () => {
          dispatch(
            UpDataState.SetDeleteDepartmentParams({
              DeleteChildren: 0,
              DepartmentID: "",
            })
          );
          this.onAppAlertClose();
        },
        onCancel: () => {
          dispatch(
            UpDataState.SetDeleteDepartmentParams({
              DeleteChildren: 0,
              DepartmentID: "",
            })
          );
          this.onAppAlertClose();
        },
      })
    );
    // console.log(DeleteChildren)
  };
  // 删除：是否删除下一级
  onRadioGraoupChange = (e,key) => {
    const { dispatch, DataState } = this.props;
    console.log(e.target.value);
    dispatch(
      UpDataState.SetDeleteDepartmentParams({
        DeleteChildren: e.target.value,
      })
    );
    let departmentName = DataState.MainData.DepartmentData.DepartMentTreeForKey[key].DepartmentName

    dispatch(
      actions.UpUIState.showErrorAlert({
        title: (
          <div className="alert-delete-department">
            <p className="alert-delete-department-title">
        确定删除该部门<span className="title-bold">{departmentName}</span>吗？
            </p>
            <div className='alert-delete-department-handle-box'>
              <span className="alert-delete-department-tips">
                是否保留子部门？
              </span>
              <div className="alert-delete-department-box">
                <RadioGroup
                  onChange={(e) => {
                    return this.onRadioGraoupChange(e,key);
                  }}
                  value={
                    e.target.value
                  }
                >
                  <Radio type="gray" value={0}>
                    保留，迁移至上一级
                  </Radio>
                  <Radio type="gray" value={1}>
                    不保留，同时删掉子部门
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        ),
        type: "btn-warn",
        onOk: () => {
          dispatch(
            UpDataState.DeleteDepartment({
              // DeleteChildren: false,
              // DepartmentID: key,
              func: () => {
                dispatch(
                  UpDataState.SetDeleteDepartmentParams({
                    DeleteChildren: 0,
                    DepartmentID: "",
                  })
                );
                this.onAppAlertClose();
              },
            })
          );
        },
        onClose: () => {
          dispatch(
            UpDataState.SetDeleteDepartmentParams({
              DeleteChildren: 0,
              DepartmentID: "",
            })
          );
          this.onAppAlertClose();
        },
        onCancel: () => {
          dispatch(
            UpDataState.SetDeleteDepartmentParams({
              DeleteChildren: 0,
              DepartmentID: "",
            })
          );
          this.onAppAlertClose();
        },
      })
    );
    // return e.target.value
  };
  // 编辑
  onTreeNodeEditClick = ( e, key) => {
    e.stopPropagation();

    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetEditDepartmentParams({
        DepartmentID: key,
      })
    );dispatch(
      UpDataState.GetEditDepartmentDetail({
         func:()=>{
          dispatch(
            UpUIState.EditDepartmentModalOpen()
          );
         }
      })
    );
    
    
  };
  // 添加
  onTreeNodeAddClick = (e, key) => {
    e.stopPropagation();

    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetAddDepartmentParams({
        ParentID: key,
      })
    );
    dispatch(
      UpUIState.AddDepartmentModalOpen()
    );
  };
  // 鼠标进
  onMouseEnterNode = (key) => {
    const { dispatch } = this.props;

    dispatch(UpDataState.MainSetHandleBoxVisible(key, false));
  };
  // 鼠标出
  onMouseOutNode = (key) => {
    const { dispatch } = this.props;

    dispatch(UpDataState.MainSetHandleBoxVisible(key, false));
  };
  // 解构树
  getNodeData = (data) => {
    const { DataState } = this.props;
    let TreeNodeArr = DataState.MainData.DepartmentData.TreeNode;
    if (!(data instanceof Array)) {
      return {};
    }
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            className="tree-node-child"
            title={
              <div
                className="tree-title-box"
                // onMouseEnter = {this.onMouseEnterNode.bind(this,item.key)}
                onMouseLeave={this.onMouseOutNode.bind(this, item.key)}
              >
                <span className="tree-title">
                  {item.title}
                  <span className="tree-id">({item.id})</span>
                </span>
                <div
                  className={`${
                    // item.Readonly
                    //   ? "node-handle-content-readonly"
                    // :
                    "node-handle-content"
                  } ${
                    TreeNodeArr[item.key]
                      ? item.Readonly
                        ? "node-handle-content-readonly-open"
                        : "node-handle-content-open"
                      : "node-handle-content-close"
                  }`}
                >
                  <span
                    onClick={(e) =>
                      this.onStopPropagation(
                        e,
                        item.key,
                        !TreeNodeArr[item.key]
                      )
                    }
                    className="handle-content-control"
                  >
                    {TreeNodeArr[item.key] ? ">>" : "<<"}
                  </span>

                  <div
                    style={{ display: item.Readonly ? "none" : "inline-block" }}
                    onClick={(e) => this.onTreeNodeDeleteClick(e, item.key)}
                    className="handle-style tree-node-delete"
                  >
                    X
                  </div>
                  <div
                    onClick={(e) => this.onTreeNodeEditClick(e, item.key)}
                    style={{ display: item.Readonly ? "none" : "inline-block" }}
                    className="handle-style tree-node-edit"
                  >
                    E
                  </div>

                  <div
                    onClick={(e) => this.onTreeNodeAddClick(e, item.key)}
                    className="handle-style tree-node-add"
                  >
                    A
                  </div>
                </div>
              </div>
            }
            key={item.key}
            dataRef={item}
          >
            {this.getNodeData(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode className="tree-node" key={item.key} {...item}></TreeNode>
      );
    });
  };
  // 搜索组织
  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch(UpDataState.SetSearchDepartmentKeyWord(value));
    dispatch(UpDataState.GetSearchDepartment({}));

    // console.log(value);
  };
  // 选中组织
  handleChange = (value) => {
    const { dispatch, DataState } = this.props;
    // console.log(value);
    let { PathKeys } = DataState.MainData.DepartmentData;
    let { expandedKeys } = DataState.CommonData.MenuTreeData;
    let ParentExpand = PathKeys[value].concat(expandedKeys);

    dispatch(UpDataState.SetSearchDepartmentKey(value));
    dispatch(UpDataState.SetExpandedDepartmentTreeKeys(ParentExpand));
    dispatch(actions.UpDataState.GetDepartmentDetail({}));
  };

  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, MainData, LoginUser } = DataState;
    let { cnname } = MainData.ModuleData;
    let { DepartMentTree } = MainData.DepartmentData;
    let { SearchDepartmentData } = MainData.SearchDepartmentData;
    let { selectedKeys, expandedKeys } = CommonData.MenuTreeData;
    let { KeyWord, SearchDepartmentKey } = CommonData.SearchDepartment;
    return (
      <Loading
        opacity={false}
        tip="加载中..."
        // size="large"
        spinning={UIState.AppLoading.LeftLoading}
      >
        <div className="LeftMenu" id="LeftMenu">
          <div className="menu-top-box">
            <p className="menu-top-title">{cnname}</p>
            <div className="menu-top-search">
              <div className="search-select-box">
                <span className="search-select-title">搜索：</span>
                <Select
                  showSearch
                  value={SearchDepartmentKey}
                  placeholder={"请输入关键字"}
                  className="search-select-input"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  maxTagTextLength={20}
                  onSearch={this.handleSearch}
                  onChange={this.handleChange}
                  // onBlur={this.handleBlur}
                  notFoundContent={null}
                >
                  {SearchDepartmentData.map((child) => {
                    return (
                      <Option key={child.value}>
                        {child.title}({child.id})
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>
          <div className="menu-tree-box">
            <Tree
              className="menu-tree"
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              blockNode
              onSelect={this.onSelect.bind(this)}
              onExpand={this.onExpand.bind(this)}
            >
              {this.getNodeData(DepartMentTree)}
            </Tree>
          </div>
        </div>
      </Loading>
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
export default connect(mapStateToProps)(LeftMenu);
