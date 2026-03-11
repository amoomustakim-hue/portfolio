"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Hero() {
    return (
        <section className="relative">
            <BackgroundPaths title="Junior Full-Stack Developer" />

            <div className="absolute inset-x-0 bottom-24 flex flex-col items-center justify-center z-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-muted-foreground text-lg mb-8 max-w-2xl text-center px-4"
                >
                    1.5 years of experience building scalable web applications and crafting exceptional user experiences. Passionate about learning, growth, and writing clean, efficient code.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex gap-8 items-center border-t border-border pt-8 w-full max-w-xl justify-center"
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
        </section>
    );
}
