const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    url: {
      type: String,
      required: true,
      default: "https://unsplash.com/photos/a-coconut-tree-is-full-of-green-coconuts-30pbE4rxKUc",
      set: (v) => v === "" ? "https://unsplash.com/photos/a-coconut-tree-is-full-of-green-coconuts-30pbE4rxKUc" : v
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;