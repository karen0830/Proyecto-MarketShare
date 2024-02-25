import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./common/home/home.jsx";
import "./App.css";
import { AuthProvider } from "./common/context/AuthContext.jsx";
import { ProtectedRouter, ProtectedRouterCompany} from "./ProtectedRouter.jsx";
import { PerfilUsuario } from "./user/pages/PerfilUsuario/PerfilUsuario.jsx";
import { Start } from "./user/pages/Start/Start";
import About from "./user/pages/About/About";

// Company

import HomeCompany from "./company/pages/HomeCompany/HomeCompany.jsx";
import { PerfilCompany } from "./company/pages/PerfilCompany/PerfilCompany.jsx";
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
            <Route path="/start" element={<Start />}></Route>
            {/* <Route path="/Publicar" element={<Publicar/>}></Route> */}
          </Route>
          <Route element={<ProtectedRouterCompany />}>
            <Route path="/homeCompany" element={<HomeCompany />}></Route>
            <Route path="/profileCompany" element={<PerfilCompany />}></Route>
            {/* <Route path="/Publicar" element={<Publicar/>}></Route> */}
          </Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
