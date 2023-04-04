import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Manage.css";
import { BsFillBagPlusFill, BsPersonLinesFill } from "react-icons/bs";

function Manage() {
  return (
    <div className="verwalten-container">
      <div className="icon-container1">
        <h1 className="h1-verwalten">Mitarbeiter Verwalten</h1>
        <div>
          {" "}
          <BsPersonLinesFill className="icon" />
        </div>
        <NavLink to="/manage/user">
          <button className="button-verwalten">get started</button>
        </NavLink>
      </div>

      <div className="icon-container2">
        <h1 className="h1-verwalten">Produkte Verwalten</h1>
        <div>
          {" "}
          <BsFillBagPlusFill className="icon" />{" "}
        </div>
        <NavLink to="/manage/products">
          <button className="button-verwalten">get started</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Manage;
