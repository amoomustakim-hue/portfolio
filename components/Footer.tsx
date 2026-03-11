import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-12 border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Mustakheem Olamilekan Amoo. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
