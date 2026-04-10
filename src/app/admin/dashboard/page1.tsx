"use client";
import { CatCard } from "@/components/ui/Cards";
//import ProtectedRoute from "@/context/protectedRoute";
import { cats } from "@/database/catDB"
/*import { Animal } from "@prisma/client";*/
import { useRouter } from "next/navigation";
import React, { ComponentProps, useEffect, useState } from "react";

type Props = ComponentProps<"div"> & {};

const AdminDashboardPage = ({ ...rest }: Props) => {
  const [animals, setAnimals] = useState<cats[]>([]);

  const getAnimals = async () => {
    const res = await fetch("/api/animals", { method: "GET" });
    const data = await res.json();
    setAnimals(data);
  };

  useEffect(() => {
    getAnimals();
  }, []);
  
  const router = useRouter();

  const goToNewAnimal = () => router.push("/admin/animal");
    const goToEditAnimal = (id: number) => router.push(`/admin/animal?id=${id}`);
  return (
    //<ProtectedRoute>
      <div
        className="flex min-h-screen flex-col items-center bg-gray-50 p-6"
        {...rest}
      >
        <h1 className="text-3xl font-bold text-violet-700 tracking-wide mb-6 mt-4">
          Dashboard
        </h1>

        <div className="flex gap-4 mb-6">
          <button className="bg-violet-400 hover:bg-violet-600 transition duration-150 ease-in-out rounded-3xl px-4 py-2 text-white font-semibold"
          onClick={goToNewAnimal}>
            New animal
          </button>
          <button className="bg-violet-400 hover:bg-violet-600 transition duration-150 ease-in-out rounded-3xl px-4 py-2 text-white font-semibold">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {animals.map((animal) => (
          <div key={animal.id}>
            <CatCard
              name={animal.name}
              description={animal.description}
              isDisponible={animal.isAdopted}
              url=""
            />
            {/* Botón invisible o simple para ir a editar */}
            <div
              onClick={() => goToEditAnimal(animal.id)}
              className="cursor-pointer text-sm text-blue-500 mt-1"
            >
              Edit
            </div>
          </div>
        ))}
      </div>
      </div>
    //</ProtectedRoute>
  );
};

export default AdminDashboardPage;
