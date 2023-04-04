import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Menubar from "./pages/menubar/components/Menubar";
import Home from "./pages/webApp/components/Home";
import AboutUs from "./pages/webApp/components/AboutUs";
import Login from "./pages/webApp/components/Login";
import Manage from "./pages/webApp/components/manage/Manage";
import Orders from "./pages/webApp/components/Orders";
import ManageUser from "./pages/webApp/components/manage/manageUser/ManageUser";
import ManageProduct from "./pages/webApp/components/manage/manageProduct/ManageProduct";
import Profile from "./pages/webApp/components/Profile";
import LoginRasp from "./pages/raspi/components/LoginRasp";
import Rasphome from "./pages/raspi/components/Rasphome";
import TMain from "./pages/raspi/components/TerminalMain";
// import RFIDScan from "./pages/Raspi/RFIDscan";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/loginRasp" element={<LoginRasp />} />
          <Route path="/raspberryHome" element={<Rasphome />}>
            {" "}
          </Route>
          <Route path="/terminal" element={<TMain />} />
          {/* <Route path="/rfidscan" element={<RFIDScan />} /> */}
          <Route path="/*" element={<Menubar />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/manage/products" element={<ManageProduct />} />
          <Route path="/manage/user" element={<ManageUser />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
