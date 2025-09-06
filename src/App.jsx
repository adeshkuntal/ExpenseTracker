import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes> 
  </BrowserRouter>
);

export default App;