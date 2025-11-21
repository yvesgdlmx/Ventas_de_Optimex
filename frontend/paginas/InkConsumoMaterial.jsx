import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import clienteAxios from '../config/clienteAxios';
import TablaConsumoMaterial from '../components/tables/TablaConsumoMaterial';
import PdfConsumoMaterial from '../components/pdf_components/PdfConsumoMaterial';

const InkConsumoMaterial = () => {
  // Estados locales: se calcula el mes anterior al actual por defecto
  const [mes, setMes] = useState(() => {
    const fechaActual = new Date();
    const mesAnterior = fechaActual.getMonth();
    return (mesAnterior + 1).toString().padStart(2, '0');
  });
  
  const [ano, setAno] = useState(() => {
    const fechaActual = new Date();
    let anoAnterior = fechaActual.getFullYear();
    if (fechaActual.getMonth() === 0) {
      anoAnterior = fechaActual.getFullYear() - 1;
    }
    return anoAnterior.toString();
  });

  const [registros, setRegistros] = useState([]);
  const [datosPdf, setDatosPdf] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [columnaBusqueda, setColumnaBusqueda] = useState("material");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 20;
  const [cargando, setCargando] = useState(false);

  // Mapeo de columnas para la búsqueda
  const mapeoColumnas = {
    material: "Material",
    capa: "Capa",
    sku: "SKU",
    base: "Base",
    tipo: "Tipo",
    cantidad: "Cantidad",
    costo: "Costo"
  };

  // Manejadores para los select y el input de búsqueda
  const manejarCambioMes = (e) => {
    setMes(e.target.value);
    setPaginaActual(1);
  };

  const manejarCambioAno = (e) => {
    setAno(e.target.value);
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

  // Función para obtener registros del consumo de material
  const obtenerRegistros = async () => {
    setCargando(true);
    try {
      const { data } = await clienteAxios(`/consumo-material/get-month/${mes}/${ano}`);
      setRegistros(data);
      setDatosPdf(data);
    } catch (error) {
      console.error('Error al obtener registros:', error);
      setRegistros([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, [mes, ano]);

  // Filtrado de registros según el texto de búsqueda y la columna seleccionada
  const registrosFiltrados = registros.filter((registro) => {
    const columnaSeleccionada = mapeoColumnas[columnaBusqueda];
    const valorColumna = registro[columnaSeleccionada];
    
    if (valorColumna === null || valorColumna === undefined) return false;
    
    return valorColumna.toString().toLowerCase().includes(textoBusqueda.toLowerCase());
  });

  // Cálculos de paginación
  const totalRegistros = registrosFiltrados.length;
  const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina);
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = registrosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro);

  const paginar = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  // Nombres de meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const nombreMes = monthNames[parseInt(mes, 10) - 1];

  return (
    <div className="space-y-6">
      {/* Encabezado y botón de descarga PDF */}
      <div className="flex flex-col items-center justify-center bg-white py-6 shadow-sm rounded border-b border-gray-300">
        <h1 className="text-3xl font-bold mb-2 text-gray-500 uppercase">CONSUMO DE MATERIAL</h1>
        <p className="text-sm text-gray-500 mb-4">
          Mostrando información del mes de {nombreMes} {ano}
        </p>
        <PDFDownloadLink
          document={<PdfConsumoMaterial data={datosPdf} mes={mes} ano={ano} />}
          fileName={`consumo_material_${mes}_${ano}.pdf`}
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

      <TablaConsumoMaterial
        mes={mes}
        onMesChange={manejarCambioMes}
        ano={ano}
        onAnoChange={manejarCambioAno}
        textoBusqueda={textoBusqueda}
        onBusquedaChange={manejarCambioBusqueda}
        columnaBusqueda={columnaBusqueda}
        onColumnaBusquedaChange={manejarCambioColumnaBusqueda}
        cargando={cargando}
        registrosActuales={registrosActuales}
        totalRegistros={totalRegistros}
        indicePrimerRegistro={indicePrimerRegistro}
        indiceUltimoRegistro={indiceUltimoRegistro}
        totalPaginas={totalPaginas}
        paginaActual={paginaActual}
        paginar={paginar}
      />
    </div>
  );
};

export default InkConsumoMaterial;