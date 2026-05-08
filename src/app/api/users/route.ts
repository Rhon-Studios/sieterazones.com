export async function POST(req: Request) {
    const {username, password} = await req.json()

    const envUser = process.env.ADMIN_USERNAME
    const envPass = process.env.ADMIN_PASSWORD

    if (!envUser || !envPass) {
        return new Response(JSON.stringify({error: "Missing env config"}), {status: 500})
    }

    if (username !== envUser || password !== envPass) {
        return new Response(JSON.stringify({error: "Invalid credentials"}), {status: 401})
    }

    return new Response(
        JSON.stringify({
            message: "Login successful",
            user: {id: 1, user: envUser},
        }),
        {status: 200}
    )
}
