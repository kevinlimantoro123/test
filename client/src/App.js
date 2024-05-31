import Register from "./Components/Register";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import Calendar from "./Components/calendar/Calendar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  );
}

export default App;
