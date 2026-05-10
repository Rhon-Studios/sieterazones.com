"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import type {Cat} from "@/database/catDB";
import {motion} from "motion/react";
import {LogOut, Plus, Search} from "lucide-react";
import {AdminCatCard, AdminStatCard, AdoptedCatCard} from "@/components/ui/Cards";
import {ALL} from "node:dns";

type AirtableCat = Cat & {
    airtableId: string;
};

type FilterStatus = "todos" | "normal" | "reservado" | "acogido";
type FilterPriority = "todos" | "normal" | "alta" | "urgente";

const AdminDashboardPage = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("todos");
    const [filterPriority, setFilterPriority] = useState<FilterPriority>("todos");
    const [allCats, setAllCats] = useState<AirtableCat[]>([]);

    const fetchCats = async () => {
        const res = await fetch("/api/cats");
        const data = await res.json();

        if (!data?.records) return;

        const formattedCats = data.records.map(
            (cat: { id: string; fields: Cat }) => ({
                id: cat.id,
                ...cat.fields,
                airtableId: cat.id,
            })
        );

        setAllCats(formattedCats);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const availableCats = allCats.filter(cat => !cat.isAdopted);
    const adoptedCats = allCats.filter(cat => cat.isAdopted);

    const filteredAvailable = availableCats.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "todos" || cat.status === filterStatus;
        const matchesPriority = filterPriority === "todos" || cat.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const filteredAdopted = adoptedCats.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F6F1FB] py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-800 mb-2">
                                Dashboard Administrativo
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Gestiona los gatos en adopción
                            </p>
                        </div>
                        <motion.a
                            href="/"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
                        >
                            <LogOut className="w-5 h-5"/>
                            Salir
                        </motion.a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <AdminStatCard
                            label="Total de Gatos"
                            value={allCats.length}
                            color="bg-gradient-to-br from-[#805BA6] to-[#6A4A8A]"
                        />
                        <AdminStatCard
                            label="Disponibles"
                            value={availableCats.length}
                            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
                        />
                        <AdminStatCard
                            label="Urgentes"
                            value={allCats.filter(c => c.priority === "urgente").length}
                            color="bg-gradient-to-br from-red-500 to-red-600"
                        />
                        <AdminStatCard
                            label="Adopciones Totales"
                            value={adoptedCats.length}
                            color="bg-gradient-to-br from-blue-500 to-blue-600"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar gato por nombre..."
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent text-gray-800"
                                />
                            </div>
                            <motion.button
                                onClick={() => router.push("/admin/animal")}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="flex items-center gap-2 bg-gradient-to-r from-[#805BA6] to-[#6A4A8A] text-white px-6 py-3 rounded-xl font-semibold shadow-lg whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5"/>
                                Añadir Gato
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Estado:
                                </label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6A4A8A] focus:border-transparent transition-all text-gray-800 font-medium"
                                >
                                    {(["todos", "normal", "reservado", "acogido"] as FilterStatus[]).map(s => (
                                        <option key={s} value={s}>
                                            {s === "todos" ? "Todos" : s === "normal" ? "Disponible" : s === "reservado" ? "Reservado" : "En acogida"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Prioridad:
                                </label>
                                <select
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value as FilterPriority)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6A4A8A] focus:border-transparent transition-all text-gray-800 font-medium"
                                >
                                    {(["todos", "normal", "alta", "urgente"] as FilterPriority[]).map(p => (
                                        <option key={p} value={p}>
                                            {p === "todos" ? "Todas" : p === "normal" ? "🟢 Normal" : p === "alta" ? "🟡 Alta" : "🔴 Urgente"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 text-center text-gray-600 font-medium">
                            {filteredAvailable.length === availableCats.length ? (
                                <p>Mostrando todos los gatos ({availableCats.length})</p>
                            ) : (
                                <p>
                                    Mostrando {filteredAvailable.length} de {availableCats.length} gatos
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        🐱 En adopción
                        <span className="text-base font-normal text-gray-400">({filteredAvailable.length})</span>
                    </h2>
                    {filteredAvailable.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <p className="text-xl text-gray-400">No se encontraron gatos</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAvailable.map((cat, index) => (
                                <motion.div
                                    key={cat.airtableId}
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.05, duration: 0.6}}
                                >
                                    <AdminCatCard
                                        cat={cat}
                                        onEdit={() => router.push(`/admin/animal?id=${cat.airtableId}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div className="w-full border-1 border-gray-400 mb-10"/>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        Adoptados
                        <span className="text-base font-normal text-gray-400">({filteredAdopted.length})</span>
                    </h2>

                    {filteredAdopted.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <p className="text-xl text-gray-400">No hay gatos adoptados aún</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAdopted.map((cat, index) => (
                                <motion.div
                                    key={cat.airtableId}
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.05, duration: 0.6}}
                                >
                                    <AdoptedCatCard
                                        cat={cat}
                                        onEdit={() => router.push(`/admin/animal?id=${cat.airtableId}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
