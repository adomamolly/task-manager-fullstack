const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('✅ Task Service is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Task Service running on port ${PORT}`));

const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);
