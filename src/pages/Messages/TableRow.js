import React, { Component } from "react";

class TableRow extends Component {
  render() {
    return (
      <tr className="text-center">
        <td>{this.props.no + 1}</td>
        <td>{this.props.data.message}</td>
        <td>{this.props.data.Contact.name}</td>
        <td>{this.props.data.Contact.phone_number}</td>
      </tr>
    );
  }
}

export default TableRow;
