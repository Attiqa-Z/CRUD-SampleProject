const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type:String,
required:true,
},
  description: String,
  image: {
    filename: { type: String },
    url: {
      type: String,
      default: "https://unsplash.com/photos/a-coconut-tree-is-full-of-green-coconuts-30pbE4rxKUc",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-coconut-tree-is-full-of-green-coconuts-30pbE4rxKUc"
          : v,
    },
  },  
  price: Number,
  location: String,
  Country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;