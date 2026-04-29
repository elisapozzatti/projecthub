import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  status: {
    type: String,
    enum: ["in review", "done", "to do"],
    default: "to do",
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  organizationId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Task", TaskSchema);
