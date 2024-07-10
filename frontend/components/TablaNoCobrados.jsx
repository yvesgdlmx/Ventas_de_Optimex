import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfNoCobrados from "./pdf_components/PdfNoCobrados";

const TablaNoCobrados = () => {
  const [mes, setMes] = useState("06"); // Cambiado a junio para coincidir con tu consulta SQL
  const [registros, setRegistros] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const registrosPorPagina = 10;
    
  const handleMesChange = (e) => {
    setMes(e.target.value);
    setPaginaActual(1); // Resetear a la primera página cuando cambie el mes
  };

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const { data } = await clienteAxios(`/orders/get-month/${mes}`);
        // Verificar si los datos contienen el campo "poder"
        data.forEach((registro, index) => {
          if ('poder' in registro) {

          } else {
            registro.poder = 'N/A'; // Asignar 'N/A' si no existe
          }
        });

        // Filtrar los registros que tengan TAT > 6.0
        const registrosFiltrados = data.filter(registro => parseFloat(registro.TAT) > 6.0);

        // Ordenar los registros por número de paciente (Patient)
        const registrosOrdenados = registrosFiltrados.sort((a, b) => {
          const patientA = parseFloat(a.Patient) || 0;
          const patientB = parseFloat(b.Patient) || 0;
          return patientA - patientB;
        });

        setRegistros(registrosOrdenados);
        setPdfData(registrosOrdenados); // Actualizar los datos del PDF
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    };

    obtenerRegistros();
  }, [mes]);

  // Calcular los registros actuales
  const indexOfLastRegistro = paginaActual * registrosPorPagina;
  const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;
  const registrosActuales = registros.slice(indexOfFirstRegistro, indexOfLastRegistro);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(registros.length / registrosPorPagina);

  // Calcular totales
  const totalLensPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.LensPrice || 0), 0).toFixed(2);
  const totalCoatingsPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.CoatingsPrice || 0), 0).toFixed(2);
  const totalTintPrice = registros.reduce((acc, registro) => acc + parseFloat(registro.TintPrice || 0), 0).toFixed(2);
  const totalGeneral = registros.reduce((acc, registro) => acc + (parseFloat(registro.LensPrice || 0) + parseFloat(registro.CoatingsPrice || 0) + parseFloat(registro.TintPrice || 0)), 0).toFixed(2);

  // Cambiar página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPaginas) {
      setPaginaActual(pageNumber);
    }
  };

  return (
    <>
      <div className="centrar mt">
      <div className="selectores">
          <label className="selectores__label" htmlFor="">
            Elige un mes:{" "}
          </label>
          <select className="selectores__select" value={mes} onChange={handleMesChange}>
            <option className="selectores__option" value="01">Enero</option>
            <option className="selectores__option" value="02">Febrero</option>
            <option className="selectores__option" value="03">Marzo</option>
            <option className="selectores__option" value="04">Abril</option>
            <option className="selectores__option" value="05">Mayo</option>
            <option className="selectores__option" value="06">Junio</option>
            <option className="selectores__option" value="07">Julio</option>
            <option className="selectores__option" value="08">Agosto</option>
            <option className="selectores__option" value="09">Septiembre</option>
            <option className="selectores__option" value="10">Octubre</option>
            <option className="selectores__option" value="11">Noviembre</option>
            <option className="selectores__option" value="12">Diciembre</option>
          </select>
        </div>
        <h2 className="index__h2">No cobrados: </h2>
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
              {registrosActuales.map((registro, index) => {
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
              })}
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
        <div>
          <PDFDownloadLink
            document={<PdfNoCobrados data={pdfData} />}
            fileName={`no_cobrados_${mes}.pdf`}
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

export default TablaNoCobrados;