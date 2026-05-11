import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      unique: true,
      minlength: 7,
      required: true,
      trime: true,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("pasword")) return;
  this.password = await bcrypt.hash(this.password, 11);
});
export default mongoose.model("User", userSchema);
