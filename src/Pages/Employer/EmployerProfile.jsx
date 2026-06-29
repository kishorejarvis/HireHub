import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import EmployerSidebar from "./EmployerSidebar";
import { useEmployer } from "../../context/EmployerContext";

const REQUIRED_FIELDS = {
  contactName: true,
  contactTitle: true, // required: contact person name/title in this UI
  companyName: true,
  email: true,
  website: true,
  industry: true,
  location: true,
  about: true,
  founded: false, // optional if available
  employees: false, // optional if available
  // logoUrl is not present in the current UI form; see note below.
  // logoUrl: true,
};

const EmployerProfile = () => {
  const { company, updateCompany } = useEmployer();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(company);
  const [isSaving, setIsSaving] = useState(false);

  // UI states required by the task
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-fill fields on page load and whenever localStorage-backed company changes.
    if (!isEditing) setForm(company);
  }, [company, isEditing]);

  const overviewItems = useMemo(
    () => [
      { label: "Contact Name", value: company.contactName },
      { label: "Contact Title", value: company.contactTitle },
      { label: "Company Name", value: company.companyName },
      { label: "Industry", value: company.industry },
      { label: "Email", value: company.email },
      { label: "Website", value: company.website },
      { label: "Location", value: company.location },
      { label: "Founded", value: company.founded },
      { label: "Employees", value: company.employees },
    ],
    [company]
  );

  const validateForm = (draft) => {
    const errors = {};

    Object.entries(REQUIRED_FIELDS).forEach(([key, required]) => {
      if (!required) return;

      const val = draft?.[key];
      if (typeof val === "string") {
        if (!val.trim()) errors[key] = "This field is required.";
      } else {
        if (val === null || val === undefined || val === "") {
          errors[key] = "This field is required.";
        }
      }
    });

    // Match task requirement: top error toast should be exactly this sentence.
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Requirement: clear validation error for that field when user enters valid data.
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (next[name]) {
        const isNowValid = (() => {
          if (!(name in REQUIRED_FIELDS)) return true;
          if (!REQUIRED_FIELDS[name]) return true;
          return typeof value === "string" ? !!value.trim() : value !== undefined && value !== null && value !== "";
        })();
        if (isNowValid) delete next[name];
      }
      return next;
    });

    // Clear top-level message once user starts editing.
    if (errorMessage) setErrorMessage("");
  };

  const handleSave = () => {
    setSubmitted(true);
    setIsSaving(true);
    setErrorMessage("");

    try {
      const errors = validateForm(form);
      if (Object.keys(errors).length > 0) {
        // Requirement: Prevent saving if any required field is empty.
        setFieldErrors(errors);
        toast.error("Please fill all required fields.");
        setIsSaving(false);
        return;
      }

      // Requirement: frontend-only storage (no backend/API)
      // NOTE: when backend is integrated, replace this updateCompany(form) call with API request.
      updateCompany(form);
      toast.success("Company profile updated successfully.");
      setIsEditing(false);
      setSubmitted(false);
      setFieldErrors({});
    } catch (err) {
      setErrorMessage(err?.message || "Failed to save changes.");
      toast.error("Could not save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <EmployerSidebar active="profile" />
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
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Company Profile</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Manage your company details and brand identity.</div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
          
        </header>

        <main style={{ flex: 1, padding: "28px 32px" }}>
          <div style={{ display: "grid", gap: 24 }}>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1.2fr 0.8fr" }}>
              <section style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
                  <div style={{ width: 96, height: 96, borderRadius: 24, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: 32, fontWeight: 700 }}>
                    {company.companyName.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>{company.companyName}</div>
                    <div style={{ fontSize: 14, color: "#6b7280", marginTop: 8 }}>{company.industry}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ fontSize: 14, color: "#6b7280" }}>About Company</div>
                    <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: 15 }}>{company.about}</p>
                  </div>

                  <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                    {overviewItems.slice(0, 4).map((item) => (
                      <div key={item.label} style={{ background: "#f8fafc", borderRadius: 16, padding: 18 }}>
                        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{item.label}</div>
                        <div style={{ fontSize: 15, color: "#111827", fontWeight: 600 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Company Snapshot</div>
                <div style={{ display: "grid", gap: 16 }}>
                  {overviewItems.slice(4).map((item) => (
                    <div key={item.label} style={{ display: "grid", gap: 6 }}>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{item.label}</div>
                      <div style={{ fontSize: 15, color: "#111827", fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 18 }}>Contact Details</div>
              <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Contact Person</div>
                  <div style={{ fontSize: 15, color: "#111827" }}>{company.contactName}</div>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Email</div>
                  <div style={{ fontSize: 15, color: "#111827" }}>{company.email}</div>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Website</div>
                  <div style={{ fontSize: 15, color: "#111827" }}>{company.website}</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {isEditing && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.56)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          zIndex: 1000,
        }}>
          <div style={{
            width: "100%",
            maxWidth: 840,
            background: "#fff",
            borderRadius: 24,
            overflow: "auto",
            maxHeight: "90vh",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 24, borderBottom: "1px solid #e5e7eb" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>Edit Company Profile</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Update company and contact information.</div>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                style={{ border: "none", background: "transparent", fontSize: 22, lineHeight: 1, cursor: "pointer", color: "#6b7280" }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: 28, display: "grid", gap: 20 }}>
              <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
                {[
                  { name: "contactName", label: "Contact Name" },
                  { name: "contactTitle", label: "Contact Title" },
                  { name: "companyName", label: "Company Name" },
                  { name: "industry", label: "Industry" },
                  { name: "email", label: "Email" },
                  { name: "website", label: "Website" },
                  { name: "location", label: "Location" },
                  { name: "founded", label: "Founded" },
                  { name: "employees", label: "Employees" },
                ].map((field) => {
                  const hasError = submitted && fieldErrors[field.name];
                  return (
                    <label key={field.name} style={{ display: "grid", gap: 8 }}>
                      <span style={{ color: "#4b5563", fontSize: 13 }}>{field.label}</span>
                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: 14,
                          border: hasError ? "1px solid #ef4444" : "1px solid #e5e7eb",
                          outline: "none",
                          boxShadow: hasError ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
                          fontSize: 14,
                          color: "#111827",
                          background: "#f8fafc",
                        }}
                      />
                      {hasError && (
                        <span style={{ color: "#b91c1c", fontSize: 12, fontWeight: 600 }}>
                          {fieldErrors[field.name]}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#4b5563", fontSize: 13 }}>About Company</span>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: submitted && fieldErrors.about ? "1px solid #ef4444" : "1px solid #e5e7eb",
                    outline: "none",
                    boxShadow:
                      submitted && fieldErrors.about ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
                    fontSize: 14,
                    color: "#111827",
                    background: "#f8fafc",
                  }}
                />
                {submitted && fieldErrors.about && (
                  <span style={{ color: "#b91c1c", fontSize: 12, fontWeight: 600 }}>
                    {fieldErrors.about}
                  </span>
                )}
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    color: "#374151",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: "#2563eb",
                    color: "#fff",
                    cursor: isSaving ? "not-allowed" : "pointer",
                    fontWeight: 600,
                    opacity: isSaving ? 0.8 : 1,
                  }}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {errorMessage && (
                <div style={{ marginTop: 10, color: "#b91c1c", fontSize: 13, fontWeight: 600 }}>
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;

