import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployer } from "../../context/EmployerContext";
import EmployerSidebar from "./EmployerSidebar";

const STATUS_OPTIONS = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

const JobApplications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { jobs, getJobById, getApplicantsForJob, getApplicantById, updateApplicantStatus } = useEmployer();
  const job = useMemo(() => (jobId ? getJobById(jobId) : null), [getJobById, jobId]);
  const allApplicants = useMemo(
    () => (job ? getApplicantsForJob(jobId) : []),
    [getApplicantsForJob, job, jobId]
  );
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleOpenDetails = (applicantId) => {
    setSelectedApplicant(getApplicantById(applicantId));
  };

  const handleCloseDetails = () => setSelectedApplicant(null);

  const handleStatusChange = (applicantId, status) => {
    updateApplicantStatus(applicantId, status);
    if (selectedApplicant?.id === applicantId) {
      setSelectedApplicant({ ...selectedApplicant, status });
    }
  };

  const downloadResume = (applicant) => {
    const fileName = `${applicant.name.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`;
    const blob = new Blob([
      `Resume for ${applicant.name}\n\nApplied Position: ${applicant.appliedPosition}\n\nExperience:\n${applicant.experience}`,
    ], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <EmployerSidebar active="manage-jobs" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "14px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
              {job ? `Applications for ${job.title}` : "Applications"}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {job
                ? `Showing ${allApplicants.length} applicants for this job.`
                : "Select a job to see applicants."}
            </div>
          </div>
          <button
            onClick={() => navigate(job ? "/employer/manage-jobs" : "/employer/dashboard")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ← Back to jobs
          </button>
        </header>

        <main style={{ flex: 1, padding: "28px 32px" }}>
          <div style={{ display: "grid", gap: 22 }}>
            {job ? (
              <div style={{ display: "grid", gap: 18 }}>
                {allApplicants.length === 0 ? (
                  <div style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
                    color: "#6b7280",
                  }}>
                    No applicants have applied for this position yet.
                  </div>
                ) : (
                  allApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      onClick={() => handleOpenDetails(applicant.id)}
                      style={{
                        background: "#fff",
                        borderRadius: 18,
                        padding: 24,
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        alignItems: "center",
                        gap: 20,
                        cursor: "pointer",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "#c7d2fe",
                        color: "#4338ca",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 700,
                      }}>
                        {applicant.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{applicant.name}</div>
                        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{applicant.email}</div>
                        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>{applicant.appliedDate}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                        <span style={{
                          padding: "8px 14px",
                          borderRadius: 999,
                          background: "#eff6ff",
                          color: "#2563eb",
                          fontSize: 13,
                          fontWeight: 600,
                        }}>
                          {applicant.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/applicant/${applicant.id}`);
                          }}
                          style={{
                            border: "none",
                            background: "#2563eb",
                            color: "#fff",
                            borderRadius: 10,
                            padding: "10px 16px",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: 28,
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
                color: "#6b7280",
              }}>
                Select a job from Manage Jobs to view applicants.
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedApplicant && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            width: "100%",
            maxWidth: 860,
            background: "#fff",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 24, borderBottom: "1px solid #e5e7eb" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{selectedApplicant.name}</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>{selectedApplicant.appliedPosition}</div>
              </div>
              <button onClick={handleCloseDetails} style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>×</button>
            </div>

            <div style={{ padding: 24, display: "grid", gap: 22, gridTemplateColumns: "1fr 320px" }}>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Email</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{selectedApplicant.email}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Phone</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{selectedApplicant.phone}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Location</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{selectedApplicant.location}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>About Candidate</div>
                  <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{selectedApplicant.about}</p>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Experience</div>
                  <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{selectedApplicant.experience}</p>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Education</div>
                  <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{selectedApplicant.education}</p>
                </div>
              </div>

              <aside style={{ display: "grid", gap: 16 }}>
                <div style={{ background: "#f8fafc", borderRadius: 18, padding: 20 }}>
                  <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>Application Details</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#111827" }}>
                      <span>Status</span>
                      <span>{selectedApplicant.status}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#111827" }}>
                      <span>Applied Date</span>
                      <span>{selectedApplicant.appliedDate}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#111827" }}>
                      <span>Position</span>
                      <span>{selectedApplicant.appliedPosition}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 12, borderRadius: 18, border: "1px solid #e5e7eb", padding: 20 }}>
                  <button
                    onClick={() => downloadResume(selectedApplicant)}
                    style={{
                      border: "none",
                      background: "#2563eb",
                      color: "#fff",
                      borderRadius: 12,
                      padding: "12px 16px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Resume Download
                  </button>

                  <label style={{ display: "grid", gap: 8, fontSize: 13, color: "#6b7280" }}>
                    Change Status
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: "1px solid #d1d5db",
                        fontSize: 14,
                        outline: "none",
                        background: "#fff",
                        color: "#111827",
                      }}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
