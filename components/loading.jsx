import React, { Component } from "react";
import style from "./loading.less";
console.info(style);
export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }
  handleClick() {
    this.setState({
      show: false
    });
  }
  render() {
    return this.state.show ? (
      <div className={style.loading} onClick={this.handleClick.bind(this)}>
        <span>wo shi loading....</span>
      </div>
    ) : null;
  }
}
