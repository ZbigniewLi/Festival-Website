const cors = require('cors');
const express = require('express');
const path = require('path');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api', testimonialsRoutes); // add post routes to server
app.use('/api', concertsRoutes); // add post routes to server
app.use('/api', seatsRoutes); // add post routes to server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



app.use('*', (req,res) => {res.status(404).json({message:'not found'})})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});