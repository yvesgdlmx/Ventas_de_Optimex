import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';

const TablaConsumoMaterial = ({
  mes,
  onMesChange,
  ano,
  onAnoChange,
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
      {/* Sección de selectores: Mes, Año, búsqueda y columna de búsqueda */}
      <div className="mb-4 flex items-center justify-between">
        {/* Selectores de mes y año */}
        <div className="flex items-center space-x-4">
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
          <div className="flex items-center space-x-2">
            <label htmlFor="ano" className="text-sm text-gray-600">Año:</label>
            <select
              id="ano"
              value={ano}
              onChange={onAnoChange}
              className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1.5"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
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
            <option value="material">Material</option>
            <option value="capa">Capa</option>
            <option value="sku">SKU</option>
            <option value="base">Base</option>
            <option value="tipo">Tipo</option>
            <option value="cantidad">Cantidad</option>
            <option value="costo">Costo</option>
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
              <th className="px-4 py-2 border-b border-gray-200 text-center">Material</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Capa</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">SKU</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Base</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Tipo</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Cantidad</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Costo</th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">Fecha</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-600">
            {registrosActuales.length > 0 ? (
              registrosActuales.map((registro, indice) => {
                const cantidad = parseFloat(registro.Cantidad || 0);
                const costo = parseFloat(registro.Costo || 0);
                const base = parseFloat(registro.Base || 0);
                const fecha = new Date(registro.Fecha).toLocaleDateString();
                return (
                  <tr key={registro.id} className="odd:bg-blue-50 even:bg-white hover:bg-blue-100">
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Material || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Capa || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.SKU || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{base.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{registro.Tipo || 'N/A'}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{cantidad.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">${costo.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{fecha}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-gray-500">No hay registros para este período</td>
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

export default TablaConsumoMaterial;