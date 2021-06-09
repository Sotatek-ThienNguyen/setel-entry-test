import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import userAPI from "../../api/userAPI";
import Form from "react-bootstrap/Form";
import { setToken } from '../../utils/common';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      username: '',
      password: ''
    };
  }

  handeChange = (event) => {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState({ ...this.state, [fieldName]: fieldVal });
  };

  login = () => {
    var data = {
      username: this.state.username,
      password: this.state.password,
    };
    userAPI
      .login(data)
      .then((res) => {
        if (res.data.accessToken) {
          setToken(res.data.accessToken);
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err, "catch error when create order");
      });
  };


  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://www.setel.my/wp-content/uploads/2020/05/logo-Setel.svg"
              alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="User name"
                  onChange={this.handeChange.bind(this)}
                  defaultValue={this.state.username}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handeChange.bind(this)}
                  defaultValue={this.state.password}
                />
              </Form.Group>
            </Form>
            <Button className="w-100" onClick={this.login}>Submit</Button>
          
        </div>
      </div>
    );
  }
}
