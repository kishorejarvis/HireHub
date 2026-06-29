import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployer } from "../../context/EmployerContext";
import { useAuth } from "../../context/Authcontext";

// ── Sidebar (top-level) ──────────────────────────────────────────────────────
const Sidebar = ({ navigate, handleLogout }) => {
  const navItems = [
    { label: "Dashboard",       icon: "⊞", path: "/employer/dashboard" },
    { label: "Post Job",        icon: "+", path: "/employer/post-job" },
    { label: "Manage Jobs",     icon: "⊟", path: "/employer/manage-jobs", active: true },
    { label: "Company Profile", icon: "🗂", path: "/employer/profile" },
  ];

  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #e5e7eb", display: "flex",
      flexDirection: "column", padding: "24px 12px", flexShrink: 0,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 8px 32px" }}>
        <div style={{
          width:36, height:36, background:"#2563eb", borderRadius:10,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize:18,
        }}>⊞</div>
        <span style={{ fontSize:18, fontWeight:700, color:"#111827" }}>JobPortal</span>
      </div>

      <nav style={{ flex:1 }}>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              display:"flex", alignItems:"center", gap:12, width:"100%",
              padding:"10px 14px", borderRadius:10, border:"none", cursor:"pointer",
              marginBottom:4, fontSize:14,
              fontWeight: item.active ? 600 : 400,
              color:      item.active ? "#2563eb" : "#6b7280",
              background: item.active ? "#eff6ff" : "transparent",
              textAlign:"left",
            }}
          >
            <span style={{ fontSize:16, width:20, textAlign:"center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
          border:"none", background:"transparent", color:"#6b7280",
          fontSize:14, cursor:"pointer", borderRadius:10,
          width:"100%", textAlign:"left",
        }}
      >
        <span>→</span> Logout
      </button>
    </aside>
  );
};

// ── Confirm Modal (top-level) ────────────────────────────────────────────────
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div style={{
    position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000,
  }}>
    <div style={{
      background:"#fff", borderRadius:16, padding:32,
      width:360, boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
    }}>
      <div style={{ fontSize:16, fontWeight:600, color:"#111827", marginBottom:8 }}>
        Confirm Action
      </div>
      <div style={{ fontSize:14, color:"#6b7280", marginBottom:28 }}>{message}</div>
      <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
        <button onClick={onCancel} style={{
          padding:"8px 20px", border:"1px solid #e5e7eb", borderRadius:8,
          background:"#fff", color:"#374151", fontSize:14, cursor:"pointer",
        }}>Cancel</button>
        <button onClick={onConfirm} style={{
          padding:"8px 20px", border:"none", borderRadius:8,
          background:"#ef4444", color:"#fff", fontSize:14,
          fontWeight:600, cursor:"pointer",
        }}>Confirm</button>
      </div>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const ManageJob = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userName = localStorage.getItem("userName") || "John Davis";
  const { jobs, getApplicantsCount, updateJob, removeJob } = useEmployer();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState(null); // { type: "close"|"delete", jobId }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ── filter ─────────────────────────────────────────────────────────────────
  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ── actions ────────────────────────────────────────────────────────────────
  const handleCloseJob = (id) => {
    updateJob(id, { status: "Closed" });
    setModal(null);
  };

  const handleDeleteJob = (id) => {
    removeJob(id);
    setModal(null);
  };

  const handleEdit = (id) => {
    navigate(`/employer/post-job?edit=${id}`);
  };

  const handleViewApplicants = (id) => {
    navigate(`/job/${id}/applications`);
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f9fafb", fontFamily:"Inter,sans-serif" }}>
      <Sidebar navigate={navigate} handleLogout={handleLogout} />

      <div style={{ flex:1, display:"flex", flexDirection:"column" }}>

        {/* Top bar */}
        <header style={{
          background:"#fff", borderBottom:"1px solid #e5e7eb",
          padding:"14px 32px", display:"flex",
          justifyContent:"space-between", alignItems:"center",
        }}>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:"#111827" }}>Welcome back!</div>
            <div style={{ fontSize:13, color:"#6b7280" }}>Here's what's happening with your jobs today.</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:38, height:38, borderRadius:"50%", background:"#dbeafe",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontWeight:700, color:"#2563eb", fontSize:14,
            }}>{userName.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:"#111827" }}>{userName}</div>
              <div style={{ fontSize:12, color:"#6b7280" }}>Employer</div>
            </div>
            <span style={{ color:"#6b7280", fontSize:12 }}>▼</span>
          </div>
        </header>

        {/* Main content */}
        <main style={{ flex:1, padding:"32px 36px" }}>

          {/* Page heading */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
            <div>
              <h1 style={{ fontSize:26, fontWeight:700, color:"#111827", margin:0 }}>Job Management</h1>
              <p style={{ fontSize:14, color:"#6b7280", marginTop:6 }}>
                Manage your job postings and track applications
              </p>
            </div>
            <button
              onClick={() => navigate("/employer/post-job")}
              style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"12px 24px", background:"#2563eb", color:"#fff",
                border:"none", borderRadius:10, fontSize:15,
                fontWeight:600, cursor:"pointer",
              }}
            >
              + Add New Job
            </button>
          </div>

          {/* Table card */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:24 }}>

            {/* Search + Filter */}
            <div style={{ display:"flex", gap:12, marginBottom:16 }}>
              <div style={{ position:"relative", flex:1 }}>
                <span style={{
                  position:"absolute", left:14, top:"50%",
                  transform:"translateY(-50%)", color:"#9ca3af", fontSize:16,
                }}>🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                  style={{
                    width:"100%", padding:"11px 16px 11px 42px",
                    border:"1px solid #e5e7eb", borderRadius:10,
                    fontSize:14, outline:"none", boxSizing:"border-box",
                    fontFamily:"inherit", color:"#111827",
                  }}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding:"11px 36px 11px 16px", border:"1.5px solid #2563eb",
                  borderRadius:10, fontSize:14, outline:"none",
                  fontFamily:"inherit", color:"#111827", background:"#fff",
                  appearance:"none", cursor:"pointer", minWidth:140,
                }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
            </div>

            {/* Count */}
            <div style={{ fontSize:14, color:"#6b7280", marginBottom:16 }}>
              Showing {filtered.length} of {jobs.length} jobs
            </div>

            {/* Table */}
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1.5px solid #e5e7eb" }}>
                  {[
                    { label:"JOB TITLE",   w:"40%" },
                    { label:"STATUS",      w:"15%" },
                    { label:"APPLICANTS",  w:"20%" },
                    { label:"ACTIONS",     w:"25%" },
                  ].map((h) => (
                    <th key={h.label} style={{
                      width:h.w, padding:"10px 12px",
                      textAlign:"left", fontSize:12,
                      fontWeight:700, color:"#6b7280",
                      letterSpacing:0.6,
                    }}>
                      {h.label} {h.label !== "ACTIONS" ? "↑" : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding:"48px", textAlign:"center", color:"#9ca3af" }}>
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((job) => (
                    <tr
                      key={job.id}
                      style={{ borderBottom:"1px solid #f3f4f6" }}
                    >
                      {/* Job Title */}
                      <td style={{ padding:"18px 12px" }}>
                        <div style={{ fontSize:15, fontWeight:600, color:"#111827" }}>{job.title}</div>
                        <div style={{ fontSize:13, color:"#9ca3af", marginTop:2 }}>{job.employer}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding:"18px 12px" }}>
                        <span style={{
                          padding:"5px 16px", borderRadius:999,
                          background: job.status === "Active" ? "#d1fae5" : "#f3f4f6",
                          color:      job.status === "Active" ? "#065f46" : "#6b7280",
                          fontSize:13, fontWeight:600,
                        }}>
                          {job.status}
                        </span>
                      </td>

                      {/* Applicants */}
                      <td style={{ padding:"18px 12px" }}>
                        <button
                          onClick={() => handleViewApplicants(job.id)}
                          style={{
                            display:"flex", alignItems:"center", gap:6,
                            background:"none", border:"none", cursor:"pointer",
                            color:"#2563eb", fontSize:15, fontWeight:600, padding:0,
                          }}
                        >
                          <span style={{ fontSize:18 }}>👥</span>
                          {getApplicantsCount(job.id)}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding:"18px 12px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(job.id)}
                            title="Edit"
                            style={{
                              background:"none", border:"none",
                              cursor:"pointer", color:"#2563eb", fontSize:18, padding:0,
                            }}
                          >✏️</button>

                          {/* Close */}
                          {job.status === "Active" && (
                            <button
                              onClick={() => setModal({ type:"close", jobId: job.id })}
                              style={{
                                display:"flex", alignItems:"center", gap:4,
                                background:"none", border:"none",
                                cursor:"pointer", color:"#ef4444",
                                fontSize:14, fontWeight:500, padding:0,
                              }}
                            >
                              <span style={{ fontSize:14 }}>✕</span> Close
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => setModal({ type:"delete", jobId: job.id })}
                            title="Delete"
                            style={{
                              background:"none", border:"none",
                              cursor:"pointer", color:"#ef4444", fontSize:18, padding:0,
                            }}
                          >🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Confirm Modal */}
      {modal && (
        <ConfirmModal
          message={
            modal.type === "delete"
              ? "Are you sure you want to delete this job? This action cannot be undone."
              : "Are you sure you want to close this job posting? Applicants will no longer be able to apply."
          }
          onConfirm={() =>
            modal.type === "delete"
              ? handleDeleteJob(modal.jobId)
              : handleCloseJob(modal.jobId)
          }
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default ManageJob;