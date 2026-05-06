import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-24 bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-5xl font-serif tracking-widest text-white mb-8">
                MUSTAKHEEM
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] tracking-widest uppercase text-muted-foreground mb-12">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://github.com/coded-devs" className="hover:text-white transition-colors">GitHub</a>
                <Link href="/contact" className="hover:text-primary transition-colors text-primary font-bold">Contact</Link>
            </div>

            <p className="text-[9px] tracking-widest text-muted-foreground/50 uppercase">
                © {new Date().getFullYear()} MUSTAKHEEM AMOO. ALL RIGHTS RESERVED.
            </p>
        </footer>
    );
}
