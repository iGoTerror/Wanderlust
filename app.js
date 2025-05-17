if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");




const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const listingRoutes = require("./routes/listings.js");
const reviewRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");

app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const dbUrl = process.env.ATLASdb_URL

main()
    .then(() => console.log('connected to DB'))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
};

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.session_Secret
    },
});

store.on("error", function (e) {
    console.log("Session store error", e);
});

const sessionOptions = {
    store,
    secret: process.env.session_Secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.get('/', (req, res) => {
    res.redirect('/listings');
});


app.use("/", userRoutes);
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);


// Handle all unknown routes
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});



// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).render("includes/error", {
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong"
    });
});




app.listen(8080, () => {
    console.log(`Server is Listening`);

});