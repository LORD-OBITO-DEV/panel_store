import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentButton from "../components/PaymentButton";
import "../styles.css";

export default function Checkout({ theme }) {
  const location = useLocation();
  const { panel, duration, type } = location.state || {};

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePayPal = () => {
    // Ici tu rediriges vers ton backend pour créer le paiement PayPal
    window.open(`https://ton-backend.com/api/paypal?panel=${panel.id}&duration=${duration}&email=${email}`, "_blank");
  };

  const handleWaveOrange = (service) => {
    alert(`Le paiement ${service} est en maintenance.\nVeuillez contacter l'administrateur via WhatsApp avec votre capture et votre panel choisi.`);
  };

  if (!panel) return <p>Erreur : aucun panel sélectionné.</p>;

  return (
    <div className={`checkout-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <h2>Finaliser votre achat</h2>
      
      <div className="panel-summary">
        <h3>{panel.name} ({type.toUpperCase()})</h3>
        <p><b>Capacité :</b> {panel.ram}, {panel.cpu}, {panel.disk}</p>
        <p><b>Durée :</b> {duration} jours</p>
      </div>

      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email :
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Mot de passe panel :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
      </form>

      <div className="payment-buttons">
        <PaymentButton type="paypal" onClick={handlePayPal} />
        <PaymentButton type="wave" onClick={() => handleWaveOrange("Wave")} />
        <PaymentButton type="orange" onClick={() => handleWaveOrange("Orange Money")} />
      </div>
    </div>
  );
}
