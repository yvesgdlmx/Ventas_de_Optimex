import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfSemanalesCobrados from "./pdf_components/PdfSemanalesCobrados";

const TablaSemanalCobrados = () => {
  const fechaActual = new Date();
  const anoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1; // +1 para obtener el mes correcto

  // Formatear la fecha en YYYY-MM-DD
  const formatFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [registros, setRegistros] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(formatFecha(new Date(anoActual, mesActual - 1, 1)));
  const [fechaFin, setFechaFin] = useState(formatFecha(new Date(anoActual, mesActual, 0)));
  const [loading, setLoading] = useState(false); // Estado para controlar el spinner
  const registrosPorPagina = 10;

  const obtenerRegistros = async () => {
    if (fechaInicio && fechaFin) {
      console.log(`Obteniendo registros para el rango de fechas ${fechaInicio} a ${fechaFin}`);
      setLoading(true); // Mostrar el spinner
      try {
        const { data } = await clienteAxios.get(`/orders/get-by-date/${fechaInicio}/${fechaFin}`);
        console.log("Datos obtenidos de la API:", data);
        const registrosOrdenados = data.sort((a, b) => new Date(a.ShipDate) - new Date(b.ShipDate));
        setTimeout(() => {
          setRegistros(registrosOrdenados);
          setPdfData(registrosOrdenados);
          setPaginaActual(1); // Restablecer a la primera página cuando se obtienen nuevos datos
          setLoading(false); // Ocultar el spinner
        }, 3000); // Esperar 3 segundos antes de mostrar los resultados
      } catch (error) {
        console.error("Error al obtener los registros:", error);
        setLoading(false); // Ocultar el spinner en caso de error
      }
    }
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const indexOfLastRegistro = paginaActual * registrosPorPagina;
  const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;
  const registrosActuales = registros.slice(indexOfFirstRegistro, indexOfFirstRegistro + registrosPorPagina);
  const totalPaginas = Math.ceil(registros.length / registrosPorPagina);

  const totalLensPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.LensPrice || 0), 0).toFixed(2);
  const totalCoatingsPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.CoatingsPrice || 0), 0).toFixed(2);
  const totalTintPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.TintPrice || 0), 0).toFixed(2);
  const totalGeneral = registros.reduce((acc, registro) => acc + (parseFloat(registro.LensPrice || 0) + parseFloat(registro.CoatingsPrice || 0) + parseFloat(registro.TintPrice || 0)), 0).toFixed(2);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPaginas) {
      setPaginaActual(pageNumber);
    }
  };

  return (
    <>
      <div className="centrar">
        <h2 className="index__h2 mt">Registros por Fecha: </h2>
        <div className="filtros">
          <div className="filtros__flex">
            <input 
              type="date" 
              className="selectores__select" 
              value={fechaInicio} 
              onChange={handleFechaInicioChange} 
            />
            <input 
              type="date" 
              className="selectores__select" 
              value={fechaFin} 
              onChange={handleFechaFinChange} 
            />
            <button className="selectores__boton" onClick={obtenerRegistros}>Buscar</button>
          </div>
        </div>
        {loading ? (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        ) : (
          <div className="tabla">
            <table className="tabla__table">
              <thead className="tabla__thead">
                <tr className="tabla__tr">
                  <th className="tabla__th">Fecha</th>
                  <th className="tabla__th">Patient</th>
                  <th className="tabla__th">Lens Total</th>
                  <th className="tabla__th">Coatings Total</th>
                  <th className="tabla__th">Tint Total</th>
                  <th className="tabla__th">Poder</th>
                  <th className="tabla__th">TAT</th>
                  <th className="tabla__th">Total</th>
                </tr>
              </thead>
              <tbody className="tabla__tbody">
                {registrosActuales.length > 0 ? (
                  registrosActuales.map((registro, index) => {
                    const lensPrice = parseFloat(registro.LensPrice || 0);
                    const coatingsPrice = parseFloat(registro.CoatingsPrice || 0);
                    const tintPrice = parseFloat(registro.TintPrice || 0);
                    const total = lensPrice + coatingsPrice + tintPrice;
                    return (
                      <tr className="tabla__tr" key={index}>
                        <td className="tabla__td">{registro.ShipDate}</td>
                        <td className="tabla__td">{registro.Patient || 'N/A'}</td>
                        <td className="tabla__td">${lensPrice.toFixed(2)}</td>
                        <td className="tabla__td">${coatingsPrice.toFixed(2)}</td>
                        <td className="tabla__td">${tintPrice.toFixed(2)}</td>
                        <td className="tabla__td">{registro.Poder || 'N/A'}</td>
                        <td className="tabla__td">{parseFloat(registro.TAT || 0).toFixed(2)}</td>
                        <td className="tabla__td">${total.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="tabla__td">No se encontraron registros</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="paginador">
              <input
                type="button"
                className="paginador__boton"
                value="Atrás"
                onClick={() => paginate(paginaActual - 1)}
                style={{ visibility: paginaActual === 1 ? 'hidden' : 'visible' }}
              />
              <input
                type="button"
                className="paginador__boton"
                value="Siguiente"
                onClick={() => paginate(paginaActual + 1)}
                style={{ visibility: paginaActual >= totalPaginas ? 'hidden' : 'visible' }}
              />
            </div>
            <div className="tabla__total">
              <p className="tabla__p">Total Lens: <br/><span className="tabla__span">${totalLensPrice}</span></p>
              <p className="tabla__p">Total Coatings: <br/><span className="tabla__span">${totalCoatingsPrice}</span></p>
              <p className="tabla__p">Total Tint: <br/><span className="tabla__span">${totalTintPrice}</span></p>
              <p className="tabla__p">Total General: <br/><span className="tabla__span">${totalGeneral}</span></p>
            </div>
          </div>
        )}
        <div>
          <PDFDownloadLink
            document={<PdfSemanalesCobrados data={pdfData} />}
            fileName={`registros_${fechaInicio}_${fechaFin}.pdf`}
            className="custom-pdf-link"
          >
            {({ blob, url, loading, error }) => (
              <div className="pdf">
                <img src="/img/pdf.png" alt="Descargar PDF" width={50} />
                <p className="pdf__p">{loading ? "Cargando documento..." : "Descargar pdf"}</p>
              </div>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </>
  );
};

export default TablaSemanalCobrados;