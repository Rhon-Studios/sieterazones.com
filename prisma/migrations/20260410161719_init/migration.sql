-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "years" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL, 
    "isAdopted" BOOLEAN NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesAnimal" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "ImagesAnimal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagesAnimal" ADD CONSTRAINT "ImagesAnimal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
