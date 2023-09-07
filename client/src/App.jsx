import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/layout/home/home";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Home />}></Route>
          <Route path="/register" element={<Home />}></Route>
          <Route path="/registerC" element={<Home />}></Route>
          <Route path="/profile" element={<h1> Profile </h1>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
