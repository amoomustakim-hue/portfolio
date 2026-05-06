"use client";

import { motion } from "framer-motion";

const capabilities = [
    {
        num: "01",
        title: "Mobile App Development",
        desc: "Building intuitive mobile interfaces and component-based architectures using React Native."
    },
    {
        num: "02",
        title: "Web App Development",
        desc: "Crafting responsive and high-performance web applications with the MERN stack and Next.js."
    },
    {
        num: "03",
        title: "AI & Product Development",
        desc: "Designing AI-powered solutions, voice/SMS automation, and social commerce platforms like Twizrr."
    },
    {
        num: "04",
        title: "UI/UX & Creative Direction",
        desc: "Executing brand-focused product design, visual storytelling, and motion graphics."
    }
];

export default function CoreCapabilities() {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-muted-foreground/10 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left side label */}
                <div className="lg:col-span-3 flex items-start gap-4">
                    <div className="w-[1px] h-4 bg-primary mt-2"></div>
                    <span className="text-[10px] tracking-widest text-muted-foreground uppercase">CORE CAPABILITIES</span>
                </div>

                {/* Right side grid */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
                    {capabilities.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <span className="text-2xl font-serif text-muted-foreground/50 mb-6">{item.num}</span>
                            <h3 className="text-2xl font-serif mb-4 tracking-wide">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
