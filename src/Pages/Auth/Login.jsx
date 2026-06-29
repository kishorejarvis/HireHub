import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employer",
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  // Validation functions
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      errors.role = "Please select a role";
    }

    setFormState((prev) => ({
      ...prev,
      errors,
    }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({
      ...prev,
      loading: true,
      success: false,
    }));

    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
      }));

      // Use the auth context to login (frontend-only for now)
      const userName = formData.email.split("@")[0] || "User";
      login(formData.email, formData.role, userName);

      // Navigate to appropriate dashboard
      if (formData.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/find-jobs");
      }
    }, 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200">
            <Lock className="h-7 w-7 text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to your HireHub account
          </p>
        </div>

        {formState.success && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle className="h-5 w-5" />
            Login successful. Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-lg border py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 ${
                  formState.errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:ring-2`}
                placeholder="Enter your email"
              />
            </div>

            {formState.errors.email && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full rounded-lg border py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 ${
                  formState.errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:ring-2`}
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-600"
              >
                {formState.showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Login As
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative flex cursor-pointer items-center rounded-lg border-2 border-gray-200 p-3 transition-all duration-300 hover:border-blue-500"
                style={{
                  borderColor: formData.role === "employer" ? "#2563eb" : "#e5e7eb",
                  backgroundColor: formData.role === "employer" ? "#eff6ff" : "#fff"
                }}>
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={formData.role === "employer"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Employer</span>
              </label>

              <label className="relative flex cursor-pointer items-center rounded-lg border-2 border-gray-200 p-3 transition-all duration-300 hover:border-blue-500"
                style={{
                  borderColor: formData.role === "jobseeker" ? "#2563eb" : "#e5e7eb",
                  backgroundColor: formData.role === "jobseeker" ? "#eff6ff" : "#fff"
                }}>
                <input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  checked={formData.role === "jobseeker"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Job Seeker</span>
              </label>
            </div>

            {formState.errors.role && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                <AlertCircle className="h-4 w-4" />
                {formState.errors.role}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formState.loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {formState.loading && <Loader className="h-5 w-5 animate-spin" />}
            {formState.loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="pt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;