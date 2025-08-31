(() => {
  const $ = (id) => document.getElementById(id);
  let token = '';

  const setToken = (t) => {
    token = t || '';
    $('tokenPreview').textContent = token ? token.slice(0, 14) + '…' : '-';
  };

  const api = async (path, opts = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers.Authorization = 'Bearer ' + token;
    const res = await fetch('/api' + path, { ...opts, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || JSON.stringify(data));
    return data;
  };

  // Auth
  $('btnRegister').onclick = async () => {
    try {
      const body = JSON.stringify({
        name: $('regName').value,
        email: $('regEmail').value,
        password: $('regPassword').value,
      });
      const res = await api('/auth/register', { method: 'POST', body });
      setToken(res.token);
      alert('Registered');
    } catch (e) {
      alert('Register failed: ' + e.message);
    }
  };

  $('btnLogin').onclick = async () => {
    try {
      const body = JSON.stringify({ email: $('logEmail').value, password: $('logPassword').value });
      const res = await api('/auth/login', { method: 'POST', body });
      setToken(res.token);
      alert('Logged in');
    } catch (e) {
      alert('Login failed: ' + e.message);
    }
  };

  // Donors
  $('btnCreateDonor').onclick = async () => {
    try {
      const body = JSON.stringify({
        name: $('donorName').value,
        email: $('donorEmail').value,
        bloodGroup: $('donorBlood').value,
        location: $('donorLocation').value,
        contact: $('donorContact').value,
        availability: $('donorAvail').checked,
      });
      const res = await api('/donors', { method: 'POST', body });
      alert('Donor created: ' + res.id);
    } catch (e) {
      alert('Create donor failed: ' + e.message);
    }
  };

  $('btnLoadDonors').onclick = async () => {
    try {
      const q = new URLSearchParams({
        bloodGroup: $('filterBlood').value || '',
        location: $('filterLocation').value || '',
      });
      const list = await api('/donors?' + q.toString());
      $('donorsList').textContent = JSON.stringify(list, null, 2);
    } catch (e) {
      $('donorsList').textContent = 'Error: ' + e.message;
    }
  };

  // Requests
  $('btnCreateRequest').onclick = async () => {
    try {
      const body = JSON.stringify({
        patientName: $('reqPatient').value,
        bloodGroup: $('reqBlood').value,
        urgency: $('reqUrgency').value,
        hospital: $('reqHospital').value,
        contact: $('reqContact').value,
      });
      const res = await api('/requests', { method: 'POST', body });
      alert('Request created: ' + res.id);
    } catch (e) {
      alert('Create request failed: ' + e.message);
    }
  };

  $('btnLoadRequests').onclick = async () => {
    try {
      const list = await api('/requests');
      $('requestsList').textContent = JSON.stringify(list, null, 2);
    } catch (e) {
      $('requestsList').textContent = 'Error: ' + e.message;
    }
  };

  // Gamification
  $('btnGamification').onclick = async () => {
    try {
      const userId = $('gmUserId').value || 'demo';
      const data = await api('/gamification/' + encodeURIComponent(userId));
      $('gmOut').textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      $('gmOut').textContent = 'Error: ' + e.message;
    }
  };

  // Chatbot
  $('btnChatbot').onclick = async () => {
    try {
      const question = $('cbQuestion').value;
      const data = await api('/chatbot', { method: 'POST', body: JSON.stringify({ question }) });
      $('cbOut').textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      $('cbOut').textContent = 'Error: ' + e.message;
    }
  };

  // Prediction
  $('btnPredict').onclick = async () => {
    try {
      const id = $('predDonorId').value || 'demo';
      const data = await api('/prediction/donor/' + encodeURIComponent(id));
      $('predOut').textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      $('predOut').textContent = 'Error: ' + e.message;
    }
  };
})();
