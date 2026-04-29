import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superuser", "userdipendente"], required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  organizationName: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
