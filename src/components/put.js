import React, { Component } from "react";

class Put extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: "",
      _id: "",
      email: "",
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://my-startup-mongodb-test.herokuapp.com/api/user")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("https://my-startup-mongodb-test.herokuapp.com/api/user/userData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch(
      "https://my-startup-mongodb-test.herokuapp.com/api/user/putData",
      this.userObject,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          _id: this.state._id,
          username: this.state.username,
          email: this.state.email,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(
      `https://my-startup-mongodb-test.herokuapp.com/api/user/deleteData/${this.state._id}`,
      {
        method: "DELETE",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return data.map((data) => (
        <div key={data._id}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>username</th>

                <th>email</th>

                <th>Delete</th>

                {/* <th>Edit</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {data.email}</td>
                <td>{data.username}</td>
              </tr>
            </tbody>
          </table>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h1 className="display-4 text-center">
                  Make An API Call in React
                </h1>
                <form className="d-flex flex-column">
                  <legend className="text-center">
                    Add-Update-Delete Friend
                  </legend>
                  <label htmlFor="name">
                    Friend Name:
                    <input
                      name="username"
                      id="username"
                      type="text"
                      className="form-control"
                      value={this.state.username}
                      onChange={(e) =>
                        this.handleChange({ username: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label htmlFor="email">
                    Friend email:
                    <input
                      name="email"
                      id="email"
                      type="test"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) =>
                        this.handleChange({ email: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label htmlFor="_id">
                    Friend ID:
                    <input
                      name="_id"
                      id="_id"
                      type="text"
                      className="form-control"
                      value={this.state._id}
                      onChange={(e) =>
                        this.handleChange({ _id: e.target.value })
                      }
                    />
                  </label>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => this.create(e)}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={(e) => this.update(e)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={(e) => this.delete(e)}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  }
}

export default Put;
