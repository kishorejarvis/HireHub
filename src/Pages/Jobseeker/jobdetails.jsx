import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const job = useMemo(
    () => ({
      title: "Senior Software Engineer",
      company: "TechNova Solutions",
      location: "San Francisco, USA",
      type: "Full-Time",
      category: "IT & Software",
      salary: "$60k/m",
      posted: "5th Jul 2025",
      summary:
        "Deliver high-quality software solutions across web platforms. Collaborate with product, design, and engineering teams to build scalable systems and improve developer workflows.",
      requirements: [
        "5+ years of professional experience in software development",
        "Strong knowledge of JavaScript, React, and Node.js",
        "Experience with cloud-native applications and CI/CD",
        "Excellent communication and mentorship skills",
      ],
      benefits: [
        "Flexible work schedule",
        "Health insurance coverage",
        "Career growth support",
        "Remote-friendly team",
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[980px] space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Job #{jobId}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">{job.title}</h1>
              <p className="mt-3 text-sm text-slate-600">{job.company} · {job.location}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to jobs
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm font-semibold text-slate-900">
              Type
              <p className="mt-2 text-base text-slate-700">{job.type}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm font-semibold text-slate-900">
              Category
              <p className="mt-2 text-base text-slate-700">{job.category}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm font-semibold text-slate-900">
              Salary
              <p className="mt-2 text-base text-slate-700">{job.salary}</p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">About this role</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{job.summary}</p>
            </section>

            <section>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Requirements</p>
              <ul className="mt-4 space-y-3 text-slate-600">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-slate-900">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Benefits</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {job.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
