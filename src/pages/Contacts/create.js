import React, { Component } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import axios from "../../axios";
import Swal from "sweetalert2";

class AddPhoneNumber extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone_number: ""
    };
  }

  //function handlechange
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
    let { name, phone_number } = this.state;
    // console.log("tes");
    if (this.validate()) {
      axios
        .post(`contacts`, { name, phone_number })
        .then(res => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.props.history.push("/contacts");
        })
        .catch(err => {
          console.log(err);
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
            thirdText="Tambah Contact"
            secondUrl="/contacts"
          />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nama</label>
              <input
                name="name"
                type="text"
                value={name}
                required
                onChange={this.handleChange}
                className="form-control"
                placeholder="Masukan Nama"
              />
            </div>
            <div className="form-group">
              <label>No. Telp</label>
              <input
                name="phone_number"
                type="number"
                value={phone_number}
                onChange={this.handleChange}
                className="form-control"
                required
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

export default AddPhoneNumber;
