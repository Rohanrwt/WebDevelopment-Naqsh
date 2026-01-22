const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve Static Files (The Frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Basic API Route (Test)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Naqsh Backend is running' });
});

// Fallback: Send index.html for any other route (good for SPAs, though this is currently multi-page)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving static files from: ${path.join(__dirname, '../public')}`);
});
