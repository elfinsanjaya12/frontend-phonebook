import React, { Component } from "react";

import axios from "../../axios";
import Swal from "sweetalert2";

class TableRow extends Component {
  /* function delete */
  handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result) {
        axios
          .delete(`contacts/${id}`)
          .then(res => {
            Swal.fire("Good job!", "You clicked the button!", "success");
            return (window.location = "/contacts");
          })
          .catch(err => console.log(err));
      }
    });
  };
  handleEdit = id => {
    return (window.location = `/contact/${id}`);
  };
  render() {
    return (
      <tr className="text-center">
        <td>{this.props.no + 1}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.phone_number}</td>
        <td className="text-center">
          <button
            className="btn btn-success"
            onClick={() => {
              this.handleEdit(this.props.data.id);
            }}
          >
            Ubah
          </button>
          <button
            type="submit"
            style={{
              margin: "5px"
            }}
            onClick={() => {
              this.handleDelete(this.props.data.id);
            }}
            className="btn btn-danger"
          >
            Hapus
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
