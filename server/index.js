const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all origins for now (or configure for frontend URL)
app.use(express.json());

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Senior119 Backend is running' });
});

// 2. Save Statistics (Prototype)
// In a real app, this would save to a database (PostgreSQL/MongoDB).
// For now, we just log to console to verify connection.
app.post('/api/diagnosis', (req, res) => {
    const { type, result, answers, timestamp } = req.body;

    console.log("📝 [New Diagnosis Result]");
    console.log(`- Type: ${type}`);
    console.log(`- Result: ${result.canReceive ? 'POSITIVE' : 'NEGATIVE'}`);
    console.log(`- Time: ${timestamp}`);
    console.log("- Answers:", JSON.stringify(answers));

    res.json({ success: true, message: 'Diagnosis saved' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
