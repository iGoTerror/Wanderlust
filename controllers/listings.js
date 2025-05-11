const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({})
    // console.log(allListings);
    res.render("./listings/index.ejs", { allListings, showSearchBar: true });
};

module.exports.newForm = async (req, res) => {
    res.render("./listings/new.ejs")
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing })
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // Add this block to set geometry
    const { latitude, longitude } = req.body.listing;
    newListing.geometry = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
    };

    await newListing.save();
    req.flash("success", "Listing created");
    res.redirect("/listings");
};


module.exports.editForm = async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing })
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updatedData = req.body.listing;

    const { latitude, longitude } = req.body.listing;
    if (latitude && longitude) {
        updatedData.geometry = {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        };
    }

    let listing = await Listing.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true
    });

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }



    await listing.save();

    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");

};
module.exports.search = async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
        return res.redirect("/listings");
    }

    const allListings = await Listing.find({
        title: { $regex: q, $options: 'i' } // Case-insensitive search
    });

    res.render('listings/index', {
        allListings,
        q,
        showSearchBar: true
    });
};

