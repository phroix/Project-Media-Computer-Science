import React from "react";
import SearchUser from "./SearchUser";
import CreateUser from "./CreateUser";
import "../../../css/ManageUser.css";

const ManageUser = () => {
  return (
    <div className="mverwalten-container">
      <h1 className="h1-mverwalten">VERWALTEN - MITARBEITER</h1>
      <div className="component-container-mitarbeiter">
        <CreateUser className="mhinzu"></CreateUser>
        <SearchUser className="msuchen"></SearchUser>
      </div>
    </div>
  );
};

export default ManageUser;
