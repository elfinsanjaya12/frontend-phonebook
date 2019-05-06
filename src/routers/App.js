import React from "react";
import Navbar from "../components/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import PhoneNumber from "../pages/Contacts";
import AddPhoneNumber from "../pages/Contacts/create";
import EditPhoneNumber from "../pages/Contacts/edit";
import Import from "../pages/Contacts/Import";
import Message from "../pages/Messages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contacts" exact component={PhoneNumber} />
        <Route path="/contact/create" exact component={AddPhoneNumber} />
        <Route path="/contact/:id" exact component={EditPhoneNumber} />
        <Route path="/import" exact component={Import} />
        <Route path="/messages" exact component={Message} />
      </Switch>
    </div>
  );
}

export default App;
