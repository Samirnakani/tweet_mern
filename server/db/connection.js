import mongoose from "mongoose";

function connection() {
  mongoose.connect("mongodb://127.0.0.1:27017/shop").then(() => {
    console.log("db conneced");
  });
}
export default connection;
