import { Link } from "react-router-dom"

const Secciones = () => {
  return (
    <>
    <div className="index">
      <div className="index__centrado">
        <div className="index__heading">
          <h2 className="index__h2-black position">Generador de facturas en PDF: </h2>
        </div>
      </div>
      <div className='index__centrado-2'>
        <div className='index__grid'>
            <Link to={'/diarios'} className="link">
                <div className='index__campo'>
                    <p className='index__p-2'>Registros Diarios</p>
                </div>
            </Link>
            <Link to={'/no-cobrados'} className="link">
                <div className='index__campo'>
                    <p className='index__p-2'>Detalles de Registros No Cobrados</p>
                </div>
            </Link>
            <Link to={'/cobrados'} className="link">
                <div className='index__campo'>
                    <p className='index__p-2'>Detalles de Registros Cobrados</p>
                </div>
            </Link>
            <Link  to={'/semanales'} className="link">
                <div className='index__campo'>
                    <p className='index__p-2'>Registros Semanales</p>
                </div>
            </Link>
            <Link  to={'/semanales-sinCobrar'} className="link">
                <div className='index__campo'>
                    <p className='index__p-2'>Registros Semanales No cobrados</p>
                </div>
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Secciones
