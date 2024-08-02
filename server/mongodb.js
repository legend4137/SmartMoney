const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://b23mt1007:<b23mt1007>@cluster0.0ilb9tn.mongodb.net/test?retryWrites=true&w=majority'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
