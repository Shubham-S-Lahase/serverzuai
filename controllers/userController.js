const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 900 }); 

exports.sendOtpToEmail = async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const otp = crypto.randomInt(100000, 999999).toString();

    otpCache.set(email, otp);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Change OTP",
      text: `Your OTP to change your password is ${otp}. It will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

exports.verifyOtpAndChangePassword = async (req, res) => {
  const { otp, newPassword, email } = req.body;

  try {
    const storedOtp = otpCache.get(email);
    if (!storedOtp) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = hashedPassword;
    await user.save();

    otpCache.del(email); 

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No profile picture uploaded" });
  }

  const  profilePicture  = req.file ? req.file.path : null;
  const userId = req.user.id;

  console.log("User ID from token: ", userId);
  console.log("Cloudinary Image URL: ", profilePicture);

  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = profilePicture;
    await user.save();

    res
      .status(200)
      .json({
        message: "Profile picture updated successfully",
        profilePicture,
      });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
