"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Layers, Compass } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="max-w-3xl mb-32 pt-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.1]"
                >
                    The architect of <br />
                    <span className="text-primary italic">AI products</span> and <br />
                    digital craft.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed"
                >
                    I am Mustakheem Amoo, a Junior Software Developer and the COO, CTO & Co-Founder of CodedDevs Technology LTD. I believe that true authority doesn't need to shout. It resides in the precision of the logic, the reliability of the system, and the thoughtful restraint of the UI.
                </motion.p>
            </div>

            {/* Philosophy Section */}
            <div className="grid lg:grid-cols-12 gap-16 items-start mb-40">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 relative"
                >
                    <div className="aspect-[3/4] relative bg-zinc-900 border-b border-r border-primary/30 pb-4 pr-4">
                        <div className="relative w-full h-full overflow-hidden">
                            <Image
                                src="/profile.png"
                                alt="Mustakheem Olamilekan Amoo"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-7 lg:pl-12 flex flex-col justify-center h-full pt-12 lg:pt-0"
                >
                    <span className="text-[10px] tracking-widest text-primary uppercase font-bold mb-4">PHILOSOPHY</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Restraint is a discipline.</h2>
                    
                    <div className="space-y-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
                        <p>
                            My journey began in mobile app development, where I learned the profound impact of performance and breathing room. Today, my work cuts across software development, mobile app development, UI/UX design, motion graphics, and AI-powered product building.
                        </p>
                        <p>
                            At CodedDevs Technology LTD, my role combines engineering execution with business leadership. I am currently leading the development of <strong>Twizrr</strong>, our first major mobile application—a social-commerce platform designed to help African sellers create digital stores, connect with buyers, and build trust.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Core Expertise / Hackathons */}
            <div className="mb-40">
                <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-white/10 pb-8 mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif">Hackathon Achievements</h2>
                    <span className="text-[10px] tracking-widest text-muted-foreground uppercase mt-4 md:mt-0">PROVEN PROBLEM-SOLVING</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: <Sparkles className="w-6 h-6 text-primary mb-6" />,
                            title: "1st Place",
                            desc: "Africa's Talking Build with Google APIs",
                            points: ["API INTEGRATION", "COMMUNICATIONS INFRASTRUCTURE"]
                        },
                        {
                            icon: <Layers className="w-6 h-6 text-primary mb-6" />,
                            title: "3rd Place",
                            desc: "Africa's Talking Build for Hardware Lagos",
                            points: ["SOFTWARE TO HARDWARE", "INNOVATIVE SOLUTIONS"]
                        },
                        {
                            icon: <Compass className="w-6 h-6 text-primary mb-6" />,
                            title: "1st Place",
                            desc: "Africa's Talking African-Wide Competition",
                            points: ["CONTINENTAL IMPACT", "SCALABLE ARCHITECTURE"]
                        }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            {item.icon}
                            <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                {item.desc}
                            </p>
                            <ul className="space-y-3">
                                {item.points.map((point, pIdx) => (
                                    <li key={pIdx} className="text-[9px] tracking-widest text-primary uppercase flex items-center gap-2">
                                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center py-20"
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-12">
                    Let's discuss your next <br className="hidden md:block"/> movement.
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-6">
                    <Link href="/contact" className="bg-white text-black px-8 py-4 text-[10px] tracking-widest uppercase font-bold hover:bg-white/90 transition-colors">
                        BOOK A CONSULTATION
                    </Link>
                    <Link href="/projects" className="text-primary text-[10px] tracking-widest uppercase font-bold hover:text-white transition-colors flex items-center gap-2">
                        VIEW RECENT WORK <span className="text-lg leading-none">&rarr;</span>
                    </Link>
                </div>
            </motion.div>

        </div>
    );
}
