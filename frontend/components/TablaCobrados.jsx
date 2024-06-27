import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfCobrados from "./pdf_components/PdfCobrados";

const TablaCobrados = ({ mes }) => {
  const [registros, setRegistros] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const registrosPorPagina = 10;

  useEffect(() => {
    const obtenerRegistros = async () => {
      const { data } = await clienteAxios(`/orders/get-month/${mes}`);
      console.log("Datos obtenidos de la API:", data);
      // Filtrar los registros que tengan TAT <= 6.0
      const registrosFiltrados = data.filter((registro) => parseFloat(registro.TAT) <= 6.0);
      // Ordenar los registros por fecha
      const registrosOrdenados = registrosFiltrados.sort((a, b) => new Date(a.ShipDate) - new Date(b.ShipDate));
      setRegistros(registrosOrdenados);
      setPdfData(registrosOrdenados); // Actualizar los datos del PDF
    };
    obtenerRegistros();
  }, [mes]);

  console.log("Registros:", registros);

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

  // Añadir logs para depuración
  console.log("Total Lens Price:", totalLensPrice);
  console.log("Total Coatings Price:", totalCoatingsPrice);
  console.log("Total Tint Price:", totalTintPrice);
  console.log("Total General:", totalGeneral);

  // Cambiar página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPaginas) {
      setPaginaActual(pageNumber);
    }
  };

  return (
    <>
      <div className="centrar">
        <h2 className="index__h2 mt">Cobrados: </h2>
        <div className="tabla">
          <table className="tabla__table">
            <thead className="tabla__thead">
              <tr className="tabla__tr">
                <th className="tabla__th">Fecha</th>
                <th className="tabla__th">Patient</th>
                <th className="tabla__th">Lens Total</th>
                <th className="tabla__th">Coatings Total</th>
                <th className="tabla__th">Tint Total</th>
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

                console.log("Registro completo:", registro);
                console.log("Lens Price:", lensPrice);
                console.log("Coatings Price:", coatingsPrice);
                console.log("Tint Price:", tintPrice);
                console.log("Patient:", registro.Patient);

                return (
                  <tr className="tabla__tr" key={index}>
                    <td className="tabla__td">{registro.ShipDate}</td>
                    <td className="tabla__td">{registro.Patient || 'N/A'}</td>
                    <td className="tabla__td">${lensPrice.toFixed(2)}</td>
                    <td className="tabla__td">${coatingsPrice.toFixed(2)}</td>
                    <td className="tabla__td">${tintPrice.toFixed(2)}</td>
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
            document={<PdfCobrados data={pdfData} />}
            fileName={`cobrados_${mes}.pdf`}
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

export default TablaCobrados;