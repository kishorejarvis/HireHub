// API route definitions.
// These match a standard MERN auth/job structure and are intended to be
// replaced/confirmed once the backend exists.

const Apipath = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
  },
  jobs: {
    list: "/api/jobs",
    details: (jobId) => `/api/jobs/${jobId}`,
    apply: (jobId) => `/api/jobs/${jobId}/apply`,
    save: (jobId) => `/api/jobs/${jobId}/save`,
    unsave: (jobId) => `/api/jobs/${jobId}/unsave`,
  },
  employer: {
    jobs: "/api/employer/jobs",
    applications: "/api/employer/applications",
  },
  profile: {
    jobseeker: "/api/profile/jobseeker",
    employer: "/api/profile/employer",
  },
};

export default Apipath;

