import React from 'react';
import { FaSpinner } from 'react-icons/fa';
const TablaFacturasPorDia = ({
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
  return (
    <div
      className="bg-white py-5 px-14 rounded overflow-x-auto"
      style={{ minHeight: "300px" }}
    >
      {/* Sección de selectores */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label htmlFor="mes" className="text-sm text-gray-600">
            Mes:
          </label>
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
          <label htmlFor="busqueda" className="text-sm text-gray-600">
            Buscar:
          </label>
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
            <option value="coatingsTotal">Coatings Total</option>
            <option value="tintTotal">Tint Total</option>
            <option value="lensTotal">Lens Total</option>
          </select>
        </div>
      </div>
      {cargando ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <table className="min-w-full shadow-lg rounded-md overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 text-center">
                Fecha
              </th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">
                Coatings Total
              </th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">
                Tint Total
              </th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">
                Lens Total
              </th>
              <th className="px-4 py-2 border-b border-gray-200 text-center">
                Click Fee
              </th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-600">
            {registrosActuales.length > 0 ? (
              registrosActuales.map((registro, indice) => {
                const coatingsTotal = parseFloat(registro.CoatingsPrice || 0);
                const tintTotal = parseFloat(registro.TintPrice || 0);
                const lensTotal = parseFloat(registro.LensPrice || 0);
                const clickFeeTotal = parseFloat(registro.click_fee || 0);
                return (
                  <tr
                    key={indice}
                    className="odd:bg-blue-50 even:bg-white hover:bg-blue-100"
                  >
                    <td className="px-4 py-2 border-b border-gray-100">
                      {registro.fecha}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-100">
                      ${coatingsTotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-100">
                      ${tintTotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-100">
                      ${lensTotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-100">
                      ${clickFeeTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">
                  No hay registros para este mes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando{" "}
          {registrosActuales.length > 0
            ? `${indicePrimerRegistro + 1} - ${Math.min(
                indiceUltimoRegistro,
                totalRegistros
              )}`
            : "0"}{" "}
          de {totalRegistros} registros
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => paginar(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
              paginaActual === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            Atrás
          </button>
          {Array.from({ length: totalPaginas }, (_, idx) => (
            <button
              key={idx}
              onClick={() => paginar(idx + 1)}
              className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
                paginaActual === idx + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => paginar(paginaActual + 1)}
            disabled={paginaActual >= totalPaginas}
            className={`px-3 py-1 border border-gray-300 rounded text-sm transition duration-500 ${
              paginaActual >= totalPaginas
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
export default TablaFacturasPorDia;