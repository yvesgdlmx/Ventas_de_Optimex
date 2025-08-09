import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { FaChevronDown, FaFileInvoice, FaBars, FaTimes } from 'react-icons/fa';
const Layout = () => {
  const [facturasOpen, setFacturasOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleFacturas = () => setFacturasOpen(!facturasOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // Obtenemos la ruta actual usando useLocation
  const location = useLocation();
  // Mapeo de rutas a títulos para el header
  let sectionTitle = "";
  switch (location.pathname) {
    case '/':
    case '/facturacion-ink-cobrados':
      sectionTitle = 'INK - Cobrados';
      break;
    case '/facturacion-ink-nocobrados':
      sectionTitle = 'INK - No Cobrados';
      break;
    case '/facturacion-ink-agrupacion-diaria':
      sectionTitle = 'INK - Agrupación Diaria';
      break;
    case '/facturacion-ink-mermas': 
      sectionTitle = 'INK - Mermas';
      break;
    default:
      sectionTitle = "";
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar para pantallas grandes */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-72 border-r border-gray-300 bg-white text-gray-700 flex-col">
        <div className="p-4 ml-10">
          <Link to="/">
            <img src="/img/logo_real.png" alt="Logo" className="w-40" />
          </Link>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            {/* Ítem Facturas & PDF con funcionalidad desplegable */}
            <li 
              className="px-8 py-2 flex items-center justify-between hover:bg-gray-200 rounded cursor-pointer"
              onClick={toggleFacturas}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <FaFileInvoice />
                <span>Facturas & PDF</span>
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 ${facturasOpen ? "rotate-180" : "rotate-0"}`}
              />
            </li>
            {facturasOpen && (
              <ul className="ml-5 mr-5">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Cobrados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-nocobrados"
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - No Cobrados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-agrupacion-diaria"
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Agrupación Diaria
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-mermas"
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Mermas
                  </NavLink>
                </li>
              </ul>
            )}
          </ul>
        </nav>
        <footer className="p-4 text-sm text-gray-600">
          © 2025 Optimex SA de CV
        </footer>
      </aside>
      {/* Sidebar para pantallas pequeñas */}
      <aside className={`md:hidden fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-300 text-gray-700 flex flex-col transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src="/img/logo_real.png" alt="Logo" className="w-40" />
          </Link>
          <button onClick={toggleSidebar} className="text-gray-600">
            <FaTimes />
          </button>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            <li 
              className="px-8 py-2 flex items-center justify-between hover:bg-gray-200 rounded cursor-pointer"
              onClick={toggleFacturas}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <FaFileInvoice />
                <span>Facturas & PDF</span>
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 ${facturasOpen ? "rotate-180" : "rotate-0"}`}
              />
            </li>
            {facturasOpen && (
              <ul className="ml-5 mr-5">
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Cobrados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-nocobrados"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - No Cobrados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-agrupacion-diaria"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Agrupación Diaria
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/facturacion-ink-mermas"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      "block px-6 py-2 rounded " +
                      (isActive ? "bg-gray-200 text-gray-700" : "text-gray-500 hover:bg-gray-100")
                    }
                  >
                    INK - Mermas
                  </NavLink>
                </li>
              </ul>
            )}
          </ul>
        </nav>
        <footer className="p-4 text-sm text-gray-600">
          © 2025 Optimex SA de CV
        </footer>
      </aside>
      <div className="flex-1 flex flex-col md:ml-72">
        <header className="border-b border-gray-200 p-4 px-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Botón hamburguesa: Visible sólo en pantallas pequeñas */}
            <button onClick={toggleSidebar} className="md:hidden text-gray-600 focus:outline-none">
              <FaBars />
            </button>
            <p className="text-gray-600">
              Facturas & PDF
              {sectionTitle && (
                <>
                  {" / "}
                  <span className="font-semibold">{sectionTitle}</span>
                </>
              )}
            </p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;