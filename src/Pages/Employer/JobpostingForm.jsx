import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";

// Safe UI fallbacks: prevent a fully blank page if an unexpected runtime error occurs.
const FormErrorFallback = ({ error, onGoBack }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛑</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
            Something went wrong
          </h2>
          <p style={{ color: "#6b7280", marginBottom: 18 }}>
            Job posting form could not be loaded. Please try again.
          </p>
          {error ? (
            <pre style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, color: "#ef4444", overflowX: "auto", marginBottom: 18 }}>
              {String(error.message || error)}
            </pre>
          ) : null}
          <button
            onClick={onGoBack}
            style={{
              padding: "12px 18px",
              border: "1px solid #2563eb",
              borderRadius: 10,
              background: "#fff",
              color: "#2563eb",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

const InputBase = (hasError) => ({
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: `1.5px solid ${hasError ? "#ef4444" : "#e5e7eb"}`,
  outline: "none",
  fontSize: 14,
  background: "#fff",
});

const inputBase = (hasError) => InputBase(hasError);

const IconBox = ({ icon, children }) => {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
          fontSize: 16,
          pointerEvents: "none",
        }}
      >
        {icon}
      </span>
      <div style={{ paddingLeft: 44 }}>
        {children}
      </div>
    </div>
  );
};


const CATEGORIES = [
  "IT & Software", "Marketing", "Finance & Accounting", "Healthcare",
  "Education", "Engineering", "Design", "Sales", "Customer Support", "Other",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship", "Freelance"];

// ── Sidebar at top level ────────────────────────────────────────────────────
const Sidebar = ({ navigate, handleLogout }) => {
  const navItems = [
    { label: "Dashboard",       icon: "⊞", path: "/employer/dashboard" },
    { label: "Post Job",        icon: "+", path: "/employer/post-job", active: true },
    { label: "Manage Jobs",     icon: "☰", path: "/employer/manage-jobs" },
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
        <span style={{ fontSize:18, fontWeight:700, color:"#111827" }}>HireHub</span>
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

const plainInput = (hasError) => ({
  ...InputBase(hasError),
  paddingLeft: 16,
});

const labelStyle = {
  display: "block", fontSize: 14, fontWeight: 600,
  color: "#111827", marginBottom: 8,
};
const hintStyle = { fontSize: 12, color: "#9ca3af", marginTop: 6 };
const errStyle  = { fontSize: 12, color: "#ef4444", marginTop: 4 };

// ── Main Component ───────────────────────────────────────────────────────────
const JobpostingForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // If employer is not set/auth context hasn't loaded, show fallback instead of crashing.
  const userName = useMemo(() => localStorage.getItem("userName") || "John Davis", []);

  // Optional: capture runtime errors in common synchronous places (component is mostly static).
  // If you hit an error, redirect back instead of showing a blank page.
  const [fatalError, setFatalError] = useState(null);


  const handleLogout = () => {

    logout();
    navigate("/");
  };

  const initialForm = {
    title: "", location: "", category: "", jobType: "",
    description: "", requirements: "", salaryMin: "", salaryMax: "",
  };

  const [form, setForm]           = useState(initialForm);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim())        err.title        = "Job Title is required";
    if (!form.category)            err.category     = "Category is required";
    if (!form.jobType)             err.jobType      = "Job Type is required";
    if (!form.description.trim())  err.description  = "Job Description is required";
    if (!form.requirements.trim()) err.requirements = "Requirements is required";
    if (!form.salaryMin)           err.salaryMin    = "Min salary is required";
    if (!form.salaryMax)           err.salaryMax    = "Max salary is required";
    if (
      form.salaryMin && form.salaryMax &&
      Number(form.salaryMin) >= Number(form.salaryMax)
    ) err.salaryMax = "Max must be greater than Min";
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ display:"flex", minHeight:"100vh", background:"#f9fafb", fontFamily:"Inter,sans-serif" }}>
        <Sidebar navigate={navigate} handleLogout={handleLogout} />
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center", padding:40 }}>
            <div style={{ fontSize:72, marginBottom:16 }}>🎉</div>
            <h2 style={{ fontSize:26, fontWeight:700, color:"#111827", marginBottom:8 }}>
              Job Published Successfully!
            </h2>
            <p style={{ color:"#6b7280", marginBottom:32, fontSize:15 }}>
              "{form.title}" is now live and accepting applications.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center" }}>
              <button onClick={handleReset} style={{
                padding:"12px 28px", border:"1.5px solid #2563eb", borderRadius:10,
                background:"#fff", color:"#2563eb", fontSize:15, fontWeight:600, cursor:"pointer",
              }}>
                + Post Another Job
              </button>
              <button onClick={() => navigate("/employer/manage-jobs")} style={{
                padding:"12px 28px", border:"none", borderRadius:10,
                background:"#2563eb", color:"#fff", fontSize:15, fontWeight:600, cursor:"pointer",
              }}>
                View All Jobs →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
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

        {/* Form area */}
        <main style={{ flex:1, overflowY:"auto", padding:"32px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <div>
                <h1 style={{ fontSize:22, fontWeight:700, color:"#111827", margin:0 }}>Post a New Job</h1>
                <p style={{ fontSize:14, color:"#6b7280", marginTop:6 }}>Fill out the form below to create your job posting</p>
              </div>
            </div>

            <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:32 }}>

              {/* Job Title */}
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Job Title <span style={{ color:"#ef4444" }}>*</span></label>
                <IconBox icon="💼">
                  {/* Fix 2: no key prop on input */}
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. DevOps Engineer"
                    style={inputBase(!!errors.title)}
                  />
                </IconBox>
                {errors.title && <div style={errStyle}>{errors.title}</div>}
              </div>

              {/* Location */}
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Location</label>
                <IconBox icon="📍">
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    style={inputBase(false)}
                  />
                </IconBox>
              </div>

              {/* Category + Job Type */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
                <div>
                  <label style={labelStyle}>Category <span style={{ color:"#ef4444" }}>*</span></label>
                  <div style={{ position:"relative" }}>
                    <span style={{
                      position:"absolute", left:14, top:"50%",
                      transform:"translateY(-50%)", color:"#9ca3af",
                      fontSize:16, pointerEvents:"none",
                    }}></span>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      style={{ ...inputBase(!!errors.category), appearance:"none", paddingRight:36 }}
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span style={{
                      position:"absolute", right:14, top:"50%",
                      transform:"translateY(-50%)", color:"#9ca3af", pointerEvents:"none",
                    }}>▼</span>
                  </div>
                  {errors.category && <div style={errStyle}>{errors.category}</div>}
                </div>

                <div>
                  <label style={labelStyle}>Job Type <span style={{ color:"#ef4444" }}>*</span></label>
                  <div style={{ position:"relative" }}>
                    <span style={{
                      position:"absolute", left:14, top:"50%",
                      transform:"translateY(-50%)", color:"#9ca3af",
                      fontSize:16, pointerEvents:"none",
                    }}></span>
                    <select
                      name="jobType"
                      value={form.jobType}
                      onChange={handleChange}
                      style={{ ...inputBase(!!errors.jobType), appearance:"none", paddingRight:36 }}
                    >
                      <option value="">Select Type</option>
                      {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span style={{
                      position:"absolute", right:14, top:"50%",
                      transform:"translateY(-50%)", color:"#9ca3af", pointerEvents:"none",
                    }}>▼</span>
                  </div>
                  {errors.jobType && <div style={errStyle}>{errors.jobType}</div>}
                </div>
              </div>

              {/* Job Description */}
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Job Description <span style={{ color:"#ef4444" }}>*</span></label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={7}
                  placeholder="We're seeking a skilled professional to streamline our operations..."
                  style={{ ...plainInput(!!errors.description), resize:"vertical", lineHeight:1.6 }}
                />
                <div style={hintStyle}>Include key responsibilities, day-to-day tasks, and what makes this role exciting</div>
                {errors.description && <div style={errStyle}>{errors.description}</div>}
              </div>

              {/* Requirements */}
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Requirements <span style={{ color:"#ef4444" }}>*</span></label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows={7}
                  placeholder="• 3+ years of experience&#10;• Proficiency in React, Node.js"
                  style={{ ...plainInput(!!errors.requirements), resize:"vertical", lineHeight:1.6 }}
                />
                <div style={hintStyle}>Include required skills, experience level, education, and any preferred qualifications</div>
                {errors.requirements && <div style={errStyle}>{errors.requirements}</div>}
              </div>

              {/* Salary Range */}
              <div style={{ marginBottom:36 }}>
                <label style={labelStyle}>Salary Range <span style={{ color:"#ef4444" }}>*</span></label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <IconBox icon="₹">
                      <input
                        name="salaryMin"
                        type="number"
                        value={form.salaryMin}
                        onChange={handleChange}
                        placeholder="Min (e.g. 5000)"
                        style={inputBase(!!errors.salaryMin)}
                      />
                    </IconBox>
                    {errors.salaryMin && <div style={errStyle}>{errors.salaryMin}</div>}
                  </div>
                  <div>
                    <IconBox icon="₹">
                      <input
                        name="salaryMax"
                        type="number"
                        value={form.salaryMax}
                        onChange={handleChange}
                        placeholder="Max (e.g. 12000)"
                        style={inputBase(!!errors.salaryMax)}
                      />
                    </IconBox>
                    {errors.salaryMax && <div style={errStyle}>{errors.salaryMax}</div>}
                  </div>
                </div>
              </div>

              {/* Publish Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width:"100%", padding:"16px",
                  background: loading ? "#93c5fd" : "#2563eb",
                  color:"#fff", border:"none", borderRadius:12,
                  fontSize:16, fontWeight:700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                }}
              >
                {loading ? "Publishing..." : "✈ Publish Job"}
              </button>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobpostingForm;
