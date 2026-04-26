"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import { cats } from "@/database/catDB"
import Image from "next/image";
import { motion } from "motion/react";
import {CatCard, StatCard, DonationCard, ContactCard} from "@/components/ui/Cards";
import {Calendar, Clock, Facebook, Instagram, Mail, MapPin, Users} from "lucide-react";

export default function Home() {
    const router = useRouter();
    const priorityOrder = { urgente: 0, alta: 1, normal: 2}
    const featuredCats = cats
        .filter(cat => !cat.isAdopted)
        .filter(cat => cat.status === "normal")
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
        .slice(0, 3);

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = "https://sieterazones.vercel.app/";

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Asociación Felinos Protegidos",
                    text: "Ayuda a esta asociación de gatos 🐱",
                    url,
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div>
            <section
                className="relative h-[90vh] min-h-[600px] overflow-hidden"
                id="hero"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/herocat.jpg"
                        alt={"Asociación de Felinos Protegidos - 7 Razones"}
                        fill
                        className="object-cover object-[70%_10%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"/>
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-2xl text-white"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-6xl font-bold mb-6 leading-tight"
                        >
                            Dale un hogar a un felino necesitado
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl mb-8 text-gray-100"
                        >
                            En Jódar, Jaén trabajamos cada día para rescatar, cuidar y encontrar familias para gatos abandonados.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex gap-4"
                        >
                            <button
                                onClick={() => {router.push("/cats")}}
                                className="bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg font-semibold"
                            >
                                Ver gatos en adopción
                            </button>
                            <a
                                href="#donations"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg border-2 border-white transition-all hover:scale-105 font-semibold"
                            >
                                Ayúdanos
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section
                className="py-20 px-6 bg-[#F6F1FB]"
                id="homecats"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-bold text-gray-800 mb-4">
                            Nuestros gatos
                        </h2>
                        <p className="text-xl text-gray-600">
                            Conoce a algunos de nuestros felinos en busca de un hogar
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredCats.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <CatCard cat={cat} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => {router.push("/cats")}}
                            className="inline-block bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg font-semibold text-lg"
                        >
                            Ver gatos en adopción
                        </button>
                    </div>
                </div>
            </section>
            <section
                className="py-20 px-6 bg-white"
                id="about"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid gridd-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-5xl font-bold text-gray-800 mb-6">
                                Sobre nosotros
                            </h2>
                            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    La <strong className="text-[#6A4A8A]">
                                        Asociación de Felinos Protegidos 
                                    </strong> nació en octubre de 2023 con el propósito de mejorar la calidad de vida de los gatos callejeros en Jódar. Esta iniciativa fue impulsada por dos jóvenes comprometidas con la protección animal, quienes, al observar la difícil situación de las colonias felinas en el municipio, decidieron actuar.
                                </p>
                                <p>
                                    Desde sus inicios, la asociación ha crecido gracias al apoyo de voluntarios locales, consolidándose como un proyecto comunitario basado en la solidaridad y el respeto por los animales. Nuestro trabajo se centra en la gestión ética de las colonias felinas mediante la aplicación del método CER (Captura, Esterilización y Retorno), el rescate de gatos en situación de riesgo y la búsqueda de hogares responsables para aquellos que no pueden regresar a la calle.
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <StatCard icon={<Users className="w-6 h-6" />} value="+50" label="Gatos Rescatados" />
                                <StatCard icon={<Calendar className="w-6 h-6" />} value="+30" label="Adopciones Exitosas" />
                                <StatCard icon={<Clock className="w-6 h-6" />} value="24/7" label="Cuidado y Atención" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/aboutcat.jpg"
                                alt="Voluntarios cuidando gatos"
                                fill
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
            <section
                className="py-20 px-6 bg-[#E9E1F3] scroll-mt-50"
                id="donations"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-bold text-gray-800 mb-4">Cómo Ayudar</h2>
                        <p className="text-xl text-gray-600">
                            Tu apoyo es fundamental para seguir rescatando y cuidando a nuestros felinos
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <DonationCard
                                type="bizum"
                                title="Bizum"
                                description="Donación rápida y segura"
                                action="+34 664 43 50 87"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <DonationCard
                                type="teaming"
                                title="Teaming"
                                description="Solo 1€ al mes marca la diferencia"
                                action="Únete al Teaming"
                                link="https://www.teaming.net/asociacionfelinosprotegidosdejodar-7razones"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <DonationCard
                                type="material"
                                title="Donaciones de Material"
                                description="Arena, comida, rascadores, juguetes y más"
                                action="Envía a: C. Tiburcio Vargas, 5, 23500 Jódar, Jaén"
                                link="https://maps.app.goo.gl/zKTmbogyMWYXnKsR6"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <DonationCard
                                type="share"
                                title="Comparte"
                                description="Ayúdanos a llegar a más personas difundiendo nuestra labor"
                                action="Comparte la web"
                                onClick={handleShare}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
            <section
                className="py-20 px-6 bg-white"
                id="contact"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-bold text-gray-800 mb-4">Contacto</h2>
                        <p className="text-xl text-gray-600">
                            ¿Tienes preguntas? Estamos aquí para ayudarte
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ContactCard 
                            icon={ <Mail className="w-6 h-6"/> } 
                            title="Email" 
                            content="gatosjodar@gmail.com" 
                            link="mailto:gatosjodar@gmail.com" 
                            delay={0.1}
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6" />}
                            title="Dirección"
                            content="C. Tiburcio Vargas, 5, 23500 Jódar, Jaén"
                            link="https://maps.app.goo.gl/2gWAH1ufmCETsdnA8"
                            delay={0.2}
                        />
                        <ContactCard
                            icon={<Instagram className="w-6 h-6" />}
                            title="Instagram"
                            content="@asociacionfelinosprotegidos"
                            link="https://www.instagram.com/asociacionfelinosprotegidos"
                            delay={0.3}
                        />
                        <ContactCard
                            icon={<Facebook className="w-6 h-6" />}
                            title="Facebook"
                            content="Visitar Página"
                            link="https://www.facebook.com/share/1ATuhNaV3z/"
                            delay={0.4}
                        />
                    </div>
                </div>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 20 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="bg-white border border-gray-200 shadow-xl rounded-xl px-6 py-3 flex items-center gap-3">
                            <span className="text-green-600 text-lg">✔</span>
                            <span className="text-gray-800 font-medium">
                                Enlace copiado al portapapeles
                            </span>
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    );
}


