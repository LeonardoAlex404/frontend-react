import { useState, useEffect } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [mensajeCrear, setMensajeCrear] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("Cargando...");

    try {
      const res = await fetch('http://3.136.233.178:5000/login', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Login exitoso");
        setUsuario(data.usuario);
      } else {
        setMensaje(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setMensaje("Error de red");
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    setMensajeCrear("Creando...");

    try {
      const res = await fetch('http://3.136.233.178:5000/usuarios', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nuevoNombre,
          email: nuevoEmail,
          password: nuevoPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensajeCrear("Usuario creado con éxito");
        setUsuarios([...usuarios, data]);
        setNuevoNombre('');
        setNuevoEmail('');
        setNuevoPassword('');
      } else {
        setMensajeCrear("Error al crear usuario");
      }
    } catch (error) {
      setMensajeCrear("Error de red");
    }
  };

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch('http://3.136.233.178:5000/usuarios');
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.log("Error al obtener usuarios", error);
      }
    };

    if (usuario) {
      obtenerUsuarios();
    }
  }, [usuario]);

  const containerStyle = {
    minHeight: '100vh',
    padding: 40,
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: 30,
    borderRadius: 20,
    boxShadow: '0 0 25px rgba(255, 255, 255, 0.1)',
    maxWidth: 500,
    width: '100%',
    marginBottom: 30
  };

  const inputStyle = {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    border: 'none',
    outline: 'none',
    background: '#1e1e2f',
    color: '#fff',
    fontSize: 14
  };

  const buttonStyle = {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
    transition: 'transform 0.2s ease-in-out'
  };

  const buttonHoverStyle = {
    transform: 'scale(1.05)'
  };

  const titleStyle = {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  };

  const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%', maxWidth: 900 }}>
        {!usuario ? (
          <div style={cardStyle}>
            <h1 style={titleStyle}>🔒 Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
              <input
                style={inputStyle}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                type="submit"
              >
                Entrar
              </button>
            </form>
            <p style={{ marginTop: 15, textAlign: 'center', color: '#bbb' }}>{mensaje}</p>
          </div>
        ) : (
          <>
            <div style={cardStyle}>
              <h2 style={titleStyle}>🎉 Bienvenido, {usuario.nombre}</h2>
              <p><b>ID:</b> {usuario.id}</p>
              <p><b>Email:</b> {usuario.email}</p>
            </div>

            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>📋 Lista de Usuarios</h3>
              <ul style={{ maxHeight: 150, overflowY: 'auto', paddingLeft: 20 }}>
                {usuarios.map(u => (
                  <li key={u.id} style={{ marginBottom: 8 }}>{u.nombre} - {u.email}</li>
                ))}
              </ul>
            </div>

            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>➕ Crear Nuevo Usuario</h3>
              <form onSubmit={handleCrearUsuario}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  required
                />
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Email"
                  value={nuevoEmail}
                  onChange={(e) => setNuevoEmail(e.target.value)}
                  required
                />
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Contraseña"
                  value={nuevoPassword}
                  onChange={(e) => setNuevoPassword(e.target.value)}
                  required
                />
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  type="submit"
                >
                  Crear Usuario
                </button>
              </form>
              <p style={{ marginTop: 10, color: '#bbb' }}>{mensajeCrear}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
