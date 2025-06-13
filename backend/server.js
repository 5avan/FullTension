const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define Schema
const optionSchema = new mongoose.Schema({
  id: String,
  text: String
});

const questionSchema = new mongoose.Schema({
  id: String,
  text: String,
  options: [optionSchema],
  allowMultiple: Boolean
});

const paragraphSchema = new mongoose.Schema({
  id: String,
  text: String,
  questions: [questionSchema]
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

// API Routes
app.get('/api/paragraph', async (req, res) => {
  try {
    const paragraph = await Paragraph.findOne();
    res.json(paragraph);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 