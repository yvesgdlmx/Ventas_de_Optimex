import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from '../layouts/Layout';
import Index from '../components/TablasDiario';
import Prueba from '../paginas/Prueba';
import Secciones from '../paginas/Secciones';
import TablaSemanalCobrados from '../components/TablaSemanalCobrados';
import TablaSemanalNoCobrados from '../components/tablaSemanalNocobrados';
import TablaCobrados from '../components/TablaCobrados';
import TablaNoCobrados from '../components/TablaNoCobrados';
import './index.css'
import TablasDiario from '../components/TablasDiario';

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<Secciones/>} />
                <Route path='/diarios' element={<TablasDiario/>}/>
                <Route path='/semanales' element={<TablaSemanalCobrados/>} />
                <Route path='/semanales-sinCobrar' element={<TablaSemanalNoCobrados/>}/>
                <Route path='/cobrados' element={<TablaCobrados/>}/>
                <Route path='/no-cobrados' element={<TablaNoCobrados/>}/>
              </Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
