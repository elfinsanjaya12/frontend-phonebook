import React, { Component } from "react";

/*import components */
import BreadCrumb from "../../components/BreadCrumb";
/* import pages */
import TableRow from "./TableRow";
/* import redux */
import { connect } from "react-redux";
import { getMessage } from "../../store/actions/message";

class Message extends Component {
  /* function componentDodMount */
  componentDidMount() {
    /*get data messages */
    this.props.getMessage();
  }

  // function looping data contact didalam database
  tabRow() {
    return this.props.messages.map((object, index) => {
      // console.log(object);
      return <TableRow data={object} key={index} no={index} />;
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <BreadCrumb secondText="Message" />
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <td>No</td>
                    <td>Message</td>
                    <td>Nama</td>
                    <td>No. Telp</td>
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
  messages: state.messageReducers.messages
});

export default connect(
  mapStateToProps,
  { getMessage }
)(Message);
