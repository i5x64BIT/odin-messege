import mongoose from "mongoose";

const connectToTB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB connection opened", Date.now());
    return mongoose;
  } catch (e) {
    console.log(e);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("DB connection closed", Date.now());
  } catch (e) {
    console.log(e);
  }
};

export { connectToTB, closeDB };
