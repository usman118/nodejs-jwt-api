import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { collection: "users" }
);

export default mongoose.model("users", userSchema);

// module.exports = userSchema;
