import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api/client';

interface LeaderboardUser {
  user_id: string;
  name?: string;
  total_donations: number;
  total_points: number;
  level: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
}

export default function Leaderboard() {
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch, error } = useQuery<LeaderboardResponse>(['leaderboard', limit], async () => {
    const res = await api.get('/api/gamification/leaderboard', { params: { limit } });
    return res.data;
  });

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Leaderboard</h2>
          <div className="flex gap-2 items-end">
            <div className="flex-1 max-w-[160px]">
              <label className="label">Limit</label>
              <input type="number" value={limit} onChange={e => setLimit(Number(e.target.value))} className="input" />
            </div>
            <button onClick={() => refetch()} className="btn btn-primary">Refresh</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {isLoading && <div className="muted text-sm">Loading...</div>}
          {Boolean(error) && (<div className="text-red-600 text-sm">Failed to load leaderboard</div>)}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Donations</th>
                  <th className="p-2 text-left">Points</th>
                  <th className="p-2 text-left">Level</th>
                </tr>
              </thead>
              <tbody>
                {data?.leaderboard?.map((u: LeaderboardUser) => (
                  <tr key={u.user_id} className="border-t">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.total_donations}</td>
                    <td className="p-2">{u.total_points}</td>
                    <td className="p-2">{u.level}</td>
                  </tr>
                ))}
                {!isLoading && (!data?.leaderboard || data.leaderboard.length === 0) && (
                  <tr><td className="p-2 text-sm muted" colSpan={4}>No entries</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}