import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { connected, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  console.log(user);

  useEffect(() => {
    if (!connected) {
      console.log("You are not connected, redirecting to login page");
      navigate("/login"); // Redirect to login if not connected
    } else if (user) {
      setUsername(user.username);
    }
  }, [connected, navigate, user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/users/getData?username=${username}`
        );
        setUserData(response.data.user); // Assuming the response contains a user object
        console.log(response.data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du tableau de bord :",
          error
        );
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="dashboard">
      <h3 className="dashboard__title">Tableau de bord</h3>
      <p className="dashboard__text">Bienvenue, {user.username}!</p>
      <p className="dashboard__text">Vos données :</p>
      {user ? (
        <ul className="dashboard__list">
          <li className="dashboard__list-item">ID: {user._id}</li>
          <li className="dashboard__list-item">
            Nom d'utilisateur: {user.username}
          </li>
          <li className="dashboard__list-item">
            Date de création: {new Date(user.date).toLocaleString()}
          </li>
          {user.stats && (
            <>
              <li className="dashboard__list-item">
                Mas: {JSON.stringify(user.stats.mas)}
              </li>
              <li className="dashboard__list-item">
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Pourcentage</th>
                      <th>Plage de fréquence cardiaque</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>60-65%</td>
                      <td>{`${user.stats.fc60} - ${user.stats.fc65}`}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>65-75%</td>
                      <td>{`${user.stats.fc65} - ${user.stats.fc75}`}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>75-85%</td>
                      <td>{`${user.stats.fc75} - ${user.stats.fc85}`}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>85-95%</td>
                      <td>{`${user.stats.fc85} - ${user.stats.fc95}`}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>95-100%</td>
                      <td>{`${user.stats.fc95} - ${user.stats.fc100}`}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </>
          )}
        </ul>
      ) : (
        <p className="dashboard__text">Aucune donnée disponible</p>
      )}
    </div>
  );
};

export default Dashboard;
