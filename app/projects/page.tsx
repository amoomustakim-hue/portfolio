"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "E-Commerce Platform",
        desc: "A full-featured online store with payment integration, admin dashboard, and user authentication.",
        tags: ["Next.js", "Stripe", "Tailwind MySQL"],
        links: { live: "#", github: "#" },
        image: null // Placeholder for project screenshot
    },
    {
        title: "SaaS Dashboard",
        desc: "Analytics dashboard for business intelligence monitoring with real-time data visualization.",
        tags: ["React", "D3.js", "Node.js"],
        links: { live: "#", github: "#" },
        image: null
    },
    {
        title: "Portfolio V1",
        desc: "Previous iteration of my personal portfolio showcasing early frontend development skills.",
        tags: ["HTML/CSS", "JavaScript"],
        links: { live: "#", github: "#" },
        image: null
    },
];

export default function Projects() {
    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    A selection of my best work, spanning from complex web applications to beautiful landing pages.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 duration-300"
                    >
                        {/* Project Image Placeholder */}
                        <div className="aspect-video bg-muted relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                                <Code className="w-12 h-12 opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                <a href={project.links.github} className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 hover:scale-110 transition-all text-primary">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href={project.links.live} className="p-3 bg-primary rounded-full hover:bg-primary/90 hover:scale-110 transition-all text-primary-foreground">
                                    <ExternalLink className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-primary/5 text-primary border border-primary/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
