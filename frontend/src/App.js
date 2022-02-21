// Native imports
import { Routes, Route } from 'react-router-dom';

//Component imports
import './App.scss';
import Home from './components/home/Home';
import Header from './components/navbar/Header';
import PageNotFound from './components/not-found/NotFound';
import Footer from './components/footer/Footer';
import CompanyLogin from './components/company/company-login/CompanyLogin';
import FreeLancerLogin from './components/freelancer/freelancer-login/FreelancerLogin';
import FreelancerProfile from './components/freelancer/freelancer-profile/FreelancerProfile';
import CompanyProfile from './components/company/company-profile/CompanyProfile';


// External imports

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <Header />
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
