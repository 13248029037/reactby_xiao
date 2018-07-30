import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  Prompt
} from "react-router-dom";
import style from "./header.less";
import { data } from "../config";
console.info(data);
console.info(style);
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "/left"
    };

    console.info(  this.context,'fffffffffff')
  }
  handleClick(value) {
    console.info(value);
    this.setState({
      currentPath: value
    });
  }
  render() {
    return (
      <div className={style.head}>
        {data.map(item => {
          return (
            <Link
              className={style.span}
              onlyActiveOnIndex={true}
              activeStyle={{color:'green'}}
              to={item.path}
              style={
                this.state.currentPath == item.path
                  ? {
                      color: "red",
                      "textDecoration": "none",
                      "borderBottom": "10px solid #cfd0d0"
                    }
                  : { "textDecoration": "none" }
              }
              key={item.value}
              onClick={this.handleClick.bind(this, item.path)}
            >
              {item.value}
            </Link>
          );
        })}
      </div>
    );
  }
}
