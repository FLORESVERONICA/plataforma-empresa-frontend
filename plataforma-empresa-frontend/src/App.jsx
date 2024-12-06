import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from './tempRoute/Router.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
