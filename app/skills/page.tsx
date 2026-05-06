"use client";

import { motion } from "framer-motion";

const skillsData = [
    {
        title: "Mobile App Development",
        desc: "Building intuitive mobile interfaces and component-based architectures for iOS and Android.",
        skills: ["REACT NATIVE", "MOBILE UI IMPLEMENTATION", "COMPONENT ARCHITECTURE", "NAVIGATION FLOWS", "RESPONSIVE LAYOUTS"]
    },
    {
        title: "Web App Development",
        desc: "Crafting responsive, high-performance web applications with modern frontend frameworks.",
        skills: ["REACT.JS", "NEXT.JS", "JAVASCRIPT / TYPESCRIPT", "HTML5 & CSS3", "RESPONSIVE WEB DESIGN"]
    },
    {
        title: "Backend & Logic",
        desc: "Developing robust server-side logic, automation scripting, and system integrations.",
        skills: ["PYTHON", "NODE.JS", "EXPRESS", "API INTEGRATION", "DATA HANDLING"]
    },
    {
        title: "AI & Product Thinking",
        desc: "Designing AI-powered solutions and prompt-driven product architectures.",
        skills: ["AI ASSISTANT WORKFLOWS", "PROMPT ENGINEERING", "VOICE / SMS / USSD AI", "SOCIAL COMMERCE LOGIC"]
    },
    {
        title: "UI/UX & Creative Direction",
        desc: "Executing brand-focused product design, visual storytelling, and motion graphics.",
        skills: ["PRODUCT DESIGN THINKING", "MOTION GRAPHICS", "VISUAL STORYTELLING", "USER FLOW PLANNING"]
    }
];

export default function Skills() {
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
                    TECHNICAL CAPABILITIES
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.1] mb-8"
                >
                    THE STACK OF <br />
                    INNOVATION.
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed"
                >
                    A comprehensive toolkit spanning mobile engineering, full-stack web development, and AI-powered product execution. I select the right tool for the specific problem, ensuring scalable, secure, and elegant outcomes.
                </motion.p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 mb-32 border-t border-white/10 pt-20">
                {skillsData.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-serif mb-4 tracking-wide">{category.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[280px]">
                            {category.desc}
                        </p>
                        
                        <ul className="space-y-4 border-t border-white/10 pt-8">
                            {category.skills.map((skill, sIdx) => (
                                <li key={sIdx} className="text-[9px] tracking-widest text-white uppercase flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-none"></div>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
