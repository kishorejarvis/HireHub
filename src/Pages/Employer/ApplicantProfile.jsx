import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployer } from "../../context/EmployerContext";

const ApplicantProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getApplicantById, getJobById } = useEmployer();
  const applicant = getApplicantById(id);

  useEffect(() => {
    if (!applicant) {
      navigate("/employer/dashboard", { replace: true });
    }
  }, [applicant, navigate]);

  if (!applicant) return null;

  const job = getJobById(applicant.jobId);
  const resumeFileName = `${applicant.name.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`;

  const downloadSampleResume = () => {
    const sampleText = `Resume for ${applicant.name}\n\nApplied Position: ${applicant.appliedPosition}\n\nSummary:\n${applicant.about}`;
    const blob = new Blob([sampleText], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resumeFileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "28px 24px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          ← Back
        </button>

        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ width: 110, height: 110, borderRadius: 24, background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#4338ca", fontSize: 36, fontWeight: 700 }}>
                {applicant.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>{applicant.name}</div>
                <div style={{ fontSize: 15, color: "#2563eb", marginTop: 6 }}>{applicant.appliedPosition}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14, color: "#6b7280", fontSize: 14 }}>
                  <span>{applicant.location}</span>
                  <span>•</span>
                  <span>{applicant.email}</span>
                  <span>•</span>
                  <span>{applicant.phone}</span>
                </div>
              </div>
              <button
                onClick={downloadSampleResume}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Download Resume
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1.4fr 1fr" }}>
            <div style={{ display: "grid", gap: 24 }}>
              <section style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Candidate Overview</div>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Location</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.location}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Email</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.email}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Phone</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.phone}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Applied Position</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.appliedPosition}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Application Status</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.status}</div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Applied Date</div>
                    <div style={{ fontSize: 15, color: "#111827" }}>{applicant.appliedDate}</div>
                  </div>
                  {job && (
                    <div style={{ display: "grid", gap: 6 }}>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>Related Job</div>
                      <div style={{ fontSize: 15, color: "#111827" }}>{job.title}</div>
                    </div>
                  )}
                </div>
              </section>

              <section style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {applicant.skills.map((skill) => (
                    <span key={skill} style={{ background: "#eff6ff", color: "#1d4ed8", borderRadius: 999, padding: "10px 14px", fontSize: 13, fontWeight: 600 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <section style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>About Candidate</div>
                <p style={{ lineHeight: 1.75, color: "#4b5563", fontSize: 15 }}>{applicant.about}</p>
              </section>

              <section style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Experience</div>
                <p style={{ lineHeight: 1.75, color: "#4b5563", fontSize: 15 }}>{applicant.experience}</p>
              </section>

              <section style={{ background: "#fff", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Education</div>
                <p style={{ lineHeight: 1.75, color: "#4b5563", fontSize: 15 }}>{applicant.education}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
