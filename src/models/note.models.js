import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    content: { type: String, required: true },

    html_content: { type: String },

    grammar_errors: { type: String },
  },
  { timestamps: true },
);

export default ("Note", noteSchema);
