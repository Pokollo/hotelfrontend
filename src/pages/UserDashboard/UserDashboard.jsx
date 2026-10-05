import { useEffect, useState } from "react";
import "./userdashboard.css"
import axios from "axios";
import { CardHabitacion } from "../../components/card-habitacion/CardHabitacion";
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal-reserva/Modal";


export const UserDashboard = () => {    
    const [activeTab, setActiveTab] = useState('mis-reservas');

    const navigate = useNavigate()

    const [tipoHabitacion, setTipoHabitacion] = useState([])
    const [habitacion, setHabitacion] = useState([])
    const [reserva, setReserva] = useState([])

    const [isOpen, setIsOpen] = useState(false)
    const [numeroH, setNumeroH] = useState([])    

    const openModal = (id_tipo) => {
        const data = habitacion.filter(h => h.id_tipo == id_tipo)
        setNumeroH(data)
        setIsOpen(true) 
    };
    const closeModal = () => {
        setNumeroH([])
        setIsOpen(false) 
    };

    const [usuario, setUsuario] = useState(()=>{
        const loginUser = localStorage.getItem("user")
        return loginUser ? JSON.parse(loginUser): null
    })

    useEffect(()=>{

        const cargarDatos = async()=>{
            const [responseTipo, responseHatibacion, responseReserva] = await Promise.all([
                axios.get(`${import.meta.env.VITE_URL_API}/api/tipohabitacion`),
                axios.get(`${import.meta.env.VITE_URL_API}/api/habitacion`),
                axios.get(`${import.meta.env.VITE_URL_API}/api/reserva`),
            ])
            const reservasUsuario = responseReserva.data.data.filter(r => r.id_usuario === usuario.id)
            setTipoHabitacion(responseTipo.data.data)
            setHabitacion(responseHatibacion.data.data)
            setReserva(reservasUsuario)
        }
        cargarDatos()
        
    }, [])

    console.log(usuario)
    function cargar(id_habitacion){
        const habitaciones = habitacion.find(h => h.id_habitacion === id_habitacion)
        const tipo = tipoHabitacion.find(t => t.id_tipo === habitaciones.id_tipo)

        
        
        return {nombre:tipo.nombre, imagen:habitaciones.imagen}
    }
    
    function formatoDate(fecha){
        const toFecha = new Date(fecha)
        return toFecha.toLocaleDateString("es-ES")
    }

    function cerrarSesion(){
        {localStorage.removeItem("user")}
        navigate("/")
    }
        
    // Vista 1: Historial de Reservas
    
    const guardarReserva = async(reserva) =>{

        const id_habitacion = habitacion.find(h => h.numero_habitacion === reserva.numero_habitacion)

        const reservaPost = {
            id_usuario: usuario.id,
            id_habitacion: id_habitacion.id_habitacion,
            fecha_checkin: reserva.fecha_checkin,
            fecha_checkout: reserva.fecha_checkout
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/reserva`, reservaPost)
            console.log(response)
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }

    }    

    const renderMisReservas = () => (
        <div className="dashboard-section">
            <header className="dashboard-header">
                <h2>Mis Reservas</h2>
                <p>Gestiona tus próximas estancias y el historial de tus viajes.</p>
            </header>

            <div className="reservations-list">
                {reserva.map(reservation => (
                    <article key={reservation.id_reserva} className="reservation-card">
                        <div className="res-image" style={{ backgroundImage: `url(/img/${cargar(reservation.id_habitacion).imagen})` }}></div>
                        
                        <div className="res-details">
                            <div className="res-header">
                                <h3>{cargar(reservation.id_habitacion).nombre}</h3>
                                <span className={`status-badge status-${reservation.estado_reserva}`}>
                                    {reservation.estado_reserva.charAt(0).toUpperCase() + reservation.estado_reserva.slice(1)}
                                </span>
                            </div>
                            
                            <div className="res-info">
                                <p><strong>Check-in:</strong> {formatoDate(reservation.fecha_checkin)}</p>
                                <p><strong>Check-out:</strong> {formatoDate(reservation.fecha_checkout)}</p>
                                <p><strong>Reserva #:</strong> {reservation.id_reserva}</p>
                            </div>
                        </div>

                        <div className="res-actions">
                            <span className="res-price">${reservation.precio_total}</span>
                            <div className="action-buttons">
                                <button className="btn-secondary btn-sm">Ver Detalles</button>
                                {reservation.estado_reserva !== 'cancelada' && (
                                    <button className="btn-danger btn-sm">Cancelar</button>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );

    // Vista 2: Formulario para Nueva Reserva
    const renderNuevaReserva = () => (
        <div className="dashboard-section">
            <header className="dashboard-header">
                <h2>Hacer una Reserva</h2>
                <p>Selecciona tus fechas y encuentra la habitación perfecta para tu estancia.</p>
            </header>

            <div>
                {tipoHabitacion.map(tipo =>(
                <CardHabitacion
                    key={tipo.id_tipo}
                    id_tipo={tipo.id_tipo}
                    nombre={tipo.nombre}
                    descripcion={tipo.descripcion}
                    precio={tipo.precio_noche}
                    imagen={tipo.imagen}
                    openModal = {openModal}
                />
                ))}
            </div>
               {isOpen && <Modal
                        openModal={openModal}
                        closeModal={closeModal}
                        numeroH={numeroH}
                        guardarReserva={guardarReserva}
                        />
                }
        </div>
    );

    

    if (!usuario) {
        return <Navigate to="/login"/>; 
    }
    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="sidebar-profile">
                    <div className="profile-avatar">{usuario.nombre}</div>
                    
                    <h3>{usuario.nombre}</h3>
                    <p>{usuario.email}</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'mis-reservas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mis-reservas')}
                    >
                        Mis Reservas
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'nueva-reserva' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nueva-reserva')}
                    >
                        Nueva Reserva
                    </button>
                    <button className="nav-item text-danger" onClick={cerrarSesion}>Cerrar Sesion</button>
                </nav>
            </aside>

            <main className="dashboard-content">
                {activeTab === 'mis-reservas' && renderMisReservas()}
                {activeTab === 'nueva-reserva' && renderNuevaReserva()}
            </main>
        </div>
    );
}
