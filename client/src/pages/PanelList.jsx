import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

export default function PanelList({ theme }) {
  const { type } = useParams(); // nodejs, python, minecraft
  const navigate = useNavigate();
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("5");

  // Simuler récupération depuis API
  useEffect(() => {
    async function fetchPanels() {
      try {
        // Remplacer par ton API
        // const res = await axios.get(`/api/panels?type=${type}`);
        // setPanels(res.data);

        // Exemple statique
        setPanels([
          { id: 1, name: `${type.toUpperCase()} Panel 1`, ram: "1 Go", cpu: "40%", disk: "1000 MB" },
          { id: 2, name: `${type.toUpperCase()} Panel 2`, ram: "2 Go", cpu: "80%", disk: "2000 MB" },
          { id: 3, name: `${type.toUpperCase()} Panel 3`, ram: "Illimité", cpu: "Illimité", disk: "Illimité" },
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPanels();
  }, [type]);

  const handleNext = () => {
    if (!selectedPanel) return alert("Veuillez sélectionner un panel !");
    navigate("/checkout", {
      state: { panel: selectedPanel, duration: selectedDuration, type },
    });
  };

  return (
    <div className={`panel-list-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <h2>{type.toUpperCase()} Panels Disponibles</h2>
      <div className="cards-container">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`card ${selectedPanel?.id === panel.id ? "selected" : ""}`}
            onClick={() => setSelectedPanel(panel)}
          >
            <h3>{panel.name}</h3>
            <p><b>RAM :</b> {panel.ram}</p>
            <p><b>CPU :</b> {panel.cpu}</p>
            <p><b>Disk :</b> {panel.disk}</p>
          </div>
        ))}
      </div>

      <div className="selection">
        <label>
          Durée :
          <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
            <option value="5">5 jours</option>
            <option value="10">10 jours</option>
            <option value="15">15 jours</option>
            <option value="30">1 mois</option>
          </select>
        </label>
        <button onClick={handleNext}>Suivant → Paiement</button>
      </div>
    </div>
  );
}
