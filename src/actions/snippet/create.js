"use server";
import Snippet from "@/models/snippet";

import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const createSnippet = async (formData, path) => {
  await connectDB();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value;
    const { title, description } = formData;
    if (!title || !description) {
      return {
        success: false,
        message: "All feilds are required.",
      };
    }
    const decoded = jwt.verify(token, "DEFAULT_SECRET");
    const userId = decoded.id;

    const snippet = new Snippet({ userId, title, description });
    await snippet.save();
    revalidatePath(path);

    return {
      success: true,
      message: "Snippet Added Successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng.",
    };
  }
};

export default createSnippet;
