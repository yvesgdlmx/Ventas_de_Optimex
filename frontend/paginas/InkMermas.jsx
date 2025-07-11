import React, { useState, useEffect } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import { PDFDownloadLink } from '@react-pdf/renderer';
import clienteAxios from '../config/clienteAxios';
import PdfInkMermas from '../components/pdf_components/PdfInkMermas';
const monthOptions = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '40px',
    border: '1px solid #ccc',
    boxShadow: 'none'
  }),
  indicatorSeparator: () => null
};
// Función para calcular el mes anterior
const getDefaultMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // De 1 a 12
  let previousMonth = currentMonth - 1;
  // Si es enero, el mes anterior es diciembre
  if (previousMonth === 0) previousMonth = 12;
  // Aseguramos el formato de dos dígitos
  const previousMonthStr = previousMonth < 10 ? `0${previousMonth}` : `${previousMonth}`;
  // Retornamos el objeto correspondiente en monthOptions
  return monthOptions.find(option => option.value === previousMonthStr);
};
const InkMermas = () => {
  const defaultSelectedMonth = getDefaultMonth();
  const [selectedMonth, setSelectedMonth] = useState(defaultSelectedMonth);
  const [mermCostData, setMermCostData] = useState(null);
  useEffect(() => {
    const obtenerDatosMermCost = async () => {
      try {
        const { data } = await clienteAxios(`/orders/merm-cost/${selectedMonth.value}`);
        console.log("Datos obtenidos para el mes", selectedMonth.value, data);
        setMermCostData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    obtenerDatosMermCost();
  }, [selectedMonth]);
  let sumaCost = 0;
  let sumaCostMerm = 0;
  let fivePercent = 0;
  let diferencia = 0;
  let percentDiferencia = 0;
  let total = 0;
  if (mermCostData && mermCostData.length) {
    const { suma_cost, suma_cost_merm } = mermCostData[0];
    sumaCost = parseFloat(suma_cost);
    sumaCostMerm = parseFloat(suma_cost_merm);
    fivePercent = sumaCost * 0.05;
    diferencia = sumaCostMerm - sumaCost;
    percentDiferencia = (diferencia / sumaCost) * 100;
    total = diferencia - fivePercent;
  }
  return (
    <div className="space-y-6">
      {/* Sección PDF y botón de descarga */}
      <div className="flex flex-col items-center justify-center bg-white py-6">
        <h1 className="text-3xl font-bold mb-2 uppercase text-gray-500">INK - Mermas</h1>
        <p className="text-sm text-gray-500 mb-4">
          Mostrando la información de Mermas de la sección.
        </p>
        <PDFDownloadLink
          document={
            <PdfInkMermas
              sumaCost={sumaCost}
              sumaCostMerm={sumaCostMerm}
              fivePercent={fivePercent}
              diferencia={diferencia}
              percentDiferencia={percentDiferencia}
              total={total}
              selectedMonth={selectedMonth}
            />
          }
          fileName={`mermas_${selectedMonth.value}.pdf`}
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
      {/* Divisor para separar la sección del PDF y la siguiente sección */}
      <div className="w-full border-t-1 shadow-sm border-gray-200"></div>
      {/* Contenedor combinado: Select y Totales */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
        <div className="bg-white rounded max-w-xs w-full">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Selecciona un mes
          </label>
          <Select
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            styles={customSelectStyles}
          />
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 max-w-xs w-full">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600 uppercase">Suma Cost:</span>
            <span className="text-gray-600 font-semibold">{sumaCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 uppercase">Suma Cost Merm:</span>
            <span className="text-gray-600 font-semibold">{sumaCostMerm.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Tarjeta de Cálculos */}
      <div className="bg-white rounded shadow-xl max-w-2xl mx-auto mt-8">
        <div className="bg-blue-500 text-white py-2 px-4 rounded-t">
          <h2 className="text-lg font-bold">Cálculos</h2>
        </div>
        <div className="p-8 border-l border-l-gray-200 border-b border-b-gray-200 border-r border-r-gray-200">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">5% de Suma Cost:</span>
              <span className="text-gray-800">{fivePercent.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">Calculado como Suma Cost x 0.05</p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">Diferencia (Merm - Cost):</span>
              <span className="text-gray-800">{diferencia.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">Calculado como Suma Cost Merm - Suma Cost</p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">% Diferencia sobre Suma Cost:</span>
              <span className="text-gray-800">{percentDiferencia.toFixed(2)}%</span>
            </div>
            <p className="text-xs text-gray-500">(Diferencia / Suma Cost) x 100</p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="text-gray-800">{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">Calculado como (Diferencia - 5% de Suma Cost)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InkMermas;