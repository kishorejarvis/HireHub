import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, navigate }) => {
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 32px" }}>
        <div style={{
          width: 36, height: 36, background: "#2563eb", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 18,
        }}>⊞</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>JobPortal</span>
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

      <button onClick={() => { localStorage.clear(); navigate("/login"); }} style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
        border: "none", background: "transparent", color: "#6b7280",
        fontSize: 14, cursor: "pointer", borderRadius: 10, width: "100%", textAlign: "left",
      }}>
        <span>→</span> Logout
      </button>
    </aside>
  );
};

const ApplicationViewer = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "John Davis";

  const applicants = [
    {
      id: 1,
      name: "Michael Wilson",
      email: "user2@timetoprogram.com",
      appliedDate: "Applied 5th 07 2025",
      status: "Applied",
      initials: "MW",
      bgColor: "#8b5cf6"
    },
    {
      id: 2,
      name: "Jennifer Miller",
      email: "user3@timetoprogram.com",
      appliedDate: "Applied 5th 07 2025",
      status: "Applied",
      initials: "JM",
      bgColor: "#ec4899"
    },
    {
      id: 3,
      name: "William Anderson",
      email: "user4@timetoprogram.com",
      appliedDate: "Applied 5th 07 2025",
      status: "Applied",
      initials: "WA",
      bgColor: "#f59e0b"
    },
    {
      id: 4,
      name: "David Jackson",
      email: "user5@timetoprogram.com",
      appliedDate: "Applied 5th 07 2025",
      status: "Applied",
      initials: "DJ",
      bgColor: "#6366f1"
    }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <Sidebar active="manage-jobs" navigate={navigate} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top header */}
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

        {/* Main content */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {/* Back button and title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <button onClick={() => navigate("/employer/manage-jobs")} style={{
              background: "none", border: "none", color: "#6b7280",
              fontSize: 20, cursor: "pointer", padding: 0,
            }}>←</button>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: 0 }}>Applications Overview</h1>
          </div>

          {/* Job header card (blue) */}
          <div style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            borderRadius: 16, padding: "24px 28px", color: "#fff",
            marginBottom: 28, display: "flex",
            justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0, marginBottom: 12 }}>DevOps Engineer</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14, opacity: 0.95 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>📍 Amsterdam, Netherlands</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>🏢 Remote</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>💼 IT & Software</span>
              </div>
            </div>
            <div style={{
              background: "rgba(255, 255, 255, 0.2)", borderRadius: 12,
              padding: "12px 24px", fontSize: 16, fontWeight: 600,
            }}>4 Applications</div>
          </div>

          {/* Applicants list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {applicants.map((applicant) => (
              <div key={applicant.id} style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 12, padding: "20px 24px",
                display: "flex", alignItems: "center", gap: 18,
              }}>
                {/* Avatar */}
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: applicant.bgColor, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 16,
                  flexShrink: 0,
                }}>
                  {applicant.initials}
                </div>

                {/* Applicant info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                    {applicant.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
                    {applicant.email}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
                    📅 {applicant.appliedDate}
                  </div>
                </div>

                {/* Status and actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{
                    padding: "6px 14px", borderRadius: 6,
                    background: "#f3f4f6", color: "#6b7280",
                    fontSize: 13, fontWeight: 500,
                  }}>
                    {applicant.status}
                  </span>

                  <button style={{
                    background: "#2563eb", color: "#fff",
                    border: "none", borderRadius: 8, padding: "8px 16px",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    ⬇ Resume
                  </button>

                  <button style={{
                    background: "none", border: "none",
                    color: "#2563eb", fontSize: 14, fontWeight: 600,
                    cursor: "pointer", padding: "8px 0",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    👁 View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicationViewer;