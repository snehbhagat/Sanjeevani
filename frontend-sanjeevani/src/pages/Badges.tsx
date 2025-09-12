import { useQuery } from 'react-query';
import api from '../api/client';

interface Badge {
  badge_id: string;
  name: string;
  description: string;
  points: number;
}

interface BadgesResponse {
  badges: Badge[];
}

export default function Badges() {
  const { data, isLoading, error } = useQuery<BadgesResponse>('badges', async () => {
    const res = await api.get('/api/gamification/badges');
    return res.data;
  });

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-3">Badges</h2>
          {isLoading && <div className="muted text-sm">Loading...</div>}
          {Boolean(error) && (<div className="text-red-600 text-sm">Failed to load Badges</div>)}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {data?.badges?.map((b: Badge) => (
              <div key={b.badge_id} className="border rounded-md p-4">
                <div className="font-semibold">{b.name}</div>
                <div className="text-gray-600 text-sm">{b.description}</div>
                <div className="mt-1 text-xs muted">Points: {b.points}</div>
              </div>
            ))}
            {!isLoading && (!data?.badges || data.badges.length === 0) && (
              <div className="muted text-sm">No badges available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}