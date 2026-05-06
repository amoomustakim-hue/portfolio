"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Work", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/skills" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="absolute top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-12 py-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <span className="text-xl md:text-2xl font-serif tracking-widest text-white uppercase">
                        Mustakheem
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-[10px] tracking-widest uppercase transition-colors hover:text-white ${
                                pathname === item.path ? "text-white border-b border-white pb-1" : "text-muted-foreground"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="ml-8 text-white hover:text-primary transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center space-y-8 z-40"
                    >
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-6 p-2 text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="text-4xl font-serif text-white hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
