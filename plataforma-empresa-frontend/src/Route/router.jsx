import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../components/Register";
import Dashboard from "../pages/Dashboard";
import RRHH from "../pages/RRHH";
import Produccion from "../pages/Produccion";
import WorkDetails from "../pages/WorkDetails";
import Calendar from "../pages/pagesrrhh/Calendar";
import Personal from "../pages/pagesProduccion/Personal";
import ListaDeTrabajadores from "../pages/pagesrrhh/ListaDeTrabajadores";
import Horarios from "../pages/pagesProduccion/Horarios";
import GestionPuestos from "../pages/pagesProduccion/GestionPuestos";
import PrivateRoute from "../components/PrivateRoute";
import Unauthorized from "../pages/Unauthorized"; // Nueva página

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Página de acceso denegado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "manager"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/rrhh/*"
          element={
            <PrivateRoute allowedRoles={["admin", "rrhh"]}>
              <RRHH />
            </PrivateRoute>
          }
        />
        <Route
          path="/worker/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "rrhh", "manager"]}>
              <WorkDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/produccion/*"
          element={
            <PrivateRoute allowedRoles={["admin", "produccion"]}>
              <Produccion />
            </PrivateRoute>
          }
        >
          <Route
            path="personal"
            element={
              <PrivateRoute allowedRoles={["admin", "produccion"]}>
                <Personal />
              </PrivateRoute>
            }
          />
          <Route
            path="calendario-laboral"
            element={
              <PrivateRoute allowedRoles={["admin", "produccion"]}>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="lista-trabajadores"
            element={
              <PrivateRoute allowedRoles={["admin", "rrhh"]}>
                <ListaDeTrabajadores />
              </PrivateRoute>
            }
          />
          <Route
            path="horarios"
            element={
              <PrivateRoute allowedRoles={["admin", "produccion"]}>
                <Horarios />
              </PrivateRoute>
            }
          />
          <Route
            path="gestion-puestos"
            element={
              <PrivateRoute allowedRoles={["admin", "produccion"]}>
                <GestionPuestos />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
