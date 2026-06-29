import { useNavigate } from "react-router-dom";

const EmployerSidebar = ({ active }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞", path: "/employer/dashboard" },
    { id: "post-job", label: "Post Job", icon: "+", path: "/employer/post-job" },
    { id: "manage-jobs", label: "Manage Jobs", icon: "☰", path: "/employer/manage-jobs" },
    { id: "profile", label: "Company Profile", icon: "🗂", path: "/employer/profile" },
  ];

  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "#fff",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      padding: "24px 12px",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 32px" }}>
        <div style={{
          width: 36,
          height: 36,
          background: "#2563eb",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 18,
        }}>⊞</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>JobPortal</span>
      </div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "10px 14px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              marginBottom: 4,
              fontSize: 14,
              fontWeight: active === item.id ? 600 : 400,
              color: active === item.id ? "#2563eb" : "#6b7280",
              background: active === item.id ? "#eff6ff" : "transparent",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          border: "none",
          background: "transparent",
          color: "#6b7280",
          fontSize: 14,
          cursor: "pointer",
          borderRadius: 10,
          width: "100%",
          textAlign: "left",
        }}
      >
        <span>→</span> Logout
      </button>
    </aside>
  );
};

export default EmployerSidebar;
