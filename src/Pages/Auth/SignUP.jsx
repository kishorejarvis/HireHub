import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 8) e.password = "At least 8 characters needed.";
    if (!role) e.role = "Please select Job Seeker or Employer.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    
    // Use auth context to login
    login(email, role, fullName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.hdr}>
            <div style={s.logo}>J</div>
            <h1 style={s.hdrTitle}>Create your account</h1>
            <p style={s.hdrSub}>Join thousands of professionals today</p>
          </div>
          <div style={{ textAlign: "center", padding: "48px 28px" }}>
            <div style={s.successIcon}>✓</div>
            <h2 style={s.successTitle}>Account Created!</h2>
            <p style={s.successSub}>
              Welcome, <strong>{fullName}</strong>! You're registered as a{" "}
              <strong>{role === "jobseeker" ? "Job Seeker" : "Employer"}</strong>.
            </p>
            {role === "jobseeker" ? (
              <button onClick={() => navigate("/find-jobs")} style={s.successBtn}>🔍 Browse Jobs</button>
            ) : (
              <button onClick={() => navigate("/employer/post-job")} style={s.successBtn}>＋ Post a Job</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.hdr}>
          <div style={s.logo}>J</div>
          <h1 style={s.hdrTitle}>Create your account</h1>
          <p style={s.hdrSub}>Join thousands of professionals today</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={s.form}>

          {/* Full Name */}
          <div style={s.field}>
            <label style={s.label}>Full Name <span style={s.req}>*</span></label>
            <div style={s.inputWrap}>
              <span style={s.iconWrap}>👤</span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: "" })); }}
                style={{ ...s.input, borderColor: errors.fullName ? "#ef4444" : "#e5e7eb" }}
              />
            </div>
            {errors.fullName && <p style={s.error}>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div style={s.field}>
            <label style={s.label}>Email Address <span style={s.req}>*</span></label>
            <div style={s.inputWrap}>
              <span style={s.iconWrap}>✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                style={{ ...s.input, borderColor: errors.email ? "#ef4444" : "#e5e7eb" }}
              />
            </div>
            {errors.email && <p style={s.error}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={s.field}>
            <label style={s.label}>Password <span style={s.req}>*</span></label>
            <div style={s.inputWrap}>
              <span style={s.iconWrap}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                style={{ ...s.input, paddingRight: 44, borderColor: errors.password ? "#ef4444" : "#e5e7eb" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={s.eyeBtn}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p style={s.error}>{errors.password}</p>}
          </div>

          {/* Profile Picture */}
          <div style={s.field}>
            <label style={s.label}>
              Profile Picture{" "}
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>(Optional)</span>
            </label>
            <div style={s.photoRow}>
              <div style={s.avatar}>
                {profilePreview
                  ? <img src={profilePreview} alt="Preview" style={s.avatarImg} />
                  : <span style={{ fontSize: 28 }}>👤</span>
                }
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  style={s.uploadBtn}
                >
                  ⬆ {profileImage ? "Change Photo" : "Upload Photo"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <p style={s.hint}>JPG, PNG up to 5MB</p>
                {profileImage && (
                  <p style={{ ...s.hint, color: "#10b981" }}>✓ {profileImage.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Role */}
          <div style={s.field}>
            <label style={s.label}>I am a <span style={s.req}>*</span></label>
            <div style={s.roleRow}>
              <button
                type="button"
                onClick={() => { setRole("jobseeker"); setErrors(p => ({ ...p, role: "" })); }}
                style={{
                  ...s.roleCard,
                  borderColor: role === "jobseeker" ? "#6366f1" : "#e5e7eb",
                  background: role === "jobseeker" ? "#eef2ff" : "#fff",
                }}
              >
                <span style={{ fontSize: 28 }}>🧑‍💼</span>
                <span style={{ ...s.roleTitle, color: role === "jobseeker" ? "#6366f1" : "#111827" }}>
                  Job Seeker
                </span>
                <span style={s.roleDesc}>Looking for opportunities</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole("employer"); setErrors(p => ({ ...p, role: "" })); }}
                style={{
                  ...s.roleCard,
                  borderColor: role === "employer" ? "#6366f1" : "#e5e7eb",
                  background: role === "employer" ? "#eef2ff" : "#fff",
                }}
              >
                <span style={{ fontSize: 28 }}>🏢</span>
                <span style={{ ...s.roleTitle, color: role === "employer" ? "#6366f1" : "#111827" }}>
                  Employer
                </span>
                <span style={s.roleDesc}>Hiring talent</span>
              </button>
            </div>
            {errors.role && <p style={s.error}>{errors.role}</p>}
          </div>

          <button type="submit" style={s.submitBtn}>Create Account</button>

          <p style={s.signInText}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={s.signInLink}
            >
              Sign in here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: 440,
    overflow: "hidden",
  },
  hdr: {
    background: "#6366f1",
    padding: "28px 28px 22px",
    textAlign: "center",
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 22,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
  },
  hdrTitle: { color: "#fff", fontSize: 18, fontWeight: 600, margin: 0 },
  hdrSub: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
  form: { padding: "24px 28px 28px" },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 6 },
  req: { color: "#ef4444" },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  iconWrap: { position: "absolute", left: 12, fontSize: 15, pointerEvents: "none" },
  input: {
    width: "100%",
    padding: "10px 12px 10px 38px",
    fontSize: 14,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    outline: "none",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 4,
  },
  error: { margin: "4px 0 0", fontSize: 12, color: "#ef4444" },
  photoRow: { display: "flex", alignItems: "center", gap: 14 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    background: "#fff",
    color: "#374151",
    fontSize: 13,
    cursor: "pointer",
  },
  hint: { margin: "5px 0 0", fontSize: 11, color: "#9ca3af" },
  roleRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  roleCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "18px 10px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 12,
    cursor: "pointer",
    background: "#fff",
    transition: "all 0.15s",
  },
  roleTitle: { fontSize: 14, fontWeight: 600, color: "#111827" },
  roleDesc: { fontSize: 11, color: "#6b7280" },
  submitBtn: {
    display: "block",
    width: "100%",
    padding: "13px",
    marginTop: 6,
    background: "#6366f1",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  signInText: { marginTop: 16, textAlign: "center", fontSize: 13, color: "#6b7280" },
  signInLink: { color: "#6366f1", fontWeight: 600, textDecoration: "none" },
  successIcon: {
    width: 60, height: 60, borderRadius: "50%", background: "#6366f1",
    color: "#fff", fontSize: 28, display: "flex", alignItems: "center",
    justifyContent: "center", margin: "0 auto 16px",
  },
  successTitle: { fontSize: 20, fontWeight: 600, color: "#111827", marginBottom: 8 },
  successSub: { fontSize: 14, color: "#6b7280", marginBottom: 28 },
  successBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "11px 28px", background: "#6366f1", color: "#fff",
    borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none",
  },
};