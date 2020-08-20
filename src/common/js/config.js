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

if (process.env.NODE_ENV === "development") {
  config = {
    name: "中小学一体化学科教育云",
    logo: logo,
    footer: "蓝鸽科技 版权所有",
    TokenProxy: "http://192.168.2.207:10108",
    // TokenProxy:'http://47.115.20.102:10102',
    SubjectProxy: "http://192.168.2.207:10108/Subject/api",
    CourseClassProxy: "http://192.168.2.207:10108/CourseClass/api",
    CourseClassMoni:
      "http://192.168.2.202:7300/mock/5e840cf6778fda11ec0febd2/courseClass",
    //CourseClassProxy:'http://192.168.2.202:7300/mock/5e840cf6778fda11ec0febd2/courseClass',
    MyCourseClassProxy: "http://192.168.2.207:10108",
    UserAccountProxy: "http://192.168.2.207:10108/UserMgr/UserAccount",
    TeachingSolutionProxy:
      "http://192.168.2.207:10108/SubjectResMgr/TeachingSolutionMgr/Teacher",
    AdmClassProxy: "http://192.168.2.207:10108",
    DeskTopProxy: "http://192.168.2.207:10108",
    // CustomProxy:"http://192.168.2.114:8090",
    PicProxy: "http://192.168.2.207:10108",

    CustomProxy: "http://192.168.2.207:10108",
    // WebsiteProxy:"http://192.168.2.114:8090",
    WebsiteProxy: "http://192.168.2.207:10108",
    ScheduleProxy: "http://192.168.2.207:10108",
    // ScheduleProxy:"http://47.115.20.102:10102",
    Xproxy: "http://192.168.2.207:10108/UserMgr/UserInfoMgr",
    PowerProxy: "http://192.168.2.207:10108/UserMgr/PowerMgr",
    // PowerProxy:'http://47.115.20.102:10102/UserMgr/PowerMgr',
    UserInfoProxy: "http://192.168.2.207:10108/UserMgr/UserInfoMgr",
    proxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    BasicProxy: "http://localhost:3000",
    LoginProxy: "http://192.168.129.2:10102",
    MockLoginProxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    PersonalProxy: "http://192.168.2.207:10108",
    ErrorProxy: "http://192.168.2.207:10108",
    XTestProxy: "http://192.168.2.207:10108/UserMgr/UserInfoMgr",
    Import: "http://192.168.2.207:10108",
    SysSettingProxy: "http://192.168.2.207:10108",
    ImgUrlProxy: "http://192.168.2.207:10108",
    // SysSettingProxy:'http://192.168.2.114:8090',
    tempSubsystemProxy:
      "http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example",
    DataCollectorProxy: "http://192.168.2.207:10108",
    // DataCollectorProxy:"http://192.168.2.114:8090",

    // v3.1
    UserInfoProxy_univ: "http://192.168.2.207:10108/UserMgr/UserInfoMgr",

    AdmClassProxy_univ: "http://192.168.2.207:10108/UserMgr/ClassMgr",

    RegisterProxy: "http://192.168.2.207:10108/UserMgr/UserInfoMgr",
    // DataCollectorProxy:"http://192.168.2.114:8090",
    RegisterNoTokenProxy: "http://192.168.2.207:10108/UserMgr/Mobile",

    //学科
    SubjectManageProxy_univ: "http://192.168.2.207:10108",

    ScheduleManagerProxy_univ: "http://192.168.2.207:10108",

    ScheduleForAssiant_univ:
      " http://192.168.2.202:7300/mock/5e7c57cc778fda11ec0febc9/web3.1/schedule",

    // SystemSettingProxy_univ:'http://192.168.2.202:7300/mock/5d77442ded0ccd1564c8df28/example',
    SystemSettingProxy_univ: "http://192.168.2.207:10108",
    // SystemSettingProxy_univ:'http://192.168.2.114:8090',

    SchoolSettingProxy_univ: "http://192.168.2.207:10108/SysMgr/Setting",
    // SchoolSettingProxy_univ:'http://192.168.2.207:10108/SysMgr/Setting',
    DePartmentProxy_univ: "http://192.168.2.207:10108/UserMgr/OrganiztionMgr",
    // AccessProxy_univ:'http://192.168.129.242:8035/SysMgr/Setting/Application',
    // AccessProxy_univ:'http://192.168.2.202:7300/mock/5d77442ded0ccd1564c8df28/example',
    AccessProxy_univ: "http://192.168.2.207:10108/SysMgr/Setting/Application",

    SubjectForAccessProxy_univ:
      "http://192.168.2.207:10108/SubjectResMgr/TextBookMgr",

    HashPrevProxy: RootUrl,
    ClassProxy: "http://192.168.2.207:10108/UserMgr/ClassMgr",
    BaseApiProxy: "http://192.168.2.207:10108/BaseApi/UserMgr/UserInfoMgr",

    //新版的教学班

    NewCourseClass: "http://192.168.2.207:10108",
  };
}

if (process.env.NODE_ENV === "production") {
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
    BasicProxy: "http://localhost:3000",
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
  };
}

export default config;
