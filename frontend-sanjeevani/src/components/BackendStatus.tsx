import { useQuery } from 'react-query';
import api, { API_BASE } from '../api/client';

export default function BackendStatus() {
  const { data, isLoading, isError } = useQuery(
    ['health', API_BASE],
    async () => {
      const started = Date.now();
      const res = await api.get('/');
      const ms = Date.now() - started;
      return { ok: res.data?.status === 'ok', ms };
    },
    { refetchInterval: 30000 }
  );

  const color = isLoading ? 'bg-yellow-400' : isError || !data?.ok ? 'bg-red-500' : 'bg-green-500';
  const label = isLoading ? 'Checking' : isError ? 'Offline' : data?.ok ? `Online (${data.ms}ms)` : 'Unknown';

  return (
    <div className="flex items-center gap-2 text-xs text-gray-600" title={`Backend: ${API_BASE} • ${label}`}>
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}