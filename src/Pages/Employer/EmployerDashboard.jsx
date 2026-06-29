import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { useEmployer } from "../../context/EmployerContext";

const Sidebar = ({ active, navigate, handleLogout }) => {
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "⊞", path: "/employer/dashboard" },
    { key: "post-job", label: "Post Job", icon: "+", path: "/employer/post-job" },
    { key: "manage-jobs", label: "Manage Jobs", icon: "☰", path: "/employer/manage-jobs" },
    { key: "profile", label: "Company Profile", icon: "🗂", path: "/employer/profile" },
  ];

  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #e5e7eb", display: "flex",
      flexDirection: "column", padding: "24px 12px", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <div style={{
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
  }}>💼</div>
  <span style={{
    fontSize: 20,
    fontWeight: 900,
    background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  }}>HireHub</span>
</div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <button key={item.key} onClick={() => navigate(item.path)} style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%",
            padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer",
            marginBottom: 4, fontSize: 14,
            fontWeight: active === item.key ? 600 : 400,
            color: active === item.key ? "#2563eb" : "#6b7280",
            background: active === item.key ? "#eff6ff" : "transparent",
            textAlign: "left",
          }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
        border: "none", background: "transparent", color: "#6b7280",
        fontSize: 14, cursor: "pointer", borderRadius: 10, width: "100%", textAlign: "left",
      }}>
        <span>→</span> Logout
      </button>
    </aside>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { jobs, applicants } = useEmployer();
  const userName = localStorage.getItem("userName") || "John Davis";

  const jobList = Array.isArray(jobs) ? jobs : [];
  const applicantList = Array.isArray(applicants) ? applicants : [];

  const totalApplicants = applicantList.length;
  const hiredCount = applicantList.filter((a) => a.status === "Selected").length;
  const activeJobsCount = jobList.filter((j) => j.status === "Active").length;

  const stats = useMemo(
    () => [
      {
        label: "Active Jobs",
        value: activeJobsCount,
        icon: "💼",
        bg: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        percent: "100%",
      },
      {
        label: "Total Applicants",
        value: totalApplicants,
        icon: "👥",
        bg: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
        percent: "100%",
      },
      {
        label: "Hired",
        value: hiredCount,
        icon: "✅",
        bg: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        percent: "100%",
      },
    ],
    [activeJobsCount, totalApplicants, hiredCount]
  );


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <Sidebar active="dashboard" navigate={navigate} handleLogout={handleLogout} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "14px 32px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Welcome back!</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Here's what's happening with your jobs today.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", background: "#dbeafe",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, color: "#2563eb", fontSize: 14,
            }}>{userName.charAt(0)}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{userName}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Employer</div>
            </div>
            <span style={{ color: "#6b7280", fontSize: 12 }}>▼</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: "28px 32px" }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                background: s.bg, borderRadius: 16, padding: "24px 28px",
                color: "#fff", position: "relative", overflow: "hidden",
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9, marginBottom: 10 }}>{s.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 13, marginTop: 10, opacity: 0.85, display: "flex", alignItems: "center", gap: 4 }}>
                      <span>↗</span> {s.percent}
                    </div>
                  </div>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                  }}>{s.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom two panels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Recent Job Posts */}
            <div style={{
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 16, padding: "24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Recent Job Posts</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>Your latest job postings</div>
                </div>
                <button onClick={() => navigate("/employer/manage-jobs")} style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>View all</button>
              </div>

              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {jobList.length === 0 ? (
                  <div style={{
                    padding: "18px 16px",
                    border: "1px dashed #e5e7eb",
                    borderRadius: 12,
                    color: "#9ca3af",
                    background: "#fafafa",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 600,
                  }}>
                    No jobs posted yet
                  </div>
                ) : (
                  jobList.slice(0, 5).map((job) => (
                    <div key={job.id} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", border: "1px solid #f3f4f6",
                      borderRadius: 12, background: "#fafafa",
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: "#dbeafe", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 20, flexShrink: 0,
                      }}>💼</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{job.title}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                          {job.location || ""}
                          {job.location ? " · " : ""}
                          {job.postedDate || ""}
                        </div>
                      </div>
                      <span style={{
                        padding: "4px 14px", borderRadius: 999,
                        background: job.status === "Active" ? "#dcfce7" : "#f3f4f6",
                        color: job.status === "Active" ? "#16a34a" : "#6b7280",
                        fontSize: 12, fontWeight: 600,
                      }}>{job.status}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Applications */}
            <div style={{
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 16, padding: "24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Recent Applications</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>Latest candidate applications</div>
                </div>
                <button onClick={() => navigate("/employer/manage-jobs")} style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>View all</button>
              </div>

              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {applicantList.length === 0 ? (
                  <div style={{
                    padding: "18px 16px",
                    border: "1px dashed #e5e7eb",
                    borderRadius: 12,
                    color: "#9ca3af",
                    background: "#fafafa",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 600,
                  }}>
                    No applications yet
                  </div>
                ) : (
                  applicantList.slice(0, 5).map((app) => {
                    const initials = (app.name || "")
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase();

                    return (
                      <div key={app.id} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "14px 16px", border: "1px solid #f3f4f6",
                        borderRadius: 12, background: "#fafafa",
                      }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 10,
                          background: "#4f46e5", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
                        }}>{initials || "?"}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{app.name}</div>
                          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                            {app.appliedPosition || ""}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#9ca3af", fontSize: 12 }}>
                          <span>🕐</span> {app.appliedDate || ""}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;