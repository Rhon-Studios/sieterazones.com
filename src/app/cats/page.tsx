"use client";

import React, {useEffect, useState} from "react";
import {CatCard} from "@/components/ui/Cards";
import {motion} from "motion/react";
import {FilterSelect} from "@/components/ui/FilterSelect";
import {Cat} from "@/database/catDB";

const CatsPage = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [selectedSex, setSelectedSex] = useState<string>("todos");
    const [selectedAgeRange, setSelectedAgeRange] = useState<string>("todos");
    const [selectedPriority, setSelectedPriority] = useState<string>("todos");

    const fetchCats = async () => {
        const res = await fetch("http://localhost:3000/api/cats");
        const data = await res.json();

        if (!data?.records) return;

        const formattedCats = data.records.map(
            (cat: { id: string; fields: Cat }) => ({
                id: cat.id,
                ...cat.fields,
            }),
        );

        setCats(formattedCats);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const filteredCats = cats.filter((cat) => {
        if (selectedSex !== "todos" && cat.sex !== selectedSex) return false;

        if (selectedAgeRange !== "todos") {
            if (selectedAgeRange === "cachorro" && cat.years > 1) return false;
            if (selectedAgeRange === "joven" && (cat.years <= 1 || cat.years > 3))
                return false;
            if (selectedAgeRange === "adulto" && (cat.years <= 3 || cat.years > 7))
                return false;
            if (selectedAgeRange === "senior" && cat.years <= 7) return false;
        }

        return !(selectedPriority !== "todos" && cat.priority !== selectedPriority);
    });

    return (
        <div className="min-h-screen bg-[#F6F1FB] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">
                        Gatos en Adopción
                    </h1>

                    <p className="text-xl text-gray-600">
                        Conoce a todos nuestros felinos que buscan un hogar lleno de amor
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.6}}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-12"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                        Filtrar por:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FilterSelect
                            label="Sexo"
                            value={selectedSex}
                            onChange={setSelectedSex}
                            options={[
                                {value: "todos", label: "Todos"},
                                {value: "macho", label: "Macho"},
                                {value: "hembra", label: "Hembra"},
                            ]}
                        />

                        <FilterSelect
                            label="Edad"
                            value={selectedAgeRange}
                            onChange={setSelectedAgeRange}
                            options={[
                                {value: "todos", label: "Todas las edades"},
                                {value: "cachorro", label: "Cachorro (0-1 año)"},
                                {value: "joven", label: "Joven (1-3 años)"},
                                {value: "adulto", label: "Adulto (3-7 años)"},
                                {value: "senior", label: "Senior (7+ años)"},
                            ]}
                        />

                        <FilterSelect
                            label="Prioridad de Adopción"
                            value={selectedPriority}
                            onChange={setSelectedPriority}
                            options={[
                                {value: "todos", label: "Todas las prioridades"},
                                {value: "urgente", label: "🔴 Urgente"},
                                {value: "alta", label: "🟡 Alta"},
                                {value: "normal", label: "🟢 Normal"},
                            ]}
                        />
                    </div>

                    <div className="mt-6 text-center text-gray-600 font-medium">
                        {filteredCats.length === cats.length ? (
                            <p>Mostrando todos los gatos ({cats.length})</p>
                        ) : (
                            <p>
                                Mostrando {filteredCats.length} de {cats.length} gatos
                            </p>
                        )}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredCats.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.05, duration: 0.6}}
                        >
                            <CatCard cat={cat}/>
                        </motion.div>
                    ))}
                </div>

                {filteredCats.length === 0 && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-center py-20"
                    >
                        <p className="text-2xl text-gray-600 mb-4">
                            No se encontraron gatos con estos filtros
                        </p>

                        <button
                            onClick={() => {
                                setSelectedSex("todos");
                                setSelectedAgeRange("todos");
                                setSelectedPriority("todos");
                            }}
                            className="bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg font-semibold"
                        >
                            Limpiar filtros
                        </button>
                    </motion.div>
                )}

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4, duration: 0.6}}
                    className="text-center"
                >
                    <a
                        href="https://docs.google.com/forms/d/137J_fztI0y11rra4NhO9tvJ4nya14dUhJ6sNMO3F9og/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-10 py-5 rounded-xl transition-all hover:scale-105 shadow-lg font-semibold text-lg"
                    >
                        Solicitar Adopción
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default CatsPage;
