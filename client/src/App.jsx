import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/home";
import "App.css";
import { AuthProvider } from "context/AuthContext";
import ProtectedRouter from "ProtectedRouter";
import { PerfilUsuario } from "pages/PerfilUsuario/PerfilUsuario";
import { Start } from "pages/Start/Start";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loginUser" element={<Home />}></Route>
          <Route path="/registerUser" element={<Home />}></Route>
          <Route path="/registerCompany" element={<Home />}></Route>
          <Route element={<ProtectedRouter/>}>
            <Route path="/profileUser" element={<PerfilUsuario/>}></Route>
            <Route path="/Start" element={<Start/>}></Route>
            {/* <Route path="/Publicar" element={<Publicar/>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
