//app.js authentfication 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/authRoutes');

const app = express();

// Middleware CORS
const corsOptions = {
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
