import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { connected, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false); // Ajout de l'état pour vérifier l'authentification

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get(
            "http://localhost:5000/login/verify-token",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.valid) {
            setAuthChecked(true);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Erreur de vérification du token :", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/users/getData?username=${username}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setData(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données du tableau de bord :",
            error
          );
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [authChecked, username]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <h3 className="dashboard__title">Tableau de bord</h3>
      <p className="dashboard__text">Bienvenue, {username}!</p>
      <div className="dashboard__content">
        {data && data.stats ? (
          <div className="dashboard__side">
            <div className="dashboard__list-item">
              Mas: {JSON.stringify(data.stats.mas)}
            </div>
            <div className="dashboard__list-item">
              <table className="dashboard__table">
                <thead className="dashboard__table-head">
                  <tr>
                    <th className="dashboard__table-header">Zone</th>
                    <th className="dashboard__table-header">Pourcentage</th>
                    <th className="dashboard__table-header">
                      Plage de fréquence cardiaque
                    </th>
                  </tr>
                </thead>
                <tbody className="dashboard__table-body">
                  <tr className="dashboard__table-row">
                    <td className="dashboard__table-cell">1</td>
                    <td className="dashboard__table-cell">60-65%</td>
                    <td className="dashboard__table-cell">{`${data.stats.fc60} - ${data.stats.fc65}`}</td>
                  </tr>
                  <tr className="dashboard__table-row">
                    <td className="dashboard__table-cell">2</td>
                    <td className="dashboard__table-cell">65-75%</td>
                    <td className="dashboard__table-cell">{`${data.stats.fc65} - ${data.stats.fc75}`}</td>
                  </tr>
                  <tr className="dashboard__table-row">
                    <td className="dashboard__table-cell">3</td>
                    <td className="dashboard__table-cell">75-85%</td>
                    <td className="dashboard__table-cell">{`${data.stats.fc75} - ${data.stats.fc85}`}</td>
                  </tr>
                  <tr className="dashboard__table-row">
                    <td className="dashboard__table-cell">4</td>
                    <td className="dashboard__table-cell">85-95%</td>
                    <td className="dashboard__table-cell">{`${data.stats.fc85} - ${data.stats.fc95}`}</td>
                  </tr>
                  <tr className="dashboard__table-row">
                    <td className="dashboard__table-cell">5</td>
                    <td className="dashboard__table-cell">95-100%</td>
                    <td className="dashboard__table-cell">{`${data.stats.fc95} - ${data.stats.fc100}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="dashboard__text">Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
