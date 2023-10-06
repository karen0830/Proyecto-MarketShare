import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouter from "./ProtectedRouter";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Home />}></Route>
          <Route path="/register" element={<Home />}></Route>
          <Route path="/registerCompany" element={<Home />}></Route>
          <Route element={<ProtectedRouter/>}>
            <Route path="/profile" element={<h1> Profile </h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
