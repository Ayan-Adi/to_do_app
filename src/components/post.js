// ** create-user.component.js ** //
import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
    };
  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value });
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      username: this.state.username,
      email: this.state.email,
    };

    axios
      .post(
        "https://my-startup-mongodb-test.herokuapp.com/api/user/userData",
        userObject
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ username: "", email: "" });
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> UserName</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.onChangeUserName}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.onChangeUserEmail}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-success btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Post;
