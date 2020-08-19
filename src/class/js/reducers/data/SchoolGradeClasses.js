import UpDataState from "../../actions/UpDataState";

const SchoolGradeClasses = (
  state = {
    MenuParams: {
      MenuBox: {
        display: true,
        width: 240,
        MenuBoxTopPic: "pic3"
      }
    },
    College: [],
    Majors: {},
    Grades: {},
    Classes: {},
    selectID:'all',
    AllMajors:{}
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_SHCOOL_GRADE_CLASSES:
      let Data = handleData(actions.data, actions.func, actions.selectID);
      return { ...state, ...Data,selectID: actions.selectID};
    case UpDataState.SET_SHCOOL_GRADE_CLASSES:
      Data = handleSelectData(state, actions.selectID);
      return { ...state, ...Data,selectID: actions.selectID };
    case UpDataState.GET_SHCOOL_GRADE_CLASSES_UNIV:
      return { ...state, ...actions.data };

    default:
      return state;
  }
};

function handleSelectData(state, selectID) {
  let { MenuParams } = state;
  let firstEnd = false;
  let secondEnd = false;
  let thirdEnd = false;
  let { MenuBox, children } = MenuParams;
  // console.log(selectID);

children instanceof Array &&
    children.map((child, index) => {
       
      if (child.key === selectID) {

        children[index].selected = true;
        children[index].active = true;

        firstEnd = true;
        // console.log(true,index )

      } else {
        children[index].selected = false;
        children[index].active = false;
      }
       
        
        child.children instanceof Array&& child.children.map((child2, index2) => {
          // if (isEnd) {
          //   return;
          // }
          // console.log(child2.key === selectID);

          if (child2.key === selectID) {
            children[index].children[index2].selected = true;
            children[index].children[index2].active = true;
            children[index].active = false;
            children[index].selected = true;

            secondEnd = true;
            // console.log(true,index,index2)

          } else  {
            //最多3层
            children[index].children[index2].selected = false;
            children[index].children[index2].active = false;}
            // children[index].active = false;
            // children[index].selected = false;
            child2.children instanceof Array&&child2.children.map((child3, index3) => {
              // if (isEnd) {
              //   return;
              // }
              // console.log(child3);
              // if(thirdEnd){
              //   return 
              // }

              if (child3.key === selectID) {
                children[index].children[index2].children[
                  index3
                ].selected = true;
                children[index].children[index2].children[index3].active = true;
                children[index].children[index2].active = false;
                children[index].children[index2].selected = true;

                children[index].active = false;
                children[index].selected = true;

                thirdEnd = true;
                // console.log(true,index,index2,index3)

              }else{
                // console.log(false,index,index2,index3)
                 
                  children[index].children[index2].children[
                    index3
                  ].selected = false;
                  children[index].children[index2].children[index3].active = false;
                  // children[index].children[index2].active = false;
                  // children[index].children[index2].selected = false;
                  // hildren[index].active = false;
                  // children[index].selected = false;
                 
                
              }
            });
          
        });
      
    });



  // children instanceof Array &&
  //   children.map((child, index) => {
  //     // if (isEnd) {
  //     //   return;
  //     // }
  //     // console.log(child.key === selectID);
  //     if (child.key === selectID) {
  //       children[index].selected = true;
  //       children[index].active = true;

  //       firstEnd = true;
  //       // console.log(true,index )

  //     } else  {
  //       children[index].selected = false;
  //       children[index].active = false;
  //       child.children instanceof Array&& child.children.map((child2, index2) => {
  //         // if (isEnd) {
  //         //   return;
  //         // }
  //         // console.log(child2.key === selectID);

  //         if (child2.key === selectID) {
  //           children[index].children[index2].selected = true;
  //           children[index].children[index2].active = true;
  //           children[index].active = true;
  //           children[index].selected = false;

  //           secondEnd = true;
  //           // console.log(true,index,index2)

  //         } else  {
  //           //最多3层
  //           children[index].children[index2].selected = false;
  //           children[index].children[index2].active = false;
  //           // children[index].active = false;
  //           // children[index].selected = false;
  //           child2.children instanceof Array&&child2.children.map((child3, index3) => {
  //             // if (isEnd) {
  //             //   return;
  //             // }
  //             // console.log(child3);
  //             // if(thirdEnd){
  //             //   return 
  //             // }

  //             if (child3.key === selectID) {
  //               children[index].children[index2].children[
  //                 index3
  //               ].selected = true;
  //               children[index].children[index2].children[index3].active = true;
  //               children[index].children[index2].active = true;
  //               children[index].children[index2].selected = false;

  //               children[index].active = true;
  //               children[index].selected = false;

  //               thirdEnd = true;
  //               // console.log(true,index,index2,index3)

  //             }else{
  //               // console.log(false,index,index2,index3)
                 
  //                 children[index].children[index2].children[
  //                   index3
  //                 ].selected = false;
  //                 children[index].children[index2].children[index3].active = false;
  //                 // children[index].children[index2].active = false;
  //                 // children[index].children[index2].selected = false;
  //                 // hildren[index].active = false;
  //                 // children[index].selected = false;
                 
                
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // console.log(children);
  return { MenuParams: { MenuBox, children } };
}
function handleData(data, func, selectID) {
  if (!(data instanceof Array)) {
    return {};
  }
  let UserClass = JSON.parse(sessionStorage.getItem("UserInfo")).UserClass;
  let UserCollegeID = JSON.parse(sessionStorage.getItem("UserInfo")).CollegeID;
  let isCollegeAdmin = UserClass === '3'||UserClass === '4' ? true : false;
  let AllActive = false;
  let AllSelect = false;
  if (selectID === "all") {
    AllActive = true;
    AllSelect = true;
  }

  //处理为左侧菜单数组
  let MenuParams = {
    MenuBox: {
      display: true,
      width: 240,
      MenuBoxTopPic: "pic3"
    }
  };

  if (isCollegeAdmin) {
    let children = [];
    data.map((college, index1) => {
      //学院遍历
      let CollegeID = college.CollegeID;
      let CollegeName = college.CollegeName;
      let CollegeSelect = false;
      let CollegeActive = false;
      if (selectID === "all") {
        //相同就选中改学院
        CollegeSelect = true;
        CollegeActive = true;
      }
      let collegeMenu = {
        key: CollegeID,
        type: "All",
        title: "班级信息总览",
        active: CollegeActive,
        selected: CollegeSelect,
        icon: "menu10",
        onTitleClick: () => {
          func({ ident: "college", id: "all", name: "班级信息总览" });
        }
      };
      children.push(collegeMenu);
      let collegechildren = []; //该学院下的专业数组
      let Majors = college.Majors;
      Majors instanceof Array &&
        Majors.map((major, index2) => {
          //专业遍历
          let MajorID = major.MajorID;
          let MajorName = major.MajorName;
          let MajorSelect = false;
          let MajorActive = false;
          if (selectID === MajorID) {
            //相同就选中该专业，修改学院状态
            MajorSelect = true;
            MajorActive = true;
            collegeMenu.selected = true;
          }
          let majorMenu = {
            key: MajorID,
            type: "Major",
            title: MajorName,
            active: MajorActive,
            selected: MajorSelect,
            icon: "menu20",
            onTitleClick: () => {
              func({
                ident: "major",
                id: MajorID,
                name: MajorName,
                collegeID: CollegeID,
                collegeName: CollegeName
              });
            }
          };
          let majorchildren = []; //该专业下的班级数组
          let Classes = major.Classes;
          Classes instanceof Array &&
            Classes.map((Class, index3) => {
              //班级遍历
              let ClassID = Class.ClassID;
              let ClassName = Class.ClassName;
              let ClassSelect = false;
              let ClassActive = false;
              if (selectID === ClassID) {
                //相同就选中该班级，修改学院、专业状态
                ClassSelect = true;
                ClassActive = true;
                collegeMenu.selected = true;
                majorMenu.selected = true;
              }
              let classMenu = {
                key: ClassID,
                type: "Class",
                title: ClassName,
                active: ClassActive,
                selected: ClassSelect,
                // icon: "menu20",
                onTitleClick: () => {
                  func({
                    ident: "class",
                    id: ClassID,
                    name: ClassName,
                    collegeID: CollegeID,
                    collegeName: CollegeName,
                    majorID: MajorID,
                    majorName: MajorName
                  });
                }
              };

              majorchildren.push(classMenu);
            });
          majorMenu["children"] = majorchildren;
          children.push(majorMenu);
        });
    });
    MenuParams["children"] = children;
  } else {
    let children = [
      {
        key: "all",
        title: "班级信息总览",
        type: "All",
        icon: "menu10",
        active: AllActive,
        selected: AllSelect,
        onTitleClick: () => {
          func({ ident: "stu", id: "all", name: "班级信息总览" });
        }
      }
    ];
    data.map((college, index1) => {
      //学院遍历
      let CollegeID = college.CollegeID;
      let CollegeName = college.CollegeName;
      let CollegeSelect = false;
      let CollegeActive = false;
      if (selectID === CollegeID) {
        //相同就选中改学院
        CollegeSelect = true;
        CollegeActive = true;
      }
      let collegeMenu = {
        key: CollegeID,
        type: "College",
        title: CollegeName,
        active: CollegeActive,
        selected: CollegeSelect,
        icon: "menu20",
        onTitleClick: () => {
          func({ ident: "college", id: CollegeID, name: CollegeName });
        }
      };
      let collegechildren = []; //该学院下的专业数组
      let Majors = college.Majors;
      Majors instanceof Array &&
        Majors.map((major, index2) => {
          //专业遍历
          let MajorID = major.MajorID;
          let MajorName = major.MajorName;
          let MajorSelect = false;
          let MajorActive = false;
          if (selectID === MajorID) {
            //相同就选中该专业，修改学院状态
            MajorSelect = true;
            MajorActive = true;
            collegeMenu.selected = true;
          }
          let majorMenu = {
            key: MajorID,
            type: "Major",
            title: MajorName,
            active: MajorActive,
            selected: MajorSelect,
            icon: "menu20",
            onTitleClick: () => {
              func({
                ident: "major",
                id: MajorID,
                name: MajorName,
                collegeID: CollegeID,
                collegeName: CollegeName
              });
            }
          };
          let majorchildren = []; //该专业下的班级数组
          let Classes = major.Classes;
          Classes instanceof Array &&
            Classes.map((Class, index3) => {
              //班级遍历
              let ClassID = Class.ClassID;
              let ClassName = Class.ClassName;
              let ClassSelect = false;
              let ClassActive = false;
              if (selectID === ClassID) {
                //相同就选中该班级，修改学院、专业状态
                ClassSelect = true;
                ClassActive = true;
                collegeMenu.selected = true;
                majorMenu.selected = true;
              }
              let classMenu = {
                key: ClassID,
                type: "Class",
                title: ClassName,
                active: ClassActive,
                selected: ClassSelect,
                // icon: "menu20",
                onTitleClick: () => {
                  func({
                    ident: "class",
                    id: ClassID,
                    name: ClassName,
                    collegeID: CollegeID,
                    collegeName: CollegeName,
                    majorID: MajorID,
                    majorName: MajorName
                  });
                }
              };

              majorchildren.push(classMenu);
            });
          majorMenu["children"] = majorchildren;
          collegechildren.push(majorMenu);
        });
      collegeMenu["children"] = collegechildren;

      children.push(collegeMenu);
    });
    MenuParams["children"] = children;
  }
  let CollegeArr = [];
  let Classes = {};
  let College = {};
  let Majors = {};
  let Grades = {};
  let AllMajors= {}
  data.map((child, index) => {
    let MajorsArr = [];

    child.Majors instanceof Array &&
      child.Majors.map(major => {
        let GradesArr = [];

        major.Grades instanceof Array &&
          major.Grades.map(grade => {
            let ClassesArr = [];

            grade.Classes instanceof Array &&
              grade.Classes.map(Class => {
                ClassesArr.push({
                  value: Class.ClassID,
                  title: Class.ClassName,
                  father: Class.GradeID
                });
              });
            Classes[grade.GradeID] = ClassesArr;
            GradesArr.push({
              value: grade.GradeID,
              title: grade.GradeName,
              childred: ClassesArr
            });
          });
        Grades[major.MajorID] = GradesArr;
        MajorsArr.push({
          value: major.MajorID,
          title: major.MajorName,
          childred: GradesArr
        });
        AllMajors[major.MajorID] = {
          value: major.MajorID,
          title: major.MajorName,
          childred: GradesArr
        }

      });
    Majors[child.CollegeID] = MajorsArr;
    CollegeArr.push({
      value: child.CollegeID,
      title: child.CollegeName,
      childred: MajorsArr
    });
  });
  return {
    oldData: data,
    MenuParams: MenuParams,
    College: CollegeArr,
    Majors,
    Grades,
    Classes,
    AllMajors
  };
}
export default SchoolGradeClasses;
