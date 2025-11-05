import React from 'react'

export default function Footer(){
  const socials = [
    {name:'GitHub', url:'https://github.com/LORD-OBITO-DEV', icon:'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg'},
    {name:'YouTube', url:'https://youtube.com/lord_obito_tech_offc', icon:'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg'},
    {name:'Telegram', url:'https://t.me/Lord_obito_tech_official', icon:'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg'}
  ]
  return (
    <footer className="footer">
      <div>
        <strong>© {new Date().getFullYear()} LORD OBITO TECH</strong>
        <p className="small">LORD OBITO TECH STORE PANEL — Propulsé par LORD OBITO DEV</p>
      </div>
      <div className="socials" style={{marginTop:12}}>
        {socials.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
            <img src={s.icon} alt={s.name} />
          </a>
        ))}
      </div>
    </footer>
  )
}
