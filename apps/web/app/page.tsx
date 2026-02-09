export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        CenarioX
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
        Plataforma de Mercados de Predição
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a 
          href="/markets" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#000', 
            color: '#fff', 
            textDecoration: 'none',
            borderRadius: '0.5rem'
          }}
        >
          Ver Mercados
        </a>
        <a 
          href="/login" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            border: '1px solid #000', 
            color: '#000', 
            textDecoration: 'none',
            borderRadius: '0.5rem'
          }}
        >
          Login
        </a>
      </div>
    </div>
  )
}
