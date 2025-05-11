const express = require("express");
const router = express.Router({ mergeParams: true });   // *mergeParams: true is used to merge the params from the parent route*
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isloggedIn, isReviewAuthor } = require("../middleware.js") // for Review (joi)
const reviewController = require("../controllers/reviews.js")


// CREATE Review Route
router.post("/", isloggedIn, validateReview, wrapAsync(reviewController.createReview));


// DELETE Review Route
router.delete("/:reviewId", isloggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;