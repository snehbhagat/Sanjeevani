import { useQuery } from 'react-query';
import api from '../api/client';

interface InventoryItem {
  blood_group: string;
  units: number;
}

interface InventoryResponse {
  inventory: InventoryItem[];
}

export default function Inventory() {
  const { data, isLoading, error } = useQuery<InventoryResponse>('inventory', async () => {
    const res = await api.get('/api/blood-inventory');
    return res.data;
  });

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-3">Blood Inventory</h2>
          {isLoading && <div className="muted text-sm">Loading...</div>}
          {Boolean(error) && <div className="text-red-600 text-sm">Failed to load inventory</div>}
          <div className="grid gap-2 max-w-md">
            {data?.inventory?.map((i: InventoryItem) => (
              <div key={i.blood_group} className="border rounded-md p-3 flex items-center justify-between">
                <span className="font-medium">{i.blood_group}</span>
                <span className="text-sm">Units: <strong>{i.units}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}