import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import PatientPortal from './PatientPortal';
import DoctorPortal from './DoctorPortal';
import AdminPortal from './AdminPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/patient/*" element={<PatientPortal />} />
        <Route path="/doctor/*" element={<DoctorPortal />} />
        <Route path="/admin/*" element={<AdminPortal />} />
      </Routes>
    </BrowserRouter>
  );
}
