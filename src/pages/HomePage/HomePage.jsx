import "./homepagestyle.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const scrollRef = useRef(null);

    const navigate = useNavigate()

    const toLogin = ()=>{
        navigate("/login")
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
        scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    }

    const [habitaciones, setHabitaciones] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/tipohabitacion`)   
                console.log(response)
                setHabitaciones(response.data.data)
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchData()
    }, [])
  return (
       
    <div>

        <header className="navbar">
            <div className="logo">
                <h2>🏨 MiHotel</h2>
            </div>
            <nav className="nav-links">
                <a href="#hero">Inicio</a>
                <a href="#habitaciones">Habitaciones</a>
            </nav>
            <div className="nav-actions">
                <button className="btn-login" onClick={toLogin}>Iniciar Sesión</button>
            </div>
        </header>

        <section id="hero" className="hero-section">
            <div className="hero-content">
                <h1>Descubre el confort en cada detalle</h1>
                <p>Tu escapada perfecta comienza aquí. Relájate y disfruta de nuestras instalaciones de primera clase.</p>
                <a href="#habitaciones" className="btn-primary">Ver Habitaciones</a>
            </div>
        </section>

        <section id="habitaciones" className="rooms-section">
            <h2 className="section-title">Nuestras Habitaciones</h2>
            
            <div className="carousel-container">
                <button className="carousel-btn prev" onClick={() => scroll('left')}>
                    &#10094;
                </button>
                
                <div className="carousel-track" ref={scrollRef}>

                    {habitaciones.map(h =>(
                    <div className="carousel-item">
                        
                        <><img src={`/img/${h.imagen}`} alt={h.nombre} />
                        <h3>{h.nombre}</h3></>
                        
                    </div>
                    ))}
                    
                </div>

                <button className="carousel-btn next" onClick={() => scroll('right')}>
                    &#10095;
                </button>
            </div>
        </section>

    </div>
    
  )
}
