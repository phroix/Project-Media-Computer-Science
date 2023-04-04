import React, { useState, useEffect, Redirect } from "react";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import "../css/Rasphome.css";

const Rasphome = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user.rfid) {
      setShouldRedirect(true);
    } else {
      setCurrentUser(user);
      setCheck(true);
    }
  }, [currentUser]);

  const sendDataToPython = () => {
    axios
      .post("http://localhost:5000/process-data", currentUser)
      .then((response) => {
        setShouldRedirect(true);
        setCheck(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(currentUser);

  return (
    <div>
      {shouldRedirect && (window.location.href = "/terminal")}
      <div>
        {check && (
          <div className="scan-container">
            <h1 className="h1-scan">RFID SCAN</h1>
            <div className="div-scan">
              Lege den Chip jetzt auf den Scanner und drücke dann den scannen
              Button
            </div>
            <div className="rfid-icon" />
            <div className="center-container">
              <button onClick={sendDataToPython} className="button-scan">
                scannen
              </button>
              <a className="a" href="/terminal">
                <button className="button-continue">
                  continue without scan
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rasphome;
