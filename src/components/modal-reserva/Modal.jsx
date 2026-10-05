import { useState } from "react"
import "./modal.css"

export const Modal = ({guardarReserva, closeModal, numeroH}) => {



    const [texto, setTexto] = useState("")
    const textoCopiar = (e)=>{
        setTexto(e.target.textContent)
    }

    const[numero, setNumero] = useState("")
    const[fechaCheckin, setFechaCheckIn] = useState("")
    const[fechaCheckOut, setFechaCheckOut] = useState("")
        
    const reservar = (e)=>{
        e.preventDefault()

        const reserva = {
            numero_habitacion: numero,
            fecha_checkin: fechaCheckin,
            fecha_checkout: fechaCheckOut
        }

        guardarReserva(reserva)
    }
  return (
        <div className="overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={closeModal}>
              &times;
            </button>
            <h2>Ventana Emergente</h2>
            <div className="modal-actions">
            {numeroH.map((h)=> (
              <button className="btn-secondary" key={h.numero_habitacion} onClick={textoCopiar}>
                {h.numero_habitacion}
              </button>
              ))}
            </div>
            <form  className="modal-form" onSubmit={reservar}>
                <div className="form-group">
                    <input type="text" onChange={(e)=>setNumero(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Fecha CheckIn</label>
                    <input type="date" onChange={(e)=>setFechaCheckIn(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Fecha CheckOut</label>
                    <input type="date" onChange={(e)=>setFechaCheckOut(e.target.value)} required/>
                </div>
                <div className="modal-actions">
                    <button className="btn-primary" type="submit">Reservar</button>
                </div>
            </form>
          </div>
        </div>
  )
}
