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
import TipsLog from "./TipsLog";
import UserArchivesModal from "./UserArchivesModal";
import All from "./All";
import Student from "./Student";
import Teacher from "./Teacher";
import Leader from "./Leader";
import Temple from "../Temple";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;

class UserArchives extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  StudentChangeMadalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        UserLogModalVisible: false,
      })
    );
  };
  render() {
    const {
      DataState: {
        MainData: { UserLog },
        CommonData: {
          ModalVisible: { UserLogModalVisible },UserArchivesParams:{
            TipsLogName
          }
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    return (
      <div id="UserArchives" className="UserArchives">
        {/* {this.props.children} */}
        <Route path="/UserArchives/All" exact component={All}></Route>
        <Route path="/UserArchives/Student*" component={Student} exact></Route>
        <Route
          path="/UserArchives/Teacher*"
          component={Teacher}
          exact
        ></Route>
        <Route path="/UserArchives/Leader" component={Leader} exact></Route>
        <Route
          path="/UserArchives/Graduate/:id"
          component={Temple}
          exact
        ></Route>
        <Modal
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          footer={null}
          visible={UserLogModalVisible}
          onCancel={this.StudentChangeMadalCancel}
        >
          <Loading
            opacity={false}
            // tip="加载中..."
            size="small"
            spinning={ModalLoading}
          >
            <TipsLog userName={TipsLogName} data={UserLog}></TipsLog>
          </Loading>
        </Modal>
        <UserArchivesModal></UserArchivesModal>
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
export default connect(mapStateToProps)(UserArchives);
