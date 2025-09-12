import { useState } from 'react';
import api from '../api/client';

interface ActivityResult {
  message: string;
  user?: {
    user_id: string;
    name: string;
    total_points: number;
    level: number;
  };
  activity?: {
    activity_id: string;
    user_id: string;
    activity_type: string;
    description: string;
    points: number;
    created_at: string;
  };
}

export default function Activity() {
  const [userId, setUserId] = useState('U1001');
  const [activityType, setActivityType] = useState('referral');
  const [description, setDescription] = useState('Referred a new donor');
  const [points, setPoints] = useState(50);
  const [result, setResult] = useState<ActivityResult | null>(null);
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    setResult(null);
    try {
      const res = await api.post(`/api/gamification/users/${userId}/activities`, {
        activity_type: activityType,
        description,
        points
      });
      setResult(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Record Activity</h2>
          <div className="grid gap-3">
            <div>
              <label className="label">User ID</label>
              <input value={userId} onChange={e => setUserId(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Activity Type</label>
              <input value={activityType} onChange={e => setActivityType(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Description</label>
              <input value={description} onChange={e => setDescription(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Points</label>
              <input type="number" value={points} onChange={e => setPoints(Number(e.target.value))} className="input" />
            </div>
            <div>
              <button onClick={submit} className="btn btn-primary">Submit</button>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>
        </div>
      </div>

      {result && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold mb-2">Result</h3>
            <pre className="code-block">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}