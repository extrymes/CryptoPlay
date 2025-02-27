"use client";

import Footer from "@/components/footer";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) return null;
  return (
    <section className="flex flex-col min-h-screen items-center justify-between py-5">
      <Image
        src={resolvedTheme === "light" ? "/logo-black.png" : "/logo-white.png"}
        alt="Logo"
        width={250}
        height={250}
        priority
      />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
