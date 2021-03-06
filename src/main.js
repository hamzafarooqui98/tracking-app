import React from "react";

import createStore from "./Store/createStore";
import AppContainer from "./AppContainer/index";

export default class Root extends React.Component {
  renderApp() {
    const initialState = window.___INTITIAL_STATE__;
    const store = createStore(initialState);

    return <AppContainer store={store} />;
  }

  render() {
    return this.renderApp();
  }
}
