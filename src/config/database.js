import mongoose from "mongoose";

async function connectDB() {
  const MONGODB_URI =
    "mongodb+srv://deepakkumaryadav75100:6B7wKaVlnU2Lrz5D@clusterone.akhbv.mongodb.net/snippet-app";

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("Database not connected : ", err);
    });
}

export default connectDB;
