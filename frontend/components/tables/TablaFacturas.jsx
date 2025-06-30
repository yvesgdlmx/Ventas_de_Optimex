import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
const TablaFacturas = ({
  mes,
  onMesChange,
  textoBusqueda,
  onBusquedaChange,
  columnaBusqueda,
  onColumnaBusquedaChange,
  cargando, 
  registrosActuales,
  totalRegistros,
  indicePrimerRegistro,
  indiceUltimoRegistro,
  totalPaginas,
  paginaActual,
  paginar
}) => {
  // Número máximo de botones a mostrar a cada lado de la página actual
  const maxBotonesAlrededor = 2;
  // Función para generar los botones de paginación
  const generarBotonesPaginacion = () => {
    let botones = [];
    // Botón ir a la primera página
    if (paginaActual > 1 + maxBotonesAlrededor) {
      botones.push(
        <button
          key="first"
          onClick={() => paginar(1)}
          className="px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 hover:bg-blue-500 hover:text-white"
        >
          <FaAngleDoubleLeft />
        </button>
      );
    }
    // Botón de página "anterior"
    botones.push(
      <button
        key="prev"
        onClick={() => paginar(paginaActual - 1)}
        className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
          paginaActual === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"
        }`}
        disabled={paginaActual === 1}
      >
        <FaChevronLeft />
      </button>
    );
    // Determina el rango de páginas a mostrar
    const desde = Math.max(1, paginaActual - maxBotonesAlrededor);
    const hasta = Math.min(totalPaginas, paginaActual + maxBotonesAlrededor);
    // Si existe un salto entre la primera página y el rango
    if (desde > 1) {
      botones.push(
        <span key="ellipsis-left" className="px-2">...</span>
      );
    }
    for (let idx = desde; idx <= hasta; idx++) {
      botones.push(
        <button
          key={idx}
          onClick={() => paginar(idx)}
          className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
            paginaActual === idx ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          {idx}
        </button>
      );
    }
    // Si existe un salto entre el rango y la última página
    if (hasta < totalPaginas) {
      botones.push(
        <span key="ellipsis-right" className="px-2">...</span>
      );
    }
    // Botón de página "siguiente"
    botones.push(
      <button
        key="next"
        onClick={() => paginar(paginaActual + 1)}
        className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
          paginaActual >= totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"
        }`}
        disabled={paginaActual >= totalPaginas}
      >
        <FaChevronRight />
      </button>
    );
    // Botón ir a la última página
    if (paginaActual < totalPaginas - maxBotonesAlrededor) {
      botones.push(
        <button
          key="last"
          onClick={() => paginar(totalPaginas)}
          className="px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 hover:bg-blue-500 hover:text-white"
        >
          <FaAngleDoubleRight />
        </button>
      );
    }
    return botones;
  };
  return (
    <div className="bg-white py-5 px-14 rounded overflow-x-auto" style={{ minHeight: '300px' }}>
      {/* Sección de selectores: Mes, búsqueda y columna de búsqueda */}
      <div className="mb-4 flex items-center justify-between">
        {/* Selector de mes */}
        <div className="flex items-center space-x-2">
          <label htmlFor="mes" className="text-sm text-gray-600">Mes:</label>
          <select
            id="mes"
            value={mes}
            onChange={onMesChange}
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          >
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        {/* Buscador y selector de columna */}
        <div className="flex items-center space-x-2">
          <label htmlFor="busqueda" className="text-sm text-gray-600">Buscar:</label>
          <input
            type="text"
            id="busqueda"
            value={textoBusqueda}
            onChange={onBusquedaChange}
            placeholder="Buscar..."
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          />
          <select
            value={columnaBusqueda}
            onChange={onColumnaBusquedaChange}
            className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
          >
            <option value="fecha">Fecha</option>
            <option value="patient">Patient</option>
            <option value="coatingsTotal">Coatings Total</option>
            <option value="tintTotal">Tint Total</option>
            <option value="poder">Poder</option>
            <option value="tat">TAT</option>
            <option value="lensTotal">Lens Total</option>
          </select>
        </div>
      </div>
      {/* Tabla de datos o indicador de carga */}
      {cargando ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <table className="min-w-full shadow-lg rounded-md overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Fecha</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Patient</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Coatings Total</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Tint Total</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Poder</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">TAT</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Lens Total</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Click Fee</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-600">
            {registrosActuales.length > 0 ? (
              registrosActuales.map((registro, indice) => {
                const precioCoatings = parseFloat(registro.CoatingsPrice || 0);
                const precioTint = parseFloat(registro.TintPrice || 0);
                const precioLens = parseFloat(registro.LensPrice || 0);
                const clickFee = parseFloat(registro.click_fee || 0);
                return (
                  <tr key={indice} className="odd:bg-blue-50 even:bg-white hover:bg-blue-100">
                    <td className="px-4 py-2 border-b border-gray-100">{registro.ShipDate}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Patient || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioCoatings.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioTint.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Poder || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{parseFloat(registro.TAT || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${precioLens.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${clickFee.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-gray-500">No hay registros para este mes</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* Información y paginación */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando {registrosActuales.length > 0 ? `${indicePrimerRegistro + 1} - ${Math.min(indiceUltimoRegistro, totalRegistros)}` : "0"} de {totalRegistros} registros
        </div>
        <div className="flex items-center space-x-1 text-gray-500">
          {generarBotonesPaginacion()}
        </div>
      </div>
    </div>
  );
};
export default TablaFacturas;