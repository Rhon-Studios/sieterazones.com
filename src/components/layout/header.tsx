"use client";

import React, {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AnimatePresence, motion} from "motion/react";
import {Cat, ContactRound, Home, Menu, X} from "lucide-react";
import Image from "next/image";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        return path !== "/" && pathname.startsWith(path);
    };

    const Links = [
        {icon: <Home className="w-5 h-5"/>, route: "/", label: "Home", active: isActive("/")},
        {icon: <Cat className="w-5 h-5"/>, route: "/cats", label: "Adoptar", active: isActive("/cats")},
    ];

    const handleNavigation = (route: string) => {
        router.push(route);
        setMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
            className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#805BA6]/10 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 py-4 flex justify-between items-center">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-3 group"
                >
                    <div
                        className="hidden md:flex items-center cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <Image
                            src="/logo-bgremove.png"
                            alt="7 Razones"
                            width={48}
                            height={48}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1
                        className="text-3xl sm:text-2xl md:text-3xl font-bold text-[#805BA6] tracking-wide cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        7 RAZONES
                    </h1>
                </button>
                <nav className="hidden md:flex gap-2">
                    {Links.map((link) => (
                        <motion.button
                            onClick={() => {
                                router.push(link.route)
                            }}
                            key={link.label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                link.active
                                    ? "bg-[#805BA6] text-white"
                                    : "bg-transparent text-gray-700 hover:bg-[#E9E1F3]"
                            }`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            {link.icon}
                            <span className="font-medium">{link.label}</span>
                        </motion.button>
                    ))}
                </nav>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg text-[#805BA6] hover:bg-[#E9E1F3] transition-colors"
                >
                    {mobileMenuOpen ? (
                        <X className="w-7 h-7"/>
                    ) : (
                        <Menu className="w-7 h-7"/>
                    )}
                </button>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        className="md:hidden border-t border-[#805BA6]/10 bg-white px-4 py-4"
                    >
                        <nav className="flex flex-col gap-2">
                            {Links.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavigation(link.route)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        link.active
                                            ? "bg-[#805BA6] text-white"
                                            : "text-gray-700 hover:bg-[#E9E1F3]"
                                    }`}
                                >
                                    {link.icon}
                                    <span className="font-medium">
                                        {link.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};


export default Header;
