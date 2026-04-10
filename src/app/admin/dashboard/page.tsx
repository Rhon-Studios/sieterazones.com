"use client"

import {ComponentProps, useState} from "react";
import {useRouter} from "next/navigation";
import type { Cat } from "@/database/catDB";
import { cats } from "@/database/catDB";
import { motion } from "motion/react";
import {LogOut, Plus, Search} from "lucide-react";
import {AdminCatCard, AdminStatCard} from "@/components/ui/Cards";


type Props = ComponentProps<"div"> & {
    
};

const AdminDashboardPage = ({ ...rest }: Props) => {
    const router = useRouter();
    const goToNewAnimal = () => router.push("/admin/animal");
    const [searchTerm, setSearchTerm] = useState("");
    const [allCats, setAllCats] = useState<Cat[]>(cats);
    const filteredCats = allCats.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="min-h-screen bg-[#F6F1FB] py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-800 mb-2">Dashboard Administrativo</h1>
                            <p className="text-gray-600 text-lg">Gestiona los gatos en adopción</p>
                        </div>
                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
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
                            value={allCats.filter(c => !c.isAdopted).length}
                            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
                        />
                        <AdminStatCard
                            label="Urgentes"
                            value={allCats.filter(c => c.priority === "urgente").length}
                            color="bg-gradient-to-br from-red-500 to-red-600"
                        />
                        <AdminStatCard
                            label="Adopciones Totales"
                            value={allCats.filter(c => c.isAdopted).length}
                            color="bg-gradient-to-br from-blue-500 to-blue-600"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar gato por nombre..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent text-gray-800"
                            />
                        </div>
                        <motion.button
                            onClick={goToNewAnimal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#805BA6] to-[#6A4A8A] text-white px-6 py-3 rounded-xl font-semibold shadow-lg whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Añadir Gato
                        </motion.button>
                    </div>
                </motion.div>
                {filteredCats.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-600">No se encontraron gatos</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCats.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.6 }}
                            >
                                <AdminCatCard 
                                    cat={cat}
                                    onEdit={() => router.push(`/admin/animal?id=${cat.id}`)}
                                />
                            </motion.div>
                        ))}
                    </div>
                )} 
            </div>
        </div>
    )
}
export default AdminDashboardPage;
