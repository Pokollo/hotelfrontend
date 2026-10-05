import "./card.css"

export const CardHabitacion = ({id_tipo, nombre, descripcion, precio, imagen, openModal}) => {
  return (
    <article className="room-card">
        <img className="placeholder-img" src={`/img/${imagen}`}/>
            <div className="room-info">
                <h3>{nombre}</h3>
                <p>{descripcion}</p>
                <div className="room-footer">
                    <span className="price">${precio}</span>
                    <button className="btn-secondary" onClick={()=>openModal(id_tipo)}>Reservar</button>
                </div>
        </div>
    </article>
  )
}
