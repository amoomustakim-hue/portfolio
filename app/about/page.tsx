"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
            >
                {/* Profile Image & Quick Stats */}
                <div>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-white/10 group">
                        <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                        <Image
                            src="/profile.png" // User's uploaded image
                            alt="Mustakheem Olamilekan Amoo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl glass">
                            <h3 className="text-3xl font-bold text-primary">10+</h3>
                            <p className="text-sm text-muted-foreground">Projects Completed</p>
                        </div>
                        <div className="p-4 rounded-xl glass">
                            <h3 className="text-3xl font-bold text-primary">1.5</h3>
                            <p className="text-sm text-muted-foreground">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* Bio & Journey */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">About Me</h1>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            I am <span className="text-white font-medium">Mustakheem Olamilekan Amoo</span>, a focused <span className="text-indigo-400">Junior Full Stack Developer</span> with 1.5 years of hands-on experience building modern web applications.
                            I thrive on solving complex problems and turning creative ideas into functional, high-performance digital products.
                            <br /><br />
                            I specialize in the <span className="text-indigo-400">MERN Stack</span> and Next.js, with a strong commitment to writing clean code and continuously learning new technologies to deliver better user experiences.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <Briefcase className="mr-3 text-indigo-500" /> Experience
                        </h2>
                        <div className="space-y-8 pl-4 border-l-2 border-white/10">
                            {[
                                {
                                    role: "Full Stack Developer",
                                    company: "Freelance",
                                    period: "2024 - Present",
                                    desc: "Developing responsive and interactive web applications using React and Node.js for various clients."
                                },
                                {
                                    role: "Frontend Developer",
                                    company: "Tech Project Collaboration",
                                    period: "2023 - 2024",
                                    desc: "Built and optimized user interfaces, ensuring seamless cross-browser compatibility and performance."
                                }
                            ].map((job, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-indigo-500" />
                                    <h3 className="text-xl font-bold">{job.role}</h3>
                                    <span className="text-sm text-indigo-400 mb-2 block">{job.company} | {job.period}</span>
                                    <p className="text-gray-400">{job.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
