import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold">Welcome to Snippet app</h1>
        <Link href={"/snippet"}>
          <Button size={"lg"} className={"w-52"}>
            Get Start
          </Button>
        </Link>
      </div>
    </div>
  );
}
