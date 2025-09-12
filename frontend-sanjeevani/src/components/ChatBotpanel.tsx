import { useState } from 'react';
import api from '../api/client';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export function ChatbotPanel() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const outgoing = message.trim();
    if (!outgoing) return;
    setHistory(h => [...h, { role: 'user', text: outgoing }]);
    setMessage('');
    setLoading(true);
    try {
      const res = await api.post('/api/chatbot/chat', { message: outgoing, translate: true });
      setHistory(h => [...h, { role: 'bot', text: res.data.response }]);
    } catch {
      setHistory(h => [...h, { role: 'bot', text: 'Error occurred' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="card-body flex flex-col gap-3 flex-1">
        <h3 className="font-medium">Chatbot</h3>
        <div className="flex-1 border rounded-md p-3 bg-white overflow-y-auto text-sm space-y-2">
          {history.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-primary-700' : 'text-green-700'}>
              <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.text}
            </div>
          ))}
          {loading && <div className="text-xs text-gray-500">Thinking...</div>}
        </div>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Type your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
          />
          <button onClick={send} className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
}