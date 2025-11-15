import Image from "next/image";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function Home() {

  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button>Get Started</Button>
    </div>
  );
}
