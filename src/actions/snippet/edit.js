"use server";

import connectDB from "@/config/database";
import Snippet from "@/models/snippet";
import { revalidatePath } from "next/cache";

async function editSnippetAction(formData, id, path) {
  connectDB();
  try {
    const { title, description } = formData;
    const snippet = await Snippet.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (snippet) {
      revalidatePath(path);
      return {
        success: true,
        message: "Snippet edited successfully",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng",
    };
  }
}

export default editSnippetAction;
