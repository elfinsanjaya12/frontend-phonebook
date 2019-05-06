import React, { Component } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import axios from "../../axios";
import Swal from "sweetalert2";

class EditPhoneNumber extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone_number: "",
      contacts: []
    };
  }
  componentDidMount = () => {
    this.getData();
  };

  getData = id => {
    const contactId = this.props.match.params.id;
    axios
      .get(`contacts/${contactId}`)
      .then(res => {
        this.setState({
          name: res.data.data.name,
          phone_number: res.data.data.phone_number
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* validasi form */
  validate = () => {
    let { name, phone_number } = this.state;
    if (name === "") {
      return Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Nama is Required!"
      });
    }
    if (phone_number === "") {
      return Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Phone Number is Required!"
      });
    }
    return true;
  };

  /* this function save */
  handleSubmit = event => {
    const contactId = this.props.match.params.id;
    let { name, phone_number } = this.state;
    if (this.validate()) {
      axios
        .put(`contacts/${contactId}`, { name, phone_number })
        .then(res => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.props.history.push("/contacts");
        })
        .catch(err => {
          const message = err.response.data.message;
          this.setState({
            error: {
              status: true,
              message: message
            }
          });
        });
    }
    event.preventDefault();
  };

  render() {
    let { name, phone_number } = this.state;
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="col-md-6 offset-md-3">
          <BreadCrumb
            secondText="Contact"
            thirdText="Edit Contact"
            secondUrl="/contacts"
          />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nama</label>
              <input
                required
                name="name"
                type="text"
                value={name}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Masukan Nama"
              />
            </div>
            <div className="form-group">
              <label>No. Telp</label>
              <input
                required
                name="phone_number"
                type="number"
                value={phone_number}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Masukan Nomor Telpon"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPhoneNumber;
