import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./models/user.model.js";
import Package from "./models/package.model.js";
import Booking from "./models/booking.model.js";
import RatingReview from "./models/ratings_reviews.model.js";

const TEST_PASSWORD = "password123";

const users = [
  {
    username: "Admin User",
    email: "admin@example.com",
    address: "123 Admin Street, Mumbai",
    phone: "9876543210",
    user_role: 1,
  },
  {
    username: "John Doe",
    email: "john@example.com",
    address: "45 Lake Road, Bangalore",
    phone: "9123456780",
    user_role: 0,
  },
  {
    username: "Jane Smith",
    email: "jane@example.com",
    address: "78 Park Avenue, Delhi",
    phone: "9988776655",
    user_role: 0,
  },
];

const packages = [
  {
    packageName: "Bali Beach Escape",
    packageDescription:
      "Relax on pristine beaches, explore rice terraces, and enjoy Balinese culture with guided temple visits.",
    packageDestination: "Bali, Indonesia",
    packageDays: 6,
    packageNights: 5,
    packageAccommodation: "4-star beach resort with breakfast",
    packageTransportation: "Airport transfers and private day tours",
    packageMeals: "Daily breakfast and 3 dinners",
    packageActivities: "Snorkeling, Ubud tour, temple visit",
    packagePrice: 899,
    packageDiscountPrice: 749,
    packageOffer: true,
    packageImages: [
      "https://picsum.photos/seed/bali1/800/600",
      "https://picsum.photos/seed/bali2/800/600",
    ],
  },
  {
    packageName: "Paris City Lights",
    packageDescription:
      "Discover the Eiffel Tower, Louvre Museum, and charming Parisian cafes on this classic European getaway.",
    packageDestination: "Paris, France",
    packageDays: 5,
    packageNights: 4,
    packageAccommodation: "Boutique hotel near city center",
    packageTransportation: "Metro pass and airport shuttle",
    packageMeals: "Daily breakfast",
    packageActivities: "Eiffel Tower, Seine cruise, Montmartre walk",
    packagePrice: 1299,
    packageDiscountPrice: 1199,
    packageOffer: false,
    packageImages: [
      "https://picsum.photos/seed/paris1/800/600",
      "https://picsum.photos/seed/paris2/800/600",
    ],
  },
  {
    packageName: "Tokyo Adventure",
    packageDescription:
      "Experience neon-lit streets, sushi markets, and ancient shrines in Japan's vibrant capital.",
    packageDestination: "Tokyo, Japan",
    packageDays: 7,
    packageNights: 6,
    packageAccommodation: "Modern hotel in Shinjuku",
    packageTransportation: "JR Pass and airport express",
    packageMeals: "Breakfast and 2 traditional dinners",
    packageActivities: "Shibuya, Senso-ji Temple, day trip to Mt. Fuji",
    packagePrice: 1599,
    packageDiscountPrice: 1449,
    packageOffer: true,
    packageImages: [
      "https://picsum.photos/seed/tokyo1/800/600",
      "https://picsum.photos/seed/tokyo2/800/600",
    ],
  },
  {
    packageName: "Swiss Alps Trek",
    packageDescription:
      "Hike scenic alpine trails, ride cable cars, and stay in cozy mountain lodges.",
    packageDestination: "Interlaken, Switzerland",
    packageDays: 4,
    packageNights: 3,
    packageAccommodation: "Mountain lodge with valley views",
    packageTransportation: "Train transfers and cable car passes",
    packageMeals: "Half board (breakfast and dinner)",
    packageActivities: "Jungfrau excursion, lake cruise, guided hikes",
    packagePrice: 1099,
    packageDiscountPrice: 999,
    packageOffer: false,
    packageImages: [
      "https://picsum.photos/seed/swiss1/800/600",
      "https://picsum.photos/seed/swiss2/800/600",
    ],
  },
  {
    packageName: "Dubai Luxury Getaway",
    packageDescription:
      "Luxury shopping, desert safari, and iconic skyline views in the UAE.",
    packageDestination: "Dubai, UAE",
    packageDays: 5,
    packageNights: 4,
    packageAccommodation: "5-star hotel with Burj Khalifa views",
    packageTransportation: "Private airport transfers",
    packageMeals: "Breakfast and desert BBQ dinner",
    packageActivities: "Desert safari, Burj Khalifa, Marina cruise",
    packagePrice: 1799,
    packageDiscountPrice: 1499,
    packageOffer: true,
    packageImages: [
      "https://picsum.photos/seed/dubai1/800/600",
      "https://picsum.photos/seed/dubai2/800/600",
    ],
  },
  {
    packageName: "Goa Weekend Retreat",
    packageDescription:
      "Sun, sand, and seafood on India's favorite beach destination.",
    packageDestination: "Goa, India",
    packageDays: 3,
    packageNights: 2,
    packageAccommodation: "Beachside resort",
    packageTransportation: "Airport pickup and scooter rental",
    packageMeals: "Breakfast only",
    packageActivities: "Beach hopping, water sports, spice plantation tour",
    packagePrice: 299,
    packageDiscountPrice: 249,
    packageOffer: true,
    packageImages: [
      "https://picsum.photos/seed/goa1/800/600",
      "https://picsum.photos/seed/goa2/800/600",
    ],
  },
  {
    packageName: "Kerala Backwaters Cruise",
    packageDescription:
      "Cruise through tranquil backwaters on a traditional houseboat.",
    packageDestination: "Alleppey, India",
    packageDays: 4,
    packageNights: 3,
    packageAccommodation: "Houseboat and heritage homestay",
    packageTransportation: "AC cab transfers",
    packageMeals: "All meals on houseboat",
    packageActivities: "Backwater cruise, Ayurveda spa, village walk",
    packagePrice: 499,
    packageDiscountPrice: 449,
    packageOffer: false,
    packageImages: [
      "https://picsum.photos/seed/kerala1/800/600",
      "https://picsum.photos/seed/kerala2/800/600",
    ],
  },
  {
    packageName: "New York Explorer",
    packageDescription:
      "See Times Square, Central Park, Broadway, and the Statue of Liberty.",
    packageDestination: "New York, USA",
    packageDays: 6,
    packageNights: 5,
    packageAccommodation: "Midtown Manhattan hotel",
    packageTransportation: "Subway pass and airport transfers",
    packageMeals: "Daily breakfast",
    packageActivities: "Statue of Liberty, Broadway show, Brooklyn Bridge",
    packagePrice: 1899,
    packageDiscountPrice: 1699,
    packageOffer: false,
    packageImages: [
      "https://picsum.photos/seed/nyc1/800/600",
      "https://picsum.photos/seed/nyc2/800/600",
    ],
  },
];

const reviews = [
  { packageIndex: 0, userIndex: 1, rating: 5, review: "Amazing beaches and great resort!" },
  { packageIndex: 0, userIndex: 2, rating: 4, review: "Loved the Ubud tour, very well organized." },
  { packageIndex: 1, userIndex: 1, rating: 5, review: "Paris was magical. Highly recommend." },
  { packageIndex: 1, userIndex: 2, rating: 5, review: "Perfect honeymoon trip!" },
  { packageIndex: 2, userIndex: 1, rating: 4, review: "Tokyo is incredible. Mt. Fuji day trip was a highlight." },
  { packageIndex: 3, userIndex: 2, rating: 4, review: "Stunning views and great hiking trails." },
  { packageIndex: 4, userIndex: 1, rating: 5, review: "Desert safari was unforgettable!" },
  { packageIndex: 5, userIndex: 2, rating: 3, review: "Good value for money, beaches were crowded." },
  { packageIndex: 6, userIndex: 1, rating: 5, review: "Houseboat experience was so peaceful." },
  { packageIndex: 7, userIndex: 2, rating: 4, review: "NYC has so much to see, packed itinerary." },
];

const futureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

const pastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const updatePackageRatings = async (packageId) => {
  const ratings = await RatingReview.find({ packageId: packageId.toString() });
  const totalRatings = ratings.length;
  const totalStars = ratings.reduce((sum, r) => sum + r.rating, 0);
  const packageRating =
    totalRatings > 0 ? Math.round((totalStars / totalRatings) * 10) / 10 : 0;

  await Package.findByIdAndUpdate(packageId, {
    packageRating,
    packageTotalRatings: totalRatings,
  });
};

const seed = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");

  await Promise.all([
    Booking.deleteMany({}),
    RatingReview.deleteMany({}),
    Package.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  const hashedPassword = bcryptjs.hashSync(TEST_PASSWORD, 10);
  const createdUsers = await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword }))
  );

  const createdPackages = await Package.insertMany(packages);

  for (const item of reviews) {
    const user = createdUsers[item.userIndex];
    const pack = createdPackages[item.packageIndex];

    await RatingReview.create({
      rating: item.rating,
      review: item.review,
      packageId: pack._id.toString(),
      userRef: user._id.toString(),
      username: user.username,
      userProfileImg: user.avatar,
    });
  }

  for (const pack of createdPackages) {
    await updatePackageRatings(pack._id);
  }

  const bookings = [
    {
      packageDetails: createdPackages[0]._id,
      buyer: createdUsers[1]._id,
      totalPrice: 749 * 2,
      persons: 2,
      date: futureDate(30),
      status: "Booked",
    },
    {
      packageDetails: createdPackages[1]._id,
      buyer: createdUsers[2]._id,
      totalPrice: 1199,
      persons: 1,
      date: futureDate(45),
      status: "Booked",
    },
    {
      packageDetails: createdPackages[4]._id,
      buyer: createdUsers[1]._id,
      totalPrice: 1499 * 3,
      persons: 3,
      date: futureDate(60),
      status: "Booked",
    },
    {
      packageDetails: createdPackages[5]._id,
      buyer: createdUsers[2]._id,
      totalPrice: 249 * 2,
      persons: 2,
      date: pastDate(14),
      status: "Completed",
    },
    {
      packageDetails: createdPackages[6]._id,
      buyer: createdUsers[1]._id,
      totalPrice: 449,
      persons: 1,
      date: pastDate(30),
      status: "Completed",
    },
  ];

  await Booking.insertMany(bookings);

  console.log("\nSeed complete!\n");
  console.log("Test accounts (password for all: password123):");
  console.log("  Admin  -> admin@example.com");
  console.log("  User   -> john@example.com");
  console.log("  User   -> jane@example.com");
  console.log(`\nCreated ${createdPackages.length} packages, ${reviews.length} reviews, ${bookings.length} bookings`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
