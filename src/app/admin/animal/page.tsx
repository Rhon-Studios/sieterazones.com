"use client"

import React, { useEffect, useState} from "react";
import type { Cat } from "@/database/catDB";
import { cats } from "@/database/catDB";
import {useRouter, useSearchParams} from "next/navigation";
import { motion } from "motion/react";
import { Save, Upload } from "lucide-react";
import Image from "next/image";


type AnimalForm = Omit<Cat, "id"> & { id?: number };

const EditAnimal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isNew = !id;
    const [form, setForm] = useState<AnimalForm>({
        name: "",
        shortDescription: "",
        description: "",
        years: 0,
        months: 0,
        sex: "macho",
        status: "normal",
        priority: "normal",
        images: [],
        isAdopted: false,

    });
    const [imageUrl, setImageUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        if (!isNew && id) {
            const cat = cats.find(c => c.id === Number(id));
            if (cat) {
                setForm(cat)
                setImageUrl(cat.images[0] || "");
            }
        }
    }, [id, isNew]);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({ ...prev, [name]: checked }));
        } else if (type === "number") {
            setForm(prev => ({ ...prev, [name]: Number(value) }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const updatedForm = {
            ...form,
            images: imageUrl ? [imageUrl] : form.images
        };
        setTimeout(() => {
            console.log("Saving cat:", updatedForm);
            setIsSaving(false);
            router.push("/admin/dashboard");
        }, 1000);
    };
    
    return (
        <div className="min-h-screen bg-[#F6F1FB] py-8 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <a
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-[#805BA6] hover:text-[#6A4A8A] mb-8 font-medium"
                        style={{ fontWeight: 700 }}
                    >
                        ← Volver al dashboard
                    </a>
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-[#805BA6] to-[#6A4A8A] px-8 py-6">
                            <h2 className="text-3xl font-bold text-white">
                                {isNew ? "Añadir Nuevo Gato" : "Editar Gato"}
                            </h2>
                            <p className="text-[#E9E1F3] mt-2">
                                {isNew ? "Añade un nuevo gato al sistema" : "Actualiza la información del gato"}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            <Section title="Información Básica">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Nombre del Gato"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Ej: Luna, Simón, Mimi"
                                        required
                                    />
                                    <div className="flex gap-6">
                                        <Input
                                            label="Años"
                                            name="years"
                                            type="number"
                                            value={form.years}
                                            onChange={handleChange}
                                            min={0}
                                            required
                                        />
                                        <Input
                                            label="Meses"
                                            name="months"
                                            type="number"
                                            value={form.months}
                                            onChange={handleChange}
                                            min={0}
                                            required
                                        />
                                    </div>
                                </div>
                                <Input
                                    label="Descripción Corta"
                                    name="shortDescription"
                                    value={form.shortDescription}
                                    onChange={handleChange}
                                    placeholder="Una frase corta que describa al gato"
                                    maxLength={100}
                                    required
                                    helperText={`${form.shortDescription.length}/100 caracteres`}
                                />
                                <TextArea
                                    label="Descripción Completa"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe la personalidad, comportamiento y necesidades del gato..."
                                    rows={5}
                                    required
                                />
                            </Section>
                            <Section title="Características">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Sexo"
                                        name="sex"
                                        value={form.sex}
                                        onChange={handleChange}
                                        options={[
                                            { value: "macho", label: "Macho" },
                                            { value: "hembra", label: "Hembra" }
                                        ]}
                                    />
                                    <Select
                                        label="Estado"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: "normal", label: "Disponible" },
                                            { value: "reservado", label: "Reservado" },
                                            { value: "acogido", label: "En acogida" }
                                        ]}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Prioridad"
                                        name="priority"
                                        value={form.priority}
                                        onChange={handleChange}
                                        options={[
                                            { value: "normal", label: "🟢 Normal" },
                                            { value: "alta", label: "🟡 Alta" },
                                            { value: "urgente", label: "🔴 Urgente" }
                                        ]}
                                    />
                                    {!isNew && (
                                        <div className="flex items-center gap-3 pt-8">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isAdopted"
                                                    checked={form.isAdopted}
                                                    onChange={handleChange}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#805BA6]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#805BA6]"></div>
                                                <span className="ms-3 text-sm font-semibold text-gray-700">Adoptado</span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </Section>
                            <Section title="Imagen">
                                {imageUrl && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 relative rounded-2xl overflow-hidden h-64 shadow-lg"
                                    >
                                        <div className="relative h-64 rounded-2xl overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                                onError={() => setImageUrl("")}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                                <div className="flex flex-col items-center bg-[#F6F1FB] rounded-2xl p-6 border-2 border-dashed border-[#805BA6]">
                                    <div className="text-center">
                                        <Upload className="w-12 h-12 text-[#805BA6] mx-auto mb-3" />
                                        <label
                                            htmlFor="file"
                                            className="w-50 h-10 px-3 rounded-lg cursor-pointer flex items-center justify-between bg-[#805BA6]/30 text-gray-800"
                                        >
                                            <span className="text-sm flex-1 text-center">
                                                Seleccionar imagen
                                            </span>
                                        </label>
                                        <input
                                            id="file"
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </Section>
                            <div className="flex gap-4 pt-6 border-t border-gray-200">
                                <motion.a
                                    href="/admin/dashboard"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-xl font-semibold transition-all"
                                >
                                    Cancelar
                                </motion.a>
                                <motion.button
                                    type="submit"
                                    disabled={isSaving}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-gradient-to-r from-[#805BA6] to-[#6A4A8A] text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {isNew ? "Crear Gato" : "Guardar Cambios"}
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-[#6A4A8A] pb-2">
                {title}
            </h3>
            {children}
        </div>
    );
}

type InputProps = {
    label: string;
    helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
function Input({ label, helperText, ...props }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent transition-all text-gray-800"
            />
            {helperText && (
                <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}
        </div>
    );
}

type TextAreaProps = {
    label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
function TextArea({ label, ...props }: TextAreaProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <textarea
                {...props}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent transition-all text-gray-800 resize-none"
            />
        </div>
    );
}

type Option = {
    value: string;
    label: string;
};
type SelectProps = {
    label: string;
    options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;
function Select({ label, options, ...props }: SelectProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <select
                {...props}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent transition-all text-gray-800"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default EditAnimal;
