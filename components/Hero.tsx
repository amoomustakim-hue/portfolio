"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const title = "Junior Full-Stack Developer";
    const words = title.split(" ");

    return (
        <section className="relative">
            <BackgroundPaths>
                <div className="max-w-4xl mx-auto text-center px-4 pt-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8">
                        {words.map((word, wordIdx) => (
                            <span
                                key={wordIdx}
                                className="inline-block relative mx-1 md:mx-2"
                            >
                                {word.split("").map((char, charIdx) => (
                                    <motion.span
                                        key={charIdx}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: wordIdx * 0.1 + charIdx * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-b from-foreground to-foreground/20"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
                    >
                        1.5 years of experience building scalable web applications and crafting exceptional user experiences. Passionate about learning, growth, and writing clean, efficient code.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="mb-16"
                    >
                        <Button
                            variant="outline"
                            className="group relative px-8 py-6 text-lg rounded-full transition-all duration-300
                            hover:shadow-md dark:hover:shadow-neutral-800/50 glass border-border"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Discover Excellence
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="flex gap-8 items-center border-t border-border pt-8 w-full max-w-xl mx-auto justify-center"
                    >
                        <div className="text-center group">
                            <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">10+</h3>
                            <p className="text-sm text-muted-foreground">Live Projects</p>
                        </div>
                        <div className="text-center group border-l border-border pl-8">
                            <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">1.5</h3>
                            <p className="text-sm text-muted-foreground">Years Exp.</p>
                        </div>
                    </motion.div>
                </div>
            </BackgroundPaths>
        </section>
    );
}
