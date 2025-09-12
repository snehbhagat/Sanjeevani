interface Badge {
  badge_id: string;
  name: string;
  description: string;
  points: number;
  date_earned?: string;
}

export function BadgeGrid({ badges }: { badges: Badge[] }) {
  if (!badges?.length) return <div className="subtle text-sm">No badges yet.</div>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {badges.map(b => (
        <div key={b.badge_id} className="card">
          <div className="card-body py-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{b.name}</h3>
              <span className="pill">+{b.points}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{b.description}</p>
            {b.date_earned && (
              <div className="mt-2 text-[10px] uppercase tracking-wide text-gray-400">
                Earned: {new Date(b.date_earned).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}