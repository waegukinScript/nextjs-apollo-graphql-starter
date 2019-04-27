import React, { Component } from "react";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";

const data = gql`
  query {
    hello
    positions {
      position
    }
  }
`;
class Login extends Component {
  state = {
    data: this.props.data,
    name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { name, email, password } = this.state;

    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      const data = {
        email,
        name,
        password
      };
      console.log("data to be submitted ", data);
    }
  };

  render() {
    const { name, email, password } = this.state;
    console.log("data", this.props.data);
    return (
      <div className="container">
        <div>
          <div>
            <input
              onChange={this.handleChange}
              value={email}
              type="text"
              name="email"
              placeholder="email"
            />
          </div>
          <div>
            <input
              onChange={this.handleChange}
              value={name}
              type="text"
              name="name"
              placeholder="name"
            />
          </div>
          <div>
            <input
              onChange={this.handleChange}
              value={password}
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <button type="submit" onClick={this.onSubmit}>
            Submit
          </button>
        </div>
        <style jsx>{`
          .container > div {
            padding: 15px 0;
            font-weight: bold;
            font-size: 16px;
          }
          .container > div > div {
            padding: 10px 0;
          }
          input {
            border: 1px solid #dbdbdb;
            height: 35px;
            padding: 10px;
            box-sizing: border-box;
          }
          button {
            height: 35px;
            margin: 30px 0;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default graphql(data)(Login);
