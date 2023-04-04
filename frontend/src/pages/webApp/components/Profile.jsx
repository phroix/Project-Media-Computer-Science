import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";
import "../css/Profile.css";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) getUserById();
  }, [loggedInUser]);

  const getUserById = () => {
    UserService.getUserById(loggedInUser.user_id)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const initUserUpdate = {
    user_id: null,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    is_admin: false,
  };

  const [userUpdate, setUserUpdate] = useState(initUserUpdate);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      setUserUpdate(initUserUpdate);
      setMessage("");
    }
  }, [submitted]);

  const handleUserUpdateInput = (event) => {
    const { name, value } = event.target;
    setUserUpdate({ ...userUpdate, [name]: value });
  };

  const updateUser = () => {
    var data = {
      username: userUpdate.username,
      password: userUpdate.password,
      firstname: userUpdate.firstname,
      lastname: userUpdate.lastname,
      email: userUpdate.email,
    };

    if (
      data.username === "" &&
      data.password === "" &&
      data.firstname === "" &&
      data.lastname === "" &&
      data.email === ""
    ) {
      setMessage(`Keine Daten eingegeben`);
      return;
    }

    for (let key in data) {
      if (data[key] === "") {
        data[key] = userUpdate.key;
      }
    }

    UserService.updateUser(currentUser.user_id, data)
      .then((response) => {
        setSubmitted(true);
        setMessage("Deine Daten wurden erfolgreich geändert!");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // newUser();
  };

  const handeOkButton = () => {
    setSubmitted(false);
    window.location.reload(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-h1">PROFIL BEARBEITEN</h1>
      <div className="profileinput-container">
        {currentUser && (
          <div className="submit-form">
            {message && <div className="text-black mh-massage">{message}</div>}
            {submitted ? (
              <div className="flex justify-center">
                <button className="mh-button" onClick={handeOkButton}>
                  OK
                </button>
              </div>
            ) : (
              <div className="profile-input-container">
                <div className="profile-single-input">
                  <p className="profile-p">{currentUser.username}</p>
                  <input
                    type="text"
                    className="profile-mh"
                    placeholder="Username"
                    id="username"
                    required
                    value={userUpdate.username}
                    onChange={handleUserUpdateInput}
                    name="username"
                  />
                </div>
                <div className="profile-single-input">
                  <div className="profile-p"> ********** </div>
                  <input
                    type="text"
                    className="profile-mh"
                    placeholder="Passwort"
                    id="password"
                    required
                    value={userUpdate.password}
                    onChange={handleUserUpdateInput}
                    name="password"
                  />
                </div>
                <div className="profile-single-input">
                  <p className="profile-p">{currentUser.firstname}</p>
                  <input
                    type="text"
                    className="profile-mh"
                    placeholder="Vorname"
                    id="firstname"
                    required
                    value={userUpdate.firstname}
                    onChange={handleUserUpdateInput}
                    name="firstname"
                  />
                </div>
                <div className="profile-single-input">
                  <p className="profile-p">{currentUser.lastname}</p>

                  <input
                    className="profile-mh"
                    type="text"
                    placeholder="Nachname"
                    id="lastname"
                    name="lastname"
                    value={userUpdate.lastname}
                    onChange={handleUserUpdateInput}
                    required
                  />
                </div>
                <div className="profile-single-input">
                  <p className="profile-p">{currentUser.email}</p>
                  <input
                    className="profile-mh"
                    type="text"
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    value={userUpdate.email}
                    onChange={handleUserUpdateInput}
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button onClick={updateUser} className="mh-button">
                    ÄNDERN
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="alert alert-danger" role="alert"></div>
      </div>
    </div>
  );
}

export default Profile;
