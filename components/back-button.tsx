"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function BackButton({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Button variant="ghost" className="mr-2" onClick={() => router.back()}>
      <ArrowLeft className="h-5 w-5" />
      <h1 className="text-3xl font-extrabold">{title}</h1>
    </Button>
  );
}
