import React, { useState, useEffect } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import clienteAxios from '../config/clienteAxios';
import PdfCobrados from '../components/pdf_components/PdfCobrados';
import Totales from '../components/Totales';
import TablaFacturas from '../components/tables/TablaFacturas';
const InkCobrados = () => {
  // Arreglo con los nombres de los meses en español
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  // Estados locales: se calcula el mes anterior al actual. Se mantiene el valor numérico en formato "01", "02", etc.
  const [mes, setMes] = useState(() => {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // getMonth() es 0-indexado, por ello se suma 1
    const mesAnterior = mesActual === 1 ? 12 : mesActual - 1;
    return mesAnterior < 10 ? `0${mesAnterior}` : `${mesAnterior}`;
  });
  const [registros, setRegistros] = useState([]);
  const [datosPdf, setDatosPdf] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [columnaBusqueda, setColumnaBusqueda] = useState("fecha");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 8;
  const [cargando, setCargando] = useState(false);
  // Mapeo de columnas para la búsqueda
  const mapeoColumnas = {
    fecha: "ShipDate",
    patient: "Patient",
    coatingsTotal: "CoatingsPrice",
    tintTotal: "TintPrice",
    poder: "Poder",
    tat: "TAT",
    lensTotal: "LensPrice"
  };
  // Manejadores para los select y el input de búsqueda
  const manejarCambioMes = (e) => {
    setMes(e.target.value);
    setPaginaActual(1);
  };
  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
    setPaginaActual(1);
  };
  const manejarCambioColumnaBusqueda = (e) => {
    setColumnaBusqueda(e.target.value);
    setPaginaActual(1);
  };
  // Función para obtener registros desde la API
  const obtenerRegistros = async () => {
    try {
      setCargando(true);
      const { data } = await clienteAxios(`/orders/get-month/${mes}`);
      // Ordenamos por Patient (por ejemplo)
      const registrosOrdenados = data.sort((a, b) => {
        const patientA = parseFloat(a.Patient) || 0;
        const patientB = parseFloat(b.Patient) || 0;
        return patientA - patientB;
      });
      setRegistros(registrosOrdenados);
      setDatosPdf(registrosOrdenados);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    obtenerRegistros();
  }, [mes]);
  // Filtrado de registros de acuerdo al texto de búsqueda
  const registrosFiltrados = registros.filter((registro) => {
    if (textoBusqueda.trim() === "") return true;
    const key = mapeoColumnas[columnaBusqueda];
    if (registro[key]) {
      return String(registro[key]).toLowerCase().includes(textoBusqueda.toLowerCase());
    }
    return false;
  });
  // Cálculos de paginación
  const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina);
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = registrosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro);
  const paginar = (nuevaPagina) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };
  // Cálculo de totales (en InkCobrados)
  const totalLensPrice = registros.reduce((acumulado, registro) =>
    acumulado + parseFloat(registro.LensPrice || 0), 0).toFixed(2);
  const totalCoatingsPrice = registros.reduce((acumulado, registro) =>
    acumulado + parseFloat(registro.CoatingsPrice || 0), 0).toFixed(2);
  const totalTintPrice = registros.reduce((acumulado, registro) =>
    acumulado + parseFloat(registro.TintPrice || 0), 0).toFixed(2);
  // Suma total de click_fee
  const totalClickFee = registros.reduce((acumulado, registro) =>
    acumulado + parseFloat(registro.click_fee || 0), 0).toFixed(2);
  // Nuevo total general que engloba totalLensPrice más totalClickFee
  const totalGeneral = (parseFloat(totalLensPrice) + parseFloat(totalClickFee)).toFixed(2);
  // Obtener el nombre del mes a partir del valor numérico
  const nombreMes = monthNames[parseInt(mes, 10) - 1];
  return (
    <div className="space-y-6">
      {/* Primer contenedor: Encabezado y botón de descarga PDF */}
      <div className="flex flex-col items-center justify-center bg-white py-6 shadow-sm rounded border-b-0 border-b-gray-300">
        <h1 className="text-3xl font-bold mb-2 text-gray-500 uppercase">INK - cobrados</h1>
        <p className="text-sm text-gray-500 mb-4">
          Mostrando información del mes de ( {nombreMes} )
        </p>
        <PDFDownloadLink
          document={<PdfCobrados data={datosPdf} />}
          fileName={`cobrados_${mes}.pdf`}
          className="flex items-center"
        >
          {({ loading }) =>
            loading ? (
              <button
                disabled
                className="flex items-center bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
              >
                <FaSpinner className="animate-spin mr-2" />
                <span>Espere...</span>
              </button>
            ) : (
              <button
                className="flex items-center bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-white hover:text-gray-600 focus:outline-none transition duration-500"
              >
                <FaDownload className="mr-2" />
                Descargar PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
      {/* Segundo contenedor: Sección de Totales (componente Totales) */}
      <Totales 
        totalLensPrice={totalLensPrice} 
        totalCoatingsPrice={totalCoatingsPrice} 
        totalTintPrice={totalTintPrice} 
        totalClickFee={totalClickFee}
        totalGeneral={totalGeneral} 
      />
      {/* Tercer contenedor: Componente TablaGenerica */}
      <TablaFacturas
        mes={mes}
        onMesChange={manejarCambioMes}
        textoBusqueda={textoBusqueda}
        onBusquedaChange={manejarCambioBusqueda}
        columnaBusqueda={columnaBusqueda}
        onColumnaBusquedaChange={manejarCambioColumnaBusqueda}
        cargando={cargando}
        registrosActuales={registrosActuales}
        totalRegistros={registrosFiltrados.length}
        indicePrimerRegistro={indicePrimerRegistro}
        indiceUltimoRegistro={indiceUltimoRegistro}
        totalPaginas={totalPaginas}
        paginaActual={paginaActual}
        paginar={paginar}
      />
    </div>
  );
};
export default InkCobrados;