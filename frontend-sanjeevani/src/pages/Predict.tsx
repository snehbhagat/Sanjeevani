import { useState } from 'react';
import api from '../api/client';

interface PredictionResult {
  prediction: number;
  probability?: number;
  model_type: string;
  donor_id: string;
}

export default function Predict() {
  const [donorId, setDonorId] = useState('D0001');
  const [modelType, setModelType] = useState<'logistic' | 'lstm'>('logistic');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    setResult(null);
    try {
      const res = await api.post('/api/predict', { donor_id: donorId, model_type: modelType });
      setResult(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Prediction failed');
    }
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body max-w-lg">
          <h2 className="text-lg font-semibold mb-3">Predict Donor Availability</h2>
          <div className="grid gap-3">
            <div>
              <label className="label">Donor ID</label>
              <input value={donorId} onChange={e => setDonorId(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Model</label>
              <select value={modelType} onChange={e => setModelType(e.target.value as 'logistic' | 'lstm')} className="input">
                <option value="logistic">logistic</option>
                <option value="lstm">lstm</option>
              </select>
            </div>
            <div>
              <button onClick={submit} className="btn btn-primary">Predict</button>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm mt-3">{error}</div>}
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