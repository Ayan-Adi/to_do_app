import React, { Component } from "react";
import axios from "axios";

class Get extends React.Component {
  constructor(props) {
    super(props);
    // this.onChangeUserName = this.onChangeUserName.bind(this);
    // this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      // username: "",
      // email: "",
    };
  }
  //Getting data
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
  //selectUser(_id) {}
  //Function to delete data
  deleteRow(_id, e) {
    axios
      .delete(
        `https://my-startup-mongodb-test.herokuapp.com/api/user/deleteData/${_id}`
      )

      .then((res) => {
        console.log(res);

        const data = this.state.data.filter((item) => item._id !== _id);

        this.setState({ data });

        alert("Data deleted Succesfully").catch((error) => {
          console.log(error);
        });
      });
  }
  // onChangeUserName(e) {
  //   this.setState({ username: e.target.value });
  // }

  // onChangeUserEmail(e) {
  //   this.setState({ email: e.target.value });
  // }

  // onUpdate(_id, e) {
  //   e.preventDefault();
  //   fetch(
  //     `https://my-startup-mongodb-test.herokuapp.com/api/user/putData/${_id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: this.state.username,
  //         email: this.state.email,
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => this.deleteRow(data._id, e)}
                  >
                    Delete
                  </button>
                </td>
                {/* <td>
                  <button
                    className="btn "
                    onClick={(e) => this.update(data._id, e)}
                  >
                    Edit
                  </button>
                </td> */}
              </tr>
            </tbody>
          </table>
          {/* <section>
            <div className="wrapper">
              <form>
                <div className="form-group">
                  <label> UserName</label>
                  <input
                    type="text"
                  Value={data.username}
                    onChange={(e) => this.onChangeUserName(e)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    defaultValue={data.email}
                    onChange={this.onChangeUserEmail}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="update"
                    onSubmit={(e) => this.onUpdate(data._id, e)}
                    className="btn btn-success btn-block"
                  />
                </div>
              </form>
            </div>
          </section> */}
        </div>
      ));
    }
  }
}
export default Get;
