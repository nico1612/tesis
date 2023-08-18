import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterMedicosPage, RegisterPage } from "../pages";
import { Navbar, Footer } from "../components";
import { body, cuerpo } from "../helpers/estilosHome";

export const AuthRouter = () => {
  return (
    <div >
      <Navbar />
      <div style={{ ...cuerpo, ...body }}>
        <Routes>
          <Route path="/" element={<HomePage style={{ marginBottom: '88px' }} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/medico" element={<RegisterMedicosPage />} />

          <Route path="/*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
     
      <Footer />
    </div>
  );
};
