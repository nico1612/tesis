import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthRouter } from "../login";
import { UsuariosRouter } from "../usuarios/router/UsuariosRouter";
import { MedicoRouter } from "../../medico/router/MedicoRouter";

export const AppRouter = () => {
  const { status, rol } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Rutas autenticadas */}
      {status === "authenticated" ? (
        <>
          {rol === "PACIENTE_ROLE" && <Route path="/*" element={<UsuariosRouter />} />}
          {rol === "MEDICO_ROLE" && <Route path="/*" element={<MedicoRouter />} />}
        </>
      ) : (
        // Rutas para usuarios no autenticados
        <Route path="/auth/*" element={<AuthRouter />} />
      )}

      {/* Ruta por defecto si ninguna de las anteriores coincide */}
      <Route path="/*" element={<Navigate to="/auth/" />} />
    </Routes>
  );
};