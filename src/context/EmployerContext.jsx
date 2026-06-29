import { createContext, useContext, useEffect, useMemo, useState } from "react";


const EmployerContext = createContext(null);

const defaultCompany = {
  contactName: "",
  contactTitle: "",
  companyName: "",
  email: "",
  website: "",
  industry: "",
  location: "",
  about: "",
  founded: "",
  employees: "",
  logoUrl: "",
};

// Placeholder API functions (no backend/API yet).
export const fetchCompanyProfile = async () => ({ });
export const fetchJobs = async () => [];
export const fetchApplications = async () => [];

export const EmployerProvider = ({ children }) => {
  // No localStorage: start clean on first load.
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [company, setCompany] = useState(defaultCompany);




  const getJobById = (jobId) => jobs.find((job) => job.id === Number(jobId));
  const getApplicantById = (applicantId) =>
    applicants.find((applicant) => applicant.id === Number(applicantId));
  const getApplicantsForJob = (jobId) =>
    applicants.filter((applicant) => applicant.jobId === Number(jobId));
  const getApplicantsCount = (jobId) =>
    applicants.filter((applicant) => applicant.jobId === Number(jobId)).length;

  const addJob = (job) => {
    const nextId = Math.max(0, ...jobs.map((item) => item.id)) + 1;
    const normalized = {
      ...job,
      id: nextId,
      status: "Active",
    };

    setJobs((prev) => [...prev, normalized]);
  };


  const updateJob = (jobId, updates) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === Number(jobId) ? { ...job, ...updates } : job))
    );
  };

  const removeJob = (jobId) => {
    const jobIdNum = Number(jobId);
    setJobs((prev) => prev.filter((job) => job.id !== jobIdNum));
    setApplicants((prev) => prev.filter((app) => app.jobId !== jobIdNum));
  };

  const updateCompany = (updates) => {
    setCompany((prev) => ({
      ...prev,
      ...(updates && typeof updates === "object" ? updates : {}),
    }));
  };

  const updateApplicantStatus = (applicantId, status) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === Number(applicantId)
          ? { ...applicant, status }
          : applicant
      )
    );
  };


  const value = useMemo(
    () => ({
      jobs,
      applicants,
      company,
      getJobById,
      getApplicantById,
      getApplicantsForJob,
      getApplicantsCount,
      addJob,
      updateJob,
      removeJob,
      updateCompany,
      updateApplicantStatus,
    }),
    [jobs, applicants, company]
  );

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
};


export const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (!context) {
    throw new Error("useEmployer must be used within EmployerProvider");
  }
  return context;
};
