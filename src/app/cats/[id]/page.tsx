"use client"

import React, {ComponentProps} from "react";
import Image from "next/image";
import {useParams} from "next/navigation";
import { cats } from "@/database/catDB";
import { motion } from "motion/react";
import {Calendar, CheckCircle2, Home, XCircle} from "lucide-react";
import {ProcessStepCard} from "@/components/ui/Cards";

type Props = ComponentProps<"div"> &{

};

const CatPage= ({ ...rest}: Props) => {
    const { id } = useParams();
    const cat = cats.find(c => c.id === Number(id));
    if (!cat) {
        return (
            <div className="flex-1 flex items-center justify-center px-6 bg-[#F6F1FB]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Gato no encontrado
                    </h2>
                    <a
                        href="/cats"
                        className="inline-block bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg font-semibold"
                    >
                        Volver a la lista
                    </a>
                </div>
            </div>
        )
    }

    const priorityConfig = {
        urgente: { label: "🔴 Adopción Urgente", color: "bg-red-100 text-red-700 border-red-300", description: "Este gatito necesita un hogar urgentemente" },
        alta: { label: "🟡 Prioridad Alta", color: "bg-yellow-100 text-yellow-700 border-yellow-300", description: "Este gatito necesita un hogar pronto" },
        normal: { label: "", color: "", description: "" }
    };
    const sexLabel = cat.sex === "macho" ? "♂️ Macho" : "♀️ Hembra";
    const statusConfig = {
        normal: { label: "Disponible" },
        reservado: { label: "Reservado" },
        acogido: { label: "En acogida" }
    };
    
    return(
        <div className="min-h-screen bg-[#F6F1FB] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <a
                        href="/cats"
                        className="inline-flex items-center gap-2 text-[#805BA6] hover:text-[#6A4A8A] mb-8 font-medium"
                        style={{ fontWeight: 700 }}
                    >
                        ← Volver a la lista
                    </a>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={cat.images[0]}
                                alt={`${cat.name} - Foto`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="flex items-start gap-16">
                                <h1 className="text-6xl font-bold mb-6 text-gray-800">
                                    {cat.name}
                                </h1>

                                {cat.priority !== "normal" && (
                                    <div
                                        className={`text-center flex-1 mb-6 px-4 py-3 rounded-lg border-2 ${priorityConfig[cat.priority].color}`}
                                    >
                                        <p className="text-lg font-semibold">
                                            {priorityConfig[cat.priority].label}
                                        </p>
                                        <p className="text-sm">
                                            {priorityConfig[cat.priority].description}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-lg text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#6A4A8A]" />
                                    <span>
                                    {cat.years > 0 && `${cat.years} ${cat.years === 1 ? "año" : "años"}`}
                                        {cat.years > 0 && cat.months > 0 && " y "}
                                        {cat.months > 0 && `${cat.months} ${cat.months === 1 ? "mes" : "meses"}`}
                                        {cat.years === 0 && cat.months === 0 && "0 meses"}
                                </span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-2">
                                <span>
                                    {sexLabel}
                                </span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-2">
                                    <Home className="w-5 h-5 text-[#6A4A8A]" />
                                    <span>
                                    {statusConfig[cat.status].label}
                                </span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-3 text-gray-800">Sobre {cat.name}</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {cat.description}
                                </p>
                            </div>
                            {cat.status !== "reservado" ? (
                                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2 text-emerald-700">
                                        ¡Disponible para Adopción!
                                    </h3>
                                    <p className="text-emerald-600 mb-6 text-lg">
                                        {cat.name} está esperando encontrar su hogar definitivo
                                    </p>
                                    <a
                                        href="https://docs.google.com/forms/d/137J_fztI0y11rra4NhO9tvJ4nya14dUhJ6sNMO3F9og/edit"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-10 py-4 rounded-xl transition-all hover:scale-105 shadow-lg font-semibold text-lg w-full"
                                    >
                                        Solicitar Adopción
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 text-center">
                                    <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-3xl font-bold mb-2 text-gray-700">
                                        Reservado
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                        {cat.name} ya está en proceso de adopción
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-12 shadow-xl"
                    >
                        <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
                            Proceso de Adopción
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ProcessStepCard
                                number="1"
                                title="Completa el Formulario"
                                description="Rellena el formulario de solicitud de adopción con tus datos y preferencias"
                            />
                            <ProcessStepCard
                                number="2"
                                title="Entrevista y Visita"
                                description="Nos pondremos en contacto contigo para conoceros mejor y concertar una visita"
                            />
                            <ProcessStepCard
                                number="3"
                                title="Bienvenido a Casa"
                                description="Si todo va bien, ¡tu nuevo compañero felino podrá ir a su hogar definitivo!"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default CatPage;

