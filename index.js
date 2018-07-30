import React, { Component } from "react";
import ReactDom from "react-dom";
import './rem.js';
import { Button } from "antd";
import "./init.css";
import "./initGlobalPlugin";
import { App } from "./APP.jsx";
import API from "./API";
import "./lib/iconfont/iconfont.css"; 
import { Provider } from "react-redux";
import store from "./redux/store";



import  action from "./redux/action.js";

console.info(action,'action')


console.info(Component.prototype,'ComponentComponentComponent')

window.store=store;


const app = ReactDom.render(
  <Provider store={store}>
      <App />
    </Provider>

, document.getElementById("app"));


console.info(app,'appappappappappappappapp')


// window.VM=app;
export default app;

if (module.hot) {
  module.hot.accept();
}
