import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../../services/auth.service";
import "../css/Login.css";

const required = (value) => {
  if (!value) {
    return <div className="text-red-600 text-xs">This field is required!</div>;
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/");
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

  return (
    <div className="login-container">
      <div className="container-left">
        <h1 className="h1-login">
          connect with
          <br />
          your Team
        </h1>
        <span className="p">
          {" "}
          "Die Smarte-Kasse ist ein System, das Ihnen erlaubt, eine Caffè-Liste
          zu führen, <br /> sein Geld aufzuladen und andere Produkte zu kaufen"
        </span>
      </div>

      <div className="container-rigth ">
        <Form onSubmit={handleLogin} ref={form} className="login-form">
          <h2 className="h2-login">Melde dich an</h2>

          <div className="box1">
            <form>
              <div className="input-container">
                <Input
                  className="inputs"
                  type="text"
                  name="username"
                  placeholder="  username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
            </form>
          </div>

          <div className="box2">
            <form>
              <div className="input-container">
                <Input
                  className="inputs"
                  type="password"
                  name="password"
                  placeholder="  password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
            </form>
          </div>

          <div className="login-button-div">
            <button className="login-button">
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
      </div>
    </div>
  );
};

export default Login;
