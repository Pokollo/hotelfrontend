import { useEffect, useState } from "react"
import "./admindashboard.css"
import axios from "axios";

export const AdminDashboard = () => {

    const [activeTab, setActiveTab] = useState('reservas');

    const [tipoHabitacion, setTipoHabitacion] = useState([])
    const [habitacion, setHabitacion] = useState([])
    const [reserva, setReserva] = useState([])
    const [usuario, setUsuario] = useState([])

    useEffect(()=>{

        const cargarDatos = async()=>{

            const [responseTipo, responseHatibacion, responseReserva, responseUsuario] = await Promise.all([
                axios.get(`${import.meta.env.VITE_URL_API}/api/tipohabitacion`),
                axios.get(`${import.meta.env.VITE_URL_API}/api/habitacion`),
                axios.get(`${import.meta.env.VITE_URL_API}/api/reserva`),
                axios.get(`${import.meta.env.VITE_URL_API}/api/usuario`)
            ])
            
            setTipoHabitacion(responseTipo.data.data)
            setHabitacion(responseHatibacion.data.data)
            setReserva(responseReserva.data.data)
            setUsuario(responseUsuario.data.data)
            console.log(responseHatibacion)
        }
        cargarDatos()

    }, [])

    function cargarTipoNombre(id_habitacion){
        const tipo = tipoHabitacion.find(t => t.id_tipo === id_habitacion)

        return tipo.nombre
    }

    function reservaData(id_usuario, id_habitacion){
        const tipo = tipoHabitacion.find(t => t.id_tipo === id_habitacion)
        const buscarHabitacion = habitacion.find(h=> h.id_habitacion === id_habitacion)
        const buscarUsuario = usuario.find(u => u.id_usuario === id_usuario)
        const result = {nombre:buscarUsuario.nombre_completo, habitacion:buscarHabitacion.numero_habitacion+"-"+tipo.nombre}
        return result
    }

    function formatoFecha(fecha){
        const toFecha = new Date(fecha)
        return toFecha.toLocaleDateString("es-ES")
    }


    const [nombre, setNombre] = useState("")
    const [capacidad, setCapacidad] = useState("")
    const [precio, setPrecio] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [imagen, setImagen] = useState(null)

    const crearTipoHabitacion = async(e)=>{
        e.preventDefault()

        const formData = new FormData()

        formData.append("nombre", nombre)
        formData.append("capacidad_maxima", capacidad)
        formData.append("precio_noche", precio)
        formData.append("descripcion", descripcion)
        formData.append("imagen", imagen)
        
        const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/tipohabitacion`, formData)
        console.log(response)

    }


    const [numeroHabitacion, setNumeroHabitacion] = useState("")
    const [tipo, setTipo] = useState("")

    const crearHabitacion=async(e)=>{
        
        e.preventDefault()
        const id = tipoHabitacion.find(t => t.nombre === tipo) 
        const formData = new FormData()
        formData.append("numero_habitacion", numeroHabitacion)
        formData.append("id_tipo", id.id_tipo)
        formData.append("imagen", imagen)

        const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/habitacion`, formData)
    }

    const renderReservations = () => (
        <div className="admin-section">
            <div className="admin-header-actions">
                <h2>Gestión de Reservas</h2>
            </div>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID Reserva</th>
                            <th>Cliente</th>
                            <th>Habitación</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserva.map(res => (
                            
                            <tr key={res.id_reserva}>
                                <td>RES-{res.id_reserva}</td>
                                <td>{reservaData(res.id_usuario, res.id_habitacion).nombre}</td>
                                <td>{reservaData(res.id_usuario, res.id_habitacion).habitacion}</td>
                                <td>{formatoFecha(res.fecha_checkin)}</td>
                                <td>{formatoFecha(res.fecha_checkout)}</td>
                                <td><span className={`status-badge status-${res.estado_reserva}`}>{res.estado_reserva}</span></td>
                                <td className="table-actions">
                                    <button className="btn-success btn-sm">Confirmar</button>
                                    <button className="btn-danger btn-sm">Cancelar</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderRoomTypes = () => (
        <div className="admin-section">
            <div className="admin-header-actions">
                <h2>Tipos de Habitación</h2>
            </div>
            
            {/* Formulario de Registro */}
            <form className="admin-form" onSubmit={crearTipoHabitacion}>
                <h3>Registrar Nuevo Tipo</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Nombre del Tipo</label>
                        <input type="text" placeholder="Ej. Presidencial" onChange={(e)=> setNombre(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Precio Base ($)</label>
                        <input type="number" placeholder="Ej. 300" onChange={(e)=> setPrecio(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Capacidad (Personas)</label>
                        <input type="number" placeholder="Ej. 2" onChange={(e)=> setCapacidad(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <input type="text" placeholder="Ej. Habitacion para 2..." onChange={(e)=> setDescripcion(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Cargar Imagen</label>
                        <input type="file" onChange={(e)=> setImagen(e.target.files[0])} required/>
                    </div>
                </div>
                <button type="submit" className="btn-primary">Guardar Tipo</button>
            </form>

            {/* Tabla de Tipos */}
            <div className="table-responsive mt-2">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio Base</th>
                            <th>Capacidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoHabitacion.map(type => (
                            <tr key={type.id_tipo}>
                                <td>{type.id_tipo}</td>
                                <td>{type.nombre}</td>
                                <td>${type.precio_noche}</td>
                                <td>{type.capacidad_maxima}</td>
                                <td>
                                    <button className="btn-secondary btn-sm">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderRooms = () => (
        <div className="admin-section">
            <div className="admin-header-actions">
                <h2>Gestión de Habitaciones</h2>
            </div>

            {/* Formulario de Registro */}
            <form className="admin-form" onSubmit={crearHabitacion}>
                <h3>Registrar Nueva Habitación</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Número de Habitación</label>
                        <input type="text" placeholder="Ej. 301" onChange={(e)=> setNumeroHabitacion(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Tipo de Habitación</label>
                        
                        <select onChange={(e)=> setTipo(e.target.value)}>
                            {tipoHabitacion.map(tipo => (
                            <option >{tipo.nombre}</option>
                            ))}
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <label>Imagen Habitacion</label>
                        <input type="file" onChange={(e)=> setImagen(e.target.files[0])}required/>
                    </div>
                </div>
                <button type="submit" className="btn-primary">Registrar Habitación</button>
            </form>

            {/* Tabla de Habitaciones */}
            <div className="table-responsive mt-2">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Tipo</th>
                            <th>Estado Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitacion.map(room => (
                            <tr key={room.id_habitacion}>
                                <td>{room.numero_habitacion}</td>
                                <td>{cargarTipoNombre(room.id_habitacion)}</td>
                                <td><span className={`status-badge status-${room.estado_actual}`}>{room.estado_actual}</span></td>
                                <td className="table-actions">
                                    <button className="btn-secondary btn-sm">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    return (
        <div className="dashboard-layout">
            {/* Sidebar Reutilizado (Adaptado para Admin) */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-profile">
                    <div className="profile-avatar" style={{ backgroundColor: '#e67e22' }}>AD</div>
                    <h3>Administrador</h3>
                    <p>Panel de Control</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'reservas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reservas')}
                    >
                        Gestión de Reservas
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'tipos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tipos')}
                    >
                        Tipos de Habitación
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'habitaciones' ? 'active' : ''}`}
                        onClick={() => setActiveTab('habitaciones')}
                    >
                        Habitaciones
                    </button>
                    <a href="/" className="nav-item text-danger">Cerrar Sesión</a>
                </nav>
            </aside>

            {/* Contenido Dinámico */}
            <main className="dashboard-content">
                {activeTab === 'reservas' && renderReservations()}
                {activeTab === 'tipos' && renderRoomTypes()}
                {activeTab === 'habitaciones' && renderRooms()}
            </main>
        </div>
    )
}
