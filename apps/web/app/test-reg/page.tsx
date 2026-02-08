"use client"
import { useState } from "react"

export default function TestRegPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("")

  const test1 = () => {
    setCount(count + 1)
    alert("FUNCIONOU! Clique numero " + (count + 1))
  }

  const test2 = async () => {
    if (!name || !email || !password) {
      alert("Preencha todos os campos!")
      return
    }
    setMsg("Chamando proxy...")
    
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          endpoint: '/auth/register',
          method: 'POST',
          data: { email, password, name }
        })
      })
      
      const data = await res.json()
      
      if (res.ok && data.user) {
        const msg = "SUCESSO! " + data.user.name + " - Saldo: R$" + data.user.balance
        alert(msg)
        setMsg(msg + " | Token salvo!")
        localStorage.setItem('auth_token', data.access_token)
      } else {
        const errMsg = "Erro: " + (data.message || data.error || JSON.stringify(data))
        alert(errMsg)
        setMsg(errMsg)
      }
    } catch (e: any) {
      alert("Erro: " + e.message)
      setMsg("Erro: " + e.message)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '5px', color: '#333' }}>TESTE REGISTRO v3</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>Cliques: {count}</p>
        
        <div style={{ background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', padding: '25px', margin: '20px 0', border: '4px solid #facc15', borderRadius: '12px' }}>
          <h2 style={{ marginTop: 0, fontSize: '20px', color: '#854d0e' }}>AREA DE TESTES</h2>
          
          <button 
            onClick={test1} 
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: '#eab308', 
              border: 'none', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '20px', 
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            TESTE 1 - CLIQUE ({count})
          </button>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#422006' }}>Nome:</label>
            <input 
              type="text" 
              placeholder="Seu nome completo" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              style={{ width: '100%', padding: '12px', fontSize: '15px', border: '2px solid #ca8a04', borderRadius: '6px', background: '#fffbeb' }} 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#422006' }}>Email:</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '12px', fontSize: '15px', border: '2px solid #ca8a04', borderRadius: '6px', background: '#fffbeb' }} 
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#422006' }}>Senha:</label>
            <input 
              type="password" 
              placeholder="Min 6 char, 1 MAIUSCULA, 1 numero" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '12px', fontSize: '15px', border: '2px solid #ca8a04', borderRadius: '6px', background: '#fffbeb' }} 
            />
          </div>
          
          <button 
            onClick={test2} 
            disabled={!name || !email || !password}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: (!name || !email || !password) ? '#94a3b8' : '#0891b2', 
              color: 'white', 
              border: 'none', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              cursor: (!name || !email || !password) ? 'not-allowed' : 'pointer',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {(!name || !email || !password) ? 'PREENCHA OS CAMPOS' : 'CRIAR CONTA'}
          </button>

          {msg && (
            <div style={{ marginTop: '20px', padding: '15px', background: msg.includes('SUCESSO') ? '#dcfce7' : '#fee2e2', border: '2px solid ' + (msg.includes('SUCESSO') ? '#16a34a' : '#dc2626'), borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', color: msg.includes('SUCESSO') ? '#166534' : '#991b1b' }}>
              {msg}
            </div>
          )}
        </div>

        <div style={{ background: '#e5e7eb', padding: '20px', borderRadius: '8px', fontSize: '14px' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>Instrucoes:</h3>
          <ul style={{ paddingLeft: '20px', color: '#4b5563' }}>
            <li>Botao AMARELO: Teste simples (OK!)</li>
            <li>Preencha: Nome, Email, Senha123</li>
            <li>Botao AZUL: Cria conta via proxy</li>
          </ul>
          <div style={{ marginTop: '15px', padding: '10px', background: '#dbeafe', borderRadius: '6px', border: '2px solid #3b82f6' }}>
            <strong style={{ color: '#1e40af' }}>PROXY FUNCIONANDO!</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#1e3a8a' }}>Testado com curl - status 201 OK</p>
          </div>
        </div>
      </div>
    </div>
  )
}
