const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const id = req.params.id;
    const conserts = db.concerts.find(item => item.id === id);
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'concert not found' });
    }
});

router.route('/concerts').post((req, res) => {
    const { performer, genre , price, day, image } = req.body;
    const newConcert = { id: uuidv4(), performer, genre, price, day, image };
    db.concerts.push(newConcert);
    res.json({ message: 'OK' });
});


router.route('/concerts/:id').put((req, res) => {
    const id = req.params.id;
    const { performer, genre , price, day, image  } = req.body;
    const concertIndex = db.concerts.findIndex(item => item.id === id);
    if (concertIndex !== -1) {
        db.concerts[concertIndex].performer = performer;
        db.concerts[concertIndex].genre = genre;
        db.concerts[concertIndex].price = price;
        db.concerts[concertIndex].day = day;
        db.concerts[concertIndex].image = image;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;
    const concertIndex = db.concerts.findIndex(item => item.id === id);
    if (concertIndex !== -1) {
        db.concerts.splice(concertIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

module.exports = router;