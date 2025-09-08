const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const urlRoutes = require('./routes/urlRoutes');  cd..
dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
