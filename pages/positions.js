import App from "../components/App";
import Header from "../components/Header";
import React, { Component } from "react";
import Submit from "../components/Submit";
import TodoList from "../components/Todos";

export default class Positions extends Component {
  state = {};

  render() {
    // const { position } = this.state;
    // console.log("data", this.props.data);
    return (
      <App>
        <Header />

        <div className="container">
          <div>
            <Submit />
          </div>
          <div>
            <TodoList />
          </div>
        </div>
        <style jsx>{`
          .container > div {
            padding: 15px 0;
            font-weight: bold;
            font-size: 16px;
          }
        `}</style>
      </App>
    );
  }
}

// export default graphql(data, createPosition, {
//   props: ({mutate}) => ({
//     createPosition: (position) => mutate({
//       variables: {position},
//       update: (proxy, { data: {createPosition}}) => {
//         const data = proxy.readQuery({
//           query:
//         })
//       }
//     })
//   })
// })(Positions);
