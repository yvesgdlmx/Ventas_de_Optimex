import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <div className='header__flex'>
          <div className='header__campo-logo'>
            <Link to={"/"}>
            <div className='header__logo'>
              <img src="/img/logo_real.png" alt="Logo" width={190}/>
            </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="main contenedor">
        <div className="main__contenido">
          <Outlet/>
        </div>
      </main>
    </>
  );
}

export default Layout;