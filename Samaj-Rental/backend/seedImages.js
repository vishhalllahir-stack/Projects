import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import Item from "./models/Item.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

if (!UNSPLASH_ACCESS_KEY) {
  console.error("❌ UNSPLASH_ACCESS_KEY is missing in .env");
  process.exit(1);
}

// --------------------------------------------------
// Category wise Unsplash search queries
// --------------------------------------------------

const categoryQueries = {
  "Utensils":
    "stainless steel kitchen utensils glass plate bowl spoon",

  "Vasan":
    "stainless steel kitchen utensils cooking pots",

  "જમવાના વાસણ":
    "steel plate bowl glass spoon dining utensils",

  "રસોઈના વાસણ":
    "stainless steel cooking pots pan pressure cooker kitchen",

  "કાપવા-સમારવાના સાધનો":
    "kitchen knife peeler grater cutting board",

  "રસોઈના ચમચા":
    "kitchen cooking spoons ladle spatula",

  "ગેસ / ચૂલો":
    "gas stove kitchen cooking stove",

  "કિચન ઇલેક્ટ્રોનિક્સ":
    "kitchen appliances mixer blender electric kettle toaster",

  "ડબ્બા અને સ્ટોરેજ":
    "kitchen storage containers jars boxes",

  "રસોડાની સફાઈ":
    "kitchen cleaning sponge scrubber towel",

  "ઘર માટે વધારાની જરૂરી વસ્તુઓ":
    "dining table chairs thermos serving tray kitchen basket",
};

// --------------------------------------------------
// Default query
// --------------------------------------------------

const defaultQuery =
  "kitchen household utensils cooking equipment";

// --------------------------------------------------
// Get images from Unsplash
// --------------------------------------------------

async function searchUnsplash(query) {
  try {
    console.log(`\n🔎 Searching Unsplash: ${query}`);

    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          per_page: 30,
          page: 1,
        },

        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },

        timeout: 15000,
      }
    );

    console.log(
      `✅ Found ${response.data.results.length} images`
    );

    return response.data.results;
  } catch (error) {
    if (error.response) {
      console.error(
        `❌ Unsplash Error ${error.response.status}:`,
        error.response.data
      );
    } else {
      console.error(
        "❌ Request Error:",
        error.message
      );
    }

    return [];
  }
}

// --------------------------------------------------
// Main
// --------------------------------------------------

async function seedImages() {
  try {
    console.log("\n==============================");
    console.log("🖼️  SAMaj Rental Image Seeder");
    console.log("==============================\n");

    console.log("🔌 Connecting MongoDB...");

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Get all items
    const items = await Item.find({});

    console.log(`📦 Total items found: ${items.length}`);

    if (items.length === 0) {
      console.log("⚠️ No items found in database.");
      return;
    }

    // Group items by category
    const groupedItems = {};

    for (const item of items) {
      const category = item.category || "Other";

      if (!groupedItems[category]) {
        groupedItems[category] = [];
      }

      groupedItems[category].push(item);
    }

    console.log(
      `📂 Categories found: ${
        Object.keys(groupedItems).length
      }`
    );

    let totalUpdated = 0;
    let totalSkipped = 0;

    // ------------------------------------------------
    // Process each category
    // ------------------------------------------------

    for (const [category, categoryItems] of Object.entries(
      groupedItems
    )) {
      const query =
        categoryQueries[category] || defaultQuery;

      console.log("\n--------------------------------");
      console.log(`📁 Category: ${category}`);
      console.log(`🔎 Query: ${query}`);
      console.log(
        `📦 Items: ${categoryItems.length}`
      );
      console.log("--------------------------------");

      const photos = await searchUnsplash(query);

      if (!photos.length) {
        console.log(
          `⚠️ No images found for ${category}`
        );

        totalSkipped += categoryItems.length;

        continue;
      }

      // ------------------------------------------------
      // Assign images round-robin
      // ------------------------------------------------

      for (let i = 0; i < categoryItems.length; i++) {
        const item = categoryItems[i];

        const photo = photos[i % photos.length];

        const imageUrl =
          photo?.urls?.regular ||
          photo?.urls?.small ||
          "";

        if (!imageUrl) {
          console.log(
            `⚠️ Skipped: ${item.name}`
          );

          totalSkipped++;

          continue;
        }

        await Item.findByIdAndUpdate(
          item._id,
          {
            image: imageUrl,
          },
          {
            new: true,
          }
        );

        console.log(
          `✅ Updated: ${item.name}`
        );

        totalUpdated++;
      }
    }

    console.log("\n==============================");
    console.log("🎉 IMAGE SEED COMPLETED");
    console.log("==============================");

    console.log(`✅ Updated: ${totalUpdated}`);
    console.log(`⚠️ Skipped: ${totalSkipped}`);
    console.log(`📦 Total: ${items.length}`);

    console.log("==============================\n");
  } catch (error) {
    console.error("\n❌ IMAGE SEED ERROR:");
    console.error(error.message);
  } finally {
    await mongoose.connection.close();

    console.log("🔌 MongoDB connection closed.");
  }
}

seedImages();