import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api/client';

interface Donor {
  donor_id: string;
  blood_group: string;
  location: string;
  gender: string;
  age: number;
  donor_type: string;
}

interface DonorsResponse {
  donors: Donor[];
  count: number;
}

export default function Donors() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const { data, refetch, isFetching } = useQuery<DonorsResponse>(['donors', bloodGroup, location], async () => {
    const params: { blood_group?: string; location?: string } = {};
    if (bloodGroup) params.blood_group = bloodGroup;
    if (location) params.location = location;
    const res = await api.get('/api/donors', { params });
    return res.data;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="page-title">Find Blood Warriors</h1>
        <p className="subtitle">Search our community of verified blood donors ready to save lives.</p>
      </div>

      <div className="grid gap-8">
        <div className="card">
          <div className="card-header">
            <h2 className="section-heading">🔍 Search Filters</h2>
          </div>
          <div className="card-body">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="label">🩸 Blood Group</label>
                <input 
                  placeholder="e.g. O+, A-, AB+" 
                  value={bloodGroup} 
                  onChange={e => setBloodGroup(e.target.value)} 
                  className="input" 
                />
                <p className="text-xs text-secondary-500 mt-1">Enter specific blood type needed</p>
              </div>
              <div>
                <label className="label">📍 Location</label>
                <input 
                  placeholder="e.g. Mumbai, Delhi, Bangalore" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                  className="input" 
                />
                <p className="text-xs text-secondary-500 mt-1">City or area name</p>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => refetch()} 
                  className="btn btn-primary w-full"
                  disabled={isFetching}
                >
                  {isFetching ? 'Searching...' : '🔍 Find Warriors'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="section-heading">🩸 Blood Warriors Found</h2>
              <div className="pill">
                {isFetching ? 'Searching...' : `${data?.count ?? 0} Warriors`}
              </div>
            </div>
          </div>
          <div className="card-body">
            {!isFetching && (!data?.donors || data.donors.length === 0) ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Blood Warriors Found</h3>
                <p className="text-secondary-600 mb-4">Try adjusting your search criteria to find more donors.</p>
                <button onClick={() => refetch()} className="btn btn-outline">
                  Search Again
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {data?.donors?.map((d: Donor) => (
                  <div key={d.donor_id} className="border border-secondary-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-card transition-all duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-bold">{d.blood_group}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-secondary-900">Warrior #{d.donor_id}</div>
                          <div className="text-sm text-secondary-600">{d.gender}, {d.age} years old</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-secondary-900">📍 {d.location}</div>
                          <div className="text-xs text-secondary-500">{d.donor_type} Donor</div>
                        </div>
                        <button className="btn btn-primary">
                          🩸 Request Blood
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}