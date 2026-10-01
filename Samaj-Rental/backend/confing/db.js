import mongoose from "mongoose";


/* =====================================================
   MONGODB CONNECTION
===================================================== */

const connectDB = async () => {
  try {

    /* ================================================
       CHECK MONGO URI
    ================================================= */

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not configured in .env"
      );
    }


    /* ================================================
       CONNECT TO MONGODB
    ================================================= */

    await mongoose.connect(
      process.env.MONGO_URI
    );


    /* ================================================
       SUCCESS
    ================================================= */

    console.log(
      "MongoDB Connected Successfully"
    );

  } catch (error) {

    /* ================================================
       CONNECTION ERROR
    ================================================= */

    console.error(
      "MongoDB Connection Failed:",
      error.message
    );

    process.exit(1);
  }
};


export default connectDB;