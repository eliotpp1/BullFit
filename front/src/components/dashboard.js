import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { username, connected } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!connected) {
      navigate("/login");
    }
  }, [connected, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/users/getData?username=${username}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du tableau de bord :",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h3 className="dashboard__title">Tableau de bord</h3>
      <p className="dashboard__text">Bienvenue, {username}!</p>
      <p className="dashboard__text">Vos données :</p>
      {data ? (
        <ul className="dashboard__list">
          <li className="dashboard__list-item">ID: {data._id}</li>
          <li className="dashboard__list-item">
            Nom d'utilisateur: {data.username}
          </li>
          <li className="dashboard__list-item">
            Date de création: {new Date(data.date).toLocaleString()}
          </li>
          {data.stats && (
            <>
              <li className="dashboard__list-item">
                Mas: {JSON.stringify(data.stats.mas)}
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
                      <td>{`${data.stats.fc60} - ${data.stats.fc65}`}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>65-75%</td>
                      <td>{`${data.stats.fc65} - ${data.stats.fc75}`}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>75-85%</td>
                      <td>{`${data.stats.fc75} - ${data.stats.fc85}`}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>85-95%</td>
                      <td>{`${data.stats.fc85} - ${data.stats.fc95}`}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>95-100%</td>
                      <td>{`${data.stats.fc95} - ${data.stats.fc100}`}</td>
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
