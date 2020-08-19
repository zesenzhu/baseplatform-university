import React from "react";
import history from "../../containers/history";
import "../../../scss/newEdition/TopMenu.scss";
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "Student", title: "学生账号管理", icon: "Student" },
        { value: "Parents", title: "家长账号管理", icon: "Parents" },
        { value: "Teacher", title: "教师账号管理", icon: "Teacher" },
        { value: "Leader", title: "领导账号管理", icon: "Leader" },
        { value: "Admin", title: "管理员账号管理 ", icon: "Admin" },
      ],
    };
  }
  onSelectMenu = (key) => {
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    // if (key !== "All") {
    //   // console.log(key)
    //   if (handleRoute === "Student") {
    //     window.StudentCancelSearch();
    //   } else if (handleRoute === "Teacher") {
    //     window.TeacherCancelSearch();
    //   } else if (handleRoute === "Leader") {
    //     window.LeaderCancelSearch();
    //   }
    //   history.push("/UserArchives/" + key + "/all");
    // } else {
    //   history.push("/UserArchives/" + key);
    // }
    history.push('/'+key)
  };

  render() {
    let { List } = this.props;
    let pathname = history.location.pathname;

    let pathArr = pathname.split("/");
    let handleRoute = pathArr[1];
    // console.log(handleRoute)
    let { ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    );
    let newList = List;
    if (ProductType === 6) {
      newList =[]
      //适配人工智能实训室，不要领导
      List.map((child, index) => {
        if (child.value !== "Leader") {
          newList.push(child);
        }
      });
    }
    List = newList;
    return (
      <div className="top-menu">
        {List instanceof Array &&
          List.map((child, index) => {

            return (
              <span
              key={index}
                onClick={this.onSelectMenu.bind(this, child.value)}
                className={`menu-bar ${handleRoute === child.value?'active':''}`}
              >
                <span className={`bar-content ${"bar-icon-" + child.icon}`}>
                  {child.title}
                </span>
              </span>
            );
          })}
      </div>
    );
  }
}

export default TopMenu;
