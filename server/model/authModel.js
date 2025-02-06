import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyOtt: { type: Number, default: null },
  verifyOttExpireAt: { type: Date, default: null },
  resetOtt: { type: String, default: "" },
  resetOttExpireAt: { type: Date, default: null },
});

const User = mongoose.model('User', authSchema);

export default User;
