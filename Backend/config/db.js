import mongoose from "mongoose"

const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`Mongo DB connected! ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      console.log(`Error : ${error}`.red.underline.bold);
    }
};

export default connectDb