import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./common/home/home.jsx";
import "./App.css";
import { AuthProvider } from "./user/context/AuthContext.jsx";
import ProtectedRouter from "./ProtectedRouter.jsx";
import { PerfilUsuario } from "./user/pages/PerfilUsuario/PerfilUsuario.jsx";
import { Start } from "./user/pages/Start/Start";
import About from "./user/pages/About/About";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loginUser" element={<Home />}></Route>
          <Route path="/loginCompany" element={<Home />}></Route>
          <Route path="/registerUser" element={<Home />}></Route>
          <Route path="/registerCompany" element={<Home />}></Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/profileUser" element={<PerfilUsuario />}></Route>
            <Route path="/Start" element={<Start />}></Route>
            {/* <Route path="/Publicar" element={<Publicar/>}></Route> */}
          </Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
