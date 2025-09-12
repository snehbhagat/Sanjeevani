export function DashboardSection({ title, desc, children, actions }: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap gap-4 items-end justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="section-heading">{title}</h2>
          {desc && <p className="subtitle mt-2">{desc}</p>}
        </div>
        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
      {children}
    </section>
  );
}