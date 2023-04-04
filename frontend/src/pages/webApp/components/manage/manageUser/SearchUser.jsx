import React, { useState, useEffect } from "react";
import UserService from "../../../../../services/user.service";
import AuthService from "../../../../../services/auth.service";

const Msuchen = () => {
  const currentUserLogedIn = AuthService.getCurrentUser();
  const [currentUserId, setCurrentUserId] = useState(
    currentUserLogedIn.user_id
  );

  const [users, setUsers] = useState([]); //all users (no admin role) from db
  const [currentUser, setCurrentUser] = useState(null); //currentUser when selected
  const [searchUsername, setSearchUsername] = useState(""); //username for specific user
  const [editSubmit, setEditSubmit] = useState(true); //editSubmit is for editing a user
  const [userUpdateSubmit, setUserUpdateSubmit] = useState(false); //if user selected, updateSubmit
  const [message, setMessage] = useState(""); //message for help

  useEffect(() => {
    setCurrentUserId(currentUserLogedIn.user_id);
    if (currentUserId) getUsersList();
  }, []);

  const initUserUpdate = {
    //model for updating user
    user_id: null,
    username: "",
    credits: "",
    firstname: "",
    lastname: "",
    email: "",
    is_admin: "",
  };

  const [userUpdate, setUserUpdate] = useState(initUserUpdate); //updated user

  const handleUpdateUserInput = (event) => {
    //handle input for user update
    const { name, value } = event.target;
    setUserUpdate({ ...userUpdate, [name]: value }); //gets from input with userUpdate the name & value

    let is_admin;
    if (name === "is_admin") {
      if (event.target.checked) {
        is_admin = true;
      } else {
        is_admin = false;
      }
      console.log(is_admin);
      setUserUpdate({ ...userUpdate, [name]: is_admin });
    }
  };

  const handleUpdateUserSubmit = () => {
    //if user selected edit button, setUserUpdateSubmit(true)
    setUserUpdateSubmit(true);
  };

  const handleBackToUsersSubmit = () => {
    //back to users list button
    setUserUpdateSubmit(false);
    getUsersList();
  };

  const onChangeSearchUsername = (event) => {
    //change searchedUsername
    const searchUsername = event.target.value;
    setSearchUsername(searchUsername);

    if (searchUsername === "") getUsersList();
  };

  const refreshActiveUser = () => {
    //refresh currentUser
    setCurrentUser(null);
    setEditSubmit(true);
  };

  const setActiveUser = (user) => {
    //set active user, currentSelectedUser
    setCurrentUser(user);
    setUsers([user]);
    setMessage("");
    setSearchUsername("");
    setEditSubmit(false);
  };

  const getUsersList = () => {
    //find all Users with noadmin role
    UserService.getUsersList()
      .then((response) => {
        setUsers(response.data);
        if (response.data !== 0) setMessage("Wähle ein User aus!");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshActiveUser();
  };

  const getUserByUsername = () => {
    if (searchUsername) setMessage("Wähle ein User aus!");
    UserService.getUserByUsername(searchUsername)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshActiveUser();
    setEditSubmit(true);
  };

  const deleteUser = () => {
    UserService.deleteUser(currentUser.user_id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    getUsersList();
    refreshActiveUser();
    window.location.reload(false);
  };

  const updateUser = () => {
    var credit =
      parseFloat(currentUser.credits) + parseFloat(userUpdate.credits);
    if (isNaN(credit)) credit = "";

    var data = {
      username: userUpdate.username,
      credits: credit,
      firstname: userUpdate.firstname,
      lastname: userUpdate.lastname,
      email: userUpdate.email,
      is_admin: userUpdate.is_admin,
    };

    for (let key in data) {
      if (data[key] === "") {
        data[key] = userUpdate.key;
      }
    }

    UserService.updateUser(currentUser.user_id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    getUsersList();
    refreshActiveUser();
    setUserUpdate(initUserUpdate);
    setUserUpdateSubmit(false);
    window.location.reload(false);
  };

  return (
    <div className="msuchen-container">
      <div className="text-zinc-50 text-2xl text-center ">
        MITARBEITER SUCHEN
      </div>

      <div className="ms-input-container">
        <input
          className="ms-input"
          placeholder="Name eingeben..."
          type="text"
          id="username"
          name="username"
          value={searchUsername}
          onChange={onChangeSearchUsername}
          required
        />
        <button className="mh-button" onClick={getUserByUsername}>
          Suchen
        </button>
        {message && <div className="text-message">{message}</div>}

        <table className="table-first">
          <thead>
            <tr>
              <th>Username</th>
              <th>Kredit</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Email</th>
              <th>Admin</th>
              {editSubmit && <th>Bearbeiten</th>}
            </tr>
          </thead>
          {users &&
            users.map((user) => (
              <tbody>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.credits.toFixed(2)}€ </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.is_admin + ""}</td>
                  {editSubmit && (
                    <td>
                      <span onClick={() => setActiveUser(user)}>
                        <i className="far fa-edit action mr-2"></i>
                      </span>
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
        </table>

        <div>
          {currentUser && userUpdateSubmit && (
            <div className="ms-text-container">
              <div className="">
                <input
                  className="ms-input-update"
                  placeholder="  Username"
                  name="username"
                  id="username"
                  required
                  value={userUpdate.username}
                  onChange={handleUpdateUserInput}
                />
              </div>
              <div>
                <input
                  className="ms-input-update"
                  placeholder="  Kredit"
                  name="credits"
                  id="credits"
                  required
                  value={userUpdate.credits}
                  onChange={handleUpdateUserInput}
                />
              </div>
              <div>
                <input
                  className="ms-input-update"
                  placeholder="  Vorname"
                  name="firstname"
                  id="firstname"
                  required
                  value={userUpdate.firstname}
                  onChange={handleUpdateUserInput}
                />
              </div>
              <div>
                <input
                  className="ms-input-update"
                  placeholder="  Nachname"
                  name="lastname"
                  id="lastname"
                  required
                  value={userUpdate.lastname}
                  onChange={handleUpdateUserInput}
                />
              </div>
              <div>
                <input
                  className="ms-input-update"
                  placeholder="  Email"
                  name="email"
                  id="email"
                  required
                  value={userUpdate.email}
                  onChange={handleUpdateUserInput}
                />
              </div>
              <div>
                <div className="mh-label">
                  <div className="mh-label-head">Admin</div>
                  <label className="toggler-wrapper style-3">
                    <input
                      type="checkbox"
                      id="is_admin"
                      name="is_admin"
                      defaultChecked={currentUser.is_admin}
                      value={userUpdate.is_admin}
                      onChange={handleUpdateUserInput}
                    />
                    <div className="toggler-slider">
                      <div className="toggler-knob"></div>
                    </div>
                  </label>
                </div>
              </div>
              <button className="mh-button" onClick={updateUser}>
                OK
              </button>
            </div>
          )}
          {!editSubmit && !userUpdateSubmit && (
            <div className="ms-button-container">
              <button className="mh-button" onClick={handleUpdateUserSubmit}>
                Bearbeiten
              </button>
              <button className="mh-button" onClick={deleteUser}>
                Löschen
              </button>

              {!editSubmit && (
                <button className="mh-button" onClick={handleBackToUsersSubmit}>
                  Zurück
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Msuchen;
