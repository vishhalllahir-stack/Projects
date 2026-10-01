import Item from "../models/Item.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/* =====================================================
   GET DATE-WISE ITEM AVAILABILITY
   GET /items/:id/availability
===================================================== */

export const getItemAvailability = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      bookingDate,
      returnDate,
    } = req.query;

    /* ================================================
       ITEM ID VALIDATION
    ================================================= */

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        message:
          "Invalid item ID",
      });
    }

    /* ================================================
       DATE REQUIRED
    ================================================= */

    if (
      !bookingDate ||
      !returnDate
    ) {
      return res.status(400).json({
        message:
          "bookingDate and returnDate are required",
      });
    }

    /* ================================================
       DATE PARSING
    ================================================= */

    const startDate = new Date(
      `${bookingDate}T00:00:00`
    );

    const endDate = new Date(
      `${returnDate}T00:00:00`
    );

    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      Number.isNaN(
        endDate.getTime()
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid dates",
      });
    }

    /* ================================================
       DATE ORDER
    ================================================= */

    if (
      startDate >= endDate
    ) {
      return res.status(400).json({
        message:
          "Return date must be after booking date",
      });
    }

    /* ================================================
       FIND ITEM
    ================================================= */

    const item =
      await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        message:
          "Item not found",
      });
    }

    /* ================================================
       ITEM AVAILABILITY
    ================================================= */

    if (
      item.isAvailable === false
    ) {
      return res.status(200).json({
        item: {
          id: item._id,
          name: item.name,
          category: item.category,
          pricePerDay:
            item.pricePerDay,
        },

        bookingDate,
        returnDate,

        totalQuantity:
          item.totalQuantity,

        bookedQuantity: 0,

        availableQuantity: 0,

        isAvailable: false,
      });
    }

    /* ================================================
       FIND OVERLAPPING BOOKINGS
    ================================================= */

    const overlappingBookings =
      await Booking.find({
        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },

        bookingDate: {
          $lt: endDate,
        },

        returnDate: {
          $gt: startDate,
        },

        "items.itemId":
          item._id,
      }).lean();

    /* ================================================
       CALCULATE BOOKED QUANTITY
    ================================================= */

    let bookedQuantity = 0;

    for (
      const booking of overlappingBookings
    ) {
      const bookingItems =
        Array.isArray(
          booking.items
        )
          ? booking.items
          : [];

      for (
        const bookingItem of bookingItems
      ) {
        if (
          bookingItem?.itemId &&
          bookingItem.itemId.toString() ===
            item._id.toString()
        ) {
          bookedQuantity +=
            Number(
              bookingItem.quantity ||
                0
            );
        }
      }
    }

    /* ================================================
       AVAILABLE QUANTITY
    ================================================= */

    const totalQuantity =
      Number(
        item.totalQuantity || 0
      );

    const availableQuantity =
      Math.max(
        totalQuantity -
          bookedQuantity,
        0
      );

    /* ================================================
       RESPONSE
    ================================================= */

    res.status(200).json({
      item: {
        id: item._id,
        name: item.name,
        category: item.category,
        pricePerDay:
          item.pricePerDay,
      },

      bookingDate,
      returnDate,

      totalQuantity,

      bookedQuantity,

      availableQuantity,

      isAvailable:
        availableQuantity > 0,
    });
  } catch (error) {
    console.error(
      "Item Availability Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to check item availability",
    });
  }
};


/* =====================================================
   CREATE ITEM - ADMIN
   POST /items
===================================================== */

export const createItem = async (
  req,
  res
) => {
  try {
    const {
      name,
      category,
      description,
      pricePerDay,
      totalQuantity,
      image,
      isAvailable,
    } = req.body;

    /* ================================================
       REQUIRED FIELDS
    ================================================= */

    if (
      !name ||
      !category ||
      pricePerDay === undefined ||
      totalQuantity === undefined
    ) {
      return res.status(400).json({
        message:
          "Name, category, price and quantity are required",
      });
    }

    const cleanName =
      String(name).trim();

    const cleanCategory =
      String(category).trim();

    const cleanDescription =
      typeof description === "string"
        ? description.trim()
        : "";

    const price =
      Number(pricePerDay);

    const quantity =
      Number(totalQuantity);

    /* ================================================
       VALIDATE PRICE
    ================================================= */

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message:
          "Price must be a valid positive number",
      });
    }

    /* ================================================
       VALIDATE QUANTITY
    ================================================= */

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        message:
          "Total quantity must be a whole number greater than 0",
      });
    }

    /* ================================================
       CREATE ITEM
    ================================================= */

    const item =
      await Item.create({
        name: cleanName,

        category:
          cleanCategory,

        description:
          cleanDescription,

        pricePerDay:
          price,

        totalQuantity:
          quantity,

        availableQuantity:
          quantity,

        image:
          typeof image === "string"
            ? image.trim()
            : "",

        isAvailable:
          isAvailable !== false,
      });

    res.status(201).json({
      message:
        "Item created successfully",

      item,
    });
  } catch (error) {
    console.error(
      "Create Item Error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to create item",
    });
  }
};


/* =====================================================
   GET ALL ITEMS
   GET /items
===================================================== */

export const getItems = async (
  req,
  res
) => {
  try {
    const items =
      await Item.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    res.status(200).json(
      items
    );
  } catch (error) {
    console.error(
      "Get Items Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load items",
    });
  }
};


/* =====================================================
   GET ITEM BY ID
   GET /items/:id
===================================================== */

export const getItemById = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid item ID",
      });
    }

    const item =
      await Item.findById(
        id
      ).lean();

    if (!item) {
      return res.status(404).json({
        message:
          "Item not found",
      });
    }

    res.status(200).json(
      item
    );
  } catch (error) {
    console.error(
      "Get Item Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load item",
    });
  }
};


/* =====================================================
   UPDATE ITEM - ADMIN
   PUT /items/:id
===================================================== */

export const updateItem = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    /* ================================================
       ID VALIDATION
    ================================================= */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid item ID",
      });
    }

    /* ================================================
       FIND EXISTING ITEM
    ================================================= */

    const existingItem =
      await Item.findById(id);

    if (!existingItem) {
      return res.status(404).json({
        message:
          "Item not found",
      });
    }

    const {
      name,
      category,
      description,
      pricePerDay,
      totalQuantity,
      image,
      isAvailable,
    } = req.body;

    /* ================================================
       PREPARE UPDATED VALUES
    ================================================= */

    const updatedName =
      name !== undefined
        ? String(name).trim()
        : existingItem.name;

    const updatedCategory =
      category !== undefined
        ? String(category).trim()
        : existingItem.category;

    const updatedDescription =
      description !== undefined
        ? String(description).trim()
        : existingItem.description;

    const updatedPrice =
      pricePerDay !== undefined
        ? Number(pricePerDay)
        : existingItem.pricePerDay;

    const updatedTotalQuantity =
      totalQuantity !== undefined
        ? Number(totalQuantity)
        : existingItem.totalQuantity;

    const updatedImage =
      image !== undefined
        ? String(image).trim()
        : existingItem.image;

    const updatedIsAvailable =
      isAvailable !== undefined
        ? Boolean(isAvailable)
        : existingItem.isAvailable;

    /* ================================================
       PRICE VALIDATION
    ================================================= */

    if (
      !Number.isFinite(
        updatedPrice
      ) ||
      updatedPrice < 0
    ) {
      return res.status(400).json({
        message:
          "Price must be a valid number greater than or equal to 0",
      });
    }

    /* ================================================
       QUANTITY VALIDATION
    ================================================= */

    if (
      !Number.isInteger(
        updatedTotalQuantity
      ) ||
      updatedTotalQuantity < 1
    ) {
      return res.status(400).json({
        message:
          "Total quantity must be a whole number greater than 0",
      });
    }

    /* ================================================
       FIND CURRENT ACTIVE BOOKINGS
       This prevents stock from becoming invalid
       when admin decreases total quantity.
    ================================================= */

    const activeBookings =
      await Booking.find({
        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },

        "items.itemId":
          existingItem._id,
      }).lean();

    let alreadyBookedQuantity = 0;

    for (
      const booking of activeBookings
    ) {
      const bookingItems =
        Array.isArray(
          booking.items
        )
          ? booking.items
          : [];

      for (
        const bookingItem of bookingItems
      ) {
        if (
          bookingItem?.itemId &&
          bookingItem.itemId.toString() ===
            existingItem._id.toString()
        ) {
          alreadyBookedQuantity +=
            Number(
              bookingItem.quantity ||
                0
            );
        }
      }
    }

    /* ================================================
       AVAILABLE QUANTITY
    ================================================= */

    const newAvailableQuantity =
      Math.max(
        updatedTotalQuantity -
          alreadyBookedQuantity,
        0
      );

    /* ================================================
       UPDATE
    ================================================= */

    existingItem.name =
      updatedName;

    existingItem.category =
      updatedCategory;

    existingItem.description =
      updatedDescription;

    existingItem.pricePerDay =
      updatedPrice;

    existingItem.totalQuantity =
      updatedTotalQuantity;

    existingItem.availableQuantity =
      newAvailableQuantity;

    existingItem.image =
      updatedImage;

    existingItem.isAvailable =
      updatedIsAvailable;

    await existingItem.save();

    res.status(200).json({
      message:
        "Item updated successfully",

      item:
        existingItem,
    });
  } catch (error) {
    console.error(
      "Update Item Error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to update item",
    });
  }
};


/* =====================================================
   DELETE ITEM - ADMIN
   DELETE /items/:id
===================================================== */

export const deleteItem = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    /* ================================================
       ID VALIDATION
    ================================================= */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid item ID",
      });
    }

    /* ================================================
       CHECK ACTIVE BOOKINGS
    ================================================= */

    const activeBooking =
      await Booking.findOne({
        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },

        "items.itemId":
          id,
      }).lean();

    if (activeBooking) {
      return res.status(400).json({
        message:
          "This item cannot be deleted because it has active bookings",
      });
    }

    /* ================================================
       DELETE
    ================================================= */

    const item =
      await Item.findByIdAndDelete(
        id
      );

    if (!item) {
      return res.status(404).json({
        message:
          "Item not found",
      });
    }

    res.status(200).json({
      message:
        "Item deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Item Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete item",
    });
  }
};