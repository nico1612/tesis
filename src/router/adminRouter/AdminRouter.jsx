import { Modificar } from "../../components/ModificarUsuarios/Modificar";
import { ModificarPaciente } from "../../components/ModificarUsuarios/modificarPaciente";
import { AdminMedicosPages } from "../../components/pages/adminMedicos/AdminMedicosPage"
import {AdminPacientesPages} from "../../components/pages/AdminPacientes/AdminPacientesPage"
import "./AdminRoute.css"
import { Navigate, Route, Routes } from "react-router-dom";
import { HeaderAdmin } from "../../components/header/HeaderAdmin";
import { Footer } from "../../components/footer/Footer";
import { HomeAdministrador } from "../../components/pages/homeAdministrador/HomeAdministrador";

export const AdminRoute = () => {
  return (
    <div className="admin-route-container">
      <HeaderAdmin />
      <div className="main-content" style={{marginBottom: '150px'}}>
        <Routes>
          <Route path="/home" element={<HomeAdministrador />} />
          <Route path="/pacientes" element={<AdminPacientesPages />} />
          <Route path="/pacientes/:paciente" element={<ModificarPaciente/>} />
          <Route path="/medicos" element={<AdminMedicosPages />} />
          <Route path="/medicos/:medico" element={<Modificar />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
