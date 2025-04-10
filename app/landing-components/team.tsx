"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <section
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
      }}
      className="py-12 md:py-16 lg:py-20 max-w-screen-lg mx-auto"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:gap-8 lg:gap-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-br bg-clip-text text-transparent from-black to-muted-foreground/50 sm:text-4xl md:text-5xl">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground md:text-lg">
              The talented individuals behind our product.
            </p>
          </div>
          <div className="bg-card hover:-translate-y-1 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-cyan-200 border hover:shadow-md">
            <div className="flex flex-col items-center gap-4">
              <Image
                alt="Divi"
                src="/DIVI.png"
                width={500}
                height={500}
                className="rounded-full size-56 object-cover border shadow"
              />
              <div className="text-center space-y-1">
                <h3 className="text-xl font-semibold">Deepak Gupta</h3>
                <p className="text-muted-foreground">@FullStackDeveloper</p>
              </div>
              <div className="flex items-center gap-6 mt-auto">
                <Link
                  href="https://www.github.com/divi-24"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  <GithubIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/deepakgupta249/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  <LinkedinIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

