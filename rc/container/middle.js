import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getChannels } from "../redux/action.js";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {
    this.props.getChannels();
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <div style={{ height: "50px", lineHeight: "50px", backgroundColor: "red", cursor: "pointer" }} onClick={this.handleClick.bind(this)}>
          点击
        </div>
        <span style={{ display: "block", backgroundColor: "yellow" }}>middle</span>
        {
          (this.props.channels || []).map(item => <div>{item.name}</div>)
        }
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { channels: state.reducer.channels };
}
let action = {
  getChannels
};
// let action ={getChannels}
function mapDispatchToProps(dispatch) {
  let func = bindActionCreators(action, dispatch);
  return {
    ...func
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Middle);
