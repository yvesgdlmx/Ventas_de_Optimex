import { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { format, parseISO } from "date-fns";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from "../components/Pdf";
import Pdf2 from "../components/Pdf2";
import TablaCobrados from "../components/TablaCobrados";
import TablaNoCobrados from "../components/TablaNoCobrados";

const Index = () => {
  const [mes, setMes] = useState("06"); // Cambiado a junio para coincidir con tu consulta SQL
  const [registros, setRegistros] = useState([]);
  const [totalesPorDia, setTotalesPorDia] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const registrosPorPagina = 10;

  const handleMesChange = (e) => {
    setMes(e.target.value);
    setPaginaActual(1); // Resetear a la primera página cuando cambie el mes
  };

  useEffect(() => {
    const obtenerRegistros = async () => {
      const { data } = await clienteAxios(`/orders/get-month/${mes}`);
      console.log("Datos obtenidos de la API:", data);
      setRegistros(data);
    };
    obtenerRegistros();
  }, [mes]);

  useEffect(() => {
    const agruparPorDia = () => {
      const agrupados = registros.reduce((acc, registro) => {
        const fechaISO = parseISO(registro.ShipDate);
        const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
        if (!acc[fechaFormateada]) {
          acc[fechaFormateada] = {
            LensPrice: 0,
            CoatingsPrice: 0,
            TintPrice: 0,
          };
        }
        acc[fechaFormateada].LensPrice += parseFloat(registro.LensPrice || 0);
        acc[fechaFormateada].CoatingsPrice += parseFloat(registro.CoatingsPrice || 0);
        acc[fechaFormateada].TintPrice += parseFloat(registro.TintPrice || 0);
        return acc;
      }, {});
      const totales = Object.keys(agrupados).map((fecha) => ({
        fecha,
        ...agrupados[fecha],
        total:
          agrupados[fecha].LensPrice +
          agrupados[fecha].CoatingsPrice +
          agrupados[fecha].TintPrice,
      }));
      // Ordenar los totales por fecha
      totales.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      console.log("Totales agrupados por día:", totales);
      setTotalesPorDia(totales);
      setPdfData(totales); // Actualizar los datos del PDF
    };
    agruparPorDia();
  }, [registros]);

  // Calcular los registros actuales
  const indexOfLastRegistro = paginaActual * registrosPorPagina;
  const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;
  const registrosActuales = totalesPorDia.slice(indexOfFirstRegistro, indexOfLastRegistro);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(totalesPorDia.length / registrosPorPagina);

  // Calcular totales
  const totalLensPrice = totalesPorDia.reduce((acc, total) => acc + total.LensPrice, 0).toFixed(2);
  const totalCoatingsPrice = totalesPorDia.reduce((acc, total) => acc + total.CoatingsPrice, 0).toFixed(2);
  const totalTintPrice = totalesPorDia.reduce((acc, total) => acc + total.TintPrice, 0).toFixed(2);
  const totalGeneral = totalesPorDia.reduce((acc, total) => acc + total.total, 0).toFixed(2);

  // Añadir logs para depuración
  console.log("Página Actual:", paginaActual);
  console.log("Total Páginas:", totalPaginas);

  // Cambiar página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPaginas) {
      console.log("Cambiando a la página:", pageNumber);
      setPaginaActual(pageNumber);
    }
  };

  return (
    <div className="index">
      <div className="index__centrado">
        <div className="index__heading">
          <h2 className="index__h2">Ventas Mensuales: </h2>
          <p className="index__p">Laboratorio optimex (S.A. de C.V.)</p>
        </div>
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
        <h2 className="index__h2">Ventas totales por dia: </h2>
        <div className="tabla">
          <table className="tabla__table">
            <thead className="tabla__thead">
              <tr className="tabla__tr">
                <th className="tabla__th">Fecha</th>
                <th className="tabla__th">Lens Total</th>
                <th className="tabla__th">Coatings Total</th>
                <th className="tabla__th">Tint Total</th>
                <th className="tabla__th">Total</th>
              </tr>
            </thead>
            <tbody className="tabla__tbody">
              {registrosActuales.map((total, index) => (
                <tr className="tabla__tr" key={index}>
                  <td className="tabla__td">{total.fecha}</td>
                  <td className="tabla__td">${total.LensPrice.toFixed(2)}</td>
                  <td className="tabla__td">${total.CoatingsPrice.toFixed(2)}</td>
                  <td className="tabla__td">${total.TintPrice.toFixed(2)}</td>
                  <td className="tabla__td">${total.total.toFixed(2)}</td>
                </tr>
              ))}
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
            <p className="tabla__p">Fecha: <br/>{new Date().toLocaleDateString()}</p>
            <p className="tabla__p">Total Lens: <br/><span className="tabla__span">${totalLensPrice}</span></p>
            <p className="tabla__p">Total Coatings: <br/><span className="tabla__span">${totalCoatingsPrice}</span></p>
            <p className="tabla__p">Total Tint: <br/><span className="tabla__span">${totalTintPrice}</span></p>
            <p className="tabla__p">Total General: <br/><span className="tabla__span">${totalGeneral}</span></p>
          </div>
        </div>
        <div className="pdf__flex">
          <div>
              <PDFDownloadLink
                document={<Pdf data={pdfData} />}
                fileName={`ventas_${mes}.pdf`}
                className="custom-pdf-link"
              >
                {({ blob, url, loading, error }) => (
                  <div className="pdf">
                    <img src="/img/pdf.png" alt="Descargar PDF" width={50} />
                    <p className="pdf__p">{loading ? "Cargando documento..." : "Descargar pdf detallado"}</p>
                  </div>
                )}
              </PDFDownloadLink>
            </div>
            <div>
              <PDFDownloadLink
                document={<Pdf2 data={pdfData} />}
                fileName={`ventas_${mes}.pdf`}
                className="custom-pdf-link"
              >
                {({ blob, url, loading, error }) => (
                  <div className="pdf">
                    <img src="/img/pdf.png" alt="Descargar PDF" width={50} />
                    <p className="pdf__p">{loading ? "Cargando documento..." : "Descargar pdf global"}</p>
                  </div>
                )}
              </PDFDownloadLink>
            </div>
        </div>
      </div>
      <div>
        <TablaCobrados mes={mes} />
        <TablaNoCobrados mes={mes} />
      </div>
    </div>
  );
};

export default Index;