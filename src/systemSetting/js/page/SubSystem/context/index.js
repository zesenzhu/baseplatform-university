import { createContext } from "react";
import staticData from "./staticData";
// 创建上下文
export const Context = createContext(null);

// 初始数据
export const initState = {
  ...staticData,
};

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
