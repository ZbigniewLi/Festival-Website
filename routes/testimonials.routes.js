const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;
    const testimonial = db.testimonials.find(item => item.id === id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});



router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const newTestimonial = { id: uuidv4(), author, text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    const id = req.params.id;
    const { author, text } = req.body;
    const testimonialIndex = db.testimonials.findIndex(item => item.id === id);
    if (testimonialIndex !== -1) {
        db.testimonials[testimonialIndex].author = author;
        db.testimonials[testimonialIndex].text = text;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;
    const testimonialIndex = db.testimonials.findIndex(item => item.id === id);
    if (testimonialIndex !== -1) {
        db.testimonials.splice(testimonialIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});


module.exports = router;