"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const signupUserAction = async (formData) => {
  await connectDB();
  try {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return {
        success: false,
        message: "All feilds are required.",
      };
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "This email already signup.",
      };
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    return {
      success: true,
      message: "User Signup successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng.",
    };
  }
};

export default signupUserAction;
