import React from 'react';
import { FaSpinner } from 'react-icons/fa';
const ListaFacturasPorDia = ({
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
    <div className="bg-white py-5 px-4 rounded">
      {/* Sección de selectores y filtros */}
      <div className="mb-4 space-y-2">
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
        {/* Grupo de búsqueda y select de columna */}
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <label htmlFor="busqueda" className="text-sm text-gray-600">
              Buscar:
            </label>
            <input
              type="text"
              id="busqueda"
              value={textoBusqueda}
              onChange={onBusquedaChange}
              placeholder="Buscar..."
              className="w-full bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 p-1.5"
            />
          </div>
          <div>
            <label htmlFor="columnaBusqueda" className="text-sm text-gray-600 block">
              Columna:
            </label>
            <select
              id="columnaBusqueda"
              value={columnaBusqueda}
              onChange={onColumnaBusquedaChange}
              className="bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-300 p-1.5"
            >
              <option value="fecha">Fecha</option>
              <option value="coatingsTotal">Coatings Total</option>
              <option value="tintTotal">Tint Total</option>
              <option value="lensTotal">Lens Total</option>
            </select>
          </div>
        </div>
      </div>
      {cargando ? (
        <div className="flex items-center justify-center py-10">
          <FaSpinner className="animate-spin text-3xl text-blue-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {registrosActuales.length > 0 ? (
            registrosActuales.map((registro, indice) => {
              const coatingsTotal = parseFloat(registro.CoatingsPrice || 0);
              const tintTotal = parseFloat(registro.TintPrice || 0);
              const lensTotal = parseFloat(registro.LensPrice || 0);
              const clickFee = parseFloat(registro.click_fee || 0);
              return (
                <div
                  key={indice}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  {/* Encabezado: muestra la fecha */}
                  <div className="bg-blue-600 p-3">
                    <h2 className="text-white font-bold text-sm">
                      {registro.fecha}
                    </h2>
                  </div>
                  {/* Cuerpo del card distribuido en dos columnas */}
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Coatings:
                      </span>
                      <span className="text-gray-600 block">
                        ${coatingsTotal.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Tint:
                      </span>
                      <span className="text-gray-600 block">
                        ${tintTotal.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Lens:
                      </span>
                      <span className="text-gray-600 block">
                        ${lensTotal.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Click Fee:
                      </span>
                      <span className="text-gray-600 block">
                        ${clickFee.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-4">
              No hay registros para este mes
            </div>
          )}
        </div>
      )}
      {/* Paginación */}
      <div className="mt-4 flex flex-col items-center">
        <div className="text-sm text-gray-600 mb-2">
          Mostrando {registrosActuales.length > 0 ? `${indicePrimerRegistro + 1} - ${Math.min(indiceUltimoRegistro, totalRegistros)}` : "0"} de {totalRegistros} registros
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginar(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`px-3 py-1 border rounded text-sm ${paginaActual === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}
          >
            Atrás
          </button>
          <span className="text-sm text-gray-600">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => paginar(paginaActual + 1)}
            disabled={paginaActual >= totalPaginas}
            className={`px-3 py-1 border rounded text-sm ${paginaActual >= totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListaFacturasPorDia;