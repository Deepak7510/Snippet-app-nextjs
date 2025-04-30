"use server";

import { cookies } from "next/headers";

const logoutUserAction = async () => {
  try {
    const getCookies = await cookies();
    getCookies.set("token", "");
    return {
      success: true,
      message: "User logout successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went worng",
    };
  }
};

export default logoutUserAction;
