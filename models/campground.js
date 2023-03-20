const { func } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");
//https://res.cloudinary.com/dbzhlwgdm/image/upload/v1679282188/KTCamp/smpwl55yp8l0bzjv3oj7.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
