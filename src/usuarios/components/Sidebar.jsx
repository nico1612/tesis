import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar navbar-light bg-light">
        <br/>
      <ul>
        <li><Link to="/dato">Datos personales</Link></li>
        <li><Link to="/solicitudes"> solicitudes</Link></li>
        {/* Agrega más enlaces aquí */}
      </ul>
    </div>
  );
};

