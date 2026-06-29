import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./Pages/LandingPage/Landingpage";
import SignUp from "./Pages/Auth/SignUP";
import Login from "./Pages/Auth/Login";
import JobseekerDashboard from "./Pages/Jobseeker/JobseekerDashboard";
import JobDetails from "./Pages/Jobseeker/jobdetails";
import SavedJobs from "./Pages/Jobseeker/Savedjob";
import UserProfile from "./Pages/Jobseeker/Userprofile";
import EditProfile from "./Pages/Jobseeker/EditProfile";
import EmployerDashboard from "./Pages/Employer/EmployerDashboard";
import JobPostingForm from "./Pages/Employer/JobpostingForm";
import ManageJobs from "./Pages/Employer/ManageJob";
import EmployerProfilePage from "./Pages/Employer/EmployerProfile";
import ApplicantProfile from "./Pages/Employer/ApplicantProfile";
import JobApplications from "./Pages/Employer/JobApplications";
import ProtectedRoute from "./Routers/ProductedRouts";
import { EmployerProvider } from "./context/EmployerContext";
import { AuthProvider } from "./context/Authcontext";

const App = () => {
  return (
    <AuthProvider>
      <EmployerProvider>
        <div>
          <Router>
            <Routes>
              {/* Global route error boundary (fallback): keep navigation from rendering a blank screen */}

              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              {/* Job Browse Routes - Public, but can have authenticated features */}
              <Route path="/jobs/:jobId" element={<JobDetails />} />

              {/* Employer Protected Routes */}
              <Route element={<ProtectedRoute requiredRole="employer" />}>
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/post-job" element={<JobPostingForm />} />
                <Route path="/employer/manage-jobs" element={<ManageJobs />} />
                <Route path="/employer/profile" element={<EmployerProfilePage />} />
                <Route path="/job/:jobId/applications" element={<JobApplications />} />
                <Route path="/applicant/:id" element={<ApplicantProfile />} />
              </Route>

              {/* Job Seeker Protected Routes */}
              <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
                <Route path="/find-jobs" element={<JobseekerDashboard />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </div>
      </EmployerProvider>
    </AuthProvider>
  );
};

export default App;
