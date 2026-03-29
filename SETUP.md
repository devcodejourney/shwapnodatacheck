# How to Run the Shwapno Data Checker with Phone Saving Feature

## Setup

1. Install Node.js (v14+) if not already installed

2. Install dependencies:
```bash
npm install
```

## Running the Server

Run the Node.js application:
```bash
npm start
```

Or directly:
```bash
node server.js
```

The server will start at `http://localhost:5000`

## Features

- **Search Phone Numbers**: Enter a phone number in the search box
- **Auto-Save Connections**: When search results are found, the name-number connection is automatically saved to `save_number.json`
- **View Saved Connections**: The count of saved connections appears below the search box
- **Download Connections**: Click "Download connections" button to download the saved data as JSON

## API Endpoints

- `POST /api/save-connection` - Save a phone-name connection
- `GET /api/connections` - Get all saved connections
- `GET /api/live` - Get dashboard statistics

## Data Storage

All phone-name connections are saved in `save_number.json` with the following structure:
```json
[
  {
    "phone": "8801725402187",
    "name": "Customer Name",
    "code": "01725402187",
    "mobile": "8801725402187",
    "query": "01725402187",
    "savedAt": "2026-03-29T10:30:45.123456"
  }
]
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Storage**: JSON file (save_number.json)
