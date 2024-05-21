const cors = require('cors');
const express = require('express');
const path = require('path');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const socket = require('socket.io');




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New Connection')
});
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes); // add post routes to server
app.use('/api', concertsRoutes); // add post routes to server
app.use('/api', seatsRoutes); // add post routes to server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



app.use('*', (req,res) => {res.status(404).json({message:'not found'})})


