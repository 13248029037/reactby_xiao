import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  Prompt
} from "react-router-dom";
import { Header } from "./components/header.jsx";
import { data } from "./config";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  getChildContext() {
    return { color: "purple" };
  }
  render() {
    console.info(this.context, "props");

    return (
      <div>
        <Router>
          <div>
            <Header />
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                backgroundColor: "skyblue"
              }}
            >
              <div>
                <Switch>
                  {data.map(item => {
                    return (
                      <Route
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    );
                  })}
                  {<Redirect from="*" to="/left" />}
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
App.contextTypes = {
  store: PropTypes.object
};
App.childContextTypes = {
  color: PropTypes.string
};
