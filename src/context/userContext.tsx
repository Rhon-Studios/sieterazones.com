"use client"

import {createContext, useContext, useEffect, useState} from "react"
import Cookies from "js-cookie"

type UserContextType = {
    userId: string | null
    setUserId: (id: string | null) => void
    logOut: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({children}: { children: React.ReactNode }) {
    const [userId, setUserIdState] = useState<string | null>(null)

    useEffect(() => {
        const savedId = Cookies.get("userId")
        if (savedId) setUserIdState(savedId)
    }, [])

    const setUserId = (id: string | null) => {
        setUserIdState(id)
        if (id) Cookies.set("userId", id, {expires: 7})
        else Cookies.remove("userId")
    }

    const logOut = () => setUserId(null);

    return (
        <UserContext.Provider value={{userId, setUserId, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser debe usarse dentro de un UserProvider")
    return context
}
