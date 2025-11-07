import Dealer from "../models/Dealer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER DEALER
export const registerDealer = async (req, res) => {
  try {
    const { dealershipName, dealerName, email, phone, password } = req.body;

    const exist = await Dealer.findOne({ email });
    if (exist) return res.status(400).json({ message: "Dealer already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    await Dealer.create({ dealershipName, dealerName, email, phone, password: hashedPass });

    res.status(201).json({ message: "Dealer Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN DEALER
export const loginDealer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dealer = await Dealer.findOne({ email });
    if (!dealer) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, dealer.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ dealerId: dealer._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET DEALER PROFILE (PROTECTED)
export const getDealerProfile = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.dealerId).select("-password");
    if (!dealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
    res.json(dealer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

