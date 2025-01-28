import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/sesiones">Sesiones</Link>
        </li>
        <li>
          <Link to="/sesion-sin-csv">Sesión sin CSV</Link> {/* Nueva opción */}
        </li>
        <li>
          <Link to="/pelicula">Película</Link>
        </li>
        <li>
          <Link to="/compra">Compra</Link>
        </li>
        <li>
          <Link to="/modificacion">Modificación</Link>
        </li>
        <li>
          <Link to="/devolucion">Devolución</Link>
        </li>
        <li>
          <Link to="/reportes">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
