import Link from "next/link";
import { Button } from "./ui/button";

const FOOTER_LINKS = [
  { name: "About", href: "/about" },
  { name: "Our Work", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookies Policy", href: "/cookies-policy" },
];

export function Footer() {
  return (
    <footer className="bg-surface/50 backdrop-blur-sm border-t border-border/30 pt-16 pb-8 relative z-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-gradient-3d transition-all duration-300">
                Vizox<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm leading-relaxed">
              Vizox Studio — Building digital systems that turn businesses into scalable brands.
            </p>
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Links</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-4 mb-8">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contactvizox@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  contactvizox@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918271754978" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91 8271754978
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/thevizox" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Vizox Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
