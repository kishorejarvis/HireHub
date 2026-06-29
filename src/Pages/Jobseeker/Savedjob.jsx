import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const SavedJobs = () => {
  const navigate = useNavigate();

  const savedJobs = useMemo(
    () => [
      {
        id: 3,
        title: "Digital Marketing Specialist",
        company: "PixelForge Studios",
        location: "London, UK",
        type: "Full-Time",
        salary: "$45k/m",
      },
      {
        id: 7,
        title: "DevOps Engineer",
        company: "NeoHire Labs",
        location: "Amsterdam, Netherlands",
        type: "Remote",
        salary: "$90k/m",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Saved Jobs</h1>
            <p className="mt-2 text-sm text-slate-600">Review your bookmarked opportunities and continue where you left off.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Open Profile
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {savedJobs.map((job) => (
            <div key={job.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-950">{job.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{job.company}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{job.type}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="mt-6 inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Job
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
