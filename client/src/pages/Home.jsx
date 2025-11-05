import React, { useEffect, useState } from 'react'
import PanelCard from '../components/PanelCard'
import CreatePanel from '../components/CreatePanel'
import ScrollReveal from 'scrollreveal'

const presets = [
  { name: 'Panel Node.js', ram: '1 Go', cpu: '40%', disk: '1000 MB', price: 5 },
  { name: 'Panel Python', ram: '2 Go', cpu: '50%', disk: '2000 MB', price: 7 },
  { name: 'Minecraft', ram: '4 Go', cpu: '70%', disk: '10000 MB', price: 12 },
  { name: 'Illimité', ram: '∞', cpu: '∞', disk: '∞', price: 30 }
]

export default function Home(){
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    ScrollReveal().reveal('[data-sr]', { distance: '20px', duration: 700, easing: 'ease-in-out', interval: 100 })
  },[])

  return (
    <div>
      <div className="panel-hero">
        <div className="hero-card" data-sr>
          <h2>LORD OBITO TECH STORE PANEL</h2>
          <p className="small">Panels pour Node.js, Python, Minecraft et solutions personnalisées. Choisis ta ressource (1 Go → Illimité) et paye via PayPal.</p>
        </div>
        <div style={{width:320}} className="hero-card" data-sr>
          <h3>Offres rapides</h3>
          <ul>
            <li>1 Go — CPU 40% — Disk 1000 MB</li>
            <li>Options illimitées disponibles</li>
            <li>Paiement sécurisé via PayPal Business</li>
          </ul>
        </div>
      </div>

      <h2 style={{textAlign:'center', marginTop:20}}>Nos panels</h2>
      <div className="panel-grid">
        {presets.map(p => (
          <PanelCard key={p.name} {...p} onOrder={() => setSelected(p)} />
        ))}
      </div>

      <div id="form-target" style={{marginTop:30}}>
        <CreatePanel preset={selected} />
      </div>
    </div>
  )
}
