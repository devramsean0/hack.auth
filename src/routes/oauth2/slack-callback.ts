import { Request, Response } from "express";
import { db } from "../../index.js";

export const get = async (req: Request, res: Response) => {
    const { code, state } = req.query;
    if (typeof code !== "string") {
        return res.status(400).send("No code provided");
    }
    if (typeof state !== "string") {
        return res.status(400).send("No state provided");
    }
    const session_id = (req.session as any).session_id;
    if (!session_id) {
        return res.status(400).send("No session ID found");
    }
    // Grab the session from the DB
    const session = await db.session.findUnique({
        where: {
            cookie: session_id,
        },
    });
    if (!session) {
        return res.status(400).send("Session not found");
    }
    await db.session.update({
        where: {
            cookie: session_id,
        },
        data: {
            authenticated: true,
        },
    });
    
    const user = await db.user.findUnique({
        where: {
            id: Number(session.userId),
        },
    });
    if (!user) {
        // TODO: Redirect to create-user endpoint
        return res.render("create-user-profile");
    }
    if (user.connected_services.includes(state)) {
        // TODO: Redirect to callback endpoint
    } else {
        return res.render("authorize-applicaton");
    }
};