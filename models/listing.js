const mongoose = require('mongoose');
const Review = require('./review');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, // Ensuring a description is provided
        minlength: 10, // Minimum length of description
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensuring price is non-negative
    },
    location: {
        type: String,
        required: true, // Ensuring a location is provided
    },
    country: {
        type: String,
        required: true, // Ensuring a country is provided
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON format, only 'Point' is allowed
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.index({ geometry: '2dsphere' }); // Ensure geospatial indexing

// Post hook to delete associated reviews when listing is deleted
listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
