import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-20 border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Mustakheem Olamilekan Amoo. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
