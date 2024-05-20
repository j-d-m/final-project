//**This code sets up a React application with routing using react-router-dom, lazy loading components using React's lazy and Suspense for code splitting, and includes a context provider (ContextContainer) for state management. The application has various routes defined for different pages, and a fallback UI is displayed while the lazy-loaded components are being fetched. The application also includes Bootstrap for styling and custom SCSS styles. */

// Native imports
import { Routes, Route } from "react-router-dom";

// External imports
import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextContainer from "./Context/ContextContainer";
import "./styles/App.scss";
// Lazy loading components for code splitting and better performance
const HomeComponent = lazy(() => import("./components/home/Home"));

const HeaderComponent = lazy(() => import("./components/navbar/Header"));

const PageNotFoundComponent = lazy(() =>
  import("./components/not-found/NotFound")
);
const FooterComponent = lazy(() => import("./components/footer/Footer"));
const CompanyLoginComponent = lazy(() =>
  import("./components/company/company-login/CompanyLogin")
);
const CompanySignUpComponent = lazy(() =>
  import("./components/company/company-sign-up/CompanySignUp")
);
const FreeLancerLoginComponent = lazy(() =>
  import("./components/freelancer/freelancer-login/FreelancerLogin")
);
const FreelancerProfileComponent = lazy(() =>
  import("./components/freelancer/freelancer-profile/FreelancerProfile")
);
const FreelancerSignUpComponent = lazy(() =>
  import("./components/freelancer/freelancer-sign-up/FreelancerSignUp")
);
const CompanyProfileComponent = lazy(() =>
  import("./components/company/company-profile/CompanyProfile")
);
const CreateJobComponent = lazy(() =>
  import("./components/company/company-profile/company-create-job/CreateJob")
);
const FreelancerViewComponent = lazy(() =>
  import("./components/freelancer/freelancer-profile/FreelancerView")
);
const CompanyJobsComponent = lazy(() =>
  import(
    "./components/company/company-profile/company-see-all-jobs/CompanyJobs"
  )
);
const FreelancerHomeComponent = lazy(() =>
  import("./components/home/FreelancerHome")
);

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="m2-auto text-center loading-block Spinner-Media ">
            <img
              src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
              alt="img"
            />
          </div>
        }
      >
        {/* ContextContainer to provide context to the entire application */}

        <ContextContainer>
          <HeaderComponent />
          {/* Main content area */}
          <main className="container-fluid">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route
                path="/company-login"
                element={<CompanyLoginComponent />}
              />
              <Route
                path="/company-signUp"
                element={<CompanySignUpComponent />}
              />
              <Route
                path="/freelancer-login"
                element={<FreeLancerLoginComponent />}
              />
              <Route
                path="/freelancer-profile"
                element={<FreelancerProfileComponent />}
              />
              <Route
                path="/freelancer-signUp"
                element={<FreelancerSignUpComponent />}
              />
              <Route
                path="/freelancer-list"
                element={<FreelancerHomeComponent />}
              />
              <Route
                path="/freelancer-view"
                element={<FreelancerViewComponent />}
              />
              <Route
                path="/company-profile"
                element={<CompanyProfileComponent />}
              />
              <Route
                path="/company-profile/create-job"
                element={<CreateJobComponent />}
              />
              <Route
                path="/company-profile/company-jobs"
                element={<CompanyJobsComponent />}
              />
              {/* Catch-all route for 404 Page Not Found */}
              <Route path="*" element={<PageNotFoundComponent />} />
            </Routes>
          </main>
          <FooterComponent />
        </ContextContainer>
      </Suspense>
    </>
  );
}

export default App;
