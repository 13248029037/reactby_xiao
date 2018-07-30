import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Loading } from "./components/loading.jsx";
import ShowTip from "./components/showTip.jsx";

let loadings = [];

function showLoading() {
  let div = document.createElement("div");
  loadings.push(div);
  ReactDOM.render(<Loading />, div);
  document.body.appendChild(div);
  // setTimeout(() => {
  //   if(div){
  //   document.body.removeChild(div);
      
  //   }
  // }, 5000);
}

function removeLoading() {
  loadings.forEach(item => {
    document.body.removeChild(item);
  });
  loadings = [];
}

function showTip(params) {
  let obj = {};
  obj =
    typeof (params || " ") === "string"
      ? Object.assign(obj, {
          type: "danger",
          message: params
        })
      : Object.assign(obj, params);
  console.info(obj, "ibj");
  let div = document.createElement("div");
  ReactDOM.render(<ShowTip {...obj} />, div);
  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 2300);
}

Component.prototype.showTip = showTip;
Component.prototype.showLoading = showLoading;
Component.prototype.removeLoading = removeLoading;

console.info(Component.prototype,'ComponentComponentComponentComponentComponentComponentComponent');


class MyComponent extends Component{
        // constructor(props){
        //   super(props)
        //   this.state={}
        // }
      shouldComponentUpdate(nextProps,nextState){
        console.info('new Component')


       if(JSON.stringify(nextProps)!==JSON.stringify(this.props) || JSON.stringify(nextState)!==JSON.stringify(this.state)) {

        console.info('truetruetruetruetruetruetruetruetruetruetruetruetrue')
         return true;
       }else{
        console.info('falsefalsefalsefalsefalsefalsefalsefalsefalsefalsefalsefalse')
         
         return false;
       }
      }
}

Component.prototype.MyComponent=MyComponent;

