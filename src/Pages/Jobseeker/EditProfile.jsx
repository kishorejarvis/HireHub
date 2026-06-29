import { useState, useRef } from "react";

const EditProfile = () => {
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [isSaved, setIsSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    profileImage: null,
    profileImagePreview: null,
    resume: null,
    resumeName: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    resume: "",
    profileImage: "",
  });

  const [formMessage, setFormMessage] = useState("");

  const validateForm = (nextForm = form) => {
    const nextErrors = {
      fullName: "",
      email: "",
      resume: "",
      profileImage: "",
    };

    if (!nextForm.fullName || !nextForm.fullName.trim()) {
      nextErrors.fullName = "This field is required";
    }

    if (!nextForm.email || !nextForm.email.trim()) {
      nextErrors.email = "This field is required";
    }

    if (!nextForm.resume) {
      nextErrors.resume = "Please upload your resume";
    }

    // “Profile Image (if applicable)” – this page currently supports uploading it,
    // so enforce it as required as per requirements.
    if (!nextForm.profileImage) {
      nextErrors.profileImage = "This field is required";
    }

    const isValid =
      !nextErrors.fullName &&
      !nextErrors.email &&
      !nextErrors.resume &&
      !nextErrors.profileImage;

    return { isValid, nextErrors };
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => {
      const nextForm = { ...prev, [field]: value };

      // Clear toast if user starts fixing fields.
      if (formMessage) setFormMessage("");

      // Clear the specific field error when it becomes valid.
      setErrors((prevErrors) => {
        const cleared = { ...prevErrors };

        if (field === "fullName") {
          if (nextForm.fullName && nextForm.fullName.trim()) cleared.fullName = "";
        }
        if (field === "email") {
          if (nextForm.email && nextForm.email.trim()) cleared.email = "";
        }

        const hasAny =
          cleared.fullName || cleared.email || cleared.resume || cleared.profileImage;
        if (!hasAny) setFormMessage("");

        return cleared;
      });

      return nextForm;
    });
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        resume: file,
        resumeName: file.name,
      }));
    }
  };

  const handleDeleteResume = () => {
    setForm((prev) => ({
      ...prev,
      resume: null,
      resumeName: "",
    }));
  };

  const handleCancel = () => {
    setForm({
      fullName: "",
      email: "",
      profileImage: null,
      profileImagePreview: null,
      resume: null,
      resumeName: "",
    });
  };

  const handleSaveChanges = () => {
    const { isValid, nextErrors } = validateForm();

    if (!isValid) {
      setErrors(nextErrors);
      setFormMessage("Please fill all required fields.");
      setIsSaved(false);
      return;
    }

    // Save to localStorage (frontend-only temporary storage)
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        profileImagePreview: form.profileImagePreview,
        // store file names for localStorage (avoid huge blobs)
        profileImageName: form.profileImage?.name || "",
        resumeName: form.resumeName,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("jobseekerProfile", JSON.stringify(payload));
    } catch (e) {
      // localStorage may be unavailable; still proceed with UI feedback.
    }

    setFormMessage("");
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };


  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header with blue gradient */}
        <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-8 text-white">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* Main card content */}
        <div className="rounded-b-3xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <div className="space-y-8">
            {formMessage ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                <svg
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86l-8.53 17.3a1.5 1.5 0 001.38 2.14h17.92a1.5 1.5 0 001.38-2.14l-8.53-17.3a1.5 1.5 0 00-2.6 0z"
                  />
                </svg>
                <div>
                  {formMessage}
                </div>
              </div>
            ) : null}

              {/* Profile Image Section */}
            <div className="flex items-end gap-6">
              {/* Circular profile image */}
              <div className="relative flex-shrink-0">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-slate-200 bg-slate-100 flex items-center justify-center">
                  {form.profileImagePreview ? (
                    <img
                      src={form.profileImagePreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      className="h-12 w-12 text-slate-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Upload button */}
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition ${errors.profileImage ? "ring-1 ring-red-500" : ""}`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Choose file
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  {form.profileImage?.name || "No file chosen"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={handleChange("fullName")}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : "border-slate-300"}`}
              />
              {errors.fullName ? (
                <p className="mt-2 text-xs text-red-600">{errors.fullName}</p>
              ) : null}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="Enter your email address"
                className={`w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-slate-300"}`}
              />
              {errors.email ? (
                <p className="mt-2 text-xs text-red-600">{errors.email}</p>
              ) : null}
            </div>

            {/* Resume Section */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Resume
              </label>
                <div className="flex items-center justify-between">
                <div>
                  {form.resumeName ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {form.resumeName}
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No resume uploaded</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => resumeInputRef.current?.click()}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    Upload
                  </button>
                  {form.resumeName && (
                    <button
                      type="button"
                      onClick={handleDeleteResume}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete resume"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>
            </div>

            {isSaved && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Profile updated successfully.
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-slate-200" />


            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

