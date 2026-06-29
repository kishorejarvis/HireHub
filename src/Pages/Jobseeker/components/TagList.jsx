const TagList = ({ items = [] }) => (
  <div className="flex flex-wrap gap-3">
    {items.map((item) => (
      <span
        key={item}
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
      >
        {item}
      </span>
    ))}
  </div>
);

export default TagList;
