import React from 'react'
import { Link } from 'react-router-dom'
import './HomeAdministrador.css' // Importa el archivo CSS para HomePage

export const HomeAdministrador = () => {
    return (
        <div className="home-page-container" style={{boxShadow: "none", marginTop: "100px"}}>
            <h1 className="title" style={{color:"#fff"}}>Bienvenido al Panel de Administración</h1>
            <div className="dashboard">
                <div className="dashboard-item">
                    <h2 style={{ color: "var(--primary-color)"}}>Administrar Pacientes</h2>
                    <p>Gestiona la información de los pacientes, incluyendo la edición y eliminación.</p>
                    <Link to="/pacientes" className="btn btn-primary">Ver Pacientes</Link>
                </div>
                <div className="dashboard-item">
                    <h2 style={{ color: "var(--primary-color)"}}>Administrar Médicos</h2>
                    <p>Gestiona la información de los médicos, incluyendo la edición y eliminación.</p>
                    <Link to="/medicos" className="btn btn-primary">Ver Médicos</Link>
                </div>
            </div>
        </div>
    )
}
