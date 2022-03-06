// Native imports
import { Routes, Route } from "react-router-dom";

// External imports

import "bootstrap/dist/css/bootstrap.min.css";
import ContextContainer from "./Context/ContextContainer";

//Component imports
import "./styles/App.scss";
import Home from "./components/home/Home";
import Header from "./components/navbar/Header";
import PageNotFound from "./components/not-found/NotFound";
import Footer from "./components/footer/Footer";
import CompanyLogin from "./components/company/company-login/CompanyLogin";
import CompanySignUp from "./components/company/company-sign-up/CompanySignUp";
import FreeLancerLogin from "./components/freelancer/freelancer-login/FreelancerLogin";
import FreelancerProfile from "./components/freelancer/freelancer-profile/FreelancerProfile";
import FreelancerSignUp from "./components/freelancer/freelancer-sign-up/FreelancerSignUp";
import CompanyProfile from "./components/company/company-profile/CompanyProfile";
import CreateJob from "./components/company/company-profile/company-create-job/CreateJob";
import FreelancerView from "./components/freelancer/freelancer-profile/FreelancerView";
import CompanyJobs from "./components/company/company-profile/company-see-all-jobs/CompanyJobs";

function App() {
  return (
    <>
      <ContextContainer>
        <Header />

        <main className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/company-login" element={<CompanyLogin />} />
            <Route path="/company-signUp" element={<CompanySignUp />} />
            <Route path="/freelancer-login" element={<FreeLancerLogin />} />
            <Route path="/freelancer-profile" element={<FreelancerProfile />} />
            <Route path="/freelancer-signUp" element={<FreelancerSignUp />} />
            <Route path="/freelancer-view" element={<FreelancerView />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/company-profile/create-job" element={<CreateJob />} />
            <Route
              path="/company-profile/company-jobs"
              element={<CompanyJobs />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </ContextContainer>
    </>
  );
}

export default App;
