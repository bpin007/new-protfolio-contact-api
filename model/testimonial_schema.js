const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    generated_code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    relationship: {
        type: String,
        required: true
    },
    testimonial: {
        type: String,
        required: true
    },
    position: { type: String },
    companyName: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    location: { type: String },
    date: {
        type: Date,
        default: Date.now
    },
    photo: { type: String }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;