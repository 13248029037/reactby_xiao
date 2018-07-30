import reducer2 from "./reducer2";
import { combineReducers } from "redux";

let initialState = {
  //初始化状态
  citys: [],
  channels: [],
  // name: ["xiaoshulin"]
};

function reducer(state=initialState , action = {}) {
  const { type, payload } = action;
  console.info(...state, "state");
  console.info(...action, "action");
  switch (type) {
    case "getCitys":
      return { ...state, ...payload };
    case "getChannels":
      return { ...state, ...payload };
      default: return state
  }
}

const mianReducer = combineReducers({
  reducer,
  reducer2
});

export default mianReducer;
