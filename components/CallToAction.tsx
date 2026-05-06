"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-40 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-y border-muted-foreground/10 bg-[#0a0a0a]">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8">
                    LEAVE A MARK.
                </h2>
                <p className="text-muted-foreground text-sm max-w-lg mb-12 leading-relaxed">
                    Available for select partnerships and consulting engagements. Reach out to discuss how we can refine your digital presence.
                </p>
                <Link 
                    href="/contact" 
                    className="flex items-center gap-3 text-[10px] text-primary uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                    INITIATE CONTACT <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        </section>
    );
}
