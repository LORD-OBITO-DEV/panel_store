import React, { useState } from 'react'
import PaymentButton from './PaymenttButton'

export default function CreatePanel({ preset }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [panelName, setPanelName] = useState(preset?.name || '')
  const [duration, setDuration] = useState(30)
  const [email, setEmail] = useState('')
  const [ram, setRam] = useState(preset?.ram || '1 Go')
  const [cpu, setCpu] = useState(preset?.cpu || '40%')
  const [disk, setDisk] = useState(preset?.disk || '1000 MB')
  const [price, setPrice] = useState(preset?.price || 5)
  const [panelId, setPanelId] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/panel/create', {
      method:'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, password, panelName, duration, email, ram, cpu, disk, price })
    })
    const json = await res.json()
    if(json.success) setPanelId(json.panelId || json.panel?.server?.id || 'tmp-'+Date.now())
    else alert('Erreur lors de la création (voir console)')
  }

  return (
    <div style={{maxWidth:700, margin:'auto'}}>
      <h2>Configurer votre panel</h2>
      <form className="form" onSubmit={handleCreate}>
        <input placeholder="Nom d'utilisateur" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
        <input placeholder="Nom du panel" value={panelName} onChange={e=>setPanelName(e.target.value)} required />
        <select value={duration} onChange={e=>setDuration(Number(e.target.value))}>
          <option value={5}>5 jours</option>
          <option value={15}>15 jours</option>
          <option value={30}>1 mois</option>
        </select>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <p className="small">Choix ressources (1 Go par défaut / ou "unlimited")</p>
        <input placeholder="RAM (ex: 1 Go ou unlimited)" value={ram} onChange={e=>setRam(e.target.value)} />
        <input placeholder="CPU (ex: 40% or unlimited)" value={cpu} onChange={e=>setCpu(e.target.value)} />
        <input placeholder="Disk (ex: 1000 MB or unlimited)" value={disk} onChange={e=>setDisk(e.target.value)} />
        <p>Prix estimé: ${price}</p>
        <button className="btn" type="submit">Sauvegarder et payer</button>
      </form>

      {panelId && (
        <div style={{marginTop:16}}>
          <p>Panél provisoire créé. ID: {panelId}</p>
          <PaymentButton price={price} panelId={panelId} />
          <div style={{marginTop:8}}>
            <button className="btn" onClick={()=>alert('Wave / Orange en maintenance. DM sur WhatsApp')}>Payer par Wave / Orange</button>
          </div>
        </div>
      )}
    </div>
  )
    }
