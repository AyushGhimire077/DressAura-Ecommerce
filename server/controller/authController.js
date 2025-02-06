import User from "../model/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import transporter from "../config/nodeMailer.js";

const registerAuth = async (req, res) => {
  const { name, email, password, number } = req.body;

  //check if empty or not
  if (!name || !email || !password || !number) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    //finding existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      number,
      password: hashPassword,
    });

    await newUser.save();

    //welcome mail
    const mailOptions = {
      from: process.env.SENDER_ID,
      to: newUser.email,
      subject: "Welcome to NTG",
      text: `Your account has been successfully created using email id: ${newUser.email}`,
      html: `<h1>Welcome to NTG</h1>
                   <p>Your account has been successfully created using email id <b>${newUser.email}</b></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        return;
      }
      console.log("Message sent:", info.response);
    });

    //generate jwt
const generateToken = jwt.sign(
  {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    number: newUser.number,
    isVerified: newUser.isVerified,
    role: newUser.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "60d" }
);


    res.cookie("token", generateToken, {
      secure: process.env.ENV_STAGE === "production",
      sameSite: process.env.ENV_STAGE === "production" ? "none" : "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 60 * 1000,
    });

    return res.json({ success: true, message: "Register successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

const loginAuth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Both fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // JWT token
const generateToken = jwt.sign(
  {
    id: user._id,
    name: user.name,
    email: user.email,
    number: user.number,
    isVerified: user.isVerified,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: "60d" }
);

    res.cookie("token", generateToken, {
      secure: process.env.ENV_STAGE === "production",
      sameSite: process.env.ENV_STAGE === "production" ? "none" : "lax",
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 60 * 1000,
    });

    //response with token
    return res.json({
      success: true,
      message: "Login successful",
      token: generateToken,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.id;

  if (!oldPassword || !newPassword) {
    return res.json({ success: false, message: "Fields are required" });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({
        success: false,
        message: "Something went worng. Login again",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Please enter correct password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save()

    return res.json({ success: true, message: "Password successfuly changed" });
  } catch (error) {
    return res.json({
      success: false,
      message: "internal server issue",
    });
  }
};

const logoutAuth = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.ENV_STAGE === "production",
      sameSite: process.env.ENV_STAGE === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "logOut succesfully" });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

const verifyOTT = async (req, res) => {
  const { email } = req.body;
  const id = req.id;

  if (!id) {
    return res.json({
      success: false,
      message: "Something went wrong.Please login again",
    });
  }

  if (!email) {
    return res.json({ success: false, message: "Email required" });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (user.isVerified === true) {
      return res.json({ success: false, message: "User is already verified" });
    }
    if (email !== user.email) {
      return res.json({ success: false, message: "Email not found" });
    }

    //genrate verify ott
    const otp = Math.floor(10000 + Math.random() * 900000);

    user.verifyOtt = otp;
    user.verifyOttExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    //send ott to user email
    const mailOptions = {
      from: process.env.SENDER_ID,
      to: user.email,
      subject: "NTG verify accout OTT",
      text: `Verify your NTG account using OTP code : ${otp}. Verifying your email helps us keep your account secure.`,
      html: `<h2>NTG verify accout OTT></h2>
                <p>Verify your NTG account using OTP code : <b>${otp}</b>.Verifying your email helps us keep your account secure.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    return res.json({
      success: true,
      message: "Verify OTT send to your email",
    });
  } catch (error) {
    return res.json({ success: false, message: "internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const id = req.id;

  if (!otp) {
    return res.json({ success: false, message: "OTP required" });
  }
  if (!id) {
    return res.json({
      success: false,
      message: "Something went wrong. Login again",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.json({ success: false, message: "Invalid OTP or user" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "User is already verified" });
    }

    console.log("Received OTP:", otp, "Type:", typeof otp);
    console.log("Stored OTP:", user.verifyOtt, "Type:", typeof user.verifyOtt);

    if (parseInt(otp) !== user.verifyOtt) {
      return res.json({ success: false, message: "Invalid OTP or user" });
    }

    user.isVerified = true;
    user.verifyOtt = null;
    user.verifyOttExpireAt = null;

    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};



const resetOtt = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email required" });
  }

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const otp = Math.floor(10000 + Math.random() * 900000);

    user.resetOtt = otp;
    user.resetOttExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_ID,
      to: email,
      subject: "Password reset OTT",
      html: `<h1>Password reset OTT</h1>,
              <p>You account password reset OTT is : <b>${otp}</b>. You can reset your account password using this OTT.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    return res.json({
      success: true,
      message: "Verify OTT send to your email",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

const resetPasswrod = async (req, res) => {
  const { ott, password } = req.body;

  if (!ott || !password) {
    return res.json({ success: false, message: "Please fill the field" });
  }

  try {
    const user = await User.findOne({ resetOtt: ott });

    if (!user) {
      return res.json({ success: false, message: "Invalid Ott" });
    }

    if (Date.now() > user.resetOttExpireAt) {
      return res.json({ success: false, message: "Ott is epired. Try again" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user.resetOtt = null;
    user.resetOttExpireAt = null;
    user.password = hashedPass;

    await user.save();

    return res.json({
      success: true,
      message: "Password is successfully reset",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
export {
  registerAuth,
  loginAuth,
  changePassword,
  logoutAuth,
  verifyOTT,
  verifyEmail,
  resetOtt,
  resetPasswrod,
};
