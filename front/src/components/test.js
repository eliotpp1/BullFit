import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié (a un jeton JWT valide)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Rediriger vers la page de connexion si aucun jeton n'est trouvé
    } else {
      // Charger les éléments et utilisateurs uniquement si l'utilisateur est authentifié
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
  }, [navigate]);

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

  const signIn = () => {
    navigate("/signin");
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
      <button onClick={signIn}>Sign In</button>
    </>
  );
};

export default Test;
