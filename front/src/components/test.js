import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authcontext";

const Test = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const navigate = useNavigate();
  const { connected, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!connected) {
      navigate("/login");
    } else {
      const token = localStorage.getItem("token");

      axios
        .get("http://localhost:5000/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setItems(response.data))
        .catch((error) => console.error("Error fetching items: ", error));

      axios
        .get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users: ", error));
    }
  }, [connected, navigate]);

  const addItem = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/items/add",
        { name: newItem },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setItems([...items, { name: newItem }]);
        setNewItem("");
      })
      .catch((error) => console.error("Error adding item: ", error));
  };

  const addUser = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/users/add",
        {
          username: newUserName,
          password: newUserPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUsers([...users, { username: newUserName }]);
        setNewUserName("");
        setNewUserPassword("");
      })
      .catch((error) => console.error("Error adding user: ", error));
  };

  return (
    <>
      <div>
        <h1>Item List</h1>
        <h1>{connected ? "toto" : "pas conecté"}</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
        <label>Username:</label>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

export default Test;
