import { useState } from 'react';
import api from '../api/client';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function send() {
    const outgoing = message.trim();
    if (!outgoing) return;
    setError('');
    setHistory(h => [...h, { role: 'user', text: outgoing }]);
    setMessage('');
    setLoading(true);
    try {
      const res = await api.post('/api/chatbot/chat', { message: outgoing, translate: true });
      setHistory(h => [...h, { role: 'bot', text: res.data.response }]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred';
      setError(errorMessage);
      setHistory(h => [...h, { role: 'bot', text: 'Error occurred' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-3">Chatbot</h2>
          <div className="grid gap-3">
            <div className="h-80 border rounded-md bg-white p-3 overflow-y-auto">
              {history.map((m, i) => (
                <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-blue-700' : 'text-green-700'}`}>
                  <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.text}
                </div>
              ))}
              {loading && <div className="text-sm muted">Thinking...</div>}
            </div>
            <div className="flex gap-2">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="input flex-1"
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
                placeholder="Type your message..."
              />
              <button onClick={send} className="btn btn-primary">Send</button>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}