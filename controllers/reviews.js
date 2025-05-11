const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const newReview = new Review(req.body.review);
    newReview.author = res.locals.currUser._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review created");

    res.redirect(`/listings/${req.params.id}`);

};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Find listing  remove  review
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete review from  database
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted");

    res.redirect(`/listings/${id}`);

};