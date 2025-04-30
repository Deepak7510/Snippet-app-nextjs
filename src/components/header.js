"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "./ui/button";
import logoutUserAction from "@/actions/auth/logout";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";

function Header() {
  const router = useRouter();
  const { token, setToken } = useContext(AuthContext);

  async function handleLogout() {
    const response = await logoutUserAction();
    if (response.success) {
      toast.success(response.message);
      setToken("");
      router.push("/sign-in");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <header className="flex justify-between px-10 py-4 bg-black text-white fixed w-full top-0">
      <h1 className="text-2xl font-extrabold">Snippet App</h1>
      <nav>
        <ul className="flex items-center gap-4 text-md font-medium">
          {token ? (
            <>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/snippet"}>Snippet</Link>
              </li>
              <li>
                <Button
                  onClick={handleLogout}
                  variant={"outline"}
                  className={"text-black"}
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/sign-in"}>Sign In</Link>
              </li>
              <li>
                <Link href={"/sign-up"}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
