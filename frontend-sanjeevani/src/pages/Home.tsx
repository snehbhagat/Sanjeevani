import { useQuery } from 'react-query';
import api from '../api/client';
import { ChatbotPanel } from '../components/ChatBotpanel';
import { DashboardSection } from '../components/DashboardSection';
import Hero from '../components/Hero';

export default function Home() {
  // Lightweight queries for stats
  const donorsQ = useQuery('donors-stat', async () => {
    const res = await api.get('/api/donors');
    return res.data;
  });
  const inventoryQ = useQuery('inventory-stat', async () => {
    const res = await api.get('/api/blood-inventory');
    return res.data;
  });
  const leaderboardQ = useQuery('leaderboard-stat', async () => {
    const res = await api.get('/api/gamification/leaderboard', { params: { limit: 5 } });
    return res.data;
  }, { staleTime: 30000 });

  const totalUnits = (inventoryQ.data?.inventory || []).reduce((sum: number, i: { units: number }) => sum + i.units, 0);

  return (
    <div>
      <Hero />

      <DashboardSection
        title="Live Impact Dashboard"
        desc="Real-time statistics from our blood warrior community.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">👥</div>
              <div className="text-primary-200 text-sm font-medium">WARRIORS</div>
            </div>
            <div className="text-3xl font-bold mb-1">{donorsQ.data?.count ?? '—'}</div>
            <div className="text-primary-200 text-sm">Registered Blood Warriors</div>
          </div>
          
          <div className="stats-card bg-gradient-to-br from-success-500 to-success-600">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🩸</div>
              <div className="text-success-200 text-sm font-medium">TYPES</div>
            </div>
            <div className="text-3xl font-bold mb-1">{inventoryQ.data?.inventory?.length ?? '—'}</div>
            <div className="text-success-200 text-sm">Blood Groups Available</div>
          </div>
          
          <div className="stats-card bg-gradient-to-br from-blue-500 to-blue-600">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🏥</div>
              <div className="text-blue-200 text-sm font-medium">UNITS</div>
            </div>
            <div className="text-3xl font-bold mb-1">{totalUnits || '—'}</div>
            <div className="text-blue-200 text-sm">Total Blood Units</div>
          </div>
          
          <div className="stats-card bg-gradient-to-br from-yellow-500 to-yellow-600">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🏆</div>
              <div className="text-yellow-200 text-sm font-medium">HEROES</div>
            </div>
            <div className="text-3xl font-bold mb-1">{(leaderboardQ.data?.leaderboard || []).length}</div>
            <div className="text-yellow-200 text-sm">Top Performers</div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Join the Mission"
        desc="Quick actions to start saving lives today."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/predict" className="card hover:shadow-elevated transition-all duration-200 group">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 text-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                  🔮
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Predict Availability</div>
                  <p className="text-sm text-secondary-500">AI-powered donor prediction</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">Use machine learning to predict when donors will be available for donation.</p>
            </div>
          </a>
          
          <a href="/donors" className="card hover:shadow-elevated transition-all duration-200 group">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center text-success-600 text-xl group-hover:bg-success-600 group-hover:text-white transition-colors duration-200">
                  👥
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Find Blood Warriors</div>
                  <p className="text-sm text-secondary-500">Search & filter donors</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">Browse and filter through our community of verified blood donors by location and blood type.</p>
            </div>
          </a>
          
          <a href="/inventory" className="card hover:shadow-elevated transition-all duration-200 group">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  🏥
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Blood Bank Status</div>
                  <p className="text-sm text-secondary-500">Real-time inventory</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">Monitor current blood stock levels across all blood groups in real-time.</p>
            </div>
          </a>
          
          <a href="/donation" className="card hover:shadow-elevated transition-all duration-200 group border-2 border-primary-200">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 text-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                  🩸
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Record Donation</div>
                  <p className="text-sm text-primary-600 font-medium">Save a life today!</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">Record your blood donation and earn points in our gamification system.</p>
            </div>
          </a>
          
          <a href="/leaderboard" className="card hover:shadow-elevated transition-all duration-200 group">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 text-xl group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-200">
                  🏆
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Heroes Board</div>
                  <p className="text-sm text-secondary-500">Top blood warriors</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">See who's leading the mission to save lives and get inspired to donate more.</p>
            </div>
          </a>
          
          <a href="/chatbot" className="card hover:shadow-elevated transition-all duration-200 group">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                  💬
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">AI Assistant</div>
                  <p className="text-sm text-secondary-500">24/7 support</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600">Get instant answers about blood donation, health requirements, and more.</p>
            </div>
          </a>
        </div>
      </DashboardSection>

      <DashboardSection title="Chatbot" desc="Ask health or donation related questions.">
        <div className="grid lg:grid-cols-2 gap-6">
          <ChatbotPanel />
          <div className="flex flex-col gap-4">
            <div className="card">
              <div className="card-body">
                <h3 className="font-medium mb-2">About This Bot</h3>
                <p className="text-sm text-gray-600">
                  A multilingual demonstration stub. It can detect simple scripts, stub-translate,
                  and respond with canned knowledge. Integrate a real translation or LLM API for production use.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3 className="font-medium mb-2">Next Ideas</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Integrate real NER for medical concepts</li>
                  <li>Add conversation persistence</li>
                  <li>Offer FAQ suggestions dynamically</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DashboardSection>

      <footer className="bg-secondary-800 text-white py-12 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white grid place-items-center font-bold">
                🩸
              </div>
              <span className="text-xl font-bold">Sanjeevani Blood Warriors</span>
            </div>
            <p className="text-secondary-300 max-w-2xl mx-auto">
              Empowering communities to save lives through intelligent blood donation management. 
              Together, we're building a world where no life is lost due to blood shortage.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-secondary-400">
            <span>🏥 Educational Demo Platform</span>
            <span>•</span>
            <span>⚠️ Not for Medical Decisions</span>
            <span>•</span>
            <span>💝 Built with ❤️ for Humanity</span>
          </div>
        </div>
      </footer>
    </div>
  );
}