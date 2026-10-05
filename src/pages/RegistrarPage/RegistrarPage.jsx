import { useState } from "react"
import "./registrar.css"
import axios from "axios"
import { CardAviso } from "../../components/card-avisos/CardAviso"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RegistrarPage = () => {
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [contra, setContra] = useState("")

    const [card, setCard] = useState(false)
    const registrar = async(e)=>{
        e.preventDefault()

        const usuario = {
            nombre_completo: nombre,
            email: correo,
            telefono: telefono,
            password_hash: contra
        }

        const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/usuario/registrar`, usuario)
        if(response.data.success){
            setCard(true)
            
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
    <div className="register-page">
            {/* Lado Izquierdo: Formulario */}
            <div className="register-form-section">
                <div className="register-form-container">
                    
                    <a href="/" className="back-link">
                        &#8592; Volver al inicio
                    </a>
                    
                    <div className="register-header">
                        <h2>Crear Cuenta</h2>
                        <p>Únete a nosotros y empieza a planear tus próximas vacaciones de ensueño con beneficios exclusivos.</p>
                    </div>
                    
                    <form className="register-form" onSubmit={registrar}>
                        <div className="form-group">
                            <label htmlFor="fullname">Nombre Completo</label>
                            <input 
                                type="text" 
                                id="fullname" 
                                placeholder="Ej. Juan Pérez" 
                                onChange={(e)=>setNombre(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="tucorreo@ejemplo.com" 
                                onChange={(e)=>setCorreo(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="+57 300 000 0000" 
                                onChange={(e)=>setTelefono(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Crea una contraseña segura"
                                onChange={(e)=>setContra(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="btn-primary full-width login-btn">
                            Registrarse
                        </button>
                    </form>
                    {card && <CardAviso
                        title={"REGISTRO EXITOSO"}
                        message={"SE HA REGISTRADO CON EXITO "}
                        description={"YA PUEDES INICIAR SESION Y DISFRUTAR DE NUESTROS SERVICIOS"}
                    />}
                    <p className="auth-switch">
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
                    </p>

                </div>
            </div>

            {/* Lado Derecho: Fotografía Inspiracional */}
            <div className="register-image-section">
                <div className="register-image-overlay">
                    <h2>Comienza tu viaje<br/>con nosotros</h2>
                </div>
            </div>
        </div>
  )
}
