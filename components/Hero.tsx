"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Hero() {
    return (
        <section className="relative">
            <BackgroundPaths title="Junior Full-Stack Developer" />
            <div className="absolute inset-x-0 bottom-24 flex flex-col items-center justify-center z-20">
                <p className="text-gray-400 text-lg mb-8 max-w-2xl text-center px-4">
                    1.5 years of experience building scalable web applications and crafting exceptional user experiences. Passionate about learning, growth, and writing clean, efficient code.
                </p>
                <div className="flex gap-8 items-center border-t border-white/10 pt-8 w-full max-w-xl justify-center">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">10+</h3>
                        <p className="text-sm text-gray-500">Live Projects</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">1.5</h3>
                        <p className="text-sm text-gray-500">Years Exp.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
