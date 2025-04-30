"use server";
import connectDB from "@/config/database";
import { default as Snippet } from "@/models/snippet";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const fetchSnippetAction = async () => {
  connectDB();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value;

    const decoded = jwt.verify(token, "DEFAULT_SECRET");
    const userId = decoded.id;

    const snippetList = await Snippet.find({ userId });
    return {
      success: false,
      message: "Snippet fetching seccussfully.",
      data: JSON.parse(JSON.stringify(snippetList)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng.",
    };
  }
};

export default fetchSnippetAction;
