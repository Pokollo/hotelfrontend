import { useNavigate } from 'react-router-dom';

import "./login.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardAviso } from '../../components/card-avisos/CardAviso';

export const LoginPage = () => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/registrar');
  };

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const[card, setCard]= useState(false)

  const login = async(e)=>{
    e.preventDefault()

    const login = {
        email: email,
        pass: pass
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/usuario/login`, login)
        const user = {
            id: response.data.data.id,
            nombre: response.data.data.nombre,
            email: response.data.data.email
        }

        localStorage.setItem('user', JSON.stringify(user));
        navigate("/userdashboard")
    } catch (error) {    
        setCard(true)
        console.log(error);
        
    }
  }
    useEffect(() => {
  
      if (card) {
  
          const tiempo = setTimeout(() => {
              navigate("/login");
          }, 2000);
  
          return () => clearTimeout(tiempo);
      }
  
      }, [card]);
  return (
    <div className="login-page">
            {/* Mitad izquierda: Imagen decorativa */}
            <div className="login-image-section">
                <div className="login-image-overlay">
                    <h2>Tu descanso te espera</h2>
                </div>
            </div>
            
            {/* Mitad derecha: Formulario */}
            <div className="login-form-section">
                <div className="login-form-container">
                    
                    <a href="/" className="back-link">
                        &#8592; Volver al inicio
                    </a>
                    
                    <div className="login-header">
                        <h2>Iniciar Sesión</h2>
                        <p>Bienvenido de nuevo. Ingresa a tu cuenta para gestionar tus reservas.</p>
                    </div>
                    
                    <form className="login-form" onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="tucorreo@ejemplo.com" 
                                onChange={(e)=> setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Ingresa tu contraseña" 
                                onChange={(e)=> setPass(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="form-buttons">
                          <button type="submit" className="btn-primary full-width login-btn">Ingresar</button>
                          
                          <button type="button" className="btn-primary full-width login-btn" onClick={handleClick}>Registrarse</button>
                        </div>
                    </form>
                    {card && <CardAviso
                        title={"ERROR"}
                        message={"ERROR AL INICIAR SESION"}
                        description={"Correo o Contraseña incorrectos"}
                    />}
        </div>
      </div>
    </div>
  )
}
