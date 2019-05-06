import React from "react";
import ReactExport from "react-data-export";
import axios from "../../axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }
  componentDidMount() {
    axios
      .get(`contacts`)
      .then(res => {
        const { data } = res.data;
        this.setState({ contacts: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ExcelFile
        element={<button className="btn btn-success">Download Excel</button>}
      >
        <ExcelSheet data={this.state.contacts} name="Employees">
          <ExcelColumn label="Nama" value="name" />
          <ExcelColumn label="No. Telp" value="phone_number" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default Download;
