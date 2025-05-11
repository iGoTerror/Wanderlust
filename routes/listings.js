const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn, validateListing, isOwner } = require("../middleware.js")// Middleware for listing (joi)
const listingController = require("../controllers/listings.js");

const multer = require('multer')
const { storage } = require("../cloudConflict.js"); // Cloudinary Storage
const upload = multer({ storage }); // Multer Storage

router.route("/")
    .get(wrapAsync(listingController.index)) // Index Route
    .post(isloggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); // Create Route

//New Route
router.get("/new", isloggedIn, wrapAsync(listingController.newForm));

// Search Route
router.get("/search", wrapAsync(listingController.search));


router.route("/:id")
    .get(wrapAsync(listingController.show)) // Show Route
    .put(isloggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)) // Update Route
    .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete Route




//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.editForm));





module.exports = router;        