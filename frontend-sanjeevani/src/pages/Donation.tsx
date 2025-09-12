import { useState } from 'react';
import api from '../api/client';

interface DonationResult {
  message: string;
  donation?: {
    donation_id: string;
    user_id: string;
    donation_date: string;
    created_at: string;
  };
  user?: {
    user_id: string;
    name: string;
    total_points: number;
    level: number;
  };
}

export default function Donation() {
  const [userId, setUserId] = useState('U1001');
  const [date, setDate] = useState('');
  const [result, setResult] = useState<DonationResult | null>(null);
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    setResult(null);
    try {
      const payload: { donation_date?: string } = {};
      if (date) payload.donation_date = date;
      const res = await api.post(`/api/gamification/users/${userId}/donations`, payload);
      setResult(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Record Donation</h2>
          <div className="grid gap-3">
            <div>
              <label className="label">User ID</label>
              <input value={userId} onChange={e => setUserId(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Donation Date (ISO, optional)</label>
              <input value={date} onChange={e => setDate(e.target.value)} placeholder="YYYY-MM-DDTHH:mm:ssZ" className="input" />
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