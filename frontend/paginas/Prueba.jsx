import React from 'react'

const Prueba = () => {
  return (
    <>
    <div className='head'></div>
    <div className='prueba'>
      <div className='border'>
        <div className='prueba__flex'>
          <img src="/img/logo_real.png" alt="" className='prueba__img'/>
          <div className='prueba__datos'>
              <h2 className='prueba__h2'>Factura de venta</h2>
              <p className='prueba__p'>Fecha de orden: <span className='prueba__span'>2024/06/10</span></p>
          </div>
        </div>
      </div>
      <div className='bb'>
        <div className='prueba__flex mt mb'>
          <div className='prueba-campo__flex'>
              <h2 className='prueba__h2'>Cliente:</h2>
              <p className='prueba__p'>Direccion: <span>Calle cualquiera #543 calle cualquiera, colonia cualquiera.</span></p>
              <p className='prueba__p'>Email: <span>empresa_cualquiera@correo.com</span></p>
              <p className='prueba__p'>telefono: <span>33-98-67-56-54</span></p>
          </div>
          <div className='prueba-campo__flex'>
              <h2 className='prueba__h2'>Empresa:</h2>
              <p className='prueba__p'>Direccion: <span>Calle cualquiera #543 calle cualquiera, colonia cualquiera.</span></p>
              <p className='prueba__p'>Email: <span>empresa_cualquiera@correo.com</span></p>
              <p className='prueba__p'>telefono: <span>33-98-67-56-54</span></p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Prueba
