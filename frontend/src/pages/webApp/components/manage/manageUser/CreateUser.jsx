import React, { useState } from "react";
import UserService from "../../../../../services/user.service";

const CreateUser = () => {
  const initUserCreate = {
    user_id: null,
    firstname: "",
    lastname: "",
    email: "",
    is_admin: false,
  };

  const [userCreate, setUserCreate] = useState(initUserCreate);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCreateUserInput = (event) => {
    const { name, value } = event.target;
    setUserCreate({ ...userCreate, [name]: value });

    let is_admin;
    if (name == "is_admin") {
      if (event.target.checked) {
        is_admin = true;
      } else {
        is_admin = false;
      }
      setUserCreate({ ...userCreate, [name]: is_admin });
    }
  };

  const createUser = () => {
    var data = {
      firstname: userCreate.firstname,
      lastname: userCreate.lastname,
      email: userCreate.email,
      is_admin: userCreate.is_admin,
    };

    if (
      data.firstname === "" &&
      data.lastname === "" &&
      data.email === "" &&
      data.is_admin === false
    ) {
      setMessage(`Keine Daten`);
      return;
    }

    UserService.create(data)
      .then((response) => {
        setSubmitted(true);
        setMessage("Der User wurde erfolgreich angelegt!");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // newUser();
  };

  const saveNewUser = () => {
    setUserCreate(initUserCreate);
    setMessage("");
    setSubmitted(false);
    window.location.reload(false);
  };

  return (
    <div className="mhinzu-container">
      <div className=" text-zinc-50 text-2xl text-center ">
        MITARBEITER HINZUFÜGEN
      </div>
      <div className="submit-form">
        {message && <div className="mh-massage">{message}</div>}
        {submitted ? (
          <div className="flex justify-center">
            <button className="mh-button" onClick={saveNewUser}>
              Zurück
            </button>
          </div>
        ) : (
          <div className="mh-input-container-mitarbeiter">
            <input
              type="text"
              className="mh-input"
              placeholder="Vorname"
              id="firstname"
              required
              value={userCreate.firstname}
              onChange={handleCreateUserInput}
              name="firstname"
            />

            <input
              className="mh-input"
              type="text"
              placeholder="Nachname"
              id="lastname"
              name="lastname"
              value={userCreate.lastname}
              onChange={handleCreateUserInput}
              required
            />

            <input
              className="mh-input"
              type="text"
              placeholder="E-mail"
              id="email"
              name="email"
              value={userCreate.email}
              onChange={handleCreateUserInput}
              required
            />
            <div>
              <div className="mh-label">
                <div className="mh-label-head">Admin</div>
                <label className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="is_admin"
                    name="is_admin"
                    defaultChecked={false}
                    value={userCreate.is_admin}
                    onChange={handleCreateUserInput}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={createUser} className="mh-button">
                HINZUFÜGEN
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="alert alert-danger" role="alert"></div>
      </div>
    </div>
  );
};

export default CreateUser;
