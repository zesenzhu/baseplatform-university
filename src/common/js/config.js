import logo from "../images/frame/logo.png";

let config = {};

const host = window.location.host;

const pathName = window.location.pathname;

const protocol = window.location.protocol;

let pathFolder = "";

if (pathName.includes("/html/")) {
  pathFolder = pathName.split("/html/")[0];
} else if (pathName.includes(".html")) {
  let strArr = window.location.pathname.split(".html")[0].split("/");

  strArr.pop();

  pathFolder = strArr.join("/");
} else {
  pathFolder = pathName;
}

const RootUrl = protocol + "//" + host + pathFolder;
//http://172.16.41.241: 10102
if (process.env.NODE_ENV === "development") {
  config = {
    name: "中小学一体化学科教育云",
    logo: logo,
    footer: "蓝鸽科技 版权所有",
    TokenProxy: "http://192.168.129.3:30103/",
    // TokenProxy:'http://47.115.20.102:10102',
    SubjectProxy: "http://192.168.129.3:30103/Subject/api",
    CourseClassProxy: "http://192.168.129.3:30103/CourseClass/api",
    CourseClassMoni:
      "http://192.168.2.202:7300/mock/5e840cf6778fda11ec0febd2/courseClass",
    //CourseClassProxy:'http://192.168.2.202:7300/mock/5e840cf6778fda11ec0febd2/courseClass',
    MyCourseClassProxy: "http://192.168.129.3:30103/",
    UserAccountProxy: "http://192.168.129.3:30103/UserMgr/UserAccount",
    TeachingSolutionProxy:
      "http://192.168.129.3:30103//SubjectResMgr/TeachingSolutionMgr/Teacher",
    AdmClassProxy: "http://192.168.129.3:30103/",
    DeskTopProxy: "http://192.168.129.3:30103/",
    // CustomProxy:"http://192.168.2.114:8090",
    PicProxy: "http://192.168.129.3:30103/",

    CustomProxy: "http://192.168.129.3:30103/",
    // WebsiteProxy:"http://192.168.2.114:8090",
    WebsiteProxy: "http://192.168.129.3:30103/",
    ScheduleProxy: "http://192.168.129.3:30103/",
    // ScheduleProxy:"http://47.115.20.102:10102",
    Xproxy: "http://192.168.129.3:30103/UserMgr/UserInfoMgr",
    PowerProxy: "http://192.168.129.3:30103/UserMgr/PowerMgr",
    // PowerProxy:'http://47.115.20.102:10102/UserMgr/PowerMgr',
    UserInfoProxy: "http://192.168.129.3:30103/UserMgr/UserInfoMgr",
    proxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    BasicProxy: "http://192.168.129.3:30103/",
    LoginProxy: "http://192.168.129.3:30103/",
    MockLoginProxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    PersonalProxy: "http://192.168.129.3:30103/",
    ErrorProxy: "http://192.168.129.3:30103/",
    XTestProxy: "http://192.168.129.3:30103//UserMgr/UserInfoMgr",
    Import: "http://192.168.129.3:30103/",
    SysSettingProxy: "http://192.168.129.3:30103/",
    ImgUrlProxy: "http://192.168.129.3:30103/",
    // SysSettingProxy:'http://192.168.2.114:8090',
    tempSubsystemProxy:
      "http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example",
    DataCollectorProxy: "http://192.168.129.3:30103/",
    // DataCollectorProxy:"http://192.168.2.114:8090",

    // v3.1
    UserInfoProxy_univ: "http://192.168.129.3:30103/UserMgr/UserInfoMgr",

    AdmClassProxy_univ: "http://192.168.129.3:30103/UserMgr/ClassMgr",

    RegisterProxy: "http://192.168.129.3:30103/UserMgr/UserInfoMgr",
    // DataCollectorProxy:"http://192.168.2.114:8090",
    RegisterNoTokenProxy: "http://192.168.129.3:30103/UserMgr/Mobile",

    //学科
    SubjectManageProxy_univ: "http://192.168.129.3:30103/",

    ScheduleManagerProxy_univ: "http://192.168.129.3:30103/",

    ScheduleForAssiant_univ:
      " http://192.168.2.202:7300/mock/5e7c57cc778fda11ec0febc9/web3.1/schedule",

    // SystemSettingProxy_univ:'http://192.168.2.202:7300/mock/5d77442ded0ccd1564c8df28/example',
    SystemSettingProxy_univ: "http://192.168.129.3:30103/",
    // SystemSettingProxy_univ:'http://192.168.2.114:8090',

    SchoolSettingProxy_univ: "http://192.168.129.3:30103/SysMgr/Setting",
    // SchoolSettingProxy_univ:'http://192.168.129.3:30103//SysMgr/Setting',
    DePartmentProxy_univ: "http://192.168.129.3:30103/UserMgr/OrganiztionMgr",
    // AccessProxy_univ:'http://192.168.129.242:8035/SysMgr/Setting/Application',
    // AccessProxy_univ:'http://192.168.2.202:7300/mock/5d77442ded0ccd1564c8df28/example',
    AccessProxy_univ: "http://192.168.129.3:30103/SysMgr/Setting/Application",

    SubjectForAccessProxy_univ:
      "http://192.168.129.3:30103/SubjectResMgr/TextBookMgr",

    HashPrevProxy: RootUrl,
    ClassProxy: "http://192.168.129.3:30103/UserMgr/ClassMgr",
    BaseApiProxy: "http://192.168.129.3:30103/BaseApi/UserMgr/UserInfoMgr",

    //新版的教学班

    NewCourseClass: "http://192.168.129.3:30103/",

    UserPersonaProxy: "http://192.168.129.3:30103/",

    UserScheduleProxy: "http://192.168.129.3:30103/Schedule/api/",

    GlobalProxy: "http://192.168.129.3:30103/Global",

    UserAccessProxy: "http://192.168.129.3:30103/UserMgr/PowerMgr/",

    SelectObjectProxy: "http://192.168.129.3:30103/UserMgr/SelectObject/",

    SubSystemProxy: "http://192.168.129.3:30103/SysMgr/Setting/SubSystem/",
    ModuleProxy: "http://192.168.129.3:30103/SysMgr/Setting/Module/",

    HolidayProxy: "http://192.168.129.3:30103/SysMgr/Setting/Holiday/",
  };
}

if (process.env.NODE_ENV === "production") {
  console.log = () => {};

  config = {
    name: "中小学一体化学科教育云",
    logo: logo,
    footer: "蓝鸽科技 版权所有",
    TokenProxy: "",
    SubjectProxy: "/Subject/api",
    CourseClassProxy: "/CourseClass/api",
    UserAccountProxy: "/UserMgr/UserAccount",
    TeachingSolutionProxy: "/SubjectResMgr/TeachingSolutionMgr/Teacher",
    AdmClassProxy: "",
    DeskTopProxy: "",
    ScheduleProxy: "",
    Xproxy: "/UserMgr/UserInfoMgr",
    PowerProxy: "/UserMgr/PowerMgr",
    UserInfoProxy: "/UserMgr/UserInfoMgr",
    BasicProxy: "",
    LoginProxy: "",
    MockLoginProxy: "",
    ImgUrlProxy: "",
    PersonalProxy: "",
    CustomProxy: "",
    PicProxy: "",
    WebsiteProxy: "",
    ErrorProxy: "",
    MyCourseClassProxy: "",
    XTestProxy: "/UserMgr/UserInfoMgr",
    Import: "",
    SysSettingProxy: "",
    tempSubsystemProxy: "",
    DataCollectorProxy: "",
    // v3.1
    UserInfoProxy_univ: "/UserMgr/UserInfoMgr",
    AdmClassProxy_univ: "/UserMgr/ClassMgr",

    RegisterProxy: "/UserMgr/UserInfoMgr",
    // DataCollectorProxy:"http://192.168.2.114:8090",
    RegisterNoTokenProxy: "/UserMgr/Mobile",

    //v3.1
    //学科
    SubjectManageProxy_univ: "",

    ScheduleManagerProxy_univ: "",

    ScheduleForAssiant_univ: "",

    CourseClassMoni: "/CourseClass/api",

    SystemSettingProxy_univ: "",
    SchoolSettingProxy_univ: "/SysMgr/Setting",
    DePartmentProxy_univ: "/UserMgr/OrganiztionMgr",
    AccessProxy_univ: "/SysMgr/Setting/Application",
    SubjectForAccessProxy_univ: "/SubjectResMgr/TextBookMgr",
    BaseApiProxy: "/BaseApi/UserMgr/UserInfoMgr",

    HashPrevProxy: RootUrl,
    ClassProxy: "/UserMgr/ClassMgr",

    NewCourseClass: RootUrl,

    UserPersonaProxy: RootUrl,

    UserScheduleProxy: RootUrl + "/Schedule/api/",

    GlobalProxy: "/Global",

    UserAccessProxy: "/UserMgr/PowerMgr/",

    SelectObjectProxy: "/UserMgr/SelectObject/",
    SubSystemProxy: "/SysMgr/Setting/SubSystem/",
    ModuleProxy: "/SysMgr/Setting/Module/",
    HolidayProxy: "/SysMgr/Setting/Holiday/",
  };
}

export default config;
