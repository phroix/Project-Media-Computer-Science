import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../../services/auth.service";
import "../css/LoginRasp.css";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/german";

const required = (value) => {
  if (!value) {
    return <div className="text-red-600 text-xs">This field is required!</div>;
  }
};

const LoginRasp = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  const [layoutName, setLayoutname] = useState("");
  const [layoutName2, setLayoutname2] = useState("");

  const [keyboardVisibilityy1, setKeyboardVisibilityy1] = useState(false);
  const [keyboardVisibilityy2, setKeyboardVisibilityy2] = useState(false);

  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  console.log(currentUser);

  const onChangeUsername = (input) => {
    setInput(input);
    console.log("Input changed", input);
    setUsername(input);
  };

  const onChangePassword = (input2) => {
    setInput2(input2);
    console.log("Input2 changed", input2);
    setPassword(input2);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{enter}") handleEnter();
  };

  const handleEnter = () => {
    setKeyboardVisibilityy1(false);
    setKeyboardVisibilityy2(false);
  };
  const handleShift = () => {
    if (keyboardVisibilityy1 === true) {
      const LayoutNamee = layoutName;
      setLayoutname(LayoutNamee === "default" ? "shift" : "default");
    } else {
      const LayoutNameee = layoutName2;
      setLayoutname2(LayoutNameee === "default" ? "shift" : "default");
    }
  };

  const keyoboardvisibility1 = () => {
    setKeyboardVisibilityy2(false);
    setKeyboardVisibilityy1(true);
  };

  const keyoboardvisibility2 = () => {
    setKeyboardVisibilityy1(false);
    setKeyboardVisibilityy2(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/Raspberryhome");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

  const handleRfidLogin = (e) => {
    e.preventDefault();
    // Send an HTTP request to the backend to retrieve RFID data
    setModalOpen(true);
    fetch("http://localhost:5000/retrieve-rfid-data")
      .then((response) => response.json())
      .then((rfidData) => {
        // Check if the RFID ID was found in the database
        if ("error" in rfidData) {
          setMessage(rfidData.error);
        } else {
          AuthService.loginRFID(rfidData.user_data[3]).then(
            () => {
              navigate("/terminal");
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              setMessage(resMessage);
            }
          );
        }
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="loginRasp-container">
        <Form onSubmit={handleLogin} ref={form}>
          <h1 className="h1-loginRasp">Melde dich an</h1>

          <div className="box1-Rasp">
            <span className="text-center-Rasp"></span>
            {/* <input className='rounded-lg bg-gray-500  mt-2 p-1 focus:border-blure-500 focus:bg-gray-800 focus:outline-none text-white'  */}
            <div className="input-container-rasp">
              <Input
                className="inputs"
                type="text"
                name="username"
                placeholder="  username"
                value={input}
                //  onChange={onChangeUsername}
                validations={[required]}
                onFocus={keyoboardvisibility1}
              />
            </div>
          </div>

          <div>
            <div className="input-container-rasp">
              {/* <input className='rounded-lg bg-gray-500  mt-2 p-1 focus:border-blure-500 focus:bg-gray-800 focus:outline-none text-white'  */}
              <Input
                className="inputs"
                type="password"
                name="password"
                placeholder="  password"
                value={input2}
                //   onChange={onChangePassword}
                validations={[required]}
                onFocus={keyoboardvisibility2}
              />
              <div className="keyboard">
                {keyboardVisibilityy1 && (
                  <Keyboard
                    layoutName={layoutName}
                    onChange={onChangeUsername}
                    onKeyPress={onKeyPress}
                    {...layout}
                  />
                )}
                {keyboardVisibilityy2 && (
                  <Keyboard
                    layoutName={layoutName2}
                    onChange={onChangePassword}
                    onKeyPress={onKeyPress}
                    {...layout}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="loginRasp-button-div">
            <button className="loginRasp-button">
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div>
          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p>Bitte legen Sie den RFID-Chip auf.</p>
                {message && <p>{message}</p>}
                <div className="modal-close" onClick={handleCloseModal}>
                  <i className="fas fa-times" />
                </div>
              </div>
            </div>
          )}
          <button onClick={handleRfidLogin} className="rf-login-button">
            Rfid Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginRasp;
