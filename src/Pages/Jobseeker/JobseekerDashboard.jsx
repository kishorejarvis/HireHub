import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";


const HeroSearchBar = ({ search, setSearch, locationSearch, setLocationSearch, activeTab }) => {
  if (activeTab !== "browse") return null;

  return (
    <div
      style={{
        background: "transparent",
        border: `1px solid #e2e8f0`,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 1000 }}>{"Find Your Dream Job"}</div>
          <div style={{ color: "#64748b", fontWeight: 800, marginTop: 6 }}>
            {"Discover opportunities that match your passion"}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "2fr 1.3fr auto",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: `1px solid #e2e8f0`,
            background: "#fff",
            borderRadius: 14,
            padding: "10px 12px",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ color: "#94a3b8", fontWeight: 900 }}>🔎</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, company, or keywords"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "Inter, Segoe UI, sans-serif",
              fontWeight: 800,
              color: "#0f172a",
              background: "transparent",
            }}
          />
        </div>

        <div
          style={{
            border: `1px solid #e2e8f0`,
            background: "#fff",
            borderRadius: 14,
            padding: "10px 12px",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ color: "#94a3b8", fontWeight: 900 }}>📍</span>
          <input
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            placeholder="Location"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "Inter, Segoe UI, sans-serif",
              fontWeight: 800,
              color: "#0f172a",
              background: "transparent",
            }}
          />
        </div>

        <button
          style={{
            cursor: "pointer",
            background: "#2563eb",
            border: `1px solid #2563eb`,
            color: "#fff",
            borderRadius: 14,
            padding: "12px 16px",
            fontWeight: 1000,
          }}
          onClick={() => {
            // Filtering is real-time; button is just UX.
          }}
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({
  typeFilters,
  setTypeFilters,
  catFilters,
  setCatFilters,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  clearAll,
}) => {
  const Checkbox = ({ checked, onChange, label }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        cursor: "pointer",
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: "7px 0",
        userSelect: "none",
        fontWeight: 900,
        color: "#64748b",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: `1px solid #e2e8f0`,
          background: checked ? "#2563eb" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: checked ? "#fff" : "#2563eb",
          fontSize: 12,
          fontWeight: 1000,
        }}
      >
        {checked ? "✓" : ""}
      </div>
      <div>{label}</div>
    </div>
  );

  const InputNumber = ({ value, onChange, placeholder }) => (
    <div
      style={{
        border: `1px solid #e2e8f0`,
        background: "#fff",
        borderRadius: 14,
        padding: "10px 12px",
      }}
    >
      <input
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => {
          // Allow continuous typing without focus loss:
          // do not remount this subtree; just update the numeric value.
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        placeholder={placeholder}
        type="number"
        inputMode="numeric"
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: 14,
          fontFamily: "Inter, Segoe UI, sans-serif",
          fontWeight: 900,
          color: "#0f172a",
          background: "transparent",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        border: `1px solid #e2e8f0`,
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        height: "fit-content",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 1000, fontSize: 16 }}>Filter Jobs</div>
        <div
          onClick={clearAll}
          style={{
            cursor: "pointer",
            color: "#2563eb",
            fontWeight: 1000,
            textDecoration: "underline",
            fontSize: 13,
          }}
        >
          Clear All
        </div>
      </div>

      {/* Job Type */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 1000, color: "#0f172a" }}>Job Type</div>
        <div>
          {[
            "Remote",
            "Full-Time",
            "Part-Time",
            "Contract",
            "Internship",
          ].map((t) => (
            <Checkbox
              key={t}
              checked={typeFilters[t]}
              label={t}
              onChange={(v) => setTypeFilters((prev) => ({ ...prev, [t]: v }))}
            />
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 1000, color: "#0f172a" }}>Salary Range</div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ color: "#64748b", fontWeight: 1000, fontSize: 12, marginBottom: 8 }}>
              Min Salary
            </div>
            <InputNumber value={minSalary} onChange={setMinSalary} placeholder="0" />
          </div>
          <div>
            <div style={{ color: "#64748b", fontWeight: 1000, fontSize: 12, marginBottom: 8 }}>
              Max Salary
            </div>
            <InputNumber value={maxSalary} onChange={setMaxSalary} placeholder="0" />
          </div>
        </div>
      </div>

      {/* Category */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 1000, color: "#0f172a" }}>Category</div>
        <div>
          {[
            "Engineering",
            "Design",
            "Marketing",
            "Sales",
            "IT & Software",
            "Customer-service",
            "Product",
            "Operations",
            "Finance",
          ].map((c) => (
            <Checkbox
              key={c}
              checked={catFilters[c]}
              label={c}
              onChange={(v) => setCatFilters((prev) => ({ ...prev, [c]: v }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ activeTab, setActiveTab, savedCount, navigate, user }) => {
  const primaryBlue = "#2563eb";
  const border = "#e2e8f0";
  const textPrimary = "#0f172a";
  const textSecondary = "#64748b";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(161, 174, 187, 0.88)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${border}`,
      }}
    >
      <div style={{ maxWidth: "100%", margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
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
            }}
          >
            💼
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            HireHub
          </span>
        </div>

        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div
            onClick={() => setActiveTab("browse")}
            style={{
              cursor: "pointer",
              fontWeight: 1000,
              color: activeTab === "browse" ? primaryBlue : textSecondary,
              paddingBottom: 4,
              borderBottom: activeTab === "browse" ? `3px solid ${primaryBlue}` : "3px solid transparent",
            }}
          >
            Browse Jobs
          </div>
          <div
            onClick={() => setActiveTab("saved")}
            style={{
              cursor: "pointer",
              fontWeight: 1000,
              color: activeTab === "saved" ? primaryBlue : textSecondary,
              paddingBottom: 4,
              borderBottom: activeTab === "saved" ? `3px solid ${primaryBlue}` : "3px solid transparent",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span>🔖</span>
            Saved ({savedCount})
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              cursor: "pointer",
              borderRadius: 12,
              border: `1px solid ${border}`,
              background: "#fff",
              color: textPrimary,
              padding: "10px 14px",
              fontWeight: 900,
            }}
          >
            My Profile
          </button>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              background: primaryBlue,
              color: "#fff",
              fontWeight: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            JS
          </div>
          <div>
            <div style={{ fontWeight: 1000, fontSize: 13 }}>{user?.userName || user?.email || ""}</div>
            <div style={{ color: textSecondary, fontSize: 12, fontWeight: 800 }}>{user?.role ? user.role : "Job Seeker"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobseekerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // ---- Color Scheme (match exactly) ----

  const primaryBlue = "#2563eb";
  const bg = "#f0f4f8";
  const cardBg = "#fff";
  const border = "#e2e8f0";
  const textPrimary = "#0f172a";
  const textSecondary = "#64748b";
  const textMuted = "#94a3b8";

  const styles = {
    page: {
      background: bg,
      minHeight: "100vh",
      fontFamily: "Inter, Segoe UI, sans-serif",
      color: textPrimary,
    },
    navbar: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(161, 174, 187, 0.88)",
      backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${border}`,
    },
    container: {
      maxWidth: "100%",
      margin: "0 auto",
      padding: "14px 32px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 16,
    },
    list: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 16,
    },
    card: {
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: 14,
      padding: 14,
      transition: "box-shadow 180ms ease, transform 180ms ease",
    },
  };

  // ---- Logo Component ----
  const Logo = ({ size = 48, text, color }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: color,
        color: "#fff",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.max(12, Math.floor(size / 3.2)),
        letterSpacing: 0.2,
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );

  // ---- Badge Helpers ----
  const BadgePill = ({ bgColor, textColor, children }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        background: bgColor,
        color: textColor,
        fontSize: 12,
        fontWeight: 800,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );

  const TypeBadge = ({ type }) => {
    const map = {
      "Full-Time": { bg: "#dcfce7", fg: "#16a34a" },
      "Part-Time": { bg: "#fef9c3", fg: "#ca8a04" },
      Remote: { bg: "#dbeafe", fg: "#1d4ed8" },
      Internship: { bg: "#f3e8ff", fg: "#7c3aed" },
      Contract: { bg: "#fee2e2", fg: "#dc2626" },
    };
    const m = map[type] || { bg: "#e2e8f0", fg: textSecondary };
    return (
      <BadgePill bgColor={m.bg} textColor={m.fg}>
        {type}
      </BadgePill>
    );
  };

  const CategoryBadge = ({ category }) => {
    const map = {
      Engineering: { bg: "#eff6ff", fg: "#2563eb" },
      Design: { bg: "#f5f3ff", fg: "#7c3aed" },
      Marketing: { bg: "#fef9c3", fg: "#ca8a04" },
      Sales: { bg: "#dbeafe", fg: "#1d4ed8" },
      "IT & Software": { bg: "#dcfce7", fg: "#16a34a" },
      "Customer-service": { bg: "#e0f2fe", fg: "#0369a1" },
      Product: { bg: "#f1f5f9", fg: "#475569" },
      Operations: { bg: "#f3f4f6", fg: "#6b7280" },
      Finance: { bg: "#fee2e2", fg: "#dc2626" },
    };
    const m = map[category] || { bg: "#f1f5f9", fg: textSecondary };
    return (
      <BadgePill bgColor={m.bg} textColor={m.fg}>
        {category}
      </BadgePill>
    );
  };

  const StatusBadge = ({ status }) => {
    if (status === "accepted") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#dcfce7",
            color: "#16a34a",
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          Accepted
        </span>
      );
    }
    if (status === "applied") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#f1f5f9",
            color: "#64748b",
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          Applied
        </span>
      );
    }
    return null;
  };

  // ---- Job Data (loaded from backend; no hardcoded data) ----
  const [jobData, setJobData] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  useEffect(() => {
    // TODO: wire to backend API.
    // For now, keep empty to avoid hardcoded job data.
    // CRITICAL: avoid resetting filter/input state on every render/user object identity change.
    let isMounted = true;
    const load = async () => {
      setJobsLoading(true);
      try {
        if (!isMounted) return;
        setJobData([]);
        // Do not wipe filters/saved/app state while user types.
        setSavedJobs((prev) => prev);
        setApplicationStatus((prev) => prev);
      } finally {
        if (isMounted) setJobsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // ---- State Management (all useState) ----
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [activeTab, setActiveTab] = useState("browse"); // "browse" | "saved"

  // Backed by user/application data (no hardcoded defaults)
  const [applicationStatus, setApplicationStatus] = useState({});
  // NOTE: Keep savedJobs as a Set but ensure updates happen without re-mounting child inputs.
  const [savedJobs, setSavedJobs] = useState(() => new Set());

  const [typeFilters, setTypeFilters] = useState({

    Remote: false,
    "Full-Time": false,
    "Part-Time": false,
    Contract: false,
    Internship: false,
  });

  const [catFilters, setCatFilters] = useState({
    Engineering: false,
    Design: false,
    Marketing: false,
    Sales: false,
    "IT & Software": false,
    "Customer-service": false,
    Product: false,
    Operations: false,
    Finance: false,
  });


  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);

  const toggleSaved = (jobId) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  const setStatus = (jobId, status) => {
    setApplicationStatus((prev) => ({ ...prev, [jobId]: status }));
  };

  const clearAll = () => {
    setSearch("");
    setLocationSearch("");
    setTypeFilters({
      Remote: false,
      "Full-Time": false,
      "Part-Time": false,
      Contract: false,
      Internship: false,
    });
    setCatFilters({
      Engineering: false,
      Design: false,
      Marketing: false,
      Sales: false,
      "IT & Software": false,
      "Customer-service": false,
      Product: false,
      Operations: false,
      Finance: false,
    });
    setMinSalary(0);
    setMaxSalary(0);
  };

  // ---- Filtering Logic (useMemo) ----
  const filteredJobs = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();
    const lowerLocation = locationSearch.trim().toLowerCase();

    // 1. If activeTab === "saved": start with only saved jobs, else all jobs
    let list =
      activeTab === "saved" ? jobData.filter((j) => savedJobs.has(j.id)) : jobData;

    // 2. Filter by search string (title, company, category)
    if (lowerSearch) {
      list = list.filter((j) => {
        const categoryForSearch = j.category || "";
        return (
          j.title.toLowerCase().includes(lowerSearch) ||
          j.company.toLowerCase().includes(lowerSearch) ||
          categoryForSearch.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // 3. Filter by locationSearch (location field)
    if (lowerLocation) {
      list = list.filter((j) => j.location.toLowerCase().includes(lowerLocation));
    }

    // 4. If any type checkboxes checked...
    const activeTypes = Object.keys(typeFilters).filter((k) => typeFilters[k]);
    if (activeTypes.length > 0) {
      list = list.filter((j) => activeTypes.includes(j.type));
    }

    // 5. If any category checkboxes checked...
    const activeCats = Object.keys(catFilters).filter((k) => catFilters[k]);
    if (activeCats.length > 0) {
      list = list.filter((j) => activeCats.includes(j.category));
    }

    // 6. Salary min/max rules
    if (minSalary > 0) {
      list = list.filter((j) => j.salaryMin >= minSalary);
    }
    if (maxSalary > 0) {
      list = list.filter((j) => j.salaryMax <= maxSalary);
    }

    return list;
  }, [
    activeTab,
    jobData,
    savedJobs,
    search,
    locationSearch,
    typeFilters,
    catFilters,
    minSalary,
    maxSalary,
  ]);

  const savedCount = savedJobs.size;

  const formatPostedDate = (dateStr) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const bookmarkIcon = (saved) => (
    <span style={{ fontSize: 16, lineHeight: 1 }}>{saved ? "🔖" : "🔖"}</span>
  );

  // ---- Job Detail Modal ----
  const JobDetailModal = ({ job }) => {
    const status = applicationStatus[job.id];

    const onApply = () => {
      if (!status) setStatus(job.id, "applied");
    };

    const onClose = () => setSelectedJob(null);

    const overlayStyle = {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      zIndex: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    };

    const modalStyle = {
      background: cardBg,
      borderRadius: 16,
      border: `1px solid ${border}`,
      maxWidth: 720,
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
    };

    const SectionBox = ({ title, children }) => (
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            borderLeft: `4px solid ${primaryBlue}`,
            paddingLeft: 12,
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
        </div>
        <div
          style={{
            background: "#f1f5f9",
            border: `1px solid ${border}`,
            borderRadius: 12,
            padding: 14,
            color: textSecondary,
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    );

    return (
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div style={{ padding: 18, borderBottom: `1px solid ${border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", gap: 14 }}>
                <Logo size={56} text={job.logo} color={job.logoColor} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, marginTop: 2 }}>
                    {job.title}
                  </div>
                  <div style={{ marginTop: 6, color: textSecondary, fontWeight: 700 }}>
                    <span style={{ marginRight: 6 }}>🏢</span>
                    {job.company}
                  </div>
                  <div style={{ marginTop: 6, color: textSecondary, fontWeight: 700 }}>
                    <span style={{ marginRight: 6 }}>📍</span>
                    {job.location}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                {status ? <StatusBadge status={status} /> : <div style={{ height: 38 }} />}
                <button
                  onClick={onClose}
                  style={{
                    marginTop: 10,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    border: `1px solid ${border}`,
                    background: "#f8fafc",
                    color: textSecondary,
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              <CategoryBadge category={job.category} />
              <TypeBadge type={job.type} />
              <BadgePill bgColor="#f1f5f9" textColor={textSecondary}>
                <span style={{ marginRight: 6 }}>🕒</span>
                {formatPostedDate(job.posted)}
              </BadgePill>
            </div>
          </div>

          {/* Compensation */}
          <div style={{ padding: 18 }}>
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 14,
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: "#dcfce7",
                    border: "1px solid #16a34a22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#16a34a",
                    fontWeight: 900,
                  }}
                >
                  💲
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: "#16a34a" }}>Compensation</div>
                  <div style={{ color: "#14532d", fontWeight: 900, marginTop: 4 }}>
                    {Math.round(job.salaryMin)} - {Math.round(job.salaryMax)} per year
                  </div>
                </div>
              </div>
              <BadgePill bgColor="#dcfce7" textColor="#16a34a">
                ✨ Competitive
              </BadgePill>
            </div>

            <SectionBox title="About This Role">
              <div style={{ color: textPrimary, fontWeight: 700, marginBottom: 8 }}>{job.title}</div>
              {job.description}
            </SectionBox>

            <SectionBox title="What We're Looking For">
              <ul style={{ margin: 0, paddingLeft: 18, color: textSecondary }}>
                {job.requirements.map((r, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {r}
                  </li>
                ))}
              </ul>
            </SectionBox>

            <SectionBox title="Benefits">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {job.benefits.map((b, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#eff6ff",
                      color: primaryBlue,
                      border: `1px solid ${"#bfdbfe"}`,
                      borderRadius: 999,
                      padding: "8px 12px",
                      fontWeight: 900,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </SectionBox>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: 18,
              borderTop: `1px solid ${border}`,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onClose}
              style={{
                cursor: "pointer",
                background: "transparent",
                color: primaryBlue,
                border: `1px solid ${primaryBlue}`,
                padding: "10px 16px",
                borderRadius: 12,
                fontWeight: 900,
              }}
            >
              Close
            </button>

            {status === "accepted" ? (
              <button
                disabled
                style={{
                  cursor: "not-allowed",
                  background: "#dcfce7",
                  color: "#16a34a",
                  border: "1px solid #bbf7d0",
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontWeight: 900,
                }}
              >
                Accepted ✓
              </button>
            ) : status === "applied" ? (
              <button
                disabled
                style={{
                  cursor: "not-allowed",
                  background: "#f1f5f9",
                  color: textSecondary,
                  border: `1px solid ${border}`,
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontWeight: 900,
                }}
              >
                Applied
              </button>
            ) : (
              <button
                onClick={onApply}
                style={{
                  cursor: "pointer",
                  background: primaryBlue,
                  color: "#fff",
                  border: `1px solid ${primaryBlue}`,
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontWeight: 900,
                }}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ---- Job Card ----
  const JobCard = ({ job }) => {
    const saved = savedJobs.has(job.id);
    const status = applicationStatus[job.id];

    const [hovered, setHovered] = useState(false);

    const ApplyInlineButton = () => {
      if (status === "accepted") {
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: 999,
              background: "#dcfce7",
              color: "#16a34a",
              fontWeight: 900,
              fontSize: 13,
            }}
          >
            Accepted
          </span>
        );
      }
      if (status === "applied") {
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: 999,
              background: "#f1f5f9",
              color: "#64748b",
              fontWeight: 900,
              fontSize: 13,
            }}
          >
            Applied
          </span>
        );
      }

      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStatus(job.id, "applied");
          }}
          style={{
            cursor: "pointer",
            background: "#eff6ff",
            color: primaryBlue,
            border: `1px solid ${primaryBlue}`,
            padding: "10px 14px",
            borderRadius: 12,
            fontWeight: 900,
          }}
        >
          Apply Now
        </button>
      );
    };

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.card,
          cursor: "pointer",
          boxShadow: hovered ? "0 12px 30px rgba(15,23,42,0.08)" : "none",
          transform: hovered ? "translateY(-2px)" : "none",
        }}
        onClick={() => setSelectedJob(job)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Logo size={42} text={job.logo} color={job.logoColor} />
            <div>
              <div style={{ fontWeight: 1000, fontSize: 16, color: textPrimary }}>
                {job.title}
              </div>
              <div style={{ marginTop: 6, color: textSecondary, fontWeight: 800 }}>
                <span style={{ marginRight: 6 }}>🏢</span>
                {job.company}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaved(job.id);
              }}
              style={{
                cursor: "pointer",
                width: 36,
                height: 36,
                borderRadius: 12,
                border: `1px solid ${saved ? primaryBlue : border}`,
                background: saved ? primaryBlue : "#f8fafc",
                color: saved ? "#fff" : textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Toggle saved"
            >
              {bookmarkIcon(saved)}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}>
          <BadgePill bgColor="#f1f5f9" textColor={textSecondary}>
            <span style={{ marginRight: 6 }}>📍</span>
            {job.location}
          </BadgePill>
          <TypeBadge type={job.type} />
          <CategoryBadge category={job.category} />
        </div>

        <div style={{ marginTop: 10, color: textSecondary, fontWeight: 800, display: "flex", gap: 8 }}>
          <span>🗓️</span>
          <span>{formatPostedDate(job.posted)}</span>
        </div>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 1000, color: primaryBlue }}>
            {job.salary}
          </div>
          <ApplyInlineButton />
        </div>
      </div>
    );
  };

  // (moved Navbar outside the main component)

  // (moved HeroSearchBar outside the main component)

  // (moved Sidebar outside the main component)

  const JobsHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <div style={{ fontWeight: 1000, color: textSecondary }}>
        Showing {filteredJobs.length} jobs
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div
          onClick={() => setGridView(true)}
          style={{
            cursor: "pointer",
            width: 38,
            height: 38,
            borderRadius: 12,
            border: `1px solid ${border}`,
            background: gridView ? "#eff6ff" : "#fff",
            color: primaryBlue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 1000,
          }}
          aria-label="Grid view"
        >
          ⊞
        </div>
        <div
          onClick={() => setGridView(false)}
          style={{
            cursor: "pointer",
            width: 38,
            height: 38,
            borderRadius: 12,
            border: `1px solid ${border}`,
            background: !gridView ? "#eff6ff" : "#fff",
            color: primaryBlue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 1000,
          }}
          aria-label="List view"
        >
          ☰
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div
      style={{
        border: `1px dashed ${border}`,
        background: cardBg,
        borderRadius: 16,
        padding: 28,
        textAlign: "center",
        color: textSecondary,
      }}
    >
      <div style={{ fontSize: 44 }}>🔍</div>
      <div style={{ fontWeight: 1000, color: textPrimary, marginTop: 6 }}>No jobs found</div>
      <div style={{ marginTop: 10, fontWeight: 800 }}>
        Try adjusting your search or filters.
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} savedCount={savedCount} navigate={navigate} user={user} />

      <div style={{ ...styles.container, paddingTop: 18 }}>
        <HeroSearchBar search={search} setSearch={setSearch} locationSearch={locationSearch} setLocationSearch={setLocationSearch} activeTab={activeTab} />


        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 18, width: "100%", height: "calc(100vh - 180px)", overflow: "hidden" }}>
          <div style={{ overflowY: "auto", height: "100%" }}>
            <Sidebar typeFilters={typeFilters} setTypeFilters={setTypeFilters} catFilters={catFilters} setCatFilters={setCatFilters} minSalary={minSalary} setMinSalary={setMinSalary} maxSalary={maxSalary} setMaxSalary={setMaxSalary} clearAll={clearAll} />

          </div>

          <div style={{ overflowY: "auto", height: "100%" }}>
            <JobsHeader />


            {jobsLoading ? (
              <div style={{ border: `1px dashed ${border}`, background: cardBg, borderRadius: 16, padding: 28, textAlign: "center", color: textSecondary }}>
                <div style={{ fontSize: 44 }}>⏳</div>
                <div style={{ fontWeight: 1000, color: textPrimary, marginTop: 6 }}>Loading jobs...</div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <EmptyState />
            ) : (
              <div style={gridView ? styles.grid : styles.list}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedJob ? <JobDetailModal job={selectedJob} /> : null}
    </div>
  );
};

export default JobseekerDashboard;

