"use client";

import { motion } from "framer-motion";
import { Code2, Database, Wrench } from "lucide-react";

export default function Skills() {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: <Code2 className="w-6 h-6 text-indigo-400" />,
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3", "Redux"]
        },
        {
            title: "Backend Development",
            icon: <Database className="w-6 h-6 text-purple-400" />,
            skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL", "Firebase"]
        },
        {
            title: "Tools & DevOps",
            icon: <Wrench className="w-6 h-6 text-pink-400" />,
            skills: ["Git/GitHub", "Docker", "AWS", "Vercel", "Jest", "Figma", "VS Code"]
        }
    ];

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    My technical toolbelt for bringing ideas to life. I m constantly learning and adapting to new technologies.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/5 rounded-lg">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
