const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/kt-camp", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "640bf2c3d8bd8ae8e9ffdf8c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dbzhlwgdm/image/upload/v1679734509/KTCamp/joshua-sukoff-ylKyLmqKZLc-unsplash_bvztak.jpg",
          filename: "KTCamp/beach-boat",
        },
        {
          url: "https://res.cloudinary.com/dbzhlwgdm/image/upload/v1679734092/KTCamp/alfred-boivin-XoM0eYSXWMs-unsplash_hkutqt.jpg",
          filename: "KTCamp/gq7slx9scyo3q87tixpi",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, repellendus quae corporis vitae commodi aliquid. Quis aspernatur sint rem incidunt",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
