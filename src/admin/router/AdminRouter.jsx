import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { AdminMedicosPages, AdminPacientesPages, HomePage } from "../pages";
import { Modificar } from "../pages/Modificar";
import { ModificarPaciente } from "../pages/modificarPaciente";
import { Sidebar } from "../components/sideBar";

export const AdminRoute = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <div style={{ padding: "20px", flexGrow: 1 }}>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/pacientes" element={<AdminPacientesPages />} />
              <Route path="/pacientes/:paciente" element={<ModificarPaciente />} />
              <Route path="/medicos" element={<AdminMedicosPages />} />
              <Route path="/medicos/:medico" element={<Modificar />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          <Footer style={{bottom: "0"}} />
        </div>
      </div>
    );
  };