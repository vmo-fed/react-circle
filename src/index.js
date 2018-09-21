import React from "react";
import ReactDOM from "react-dom";
import Circle  from '../build/ReactCircle';

class HelloMessage extends React.Component {
  render() {
    return (
      <Circle progress={90} strokeColor={['#05a', '#0a5']} />
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
