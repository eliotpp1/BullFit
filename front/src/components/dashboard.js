import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [loadingContext, setLoadingContext] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/login/verify-token",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.valid) {
          setUsername(response.data.user.username);
          setLoadingContext(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du jeton :", error);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/getData?username=${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du tableau de bord :",
          error
        );
      }
    };

    fetchData();
  }, [username]);

  if (loadingContext) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="dashboard">
      <h3 className="dashboard__title">Tableau de bord</h3>
      {userData ? (
        <>
          <p className="dashboard__text">Bienvenue, {userData.username}!</p>
          <p className="dashboard__text">Vos données :</p>
          <ul className="dashboard__list">
            <li className="dashboard__list-item">ID: {userData._id}</li>
            <li className="dashboard__list-item">
              Nom d'utilisateur: {userData.username}
            </li>
            <li className="dashboard__list-item">
              Date de création: {new Date(userData.date).toLocaleString()}
            </li>
            <li className="dashboard__list-item">BMI: {userData.stats.bmi}</li>
            {userData.stats && (
              <>
                <li className="dashboard__list-item">
                  Mas: {JSON.stringify(userData.stats.mas)}
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
                        <td>{`${userData.stats.fc60} - ${userData.stats.fc65}`}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>65-75%</td>
                        <td>{`${userData.stats.fc65} - ${userData.stats.fc75}`}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>75-85%</td>
                        <td>{`${userData.stats.fc75} - ${userData.stats.fc85}`}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>85-95%</td>
                        <td>{`${userData.stats.fc85} - ${userData.stats.fc95}`}</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>95-100%</td>
                        <td>{`${userData.stats.fc95} - ${userData.stats.fc100}`}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </>
            )}
          </ul>
        </>
      ) : (
        <p className="dashboard__text">Aucune donnée disponible</p>
      )}
    </div>
  );
};

export default Dashboard;
