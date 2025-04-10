"use client";
import Blobby from "@/app/components/ui/blobby";
import ShimmerButton from "@/components/ui/shimmerButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SparklesText from "@/components/ui/sparklestxt";

const Banner = () => {
  return (
    <main>
      <div className="px-6 lg:px-8">
        <Blobby className="bg-purple-500/60 top-12 left-10" />
        <Blobby className="bg-yellow-300/60 h-32  bottom-20 left-40" />
        <Blobby className="bg-green-400/60 top-12 right-10" />
        <Blobby className="bg-cyan-500/60 bottom-3 right-52" />
        <div className="mx-auto max-w-7xl pt-14 sm:pt-16 pb-20 banner-image">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -4 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight max-w-4xl mx-auto text-navyblue sm:text-5xl lg:text-7xl md:4px">
                Power Your Interviews with{" "}
                <span>
                  <SparklesText text="Thrive" />{" "}
                </span>
                AI
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.5 }}
            >
              <p className="mt-6 text-lg max-w-prose text-center mx-auto leading-8 text-bluegray">
                Don&apos;t be afraid! You can ace that interview! You can crack
                the job! we got you covered. Be Smarter! Be Thrive, Use{" "}
                <span className="text-primary font-bold">Thrive</span>!
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-5">
            <ShimmerButton>
              <Link href="/sign-in">Get Started</Link>
            </ShimmerButton>
          </div>

          <Image
            src={"/assets/banner/dashboard.png"}
            alt="banner-image"
            className="mt-10 rounded-2xl z-10 border border-cyan-800/20 shadow-xl md:shadow-2xl"
            width={1200}
            height={598}
          />
        </div>
      </div>
    </main>
  );
};

export default Banner;
