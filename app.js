const express = require("express");
const app = express();
const Listing = require("./models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

app.get("/", (req, res) => {
  res.send("Hi I am Attiqa");
});

const MONGO_URL = "mongodb://127.0.0.1:27017/firsttry";

main()
  .then(() => {
    console.log("connected to the DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//index route

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send("Listing not found");
    res.render("listings/show", { listing });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// app.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  console.log(req.body);
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // If the image input is empty, keep the old image
  if (!req.body.listing.image) {
    req.body.listing.image = listing.image;
  }

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings`);
  console.log(req.body);
});

// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect("/listings");
// });

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  res.redirect("/listings");
});

// app.get("/testlisting", async (req,res)=>{
// let samplelisting=new Listing({
//   title:"My home",
//   description:"This is my home",
//   image:"string",
//   price:12000,
//   location:"Karachi",
//   country:"Pakistan",
// });
//  await samplelisting.save();
//  console.log("sample is listed");
//  res.send("success")
// })

app.listen(8000, () => {
  console.log("server is running on the port:8000");
});
