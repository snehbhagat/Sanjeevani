interface LeaderboardEntry {
  user_id: string;
  name?: string;
  total_donations: number;
  total_points: number;
  level: number;
}

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  if (!entries?.length) return <div className="subtle text-sm">No leaderboard data.</div>;
  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Donations</th>
            <th className="p-3 text-left">Points</th>
            <th className="p-3 text-left">Level</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((u, i) => (
            <tr key={u.user_id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-primary-50 text-primary-700">{i + 1}</span>
                  <span className="font-medium">{u.name || u.user_id}</span>
                </div>
              </td>
              <td className="p-3">{u.total_donations}</td>
              <td className="p-3">{u.total_points}</td>
              <td className="p-3">{u.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}