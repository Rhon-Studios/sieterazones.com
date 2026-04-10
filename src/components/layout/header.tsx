"use client";

import React, { ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {Cat, Home, Search} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = ComponentProps<"header"> &{

};

const Header= ({ ...rest}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const Links = [
        { icon: <Home className="w-5 h-5" />, route: "/", label: "Home", active: isActive("/") },
        { icon: <Cat className="w-5 h-5" />, route: "/cats", label: "Adoptar", active: isActive("/cats") },
    ];
    
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#805BA6]/10 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-3 group"
                >
                    <div
                        className="flex items-center cursor-pointer"
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
                        className="text-3xl font-bold text-[#805BA6] tracking-wide cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        7 RAZONES
                    </h1>
                </button>
                <nav className="flex gap-2">
                    {Links.map((link, index) => (
                        <motion.button
                            onClick={() => {router.push(link.route)}}
                            key={link.label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                link.active
                                    ? "bg-[#805BA6] text-white"
                                    : "bg-transparent text-gray-700 hover:bg-[#E9E1F3]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {link.icon}
                            <span className="font-medium">{link.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
};



export default Header;