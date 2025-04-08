import { Routes, Route } from 'react-router-dom';
import App from '../App';
import EmployeeDetails from '../pages/EmployeeDetails';
import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee/:id" element={<EmployeeDetails />} />
    </Routes>
  );
}
