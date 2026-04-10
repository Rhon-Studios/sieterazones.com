"use client";

import React, {ComponentProps} from "react";
import Bar from "../ui/Bar";
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import {Facebook, Heart} from "lucide-react";
type Props = ComponentProps<"footer"> &{
    
    
};


const Footer = () => {
    return (
        <footer className="w-full bg-[#F6F1FB] py-12 px-6 border-t border-[#805BA6]/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-[#805BA6] font-medium mb-2">
                        © {new Date().getFullYear()} Asociación de Felinos Protegidos - 7 Razones
                        </p>
                        <p className="text-gray-600 text-sm">
                            Jódar, Jaén · Rescatando vidas desde 2023
                        </p>
                    </div>
                    <Bar>
                        <button className="button" title="facebook" onClick={() => window.open("https://www.facebook.com/share/1ATuhNaV3z/")}>
                            <FaFacebook className="icon" />
                            <span className="title">Facebook</span>
                        </button>
                        <button className="button" title="instagram" onClick={() => window.open("https://www.instagram.com/asociacionfelinosprotegidos?igsh=NmVzNGd5NzE4c2Uw")}>
                            <TiSocialInstagram className="icon" />
                            <span className="title">Instagram</span>
                        </button>
                    </Bar>
                </div>
                <div className="mt-8 pt-6 border-t border-[#805BA6]/10 text-center">
                    <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                        Hecho con <Heart className="w-4 h-4 text-[#805BA6] fill-[#805BA6]" /> para los gatitos de Jódar
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
