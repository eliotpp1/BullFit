import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items: ", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  const addItem = () => {
    axios
      .post("http://localhost:5000/items/add", { name: newItem })
      .then(() => {
        setItems([...items, { name: newItem }]);
        setNewItem("");
      })
      .catch((error) => console.error("Error adding item: ", error));
  };

  const addUser = () => {
    axios
      .post("http://localhost:5000/users/add", {
        username: newUserName,
        password: newUserPassword,
      })
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
    </>
  );
};

export default App;
