import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  organizationId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Project", ProjectSchema);
