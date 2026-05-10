"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const featuredProjects = [
    {
        title: "RENTIFY RECEIPTS",
        category: "WEB APPLICATION — 2026",
        link: "/projects",
        image: "/rentify.png",
        layout: "full"
    },
    {
        title: "DIAL AI",
        category: "AI HEALTHCARE ASSISTANT — 2024",
        link: "/projects",
        image: "/dialai.png",
        layout: "half"
    },
    {
        title: "ROCK PAPER SCISSORS",
        category: "PYTHON DESKTOP GAME — 2024",
        link: "/projects",
        image: null,
        layout: "half"
    }
];

export default function FeaturedProjects() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif mb-4 tracking-tight"
                >
                    Curated Craft.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground max-w-2xl text-sm leading-relaxed"
                >
                    An exhaustive archive of digital experiences, architectural brand identities, and structural design solutions for the elite modern era.
                </motion.p>
            </div>

            {/* Filters placeholder to match design */}
            <div className="flex gap-6 mb-8 text-[10px] tracking-widest uppercase font-bold text-muted-foreground">
                <span className="text-primary">All Projects</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Visual Identity</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Digital Product</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Creative Direction</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {featuredProjects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`group flex flex-col cursor-pointer ${project.layout === 'full' ? 'md:col-span-2' : 'col-span-1'}`}
                    >
                        <Link href={project.link}>
                            <div className={`w-full bg-zinc-900 relative overflow-hidden mb-6 ${project.layout === 'full' ? 'aspect-[21/9]' : 'aspect-square md:aspect-[4/5]'}`}>
                                {project.image && (
                                    <Image 
                                        src={project.image} 
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}
                            </div>
                            
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                                    {project.category}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-32 text-center"
            >
                <div className="text-[10px] text-primary tracking-widest uppercase font-bold mb-4">NEXT STEPS</div>
                <h2 className="text-4xl md:text-6xl font-serif mb-8">Have a project in mind?</h2>
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-primary transition-colors border-b border-primary pb-1">
                    Let's start a conversation ➔
                </Link>
            </motion.div>
        </section>
    );
}
