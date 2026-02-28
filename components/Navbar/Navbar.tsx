"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";


export function FullNavbar() {
 
  return (
    <div className="relative bg-neutral-950 w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className="fixed  top-4 sm:top-6 md:top-8 lg:top-10 inset-x-0 w-[95%] sm:w-[90%] md:w-[85%] lg:max-w-2xl mx-auto z-50"
    >
      <Menu setActive={setActive}>
          <Link className="text-white" href="/">
        Home
        </Link>
        <Link className="text-white" href="/services">
        Services
        </Link>
        <Link className="text-white" href ="/aboutus">
      About
        </Link>
        <Link href="/products" className="text-white">
        Products
      
        </Link>
          <Link href="/tooling" className="text-white">
        Tools
      
        </Link>
      </Menu>
    </div>
  );
}
