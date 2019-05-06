import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import axios from "../../axios";
import Swal from "sweetalert2";

class Import extends React.Component {
  handleSubmit = event => {
    const headers = {
      "content-type": "multipart/form-data"
    };
    var data = new FormData();
    data.append("file", document.getElementById("file").files[0]);
    axios
      .post(`contacts/excel`, data, { headers })
      .then(res => {
        Swal.fire("Good job!", "You clicked the button!", "success");
        return (window.location = "/contacts");
      })
      .catch(err => {
        const message = err.response.data.message;
        console.log(message);
      });
    event.preventDefault();
  };
  render() {
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="col-md-6 offset-md-3">
          <BreadCrumb
            secondText="Contact"
            thirdText="Tambah Contact Import Excel"
            secondUrl="/contacts"
          />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="file" className="form-control" id="file" />
              <span>*Hanya Menerima File Excell</span>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Import;
