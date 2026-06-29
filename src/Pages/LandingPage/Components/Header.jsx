import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Authcontext";

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-gray-900 shadow-sm backdrop-blur">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-16 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-0">
                    {/* Logo */}
                    <div className="flex items-center justify-center space-x-3 md:justify-start">
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
                    </div>

                    <nav className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 sm:gap-3">
                        <button
                            onClick={() => navigate("/find-jobs")}
                            className="rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-blue-50 hover:text-blue-600"
                        >
                            Find Job
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    isAuthenticated && user?.role === "employer"
                                        ? "/employer/dashboard"
                                        : "/login"
                                )
                            }
                            className="rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-blue-50 hover:text-blue-600"
                        >
                            For Employer
                        </button>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center justify-center gap-3 text-sm md:justify-end">
                        {isAuthenticated ? (
                            <div className="flex flex-col items-center gap-3 sm:flex-row">
                                <span className="font-medium text-gray-600">Welcome, {user?.userName}</span>

                                <button
                                    onClick={() =>
                                        navigate(
                                            user?.role === "employer"
                                                ? "/employer/dashboard"
                                                : "/find-jobs"
                                        )
                                    }
                                    className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Dashboard
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg px-4 py-2 font-semibold text-red-600 transition-colors duration-300 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="rounded-lg px-4 py-2 font-semibold text-blue-600 transition-colors duration-300 hover:bg-blue-50"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => navigate("/signup")}
                                    className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
