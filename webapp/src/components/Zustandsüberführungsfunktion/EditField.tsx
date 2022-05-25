import { Component } from "react";

export default class Editfield extends Component<{}> {
  renderButton() {
    return <div>PopUp</div>;
  }

  render() {
    return <div>{this.renderButton}</div>;
  }
}
