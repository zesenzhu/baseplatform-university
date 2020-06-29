import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Loading, Alert } from "../../../../common";
import Frame from "../../../../common/Frame";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import history from "../../containers/history";
 
import $ from "jquery";
import setting from "../../../images/setting_logo.png";


import "../../../sass/Import.scss";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal
} from "../../../../common/index";

import { getData } from "../../../../common/js/fetch";
import { func } from "prop-types";
import { get } from "http";
import ImportExcel from "../../../../common/js/Import/ImportExcel";
import ImportPhoto from "../../../../common/js/Import/ImportPhoto";

class Import  extends React.Component {
  constructor(props) {
    super(props);

    let path = history.location.pathname.split("/");
    let route = path[2];
    this.state = {
    }
  }

  componentWillMount() {
    
  }

   
  render() {
    const { UIState, DataState } = this.props;

    return (
        <React.Fragment>
            {/* <div className='Tab'>
                <span ref='file' onClick={this.onTabClick.bind(this, 'file')} className={`Tab-btn ${this.state.select === 'file' ? 'btn-select' : ''}`}>导入基本资料</span>
                <span ref='picture' onClick={this.onTabClick.bind(this, 'picture')} className={`Tab-btn ${this.state.select === 'picture' ? 'btn-select' : ''}`}>导入照片</span>
            </div> */}


           <ImportExcel ImportTitle='导入学院' ImportTarget='importCollegeInfo'></ImportExcel>

        </React.Fragment>
    )
}
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};

export default connect(mapStateToProps)(Import);
