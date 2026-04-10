export type Cat = {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    years: number;
    months: number;
    sex: "macho" | "hembra";
    status: "normal" | "reservado" | "acogido";
    images: string[];
    priority: "urgente" | "alta" | "normal";
    isAdopted: boolean;
};

export const cats: Cat[] = [
    {
        id: 1,
        name: "Luna",
        shortDescription: "Cariñosa y tranquila, ideal para hogares serenos.",
        description: "Luna es una gata muy dulce que disfruta pasar tiempo cerca de las personas. Le encanta tomar el sol junto a la ventana y recibir caricias. Se adapta perfectamente a pisos pequeños y es muy limpia y educada.",
        years: 0,
        months: 6,
        sex: "hembra",
        status: "normal",
        images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=8"],
        priority: "normal",
        isAdopted: false
    },
    {
        id: 2,
        name: "Simón",
        shortDescription: "Juguetón y curioso, siempre explorando.",
        description: "Simón es un gato macho muy activo y divertido. Le encanta jugar con pelotas y perseguir juguetes. Es sociable con otros gatos y sería ideal para una familia con niños.",
        years: 3,
        months: 12,
        sex: "macho",
        status: "normal",
        images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"],
        priority: "alta",
        isAdopted: false
    },
    {
        id: 3,
        name: "Mimi",
        shortDescription: "Pequeña y dulce, busca un hogar acogedor.",
        description: "Mimi es una gatita muy tranquila que disfruta dormir en lugares cómodos. Es algo tímida al principio, pero cuando gana confianza se vuelve muy cariñosa.",
        years: 0,
        months: 6,
        sex: "hembra",
        status: "reservado",
        images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"],
        priority: "urgente",
        isAdopted: false
    },
    {
        id: 4,
        name: "Thor",
        shortDescription: "Grande y protector, pero muy mimoso.",
        description: "Thor es un gato fuerte y tranquilo. Aunque su tamaño impone, es extremadamente cariñoso y le encanta que le rasquen la barriga. Perfecto para hogares sin otros animales.",
        years: 3,
        months: 12,
        sex: "macho",
        status: "acogido",
        images: ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80"],
        priority: "normal",
        isAdopted: false
    },
    {
        id: 5,
        name: "Nala",
        shortDescription: "Activa y muy sociable.",
        description: "Nala es una gata joven llena de energía. Le encanta correr y jugar, pero también disfruta momentos de calma junto a sus humanos. Está esterilizada y lista para encontrar su familia definitiva.",
        years: 3,
        months: 12,
        sex: "hembra",
        status: "normal",
        images: ["https://images.unsplash.com/photo-1615789591457-74a63395c990?w=800&q=80"],
        priority: "alta",
        isAdopted: false
    },
    {
        id: 6,
        name: "Leo",
        shortDescription: "Muy tranquilo y acostumbrado a niños.",
        description: "Leo es un gato adulto muy equilibrado. Está acostumbrado a convivir con niños y otros gatos. Es independiente pero disfruta la compañía.",
        years: 3,
        months: 12,
        sex: "macho",
        status: "normal",
        images: ["https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&q=80"],
        priority: "normal",
        isAdopted: true
    }
];
