import React from 'react'

export default function PanelCard({ name, ram, cpu, disk, price, onOrder }){
  return (
    <div className="card" data-sr>
      <h3>{name}</h3>
      <p>💾 RAM: {ram}</p>
      <p>⚙️ CPU: {cpu}</p>
      <p>📦 Disk: {disk}</p>
      <h4 style={{marginTop:10}}>${price} / mois</h4>
      <div style={{marginTop:12}}>
        <button className="btn" onClick={onOrder}>Commander</button>
      </div>
    </div>
  )
}
