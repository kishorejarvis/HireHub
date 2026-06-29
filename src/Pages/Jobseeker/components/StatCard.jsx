const StatCard = ({ label, value, accent = "text-slate-950" }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
    <p className={`text-3xl font-semibold ${accent}`}>{value}</p>
    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</p>
  </div>
);

export default StatCard;
