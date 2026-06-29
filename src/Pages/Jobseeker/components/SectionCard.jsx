const SectionCard = ({ title, children, className = "" }) => (
  <section
    className={`rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.08)] p-6 ${className}`}
  >
    {title ? <h2 className="mb-5 text-lg font-semibold text-slate-950">{title}</h2> : null}
    {children}
  </section>
);

export default SectionCard;
