import { SYSTEM_WEB_URL_UPDATE } from "../../actions/systemUrlActions";

//目标用户的用户ID和用户类型

const defaultState = {
  Urls: {
    //小助手
    200: { SysID: "200", WebUrl: "", WsUrl: "" },

    //宿舍管理
    E48: { SysID: "E48", WebUrl: "", WsUrl: "" },

    //教学方案
    310: { SysID: "310", WebUrl: "", WsUrl: "" },

    //电子资源

    C10: { SysID: "C10", WebUrl: "", WsUrl: "" },

    //李萌芽项目组
    E34: { SysID: "E34", WebUrl: "", WsUrl: "" },//大学版暂时不用，后面

    //精品课程

    D21: { SysID: "D21", WebUrl: "", WsUrl: "" },

    // 学生成绩
    810: { SysID: "810", WebUrl: "", WsUrl: "" },

    //ai大数据

    860: { SysID: "860", WebUrl: "", WsUrl: "" },
    // 教学方案
    300: { SysID: "300", WebUrl: "", WsUrl: "" },

    // 学生成绩
    //AI教材
    930: { SysID: "930", WebUrl: "", WsUrl: "" },
    //课前预习
    630: { SysID: "630", WebUrl: "", WsUrl: "" },
    //课后作业
    510: { SysID: "510", WebUrl: "", WsUrl: "" },
    //过关计划
    627: { SysID: "627", WebUrl: "", WsUrl: "" },
    //课外计划
    624: { SysID: "624", WebUrl: "", WsUrl: "" },
    //电子素材
    629: { SysID: "629", WebUrl: "", WsUrl: "" },
    //教学方案
    S14: { SysID: "S14", WebUrl: "", WsUrl: "" },
    //师资发展
    L10: { SysID: "L10", WebUrl: "", WsUrl: "" },
  },

  ModuleRely: {
    archives: ["E34"],
    schoolLife: ["860"],
    StuResult: ["810"],
    StuQuality: ["810"],
    MoralEdu: ["E34"],
    TeaWork: ["E34"],
    TeaMaterial: ["C10", "D21", "310", "930", "S14"],
  },
};

const systemUrl = (state = defaultState, actions) => {
  switch (actions.type) {
    case SYSTEM_WEB_URL_UPDATE:
      return { ...state, Urls: { ...state.Urls, ...actions.data } };

    default:
      return state;
  }
};
export default systemUrl;
