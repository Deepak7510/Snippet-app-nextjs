"use server";
import connectDB from "@/config/database";
import { default as Snippet } from "@/models/snippet";
import { revalidatePath } from "next/cache";

async function deleteSnippetAction(getId, path) {
  connectDB();
  try {
    if (!getId) {
      return {
        success: false,
        message: "Snippet Id is required.",
      };
    }
    await Snippet.findByIdAndDelete(getId);
    revalidatePath(path);
    return {
      success: true,
      message: "Snippet delete successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng.",
    };
  }
}

export default deleteSnippetAction;
