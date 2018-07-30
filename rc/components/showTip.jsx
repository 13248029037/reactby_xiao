import React, { Component } from "react";
import style from "./showTip.less";

export default class ShowTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.timer = setTimeout(() => {
      this.setState({
        show: false
      });
      clearTimeout(this.timer);
    }, 2000);

    console.info(this.props, "props5555555555555");
  }
  handleClick() {
    this.setState({
      show: false
    });
  }
  render() {
    let classnames =
      this.props.type == "danger"
        ? "iconfont icon-gantan " + " " + style.status
        : "iconfont icon-dui" + " " + style.status;
    let showclassname = "";
    {
      showclassname = this.state.show
        ? style.show
        : style.show + " " + style.hide;
    }
    {
      showclassname =
        this.props.type == "danger"
          ? showclassname + " " + style.danger
          : showclassname;
    }

    return (
     
      <div className={showclassname}>
        <span className={classnames} />
        <p className={style.content}>{this.props.message || "请求出错"}</p>
        <span
          onClick={this.handleClick.bind(this)}
          className={style.delete + " " + "iconfont icon-cuo"}
        />
      </div>
    );
  }
}
