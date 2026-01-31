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
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-3xl font-bold text-indigo-400">40+</h3>
                            <p className="text-sm text-gray-400">Projects Completed</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-3xl font-bold text-purple-400">100%</h3>
                            <p className="text-sm text-gray-400">Client Satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* Bio & Journey */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">About Me</h1>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            I am <span className="text-white font-medium">Mustakheem Olamilekan Amoo</span>, a passionate Full Stack Developer with deep expertise in building scalable web applications.
                            My journey started with a curiosity for how things work on the internet, which quickly evolved into a career crafting professional digital solutions.
                            <br /><br />
                            I specialize in the <span className="text-indigo-400">MERN Stack (MongoDB, Express, React, Node.js)</span> and Next.js, creating seamless user experiences backed by robust architecture.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <Briefcase className="mr-3 text-indigo-500" /> Experience
                        </h2>
                        <div className="space-y-8 pl-4 border-l-2 border-white/10">
                            {[
                                {
                                    role: "Senior Full Stack Developer",
                                    company: "Freelance / Self-Employed",
                                    period: "2023 - Present",
                                    desc: "Leading development of high-performance web applications for global clients."
                                },
                                {
                                    role: "Frontend Developer Intern",
                                    company: "Tech Startups",
                                    period: "2021 - 2022",
                                    desc: "Collaborated with cross-functional teams to build responsive UI components."
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

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <GraduationCap className="mr-3 text-purple-500" /> Education
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                                <h3 className="text-lg font-bold">Computer Science</h3>
                                <p className="text-gray-400">B.Sc. Degree</p>
                                <p className="text-sm text-gray-500 mt-2">University / Tech Institute</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
