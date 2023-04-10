const { func } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");
//https://res.cloudinary.com/dbzhlwgdm/image/upload/v1679282188/KTCamp/smpwl55yp8l0bzjv3oj7.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CampgroundSchema.virtual("properties.id").get(function () {
  return this._id;
});
CampgroundSchema.virtual("properties.title").get(function () {
  return this.title;
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
