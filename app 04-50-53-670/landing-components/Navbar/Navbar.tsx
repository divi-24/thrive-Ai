"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, ExternalLink } from "lucide-react";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [externalLink] = useState("https://thrive-swart.vercel.app/");

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleExternalLink = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
    }
  };

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Services",
      path: "#services",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Reviews",
      path: "#reviews",
    },
    {
      title: "Contact",
      path: "#contact",
    },
  ];
  return (
    <>
      <header className="sticky w-full top-0 z-[99] bg-background/40 backdrop-blur-md border-b">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                className="flex items-center justify-center gap-2 font-semibold text-primary"
                href="/"
              >
                <span className="text-xl">Thrive</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className=" space-x-6">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        className="transition text-foreground hover:text-foreground/75"
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <SignedIn>
                <Button size="lg" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <div className="hidden sm:flex">
                    <Button size="lg" asChild variant="secondary">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SignedOut>

              <Button
                variant="outline"
                size="icon"
                className="md:hidden flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                onClick={handleExternalLink}
                aria-label="Open Thrive website in new tab"
                title="Open Thrive website"
              >
                <ExternalLink size={20} className="animate-pulse" />
                <span className="sr-only">Thrive</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleExternalLink}
                className="hidden md:flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                aria-label="Open Thrive website in new tab"
                title="Open Thrive website"
              >
                <ExternalLink size={20} className="animate-pulse" />
                Thrive
              </Button>

              <div className="block md:hidden">
                <Button
                  variant={"ghost"}
                  title="menu"
                  onClick={handleMenuOpen}
                  className="p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  <MenuIcon size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className="md:hidden sm:block fixed bg-background z-50 w-full h-fit flex flex-col items-center justify-start text-center gap-7 pt-5 pb-5 border-b-2 border-gray-500 top-[4rem]"
          style={{ boxShadow: "inset 0 -10px 10px -10px #7b7575b3" }}
        >
          {links.map((link, index) => (
            <NavLink item={link} key={index} handleMenuOpen={handleMenuOpen} />
          ))}
          <Button
            variant="outline"
            className="flex items-center gap-2 min-w-[100px] transition-all duration-300 hover:bg-secondary"
            onClick={() => {
              handleExternalLink();
              handleMenuOpen();
            }}
            aria-label="Open Thrive website in new tab"
            title="Open Thrive website"
          >
            <ExternalLink size={20} />
            Thrive
          </Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
