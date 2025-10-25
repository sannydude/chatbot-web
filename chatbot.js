
let data = [];

fetch('chatbot_data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
  });

document.getElementById('sendBtn').addEventListener('click', () => {
  const input = document.getElementById('userInput').value;
  addMessage('user', input);
  respondToQuery(input);
  document.getElementById('userInput').value = '';
});

function addMessage(sender, text) {
  const chatbox = document.getElementById('chatbox');
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.textContent = (sender === 'user' ? 'You: ' : 'Bot: ') + text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function respondToQuery(query) {
  query = query.toLowerCase();
  let response = '';

  if (query.includes('how many')) {
    if (query.includes('oci holder')) {
      const count = data.filter(d => d['OCI Holder'].toLowerCase() === 'yes').length;
      response = `There are ${count} OCI holders.`;
    } else if (query.includes('present')) {
      const count = data.filter(d => d['Status'].toLowerCase() === 'present').length;
      response = `There are ${count} experts currently present.`;
    } else if (query.includes('completed')) {
      const count = data.filter(d => d['Status'].toLowerCase() === 'completed').length;
      response = `There are ${count} experts who have completed their engagement.`;
    }
  } else if (query.includes('list') || query.includes('show')) {
    let results = data;

    if (query.includes('usa')) {
      results = results.filter(d => d['Country'].toLowerCase().includes('usa'));
    }
    if (query.includes('long')) {
      results = results.filter(d => d['Term Engagement'].toLowerCase() === 'long');
    }
    if (query.includes('short')) {
      results = results.filter(d => d['Term Engagement'].toLowerCase() === 'short');
    }
    if (query.includes('oci')) {
      results = results.filter(d => d['OCI Holder'].toLowerCase() === 'yes');
    }
    if (query.includes('present')) {
      results = results.filter(d => d['Status'].toLowerCase() === 'present');
    }
    if (query.includes('completed')) {
      results = results.filter(d => d['Status'].toLowerCase() === 'completed');
    }

    if (results.length > 0) {
      response = `Found ${results.length} matching experts:
` + results.map(r => `${r.Name} (${r.Country}, ${r.Institute})`).join('
');
    } else {
      response = 'No matching experts found.';
    }
  } else {
    response = 'Sorry, I didn’t understand that. Try asking about OCI holders, status, country, or institute.';
  }

  addMessage('bot', response);
}
