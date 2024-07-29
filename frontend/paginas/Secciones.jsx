import { Link } from "react-router-dom"

const Secciones = () => {
  return (
    <>
      <header>
        <div className="menu">
          <h1 className="texto-h1">Generador de facturas en pdf.</h1>
          <Link to={'/diarios'}>
            <div className="contenedor" id="uno">
              <img src="/img/folder.png" alt="" className="icon"/>
              <p className="texto">Total por dia</p>
            </div>
          </Link>
          <Link to={'/no-cobrados'}>
            <div className="contenedor" id="dos">
              <img src="/img/folder.png" alt="" className="icon"/>
              <p className="texto">No cobrados</p>
            </div>
          </Link>
          <Link to={'/cobrados'}>
            <div className="contenedor" id="tres">
              <img src="/img/folder.png" alt="" className="icon"/>
              <p className="texto">Cobrados</p>
            </div>
          </Link>
          <Link to={'/semanales'}>
            <div className="contenedor" id="cuatro">
              <img src="/img/folder.png" alt="" className="icon"/>
              <p className="texto">Semanales</p>
            </div>
          </Link>
          <Link to={'/semanales-sinCobrar'}>
            <div className="contenedor" id="cinco">
              <img src="/img/folder.png" alt="" className="icon"/>
              <p className="texto">Semanales no cobrados</p>
            </div>
          </Link>
        </div>
      </header>
    </>
  )
}

export default Secciones
