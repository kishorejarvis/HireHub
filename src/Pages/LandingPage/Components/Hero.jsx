import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const isAuthenticated = true;
  const user = {
    fullName: "Kishore",
    role: "employer",
  };

  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "1.2K+",
    },
    {
      icon: Building2,
      label: "Companies",
      value: "500+",
    },
    {
      icon: TrendingUp,
      label: "Growth",
      value: "80%",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find Your Dream Job or{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Hire
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-8 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg"
          >
            Connect talented professionals with innovative companies.
            Your next career move or perfect candidate is just one click away.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-200 transition-colors duration-300 hover:bg-blue-700"
              onClick={() => navigate("/find-jobs")}
            >
              <Search className="h-5 w-5" />
              <span>Find Jobs</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
            >
              Post a Job
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.6,
                }}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex justify-center">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>

                <div className="mt-1 text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-200 blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-indigo-200 blur-3xl opacity-20" />
      </div>
    </section>
  );
};

export default Hero;
