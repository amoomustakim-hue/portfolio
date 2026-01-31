"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                        Available for freelance projects
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                        Helping Entrepreneurs <br />
                        Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Dreams</span> Into Reality
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                        Full-stack developer & UI/UX specialist crafting high-performance digital products that drive growth and deliver exceptional user experiences.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/projects"
                            className="px-8 py-3.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all hover:scale-105 flex items-center"
                        >
                            View Portfolio <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            href="/resume.pdf" // Placeholder path for resume
                            className="px-8 py-3.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10 flex items-center"
                        >
                            Download CV <Download className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    <div className="mt-12 flex gap-8 items-center border-t border-white/10 pt-8">
                        <div>
                            <h3 className="text-3xl font-bold text-white">40+</h3>
                            <p className="text-sm text-gray-500">Happy Clients</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white">50+</h3>
                            <p className="text-sm text-gray-500">Projects Done</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white">3+</h3>
                            <p className="text-sm text-gray-500">Years Exp.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                        {/* Note: In a real scenario, we would use the user's uploaded image here. 
                 Using a placeholder setup until image is properly moved. */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent mix-blend-overlay z-10" />
                        {/* 
              Ideally we'd use <Image /> but for now we need to ensure the file exists. 
              The user has `uploaded_media_1769867187070.png`. 
              I should move it to public folder in a later step.
            */}
                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-gray-600">
                            [Hero Image Placeholder]
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
