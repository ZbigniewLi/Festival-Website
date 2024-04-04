const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;
    const seats = db.seats.find(item => item.id === id);
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ message: 'seat not found' });
    }
});

router.route('/seats').post((req, res) => {
    const { day, seat, client , email } = req.body;
    const newTestimonial = { id: uuidv4(), day, seat, client, email };
    db.seats.push(newSeat);
    res.json({ message: 'OK' });
});


router.route('/seats/:id').put((req, res) => {
    const id = req.params.id;
    const {  day, seat, client , email  } = req.body;
    const concertIndex = db.concerts.findIndex(item => item.id === id);
    if (concertIndex !== -1) {
        db.seats[seatIndex].day = day;
        db.seats[seatIndex].seat = seat;
        db.seats[seatIndex].client = client;
        db.seats[seatIndex].email = email;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;
    const seatIndex = db.seats.findIndex(item => item.id === id);
    if (seatIndex !== -1) {
        db.seats.splice(seatIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

module.exports = router;