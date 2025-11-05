import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import "../styles.css";
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import nodejsImg from "../assets/nodejs.png";
import pythonImg from "../assets/python.png";
import minecraftImg from "../assets/minecraft.png";

export default function Home({ theme }) {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal(".sr-card", {
      duration: 1000,
      distance: "50px",
      origin: "bottom",
      easing: "ease-in-out",
      interval: 200,
    });
  }, []);

  const panels = [
    { name: "Node.js", img: nodejsImg, type: "nodejs" },
    { name: "Python", img: pythonImg, type: "python" },
    { name: "Minecraft", img: minecraftImg, type: "minecraft" },
  ];

  const members = [
    { name: "LORD OBITO DEV", role: "Fondateur", img: member1, contact: "https://wa.me/2250712668494" },
    { name: "Membre 2", role: "Co-Fondateur", img: member2, contact: "mailto:member2@example.com" },
    { name: "Membre 3", role: "Co-Fondateur", img: member3, contact: "mailto:member3@example.com" },
  ];

  return (
    <div className={`home-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <section className="hero">
        <h1>LORD OBITO TECH STORE PANEL</h1>
        <p>Créez vos panels facilement et rapidement avec nous 🚀</p>
      </section>

      <section className="services">
        <h2>Nos Panels</h2>
        <div className="cards-container">
          {panels.map((panel) => (
            <div className="card sr-card" key={panel.name}>
              <img src={panel.img} alt={panel.name} />
              <h3>{panel.name}</h3>
              <button onClick={() => navigate(`/panels/${panel.type}`)}>Voir panels</button>
            </div>
          ))}
        </div>
      </section>

      <section className="members">
        <h2>Membres de LORD OBITO TECH</h2>
        <div className="cards-container">
          {members.map((member) => (
            <div className="card sr-card" key={member.name}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={member.contact} target="_blank" rel="noopener noreferrer">
                Contacter
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="trust">
        <h2>Pourquoi nous faire confiance ?</h2>
        <ul>
          <li>Panels sécurisés et fiables</li>
          <li>Support rapide via WhatsApp</li>
          <li>Gestion automatique des ressources</li>
        </ul>
      </section>
    </div>
  );
              }
