"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

const projects = [
    {
        title: "TWIZRR",
        category: "SOCIAL-COMMERCE APP — IN DEVELOPMENT",
        desc: "A modern African social-commerce platform enabling sellers to create digital stores, receive payments securely, and build trust through escrow-powered commerce.",
        links: { live: "https://twizzr.com", github: "#" },
        image: "/twizrr.png",
        layout: "full"
    },
    {
        title: "DIAL AI",
        category: "AI HEALTHCARE ASSISTANT — 2024",
        desc: "An AI-powered healthcare assistant bridging the digital divide by providing health guidance through USSD, SMS, and Voice for communities without internet access.",
        links: { live: "https://dialai.vercel.app", github: "https://github.com/coded-devs/dial-ai.git" },
        image: "/dialai.png",
        layout: "half"
    },
    {
        title: "ROCK PAPER SCISSORS",
        category: "PYTHON DESKTOP GAME — 2024",
        desc: "My first-ever Python software project. A premium desktop game built with Tkinter featuring a dark cyan UI, custom graphics, and thinking animations.",
        links: { live: "#", github: "#" },
        image: null,
        layout: "half"
    },
    {
        title: "NAIJA HIRE",
        category: "MOBILE APP — COMING SOON",
        desc: "An artisan-to-client mobile platform designed to help users quickly and reliably find trusted local service providers like electricians and plumbers.",
        links: { live: "#", github: "#" },
        image: "/naijahire.jpg",
        layout: "full"
    },
];

export default function Projects() {
    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif mb-4 tracking-tight"
                >
                    Project Archive.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground max-w-2xl text-sm leading-relaxed"
                >
                    A comprehensive look at my body of work. From complex web applications to intuitive mobile experiences and AI integrations.
                </motion.p>
            </div>

            <div className="flex gap-6 mb-12 text-[10px] tracking-widest uppercase font-bold text-muted-foreground overflow-x-auto pb-4">
                <span className="text-primary whitespace-nowrap">All Projects</span>
                <span className="hover:text-primary cursor-pointer transition-colors whitespace-nowrap">AI & Data</span>
                <span className="hover:text-primary cursor-pointer transition-colors whitespace-nowrap">Web Applications</span>
                <span className="hover:text-primary cursor-pointer transition-colors whitespace-nowrap">Mobile Experiences</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`group flex flex-col ${project.layout === 'full' ? 'md:col-span-2' : 'col-span-1'}`}
                    >
                        {/* Image Placeholder */}
                        <div className={`w-full bg-zinc-900 relative overflow-hidden mb-6 ${project.layout === 'full' ? 'aspect-[21/9]' : 'aspect-square md:aspect-[4/5]'}`}>
                            {project.image && (
                                <Image 
                                    src={project.image} 
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm z-10">
                                {project.links.github !== "#" && (
                                    <a href={project.links.github} target="_blank" rel="noreferrer" className="p-4 rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all text-primary">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {project.links.live !== "#" && (
                                    <a href={project.links.live} target="_blank" rel="noreferrer" className="p-4 rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all text-primary">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[10px] tracking-widest text-muted-foreground uppercase mb-4">
                                {project.category}
                            </p>
                            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                                {project.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
