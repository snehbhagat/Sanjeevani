interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  tone?: 'primary' | 'neutral';
  hint?: string;
}
export function StatCard({ label, value, icon, tone = 'neutral', hint }: StatCardProps) {
  return (
    <div className="card h-full">
      <div className="card-body flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
          {icon && <span className={`h-8 w-8 rounded-md grid place-items-center text-sm ${tone === 'primary' ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-600'}`}>{icon}</span>}
        </div>
        <div className="text-2xl font-semibold">{value}</div>
        {hint && <div className="text-xs text-gray-500">{hint}</div>}
      </div>
    </div>
  );
}