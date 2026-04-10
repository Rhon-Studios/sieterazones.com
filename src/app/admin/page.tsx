"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/userContext"

import { motion } from "motion/react";
import {Heart, User, Lock } from "lucide-react";
import Image from "next/image";


const Login = () => {
    const router = useRouter()
    const { setUserId } = useUser() 
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        const res = await fetch("/api/users", {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ username, password }),
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.error)
            return
        }
        setUserId(data.user.id)
        setIsLoading(false)
        console.log(data);
        router.push("/admin/dashboard")
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F6F1FB] via-[#E9E1F3] to-[#805BA6]/10 flex items-center justify-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <Image 
                            src="/logo-bgremove.png" 
                            alt="7 Razones" 
                            width={100} 
                            height={100} 
                            className="object-contain"
                        />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-600">
                        7 Razones - Gestión de Datos
                    </p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.3, duration: 0.6 }} 
                    className="bg-white rounded-3xl shadow-2xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#805BA6]" />
                                </div>
                                <input 
                                    id="username" 
                                    type="text" 
                                    value={username}
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent transition-all text-gray-800"
                                    placeholder="Ingresa tu usuario" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#805BA6]" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#805BA6] focus:border-transparent transition-all text-gray-800"
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                        <motion.button 
                            type="submit" 
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }} 
                            className={`w-full bg-gradient-to-r from-[#805BA6] to-[#6A4A8A] text-white py-4 rounded-xl font-semibold shadow-lg transition-all ${
                                isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Ingresando...
                                </span>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Login;
