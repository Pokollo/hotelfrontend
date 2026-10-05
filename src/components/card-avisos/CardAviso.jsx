import "./cardaviso.css"
export const CardAviso = ({message, title, description}) => {
  return (
    <div className="card-aviso">

            <div className="card-header">
                {title}
            </div>

            <div className="card-body">
                <h2>{message}</h2>

                <p>
                    {description}
                </p>
            </div>

    </div>
  )
}
