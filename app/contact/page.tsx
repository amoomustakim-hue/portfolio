"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Let's Work Together</h1>
                <p className="text-gray-400">Have a project in mind? Send me a message and I'll get back to you shortly.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
                {/* Contact Info Cards */}
                <div className="p-6 glass rounded-xl text-center hover:border-primary/50 transition-colors">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                        <Mail />
                    </div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">amoomustakim@gmail.com</p>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 glass p-8 rounded-2xl border-none shadow-xl mb-24 mx-4"
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            required
                            type="email"
                            placeholder="your@email.com"
                            className="w-full"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject">Subject</label>
                    <input
                        id="subject"
                        required
                        type="text"
                        placeholder="Project inquiry..."
                        className="w-full"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {status === "loading" ? (
                        <Loader2 className="animate-spin" />
                    ) : status === "success" ? (
                        "Message Sent!"
                    ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                    )}
                </button>

                {status === "error" && (
                    <p className="text-destructive text-center text-sm">Something went wrong. Please try again or email directly.</p>
                )}
            </motion.form>
        </div>
    );
}
