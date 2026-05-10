import type {Cat} from "@/database/catDB";

export const runtime = "nodejs";

type CatFields = Omit<Cat, "id"> & {
    images?: Array<{
        id?: string;
        url: string;
        filename?: string;
        type?: string;
        size?: number;
        thumbnails?: Record<string, unknown>;
    }>;
};

async function uploadAttachment(recordId: string, file: File) {
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    const res = await fetch(
        `https://content.airtable.com/v0/${process.env.DATABASE_ID}/${recordId}/images/uploadAttachment`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_AIRTABLE}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contentType: file.type || "application/octet-stream",
                file: base64,
                filename: file.name,
            }),
        },
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}

async function getRecord(recordId: string) {
    const res = await fetch(
        `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}/${recordId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_AIRTABLE}`,
            },
        },
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        const url = id
            ? `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}/${id}`
            : `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_AIRTABLE}`,
            },
        });

        if (!res.ok) {
            return new Response(JSON.stringify({error: "Error obteniendo datos"}), {
                status: res.status,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const data: Cat | { records: Cat[] } = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({error: "Error interno"}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const rawData = formData.get("data");
        const file = formData.get("image");

        if (typeof rawData !== "string") {
            return new Response(JSON.stringify({error: "Datos inválidos"}), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const body = JSON.parse(rawData) as CatFields & { id?: string; removeImage?: boolean };
        const {id, removeImage, ...fields} = body;

        const hasFile = file instanceof File && file.size > 0;
        const isEdit = !!id;

        const fieldsToSave: Record<string, unknown> = {...fields};
        
        if (hasFile) {
            fieldsToSave.images = [];
        } else if (removeImage) {
            fieldsToSave.images = [];
        }

        const saveRes = await fetch(
            isEdit
                ? `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}/${id}`
                : `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}`,
            {
                method: isEdit ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.TOKEN_AIRTABLE}`,
                },
                body: JSON.stringify({
                    fields: fieldsToSave,
                }),
            },
        );

        if (!saveRes.ok) {
            return new Response(await saveRes.text(), {
                status: saveRes.status,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const savedData = await saveRes.json();
        const recordId = savedData?.id;

        if (hasFile && recordId) {
            await uploadAttachment(recordId, file);
            const finalData = await getRecord(recordId);

            return new Response(JSON.stringify(finalData), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify(savedData), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({error: "Error interno"}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(JSON.stringify({error: "ID requerido"}), {
                status: 400,
                headers: {"Content-Type": "application/json"},
            });
        }

        const res = await fetch(
            `https://api.airtable.com/v0/${process.env.DATABASE_ID}/${process.env.DATABASE_TABLE_ID}/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN_AIRTABLE}`,
                },
            },
        );

        if (!res.ok) {
            return new Response(JSON.stringify({error: "Error eliminando el gato"}), {
                status: res.status,
                headers: {"Content-Type": "application/json"},
            });
        }

        return new Response(JSON.stringify({deleted: true}), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({error: "Error interno"}), {
            status: 500,
            headers: {"Content-Type": "application/json"},
        });
    }
}
