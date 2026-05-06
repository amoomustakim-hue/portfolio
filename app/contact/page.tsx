"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="max-w-3xl mb-32 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[10px] text-primary tracking-widest uppercase font-bold mb-6"
                >
                    AVAILABLE FOR INQUIRIES
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.1]"
                >
                    LET'S BUILD <br />
                    SOMETHING <br />
                    EXTRAORDINARY
                </motion.h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
                
                {/* Left Side: Image and Details */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-16"
                >
                    <div className="aspect-[3/4] relative w-full max-w-md bg-zinc-900 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/profile.png"
                            alt="Mustakheem"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-12 max-w-md">
                        <div>
                            <h3 className="text-[10px] tracking-widest text-muted-foreground uppercase mb-6">SOCIAL CHANNELS</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-between group border-b border-white/10 pb-4">
                                        <span className="text-sm">LinkedIn</span>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/coded-devs" target="_blank" rel="noreferrer" className="flex items-center justify-between group border-b border-white/10 pb-4">
                                        <span className="text-sm">GitHub</span>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between group border-b border-white/10 pb-4">
                                        <span className="text-sm">Instagram</span>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[10px] tracking-widest text-muted-foreground uppercase mb-6">STUDIO LOCATION</h3>
                            <div className="text-sm text-white/80 space-y-2">
                                <p>Lagos — Global Operations</p>
                                <p>Remote Selective Projects</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:pl-12 pt-8 lg:pt-0"
                >
                    <form className="space-y-12">
                        <div className="space-y-2">
                            <label className="text-[10px] tracking-widest text-muted-foreground uppercase block">FULL NAME</label>
                            <input 
                                type="text" 
                                placeholder="John Doe"
                                className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-white transition-colors rounded-none px-0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] tracking-widest text-muted-foreground uppercase block">SERVICE OF INTEREST</label>
                            <input 
                                type="text" 
                                placeholder="Technical Architecture / Full Stack Development"
                                className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-white transition-colors rounded-none px-0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] tracking-widest text-muted-foreground uppercase block">PROJECT BRIEF</label>
                            <textarea 
                                rows={6}
                                placeholder="Tell us about your vision..."
                                className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-white transition-colors resize-none rounded-none px-0"
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-6 pt-8">
                            <span className="text-[10px] tracking-widest uppercase font-bold">SEND INQUIRY</span>
                            <div className="w-8 h-[1px] bg-primary"></div>
                            <button type="submit" className="bg-white text-black px-6 py-2 text-[10px] tracking-widest uppercase font-bold hover:bg-white/90 transition-colors">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </div>
    );
}
