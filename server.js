const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const SAVE_FILE = path.join(__dirname, 'save_number.json');

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Load connections from file
function loadConnections() {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      const data = fs.readFileSync(SAVE_FILE, 'utf-8');
      return data.trim() ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error('Error loading connections:', err);
  }
  return [];
}

// Save connections to file
function saveConnections(connections) {
  try {
    fs.writeFileSync(SAVE_FILE, JSON.stringify(connections, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving connections:', err);
    return false;
  }
}

// Serve main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Save a phone-name connection
app.post('/api/save-connection', (req, res) => {
  try {
    const { phone, name, code, mobile, query } = req.body;
    
    if (!phone || !name) {
      return res.status(400).json({ success: false, error: 'Missing phone or name' });
    }

    let connections = loadConnections();
    
    // Check if phone already exists and update it
    const existingIndex = connections.findIndex(item => item.phone === phone);
    const record = {
      phone,
      name,
      code: code || '',
      mobile: mobile || '',
      query: query || '',
      savedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      connections[existingIndex] = record;
    } else {
      connections.push(record);
    }

    if (saveConnections(connections)) {
      res.json({ success: true, count: connections.length });
    } else {
      res.status(500).json({ success: false, error: 'Failed to save' });
    }
  } catch (err) {
    console.error('Error in save-connection:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all saved connections
app.get('/api/connections', (req, res) => {
  try {
    const connections = loadConnections();
    res.json({ success: true, connections, count: connections.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dummy API endpoint for live stats
app.get('/api/live', (req, res) => {
  res.json({
    page_views: 332408,
    total_checked: 85753,
    total_danger: 23121,
    total_safe: 62632,
    hidden_count: 1557,
    history: []
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Saving connections to: ${SAVE_FILE}`);
});
