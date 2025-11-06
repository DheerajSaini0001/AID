import mongoose from "mongoose";

const dealerSchema = new mongoose.Schema({
  dealershipName: { type: String, required: true },
  dealerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Dealer", dealerSchema);
