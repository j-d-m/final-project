// Native imports
import { Routes, Route } from 'react-router-dom';

//Component imports
import './App.scss';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/navbar';
import PageNotFound from './pages/not-found/NotFound';
import Footer from './components/Footer/Footer';
import CompanyLogin from './pages/company/company-login/CompanyLogin';
import FreeLancerLogin from './pages/freelancer/freelancer-login/FreelancerLogin';
import FreelancerProfile from './pages/freelancer/freelancer-profile/FreelancerProfile';
import CompanyProfile from './pages/company/company-profile/CompanyProfile';

// External imports
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <Navbar />
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/freelancer-login" element={<FreeLancerLogin />} />
          <Route path="/freelancer-profile" element={<FreelancerProfile />} />
          <Route path="/company-profile" element={<CompanyProfile />} />


          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </>

  );
}

export default App;
