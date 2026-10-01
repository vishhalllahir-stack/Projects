import User from "../models/User.js";
import Item from "../models/Item.js";
import Booking from "../models/Booking.js";
import Bill from "../models/Bill.js";

/* =====================================================
   GET ADMIN STATS
===================================================== */

export const getAdminStats = async (req, res) => {
  try {
    // =========================
    // BASIC COUNTS
    // =========================

    const [
      totalUsers,
      totalItems,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    ] = await Promise.all([
      User.countDocuments({
        role: "user",
      }),

      Item.countDocuments(),

      Booking.countDocuments(),

      Booking.countDocuments({
        status: "pending",
      }),

      Booking.countDocuments({
        status: "confirmed",
      }),

      Booking.countDocuments({
        status: "completed",
      }),

      Booking.countDocuments({
        status: "cancelled",
      }),
    ]);

    // =========================
    // TOTAL RENTAL INCOME
    // =========================

    const incomeResult =
      await Booking.aggregate([
        {
          $match: {
            status: {
              $in: [
                "confirmed",
                "completed",
              ],
            },
          },
        },

        {
          $group: {
            _id: null,

            totalIncome: {
              $sum: {
                $ifNull: [
                  "$totalAmount",
                  0,
                ],
              },
            },
          },
        },
      ]);

    const totalIncome =
      incomeResult.length > 0
        ? Number(
            incomeResult[0].totalIncome || 0
          )
        : 0;

    // =========================
    // RECENT BOOKINGS
    // =========================

    const recentBookings =
      await Booking.find()
        .populate(
          "userId",
          "name email mobile village"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();

    // =========================
    // RECENT USERS
    // =========================

    const recentUsers =
      await User.find({
        role: "user",
      })
        .select(
          "name email mobile village createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      users: {
        total: totalUsers,
      },

      items: {
        total: totalItems,
      },

      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      },

      income: {
        total: totalIncome,
      },

      recentBookings,
      recentUsers,
    });
  } catch (error) {
    console.error(
      "Admin Stats Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load admin stats",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};


/* =====================================================
   GET ALL USERS
===================================================== */

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find()
        .select(
          "name email mobile village role createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    res.status(200).json(users);
  } catch (error) {
    console.error(
      "Get All Users Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load users",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};


/* =====================================================
   GET ALL BILLS - ADMIN
===================================================== */

export const getAllBills = async (
  req,
  res
) => {
  try {
    const bills =
      await Bill.find()
        .populate(
          "userId",
          "name email mobile village"
        )
        .sort({
          generatedAt: -1,
        })
        .lean();

    res.status(200).json(bills);
  } catch (error) {
    console.error(
      "Get All Bills Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load bills",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};