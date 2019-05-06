import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
/* import axios */
import axios from "../../axios";
/*import components */
import BreadCrumb from "../../components/BreadCrumb";
/* import pages */
import TableRow from "./TableRow";
import DownloadExcell from "./DownloadExcell";
/* import redux */
import { connect } from "react-redux";
import { getContacts } from "../../store/actions/contact";
// userkey dan pass key
var userkey = "USERKEY";
var passkey = "PASSKEY";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      sisa: [],
      expired: []
    };
  }

  /* function handleChange */
  handleChange = e => {
    var { message } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    console.log(message);
  };

  /* function componentDodMount */
  componentDidMount() {
    /*get data contacts */
    this.props.getContacts();
    /* get data sisa kirim pesan */
    this.cekSisa();
  }

  // function looping data contact didalam database
  tabRow() {
    return this.props.contacts.map((object, index) => {
      // console.log(object);
      return <TableRow data={object} key={index} no={index} />;
    });
  }

  // function kirim pesan massal dan create message didalam database
  sendMessage = event => {
    var { message } = this.state;
    return this.props.contacts.map((data, index) => {
      var phone = data.phone_number;
      var ContactId = data.id;

      // function kirim pesan
      axios
        .get(
          `https://reguler.zenziva.net/apps/smsapi.php?userkey=${userkey}&passkey=${passkey}&nohp=${phone}&pesan=${message}`
        )
        .then(result => {
          // Swal.fire("Good job!", "You clicked the button!", "success");
          this.props.getContacts();
        })
        .catch(err => {
          console.log(err);
        });

      // axios kirim post pesan in database
      axios
        .post(`messages`, { message, ContactId })
        .then(res => {
          this.props.getContacts();
        })
        .catch(err => {
          console.log(err);
        });
      Swal.fire("Good job!", "You clicked the button!", "success");
      event.preventDefault();
    });
  };

  // function cek sisa kirim pesan massal
  cekSisa = () => {
    axios
      .get(
        `https://reguler.zenziva.net/apps/smsapibalance.php?userkey=${userkey}&passkey=${passkey}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          sisa: [res.data[69], res.data[70], res.data[71]],
          expired: [
            res.data[89],
            res.data[90],
            res.data[91],
            res.data[92],
            res.data[93],
            res.data[94],
            res.data[95],
            res.data[96],
            res.data[97],
            res.data[98],
            res.data[99],
            res.data[100]
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    var { message, sisa, expired } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <div className="alert alert-success" role="alert">
              <h5>
                NOTE : sisa kouta pengirim pesan anda: {sisa} dan waktu expired
                : {expired} !!!
              </h5>
            </div>
            <div className="alert alert-danger" role="alert">
              NOTE : ketika sudah mengirim pesan anda tidak boleh menghapus data
              nya
            </div>
            <BreadCrumb secondText="Contact" />
            <Link
              style={{ margin: "5px" }}
              className="btn btn-primary"
              to="/contact/create"
            >
              <i className="fas fa-plus" />
              Tambah
            </Link>
            <Link
              style={{ margin: "5px" }}
              className="btn btn-primary"
              to="/import"
            >
              <i className="fas fa-plus" />
              Import Excel
            </Link>
            <DownloadExcell />
            <br />
            <br />
            <form onSubmit={this.sendMessage}>
              <div className="form-group row">
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Masukan Pesan yang akan anda kirim ke semua kontak"
                    required
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    style={{ marginLeft: "20px" }}
                    className="btn btn-primary"
                  >
                    Kirim Pesan Masal
                  </button>
                </div>
              </div>
            </form>
            {/* <Import /> */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <td>No</td>
                    <td>Nama</td>
                    <td>No. Telp</td>
                    <td>Aksi</td>
                  </tr>
                </thead>
                <tbody />
                <tbody>{this.tabRow()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducers.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contact);
