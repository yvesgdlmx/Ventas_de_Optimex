import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import './index.css';

const InkCobrados = lazy(() => import('../paginas/InkCobrados'));
const InkNoCobrados = lazy(() => import('../paginas/InkNoCobrados'));
const InkFacturasPorDia = lazy(() => import('../paginas/InkFacturasPorDia'));
const InkMermas = lazy(() => import('../paginas/InkMermas'))
const InkConsumoMaterial = lazy(() => import('../paginas/InkConsumoMaterial'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<InkCobrados />} />
            <Route path='/facturacion-ink-nocobrados' element={<InkNoCobrados />} />
            <Route path='/facturacion-ink-agrupacion-diaria' element={<InkFacturasPorDia />} />
            <Route path='/facturacion-ink-mermas' element={<InkMermas />} />
            <Route path='/ink-consumo-material' element={<InkConsumoMaterial/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;