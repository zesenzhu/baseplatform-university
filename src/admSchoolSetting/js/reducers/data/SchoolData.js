import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const SchoolData = (
  state = {
    CurrentPage: 0,
    Total: 0,
    pageSize: 10,
    ClosedCount: 0,
    initData: [],
    SchoolList: [],
    keyList: [],
    TotalSchoolCount: 0,
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.SET_WEBSITE_DATA:
      return Object.assign({}, state, { ...actions.data });
    case UpDataState.QUERY_SCHOOL_INFO:
      Data = handleInitData(actions.data, actions.pageSize);
      return Object.assign({}, state, { ...Data });
    default:
      return state;
  }
};

function handleInitData(initData, pageSize) {
  console.log(initData);
  let { List, ...other } = initData;
  let SchoolList = [];
  let keyList = [];
  let SchoolOpen = 0;
  let SchoolClose = 0;
  if (List instanceof Array) {
    List.map((child, index) => {
      let No =
        pageSize * (other.CurrentPage - 1) + index + 1 > 10
          ? pageSize * (other.CurrentPage - 1) + index + 1
          : "0" + (pageSize * (other.CurrentPage - 1) + index + 1);
      // if (child.SchoolState === 1) {
      //   SchoolOpen++;
      // } else if (child.SchoolState === 2) {
      //   SchoolClose++;
      // }

      SchoolList.push({
        orderNo: {
          No,
          key: index,
        },
        SchoolName: child.SchoolName,
        SchoolCode: child.SchoolCode,
        SchoolLevel:
          child.SchoolLevel === 1
            ? { title: "大学", value: 1 }
            : { title: "中小学", value: 2 },
        SchoolSessionType:
          child.SchoolSessionType === "3"
            ? { title: "三年制", value: 3 }
            : child.SchoolSessionType === "4"
            ? { title: "四年制", value: 4 }
            : child.SchoolSessionType === "5"
            ? { title: "五年制", value: 5 }
            : { title: "三年制", value: 3 },
        StudentCount: child.StudentCount,
        TeacherAndWorkerCount: child.TeacherAndWorkerCount,
        SchoolTotlaCount: child.StudentCount + child.TeacherAndWorkerCount,
        AdminAccount: "admin_" + child.SchoolCode,
        SchoolState:
          child.SchoolState === 1
            ? { title: "正常运行", value: 1 }
            : { title: "已关闭访问", value: 2 },
        Runtime: child.Runtime,
        SchoolLink: {
          SchoolLinkman: child.SchoolLinkman,
          SchoolTel: child.SchoolTel,
        },
        SchoolID: child.SchoolID,
        SchoolImgUrl: child.SchoolImgUrl,
        CityID: child.CityID,
        CityName: child.CityName,
        CountyName: child.CountyName,
        ProvinceName: child.ProvinceName,
        CountyID: child.CountyID,
        ProvinceID: child.ProvinceID,
        SchoolImgUrl_Long: child.SchoolImgUrl_Long,
      });
      keyList.push(index);
    });
  }
  return { initData, SchoolList, keyList, SchoolClose, ...other };
}

export default SchoolData;
