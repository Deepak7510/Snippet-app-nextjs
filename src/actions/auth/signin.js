"use server";
import { default as connectDB } from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
const signinUserAction = async (formData) => {
  await connectDB();
  try {
    const { email, password } = formData;
    if (!email || !password) {
      return {
        success: false,
        message: "All feilds are required.",
      };
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, "DEFAULT_SECRET", {
      expiresIn: "1d",
    });
    const getCookie = await cookies();
    getCookie.set("token", token);

    return {
      success: true,
      message: "User sigin successfully.",
      token,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng.",
    };
  }
};

export default signinUserAction;
