import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaChevronDown, FaFileInvoice } from 'react-icons/fa';
const Layout = () => {
  const [facturasOpen, setFacturasOpen] = useState(false);
  const toggleFacturas = () => setFacturasOpen(!facturasOpen);
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
      <aside className="fixed inset-y-0 left-0 w-72 border-r border-gray-300 text-white flex flex-col">
        <div className="p-4 ml-10">
          <Link to="/">
            <img src="/img/logo_real.png" alt="Logo" className="w-40" />
          </Link>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            {/* Ítem Facturas & PDF con funcionalidad desplegable */}
            <li 
              className="px-8 py-2 text-gray-600 flex items-center justify-between hover:bg-gray-200 rounded cursor-pointer"
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
            {/* Enlaces anidados con el orden modificado */}
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
      <div className="flex-1 flex flex-col ml-72">
        <header className="border-b border-gray-200 p-4 px-14">
          <p className="text-gray-600">
            Facturas & PDF
            {sectionTitle && (
              <>
                {" / "}
                <span className="font-semibold">{sectionTitle}</span>
              </>
            )}
          </p>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;