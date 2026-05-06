"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-20">
            <div className="max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[10px] text-primary tracking-widest uppercase font-bold mb-6"
                >
                    BUILDING SCALABLE SOLUTIONS SINCE 2022
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[1.1]"
                >
                    THE ART OF <br />
                    <span className="italic">EXECUTION</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-muted-foreground text-sm md:text-base mb-12 max-w-[400px] leading-relaxed"
                >
                    Bridging the gap between conceptual vision and flawless delivery. I am the COO, CTO & Co-Founder at CodedDevs Technology LTD, building AI products, scalable tools, and social commerce platforms like Twizrr.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-wrap gap-4 items-center"
                >
                    <Link href="/projects" className="bg-foreground text-background px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white/90 transition-colors">
                        VIEW PROJECTS
                    </Link>
                    <Link href="/about" className="bg-transparent text-foreground px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors">
                        THE PROCESS
                    </Link>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">SCROLL</span>
                <div className="w-[1px] h-12 bg-muted-foreground/30"></div>
            </motion.div>
        </section>
    );
}
