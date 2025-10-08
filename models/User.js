import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User; // ✅ must have default export
