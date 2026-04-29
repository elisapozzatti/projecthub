import mongoose from "mongoose";

export default mongoose.model(
  "Organization",
  new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
  }),
);
