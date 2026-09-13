import Link from "next/link";
import { SiFacebook, SiX, SiYoutube } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa"; 

import { Button } from "@/components/ui/button";

const footerLinks = [
    {
        label: "Términos y condiciones",
        href: "#",
    },
    {
        label: "Política de privacidad",
        href: "#",
    },
    {
        label: "Contacto",
        href: "#",
    },
    {
        label: "Preguntas frecuentes",
        href: "#",
    },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "#",
        icon: SiFacebook,
    },
    {
        label: "X",
        href: "#",
        icon: SiX,
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: FaLinkedin,
    },
    {
        label: "YouTube",
        href: "#",
        icon: SiYoutube,
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-deep py-8">
            <div className="mx-auto w-full max-w-[1127px] px-4 sm:px-6 lg:px-8 xl:px-0  ">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <Link
                            href="/"
                            aria-label="Ir a la página principal"
                            className="inline-flex"
                        >
                            {/* Avoids Next's LCP warning for the duplicate footer logo. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/logo.png"
                                alt="Gaming"
                                width={486}
                                height={90}
                                className="h-auto w-[150px]"
                            />
                        </Link>
                    </div>

                    <nav aria-label="Enlaces del pie de página">
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex gap-2 md:justify-end">
                        {socialLinks.map((social) => {
                            const SocialIcon = social.icon;

                            return (
                                <Button
                                    key={social.label}
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-primary hover:text-primary-foreground"
                                >
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                    >
                                        <SocialIcon className="size-4" />
                                    </a>
                                </Button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 border-t border-border pt-8">
                    <p className="text-sm text-muted-foreground">
                        Copyright © {currentYear} Gaming. Todos los derechos
                        reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
