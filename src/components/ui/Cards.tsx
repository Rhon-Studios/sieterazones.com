import type { Cat } from "@/database/catDB";
import { motion } from "motion/react";
import Image from "next/image";
import {Calendar, CheckCircle, Edit, Euro, ExternalLink, Heart, Package, Speech} from "lucide-react";


export function CatCard({ cat }: { cat: Cat }) {
    const priorityConfig = {
        urgente: { label: "🔴 Urgente", color: "bg-red-500" },
        alta: { label: "🟡 Prioridad Alta", color: "bg-yellow-500" },
        normal: { label: "", color: "" }
    };

    const statusConfig = {
        normal: { label: "Disponible", color: "bg-emerald-500" },
        reservado: { label: "Reservado", color: "bg-blue-500" },
        acogido: { label: "En acogida", color: "bg-purple-500" }
    };
    
    return (
        <a href={`/cats/${cat.id}`}>
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
            >
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={cat.images[0]}
                        alt={cat.name}
                        fill
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                    {cat.priority !== "normal" && (
                        <div className={`absolute top-3 right-3 ${priorityConfig[cat.priority].color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {priorityConfig[cat.priority].label}
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {cat.years > 0 && `${cat.years} ${cat.years === 1 ? "año" : "años"}`}
                                {cat.years > 0 && cat.months > 0 && " y "}
                                {cat.months > 0 && `${cat.months} ${cat.months === 1 ? "mes" : "meses"}`}
                                {cat.years === 0 && cat.months === 0 && "0 meses"}
                            </span>
                            <span>•</span>
                            <span>{cat.sex === "macho" ? "♂️ Macho" : "♀️ Hembra"}</span>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {cat.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                            <span className={`${statusConfig[cat.status].color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                                {statusConfig[cat.status].label}
                            </span>
                        <span className="text-[#805BA6] font-medium group-hover:translate-x-2 transition-transform">
                                Ver más →
                            </span>
                    </div>
                </div>
            </motion.div>
        </a>
    )
}

export function AdminCatCard({ cat, onEdit }: { cat: Cat; onEdit: () => void }) {
    const priorityColors = {
        urgente: "bg-red-500",
        alta: "bg-yellow-500",
        normal: "bg-green-500"
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <div className="relative h-48">
                <Image
                    src={cat.images[0]}
                    alt={cat.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                    {cat.isAdopted ? (
                        <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Adoptado
            </span>
                    ) : (
                        <span className={`${priorityColors[cat.priority]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {cat.priority === "urgente" ? "🔴 Urgente" : cat.priority === "alta" ? "🟡 Alta" : "🟢 Normal"}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {cat.years > 0 && `${cat.years} ${cat.years === 1 ? "año" : "años"}`}
                        {cat.years > 0 && cat.months > 0 && " y "}
                        {cat.months > 0 && `${cat.months} ${cat.months === 1 ? "mes" : "meses"}`}
                        {cat.years === 0 && cat.months === 0 && "0 meses"}
                    </span>
                    <span>•</span>
                    <span>{cat.sex === "macho" ? "♂️ Macho" : "♀️ Hembra"}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cat.shortDescription}
                </p>

                <motion.button
                    onClick={onEdit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#805BA6] hover:bg-[#6A4A8A] text-white px-4 py-3 rounded-xl font-semibold transition-all"
                >
                    <Edit className="w-4 h-4" />
                    Editar
                </motion.button>
            </div>
        </div>
    );
}

type StatCardProps = {
    icon: React.ReactNode; 
    value: string, 
    label: string
}
export function StatCard({ icon, value, label }: StatCardProps) {
    return (
        <div className="bg-[#E9E1F3] rounded-xl p-6 text-center">
            <div className="flex justify-center mb-2 text-[#6A4A8A]">{icon}</div>
            <p className="text-3xl font-bold text-[#6A4A8A] mb-1">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
        </div>
    );
}
type AdminStatCardProps = {
    color: string;
    value: number,
    label: string
}
export function AdminStatCard({ color, value, label }: AdminStatCardProps) {
    return (
        <div className={`${color} text-white rounded-2xl p-6 shadow-lg`}>
            <p className="text-sm opacity-90 mb-1">{label}</p>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    );
}

type DonationCardProps = {
    type: "bizum" | "teaming" | "material" | "share";
    title: string;
    description: string;
    action: string;
    link?: string;
    onClick?: () => void;
};
export function DonationCard({ type, title, description, action, link, onClick }: DonationCardProps ) {
    const icons = {
        bizum: <Heart className="w-8 h-8 text-[#805BA6]" />,
        teaming: <Euro className="w-8 h-8 text-[#805BA6]" />,
        material: <Package className="w-8 h-8 text-[#805BA6]"/>,
        share: <Speech className="w-8 h-8 text-[#805BA6]" />
    }
    const isClickable = link || onClick;
    const content = (
        <motion.div
            whileHover={{ scale: isClickable ? 1.03 : 1, y: isClickable ? -4 : 0 }}
            onClick={onClick}
            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all 
            ${isClickable ? 'cursor-pointer' : ''} 
            ${type === 'material' ? 'md:col-span-2' : ''}`}
            
        >
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#E9E1F3] rounded-full flex items-center justify-center flex-shrink-0">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex items-center gap-2 text-[#805BA6] font-semibold">
                        <span>
                            {action}
                        </span>
                        {(link || onClick) && <ExternalLink className="w-4 h-4" />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        )
    }
    return content;
}

type ContactCardProps = {
    icon: React.ReactNode; 
    title: string, 
    content: string, 
    link: string, 
    delay: number
};
export function ContactCard({ icon, title, content, link, delay }: ContactCardProps ) {
    return(
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl text-center transition-all border border-gray-100"
        >
            <div className="bg-[#E9E1F3] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6A4A8A]">
                {icon}
            </div>
            <h3 className="text-black text-lg font-semibold mb-2">
                {title}
            </h3>
            <p className="text-[#6A4A8A] hover:underline text-sm">
                {content}
            </p>
        </motion.a>
    );
}
type ProcessStepCardProps = {
    number: string; 
    title: string; 
    description: string
};
export function ProcessStepCard({ number, title, description }: ProcessStepCardProps ) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-[#F6F1FB] rounded-2xl p-8 text-center"
        >
            <div className="bg-gradient-to-br from-[#805BA6] to-[#6A4A8A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">
                    {number}
                </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}