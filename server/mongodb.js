const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://b23mt1007:<b23mt1007>@cluster0.0ilb9tn.mongodb.net/test?retryWrites=true&w=majority'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
