import { useQuery } from 'react-query';
import api from '../api/client';
import { useState } from 'react';

export default function GamificationProfile() {
  const [userId, setUserId] = useState('U1001');
  const { data, refetch, isFetching, error } = useQuery(['profile', userId], async () => {
    const res = await api.get(`/api/gamification/users/${userId}/profile`);
    return res.data;
  });

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Load Profile</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="label">User ID</label>
              <input value={userId} onChange={e => setUserId(e.target.value)} className="input" />
            </div>
            <div className="flex items-end">
              <button onClick={() => refetch()} className="btn btn-primary w-full sm:w-auto">Load</button>
            </div>
          </div>
        </div>
      </div>

      {isFetching && <div className="muted text-sm">Loading...</div>}
      {error && <div className="text-red-600 text-sm">Error loading profile</div>}
      {data && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold mb-2">Profile</h3>
            <pre className="code-block">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}